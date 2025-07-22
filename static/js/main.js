document.addEventListener("DOMContentLoaded", () => {
  const messagesContainer = document.querySelector(".chatbox__messages");
  const quickButtonsContainer = document.querySelector(".chatbox__quick-buttons");
  const chatForm = document.querySelector("#chat-form");
  const userInput = document.querySelector("#user-input");
  const toggleBtn = document.getElementById('chatbot-toggle');
const chatbotContainer = document.getElementById('chatbot-container');

toggleBtn.addEventListener('click', () => {
  chatbotContainer.classList.toggle('hidden');
});



  function formatMessage(message) {
  return message.replace(/\n/g, '<br>');
}

  function appendMessage(text, sender = "bot") {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.innerHTML = formatMessage(text);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function sendMessage(text) {
    appendMessage(text, "user");

    fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    })
      .then((response) => response.json())
      .then((data) => {
        appendMessage(data.response, "bot");
      })
      .catch(() => {
        appendMessage("Error: Could not reach server.", "bot");
      });
  }

  function initChat() {
    appendMessage("👋 Welcome to CleanCar! How can we assist you today?");
    appendMessage("Please select an option below or write your question.");

    const options = [
      "Services available",
      "Prices per service",
      "Make a booking",
      "Contact support"
    ];

    options.forEach((option) => {
      const btn = document.createElement("button");
      btn.classList.add("chatbox__quick-button");
      btn.textContent = option;
      btn.addEventListener("click", () => {
        sendMessage(option);
        //quickButtonsContainer.innerHTML = "";
      });
      quickButtonsContainer.appendChild(btn);
    });
  }

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;
    sendMessage(message);
    userInput.value = "";
  });

  initChat();
});
