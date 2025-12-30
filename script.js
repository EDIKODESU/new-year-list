const colors = ['#ff4d6d', '#ffd166', '#7df9ff', '#9dff00', '#c77dff'];
const wishes = ['Щастя ✨', 'Любові', 'Тепла', 'Світла', 'Натхнення', 'Коханнячка ♥️', 
    'Більше усміхайся', 'Здоровʼя', 'Перемоги', 'Найтепліших обіймів', 'Щоб тебе кусав я, а не Бостон',
    'Поважай своє "Я"', 'Вір у себе', 'Я в тебе вірю', 'Ти неймовірна ☀️', 'З Новим роком!🎄', 'Будь сильнішою',
    'Будь найЛєрною Лєрою', 'Захоплюйся собой', 'Побільше мандаринів 🍊'];

const topGarland = document.getElementById('garlandTop');
const bottomGarland = document.getElementById('garlandBottom');
const stack = document.getElementById('stack');
const cards = Array.from(document.querySelectorAll('.wish-card'));
const cardWrapper = document.getElementById('card-wrapper');
const card = document.getElementById('card');
const leftDoor = document.querySelector('.left');
const rightDoor = document.querySelector('.right');
const rain = document.getElementById('rain');
let currentCard = 0;

function createGarland(container) {
    container.innerHTML = '';
    const count = Math.floor(window.innerWidth / 40);
    for (let i = 0; i < count; i++) {
        const light = document.createElement('div');
        light.className = 'light';
        const color = colors[Math.floor(Math.random() * colors.length)];
        light.style.color = color;
        container.appendChild(light);
        gsap.fromTo(light, { opacity: 0.3, boxShadow: `0 0 2px ${color}` }, { opacity: 1, boxShadow: `0 0 10px ${color},0 0 18px ${color}`, duration: gsap.utils.random(1.5, 3), repeat: -1, yoyo: true, delay: Math.random() * 2 });
    }
}
createGarland(topGarland);
createGarland(bottomGarland);
window.addEventListener('resize', () => { createGarland(topGarland); createGarland(bottomGarland); });

cards.forEach(cardEl => {
    addDot(cardEl);
    cardEl.addEventListener('click', () => {
        // блокуємо повторні кліки
        cardEl.style.pointerEvents = 'none';

        gsap.to(cardEl, {
            x: gsap.utils.random(-300, 300),
            y: gsap.utils.random(-100, 100),
            rotation: gsap.utils.random(-20, 20),
            opacity: 0,
            duration: 0.8,
            ease: 'power3.inOut',
            onComplete: () => {
                cardEl.remove();
                currentCard++;
                if (currentCard >= cards.length) {
                    showCard(); 
                }
            }
        });
    });
});

function showCard() {
    cardWrapper.style.pointerEvents = 'auto';
    gsap.to(card, { opacity: 1, duration: 0.3 });
}

/* Клік на листівку */
card.addEventListener('click', () => {
    cardWrapper.style.pointerEvents = 'none';
    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' }});
    tl
        .to(card, {
            z: -200,
            scale: 0.25,
            opacity: 0,
            duration: 1.3
        }, '<')
        .to(leftDoor, { rotationY: -135, duration: 1.4 }, '<')
        .to(rightDoor, { rotationY: 135, duration: 1.4 }, '<')
        .call(startRain);
});

function startRain() {
    cardWrapper.remove();
    setInterval(createWord, 350);
}


function createWord() {
    const word = document.createElement('div');
    word.className = 'word';
    word.textContent = wishes[Math.floor(Math.random() * wishes.length)];
    const size = gsap.utils.random(16, 34);
    const left = gsap.utils.random(0, window.innerWidth - 100);
    const duration = gsap.utils.random(8, 14);
    const color = colors[Math.floor(Math.random() * colors.length)];
    word.style.fontSize = size + 'px';
    word.style.left = left + 'px';
    word.style.color = color;
    rain.appendChild(word);
    gsap.fromTo(word, { y: -60, opacity: 0 }, { y: window.innerHeight + 80, opacity: 1, duration, ease: 'none', onComplete: () => word.remove() });
}

function addDot(cardEl) {
    const dotsContainer = cardEl.querySelector('.dots');
    const DOTS_COUNT = 24;

    for (let i = 0; i < DOTS_COUNT; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');

        dot.style.left = gsap.utils.random(0, dotsContainer.offsetWidth - 12) + 'px';
        dot.style.top = gsap.utils.random(0, dotsContainer.offsetHeight - 12) + 'px';

        // dot.style.left = gsap.utils.random(0, 54) + 'px';
        // dot.style.top = gsap.utils.random(0, 54) + 'px';
        dot.style.scale = gsap.utils.random(0.8, 1.1),
            dot.style.filter = 'blur(0.9px)',

            dotsContainer.appendChild(dot);

        animateDot(dot);
    }
}

function animateDot(dot) {
    gsap.to(dot, {
        x: gsap.utils.random(-6, 6),
        y: gsap.utils.random(-6, 6),
        opacity: gsap.utils.random(0.6, 1),
        duration: gsap.utils.random(1.2, 2.4),
        ease: 'sine.inOut',
        onComplete: () => animateDot(dot)
    });
}