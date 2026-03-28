function toggleSidebar(){

const sidebar = document.querySelector(".sidebar");

sidebar.classList.toggle("active");

}

document.querySelectorAll(".menu li").forEach(item => {

item.addEventListener("click", () => {

const sidebar = document.querySelector(".sidebar");

sidebar.classList.remove("active");

});

});

const menuItems = document.querySelectorAll(".menu li");

menuItems.forEach(item => {

item.addEventListener("click", () => {

menuItems.forEach(i => i.classList.remove("active"));

item.classList.add("active");

});

});

const organizerSidebarUserName = document.getElementById("organizerSidebarUserName");
const organizerPageTitle = document.getElementById("organizerPageTitle");
const organizerStats = document.getElementById("organizerStats");
const organizerContent = document.getElementById("organizerContent");
const organizerHistorySection = document.getElementById("organizerHistorySection");
const organizerEmptyState = document.getElementById("organizerEmptyState");
const organizerManagedEvents = document.getElementById("organizerManagedEvents");
const organizerActivityList = document.getElementById("organizerActivityList");
const organizerSalesList = document.getElementById("organizerSalesList");
const organizerNotificationsList = document.getElementById("organizerNotificationsList");
const organizerCompletedEvents = document.getElementById("organizerCompletedEvents");
const organizerActiveEvents = document.getElementById("organizerActiveEvents");
const organizerTotalAttendees = document.getElementById("organizerTotalAttendees");
const organizerCheckinRate = document.getElementById("organizerCheckinRate");
const organizerRevenue = document.getElementById("organizerRevenue");
const logoutLink = document.querySelector(".logout");
const createEventForm = document.getElementById("createEventForm");
const createEventStatus = document.getElementById("createEventStatus");
const draftEventButton = document.getElementById("draftEventButton");
const publishEventButton = document.getElementById("publishEventButton");
const eventStatusField = document.getElementById("eventStatus");
const eventModeField = document.getElementById("eventMode");
const ticketPricingModeField = document.getElementById("ticketPricingMode");
const venueAddressWrap = document.getElementById("venueAddressWrap");
const venueAddressInput = document.getElementById("venueAddress");
const eventModeGroup = document.getElementById("eventModeGroup");
const ticketPricingGroup = document.getElementById("ticketPricingGroup");
const ticketPriceWrap = document.getElementById("ticketPriceWrap");
const ticketPriceInput = document.getElementById("ticketPrice");
const posterUploadBox = document.getElementById("posterUploadBox");
const posterImageInput = document.getElementById("posterImageInput");
const posterUploadMeta = document.getElementById("posterUploadMeta");
const posterUrlField = document.getElementById("posterUrl");
const organizerEventsPageTitle = document.getElementById("organizerEventsPageTitle");
const organizerEventsSearch = document.getElementById("organizerEventsSearch");
const organizerEventsResultsCount = document.getElementById("organizerEventsResultsCount");
const organizerEventsList = document.getElementById("organizerEventsList");
const organizerEventsEmptyState = document.getElementById("organizerEventsEmptyState");
const manageUsersEventSearch = document.getElementById("manageUsersEventSearch");
const manageUsersEventCount = document.getElementById("manageUsersEventCount");
const manageUsersEventsList = document.getElementById("manageUsersEventsList");
const manageUsersAttendeeSection = document.getElementById("manageUsersAttendeeSection");
const manageUsersSelectedEvent = document.getElementById("manageUsersSelectedEvent");
const manageUsersSelectedEventRight = document.getElementById("manageUsersSelectedEventRight");
const manageUsersAttendeeCount = document.getElementById("manageUsersAttendeeCount");
const manageUsersAttendeeSearch = document.getElementById("manageUsersAttendeeSearch");
const manageUsersAttendeeBody = document.getElementById("manageUsersAttendeeBody");
const organizerEventEditModal = document.getElementById("organizerEventEditModal");
const organizerEventEditModalBackdrop = document.getElementById("organizerEventEditModalBackdrop");
const organizerEventEditClose = document.getElementById("organizerEventEditClose");
const organizerEventEditCancel = document.getElementById("organizerEventEditCancel");
const organizerEventEditForm = document.getElementById("organizerEventEditForm");
const organizerEventEditId = document.getElementById("organizerEventEditId");
const organizerEventEditTitleInput = document.getElementById("organizerEventEditTitleInput");
const organizerEventEditCategory = document.getElementById("organizerEventEditCategory");
const organizerEventEditDate = document.getElementById("organizerEventEditDate");
const organizerEventEditTime = document.getElementById("organizerEventEditTime");
const organizerEventEditVenue = document.getElementById("organizerEventEditVenue");
const organizerEventEditVenueWrap = document.getElementById("organizerEventEditVenueWrap");
const organizerEventEditPrice = document.getElementById("organizerEventEditPrice");
const organizerEventEditCapacity = document.getElementById("organizerEventEditCapacity");
const organizerEventEditPriceWrap = document.getElementById("organizerEventEditPriceWrap");
const organizerEventEditDescription = document.getElementById("organizerEventEditDescription");
const organizerEventEditMode = document.getElementById("organizerEventEditMode");
const organizerEventEditTicketMode = document.getElementById("organizerEventEditTicketMode");
const organizerEventModeToggle = document.getElementById("organizerEventModeToggle");
const organizerEventTicketToggle = document.getElementById("organizerEventTicketToggle");
const organizerEventEditStatus = document.getElementById("organizerEventEditStatus");
const organizerEventEditSubmit = document.getElementById("organizerEventEditSubmit");
const organizerEventCancelModal = document.getElementById("organizerEventCancelModal");
const organizerEventCancelBackdrop = document.getElementById("organizerEventCancelBackdrop");
const organizerEventCancelDescription = document.getElementById("organizerEventCancelDescription");
const organizerEventCancelClose = document.getElementById("organizerEventCancelClose");
const organizerEventCancelConfirm = document.getElementById("organizerEventCancelConfirm");
const organizerEventDetailModal = document.getElementById("organizerEventDetailModal");
const organizerEventDetailBackdrop = document.getElementById("organizerEventDetailBackdrop");
const organizerEventDetailClose = document.getElementById("organizerEventDetailClose");
const organizerEventDetailImage = document.getElementById("organizerEventDetailImage");
const organizerEventDetailTitle = document.getElementById("organizerEventDetailTitle");
const organizerEventDetailMeta = document.getElementById("organizerEventDetailMeta");
const organizerEventDetailStatus = document.getElementById("organizerEventDetailStatus");
const organizerEventDetailAttendeeCount = document.getElementById("organizerEventDetailAttendeeCount");
const organizerEventDetailCapacity = document.getElementById("organizerEventDetailCapacity");
const organizerEventDetailOccupancy = document.getElementById("organizerEventDetailOccupancy");
const organizerEventDetailDescription = document.getElementById("organizerEventDetailDescription");
const organizerEventDetailCancelBtn = document.getElementById("organizerEventDetailCancelBtn");
const organizerAttendeeList = document.getElementById("organizerAttendeeList");
const organizerAddAttendeeForm = document.getElementById("organizerAddAttendeeForm");
const organizerAddAttendeeEventId = document.getElementById("organizerAddAttendeeEventId");
const organizerAddAttendeeName = document.getElementById("organizerAddAttendeeName");
const organizerAddAttendeeEmail = document.getElementById("organizerAddAttendeeEmail");
const organizerAddAttendeePhone = document.getElementById("organizerAddAttendeePhone");
const organizerAddAttendeeSubmit = document.getElementById("organizerAddAttendeeSubmit");
const organizerAddAttendeeStatus = document.getElementById("organizerAddAttendeeStatus");
const organizerNameNodes = document.querySelectorAll("[data-organizer-name]");
const organizerAvatarNodes = document.querySelectorAll("[data-organizer-avatar]");
const profileDetailsForm = document.getElementById("profileDetailsForm");
const profileFirstName = document.getElementById("profileFirstName");
const profileLastName = document.getElementById("profileLastName");
const profileEmail = document.getElementById("profileEmail");
const profilePhone = document.getElementById("profilePhone");
const profileRole = document.getElementById("profileRole");
const profileBio = document.getElementById("profileBio");
const profileCancelBtn = document.getElementById("profileCancelBtn");
const profileSaveBtn = document.getElementById("profileSaveBtn");
const profileDetailsStatus = document.getElementById("profileDetailsStatus");
const profilePasswordForm = document.getElementById("profilePasswordForm");
const profileCurrentPassword = document.getElementById("profileCurrentPassword");
const profileNewPassword = document.getElementById("profileNewPassword");
const profileConfirmPassword = document.getElementById("profileConfirmPassword");
const profilePasswordSaveBtn = document.getElementById("profilePasswordSaveBtn");
const profilePasswordStatus = document.getElementById("profilePasswordStatus");
const profileImageInput = document.getElementById("profileImageInput");
const profileUploadBtn = document.querySelector(".upload-btn");

let organizerEventsCache = [];
let manageUsersAttendeesCache = [];
let manageUsersSelectedEventId = "";
let pendingCancelEvent = null;
let organizerProfileSnapshot = null;
let activeOrganizerEventDetail = null;

const escapeHtml = value => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#39;");

const getContextPath = () => {
  return "";
};

const buildApiPathCandidates = path => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const candidates = [
    `${getContextPath()}${normalizedPath}`,
    normalizedPath,
    `/assets${normalizedPath}`,
    `/assets/dashboard/organizer${normalizedPath}`,
  ];
  return Array.from(new Set(candidates));
};

const fetchWithPathFallback = async (path, options = {}) => {
  let fallbackResponse = null;

  for (const candidatePath of buildApiPathCandidates(path)) {
    try {
      const response = await fetch(candidatePath, options);
      if (response.status !== 404) {
        return response;
      }
      fallbackResponse = response;
    } catch (error) {
      // Try next candidate path on network or routing failure.
    }
  }

  if (fallbackResponse) {
    return fallbackResponse;
  }

  throw new Error("Unable to reach server.");
};

const parseApiJson = async response => {
  const text = await response.text();
  let data = {};

  if (text) {
    try {
      data = JSON.parse(text);
    } catch (error) {
      throw new Error(`Server returned invalid response (HTTP ${response.status}).`);
    }
  }

  if (!response.ok) {
    throw new Error(data.error || data.message || `Request failed (HTTP ${response.status}).`);
  }

  return data;
};

const renderManagedEvent = event => `
  <div class="event-card">
    <img src="${escapeHtml(event.imageUrl)}" alt="${escapeHtml(event.eventName)}">
    <div class="event-info">
      <h4>${escapeHtml(event.eventName)}</h4>
      <p class="meta"><i class="fa-regular fa-calendar"></i> ${escapeHtml(event.eventDate)} &bull; ${escapeHtml(event.eventTime)}</p>
      <p class="meta"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(event.location)}</p>
      <p class="meta"><i class="fa-solid fa-ticket"></i> ${escapeHtml(event.price || "Rs 0")} &bull; Capacity ${escapeHtml(event.capacity || 0)}</p>
      <div class="event-bottom">
        <span class="badge ${event.status === "draft" ? "badge-yellow" : "badge-green"}">${escapeHtml(event.status.charAt(0).toUpperCase() + event.status.slice(1))}</span>
        <a href="#" class="ticket-link">Manage Event</a>
      </div>
    </div>
  </div>
`;

const renderActivityItem = item => `
  <li>
    <div class="activity-icon">
      <i class="fa-solid ${escapeHtml(item.icon)}"></i>
    </div>
    <div class="activity-info">
      <p>${escapeHtml(item.title)}</p>
      <span>${escapeHtml(item.time)}</span>
    </div>
  </li>
`;

const renderSalesItem = item => `
  <li>
    <img src="${escapeHtml(item.avatar)}" alt="Buyer avatar">
    <div>
      <p>${escapeHtml(item.title)}</p>
      <span>${escapeHtml(item.time)}</span>
    </div>
  </li>
`;

const renderNotificationItem = item => `
  <li>
    <i class="fa-solid ${escapeHtml(item.icon)}"></i>
    <div>
      <p>${escapeHtml(item.title)}</p>
      <span>${escapeHtml(item.time)}</span>
    </div>
  </li>
`;

const renderCompletedItem = item => `
  <div class="history-item">
    <p>${escapeHtml(item.title)}</p>
    <span>${escapeHtml(item.summary)}</span>
  </div>
`;

const normalizeDateToInput = value => {
  const text = String(value || "").trim();
  if (!text) {
    return "";
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    return text;
  }

  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }
  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const normalizeTimeToInput = value => {
  const text = String(value || "").trim();
  if (!text) {
    return "";
  }

  if (/^\d{2}:\d{2}$/.test(text)) {
    return text;
  }

  const parsed = new Date(`1970-01-01 ${text}`);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }
  const hours = String(parsed.getHours()).padStart(2, "0");
  const minutes = String(parsed.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const setOrganizerEventEditStatus = (message = "", isError = false) => {
  if (!organizerEventEditStatus) {
    return;
  }

  organizerEventEditStatus.hidden = !message;
  organizerEventEditStatus.textContent = message;
  organizerEventEditStatus.classList.toggle("error", isError);
};

const splitName = value => {
  const parts = String(value || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) {
    return { firstName: "", lastName: "" };
  }
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
};

const setProfileStatus = (element, message = "", isError = false) => {
  if (!element) {
    return;
  }
  element.hidden = !message;
  element.textContent = message;
  element.classList.toggle("error", isError);
};

const applyOrganizerProfile = data => {
  if (!data) {
    return;
  }

  const userName = String(data.userName || "").trim() || "Organizer";
  const userEmail = String(data.userEmail || "").trim();
  const userRole = String(data.userRole || "").trim().toLowerCase() || "organizer";
  const profileImage = data.profileImage || data.profile_image || "/assets/dashboard/images/logo1.png";
  const { firstName, lastName } = splitName(userName);

  organizerNameNodes.forEach(node => {
    node.textContent = userName;
  });

  organizerAvatarNodes.forEach(node => {
    if (node.tagName === "IMG") {
      node.src = profileImage;
      node.alt = `${userName} avatar`;
    }
  });

  if (profileFirstName) profileFirstName.value = firstName;
  if (profileLastName) profileLastName.value = lastName;
  if (profileEmail) profileEmail.value = userEmail;
  if (profilePhone && "phone" in data) profilePhone.value = String(data.phone || "");
  if (profileRole) profileRole.value = userRole;
  if (profileBio && "bio" in data) profileBio.value = String(data.bio || "");

  organizerProfileSnapshot = {
    firstName,
    lastName,
    email: userEmail,
    role: userRole,
    phone: String(data.phone || ""),
    bio: String(data.bio || ""),
  };
};

const loadOrganizerProfile = async () => {
  try {
    const response = await fetch(`${getContextPath()}/profileservlet`, {
      cache: "no-store",
      headers: {
        "Accept": "application/json"
      }
    });

    if (response.status === 401) {
      window.location.href = `${getContextPath()}/login`;
      return;
    }
    if (response.status === 403) {
      window.location.href = `${getContextPath()}/dashboard/user`;
      return;
    }
    if (!response.ok) {
      return;
    }

    const data = await response.json();
    applyOrganizerProfile(data);
  } catch (error) {
    // intentionally silent for non-profile pages
  }
};

const setOrganizerEditEventMode = mode => {
  const resolved = mode === "online" ? "online" : "venue";
  if (organizerEventEditMode) {
    organizerEventEditMode.value = resolved;
  }
  if (organizerEventEditVenueWrap) {
    organizerEventEditVenueWrap.hidden = resolved === "online";
  }
  if (organizerEventEditVenue) {
    organizerEventEditVenue.required = resolved !== "online";
    if (resolved === "online") {
      organizerEventEditVenue.value = "";
    }
  }
};

const setOrganizerEditTicketMode = mode => {
  const resolved = mode === "free" ? "free" : "paid";
  if (organizerEventEditTicketMode) {
    organizerEventEditTicketMode.value = resolved;
  }
  if (organizerEventEditPriceWrap) {
    organizerEventEditPriceWrap.hidden = resolved === "free";
  }
  if (organizerEventEditPrice) {
    organizerEventEditPrice.required = resolved !== "free";
    if (resolved === "free") {
      organizerEventEditPrice.value = "0";
    }
  }
};

const bindOrganizerToggleGroup = (group, key, callback) => {
  if (!group) {
    return;
  }

  const buttons = Array.from(group.querySelectorAll("button"));
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      callback(button.dataset[key] || "");
    });
  });
};

const renderOrganizerMyEventCard = event => `
  <article
    class="booking-item organizer-event-item ${escapeHtml(event.status || "published")}"
    data-event-id="${escapeHtml(event.id)}"
    data-event-name="${escapeHtml(event.eventName)}"
    data-category="${escapeHtml(event.category || "general")}"
    data-event-date="${escapeHtml(event.eventDate)}"
    data-event-time="${escapeHtml(event.eventTime)}"
    data-location="${escapeHtml(event.location || "")}"
    data-event-mode="${escapeHtml(event.eventMode || "venue")}"
    data-ticket-pricing-mode="${escapeHtml(event.ticketPricingMode || "paid")}"
    data-price="${escapeHtml(String(event.price || "Rs 0"))}"
    data-capacity="${escapeHtml(String(event.capacity || 0))}"
    data-attendee-count="${escapeHtml(String(event.attendeeCount || 0))}"
    data-description="${escapeHtml(event.description || "")}"
    data-image-url="${escapeHtml(event.imageUrl || "/assets/dashboard/images/dsupimg1.jpg")}"
  >
    <img class="booking-cover" src="${escapeHtml(event.imageUrl || "/assets/dashboard/images/dsupimg1.jpg")}" alt="${escapeHtml(event.eventName)}">
    <div class="booking-body organizer-event-content">
      <div class="booking-head organizer-event-top">
        <div>
          <h4>${escapeHtml(event.eventName)}</h4>
          <p>${escapeHtml(event.eventDate)} at ${escapeHtml(event.eventTime)} &bull; ${escapeHtml(event.location || "Online Event")}</p>
        </div>
        <span class="booking-status ${escapeHtml(event.status || "published")}">${escapeHtml(event.status || "published")}</span>
      </div>
      <div class="booking-grid">
        <div class="booking-field">
          <span>Category</span>
          <strong>${escapeHtml(event.category || "general")}</strong>
        </div>
        <div class="booking-field">
          <span>Pricing</span>
          <strong>${escapeHtml(event.ticketPricingMode || "paid")}</strong>
        </div>
        <div class="booking-field">
          <span>Price</span>
          <strong>${escapeHtml(event.price || "Rs 0")}</strong>
        </div>
        <div class="booking-field">
          <span>Capacity</span>
          <strong>${escapeHtml(event.capacity || 0)}</strong>
        </div>
        <div class="booking-field">
          <span>Attendees</span>
          <strong>${escapeHtml(event.attendeeCount || 0)}</strong>
        </div>
        <div class="booking-field">
          <span>Mode</span>
          <strong>${escapeHtml(event.eventMode || "venue")}</strong>
        </div>
      </div>
      <div class="booking-actions organizer-event-actions">
        <button type="button" class="booking-action-btn view-organizer-event">View Details</button>
        <button type="button" class="booking-action-btn edit-organizer-event" ${event.status === "cancelled" ? "disabled" : ""}>Edit Event</button>
        <button type="button" class="booking-action-btn cancel-organizer-event" ${event.status === "cancelled" ? "disabled" : ""}>Cancel Event</button>
      </div>
    </div>
  </article>
`;

const renderManageUserEventCard = event => `
  <article class="manage-users-event-card" data-event-id="${escapeHtml(event.id)}">
    <img src="${escapeHtml(event.imageUrl || "/assets/dashboard/images/dsupimg1.jpg")}" alt="${escapeHtml(event.eventName)}">
    <div class="manage-users-event-content">
      <h4>${escapeHtml(event.eventName)}</h4>
      <p>${escapeHtml(event.eventDate)} at ${escapeHtml(event.eventTime)}</p>
      <p>${escapeHtml(event.location || "Online Event")}</p>
      <p>${escapeHtml(event.price || "Rs 0")} &bull; ${escapeHtml(event.attendeeCount || 0)} attendees</p>
      <button type="button" class="booking-action-btn manage-users-open-btn">Manage User</button>
    </div>
  </article>
`;

const renderManageUserAttendeeRows = attendees => {
  if (!manageUsersAttendeeBody) {
    return;
  }

  if (!attendees.length) {
    manageUsersAttendeeBody.innerHTML = `
      <tr>
        <td colspan="5" class="manage-users-no-data">No attendees for this event yet.</td>
      </tr>
    `;
    return;
  }

  manageUsersAttendeeBody.innerHTML = attendees.map(attendee => `
    <tr data-attendee-id="${escapeHtml(attendee.id)}">
      <td>${escapeHtml(attendee.name || "-")}</td>
      <td>${escapeHtml(attendee.ticketType || "Entry Pass")}</td>
      <td>${escapeHtml(attendee.ticketCount || 1)}</td>
      <td>${escapeHtml(attendee.ticketId || "-")}</td>
      <td>
        <div class="manage-users-action-group">
          <button type="button" class="manage-users-approve-btn" data-action="approve">Approve</button>
          <button type="button" class="manage-users-deny-btn" data-action="deny">Deny/Remove</button>
        </div>
      </td>
    </tr>
  `).join("");
};

const applyManageUserAttendeeFilter = () => {
  if (!manageUsersAttendeeBody) {
    return;
  }

  const term = String(manageUsersAttendeeSearch?.value || "").trim().toLowerCase();
  const rows = Array.from(manageUsersAttendeeBody.querySelectorAll("tr[data-attendee-id]"));
  let visibleCount = 0;

  rows.forEach(row => {
    const text = [
      row.children[0]?.textContent || "",
      row.children[3]?.textContent || "",
    ].join(" ").toLowerCase();
    const show = !term || text.includes(term);
    row.hidden = !show;
    if (show) {
      visibleCount += 1;
    }
  });

  if (manageUsersAttendeeCount) {
    manageUsersAttendeeCount.textContent = String(visibleCount);
  }
};

const loadManageUsersAttendees = async eventId => {
  if (!manageUsersAttendeeBody) {
    return;
  }

  try {
    const response = await fetchWithPathFallback(`/organizer-event-attendees-servlet?eventId=${encodeURIComponent(eventId)}`, {
      cache: "no-store",
      headers: {
        "Accept": "application/json",
      },
    });

    if (response.status === 401) {
      window.location.href = `${getContextPath()}/login`;
      return;
    }

    const data = await parseApiJson(response);
    manageUsersSelectedEventId = String(data.eventId || eventId || "");
    manageUsersAttendeesCache = Array.isArray(data.attendees) ? data.attendees : [];
    if (manageUsersSelectedEvent) {
      manageUsersSelectedEvent.textContent = `${data.eventName || "Event"} - Attendees`;
    }
    if (manageUsersSelectedEventRight) {
      manageUsersSelectedEventRight.textContent = `${data.eventName || "Event"}`;
    }
    if (manageUsersAttendeeSection) {
      manageUsersAttendeeSection.hidden = false;
    }
    renderManageUserAttendeeRows(manageUsersAttendeesCache);
    applyManageUserAttendeeFilter();
  } catch (error) {
    if (manageUsersAttendeeSection) {
      manageUsersAttendeeSection.hidden = false;
    }
    if (manageUsersSelectedEvent) {
      manageUsersSelectedEvent.textContent = "Attendees";
    }
    if (manageUsersSelectedEventRight) {
      manageUsersSelectedEventRight.textContent = "-";
    }
    manageUsersAttendeesCache = [];
    renderManageUserAttendeeRows([]);
  }
};

const applyOrganizerEventFilter = () => {
  if (!organizerEventsList) {
    return;
  }

  const term = String(organizerEventsSearch?.value || "").trim().toLowerCase();
  const cards = Array.from(organizerEventsList.querySelectorAll(".organizer-event-item"));
  let visibleCount = 0;

  cards.forEach(card => {
    const searchable = [
      card.dataset.eventName,
      card.dataset.category,
      card.dataset.eventDate,
      card.dataset.location,
      card.dataset.price,
    ].join(" ").toLowerCase();
    const show = !term || searchable.includes(term);
    card.hidden = !show;
    if (show) {
      visibleCount += 1;
    }
  });

  if (organizerEventsResultsCount) {
    organizerEventsResultsCount.textContent = String(visibleCount);
  }

  if (organizerEventsEmptyState) {
    organizerEventsEmptyState.hidden = visibleCount !== 0;
  }
};

const loadOrganizerEvents = async () => {
  if (!organizerEventsList && !manageUsersEventsList) {
    return;
  }

  try {
    const response = await fetch(`${getContextPath()}/organizereventsservlet`, {
      cache: "no-store",
      headers: {
        "Accept": "application/json"
      }
    });

    if (response.status === 401) {
      window.location.href = `${getContextPath()}/login`;
      return;
    }

    if (response.status === 403) {
      window.location.href = `${getContextPath()}/dashboard/user`;
      return;
    }

    const data = await parseApiJson(response);
    organizerEventsCache = Array.isArray(data.events) ? data.events : [];

    if (organizerSidebarUserName && data.userName) {
      organizerSidebarUserName.textContent = data.userName;
    }
    if (organizerEventsPageTitle && data.userName) {
      organizerEventsPageTitle.textContent = `${data.userName}'s Events`;
    }

    if (organizerEventsList) {
      organizerEventsList.innerHTML = organizerEventsCache.length
        ? organizerEventsCache.map(renderOrganizerMyEventCard).join("")
        : "";
      applyOrganizerEventFilter();
    }

    if (manageUsersEventsList) {
      manageUsersEventsList.innerHTML = organizerEventsCache.length
        ? organizerEventsCache.map(renderManageUserEventCard).join("")
        : "<p class=\"meta\">No events available. Create an event first.</p>";
      if (manageUsersEventCount) {
        manageUsersEventCount.textContent = String(organizerEventsCache.length);
      }
    }
  } catch (error) {
    if (organizerEventsList) {
      organizerEventsList.innerHTML = "";
      if (organizerEventsResultsCount) {
        organizerEventsResultsCount.textContent = "0";
      }
    }

    if (manageUsersEventsList) {
      manageUsersEventsList.innerHTML = "<p class=\"meta\">Unable to load events right now.</p>";
      if (manageUsersEventCount) {
        manageUsersEventCount.textContent = "0";
      }
    }

    if (organizerEventsEmptyState) {
      organizerEventsEmptyState.hidden = false;
    }
  }
};

const closeOrganizerEventEditModal = () => {
  if (organizerEventEditModal) {
    organizerEventEditModal.hidden = true;
  }
  setOrganizerEventEditStatus("");
};

const closeOrganizerEventCancelModal = () => {
  pendingCancelEvent = null;
  if (organizerEventCancelModal) {
    organizerEventCancelModal.hidden = true;
  }
};

const setAddAttendeeStatus = (message = "", isError = false) => {
  if (!organizerAddAttendeeStatus) {
    return;
  }
  organizerAddAttendeeStatus.hidden = !message;
  organizerAddAttendeeStatus.textContent = message;
  organizerAddAttendeeStatus.classList.toggle("error", isError);
};

const renderOrganizerAttendeeRow = attendee => `
  <article class="organizer-attendee-item" data-attendee-id="${escapeHtml(attendee.id)}">
    <div>
      <strong>${escapeHtml(attendee.name)}</strong>
      <p>${escapeHtml(attendee.email)}${attendee.phone ? ` &bull; ${escapeHtml(attendee.phone)}` : ""}</p>
    </div>
    <button type="button" class="booking-action-btn remove-organizer-attendee">Remove</button>
  </article>
`;

const closeOrganizerEventDetailModal = () => {
  activeOrganizerEventDetail = null;
  if (organizerEventDetailModal) {
    organizerEventDetailModal.hidden = true;
  }
  if (organizerAttendeeList) {
    organizerAttendeeList.innerHTML = "";
  }
  setAddAttendeeStatus("");
  organizerAddAttendeeForm?.reset();
};

const renderOrganizerEventDetail = eventDetail => {
  if (!eventDetail) {
    return;
  }

  activeOrganizerEventDetail = eventDetail;
  if (organizerAddAttendeeEventId) {
    organizerAddAttendeeEventId.value = String(eventDetail.id);
  }
  if (organizerEventDetailImage) organizerEventDetailImage.src = eventDetail.imageUrl || "/assets/dashboard/images/dsupimg1.jpg";
  if (organizerEventDetailTitle) organizerEventDetailTitle.textContent = eventDetail.eventName || "Event Details";
  if (organizerEventDetailMeta) organizerEventDetailMeta.textContent = `${eventDetail.eventDate} • ${eventDetail.eventTime} • ${eventDetail.location}`;
  if (organizerEventDetailStatus) organizerEventDetailStatus.textContent = String(eventDetail.status || "published");
  if (organizerEventDetailAttendeeCount) organizerEventDetailAttendeeCount.textContent = String(eventDetail.attendeeCount ?? 0);
  if (organizerEventDetailCapacity) organizerEventDetailCapacity.textContent = String(eventDetail.capacity ?? 0);
  if (organizerEventDetailOccupancy) organizerEventDetailOccupancy.textContent = `${eventDetail.occupancyPercent ?? 0}%`;
  if (organizerEventDetailDescription) organizerEventDetailDescription.textContent = eventDetail.description || "No description added yet.";
  if (organizerEventDetailCancelBtn) {
    const isCancelled = String(eventDetail.status || "").toLowerCase() === "cancelled";
    organizerEventDetailCancelBtn.disabled = isCancelled;
    organizerEventDetailCancelBtn.textContent = isCancelled ? "Event Cancelled" : "Cancel This Event";
  }

  if (organizerAttendeeList) {
    const attendees = Array.isArray(eventDetail.attendees) ? eventDetail.attendees : [];
    organizerAttendeeList.innerHTML = attendees.length
      ? attendees.map(renderOrganizerAttendeeRow).join("")
      : "<p class=\"meta\">No attendees yet. Add attendee manually below.</p>";
  }
  setAddAttendeeStatus("");
  organizerEventDetailModal.hidden = false;
};

const loadOrganizerEventDetail = async eventId => {
  try {
    const response = await fetch(`${getContextPath()}/organizereventdetailservlet?eventId=${encodeURIComponent(eventId)}`, {
      cache: "no-store",
      headers: {
        "Accept": "application/json"
      }
    });
    if (response.status === 401) {
      window.location.href = `${getContextPath()}/login`;
      return;
    }
    const data = await parseApiJson(response);
    renderOrganizerEventDetail(data.event || null);
  } catch (error) {
    setAddAttendeeStatus(error.message || "Unable to load event details.", true);
  }
};

const openOrganizerEventEditModal = eventData => {
  if (!eventData || !organizerEventEditModal) {
    return;
  }

  if (organizerEventEditId) organizerEventEditId.value = String(eventData.id || "");
  if (organizerEventEditTitleInput) organizerEventEditTitleInput.value = eventData.eventName || "";
  if (organizerEventEditCategory) organizerEventEditCategory.value = eventData.category || "general";
  if (organizerEventEditDate) organizerEventEditDate.value = normalizeDateToInput(eventData.eventDate);
  if (organizerEventEditTime) organizerEventEditTime.value = normalizeTimeToInput(eventData.eventTime);
  if (organizerEventEditVenue) organizerEventEditVenue.value = eventData.location === "Online Event" ? "" : (eventData.location || "");
  if (organizerEventEditPrice) organizerEventEditPrice.value = String(eventData.price || "").replace(/[^\d]/g, "") || "0";
  if (organizerEventEditCapacity) organizerEventEditCapacity.value = String(eventData.capacity || "0");
  if (organizerEventEditDescription) organizerEventEditDescription.value = eventData.description || "";

  setOrganizerEditEventMode(eventData.eventMode || "venue");
  setOrganizerEditTicketMode(eventData.ticketPricingMode || "paid");
  setOrganizerEventEditStatus("");
  organizerEventEditModal.hidden = false;
};

const openOrganizerEventCancelModal = eventData => {
  if (!eventData || !organizerEventCancelModal) {
    return;
  }

  pendingCancelEvent = eventData;
  if (organizerEventCancelDescription) {
    organizerEventCancelDescription.textContent = `Cancel "${eventData.eventName}"? This will mark it as cancelled.`;
  }
  organizerEventCancelModal.hidden = false;
};

const setCreateEventStatus = (message = "", isError = false) => {
  if (!createEventStatus) {
    return;
  }

  createEventStatus.hidden = !message;
  createEventStatus.textContent = message;
  createEventStatus.classList.toggle("error", isError);
};

const CREATE_EVENT_DRAFT_KEY = "eventhub.organizer.createEventDraft";

const readCreateEventDraft = () => {
  try {
    const raw = localStorage.getItem(CREATE_EVENT_DRAFT_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch (error) {
    return null;
  }
};

const clearCreateEventDraft = () => {
  try {
    localStorage.removeItem(CREATE_EVENT_DRAFT_KEY);
  } catch (error) {
    // Ignore storage errors.
  }
};

const persistCreateEventDraft = () => {
  if (!createEventForm) {
    return;
  }

  const formData = new FormData(createEventForm);
  const draft = {
    eventTitle: String(formData.get("eventTitle") || ""),
    eventCategory: String(formData.get("eventCategory") || ""),
    organizerName: String(formData.get("organizerName") || ""),
    eventDate: String(formData.get("eventDate") || ""),
    eventTime: String(formData.get("eventTime") || ""),
    venueAddress: String(formData.get("venueAddress") || ""),
    ticketPrice: String(formData.get("ticketPrice") || ""),
    eventCapacity: String(formData.get("eventCapacity") || ""),
    eventDescription: String(formData.get("eventDescription") || ""),
    eventMode: String(formData.get("eventMode") || "venue"),
    ticketPricingMode: String(formData.get("ticketPricingMode") || "paid"),
    posterUrl: String(formData.get("posterUrl") || ""),
  };

  const hasData = [
    draft.eventTitle,
    draft.organizerName,
    draft.eventDate,
    draft.eventTime,
    draft.venueAddress,
    draft.ticketPrice,
    draft.eventCapacity,
    draft.eventDescription,
    draft.posterUrl,
  ].some(value => value.trim() !== "");

  if (!hasData) {
    clearCreateEventDraft();
    return;
  }

  try {
    localStorage.setItem(CREATE_EVENT_DRAFT_KEY, JSON.stringify(draft));
  } catch (error) {
    // Ignore storage errors.
  }
};

const restoreCreateEventDraft = () => {
  if (!createEventForm) {
    return;
  }

  const draft = readCreateEventDraft();
  if (!draft) {
    return;
  }

  const assignValue = (fieldId, value) => {
    const field = document.getElementById(fieldId);
    if (field && value !== undefined && value !== null) {
      field.value = String(value);
    }
  };

  assignValue("eventTitle", draft.eventTitle);
  assignValue("eventCategory", draft.eventCategory || "tech");
  assignValue("organizerName", draft.organizerName);
  assignValue("eventDate", draft.eventDate);
  assignValue("eventTime", draft.eventTime);
  assignValue("venueAddress", draft.venueAddress);
  assignValue("ticketPrice", draft.ticketPrice);
  assignValue("eventCapacity", draft.eventCapacity);
  assignValue("eventDescription", draft.eventDescription);
  assignValue("posterUrl", draft.posterUrl);

  setEventModeUI(draft.eventMode || "venue");
  setTicketPricingModeUI(draft.ticketPricingMode || "paid");

  if (posterUploadMeta) {
    posterUploadMeta.textContent = draft.posterUrl ? "Poster ready" : "No poster selected";
  }
};

const setEventModeUI = mode => {
  const resolvedMode = mode === "online" ? "online" : "venue";

  if (eventModeField) {
    eventModeField.value = resolvedMode;
  }

  if (eventModeGroup) {
    const buttons = Array.from(eventModeGroup.querySelectorAll("button"));
    buttons.forEach(button => {
      button.classList.toggle("active", (button.dataset.eventMode || "") === resolvedMode);
    });
  }

  if (venueAddressWrap) {
    venueAddressWrap.hidden = resolvedMode === "online";
  }

  if (venueAddressInput) {
    venueAddressInput.required = resolvedMode !== "online";
    if (resolvedMode === "online") {
      venueAddressInput.value = "";
    }
  }
};

const setTicketPricingModeUI = mode => {
  const resolvedMode = mode === "free" ? "free" : "paid";

  if (ticketPricingModeField) {
    ticketPricingModeField.value = resolvedMode;
  }

  if (ticketPricingGroup) {
    const buttons = Array.from(ticketPricingGroup.querySelectorAll("button"));
    buttons.forEach(button => {
      button.classList.toggle("active", (button.dataset.ticketMode || "") === resolvedMode);
    });
  }

  if (ticketPriceWrap) {
    ticketPriceWrap.hidden = resolvedMode === "free";
  }

  if (ticketPriceInput) {
    ticketPriceInput.required = resolvedMode !== "free";
    if (resolvedMode === "free") {
      ticketPriceInput.value = "0";
    }
  }
};

const bindToggleGroup = (groupElement, dataAttribute, applyMode) => {
  if (!groupElement) {
    return;
  }

  const buttons = Array.from(groupElement.querySelectorAll("button"));
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      applyMode(button.dataset[dataAttribute] || "");
    });
  });
};

const uploadPosterImage = async file => {
  const formData = new FormData();
  formData.append("posterImage", file);

  const response = await fetch(`${getContextPath()}/upload-organizer-poster`, {
    method: "POST",
    body: formData,
    headers: {
      "Accept": "application/json"
    }
  });

  if (response.status === 401) {
    window.location.href = `${getContextPath()}/login`;
    return null;
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Unable to upload poster image.");
  }

  return data.imageUrl || "";
};

const loadOrganizerDashboard = async () => {
  if (!organizerManagedEvents) {
    return;
  }

  try {
    const response = await fetch(`${getContextPath()}/organizerdashboardservlet`, {
      headers: {
        "Accept": "application/json"
      }
    });

    if (response.status === 401) {
      window.location.href = `${getContextPath()}/login`;
      return;
    }

    if (response.status === 403) {
      window.location.href = `${getContextPath()}/dashboard/user`;
      return;
    }

    if (!response.ok) {
      throw new Error("Unable to load organizer dashboard");
    }

    const data = await response.json();

    if (organizerSidebarUserName && data.userName) {
      organizerSidebarUserName.textContent = data.userName;
    }

    if (organizerPageTitle && data.userName) {
      organizerPageTitle.textContent = `${data.userName}'s Organizer Dashboard`;
    }

    if (organizerActiveEvents) organizerActiveEvents.textContent = data.stats?.activeEvents ?? "0";
    if (organizerTotalAttendees) organizerTotalAttendees.textContent = data.stats?.totalAttendees ?? "0";
    if (organizerCheckinRate) organizerCheckinRate.textContent = data.stats?.checkInRate ?? "0%";
    if (organizerRevenue) organizerRevenue.textContent = data.stats?.totalRevenue ?? "Rs 0";

    const managedEvents = Array.isArray(data.managedEvents) ? data.managedEvents : [];
    const recentActivity = Array.isArray(data.recentActivity) ? data.recentActivity : [];
    const salesActivity = Array.isArray(data.salesActivity) ? data.salesActivity : [];
    const notifications = Array.isArray(data.notifications) ? data.notifications : [];
    const completedEvents = Array.isArray(data.completedEvents) ? data.completedEvents : [];

    if (organizerManagedEvents) {
      organizerManagedEvents.innerHTML = managedEvents.length
        ? managedEvents.map(renderManagedEvent).join("")
        : "<p class=\"meta\">No events created yet. Create your first event from Create Event.</p>";
    }

    if (organizerActivityList) {
      organizerActivityList.innerHTML = recentActivity.length
        ? recentActivity.map(renderActivityItem).join("")
        : "<p class=\"meta\">No activity yet.</p>";
    }

    if (organizerSalesList) {
      organizerSalesList.innerHTML = salesActivity.length
        ? salesActivity.map(renderSalesItem).join("")
        : "<p class=\"meta\">No ticket sales yet.</p>";
    }

    if (organizerNotificationsList) {
      organizerNotificationsList.innerHTML = notifications.length
        ? notifications.map(renderNotificationItem).join("")
        : "<p class=\"meta\">No notifications right now.</p>";
    }

    if (organizerCompletedEvents) {
      organizerCompletedEvents.innerHTML = completedEvents.length
        ? completedEvents.map(renderCompletedItem).join("")
        : "<p class=\"meta\">No completed events yet.</p>";
    }

    if (organizerStats) organizerStats.hidden = false;
    if (organizerContent) organizerContent.hidden = false;
    if (organizerHistorySection) organizerHistorySection.hidden = completedEvents.length === 0;
    if (organizerEmptyState) organizerEmptyState.hidden = true;
  } catch (error) {
    if (organizerEmptyState) {
      organizerEmptyState.hidden = false;
    }
  }
};

loadOrganizerDashboard();
loadOrganizerEvents();
loadOrganizerProfile();

bindToggleGroup(eventModeGroup, "eventMode", mode => {
  setEventModeUI(mode);
  persistCreateEventDraft();
});
bindToggleGroup(ticketPricingGroup, "ticketMode", mode => {
  setTicketPricingModeUI(mode);
  persistCreateEventDraft();
});
setEventModeUI(eventModeField?.value || "venue");
setTicketPricingModeUI(ticketPricingModeField?.value || "paid");
restoreCreateEventDraft();

posterUploadBox?.addEventListener("click", () => {
  posterImageInput?.click();
});

posterUploadBox?.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    posterImageInput?.click();
  }
});

const processPosterFile = async file => {
  if (!file) {
    return;
  }

  if (posterUploadMeta) {
    posterUploadMeta.textContent = "Uploading poster...";
  }

  try {
    const imageUrl = await uploadPosterImage(file);
    if (!imageUrl) {
      return;
    }

    if (posterUrlField) {
      posterUrlField.value = imageUrl;
    }

    if (posterUploadMeta) {
      posterUploadMeta.textContent = `Uploaded: ${file.name}`;
    }
    persistCreateEventDraft();
  } catch (error) {
    if (posterUploadMeta) {
      posterUploadMeta.textContent = error.message || "Unable to upload poster.";
    }
  }
};

posterImageInput?.addEventListener("change", async () => {
  const file = posterImageInput.files?.[0];
  await processPosterFile(file);
});

posterUploadBox?.addEventListener("dragover", event => {
  event.preventDefault();
  posterUploadBox.classList.add("drag-over");
});

posterUploadBox?.addEventListener("dragleave", () => {
  posterUploadBox.classList.remove("drag-over");
});

posterUploadBox?.addEventListener("drop", async event => {
  event.preventDefault();
  posterUploadBox.classList.remove("drag-over");
  const file = event.dataTransfer?.files?.[0];
  await processPosterFile(file);
});

createEventForm?.addEventListener("submit", async event => {
  event.preventDefault();

  const submitter = event.submitter;
  const requestedStatus = submitter?.id === "draftEventButton" ? "draft" : "published";
  if (eventStatusField) {
    eventStatusField.value = requestedStatus;
  }

  if (eventModeField?.value === "online" && venueAddressInput) {
    venueAddressInput.value = "Online Event";
  }

  if (ticketPricingModeField?.value === "free" && ticketPriceInput) {
    ticketPriceInput.value = "0";
  }

  setCreateEventStatus("");
  if (draftEventButton) draftEventButton.disabled = true;
  if (publishEventButton) publishEventButton.disabled = true;

  try {
    const response = await fetchWithPathFallback("/create-organizer-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Accept": "application/json"
      },
      body: new URLSearchParams(new FormData(createEventForm)).toString()
    });

    if (response.status === 401) {
      window.location.href = `${getContextPath()}/login`;
      return;
    }

    const data = await parseApiJson(response);

    const isDraftSave = requestedStatus === "draft";
    setCreateEventStatus(
      data.message || (isDraftSave ? "Draft saved successfully." : "Event created successfully.")
    );

    if (isDraftSave) {
      persistCreateEventDraft();
    } else {
      clearCreateEventDraft();
      createEventForm.reset();
      if (eventStatusField) {
        eventStatusField.value = "published";
      }
      if (posterUrlField) {
        posterUrlField.value = "";
      }
      if (posterUploadMeta) {
        posterUploadMeta.textContent = "No poster selected";
      }
      setEventModeUI("venue");
      setTicketPricingModeUI("paid");
      setTimeout(() => {
        window.location.href = "/assets/dashboard/organizer/myevents.html";
      }, 1600);
    }
  } catch (error) {
    setCreateEventStatus(error.message || "Unable to create event.", true);
  } finally {
    if (draftEventButton) draftEventButton.disabled = false;
    if (publishEventButton) publishEventButton.disabled = false;
  }
});

createEventForm?.addEventListener("input", persistCreateEventDraft);
createEventForm?.addEventListener("change", persistCreateEventDraft);

organizerEventsSearch?.addEventListener("input", applyOrganizerEventFilter);

manageUsersEventSearch?.addEventListener("input", () => {
  if (!manageUsersEventsList) {
    return;
  }

  const term = String(manageUsersEventSearch.value || "").trim().toLowerCase();
  const cards = Array.from(manageUsersEventsList.querySelectorAll(".manage-users-event-card"));
  let visibleCount = 0;
  cards.forEach(card => {
    const text = card.textContent?.toLowerCase() || "";
    const show = !term || text.includes(term);
    card.hidden = !show;
    if (show) {
      visibleCount += 1;
    }
  });

  if (manageUsersEventCount) {
    manageUsersEventCount.textContent = String(visibleCount);
  }
});

organizerEventsList?.addEventListener("click", event => {
  const card = event.target.closest(".organizer-event-item");
  if (!card) {
    return;
  }

  const eventData = {
    id: card.dataset.eventId || "",
    eventName: card.dataset.eventName || "",
    category: card.dataset.category || "general",
    eventDate: card.dataset.eventDate || "",
    eventTime: card.dataset.eventTime || "",
    location: card.dataset.location || "",
    eventMode: card.dataset.eventMode || "venue",
    ticketPricingMode: card.dataset.ticketPricingMode || "paid",
    price: card.dataset.price || "Rs 0",
    capacity: card.dataset.capacity || "0",
    description: card.dataset.description || "",
  };

  const editButton = event.target.closest(".edit-organizer-event");
  if (editButton) {
    event.preventDefault();
    openOrganizerEventEditModal(eventData);
    return;
  }

  const cancelButton = event.target.closest(".cancel-organizer-event");
  if (cancelButton) {
    event.preventDefault();
    openOrganizerEventCancelModal(eventData);
    return;
  }

  const viewButton = event.target.closest(".view-organizer-event");
  if (viewButton) {
    event.preventDefault();
    loadOrganizerEventDetail(eventData.id);
    return;
  }

  loadOrganizerEventDetail(eventData.id);
});

manageUsersEventsList?.addEventListener("click", event => {
  const button = event.target.closest(".manage-users-open-btn");
  if (!button) {
    return;
  }

  const card = event.target.closest(".manage-users-event-card");
  const eventId = card?.dataset.eventId || "";
  if (!eventId) {
    return;
  }
  loadManageUsersAttendees(eventId);
});

organizerEventEditModalBackdrop?.addEventListener("click", closeOrganizerEventEditModal);
organizerEventEditClose?.addEventListener("click", closeOrganizerEventEditModal);
organizerEventEditCancel?.addEventListener("click", closeOrganizerEventEditModal);
organizerEventCancelBackdrop?.addEventListener("click", closeOrganizerEventCancelModal);
organizerEventCancelClose?.addEventListener("click", closeOrganizerEventCancelModal);
organizerEventDetailBackdrop?.addEventListener("click", closeOrganizerEventDetailModal);
organizerEventDetailClose?.addEventListener("click", closeOrganizerEventDetailModal);

bindOrganizerToggleGroup(organizerEventModeToggle, "eventMode", setOrganizerEditEventMode);
bindOrganizerToggleGroup(organizerEventTicketToggle, "ticketMode", setOrganizerEditTicketMode);

organizerEventEditForm?.addEventListener("submit", async event => {
  event.preventDefault();
  if (!organizerEventEditSubmit) {
    return;
  }

  organizerEventEditSubmit.disabled = true;
  organizerEventEditSubmit.textContent = "Saving...";
  setOrganizerEventEditStatus("");

  try {
    if (organizerEventEditMode?.value === "online" && organizerEventEditVenue) {
      organizerEventEditVenue.value = "Online Event";
    }
    if (organizerEventEditTicketMode?.value === "free" && organizerEventEditPrice) {
      organizerEventEditPrice.value = "0";
    }

    const response = await fetch(`${getContextPath()}/update-organizer-event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Accept": "application/json",
      },
      body: new URLSearchParams(new FormData(organizerEventEditForm)).toString(),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Unable to update event.");
    }
    setOrganizerEventEditStatus(data.message || "Event updated successfully.");
    await loadOrganizerEvents();
    setTimeout(closeOrganizerEventEditModal, 700);
  } catch (error) {
    setOrganizerEventEditStatus(error.message || "Unable to update event.", true);
  } finally {
    organizerEventEditSubmit.disabled = false;
    organizerEventEditSubmit.textContent = "Save Changes";
  }
});

organizerEventCancelConfirm?.addEventListener("click", async () => {
  if (!pendingCancelEvent) {
    return;
  }

  organizerEventCancelConfirm.disabled = true;
  organizerEventCancelConfirm.textContent = "Cancelling...";

  try {
    const response = await fetch(`${getContextPath()}/cancel-organizer-event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Accept": "application/json",
      },
      body: new URLSearchParams({ eventId: String(pendingCancelEvent.id || "") }).toString(),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Unable to cancel event.");
    }
    closeOrganizerEventCancelModal();
    closeOrganizerEventDetailModal();
    await loadOrganizerEvents();
  } catch (error) {
    if (organizerEventCancelDescription) {
      organizerEventCancelDescription.textContent = error.message || "Unable to cancel event.";
    }
  } finally {
    organizerEventCancelConfirm.disabled = false;
    organizerEventCancelConfirm.textContent = "Cancel Event";
  }
});

organizerEventDetailCancelBtn?.addEventListener("click", () => {
  if (!activeOrganizerEventDetail) {
    return;
  }
  openOrganizerEventCancelModal(activeOrganizerEventDetail);
});

organizerAddAttendeeForm?.addEventListener("submit", async event => {
  event.preventDefault();
  if (!organizerAddAttendeeSubmit) {
    return;
  }

  organizerAddAttendeeSubmit.disabled = true;
  organizerAddAttendeeSubmit.textContent = "Adding...";
  setAddAttendeeStatus("");

  try {
    const response = await fetch(`${getContextPath()}/organizer-event-attendee-add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Accept": "application/json",
      },
      body: new URLSearchParams(new FormData(organizerAddAttendeeForm)).toString(),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Unable to add attendee.");
    }
    setAddAttendeeStatus(data.message || "Attendee added successfully.");
    organizerAddAttendeeName && (organizerAddAttendeeName.value = "");
    organizerAddAttendeeEmail && (organizerAddAttendeeEmail.value = "");
    organizerAddAttendeePhone && (organizerAddAttendeePhone.value = "");
    if (activeOrganizerEventDetail?.id) {
      await loadOrganizerEventDetail(activeOrganizerEventDetail.id);
      await loadOrganizerEvents();
    }
  } catch (error) {
    setAddAttendeeStatus(error.message || "Unable to add attendee.", true);
  } finally {
    organizerAddAttendeeSubmit.disabled = false;
    organizerAddAttendeeSubmit.textContent = "Add Attendee";
  }
});

organizerAttendeeList?.addEventListener("click", async event => {
  const removeButton = event.target.closest(".remove-organizer-attendee");
  if (!removeButton) {
    return;
  }

  const attendeeCard = event.target.closest(".organizer-attendee-item");
  const attendeeId = attendeeCard?.dataset.attendeeId || "";
  if (!attendeeId) {
    return;
  }

  removeButton.disabled = true;
  removeButton.textContent = "Removing...";
  setAddAttendeeStatus("");

  try {
    const response = await fetch(`${getContextPath()}/organizer-event-attendee-remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Accept": "application/json",
      },
      body: new URLSearchParams({ attendeeId }).toString(),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Unable to remove attendee.");
    }
    setAddAttendeeStatus(data.message || "Attendee removed successfully.");
    if (activeOrganizerEventDetail?.id) {
      await loadOrganizerEventDetail(activeOrganizerEventDetail.id);
      await loadOrganizerEvents();
    }
  } catch (error) {
    setAddAttendeeStatus(error.message || "Unable to remove attendee.", true);
  } finally {
    removeButton.disabled = false;
    removeButton.textContent = "Remove";
  }
});

manageUsersAttendeeSearch?.addEventListener("input", applyManageUserAttendeeFilter);

manageUsersAttendeeBody?.addEventListener("click", async event => {
  const actionButton = event.target.closest("button[data-action]");
  if (!actionButton) {
    return;
  }

  const row = event.target.closest("tr[data-attendee-id]");
  const attendeeId = row?.dataset.attendeeId || "";
  const action = actionButton.dataset.action || "";
  if (!attendeeId || !action || !manageUsersSelectedEventId) {
    return;
  }

  actionButton.disabled = true;
  const originalLabel = actionButton.textContent;
  actionButton.textContent = action === "approve" ? "Approving..." : "Removing...";

  try {
    const response = await fetchWithPathFallback("/organizer-event-attendee-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Accept": "application/json",
      },
      body: new URLSearchParams({ attendeeId, action }).toString(),
    });
    await parseApiJson(response);
    await loadManageUsersAttendees(manageUsersSelectedEventId);
  } catch (error) {
    actionButton.textContent = error.message || "Failed";
  } finally {
    actionButton.disabled = false;
    actionButton.textContent = originalLabel || "Action";
  }
});

profileUploadBtn?.addEventListener("click", () => {
  profileImageInput?.click();
});

profileImageInput?.addEventListener("change", async () => {
  const file = profileImageInput.files?.[0];
  if (!file) {
    return;
  }

  const formData = new FormData();
  formData.append("image", file);
  setProfileStatus(profileDetailsStatus, "Uploading photo...");

  try {
    const response = await fetch(`${getContextPath()}/upload-profile-image`, {
      method: "POST",
      body: formData,
      headers: {
        "Accept": "application/json"
      }
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Unable to upload photo.");
    }
    applyOrganizerProfile({
      userName: organizerNameNodes[0]?.textContent || "Organizer",
      userEmail: profileEmail?.value || "",
      userRole: profileRole?.value || "organizer",
      phone: profilePhone?.value || "",
      bio: profileBio?.value || "",
      profileImage: data.imageUrl,
    });
    setProfileStatus(profileDetailsStatus, data.message || "Photo uploaded successfully.");
  } catch (error) {
    setProfileStatus(profileDetailsStatus, error.message || "Unable to upload photo.", true);
  }
});

profileCancelBtn?.addEventListener("click", () => {
  if (!organizerProfileSnapshot) {
    return;
  }
  if (profileFirstName) profileFirstName.value = organizerProfileSnapshot.firstName || "";
  if (profileLastName) profileLastName.value = organizerProfileSnapshot.lastName || "";
  if (profileEmail) profileEmail.value = organizerProfileSnapshot.email || "";
  if (profileRole) profileRole.value = organizerProfileSnapshot.role || "organizer";
  if (profilePhone) profilePhone.value = organizerProfileSnapshot.phone || "";
  if (profileBio) profileBio.value = organizerProfileSnapshot.bio || "";
  setProfileStatus(profileDetailsStatus, "");
});

profileDetailsForm?.addEventListener("submit", async event => {
  event.preventDefault();
  const firstName = profileFirstName?.value.trim() || "";
  const lastName = profileLastName?.value.trim() || "";
  const role = profileRole?.value.trim() || "organizer";
  const phone = profilePhone?.value.trim() || "";
  const bio = profileBio?.value.trim() || "";

  if (!firstName) {
    setProfileStatus(profileDetailsStatus, "First name is required.", true);
    return;
  }

  if (profileSaveBtn) {
    profileSaveBtn.disabled = true;
    profileSaveBtn.textContent = "Saving...";
  }

  try {
    const response = await fetch(`${getContextPath()}/update-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Accept": "application/json"
      },
      body: new URLSearchParams({
        firstName,
        lastName,
        role,
        phone,
        bio,
      }).toString()
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Unable to update profile.");
    }
    applyOrganizerProfile(data);
    setProfileStatus(profileDetailsStatus, data.message || "Profile updated successfully.");
  } catch (error) {
    setProfileStatus(profileDetailsStatus, error.message || "Unable to update profile.", true);
  } finally {
    if (profileSaveBtn) {
      profileSaveBtn.disabled = false;
      profileSaveBtn.textContent = "Save Changes";
    }
  }
});

profilePasswordForm?.addEventListener("submit", async event => {
  event.preventDefault();
  const currentPassword = profileCurrentPassword?.value || "";
  const newPassword = profileNewPassword?.value || "";
  const confirmPassword = profileConfirmPassword?.value || "";

  if (!currentPassword || !newPassword || !confirmPassword) {
    setProfileStatus(profilePasswordStatus, "Please complete all password fields.", true);
    return;
  }

  if (profilePasswordSaveBtn) {
    profilePasswordSaveBtn.disabled = true;
    profilePasswordSaveBtn.textContent = "Updating...";
  }

  try {
    const response = await fetch(`${getContextPath()}/update-profile-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Accept": "application/json"
      },
      body: new URLSearchParams({
        currentPassword,
        newPassword,
        confirmPassword,
      }).toString()
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Unable to update password.");
    }
    profilePasswordForm.reset();
    setProfileStatus(profilePasswordStatus, data.message || "Password updated successfully.");
  } catch (error) {
    setProfileStatus(profilePasswordStatus, error.message || "Unable to update password.", true);
  } finally {
    if (profilePasswordSaveBtn) {
      profilePasswordSaveBtn.disabled = false;
      profilePasswordSaveBtn.textContent = "Update Password";
    }
  }
});

const closeLogoutModal = () => {
  const modal = document.getElementById("logoutModal");
  if (modal) {
    modal.hidden = true;
  }
};

const ensureLogoutModal = () => {
  let modal = document.getElementById("logoutModal");

  if (!modal) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <div class="logout-modal" id="logoutModal" hidden>
          <div class="logout-modal-backdrop" id="logoutModalBackdrop"></div>
          <div class="logout-modal-card" role="dialog" aria-modal="true" aria-labelledby="logoutModalTitle">
            <div class="logout-modal-icon">
              <i class="fa-solid fa-right-from-bracket"></i>
            </div>
            <h3 id="logoutModalTitle">Sign out?</h3>
            <p>Do you really want to sign out from your account?</p>
            <div class="logout-modal-actions">
              <button type="button" class="logout-cancel-btn" id="logoutCancelBtn">Cancel</button>
              <a href="/logout" class="logout-confirm-btn" id="logoutConfirmBtn">Sign out</a>
            </div>
          </div>
        </div>
      `
    );

    modal = document.getElementById("logoutModal");
    document.getElementById("logoutModalBackdrop")?.addEventListener("click", closeLogoutModal);
    document.getElementById("logoutCancelBtn")?.addEventListener("click", closeLogoutModal);
  }

  return modal;
};

if (logoutLink) {
  logoutLink.addEventListener("click", event => {
    event.preventDefault();
    const modal = ensureLogoutModal();
    if (modal) {
      modal.hidden = false;
    }
  });
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeLogoutModal();
  }
});
