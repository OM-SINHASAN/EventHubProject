const adminThemeToggle = document.getElementById("adminThemeToggle");
const adminThemeDarkIcon = document.getElementById("adminThemeDarkIcon");
const adminThemeLightIcon = document.getElementById("adminThemeLightIcon");

const updateAdminThemeIcons = isDark => {
  adminThemeDarkIcon?.classList.toggle("hidden", isDark);
  adminThemeLightIcon?.classList.toggle("hidden", !isDark);
};

const savedAdminTheme = window.localStorage.getItem("eventhub-theme");
const prefersAdminDark = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)").matches : false;
const enableAdminDarkMode = savedAdminTheme ? savedAdminTheme === "dark" : prefersAdminDark;

document.body.classList.toggle("dark", enableAdminDarkMode);
updateAdminThemeIcons(enableAdminDarkMode);

adminThemeToggle?.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  window.localStorage.setItem("eventhub-theme", isDark ? "dark" : "light");
  updateAdminThemeIcons(isDark);
});
