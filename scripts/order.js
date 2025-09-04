document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('order-items');
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

        const item = document.createElement('p');
        item.textContent = `${product.name} × ${entry.quantity} = ${subtotal.toFixed(2)} zł`;
        container.appendChild(item);
      });

      totalEl.textContent = `Razem: ${total.toFixed(2)} zł`;
    });
});
