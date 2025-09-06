document.addEventListener('DOMContentLoaded', () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('checkout-products');
  const valueEl = document.getElementById('summary-value');
  const discountEl = document.getElementById('summary-discount');
  const totalEl = document.getElementById('summary-total');

  fetch('data/products.json')
    .then(res => res.json())
    .then(products => {
      let total = 0;

      cart.forEach(entry => {
        if (typeof entry === 'number') {
          entry = { id: entry, quantity: 1 };
        }

        const product = products.find(p => p.id === entry.id);
        if (!product) return;

        const subtotal = product.price * entry.quantity;
        total += subtotal;

        const item = document.createElement('div');
        item.className = 'checkout-product';
        item.innerHTML = `
          <div class="image-wrapper">
            <img src="${product.image}" alt="${product.name}" class="product-image" />
          </div>
          <div class="checkout-details">
            <h3>${product.name}</h3>
            <p class="description">${product.description}</p>
            <p class="price">${product.price.toFixed(2)} zł × ${entry.quantity} = ${subtotal.toFixed(2)} zł</p>
          </div>
        `;
        container.appendChild(item);
      });

      valueEl.textContent = `${total.toFixed(2)} zł`;
      discountEl.textContent = `0,00 zł`;
      totalEl.textContent = `${total.toFixed(2)} zł`;
    })
    .catch(error => {
      console.error('Błąd podczas ładowania produktów:', error);
      container.innerHTML = '<p>Nie udało się załadować produktów.</p>';
    });
});
