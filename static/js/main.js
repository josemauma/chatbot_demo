document.addEventListener("DOMContentLoaded", () => {
  const chatbox = document.querySelector(".chatbox");
  const toggleBtn = document.querySelector(".chatbox__toggle");
  const closeBtn = document.querySelector(".chatbox__close");
  const messagesContainer = document.querySelector(".chatbox__messages");
  const chatForm = document.querySelector("#chat-form");
  const userInput = document.querySelector("#user-input");

  // Abrir/cerrar chat
  toggleBtn.addEventListener("click", () => {
    chatbox.classList.add("chatbox--active");
    toggleBtn.style.display = "none";
    userInput.focus();
  });

  closeBtn.addEventListener("click", () => {
    chatbox.classList.remove("chatbox--active");
    toggleBtn.style.display = "block";
  });

  // Mostrar mensaje
  function appendMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = text;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Enviar mensaje
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage(message, "user");
    userInput.value = "";

    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        appendMessage("Error: Failed to get response from server.", "bot");
        return;
      }

      const data = await response.json();
      appendMessage(data.response, "bot");
    } catch (error) {
      appendMessage("Error: Could not reach server.", "bot");
      console.error("Fetch error:", error);
    }
  });
});
