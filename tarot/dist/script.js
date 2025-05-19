// Tarot data
const tarotCards = [
  { name: "The Fool", meaning: "การเริ่มต้นใหม่ การผจญภัย ความไร้เดียงสา", image: "https://res.cloudinary.com/dwar6os4j/image/upload/v1747676244/Asset_1_hm88ik.png" },
  { name: "The Magician", meaning: "พลังสร้างสรรค์ ความสามารถพิเศษ การเริ่มต้นสิ่งใหม่", image: "https://res.cloudinary.com/dwar6os4j/image/upload/v1747676287/Asset_2_tsau1g.png" },
  { name: "The World", meaning: "ความสมบูรณ์ ความสำเร็จ การบรรลุเป้าหมาย", image: "https://res.cloudinary.com/dwar6os4j/image/upload/v1747676287/Asset_3_pyghpa.png" }
];

// Handle picking a card
function pickCard(el) {
  document.querySelectorAll('.card').forEach(c => {
    if (c !== el) c.style.opacity = '0.2';
  });
  el.classList.add('flipped');
  const choice = tarotCards[Math.floor(Math.random() * tarotCards.length)];
  el.querySelector('.card-img').src = choice.image;

  setTimeout(() => {
    document.getElementById('result-img').src = choice.image;
    document.getElementById('card-name').textContent = choice.name;
    document.getElementById('card-meaning').textContent = choice.meaning;
    document.getElementById('result').classList.remove('hidden');
  }, 800);
}

// Reset game
function resetGame() {
  document.getElementById('result').classList.add('hidden');
  document.querySelectorAll('.card').forEach(c => {
    c.classList.remove('flipped');
    c.style.opacity = '1';
  });
}

// Shooting stars effect
function createShootingStar() {
  const star = document.createElement('div');
  star.classList.add('shooting-star');
  star.style.left = Math.random() * window.innerWidth + 'px';
  star.style.top  = Math.random() * (window.innerHeight / 2) + 'px';
  const dur = Math.random() * 2 + 1;
  star.style.animationDuration = dur + 's';
  document.body.appendChild(star);
  setTimeout(() => star.remove(), dur * 1000);
}
setInterval(createShootingStar, 2500);