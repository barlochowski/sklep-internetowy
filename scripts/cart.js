document.querySelectorAll('.qty-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const index = parseInt(btn.dataset.index);
    const action = btn.dataset.action;

    if (action === 'increase') cart[index].quantity++;
    if (action === 'decrease' && cart[index].quantity > 1) cart[index].quantity--;

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
  });
});

function updateCartDisplay() {
  const container = document.getElementById('cart-products');
  const totalEl = document.getElementById('cart-total');
  container.innerHTML = '';
  let total = 0;

  cart.forEach((entry, index) => {
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
        <p class="price">${product.price.toFixed(2)} zł</p>
        <div class="quantity-controls">
          <button class="qty-btn" data-index="${index}" data-action="decrease">−</button>
          <span>${entry.quantity}</span>
          <button class="qty-btn" data-index="${index}" data-action="increase">+</button>
        </div>
        <p class="subtotal">Razem: ${subtotal.toFixed(2)} zł</p>
      </div>
    `;
    container.appendChild(item);
  });

  totalEl.textContent = `${total.toFixed(2)} zł`;
}
