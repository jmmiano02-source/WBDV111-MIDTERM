document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('secureBtn').style.display = 'none';
      document.getElementById('otpSection').style.display = 'block';
    });
  }
});

function verifyOTP() {
  window.location.href = 'dashboard.html';
}