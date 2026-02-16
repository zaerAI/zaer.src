// Copyright 2026 - ZAER.
// Licensed over MIT License.

function formatMarkdown(text) {
  let html = "";
  const lines = text.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("# ")) {
      html += `<h1>${escapeHtml(line.substring(2))}</h1>`;
      i++;
    } else if (line.startsWith("## ")) {
      html += `<h2>${escapeHtml(line.substring(3))}</h2>`;
      i++;
    } else if (line.startsWith("### ")) {
      html += `<h3>${escapeHtml(line.substring(4))}</h3>`;
      i++;
    } else if (line.startsWith("#### ")) {
      html += `<h4>${escapeHtml(line.substring(5))}</h4>`;
      i++;
    } else if (line.startsWith("##### ")) {
      html += `<h5>${escapeHtml(line.substring(6))}</h5>`;
      i++;
    } else if (line.startsWith("###### ")) {
      html += `<h6>${escapeHtml(line.substring(7))}</h6>`;
      i++;
    } else if (line.match(/^[\s]*[-*+]\s/)) {
      let listHtml = "<ul>";
      while (i < lines.length && lines[i].match(/^[\s]*[-*+]\s/)) {
        const item = lines[i].replace(/^[\s]*[-*+]\s/, "");
        listHtml += `<li>${formatInlineMarkdown(item)}</li>`;
        i++;
      }
      listHtml += "</ul>";
      html += listHtml;
    } else if (line.match(/^[\s]*\d+\.\s/)) {
      let listHtml = "<ol>";
      while (i < lines.length && lines[i].match(/^[\s]*\d+\.\s/)) {
        const item = lines[i].replace(/^[\s]*\d+\.\s/, "");
        listHtml += `<li>${formatInlineMarkdown(item)}</li>`;
        i++;
      }
      listHtml += "</ol>";
      html += listHtml;
    } else if (line.trim()) {
      html += `<div class="message-text">${formatInlineMarkdown(line, true)}</div>`;
      i++;
    } else {
      i++;
    }
  }

  return html;
}

function formatInlineMarkdown(text, allowHtml = false) {
  let formatted = allowHtml ? text : escapeHtml(text);

  formatted = formatted.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2">$1</a>',
  );

  formatted = formatted.replace(
    /(^|[\s>])(https?:\/\/[^\s<]+)/g,
    '$1<a href="$2">$2</a>',
  );

  formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  formatted = formatted.replace(/__(.+?)__/g, "<strong>$1</strong>");
  formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");
  formatted = formatted.replace(/_(.+?)_/g, "<em>$1</em>");

  return formatted;
}
