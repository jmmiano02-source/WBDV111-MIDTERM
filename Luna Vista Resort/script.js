document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector("#loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.href = "reservation.html";
    });
  }

  const slides = document.querySelectorAll(".slide");
  let current = 0;

  function showSlide(index) {
    if (!slides.length) return;
    slides[current].classList.remove("active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("active");
  }

  document.getElementById("nextBtn")?.addEventListener("click", () => showSlide(current + 1));
  document.getElementById("prevBtn")?.addEventListener("click", () => showSlide(current - 1));

  if (slides.length) {
    setInterval(() => showSlide(current + 1), 5000);
  }
});
