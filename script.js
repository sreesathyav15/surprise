const BIRTHDAY_DATE = "2000-10-04";
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

// Envelope Letter Interaction
const envelope = document.getElementById("envelope");
const letterContent = document.getElementById("letterContent");
const closeLetterBtn = document.getElementById("closeLetterBtn");
const openEnvelopeBtn = document.getElementById("openEnvelopeBtn");

function displayBirthday() {
  const birthDate = new Date(BIRTHDAY_DATE);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = birthDate.toLocaleDateString('en-US', options);

  const birthdayEl = document.getElementById("birthdayDate");
  if (birthdayEl) {
    birthdayEl.textContent = formattedDate;
  }
}

displayBirthday();

// Polaroid Click-to-Reveal Functionality
const polaroids = document.querySelectorAll(".polaroid");
polaroids.forEach((polaroid) => {
  const img = polaroid.querySelector("img");
  if (img) {
    img.style.cursor = "pointer";
  }

  polaroid.addEventListener("click", () => {
    polaroid.classList.toggle("revealed");
  });
});

function openLetter() {
  if (!envelope || !letterContent) return;

  if (envelope.classList.contains("open")) {
    envelope.classList.remove("open");
    letterContent.classList.add("hidden");
  } else {
    envelope.classList.add("open");
    letterContent.classList.remove("hidden");
    burstConfetti(80);
  }
}

// Support both mouse and touch for mobile devices
const activateHandler = (event) => {
  if (event) event.preventDefault();
  openLetter();
};

if (openEnvelopeBtn) {
  openEnvelopeBtn.addEventListener("click", activateHandler);
  openEnvelopeBtn.addEventListener("pointerdown", activateHandler);
}

if (envelope) {
  envelope.addEventListener("click", activateHandler);
  envelope.addEventListener("pointerdown", activateHandler);
}

// Close Letter Button
if (closeLetterBtn) {
  closeLetterBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    envelope.classList.remove("open");
    letterContent.classList.add("hidden");
  });
}

// Close letter when clicking outside
if (letterContent) {
  letterContent.addEventListener("click", (e) => {
    if (e.target === letterContent) {
      envelope.classList.remove("open");
      letterContent.classList.add("hidden");
    }
  });
}

if (openBtn) {
  openBtn.addEventListener("click", () => {
    splash.classList.add("hidden");
    content.classList.remove("hidden");
    burstConfetti(120);
  });

  openBtn.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    splash.classList.add("hidden");
    content.classList.remove("hidden");
    burstConfetti(120);
  });
}

if (wishBtn) {
  wishBtn.addEventListener("click", () => {
    const message = `Happy Birthday, ${brotherName}! 🎉 You are amazing, loved, and deeply appreciated. Stay awesome always.`;
    alert(message);
    burstConfetti(80);
  });
}

if (openGiftBtn) {
  openGiftBtn.addEventListener("click", () => {
    giftBox.classList.remove("locked");
    giftBox.classList.add("open");
    finalReveal.classList.remove("hidden");
    burstConfetti(200);
  });
}

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;
let particles = [];

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function burstConfetti(count = 120) {
  if (!canvas || !ctx) return;

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
  if (!canvas || !ctx) return;

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
