dam ci pliki i je napraw app.js: "document.addEventListener('DOMContentLoaded', () => { fetch('data/products.json') .then(res => res.json()) .then(products => { const list = document.getElementById('product-list'); products.forEach(p => { const item = document.createElement('div'); item.className = product ${p.category}; item.innerHTML = <div class="product-content"><img src="${p.image}" alt="${p.name}" /><h2>${p.name}</h2><p class="description">${p.description}</p></div><div class="product-footer"><p class="price">${p.price.toFixed(2)} zł</p><button onclick="addToCart(${p.id})">Dodaj do koszyka</button></div>; list.appendChild(item); });
  document.querySelectorAll('.dropdown-content a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const selected = this.dataset.value;
      filterByCategory(selected);
    });
  });

  updateCartCount();
});







});
function addToCart(id) { let cart = JSON.parse(localStorage.getItem('cart')) || [];
const existing = cart.find(item => item.id === id); if (existing) { existing.quantity += 1; } else { cart.push({ id: id, quantity: 1 }); }
localStorage.setItem('cart', JSON.stringify(cart)); updateCartCount();
const product = document.querySelector(button[onclick="addToCart(${id})"]).closest('.product'); const img = product.querySelector('img'); const cartIcon = document.getElementById('cart-count');
const clone = img.cloneNode(true); clone.classList.add('fly-to-cart'); document.body.appendChild(clone);
const imgRect = img.getBoundingClientRect(); const cartRect = cartIcon.getBoundingClientRect();
clone.style.left = ${imgRect.left}px; clone.style.top = ${imgRect.top}px;
setTimeout(() => { clone.style.left = ${cartRect.left}px; clone.style.top = ${cartRect.top}px; clone.style.opacity = '0'; clone.style.transform = 'scale(0.5)'; }, 10);
setTimeout(() => { clone.remove(); }, 800);
cartIcon.classList.add('animate'); setTimeout(() => cartIcon.classList.remove('animate'), 400); }
function filterProducts() { const query = document.getElementById('searchInput').value.toLowerCase(); const products = document.querySelectorAll('.product'); products.forEach(p => { const name = p.querySelector('h2').textContent.toLowerCase(); const description = p.querySelector('.description').textContent.toLowerCase(); p.style.display = name.includes(query) || description.includes(query) ? 'flex' : 'none'; }); }
function filterByCategory(selected) { const products = document.querySelectorAll('.product'); products.forEach(p => { p.style.display = (!selected || p.classList.contains(selected)) ? 'flex' : 'none'; }); }
function updateCartCount() { const cart = JSON.parse(localStorage.getItem('cart')) || []; const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); document.getElementById('cart-count').textContent = totalItems; }"
cart.js: "document.addEventListener('DOMContentLoaded', () => { const cart = JSON.parse(localStorage.getItem('cart')) || []; const container = document.getElementById('cart-items'); const totalPriceEl = document.getElementById('total-price');
fetch('data/products.json') .then(res => res.json()) .then(products => { let total = 0;
  cart.forEach(entry => {
    const product = products.find(p => p.id === entry.id);
    if (!product) return;

    const subtotal = product.price * entry.quantity;
    total += subtotal;

    const item = document.createElement('div');
    item.className = 'cart-product';
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="cart-details">
        <h2>${product.name}</h2>
        <p class="description">${product.description}</p>
        <p class="price">${product.price.toFixed(2)} zł × ${entry.quantity} = ${subtotal.toFixed(2)} zł</p>
        <div class="quantity-controls">
          <button onclick="changeQuantity(${product.id}, -1)">−</button>
          <span>${entry.quantity}</span>
          <button onclick="changeQuantity(${product.id}, 1)">+</button>
        </div>
        <button onclick="removeFromCart(${product.id})">Usuń</button>
      </div>
    `;
    container.appendChild(item);
  });

  totalPriceEl.textContent = `Wartość koszyka: ${total.toFixed(2)} zł`;
});





});
function changeQuantity(id, delta) { let cart = JSON.parse(localStorage.getItem('cart')) || []; const item = cart.find(p => p.id === id); if (!item) return;
item.quantity += delta; if (item.quantity <= 0) { cart = cart.filter(p => p.id !== id); }
localStorage.setItem('cart', JSON.stringify(cart)); location.reload(); }
function removeFromCart(id) { let cart = JSON.parse(localStorage.getItem('cart')) || []; cart = cart.filter(p => p.id !== id); localStorage.setItem('cart', JSON.stringify(cart)); location.reload(); }
function clearCart() { localStorage.removeItem('cart'); location.reload(); }"
cart.html: "<!DOCTYPE html>
<html lang="pl"><head><meta charset="UTF-8" /><title>Koszyk</title><link rel="stylesheet" href="styles/main.css" /></head><body><header><h1>Twój koszyk</h1><nav><a href="index.html">Strona główna</a><a href="order.html">Zamówienie</a></nav></header><main><div id="cart-items"></div><p id="total-price"></p><div class="cart-actions"><button onclick="clearCart()" class="button">Wyczyść koszyk</button><a href="order.html" class="button">Przejdź do zamówienia</a></div></main><script src="scripts/cart.js"></script></body></html>"
index.html: "<!DOCTYPE html>
<html lang="pl"><head><meta charset="UTF-8" /><title>Sklep z Biżuterią i Ubraniami</title><link rel="stylesheet" href="styles/main.css" /><link rel="icon" href="favicon.png" type="image/png" /><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" /></head><body><header><div class="header-left"><div class="logo"><i class="fa-solid fa-gem"></i> Biżuteria & Moda</div></div>
<div class="header-center"><div class="search-bar"><input type="text" id="searchInput" placeholder="Szukaj produktu..." oninput="filterProducts()" /><button><i class="fa-solid fa-search"></i></button></div></div>
<div class="header-right"><nav><a href="index.html"><i class="fa-solid fa-house"></i> Strona główna</a><a href="cart.html" id="cart-icon"><i class="fa-solid fa-cart-shopping"></i> Koszyk<span id="cart-count">0</span></a><a href="#"><i class="fa-solid fa-user"></i> Konto</a><div class="dropdown"><button class="dropbtn"><i class="fa-solid fa-bars"></i> Kategorie</button><div class="dropdown-content"><a href="#" data-value="">Wszystkie</a><a href="#" data-value="biżuteria">Biżuteria</a><a href="#" data-value="ubrania">Ubrania</a><a href="#" data-value="akcesoria">Akcesoria</a></div></div></nav></div></header>
<main id="product-list"></main>
<script src="scripts/app.js"></script>
</body></html>"
