:root {
  --bg: #0d0f0d;
  --surface: rgba(255, 255, 255, 0.04);
  --border: rgba(190, 242, 94, 0.25);
  --primary: #bef264;
  --text: #ffffff;
  --radius: 20px;
}

body {
  margin: 0;
  background-color: var(--bg);
  background-image: radial-gradient(circle at 2% 2%, rgba(190, 242, 94, 0.1) 0%, transparent 40%);
  color: var(--text);
  font-family: 'Inter', sans-serif;
}

.card, .wizard-card, .panel, .login-panel {
  background: var(--surface);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 2rem;
}

.nav-button, .submit-button, .primary-link {
  background: var(--primary) !important;
  color: #000 !important;
  border: none;
  padding: 0.8rem 1.6rem;
  border-radius: 10px;
  font-weight: 700;
  text-decoration: none;
  display: inline-block;
}

.eyebrow {
  color: var(--primary);
  text-transform: uppercase;
  font-size: 0.7rem;
  font-weight: 800;
}

input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  color: white;
  padding: 0.8rem;
  border-radius: 8px;
  width: 100%;
}

.choice-card.active, .doctor-card.active {
  border-color: var(--primary) !important;
  background: rgba(190, 242, 94, 0.1) !important;
}