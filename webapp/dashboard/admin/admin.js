function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar?.classList.toggle("active");
}

document.querySelectorAll(".menu li").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelector(".sidebar")?.classList.remove("active");
  });
});

const adminSectionTitle = document.getElementById("adminSectionTitle");
const adminGlobalSearch = document.getElementById("adminGlobalSearch");
const adminPrimaryAction = document.getElementById("adminPrimaryAction");
const adminMenuToggle = document.getElementById("adminMenuToggle");
const adminRevenueHeadline = document.getElementById("adminRevenueHeadline");
const adminRevenueSummary = document.getElementById("adminRevenueSummary");
const adminRevenueMetrics = document.getElementById("adminRevenueMetrics");
const adminRevenueBars = document.getElementById("adminRevenueBars");
const adminActivityList = document.getElementById("adminActivityList");
const adminHealthGrid = document.getElementById("adminHealthGrid");
const organizerMiniStats = document.getElementById("organizerMiniStats");
const organizerGrid = document.getElementById("organizerGrid");
const organizerSearch = document.getElementById("organizerSearch");
const userMiniStats = document.getElementById("userMiniStats");
const userTableBody = document.getElementById("userTableBody");
const userSearch = document.getElementById("userSearch");
const userResultsCount = document.getElementById("userResultsCount");
const adminBrowseSearch = document.getElementById("adminBrowseSearch");
const adminBrowseResults = document.getElementById("adminBrowseResults");
const adminBrowseResultsCount = document.getElementById("adminBrowseResultsCount");
const adminNavButtons = Array.from(document.querySelectorAll("[data-section-target]"));
const adminNavItems = Array.from(document.querySelectorAll("[data-admin-nav-item]"));
const adminSections = Array.from(document.querySelectorAll(".admin-section"));
const sectionShortcutButtons = Array.from(document.querySelectorAll("[data-section-shortcut]"));
const adminRevenueAction = document.getElementById("adminRevenueAction");
const adminSupportAction = document.getElementById("adminSupportAction");
const adminStatRevenue = document.getElementById("adminStatRevenue");
const adminStatOrganizers = document.getElementById("adminStatOrganizers");
const adminStatUsers = document.getElementById("adminStatUsers");
const adminStatEvents = document.getElementById("adminStatEvents");
const adminNameNodes = document.querySelectorAll("[data-admin-name]");
const adminAvatarNodes = document.querySelectorAll("[data-admin-avatar]");
const adminSidebarUserName = document.getElementById("adminSidebarUserName");

const organizerReviewModal = document.getElementById("adminOrganizerReviewModal");
const organizerReviewBackdrop = document.getElementById("adminOrganizerReviewBackdrop");
const organizerReviewCloseBtn = document.getElementById("adminOrganizerReviewClose");
const organizerReviewAvatar = document.getElementById("adminOrganizerReviewAvatar");
const organizerReviewTitle = document.getElementById("adminOrganizerReviewTitle");
const organizerReviewMeta = document.getElementById("adminOrganizerReviewMeta");
const organizerReviewStatus = document.getElementById("adminOrganizerReviewStatus");
const organizerReviewStats = document.getElementById("adminOrganizerReviewStats");
const organizerReviewEvents = document.getElementById("adminOrganizerReviewEvents");
const organizerReviewNote = document.getElementById("adminOrganizerReviewNote");
const organizerReviewMessage = document.getElementById("adminOrganizerReviewMessage");
const warnOrganizerBtn = document.getElementById("adminOrganizerWarnBtn");
const suspendOrganizerBtn = document.getElementById("adminOrganizerSuspendBtn");
const activateOrganizerBtn = document.getElementById("adminOrganizerActivateBtn");
const removeOrganizerBtn = document.getElementById("adminOrganizerRemoveBtn");

const userReviewModal = document.getElementById("adminUserReviewModal");
const userReviewBackdrop = document.getElementById("adminUserReviewBackdrop");
const userReviewCloseBtn = document.getElementById("adminUserReviewClose");
const userReviewAvatar = document.getElementById("adminUserReviewAvatar");
const userReviewTitle = document.getElementById("adminUserReviewTitle");
const userReviewMeta = document.getElementById("adminUserReviewMeta");
const userReviewStatus = document.getElementById("adminUserReviewStatus");
const userReviewStats = document.getElementById("adminUserReviewStats");
const userReviewBookings = document.getElementById("adminUserReviewBookings");
const userReviewNote = document.getElementById("adminUserReviewNote");
const userReviewMessage = document.getElementById("adminUserReviewMessage");
const warnUserBtn = document.getElementById("adminUserWarnBtn");
const activateUserBtn = document.getElementById("adminUserActivateBtn");
const removeUserBtn = document.getElementById("adminUserRemoveBtn");

const adminState = {
  activeSection: "dashboard",
  organizers: [],
  users: [],
  browseEvents: [],
  activeOrganizer: null,
  activeUser: null,
};

const escapeHtml = value => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#39;");

const formatCurrency = amount => `Rs ${Number(amount || 0).toLocaleString("en-IN")}`;

const formatBrowseBadge = category => {
  const text = String(category || "event").trim().toLowerCase();
  return text ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : "Event";
};

const buildBrowseSearchText = event => [
  event.eventName,
  event.location,
  event.category,
  event.ticketType,
  event.eventDate,
  event.eventTime,
].join(" ").toLowerCase();

const resolveStatusClass = status => {
  const normalized = String(status || "active").trim().toLowerCase();
  return ["suspended", "removed", "cancelled"].includes(normalized) ? "cancelled" : normalized;
};

const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      "Accept": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (response.status === 401) {
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (response.status === 403) {
    window.location.href = "/dashboard/user";
    throw new Error("Forbidden");
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Unable to complete request.");
  }

  return data;
};

const applyAdminProfile = data => {
  const adminName = String(data.userName || "EventHub Admin").trim();
  const profileImage = data.profileImage || data.profile_image || "/assets/dashboard/images/logo1.png";

  if (adminSidebarUserName) {
    adminSidebarUserName.textContent = adminName;
  }

  adminNameNodes.forEach(node => {
    node.textContent = adminName;
  });

  adminAvatarNodes.forEach(node => {
    if (node.tagName === "IMG") {
      node.src = profileImage;
      node.alt = `${adminName} avatar`;
    }
  });
};

const loadAdminProfile = async () => {
  const data = await fetchJson("/profileservlet");
  if (String(data.userRole || "").trim().toLowerCase() !== "admin") {
    window.location.href = "/dashboard/user";
    return;
  }
  applyAdminProfile(data);
};

const loadOrganizers = async () => {
  const data = await fetchJson("/adminorganizersservlet");
  adminState.organizers = Array.isArray(data.organizers) ? data.organizers : [];
};

const loadUsers = async () => {
  const data = await fetchJson("/adminusersservlet");
  adminState.users = Array.isArray(data.users) ? data.users : [];
};

const loadBrowseEvents = async () => {
  const data = await fetchJson("/adminbrowseeventsservlet");
  adminState.browseEvents = Array.isArray(data.events) ? data.events : [];
};

const getOrganizerResults = (searchValue = organizerSearch?.value || "") => {
  const term = String(searchValue || "").trim().toLowerCase();
  if (!term) {
    return adminState.organizers;
  }

  return adminState.organizers.filter(organizer => {
    const haystack = [
      organizer.name,
      organizer.email,
      organizer.phone,
      organizer.bio,
      organizer.status,
      ...(Array.isArray(organizer.events) ? organizer.events.map(event => event.eventName || "") : []),
    ].join(" ").toLowerCase();
    return haystack.includes(term);
  });
};

const getUserResults = (searchValue = userSearch?.value || "") => {
  const term = String(searchValue || "").trim().toLowerCase();
  if (!term) {
    return adminState.users;
  }

  return adminState.users.filter(user => {
    const haystack = [
      user.name,
      user.email,
      user.city,
      user.status,
      String(user.warningCount || 0),
    ].join(" ").toLowerCase();
    return haystack.includes(term);
  });
};

const getBrowseResults = (searchValue = adminBrowseSearch?.value || "") => {
  const term = String(searchValue || "").trim().toLowerCase();
  if (!term) {
    return adminState.browseEvents;
  }

  return adminState.browseEvents.filter(event => buildBrowseSearchText(event).includes(term));
};

const buildMiniStatMarkup = items => items.map(item => `
  <div class="organizer-revenue-metric">
    <span>${escapeHtml(item.label)}</span>
    <strong>${escapeHtml(item.value)}</strong>
  </div>
`).join("");

const renderStatCards = () => {
  const totalRevenue = adminState.organizers.reduce((sum, organizer) => sum + Number(organizer.totalRevenue || 0), 0);
  const activeOrganizers = adminState.organizers.filter(organizer => String(organizer.status || "").toLowerCase() === "active").length;
  const totalUsers = adminState.users.length;
  const liveEvents = adminState.organizers.reduce((sum, organizer) => sum + Number(organizer.activeEvents || 0), 0);

  if (adminStatRevenue) adminStatRevenue.textContent = formatCurrency(totalRevenue);
  if (adminStatOrganizers) adminStatOrganizers.textContent = String(activeOrganizers);
  if (adminStatUsers) adminStatUsers.textContent = String(totalUsers);
  if (adminStatEvents) adminStatEvents.textContent = String(liveEvents);
};

const renderRevenueOverview = () => {
  const totalRevenue = adminState.organizers.reduce((sum, organizer) => sum + Number(organizer.totalRevenue || 0), 0);
  const totalAttendees = adminState.organizers.reduce((sum, organizer) => sum + Number(organizer.totalAttendees || 0), 0);
  const totalEvents = adminState.organizers.reduce((sum, organizer) => sum + Number(organizer.eventCount || 0), 0);
  const flaggedAccounts = adminState.organizers.filter(organizer => String(organizer.status || "").toLowerCase() !== "active").length;

  if (adminRevenueHeadline) {
    adminRevenueHeadline.textContent = totalEvents
      ? "Revenue and organizer activity are tied to live platform data"
      : "No organizer events are available yet";
  }

  if (adminRevenueSummary) {
    adminRevenueSummary.textContent = totalEvents
      ? `The admin panel is tracking ${totalEvents} organizer event records with ${totalAttendees} attendees across the platform.`
      : "As organizers publish events, revenue, attendee, and review insights will appear here automatically.";
  }

  if (adminRevenueMetrics) {
    adminRevenueMetrics.innerHTML = buildMiniStatMarkup([
      { label: "Total Revenue", value: formatCurrency(totalRevenue) },
      { label: "Tracked Attendees", value: String(totalAttendees) },
      { label: "Events Created", value: String(totalEvents) },
      { label: "Accounts to Review", value: String(flaggedAccounts) },
    ]);
  }

  if (adminRevenueBars) {
    const topOrganizers = [...adminState.organizers]
      .sort((left, right) => Number(right.totalRevenue || 0) - Number(left.totalRevenue || 0))
      .slice(0, 4);
    const maxRevenue = Math.max(...topOrganizers.map(item => Number(item.totalRevenue || 0)), 1);

    adminRevenueBars.innerHTML = topOrganizers.length
      ? topOrganizers.map(item => `
          <div class="admin-revenue-row">
            <div class="admin-revenue-meta">
              <strong>${escapeHtml(item.name || "Organizer")}</strong>
              <span>${escapeHtml(formatCurrency(item.totalRevenue || 0))}</span>
            </div>
            <div class="admin-revenue-track">
              <div class="admin-revenue-fill" style="width: ${(Number(item.totalRevenue || 0) / maxRevenue) * 100}%"></div>
            </div>
          </div>
        `).join("")
      : "<p class=\"meta\">Revenue bars will appear when organizer activity is available.</p>";
  }
};

const renderActivity = () => {
  if (!adminActivityList) {
    return;
  }

  const topRevenueOrganizer = [...adminState.organizers]
    .sort((left, right) => Number(right.totalRevenue || 0) - Number(left.totalRevenue || 0))[0];
  const warnedOrganizers = adminState.organizers.filter(organizer => String(organizer.status || "").toLowerCase() === "warned").length;
  const warnedUsers = adminState.users.filter(user => String(user.status || "").toLowerCase() === "warned").length;
  const removedUsers = adminState.users.filter(user => String(user.status || "").toLowerCase() === "removed").length;

  const items = [
    {
      icon: "fa-solid fa-wallet",
      title: topRevenueOrganizer
        ? `${topRevenueOrganizer.name} is currently leading organizer revenue`
        : "Waiting for organizer revenue data",
      detail: topRevenueOrganizer
        ? `Current recorded revenue: ${formatCurrency(topRevenueOrganizer.totalRevenue || 0)}`
        : "Organizer revenue data will populate after events are created.",
    },
    {
      icon: "fa-solid fa-user-tie",
      title: `${adminState.organizers.length} organizer account(s) are connected to admin review`,
      detail: `${warnedOrganizers} warned organizer account(s) are active in the latest dataset.`,
    },
    {
      icon: "fa-solid fa-users",
      title: `${adminState.users.length} user account(s) are visible in Manage User`,
      detail: `${warnedUsers} warned and ${removedUsers} removed user account(s) are currently tracked.`,
    },
  ];

  adminActivityList.innerHTML = items.map(item => `
    <li class="admin-activity-item">
      <div class="activity-icon">
        <i class="${escapeHtml(item.icon)}"></i>
      </div>
      <div>
        <p>${escapeHtml(item.title)}</p>
        <span>${escapeHtml(item.detail)}</span>
      </div>
    </li>
  `).join("");
};

const renderHealthMetrics = () => {
  if (!adminHealthGrid) {
    return;
  }

  const totalRevenue = adminState.organizers.reduce((sum, organizer) => sum + Number(organizer.totalRevenue || 0), 0);
  const totalAttendees = adminState.organizers.reduce((sum, organizer) => sum + Number(organizer.totalAttendees || 0), 0);
  const totalEvents = adminState.organizers.reduce((sum, organizer) => sum + Number(organizer.eventCount || 0), 0);
  const avgRevenuePerEvent = totalEvents ? Math.round(totalRevenue / totalEvents) : 0;
  const avgAttendeesPerOrganizer = adminState.organizers.length
    ? Math.round(totalAttendees / adminState.organizers.length)
    : 0;
  const accountsUnderReview = adminState.organizers.filter(organizer => String(organizer.status || "").toLowerCase() !== "active").length
    + adminState.users.filter(user => String(user.status || "").toLowerCase() !== "active").length;

  adminHealthGrid.innerHTML = [
    {
      label: "Average Revenue / Event",
      value: formatCurrency(avgRevenuePerEvent),
      caption: "Computed from organizer event totals currently stored in the platform.",
    },
    {
      label: "Average Attendees / Organizer",
      value: String(avgAttendeesPerOrganizer),
      caption: "Useful for spotting organizers that need performance support.",
    },
    {
      label: "Accounts Under Review",
      value: String(accountsUnderReview),
      caption: "Combined organizer and user accounts that are not in a clean active state.",
    },
    {
      label: "Warning Actions Issued",
      value: String(
        adminState.organizers.reduce((sum, organizer) => sum + Number(organizer.warningCount || 0), 0)
        + adminState.users.reduce((sum, user) => sum + Number(user.warningCount || 0), 0)
      ),
      caption: "Tracks how many warning actions have been recorded so far.",
    },
  ].map(item => `
    <div class="admin-health-card">
      <span>${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.value)}</strong>
      <p>${escapeHtml(item.caption)}</p>
    </div>
  `).join("");
};

const renderOrganizers = () => {
  const organizers = getOrganizerResults();

  if (organizerMiniStats) {
    organizerMiniStats.innerHTML = buildMiniStatMarkup([
      { label: "Visible Organizers", value: String(organizers.length) },
      { label: "Visible Revenue", value: formatCurrency(organizers.reduce((sum, item) => sum + Number(item.totalRevenue || 0), 0)) },
      { label: "Accounts to Review", value: String(organizers.filter(item => String(item.status || "").toLowerCase() !== "active").length) },
    ]);
  }

  if (!organizerGrid) {
    return;
  }

  if (!organizers.length) {
    organizerGrid.innerHTML = "<p class=\"meta\">No organizers match the current search.</p>";
    return;
  }

  organizerGrid.innerHTML = organizers.map(organizer => `
    <article class="admin-organizer-card">
      <div class="admin-organizer-head">
        <div class="admin-organizer-profile">
          <img src="${escapeHtml(organizer.profileImage || "/assets/dashboard/images/logo1.png")}" alt="${escapeHtml(organizer.name)}">
          <div>
            <strong>${escapeHtml(organizer.name || "Organizer")}</strong>
            <p class="meta">${escapeHtml(organizer.email || "")}</p>
          </div>
        </div>
        <span class="booking-status ${escapeHtml(resolveStatusClass(organizer.status))}">
          ${escapeHtml(organizer.status || "active")}
        </span>
      </div>

      <p class="admin-organizer-meta">
        ${escapeHtml(organizer.phone || "-")} | ${escapeHtml(String(organizer.warningCount || 0))} warning(s)
      </p>

      <div class="admin-organizer-summary">
        <div>
          <span>Events Created</span>
          <strong>${escapeHtml(String(organizer.eventCount || 0))}</strong>
        </div>
        <div>
          <span>Attendees</span>
          <strong>${escapeHtml(String(organizer.totalAttendees || 0))}</strong>
        </div>
        <div>
          <span>Revenue</span>
          <strong>${escapeHtml(formatCurrency(organizer.totalRevenue || 0))}</strong>
        </div>
      </div>

      <div class="admin-organizer-events">
        ${(Array.isArray(organizer.events) ? organizer.events : []).map(event => `
          <div class="admin-organizer-event">
            <strong>${escapeHtml(event.eventName || "Untitled Event")}</strong>
            <span>${escapeHtml(event.eventDate || "-")} | ${escapeHtml(event.status || "draft")} | ${escapeHtml(String(event.attendeeCount || 0))} attendees</span>
            <span>${escapeHtml(event.price || "Rs 0")}</span>
          </div>
        `).join("") || "<p class=\"meta\">No events created yet.</p>"}
      </div>

      <div class="admin-card-actions">
        <button type="button" class="admin-btn primary admin-review-organizer-btn" data-organizer-email="${escapeHtml(organizer.email || "")}">
          Review Account
        </button>
      </div>
    </article>
  `).join("");
};

const renderUsers = () => {
  const users = getUserResults();

  if (userMiniStats) {
    userMiniStats.innerHTML = buildMiniStatMarkup([
      { label: "Visible Users", value: String(users.length) },
      { label: "Total Spend", value: formatCurrency(users.reduce((sum, item) => sum + Number(item.totalSpend || 0), 0)) },
      { label: "Flagged Users", value: String(users.filter(item => ["warned", "removed", "suspended", "flagged"].includes(String(item.status || "").toLowerCase())).length) },
    ]);
  }

  if (userResultsCount) {
    userResultsCount.textContent = `${users.length} users`;
  }

  if (!userTableBody) {
    return;
  }

  if (!users.length) {
    userTableBody.innerHTML = "<tr><td colspan=\"7\" class=\"manage-users-no-data\">No users match the current search.</td></tr>";
    return;
  }

  userTableBody.innerHTML = users.map(user => `
    <tr>
      <td>
        <div class="user-cell">
          <img src="${escapeHtml(user.profileImage || "/assets/dashboard/images/logo1.png")}" alt="${escapeHtml(user.name)}">
          <div>
            <strong>${escapeHtml(user.name || "User")}</strong>
            <span>${escapeHtml(user.email || "")}</span>
          </div>
        </div>
      </td>
      <td>${escapeHtml(user.city || "N/A")}</td>
      <td>
        <span class="booking-status ${escapeHtml(resolveStatusClass(user.status))}">
          ${escapeHtml(user.status || "active")}
        </span>
      </td>
      <td>${escapeHtml(String(user.tickets || 0))}</td>
      <td>${escapeHtml(formatCurrency(user.totalSpend || 0))}</td>
      <td>${escapeHtml(String(user.upcomingEvents || 0))} events</td>
      <td>
        <div class="admin-table-actions">
          <button type="button" class="admin-btn primary admin-review-user-btn" data-user-email="${escapeHtml(user.email || "")}">View</button>
        </div>
      </td>
    </tr>
  `).join("");
};

const renderBrowse = () => {
  const events = getBrowseResults();

  if (adminBrowseResultsCount) {
    adminBrowseResultsCount.textContent = `${events.length} events`;
  }

  if (!adminBrowseResults) {
    return;
  }

  if (!events.length) {
    adminBrowseResults.innerHTML = "<p class=\"meta\">No published upcoming events match the current search.</p>";
    return;
  }

  adminBrowseResults.innerHTML = events.map(event => `
    <article class="browse-card">
      <img src="${escapeHtml(event.imageUrl || "/assets/dashboard/images/dsupimg1.jpg")}" alt="${escapeHtml(event.eventName || "Event")}">
      <div class="browse-info">
        <span class="browse-badge">${escapeHtml(formatBrowseBadge(event.category))}</span>
        <h4>${escapeHtml(event.eventName || "Untitled Event")}</h4>
        <p>${escapeHtml(event.eventTime || "-")}</p>
        <p>${escapeHtml(event.price || "Rs 0")}</p>
        <p>${escapeHtml(event.location || "Online Event")} | ${escapeHtml(event.eventDate || "-")}</p>
        <div class="admin-browse-footer">
          <span class="admin-browse-meta">${escapeHtml(event.ticketType || "Entry Pass")}</span>
          <a class="admin-browse-contact" href="${event.organizerPhone ? `tel:${escapeHtml(event.organizerPhone)}` : "#"}">${escapeHtml(event.organizerPhone || "Organizer contact unavailable")}</a>
        </div>
      </div>
    </article>
  `).join("");
};

const renderAll = () => {
  renderStatCards();
  renderRevenueOverview();
  renderActivity();
  renderHealthMetrics();
  renderOrganizers();
  renderUsers();
  renderBrowse();
};

const showSection = sectionName => {
  adminState.activeSection = sectionName;

  adminSections.forEach(section => {
    section.hidden = section.dataset.section !== sectionName;
  });

  adminNavItems.forEach(item => {
    const button = item.querySelector("[data-section-target]");
    item.classList.toggle("active", button?.dataset.sectionTarget === sectionName);
  });

  const titleMap = {
    dashboard: "Admin Dashboard",
    organizers: "Manage Organizer",
    users: "Manage User",
    browse: "Browse Events",
  };

  if (adminSectionTitle) {
    adminSectionTitle.textContent = titleMap[sectionName] || "Admin Dashboard";
  }
};

const setOrganizerReviewMessage = (message = "", isError = false) => {
  if (!organizerReviewMessage) {
    return;
  }

  organizerReviewMessage.hidden = !message;
  organizerReviewMessage.textContent = message;
  organizerReviewMessage.classList.toggle("error", isError);
};

const closeOrganizerReviewModal = () => {
  adminState.activeOrganizer = null;
  if (organizerReviewModal) {
    organizerReviewModal.hidden = true;
  }
  setOrganizerReviewMessage("");
};

const renderOrganizerReviewModal = organizer => {
  if (!organizer || !organizerReviewModal) {
    return;
  }

  adminState.activeOrganizer = organizer;

  if (organizerReviewAvatar) {
    organizerReviewAvatar.src = organizer.profileImage || "/assets/dashboard/images/logo1.png";
    organizerReviewAvatar.alt = `${organizer.name || "Organizer"} avatar`;
  }
  if (organizerReviewTitle) organizerReviewTitle.textContent = organizer.name || "Organizer Review";
  if (organizerReviewMeta) organizerReviewMeta.textContent = `${organizer.email || ""} | ${organizer.phone || "-"}`;
  if (organizerReviewStatus) {
    organizerReviewStatus.textContent = organizer.status || "active";
    organizerReviewStatus.className = `booking-status ${resolveStatusClass(organizer.status)}`;
  }
  if (organizerReviewStats) {
    const stats = organizer.stats || {};
    organizerReviewStats.innerHTML = [
      { label: "Events Created", value: String(stats.eventsCreated || 0) },
      { label: "Active Events", value: String(stats.activeEvents || 0) },
      { label: "Attendees", value: String(stats.attendees || 0) },
      { label: "Revenue", value: formatCurrency(stats.revenue || 0) },
      { label: "Warnings", value: String(organizer.warningCount || 0) },
      { label: "Status", value: String(organizer.status || "active") },
    ].map(item => `
      <div class="admin-review-stat">
        <span>${escapeHtml(item.label)}</span>
        <strong>${escapeHtml(item.value)}</strong>
      </div>
    `).join("");
  }
  if (organizerReviewEvents) {
    organizerReviewEvents.innerHTML = Array.isArray(organizer.events) && organizer.events.length
      ? organizer.events.map(event => `
          <div class="admin-review-event">
            <strong>${escapeHtml(event.eventName || "Untitled Event")}</strong>
            <span>${escapeHtml(event.eventDate || "-")} | ${escapeHtml(event.eventTime || "-")} | ${escapeHtml(event.status || "draft")}</span>
            <span>${escapeHtml(String(event.attendeeCount || 0))} attendees | ${escapeHtml(event.price || "Rs 0")}</span>
          </div>
        `).join("")
      : "<p class=\"meta\">This organizer has not created any events yet.</p>";
  }
  if (organizerReviewNote) {
    organizerReviewNote.value = organizer.adminNote || "";
  }

  setOrganizerReviewMessage("");
  organizerReviewModal.hidden = false;
};

const loadOrganizerReview = async organizerEmail => {
  if (!organizerEmail) {
    return;
  }

  try {
    const data = await fetchJson(`/adminorganizerdetailservlet?email=${encodeURIComponent(organizerEmail)}`);
    renderOrganizerReviewModal(data.organizer || null);
  } catch (error) {
    setOrganizerReviewMessage(error.message || "Unable to load organizer review.", true);
  }
};

const setOrganizerActionButtonsDisabled = disabled => {
  [warnOrganizerBtn, suspendOrganizerBtn, activateOrganizerBtn, removeOrganizerBtn].forEach(button => {
    if (button) {
      button.disabled = disabled;
    }
  });
};

const performOrganizerAction = async action => {
  if (!adminState.activeOrganizer?.email) {
    return;
  }

  const note = organizerReviewNote?.value.trim() || "";
  setOrganizerActionButtonsDisabled(true);
  setOrganizerReviewMessage("");

  try {
    const data = await fetchJson("/admin-organizer-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: new URLSearchParams({
        organizerEmail: adminState.activeOrganizer.email,
        action,
        note,
      }).toString(),
    });

    const updatedOrganizer = data.organizer || null;
    if (updatedOrganizer) {
      adminState.organizers = adminState.organizers.map(organizer => (
        organizer.email === updatedOrganizer.email
          ? {
              ...organizer,
              ...updatedOrganizer,
              eventCount: updatedOrganizer.stats?.eventsCreated ?? organizer.eventCount,
              activeEvents: updatedOrganizer.stats?.activeEvents ?? organizer.activeEvents,
              totalAttendees: updatedOrganizer.stats?.attendees ?? organizer.totalAttendees,
              totalRevenue: updatedOrganizer.stats?.revenue ?? organizer.totalRevenue,
            }
          : organizer
      ));
      renderAll();
      renderOrganizerReviewModal(updatedOrganizer);
    }

    setOrganizerReviewMessage(data.message || "Organizer account updated successfully.");
  } catch (error) {
    setOrganizerReviewMessage(error.message || "Unable to update organizer account.", true);
  } finally {
    setOrganizerActionButtonsDisabled(false);
  }
};

const setUserReviewMessage = (message = "", isError = false) => {
  if (!userReviewMessage) {
    return;
  }

  userReviewMessage.hidden = !message;
  userReviewMessage.textContent = message;
  userReviewMessage.classList.toggle("error", isError);
};

const closeUserReviewModal = () => {
  adminState.activeUser = null;
  if (userReviewModal) {
    userReviewModal.hidden = true;
  }
  setUserReviewMessage("");
};

const renderUserReviewModal = account => {
  if (!account || !userReviewModal) {
    return;
  }

  adminState.activeUser = account;

  if (userReviewAvatar) {
    userReviewAvatar.src = account.profileImage || "/assets/dashboard/images/logo1.png";
    userReviewAvatar.alt = `${account.name || "User"} avatar`;
  }
  if (userReviewTitle) userReviewTitle.textContent = account.name || "User Review";
  if (userReviewMeta) userReviewMeta.textContent = `${account.email || ""} | ${account.city || "N/A"}`;
  if (userReviewStatus) {
    userReviewStatus.textContent = account.status || "active";
    userReviewStatus.className = `booking-status ${resolveStatusClass(account.status)}`;
  }
  if (userReviewStats) {
    const stats = account.stats || {};
    userReviewStats.innerHTML = [
      { label: "Tickets", value: String(stats.tickets || 0) },
      { label: "Upcoming Events", value: String(stats.upcomingEvents || 0) },
      { label: "Attended Events", value: String(stats.attendedEvents || 0) },
      { label: "Cancelled", value: String(stats.cancelledBookings || 0) },
      { label: "Total Spend", value: formatCurrency(stats.totalSpend || 0) },
      { label: "Warnings", value: String(account.warningCount || 0) },
    ].map(item => `
      <div class="admin-review-stat">
        <span>${escapeHtml(item.label)}</span>
        <strong>${escapeHtml(item.value)}</strong>
      </div>
    `).join("");
  }
  if (userReviewBookings) {
    userReviewBookings.innerHTML = Array.isArray(account.bookings) && account.bookings.length
      ? account.bookings.map(booking => `
          <div class="admin-review-event">
            <strong>${escapeHtml(booking.eventName || "Untitled Event")}</strong>
            <span>${escapeHtml(booking.eventDate || "-")} | ${escapeHtml(booking.eventTime || "-")} | ${escapeHtml(booking.location || "Online Event")}</span>
            <span>${escapeHtml(booking.ticketType || "Entry Pass")} x ${escapeHtml(String(booking.ticketCount || 1))} | ${escapeHtml(booking.bookingPrice || "Rs 0")} | ${escapeHtml(booking.bookingStatus || "active")}</span>
          </div>
        `).join("")
      : "<p class=\"meta\">This user has not booked any events yet.</p>";
  }
  if (userReviewNote) {
    userReviewNote.value = account.adminNote || "";
  }

  setUserReviewMessage("");
  userReviewModal.hidden = false;
};

const loadUserReview = async userEmail => {
  if (!userEmail) {
    return;
  }

  try {
    const data = await fetchJson(`/adminuserdetailservlet?email=${encodeURIComponent(userEmail)}`);
    renderUserReviewModal(data.account || null);
  } catch (error) {
    setUserReviewMessage(error.message || "Unable to load user review.", true);
  }
};

const setUserActionButtonsDisabled = disabled => {
  [warnUserBtn, activateUserBtn, removeUserBtn].forEach(button => {
    if (button) {
      button.disabled = disabled;
    }
  });
};

const syncUserSummaryFromDetail = account => {
  if (!account?.email) {
    return;
  }

  adminState.users = adminState.users.map(user => (
    user.email === account.email
      ? {
          ...user,
          name: account.name,
          profileImage: account.profileImage,
          status: account.status,
          warningCount: account.warningCount,
          city: account.city || user.city,
          tickets: account.stats?.tickets ?? user.tickets,
          totalSpend: account.stats?.totalSpend ?? user.totalSpend,
          upcomingEvents: account.stats?.upcomingEvents ?? user.upcomingEvents,
        }
      : user
  ));
};

const performUserAction = async action => {
  if (!adminState.activeUser?.email) {
    return;
  }

  const note = userReviewNote?.value.trim() || "";
  setUserActionButtonsDisabled(true);
  setUserReviewMessage("");

  try {
    const data = await fetchJson("/admin-user-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: new URLSearchParams({
        userEmail: adminState.activeUser.email,
        action,
        note,
      }).toString(),
    });

    const updatedAccount = data.account || null;
    if (updatedAccount) {
      syncUserSummaryFromDetail(updatedAccount);
      renderAll();
      renderUserReviewModal(updatedAccount);
    }

    setUserReviewMessage(data.message || "User account updated successfully.");
  } catch (error) {
    setUserReviewMessage(error.message || "Unable to update user account.", true);
  } finally {
    setUserActionButtonsDisabled(false);
  }
};

const routeGlobalSearch = () => {
  const term = String(adminGlobalSearch?.value || "").trim();
  if (!term) {
    if (adminState.activeSection === "organizers" && organizerSearch) {
      organizerSearch.value = "";
      renderOrganizers();
    }
    if (adminState.activeSection === "users" && userSearch) {
      userSearch.value = "";
      renderUsers();
    }
    if (adminState.activeSection === "browse" && adminBrowseSearch) {
      adminBrowseSearch.value = "";
      renderBrowse();
    }
    return;
  }

  if (adminState.activeSection === "organizers" && organizerSearch) {
    organizerSearch.value = term;
    renderOrganizers();
    return;
  }

  if (adminState.activeSection === "users" && userSearch) {
    userSearch.value = term;
    renderUsers();
    return;
  }

  if (adminState.activeSection === "browse" && adminBrowseSearch) {
    adminBrowseSearch.value = term;
    renderBrowse();
    return;
  }

  const matches = [
    { section: "organizers", count: getOrganizerResults(term).length },
    { section: "users", count: getUserResults(term).length },
    { section: "browse", count: getBrowseResults(term).length },
  ].sort((left, right) => right.count - left.count);

  const bestSection = matches[0]?.section || "organizers";
  showSection(bestSection);

  if (bestSection === "organizers" && organizerSearch) {
    organizerSearch.value = term;
    renderOrganizers();
  }
  if (bestSection === "users" && userSearch) {
    userSearch.value = term;
    renderUsers();
  }
  if (bestSection === "browse" && adminBrowseSearch) {
    adminBrowseSearch.value = term;
    renderBrowse();
  }
};

adminNavButtons.forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    showSection(button.dataset.sectionTarget || "dashboard");
  });
});

sectionShortcutButtons.forEach(button => {
  button.addEventListener("click", () => {
    showSection(button.dataset.sectionShortcut || "dashboard");
  });
});

adminMenuToggle?.addEventListener("click", toggleSidebar);
adminPrimaryAction?.addEventListener("click", () => showSection("browse"));
adminRevenueAction?.addEventListener("click", () => showSection("dashboard"));
adminSupportAction?.addEventListener("click", () => {
  window.location.href = "/assets/dashboard/admin/support.html";
});

organizerSearch?.addEventListener("input", renderOrganizers);
userSearch?.addEventListener("input", renderUsers);
adminBrowseSearch?.addEventListener("input", renderBrowse);
adminGlobalSearch?.addEventListener("input", routeGlobalSearch);

organizerGrid?.addEventListener("click", event => {
  const reviewButton = event.target.closest(".admin-review-organizer-btn");
  if (!reviewButton) {
    return;
  }
  loadOrganizerReview(reviewButton.dataset.organizerEmail || "");
});

userTableBody?.addEventListener("click", event => {
  const reviewButton = event.target.closest(".admin-review-user-btn");
  if (!reviewButton) {
    return;
  }
  loadUserReview(reviewButton.dataset.userEmail || "");
});

warnOrganizerBtn?.addEventListener("click", () => performOrganizerAction("warn"));
suspendOrganizerBtn?.addEventListener("click", () => performOrganizerAction("suspend"));
activateOrganizerBtn?.addEventListener("click", () => performOrganizerAction("activate"));
removeOrganizerBtn?.addEventListener("click", () => performOrganizerAction("remove"));

warnUserBtn?.addEventListener("click", () => performUserAction("warn"));
activateUserBtn?.addEventListener("click", () => performUserAction("activate"));
removeUserBtn?.addEventListener("click", () => performUserAction("remove"));

organizerReviewBackdrop?.addEventListener("click", closeOrganizerReviewModal);
organizerReviewCloseBtn?.addEventListener("click", closeOrganizerReviewModal);
userReviewBackdrop?.addEventListener("click", closeUserReviewModal);
userReviewCloseBtn?.addEventListener("click", closeUserReviewModal);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeOrganizerReviewModal();
    closeUserReviewModal();
  }
});

const initializeAdmin = async () => {
  try {
    await loadAdminProfile();
    await Promise.all([loadOrganizers(), loadUsers(), loadBrowseEvents()]);
    renderAll();
    const requestedSection = new URLSearchParams(window.location.search).get("section");
    const initialSection = ["dashboard", "organizers", "users", "browse"].includes(String(requestedSection || "").trim())
      ? String(requestedSection).trim()
      : "dashboard";
    showSection(initialSection);
  } catch (error) {
    window.location.href = "/login";
  }
};

initializeAdmin();
