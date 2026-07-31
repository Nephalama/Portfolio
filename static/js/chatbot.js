document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject the Chatbot HTML into the page
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
                <div class="message bot">Welcome to my portfolio. Ask me anything about my skills, projects, or experience.</div>
            </div>
            <div class="chat-input-area">
                <input type="text" id="chat-input" placeholder="Send a message..." autocomplete="off">
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
        botMsg.textContent = "Thinking...";
        chatMessages.appendChild(botMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;

                       try {
                    // 1. Define the AI's persona and background
                    const systemPrompt = `You are the AI assistant for Thendo Nephalama, a Full-Stack Developer & Automation Enthusiast. 
Your job is to answer questions about Thendo's skills, experience, and projects. Keep answers brief, friendly, and professional.
Here is Thendo's background:
- Title: Full-Stack Developer & Automation Enthusiast
- Skills: HTML, CSS, JavaScript, Python, Flask, PostgreSQL, APIs, Selenium, Git, Linux, Tailwind CSS, REST APIs, Web Scraping.
- Experience: 
  1. Network Automation Intern at In2IT Technologies (2024-2025).
  2. Junior Engineer - Systems at In2IT Technologies (2025-Present).
- Education: Bachelor of Information Technology from Richfield Graduate Institute of Technology (2022-2024).
- Contact: thendojohannah07@gmail.com
If someone asks for contact info, provide the email. If they ask about skills, list them.`;

                    // 2. Send the prompt and user text as separate messages
                    const messages = [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: userText }
                    ];
                    
                    // 3. Call the AI
                    const response = await puter.ai.chat(messages);
                    
                    // 4. Update bot message with AI response
                    botMsg.textContent = response.message.content;
                    chatMessages.scrollTop = chatMessages.scrollHeight;
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
