document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject the Chatbot HTML into the page
    const chatbotHTML = `
        <button id="chat-toggle">💬</button>
        <div id="chat-window">
            <div class="chat-header">
                <h4 style="margin:0;">AI Assistant</h4>
                <button id="chat-close">&times;</button>
            </div>
            <div id="chat-messages" class="chat-messages">
                <div class="message bot">Hi! Ask me anything about this portfolio.</div>
            </div>
            <div class="chat-input-area">
                <input type="text" id="chat-input" placeholder="Type your message..." autocomplete="off">
                <button id="chat-send">Send</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // 2. Grab DOM elements
    const chatToggle = document.getElementById("chat-toggle");
    const chatWindow = document.getElementById("chat-window");
    const chatClose = document.getElementById("chat-close");
    const chatMessages = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const chatSend = document.getElementById("chat-send");

    // 3. Toggle functions
    chatToggle.addEventListener("click", () => {
        chatWindow.style.display = "flex";
        chatToggle.style.display = "none";
    });
    chatClose.addEventListener("click", () => {
        chatWindow.style.display = "none";
        chatToggle.style.display = "block";
    });

    // 4. Send message function
    const sendMessage = async () => {
        const userText = chatInput.value.trim();
        if (!userText) return;

        // Add user message
        const userMsg = document.createElement("div");
        userMsg.classList.add("message", "user");
        userMsg.textContent = userText;
        chatMessages.appendChild(userMsg);

        chatInput.value = "";
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Add typing indicator
        const botMsg = document.createElement("div");
        botMsg.classList.add("message", "bot");
        botMsg.textContent = "Typing...";
        chatMessages.appendChild(botMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            // Call AI (Using Puter.js for free, key-less access on static sites)
            const systemPrompt = "You are a helpful assistant for a web developer's portfolio. Keep answers brief and friendly.";
            const response = await puter.ai.chat(systemPrompt + "\nUser: " + userText);

            // Update bot message with AI response
            botMsg.textContent = response.message.content;
        } catch (error) {
            botMsg.textContent = "Sorry, I encountered an error.";
            console.error("AI Error:", error);
        }
    };

    chatSend.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });
});