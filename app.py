import hashlib
import html
import json
import mimetypes
import os
import secrets
import smtplib
import ssl
from datetime import datetime
import time
from http.cookies import SimpleCookie
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from email.message import EmailMessage
from urllib.parse import parse_qs, urlencode, urlparse, unquote

import mysql.connector


BASE_DIR = Path(__file__).resolve().parent
WEBAPP_DIR = BASE_DIR / "webapp"
DB_CONFIG = {
    "host": os.getenv("EVENTHUB_DB_HOST", "localhost"),
    "port": int(os.getenv("EVENTHUB_DB_PORT", "3306")),
    "user": os.getenv("EVENTHUB_DB_USER", "root"),
    "password": os.getenv("EVENTHUB_DB_PASSWORD", "Om@192006"),
    "database": os.getenv("EVENTHUB_DB_NAME", "eventhub"),
}
CONTACT_EMAIL_TO = "omsinhasan19@gmail.com"
GMAIL_SMTP_HOST = os.getenv("EVENTHUB_GMAIL_SMTP_HOST", "smtp.gmail.com")
GMAIL_SMTP_PORT = int(os.getenv("EVENTHUB_GMAIL_SMTP_PORT", "465"))
GMAIL_SENDER_EMAIL = os.getenv("EVENTHUB_GMAIL_SENDER_EMAIL", CONTACT_EMAIL_TO)
GMAIL_APP_PASSWORD = os.getenv("EVENTHUB_GMAIL_APP_PASSWORD", "")
SESSIONS: dict[str, dict[str, str | int]] = {}
EVENT_CATALOG: list[dict[str, str]] = [
    {
        "id": "tech-innovation-summit",
        "eventName": "Tech Innovation Summit",
        "eventDate": "August 24, 2026",
        "eventTime": "10:00 AM",
        "location": "Pune Convention Center",
        "ticketType": "General Entry",
        "seatInfo": "Open Seating",
        "price": "Rs 1,499",
        "status": "upcoming",
        "category": "tech",
        "imageUrl": "/assets/dashboard/images/dsupimg1.jpg",
        "organizerPhone": "+91 98765 21001",
    },
    {
        "id": "digital-marketing-workshop",
        "eventName": "Digital Marketing Workshop",
        "eventDate": "August 28, 2026",
        "eventTime": "11:30 AM",
        "location": "Mumbai Business Hub",
        "ticketType": "Workshop Pass",
        "seatInfo": "Open Seating",
        "price": "Rs 999",
        "status": "upcoming",
        "category": "business",
        "imageUrl": "/assets/dashboard/images/dsupimg2.jpg",
        "organizerPhone": "+91 98765 21002",
    },
    {
        "id": "indie-music-night",
        "eventName": "Indie Music Night",
        "eventDate": "September 02, 2026",
        "eventTime": "07:00 PM",
        "location": "Bangalore Arena",
        "ticketType": "Concert Pass",
        "seatInfo": "Standing Zone",
        "price": "Rs 1,299",
        "status": "upcoming",
        "category": "music",
        "imageUrl": "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
        "organizerPhone": "+91 98765 21003",
    },
    {
        "id": "art-culture-expo",
        "eventName": "Art & Culture Expo",
        "eventDate": "September 05, 2026",
        "eventTime": "03:00 PM",
        "location": "Delhi Art Gallery",
        "ticketType": "Premium Entry",
        "seatInfo": "Gallery Access",
        "price": "Rs 899",
        "status": "upcoming",
        "category": "arts",
        "imageUrl": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80",
        "organizerPhone": "+91 98765 21004",
    },
    {
        "id": "street-food-carnival",
        "eventName": "Street Food Carnival",
        "eventDate": "September 08, 2026",
        "eventTime": "05:30 PM",
        "location": "Hyderabad Food Street",
        "ticketType": "Entry Pass",
        "seatInfo": "Food Court Access",
        "price": "Rs 699",
        "status": "upcoming",
        "category": "food",
        "imageUrl": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80",
        "organizerPhone": "+91 98765 21005",
    },
    {
        "id": "morning-marathon",
        "eventName": "Morning Marathon",
        "eventDate": "September 10, 2026",
        "eventTime": "06:00 AM",
        "location": "Chennai Marina Track",
        "ticketType": "Runner Pass",
        "seatInfo": "Bib Collection On Site",
        "price": "Rs 499",
        "status": "upcoming",
        "category": "sports",
        "imageUrl": "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=80",
        "organizerPhone": "+91 98765 21006",
    },
    {
        "id": "founder-networking-mixer",
        "eventName": "Founder Networking Mixer",
        "eventDate": "September 12, 2026",
        "eventTime": "06:30 PM",
        "location": "Gurgaon Startup Lounge",
        "ticketType": "Networking Pass",
        "seatInfo": "Open Networking Floor",
        "price": "Rs 1,099",
        "status": "upcoming",
        "category": "business",
        "imageUrl": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80",
        "organizerPhone": "+91 98765 21007",
    },
    {
        "id": "classical-fusion-evening",
        "eventName": "Classical Fusion Evening",
        "eventDate": "September 15, 2026",
        "eventTime": "07:30 PM",
        "location": "Kolkata Grand Theatre",
        "ticketType": "Evening Pass",
        "seatInfo": "Balcony Seating",
        "price": "Rs 1,199",
        "status": "upcoming",
        "category": "music",
        "imageUrl": "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=900&q=80",
        "organizerPhone": "+91 98765 21008",
    },
]


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def ensure_admin_account(cursor) -> None:
    admin_email = "admin2006@gmail.com"
    admin_password_hash = hash_password("Admin@2006")
    admin_name = "EventHub Admin"

    cursor.execute("SELECT 1 FROM users WHERE email = %s", (admin_email,))
    if cursor.fetchone() is not None:
        cursor.execute(
            """
            UPDATE users
            SET name = %s, password = %s, role = 'admin', admin_status = 'active'
            WHERE email = %s
            """,
            (admin_name, admin_password_hash, admin_email),
        )
        return

    cursor.execute(
        """
        INSERT INTO users(name, email, password, role, admin_status)
        VALUES(%s, %s, %s, 'admin', 'active')
        """,
        (admin_name, admin_email, admin_password_hash),
    )


def get_connection():
    return mysql.connector.connect(**DB_CONFIG)


def normalize_admin_status(value: object) -> str:
    status = str(value or "active").strip().lower()
    return status if status in {"active", "warned", "suspended", "removed"} else "active"


def send_contact_email(name: str, email: str, message: str) -> None:
    if not GMAIL_APP_PASSWORD:
        raise RuntimeError("Gmail app password is not configured.")

    mail = EmailMessage()
    mail["Subject"] = f"EventHub Contact Request from {name}"
    mail["From"] = GMAIL_SENDER_EMAIL
    mail["To"] = CONTACT_EMAIL_TO
    mail["Reply-To"] = email
    mail.set_content(
        "\n".join(
            [
                "New contact request received from EventHub.",
                "",
                f"Name: {name}",
                f"Email: {email}",
                "",
                "Message:",
                message,
            ]
        )
    )

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(GMAIL_SMTP_HOST, GMAIL_SMTP_PORT, context=context) as server:
        server.login(GMAIL_SENDER_EMAIL, GMAIL_APP_PASSWORD)
        server.send_message(mail)


def sample_user_tickets(user_name: str) -> list[dict[str, str]]:
    return [
        {
            "eventName": "Tech Innovation Summit",
            "eventDate": "August 24, 2026",
            "eventTime": "10:00 AM",
            "location": "Pune Convention Center",
            "ticketType": "General Entry",
            "seatInfo": "Open Seating",
            "ticketCode": "EH-TECH-2048",
            "price": "Rs 1,499",
            "status": "upcoming",
            "imageUrl": "/assets/dashboard/images/dsupimg1.jpg",
            "owner": user_name,
        },
        {
            "eventName": "Indie Music Night",
            "eventDate": "September 02, 2026",
            "eventTime": "07:00 PM",
            "location": "Bangalore Arena",
            "ticketType": "Concert Pass",
            "seatInfo": "Standing Zone",
            "ticketCode": "EH-MUSIC-8831",
            "price": "Rs 1,299",
            "status": "upcoming",
            "imageUrl": "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
            "owner": user_name,
        },
        {
            "eventName": "Design Week Retrospective",
            "eventDate": "February 18, 2026",
            "eventTime": "02:00 PM",
            "location": "Hyderabad Arts Hall",
            "ticketType": "Premium Pass",
            "seatInfo": "Section C, Seat 18",
            "ticketCode": "EH-DES-1174",
            "price": "Rs 1,199",
            "status": "used",
            "imageUrl": "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=900&q=80",
            "owner": user_name,
        },
    ]


def sample_registered_event_ids() -> list[str]:
    return [
        "tech-innovation-summit",
        "indie-music-night",
    ]


def sample_organizer_dashboard(user_name: str) -> dict[str, object]:
    return {
        "userName": user_name,
        "stats": {
            "activeEvents": "3",
            "totalAttendees": "428",
            "checkInRate": "91%",
            "totalRevenue": "Rs 1,84,000",
        },
        "managedEvents": [
            {
                "eventName": "EventHub Creator Meet",
                "eventDate": "April 08, 2026",
                "eventTime": "04:00 PM",
                "location": "Coimbatore Business Lounge",
                "status": "live",
                "imageUrl": "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80",
            },
            {
                "eventName": "Community Networking Night",
                "eventDate": "April 21, 2026",
                "eventTime": "07:00 PM",
                "location": "Madurai Social Club",
                "status": "live",
                "imageUrl": "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80",
            },
            {
                "eventName": "Launch Day Workshop",
                "eventDate": "May 05, 2026",
                "eventTime": "11:00 AM",
                "location": "Virtual Event",
                "status": "draft",
                "imageUrl": "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80",
            },
        ],
        "recentActivity": [
            {"icon": "fa-ticket", "title": "24 new tickets booked today", "time": "10 minutes ago"},
            {"icon": "fa-calendar-check", "title": "Check-in list updated for EventHub Creator Meet", "time": "45 minutes ago"},
            {"icon": "fa-pen-to-square", "title": "Launch Day Workshop saved as draft", "time": "2 hours ago"},
        ],
        "salesActivity": [
            {"avatar": "https://i.pravatar.cc/48?img=15", "title": "Akhil bought 2 VIP tickets", "time": "12 minutes ago"},
            {"avatar": "https://i.pravatar.cc/48?img=23", "title": "Nisha bought 1 General pass", "time": "1 hour ago"},
        ],
        "notifications": [
            {"icon": "fa-bell", "title": "Reminder: event starts in 2 days", "time": "Today"},
            {"icon": "fa-chart-line", "title": "Revenue is up 18% this week", "time": "This week"},
        ],
        "completedEvents": [
            {"title": "Campus Fest 2026", "summary": "186 attendees, Rs 54,000 revenue"},
            {"title": "Design Sprint Meetup", "summary": "92 attendees, Rs 27,500 revenue"},
        ],
    }


def format_event_date_display(value: object) -> str:
    text = str(value or "").strip()
    if not text:
        return "-"

    for pattern in ("%Y-%m-%d", "%B %d, %Y"):
        try:
            return datetime.strptime(text, pattern).strftime("%B %d, %Y")
        except ValueError:
            continue

    return text


def format_event_time_display(value: object) -> str:
    text = str(value or "").strip()
    if not text:
        return "-"

    for pattern in ("%H:%M:%S", "%H:%M", "%I:%M %p"):
        try:
            return datetime.strptime(text, pattern).strftime("%I:%M %p").lstrip("0")
        except ValueError:
            continue

    return text


def organizer_events_for_email(organizer_email: str) -> list[dict[str, object]]:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT
                    e.id,
                    e.title,
                    e.category,
                    e.event_date,
                    e.event_time,
                    e.venue,
                    e.ticket_price,
                    e.capacity,
                    e.event_status,
                    e.event_mode,
                    e.ticket_pricing_mode,
                    e.description,
                    e.poster_url,
                    e.created_at,
                    COALESCE(a.attendee_count, 0) AS attendee_count
                FROM organizer_events AS e
                LEFT JOIN (
                    SELECT organizer_event_id, COUNT(*) AS attendee_count
                    FROM organizer_event_attendees
                    WHERE attendee_status IN ('active', 'approved')
                    GROUP BY organizer_event_id
                ) AS a ON a.organizer_event_id = e.id
                WHERE e.organizer_email = %s
                ORDER BY e.created_at DESC
                """,
                (organizer_email,),
            )
            rows = cursor.fetchall()

    events: list[dict[str, object]] = []
    for row in rows:
        (
            event_id,
            title,
            category,
            event_date,
            event_time,
            venue,
            ticket_price,
            capacity,
            event_status,
            event_mode,
            ticket_pricing_mode,
            description,
            poster_url,
            created_at,
            attendee_count,
        ) = row
        numeric_price = int(ticket_price or 0)
        events.append(
            {
                "id": int(event_id),
                "eventName": str(title or "Untitled Event"),
                "eventDate": format_event_date_display(event_date),
                "eventTime": format_event_time_display(event_time),
                "location": str(venue or "TBA"),
                "price": f"Rs {numeric_price:,}",
                "capacity": int(capacity or 0),
                "category": str(category or "general"),
                "status": str(event_status or "draft"),
                "eventMode": str(event_mode or "venue"),
                "ticketPricingMode": str(ticket_pricing_mode or "paid"),
                "attendeeCount": int(attendee_count or 0),
                "description": str(description or ""),
                "imageUrl": str(poster_url or "/assets/dashboard/images/dsupimg1.jpg"),
                "_priceAmount": numeric_price,
                "_createdAt": str(created_at or ""),
            }
        )

    return events


def organizer_dashboard_payload(user_name: str, organizer_email: str) -> dict[str, object]:
    managed_events = organizer_events_for_email(organizer_email)
    active_events = [event for event in managed_events if event["status"] not in {"completed", "cancelled"}]
    completed_events = [event for event in managed_events if event["status"] == "completed"]
    total_revenue = sum(
        0
        if str(event.get("ticketPricingMode", "")).lower() == "free"
        else int(event.get("_priceAmount", 0)) * int(event.get("attendeeCount", 0))
        for event in managed_events
    )
    total_attendees = sum(int(event.get("attendeeCount", 0)) for event in managed_events)
    total_capacity = sum(int(event.get("capacity", 0)) for event in managed_events)
    checkin_rate = f"{int(round((total_attendees / total_capacity) * 100))}%" if total_capacity > 0 else "0%"

    recent_activity: list[dict[str, str]] = []
    for event in managed_events[:4]:
        recent_activity.append(
            {
                "icon": "fa-calendar-plus",
                "title": f"Created {event['eventName']}",
                "time": event["eventDate"],
            }
        )

    notifications = (
        [{"icon": "fa-bell", "title": "You have no events yet. Create your first event to get started.", "time": "Now"}]
        if not managed_events
        else [{"icon": "fa-circle-check", "title": "Your events are live on your organizer dashboard.", "time": "Now"}]
    )

    payload = {
        "userName": user_name,
        "stats": {
            "activeEvents": str(len(active_events)),
            "totalAttendees": str(total_attendees),
            "checkInRate": checkin_rate,
            "totalRevenue": f"Rs {total_revenue:,}",
        },
        "managedEvents": [{key: value for key, value in event.items() if not key.startswith("_")} for event in active_events],
        "recentActivity": recent_activity,
        "salesActivity": [],
        "notifications": notifications,
        "completedEvents": [
            {"title": event["eventName"], "summary": f"{event.get('attendeeCount', 0)} / {event['capacity']} attendees"}
            for event in completed_events
        ],
    }
    return payload


def organizer_event_detail_for_owner(organizer_email: str, event_id: int) -> dict[str, object] | None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT
                    id,
                    title,
                    category,
                    event_date,
                    event_time,
                    venue,
                    ticket_price,
                    capacity,
                    event_status,
                    event_mode,
                    ticket_pricing_mode,
                    description,
                    poster_url,
                    created_at
                FROM organizer_events
                WHERE id = %s AND organizer_email = %s
                """,
                (event_id, organizer_email),
            )
            event_row = cursor.fetchone()

            if event_row is None:
                return None

    sync_registration_attendees_for_event(event_id)

    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT
                    id,
                    title,
                    category,
                    event_date,
                    event_time,
                    venue,
                    ticket_price,
                    capacity,
                    event_status,
                    event_mode,
                    ticket_pricing_mode,
                    description,
                    poster_url,
                    created_at
                FROM organizer_events
                WHERE id = %s AND organizer_email = %s
                """,
                (event_id, organizer_email),
            )
            event_row = cursor.fetchone()

            if event_row is None:
                return None

            cursor.execute(
                """
                SELECT id, attendee_name, attendee_email, attendee_phone, created_at
                FROM organizer_event_attendees
                WHERE organizer_event_id = %s AND attendee_status IN ('active', 'approved')
                ORDER BY created_at DESC
                """,
                (event_id,),
            )
            attendee_rows = cursor.fetchall()

    (
        stored_event_id,
        title,
        category,
        event_date,
        event_time,
        venue,
        ticket_price,
        capacity,
        event_status,
        event_mode,
        ticket_pricing_mode,
        description,
        poster_url,
        created_at,
    ) = event_row

    attendees = [
        {
            "id": int(row[0]),
            "name": str(row[1] or ""),
            "email": str(row[2] or ""),
            "phone": str(row[3] or ""),
            "addedAt": row[4].isoformat() if row[4] else "",
        }
        for row in attendee_rows
    ]

    attendee_count = len(attendees)
    capacity_value = int(capacity or 0)
    occupancy_percent = int(round((attendee_count / capacity_value) * 100)) if capacity_value > 0 else 0

    return {
        "id": int(stored_event_id),
        "eventName": str(title or "Untitled Event"),
        "eventDate": format_event_date_display(event_date),
        "eventTime": format_event_time_display(event_time),
        "location": str(venue or "TBA"),
        "category": str(category or "general"),
        "price": f"Rs {int(ticket_price or 0):,}",
        "capacity": capacity_value,
        "status": str(event_status or "draft"),
        "eventMode": str(event_mode or "venue"),
        "ticketPricingMode": str(ticket_pricing_mode or "paid"),
        "description": str(description or ""),
        "imageUrl": str(poster_url or "/assets/dashboard/images/dsupimg1.jpg"),
        "createdAt": created_at.isoformat() if created_at else "",
        "attendeeCount": attendee_count,
        "occupancyPercent": occupancy_percent,
        "attendees": attendees,
    }


def admin_organizer_summaries() -> list[dict[str, object]]:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT
                    u.name,
                    u.email,
                    COALESCE(u.phone, '') AS phone,
                    COALESCE(u.bio, '') AS bio,
                    COALESCE(u.profile_image, '') AS profile_image,
                    COALESCE(u.admin_status, 'active') AS admin_status,
                    COALESCE(u.admin_warning_count, 0) AS admin_warning_count,
                    COALESCE(u.admin_note, '') AS admin_note,
                    u.created_at,
                    COUNT(DISTINCT e.id) AS event_count,
                    COALESCE(SUM(CASE WHEN e.event_status NOT IN ('completed', 'cancelled') THEN 1 ELSE 0 END), 0) AS active_event_count,
                    COALESCE(SUM(COALESCE(a.attendee_count, 0)), 0) AS total_attendees,
                    COALESCE(SUM(CASE WHEN e.ticket_pricing_mode = 'free' THEN 0 ELSE COALESCE(e.ticket_price, 0) * COALESCE(a.attendee_count, 0) END), 0) AS total_revenue
                FROM users AS u
                LEFT JOIN organizer_events AS e ON e.organizer_email = u.email
                LEFT JOIN (
                    SELECT organizer_event_id, COUNT(*) AS attendee_count
                    FROM organizer_event_attendees
                    WHERE attendee_status IN ('active', 'approved')
                    GROUP BY organizer_event_id
                ) AS a ON a.organizer_event_id = e.id
                WHERE u.role = 'organizer'
                GROUP BY
                    u.id,
                    u.name,
                    u.email,
                    u.phone,
                    u.bio,
                    u.profile_image,
                    u.admin_status,
                    u.admin_warning_count,
                    u.admin_note,
                    u.created_at
                ORDER BY u.created_at DESC
                """
            )
            rows = cursor.fetchall()

    organizers: list[dict[str, object]] = []
    for row in rows:
        (
            name,
            email,
            phone,
            bio,
            profile_image,
            admin_status,
            admin_warning_count,
            admin_note,
            created_at,
            event_count,
            active_event_count,
            total_attendees,
            total_revenue,
        ) = row
        events = organizer_events_for_email(str(email or ""))
        organizers.append(
            {
                "name": str(name or "Organizer"),
                "email": str(email or ""),
                "phone": str(phone or ""),
                "bio": str(bio or ""),
                "profileImage": str(profile_image or "/assets/dashboard/images/logo1.png"),
                "status": normalize_admin_status(admin_status),
                "warningCount": int(admin_warning_count or 0),
                "adminNote": str(admin_note or ""),
                "createdAt": created_at.isoformat() if created_at else "",
                "eventCount": int(event_count or 0),
                "activeEvents": int(active_event_count or 0),
                "totalAttendees": int(total_attendees or 0),
                "totalRevenue": int(total_revenue or 0),
                "events": [{key: value for key, value in event.items() if not key.startswith("_")} for event in events[:3]],
            }
        )

    return organizers


def admin_organizer_detail(email: str) -> dict[str, object] | None:
    normalized_email = str(email or "").strip().lower()
    if not normalized_email:
        return None

    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT
                    name,
                    email,
                    COALESCE(phone, '') AS phone,
                    COALESCE(bio, '') AS bio,
                    COALESCE(profile_image, '') AS profile_image,
                    COALESCE(admin_status, 'active') AS admin_status,
                    COALESCE(admin_warning_count, 0) AS admin_warning_count,
                    COALESCE(admin_note, '') AS admin_note,
                    created_at
                FROM users
                WHERE email = %s AND role = 'organizer'
                """,
                (normalized_email,),
            )
            row = cursor.fetchone()

    if row is None:
        return None

    name, organizer_email, phone, bio, profile_image, admin_status, admin_warning_count, admin_note, created_at = row
    events = organizer_events_for_email(normalized_email)
    total_attendees = sum(int(event.get("attendeeCount", 0)) for event in events)
    total_revenue = sum(
        0
        if str(event.get("ticketPricingMode", "")).lower() == "free"
        else int(event.get("_priceAmount", 0)) * int(event.get("attendeeCount", 0))
        for event in events
    )
    active_events = [event for event in events if str(event.get("status", "")).lower() not in {"completed", "cancelled"}]

    return {
        "name": str(name or "Organizer"),
        "email": str(organizer_email or ""),
        "phone": str(phone or ""),
        "bio": str(bio or ""),
        "profileImage": str(profile_image or "/assets/dashboard/images/logo1.png"),
        "status": normalize_admin_status(admin_status),
        "warningCount": int(admin_warning_count or 0),
        "adminNote": str(admin_note or ""),
        "createdAt": created_at.isoformat() if created_at else "",
        "stats": {
            "eventsCreated": len(events),
            "activeEvents": len(active_events),
            "attendees": total_attendees,
            "revenue": total_revenue,
        },
        "events": [{key: value for key, value in event.items() if not key.startswith("_")} for event in events],
    }


def admin_user_summaries() -> list[dict[str, object]]:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT
                    name,
                    email,
                    COALESCE(profile_image, '') AS profile_image,
                    COALESCE(admin_status, 'active') AS admin_status,
                    COALESCE(admin_warning_count, 0) AS admin_warning_count,
                    created_at
                FROM users
                WHERE role = 'user'
                ORDER BY created_at DESC
                """
            )
            rows = cursor.fetchall()

    users: list[dict[str, object]] = []
    for row in rows:
        name, email, profile_image, admin_status, admin_warning_count, created_at = row
        user = {
            "name": str(name or "User"),
            "email": str(email or ""),
            "role": "user",
        }
        bookings = booking_records_for_user(user)
        active_bookings = [booking for booking in bookings if booking["bookingStatus"] == "active"]
        total_spend = sum(int("".join(char for char in str(booking.get("bookingPrice", "")) if char.isdigit()) or 0) for booking in active_bookings)
        latest_city = str(active_bookings[0].get("city", "") or "") if active_bookings else ""

        users.append(
            {
                "name": user["name"],
                "email": user["email"],
                "profileImage": str(profile_image or "/assets/dashboard/images/logo1.png"),
                "status": normalize_admin_status(admin_status),
                "warningCount": int(admin_warning_count or 0),
                "joinedOn": created_at.isoformat() if created_at else "",
                "city": latest_city or "N/A",
                "tickets": len(active_bookings),
                "totalSpend": total_spend,
                "upcomingEvents": len(active_bookings),
            }
        )

    return users


def admin_user_detail(email: str) -> dict[str, object] | None:
    profile = user_profile_for_email(str(email or "").strip().lower())
    if profile is None or str(profile.get("role", "")).strip().lower() != "user":
        return None

    user = {
        "name": str(profile.get("name", "") or "User"),
        "email": str(profile.get("email", "") or ""),
        "role": "user",
    }
    bookings = booking_records_for_user(user)
    active_bookings = [booking for booking in bookings if str(booking.get("bookingStatus", "")).lower() == "active"]
    cancelled_bookings = [booking for booking in bookings if str(booking.get("bookingStatus", "")).lower() == "cancelled"]
    tickets = registered_tickets_for_user(user)
    attended_events = sum(1 for ticket in tickets if str(ticket.get("status", "")).lower() == "used")
    upcoming_events = sum(1 for ticket in tickets if str(ticket.get("status", "")).lower() != "used")
    total_spend = sum(parse_currency_amount(str(booking.get("bookingPrice", ""))) for booking in active_bookings)
    latest_booking = active_bookings[0] if active_bookings else (cancelled_bookings[0] if cancelled_bookings else None)
    latest_city = str((latest_booking or {}).get("city", "") or "N/A")

    return {
        "name": user["name"],
        "email": user["email"],
        "phone": str(profile.get("phone", "") or ""),
        "bio": str(profile.get("bio", "") or ""),
        "profileImage": str(profile.get("profile_image", "") or "/assets/dashboard/images/logo1.png"),
        "status": normalize_admin_status(profile.get("admin_status")),
        "warningCount": int(profile.get("admin_warning_count", 0) or 0),
        "adminNote": str(profile.get("admin_note", "") or ""),
        "joinedOn": str(profile.get("created_at", "") or ""),
        "city": latest_city,
        "stats": {
            "tickets": len(active_bookings),
            "upcomingEvents": upcoming_events,
            "attendedEvents": attended_events,
            "cancelledBookings": len(cancelled_bookings),
            "totalSpend": total_spend,
        },
        "bookings": bookings,
    }


def admin_browse_events() -> list[dict[str, object]]:
    now = datetime.now().date()
    events: list[dict[str, object]] = []

    for event in public_event_catalog():
        event_copy: dict[str, object] = dict(event)
        event_date_raw = str(event_copy.get("eventDate", "") or "")

        try:
            event_date = datetime.strptime(event_date_raw, "%B %d, %Y").date()
            is_upcoming = event_date >= now
        except ValueError:
            is_upcoming = str(event_copy.get("status", "")).lower() == "upcoming"

        if not is_upcoming:
            continue

        event_copy["isUpcoming"] = True
        events.append(event_copy)

    return events


def organizer_public_events() -> list[dict[str, str]]:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT
                    e.id,
                    e.title,
                    e.category,
                    e.event_date,
                    e.event_time,
                    e.venue,
                    e.ticket_price,
                    e.event_mode,
                    e.ticket_pricing_mode,
                    e.poster_url,
                    COALESCE(u.phone, '') AS organizer_phone
                FROM organizer_events AS e
                LEFT JOIN users AS u ON u.email = e.organizer_email
                WHERE e.event_status = 'published'
                ORDER BY e.created_at DESC
                """
            )
            rows = cursor.fetchall()

    now = datetime.now().date()
    events: list[dict[str, str]] = []
    for row in rows:
        (
            event_id,
            title,
            category,
            event_date,
            event_time,
            venue,
            ticket_price,
            event_mode,
            ticket_pricing_mode,
            poster_url,
            organizer_phone,
        ) = row

        event_date_label = format_event_date_display(event_date)
        event_time_label = format_event_time_display(event_time)
        is_upcoming = True
        if isinstance(event_date, datetime):
            is_upcoming = event_date.date() >= now
        elif hasattr(event_date, "isoformat"):
            try:
                is_upcoming = datetime.strptime(str(event_date), "%Y-%m-%d").date() >= now
            except ValueError:
                is_upcoming = True
        status = "upcoming" if is_upcoming else "completed"

        is_free = str(ticket_pricing_mode or "").lower() == "free"
        price_value = int(ticket_price or 0)
        resolved_price = "Rs 0" if is_free else f"Rs {price_value:,}"
        resolved_mode = str(event_mode or "venue").lower()
        seat_info = "Online Access Link" if resolved_mode == "online" else "Open Seating"

        events.append(
            {
                "id": build_public_organizer_event_id(int(event_id)),
                "eventName": str(title or "Untitled Event"),
                "eventDate": event_date_label,
                "eventTime": event_time_label,
                "location": str(venue or "Online Event"),
                "ticketType": "Entry Pass",
                "seatInfo": seat_info,
                "price": resolved_price,
                "status": status,
                "category": str(category or "general"),
                "imageUrl": str(poster_url or "/assets/dashboard/images/dsupimg1.jpg"),
                "organizerPhone": str(organizer_phone or ""),
            }
        )

    return events


def public_event_catalog() -> list[dict[str, str]]:
    return [dict(event) for event in EVENT_CATALOG] + organizer_public_events()


def get_event_by_id(event_id: str) -> dict[str, str] | None:
    for event in public_event_catalog():
        if event["id"] == event_id:
            return event
    return None


def build_registered_ticket_code(event_id: str, user_name: str) -> str:
    digest = hashlib.sha256(f"{str(user_name or '').strip()}:{str(event_id or '').strip()}".encode("utf-8")).hexdigest()[:8].upper()
    return f"EH-{digest}"


def build_registered_ticket(event: dict[str, str], user_name: str) -> dict[str, str]:
    ticket = {key: value for key, value in event.items() if key != "id" and key != "category"}
    ticket["ticketCode"] = build_registered_ticket_code(event["id"], user_name)
    ticket["owner"] = user_name
    return ticket


def parse_currency_amount(value: str) -> int:
    return int("".join(ch for ch in str(value) if ch.isdigit()) or "0")


def ticket_type_multiplier(ticket_type: str) -> float:
    normalized = str(ticket_type or "").strip().lower()
    if normalized == "vip entry":
        return 1.5
    if normalized == "premium pass":
        return 1.25
    return 1.0


def calculate_booking_price(event_price: str, ticket_type: str, ticket_count: int) -> str:
    base_amount = parse_currency_amount(event_price)
    if base_amount <= 0:
        return str(event_price or "Rs 0")

    safe_count = max(int(ticket_count or 1), 1)
    total = int(round(base_amount * ticket_type_multiplier(ticket_type) * safe_count))
    return f"Rs {total:,}"


def build_organizer_ticket_id(event_id: int) -> str:
    return f"EH-{event_id}-{secrets.token_hex(4).upper()}"


def build_public_organizer_event_id(event_id: int) -> str:
    return f"org-{int(event_id)}"


def parse_organizer_event_id(event_id: str) -> int | None:
    raw_value = str(event_id or "").strip().lower()
    if raw_value.startswith("org-"):
        raw_value = raw_value[4:]
    try:
        parsed = int(raw_value)
    except (TypeError, ValueError):
        return None
    return parsed if parsed > 0 else None


def build_registration_attendee_ticket_id(event_id: int, user_email: str) -> str:
    digest = hashlib.sha256(f"{event_id}:{str(user_email or '').strip().lower()}".encode("utf-8")).hexdigest()[:10].upper()
    return f"EH-REG-{digest}"


def get_user_name_by_email(cursor, user_email: str) -> str:
    cursor.execute(
        "SELECT name FROM users WHERE email = %s",
        (str(user_email or "").strip().lower(),),
    )
    row = cursor.fetchone()
    return str(row[0] or "").strip() if row else ""


def sync_registration_attendee(
    cursor,
    user_email: str,
    event_id: str,
    attendee_name: str,
    attendee_email: str,
    attendee_phone: str,
    ticket_type: str,
    ticket_count: int,
    booking_status: str = "active",
) -> None:
    resolved_event_id = str(event_id or "").strip()
    organizer_event_id = parse_organizer_event_id(resolved_event_id)
    if organizer_event_id is None:
        return

    cursor.execute(
        "SELECT 1 FROM organizer_events WHERE id = %s",
        (organizer_event_id,),
    )
    if cursor.fetchone() is None:
        return

    normalized_user_email = str(user_email or "").strip().lower()
    normalized_attendee_email = str(attendee_email or "").strip().lower()
    normalized_status = str(booking_status or "active").strip().lower()
    ticket_owner_name = get_user_name_by_email(cursor, normalized_user_email) or attendee_name or normalized_user_email

    cursor.execute(
        """
        UPDATE organizer_event_attendees
        SET attendee_status = 'removed'
        WHERE organizer_event_id = %s
          AND attendee_source = 'registration'
          AND user_email = %s
        """,
        (organizer_event_id, normalized_user_email),
    )

    if normalized_status != "active":
        return

    cursor.execute(
        """
        INSERT INTO organizer_event_attendees(
            organizer_event_id,
            attendee_name,
            attendee_email,
            attendee_phone,
            attendee_status,
            ticket_type,
            ticket_count,
            ticket_id,
            attendee_source,
            user_email
        )
        VALUES(%s, %s, %s, %s, 'active', %s, %s, %s, 'registration', %s)
        ON DUPLICATE KEY UPDATE
            attendee_name = VALUES(attendee_name),
            attendee_phone = VALUES(attendee_phone),
            attendee_status = 'active',
            ticket_type = VALUES(ticket_type),
            ticket_count = VALUES(ticket_count),
            ticket_id = VALUES(ticket_id),
            attendee_source = 'registration',
            user_email = VALUES(user_email)
        """,
        (
            organizer_event_id,
            attendee_name,
            normalized_attendee_email,
            attendee_phone,
            ticket_type or "Entry Pass",
            max(int(ticket_count or 1), 1),
            build_registered_ticket_code(resolved_event_id, ticket_owner_name),
            normalized_user_email,
        ),
    )


def sync_registration_attendees_for_event(organizer_event_id: int) -> None:
    has_booking_status = table_has_column("user_event_registrations", "booking_status")
    public_event_id = build_public_organizer_event_id(organizer_event_id)
    booking_status_select = "booking_status" if has_booking_status else "'active'"

    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                UPDATE organizer_event_attendees
                SET attendee_status = 'removed'
                WHERE organizer_event_id = %s
                  AND attendee_source = 'registration'
                """,
                (organizer_event_id,),
            )

            cursor.execute(
                f"""
                SELECT
                    user_email,
                    event_id,
                    attendee_name,
                    attendee_email,
                    attendee_phone,
                    ticket_type,
                    ticket_count,
                    {booking_status_select} AS booking_status
                FROM user_event_registrations
                WHERE event_id IN (%s, %s)
                ORDER BY registered_at DESC
                """,
                (str(organizer_event_id), public_event_id),
            )
            rows = cursor.fetchall()

            for row in rows:
                sync_registration_attendee(
                    cursor,
                    str(row[0] or ""),
                    str(row[1] or ""),
                    str(row[2] or ""),
                    str(row[3] or ""),
                    str(row[4] or ""),
                    str(row[5] or "Entry Pass"),
                    int(row[6] or 1),
                    str(row[7] or "active"),
                )

        connection.commit()


def sync_registration_attendees_for_organizer(organizer_email: str) -> None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT id
                FROM organizer_events
                WHERE organizer_email = %s
                ORDER BY created_at DESC
                """,
                (organizer_email,),
            )
            event_ids = [int(row[0]) for row in cursor.fetchall() if row and row[0]]

    for event_id in event_ids:
        sync_registration_attendees_for_event(event_id)


def sync_existing_registration_attendees() -> None:
    has_booking_status = table_has_column("user_event_registrations", "booking_status")

    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                UPDATE organizer_event_attendees
                SET attendee_status = 'removed'
                WHERE attendee_source = 'registration'
                """
            )

            booking_status_select = "booking_status" if has_booking_status else "'active'"
            cursor.execute(
                f"""
                SELECT
                    user_email,
                    event_id,
                    attendee_name,
                    attendee_email,
                    attendee_phone,
                    ticket_type,
                    ticket_count,
                    {booking_status_select} AS booking_status
                FROM user_event_registrations
                ORDER BY registered_at DESC
                """
            )
            rows = cursor.fetchall()

            for row in rows:
                sync_registration_attendee(
                    cursor,
                    str(row[0] or ""),
                    str(row[1] or ""),
                    str(row[2] or ""),
                    str(row[3] or ""),
                    str(row[4] or ""),
                    str(row[5] or "Entry Pass"),
                    int(row[6] or 1),
                    str(row[7] or "active"),
                )

        connection.commit()


def upcoming_catalog_events() -> list[dict[str, str]]:
    now = datetime.now().date()
    events: list[dict[str, str]] = []

    for event in public_event_catalog():
        event_date_raw = str(event.get("eventDate", ""))
        is_upcoming = False

        try:
            event_date = datetime.strptime(event_date_raw, "%B %d, %Y").date()
            is_upcoming = event_date >= now
        except ValueError:
            is_upcoming = str(event.get("status", "")).lower() == "upcoming"

        if not is_upcoming:
            continue

        events.append(
            {
                "eventName": event.get("eventName", ""),
                "eventDate": event_date_raw,
                "eventTime": event.get("eventTime", ""),
                "location": event.get("location", ""),
                "ticketType": event.get("ticketType", ""),
                "seatInfo": event.get("seatInfo", ""),
                "price": event.get("price", ""),
                "status": "upcoming",
                "imageUrl": event.get("imageUrl", ""),
                "owner": "",
            }
        )

    return events


def registered_tickets_for_user(user: dict[str, str]) -> list[dict[str, str]]:
    bookings = booking_records_for_user(user)
    tickets: list[dict[str, str]] = []
    for booking in bookings:
        if booking["bookingStatus"] != "active":
            continue

        event = get_event_by_id(booking["eventId"])
        if event is None:
            continue

        ticket = build_registered_ticket(event, user["name"])
        ticket["eventId"] = booking["eventId"]
        ticket["ticketType"] = booking["ticketType"] or ticket["ticketType"]
        ticket["price"] = booking["bookingPrice"] or ticket["price"]
        ticket["seatInfo"] = booking["seatInfo"] or ticket["seatInfo"]
        tickets.append(ticket)

    return tickets


def registered_event_ids_for_user(user_email: str) -> list[str]:
    has_booking_status = table_has_column("user_event_registrations", "booking_status")

    with get_connection() as connection:
        with connection.cursor() as cursor:
            query = """
                SELECT event_id
                FROM user_event_registrations
                WHERE user_email = %s
            """
            if has_booking_status:
                query += "\n                  AND booking_status = 'active'"
            query += "\n                ORDER BY registered_at DESC"
            cursor.execute(query, (user_email,))
            rows = cursor.fetchall()

    return [str(event_id) for (event_id,) in rows]


def build_booking_record(
    user_name: str,
    event: dict[str, str],
    row: tuple[object, ...],
) -> dict[str, object]:
    (
        booking_id,
        attendee_name,
        attendee_email,
        attendee_phone,
        ticket_type,
        ticket_count,
        city,
        payment_method,
        address,
        special_request,
        booking_status,
        registered_at,
        canceled_at,
    ) = row
    ticket = build_registered_ticket(event, user_name)
    base_price = str(event.get("price", ""))
    resolved_ticket_type = ticket_type or event["ticketType"]
    total_price = calculate_booking_price(base_price, resolved_ticket_type, int(ticket_count or 1))

    return {
        "bookingId": booking_id,
        "eventId": event["id"],
        "eventName": event["eventName"],
        "eventDate": event["eventDate"],
        "eventTime": event["eventTime"],
        "location": event["location"],
        "category": event["category"],
        "organizerPhone": event.get("organizerPhone", ""),
        "imageUrl": event["imageUrl"],
        "ticketCode": ticket["ticketCode"],
        "ticketType": resolved_ticket_type,
        "ticketCount": int(ticket_count or 1),
        "seatInfo": event["seatInfo"],
        "bookingPrice": total_price,
        "paymentMethod": payment_method,
        "city": city,
        "address": address or "",
        "specialRequest": special_request or "",
        "attendeeName": attendee_name,
        "attendeeEmail": attendee_email,
        "attendeePhone": attendee_phone,
        "bookingStatus": booking_status or "active",
        "registeredAt": registered_at.isoformat() if registered_at else "",
        "canceledAt": canceled_at.isoformat() if canceled_at else "",
    }


def booking_records_for_user(user: dict[str, str]) -> list[dict[str, object]]:
    has_booking_status = table_has_column("user_event_registrations", "booking_status")
    has_canceled_at = table_has_column("user_event_registrations", "canceled_at")

    with get_connection() as connection:
        with connection.cursor() as cursor:
            booking_status_select = "booking_status" if has_booking_status else "'active'"
            canceled_at_select = "canceled_at" if has_canceled_at else "NULL"
            cursor.execute(
                f"""
                SELECT
                    id,
                    attendee_name,
                    attendee_email,
                    attendee_phone,
                    ticket_type,
                    ticket_count,
                    city,
                    payment_method,
                    address,
                    special_request,
                    {booking_status_select} AS booking_status,
                    registered_at,
                    {canceled_at_select} AS canceled_at,
                    event_id
                FROM user_event_registrations
                WHERE user_email = %s
                ORDER BY registered_at DESC
                """,
                (user["email"],),
            )
            rows = cursor.fetchall()

    bookings: list[dict[str, object]] = []
    for row in rows:
        event_id = str(row[13])
        event = get_event_by_id(event_id)
        if event is None:
            continue
        bookings.append(build_booking_record(user["name"], event, row[:13]))

    return bookings


def user_profile_for_email(user_email: str) -> dict[str, object] | None:
    has_phone = table_has_column("users", "phone")
    has_bio = table_has_column("users", "bio")
    has_profile_image = table_has_column("users", "profile_image")
    phone_select = "phone" if has_phone else "''"
    bio_select = "bio" if has_bio else "''"
    profile_image_select = "profile_image" if has_profile_image else "NULL"

    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                f"""
                SELECT
                    name,
                    email,
                    role,
                    {phone_select} AS phone,
                    {bio_select} AS bio,
                    {profile_image_select} AS profile_image,
                    COALESCE(admin_status, 'active') AS admin_status,
                    COALESCE(admin_warning_count, 0) AS admin_warning_count,
                    COALESCE(admin_note, '') AS admin_note,
                    created_at
                FROM users
                WHERE email = %s
                """,
                (user_email,),
            )
            row = cursor.fetchone()

    if row is None:
        return None

    name, email, role, phone, bio, profile_image, admin_status, admin_warning_count, admin_note, created_at = row
    return {
        "name": str(name or ""),
        "email": str(email or ""),
        "role": str(role or ""),
        "phone": str(phone or ""),
        "bio": str(bio or ""),
        "profile_image": str(profile_image or ""),
        "admin_status": normalize_admin_status(admin_status),
        "admin_warning_count": int(admin_warning_count or 0),
        "admin_note": str(admin_note or ""),
        "created_at": created_at.isoformat() if created_at else "",
    }


def add_column_if_missing(cursor, table_name: str, column_name: str, definition: str) -> None:
    cursor.execute(
        """
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = %s AND table_name = %s AND column_name = %s
        """,
        (DB_CONFIG["database"], table_name, column_name),
    )
    if cursor.fetchone() is None:
        cursor.execute(f"ALTER TABLE {table_name} ADD COLUMN {column_name} {definition}")


def table_has_column(table_name: str, column_name: str) -> bool:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT 1
                FROM information_schema.columns
                WHERE table_schema = %s AND table_name = %s AND column_name = %s
                """,
                (DB_CONFIG["database"], table_name, column_name),
            )
            return cursor.fetchone() is not None


def init_db() -> None:
    with mysql.connector.connect(
        host=DB_CONFIG["host"],
        port=DB_CONFIG["port"],
        user=DB_CONFIG["user"],
        password=DB_CONFIG["password"],
    ) as bootstrap_connection:
        with bootstrap_connection.cursor() as cursor:
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS `{DB_CONFIG['database']}`")
        bootstrap_connection.commit()

    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    role ENUM('user', 'organizer', 'admin') NOT NULL,
                    admin_status VARCHAR(20) NOT NULL DEFAULT 'active',
                    admin_warning_count INT NOT NULL DEFAULT 0,
                    admin_note TEXT NULL,
                    phone VARCHAR(40) NOT NULL DEFAULT '',
                    bio TEXT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
                """
            )
            cursor.execute(
                """
                ALTER TABLE users
                MODIFY COLUMN role ENUM('user', 'organizer', 'admin') NOT NULL
                """
            )
            add_column_if_missing(cursor, "users", "admin_status", "VARCHAR(20) NOT NULL DEFAULT 'active'")
            add_column_if_missing(cursor, "users", "admin_warning_count", "INT NOT NULL DEFAULT 0")
            add_column_if_missing(cursor, "users", "admin_note", "TEXT NULL")
            add_column_if_missing(cursor, "users", "phone", "VARCHAR(40) NOT NULL DEFAULT ''")
            add_column_if_missing(cursor, "users", "bio", "TEXT NULL")
            add_column_if_missing(cursor, "users", "profile_image", "VARCHAR(500) DEFAULT NULL")
            add_column_if_missing(cursor, "users", "created_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS user_event_registrations (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    user_email VARCHAR(255) NOT NULL,
                    event_id VARCHAR(255) NOT NULL,
                    attendee_name VARCHAR(255) NOT NULL DEFAULT '',
                    attendee_email VARCHAR(255) NOT NULL DEFAULT '',
                    attendee_phone VARCHAR(40) NOT NULL DEFAULT '',
                    ticket_type VARCHAR(255) NOT NULL DEFAULT '',
                    ticket_count INT NOT NULL DEFAULT 1,
                    city VARCHAR(255) NOT NULL DEFAULT '',
                    payment_method VARCHAR(50) NOT NULL DEFAULT '',
                    address TEXT NULL,
                    special_request TEXT NULL,
                    consent_accepted BOOLEAN NOT NULL DEFAULT FALSE,
                    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE KEY unique_user_event (user_email, event_id)
                )
                """
            )
            add_column_if_missing(cursor, "user_event_registrations", "attendee_name", "VARCHAR(255) NOT NULL DEFAULT ''")
            add_column_if_missing(cursor, "user_event_registrations", "attendee_email", "VARCHAR(255) NOT NULL DEFAULT ''")
            add_column_if_missing(cursor, "user_event_registrations", "attendee_phone", "VARCHAR(40) NOT NULL DEFAULT ''")
            add_column_if_missing(cursor, "user_event_registrations", "ticket_type", "VARCHAR(255) NOT NULL DEFAULT ''")
            add_column_if_missing(cursor, "user_event_registrations", "ticket_count", "INT NOT NULL DEFAULT 1")
            add_column_if_missing(cursor, "user_event_registrations", "city", "VARCHAR(255) NOT NULL DEFAULT ''")
            add_column_if_missing(cursor, "user_event_registrations", "payment_method", "VARCHAR(50) NOT NULL DEFAULT ''")
            add_column_if_missing(cursor, "user_event_registrations", "address", "TEXT NULL")
            add_column_if_missing(cursor, "user_event_registrations", "special_request", "TEXT NULL")
            add_column_if_missing(cursor, "user_event_registrations", "consent_accepted", "BOOLEAN NOT NULL DEFAULT FALSE")
            add_column_if_missing(cursor, "user_event_registrations", "booking_status", "VARCHAR(20) NOT NULL DEFAULT 'active'")
            add_column_if_missing(cursor, "user_event_registrations", "canceled_at", "TIMESTAMP NULL DEFAULT NULL")
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS contact_messages (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    message TEXT NOT NULL,
                    email_delivery_status ENUM('pending', 'sent', 'failed') NOT NULL DEFAULT 'pending',
                    email_delivery_error TEXT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
                """
            )
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS organizer_events (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    organizer_email VARCHAR(255) NOT NULL,
                    title VARCHAR(255) NOT NULL,
                    category VARCHAR(100) NOT NULL DEFAULT 'general',
                    event_date DATE NOT NULL,
                    event_time TIME NOT NULL,
                    venue VARCHAR(255) NOT NULL,
                    ticket_price INT NOT NULL DEFAULT 0,
                    capacity INT NOT NULL DEFAULT 0,
                    description TEXT NULL,
                    poster_url VARCHAR(500) NULL,
                    event_status VARCHAR(20) NOT NULL DEFAULT 'published',
                    event_mode VARCHAR(20) NOT NULL DEFAULT 'venue',
                    ticket_pricing_mode VARCHAR(20) NOT NULL DEFAULT 'paid',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
                """
            )
            add_column_if_missing(cursor, "organizer_events", "category", "VARCHAR(100) NOT NULL DEFAULT 'general'")
            add_column_if_missing(cursor, "organizer_events", "description", "TEXT NULL")
            add_column_if_missing(cursor, "organizer_events", "poster_url", "VARCHAR(500) NULL")
            add_column_if_missing(cursor, "organizer_events", "event_status", "VARCHAR(20) NOT NULL DEFAULT 'published'")
            add_column_if_missing(cursor, "organizer_events", "event_mode", "VARCHAR(20) NOT NULL DEFAULT 'venue'")
            add_column_if_missing(cursor, "organizer_events", "ticket_pricing_mode", "VARCHAR(20) NOT NULL DEFAULT 'paid'")
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS organizer_event_attendees (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    organizer_event_id INT NOT NULL,
                    attendee_name VARCHAR(255) NOT NULL,
                    attendee_email VARCHAR(255) NOT NULL,
                    attendee_phone VARCHAR(50) NOT NULL DEFAULT '',
                    attendee_status VARCHAR(20) NOT NULL DEFAULT 'active',
                    attendee_source VARCHAR(20) NOT NULL DEFAULT 'organizer',
                    user_email VARCHAR(255) NOT NULL DEFAULT '',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE KEY unique_event_attendee_email (organizer_event_id, attendee_email),
                    KEY idx_organizer_event_id (organizer_event_id)
                )
                """
            )
            add_column_if_missing(cursor, "organizer_event_attendees", "attendee_phone", "VARCHAR(50) NOT NULL DEFAULT ''")
            add_column_if_missing(cursor, "organizer_event_attendees", "attendee_status", "VARCHAR(20) NOT NULL DEFAULT 'active'")
            add_column_if_missing(cursor, "organizer_event_attendees", "ticket_type", "VARCHAR(100) NOT NULL DEFAULT 'Entry Pass'")
            add_column_if_missing(cursor, "organizer_event_attendees", "ticket_count", "INT NOT NULL DEFAULT 1")
            add_column_if_missing(cursor, "organizer_event_attendees", "ticket_id", "VARCHAR(120) NOT NULL DEFAULT ''")
            add_column_if_missing(cursor, "organizer_event_attendees", "attendee_source", "VARCHAR(20) NOT NULL DEFAULT 'organizer'")
            add_column_if_missing(cursor, "organizer_event_attendees", "user_email", "VARCHAR(255) NOT NULL DEFAULT ''")
            ensure_admin_account(cursor)
        connection.commit()
    sync_existing_registration_attendees()


def render_template(relative_path: str, context: dict[str, str] | None = None) -> bytes:
    template_path = WEBAPP_DIR / relative_path
    content = template_path.read_text(encoding="utf-8")

    for key, value in (context or {}).items():
        content = content.replace(f"{{{{{key}}}}}", value)

    return content.encode("utf-8")


def resolve_asset(asset_path: str) -> Path | None:
    relative_path = Path(unquote(asset_path))
    if relative_path.is_absolute():
        return None

    candidate = (WEBAPP_DIR / relative_path).resolve()
    if WEBAPP_DIR.resolve() not in candidate.parents or not candidate.is_file():
        return None

    return candidate


class EventHubHandler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        path = parsed.path
        query = parse_qs(parsed.query)

        if path in ("/", "/home"):
            self.serve_html("home/home.html")
            return

        if path == "/register":
            self.serve_register_page(query)
            return

        if path == "/login":
            self.serve_login_page(query)
            return

        if path == "/dashboard/user":
            user = self.require_session()
            if user is None:
                return
            if user["role"] == "organizer":
                self.redirect("/dashboard/organizer")
                return
            if user["role"] == "admin":
                self.redirect("/dashboard/admin")
                return
            self.serve_html("dashboard/user/user.html")
            return

        if path == "/dashboard/admin":
            user = self.require_session()
            if user is None:
                return
            if user["role"] != "admin":
                if user["role"] == "organizer":
                    self.redirect("/dashboard/organizer")
                    return
                self.redirect("/dashboard/user")
                return
            self.serve_html("dashboard/admin/admin.html")
            return

        if path == "/dashboard/organizer":
            user = self.require_session()
            if user is None:
                return
            if user["role"] == "admin":
                self.redirect("/dashboard/admin")
                return
            if user["role"] != "organizer":
                self.redirect("/dashboard/user")
                return
            self.serve_html("dashboard/organizer/organizer.html")
            return

        if path in (
            "/dashboard/organizer/events",
            "/dashboard/organizer/events/",
            "/dashboard/organizer/myevents",
            "/dashboard/organizer/myevents.html",
            "/assets/dashboard/organizer/events",
            "/assets/dashboard/organizer/events/",
            "/assets/dashboard/organizer/myevents",
            "/assets/dashboard/organizer/myevents.html",
        ):
            user = self.require_session()
            if user is None:
                return
            if user["role"] != "organizer":
                self.redirect("/dashboard/user")
                return
            self.serve_html("dashboard/organizer/myevents.html")
            return

        if path in (
            "/dashboard/organizer/manage-users",
            "/dashboard/organizer/manage-users/",
            "/assets/dashboard/organizer/manage-users",
            "/assets/dashboard/organizer/manageusers.html",
        ):
            user = self.require_session()
            if user is None:
                return
            if user["role"] != "organizer":
                self.redirect("/dashboard/user")
                return
            self.serve_html("dashboard/organizer/manageusers.html")
            return

        if path == "/userdashboardservlet":
            self.serve_user_dashboard_data()
            return

        if path == "/organizerdashboardservlet":
            self.serve_organizer_dashboard_data()
            return

        if path == "/adminorganizersservlet":
            self.serve_admin_organizers_data()
            return

        if path == "/adminorganizerdetailservlet":
            self.serve_admin_organizer_detail(query)
            return

        if path == "/adminusersservlet":
            self.serve_admin_users_data()
            return

        if path == "/adminuserdetailservlet":
            self.serve_admin_user_detail(query)
            return

        if path == "/adminbrowseeventsservlet":
            self.serve_admin_browse_events()
            return

        if path == "/organizereventsservlet":
            self.serve_organizer_events_data()
            return

        if path == "/organizereventdetailservlet":
            self.serve_organizer_event_detail(query)
            return

        if path in ("/organizer-event-attendees-servlet", "/assets/organizer-event-attendees-servlet"):
            self.serve_organizer_event_attendees(query)
            return

        if path == "/ticketsservlet":
            self.serve_tickets_data()
            return

        if path == "/bookingsservlet":
            self.serve_bookings_data()
            return

        if path == "/profileservlet":
            self.serve_profile_data()
            return

        if path == "/registeredeventsservlet":
            self.serve_registered_events()
            return

        if path == "/eventscalendarservlet":
            self.serve_calendar_events()
            return

        if path == "/logout":
            self.handle_logout()
            return

        if path.startswith("/assets/"):
            self.serve_asset(path.removeprefix("/assets/"))
            return

        self.send_error(HTTPStatus.NOT_FOUND, "Page not found.")

    def do_POST(self) -> None:
        parsed = urlparse(self.path)

        if parsed.path == "/register":
            self.handle_register()
            return

        if parsed.path == "/login":
            self.handle_login()
            return

        if parsed.path == "/register-event":
            self.handle_event_registration()
            return

        if parsed.path == "/update-booking":
            self.handle_booking_update()
            return

        if parsed.path == "/cancel-booking":
            self.handle_booking_cancellation()
            return

        if parsed.path == "/update-profile":
            self.handle_profile_update()
            return

        if parsed.path == "/update-profile-password":
            self.handle_profile_password_update()
            return

        if parsed.path == "/contact":
            self.handle_contact_message()
            return

        if parsed.path == "/upload-profile-image":
            self.handle_profile_image_upload()
            return

        if parsed.path == "/upload-organizer-poster":
            self.handle_organizer_poster_upload()
            return

        if parsed.path in (
            "/create-organizer-event",
            "/assets/create-organizer-event",
            "/assets/dashboard/organizer/create-organizer-event",
        ):
            self.handle_organizer_event_create()
            return

        if parsed.path in (
            "/update-organizer-event",
            "/assets/update-organizer-event",
            "/assets/dashboard/organizer/update-organizer-event",
        ):
            self.handle_organizer_event_update()
            return

        if parsed.path in (
            "/cancel-organizer-event",
            "/assets/cancel-organizer-event",
            "/assets/dashboard/organizer/cancel-organizer-event",
        ):
            self.handle_organizer_event_cancel()
            return

        if parsed.path in (
            "/publish-organizer-event",
            "/assets/publish-organizer-event",
            "/assets/dashboard/organizer/publish-organizer-event",
        ):
            self.handle_organizer_event_publish()
            return

        if parsed.path in (
            "/organizer-event-attendee-add",
            "/assets/organizer-event-attendee-add",
            "/assets/dashboard/organizer/organizer-event-attendee-add",
        ):
            self.handle_organizer_event_attendee_add()
            return

        if parsed.path in (
            "/organizer-event-attendee-remove",
            "/assets/organizer-event-attendee-remove",
            "/assets/dashboard/organizer/organizer-event-attendee-remove",
        ):
            self.handle_organizer_event_attendee_remove()
            return

        if parsed.path in (
            "/organizer-event-attendee-status",
            "/assets/organizer-event-attendee-status",
            "/assets/dashboard/organizer/organizer-event-attendee-status",
        ):
            self.handle_organizer_event_attendee_status_update()
            return

        if parsed.path == "/admin-organizer-status":
            self.handle_admin_organizer_status_update()
            return

        if parsed.path == "/admin-user-status":
            self.handle_admin_user_status_update()
            return

        self.send_error(HTTPStatus.NOT_FOUND, "Page not found.")

    def serve_html(self, relative_path: str) -> None:
        body = render_template(relative_path)
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def serve_asset(self, asset_path: str) -> None:
        file_path = resolve_asset(asset_path)
        if file_path is None:
            self.send_error(HTTPStatus.NOT_FOUND, "Asset not found.")
            return

        content_type = mimetypes.guess_type(file_path.name)[0] or "application/octet-stream"
        body = file_path.read_bytes()

        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def serve_register_page(self, query: dict[str, list[str]]) -> None:
        context = {
            "STATUS_CLASS": self.status_class(query),
            "STATUS_MESSAGE": html.escape(self.query_value(query, "message") or self.query_value(query, "error")),
            "NAME_VALUE": html.escape(self.query_value(query, "name")),
            "EMAIL_VALUE": html.escape(self.query_value(query, "email")),
            "USER_CHECKED": "checked" if self.query_value(query, "role", "user") == "user" else "",
            "ORGANIZER_CHECKED": "checked" if self.query_value(query, "role", "user") == "organizer" else "",
        }
        self.send_html("register/register.html", context)

    def serve_login_page(self, query: dict[str, list[str]]) -> None:
        context = {
            "STATUS_CLASS": self.status_class(query),
            "STATUS_MESSAGE": html.escape(self.query_value(query, "message") or self.query_value(query, "error")),
            "EMAIL_VALUE": html.escape(self.query_value(query, "email")),
        }
        self.send_html("login/login.html", context)

    def send_html(self, relative_path: str, context: dict[str, str]) -> None:
        body = render_template(relative_path, context)
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def handle_register(self) -> None:
        form = self.read_form_data()
        name = form.get("name", "").strip()
        email = form.get("email", "").strip().lower()
        password = form.get("password", "")
        confirm_password = form.get("confirmPassword", "")
        role = form.get("role", "").strip()

        redirect_values = {"name": name, "email": email, "role": role or "user"}

        if not all([name, email, password, confirm_password, role]):
            self.redirect_with_query("/register", redirect_values | {"error": "All fields are required."})
            return

        if password != confirm_password:
            self.redirect_with_query("/register", redirect_values | {"error": "Passwords do not match."})
            return

        if role not in {"user", "organizer"}:
            self.redirect_with_query("/register", redirect_values | {"error": "Invalid role selected."})
            return

        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1 FROM users WHERE email = %s", (email,))
                existing_user = cursor.fetchone()

                if existing_user:
                    self.redirect_with_query(
                        "/register",
                        redirect_values | {"error": "An account with this email already exists."},
                    )
                    return

                cursor.execute(
                    "INSERT INTO users(name, email, password, role) VALUES(%s, %s, %s, %s)",
                    (name, email, hash_password(password), role),
                )
            connection.commit()

        self.redirect_with_query("/login", {"message": "Registration successful. Please log in."})

    def handle_login(self) -> None:
        form = self.read_form_data()
        email = form.get("email", "").strip().lower()
        password = form.get("password", "")

        if not email or not password:
            self.redirect_with_query("/login", {"email": email, "error": "Email and password are required."})
            return

        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT name, role, password, COALESCE(admin_status, 'active') FROM users WHERE email = %s",
                    (email,),
                )
                user = cursor.fetchone()

        if user is None:
            self.redirect_with_query("/login", {"email": email, "error": "Invalid email or password."})
            return

        name, role, stored_password, admin_status = user
        hashed_password = hash_password(password)

        if hashed_password != stored_password and password != stored_password:
            self.redirect_with_query("/login", {"email": email, "error": "Invalid email or password."})
            return

        normalized_admin_status = normalize_admin_status(admin_status)
        if role in {"user", "organizer"} and normalized_admin_status in {"suspended", "removed"}:
            self.redirect_with_query(
                "/login",
                {
                    "email": email,
                    "error": "This account is currently unavailable. Please contact EventHub admin support.",
                },
            )
            return

        session_id = secrets.token_urlsafe(32)
        SESSIONS[session_id] = {
            "name": name,
            "email": email,
            "role": role,
        }

        if role == "admin":
            self.redirect("/dashboard/admin", cookie=f"session_id={session_id}; Path=/; HttpOnly; SameSite=Lax")
            return

        if role == "organizer":
            self.redirect("/dashboard/organizer", cookie=f"session_id={session_id}; Path=/; HttpOnly; SameSite=Lax")
            return

        self.redirect("/dashboard/user", cookie=f"session_id={session_id}; Path=/; HttpOnly; SameSite=Lax")

    def read_form_data(self) -> dict[str, str]:
        content_length = int(self.headers.get("Content-Length", "0"))
        payload = self.rfile.read(content_length).decode("utf-8")
        parsed = parse_qs(payload, keep_blank_values=True)
        return {key: values[0] for key, values in parsed.items()}

    def redirect_with_query(self, path: str, params: dict[str, str]) -> None:
        filtered = {key: value for key, value in params.items() if value}
        destination = path if not filtered else f"{path}?{urlencode(filtered)}"
        self.redirect(destination)

    def redirect(self, destination: str, cookie: str | None = None) -> None:
        self.send_response(HTTPStatus.SEE_OTHER)
        self.send_header("Location", destination)
        if cookie:
            self.send_header("Set-Cookie", cookie)
        self.end_headers()

    def send_json(self, payload: dict[str, object], status: HTTPStatus = HTTPStatus.OK) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def current_user(self) -> dict[str, str] | None:
        raw_cookie = self.headers.get("Cookie")
        if not raw_cookie:
            return None

        cookie = SimpleCookie()
        cookie.load(raw_cookie)
        session = cookie.get("session_id")
        if session is None:
            return None

        session_data = SESSIONS.get(session.value)
        if session_data is None:
            return None

        session_email = str(session_data["email"]).strip().lower()

        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT name, role, COALESCE(admin_status, 'active')
                    FROM users
                    WHERE email = %s
                    """,
                    (session_email,),
                )
                row = cursor.fetchone()

        if row is None:
            SESSIONS.pop(session.value, None)
            return None

        name, role, admin_status = row
        normalized_role = str(role or "").strip().lower()
        normalized_admin_status = normalize_admin_status(admin_status)

        session_data["name"] = str(name or session_data["name"])
        session_data["role"] = normalized_role

        if normalized_role in {"user", "organizer"} and normalized_admin_status in {"suspended", "removed"}:
            SESSIONS.pop(session.value, None)
            return None

        return {
            "name": str(session_data["name"]),
            "email": session_email,
            "role": normalized_role,
        }

    def require_session(self) -> dict[str, str] | None:
        user = self.current_user()
        if user is None:
            self.redirect("/login")
            return None
        return user

    def serve_user_dashboard_data(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "user":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        profile = user_profile_for_email(user["email"])
        tickets = registered_tickets_for_user(user)
        registered_upcoming_events = [ticket for ticket in tickets if ticket["status"] != "used"]
        upcoming_events = upcoming_catalog_events()
        ticket_by_event_id = {
            str(ticket.get("eventId", "")): ticket
            for ticket in registered_upcoming_events
            if ticket.get("eventId")
        }
        hydrated_upcoming_events: list[dict[str, str]] = []
        for event in upcoming_events:
            event_copy = dict(event)
            matched_ticket = ticket_by_event_id.get(str(event_copy.get("id", "")))
            if matched_ticket:
                event_copy["ticketCode"] = str(matched_ticket.get("ticketCode", ""))
                event_copy["owner"] = str(matched_ticket.get("owner", user["name"]))
            hydrated_upcoming_events.append(event_copy)
        history = [ticket for ticket in tickets if ticket["status"] == "used"]
        total_spent = sum(int("".join(char for char in ticket["price"] if char.isdigit())) for ticket in tickets)
        payload = {
            "userName": user["name"],
            "userEmail": user["email"],
            "userRole": user["role"],
            "adminStatus": str((profile or {}).get("admin_status", "active")),
            "adminWarningCount": int((profile or {}).get("admin_warning_count", 0) or 0),
            "adminNote": str((profile or {}).get("admin_note", "") or ""),
            "stats": {
                "registeredEvents": len(registered_upcoming_events),
                "ticketsPurchased": len(tickets),
                "eventsAttended": len(history),
                "totalSpent": f"Rs {total_spent:,}",
            },
            "upcomingEvents": hydrated_upcoming_events,
            "tickets": tickets,
            "history": history,
        }
        self.send_json(payload)

    def serve_organizer_dashboard_data(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "organizer":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        sync_registration_attendees_for_organizer(user["email"])
        profile = user_profile_for_email(user["email"])
        payload = organizer_dashboard_payload(user["name"], user["email"])
        payload["userEmail"] = user["email"]
        payload["userRole"] = user["role"]
        payload["adminStatus"] = str((profile or {}).get("admin_status", "active"))
        payload["adminWarningCount"] = int((profile or {}).get("admin_warning_count", 0) or 0)
        payload["adminNote"] = str((profile or {}).get("admin_note", "") or "")
        self.send_json(payload)

    def serve_organizer_events_data(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "organizer":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        sync_registration_attendees_for_organizer(user["email"])
        events = organizer_events_for_email(user["email"])
        self.send_json(
            {
                "userName": user["name"],
                "userEmail": user["email"],
                "userRole": user["role"],
                "events": [{key: value for key, value in event.items() if not key.startswith("_")} for event in events],
                "totalEvents": len(events),
            }
        )

    def serve_organizer_event_detail(self, query: dict[str, list[str]]) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "organizer":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        event_id_text = self.query_value(query, "eventId")
        try:
            event_id = int(event_id_text)
        except ValueError:
            self.send_json({"error": "Invalid event ID."}, HTTPStatus.BAD_REQUEST)
            return

        event_detail = organizer_event_detail_for_owner(user["email"], event_id)
        if event_detail is None:
            self.send_json({"error": "Event not found."}, HTTPStatus.NOT_FOUND)
            return

        self.send_json(
            {
                "userName": user["name"],
                "userEmail": user["email"],
                "userRole": user["role"],
                "event": event_detail,
            }
        )

    def serve_organizer_event_attendees(self, query: dict[str, list[str]]) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "organizer":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        event_id_text = self.query_value(query, "eventId")
        try:
            event_id = int(event_id_text)
        except ValueError:
            self.send_json({"error": "Invalid event ID."}, HTTPStatus.BAD_REQUEST)
            return

        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT title
                    FROM organizer_events
                    WHERE id = %s AND organizer_email = %s
                    """,
                    (event_id, user["email"]),
                )
                event_row = cursor.fetchone()
                if event_row is None:
                    self.send_json({"error": "Event not found."}, HTTPStatus.NOT_FOUND)
                    return

        sync_registration_attendees_for_event(event_id)

        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT
                        id,
                        attendee_name,
                        attendee_email,
                        attendee_phone,
                        ticket_type,
                        ticket_count,
                        ticket_id,
                        attendee_status,
                        attendee_source
                    FROM organizer_event_attendees
                    WHERE organizer_event_id = %s AND attendee_status <> 'removed'
                    ORDER BY created_at DESC
                    """,
                    (event_id,),
                )
                attendee_rows = cursor.fetchall()

        attendees = [
            {
                "id": int(row[0]),
                "name": str(row[1] or ""),
                "email": str(row[2] or ""),
                "phone": str(row[3] or ""),
                "ticketType": str(row[4] or "Entry Pass"),
                "ticketCount": int(row[5] or 1),
                "ticketId": str(row[6] or ""),
                "status": str(row[7] or "active"),
                "source": str(row[8] or "organizer"),
            }
            for row in attendee_rows
        ]

        self.send_json(
            {
                "eventId": event_id,
                "eventName": str(event_row[0] or "Event"),
                "attendees": attendees,
                "totalAttendees": len(attendees),
            }
        )

    def serve_admin_organizers_data(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "admin":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        organizers = admin_organizer_summaries()
        self.send_json(
            {
                "userName": user["name"],
                "userEmail": user["email"],
                "userRole": user["role"],
                "organizers": organizers,
                "totalOrganizers": len(organizers),
            }
        )

    def serve_admin_organizer_detail(self, query: dict[str, list[str]]) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "admin":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        organizer_email = self.query_value(query, "email").strip().lower()
        organizer = admin_organizer_detail(organizer_email)
        if organizer is None:
            self.send_json({"error": "Organizer not found."}, HTTPStatus.NOT_FOUND)
            return

        self.send_json(
            {
                "userName": user["name"],
                "userEmail": user["email"],
                "userRole": user["role"],
                "organizer": organizer,
            }
        )

    def serve_admin_users_data(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "admin":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        users = admin_user_summaries()
        self.send_json(
            {
                "userName": user["name"],
                "userEmail": user["email"],
                "userRole": user["role"],
                "users": users,
                "totalUsers": len(users),
            }
        )

    def serve_admin_user_detail(self, query: dict[str, list[str]]) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "admin":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        account_email = self.query_value(query, "email").strip().lower()
        account = admin_user_detail(account_email)
        if account is None:
            self.send_json({"error": "User not found."}, HTTPStatus.NOT_FOUND)
            return

        self.send_json(
            {
                "userName": user["name"],
                "userEmail": user["email"],
                "userRole": user["role"],
                "account": account,
            }
        )

    def serve_admin_browse_events(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "admin":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        events = admin_browse_events()
        self.send_json(
            {
                "userName": user["name"],
                "userEmail": user["email"],
                "userRole": user["role"],
                "events": events,
                "totalEvents": len(events),
            }
        )

    def serve_tickets_data(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "user":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        tickets = registered_tickets_for_user(user)
        summary = {
            "upcoming": sum(ticket["status"] == "upcoming" for ticket in tickets),
            "used": sum(ticket["status"] == "used" for ticket in tickets),
        }
        self.send_json(
            {
                "userName": user["name"],
                "userEmail": user["email"],
                "userRole": user["role"],
                "tickets": tickets,
                "totalTickets": len(tickets),
                "summary": summary,
            }
        )

    def serve_registered_events(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "user":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        registered_event_ids = registered_event_ids_for_user(user["email"])
        self.send_json(
            {
                "userName": user["name"],
                "userEmail": user["email"],
                "userRole": user["role"],
                "registeredEventIds": registered_event_ids
            }
        )

    def serve_calendar_events(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "user":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        registered_ids = set(registered_event_ids_for_user(user["email"]))
        now = datetime.now()
        events: list[dict[str, object]] = []

        for event in public_event_catalog():
            event_copy: dict[str, object] = dict(event)
            event_copy["isRegistered"] = event["id"] in registered_ids

            try:
                event_datetime = datetime.strptime(event["eventDate"], "%B %d, %Y")
                event_copy["isUpcoming"] = event_datetime.date() >= now.date()
            except ValueError:
                event_copy["isUpcoming"] = event.get("status") == "upcoming"

            events.append(event_copy)

        self.send_json(
            {
                "userName": user["name"],
                "userEmail": user["email"],
                "userRole": user["role"],
                "events": events,
            }
        )

    def serve_bookings_data(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "user":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        registered_event_ids = registered_event_ids_for_user(user["email"])
        if not registered_event_ids:
            self.send_json(
                {
                    "userName": user["name"],
                    "userEmail": user["email"],
                    "userRole": user["role"],
                    "bookings": [],
                    "totalBookings": 0,
                }
            )
            return

        bookings = booking_records_for_user(user)
        self.send_json(
            {
                "userName": user["name"],
                "userEmail": user["email"],
                "userRole": user["role"],
                "bookings": bookings,
                "totalBookings": len(bookings),
            }
        )

    def serve_profile_data(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        profile = user_profile_for_email(user["email"])
        if profile is None:
            self.send_json({"error": "Profile not found."}, HTTPStatus.NOT_FOUND)
            return

        self.send_json(
            {
                "userName": profile["name"],
                "userEmail": profile["email"],
                "userRole": profile["role"],
                "phone": profile["phone"],
                "bio": profile["bio"],
                "profileImage": profile["profile_image"],
                "adminStatus": profile["admin_status"],
                "adminWarningCount": profile["admin_warning_count"],
                "adminNote": profile["admin_note"],
            }
        )

    def handle_event_registration(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "user":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        form = self.read_form_data()
        event_id = form.get("eventId", "").strip()
        attendee_name = form.get("attendeeName", "").strip()
        attendee_email = form.get("attendeeEmail", "").strip().lower()
        attendee_phone = form.get("attendeePhone", "").strip()
        ticket_type = form.get("ticketType", "").strip()
        ticket_count_text = form.get("ticketCount", "1").strip()
        city = form.get("city", "").strip()
        payment_method = form.get("paymentMethod", "").strip()
        address = form.get("address", "").strip()
        special_request = form.get("specialRequest", "").strip()
        consent_accepted = form.get("consentAccepted", "").strip().lower() in {"on", "true", "1", "yes"}
        event = get_event_by_id(event_id)

        if event is None:
            self.send_json({"error": "Event not found."}, HTTPStatus.NOT_FOUND)
            return

        if not all([attendee_name, attendee_email, attendee_phone, ticket_type, city, payment_method, address]):
            self.send_json({"error": "Please fill in all required registration fields."}, HTTPStatus.BAD_REQUEST)
            return

        if not consent_accepted:
            self.send_json({"error": "Consent is required to register for the event."}, HTTPStatus.BAD_REQUEST)
            return

        try:
            ticket_count = max(1, int(ticket_count_text))
        except ValueError:
            self.send_json({"error": "Invalid ticket count."}, HTTPStatus.BAD_REQUEST)
            return

        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO user_event_registrations(
                        user_email,
                        event_id,
                        attendee_name,
                        attendee_email,
                        attendee_phone,
                        ticket_type,
                        ticket_count,
                        city,
                        payment_method,
                        address,
                        special_request,
                        consent_accepted
                    )
                    VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    ON DUPLICATE KEY UPDATE
                        attendee_name = VALUES(attendee_name),
                        attendee_email = VALUES(attendee_email),
                        attendee_phone = VALUES(attendee_phone),
                        ticket_type = VALUES(ticket_type),
                        ticket_count = VALUES(ticket_count),
                        city = VALUES(city),
                        payment_method = VALUES(payment_method),
                        address = VALUES(address),
                        special_request = VALUES(special_request),
                        consent_accepted = VALUES(consent_accepted),
                        booking_status = 'active',
                        canceled_at = NULL,
                        registered_at = CURRENT_TIMESTAMP
                    """,
                    (
                        user["email"],
                        event_id,
                        attendee_name,
                        attendee_email,
                        attendee_phone,
                        ticket_type,
                        ticket_count,
                        city,
                        payment_method,
                        address,
                        special_request,
                        consent_accepted,
                    ),
                )
                sync_registration_attendee(
                    cursor,
                    user["email"],
                    event_id,
                    attendee_name,
                    attendee_email,
                    attendee_phone,
                    ticket_type,
                    ticket_count,
                    "active",
                )
            connection.commit()

        ticket = build_registered_ticket(event, user["name"])
        ticket["ticketType"] = ticket_type or event["ticketType"]
        ticket["price"] = calculate_booking_price(event.get("price", ""), ticket["ticketType"], ticket_count)
        self.send_json(
            {
                "message": "Event registered successfully.",
                "ticket": ticket,
                "eventId": event_id,
            }
        )

    def handle_booking_update(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "user":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        form = self.read_form_data()
        booking_id = form.get("bookingId", "").strip()
        attendee_name = form.get("attendeeName", "").strip()
        attendee_email = form.get("attendeeEmail", "").strip().lower()
        attendee_phone = form.get("attendeePhone", "").strip()
        ticket_type = form.get("ticketType", "").strip()
        ticket_count_text = form.get("ticketCount", "1").strip()
        city = form.get("city", "").strip()
        payment_method = form.get("paymentMethod", "").strip()
        address = form.get("address", "").strip()
        special_request = form.get("specialRequest", "").strip()

        if not all([booking_id, attendee_name, attendee_email, attendee_phone, ticket_type, city, payment_method, address]):
            self.send_json({"error": "Please fill in all required booking fields."}, HTTPStatus.BAD_REQUEST)
            return

        try:
            ticket_count = max(1, int(ticket_count_text))
        except ValueError:
            self.send_json({"error": "Invalid ticket count."}, HTTPStatus.BAD_REQUEST)
            return

        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT event_id
                    FROM user_event_registrations
                    WHERE id = %s AND user_email = %s
                    """,
                    (booking_id, user["email"]),
                )
                booking_row = cursor.fetchone()
                if booking_row is None:
                    self.send_json({"error": "Booking not found."}, HTTPStatus.NOT_FOUND)
                    return

                event_id = str(booking_row[0] or "")
                cursor.execute(
                    """
                    UPDATE user_event_registrations
                    SET
                        attendee_name = %s,
                        attendee_email = %s,
                        attendee_phone = %s,
                        ticket_type = %s,
                        ticket_count = %s,
                        city = %s,
                        payment_method = %s,
                        address = %s,
                        special_request = %s,
                        booking_status = 'active',
                        canceled_at = NULL,
                        registered_at = CURRENT_TIMESTAMP
                    WHERE id = %s AND user_email = %s
                    """,
                    (
                        attendee_name,
                        attendee_email,
                        attendee_phone,
                        ticket_type,
                        ticket_count,
                        city,
                        payment_method,
                        address,
                        special_request,
                        booking_id,
                        user["email"],
                    ),
                )
                updated_rows = cursor.rowcount
                if updated_rows > 0:
                    sync_registration_attendee(
                        cursor,
                        user["email"],
                        event_id,
                        attendee_name,
                        attendee_email,
                        attendee_phone,
                        ticket_type,
                        ticket_count,
                        "active",
                    )
            connection.commit()

        if updated_rows == 0:
            self.send_json({"error": "Booking not found."}, HTTPStatus.NOT_FOUND)
            return

        self.send_json({"message": "Booking updated successfully."})

    def handle_booking_cancellation(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "user":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        form = self.read_form_data()
        booking_id = form.get("bookingId", "").strip()

        if not booking_id:
            self.send_json({"error": "Booking ID is required."}, HTTPStatus.BAD_REQUEST)
            return

        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT event_id, attendee_email
                    FROM user_event_registrations
                    WHERE id = %s AND user_email = %s
                    """,
                    (booking_id, user["email"]),
                )
                booking_row = cursor.fetchone()
                if booking_row is None:
                    self.send_json({"error": "Booking not found."}, HTTPStatus.NOT_FOUND)
                    return

                event_id = str(booking_row[0] or "")
                attendee_email = str(booking_row[1] or "")
                cursor.execute(
                    """
                    UPDATE user_event_registrations
                    SET booking_status = 'cancelled', canceled_at = CURRENT_TIMESTAMP
                    WHERE id = %s AND user_email = %s
                    """,
                    (booking_id, user["email"]),
                )
                updated_rows = cursor.rowcount
                if updated_rows > 0:
                    sync_registration_attendee(
                        cursor,
                        user["email"],
                        event_id,
                        "",
                        attendee_email,
                        "",
                        "Entry Pass",
                        1,
                        "cancelled",
                    )
            connection.commit()

        if updated_rows == 0:
            self.send_json({"error": "Booking not found."}, HTTPStatus.NOT_FOUND)
            return

        self.send_json({"message": "Booking cancelled successfully."})

    def handle_organizer_event_create(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "organizer":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        form = self.read_form_data()
        title = form.get("eventTitle", "").strip()
        category = form.get("eventCategory", "general").strip().lower()
        event_date = form.get("eventDate", "").strip()
        event_time = form.get("eventTime", "").strip()
        venue = form.get("venueAddress", "").strip()
        ticket_price_text = form.get("ticketPrice", "0").strip()
        capacity_text = form.get("eventCapacity", "0").strip()
        description = form.get("eventDescription", "").strip()
        event_status = form.get("eventStatus", "published").strip().lower()
        event_mode = form.get("eventMode", "venue").strip().lower()
        ticket_pricing_mode = form.get("ticketPricingMode", "paid").strip().lower()
        poster_url = form.get("posterUrl", "").strip()

        if not all([title, event_date, event_time]):
            self.send_json({"error": "Please fill in all required event fields."}, HTTPStatus.BAD_REQUEST)
            return

        if event_status not in {"draft", "published"}:
            event_status = "published"

        if event_mode not in {"venue", "online"}:
            event_mode = "venue"

        if ticket_pricing_mode not in {"paid", "free"}:
            ticket_pricing_mode = "paid"

        resolved_venue = venue if event_mode == "venue" else "Online Event"
        if event_mode == "venue" and not resolved_venue:
            self.send_json({"error": "Venue address is required for venue events."}, HTTPStatus.BAD_REQUEST)
            return

        try:
            ticket_price = max(0, int(ticket_price_text or "0"))
        except ValueError:
            self.send_json({"error": "Invalid ticket price."}, HTTPStatus.BAD_REQUEST)
            return

        if ticket_pricing_mode == "free":
            ticket_price = 0

        try:
            capacity = max(0, int(capacity_text or "0"))
        except ValueError:
            self.send_json({"error": "Invalid event capacity."}, HTTPStatus.BAD_REQUEST)
            return

        try:
            with get_connection() as connection:
                with connection.cursor() as cursor:
                    cursor.execute(
                        """
                        INSERT INTO organizer_events (
                            organizer_email,
                            title,
                            category,
                            event_date,
                            event_time,
                            venue,
                            ticket_price,
                            capacity,
                            description,
                            poster_url,
                            event_status,
                            event_mode,
                            ticket_pricing_mode
                        )
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        """,
                        (
                            user["email"],
                            title,
                            category or "general",
                            event_date,
                            event_time,
                            resolved_venue,
                            ticket_price,
                            capacity,
                            description,
                            poster_url or "/assets/dashboard/images/dsupimg1.jpg",
                            event_status,
                            event_mode,
                            ticket_pricing_mode,
                        ),
                    )
                connection.commit()
        except mysql.connector.Error as error:
            self.send_json({"error": f"Unable to create event: {error.msg}"}, HTTPStatus.INTERNAL_SERVER_ERROR)
            return

        success_message = "Draft saved successfully." if event_status == "draft" else "Event created successfully."
        self.send_json({"message": success_message}, HTTPStatus.CREATED)

    def handle_organizer_event_update(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "organizer":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        form = self.read_form_data()
        event_id = form.get("eventId", "").strip()
        title = form.get("eventTitle", "").strip()
        category = form.get("eventCategory", "general").strip().lower()
        event_date = form.get("eventDate", "").strip()
        event_time = form.get("eventTime", "").strip()
        venue = form.get("venueAddress", "").strip()
        ticket_price_text = form.get("ticketPrice", "0").strip()
        capacity_text = form.get("eventCapacity", "0").strip()
        description = form.get("eventDescription", "").strip()
        event_mode = form.get("eventMode", "venue").strip().lower()
        ticket_pricing_mode = form.get("ticketPricingMode", "paid").strip().lower()

        if not all([event_id, title, event_date, event_time]):
            self.send_json({"error": "Please fill in all required event fields."}, HTTPStatus.BAD_REQUEST)
            return

        try:
            event_id_value = int(event_id)
        except ValueError:
            self.send_json({"error": "Invalid event ID."}, HTTPStatus.BAD_REQUEST)
            return

        if event_mode not in {"venue", "online"}:
            event_mode = "venue"

        if ticket_pricing_mode not in {"paid", "free"}:
            ticket_pricing_mode = "paid"

        resolved_venue = venue if event_mode == "venue" else "Online Event"
        if event_mode == "venue" and not resolved_venue:
            self.send_json({"error": "Venue address is required for venue events."}, HTTPStatus.BAD_REQUEST)
            return

        try:
            ticket_price = max(0, int(ticket_price_text or "0"))
        except ValueError:
            self.send_json({"error": "Invalid ticket price."}, HTTPStatus.BAD_REQUEST)
            return

        if ticket_pricing_mode == "free":
            ticket_price = 0

        try:
            capacity = max(0, int(capacity_text or "0"))
        except ValueError:
            self.send_json({"error": "Invalid event capacity."}, HTTPStatus.BAD_REQUEST)
            return

        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    UPDATE organizer_events
                    SET
                        title = %s,
                        category = %s,
                        event_date = %s,
                        event_time = %s,
                        venue = %s,
                        ticket_price = %s,
                        capacity = %s,
                        description = %s,
                        event_mode = %s,
                        ticket_pricing_mode = %s
                    WHERE id = %s AND organizer_email = %s
                    """,
                    (
                        title,
                        category or "general",
                        event_date,
                        event_time,
                        resolved_venue,
                        ticket_price,
                        capacity,
                        description,
                        event_mode,
                        ticket_pricing_mode,
                        event_id_value,
                        user["email"],
                    ),
                )
                updated_rows = cursor.rowcount
            connection.commit()

        if updated_rows == 0:
            self.send_json({"error": "Event not found."}, HTTPStatus.NOT_FOUND)
            return

        self.send_json({"message": "Event updated successfully."})

    def handle_organizer_event_cancel(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "organizer":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        form = self.read_form_data()
        event_id = form.get("eventId", "").strip()
        if not event_id:
            self.send_json({"error": "Event ID is required."}, HTTPStatus.BAD_REQUEST)
            return

        try:
            event_id_value = int(event_id)
        except ValueError:
            self.send_json({"error": "Invalid event ID."}, HTTPStatus.BAD_REQUEST)
            return

        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    UPDATE organizer_events
                    SET event_status = 'cancelled'
                    WHERE id = %s AND organizer_email = %s
                    """,
                    (event_id_value, user["email"]),
                )
                updated_rows = cursor.rowcount
            connection.commit()

        if updated_rows == 0:
            self.send_json({"error": "Event not found."}, HTTPStatus.NOT_FOUND)
            return

        self.send_json({"message": "Event cancelled successfully."})

    def handle_organizer_event_publish(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "organizer":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        form = self.read_form_data()
        event_id = form.get("eventId", "").strip()
        if not event_id:
            self.send_json({"error": "Event ID is required."}, HTTPStatus.BAD_REQUEST)
            return

        try:
            event_id_value = int(event_id)
        except ValueError:
            self.send_json({"error": "Invalid event ID."}, HTTPStatus.BAD_REQUEST)
            return

        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT event_status
                    FROM organizer_events
                    WHERE id = %s AND organizer_email = %s
                    """,
                    (event_id_value, user["email"]),
                )
                row = cursor.fetchone()
                if row is None:
                    self.send_json({"error": "Event not found."}, HTTPStatus.NOT_FOUND)
                    return

                current_status = str(row[0] or "draft").lower()
                if current_status != "draft":
                    self.send_json({"error": "Only draft events can be published."}, HTTPStatus.BAD_REQUEST)
                    return

                cursor.execute(
                    """
                    UPDATE organizer_events
                    SET event_status = 'published'
                    WHERE id = %s AND organizer_email = %s
                    """,
                    (event_id_value, user["email"]),
                )
            connection.commit()

        self.send_json({"message": "Event published successfully."})

    def handle_organizer_event_attendee_add(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "organizer":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        form = self.read_form_data()
        event_id_text = form.get("eventId", "").strip()
        attendee_name = form.get("attendeeName", "").strip()
        attendee_email = form.get("attendeeEmail", "").strip().lower()
        attendee_phone = form.get("attendeePhone", "").strip()
        ticket_type = form.get("ticketType", "Entry Pass").strip() or "Entry Pass"
        ticket_count_text = form.get("ticketCount", "1").strip()
        ticket_id = form.get("ticketId", "").strip().upper()

        if not all([event_id_text, attendee_name, attendee_email]):
            self.send_json({"error": "Event ID, attendee name, and email are required."}, HTTPStatus.BAD_REQUEST)
            return

        try:
            event_id = int(event_id_text)
        except ValueError:
            self.send_json({"error": "Invalid event ID."}, HTTPStatus.BAD_REQUEST)
            return

        try:
            ticket_count = max(1, int(ticket_count_text or "1"))
        except ValueError:
            self.send_json({"error": "Invalid ticket count."}, HTTPStatus.BAD_REQUEST)
            return

        resolved_ticket_id = ticket_id or build_organizer_ticket_id(event_id)

        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT 1 FROM organizer_events WHERE id = %s AND organizer_email = %s",
                    (event_id, user["email"]),
                )
                if cursor.fetchone() is None:
                    self.send_json({"error": "Event not found."}, HTTPStatus.NOT_FOUND)
                    return

                cursor.execute(
                    """
                    INSERT INTO organizer_event_attendees(
                        organizer_event_id,
                        attendee_name,
                        attendee_email,
                        attendee_phone,
                        ticket_type,
                        ticket_count,
                        ticket_id,
                        attendee_status,
                        attendee_source,
                        user_email
                    )
                    VALUES(%s, %s, %s, %s, %s, %s, %s, 'active', 'organizer', '')
                    ON DUPLICATE KEY UPDATE
                        attendee_name = VALUES(attendee_name),
                        attendee_phone = VALUES(attendee_phone),
                        ticket_type = VALUES(ticket_type),
                        ticket_count = VALUES(ticket_count),
                        ticket_id = VALUES(ticket_id),
                        attendee_status = 'active',
                        attendee_source = 'organizer',
                        user_email = ''
                    """,
                    (event_id, attendee_name, attendee_email, attendee_phone, ticket_type, ticket_count, resolved_ticket_id),
                )
            connection.commit()

        self.send_json({"message": "Attendee added successfully."}, HTTPStatus.CREATED)

    def handle_organizer_event_attendee_remove(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "organizer":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        form = self.read_form_data()
        attendee_id_text = form.get("attendeeId", "").strip()
        if not attendee_id_text:
            self.send_json({"error": "Attendee ID is required."}, HTTPStatus.BAD_REQUEST)
            return

        try:
            attendee_id = int(attendee_id_text)
        except ValueError:
            self.send_json({"error": "Invalid attendee ID."}, HTTPStatus.BAD_REQUEST)
            return

        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT
                        a.organizer_event_id,
                        a.attendee_email,
                        a.attendee_source,
                        a.user_email
                    FROM organizer_event_attendees AS a
                    JOIN organizer_events AS e ON e.id = a.organizer_event_id
                    WHERE a.id = %s AND e.organizer_email = %s
                    """,
                    (attendee_id, user["email"]),
                )
                attendee_row = cursor.fetchone()
                if attendee_row is None:
                    self.send_json({"error": "Attendee not found."}, HTTPStatus.NOT_FOUND)
                    return

                organizer_event_id = int(attendee_row[0])
                attendee_email = str(attendee_row[1] or "").strip().lower()
                attendee_source = str(attendee_row[2] or "organizer").strip().lower()
                linked_user_email = str(attendee_row[3] or "").strip().lower()

                cursor.execute(
                    """
                    UPDATE organizer_event_attendees AS a
                    JOIN organizer_events AS e ON e.id = a.organizer_event_id
                    SET a.attendee_status = 'removed'
                    WHERE a.id = %s AND e.organizer_email = %s
                    """,
                    (attendee_id, user["email"]),
                )
                updated_rows = cursor.rowcount
                if updated_rows > 0 and attendee_source == "registration":
                    cursor.execute(
                        """
                        UPDATE user_event_registrations
                        SET booking_status = 'cancelled', canceled_at = CURRENT_TIMESTAMP
                        WHERE event_id IN (%s, %s)
                          AND (
                              user_email = %s
                              OR attendee_email = %s
                          )
                        """,
                        (
                            str(organizer_event_id),
                            build_public_organizer_event_id(organizer_event_id),
                            linked_user_email,
                            attendee_email,
                        ),
                    )
            connection.commit()

        if updated_rows == 0:
            self.send_json({"error": "Attendee not found."}, HTTPStatus.NOT_FOUND)
            return

        self.send_json({"message": "Attendee removed successfully."})

    def handle_organizer_event_attendee_status_update(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "organizer":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        form = self.read_form_data()
        attendee_id_text = form.get("attendeeId", "").strip()
        action = form.get("action", "").strip().lower()
        if not attendee_id_text:
            self.send_json({"error": "Attendee ID is required."}, HTTPStatus.BAD_REQUEST)
            return

        if action not in {"approve", "deny", "remove"}:
            self.send_json({"error": "Invalid action."}, HTTPStatus.BAD_REQUEST)
            return

        try:
            attendee_id = int(attendee_id_text)
        except ValueError:
            self.send_json({"error": "Invalid attendee ID."}, HTTPStatus.BAD_REQUEST)
            return

        next_status = "approved" if action == "approve" else "removed"

        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT
                        a.organizer_event_id,
                        a.attendee_email,
                        a.attendee_source,
                        a.user_email
                    FROM organizer_event_attendees AS a
                    JOIN organizer_events AS e ON e.id = a.organizer_event_id
                    WHERE a.id = %s AND e.organizer_email = %s
                    """,
                    (attendee_id, user["email"]),
                )
                attendee_row = cursor.fetchone()
                if attendee_row is None:
                    self.send_json({"error": "Attendee not found."}, HTTPStatus.NOT_FOUND)
                    return

                organizer_event_id = int(attendee_row[0])
                attendee_email = str(attendee_row[1] or "").strip().lower()
                attendee_source = str(attendee_row[2] or "organizer").strip().lower()
                linked_user_email = str(attendee_row[3] or "").strip().lower()

                cursor.execute(
                    """
                    UPDATE organizer_event_attendees AS a
                    JOIN organizer_events AS e ON e.id = a.organizer_event_id
                    SET a.attendee_status = %s
                    WHERE a.id = %s AND e.organizer_email = %s
                    """,
                    (next_status, attendee_id, user["email"]),
                )
                updated_rows = cursor.rowcount
                if updated_rows > 0 and attendee_source == "registration":
                    if next_status == "approved":
                        cursor.execute(
                            """
                            UPDATE user_event_registrations
                            SET booking_status = 'active', canceled_at = NULL
                            WHERE event_id IN (%s, %s)
                              AND (
                                  user_email = %s
                                  OR attendee_email = %s
                              )
                            """,
                            (
                                str(organizer_event_id),
                                build_public_organizer_event_id(organizer_event_id),
                                linked_user_email,
                                attendee_email,
                            ),
                        )
                    else:
                        cursor.execute(
                            """
                            UPDATE user_event_registrations
                            SET booking_status = 'cancelled', canceled_at = CURRENT_TIMESTAMP
                            WHERE event_id IN (%s, %s)
                              AND (
                                  user_email = %s
                                  OR attendee_email = %s
                              )
                            """,
                            (
                                str(organizer_event_id),
                                build_public_organizer_event_id(organizer_event_id),
                                linked_user_email,
                                attendee_email,
                            ),
                        )
            connection.commit()

        if updated_rows == 0:
            self.send_json({"error": "Attendee not found."}, HTTPStatus.NOT_FOUND)
            return

        if next_status == "approved":
            self.send_json({"message": "Attendee approved successfully."})
            return

        self.send_json({"message": "Attendee removed successfully."})

    def handle_organizer_poster_upload(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "organizer":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        content_length = int(self.headers.get("Content-Length", "0"))
        if content_length == 0:
            self.send_json({"error": "No file provided"}, HTTPStatus.BAD_REQUEST)
            return

        content_type = self.headers.get("Content-Type", "")
        if not content_type.startswith("multipart/form-data"):
            self.send_json({"error": "Only multipart/form-data supported"}, HTTPStatus.BAD_REQUEST)
            return

        boundary_key = "boundary="
        if boundary_key not in content_type:
            self.send_json({"error": "Invalid multipart request"}, HTTPStatus.BAD_REQUEST)
            return

        boundary = content_type.split(boundary_key, 1)[1].strip().strip('"')
        if not boundary:
            self.send_json({"error": "Invalid multipart boundary"}, HTTPStatus.BAD_REQUEST)
            return

        raw_data = self.rfile.read(content_length)
        delimiter = f"--{boundary}".encode("utf-8")
        parts = raw_data.split(delimiter)
        image_data: bytes | None = None

        for part in parts:
            part = part.strip()
            if not part or part == b"--":
                continue
            if b"\r\n\r\n" not in part:
                continue

            header_block, body = part.split(b"\r\n\r\n", 1)
            headers_text = header_block.decode("utf-8", errors="ignore")
            if "Content-Disposition: form-data;" not in headers_text:
                continue
            if 'name="posterImage"' not in headers_text:
                continue

            image_data = body.rstrip(b"\r\n")
            if image_data.endswith(b"--"):
                image_data = image_data[:-2].rstrip(b"\r\n")
            break

        if image_data is None:
            self.send_json({"error": "No poster image found"}, HTTPStatus.BAD_REQUEST)
            return

        extension = None
        if image_data.startswith(b"\xff\xd8\xff"):
            extension = "jpg"
        elif image_data.startswith(b"\x89PNG\r\n\x1a\n"):
            extension = "png"

        if extension is None:
            self.send_json({"error": "Only JPG/PNG poster images allowed"}, HTTPStatus.BAD_REQUEST)
            return

        if len(image_data) > 5 * 1024 * 1024:
            self.send_json({"error": "File too large (max 5MB)"}, HTTPStatus.BAD_REQUEST)
            return

        posters_dir = WEBAPP_DIR / "dashboard" / "images" / "posters"
        posters_dir.mkdir(parents=True, exist_ok=True)

        timestamp = int(time.time() * 1000)
        safe_email = "".join(c for c in user["email"] if c.isalnum() or c in ".-_@")
        filename = f"{safe_email}_{timestamp}.{extension}"
        filepath = posters_dir / filename
        filepath.write_bytes(image_data)

        image_url = f"/assets/dashboard/images/posters/{filename}"
        self.send_json({"message": "Poster uploaded successfully.", "imageUrl": image_url})

    def handle_admin_organizer_status_update(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "admin":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        form = self.read_form_data()
        organizer_email = form.get("organizerEmail", "").strip().lower()
        action = form.get("action", "").strip().lower()
        note = form.get("note", "").strip()

        if not organizer_email:
            self.send_json({"error": "Organizer email is required."}, HTTPStatus.BAD_REQUEST)
            return

        if action not in {"warn", "suspend", "remove", "activate"}:
            self.send_json({"error": "Invalid organizer action."}, HTTPStatus.BAD_REQUEST)
            return

        if action == "warn":
            next_status = "warned"
            success_message = "Warning issued successfully."
        elif action == "suspend":
            next_status = "suspended"
            success_message = "Organizer suspended successfully."
        elif action == "remove":
            next_status = "removed"
            success_message = "Organizer removed successfully."
        else:
            next_status = "active"
            success_message = "Organizer reactivated successfully."

        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT 1 FROM users WHERE email = %s AND role = 'organizer'",
                    (organizer_email,),
                )
                if cursor.fetchone() is None:
                    self.send_json({"error": "Organizer not found."}, HTTPStatus.NOT_FOUND)
                    return

                if action == "warn":
                    cursor.execute(
                        """
                        UPDATE users
                        SET
                            admin_status = %s,
                            admin_warning_count = COALESCE(admin_warning_count, 0) + 1,
                            admin_note = %s
                        WHERE email = %s AND role = 'organizer'
                        """,
                        (next_status, note, organizer_email),
                    )
                else:
                    cursor.execute(
                        """
                        UPDATE users
                        SET
                            admin_status = %s,
                            admin_note = %s
                        WHERE email = %s AND role = 'organizer'
                        """,
                        (next_status, note, organizer_email),
                    )
            connection.commit()

        if next_status in {"suspended", "removed"}:
            for session_id, session_data in list(SESSIONS.items()):
                if str(session_data.get("email", "")).strip().lower() == organizer_email:
                    SESSIONS.pop(session_id, None)

        organizer = admin_organizer_detail(organizer_email)
        self.send_json(
            {
                "message": success_message,
                "organizer": organizer,
            }
        )

    def handle_admin_user_status_update(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        if user["role"] != "admin":
            self.send_json({"error": "Forbidden"}, HTTPStatus.FORBIDDEN)
            return

        form = self.read_form_data()
        account_email = form.get("userEmail", "").strip().lower()
        action = form.get("action", "").strip().lower()
        note = form.get("note", "").strip()

        if not account_email:
            self.send_json({"error": "User email is required."}, HTTPStatus.BAD_REQUEST)
            return

        if action not in {"warn", "remove", "activate"}:
            self.send_json({"error": "Invalid user action."}, HTTPStatus.BAD_REQUEST)
            return

        if action == "warn":
            next_status = "warned"
            success_message = "Warning issued successfully."
        elif action == "remove":
            next_status = "removed"
            success_message = "User removed successfully."
        else:
            next_status = "active"
            success_message = "User reactivated successfully."

        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT 1 FROM users WHERE email = %s AND role = 'user'",
                    (account_email,),
                )
                if cursor.fetchone() is None:
                    self.send_json({"error": "User not found."}, HTTPStatus.NOT_FOUND)
                    return

                if action == "warn":
                    cursor.execute(
                        """
                        UPDATE users
                        SET
                            admin_status = %s,
                            admin_warning_count = COALESCE(admin_warning_count, 0) + 1,
                            admin_note = %s
                        WHERE email = %s AND role = 'user'
                        """,
                        (next_status, note, account_email),
                    )
                else:
                    cursor.execute(
                        """
                        UPDATE users
                        SET
                            admin_status = %s,
                            admin_note = %s
                        WHERE email = %s AND role = 'user'
                        """,
                        (next_status, note, account_email),
                    )
            connection.commit()

        if next_status in {"suspended", "removed"}:
            for session_id, session_data in list(SESSIONS.items()):
                if str(session_data.get("email", "")).strip().lower() == account_email:
                    SESSIONS.pop(session_id, None)

        account = admin_user_detail(account_email)
        self.send_json(
            {
                "message": success_message,
                "account": account,
            }
        )

    def handle_profile_update(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        form = self.read_form_data()
        first_name = form.get("firstName", "").strip()
        last_name = form.get("lastName", "").strip()
        phone = form.get("phone", "").strip()
        role = form.get("role", "").strip().lower()
        bio = form.get("bio", "").strip()

        if not first_name:
            self.send_json({"error": "First name is required."}, HTTPStatus.BAD_REQUEST)
            return

        if role not in {"user", "organizer", "admin"}:
            self.send_json({"error": "Invalid role selected."}, HTTPStatus.BAD_REQUEST)
            return

        full_name = " ".join(part for part in [first_name, last_name] if part).strip()
        has_phone = table_has_column("users", "phone")
        has_bio = table_has_column("users", "bio")
        update_fields = ["name = %s", "role = %s"]
        update_values: list[object] = [full_name, role]

        if has_phone:
            update_fields.append("phone = %s")
            update_values.append(phone)

        if has_bio:
            update_fields.append("bio = %s")
            update_values.append(bio)

        update_values.append(user["email"])

        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    f"""
                    UPDATE users
                    SET {", ".join(update_fields)}
                    WHERE email = %s
                    """,
                    tuple(update_values),
                )
            connection.commit()

        raw_cookie = self.headers.get("Cookie")
        if raw_cookie:
            cookie = SimpleCookie()
            cookie.load(raw_cookie)
            session = cookie.get("session_id")
            if session is not None and session.value in SESSIONS:
                SESSIONS[session.value]["name"] = full_name
                SESSIONS[session.value]["role"] = role

        self.send_json(
            {
                "message": "Profile updated successfully.",
                "userName": full_name,
                "userEmail": user["email"],
                "userRole": role,
                "phone": phone,
                "bio": bio,
            }
        )

    def handle_profile_password_update(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        form = self.read_form_data()
        current_password = form.get("currentPassword", "")
        new_password = form.get("newPassword", "")
        confirm_password = form.get("confirmPassword", "")

        if not all([current_password, new_password, confirm_password]):
            self.send_json({"error": "Please complete all password fields."}, HTTPStatus.BAD_REQUEST)
            return

        if new_password != confirm_password:
            self.send_json({"error": "New password and confirm password do not match."}, HTTPStatus.BAD_REQUEST)
            return

        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT password FROM users WHERE email = %s",
                    (user["email"],),
                )
                row = cursor.fetchone()

                if row is None:
                    self.send_json({"error": "User not found."}, HTTPStatus.NOT_FOUND)
                    return

                stored_password = str(row[0] or "")
                if stored_password not in {current_password, hash_password(current_password)}:
                    self.send_json({"error": "Current password is incorrect."}, HTTPStatus.BAD_REQUEST)
                    return

                cursor.execute(
                    "UPDATE users SET password = %s WHERE email = %s",
                    (hash_password(new_password), user["email"]),
                )
            connection.commit()

        self.send_json({"message": "Password updated successfully."})

    def handle_contact_message(self) -> None:
        form = self.read_form_data()
        name = form.get("name", "").strip()
        email = form.get("email", "").strip().lower()
        message = form.get("message", "").strip()

        if not all([name, email, message]):
            self.send_json({"error": "Name, email, and message are required."}, HTTPStatus.BAD_REQUEST)
            return

        message_id: int | None = None

        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO contact_messages(name, email, message)
                    VALUES(%s, %s, %s)
                    """,
                    (name, email, message),
                )
                message_id = cursor.lastrowid
            connection.commit()

        try:
            send_contact_email(name, email, message)
            delivery_status = "sent"
            delivery_error = None
        except Exception as exc:
            delivery_status = "failed"
            delivery_error = str(exc)

        if message_id is not None:
            with get_connection() as connection:
                with connection.cursor() as cursor:
                    cursor.execute(
                        """
                        UPDATE contact_messages
                        SET email_delivery_status = %s, email_delivery_error = %s
                        WHERE id = %s
                        """,
                        (delivery_status, delivery_error, message_id),
                    )
                connection.commit()

        response_payload = {"message": "Request sent successfully."}
        if delivery_status == "failed":
            response_payload["emailWarning"] = "Message saved in database, but Gmail delivery is not configured yet."

        self.send_json(response_payload)

    def handle_profile_image_upload(self) -> None:
        user = self.current_user()
        if user is None:
            self.send_json({"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED)
            return

        content_length = int(self.headers.get("Content-Length", "0"))
        if content_length == 0:
            self.send_json({"error": "No file provided"}, HTTPStatus.BAD_REQUEST)
            return

        content_type = self.headers.get("Content-Type", "")
        if not content_type.startswith("multipart/form-data"):
            self.send_json({"error": "Only multipart/form-data supported"}, HTTPStatus.BAD_REQUEST)
            return

        boundary_key = "boundary="
        if boundary_key not in content_type:
            self.send_json({"error": "Invalid multipart request"}, HTTPStatus.BAD_REQUEST)
            return

        boundary = content_type.split(boundary_key, 1)[1].strip().strip('"')
        if not boundary:
            self.send_json({"error": "Invalid multipart boundary"}, HTTPStatus.BAD_REQUEST)
            return

        raw_data = self.rfile.read(content_length)

        # Parse multipart body for `image` field.
        delimiter = f"--{boundary}".encode("utf-8")
        parts = raw_data.split(delimiter)
        image_data: bytes | None = None

        for part in parts:
            part = part.strip()
            if not part or part == b"--":
                continue

            if b"\r\n\r\n" not in part:
                continue

            header_block, body = part.split(b"\r\n\r\n", 1)
            headers_text = header_block.decode("utf-8", errors="ignore")
            if "Content-Disposition: form-data;" not in headers_text:
                continue
            if 'name="image"' not in headers_text:
                continue

            image_data = body.rstrip(b"\r\n")
            if image_data.endswith(b"--"):
                image_data = image_data[:-2].rstrip(b"\r\n")
            break

        if image_data is None:
            self.send_json({"error": "No image file found"}, HTTPStatus.BAD_REQUEST)
            return

        # Validate image signature and choose extension.
        extension = None
        if image_data.startswith(b"\xff\xd8\xff"):
            extension = "jpg"
        elif image_data.startswith(b"\x89PNG\r\n\x1a\n"):
            extension = "png"

        if extension is None:
            self.send_json({"error": "Only JPG/PNG images allowed"}, HTTPStatus.BAD_REQUEST)
            return

        if len(image_data) > 2 * 1024 * 1024:
            self.send_json({"error": "File too large (max 2MB)"}, HTTPStatus.BAD_REQUEST)
            return

        # Create profiles dir
        profiles_dir = WEBAPP_DIR / "dashboard" / "images" / "profiles"
        profiles_dir.mkdir(parents=True, exist_ok=True)

        # Generate filename
        timestamp = int(time.time() * 1000)
        safe_email = "".join(c for c in user["email"] if c.isalnum() or c in ".-_@")
        filename = f"{safe_email}_{timestamp}.{extension}"
        filepath = profiles_dir / filename

        # Save file
        filepath.write_bytes(image_data)

        # Update DB
        image_url = f"/assets/dashboard/images/profiles/{filename}"
        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    "UPDATE users SET profile_image = %s WHERE email = %s",
                    (image_url, user["email"])
                )
            connection.commit()

        self.send_json({
            "success": True,
            "message": "Profile image uploaded successfully",
            "imageUrl": image_url
        })

    def handle_logout(self) -> None:
        raw_cookie = self.headers.get("Cookie")
        if raw_cookie:
            cookie = SimpleCookie()
            cookie.load(raw_cookie)
            session = cookie.get("session_id")
            if session is not None:
                SESSIONS.pop(session.value, None)

        self.redirect("/home", cookie="session_id=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0")

    @staticmethod
    def query_value(query: dict[str, list[str]], key: str, default: str = "") -> str:
        values = query.get(key)
        return values[0] if values else default

    @staticmethod
    def status_class(query: dict[str, list[str]]) -> str:
        if query.get("error"):
            return "status-banner error"
        if query.get("message"):
            return "status-banner success"
        return "status-banner hidden"


def run() -> None:
    init_db()
    server = ThreadingHTTPServer(("127.0.0.1", 8000), EventHubHandler)
    print(
        f"EventHub server running at http://127.0.0.1:8000 using MySQL database '{DB_CONFIG['database']}'"
    )
    server.serve_forever()


if __name__ == "__main__":
    run()
