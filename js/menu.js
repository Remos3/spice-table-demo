let allMenuItems = [];

async function loadMenu() {
    try {
        const res = await fetch('./data/menu.json');
        allMenuItems = await res.json();
        renderMenu(allMenuItems);
        setupFilters();
    } catch (error) {
        console.error("Error loading menu:", error);
        document.getElementById('menu-grid').innerHTML = `<p class="text-red-500">Failed to load menu.</p>`;
    }
}

function renderMenu(items) {
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = '';
    
    if (items.length === 0) {
        grid.innerHTML = `<p class="text-gray-500 col-span-full text-center py-10">No items found.</p>`;
        return;
    }

    items.forEach(item => {
        const vegIconColor = item.isVeg ? 'bg-green-500' : 'bg-red-500';
        const card = `
            <div class="food-card bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <div class="flex justify-between items-start">
                        <h3 class="text-lg font-bold text-gray-800">${item.name}</h3>
                        <div class="w-3 h-3 rounded-full mt-1.5 ${vegIconColor}"></div>
                    </div>
                    <p class="text-sm text-gray-500 mb-4">${item.category}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-xl font-bold text-brand">${SITE_CONFIG.currency}${item.price}</span>
                        <button onclick="addToCart(${item.id}, '${item.name}', ${item.price})" 
                                class="bg-brand text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition">
                            Add +
                        </button>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}

function setupFilters() {
    const searchInput = document.getElementById('search-menu');
    const vegToggle = document.getElementById('veg-toggle');
    const categoryBtns = document.querySelectorAll('.cat-btn');

    let currentCategory = 'All';

    function applyFilters() {
        let filtered = allMenuItems;
        
        const query = searchInput.value.toLowerCase();
        if (query) {
            filtered = filtered.filter(item => item.name.toLowerCase().includes(query));
        }
        
        if (vegToggle.checked) {
            filtered = filtered.filter(item => item.isVeg);
        }
        
        if (currentCategory !== 'All') {
            filtered = filtered.filter(item => item.category === currentCategory);
        }
        
        renderMenu(filtered);
    }

    searchInput.addEventListener('input', applyFilters);
    vegToggle.addEventListener('change', applyFilters);
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            categoryBtns.forEach(b => {
                b.classList.remove('bg-brand', 'text-white');
                b.classList.add('bg-gray-100', 'text-gray-700');
            });
            e.target.classList.remove('bg-gray-100', 'text-gray-700');
            e.target.classList.add('bg-brand', 'text-white');
            currentCategory = e.target.dataset.cat;
            applyFilters();
        });
    });
}

document.addEventListener("DOMContentLoaded", loadMenu);
