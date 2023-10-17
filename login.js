
//login

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin") {
        window.location.href = "index.html";
    } else {
        alert("Credenciais inválidas. Tente novamente.");
    }
});

//Criar evento
document.addEventListener("DOMContentLoaded", function() {
    const createEventForm = document.getElementById("create-event-form");

    createEventForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const eventName = document.getElementById("event-name").value;
        const eventDate = document.getElementById("event-date").value;

        
        alert("Evento criado:\nNome: " + eventName + "\nData: " + eventDate);
    });
});


// fórum

document.addEventListener("DOMContentLoaded", function() {
    const chatMessages = document.getElementById("chat-messages");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");

    sendButton.addEventListener("click", function() {
        const messageText = messageInput.value.trim();
        if (messageText !== "") {
            const messageElement = document.createElement("div");
            messageElement.className = "message";
            messageElement.textContent = messageText;
            chatMessages.appendChild(messageElement);
            messageInput.value = "";
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });

    messageInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendButton.click();
            event.preventDefault();
        }
    });
});

