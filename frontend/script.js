const API_URL = 'http://localhost:8000/api/chat/';

async function loadMessages() {
    try {
        const response = await fetch(API_URL);
        const messages = await response.json();
        displayMessages(messages);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayMessages(messages) {
    const container = document.getElementById('chat-messages');
    container.innerHTML = '';

    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';

        const time = new Date(msg.created_at).toLocaleString('de-DE');

        messageDiv.innerHTML = `
            <div class="message-name">${msg.name}</div>
            <div class="message-text">${msg.message}</div>
            <div class="message-time">${time}</div>
        `;

        container.appendChild(messageDiv);
    });

    container.scrollTop = container.scrollHeight;
}

async function sendMessage() {
    const name = document.getElementById('name-input').value;
    const message = document.getElementById('message-input').value;

    if (!name || !message) {
        alert('Enter both!');
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, message })
        });

        if (response.ok) {
            document.getElementById('message-input').value = '';
            loadMessages();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

document.getElementById('message-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

loadMessages();
setInterval(loadMessages, 2000);
