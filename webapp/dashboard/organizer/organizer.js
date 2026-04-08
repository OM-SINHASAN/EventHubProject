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
const organizerAccountBanner = document.getElementById("organizerAccountBanner");
const organizerAccountBannerTitle = document.getElementById("organizerAccountBannerTitle");
const organizerAccountBannerText = document.getElementById("organizerAccountBannerText");
const organizerManagedEvents = document.getElementById("organizerManagedEvents");
const organizerActivityList = document.getElementById("organizerActivityList");
const organizerSalesList = document.getElementById("organizerSalesList");
const organizerNotificationsList = document.getElementById("organizerNotificationsList");
const organizerCompletedEvents = document.getElementById("organizerCompletedEvents");
const organizerActiveEvents = document.getElementById("organizerActiveEvents");
const organizerTotalAttendees = document.getElementById("organizerTotalAttendees");
const organizerCheckinRate = document.getElementById("organizerCheckinRate");
const organizerRevenue = document.getElementById("organizerRevenue");
const organizerQuickCreateAction = document.getElementById("organizerQuickCreateAction");
const organizerQuickCreateMeta = document.getElementById("organizerQuickCreateMeta");
const organizerQuickAttendeesMeta = document.getElementById("organizerQuickAttendeesMeta");
const organizerQuickPromoteMeta = document.getElementById("organizerQuickPromoteMeta");
const organizerQuickAnalyticsMeta = document.getElementById("organizerQuickAnalyticsMeta");
const organizerQuickTicketsMeta = document.getElementById("organizerQuickTicketsMeta");
const organizerQuickSupportMeta = document.getElementById("organizerQuickSupportMeta");
const organizerRevenueOverviewFilter = document.getElementById("organizerRevenueOverviewFilter");
const organizerRevenueHeadline = document.getElementById("organizerRevenueHeadline");
const organizerRevenueSummary = document.getElementById("organizerRevenueSummary");
const organizerRevenueMetrics = document.getElementById("organizerRevenueMetrics");
const organizerDashboardSearch = document.getElementById("organizerDashboardSearch");
const openOrganizerAnalyticsAction = document.getElementById("openOrganizerAnalyticsAction");
const organizerAnalyticsKpis = document.getElementById("organizerAnalyticsKpis");
const organizerAnalyticsEvents = document.getElementById("organizerAnalyticsEvents");
const organizerAnalyticsSearch = document.getElementById("organizerAnalyticsSearch");
const organizerAnalyticsPageTitle = document.getElementById("organizerAnalyticsPageTitle");
const organizerAnalyticsSummaryText = document.getElementById("organizerAnalyticsSummaryText");
const organizerAnalyticsOverviewTitle = document.getElementById("organizerAnalyticsOverviewTitle");
const organizerAnalyticsOverviewText = document.getElementById("organizerAnalyticsOverviewText");
const organizerAnalyticsGraph = document.getElementById("organizerAnalyticsGraph");
const organizerAnalyticsEventCount = document.getElementById("organizerAnalyticsEventCount");
const organizerAnalyticsCategoryBody = document.getElementById("organizerAnalyticsCategoryBody");
const organizerAnalyticsStatusList = document.getElementById("organizerAnalyticsStatusList");
const organizerNavbarSearch = document.getElementById("organizerNavbarSearch");
const organizerBrowseSearchTop = document.getElementById("organizerBrowseSearchTop");
const organizerBrowseSearch = document.getElementById("organizerBrowseSearch");
const organizerBrowseResults = document.getElementById("organizerBrowseResults");
const organizerBrowseResultsCount = document.getElementById("organizerBrowseResultsCount");
const organizerBrowseEmptyState = document.getElementById("organizerBrowseEmptyState");
const organizerBrowseCategoryButtons = document.querySelectorAll(".organizer-browse-category-card, #organizerAllCategoriesBtn");
const organizerBrowseCategoryCounts = document.querySelectorAll("[data-organizer-category-count]");
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
const ticketTypeWrap = document.getElementById("ticketTypeWrap");
const ticketTypeInput = document.getElementById("ticketType");
const paymentConfigWrap = document.getElementById("paymentConfigWrap");
const paymentMethodsField = document.getElementById("paymentMethods");
const paymentMethodOptions = Array.from(document.querySelectorAll("[data-payment-method-option]"));
const upiQrUrlField = document.getElementById("upiQrUrl");
const paymentQrWrap = document.getElementById("paymentQrWrap");
const paymentQrInput = document.getElementById("paymentQrInput");
const paymentQrUploadBox = document.getElementById("paymentQrUploadBox");
const paymentQrMeta = document.getElementById("paymentQrMeta");
const paymentQrPreview = document.getElementById("paymentQrPreview");
const posterUploadBox = document.getElementById("posterUploadBox");
const posterImageInput = document.getElementById("posterImageInput");
const posterUploadMeta = document.getElementById("posterUploadMeta");
const posterUrlField = document.getElementById("posterUrl");
const organizerEventsPageTitle = document.getElementById("organizerEventsPageTitle");
const organizerEventsSearchTop = document.getElementById("organizerEventsSearchTop");
const organizerEventsSearch = document.getElementById("organizerEventsSearch");
const organizerEventsResultsCount = document.getElementById("organizerEventsResultsCount");
const organizerEventsList = document.getElementById("organizerEventsList");
const organizerEventsEmptyState = document.getElementById("organizerEventsEmptyState");
const organizerEventFilterButtons = document.querySelectorAll("[data-organizer-event-filter]");
const manageUsersEventSearchTop = document.getElementById("manageUsersEventSearchTop");
const manageUsersEventSearch = document.getElementById("manageUsersEventSearch");
const manageUsersEventCount = document.getElementById("manageUsersEventCount");
const manageUsersEventsList = document.getElementById("manageUsersEventsList");
const manageUsersEventsEmptyState = document.getElementById("manageUsersEventsEmptyState");
const manageUsersEventFilterButtons = document.querySelectorAll("[data-manage-users-event-filter]");
const manageUsersAttendeeSection = document.getElementById("manageUsersAttendeeSection");
const manageUsersAttendeeModal = document.getElementById("manageUsersAttendeeModal");
const manageUsersAttendeeBackdrop = document.getElementById("manageUsersAttendeeBackdrop");
const manageUsersAttendeeClose = document.getElementById("manageUsersAttendeeClose");
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
const organizerEventEditTicketTypeWrap = document.getElementById("organizerEventEditTicketTypeWrap");
const organizerEventEditTicketType = document.getElementById("organizerEventEditTicketType");
const organizerEventEditPaymentWrap = document.getElementById("organizerEventEditPaymentWrap");
const organizerEventEditPaymentMethods = document.getElementById("organizerEventEditPaymentMethods");
const organizerEventEditPaymentOptions = Array.from(document.querySelectorAll("[data-edit-payment-method-option]"));
const organizerEventEditUpiQrUrl = document.getElementById("organizerEventEditUpiQrUrl");
const organizerEventEditQrWrap = document.getElementById("organizerEventEditQrWrap");
const organizerEventEditQrInput = document.getElementById("organizerEventEditQrInput");
const organizerEventEditQrUploadBox = document.getElementById("organizerEventEditQrUploadBox");
const organizerEventEditQrMeta = document.getElementById("organizerEventEditQrMeta");
const organizerEventEditQrPreview = document.getElementById("organizerEventEditQrPreview");
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
const organizerEventDetailPublishBtn = document.getElementById("organizerEventDetailPublishBtn");
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
const profileSubscriptionStatusChip = document.getElementById("profileSubscriptionStatus");
const profileSubscriptionCurrentPlan = document.getElementById("profileSubscriptionCurrentPlan");
const profileSubscriptionMeta = document.getElementById("profileSubscriptionMeta");
const profileSubscriptionNextBilling = document.getElementById("profileSubscriptionNextBilling");
const profileSubscriptionPrice = document.getElementById("profileSubscriptionPrice");
const profileSubscriptionExploreBtn = document.getElementById("profileSubscriptionExploreBtn");
const profileSubscriptionStatusMessage = document.getElementById("profileSubscriptionStatusMessage");
const profileSubscriptionModal = document.getElementById("profileSubscriptionModal");
const profileSubscriptionBackdrop = document.getElementById("profileSubscriptionBackdrop");
const profileSubscriptionClose = document.getElementById("profileSubscriptionClose");
const profileSubscriptionPlanGrid = document.getElementById("profileSubscriptionPlanGrid");
const profileSubscriptionModalCopy = document.getElementById("profileSubscriptionModalCopy");
const profileImageInput = document.getElementById("profileImageInput");
const profileUploadBtn = document.querySelector(".upload-btn");
const organizerCalendarSearch = document.getElementById("organizerCalendarSearch");
const organizerCalendarSearchTop = document.getElementById("organizerCalendarSearchTop");
const organizerCalendarDateSearch = document.getElementById("organizerCalendarDateSearch");
const organizerCalendarClearDateBtn = document.getElementById("organizerCalendarClearDateBtn");
const organizerCalendarFilterButtons = document.querySelectorAll("[data-organizer-calendar-filter]");
const organizerCalendarMonthTitle = document.getElementById("organizerCalendarMonthTitle");
const organizerCalendarPrevMonthBtn = document.getElementById("organizerCalendarPrevMonthBtn");
const organizerCalendarNextMonthBtn = document.getElementById("organizerCalendarNextMonthBtn");
const organizerCalendarDateStrip = document.getElementById("organizerCalendarDateStrip");
const organizerCalendarTimelineTitle = document.getElementById("organizerCalendarTimelineTitle");
const organizerCalendarEventCount = document.getElementById("organizerCalendarEventCount");
const organizerCalendarTimeline = document.getElementById("organizerCalendarTimeline");
const organizerCalendarEmptyState = document.getElementById("organizerCalendarEmptyState");

let organizerEventsCache = [];
let organizerBrowseCards = [];
let activeOrganizerBrowseCategory = "all";
let activeOrganizerEventFilter = "all";
let activeManageUsersEventFilter = "all";
let manageUsersAttendeesCache = [];
let manageUsersSelectedEventId = "";
let pendingCancelEvent = null;
let organizerProfileSnapshot = null;
let organizerSubscriptionSnapshot = null;
let organizerSubscriptionPlans = [];
let activeOrganizerEventDetail = null;
let organizerDashboardManagedEvents = [];
let organizerAnalyticsEventsCache = [];
const organizerCalendarState = {
  allEvents: [],
  filteredEvents: [],
  activeFilter: "all",
  searchText: "",
  dateSearchKey: "",
  monthKeys: [],
  monthIndex: 0,
  selectedDateKey: "",
};

const escapeHtml = value => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#39;");

const parseCurrencyAmount = value => {
  const digits = String(value ?? "").replace(/[^\d]/g, "");
  return digits ? Number.parseInt(digits, 10) : 0;
};

const formatCurrency = amount => {
  const safeAmount = Number.isFinite(Number(amount)) ? Number(amount) : 0;
  return `Rs ${Math.round(safeAmount).toLocaleString("en-IN")}`;
};

const normalizePaymentMethods = value => {
  const source = Array.isArray(value) ? value : String(value || "").split(",");
  const aliases = {
    "upi qr": "upi",
    "net banking": "netbanking",
    "cash at venue": "cash",
    "credit / debit card": "card",
    "credit-debit card": "card",
  };
  const allowed = ["upi", "netbanking", "cash", "wallet", "card"];
  const normalized = [];

  source.forEach(item => {
    const resolved = aliases[String(item || "").trim().toLowerCase()] || String(item || "").trim().toLowerCase();
    if (allowed.includes(resolved) && !normalized.includes(resolved)) {
      normalized.push(resolved);
    }
  });

  return normalized;
};

const formatPaymentMethodLabel = method => {
  const labels = {
    upi: "UPI QR",
    netbanking: "Net Banking",
    cash: "Cash at Venue",
    wallet: "Wallet",
    card: "Credit / Debit Card",
  };
  return labels[String(method || "").trim().toLowerCase()] || "Payment";
};

const formatBrowseBadge = category => {
  const text = String(category || "event").trim().toLowerCase();
  return text ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : "Event";
};

const buildOrganizerBrowseSearchText = event => [
  event.eventName,
  event.location,
  event.category,
  event.ticketType,
  event.seatInfo,
  event.eventDate,
  event.eventTime,
].join(" ").toLowerCase();

const eventMatchesStatusFilter = (event, filterValue) => {
  const normalizedFilter = String(filterValue || "all").trim().toLowerCase();
  const status = String(event?.status || "").trim().toLowerCase();

  if (normalizedFilter === "all") {
    return true;
  }

  if (normalizedFilter === "active") {
    return status === "published" || status === "live";
  }

  return status === normalizedFilter;
};

const computeEventAnalytics = event => {
  const ticketMode = String(event.ticketPricingMode || "").toLowerCase();
  const capacity = Math.max(0, Number.parseInt(String(event.capacity ?? 0), 10) || 0);
  const attendees = Math.max(0, Number.parseInt(String(event.attendeeCount ?? 0), 10) || 0);
  const perTicket = ticketMode === "free"
    ? 0
    : (Number(event._priceAmount) || parseCurrencyAmount(event.price));
  const grossRevenue = perTicket * attendees;
  const platformFee = Math.round(grossRevenue * 0.08);
  const operationalCost = ticketMode === "free"
    ? attendees * 25
    : Math.round(grossRevenue * 0.45) + (attendees * 15);
  const netPayout = grossRevenue - platformFee;
  const profitLoss = netPayout - operationalCost;
  const occupancyRate = capacity > 0 ? Math.round((attendees / capacity) * 100) : 0;
  const breakEvenAttendees = perTicket > 0 ? Math.ceil(operationalCost / perTicket) : 0;
  const remainingToBreakEven = Math.max(0, breakEvenAttendees - attendees);

  return {
    grossRevenue,
    platformFee,
    operationalCost,
    netPayout,
    profitLoss,
    occupancyRate,
    breakEvenAttendees,
    remainingToBreakEven,
    isProfit: profitLoss >= 0,
  };
};

const renderAnalyticsKpis = events => {
  if (!organizerAnalyticsKpis) {
    return;
  }

  if (!events.length) {
    organizerAnalyticsKpis.innerHTML = "<p class=\"meta\">No events found. Create an event to unlock analytics.</p>";
    if (organizerAnalyticsGraph) {
      organizerAnalyticsGraph.innerHTML = "";
    }
    if (organizerAnalyticsOverviewTitle) {
      organizerAnalyticsOverviewTitle.textContent = "No analytics available yet";
    }
    if (organizerAnalyticsOverviewText) {
      organizerAnalyticsOverviewText.textContent = "Create your first event to start tracking revenue, attendance, and event health.";
    }
    return;
  }

  const totals = events.reduce((acc, event) => {
    const analytics = computeEventAnalytics(event);
    acc.grossRevenue += analytics.grossRevenue;
    acc.profitLoss += analytics.profitLoss;
    acc.netPayout += analytics.netPayout;
    acc.attendees += Number.parseInt(String(event.attendeeCount ?? 0), 10) || 0;
    acc.capacity += Number.parseInt(String(event.capacity ?? 0), 10) || 0;
    acc.statusCounts[String(event.status || "draft").toLowerCase()] = (acc.statusCounts[String(event.status || "draft").toLowerCase()] || 0) + 1;
    return acc;
  }, { grossRevenue: 0, profitLoss: 0, netPayout: 0, attendees: 0, capacity: 0, statusCounts: {} });

  const occupancyRate = totals.capacity > 0 ? Math.round((totals.attendees / totals.capacity) * 100) : 0;
  const dominantStatus = Object.entries(totals.statusCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "draft";
  const publishedCount = totals.statusCounts.published || 0;
  const graphItems = [
    { label: "Revenue", value: totals.grossRevenue, display: formatCurrency(totals.grossRevenue), tone: "blue" },
    { label: "Attendees", value: totals.attendees, display: String(totals.attendees), tone: "green" },
    { label: "Fill Rate", value: occupancyRate, display: `${occupancyRate}%`, tone: "amber" },
    { label: "Published", value: publishedCount, display: `${publishedCount} events`, tone: "purple" },
  ];
  const graphMax = Math.max(...graphItems.map(item => item.value), 1);

  if (organizerAnalyticsOverviewTitle) {
    organizerAnalyticsOverviewTitle.textContent = `${events.length} event${events.length === 1 ? "" : "s"} tracked across your organizer account`;
  }
  if (organizerAnalyticsOverviewText) {
    organizerAnalyticsOverviewText.textContent = `${totals.attendees} attendees across all events, ${occupancyRate}% overall fill rate, and ${dominantStatus} as the most common status in your organizer portfolio.`;
  }
  if (organizerAnalyticsGraph) {
    organizerAnalyticsGraph.innerHTML = graphItems.map(item => `
      <div class="organizer-analytics-graph-item">
        <div class="organizer-analytics-graph-track">
          <div class="organizer-analytics-graph-bar ${item.tone}" style="height:${Math.max(26, Math.round((item.value / graphMax) * 100))}%"></div>
        </div>
        <strong>${escapeHtml(item.display)}</strong>
        <span>${escapeHtml(item.label)}</span>
      </div>
    `).join("");
  }

  organizerAnalyticsKpis.innerHTML = `
    <div class="organizer-analytics-kpi-card">
      <span>Total Revenue</span>
      <strong>${escapeHtml(formatCurrency(totals.grossRevenue))}</strong>
    </div>
    <div class="organizer-analytics-kpi-card ${totals.profitLoss < 0 ? "loss" : "profit"}">
      <span>Est. Profit/Loss</span>
      <strong>${escapeHtml(formatCurrency(totals.profitLoss))}</strong>
    </div>
    <div class="organizer-analytics-kpi-card">
      <span>Attendees Attended</span>
      <strong>${escapeHtml(String(totals.attendees))}</strong>
    </div>
    <div class="organizer-analytics-kpi-card">
      <span>Overall Status</span>
      <strong>${escapeHtml(dominantStatus)}</strong>
    </div>
    <div class="organizer-analytics-kpi-card">
      <span>Net Payout</span>
      <strong>${escapeHtml(formatCurrency(totals.netPayout))}</strong>
    </div>
    <div class="organizer-analytics-kpi-card">
      <span>Fill Rate</span>
      <strong>${escapeHtml(String(occupancyRate))}%</strong>
    </div>
  `;
};

const renderAnalyticsEvents = events => {
  if (!organizerAnalyticsEvents) {
    return;
  }

  if (!events.length) {
    organizerAnalyticsEvents.innerHTML = "<p class=\"meta\">No events match your current search.</p>";
    if (organizerAnalyticsEventCount) {
      organizerAnalyticsEventCount.textContent = "0";
    }
    return;
  }

  if (organizerAnalyticsEventCount) {
    organizerAnalyticsEventCount.textContent = String(events.length);
  }

  organizerAnalyticsEvents.innerHTML = events.map(event => {
    const analytics = computeEventAnalytics(event);
    const category = String(event.category || "event").trim().toLowerCase();
    const browseBadge = category ? `${category.charAt(0).toUpperCase()}${category.slice(1)}` : "Event";
    return `
      <article class="browse-card organizer-analytics-event-card" data-event-id="${escapeHtml(event.id || "")}">
        <img src="${escapeHtml(event.imageUrl || "/assets/dashboard/images/dsupimg1.jpg")}" alt="${escapeHtml(event.eventName || "Event")}">
        <div class="browse-info organizer-analytics-event-card-body">
          <div class="organizer-analytics-event-head">
            <span class="browse-badge">${escapeHtml(browseBadge)}</span>
            <span class="booking-status ${escapeHtml(event.status || "draft")}">${escapeHtml(event.status || "draft")}</span>
          </div>
          <h4>${escapeHtml(event.eventName || "Event")}</h4>
          <p>${escapeHtml(event.eventTime || "-")}</p>
          <p>${escapeHtml(event.location || "Online Event")} - ${escapeHtml(event.eventDate || "-")}</p>
          <div class="organizer-analytics-card-grid">
            <div class="booking-field">
              <span>Revenue</span>
              <strong>${escapeHtml(formatCurrency(analytics.grossRevenue))}</strong>
            </div>
            <div class="booking-field">
              <span>Profit/Loss</span>
              <strong class="${analytics.isProfit ? "profit" : "loss"}">${escapeHtml(formatCurrency(analytics.profitLoss))}</strong>
            </div>
            <div class="booking-field">
              <span>Attendees</span>
              <strong>${escapeHtml(String(event.attendeeCount || 0))}</strong>
            </div>
            <div class="booking-field">
              <span>Occupancy</span>
              <strong>${escapeHtml(String(analytics.occupancyRate))}%</strong>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join("");
};

const getAnalyticsPagePath = eventId => {
  const basePath = "/assets/dashboard/organizer/analytics.html";
  return eventId ? `${basePath}?eventId=${encodeURIComponent(String(eventId))}` : basePath;
};

const goToEventAnalyticsPage = eventData => {
  const eventId = eventData?.id || "";
  window.location.href = getAnalyticsPagePath(eventId);
};

const renderAnalyticsCategoryPerformance = events => {
  if (!organizerAnalyticsCategoryBody) {
    return;
  }

  const categoryMap = new Map();
  events.forEach(event => {
    const key = String(event.category || "general").toLowerCase();
    const analytics = computeEventAnalytics(event);
    const attendees = Number.parseInt(String(event.attendeeCount ?? 0), 10) || 0;
    const capacity = Number.parseInt(String(event.capacity ?? 0), 10) || 0;
    if (!categoryMap.has(key)) {
      categoryMap.set(key, { events: 0, revenue: 0, attendees: 0, capacity: 0 });
    }
    const item = categoryMap.get(key);
    item.events += 1;
    item.revenue += analytics.grossRevenue;
    item.attendees += attendees;
    item.capacity += capacity;
  });

  const rows = Array.from(categoryMap.entries()).map(([category, item]) => {
    const fillRate = item.capacity > 0 ? Math.round((item.attendees / item.capacity) * 100) : 0;
    return `
      <tr>
        <td>${escapeHtml(category)}</td>
        <td>${escapeHtml(String(item.events))}</td>
        <td>${escapeHtml(formatCurrency(item.revenue))}</td>
        <td>${escapeHtml(String(item.attendees))}</td>
        <td>${escapeHtml(String(fillRate))}%</td>
      </tr>
    `;
  });

  organizerAnalyticsCategoryBody.innerHTML = rows.length
    ? rows.join("")
    : "<tr><td colspan=\"5\" class=\"manage-users-no-data\">No category analytics available.</td></tr>";
};

const renderAnalyticsStatusBreakdown = events => {
  if (!organizerAnalyticsStatusList) {
    return;
  }

  const statusMap = events.reduce((acc, event) => {
    const status = String(event.status || "draft").toLowerCase();
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const items = Object.entries(statusMap);
  organizerAnalyticsStatusList.innerHTML = items.length
    ? items.map(([status, count]) => `
      <li>
        <i class="fa-solid fa-circle-info"></i>
        <div>
          <p>${escapeHtml(status.charAt(0).toUpperCase() + status.slice(1))}</p>
          <span>${escapeHtml(String(count))} events</span>
        </div>
      </li>
    `).join("")
    : "<p class=\"meta\">No status analytics available.</p>";
};

const renderAnalyticsPage = (allEvents, filteredEvents) => {
  renderAnalyticsKpis(allEvents);
  renderAnalyticsEvents(filteredEvents);
  renderAnalyticsCategoryPerformance(allEvents);
  renderAnalyticsStatusBreakdown(allEvents);
};

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
  <div class="event-card" data-event-id="${escapeHtml(event.id || "")}">
    <img src="${escapeHtml(event.imageUrl)}" alt="${escapeHtml(event.eventName)}">
    <div class="event-info">
      <h4>${escapeHtml(event.eventName)}</h4>
      <p class="meta"><i class="fa-regular fa-calendar"></i> ${escapeHtml(event.eventDate)} &bull; ${escapeHtml(event.eventTime)}</p>
      <p class="meta"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(event.location)}</p>
      <p class="meta"><i class="fa-solid fa-ticket"></i> ${escapeHtml(event.price || "Rs 0")} &bull; Capacity ${escapeHtml(event.capacity || 0)}</p>
      <div class="event-bottom">
        <span class="badge ${event.status === "draft" ? "badge-yellow" : "badge-green"}">${escapeHtml(event.status.charAt(0).toUpperCase() + event.status.slice(1))}</span>
        <a href="${escapeHtml(getAnalyticsPagePath(event.id || ""))}" class="ticket-link view-organizer-analytics">View Analytics</a>
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

const getCalendarMonthKey = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
const getCalendarDateKey = date => `${getCalendarMonthKey(date)}-${String(date.getDate()).padStart(2, "0")}`;

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

const parseDateNumber = value => {
  const number = Number.parseInt(String(value || "").trim(), 10);
  return Number.isNaN(number) ? null : number;
};

const organizerEventMatchesDateSearch = (event, rawSearchText) => {
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

const formatOrganizerStatusLabel = status => {
  const text = String(status || "draft").trim().toLowerCase();
  return text ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : "Draft";
};

const isOrganizerActiveStatus = status => {
  const normalized = String(status || "").trim().toLowerCase();
  return normalized !== "completed" && normalized !== "cancelled";
};

const resolveOrganizerDashboardEvents = () => (
  organizerEventsCache.length ? organizerEventsCache : organizerDashboardManagedEvents
);

const buildOrganizerCalendarSearchText = event => [
  event.eventName,
  event.location,
  event.category,
  event.eventDate,
  event.eventTime,
  event.status,
  event.price,
].join(" ").toLowerCase();

const buildOrganizerCalendarAction = event => {
  const status = String(event.status || "").trim().toLowerCase();
  if (status === "published") {
    return {
      label: "Open Analytics",
      href: getAnalyticsPagePath(event.id),
    };
  }

  return {
    label: "Open My Events",
    href: "/assets/dashboard/organizer/myevents.html",
  };
};

const renderOrganizerCalendarEventItem = event => {
  const action = buildOrganizerCalendarAction(event);
  const analytics = computeEventAnalytics(event);
  return `
    <div class="organizer-calendar-event-item">
      <div class="organizer-calendar-time">${escapeHtml(event.eventTime || "-")}</div>
      <div class="organizer-calendar-event-card">
        <img src="${escapeHtml(event.imageUrl || "/assets/dashboard/images/dsupimg1.jpg")}" alt="${escapeHtml(event.eventName || "Event")}">
        <div class="organizer-calendar-event-info">
          <h4>${escapeHtml(event.eventName || "-")}</h4>
          <p>${escapeHtml(event.eventDate || "-")} &bull; ${escapeHtml(event.eventTime || "-")}</p>
          <p>${escapeHtml(event.location || "Online Event")}</p>
          <p>${escapeHtml(event.attendeeCount || 0)} attendees &bull; ${escapeHtml(event.price || "Rs 0")} &bull; Fill ${escapeHtml(`${analytics.occupancyRate}%`)}</p>
          <div class="organizer-calendar-event-bottom">
            <span class="organizer-calendar-tag ${escapeHtml(String(event.status || "draft").toLowerCase())}">${escapeHtml(formatOrganizerStatusLabel(event.status))}</span>
            <button type="button" onclick="window.location.href='${escapeHtml(action.href)}'">${escapeHtml(action.label)}</button>
          </div>
        </div>
      </div>
    </div>
  `;
};

const updateOrganizerQuickActions = events => {
  if (!organizerQuickCreateAction) {
    return;
  }

  const allEvents = Array.isArray(events) ? events : [];
  const publishedEvents = allEvents.filter(event => String(event.status || "").toLowerCase() === "published");
  const draftEvents = allEvents.filter(event => String(event.status || "").toLowerCase() === "draft");
  const cancelledEvents = allEvents.filter(event => String(event.status || "").toLowerCase() === "cancelled");
  const totalAttendees = allEvents.reduce((sum, event) => sum + (Number.parseInt(String(event.attendeeCount ?? 0), 10) || 0), 0);
  const paidEvents = allEvents.filter(event => String(event.ticketPricingMode || "").toLowerCase() !== "free");
  const projectedRevenue = allEvents.reduce((sum, event) => sum + computeEventAnalytics(event).grossRevenue, 0);
  const topAttendanceEvent = [...allEvents].sort((left, right) => {
    const leftCount = Number.parseInt(String(left.attendeeCount ?? 0), 10) || 0;
    const rightCount = Number.parseInt(String(right.attendeeCount ?? 0), 10) || 0;
    return rightCount - leftCount;
  })[0];
  const nextPublishedEvent = publishedEvents
    .map(event => ({ ...event, parsedDate: parseCalendarDate(event.eventDate) }))
    .filter(event => event.parsedDate)
    .sort((left, right) => left.parsedDate.getTime() - right.parsedDate.getTime())[0];

  if (organizerQuickCreateMeta) {
    organizerQuickCreateMeta.textContent = draftEvents.length
      ? `${draftEvents.length} draft ${draftEvents.length === 1 ? "event" : "events"} waiting to go live`
      : "Start your next event from scratch";
  }

  if (organizerQuickAttendeesMeta) {
    organizerQuickAttendeesMeta.textContent = publishedEvents.length
      ? `${totalAttendees} attendee${totalAttendees === 1 ? "" : "s"} across ${publishedEvents.length} live event${publishedEvents.length === 1 ? "" : "s"}`
      : "Publish an event to start collecting attendees";
  }

  if (organizerQuickPromoteMeta) {
    organizerQuickPromoteMeta.textContent = nextPublishedEvent
      ? `${nextPublishedEvent.eventName} is your next live event to push`
      : "Publish an event to unlock promotion momentum";
  }

  if (organizerQuickAnalyticsMeta) {
    organizerQuickAnalyticsMeta.textContent = allEvents.length
      ? `${formatCurrency(projectedRevenue)} projected from ${paidEvents.length} paid event${paidEvents.length === 1 ? "" : "s"}`
      : "Create an event to start tracking performance";
  }

  if (organizerQuickTicketsMeta) {
    organizerQuickTicketsMeta.textContent = topAttendanceEvent
      ? `${topAttendanceEvent.eventName} leads with ${topAttendanceEvent.attendeeCount || 0} attendees`
      : "No ticket activity yet";
  }

  if (organizerQuickSupportMeta) {
    organizerQuickSupportMeta.textContent = cancelledEvents.length
      ? `${cancelledEvents.length} cancelled ${cancelledEvents.length === 1 ? "event needs" : "events need"} follow-up`
      : "Everything looks ready for your next launch";
  }
};

const renderOrganizerRevenueOverview = events => {
  if (!organizerRevenueMetrics || !organizerRevenueSummary || !organizerRevenueHeadline) {
    return;
  }

  const allEvents = Array.isArray(events) ? events : [];
  const filterValue = String(organizerRevenueOverviewFilter?.value || "all").toLowerCase();
  const filteredEvents = allEvents.filter(event => {
    const status = String(event.status || "").toLowerCase();
    if (filterValue === "published") {
      return status === "published";
    }
    if (filterValue === "active") {
      return isOrganizerActiveStatus(status);
    }
    return true;
  });

  if (!filteredEvents.length) {
    organizerRevenueHeadline.textContent = "No revenue data for this filter yet";
    organizerRevenueSummary.textContent = "Create or publish events to start tracking revenue, attendance, and payouts here.";
    organizerRevenueMetrics.innerHTML = "";
    return;
  }

  const totals = filteredEvents.reduce((accumulator, event) => {
    const analytics = computeEventAnalytics(event);
    accumulator.grossRevenue += analytics.grossRevenue;
    accumulator.netPayout += analytics.netPayout;
    accumulator.attendees += Number.parseInt(String(event.attendeeCount ?? 0), 10) || 0;
    accumulator.capacity += Number.parseInt(String(event.capacity ?? 0), 10) || 0;
    accumulator.fillRate = accumulator.capacity > 0
      ? Math.round((accumulator.attendees / accumulator.capacity) * 100)
      : 0;
    return accumulator;
  }, { grossRevenue: 0, netPayout: 0, attendees: 0, capacity: 0, fillRate: 0 });

  const topRevenueEvent = [...filteredEvents].sort((left, right) => {
    return computeEventAnalytics(right).grossRevenue - computeEventAnalytics(left).grossRevenue;
  })[0];

  organizerRevenueHeadline.textContent = `${formatCurrency(totals.grossRevenue)} projected from ${filteredEvents.length} event${filteredEvents.length === 1 ? "" : "s"}`;
  organizerRevenueSummary.textContent = topRevenueEvent
    ? `${topRevenueEvent.eventName} is leading this view with ${formatCurrency(computeEventAnalytics(topRevenueEvent).grossRevenue)} in gross revenue and ${topRevenueEvent.attendeeCount || 0} attendees.`
    : "Revenue updates will appear here as attendee counts change.";

  organizerRevenueMetrics.innerHTML = [
    { label: "Gross Revenue", value: formatCurrency(totals.grossRevenue) },
    { label: "Net Payout", value: formatCurrency(totals.netPayout) },
    { label: "Attendees", value: String(totals.attendees) },
    { label: "Fill Rate", value: `${totals.fillRate}%` },
  ].map(metric => `
    <article class="organizer-revenue-metric">
      <span>${escapeHtml(metric.label)}</span>
      <strong>${escapeHtml(metric.value)}</strong>
    </article>
  `).join("");
};

const updateOrganizerCalendarTimeline = () => {
  if (!organizerCalendarTimeline || !organizerCalendarTimelineTitle || !organizerCalendarEventCount) {
    return;
  }

  const eventsForDate = organizerCalendarState.filteredEvents.filter(event => event.dateKey === organizerCalendarState.selectedDateKey);
  const selectedDate = eventsForDate[0]?.parsedDate
    || organizerCalendarState.filteredEvents.find(event => event.dateKey === organizerCalendarState.selectedDateKey)?.parsedDate;

  if (!eventsForDate.length || !selectedDate) {
    organizerCalendarTimeline.innerHTML = "";
    organizerCalendarTimelineTitle.textContent = "No events for selected date";
    organizerCalendarEventCount.textContent = "0";
    if (organizerCalendarEmptyState) {
      organizerCalendarEmptyState.hidden = false;
    }
    return;
  }

  const sortedEvents = [...eventsForDate].sort((left, right) => left.eventTime.localeCompare(right.eventTime));
  organizerCalendarTimeline.innerHTML = sortedEvents.map(renderOrganizerCalendarEventItem).join("");
  organizerCalendarTimelineTitle.textContent = `Events on ${formatCalendarTimelineDate(selectedDate)}`;
  organizerCalendarEventCount.textContent = String(sortedEvents.length);
  if (organizerCalendarEmptyState) {
    organizerCalendarEmptyState.hidden = true;
  }
};

const updateOrganizerCalendarDateStrip = () => {
  if (!organizerCalendarDateStrip || !organizerCalendarMonthTitle) {
    return;
  }

  const monthKey = organizerCalendarState.monthKeys[organizerCalendarState.monthIndex];
  if (!monthKey) {
    organizerCalendarDateStrip.innerHTML = "";
    organizerCalendarMonthTitle.textContent = "No Events";
    organizerCalendarState.selectedDateKey = "";
    updateOrganizerCalendarTimeline();
    return;
  }

  const monthEvents = organizerCalendarState.filteredEvents.filter(event => event.monthKey === monthKey);
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
    .sort((left, right) => left.date.getTime() - right.date.getTime());

  organizerCalendarMonthTitle.textContent = formatCalendarMonth(uniqueDates[0]?.date || monthEvents[0]?.parsedDate || new Date());

  if (!uniqueDates.length) {
    organizerCalendarDateStrip.innerHTML = "";
    organizerCalendarState.selectedDateKey = "";
    updateOrganizerCalendarTimeline();
    return;
  }

  if (!uniqueDates.some(item => item.key === organizerCalendarState.selectedDateKey)) {
    organizerCalendarState.selectedDateKey = uniqueDates[0].key;
  }

  organizerCalendarDateStrip.innerHTML = uniqueDates.map(item => `
    <button type="button" class="organizer-date-pill ${item.key === organizerCalendarState.selectedDateKey ? "active" : ""} ${item.count > 0 ? "has-event" : ""}" data-organizer-date-key="${item.key}">
      <span>${escapeHtml(formatCalendarDayLabel(item.date))}</span>
      <strong>${escapeHtml(String(item.date.getDate()))}</strong>
    </button>
  `).join("");

  updateOrganizerCalendarTimeline();
};

const updateOrganizerCalendarResults = () => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const normalizedSearch = organizerCalendarState.searchText.trim().toLowerCase();

  let filtered = organizerCalendarState.allEvents.filter(event => {
    const status = String(event.status || "").toLowerCase();

    if (organizerCalendarState.activeFilter === "published" && status !== "published") {
      return false;
    }

    if (organizerCalendarState.activeFilter === "draft" && status !== "draft") {
      return false;
    }

    if (organizerCalendarState.activeFilter === "active" && event.parsedDate < today) {
      return false;
    }

    if (!normalizedSearch) {
      return !organizerCalendarState.dateSearchKey || event.dateKey === organizerCalendarState.dateSearchKey;
    }

    const matchesTextOrDate = buildOrganizerCalendarSearchText(event).includes(normalizedSearch)
      || organizerEventMatchesDateSearch(event, normalizedSearch);
    const matchesDatePicker = !organizerCalendarState.dateSearchKey || event.dateKey === organizerCalendarState.dateSearchKey;
    return matchesTextOrDate && matchesDatePicker;
  });

  filtered = filtered.sort((left, right) => left.parsedDate.getTime() - right.parsedDate.getTime());
  organizerCalendarState.filteredEvents = filtered;

  const monthKeys = [...new Set(filtered.map(event => event.monthKey))];
  organizerCalendarState.monthKeys = monthKeys;

  if (!monthKeys.length) {
    organizerCalendarState.monthIndex = 0;
    organizerCalendarState.selectedDateKey = "";
    updateOrganizerCalendarDateStrip();
    return;
  }

  if (organizerCalendarState.monthIndex >= monthKeys.length) {
    organizerCalendarState.monthIndex = monthKeys.length - 1;
  }

  if (organizerCalendarState.dateSearchKey) {
    const targetMonthKey = organizerCalendarState.dateSearchKey.slice(0, 7);
    const targetMonthIndex = monthKeys.findIndex(key => key === targetMonthKey);
    if (targetMonthIndex >= 0) {
      organizerCalendarState.monthIndex = targetMonthIndex;
      organizerCalendarState.selectedDateKey = organizerCalendarState.dateSearchKey;
    }
  }

  updateOrganizerCalendarDateStrip();
};

const initializeOrganizerCalendarFilters = () => {
  if (!organizerCalendarSearch || !organizerCalendarDateStrip) {
    return;
  }

  if (organizerCalendarSearch.dataset.filtersBound !== "true") {
    organizerCalendarSearch.addEventListener("input", () => {
      organizerCalendarState.searchText = organizerCalendarSearch.value;
      if (organizerCalendarSearchTop) {
        organizerCalendarSearchTop.value = organizerCalendarSearch.value;
      }
      updateOrganizerCalendarResults();
    });
    organizerCalendarSearch.dataset.filtersBound = "true";
  }

  if (organizerCalendarSearchTop && organizerCalendarSearchTop.dataset.filtersBound !== "true") {
    organizerCalendarSearchTop.addEventListener("input", () => {
      organizerCalendarSearch.value = organizerCalendarSearchTop.value;
      organizerCalendarState.searchText = organizerCalendarSearchTop.value;
      updateOrganizerCalendarResults();
    });
    organizerCalendarSearchTop.dataset.filtersBound = "true";
  }

  if (organizerCalendarDateSearch && organizerCalendarDateSearch.dataset.filtersBound !== "true") {
    organizerCalendarDateSearch.addEventListener("change", () => {
      organizerCalendarState.dateSearchKey = normalizeDateInputKey(organizerCalendarDateSearch.value);
      updateOrganizerCalendarResults();
    });
    organizerCalendarDateSearch.dataset.filtersBound = "true";
  }

  if (organizerCalendarClearDateBtn && organizerCalendarClearDateBtn.dataset.bound !== "true") {
    organizerCalendarClearDateBtn.addEventListener("click", () => {
      if (organizerCalendarDateSearch) {
        organizerCalendarDateSearch.value = "";
      }
      organizerCalendarState.dateSearchKey = "";
      updateOrganizerCalendarResults();
    });
    organizerCalendarClearDateBtn.dataset.bound = "true";
  }

  organizerCalendarFilterButtons.forEach(button => {
    if (button.dataset.bound === "true") {
      return;
    }

    button.addEventListener("click", () => {
      organizerCalendarFilterButtons.forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      organizerCalendarState.activeFilter = button.dataset.organizerCalendarFilter || "all";
      organizerCalendarState.monthIndex = 0;
      updateOrganizerCalendarResults();
    });

    button.dataset.bound = "true";
  });

  if (organizerCalendarPrevMonthBtn && organizerCalendarPrevMonthBtn.dataset.bound !== "true") {
    organizerCalendarPrevMonthBtn.addEventListener("click", () => {
      if (organizerCalendarState.monthIndex <= 0) {
        return;
      }
      organizerCalendarState.monthIndex -= 1;
      updateOrganizerCalendarDateStrip();
    });
    organizerCalendarPrevMonthBtn.dataset.bound = "true";
  }

  if (organizerCalendarNextMonthBtn && organizerCalendarNextMonthBtn.dataset.bound !== "true") {
    organizerCalendarNextMonthBtn.addEventListener("click", () => {
      if (organizerCalendarState.monthIndex >= organizerCalendarState.monthKeys.length - 1) {
        return;
      }
      organizerCalendarState.monthIndex += 1;
      updateOrganizerCalendarDateStrip();
    });
    organizerCalendarNextMonthBtn.dataset.bound = "true";
  }

  if (organizerCalendarDateStrip && organizerCalendarDateStrip.dataset.bound !== "true") {
    organizerCalendarDateStrip.addEventListener("click", event => {
      const dateButton = event.target.closest("[data-organizer-date-key]");
      if (!dateButton) {
        return;
      }

      organizerCalendarState.selectedDateKey = dateButton.dataset.organizerDateKey || "";
      updateOrganizerCalendarDateStrip();
    });
    organizerCalendarDateStrip.dataset.bound = "true";
  }
};

const syncOrganizerCalendarEvents = events => {
  if (!organizerCalendarTimeline || !organizerCalendarDateStrip) {
    return;
  }

  const previousState = {
    activeFilter: organizerCalendarState.activeFilter || "all",
    searchText: organizerCalendarState.searchText || "",
    dateSearchKey: organizerCalendarState.dateSearchKey || "",
    monthIndex: organizerCalendarState.monthIndex || 0,
    selectedDateKey: organizerCalendarState.selectedDateKey || "",
  };
  const wasInitialized = organizerCalendarDateStrip.dataset.initialized === "true";
  const normalizedEvents = (Array.isArray(events) ? events : [])
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
      };
    })
    .filter(Boolean);

  organizerCalendarState.allEvents = normalizedEvents;
  organizerCalendarState.filteredEvents = normalizedEvents;
  organizerCalendarState.activeFilter = wasInitialized ? previousState.activeFilter : "all";
  organizerCalendarState.searchText = wasInitialized ? previousState.searchText : "";
  organizerCalendarState.dateSearchKey = wasInitialized ? previousState.dateSearchKey : "";
  organizerCalendarState.monthIndex = wasInitialized ? previousState.monthIndex : 0;
  organizerCalendarState.selectedDateKey = wasInitialized ? previousState.selectedDateKey : "";

  if (organizerCalendarSearch) {
    organizerCalendarSearch.value = organizerCalendarState.searchText;
  }
  if (organizerCalendarSearchTop) {
    organizerCalendarSearchTop.value = organizerCalendarState.searchText;
  }
  if (organizerCalendarDateSearch) {
    organizerCalendarDateSearch.value = organizerCalendarState.dateSearchKey
      ? organizerCalendarState.dateSearchKey
      : "";
  }

  organizerCalendarFilterButtons.forEach(button => {
    button.classList.toggle("active", (button.dataset.organizerCalendarFilter || "all") === organizerCalendarState.activeFilter);
  });

  initializeOrganizerCalendarFilters();
  organizerCalendarDateStrip.dataset.initialized = "true";
  updateOrganizerCalendarResults();
};

const updateOrganizerDashboardDynamicViews = events => {
  const eventCollection = Array.isArray(events) ? events : [];
  updateOrganizerQuickActions(eventCollection);
  renderOrganizerRevenueOverview(eventCollection);
  syncOrganizerCalendarEvents(eventCollection);
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

const applyOrganizerAccountBanner = data => {
  if (!organizerAccountBanner) {
    return;
  }

  const adminStatus = String(data.adminStatus || data.admin_status || "").trim().toLowerCase();
  const warningCount = Number(data.adminWarningCount || data.admin_warning_count || 0);
  const adminNote = String(data.adminNote || data.admin_note || "").trim();

  if (adminStatus === "warned") {
    organizerAccountBanner.hidden = false;
    organizerAccountBanner.classList.remove("is-error");
    if (organizerAccountBannerTitle) {
      organizerAccountBannerTitle.textContent = warningCount > 1
        ? `Organizer account warned (${warningCount} notices)`
        : "Organizer account warned";
    }
    if (organizerAccountBannerText) {
      organizerAccountBannerText.textContent = adminNote
        ? `EventHub admin warned your organizer account. Note: ${adminNote}`
        : "EventHub admin has warned your organizer account. Please review your recent activity or contact support.";
    }
    return;
  }

  if (adminStatus === "suspended" || adminStatus === "removed") {
    organizerAccountBanner.hidden = false;
    organizerAccountBanner.classList.add("is-error");
    if (organizerAccountBannerTitle) {
      organizerAccountBannerTitle.textContent = "Organizer access restricted";
    }
    if (organizerAccountBannerText) {
      organizerAccountBannerText.textContent = adminNote
        ? adminNote
        : "Your organizer account currently has restricted access. Please contact EventHub support.";
    }
    return;
  }

  organizerAccountBanner.hidden = true;
  organizerAccountBanner.classList.remove("is-error");
};

const formatSubscriptionStatusText = status => {
  const normalized = String(status || "inactive").trim().toLowerCase();
  if (!normalized) {
    return "Inactive";
  }
  return normalized
    .replace(/_/g, " ")
    .replace(/\b\w/g, character => character.toUpperCase());
};

const resolveSubscriptionStatusClass = status => {
  const normalized = String(status || "inactive").trim().toLowerCase();
  if (["active", "completed"].includes(normalized)) {
    return "active";
  }
  if (["review", "warned"].includes(normalized)) {
    return "review";
  }
  if (["past_due", "cancelled", "removed", "suspended"].includes(normalized)) {
    return "past_due";
  }
  return "inactive";
};

const formatSubscriptionPrice = amount => {
  const safeAmount = Number.isFinite(Number(amount)) ? Number(amount) : 0;
  return `Rs ${Math.round(safeAmount).toLocaleString("en-IN")} / month`;
};

const renderOrganizerSubscription = (subscriptionValue, plansValue) => {
  if (!profileSubscriptionCurrentPlan) {
    return;
  }

  if (subscriptionValue && typeof subscriptionValue === "object") {
    organizerSubscriptionSnapshot = subscriptionValue;
  }
  if (Array.isArray(plansValue)) {
    organizerSubscriptionPlans = plansValue;
  }

  const subscription = organizerSubscriptionSnapshot || {
    planName: "Free",
    subscriptionStatus: "inactive",
    monthlyPrice: 0,
    nextBillingOn: "-",
    description: "Explore Pro or Premium to unlock additional organizer benefits.",
    paymentMethod: "Unknown",
  };
  const statusClass = resolveSubscriptionStatusClass(subscription.subscriptionStatus);

  if (profileSubscriptionStatusChip) {
    profileSubscriptionStatusChip.className = `subscription-status-chip ${statusClass}`;
    profileSubscriptionStatusChip.textContent = formatSubscriptionStatusText(subscription.subscriptionStatus);
  }

  profileSubscriptionCurrentPlan.textContent = `Current plan: ${subscription.planName || "Free"}`;
  if (profileSubscriptionMeta) {
    const description = String(subscription.description || "").trim();
    const paymentLabel = String(subscription.paymentMethod || "").trim();
    profileSubscriptionMeta.textContent = description || "Explore Pro or Premium to unlock additional organizer benefits.";
    if (paymentLabel && paymentLabel.toLowerCase() !== "unknown" && statusClass !== "inactive") {
      profileSubscriptionMeta.textContent = `${profileSubscriptionMeta.textContent} Payment method: ${paymentLabel}.`;
    }
  }

  if (profileSubscriptionNextBilling) {
    profileSubscriptionNextBilling.textContent = subscription.nextBillingOn || "-";
  }
  if (profileSubscriptionPrice) {
    profileSubscriptionPrice.textContent = formatSubscriptionPrice(subscription.monthlyPrice || 0);
  }
};

const closeOrganizerSubscriptionModal = () => {
  if (profileSubscriptionModal) {
    profileSubscriptionModal.hidden = true;
  }
};

const openOrganizerSubscriptionModal = () => {
  if (!profileSubscriptionModal || !profileSubscriptionPlanGrid) {
    return;
  }

  const currentPlanId = String(organizerSubscriptionSnapshot?.planId || "").trim().toLowerCase();
  const plans = Array.isArray(organizerSubscriptionPlans) ? organizerSubscriptionPlans : [];
  if (profileSubscriptionModalCopy) {
    profileSubscriptionModalCopy.textContent = "Upgrade your organizer account with Pro or Premium tools.";
  }

  if (!plans.length) {
    profileSubscriptionPlanGrid.innerHTML = "<p class=\"meta\">Subscription plans are not available right now.</p>";
  } else {
    profileSubscriptionPlanGrid.innerHTML = plans.map(plan => {
      const planId = String(plan.planId || "").trim().toLowerCase();
      const isCurrent = currentPlanId && currentPlanId === planId && resolveSubscriptionStatusClass(organizerSubscriptionSnapshot?.subscriptionStatus) === "active";
      const features = Array.isArray(plan.features) ? plan.features : [];
      return `
        <article class="subscription-plan-card" data-plan-id="${escapeHtml(planId)}">
          <h4>${escapeHtml(plan.planName || "Plan")}</h4>
          <p class="subscription-plan-price">${escapeHtml(`Rs ${Number(plan.monthlyPrice || 0).toLocaleString("en-IN")}`)} <small>/month</small></p>
          <p class="subscription-plan-description">${escapeHtml(plan.description || "")}</p>
          <ul class="subscription-plan-features">
            ${features.length
              ? features.map(feature => `<li>${escapeHtml(feature)}</li>`).join("")
              : "<li>Platform plan features included.</li>"}
          </ul>
          <div class="subscription-plan-actions">
            <select data-subscription-payment="${escapeHtml(planId)}">
              <option value="card">Credit / Debit Card</option>
              <option value="upi">UPI</option>
              <option value="netbanking">Net Banking</option>
              <option value="wallet">Wallet</option>
              <option value="cash">Cash</option>
            </select>
            <button type="button" class="subscription-buy-btn ${isCurrent ? "is-current" : ""}" data-subscription-buy="${escapeHtml(planId)}" ${isCurrent ? "disabled" : ""}>
              ${isCurrent ? "Current Plan" : "Buy Now"}
            </button>
          </div>
        </article>
      `;
    }).join("");
  }

  profileSubscriptionModal.hidden = false;
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
  renderOrganizerSubscription(data.subscription, data.subscriptionPlans);
  applyOrganizerAccountBanner(data);

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
    setProfileStatus(profileSubscriptionStatusMessage, "");
  } catch (error) {
    // intentionally silent for non-profile pages
  }
};

const purchaseOrganizerSubscriptionPlan = async (planId, paymentMethod, actionButton) => {
  const normalizedPlanId = String(planId || "").trim().toLowerCase();
  if (!normalizedPlanId) {
    setProfileStatus(profileSubscriptionStatusMessage, "Please select a valid subscription plan.", true);
    return;
  }

  const normalizedMethod = String(paymentMethod || "card").trim().toLowerCase() || "card";
  const originalLabel = actionButton?.textContent || "Buy Now";
  if (actionButton) {
    actionButton.disabled = true;
    actionButton.textContent = "Processing...";
  }
  setProfileStatus(profileSubscriptionStatusMessage, "Activating subscription...");

  try {
    const response = await fetch(`${getContextPath()}/purchase-subscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Accept": "application/json",
      },
      body: new URLSearchParams({
        planId: normalizedPlanId,
        paymentMethod: normalizedMethod,
      }).toString(),
    });
    const data = await parseApiJson(response);
    await loadOrganizerProfile();
    closeOrganizerSubscriptionModal();
    setProfileStatus(profileSubscriptionStatusMessage, data.message || "Subscription activated successfully.");
  } catch (error) {
    setProfileStatus(profileSubscriptionStatusMessage, error.message || "Unable to activate subscription.", true);
  } finally {
    if (actionButton) {
      actionButton.disabled = false;
      actionButton.textContent = originalLabel;
    }
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
  if (organizerEventEditTicketTypeWrap) {
    organizerEventEditTicketTypeWrap.hidden = resolved === "free";
  }
  if (organizerEventEditTicketType && resolved === "free") {
    organizerEventEditTicketType.value = "Entry Pass";
  }
  if (organizerEventEditPaymentWrap) {
    organizerEventEditPaymentWrap.hidden = resolved === "free";
  }
  if (organizerEventEditQrWrap) {
    organizerEventEditQrWrap.hidden = resolved === "free" || !normalizePaymentMethods(organizerEventEditPaymentMethods?.value || "").includes("upi");
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

const refreshOrganizerBrowseCards = () => {
  organizerBrowseCards = Array.from(document.querySelectorAll("#organizerBrowseResults .browse-card"));
};

const updateOrganizerBrowseCategoryCounts = events => {
  if (!organizerBrowseCategoryCounts.length) {
    return;
  }

  const counts = events.reduce((accumulator, event) => {
    const category = String(event.category || "general").trim().toLowerCase();
    accumulator[category] = (accumulator[category] || 0) + 1;
    return accumulator;
  }, {});

  organizerBrowseCategoryCounts.forEach(node => {
    const category = String(node.dataset.organizerCategoryCount || "").trim().toLowerCase();
    const count = Number(counts[category] || 0);
    node.textContent = `${count} Event${count === 1 ? "" : "s"}`;
  });
};

const renderOrganizerBrowseCard = event => `
  <article
    class="browse-card"
    data-category="${escapeHtml(event.category || "general")}"
    data-search="${escapeHtml(buildOrganizerBrowseSearchText(event))}"
  >
    <img src="${escapeHtml(event.imageUrl || "/assets/dashboard/images/dsupimg1.jpg")}" alt="${escapeHtml(event.eventName || "Event")}">
    <div class="browse-info">
      <span class="browse-badge">${escapeHtml(formatBrowseBadge(event.category))}</span>
      <h4>${escapeHtml(event.eventName || "Untitled Event")}</h4>
      <p class="event-description">${escapeHtml((event.description || "").length > 100 ? `${String(event.description || "").slice(0, 100)}...` : (event.description || ""))}</p>
      <p>${escapeHtml(event.eventTime || "-")}</p>
      <p>${escapeHtml(event.price || "Rs 0")}</p>
      <p>${escapeHtml(event.location || "Online Event")} &bull; ${escapeHtml(event.eventDate || "-")}</p>
      <div class="browse-action-row organizer-browse-action-row">
        <span class="browse-badge organizer-browse-status">${escapeHtml(event.isUpcoming ? "Upcoming" : "Open")}</span>
        <a class="ticket-link organizer-browse-link" href="${event.organizerPhone ? `tel:${escapeHtml(event.organizerPhone)}` : "#"}">
          ${escapeHtml(event.organizerPhone ? "Contact Organizer" : "View Event")}
        </a>
      </div>
    </div>
  </article>
`;

const applyOrganizerBrowseFilter = () => {
  if (!organizerBrowseResults) {
    return;
  }

  const term = String(organizerBrowseSearch?.value || "").trim().toLowerCase();
  let visibleCount = 0;

  organizerBrowseCards.forEach(card => {
    const category = String(card.dataset.category || "").trim().toLowerCase();
    const searchableText = String(card.dataset.search || "").trim().toLowerCase();
    const matchesCategory = activeOrganizerBrowseCategory === "all" || category === activeOrganizerBrowseCategory;
    const matchesSearch = !term || searchableText.includes(term);
    const show = matchesCategory && matchesSearch;
    card.hidden = !show;
    if (show) {
      visibleCount += 1;
    }
  });

  if (organizerBrowseResultsCount) {
    organizerBrowseResultsCount.textContent = String(visibleCount);
  }

  if (organizerBrowseEmptyState) {
    organizerBrowseEmptyState.hidden = visibleCount !== 0;
  }
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
    data-ticket-type="${escapeHtml(event.ticketType || "Entry Pass")}"
    data-price="${escapeHtml(String(event.price || "Rs 0"))}"
    data-capacity="${escapeHtml(String(event.capacity || 0))}"
    data-attendee-count="${escapeHtml(String(event.attendeeCount || 0))}"
    data-status="${escapeHtml(event.status || "published")}"
    data-description="${escapeHtml(event.description || "")}"
    data-image-url="${escapeHtml(event.imageUrl || "/assets/dashboard/images/dsupimg1.jpg")}"
    data-payment-methods="${escapeHtml((Array.isArray(event.paymentMethods) ? event.paymentMethods : []).join(","))}"
    data-upi-qr-url="${escapeHtml(event.upiQrUrl || "")}"
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
          <span>Pass Type</span>
          <strong>${escapeHtml(event.ticketType || "Entry Pass")}</strong>
        </div>
        <div class="booking-field">
          <span>Price</span>
          <strong>${escapeHtml(String(event.ticketPricingMode || "paid").toLowerCase() === "free" ? "Not pricing" : event.price || "Rs 0")}</strong>
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
        <button type="button" class="booking-action-btn view-organizer-analytics">View Analytics</button>
        <button type="button" class="booking-action-btn edit-organizer-event" ${event.status === "cancelled" ? "disabled" : ""}>Edit Event</button>
        <button type="button" class="booking-action-btn cancel-organizer-event" ${event.status === "cancelled" ? "disabled" : ""}>Cancel Event</button>
      </div>
    </div>
  </article>
`;

const renderManageUserEventCard = event => `
  <article
    class="manage-users-event-card"
    data-event-id="${escapeHtml(event.id)}"
    data-status="${escapeHtml(event.status || "published")}"
    data-search="${escapeHtml([
      event.eventName,
      event.eventDate,
      event.eventTime,
      event.location,
      event.status,
      event.category,
      event.ticketType,
      event.price,
      event.attendeeCount,
    ].join(" ").toLowerCase())}"
  >
    <img src="${escapeHtml(event.imageUrl || "/assets/dashboard/images/dsupimg1.jpg")}" alt="${escapeHtml(event.eventName)}">
    <div class="manage-users-event-content">
      <h4>${escapeHtml(event.eventName)}</h4>
      <p>${escapeHtml(event.eventDate)} at ${escapeHtml(event.eventTime)}</p>
      <p>${escapeHtml(event.location || "Online Event")}</p>
      <p>${escapeHtml(event.price || "Rs 0")} &bull; ${escapeHtml(event.attendeeCount || 0)} attendees</p>
      <span class="booking-status ${escapeHtml(event.status || "published")}">${escapeHtml(event.status || "published")}</span>
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
        <td colspan="8" class="manage-users-no-data">No attendees for this event yet.</td>
      </tr>
    `;
    return;
  }

  manageUsersAttendeeBody.innerHTML = attendees.map(attendee => `
    <tr data-attendee-id="${escapeHtml(attendee.id)}" data-ticket-count="${escapeHtml(attendee.ticketCount || 1)}">
      <td>
        <strong>${escapeHtml(attendee.name || "-")}</strong>
        <span>${escapeHtml(attendee.email || "-")}</span>
      </td>
      <td>${escapeHtml(attendee.phone || "-")}</td>
      <td>${escapeHtml(attendee.ticketType || "Entry Pass")}</td>
      <td>${escapeHtml(attendee.ticketCount || 1)}</td>
      <td>${escapeHtml(attendee.ticketId || "-")}</td>
      <td>
        <span class="booking-status ${escapeHtml(attendee.status || "active")}">${escapeHtml(attendee.status || "active")}</span>
      </td>
      <td>${escapeHtml(attendee.source || "organizer")}</td>
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
    const text = (row.textContent || "").toLowerCase();
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
    if (manageUsersAttendeeModal) {
      manageUsersAttendeeModal.hidden = false;
    } else if (manageUsersAttendeeSection) {
      manageUsersAttendeeSection.hidden = false;
    }
    renderManageUserAttendeeRows(manageUsersAttendeesCache);
    applyManageUserAttendeeFilter();
  } catch (error) {
    if (manageUsersAttendeeModal) {
      manageUsersAttendeeModal.hidden = false;
    } else if (manageUsersAttendeeSection) {
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

const closeManageUsersAttendeeModal = () => {
  if (manageUsersAttendeeModal) {
    manageUsersAttendeeModal.hidden = true;
  }
  if (manageUsersAttendeeSearch) {
    manageUsersAttendeeSearch.value = "";
  }
  applyManageUserAttendeeFilter();
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
    const show = (!term || searchable.includes(term))
      && eventMatchesStatusFilter({ status: card.dataset.status || "" }, activeOrganizerEventFilter);
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

const applyManageUsersEventFilter = () => {
  if (!manageUsersEventsList) {
    return;
  }

  const term = String(manageUsersEventSearch?.value || "").trim().toLowerCase();
  const cards = Array.from(manageUsersEventsList.querySelectorAll(".manage-users-event-card"));
  let visibleCount = 0;

  cards.forEach(card => {
    const searchableText = String(card.dataset.search || card.textContent || "").toLowerCase();
    const show = (!term || searchableText.includes(term))
      && eventMatchesStatusFilter({ status: card.dataset.status || "" }, activeManageUsersEventFilter);
    card.hidden = !show;
    if (show) {
      visibleCount += 1;
    }
  });

  if (manageUsersEventCount) {
    manageUsersEventCount.textContent = String(visibleCount);
  }

  if (manageUsersEventsEmptyState) {
    manageUsersEventsEmptyState.hidden = visibleCount !== 0;
  }
};

const loadOrganizerBrowseEvents = async () => {
  if (!organizerBrowseResults) {
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

    if (response.status === 403) {
      window.location.href = `${getContextPath()}/dashboard/user`;
      return;
    }

    const data = await parseApiJson(response);
    const events = Array.isArray(data.events) ? data.events : [];
    const upcomingEvents = events.filter(event => Boolean(event.isUpcoming));

    applyOrganizerProfile(data);
    organizerBrowseResults.innerHTML = upcomingEvents.length
      ? upcomingEvents.map(renderOrganizerBrowseCard).join("")
      : "";
    refreshOrganizerBrowseCards();
    updateOrganizerBrowseCategoryCounts(upcomingEvents);
    applyOrganizerBrowseFilter();
  } catch (error) {
    organizerBrowseResults.innerHTML = "";
    refreshOrganizerBrowseCards();
    if (organizerBrowseResultsCount) {
      organizerBrowseResultsCount.textContent = "0";
    }
    if (organizerBrowseEmptyState) {
      organizerBrowseEmptyState.hidden = false;
    }
  }
};

const loadOrganizerEvents = async () => {
  const needsOrganizerEventFeed = Boolean(
    organizerEventsList
    || manageUsersEventsList
    || organizerRevenueMetrics
    || organizerRevenueOverviewFilter
    || organizerQuickCreateAction
    || organizerCalendarTimeline
    || organizerCalendarDateStrip
  );

  if (!needsOrganizerEventFeed) {
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
    updateOrganizerDashboardDynamicViews(organizerEventsCache);

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
        : "";
      applyManageUsersEventFilter();
      if (manageUsersSelectedEventId && !organizerEventsCache.some(event => String(event.id) === String(manageUsersSelectedEventId))) {
        manageUsersSelectedEventId = "";
        manageUsersAttendeesCache = [];
        renderManageUserAttendeeRows([]);
        closeManageUsersAttendeeModal();
        if (manageUsersAttendeeSection) {
          manageUsersAttendeeSection.hidden = true;
        }
        if (manageUsersSelectedEvent) {
          manageUsersSelectedEvent.textContent = "Attendees";
        }
        if (manageUsersSelectedEventRight) {
          manageUsersSelectedEventRight.textContent = "-";
        }
        if (manageUsersAttendeeCount) {
          manageUsersAttendeeCount.textContent = "0";
        }
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
      manageUsersEventsList.innerHTML = "";
      if (manageUsersEventCount) {
        manageUsersEventCount.textContent = "0";
      }
      if (manageUsersEventsEmptyState) {
        manageUsersEventsEmptyState.hidden = false;
      }
    }

    if (organizerEventsEmptyState) {
      organizerEventsEmptyState.hidden = false;
    }

    if (organizerCalendarTimeline) {
      organizerCalendarTimeline.innerHTML = "";
    }
    if (organizerCalendarMonthTitle) {
      organizerCalendarMonthTitle.textContent = "Unable to load calendar";
    }
    if (organizerCalendarTimelineTitle) {
      organizerCalendarTimelineTitle.textContent = "Calendar unavailable";
    }
    if (organizerCalendarEventCount) {
      organizerCalendarEventCount.textContent = "0";
    }
    if (organizerCalendarEmptyState) {
      organizerCalendarEmptyState.hidden = false;
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
  const normalizedStatus = String(eventDetail.status || "published").toLowerCase();
  if (organizerAddAttendeeEventId) {
    organizerAddAttendeeEventId.value = String(eventDetail.id);
  }
  if (organizerEventDetailImage) organizerEventDetailImage.src = eventDetail.imageUrl || "/assets/dashboard/images/dsupimg1.jpg";
  if (organizerEventDetailTitle) organizerEventDetailTitle.textContent = eventDetail.eventName || "Event Details";
  if (organizerEventDetailMeta) organizerEventDetailMeta.textContent = `${eventDetail.eventDate} • ${eventDetail.eventTime} • ${eventDetail.location}`;
  if (organizerEventDetailStatus) organizerEventDetailStatus.textContent = normalizedStatus;
  if (organizerEventDetailAttendeeCount) organizerEventDetailAttendeeCount.textContent = String(eventDetail.attendeeCount ?? 0);
  if (organizerEventDetailCapacity) organizerEventDetailCapacity.textContent = String(eventDetail.capacity ?? 0);
  if (organizerEventDetailOccupancy) organizerEventDetailOccupancy.textContent = `${eventDetail.occupancyPercent ?? 0}%`;
  if (organizerEventDetailDescription) organizerEventDetailDescription.textContent = eventDetail.description || "No description added yet.";
  if (organizerEventDetailPublishBtn) {
    const isDraft = normalizedStatus === "draft";
    organizerEventDetailPublishBtn.hidden = !isDraft;
    organizerEventDetailPublishBtn.disabled = !isDraft;
    organizerEventDetailPublishBtn.textContent = "Publish Event";
  }
  if (organizerEventDetailCancelBtn) {
    const isCancelled = normalizedStatus === "cancelled";
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
  if (organizerEventEditTicketType) organizerEventEditTicketType.value = eventData.ticketType || "Entry Pass";
  if (organizerEventEditCapacity) organizerEventEditCapacity.value = String(eventData.capacity || "0");
  if (organizerEventEditDescription) organizerEventEditDescription.value = eventData.description || "";

  setOrganizerEditEventMode(eventData.eventMode || "venue");
  setOrganizerEditTicketMode(eventData.ticketPricingMode || "paid");
  setOrganizerEditPaymentMethodUI(eventData.paymentMethods || "upi,netbanking,cash,wallet,card");
  setOrganizerEditQrPreview(eventData.upiQrUrl || "", eventData.upiQrUrl ? "UPI QR ready" : "No QR code uploaded");
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
    ticketType: String(formData.get("ticketType") || "Entry Pass"),
    eventCapacity: String(formData.get("eventCapacity") || ""),
    eventDescription: String(formData.get("eventDescription") || ""),
    eventMode: String(formData.get("eventMode") || "venue"),
    ticketPricingMode: String(formData.get("ticketPricingMode") || "paid"),
    posterUrl: String(formData.get("posterUrl") || ""),
    paymentMethods: String(formData.get("paymentMethods") || ""),
    upiQrUrl: String(formData.get("upiQrUrl") || ""),
  };

  const hasData = [
    draft.eventTitle,
    draft.organizerName,
    draft.eventDate,
    draft.eventTime,
    draft.venueAddress,
    draft.ticketPrice,
    draft.ticketType,
    draft.eventCapacity,
    draft.eventDescription,
    draft.posterUrl,
    draft.paymentMethods,
    draft.upiQrUrl,
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
  assignValue("ticketType", draft.ticketType || "Entry Pass");
  assignValue("eventCapacity", draft.eventCapacity);
  assignValue("eventDescription", draft.eventDescription);
  assignValue("posterUrl", draft.posterUrl);
  assignValue("paymentMethods", draft.paymentMethods);
  assignValue("upiQrUrl", draft.upiQrUrl);

  setEventModeUI(draft.eventMode || "venue");
  setTicketPricingModeUI(draft.ticketPricingMode || "paid");
  setPaymentMethodUI(draft.paymentMethods || "upi,netbanking,cash,wallet,card");
  setPaymentQrPreview(draft.upiQrUrl || "", draft.upiQrUrl ? "UPI QR ready" : "No QR code uploaded");

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
  if (ticketTypeWrap) {
    ticketTypeWrap.hidden = resolvedMode === "free";
  }
  if (ticketTypeInput && resolvedMode === "free") {
    ticketTypeInput.value = "Entry Pass";
  }

  if (paymentConfigWrap) {
    paymentConfigWrap.hidden = resolvedMode === "free";
  }
  if (paymentQrWrap) {
    paymentQrWrap.hidden = resolvedMode === "free" || !normalizePaymentMethods(paymentMethodsField?.value || "").includes("upi");
  }
};

const syncPaymentMethodField = () => {
  if (!paymentMethodsField) {
    return [];
  }

  const methods = paymentMethodOptions
    .filter(option => option.checked)
    .map(option => option.value);
  paymentMethodsField.value = methods.join(",");

  if (paymentQrWrap) {
    paymentQrWrap.hidden = ticketPricingModeField?.value === "free" || !methods.includes("upi");
  }
  if (!methods.includes("upi") && upiQrUrlField) {
    upiQrUrlField.value = "";
    if (paymentQrMeta) {
      paymentQrMeta.textContent = "No QR code uploaded";
    }
    if (paymentQrPreview) {
      paymentQrPreview.hidden = true;
      paymentQrPreview.removeAttribute("src");
    }
  }

  return methods;
};

const setPaymentMethodUI = methods => {
  const normalized = normalizePaymentMethods(methods);
  paymentMethodOptions.forEach(option => {
    option.checked = normalized.includes(option.value);
  });
  if (paymentMethodsField) {
    paymentMethodsField.value = normalized.join(",");
  }
  if (paymentQrWrap) {
    paymentQrWrap.hidden = ticketPricingModeField?.value === "free" || !normalized.includes("upi");
  }
};

const setPaymentQrPreview = (imageUrl, label = "UPI QR ready") => {
  if (upiQrUrlField) {
    upiQrUrlField.value = imageUrl || "";
  }
  if (paymentQrMeta) {
    paymentQrMeta.textContent = imageUrl ? label : "No QR code uploaded";
  }
  if (paymentQrPreview) {
    paymentQrPreview.hidden = !imageUrl;
    if (imageUrl) {
      paymentQrPreview.src = imageUrl;
    } else {
      paymentQrPreview.removeAttribute("src");
    }
  }
};

const setOrganizerEditPaymentMethodUI = methods => {
  const normalized = normalizePaymentMethods(methods);
  organizerEventEditPaymentOptions.forEach(option => {
    option.checked = normalized.includes(option.value);
  });
  if (organizerEventEditPaymentMethods) {
    organizerEventEditPaymentMethods.value = normalized.join(",");
  }
  if (organizerEventEditPaymentWrap) {
    organizerEventEditPaymentWrap.hidden = organizerEventEditTicketMode?.value === "free";
  }
  if (organizerEventEditQrWrap) {
    organizerEventEditQrWrap.hidden = organizerEventEditTicketMode?.value === "free" || !normalized.includes("upi");
  }
};

const syncOrganizerEditPaymentMethodField = () => {
  if (!organizerEventEditPaymentMethods) {
    return [];
  }

  const methods = organizerEventEditPaymentOptions
    .filter(option => option.checked)
    .map(option => option.value);
  organizerEventEditPaymentMethods.value = methods.join(",");

  if (organizerEventEditQrWrap) {
    organizerEventEditQrWrap.hidden = organizerEventEditTicketMode?.value === "free" || !methods.includes("upi");
  }
  if (!methods.includes("upi") && organizerEventEditUpiQrUrl) {
    organizerEventEditUpiQrUrl.value = "";
    if (organizerEventEditQrMeta) {
      organizerEventEditQrMeta.textContent = "No QR code uploaded";
    }
    if (organizerEventEditQrPreview) {
      organizerEventEditQrPreview.hidden = true;
      organizerEventEditQrPreview.removeAttribute("src");
    }
  }

  return methods;
};

const setOrganizerEditQrPreview = (imageUrl, label = "UPI QR ready") => {
  if (organizerEventEditUpiQrUrl) {
    organizerEventEditUpiQrUrl.value = imageUrl || "";
  }
  if (organizerEventEditQrMeta) {
    organizerEventEditQrMeta.textContent = imageUrl ? label : "No QR code uploaded";
  }
  if (organizerEventEditQrPreview) {
    organizerEventEditQrPreview.hidden = !imageUrl;
    if (imageUrl) {
      organizerEventEditQrPreview.src = imageUrl;
    } else {
      organizerEventEditQrPreview.removeAttribute("src");
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

const uploadPaymentQrImage = async file => {
  const formData = new FormData();
  formData.append("paymentQrImage", file);

  const response = await fetch(`${getContextPath()}/upload-organizer-payment-qr`, {
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
    throw new Error(data.error || "Unable to upload payment QR.");
  }

  return data.imageUrl || "";
};

const applyDashboardEventSearch = () => {
  if (!organizerManagedEvents) {
    return;
  }

  if (!organizerDashboardManagedEvents.length) {
    organizerManagedEvents.innerHTML = "<p class=\"meta\">No events created yet. Create your first event from Create Event.</p>";
    return;
  }

  const searchTerm = String(organizerDashboardSearch?.value || "").trim().toLowerCase();
  const filteredEvents = organizerDashboardManagedEvents.filter(event => {
    const haystack = [
      event.eventName,
      event.category,
      event.eventDate,
      event.eventTime,
      event.location,
      event.status,
    ].join(" ").toLowerCase();
    return !searchTerm || haystack.includes(searchTerm);
  });

  organizerManagedEvents.innerHTML = filteredEvents.length
    ? filteredEvents.map(renderManagedEvent).join("")
    : "<p class=\"meta\">No matching events found in upcoming events.</p>";
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

    applyOrganizerAccountBanner(data);

    if (organizerActiveEvents) organizerActiveEvents.textContent = data.stats?.activeEvents ?? "0";
    if (organizerTotalAttendees) organizerTotalAttendees.textContent = data.stats?.totalAttendees ?? "0";
    if (organizerCheckinRate) organizerCheckinRate.textContent = data.stats?.checkInRate ?? "0%";
    if (organizerRevenue) organizerRevenue.textContent = data.stats?.totalRevenue ?? "Rs 0";

    const managedEvents = Array.isArray(data.managedEvents) ? data.managedEvents : [];
    organizerDashboardManagedEvents = managedEvents;
    updateOrganizerDashboardDynamicViews(resolveOrganizerDashboardEvents());
    if (organizerDashboardSearch && organizerDashboardSearch.value.trim() === "") {
      const query = new URLSearchParams(window.location.search).get("search") || "";
      organizerDashboardSearch.value = query;
    }
    const recentActivity = Array.isArray(data.recentActivity) ? data.recentActivity : [];
    const salesActivity = Array.isArray(data.salesActivity) ? data.salesActivity : [];
    const notifications = Array.isArray(data.notifications) ? data.notifications : [];
    const completedEvents = Array.isArray(data.completedEvents) ? data.completedEvents : [];

    applyDashboardEventSearch();

    if (organizerActivityList) {
      organizerActivityList.innerHTML = recentActivity.length
        ? recentActivity.map(renderActivityItem).join("")
        : "<p class=\"meta\">No activity yet.</p>";
    }

    if (organizerSalesList) {
      organizerSalesList.innerHTML = salesActivity.length
        ? salesActivity.map(renderSalesItem).join("")
        : "<p class=\"meta\">No analytics activity yet.</p>";
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

const applyOrganizerAnalyticsSearch = () => {
  const term = String(organizerAnalyticsSearch?.value || "").trim().toLowerCase();
  const filteredEvents = organizerAnalyticsEventsCache.filter(event => {
    const eventName = String(event.eventName || "").trim().toLowerCase();
    return !term || eventName.includes(term);
  });

  if (organizerAnalyticsSummaryText) {
    if (!organizerAnalyticsEventsCache.length) {
      organizerAnalyticsSummaryText.textContent = "No events available yet.";
    } else if (term) {
      organizerAnalyticsSummaryText.textContent = filteredEvents.length
        ? `Showing ${filteredEvents.length} event(s) matching "${term}" by event name.`
        : `No events found for "${term}".`;
    } else {
      organizerAnalyticsSummaryText.textContent = "See your combined revenue, attendance, and event status across every event.";
    }
  }

  renderAnalyticsPage(organizerAnalyticsEventsCache, filteredEvents);
};

const loadOrganizerAnalyticsPage = async () => {
  if (!organizerAnalyticsKpis) {
    return;
  }

  try {
    const response = await fetch(`${getContextPath()}/organizereventsservlet`, {
      cache: "no-store",
      headers: {
        "Accept": "application/json",
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
    organizerAnalyticsEventsCache = Array.isArray(data.events) ? data.events : [];

    if (organizerSidebarUserName && data.userName) {
      organizerSidebarUserName.textContent = data.userName;
    }
    if (organizerAnalyticsPageTitle && data.userName) {
      organizerAnalyticsPageTitle.textContent = `${data.userName}'s Analytics`;
    }

    applyOrganizerAnalyticsSearch();
  } catch (error) {
    organizerAnalyticsKpis.innerHTML = "<p class=\"meta\">Unable to load analytics right now.</p>";
  }
};

const refreshOrganizerLiveData = async () => {
  if (document.hidden) {
    return;
  }

  const tasks = [];
  if (organizerManagedEvents) {
    tasks.push(loadOrganizerDashboard());
  }
  if (organizerBrowseResults) {
    tasks.push(loadOrganizerBrowseEvents());
  }
  if (organizerEventsList || manageUsersEventsList || organizerRevenueMetrics || organizerCalendarTimeline) {
    tasks.push(loadOrganizerEvents());
  }
  if (organizerAnalyticsKpis) {
    tasks.push(loadOrganizerAnalyticsPage());
  }
  if (manageUsersSelectedEventId) {
    tasks.push(loadManageUsersAttendees(manageUsersSelectedEventId));
  }
  if (activeOrganizerEventDetail?.id) {
    tasks.push(loadOrganizerEventDetail(activeOrganizerEventDetail.id));
  }

  if (tasks.length) {
    await Promise.allSettled(tasks);
  }
};

loadOrganizerDashboard();
loadOrganizerBrowseEvents();
loadOrganizerEvents();
loadOrganizerAnalyticsPage();
loadOrganizerProfile();

profileSubscriptionExploreBtn?.addEventListener("click", () => {
  openOrganizerSubscriptionModal();
});

profileSubscriptionClose?.addEventListener("click", () => {
  closeOrganizerSubscriptionModal();
});

profileSubscriptionBackdrop?.addEventListener("click", () => {
  closeOrganizerSubscriptionModal();
});

profileSubscriptionPlanGrid?.addEventListener("click", event => {
  const actionButton = event.target.closest("[data-subscription-buy]");
  if (!actionButton) {
    return;
  }

  const planId = String(actionButton.dataset.subscriptionBuy || "").trim().toLowerCase();
  const paymentSelect = profileSubscriptionPlanGrid.querySelector(`[data-subscription-payment="${planId}"]`);
  const paymentMethod = String(paymentSelect?.value || "card").trim().toLowerCase();
  purchaseOrganizerSubscriptionPlan(planId, paymentMethod, actionButton);
});

if (organizerManagedEvents || organizerBrowseResults || organizerEventsList || manageUsersEventsList || organizerAnalyticsKpis || organizerRevenueMetrics || organizerCalendarTimeline) {
  window.setInterval(() => {
    refreshOrganizerLiveData();
  }, 20000);
}

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
setPaymentMethodUI(paymentMethodsField?.value || "upi,netbanking,cash,wallet,card");
setPaymentQrPreview(upiQrUrlField?.value || "", upiQrUrlField?.value ? "UPI QR ready" : "No QR code uploaded");
restoreCreateEventDraft();

paymentMethodOptions.forEach(option => {
  option.addEventListener("change", () => {
    syncPaymentMethodField();
    persistCreateEventDraft();
  });
});

posterUploadBox?.addEventListener("click", () => {
  posterImageInput?.click();
});

paymentQrUploadBox?.addEventListener("click", () => {
  paymentQrInput?.click();
});

posterUploadBox?.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    posterImageInput?.click();
  }
});

paymentQrUploadBox?.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    paymentQrInput?.click();
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

const processPaymentQrFile = async file => {
  if (!file) {
    return;
  }

  if (paymentQrMeta) {
    paymentQrMeta.textContent = "Uploading UPI QR...";
  }

  try {
    const imageUrl = await uploadPaymentQrImage(file);
    if (!imageUrl) {
      return;
    }

    setPaymentQrPreview(imageUrl, `UPI QR uploaded: ${file.name}`);
    persistCreateEventDraft();
  } catch (error) {
    if (paymentQrMeta) {
      paymentQrMeta.textContent = error.message || "Unable to upload UPI QR.";
    }
  }
};

posterImageInput?.addEventListener("change", async () => {
  const file = posterImageInput.files?.[0];
  await processPosterFile(file);
});

paymentQrInput?.addEventListener("change", async () => {
  const file = paymentQrInput.files?.[0];
  await processPaymentQrFile(file);
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

paymentQrUploadBox?.addEventListener("dragover", event => {
  event.preventDefault();
  paymentQrUploadBox.classList.add("drag-over");
});

paymentQrUploadBox?.addEventListener("dragleave", () => {
  paymentQrUploadBox.classList.remove("drag-over");
});

paymentQrUploadBox?.addEventListener("drop", async event => {
  event.preventDefault();
  paymentQrUploadBox.classList.remove("drag-over");
  const file = event.dataTransfer?.files?.[0];
  await processPaymentQrFile(file);
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

  const selectedPaymentMethods = syncPaymentMethodField();
  if (requestedStatus === "published" && ticketPricingModeField?.value !== "free" && !selectedPaymentMethods.length) {
    setCreateEventStatus("Select at least one payment method for paid events.", true);
    return;
  }
  if (
    requestedStatus === "published"
    && ticketPricingModeField?.value !== "free"
    && selectedPaymentMethods.includes("upi")
    && !upiQrUrlField?.value
  ) {
    setCreateEventStatus("Upload the UPI QR code before publishing a paid event with UPI.", true);
    return;
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
      setPaymentMethodUI("upi,netbanking,cash,wallet,card");
      setPaymentQrPreview("", "No QR code uploaded");
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

organizerDashboardSearch?.addEventListener("input", applyDashboardEventSearch);
organizerAnalyticsSearch?.addEventListener("input", applyOrganizerAnalyticsSearch);
organizerRevenueOverviewFilter?.addEventListener("change", () => {
  renderOrganizerRevenueOverview(resolveOrganizerDashboardEvents());
});

organizerBrowseSearch?.addEventListener("input", applyOrganizerBrowseFilter);
if (organizerBrowseSearchTop) {
  organizerBrowseSearchTop.addEventListener("input", () => {
    if (!organizerBrowseSearch) {
      return;
    }
    organizerBrowseSearch.value = organizerBrowseSearchTop.value;
    applyOrganizerBrowseFilter();
  });
}
if (organizerBrowseSearch) {
  organizerBrowseSearch.addEventListener("input", () => {
    if (organizerBrowseSearchTop) {
      organizerBrowseSearchTop.value = organizerBrowseSearch.value;
    }
  });
}
organizerBrowseCategoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeOrganizerBrowseCategory = button.dataset.category || "all";
    organizerBrowseCategoryButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    applyOrganizerBrowseFilter();
  });
});

organizerEventsSearch?.addEventListener("input", applyOrganizerEventFilter);
if (organizerEventsSearchTop) {
  organizerEventsSearchTop.addEventListener("input", () => {
    if (!organizerEventsSearch) {
      return;
    }
    organizerEventsSearch.value = organizerEventsSearchTop.value;
    applyOrganizerEventFilter();
  });
}
if (organizerEventsSearch) {
  organizerEventsSearch.addEventListener("input", () => {
    if (organizerEventsSearchTop) {
      organizerEventsSearchTop.value = organizerEventsSearch.value;
    }
  });
}
organizerEventFilterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeOrganizerEventFilter = button.dataset.organizerEventFilter || "all";
    organizerEventFilterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    applyOrganizerEventFilter();
  });
});

const handleTopbarSearchRedirect = inputElement => {
  inputElement?.addEventListener("keydown", event => {
    if (event.key !== "Enter") {
      return;
    }
    const term = String(inputElement.value || "").trim();
    window.location.href = term
      ? `/dashboard/organizer?search=${encodeURIComponent(term)}`
      : "/dashboard/organizer";
  });
};

handleTopbarSearchRedirect(organizerNavbarSearch);

manageUsersEventSearch?.addEventListener("input", applyManageUsersEventFilter);
if (manageUsersEventSearchTop) {
  manageUsersEventSearchTop.addEventListener("input", () => {
    if (!manageUsersEventSearch) {
      return;
    }
    manageUsersEventSearch.value = manageUsersEventSearchTop.value;
    applyManageUsersEventFilter();
  });
}
if (manageUsersEventSearch) {
  manageUsersEventSearch.addEventListener("input", () => {
    if (manageUsersEventSearchTop) {
      manageUsersEventSearchTop.value = manageUsersEventSearch.value;
    }
  });
}
manageUsersEventFilterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeManageUsersEventFilter = button.dataset.manageUsersEventFilter || "all";
    manageUsersEventFilterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    applyManageUsersEventFilter();
  });
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
    ticketType: card.dataset.ticketType || "Entry Pass",
    price: card.dataset.price || "Rs 0",
    capacity: card.dataset.capacity || "0",
    attendeeCount: card.dataset.attendeeCount || "0",
    status: card.dataset.status || "published",
    description: card.dataset.description || "",
    paymentMethods: normalizePaymentMethods(card.dataset.paymentMethods || ""),
    upiQrUrl: card.dataset.upiQrUrl || "",
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

  const analyticsButton = event.target.closest(".view-organizer-analytics");
  if (analyticsButton) {
    event.preventDefault();
    goToEventAnalyticsPage(eventData);
    return;
  }

  loadOrganizerEventDetail(eventData.id);
});

manageUsersEventsList?.addEventListener("click", event => {
  const card = event.target.closest(".manage-users-event-card");
  if (!card) {
    return;
  }

  const eventId = card?.dataset.eventId || "";
  if (!eventId) {
    return;
  }
  loadManageUsersAttendees(eventId);
});

manageUsersAttendeeBackdrop?.addEventListener("click", closeManageUsersAttendeeModal);
manageUsersAttendeeClose?.addEventListener("click", closeManageUsersAttendeeModal);

organizerEventEditModalBackdrop?.addEventListener("click", closeOrganizerEventEditModal);
organizerEventEditClose?.addEventListener("click", closeOrganizerEventEditModal);
organizerEventEditCancel?.addEventListener("click", closeOrganizerEventEditModal);
organizerEventCancelBackdrop?.addEventListener("click", closeOrganizerEventCancelModal);
organizerEventCancelClose?.addEventListener("click", closeOrganizerEventCancelModal);
organizerEventDetailBackdrop?.addEventListener("click", closeOrganizerEventDetailModal);
organizerEventDetailClose?.addEventListener("click", closeOrganizerEventDetailModal);

organizerManagedEvents?.addEventListener("click", event => {
  const analyticsLink = event.target.closest(".view-organizer-analytics");
  if (!analyticsLink) {
    return;
  }
  event.preventDefault();

  const card = event.target.closest(".event-card");
  const eventName = card?.querySelector("h4")?.textContent?.trim() || "";
  const matchedEvent = organizerDashboardManagedEvents.find(item => item.eventName === eventName)
    || organizerDashboardManagedEvents[0];
  if (matchedEvent) {
    goToEventAnalyticsPage(matchedEvent);
  }
});

openOrganizerAnalyticsAction?.addEventListener("click", () => {
  window.location.href = getAnalyticsPagePath();
});

bindOrganizerToggleGroup(organizerEventModeToggle, "eventMode", setOrganizerEditEventMode);
bindOrganizerToggleGroup(organizerEventTicketToggle, "ticketMode", setOrganizerEditTicketMode);

organizerEventEditPaymentOptions.forEach(option => {
  option.addEventListener("change", () => {
    syncOrganizerEditPaymentMethodField();
  });
});

organizerEventEditQrUploadBox?.addEventListener("click", () => {
  organizerEventEditQrInput?.click();
});

organizerEventEditQrUploadBox?.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    organizerEventEditQrInput?.click();
  }
});

organizerEventEditQrInput?.addEventListener("change", async () => {
  const file = organizerEventEditQrInput.files?.[0];
  if (!file) {
    return;
  }

  if (organizerEventEditQrMeta) {
    organizerEventEditQrMeta.textContent = "Uploading UPI QR...";
  }

  try {
    const imageUrl = await uploadPaymentQrImage(file);
    if (!imageUrl) {
      return;
    }
    setOrganizerEditQrPreview(imageUrl, `UPI QR uploaded: ${file.name}`);
  } catch (error) {
    if (organizerEventEditQrMeta) {
      organizerEventEditQrMeta.textContent = error.message || "Unable to upload UPI QR.";
    }
  }
});

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
    const selectedPaymentMethods = syncOrganizerEditPaymentMethodField();
    if (organizerEventEditTicketMode?.value !== "free" && !selectedPaymentMethods.length) {
      throw new Error("Select at least one payment method for paid events.");
    }
    if (
      organizerEventEditTicketMode?.value !== "free"
      && selectedPaymentMethods.includes("upi")
      && !organizerEventEditUpiQrUrl?.value
    ) {
      throw new Error("Upload the UPI QR code before saving this paid event.");
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

organizerEventDetailPublishBtn?.addEventListener("click", async () => {
  const eventId = String(activeOrganizerEventDetail?.id || "");
  if (!eventId) {
    return;
  }

  organizerEventDetailPublishBtn.disabled = true;
  organizerEventDetailPublishBtn.textContent = "Publishing...";
  setAddAttendeeStatus("");

  try {
    const response = await fetchWithPathFallback("/publish-organizer-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Accept": "application/json",
      },
      body: new URLSearchParams({ eventId }).toString(),
    });

    if (response.status === 401) {
      window.location.href = `${getContextPath()}/login`;
      return;
    }

    const data = await parseApiJson(response);
    await loadOrganizerEvents();
    await loadOrganizerEventDetail(eventId);
    setAddAttendeeStatus(data.message || "Event published successfully.");
  } catch (error) {
    setAddAttendeeStatus(error.message || "Unable to publish event.", true);
  } finally {
    if (organizerEventDetailPublishBtn && organizerEventDetailPublishBtn.hidden === false) {
      organizerEventDetailPublishBtn.disabled = false;
      organizerEventDetailPublishBtn.textContent = "Publish Event";
    }
  }
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
    closeOrganizerSubscriptionModal();
    closeLogoutModal();
    closeManageUsersAttendeeModal();
  }
});
