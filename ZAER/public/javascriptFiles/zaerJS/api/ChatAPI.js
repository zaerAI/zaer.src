// Copyright 2026 - ZAER.
// Licensed over MIT License.

async function sendMessage(prompt) {
  if (!prompt.trim() || window.appState.isLoading) return;

  window.appState.messages.push({
    id: Date.now().toString(),
    role: "user",
    content: prompt,
    timestamp: Date.now(),
  });

  renderMessages();

  window.appElements.promptInput.value = "";
  window.appElements.promptInput.style.height = "auto";

  window.appState.isLoading = true;
  window.appElements.sendBtn.disabled = true;
  window.appElements.sendBtn.innerHTML = '<div class="spinner"></div>';

  try {
    const response = await fetch("https://zaerbackend.vercel.app/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: window.appState.messages.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "No response";

    window.appState.messages.push({
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content,
      timestamp: Date.now(),
    });

    renderMessages();
  } catch (error) {
    console.error("Error:", error);
    showToast(`Error: ${error.message}`, "error");
    window.appState.messages.pop();
    renderMessages();
  } finally {
    window.appState.isLoading = false;
    window.appElements.sendBtn.disabled = false;
    window.appElements.sendBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  }
}
