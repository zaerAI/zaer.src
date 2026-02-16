// Copyright 2026 - ZAER.
// Licensed over MIT License.

function createCodeBlock(code, language) {
  const escapedCode = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  return `
      <div class="code-block" data-raw-code="${btoa(unescape(encodeURIComponent(code)))}">
        <div class="code-header">
          <span class="code-language">${language}</span>
          <button type="button" class="copy-btn" onclick="copyCodeFromBlock(this)">
            <i class="fas fa-copy"></i> Copy
          </button>
        </div>
        <pre><code>${escapeHtml(code)}</code></pre>
      </div>
    `;
}

window.copyCodeFromBlock = function (btn) {
  const codeBlock = btn.closest(".code-block");
  if (!codeBlock) {
    showToast("Copy failed", "error");
    return;
  }

  const pre = codeBlock.querySelector("pre[data-code]");
  if (!pre) {
    showToast("Code not found", "error");
    return;
  }

  const encodedCode = pre.getAttribute("data-code");
  if (!encodedCode) {
    showToast("No code to copy", "error");
    return;
  }

  const code = atob(encodedCode);

  navigator.clipboard
    .writeText(code)
    .then(() => {
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Copied';
      btn.classList.add("copied");
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.classList.remove("copied");
      }, 2000);
      showToast("Copied to clipboard", "success");
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
      showToast("Failed to copy", "error");
    });
};
