(function () {
  const SESSION_KEY = "healthsync-portal-session";

  const accounts = [
    { role: "admin", username: "admin", password: "admin123", dashboard: "admin-dashboard.html" },
    { role: "staff", username: "staff", password: "staff123", dashboard: "staff-dashboard.html" },
    { role: "user", username: "user", password: "user123", dashboard: "user-dashboard.html" }
  ];

  function getAccount(username, password) {
    return accounts.find(a => a.username === username && a.password === password);
  }

  function saveSession(data) {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(data));
  }

  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const u = document.getElementById("username").value;
      const p = document.getElementById("password").value;
      const acc = getAccount(u, p);

      if (acc) {
        saveSession(acc);
        window.location.href = acc.dashboard;
      } else {
        const status = document.getElementById("loginStatus");
        status.textContent = "Invalid credentials. Try user/user123";
        status.style.color = "#ff4e4e";
      }
    });
  }
})();