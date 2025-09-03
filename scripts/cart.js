document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('cart-items');
  const totalPriceEl = document.getElementById('total-price');

  fetch('data/products.json')
    .then(res => res.json())
    .then(products => {
      let total = 0;

      cart.forEach(id => {
        const product = products.find(p => p.id === id);
        if (!product) return;

        total += product.price;

        const item = document.createElement('div');
        item.className = 'cart-product';
        item.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <div class="cart-details">
            <h2>${product.name}</h2>
            <p class="description">${product.description}</p>
            <p class="price">${product.price.toFixed(2)} zł</p>
            <button onclick="removeFromCart(${product.id})">Usuń</button>
          </div>
        `;
        container.appendChild(item);
      });

      totalPriceEl.textContent = `Wartość koszyka: ${total.toFixed(2)} zł`;
    });
});

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cart.indexOf(id);
  if (index !== -1) {
    cart.splice(index, 1);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}

function clearCart() {
  localStorage.removeItem('cart');
  location.reload();
}
