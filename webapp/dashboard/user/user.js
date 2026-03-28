function toggleSidebar(){

const sidebar = document.querySelector(".sidebar");

sidebar.classList.toggle("active");

}

/* close sidebar when menu item clicked */

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


// Event Search System (Browse page) se
const browseSearch = document.getElementById("browseSearch");
const topbarBrowseSearch = document.querySelector(".top-actions .searchbox");
const browseResults = document.getElementById("browseResults");
const categoryButtons = document.querySelectorAll(".browse-category-card, #allCategoriesBtn");
const resultsCount = document.getElementById("resultsCount");
const browseEmptyState = document.getElementById("browseEmptyState");
const registerModal = document.getElementById("registerModal");
const registerModalBackdrop = document.getElementById("registerModalBackdrop");
const registerModalClose = document.getElementById("registerModalClose");
const registerCancelBtn = document.getElementById("registerCancelBtn");
const registerEventForm = document.getElementById("registerEventForm");
const registerEventId = document.getElementById("registerEventId");
const registerModalCategory = document.getElementById("registerModalCategory");
const registerModalTitle = document.getElementById("registerModalTitle");
const registerModalImage = document.getElementById("registerModalImage");
const registerModalDate = document.getElementById("registerModalDate");
const registerModalTime = document.getElementById("registerModalTime");
const registerModalLocation = document.getElementById("registerModalLocation");
const registerModalPrice = document.getElementById("registerModalPrice");
const registerModalTicketType = document.getElementById("registerModalTicketType");
const registerModalSeatInfo = document.getElementById("registerModalSeatInfo");
const registerTicketTypeField = document.getElementById("registerTicketTypeField");
const registerCity = document.getElementById("registerCity");
const registerPaymentMethod = document.getElementById("registerPaymentMethod");
const registerAddress = document.getElementById("registerAddress");
const registerAttendeeName = document.getElementById("registerAttendeeName");
const registerAttendeeEmail = document.getElementById("registerAttendeeEmail");
const registerAttendeePhone = document.getElementById("registerAttendeePhone");
const registerTicketCount = document.getElementById("registerTicketCount");
const registerSpecialRequest = document.getElementById("registerSpecialRequest");
const registerConsent = document.getElementById("registerConsent");
const registerFormStatus = document.getElementById("registerFormStatus");
const registerSubmitBtn = document.getElementById("registerSubmitBtn");
let activeRegisterButton = null;
let activeBaseEventPrice = 0;
let activeBaseEventPriceLabel = "-";
let browseCards = [];
let activeBrowseCategory = "all";
let runBrowseResultsFilter = null;

const refreshBrowseCards = () => {
  browseCards = Array.from(document.querySelectorAll("#browseResults .browse-card"));
};

const buildBrowseSearchText = event => [
  event.eventName,
  event.location,
  event.category,
  event.ticketType,
  event.seatInfo,
  event.eventDate,
  event.eventTime,
].join(" ").toLowerCase();

const formatBrowseBadge = category => {
  const text = String(category || "event").trim().toLowerCase();
  return text ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : "Event";
};

const renderBrowseCard = event => `
  <article
    class="browse-card"
    data-category="${escapeHtml(event.category || "general")}"
    data-event-id="${escapeHtml(event.id || "")}"
    data-event-name="${escapeHtml(event.eventName || "")}"
    data-event-date="${escapeHtml(event.eventDate || "")}"
    data-event-time="${escapeHtml(event.eventTime || "")}"
    data-location="${escapeHtml(event.location || "")}"
    data-price="${escapeHtml(event.price || "Rs 0")}"
    data-ticket-type="${escapeHtml(event.ticketType || "Entry Pass")}"
    data-seat-info="${escapeHtml(event.seatInfo || "Open Seating")}"
    data-organizer-phone="${escapeHtml(event.organizerPhone || "")}"
    data-search="${escapeHtml(buildBrowseSearchText(event))}"
  >
    <img src="${escapeHtml(event.imageUrl || "/assets/dashboard/images/dsupimg1.jpg")}" alt="${escapeHtml(event.eventName || "Event")}">
    <div class="browse-info">
      <span class="browse-badge">${escapeHtml(formatBrowseBadge(event.category))}</span>
      <h4>${escapeHtml(event.eventName || "Untitled Event")}</h4>
      <p>${escapeHtml(event.eventTime || "-")}</p>
      <p>${escapeHtml(event.price || "Rs 0")}</p>
      <p>${escapeHtml(event.location || "Online Event")} &bull; ${escapeHtml(event.eventDate || "-")}</p>
      <button type="button" class="register-event-btn">Register Now</button>
    </div>
  </article>
`;

if (browseSearch && browseResults) {

  const updateBrowseResults = () => {
    const searchValue = browseSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    browseCards.forEach(card => {
      const cardCategory = card.dataset.category || "";
      const searchableText = card.dataset.search?.toLowerCase() || "";
      const matchesCategory = activeBrowseCategory === "all" || cardCategory === activeBrowseCategory;
      const matchesSearch = !searchValue || searchableText.includes(searchValue);
      const shouldShow = matchesCategory && matchesSearch;

      card.hidden = !shouldShow;

      if (shouldShow) {
        visibleCount += 1;
      }
    });

    if (resultsCount) {
      resultsCount.textContent = String(visibleCount);
    }
    if (browseEmptyState) {
      browseEmptyState.hidden = visibleCount !== 0;
    }
  };
  runBrowseResultsFilter = updateBrowseResults;

  browseSearch.addEventListener("input", updateBrowseResults);

  if (topbarBrowseSearch) {
    topbarBrowseSearch.addEventListener("input", () => {
      browseSearch.value = topbarBrowseSearch.value;
      updateBrowseResults();
    });

    browseSearch.addEventListener("input", () => {
      topbarBrowseSearch.value = browseSearch.value;
    });
  }

  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      activeBrowseCategory = button.dataset.category || "all";

      categoryButtons.forEach(item => item.classList.remove("active"));
      button.classList.add("active");

      updateBrowseResults();
    });
  });

  refreshBrowseCards();
  updateBrowseResults();
}

if (browseResults) {
  browseResults.addEventListener("click", event => {
    const registerButton = event.target.closest(".register-event-btn, .register-again-btn");
    if (!registerButton) {
      return;
    }

    event.preventDefault();

    if (registerButton.disabled) {
      return;
    }

    openRegisterModal(registerButton);
  });
}

const ticketSearch = document.getElementById("ticketSearch");
const ticketSearchTop = document.getElementById("ticketSearchTop");
const downloadAllTicketsBtn = document.getElementById("downloadAllTicketsBtn");
const ticketCards = document.querySelectorAll("#userTicketsList .ticket-page-card");
const ticketFilterButtons = document.querySelectorAll(".ticket-filter-btn");
const ticketResultsCount = document.getElementById("ticketResultsCount");
const ticketEmptyState = document.getElementById("ticketEmptyState");
const ticketsList = document.getElementById("userTicketsList");
const totalTicketsCount = document.getElementById("totalTicketsCount");
const upcomingTicketsCount = document.getElementById("upcomingTicketsCount");
const usedTicketsCount = document.getElementById("usedTicketsCount");
const ticketsHeading = document.getElementById("ticketsHeading");
const bookingsSearch = document.getElementById("bookingsSearch");
const bookingsHeading = document.getElementById("bookingsHeading");
const bookingsPageTitle = document.getElementById("bookingsPageTitle");
const bookingsResultsCount = document.getElementById("bookingsResultsCount");
const bookingsList = document.getElementById("bookingsList");
const bookingsEmptyState = document.getElementById("bookingsEmptyState");
const calendarSearch = document.getElementById("calendarSearch");
const calendarSearchTop = document.getElementById("calendarSearchTop");
const calendarDateSearch = document.getElementById("calendarDateSearch");
const calendarClearDateBtn = document.getElementById("calendarClearDateBtn");
const calendarFilterButtons = document.querySelectorAll("[data-calendar-filter]");
const calendarMonthTitle = document.getElementById("calendarMonthTitle");
const calendarPrevMonthBtn = document.getElementById("calendarPrevMonthBtn");
const calendarNextMonthBtn = document.getElementById("calendarNextMonthBtn");
const calendarTimelineTitle = document.getElementById("calendarTimelineTitle");
const calendarEventCount = document.getElementById("calendarEventCount");
const calendarTimeline = document.getElementById("calendarTimeline");
const calendarEmptyState = document.getElementById("calendarEmptyState");
const dateStrip = document.getElementById("dateStrip");
const contactForm = document.getElementById("contactForm");
const contactSubmitButton = document.getElementById("contactSubmitButton");
const contactFormStatus = document.getElementById("contactFormStatus");
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
const profileImg = document.querySelector(".profile-img");
const uploadBtn = document.querySelector(".upload-btn");
const bookingEditModal = document.getElementById("bookingEditModal");
const bookingEditModalBackdrop = document.getElementById("bookingEditModalBackdrop");
const bookingEditModalClose = document.getElementById("bookingEditModalClose");
const bookingEditCancelBtn = document.getElementById("bookingEditCancelBtn");
const bookingEditForm = document.getElementById("bookingEditForm");
const bookingEditId = document.getElementById("bookingEditId");
const bookingEditModalCategory = document.getElementById("bookingEditModalCategory");
const bookingEditModalTitle = document.getElementById("bookingEditModalTitle");
const bookingEditModalImage = document.getElementById("bookingEditModalImage");
const bookingEditModalDate = document.getElementById("bookingEditModalDate");
const bookingEditModalTime = document.getElementById("bookingEditModalTime");
const bookingEditModalLocation = document.getElementById("bookingEditModalLocation");
const bookingEditModalTicketCode = document.getElementById("bookingEditModalTicketCode");
const bookingEditModalOrganizerPhone = document.getElementById("bookingEditModalOrganizerPhone");
const bookingEditModalStatus = document.getElementById("bookingEditModalStatus");
const bookingEditAttendeeName = document.getElementById("bookingEditAttendeeName");
const bookingEditAttendeeEmail = document.getElementById("bookingEditAttendeeEmail");
const bookingEditAttendeePhone = document.getElementById("bookingEditAttendeePhone");
const bookingEditTicketType = document.getElementById("bookingEditTicketType");
const bookingEditTicketCount = document.getElementById("bookingEditTicketCount");
const bookingEditCity = document.getElementById("bookingEditCity");
const bookingEditPaymentMethod = document.getElementById("bookingEditPaymentMethod");
const bookingEditAddress = document.getElementById("bookingEditAddress");
const bookingEditSpecialRequest = document.getElementById("bookingEditSpecialRequest");
const bookingEditStatusMessage = document.getElementById("bookingEditStatusMessage");
const bookingEditSubmitBtn = document.getElementById("bookingEditSubmitBtn");
const bookingCancelModal = document.getElementById("bookingCancelModal");
const bookingCancelModalBackdrop = document.getElementById("bookingCancelModalBackdrop");
const bookingCancelModalDescription = document.getElementById("bookingCancelModalDescription");
const bookingCancelCloseBtn = document.getElementById("bookingCancelCloseBtn");
const bookingCancelConfirmBtn = document.getElementById("bookingCancelConfirmBtn");
const sidebarUserName = document.getElementById("sidebarUserName");
const dashboardSidebarUserName = document.getElementById("dashboardSidebarUserName");
const dashboardStats = document.getElementById("dashboardStats");
const dashboardContent = document.getElementById("dashboardContent");
const dashboardTicketsSection = document.getElementById("dashboardTicketsSection");
const dashboardHistorySection = document.getElementById("dashboardHistorySection");
const dashboardEmptyState = document.getElementById("dashboardEmptyState");
const dashboardPageTitle = document.getElementById("dashboardPageTitle");
const registeredEventsCount = document.getElementById("registeredEventsCount");
const ticketsPurchasedCount = document.getElementById("ticketsPurchasedCount");
const eventsAttendedCount = document.getElementById("eventsAttendedCount");
const totalSpentCount = document.getElementById("totalSpentCount");
const dashboardUpcomingEvents = document.getElementById("dashboardUpcomingEvents");
const dashboardTicketsGrid = document.getElementById("dashboardTicketsGrid");
const dashboardHistoryBody = document.getElementById("dashboardHistoryBody");
const dashboardActivityList = document.getElementById("dashboardActivityList");
const dashboardRemindersList = document.getElementById("dashboardRemindersList");
const dashboardRemindersSection = document.getElementById("dashboardRemindersSection");
const logoutLink = document.querySelector(".logout");
const openReviewQuickAction = document.getElementById("openReviewQuickAction");
const openShareQuickAction = document.getElementById("openShareQuickAction");
const logoutModal = document.getElementById("logoutModal");
const logoutModalBackdrop = document.getElementById("logoutModalBackdrop");
const logoutCancelBtn = document.getElementById("logoutCancelBtn");
const reviewModal = document.getElementById("reviewModal");
const reviewModalBackdrop = document.getElementById("reviewModalBackdrop");
const reviewCancelBtn = document.getElementById("reviewCancelBtn");
const shareModal = document.getElementById("shareModal");
const shareModalBackdrop = document.getElementById("shareModalBackdrop");
const shareCancelBtn = document.getElementById("shareCancelBtn");
const shareCopyBtn = document.getElementById("shareCopyBtn");
const shareEventLink = document.getElementById("shareEventLink");
const shareWhatsappBtn = document.getElementById("shareWhatsappBtn");
const shareTelegramBtn = document.getElementById("shareTelegramBtn");
const shareTwitterBtn = document.getElementById("shareTwitterBtn");
const shareFacebookBtn = document.getElementById("shareFacebookBtn");
const shareGmailBtn = document.getElementById("shareGmailBtn");
const shareInstagramBtn = document.getElementById("shareInstagramBtn");
const shareModalTitle = document.getElementById("shareModalTitle");
const shareModalDescription = document.getElementById("shareModalDescription");
const shareStatusMessage = document.getElementById("shareStatusMessage");
const ticketPreviewModal = document.getElementById("ticketPreviewModal");
const ticketPreviewBackdrop = document.getElementById("ticketPreviewBackdrop");
const ticketPreviewClose = document.getElementById("ticketPreviewClose");
const ticketPreviewCancelBtn = document.getElementById("ticketPreviewCancelBtn");
const ticketPreviewShareBtn = document.getElementById("ticketPreviewShareBtn");
const ticketPreviewDownloadBtn = document.getElementById("ticketPreviewDownloadBtn");
const ticketPreviewBody = document.getElementById("ticketPreviewBody");
const ticketPreviewTitle = document.getElementById("ticketPreviewTitle");
const ticketPreviewSubtitle = document.getElementById("ticketPreviewSubtitle");
const reviewForm = document.getElementById("reviewForm");
const reviewModalEventName = document.getElementById("reviewModalEventName");
const reviewRatingInput = document.getElementById("reviewRating");
const reviewStars = document.querySelectorAll(".review-star");
const shareOptionButtons = [
  shareWhatsappBtn,
  shareTelegramBtn,
  shareTwitterBtn,
  shareFacebookBtn,
  shareGmailBtn,
  shareInstagramBtn,
].filter(Boolean);

let activeShareTicket = null;
let activePreviewTicket = null;
let activeBookingRecord = null;
let pendingCancelBooking = null;
let activeProfileSnapshot = null;
let currentUserEmail = "";
let userHasRegisteredEvents = false;

const LEGACY_REGISTERED_TICKETS_STORAGE_KEY = "eventhub_registered_tickets";
const REGISTERED_TICKETS_STORAGE_KEY_PREFIX = "eventhub_registered_tickets:";
const LAST_ACTIVE_USER_STORAGE_KEY = "eventhub_last_active_user_email";
const restrictedMenuHrefSuffixes = ["tickets.html", "bookings.html", "profile.html"];

const updateRestrictedNavigationVisibility = () => {
  const sidebarMenuItems = document.querySelectorAll(".menu li");
  sidebarMenuItems.forEach(menuItem => {
    const link = menuItem.querySelector("a");
    if (!link) {
      return;
    }

    const href = (link.getAttribute("href") || "").toLowerCase();
    const shouldRestrict = restrictedMenuHrefSuffixes.some(suffix => href.endsWith(suffix));
    if (!shouldRestrict) {
      return;
    }

    menuItem.hidden = false;
  });

  const topbarProfileLink = document.querySelector(".topbar-profile-link");
  if (topbarProfileLink) {
    topbarProfileLink.hidden = false;
  }

  const restrictedActionCards = document.querySelectorAll(".actions .action-card");
  restrictedActionCards.forEach(card => {
    const clickTarget = String(card.getAttribute("onclick") || "").toLowerCase();
    const shouldRestrict = restrictedMenuHrefSuffixes.some(suffix => clickTarget.includes(suffix));
    if (!shouldRestrict) {
      return;
    }
    card.hidden = false;
  });
};

const enforceRestrictedPageAccess = () => {
  return true;
};

updateRestrictedNavigationVisibility();

const splitUserName = userName => {
  const parts = String(userName || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) {
    return { firstName: "", lastName: "" };
  }

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
};

const formatUserRole = role => {
  if (!role) {
    return "";
  }

  return role.charAt(0).toUpperCase() + role.slice(1);
};

const applyUserProfile = data => {
  if (!data) {
    return;
  }

  const userName = String(data.userName || "").trim();
  const userEmail = String(data.userEmail || "").trim();
  const userRole = formatUserRole(String(data.userRole || "").trim());
  const profileImage = data.profileImage || data.profile_image || "../images/logo1.png";
  const { firstName, lastName } = splitUserName(userName);

  if (userEmail) {
    const previousUserEmail = String(window.localStorage.getItem(LAST_ACTIVE_USER_STORAGE_KEY) || "");
    if (previousUserEmail && previousUserEmail !== userEmail) {
      window.localStorage.removeItem(LEGACY_REGISTERED_TICKETS_STORAGE_KEY);
    }
    window.localStorage.setItem(LAST_ACTIVE_USER_STORAGE_KEY, userEmail);
    currentUserEmail = userEmail;
  }

  if (sidebarUserName && userName) {
    sidebarUserName.textContent = userName;
  }

  if (dashboardSidebarUserName && userName) {
    dashboardSidebarUserName.textContent = userName;
  }

  document.querySelectorAll("[data-user-name]").forEach(element => {
    if (userName) {
      element.textContent = userName;
    }
  });

  if (profileImg) {
    profileImg.src = profileImage;
    profileImg.alt = `${userName}'s profile photo`;
  }

  document.querySelectorAll("[data-user-first-name]").forEach(element => {
    if (!firstName) {
      return;
    }

    if ("value" in element) {
      element.value = firstName;
      return;
    }

    element.textContent = firstName;
  });

  document.querySelectorAll("[data-user-last-name]").forEach(element => {
    if ("value" in element) {
      element.value = lastName;
      return;
    }

    element.textContent = lastName;
  });

  document.querySelectorAll("[data-user-email]").forEach(element => {
    if (!userEmail) {
      return;
    }

    if ("value" in element) {
      element.value = userEmail;
      return;
    }

    element.textContent = userEmail;
  });

  document.querySelectorAll("[data-user-role]").forEach(element => {
    if (!userRole) {
      return;
    }

    if ("value" in element) {
      element.value = userRole.toLowerCase();
      return;
    }

    element.textContent = userRole;
  });

  if (profilePhone && "phone" in data) {
    profilePhone.value = String(data.phone || "");
  }

  if (profileBio && "bio" in data) {
    profileBio.value = String(data.bio || "");
  }

  activeProfileSnapshot = {
    firstName,
    lastName,
    email: userEmail,
    role: String(data.userRole || "").trim().toLowerCase(),
    phone: String(data.phone || ""),
    bio: String(data.bio || ""),
  };
};

const setContactFormStatus = (message, type) => {
  if (!contactFormStatus) {
    return;
  }

  contactFormStatus.hidden = false;
  contactFormStatus.textContent = message;
  contactFormStatus.className = `contact-form-status ${type}`;
};

const setProfileStatus = (element, message = "", isError = false) => {
  if (!element) {
    return;
  }

  element.hidden = !message;
  element.textContent = message;
  element.classList.toggle("error", isError);
};

const readJsonResponse = async (response, fallbackMessage) => {
  const responseText = await response.text();
  let data = {};

  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch (error) {
      throw new Error(fallbackMessage);
    }
  }

  if (!response.ok) {
    throw new Error(data.error || fallbackMessage);
  }

  return data;
};

const escapeHtml = value => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#39;");

const buildTicketSearchText = ticket => [
  ticket.eventName,
  ticket.location,
  String(ticket.location || "").split(/[,-]/).map(part => part.trim()).join(" "),
  ticket.ticketType,
  ticket.seatInfo,
  ticket.ticketCode
].join(" ").toLowerCase();

const renderTicketCard = ticket => {
  const searchableText = buildTicketSearchText(ticket);
  const actionLabel = ticket.status === "used" ? "Receipt" : ticket.status === "pending" ? "Pending" : "Download";
  const secondaryLabel = ticket.status === "used" ? "Review" : "Share";
  const primaryIcon = ticket.status === "used" ? "fa-receipt" : ticket.status === "pending" ? "fa-clock" : "fa-download";
  const secondaryIcon = ticket.status === "used" ? "fa-star" : "fa-share-nodes";

  return `
    <article
      class="ticket-card ticket-page-card"
      data-ticket-status="${escapeHtml(ticket.status)}"
      data-ticket-search="${escapeHtml(searchableText)}"
      data-event-name="${escapeHtml(ticket.eventName)}"
      data-event-date="${escapeHtml(ticket.eventDate)}"
      data-event-time="${escapeHtml(ticket.eventTime)}"
      data-location="${escapeHtml(ticket.location)}"
      data-ticket-type="${escapeHtml(ticket.ticketType)}"
      data-seat-info="${escapeHtml(ticket.seatInfo)}"
      data-ticket-code="${escapeHtml(ticket.ticketCode)}"
      data-price="${escapeHtml(ticket.price)}"
      data-image-url="${escapeHtml(ticket.imageUrl)}"
      data-ticket-owner="${escapeHtml(ticket.owner || "")}"
    >
      <img src="${escapeHtml(ticket.imageUrl)}" alt="${escapeHtml(ticket.eventName)} ticket">
      <div class="ticket-content">
        <div class="ticket-card-top">
          <span class="ticket-status ${escapeHtml(ticket.status)}">${escapeHtml(ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1))}</span>
          <span class="ticket-id">${escapeHtml(ticket.ticketCode)}</span>
        </div>
        <h4>${escapeHtml(ticket.eventName)}</h4>
        <p class="ticket-event-meta"><i class="fa-regular fa-calendar"></i> ${escapeHtml(ticket.eventDate)} &bull; ${escapeHtml(ticket.eventTime)}</p>
        <p class="ticket-event-meta"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(ticket.location)}</p>
        <div class="ticket-meta">
          <strong>${escapeHtml(ticket.ticketType)}</strong>
          <span>${escapeHtml(ticket.seatInfo)}</span>
        </div>
        <div class="ticket-page-footer">
          <span class="ticket-price">${escapeHtml(ticket.price)}</span>
          <div class="ticket-actions">
            <button class="btn-download" type="button"><i class="fa-solid ${primaryIcon}"></i> ${actionLabel}</button>
            <button class="btn-share" type="button"><i class="fa-solid ${secondaryIcon}"></i> ${secondaryLabel}</button>
          </div>
        </div>
      </div>
    </article>
  `;
};

const renderDashboardEventCard = ticket => {
  const hasTicket = Boolean(ticket.ticketCode || ticket.owner);
  const actionHref = hasTicket ? "/assets/dashboard/user/tickets.html" : "/assets/dashboard/user/browse.html";
  const actionLabel = hasTicket ? "View Ticket" : "Register Now";

  return `
  <div class="event-card">
    <img src="${escapeHtml(ticket.imageUrl)}" alt="${escapeHtml(ticket.eventName)}">
    <div class="event-info">
      <h4>${escapeHtml(ticket.eventName)}</h4>
      <p class="meta"><i class="fa-regular fa-calendar"></i> ${escapeHtml(ticket.eventDate)} &bull; ${escapeHtml(ticket.eventTime)}</p>
      <p class="meta"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(ticket.location)}</p>
      <p class="meta"><i class="fa-solid fa-ticket"></i> ${escapeHtml(ticket.ticketType || "General Entry")}</p>
      <div class="event-bottom">
        <span class="badge ${ticket.status === "pending" ? "badge-yellow" : "badge-green"}">${escapeHtml(ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1))}</span>
        <a href="${actionHref}" class="ticket-link">${actionLabel}</a>
      </div>
    </div>
  </div>
`;
};

const renderDashboardMiniTicket = ticket => `
  <div class="ticket-card">
    <img src="${escapeHtml(ticket.imageUrl)}" alt="${escapeHtml(ticket.eventName)}">
    <div class="ticket-content">
      <h4>${escapeHtml(ticket.eventName)}</h4>
      <span class="ticket-date">${escapeHtml(ticket.eventDate)}</span>
      <div class="ticket-meta">
        <strong>${escapeHtml(ticket.price)}</strong>
        <span>${escapeHtml(ticket.seatInfo)}</span>
      </div>
      <div class="ticket-actions">
        <button
          class="btn-download"
          type="button"
          data-event-name="${escapeHtml(ticket.eventName)}"
          data-event-date="${escapeHtml(ticket.eventDate)}"
          data-event-time="${escapeHtml(ticket.eventTime)}"
          data-location="${escapeHtml(ticket.location)}"
          data-ticket-type="${escapeHtml(ticket.ticketType)}"
          data-seat-info="${escapeHtml(ticket.seatInfo)}"
          data-ticket-code="${escapeHtml(ticket.ticketCode)}"
          data-price="${escapeHtml(ticket.price)}"
          data-image-url="${escapeHtml(ticket.imageUrl)}"
          data-ticket-owner="${escapeHtml(ticket.owner || "")}"
        >
          <i class="fa-solid fa-download"></i> Download
        </button>
        <button
          class="btn-share"
          type="button"
          data-event-name="${escapeHtml(ticket.eventName)}"
          data-event-date="${escapeHtml(ticket.eventDate)}"
          data-event-time="${escapeHtml(ticket.eventTime)}"
          data-location="${escapeHtml(ticket.location)}"
          data-ticket-type="${escapeHtml(ticket.ticketType)}"
          data-seat-info="${escapeHtml(ticket.seatInfo)}"
          data-ticket-code="${escapeHtml(ticket.ticketCode)}"
          data-price="${escapeHtml(ticket.price)}"
          data-image-url="${escapeHtml(ticket.imageUrl)}"
          data-ticket-owner="${escapeHtml(ticket.owner || "")}"
        >
          <i class="fa-solid fa-share-nodes"></i> Share
        </button>
      </div>
    </div>
  </div>
`;

const renderDashboardHistoryRow = ticket => `
  <tr>
    <td class="event-col">
      <img src="${escapeHtml(ticket.imageUrl)}" alt="${escapeHtml(ticket.eventName)}">
      <span>${escapeHtml(ticket.eventName)}</span>
    </td>
    <td>${escapeHtml(ticket.eventDate)}</td>
    <td>${escapeHtml(ticket.ticketType)}</td>
    <td class="rating">
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-regular fa-star"></i>
    </td>
    <td class="actions">
      <a href="#">View Receipt</a>
      <a href="#" class="open-review-modal" data-event-name="${escapeHtml(ticket.eventName)}">Review</a>
    </td>
  </tr>
`;

const renderDashboardActivity = ticket => `
  <li>
    <div class="activity-icon">
      <i class="fa-solid fa-ticket"></i>
    </div>
    <div class="activity-info">
      <p>${escapeHtml(ticket.eventName)} ticket ${escapeHtml(ticket.status)}</p>
      <span>${escapeHtml(ticket.eventDate)} at ${escapeHtml(ticket.eventTime)}</span>
    </div>
  </li>
`;

const renderDashboardReminder = ticket => `
  <div class="reminder-item">
    <i class="fa-regular fa-bell"></i>
    <div>
      <p>${escapeHtml(ticket.eventName)} is on your schedule</p>
      <span>${escapeHtml(ticket.eventDate)} &bull; ${escapeHtml(ticket.eventTime)}</span>
    </div>
  </div>
`;

const buildBookingSearchText = booking => [
  buildTicketSearchText(booking),
  booking.attendeeName,
  booking.attendeeEmail,
  booking.attendeePhone,
  booking.city,
  booking.paymentMethod,
  booking.bookingStatus,
].join(" ").toLowerCase();

const renderBookingItem = booking => `
  <article
    class="booking-item ${escapeHtml(booking.bookingStatus || "active")}"
    data-booking-id="${escapeHtml(booking.bookingId)}"
    data-booking-search="${escapeHtml(buildBookingSearchText(booking))}"
    data-event-id="${escapeHtml(booking.eventId)}"
    data-event-name="${escapeHtml(booking.eventName)}"
    data-event-date="${escapeHtml(booking.eventDate)}"
    data-event-time="${escapeHtml(booking.eventTime)}"
    data-location="${escapeHtml(booking.location)}"
    data-category="${escapeHtml(booking.category)}"
    data-organizer-phone="${escapeHtml(booking.organizerPhone)}"
    data-image-url="${escapeHtml(booking.imageUrl)}"
    data-ticket-code="${escapeHtml(booking.ticketCode)}"
    data-ticket-type="${escapeHtml(booking.ticketType)}"
    data-ticket-count="${escapeHtml(booking.ticketCount)}"
    data-seat-info="${escapeHtml(booking.seatInfo)}"
    data-booking-price="${escapeHtml(booking.bookingPrice)}"
    data-payment-method="${escapeHtml(booking.paymentMethod)}"
    data-city="${escapeHtml(booking.city)}"
    data-address="${escapeHtml(booking.address)}"
    data-special-request="${escapeHtml(booking.specialRequest)}"
    data-attendee-name="${escapeHtml(booking.attendeeName)}"
    data-attendee-email="${escapeHtml(booking.attendeeEmail)}"
    data-attendee-phone="${escapeHtml(booking.attendeePhone)}"
    data-booking-status="${escapeHtml(booking.bookingStatus)}"
  >
    <img class="booking-cover" src="${escapeHtml(booking.imageUrl)}" alt="${escapeHtml(booking.eventName)}">
    <div class="booking-body">
      <div class="booking-head">
        <div>
          <h4>${escapeHtml(booking.eventName)}</h4>
          <p>${escapeHtml(booking.eventDate)} at ${escapeHtml(booking.eventTime)} • ${escapeHtml(booking.location)}</p>
        </div>
        <span class="booking-status ${escapeHtml(booking.bookingStatus)}">${escapeHtml(booking.bookingStatus)}</span>
      </div>
      <div class="booking-grid">
        <div class="booking-field">
          <span>Ticket Code</span>
          <strong>${escapeHtml(booking.ticketCode)}</strong>
        </div>
        <div class="booking-field">
          <span>Ticket Type</span>
          <strong>${escapeHtml(booking.ticketType)}</strong>
        </div>
        <div class="booking-field">
          <span>Tickets</span>
          <strong>${escapeHtml(booking.ticketCount)}</strong>
        </div>
        <div class="booking-field">
          <span>Total Price</span>
          <strong>${escapeHtml(booking.bookingPrice)}</strong>
        </div>
        <div class="booking-field">
          <span>Attendee</span>
          <strong>${escapeHtml(booking.attendeeName)}</strong>
        </div>
        <div class="booking-field">
          <span>Phone</span>
          <strong>${escapeHtml(booking.attendeePhone)}</strong>
        </div>
        <div class="booking-field">
          <span>Email</span>
          <strong>${escapeHtml(booking.attendeeEmail)}</strong>
        </div>
        <div class="booking-field">
          <span>Payment</span>
          <strong>${escapeHtml(booking.paymentMethod)}</strong>
        </div>
        <div class="booking-field">
          <span>Organizer Contact</span>
          <strong>${escapeHtml(booking.organizerPhone || "-")}</strong>
        </div>
        <div class="booking-field">
          <span>Seat / Access</span>
          <strong>${escapeHtml(booking.seatInfo)}</strong>
        </div>
        <div class="booking-field wide">
          <span>Address</span>
          <strong>${escapeHtml(booking.address || "-")}</strong>
        </div>
        <div class="booking-field wide">
          <span>Special Request</span>
          <strong>${escapeHtml(booking.specialRequest || "-")}</strong>
        </div>
      </div>
      <div class="booking-actions">
        <button type="button" class="booking-action-btn view-ticket">View Tickets</button>
        <button type="button" class="booking-action-btn edit-booking" ${booking.bookingStatus === "cancelled" ? "disabled" : ""}>Edit Booking</button>
        <button type="button" class="booking-action-btn cancel-booking" ${booking.bookingStatus === "cancelled" ? "disabled" : ""}>Cancel Event</button>
      </div>
    </div>
  </article>
`;

const parseCalendarDate = dateText => {
  const raw = String(dateText || "").trim();
  if (!raw) {
    return null;
  }

  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
};

const formatCalendarMonth = date => date.toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
});

const formatCalendarDayLabel = date => date.toLocaleDateString("en-US", {
  weekday: "short",
});

const formatCalendarTimelineDate = date => date.toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const buildCalendarSearchText = event => [
  event.eventName,
  event.location,
  event.category,
  event.eventDate,
  event.eventTime,
  event.ticketType,
].join(" ").toLowerCase();

const parseDateNumber = value => {
  const number = Number.parseInt(String(value || "").trim(), 10);
  return Number.isNaN(number) ? null : number;
};

const eventMatchesDateSearch = (event, rawSearchText) => {
  const text = String(rawSearchText || "").trim().toLowerCase();
  if (!text) {
    return false;
  }

  const directDate = new Date(text);
  if (!Number.isNaN(directDate.getTime())) {
    return event.parsedDate.getFullYear() === directDate.getFullYear()
      && event.parsedDate.getMonth() === directDate.getMonth()
      && event.parsedDate.getDate() === directDate.getDate();
  }

  const singleDayMatch = text.match(/^\d{1,2}$/);
  if (singleDayMatch) {
    const day = parseDateNumber(singleDayMatch[0]);
    return day !== null && event.parsedDate.getDate() === day;
  }

  const slashOrDashMatch = text.match(/^(\d{1,2})[\/.-](\d{1,2})(?:[\/.-](\d{2,4}))?$/);
  if (!slashOrDashMatch) {
    return false;
  }

  const first = parseDateNumber(slashOrDashMatch[1]);
  const second = parseDateNumber(slashOrDashMatch[2]);
  let year = parseDateNumber(slashOrDashMatch[3]);

  if (first === null || second === null) {
    return false;
  }

  if (year !== null && year < 100) {
    year += 2000;
  }

  const candidates = [
    { day: first, month: second },
    { day: second, month: first },
  ];

  return candidates.some(candidate => {
    if (candidate.day < 1 || candidate.day > 31 || candidate.month < 1 || candidate.month > 12) {
      return false;
    }

    if (year !== null && event.parsedDate.getFullYear() !== year) {
      return false;
    }

    return event.parsedDate.getDate() === candidate.day
      && event.parsedDate.getMonth() + 1 === candidate.month;
  });
};

const normalizeDateInputKey = value => {
  const dateText = String(value || "").trim();
  if (!dateText) {
    return "";
  }

  const parsed = new Date(dateText);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return getCalendarDateKey(parsed);
};

const calendarState = {
  allEvents: [],
  filteredEvents: [],
  activeFilter: "all",
  searchText: "",
  dateSearchKey: "",
  monthKeys: [],
  monthIndex: 0,
  selectedDateKey: "",
};

const getCalendarMonthKey = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
const getCalendarDateKey = date => `${getCalendarMonthKey(date)}-${String(date.getDate()).padStart(2, "0")}`;

const renderCalendarEventItem = event => `
  <div class="event-item">
    <div class="time">${escapeHtml(event.eventTime || "-")}</div>
    <div class="event-card">
      <img src="${escapeHtml(event.imageUrl || "")}" alt="${escapeHtml(event.eventName || "Event")}">
      <div class="event-info">
        <h4>${escapeHtml(event.eventName || "-")}</h4>
        <p>${escapeHtml(event.eventDate || "-")} &bull; ${escapeHtml(event.eventTime || "-")}</p>
        <p>${escapeHtml(event.location || "-")}</p>
        <div class="event-bottom">
          <span class="tag ${event.isRegistered ? "" : "free"}">${event.isRegistered ? "Registered" : "Open"}</span>
          <button type="button" onclick="window.location.href='${event.isRegistered ? "tickets.html" : "browse.html"}'">
            ${event.isRegistered ? "View Ticket" : "Register"}
          </button>
        </div>
      </div>
    </div>
  </div>
`;

const updateCalendarTimeline = () => {
  if (!calendarTimeline || !calendarTimelineTitle || !calendarEventCount) {
    return;
  }

  const eventsForDate = calendarState.filteredEvents.filter(event => event.dateKey === calendarState.selectedDateKey);
  const selectedDate = eventsForDate[0]?.parsedDate
    || calendarState.filteredEvents.find(event => event.dateKey === calendarState.selectedDateKey)?.parsedDate;

  if (!eventsForDate.length || !selectedDate) {
    calendarTimeline.innerHTML = "";
    calendarTimelineTitle.textContent = "No events for selected date";
    calendarEventCount.textContent = "0";
    if (calendarEmptyState) {
      calendarEmptyState.hidden = false;
    }
    return;
  }

  const sortedEvents = [...eventsForDate].sort((a, b) => a.eventTime.localeCompare(b.eventTime));
  const registeredEvents = sortedEvents.filter(event => event.isRegistered);
  const openEvents = sortedEvents.filter(event => !event.isRegistered);
  const registeredHeading = registeredEvents.length
    ? `<p class="meta"><strong>Your registered events:</strong> ${registeredEvents.length}</p>`
    : "";
  const openHeading = openEvents.length && registeredEvents.length
    ? `<p class="meta"><strong>Other events on this date:</strong> ${openEvents.length}</p>`
    : "";

  calendarTimeline.innerHTML = [
    registeredHeading,
    registeredEvents.map(renderCalendarEventItem).join(""),
    openHeading,
    openEvents.map(renderCalendarEventItem).join(""),
  ].join("");
  calendarTimelineTitle.textContent = `Events on ${formatCalendarTimelineDate(selectedDate)}`;
  calendarEventCount.textContent = String(sortedEvents.length);
  if (calendarEmptyState) {
    calendarEmptyState.hidden = true;
  }
};

const updateCalendarDateStrip = () => {
  if (!dateStrip || !calendarMonthTitle) {
    return;
  }

  const monthKey = calendarState.monthKeys[calendarState.monthIndex];
  if (!monthKey) {
    dateStrip.innerHTML = "";
    calendarMonthTitle.textContent = "No Events";
    calendarState.selectedDateKey = "";
    updateCalendarTimeline();
    return;
  }

  const monthEvents = calendarState.filteredEvents.filter(event => event.monthKey === monthKey);
  const uniqueDateMap = new Map();
  monthEvents.forEach(event => {
    if (!uniqueDateMap.has(event.dateKey)) {
      uniqueDateMap.set(event.dateKey, {
        date: event.parsedDate,
        count: 0,
      });
    }
    uniqueDateMap.get(event.dateKey).count += 1;
  });

  const uniqueDates = [...uniqueDateMap.entries()]
    .map(([key, value]) => ({ key, ...value }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  calendarMonthTitle.textContent = formatCalendarMonth(uniqueDates[0]?.date || monthEvents[0]?.parsedDate || new Date());

  if (!uniqueDates.length) {
    dateStrip.innerHTML = "";
    calendarState.selectedDateKey = "";
    updateCalendarTimeline();
    return;
  }

  if (!uniqueDates.some(item => item.key === calendarState.selectedDateKey)) {
    calendarState.selectedDateKey = uniqueDates[0].key;
  }

  dateStrip.innerHTML = uniqueDates.map(item => `
    <button type="button" class="date-pill ${item.key === calendarState.selectedDateKey ? "active" : ""} ${item.count > 0 ? "has-event" : ""}" data-date-key="${item.key}">
      <span>${escapeHtml(formatCalendarDayLabel(item.date))}</span>
      <strong>${escapeHtml(String(item.date.getDate()))}</strong>
    </button>
  `).join("");

  updateCalendarTimeline();
};

const updateCalendarResults = () => {
  const now = new Date();
  const normalizedSearch = calendarState.searchText.trim().toLowerCase();

  let filtered = calendarState.allEvents.filter(event => {
    if (calendarState.activeFilter === "registered" && !event.isRegistered) {
      return false;
    }

    if (calendarState.activeFilter === "upcoming" && event.parsedDate < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
      return false;
    }

    if (!normalizedSearch) {
      return !calendarState.dateSearchKey || event.dateKey === calendarState.dateSearchKey;
    }

    const matchesTextOrDate = buildCalendarSearchText(event).includes(normalizedSearch)
      || eventMatchesDateSearch(event, normalizedSearch);
    const matchesDatePicker = !calendarState.dateSearchKey || event.dateKey === calendarState.dateSearchKey;
    return matchesTextOrDate && matchesDatePicker;
  });

  filtered = filtered.sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime());
  calendarState.filteredEvents = filtered;

  const monthKeys = [...new Set(filtered.map(event => event.monthKey))];
  calendarState.monthKeys = monthKeys;

  if (!monthKeys.length) {
    calendarState.monthIndex = 0;
    calendarState.selectedDateKey = "";
    updateCalendarDateStrip();
    return;
  }

  if (calendarState.monthIndex >= monthKeys.length) {
    calendarState.monthIndex = monthKeys.length - 1;
  }

  if (calendarState.dateSearchKey) {
    const targetMonthKey = calendarState.dateSearchKey.slice(0, 7);
    const targetMonthIndex = monthKeys.findIndex(key => key === targetMonthKey);
    if (targetMonthIndex >= 0) {
      calendarState.monthIndex = targetMonthIndex;
      calendarState.selectedDateKey = calendarState.dateSearchKey;
    }
  }

  updateCalendarDateStrip();
};

const initializeCalendarFilters = () => {
  if (!calendarSearch || !dateStrip) {
    return;
  }

  if (calendarSearch.dataset.filtersBound !== "true") {
    calendarSearch.addEventListener("input", () => {
      calendarState.searchText = calendarSearch.value;
      if (calendarSearchTop) {
        calendarSearchTop.value = calendarSearch.value;
      }
      updateCalendarResults();
    });
    calendarSearch.dataset.filtersBound = "true";
  }

  if (calendarSearchTop && calendarSearchTop.dataset.filtersBound !== "true") {
    calendarSearchTop.addEventListener("input", () => {
      calendarSearch.value = calendarSearchTop.value;
      calendarState.searchText = calendarSearchTop.value;
      updateCalendarResults();
    });
    calendarSearchTop.dataset.filtersBound = "true";
  }

  if (calendarDateSearch && calendarDateSearch.dataset.filtersBound !== "true") {
    calendarDateSearch.addEventListener("change", () => {
      calendarState.dateSearchKey = normalizeDateInputKey(calendarDateSearch.value);
      updateCalendarResults();
    });
    calendarDateSearch.dataset.filtersBound = "true";
  }

  if (calendarClearDateBtn && calendarClearDateBtn.dataset.bound !== "true") {
    calendarClearDateBtn.addEventListener("click", () => {
      if (calendarDateSearch) {
        calendarDateSearch.value = "";
      }
      calendarState.dateSearchKey = "";
      updateCalendarResults();
    });
    calendarClearDateBtn.dataset.bound = "true";
  }

  if (calendarFilterButtons.length) {
    calendarFilterButtons.forEach(button => {
      if (button.dataset.bound === "true") {
        return;
      }

      button.addEventListener("click", () => {
        calendarFilterButtons.forEach(item => item.classList.remove("active"));
        button.classList.add("active");
        calendarState.activeFilter = button.dataset.calendarFilter || "all";
        calendarState.monthIndex = 0;
        updateCalendarResults();
      });

      button.dataset.bound = "true";
    });
  }

  if (calendarPrevMonthBtn && calendarPrevMonthBtn.dataset.bound !== "true") {
    calendarPrevMonthBtn.addEventListener("click", () => {
      if (calendarState.monthIndex <= 0) {
        return;
      }
      calendarState.monthIndex -= 1;
      updateCalendarDateStrip();
    });
    calendarPrevMonthBtn.dataset.bound = "true";
  }

  if (calendarNextMonthBtn && calendarNextMonthBtn.dataset.bound !== "true") {
    calendarNextMonthBtn.addEventListener("click", () => {
      if (calendarState.monthIndex >= calendarState.monthKeys.length - 1) {
        return;
      }
      calendarState.monthIndex += 1;
      updateCalendarDateStrip();
    });
    calendarNextMonthBtn.dataset.bound = "true";
  }

  if (dateStrip && dateStrip.dataset.bound !== "true") {
    dateStrip.addEventListener("click", event => {
      const dateButton = event.target.closest("[data-date-key]");
      if (!dateButton) {
        return;
      }

      calendarState.selectedDateKey = dateButton.dataset.dateKey || "";
      updateCalendarDateStrip();
    });
    dateStrip.dataset.bound = "true";
  }
};

const loadCalendarEvents = async () => {
  if (!calendarTimeline || !dateStrip) {
    return;
  }

  try {
    const response = await fetch(`${getContextPath()}/eventscalendarservlet`, {
      cache: "no-store",
      headers: {
        "Accept": "application/json"
      }
    });

    if (response.status === 401) {
      window.location.href = `${getContextPath()}/login`;
      return;
    }

    const data = await readJsonResponse(response, "Unable to load event calendar.");
    const rawEvents = Array.isArray(data.events) ? data.events : [];

    const normalizedEvents = rawEvents
      .map(event => {
        const parsedDate = parseCalendarDate(event.eventDate);
        if (!parsedDate) {
          return null;
        }

        return {
          ...event,
          parsedDate,
          monthKey: getCalendarMonthKey(parsedDate),
          dateKey: getCalendarDateKey(parsedDate),
          isRegistered: Boolean(event.isRegistered),
        };
      })
      .filter(Boolean);

    calendarState.allEvents = normalizedEvents;
    calendarState.filteredEvents = normalizedEvents;
    calendarState.activeFilter = "all";
    calendarState.searchText = "";
    calendarState.dateSearchKey = "";
    calendarState.monthIndex = 0;
    calendarState.selectedDateKey = "";

    if (calendarSearch) {
      calendarSearch.value = "";
    }
    if (calendarSearchTop) {
      calendarSearchTop.value = "";
    }
    if (calendarDateSearch) {
      calendarDateSearch.value = "";
    }

    applyUserProfile(data);
    initializeCalendarFilters();
    updateCalendarResults();
  } catch (error) {
    if (calendarTimeline) {
      calendarTimeline.innerHTML = "";
    }
    if (calendarMonthTitle) {
      calendarMonthTitle.textContent = "Unable to load calendar";
    }
    if (calendarTimelineTitle) {
      calendarTimelineTitle.textContent = "Calendar unavailable";
    }
    if (calendarEventCount) {
      calendarEventCount.textContent = "0";
    }
    if (calendarEmptyState) {
      calendarEmptyState.hidden = false;
      const heading = calendarEmptyState.querySelector("h4");
      const description = calendarEmptyState.querySelector("p");
      if (heading) {
        heading.textContent = "Unable to load calendar";
      }
      if (description) {
        description.textContent = "Please login again or check your database connection.";
      }
    }
  }
};

const getContextPath = () => {
  return "";
};

const getRegisteredTicketsStorageKey = () => {
  const normalizedEmail = String(currentUserEmail || "").trim().toLowerCase();
  if (!normalizedEmail) {
    return LEGACY_REGISTERED_TICKETS_STORAGE_KEY;
  }

  return `${REGISTERED_TICKETS_STORAGE_KEY_PREFIX}${normalizedEmail}`;
};

const readStoredRegisteredTickets = () => {
  try {
    const scopedKey = getRegisteredTicketsStorageKey();
    const raw = window.localStorage.getItem(scopedKey);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

const writeStoredRegisteredTickets = tickets => {
  try {
    const scopedKey = getRegisteredTicketsStorageKey();
    window.localStorage.setItem(scopedKey, JSON.stringify(tickets));
  } catch (error) {
    // Ignore storage failures and continue with server-backed data.
  }
};

const mergeTicketsByCode = tickets => {
  const uniqueTickets = [];
  const seenTicketCodes = new Set();

  tickets.forEach(ticket => {
    const ticketCode = String(ticket?.ticketCode ?? "").trim();
    if (!ticketCode || seenTicketCodes.has(ticketCode)) {
      return;
    }

    seenTicketCodes.add(ticketCode);
    uniqueTickets.push(ticket);
  });

  return uniqueTickets;
};

const persistRegisteredTicket = ticket => {
  if (!ticket || !ticket.ticketCode) {
    return;
  }

  const storedTickets = readStoredRegisteredTickets();
  const mergedTickets = mergeTicketsByCode([ticket, ...storedTickets]);
  writeStoredRegisteredTickets(mergedTickets);
};

const removeStoredRegisteredTicket = ticketCode => {
  if (!ticketCode) {
    return;
  }

  const storedTickets = readStoredRegisteredTickets()
    .filter(ticket => String(ticket?.ticketCode || "").trim() !== String(ticketCode).trim());
  writeStoredRegisteredTickets(storedTickets);
};

const titleCase = value => {
  const text = String(value ?? "").trim();
  if (!text) {
    return "Event";
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
};

const sanitizeFileName = value => String(value ?? "")
  .trim()
  .replace(/[<>:"/\\|?*\x00-\x1F]/g, "-")
  .replace(/\s+/g, "-")
  .replace(/-+/g, "-")
  .replace(/^-|-$/g, "")
  .toLowerCase() || "ticket";

const normalizeTicketImageUrl = imageUrl => {
  const source = String(imageUrl || "").trim();
  if (!source) {
    return "";
  }

  if (/^https?:\/\//i.test(source) || source.startsWith("data:") || source.startsWith("blob:")) {
    return source;
  }

  if (source.startsWith("/")) {
    return `${window.location.origin}${source}`;
  }

  return new URL(source, window.location.href).href;
};

const readBlobAsDataUrl = blob => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(String(reader.result || ""));
  reader.onerror = () => reject(reader.error);
  reader.readAsDataURL(blob);
});

const resolveTicketDownloadImage = async imageUrl => {
  const normalizedUrl = normalizeTicketImageUrl(imageUrl);
  if (!normalizedUrl) {
    return "";
  }

  try {
    const response = await fetch(normalizedUrl);
    if (!response.ok) {
      throw new Error("Unable to fetch image");
    }

    const imageBlob = await response.blob();
    return await readBlobAsDataUrl(imageBlob);
  } catch (error) {
    return normalizedUrl;
  }
};

const buildTicketDownloadMarkup = ticket => {
  const eventName = escapeHtml(ticket.eventName || "EventHub Ticket");
  const ownerName = escapeHtml(ticket.owner || "EventHub Guest");
  const eventDate = escapeHtml(ticket.eventDate || "-");
  const eventTime = escapeHtml(ticket.eventTime || "-");
  const location = escapeHtml(ticket.location || "-");
  const ticketType = escapeHtml(ticket.ticketType || "-");
  const seatInfo = escapeHtml(ticket.seatInfo || "-");
  const ticketCode = escapeHtml(ticket.ticketCode || "-");
  const price = escapeHtml(ticket.price || "-");
  const imageUrl = escapeHtml(ticket.imageUrl || "");
  const issuedOn = escapeHtml(new Date().toLocaleString());

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${eventName} Ticket</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      padding: 32px;
      font-family: "Segoe UI", Arial, sans-serif;
      color: #0f172a;
      background:
        radial-gradient(circle at top left, rgba(99, 102, 241, 0.18), transparent 34%),
        radial-gradient(circle at bottom right, rgba(79, 70, 229, 0.16), transparent 32%),
        linear-gradient(135deg, #f5f7fb, #eef2ff);
    }
    .ticket-shell {
      max-width: 920px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 28px;
      overflow: hidden;
      box-shadow: 0 24px 60px rgba(15, 23, 42, 0.12);
      border: 1px solid #e5e7eb;
    }
    .ticket-banner {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      min-height: 280px;
      background: linear-gradient(135deg, #23235c 0%, #4f46e5 55%, #6366f1 100%);
      color: #ffffff;
    }
    .ticket-banner-copy {
      padding: 34px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 20px;
    }
    .eyebrow {
      display: inline-block;
      width: fit-content;
      padding: 8px 14px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      background: rgba(255, 255, 255, 0.14);
    }
    h1 {
      margin: 0;
      font-size: 38px;
      line-height: 1.08;
    }
    .ticket-subtitle {
      margin: 0;
      color: rgba(255, 255, 255, 0.84);
      font-size: 16px;
      line-height: 1.6;
      max-width: 480px;
    }
    .ticket-banner-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 18px;
    }
    .ticket-banner-meta div {
      min-width: 140px;
    }
    .ticket-banner-meta span {
      display: block;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 6px;
    }
    .ticket-banner-meta strong {
      font-size: 16px;
    }
    .ticket-poster {
      position: relative;
      min-height: 280px;
      background:
        linear-gradient(to top, rgba(35, 35, 92, 0.58), rgba(35, 35, 92, 0.15)),
        url("${imageUrl}") center/cover no-repeat;
    }
    .ticket-poster::after {
      content: "";
      position: absolute;
      inset: 20px;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.28);
    }
    .ticket-body {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 250px;
      gap: 0;
    }
    .ticket-details {
      padding: 34px;
    }
    .ticket-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 18px;
    }
    .ticket-field {
      padding: 18px;
      border-radius: 20px;
      background: #f6f8ff;
      border: 1px solid #dbe4ff;
    }
    .ticket-field.wide {
      grid-column: 1 / -1;
    }
    .ticket-field span {
      display: block;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #64748b;
      margin-bottom: 8px;
    }
    .ticket-field strong {
      font-size: 18px;
      line-height: 1.4;
      color: #0f172a;
    }
    .ticket-stub {
      position: relative;
      padding: 34px 28px;
      background: linear-gradient(180deg, #eef2ff 0%, #f8fbff 100%);
      border-left: 1px dashed #c7d2fe;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 22px;
    }
    .ticket-stub::before,
    .ticket-stub::after {
      content: "";
      position: absolute;
      left: -14px;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #f5f7fb;
      border: 1px solid #dbe4ff;
    }
    .ticket-stub::before { top: 28px; }
    .ticket-stub::after { bottom: 28px; }
    .brand {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: 0.03em;
      color: #23235c;
    }
    .barcode {
      height: 96px;
      border-radius: 16px;
      background:
        repeating-linear-gradient(
          90deg,
          #23235c 0 3px,
          #ffffff 3px 6px,
          #4f46e5 6px 8px,
          #ffffff 8px 12px,
          #23235c 12px 18px,
          #ffffff 18px 20px
        );
      border: 10px solid #ffffff;
      box-shadow: inset 0 0 0 1px #dbe4ff;
    }
    .ticket-code {
      font-size: 14px;
      letter-spacing: 0.22em;
      text-align: center;
      font-weight: 800;
      color: #23235c;
    }
    .ticket-note {
      margin: 0;
      color: #64748b;
      line-height: 1.6;
      font-size: 14px;
    }
    .issued {
      padding-top: 6px;
      border-top: 1px solid #dbe4ff;
      color: #64748b;
      font-size: 12px;
      line-height: 1.6;
    }
    @media print {
      body { padding: 0; background: #fff; }
      .ticket-shell { box-shadow: none; border: none; }
    }
    @media (max-width: 780px) {
      body { padding: 16px; }
      .ticket-banner, .ticket-body { grid-template-columns: 1fr; }
      h1 { font-size: 30px; }
      .ticket-grid { grid-template-columns: 1fr; }
      .ticket-stub { border-left: none; border-top: 1px dashed #d7ddea; }
      .ticket-stub::before, .ticket-stub::after {
        left: auto;
        right: 24px;
      }
    }
  </style>
</head>
<body>
  <section class="ticket-shell">
    <div class="ticket-banner">
      <div class="ticket-banner-copy">
        <div>
          <span class="eyebrow">EventHub Admission Pass</span>
          <h1>${eventName}</h1>
          <p class="ticket-subtitle">This downloadable ticket was issued for verified EventHub registration. Present the ticket code at entry.</p>
        </div>
        <div class="ticket-banner-meta">
          <div><span>Date</span><strong>${eventDate}</strong></div>
          <div><span>Time</span><strong>${eventTime}</strong></div>
          <div><span>Guest</span><strong>${ownerName}</strong></div>
        </div>
      </div>
      <div class="ticket-poster"></div>
    </div>
    <div class="ticket-body">
      <div class="ticket-details">
        <div class="ticket-grid">
          <div class="ticket-field">
            <span>Location</span>
            <strong>${location}</strong>
          </div>
          <div class="ticket-field">
            <span>Ticket Type</span>
            <strong>${ticketType}</strong>
          </div>
          <div class="ticket-field">
            <span>Seat / Access</span>
            <strong>${seatInfo}</strong>
          </div>
          <div class="ticket-field">
            <span>Price</span>
            <strong>${price}</strong>
          </div>
          <div class="ticket-field wide">
            <span>Ticket Code</span>
            <strong>${ticketCode}</strong>
          </div>
        </div>
      </div>
      <aside class="ticket-stub">
        <div>
          <div class="brand">EventHub</div>
          <p class="ticket-note">Keep this file with you. You can print it or show it from your device at the venue.</p>
        </div>
        <div>
          <div class="barcode"></div>
          <div class="ticket-code">${ticketCode}</div>
        </div>
        <div class="issued">Issued on ${issuedOn}</div>
      </aside>
    </div>
  </section>
</body>
</html>`;
};

const downloadTicketFile = async ticket => {
  if (!ticket?.ticketCode) {
    return;
  }

  const eventSlug = sanitizeFileName(ticket.eventName);
  const codeSlug = sanitizeFileName(ticket.ticketCode);
  const fileName = `${eventSlug || "eventhub-ticket"}-${codeSlug || "ticket"}.html`;
  const ticketWithResolvedImage = {
    ...ticket,
    imageUrl: await resolveTicketDownloadImage(ticket.imageUrl),
  };
  const blob = new Blob([buildTicketDownloadMarkup(ticketWithResolvedImage)], {
    type: "text/html;charset=utf-8",
  });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = downloadUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => {
    URL.revokeObjectURL(downloadUrl);
  }, 1000);
};

const extractTicketDataFromCard = ticketCard => {
  if (!ticketCard) {
    return null;
  }

  return {
    eventName: ticketCard.dataset.eventName || "",
    eventDate: ticketCard.dataset.eventDate || "",
    eventTime: ticketCard.dataset.eventTime || "",
    location: ticketCard.dataset.location || "",
    ticketType: ticketCard.dataset.ticketType || "",
    seatInfo: ticketCard.dataset.seatInfo || "",
    ticketCode: ticketCard.dataset.ticketCode || "",
    price: ticketCard.dataset.price || "",
    imageUrl: ticketCard.dataset.imageUrl || "",
    owner: ticketCard.dataset.ticketOwner || "",
  };
};

const buildTicketPreviewMarkup = ticket => `
  <div class="ticket-preview-card">
    <img src="${escapeHtml(ticket.imageUrl || "")}" alt="${escapeHtml(ticket.eventName || "Event ticket")}">
    <div class="ticket-preview-grid">
      <div class="ticket-preview-item">
        <span>Event</span>
        <strong>${escapeHtml(ticket.eventName || "-")}</strong>
      </div>
      <div class="ticket-preview-item">
        <span>Ticket ID</span>
        <strong>${escapeHtml(ticket.ticketCode || "-")}</strong>
      </div>
      <div class="ticket-preview-item">
        <span>Date</span>
        <strong>${escapeHtml(ticket.eventDate || "-")}</strong>
      </div>
      <div class="ticket-preview-item">
        <span>Time</span>
        <strong>${escapeHtml(ticket.eventTime || "-")}</strong>
      </div>
      <div class="ticket-preview-item">
        <span>Location</span>
        <strong>${escapeHtml(ticket.location || "-")}</strong>
      </div>
      <div class="ticket-preview-item">
        <span>Ticket Type</span>
        <strong>${escapeHtml(ticket.ticketType || "-")}</strong>
      </div>
      <div class="ticket-preview-item">
        <span>Seat / Access</span>
        <strong>${escapeHtml(ticket.seatInfo || "-")}</strong>
      </div>
      <div class="ticket-preview-item">
        <span>Price</span>
        <strong>${escapeHtml(ticket.price || "-")}</strong>
      </div>
    </div>
  </div>
`;

const openTicketPreviewModal = ticket => {
  if (!ticketPreviewModal || !ticketPreviewBody || !ticket?.ticketCode) {
    return;
  }

  activePreviewTicket = ticket;

  if (ticketPreviewTitle) {
    ticketPreviewTitle.textContent = ticket.eventName || "Ticket Preview";
  }

  if (ticketPreviewSubtitle) {
    ticketPreviewSubtitle.textContent = `Ticket ID: ${ticket.ticketCode || "-"}`;
  }

  ticketPreviewBody.innerHTML = buildTicketPreviewMarkup(ticket);
  ticketPreviewModal.hidden = false;
};

const closeTicketPreviewModal = () => {
  activePreviewTicket = null;

  if (ticketPreviewBody) {
    ticketPreviewBody.innerHTML = "";
  }

  if (ticketPreviewModal) {
    ticketPreviewModal.hidden = true;
  }
};

const extractBookingDataFromCard = bookingCard => {
  if (!bookingCard) {
    return null;
  }

  return {
    bookingId: bookingCard.dataset.bookingId || "",
    eventId: bookingCard.dataset.eventId || "",
    eventName: bookingCard.dataset.eventName || "",
    eventDate: bookingCard.dataset.eventDate || "",
    eventTime: bookingCard.dataset.eventTime || "",
    location: bookingCard.dataset.location || "",
    category: bookingCard.dataset.category || "",
    organizerPhone: bookingCard.dataset.organizerPhone || "",
    imageUrl: bookingCard.dataset.imageUrl || "",
    ticketCode: bookingCard.dataset.ticketCode || "",
    ticketType: bookingCard.dataset.ticketType || "",
    ticketCount: bookingCard.dataset.ticketCount || "1",
    seatInfo: bookingCard.dataset.seatInfo || "",
    bookingPrice: bookingCard.dataset.bookingPrice || "",
    paymentMethod: bookingCard.dataset.paymentMethod || "",
    city: bookingCard.dataset.city || "",
    address: bookingCard.dataset.address || "",
    specialRequest: bookingCard.dataset.specialRequest || "",
    attendeeName: bookingCard.dataset.attendeeName || "",
    attendeeEmail: bookingCard.dataset.attendeeEmail || "",
    attendeePhone: bookingCard.dataset.attendeePhone || "",
    bookingStatus: bookingCard.dataset.bookingStatus || "active",
  };
};

const escapePdfText = value => String(value ?? "")
  .replace(/\\/g, "\\\\")
  .replace(/\(/g, "\\(")
  .replace(/\)/g, "\\)")
  .replace(/\r?\n/g, " ");

const buildTicketPdfBlob = ticket => {
  const pdfLines = [
    { size: 26, text: "EventHub Ticket", x: 50, y: 790 },
    { size: 20, text: ticket.eventName || "Event", x: 50, y: 754 },
    { size: 12, text: "Admission pass generated by EventHub", x: 50, y: 732 },
    { size: 14, text: `Ticket ID: ${ticket.ticketCode || "-"}`, x: 50, y: 688 },
    { size: 14, text: `Date: ${ticket.eventDate || "-"}`, x: 50, y: 664 },
    { size: 14, text: `Time: ${ticket.eventTime || "-"}`, x: 50, y: 640 },
    { size: 14, text: `Location: ${ticket.location || "-"}`, x: 50, y: 616 },
    { size: 14, text: `Ticket Type: ${ticket.ticketType || "-"}`, x: 50, y: 592 },
    { size: 14, text: `Seat / Access: ${ticket.seatInfo || "-"}`, x: 50, y: 568 },
    { size: 14, text: `Price: ${ticket.price || "-"}`, x: 50, y: 544 },
    { size: 14, text: `Guest: ${ticket.owner || "EventHub Guest"}`, x: 50, y: 520 },
    { size: 12, text: `Issued on ${new Date().toLocaleString()}`, x: 50, y: 474 },
    { size: 12, text: "Present this PDF ticket at entry or share it with your group.", x: 50, y: 450 },
  ];

  const contentStream = [
    "0.15 0.14 0.36 rg",
    "50 806 220 2 re f",
    "0 0 0 rg",
    ...pdfLines.flatMap(line => [
      "BT",
      `/F1 ${line.size} Tf`,
      `${line.x} ${line.y} Td`,
      `(${escapePdfText(line.text)}) Tj`,
      "ET",
    ]),
  ].join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
    `<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((objectBody, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${objectBody}\nendobj\n`;
  });

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";

  for (let index = 1; index < offsets.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
};

const wait = ms => new Promise(resolve => {
  window.setTimeout(resolve, ms);
});

const downloadAllVisibleTickets = async () => {
  const ticketCards = Array.from(document.querySelectorAll("#userTicketsList .ticket-page-card"))
    .filter(card => !card.hidden);

  if (!ticketCards.length) {
    return;
  }

  if (downloadAllTicketsBtn) {
    downloadAllTicketsBtn.disabled = true;
    downloadAllTicketsBtn.textContent = "Downloading...";
  }

  try {
    for (const ticketCard of ticketCards) {
      const ticket = extractTicketDataFromCard(ticketCard);
      if (!ticket) {
        continue;
      }

      await downloadTicketFile(ticket);
      await wait(250);
    }
  } finally {
    if (downloadAllTicketsBtn) {
      downloadAllTicketsBtn.disabled = false;
      downloadAllTicketsBtn.textContent = "Download All";
    }
  }
};

const setRegisterFormStatus = (message = "", isError = false) => {
  if (!registerFormStatus) {
    return;
  }

  registerFormStatus.hidden = !message;
  registerFormStatus.textContent = message;
  registerFormStatus.classList.toggle("error", isError);
};

const parsePriceValue = value => {
  const normalizedValue = String(value || "").replace(/,/g, "");
  const numeric = normalizedValue.match(/-?\d+(\.\d+)?/);
  return numeric ? Number(numeric[0]) : 0;
};

const formatPriceValue = value => {
  const amount = Number(value);
  if (!Number.isFinite(amount)) {
    return activeBaseEventPriceLabel || "-";
  }

  return `Rs ${Math.max(0, amount).toLocaleString("en-IN")}`;
};

const UNIVERSAL_TICKET_TYPE_OPTIONS = [
  "Entry Pass",
  "VIP Entry",
  "Premium Pass",
];

const registerTicketTypeMultiplier = ticketType => {
  const normalized = String(ticketType || "").trim().toLowerCase();
  if (normalized === "vip entry") {
    return 1.5;
  }
  if (normalized === "premium pass") {
    return 1.25;
  }
  return 1;
};

const populateRegisterTicketTypeOptions = () => {
  if (!registerTicketTypeField) {
    return;
  }

  registerTicketTypeField.innerHTML = "";

  UNIVERSAL_TICKET_TYPE_OPTIONS.forEach(option => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    registerTicketTypeField.appendChild(optionElement);
  });

  registerTicketTypeField.value = UNIVERSAL_TICKET_TYPE_OPTIONS[0];
};

const updateRegisterModalPriceByCount = () => {
  if (!registerModalPrice) {
    return;
  }

  const selectedCount = Number(registerTicketCount?.value || "1");
  const ticketCount = Number.isFinite(selectedCount) && selectedCount > 0 ? selectedCount : 1;
  const selectedTicketType = registerTicketTypeField?.value || "Entry Pass";
  const priceMultiplier = registerTicketTypeMultiplier(selectedTicketType);

  if (registerModalTicketType) {
    registerModalTicketType.textContent = selectedTicketType;
  }

  if (activeBaseEventPrice > 0) {
    registerModalPrice.textContent = formatPriceValue(activeBaseEventPrice * priceMultiplier * ticketCount);
    return;
  }

  registerModalPrice.textContent = activeBaseEventPriceLabel || "-";
};

const ensureRegisterAgainButton = button => {
  if (!button) {
    return null;
  }

  let actionRow = button.closest(".browse-action-row");
  if (!actionRow) {
    actionRow = document.createElement("div");
    actionRow.className = "browse-action-row";
    button.parentNode?.insertBefore(actionRow, button);
    actionRow.appendChild(button);
  }

  let registerAgainButton = actionRow.querySelector(".register-again-btn");
  if (!registerAgainButton) {
    registerAgainButton = document.createElement("button");
    registerAgainButton.type = "button";
    registerAgainButton.className = "register-again-btn";
    registerAgainButton.textContent = "Register Again";
    registerAgainButton.hidden = true;
    actionRow.appendChild(registerAgainButton);
  }

  return registerAgainButton;
};

const closeRegisterModal = () => {
  if (registerModal) {
    registerModal.hidden = true;
  }

  setRegisterFormStatus("");
  activeRegisterButton = null;
  activeBaseEventPrice = 0;
  activeBaseEventPriceLabel = "-";

  if (registerEventForm) {
    registerEventForm.reset();
  }
};

const openRegisterModal = button => {
  const card = button.closest(".browse-card");
  if (!card || !registerModal) {
    return;
  }

  activeRegisterButton = card.querySelector(".register-event-btn") || button;

  const category = titleCase(card.dataset.category);
  const eventName = card.dataset.eventName || card.querySelector("h4")?.textContent || "Event";
  const image = card.querySelector("img");

  if (registerEventId) {
    registerEventId.value = card.dataset.eventId || "";
  }

  if (registerModalCategory) {
    registerModalCategory.textContent = category;
  }

  if (registerModalTitle) {
    registerModalTitle.textContent = eventName;
  }

  if (registerModalImage) {
    registerModalImage.src = image?.getAttribute("src") || "";
    registerModalImage.alt = eventName;
  }

  if (registerModalDate) {
    registerModalDate.textContent = card.dataset.eventDate || "-";
  }

  if (registerModalTime) {
    registerModalTime.textContent = card.dataset.eventTime || "-";
  }

  if (registerModalLocation) {
    registerModalLocation.textContent = card.dataset.location || "-";
  }

  activeBaseEventPriceLabel = card.dataset.price || "-";
  activeBaseEventPrice = parsePriceValue(activeBaseEventPriceLabel);

  if (registerModalTicketType) {
    registerModalTicketType.textContent = card.dataset.ticketType || "-";
  }

  populateRegisterTicketTypeOptions();

  if (registerModalSeatInfo) {
    registerModalSeatInfo.textContent = card.dataset.seatInfo || "-";
  }

  if (registerTicketCount) {
    registerTicketCount.value = "1";
  }

  updateRegisterModalPriceByCount();

  if (registerConsent) {
    registerConsent.checked = false;
  }

  if (registerSpecialRequest) {
    registerSpecialRequest.value = "";
  }

  setRegisterFormStatus("");
  registerModal.hidden = false;
  registerAttendeeName?.focus();
};

const setRegisterButtonState = (button, isRegistered, isLoading = false) => {
  if (!button) {
    return;
  }

  const registerAgainButton = ensureRegisterAgainButton(button);

  button.disabled = isLoading || isRegistered;
  button.textContent = isLoading ? "Registering..." : isRegistered ? "Registered" : "Register Now";

  if (registerAgainButton) {
    registerAgainButton.hidden = !isRegistered;
    registerAgainButton.disabled = isLoading;
    registerAgainButton.textContent = isLoading ? "Please Wait..." : "Register Again";
  }
};

async function syncRegisteredBrowseEvents() {
  if (browseCards.length) {
    browseCards.forEach(card => {
      const button = card.querySelector(".register-event-btn");
      setRegisterButtonState(button, false);
    });
  }

  try {
    const response = await fetch(`${getContextPath()}/registeredeventsservlet`, {
      cache: "no-store",
      headers: {
        "Accept": "application/json"
      }
    });

    if (response.status === 401) {
      return;
    }

    if (!response.ok) {
      throw new Error("Unable to fetch registered events");
    }

    const data = await response.json();
    applyUserProfile(data);
    const registeredEventIds = new Set(Array.isArray(data.registeredEventIds) ? data.registeredEventIds : []);
    userHasRegisteredEvents = registeredEventIds.size > 0;
    updateRestrictedNavigationVisibility(userHasRegisteredEvents);
    if (!enforceRestrictedPageAccess(userHasRegisteredEvents)) {
      return;
    }

    if (!browseCards.length) {
      return;
    }

    browseCards.forEach(card => {
      const eventId = card.dataset.eventId || "";
      const button = card.querySelector(".register-event-btn");
      setRegisterButtonState(button, registeredEventIds.has(eventId));
    });
  } catch (error) {
    if (!browseCards.length) {
      return;
    }

    browseCards.forEach(card => {
      const button = card.querySelector(".register-event-btn");
      setRegisterButtonState(button, false);
    });
  }
}

const registerForEvent = async (button, formPayload) => {
  const eventId = formPayload instanceof URLSearchParams ? formPayload.get("eventId") : "";
  const resolvedEventId = eventId || button?.closest(".browse-card")?.dataset.eventId;

  if (!resolvedEventId || !button) {
    return;
  }

  setRegisterButtonState(button, false, true);
  if (registerSubmitBtn) {
    registerSubmitBtn.disabled = true;
    registerSubmitBtn.textContent = "Confirming...";
  }

  try {
    const response = await fetch(`${getContextPath()}/register-event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Accept": "application/json"
      },
      body: formPayload.toString()
    });

    if (response.status === 401) {
      window.location.href = `${getContextPath()}/login`;
      return;
    }

    if (!response.ok) {
      throw new Error("Unable to register for event");
    }

    const data = await response.json();
    const ticketCode = data.ticket?.ticketCode;
    const registeredTicket = data.ticket ?? null;

    setRegisterButtonState(button, true);
    persistRegisteredTicket(registeredTicket);
    userHasRegisteredEvents = true;
    updateRestrictedNavigationVisibility(true);
    setRegisterFormStatus(
      ticketCode
        ? `Successfully registered for the event. Ticket ID: ${ticketCode}. It is now available in My Tickets.`
        : "Successfully registered for the event. Check My Tickets to view your ticket.",
      false
    );

    if (ticketsList) {
      loadTickets();
    }

    if (bookingsList) {
      loadBookings();
    }

    if (dashboardUpcomingEvents || dashboardTicketsGrid || dashboardHistoryBody) {
      loadUserDashboard();
    }

    setTimeout(() => {
      closeRegisterModal();
    }, 3200);
  } catch (error) {
    setRegisterButtonState(button, false);
    setRegisterFormStatus("Unable to complete registration. Please try again.", true);
  } finally {
    if (registerSubmitBtn) {
      registerSubmitBtn.disabled = false;
      registerSubmitBtn.textContent = "Confirm Registration";
    }
  }
};

const loadBrowseEvents = async () => {
  if (!browseResults) {
    return;
  }

  try {
    const response = await fetch(`${getContextPath()}/eventscalendarservlet`, {
      cache: "no-store",
      headers: {
        "Accept": "application/json",
      },
    });

    if (response.status === 401) {
      window.location.href = `${getContextPath()}/login`;
      return;
    }

    const data = await readJsonResponse(response, "Unable to load browse events.");
    applyUserProfile(data);
    const events = Array.isArray(data.events) ? data.events : [];
    const upcomingEvents = events.filter(event => Boolean(event.isUpcoming));

    browseResults.innerHTML = upcomingEvents.length
      ? upcomingEvents.map(renderBrowseCard).join("")
      : "";

    refreshBrowseCards();
    if (typeof runBrowseResultsFilter === "function") {
      runBrowseResultsFilter();
    }

    await syncRegisteredBrowseEvents();
  } catch (error) {
    if (browseResults) {
      browseResults.innerHTML = "";
    }
    refreshBrowseCards();
    if (resultsCount) {
      resultsCount.textContent = "0";
    }
    if (browseEmptyState) {
      browseEmptyState.hidden = false;
    }
  }
};

const loadTickets = async () => {
  if (!ticketsList) {
    return;
  }

  ticketsList.innerHTML = "";
  if (ticketResultsCount) {
    ticketResultsCount.textContent = "0";
  }

  try {
    const response = await fetch(`${getContextPath()}/ticketsservlet`, {
      cache: "no-store",
      headers: {
        "Accept": "application/json"
      }
    });

    if (response.status === 401) {
      window.location.href = `${getContextPath()}/login`;
      return;
    }

    if (!response.ok) {
      throw new Error("Unable to fetch tickets");
    }

    const data = await response.json();
    applyUserProfile(data);
    const serverTickets = Array.isArray(data.tickets) ? data.tickets : [];
    const storedTickets = serverTickets.length ? readStoredRegisteredTickets() : [];
    const tickets = mergeTicketsByCode([...serverTickets, ...storedTickets]);
    const summary = {
      upcoming: tickets.filter(ticket => ticket.status === "upcoming").length,
      used: tickets.filter(ticket => ticket.status === "used").length,
    };

    ticketsList.innerHTML = tickets.map(renderTicketCard).join("");

    if (ticketEmptyState) {
      ticketEmptyState.hidden = tickets.length !== 0;
    }

    if (totalTicketsCount) {
      totalTicketsCount.textContent = tickets.length;
    }

    if (upcomingTicketsCount) {
      upcomingTicketsCount.textContent = summary.upcoming;
    }

    if (usedTicketsCount) {
      usedTicketsCount.textContent = summary.used;
    }

    if (ticketsHeading && data.userName) {
      ticketsHeading.textContent = `${data.userName}'s Tickets`;
    }

    initializeTicketFilters();
  } catch (error) {
    const storedTickets = readStoredRegisteredTickets();

    if (storedTickets.length && userHasRegisteredEvents) {
      const tickets = mergeTicketsByCode(storedTickets);
      const summary = {
        upcoming: tickets.filter(ticket => ticket.status === "upcoming").length,
        used: tickets.filter(ticket => ticket.status === "used").length,
      };

      ticketsList.innerHTML = tickets.map(renderTicketCard).join("");

      if (ticketEmptyState) {
        ticketEmptyState.hidden = true;
      }

      if (totalTicketsCount) {
        totalTicketsCount.textContent = tickets.length;
      }

      if (upcomingTicketsCount) {
        upcomingTicketsCount.textContent = summary.upcoming;
      }

      if (usedTicketsCount) {
        usedTicketsCount.textContent = summary.used;
      }

      initializeTicketFilters();
      return;
    }

    if (ticketEmptyState) {
      ticketEmptyState.hidden = false;
      ticketEmptyState.querySelector("h4").textContent = "Unable to load tickets";
      ticketEmptyState.querySelector("p").textContent = "Please login again or check your ticket database connection.";
    }

  }
};

const loadUserDashboard = async () => {
  try {
    if (dashboardEmptyState) {
      dashboardEmptyState.hidden = true;
    }

    const response = await fetch(`${getContextPath()}/userdashboardservlet`, {
      cache: "no-store",
      headers: {
        "Accept": "application/json"
      }
    });

    if (response.status === 401) {
      window.location.href = `${getContextPath()}/login`;
      return;
    }

    if (!response.ok) {
      throw new Error("Unable to fetch dashboard");
    }

    const data = await response.json();
    applyUserProfile(data);
    const stats = data.stats || {};
    const upcomingEvents = Array.isArray(data.upcomingEvents) ? data.upcomingEvents : [];
    const tickets = Array.isArray(data.tickets) ? data.tickets : [];
    const history = Array.isArray(data.history) ? data.history : [];

    if (dashboardPageTitle && data.userName) {
      dashboardPageTitle.textContent = `${data.userName}'s Dashboard`;
    }

    if (registeredEventsCount) {
      registeredEventsCount.textContent = stats.registeredEvents ?? 0;
    }

    if (ticketsPurchasedCount) {
      ticketsPurchasedCount.textContent = stats.ticketsPurchased ?? 0;
    }

    if (eventsAttendedCount) {
      eventsAttendedCount.textContent = stats.eventsAttended ?? 0;
    }

    if (totalSpentCount) {
      totalSpentCount.textContent = stats.totalSpent ?? "$0";
    }

    if (dashboardUpcomingEvents) {
      dashboardUpcomingEvents.innerHTML = upcomingEvents.length
        ? upcomingEvents.map(renderDashboardEventCard).join("")
        : "<p class=\"meta\">No upcoming events yet.</p>";
    }

    const hasTickets = tickets.length > 0;
    const hasHistory = history.length > 0;
    const hasReminders = upcomingEvents.length > 0;

    if (dashboardTicketsGrid) {
      dashboardTicketsGrid.innerHTML = hasTickets
        ? tickets.slice(0, 4).map(renderDashboardMiniTicket).join("")
        : "<p class=\"meta\">No tickets yet.</p>";
    }

    if (dashboardHistoryBody) {
      dashboardHistoryBody.innerHTML = hasHistory
        ? history.map(renderDashboardHistoryRow).join("")
        : "<tr><td colspan=\"5\">No past events yet.</td></tr>";
    }

    if (dashboardActivityList) {
      dashboardActivityList.innerHTML = tickets.length
        ? tickets.slice(0, 3).map(renderDashboardActivity).join("")
        : "<p class=\"meta\">No recent activity yet.</p>";
    }

    if (dashboardRemindersList) {
      dashboardRemindersList.innerHTML = hasReminders
        ? upcomingEvents.slice(0, 2).map(renderDashboardReminder).join("")
        : "<p class=\"meta\">No reminders right now.</p>";
    }

    if (dashboardStats) dashboardStats.hidden = false;
    if (dashboardContent) dashboardContent.hidden = false;
    if (dashboardTicketsSection) dashboardTicketsSection.hidden = !hasTickets;
    if (dashboardHistorySection) dashboardHistorySection.hidden = !hasHistory;
    if (dashboardRemindersSection) dashboardRemindersSection.hidden = !hasReminders;
  } catch (error) {
    if (dashboardEmptyState) {
      dashboardEmptyState.hidden = false;
    }
  }
};

const setBookingEditStatus = (message = "", isError = false) => {
  if (!bookingEditStatusMessage) {
    return;
  }

  bookingEditStatusMessage.hidden = !message;
  bookingEditStatusMessage.textContent = message;
  bookingEditStatusMessage.classList.toggle("error", isError);
};

const closeBookingEditModal = () => {
  activeBookingRecord = null;

  if (bookingEditModal) {
    bookingEditModal.hidden = true;
  }

  setBookingEditStatus("");
  bookingEditForm?.reset();
};

const openBookingCancelModal = booking => {
  if (!bookingCancelModal || !booking) {
    return;
  }

  pendingCancelBooking = booking;

  if (bookingCancelModalDescription) {
    bookingCancelModalDescription.textContent = `Cancel your booking for ${booking.eventName}? This will remove it from your active tickets.`;
  }

  if (bookingCancelConfirmBtn) {
    bookingCancelConfirmBtn.disabled = false;
    bookingCancelConfirmBtn.textContent = "Cancel Event";
  }

  bookingCancelModal.hidden = false;
};

const closeBookingCancelModal = () => {
  pendingCancelBooking = null;

  if (bookingCancelModal) {
    bookingCancelModal.hidden = true;
  }
};

const openBookingEditModal = booking => {
  if (!booking || !bookingEditModal) {
    return;
  }

  activeBookingRecord = booking;

  if (bookingEditId) {
    bookingEditId.value = booking.bookingId || "";
  }

  if (bookingEditModalCategory) {
    bookingEditModalCategory.textContent = titleCase(booking.category || "booking");
  }

  if (bookingEditModalTitle) {
    bookingEditModalTitle.textContent = booking.eventName || "Edit Booking";
  }

  if (bookingEditModalImage) {
    bookingEditModalImage.src = booking.imageUrl || "";
    bookingEditModalImage.alt = booking.eventName || "Booking";
  }

  if (bookingEditModalDate) {
    bookingEditModalDate.textContent = booking.eventDate || "-";
  }

  if (bookingEditModalTime) {
    bookingEditModalTime.textContent = booking.eventTime || "-";
  }

  if (bookingEditModalLocation) {
    bookingEditModalLocation.textContent = booking.location || "-";
  }

  if (bookingEditModalTicketCode) {
    bookingEditModalTicketCode.textContent = booking.ticketCode || "-";
  }

  if (bookingEditModalOrganizerPhone) {
    bookingEditModalOrganizerPhone.textContent = booking.organizerPhone || "-";
  }

  if (bookingEditModalStatus) {
    bookingEditModalStatus.textContent = titleCase(booking.bookingStatus || "active");
  }

  if (bookingEditAttendeeName) {
    bookingEditAttendeeName.value = booking.attendeeName || "";
  }

  if (bookingEditAttendeeEmail) {
    bookingEditAttendeeEmail.value = booking.attendeeEmail || "";
  }

  if (bookingEditAttendeePhone) {
    bookingEditAttendeePhone.value = booking.attendeePhone || "";
  }

  if (bookingEditTicketType) {
    bookingEditTicketType.value = booking.ticketType || "";
  }

  if (bookingEditTicketCount) {
    bookingEditTicketCount.value = String(booking.ticketCount || "1");
  }

  if (bookingEditCity) {
    bookingEditCity.value = booking.city || "";
  }

  if (bookingEditPaymentMethod) {
    bookingEditPaymentMethod.value = booking.paymentMethod || "";
  }

  if (bookingEditAddress) {
    bookingEditAddress.value = booking.address || "";
  }

  if (bookingEditSpecialRequest) {
    bookingEditSpecialRequest.value = booking.specialRequest || "";
  }

  setBookingEditStatus("");
  bookingEditModal.hidden = false;
  bookingEditAttendeeName?.focus();
};

const loadBookings = async () => {
  if (!bookingsList) {
    return;
  }

  bookingsList.innerHTML = "";
  if (bookingsResultsCount) {
    bookingsResultsCount.textContent = "0";
  }

  try {
    const response = await fetch(`${getContextPath()}/bookingsservlet`, {
      cache: "no-store",
      headers: {
        "Accept": "application/json"
      }
    });

    if (response.status === 401) {
      window.location.href = `${getContextPath()}/login`;
      return;
    }

    if (!response.ok) {
      throw new Error("Unable to fetch bookings");
    }

    const data = await response.json();
    const bookings = Array.isArray(data.bookings) ? data.bookings : [];

    bookingsList.innerHTML = bookings.length ? bookings.map(renderBookingItem).join("") : "";

    if (bookingsHeading && data.userName) {
      bookingsHeading.textContent = `${data.userName}'s Bookings`;
    }

    if (bookingsPageTitle && data.userName) {
      bookingsPageTitle.textContent = `${data.userName}'s Bookings`;
    }

    if (bookingsResultsCount) {
      bookingsResultsCount.textContent = String(bookings.length);
    }

    if (bookingsEmptyState) {
      bookingsEmptyState.hidden = bookings.length !== 0;
      if (!bookings.length) {
        bookingsEmptyState.querySelector("h4").textContent = "No bookings found";
        bookingsEmptyState.querySelector("p").textContent = "Register for an event from Browse Events to see it here.";
      }
    }

    applyUserProfile(data);
    initializeBookingFilters();
  } catch (error) {
    if (bookingsList) {
      bookingsList.innerHTML = "";
    }

    if (bookingsEmptyState) {
      bookingsEmptyState.hidden = false;
      bookingsEmptyState.querySelector("h4").textContent = "Unable to load bookings";
      bookingsEmptyState.querySelector("p").textContent = "Please login again or check your booking database connection.";
    }
  }
};

const loadProfile = async () => {
  if (!profileDetailsForm) {
    return;
  }

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

    const data = await readJsonResponse(response, "Unable to load profile.");

    applyUserProfile(data);
    setProfileStatus(profileDetailsStatus, "");
    setProfileStatus(profilePasswordStatus, "");
  } catch (error) {
    setProfileStatus(profileDetailsStatus, error.message || "Unable to load profile.", true);
  }
};

const initializeTicketFilters = () => {
  const liveTicketCards = document.querySelectorAll("#userTicketsList .ticket-page-card");
  const activeTopTicketSearch = ticketSearchTop || topbarBrowseSearch;

  if (!ticketSearch || !liveTicketCards.length) {
    if (ticketResultsCount) {
      ticketResultsCount.textContent = "0";
    }
    return;
  }

  let activeTicketFilter = "all";

  const updateTicketResults = () => {
    const searchValue = ticketSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    liveTicketCards.forEach(card => {
      const ticketStatus = card.dataset.ticketStatus || "";
      const searchableText = card.dataset.ticketSearch?.toLowerCase() || "";
      const matchesFilter = activeTicketFilter === "all" || ticketStatus === activeTicketFilter;
      const matchesSearch = !searchValue || searchableText.includes(searchValue);
      const shouldShow = matchesFilter && matchesSearch;

      card.hidden = !shouldShow;

      if (shouldShow) {
        visibleCount += 1;
      }
    });

    if (ticketResultsCount) {
      ticketResultsCount.textContent = visibleCount;
    }

    if (ticketEmptyState) {
      ticketEmptyState.hidden = visibleCount !== 0;
    }
  };

  if (ticketSearch.dataset.filtersBound !== "true") {
    ticketSearch.addEventListener("input", updateTicketResults);
    ticketSearch.dataset.filtersBound = "true";
  }

  if (activeTopTicketSearch && activeTopTicketSearch.dataset.filtersBound !== "true") {
    activeTopTicketSearch.addEventListener("input", () => {
      ticketSearch.value = activeTopTicketSearch.value;
      updateTicketResults();
    });

    ticketSearch.addEventListener("input", () => {
      activeTopTicketSearch.value = ticketSearch.value;
    });

    activeTopTicketSearch.dataset.filtersBound = "true";
  }

  ticketFilterButtons.forEach(button => {
    button.addEventListener("click", () => {
      activeTicketFilter = button.dataset.ticketFilter || "all";

      ticketFilterButtons.forEach(item => item.classList.remove("active"));
      button.classList.add("active");

      updateTicketResults();
    });
  });

  updateTicketResults();
};

const initializeBookingFilters = () => {
  const liveBookingItems = document.querySelectorAll("#bookingsList .booking-item");

  if (!bookingsList) {
    return;
  }

  if (!bookingsSearch || !liveBookingItems.length) {
    if (bookingsResultsCount) {
      bookingsResultsCount.textContent = String(liveBookingItems.length);
    }
    return;
  }

  const updateBookingResults = () => {
    const searchValue = bookingsSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    liveBookingItems.forEach(item => {
      const searchableText = item.dataset.bookingSearch?.toLowerCase() || "";
      const shouldShow = !searchValue || searchableText.includes(searchValue);

      item.hidden = !shouldShow;

      if (shouldShow) {
        visibleCount += 1;
      }
    });

    if (bookingsResultsCount) {
      bookingsResultsCount.textContent = String(visibleCount);
    }

    if (bookingsEmptyState) {
      bookingsEmptyState.hidden = visibleCount !== 0;
    }
  };

  if (typeof bookingsSearch._bookingUpdateHandler === "function") {
    bookingsSearch.removeEventListener("input", bookingsSearch._bookingUpdateHandler);
  }

  bookingsSearch._bookingUpdateHandler = updateBookingResults;
  bookingsSearch.addEventListener("input", updateBookingResults);
  updateBookingResults();
};

const initialRegistrationSyncPromise = syncRegisteredBrowseEvents();

window.addEventListener("pageshow", () => {
  if (browseResults) {
    loadBrowseEvents();
  } else if (browseCards.length) {
    syncRegisteredBrowseEvents();
  }
});

if (browseResults) {
  initialRegistrationSyncPromise.finally(() => {
    loadBrowseEvents();
  });
}

if (ticketsList) {
  initialRegistrationSyncPromise.finally(() => {
    loadTickets();
  });
}

if (bookingsList) {
  initialRegistrationSyncPromise.finally(() => {
    loadBookings();
  });
}

if (profileDetailsForm) {
  loadProfile();
}

if (dateStrip && calendarTimeline) {
  loadCalendarEvents();
}

// Profile image upload
if (uploadBtn && profileImageInput && profileImg) {
  uploadBtn.addEventListener("click", (e) => {
    e.preventDefault();
    profileImageInput.click();
  });

  profileImageInput.addEventListener("change", async () => {
    const file = profileImageInput.files[0];
    if (!file) {
      return;
    }

    const isAllowedType = ["image/jpeg", "image/jpg", "image/png"].includes(String(file.type).toLowerCase());
    if (!isAllowedType) {
      setProfileStatus(profileDetailsStatus, "Only JPG/PNG images are allowed.", true);
      profileImageInput.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setProfileStatus(profileDetailsStatus, "Image size must be 2MB or less.", true);
      profileImageInput.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setProfileStatus(profileDetailsStatus, "");
      uploadBtn.textContent = "Uploading...";
      uploadBtn.disabled = true;

      const response = await fetch("/upload-profile-image", {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: formData
      });

      const data = await readJsonResponse(response, "Upload failed. Please try again.");
      const imageUrl = String(data.imageUrl || "").trim();
      const cacheSafeImageUrl = imageUrl ? `${imageUrl}?t=${Date.now()}` : "";

      applyUserProfile({
        ...data,
        profileImage: cacheSafeImageUrl || data.profileImage || data.profile_image || "",
      });
      setProfileStatus(profileDetailsStatus, data.message || "Profile image uploaded successfully.");

      await loadProfile();
    } catch (error) {
      setProfileStatus(profileDetailsStatus, error.message || "Upload failed. Please try again.", true);
    } finally {
      uploadBtn.textContent = "Upload Photo";
      uploadBtn.disabled = false;
      profileImageInput.value = "";
    }
  });
}

loadUserDashboard();

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

const closeLogoutModal = () => {
  const modal = document.getElementById("logoutModal");
  if (modal) {
    modal.hidden = true;
  }
};

const openReviewModal = (eventName = "this event") => {
  if (reviewModalEventName) {
    reviewModalEventName.textContent = `Share your feedback about ${eventName}.`;
  }

  if (reviewForm) {
    reviewForm.reset();
  }

  if (reviewRatingInput) {
    reviewRatingInput.value = "";
  }

  reviewStars.forEach(star => {
    star.classList.remove("active");
    star.innerHTML = '<i class="fa-regular fa-star"></i>';
  });

  if (reviewModal) {
    reviewModal.hidden = false;
  }
};

const closeReviewModal = () => {
  if (reviewModal) {
    reviewModal.hidden = true;
  }
};

const setShareStatus = (message = "", isError = false) => {
  if (!shareStatusMessage) {
    return;
  }

  shareStatusMessage.hidden = !message;
  shareStatusMessage.textContent = message;
  shareStatusMessage.style.color = isError ? "#dc2626" : "#16a34a";
};

const buildShareLink = () => {
  const origin = window.location.origin || "";
  const pathName = window.location.pathname || "";

  if (pathName.endsWith("/tickets.html")) {
    return `${origin}/assets/dashboard/user/tickets.html`;
  }

  return `${origin}/dashboard/user`;
};

const buildShareContent = ticket => {
  if (ticket?.eventName) {
    return {
      title: "Share your ticket PDF",
      description: `Share the PDF ticket for ${ticket.eventName} with your preferred app.`,
      shareLink: `${window.location.origin || ""}/assets/dashboard/user/tickets.html`,
      shareText: `I am sharing my EventHub ticket for ${ticket.eventName} on ${ticket.eventDate} at ${ticket.eventTime}. Ticket ID: ${ticket.ticketCode}.`,
      gmailSubject: `EventHub ticket for ${ticket.eventName}`,
    };
  }

  return {
    title: "Share your events",
    description: "Share your EventHub dashboard or invite others to check your upcoming events.",
    shareLink: buildShareLink(),
    shareText: "Check out my upcoming events on EventHub.",
    gmailSubject: "Check out EventHub",
  };
};

const openShareModal = ticket => {
  const { title, description, shareLink, shareText, gmailSubject } = buildShareContent(ticket);
  const combinedText = `${shareText} ${shareLink}`.trim();
  activeShareTicket = ticket || null;

  if (shareModalTitle) {
    shareModalTitle.textContent = title;
  }

  if (shareModalDescription) {
    shareModalDescription.textContent = description;
  }

  if (shareEventLink) {
    shareEventLink.value = shareLink;
  }

  if (shareWhatsappBtn) {
    shareWhatsappBtn.href = `https://wa.me/?text=${encodeURIComponent(combinedText)}`;
  }

  if (shareTelegramBtn) {
    shareTelegramBtn.href = `https://t.me/share/url?url=${encodeURIComponent(shareLink)}&text=${encodeURIComponent(shareText)}`;
  }

  if (shareTwitterBtn) {
    shareTwitterBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(combinedText)}`;
  }

  if (shareFacebookBtn) {
    shareFacebookBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}&quote=${encodeURIComponent(shareText)}`;
  }

  if (shareGmailBtn) {
    shareGmailBtn.href = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(gmailSubject)}&body=${encodeURIComponent(`${shareText}\n\n${shareLink}`)}`;
  }

  if (shareInstagramBtn) {
    shareInstagramBtn.href = "https://www.instagram.com/";
  }

  setShareStatus("");

  if (shareModal) {
    shareModal.hidden = false;
  }
};

const closeShareModal = () => {
  activeShareTicket = null;

  if (shareModal) {
    shareModal.hidden = true;
  }
};

const canShareFiles = file => {
  if (typeof navigator === "undefined" || typeof navigator.share !== "function") {
    return false;
  }

  if (typeof navigator.canShare !== "function") {
    return true;
  }

  try {
    return navigator.canShare({ files: [file] });
  } catch (error) {
    return false;
  }
};

const shareTicketPdf = async (platformButton, ticket) => {
  if (!platformButton || !ticket?.ticketCode) {
    return;
  }

  const eventSlug = sanitizeFileName(ticket.eventName);
  const codeSlug = sanitizeFileName(ticket.ticketCode);
  const fileName = `${eventSlug || "eventhub-ticket"}-${codeSlug || "ticket"}.pdf`;
  const pdfBlob = buildTicketPdfBlob(ticket);
  const platformName = platformButton.dataset.platformName || "this app";
  const destinationUrl = platformButton.href;

  if (typeof File !== "undefined") {
    const pdfFile = new File([pdfBlob], fileName, { type: "application/pdf" });

    if (canShareFiles(pdfFile)) {
      try {
        await navigator.share({
          title: `EventHub ticket for ${ticket.eventName}`,
          text: `Sharing ticket ${ticket.ticketCode} for ${ticket.eventName}.`,
          files: [pdfFile],
        });
        setShareStatus("Ticket PDF shared successfully.");
        closeShareModal();
        return;
      } catch (error) {
        if (error?.name === "AbortError") {
          return;
        }
      }
    }
  }

  const downloadUrl = URL.createObjectURL(pdfBlob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => {
    URL.revokeObjectURL(downloadUrl);
  }, 1000);

  setShareStatus(`Ticket PDF downloaded. Attach it in ${platformName} to complete sharing.`);

  if (destinationUrl) {
    window.open(destinationUrl, "_blank", "noopener,noreferrer");
  }
};

logoutModalBackdrop?.addEventListener("click", closeLogoutModal);
logoutCancelBtn?.addEventListener("click", closeLogoutModal);
reviewModalBackdrop?.addEventListener("click", closeReviewModal);
reviewCancelBtn?.addEventListener("click", closeReviewModal);
shareModalBackdrop?.addEventListener("click", closeShareModal);
shareCancelBtn?.addEventListener("click", closeShareModal);
ticketPreviewBackdrop?.addEventListener("click", closeTicketPreviewModal);
ticketPreviewClose?.addEventListener("click", closeTicketPreviewModal);
ticketPreviewCancelBtn?.addEventListener("click", closeTicketPreviewModal);

ticketPreviewDownloadBtn?.addEventListener("click", async () => {
  if (!activePreviewTicket) {
    return;
  }

  await downloadTicketFile(activePreviewTicket);
});

ticketPreviewShareBtn?.addEventListener("click", () => {
  if (!activePreviewTicket) {
    return;
  }

  closeTicketPreviewModal();
  openShareModal(activePreviewTicket);
});

openReviewQuickAction?.addEventListener("click", () => {
  openReviewModal("your recent event");
});

openShareQuickAction?.addEventListener("click", () => {
  openShareModal();
});

shareCopyBtn?.addEventListener("click", async () => {
  try {
    const shareLink = shareEventLink?.value || buildShareLink();
    await navigator.clipboard.writeText(shareLink);
    setShareStatus("Share link copied successfully.");
  } catch (error) {
    setShareStatus("Unable to copy link. Please copy it manually.", true);
  }
});

shareOptionButtons.forEach(button => {
  button.addEventListener("click", async event => {
    if (!activeShareTicket) {
      return;
    }

    event.preventDefault();
    await shareTicketPdf(button, activeShareTicket);
  });
});

bookingEditModalBackdrop?.addEventListener("click", closeBookingEditModal);
bookingEditModalClose?.addEventListener("click", closeBookingEditModal);
bookingEditCancelBtn?.addEventListener("click", closeBookingEditModal);
bookingCancelModalBackdrop?.addEventListener("click", closeBookingCancelModal);
bookingCancelCloseBtn?.addEventListener("click", closeBookingCancelModal);

bookingEditForm?.addEventListener("submit", async event => {
  event.preventDefault();

  if (!bookingEditId?.value) {
    return;
  }

  const formPayload = new URLSearchParams(new FormData(bookingEditForm));

  if (bookingEditSubmitBtn) {
    bookingEditSubmitBtn.disabled = true;
    bookingEditSubmitBtn.textContent = "Saving...";
  }

  try {
    const response = await fetch(`${getContextPath()}/update-booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Accept": "application/json"
      },
      body: formPayload.toString()
    });

    if (response.status === 401) {
      window.location.href = `${getContextPath()}/login`;
      return;
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Unable to update booking");
    }

    setBookingEditStatus(data.message || "Booking updated successfully.");
    await loadBookings();
    await loadTickets();
    await syncRegisteredBrowseEvents();
    if (dashboardUpcomingEvents || dashboardTicketsGrid || dashboardHistoryBody) {
      await loadUserDashboard();
    }
    window.setTimeout(closeBookingEditModal, 1200);
  } catch (error) {
    setBookingEditStatus(error.message || "Unable to update booking.", true);
  } finally {
    if (bookingEditSubmitBtn) {
      bookingEditSubmitBtn.disabled = false;
      bookingEditSubmitBtn.textContent = "Save Changes";
    }
  }
});

bookingCancelConfirmBtn?.addEventListener("click", async () => {
  if (!pendingCancelBooking?.bookingId) {
    return;
  }

  bookingCancelConfirmBtn.disabled = true;
  bookingCancelConfirmBtn.textContent = "Cancelling...";

  try {
    const response = await fetch(`${getContextPath()}/cancel-booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Accept": "application/json"
      },
      body: new URLSearchParams({ bookingId: pendingCancelBooking.bookingId }).toString()
    });

    if (response.status === 401) {
      window.location.href = `${getContextPath()}/login`;
      return;
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Unable to cancel booking");
    }

    removeStoredRegisteredTicket(pendingCancelBooking.ticketCode);
    closeBookingCancelModal();
    await loadBookings();
    await loadTickets();
    await syncRegisteredBrowseEvents();
    if (dashboardUpcomingEvents || dashboardTicketsGrid || dashboardHistoryBody) {
      await loadUserDashboard();
    }
  } catch (error) {
    if (bookingCancelModalDescription) {
      bookingCancelModalDescription.textContent = error.message || "Unable to cancel booking.";
    }
    bookingCancelConfirmBtn.disabled = false;
    bookingCancelConfirmBtn.textContent = "Cancel Event";
  }
});

contactForm?.addEventListener("submit", async event => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const body = new URLSearchParams();

  formData.forEach((value, key) => {
    body.append(key, String(value));
  });

  if (contactSubmitButton) {
    contactSubmitButton.disabled = true;
    contactSubmitButton.textContent = "Sending...";
  }

  if (contactFormStatus) {
    contactFormStatus.hidden = true;
  }

  try {
    const response = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Accept": "application/json"
      },
      body: body.toString()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to send request.");
    }

    contactForm.reset();
    setContactFormStatus(data.message || "Request sent successfully.", "success");
  } catch (error) {
    setContactFormStatus(error.message || "Unable to send request.", "error");
  } finally {
    if (contactSubmitButton) {
      contactSubmitButton.disabled = false;
      contactSubmitButton.textContent = "Send Message";
    }
  }
});

profileCancelBtn?.addEventListener("click", () => {
  if (!activeProfileSnapshot) {
    return;
  }

  if (profileFirstName) {
    profileFirstName.value = activeProfileSnapshot.firstName || "";
  }

  if (profileLastName) {
    profileLastName.value = activeProfileSnapshot.lastName || "";
  }

  if (profileEmail) {
    profileEmail.value = activeProfileSnapshot.email || "";
  }

  if (profileRole) {
    profileRole.value = activeProfileSnapshot.role || "user";
  }

  if (profilePhone) {
    profilePhone.value = activeProfileSnapshot.phone || "";
  }

  if (profileBio) {
    profileBio.value = activeProfileSnapshot.bio || "";
  }

  setProfileStatus(profileDetailsStatus, "");
});

profileDetailsForm?.addEventListener("submit", async event => {
  event.preventDefault();

  const firstName = profileFirstName?.value.trim() || "";
  const lastName = profileLastName?.value.trim() || "";
  const role = profileRole?.value.trim() || "";
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

    const data = await readJsonResponse(response, "Unable to update profile.");

    applyUserProfile(data);
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

    const data = await readJsonResponse(response, "Unable to update password.");

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

registerModalBackdrop?.addEventListener("click", closeRegisterModal);
registerModalClose?.addEventListener("click", closeRegisterModal);
registerCancelBtn?.addEventListener("click", closeRegisterModal);
registerTicketCount?.addEventListener("change", updateRegisterModalPriceByCount);
registerTicketTypeField?.addEventListener("change", updateRegisterModalPriceByCount);

registerEventForm?.addEventListener("submit", async event => {
  event.preventDefault();

  if (!activeRegisterButton || !registerEventId?.value) {
    return;
  }

  const attendeeName = registerAttendeeName?.value.trim() || "";
  const attendeeEmail = registerAttendeeEmail?.value.trim() || "";
  const attendeePhone = registerAttendeePhone?.value.trim() || "";
  const ticketType = registerTicketTypeField?.value.trim() || "";
  const ticketCount = registerTicketCount?.value.trim() || "1";
  const city = registerCity?.value.trim() || "";
  const paymentMethod = registerPaymentMethod?.value.trim() || "";
  const address = registerAddress?.value.trim() || "";
  const specialRequest = registerSpecialRequest?.value.trim() || "";

  if (!registerConsent?.checked) {
    setRegisterFormStatus("Please confirm the registration consent checkbox.", true);
    return;
  }

  if (!attendeeName || !attendeeEmail || !attendeePhone || !ticketType || !city || !paymentMethod || !address) {
    setRegisterFormStatus("Please complete the required form fields.", true);
    return;
  }

  const formPayload = new URLSearchParams();
  formPayload.set("eventId", registerEventId.value);
  formPayload.set("attendeeName", attendeeName);
  formPayload.set("attendeeEmail", attendeeEmail);
  formPayload.set("attendeePhone", attendeePhone);
  formPayload.set("ticketType", ticketType);
  formPayload.set("ticketCount", ticketCount);
  formPayload.set("city", city);
  formPayload.set("paymentMethod", paymentMethod);
  formPayload.set("address", address);
  formPayload.set("specialRequest", specialRequest);
  formPayload.set("consentAccepted", registerConsent.checked ? "true" : "false");

  await registerForEvent(activeRegisterButton, formPayload);
});

document.addEventListener("click", event => {
  const reviewTrigger = event.target.closest(".open-review-modal");
  if (!reviewTrigger) {
    return;
  }

  event.preventDefault();
  openReviewModal(reviewTrigger.dataset.eventName || "this event");
});

ticketsList?.addEventListener("click", event => {
  const clickedInsideAction = event.target.closest(".btn-download, .btn-share");
  const ticketCard = event.target.closest(".ticket-page-card");

  if (ticketCard && !clickedInsideAction) {
    const ticket = extractTicketDataFromCard(ticketCard);
    if (ticket?.ticketCode) {
      openTicketPreviewModal(ticket);
      return;
    }
  }

  const shareButton = event.target.closest(".btn-share");
  if (shareButton) {
    const shareTicketCard = shareButton.closest(".ticket-page-card");
    if (!shareTicketCard) {
      return;
    }

    event.preventDefault();

    const ticket = extractTicketDataFromCard(shareTicketCard);
    if (!ticket) {
      return;
    }

    openShareModal(ticket);
    return;
  }

  const downloadButton = event.target.closest(".btn-download");
  if (!downloadButton) {
    return;
  }

  const downloadTicketCard = downloadButton.closest(".ticket-page-card");
  if (!downloadTicketCard) {
    return;
  }

  event.preventDefault();

  const ticket = extractTicketDataFromCard(downloadTicketCard);
  if (!ticket) {
    return;
  }

  downloadTicketFile(ticket);
});

dashboardTicketsGrid?.addEventListener("click", event => {
  const actionButton = event.target.closest(".btn-download, .btn-share");
  if (!actionButton) {
    return;
  }

  event.preventDefault();

  const ticket = {
    eventName: actionButton.dataset.eventName || "",
    eventDate: actionButton.dataset.eventDate || "",
    eventTime: actionButton.dataset.eventTime || "",
    location: actionButton.dataset.location || "",
    ticketType: actionButton.dataset.ticketType || "",
    seatInfo: actionButton.dataset.seatInfo || "",
    ticketCode: actionButton.dataset.ticketCode || "",
    price: actionButton.dataset.price || "",
    imageUrl: actionButton.dataset.imageUrl || "",
    owner: actionButton.dataset.ticketOwner || "",
  };

  if (!ticket.ticketCode) {
    return;
  }

  if (actionButton.classList.contains("btn-share")) {
    openShareModal(ticket);
    return;
  }

  downloadTicketFile(ticket);
});

bookingsList?.addEventListener("click", async event => {
  const bookingCard = event.target.closest(".booking-item");
  if (!bookingCard) {
    return;
  }

  const booking = extractBookingDataFromCard(bookingCard);
  if (!booking) {
    return;
  }

  const viewTicketButton = event.target.closest(".view-ticket");
  if (viewTicketButton) {
    event.preventDefault();
    window.location.href = "tickets.html";
    return;
  }

  const editButton = event.target.closest(".edit-booking");
  if (editButton) {
    event.preventDefault();
    openBookingEditModal(booking);
    return;
  }

  const cancelButton = event.target.closest(".cancel-booking");
  if (!cancelButton) {
    return;
  }

  event.preventDefault();
  openBookingCancelModal(booking);
});

downloadAllTicketsBtn?.addEventListener("click", event => {
  event.preventDefault();
  downloadAllVisibleTickets();
});

reviewStars.forEach(star => {
  star.addEventListener("click", () => {
    const rating = Number(star.dataset.rating || "0");

    if (reviewRatingInput) {
      reviewRatingInput.value = String(rating);
    }

    reviewStars.forEach(item => {
      const itemRating = Number(item.dataset.rating || "0");
      const isActive = itemRating <= rating;
      item.classList.toggle("active", isActive);
      item.innerHTML = isActive
        ? '<i class="fa-solid fa-star"></i>'
        : '<i class="fa-regular fa-star"></i>';
    });
  });
});

reviewForm?.addEventListener("submit", event => {
  event.preventDefault();
  if (!reviewRatingInput?.value) {
    return;
  }
  const reviewMessage = document.getElementById("reviewMessage");
  const eventName = reviewModalEventName?.textContent?.replace("Share your feedback about ", "").replace(/\.$/, "") || "Event";
  const subject = encodeURIComponent(`EventHub Review - ${eventName}`);
  const body = encodeURIComponent(
    `Event: ${eventName}\nRating: ${reviewRatingInput.value}/5\n\nReview:\n${reviewMessage?.value ?? ""}`
  );
  window.location.href = `mailto:omsinhasan19@gmail.com?subject=${subject}&body=${body}`;
  closeReviewModal();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeLogoutModal();
    closeReviewModal();
    closeShareModal();
    closeTicketPreviewModal();
    closeRegisterModal();
  }
});
