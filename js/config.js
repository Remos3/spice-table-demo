const SITE_CONFIG = {
    restaurantName: "The Spice Table",
    phone: "919876543210", 
    currency: "₹",
    themeColor: "#ea580c"
};

tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: SITE_CONFIG.themeColor,
            }
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.brand-name').forEach(el => {
        el.textContent = SITE_CONFIG.restaurantName;
    });
});
