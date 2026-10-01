const BIRTHDAY_DATE = "2026-11-30T00:00:00";
const brotherName = "Brother";

const nameEls = [
  document.getElementById("broName"),
  document.getElementById("broNameLetter"),
  document.getElementById("broNameReveal"),
];
nameEls.forEach((el) => {
  if (el) el.textContent = brotherName;
});

const splash = document.getElementById("splash");
const content = document.getElementById("content");
const openBtn = document.getElementById("openBtn");
const wishBtn = document.getElementById("wishBtn");
const giftBox = document.getElementById("giftBox");
const openGiftBtn = document.getElementById("openGiftBtn");
const finalReveal = document.getElementById("finalReveal");

openBtn.addEventListener("click", () => {
  splash.classList.add("hidden");
  content.classList.remove("hidden");
  burstConfetti(120);
});

wishBtn.addEventListener("click", () => {
  const message = `Happy Birthday, ${brotherName}! 🎉 You are amazing, loved, and deeply appreciated. Stay awesome always.`;
  alert(message);
  burstConfetti(80);
});

openGiftBtn.addEventListener("click", () => {
  giftBox.classList.remove("locked");
  giftBox.classList.add("open");
  finalReveal.classList.remove("hidden");
  burstConfetti(200);
});

function updateCountdown() {
  const target = new Date(BIRTHDAY_DATE);
  const now = new Date();
  let diff = Math.max(0, target.getTime() - now.getTime());

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * 1000 * 60 * 60 * 24;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 1000 * 60 * 60;

  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * 1000 * 60;

  const seconds = Math.floor(diff / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function burstConfetti(count = 120) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * -7 - 2,
      size: 4 + Math.random() * 5,
      color: ["#f6c76a", "#ff7c7c", "#7dd3fc", "#9ae6b4"][Math.floor(Math.random() * 4)],
      life: 80 + Math.random() * 50,
    });
  }
  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.12;
    p.life -= 1;

    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size * 1.4);

    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }

  if (particles.length > 0) {
    requestAnimationFrame(animateConfetti);
  }
}
