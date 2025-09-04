document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('order-products');
  const totalEl = document.getElementById('order-total');

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
        item.className = 'order-product';
        item.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <div class="order-details">
            <h3>${product.name}</h3>
            <p class="description">${product.description}</p>
            <p class="price">${product.price.toFixed(2)} zł × ${entry.quantity} = ${subtotal.toFixed(2)} zł</p>
          </div>
        `;
        container.appendChild(item);
      });

      totalEl.textContent = `Razem: ${total.toFixed(2)} zł`;
    });
});
