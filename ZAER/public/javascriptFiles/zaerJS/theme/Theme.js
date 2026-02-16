// Copyright 2026 - ZAER.
// Licensed over MIT License.

function initTheme() {
  if (window.appState.theme === "auto") {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  } else {
    document.documentElement.setAttribute("data-theme", window.appState.theme);
  }

  updateLogo();
  applyTheme(window.appState.theme);
  const themeRadios = document.querySelectorAll('input[name="theme"]');
  themeRadios.forEach((radio) => {
    if (radio.value === window.appState.theme) {
      radio.checked = true;
    }
  });
}

function applyTheme(selectedTheme) {
  if (selectedTheme === "auto") {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light",
    );
  } else {
    document.documentElement.setAttribute("data-theme", selectedTheme);
  }
}

window.setTheme = function (selectedTheme) {
  window.appState.theme = selectedTheme;
  localStorage.setItem("zaer-theme", selectedTheme);
  applyTheme(selectedTheme);
  updateLogo();
};

function updateLogo() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "dark") {
    window.appElements.logoImg.src = "assets/images/logoWhite.png";
  } else {
    window.appElements.logoImg.src = "assets/images/logoBlack.png";
  }
}
