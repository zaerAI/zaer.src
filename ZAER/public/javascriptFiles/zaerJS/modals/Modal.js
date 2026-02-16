// Copyright 2026 - ZAER.
// Licensed over MIT License.

window.closeSettings = function () {
  window.appElements.settingsModal.classList.add("hidden");
};

window.closeAbout = function () {
  window.appElements.aboutModal.classList.add("hidden");
};

function setupModalListeners() {
  window.appElements.settingsBtn.addEventListener("click", () => {
    window.appElements.settingsModal.classList.remove("hidden");
  });

  window.appElements.aboutBtn.addEventListener("click", () => {
    window.appElements.aboutModal.classList.remove("hidden");
  });

  window.appElements.settingsModal.addEventListener("click", (e) => {
    if (e.target === window.appElements.settingsModal) window.closeSettings();
  });

  window.appElements.aboutModal.addEventListener("click", (e) => {
    if (e.target === window.appElements.aboutModal) window.closeAbout();
  });
}
