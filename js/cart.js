let cart = JSON.parse(localStorage.getItem('restaurant_cart')) || [];

function saveCart() {
    localStorage.setItem('restaurant_cart', JSON.stringify(cart));
    updateCartIcon();
}

function updateCartIcon() {
    const count = cart.reduce((total, item) => total + item.qty, 0);
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-flex' : 'none';
    });
}

function addToCart(id, name, price) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }
    saveCart();
    alert(`${name} added to cart!`);
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        saveCart();
        if (window.renderCartItems) renderCartItems(); 
    }
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    let text = `Hello *${SITE_CONFIG.restaurantName}*! I want to place an order:\n\n`;
    let total = 0;
    
    cart.forEach(item => {
        text += `- ${item.name} (x${item.qty}) : ${SITE_CONFIG.currency}${item.price * item.qty}\n`;
        total += item.price * item.qty;
    });
    
    text += `\n*Total Amount:* ${SITE_CONFIG.currency}${total}\n\nPlease confirm my order.`;
    
    const whatsappUrl = `https://wa.me/${SITE_CONFIG.phone}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
}

document.addEventListener("DOMContentLoaded", updateCartIcon);
