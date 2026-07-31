document.addEventListener("DOMContentLoaded", () => {
            // 1. Inject the Chatbot HTML into the page (using Boxicons)
            const chatbotHTML = `
                <button id="chat-toggle"><i class='bx bx-message-dots'></i></button>
                <div id="chat-window">
                    <div class="chat-header">
                        <div class="chat-header-info">
                            <div class="chat-avatar"><i class='bx bx-bot'></i></div>
                            <div>
                                <h4>AI Assistant</h4>
                                <div class="status-indicator">
                                    <div class="status-dot"></div> Online
                                </div>
                            </div>
                        </div>
                        <button id="chat-close" class="chat-close"><i class='bx bx-x'></i></button>
                    </div>
                    <div id="chat-messages" class="chat-messages">
                        <div class="message bot">👋 Hi there! I'm Thendo's AI assistant. Ask me anything about my skills, projects, or experience!</div>
                    </div>
                    <div class="chat-input-area">
                        <input type="text" id="chat-input" placeholder="Type your message..." autocomplete="off">
                        <button id="chat-send"><i class='bx bx-send'></i></button>
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
                chatToggle.style.display = "flex";
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
