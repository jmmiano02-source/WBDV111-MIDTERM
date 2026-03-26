document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('[data-party-toggle]');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? 'Mode: DARK' : 'Mode: LIGHT';
        }
    };

    setTheme(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    const yearSpan = document.querySelector('[data-year]');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    const currentPage = document.body.getAttribute('data-page');
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('data-nav') === currentPage) {
            link.classList.add('active');
        }
    });

    const ticketRows = document.querySelectorAll('[data-ticket-row]');
    const totalDisplay = document.querySelector('[data-total]');

    if (ticketRows.length > 0 && totalDisplay) {
        ticketRows.forEach(row => {
            const minusBtn = row.querySelector('[data-qty-minus]');
            const plusBtn = row.querySelector('[data-qty-plus]');
            const qtyInput = row.querySelector('[data-qty]');
            
            minusBtn.addEventListener('click', () => {
                let val = parseInt(qtyInput.value);
                if (val > 0) {
                    qtyInput.value = val - 1;
                    calculateTotal();
                }
            });

            plusBtn.addEventListener('click', () => {
                let val = parseInt(qtyInput.value);
                qtyInput.value = val + 1;
                calculateTotal();
            });
        });

        function calculateTotal() {
            let total = 0;
            ticketRows.forEach(row => {
                const price = parseInt(row.getAttribute('data-price'));
                const qty = parseInt(row.querySelector('[data-qty]').value);
                total += price * qty;
            });
            totalDisplay.textContent = `$${total}`;
        }
    }

    const accordionItems = document.querySelectorAll('.accordion-item button');
    accordionItems.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            item.classList.toggle('open');
        });
    });
});