// ==========================================
// BIRTHDAY WEBSITE - SCRIPT.JS
// ==========================================

// ===============================
// Basic Information
// ===============================

const BIRTHDAY_DATE = "2000-10-04";
const brotherName = "Brother";


// ===============================
// Brother Name
// ===============================

const nameEls = [
  document.getElementById("broName"),
  document.getElementById("broNameLetter"),
  document.getElementById("broNameReveal"),
];

nameEls.forEach((el) => {
  if (el) {
    el.textContent = brotherName;
  }
});


// ===============================
// Main Elements
// ===============================

const splash = document.getElementById("splash");
const content = document.getElementById("content");

const openBtn = document.getElementById("openBtn");
const wishBtn = document.getElementById("wishBtn");

const giftBox = document.getElementById("giftBox");
const openGiftBtn = document.getElementById("openGiftBtn");
const finalReveal = document.getElementById("finalReveal");


// ===============================
// Birthday Date
// ===============================

function displayBirthday() {
  const birthDate = new Date(BIRTHDAY_DATE);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate =
    birthDate.toLocaleDateString("en-US", options);

  const birthdayEl =
    document.getElementById("birthdayDate");

  if (birthdayEl) {
    birthdayEl.textContent = formattedDate;
  }
}

displayBirthday();


// ==========================================
// MEMORY POLAROID CLICK-TO-REVEAL
// ==========================================

const polaroids =
  document.querySelectorAll(".polaroid");

polaroids.forEach((polaroid) => {

  const img =
    polaroid.querySelector("img");

  if (img) {
    img.style.cursor = "pointer";
  }

  polaroid.addEventListener("click", () => {

    polaroid.classList.toggle("revealed");

  });

});


// ==========================================
// ENVELOPE / LETTER INTERACTION
// ==========================================

const envelope =
  document.getElementById("envelope");

const letterContent =
  document.getElementById("letterContent");

const closeLetterBtn =
  document.getElementById("closeLetterBtn");

const openEnvelopeBtn =
  document.getElementById("openEnvelopeBtn");


// -------------------------------
// Open Letter
// -------------------------------

function openLetter() {

  if (!envelope || !letterContent) {
    return;
  }

  const isOpen =
    envelope.classList.contains("open");

  if (isOpen) {

    closeLetter();

  } else {

    // Open envelope
    envelope.classList.add("open");

    // Wait for envelope animation
    // before showing the letter
    setTimeout(() => {

      letterContent.classList.remove("hidden");

    }, 500);

    // Birthday confetti
    burstConfetti(80);
  }
}


// -------------------------------
// Close Letter
// -------------------------------

function closeLetter() {

  if (!envelope || !letterContent) {
    return;
  }

  envelope.classList.remove("open");

  letterContent.classList.add("hidden");
}


// -------------------------------
// OPEN BUTTON
// -------------------------------

// IMPORTANT:
// Only "click" is used.
//
// Earlier code used both:
// click + pointerdown
//
// On some mobile devices this could
// trigger the function twice.
//
// That caused:
// OPEN → open → immediately close
//
// Now it uses only click.

if (openEnvelopeBtn) {

  openEnvelopeBtn.addEventListener(
    "click",
    (event) => {

      event.preventDefault();

      openLetter();

    }
  );

}


// -------------------------------
// Click Envelope
// -------------------------------

if (envelope) {

  envelope.addEventListener(
    "click",
    (event) => {

      event.preventDefault();

      openLetter();

    }
  );

}


// -------------------------------
// Close Letter Button
// -------------------------------

if (closeLetterBtn) {

  closeLetterBtn.addEventListener(
    "click",
    (event) => {

      event.preventDefault();

      event.stopPropagation();

      closeLetter();

    }
  );

}


// -------------------------------
// Close by Clicking Letter Area
// -------------------------------

if (letterContent) {

  letterContent.addEventListener(
    "click",
    (event) => {

      if (event.target === letterContent) {

        closeLetter();

      }

    }
  );

}


// ==========================================
// MAIN BIRTHDAY SURPRISE BUTTON
// ==========================================

if (openBtn) {

  openBtn.addEventListener(
    "click",
    () => {

      if (splash) {
        splash.classList.add("hidden");
      }

      if (content) {
        content.classList.remove("hidden");
      }

      burstConfetti(120);

    }
  );

}


// ==========================================
// BIRTHDAY WISH BUTTON
// ==========================================

if (wishBtn) {

  wishBtn.addEventListener(
    "click",
    () => {

      const message =
        `Happy Birthday, ${brotherName}! 🎉 ` +
        `You are amazing, loved, and deeply appreciated. ` +
        `Stay awesome always.`;

      alert(message);

      burstConfetti(80);

    }
  );

}


// ==========================================
// GIFT BOX
// ==========================================

if (openGiftBtn) {

  openGiftBtn.addEventListener(
    "click",
    () => {

      if (giftBox) {

        giftBox.classList.remove("locked");

        giftBox.classList.add("open");

      }

      if (finalReveal) {

        finalReveal.classList.remove("hidden");

      }

      burstConfetti(200);

    }
  );

}


// ==========================================
// CONFETTI CANVAS
// ==========================================

const canvas =
  document.getElementById("confettiCanvas");

const ctx =
  canvas
    ? canvas.getContext("2d")
    : null;

let particles = [];


// ==========================================
// RESIZE CONFETTI CANVAS
// ==========================================

function resizeCanvas() {

  if (!canvas) {
    return;
  }

  canvas.width =
    window.innerWidth;

  canvas.height =
    window.innerHeight;
}

window.addEventListener(
  "resize",
  resizeCanvas
);

resizeCanvas();


// ==========================================
// CREATE CONFETTI
// ==========================================

function burstConfetti(count = 120) {

  if (!canvas || !ctx) {
    return;
  }

  for (let i = 0; i < count; i++) {

    particles.push({

      x:
        window.innerWidth / 2,

      y:
        window.innerHeight / 2,

      vx:
        (Math.random() - 0.5) * 8,

      vy:
        Math.random() * -7 - 2,

      size:
        4 + Math.random() * 5,

      color:
        [
          "#f6c76a",
          "#ff7c7c",
          "#7dd3fc",
          "#9ae6b4",
        ][
          Math.floor(
            Math.random() * 4
          )
        ],

      life:
        80 + Math.random() * 50,

    });

  }

  animateConfetti();
}


// ==========================================
// ANIMATE CONFETTI
// ==========================================

function animateConfetti() {

  if (!canvas || !ctx) {
    return;
  }

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  for (
    let i = particles.length - 1;
    i >= 0;
    i--
  ) {

    const p =
      particles[i];


    // Movement
    p.x += p.vx;

    p.y += p.vy;


    // Gravity
    p.vy += 0.12;


    // Reduce life
    p.life -= 1;


    // Draw
    ctx.fillStyle =
      p.color;

    ctx.fillRect(
      p.x,
      p.y,
      p.size,
      p.size * 1.4
    );


    // Remove dead particles
    if (p.life <= 0) {

      particles.splice(i, 1);

    }

  }


  // Continue animation
  if (particles.length > 0) {

    requestAnimationFrame(
      animateConfetti
    );

  }

}
