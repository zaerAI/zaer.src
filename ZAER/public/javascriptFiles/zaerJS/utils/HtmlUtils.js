// Copyright 2026 - ZAER.
// Licensed over MIT License.

function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function sanitizeAssistantHtml(html) {
  html = html.replace(/<img\s+([^>]+)>/gi, (match, attrs) => {
    if (/src\s*=\s*["']https?:\/\/[^"']+["']/.test(attrs)) {
      const safeAttrs = attrs.replace(/\son\w+="[^"]*"/gi, "");
      return `<img ${safeAttrs}>`;
    }
    return "";
  });

  html = html.replace(/<a\s+([^>]+)>(.*?)<\/a>/gi, (match, attrs, text) => {
    if (/href\s*=\s*["']https?:\/\/[^"']+["']/.test(attrs)) {
      return `<a ${attrs} target="_blank" rel="noopener noreferrer">${text}</a>`;
    }
    return text;
  });

  return html;
}
