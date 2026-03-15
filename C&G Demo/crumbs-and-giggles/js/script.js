// ============================================================
// SECTION 1: COOKIE DATABASE
// ============================================================

const cookieDatabase = {
  flavorExplorer: {
    personalityName: "Flavor Explorer",
    personalityDesc: "You're always seeking the next exciting experience! Sweet, salty, and full of surprises, just like you.",
    cookieName: "Salted Caramel Pretzel",
    cookieImage: "assets/images/salted-caramel.jpg",
    cookieTags: ["Artisan Made", "Local Bakeries", "Fresh Daily"],
    allergens: ["Contains gluten", "Contains dairy", "Contains eggs"],
    whyThisCookie: [
      "Perfectly crafted to match your adventurous personality",
      "Sweet and salty just like your spontaneous spirit",
      "Baked fresh by local artisans who care"
    ]
  },
  classicComfortLover: {
    personalityName: "Classic Comfort Lover",
    personalityDesc: "You find joy in the familiar. Rich, warm, and deeply satisfying — just like your favourite cookie.",
    cookieName: "Double Chocolate Chip",
    cookieImage: "assets/images/double-chocolate.jpg",
    cookieTags: ["Fan Favourite", "Local Bakeries", "Made Daily"],
    allergens: ["Contains gluten", "Contains dairy", "Contains eggs", "Contains soy"],
    whyThisCookie: [
      "Rich and indulgent to match your cozy energy",
      "Classic flavours that never let you down",
      "Baked with love by local artisans"
    ]
  },
  socialButterfly: {
    personalityName: "Social Butterfly",
    personalityDesc: "Life is a celebration and you're always at the centre of it! Bright, fun, and impossible not to love.",
    cookieName: "Funfetti Sugar Cookie",
    cookieImage: "assets/images/funfetti.jpg",
    cookieTags: ["Party Favourite", "Local Bakeries", "Fresh Daily"],
    allergens: ["Contains gluten", "Contains dairy", "Contains eggs"],
    whyThisCookie: [
      "Colourful and celebratory just like your personality",
      "Sweet and joyful for every occasion",
      "Made to share and spread happiness"
    ]
  },
  zenSeeker: {
    personalityName: "Zen Seeker",
    personalityDesc: "You move through life with calm intention. Unique, thoughtful, and quietly sophisticated.",
    cookieName: "Matcha White Chocolate",
    cookieImage: "assets/images/matcha.jpg",
    cookieTags: ["Artisan Made", "Specialty", "Fresh Daily"],
    allergens: ["Contains gluten", "Contains dairy", "Contains eggs", "Contains soy"],
    whyThisCookie: [
      "Subtle and sophisticated just like your calm nature",
      "Unique flavour for a uniquely thoughtful person",
      "Crafted with care by local artisan bakers"
    ]
  },
  trendsetter: {
    personalityName: "The Trendsetter",
    personalityDesc: "You are always ahead of the curve. Bold, innovative, and unapologetically extra.",
    cookieName: "Brown Butter Toffee",
    cookieImage: "assets/images/brown-butter.jpg",
    cookieTags: ["Trending", "Local Bakeries", "Fresh Daily"],
    allergens: ["Contains gluten", "Contains dairy", "Contains eggs", "Contains tree nuts"],
    whyThisCookie: [
      "Sophisticated and ahead of its time just like you",
      "Bold flavours for a bold personality",
      "Baked fresh by artisans who share your passion"
    ]
  },
  purist: {
    personalityName: "The Purist",
    personalityDesc: "You appreciate the classics done perfectly. Timeless, reliable, and deeply satisfying.",
    cookieName: "Classic Oatmeal Raisin",
    cookieImage: "assets/images/oatmeal-raisin.jpg",
    cookieTags: ["Classic", "Local Bakeries", "Made Daily"],
    allergens: ["Contains gluten", "Contains dairy", "Contains eggs"],
    whyThisCookie: [
      "A timeless classic for a timeless personality",
      "Simple perfection — no gimmicks needed",
      "Trusted flavours from trusted local bakers"
    ]
  }
};

// ============================================================
// SECTION 2: QUIZ LOGIC
// ============================================================

if (document.getElementById('question-1')) {

  let currentQuestion = 1;
  let quizAnswers = {};
  let scores = {
    flavorExplorer: 0,
    classicComfortLover: 0,
    socialButterfly: 0,
    zenSeeker: 0,
    trendsetter: 0,
    purist: 0
  };

  function showQuestion(num) {
    for (let i = 1; i <= 5; i++) {
      document.getElementById('question-' + i).style.display = 'none';
    }
    document.getElementById('question-' + num).style.display = 'block';
    document.getElementById('question-counter').textContent = 'Question ' + num + ' of 5';
    document.getElementById('progress-fill').style.width = (num / 5 * 100) + '%';
  }

  function scoreAnswer(value) {
    if (value === 'adventure' || value === 'spontaneous') {
      scores.flavorExplorer += 2;
      scores.trendsetter += 1;
    }
    if (value === 'cozy' || value === 'intimate') {
      scores.zenSeeker += 2;
      scores.purist += 1;
    }
    if (value === 'social' || value === 'party') {
      scores.socialButterfly += 2;
    }
    if (value === 'creative' || value === 'fancylatte' || value === 'unique' || value === 'unique-drink') {
      scores.trendsetter += 2;
      scores.flavorExplorer += 1;
    }
    if (value === 'solo') {
      scores.classicComfortLover += 2;
      scores.purist += 1;
    }
    if (value === 'sweet-salty') {
      scores.flavorExplorer += 2;
      scores.trendsetter += 1;
    }
    if (value === 'chocolatey') {
      scores.classicComfortLover += 2;
    }
    if (value === 'classic' || value === 'coffee' || value === 'milk') {
      scores.purist += 2;
      scores.classicComfortLover += 1;
    }
    if (value === 'gooey') {
      scores.flavorExplorer += 1;
      scores.trendsetter += 1;
    }
    if (value === 'chewy') {
      scores.zenSeeker += 1;
      scores.classicComfortLover += 1;
    }
    if (value === 'crunchy') {
      scores.purist += 2;
    }
    if (value === 'balanced') {
      scores.purist += 1;
      scores.zenSeeker += 1;
    }
  }

  function submitQuiz() {
    let winner = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    localStorage.setItem('cookiePersonality', winner);
    localStorage.setItem('quizAnswers', JSON.stringify(quizAnswers));
    window.location.href = 'result.html';
  }

  document.querySelectorAll('.answer-card').forEach(function(card) {
    card.addEventListener('click', function() {
      let value = this.getAttribute('data-value');
      quizAnswers['q' + currentQuestion] = value;
      scoreAnswer(value);
      if (currentQuestion < 5) {
        currentQuestion++;
        showQuestion(currentQuestion);
      } else {
        submitQuiz();
      }
    });
  });

  document.getElementById('back-btn').addEventListener('click', function() {
    if (currentQuestion > 1) {
      currentQuestion--;
      showQuestion(currentQuestion);
    }
  });

  document.getElementById('skip-btn').addEventListener('click', function() {
    if (currentQuestion < 5) {
      currentQuestion++;
      showQuestion(currentQuestion);
    } else {
      submitQuiz();
    }
  });

  showQuestion(1);
}

// ============================================================
// SECTION 3: RESULT PAGE LOGIC
// ============================================================

if (document.getElementById('personality-name')) {

  let personality = localStorage.getItem('cookiePersonality');

  if (!personality || !cookieDatabase[personality]) {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('result-container').style.display = 'none';
  } else {
    let result = cookieDatabase[personality];

    document.getElementById('personality-name').textContent = result.personalityName + '!';
    document.getElementById('personality-desc').textContent = result.personalityDesc;
    document.getElementById('cookie-name').textContent = result.cookieName;

    let img = document.getElementById('cookie-image');
    img.src = result.cookieImage;
    img.alt = result.cookieName;
    img.onerror = function() {
      this.src = 'https://via.placeholder.com/300x200/C97B4B/ffffff?text=' + result.cookieName.replace(/ /g, '+');
    };

    let tagsContainer = document.getElementById('cookie-tags');
    tagsContainer.innerHTML = '';
    result.cookieTags.forEach(function(tag) {
      let span = document.createElement('span');
      span.textContent = '[' + tag + ']';
      span.style.marginRight = '8px';
      tagsContainer.appendChild(span);
    });

    let whyList = document.getElementById('why-list');
    whyList.innerHTML = '';
    result.whyThisCookie.forEach(function(reason) {
      let li = document.createElement('li');
      li.textContent = reason;
      whyList.appendChild(li);
    });

    document.getElementById('allergen-list') && (
      document.getElementById('allergen-list').textContent = result.allergens.join(', ')
    );

    document.getElementById('find-cookie-btn').addEventListener('click', function(e) {
      localStorage.setItem('generatedCookie', result.cookieName);
    });

    document.getElementById('share-btn').addEventListener('click', function(e) {
      e.preventDefault();
      let shareText = 'I got ' + result.cookieName + ' on Crumbs & Giggles! My personality type is ' + result.personalityName + '.';
      if (navigator.share) {
        navigator.share({ title: 'My Cookie Match!', text: shareText });
      } else {
        navigator.clipboard.writeText(shareText).then(function() {
          alert('Copied to clipboard: ' + shareText);
        });
      }
    });
  }
}

// ============================================================
// SECTION 4: CUSTOMIZE PAGE LOGIC
// ============================================================

if (document.getElementById('confirm-btn')) {

  document.querySelectorAll('.topping-card').forEach(function(card) {
    card.addEventListener('click', function() {
      this.classList.toggle('selected');
      if (this.classList.contains('selected')) {
        this.style.outline = '2px solid #E8807A';
      } else {
        this.style.outline = 'none';
      }
    });
  });

  document.getElementById('confirm-btn').addEventListener('click', function() {
    let dietaryPrefs = {
      glutenFree: document.getElementById('toggle-gluten').checked,
      nutFree: document.getElementById('toggle-nut').checked,
      vegan: document.getElementById('toggle-vegan').checked,
      sugarFree: document.getElementById('toggle-sugar').checked
    };

    let sliderValue = document.getElementById('sweetness-slider').value;
    let sweetnessLabel = sliderValue === '1' ? 'Lightly Sweet' : sliderValue === '2' ? 'Just Right' : 'Extra Sweet';

    let selectedToppings = [];
    document.querySelectorAll('.topping-card.selected').forEach(function(card) {
      selectedToppings.push(card.getAttribute('data-topping'));
    });

    localStorage.setItem('dietaryPrefs', JSON.stringify(dietaryPrefs));
    localStorage.setItem('sweetnessLevel', sweetnessLabel);
    localStorage.setItem('selectedToppings', JSON.stringify(selectedToppings));

    window.location.href = 'order.html';
  });
}

// ============================================================
// SECTION 5: ORDER PAGE LOGIC
// ============================================================

if (document.getElementById('place-order-btn')) {

  let personality = localStorage.getItem('cookiePersonality');
  let result = personality && cookieDatabase[personality] ? cookieDatabase[personality] : null;

  if (result) {
    document.getElementById('order-cookie-name').textContent = result.cookieName;

    let img = document.getElementById('order-cookie-image');
    img.src = result.cookieImage;
    img.onerror = function() {
      this.src = 'https://via.placeholder.com/200x150/C97B4B/ffffff?text=' + result.cookieName.replace(/ /g, '+');
    };

    document.getElementById('allergen-list').textContent = result.allergens.join(', ');
  } else {
    document.getElementById('order-cookie-name').textContent = 'No cookie selected. Please take the quiz first.';
  }

  let dietaryPrefs = JSON.parse(localStorage.getItem('dietaryPrefs') || '{}');
  let dietaryLabels = [];
  if (dietaryPrefs.glutenFree) dietaryLabels.push('Gluten-Free');
  if (dietaryPrefs.nutFree) dietaryLabels.push('Nut-Free');
  if (dietaryPrefs.vegan) dietaryLabels.push('Vegan');
  if (dietaryPrefs.sugarFree) dietaryLabels.push('Sugar-Free');
  document.getElementById('order-dietary').textContent = 'Dietary: ' + (dietaryLabels.length ? dietaryLabels.join(', ') : 'None selected');

  let sweetness = localStorage.getItem('sweetnessLevel') || 'Just Right';
  document.getElementById('order-sweetness').textContent = 'Sweetness: ' + sweetness;

  let toppings = JSON.parse(localStorage.getItem('selectedToppings') || '[]');
  document.getElementById('order-toppings').textContent = 'Toppings: ' + (toppings.length ? toppings.join(', ') : 'None selected');

  document.getElementById('place-order-btn').addEventListener('click', function() {
    this.style.display = 'none';
    let orderNum = 'CG-' + Math.floor(1000 + Math.random() * 9000);
    localStorage.setItem('orderId', orderNum);
    localStorage.setItem('orderTimestamp', new Date().toISOString());
    document.getElementById('order-confirmation').style.display = 'block';
    document.getElementById('order-number').textContent = 'Order #' + orderNum;
  });
}
