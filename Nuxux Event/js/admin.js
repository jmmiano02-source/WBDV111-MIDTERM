document.addEventListener('DOMContentLoaded', () => {
    const adminForm = document.querySelector('[data-admin-form]');
    const statusMsg = document.querySelector('[data-admin-status]');

    if (adminForm) {
        adminForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = document.querySelector('[data-admin-user]').value;
            const pass = document.querySelector('[data-admin-pass]').value;

            if (user === 'admin' && pass === 'nexus2026') {
                statusMsg.style.color = 'var(--primary)';
                statusMsg.textContent = 'Access Granted. Redirecting...';
                setTimeout(() => {
                    alert('Admin Panel would load here.');
                }, 1000);
            } else {
                statusMsg.style.color = '#ff4b4b';
                statusMsg.textContent = 'Invalid credentials. Access Denied.';
            }
        });
    }
});