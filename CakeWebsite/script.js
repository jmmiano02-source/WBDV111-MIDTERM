const cakeData = [
    { name: "Midnight Truffle", price: 45, category: "Chocolate", desc: "Deep dark chocolate with a silky ganache.", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400" },
    { name: "Velvet Strawberry", price: 38, category: "Fruit", desc: "Fresh strawberries whipped into light cream.", img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400" },
    { name: "Golden Honey", price: 35, category: "Classic", desc: "Local honey infused into a crunchy crust.", img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400" },
    { name: "Vanilla Bean", price: 40, category: "Classic", desc: "Authentic Madagascan vanilla bean sponge.", img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400" },
    { name: "Caramel Crunch", price: 42, category: "Specialty", desc: "Salted caramel with toasted almond bits.", img: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=400" },
    { name: "Pistachio Dream", price: 50, category: "Specialty", desc: "Roasted pistachios and white chocolate glaze.", img: "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?w=400" },
    { name: "Lemon Zest", price: 32, category: "Fruit", desc: "Zesty lemon curd on a shortbread base.", img: "https://images.unsplash.com/photo-1519869325930-281384150729?w=400" },
    { name: "Berry Cheesecake", price: 48, category: "Cheesecake", desc: "NY style cheesecake with forest berries.", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400" },
    { name: "Dark Forest", price: 46, category: "Chocolate", desc: "Cherries and chocolate with whipped kirsch.", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400" },
    { name: "Espresso Cream", price: 44, category: "Specialty", desc: "Rich coffee layers for the caffeine lovers.", img: "https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=400" }
];

const banners = [
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200",
    "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=1200",
    "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=1200"
];

const CART_KEY = "velvetCart";
let cart = [];
let bannerIdx = 0;
let pendingItem = null;

window.onload = () => {
    cart = loadCartFromStorage();
    updateCartCountDisplay();
    renderCakes();
    setInterval(rotateBanner, 4000);
    updateCart();
};

function renderCakes() {
    const fullGrid = document.getElementById('full-grid');
    const trendGrid = document.getElementById('trending-grid');
    
    if(fullGrid) fullGrid.innerHTML = '';
    if(trendGrid) trendGrid.innerHTML = '';

    cakeData.forEach((cake, idx) => {
        const html = `
            <div class="cake-card">
                <img src="${cake.img}">
                <span class="category-tag">${cake.category}</span>
                <h3>${cake.name}</h3>
                <p style="color: #888; font-size: 0.85rem; margin-bottom: 15px;">${cake.desc}</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: bold;">$${cake.price}</span>
                    <button class="btn-cream" style="padding: 8px 15px; font-size: 0.7rem;" onclick="askConfirm('${cake.name}', ${cake.price})">Add</button>
                </div>
            </div>`;
        
        if(fullGrid) fullGrid.innerHTML += html;
        if(trendGrid && idx < 3) trendGrid.innerHTML += html;
    });
}

function rotateBanner() {
    bannerIdx = (bannerIdx + 1) % banners.length;
    const img = document.getElementById('carousel-img');
    if(img) {
        img.style.opacity = 0.5;
        setTimeout(() => {
            img.src = banners[bannerIdx];
            img.style.opacity = 1;
        }, 300);
    }
}

function askConfirm(name, price) {
    pendingItem = { name, price };
    const modal = document.getElementById('cart-modal');
    const msg = document.getElementById('modal-msg');
    const qtyBox = document.getElementById('qty-box');

    msg.innerText = `Add ${name} to cart?`;
    qtyBox.style.display = 'none';
    modal.style.display = 'flex';
    
    document.getElementById('modal-yes').onclick = () => {
        if (qtyBox.style.display === 'none') {
            msg.innerText = "Select Quantity";
            qtyBox.style.display = 'block';
        } else {
            finalizeAdd();
        }
    };
}

function finalizeAdd() {
    const qty = parseInt(document.getElementById('item-qty').value) || 1;
    cart.push({ ...pendingItem, qty, id: Date.now() });
    updateCart();
    closeModal();
}

function closeModal() {
    document.getElementById('cart-modal').style.display = 'none';
    document.getElementById('item-qty').value = 1;
    pendingItem = null;
}

document.getElementById('modal-no').onclick = closeModal;

function updateCart() {
    updateCartCountDisplay();
    const list = document.getElementById('cart-items');
    if(!list) return;
    
    list.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        list.innerHTML += `<tr>
            <td style="padding: 20px; border-bottom: 1px solid var(--border-light);">${item.name}</td>
            <td style="padding: 20px; border-bottom: 1px solid var(--border-light);">${item.qty}</td>
            <td style="padding: 20px; border-bottom: 1px solid var(--border-light);">$${item.price * item.qty}</td>
            <td style="padding: 20px; border-bottom: 1px solid var(--border-light); text-align: right;">
                <button onclick="removeItem(${item.id})" style="background: none; border: none; cursor: pointer; color: #ccc;">Remove</button>
            </td>
        </tr>`;
        total += (item.price * item.qty);
    });
    document.getElementById('total-price').innerText = total;
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    updateCart();
}

function loadCartFromStorage() {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
}

function saveCartToStorage() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function updateCartCountDisplay() {
    const count = cart.reduce((sum, item) => sum + (parseInt(item.qty) || 0), 0);
    document.querySelectorAll('#cart-count').forEach(el => el.innerText = count);
    saveCartToStorage();
}