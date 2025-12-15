function toggleChat() {
    const chatBox = document.getElementById('chatBox');
    chatBox.classList.toggle('active');
}

function scrollToNews() {
    const newsSection = document.getElementById('news');
    newsSection.scrollIntoView({ behavior: 'smooth' });
}

// Optional: Auto-close chat if clicked outside (Enhancement)
document.addEventListener('click', function(event) {
    const chatWidget = document.querySelector('.chat-widget');
    const chatBox = document.getElementById('chatBox');
    const chatBtn = document.querySelector('.chat-btn');

    if (!chatWidget.contains(event.target) && chatBox.classList.contains('active')) {
        chatBox.classList.remove('active');
    }
});
