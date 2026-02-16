// Copyright 2026 - ZAER.
// Licensed over MIT License.

function setupInputListeners() {
  window.appElements.inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sendMessage(window.appElements.promptInput.value);
  });

  window.appElements.promptInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.ctrlKey && !e.shiftKey) {
      e.preventDefault();
      sendMessage(window.appElements.promptInput.value);
    }

    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();

      const start = window.appElements.promptInput.selectionStart;
      const end = window.appElements.promptInput.selectionEnd;

      window.appElements.promptInput.value =
        window.appElements.promptInput.value.substring(0, start) +
        "\n" +
        window.appElements.promptInput.value.substring(end);

      window.appElements.promptInput.selectionStart = window.appElements.promptInput.selectionEnd = start + 1;
    }
  });

  window.appElements.promptInput.addEventListener("input", () => {
    window.appElements.promptInput.style.height = "auto";
    window.appElements.promptInput.style.height = Math.min(window.appElements.promptInput.scrollHeight, 200) + "px";
  });
}
