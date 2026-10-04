const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
  menuToggle.textContent = open ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.parentElement;
    document.querySelectorAll(".faq-item").forEach(other => {
      if (other !== item) other.classList.remove("active");
    });
    item.classList.toggle("active");
  });
});

const modal = document.getElementById("modal");
const aboutBtn = document.getElementById("aboutBtn");
const modalClose = document.getElementById("modalClose");
const modalDone = document.getElementById("modalDone");

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}
aboutBtn.addEventListener("click", () => {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
});
modalClose.addEventListener("click", closeModal);
modalDone.addEventListener("click", closeModal);
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

function setError(field, message) {
  const error = field.parentElement.querySelector(".error");
  field.classList.toggle("invalid", Boolean(message));
  error.textContent = message;
}

form.addEventListener("submit", e => {
  e.preventDefault();
  successMessage.classList.remove("show");

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const service = document.getElementById("service");
  const message = document.getElementById("message");
  let valid = true;

  if (name.value.trim().length < 2) {
    setError(name, "Please enter your name.");
    valid = false;
  } else setError(name, "");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    setError(email, "Please enter a valid email.");
    valid = false;
  } else setError(email, "");

  if (!service.value) {
    setError(service, "Please choose a service.");
    valid = false;
  } else setError(service, "");

  if (message.value.trim().length < 10) {
    setError(message, "Message must be at least 10 characters.");
    valid = false;
  } else setError(message, "");

  if (valid) {
    successMessage.classList.add("show");
    form.reset();
  }
});
