document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('cart-items');
  const totalPriceEl = document.getElementById('total-price');

  fetch('data/products.json')
    .then(res => res.json())
    .then(products => {
      let total = 0;

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
});

function changeQuantity(id, delta) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(p => p.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(p => p.id !== id);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartView();
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(p => p.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}

function clearCart() {
  localStorage.removeItem('cart');
  location.reload();
}
function updateCartView() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('cart-items');
  const totalPriceEl = document.getElementById('total-price');

  fetch('data/products.json')
    .then(res => res.json())
    .then(products => {
      container.innerHTML = '';
      let total = 0;

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
}
