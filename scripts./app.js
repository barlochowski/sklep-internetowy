fetch('data/products.json')
  .then(res => res.json())
  .then(products => {
    const list = document.getElementById('product-list');
    products.forEach(p => {
      const item = document.createElement('div');
      item.className = 'product';
      item.innerHTML = `
        <img src="${p.image}" alt="${p.name}" />
        <h2>${p.name}</h2>
        <p>${p.description}</p>
        <p><strong>${p.price.toFixed(2)} zł</strong></p>
        <button onclick="addToCart(${p.id})" data-testid="add-to-cart">Dodaj do koszyka</button>
      `;
      list.appendChild(item);
    });
  });

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(id);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Dodano do koszyka!');
}
