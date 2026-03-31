/**
 * Crumbsy — Your Cookie Companion
 * Handles the chatbot UI and simple automated responses.
 */

class Crumbsy {
  constructor() {
    this.isOpen = false;
    this.messages = [
      { sender: 'bot', text: "Hey! I'm **Crumbsy**. Your personal cookie companion! Need help finding your cookie soulmate?" }
    ];
    this.init();
    
    // Add badge after small delay
    setTimeout(() => {
      const badge = document.querySelector('.crumbsy-button .badge');
      if (badge) badge.style.opacity = '1';
    }, 2000);
  }

  init() {
    this.injectStyles();
    this.createWidget();
    this.bindEvents();
    this.renderMessages();
  }

  injectStyles() {
    // Already in crumbsy.css, but ensure it's linked
    if (!document.querySelector('link[href*="crumbsy.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'css/crumbsy.css';
      document.head.appendChild(link);
    }
  }

  createWidget() {
    const widget = document.createElement('div');
    widget.className = 'crumbsy-widget';
    widget.id = 'crumbsy-widget';
    
    widget.innerHTML = `
      <div class="crumbsy-button" id="crumbsy-button">
        🍪
        <span class="badge">1</span>
      </div>
      <div class="crumbsy-window" id="crumbsy-window">
        <div class="crumbsy-header">
          <div class="crumbsy-header-avatar">🍪</div>
          <div class="crumbsy-header-info">
            <h4>Crumbsy</h4>
            <p>Always baking something new!</p>
          </div>
          <div class="crumbsy-close" id="crumbsy-close">✕</div>
        </div>
        <div class="crumbsy-messages" id="crumbsy-messages-list">
          <!-- Messages will be injected here -->
        </div>
        <div class="crumbsy-input-area">
            <div class="crumbsy-options" id="crumbsy-options">
              <button class="crumbsy-opt-btn" data-reply="quiz">Take the Quiz 🎯</button>
              <button class="crumbsy-opt-btn" data-reply="browse">See Best-sellers 🍪</button>
              <button class="crumbsy-opt-btn" data-reply="help">How it works? ℹ️</button>
            </div>
            <div class="crumbsy-input">
              <input type="text" id="crumbsy-text-input" placeholder="Ask me about cookies...">
              <button class="crumbsy-send" id="crumbsy-send-btn">➔</button>
            </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(widget);
  }

  bindEvents() {
    const btn = document.getElementById('crumbsy-button');
    const close = document.getElementById('crumbsy-close');
    const windowEl = document.getElementById('crumbsy-window');
    const input = document.getElementById('crumbsy-text-input');
    const sendBtn = document.getElementById('crumbsy-send-btn');
    const options = document.getElementById('crumbsy-options');

    btn.addEventListener('click', () => this.toggleWindow());
    close.addEventListener('click', () => this.toggleWindow());

    sendBtn.addEventListener('click', () => this.handleSendMessage());
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleSendMessage();
    });

    options.addEventListener('click', (e) => {
      if (e.target.classList.contains('crumbsy-opt-btn')) {
        const replyType = e.target.getAttribute('data-reply');
        const text = e.target.innerText;
        this.addMessage('user', text);
        this.handleBotReply(replyType);
      }
    });
  }

  toggleWindow() {
    this.isOpen = !this.isOpen;
    const windowEl = document.getElementById('crumbsy-window');
    const badge = document.querySelector('.crumbsy-button .badge');
    
    if (this.isOpen) {
      windowEl.classList.add('open');
      windowEl.style.display = 'flex';
      if (badge) badge.style.display = 'none';
    } else {
      windowEl.classList.remove('open');
      setTimeout(() => {
        if (!this.isOpen) windowEl.style.display = 'none';
      }, 400);
    }
  }

  renderMessages() {
    const list = document.getElementById('crumbsy-messages-list');
    list.innerHTML = '';
    this.messages.forEach(msg => {
      const div = document.createElement('div');
      div.className = `msg ${msg.sender}`;
      div.innerHTML = msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      list.appendChild(div);
    });
    list.scrollTop = list.scrollHeight;
  }

  addMessage(sender, text) {
    this.messages.push({ sender, text });
    this.renderMessages();
  }

  handleSendMessage() {
    const input = document.getElementById('crumbsy-text-input');
    const text = input.value.trim();
    if (text) {
      this.addMessage('user', text);
      input.value = '';
      this.handleBotReply('custom', text);
    }
  }

  handleBotReply(type, userText = '') {
    const list = document.getElementById('crumbsy-messages-list');
    const typing = document.createElement('div');
    typing.className = 'typing';
    typing.innerText = 'Crumbsy is typing...';
    list.appendChild(typing);
    list.scrollTop = list.scrollHeight;

    setTimeout(() => {
      typing.remove();
      let reply = "";
      
      switch(type) {
        case 'quiz':
          reply = "The **Cookie Quiz** is the best way to find your match! Want me to take you there? [Click here to start!](quiz.html)";
          break;
        case 'browse':
          reply = "Our top pick right now is the **Salted Caramel Pretzel**. People are going crazy for it! Check it out in the [Browse section](discovery.html).";
          break;
        case 'help':
          reply = "I'm here to help you navigate! You can take our quiz, browse artisan cookies, or even **Build Your Own** cookie from scratch!";
          break;
        case 'custom':
          const t = userText.toLowerCase();
          if (t.includes('hello') || t.includes('hi')) {
            reply = "Hi there! I'm Crumbsy. I have a sixth sense for what kind of cookie you're craving right now. Try me!";
          } else if (t.includes('chocolate')) {
            reply = "Chocolate? Excellent choice. Our **Triple Chocolate Fudge** is to die for. Want the details?";
          } else if (t.includes('price')) {
            reply = "Most of our artisan cookies range from $3.50 to $4.50. We also have party packs!";
          } else {
            reply = "That sounds interesting! While I'm still learning, I can definitely tell you that a cookie makes everything better. Have you tried our **Cookie Quiz** yet?";
          }
          break;
      }
      
      this.addMessage('bot', reply);
    }, 1000);
  }
}

// Auto-initialize when script loads
window.addEventListener('DOMContentLoaded', () => {
    window.crumbsy = new Crumbsy();
});
