// Copyright 2026 - ZAER.
// Licensed over MIT License.

function renderMessages() {
  if (window.appState.messages.length === 0) {
    return;
  }

  const messagesContainer = document.createElement("div");
  messagesContainer.className = "messages-container";
  messagesContainer.innerHTML = window.appState.messages
    .map((msg) => renderMessage(msg))
    .join("");

  window.appElements.messagesArea.innerHTML = "";
  window.appElements.messagesArea.appendChild(messagesContainer);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function renderMessage(msg) {
  const avatar =
    msg.role === "user"
      ? '<i class="fas fa-user"></i>'
      : '<i class="fas fa-robot"></i>';
  const contentHtml =
    msg.role === "assistant"
      ? formatAssistantContent(msg.content)
      : `<div class="message-text">${escapeHtml(msg.content)}</div>`;

  return `
                <div class="message ${msg.role}">
                    <div class="message-inner">
                        <div class="message-avatar">${avatar}</div>
                        <div class="message-content">${contentHtml}</div>
                    </div>
                </div>
            `;
}

function extractCodeBlocks(content) {
  return content
    .split(/(```[\w]*\n[\s\S]*?\n```)/g)
    .map((part, index) => {
      if (part.startsWith("```")) {
        const match = part.match(/```(\w+)?\n([\s\S]*?)\n```/);
        if (match) {
          return createCodeBlock(match[2], match[1] || "text");
        }
      }
      return part.trim() ? sanitizeAssistantHtml(formatMarkdown(part)) : "";
    })
    .filter((part) => part)
    .join("\n");
}

function formatAssistantContent(content) {
  return extractCodeBlocks(content);
}
