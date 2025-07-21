document.addEventListener("DOMContentLoaded", () => {
  const chatWindow = document.getElementById("chat-window");
  const chatForm = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const message = userInput.value.trim();
    if (!message) return;

    // Mostrar mensaje del usuario
    appendMessage("user", message);

    userInput.value = "";
    userInput.focus();

    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        appendMessage("bot", "Error: Failed to get response from server.");
        return;
      }

      const data = await response.json();
      appendMessage("bot", data.response);
    } catch (error) {
      appendMessage("bot", "Error: Could not reach server.");
      console.error("Fetch error:", error);
    }
  });

  function appendMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", sender);
    msgDiv.textContent = text;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll down
  }
});
