const navLinks = document.querySelectorAll('.navbar-menu a');
const centerMenu = document.querySelector('.center-menu');
const navbarRight = document.querySelector('.navbar-right');
const navbarSearchBox = document.querySelector('.search-box');
const themeToggle = document.getElementById('theme-toggle');
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');
const authModal = document.getElementById('authModal');
const authModalClose = document.getElementById('authModalClose');
const authGatedTriggers = document.querySelectorAll('.auth-gated-trigger');
const authModalBackdrop = document.querySelector('[data-close-auth-modal]');
const homeLocationSearch = document.getElementById('homeLocationSearch');
const homeDateSearch = document.getElementById('homeDateSearch');
const homeSearchButton = document.getElementById('homeSearchButton');
const homeEventCards = document.querySelectorAll('.events-grid .event-card');
const eventsEmptyState = document.getElementById('eventsEmptyState');
const viewAllEventsLink = document.getElementById('viewAllEventsLink');
const moreEventsGrid = document.getElementById('moreEventsGrid');
const contactForm = document.getElementById('contactForm');
const contactSubmitButton = document.getElementById('contactSubmitButton');
const contactFormStatus = document.getElementById('contactFormStatus');
let areExtraEventsVisible = false;

function updateViewAllEventsLabel() {
  if (!viewAllEventsLink) {
    return;
  }

  viewAllEventsLink.textContent = areExtraEventsVisible ? 'Hide all Events' : 'View all Events';
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.forEach((item) => item.classList.remove('active'));
    link.classList.add('active');

    if (window.innerWidth <= 768) {
      centerMenu?.classList.remove('menu-open');
      navbarRight?.classList.remove('menu-open');
    }
  });
});

function toggleMenu() {
  centerMenu?.classList.toggle('menu-open');
  navbarRight?.classList.toggle('menu-open');
}

window.toggleMenu = toggleMenu;

function updateThemeIcons(isDark) {
  darkIcon?.classList.toggle('hidden', isDark);
  lightIcon?.classList.toggle('hidden', !isDark);
}

const savedTheme = localStorage.getItem('eventhub-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const enableDarkMode = savedTheme ? savedTheme === 'dark' : prefersDark;

document.body.classList.toggle('dark', enableDarkMode);
updateThemeIcons(enableDarkMode);

themeToggle?.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('eventhub-theme', isDark ? 'dark' : 'light');
  updateThemeIcons(isDark);
});

function openAuthModal() {
  authModal?.removeAttribute('hidden');
}

function closeAuthModal() {
  authModal?.setAttribute('hidden', '');
}

authGatedTriggers.forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    openAuthModal();
  });

  trigger.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openAuthModal();
    }
  });
});

authModalClose?.addEventListener('click', closeAuthModal);
authModalBackdrop?.addEventListener('click', closeAuthModal);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeAuthModal();
  }
});

function filterHomeEvents() {
  const locationValue = homeLocationSearch?.value.trim().toLowerCase() || '';
  const dateValue = homeDateSearch?.value || '';
  const navbarSearchValue = navbarSearchBox?.value.trim().toLowerCase() || '';
  const hasActiveSearch = Boolean(locationValue || dateValue || navbarSearchValue);
  const showExtraCards = areExtraEventsVisible || hasActiveSearch;
  let visibleCount = 0;

  homeEventCards.forEach((card) => {
    const cardLocation = card.dataset.location || '';
    const cardDate = card.dataset.date || '';
    const isExtraCard = card.classList.contains('extra-event-card');
    const searchableText = card.textContent.toLowerCase();
    const matchesLocation = !locationValue || cardLocation.includes(locationValue);
    const matchesDate = !dateValue || cardDate === dateValue;
    const matchesNavbarSearch = !navbarSearchValue || searchableText.includes(navbarSearchValue);
    const shouldShow = (!isExtraCard || showExtraCards) && matchesLocation && matchesDate && matchesNavbarSearch;

    card.hidden = !shouldShow;

    if (shouldShow) {
      visibleCount += 1;
    }
  });

  if (eventsEmptyState) {
    eventsEmptyState.hidden = visibleCount !== 0;
  }

  if (moreEventsGrid) {
    const hasVisibleExtraCards = Array.from(moreEventsGrid.querySelectorAll('.event-card')).some((card) => !card.hidden);
    moreEventsGrid.hidden = !showExtraCards || !hasVisibleExtraCards;
  }

  if (viewAllEventsLink) {
    viewAllEventsLink.textContent = showExtraCards ? 'Hide all Events' : 'View all Events';
  }
}

homeLocationSearch?.addEventListener('input', filterHomeEvents);
homeDateSearch?.addEventListener('input', filterHomeEvents);
homeSearchButton?.addEventListener('click', filterHomeEvents);
navbarSearchBox?.addEventListener('input', filterHomeEvents);

viewAllEventsLink?.addEventListener('click', (event) => {
  event.preventDefault();
  const locationValue = homeLocationSearch?.value.trim().toLowerCase() || '';
  const dateValue = homeDateSearch?.value || '';
  const navbarSearchValue = navbarSearchBox?.value.trim().toLowerCase() || '';
  const hasActiveSearch = Boolean(locationValue || dateValue || navbarSearchValue);

  if (areExtraEventsVisible || hasActiveSearch) {
    areExtraEventsVisible = false;
    homeLocationSearch && (homeLocationSearch.value = '');
    homeDateSearch && (homeDateSearch.value = '');
    navbarSearchBox && (navbarSearchBox.value = '');
  } else {
    areExtraEventsVisible = true;
  }

  updateViewAllEventsLabel();
  filterHomeEvents();
});

updateViewAllEventsLabel();
filterHomeEvents();

function setContactFormStatus(message, type) {
  if (!contactFormStatus) {
    return;
  }

  contactFormStatus.hidden = false;
  contactFormStatus.textContent = message;
  contactFormStatus.className = `contact-form-status ${type}`;
}

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const body = new URLSearchParams();

  formData.forEach((value, key) => {
    body.append(key, String(value));
  });

  if (contactSubmitButton) {
    contactSubmitButton.disabled = true;
    contactSubmitButton.textContent = 'Sending...';
  }

  if (contactFormStatus) {
    contactFormStatus.hidden = true;
  }

  try {
    const response = await fetch('/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Accept': 'application/json'
      },
      body: body.toString()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Unable to send request.');
    }

    contactForm.reset();
    setContactFormStatus(data.message || 'Request sent successfully.', 'success');
  } catch (error) {
    setContactFormStatus(error.message || 'Unable to send request.', 'error');
  } finally {
    if (contactSubmitButton) {
      contactSubmitButton.disabled = false;
      contactSubmitButton.textContent = 'Send Message';
    }
  }
});
