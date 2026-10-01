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

const quizData = [
  {
    question: "Which one is my all-time favorite snack?",
    options: ["Pizza", "Chips", "Samosa", "Ice cream"],
    correct: 2,
  },
  {
    question: "What kind of person is my brother at heart?",
    options: ["Funny and loving", "Too serious", "Always sleepy", "Never hungry"],
    correct: 0,
  },
  {
    question: "What is one thing I can never do without teasing him about?",
    options: ["His dramatic reactions", "His shoes", "His playlist", "His homework"],
    correct: 0,
  },
  {
    question: "Which quality fits him best?",
    options: ["Generosity", "Being a food thief", "Always perfect", "No sense of humor"],
    correct: 1,
  },
  {
    question: "What should he remember on his birthday?",
    options: ["He is loved", "He is late", "He must work", "He should stay quiet"],
    correct: 0,
  },
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreCard = document.getElementById("scoreCard");
const scoreText = document.getElementById("scoreText");
const questionCard = document.getElementById("questionCard");

function renderQuestion() {
  const current = quizData[currentQuestionIndex];
  questionText.textContent = current.question;
  optionsContainer.innerHTML = "";

  current.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.className = "option";
    button.addEventListener("click", () => {
      document.querySelectorAll(".option").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      button.dataset.index = String(index);
    });
    optionsContainer.appendChild(button);
  });
}

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector(".option.selected");
  if (!selected) {
    alert("Pick an option first!");
    return;
  }

  const selectedIndex = Number(selected.dataset.index);
  const correctIndex = quizData[currentQuestionIndex].correct;

  if (selectedIndex === correctIndex) {
    score += 1;
  }

  currentQuestionIndex += 1;

  if (currentQuestionIndex < quizData.length) {
    renderQuestion();
  } else {
    questionCard.classList.add("hidden");
    scoreCard.classList.remove("hidden");
    scoreText.textContent = `${score} / ${quizData.length} — ${score === quizData.length ? "Perfect! You definitely know him well." : "Close enough — but the real love is obvious anyway."}`;
  }
});

renderQuestion();

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


























































