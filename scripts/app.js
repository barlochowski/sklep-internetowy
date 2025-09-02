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
        <p class="description">${p.description}</p>
        <p class="price">${p.price.toFixed(2)} zł</p>
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
function searchProducts() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const products = document.querySelectorAll('.product');
  products.forEach(p => {
    const name = p.querySelector('h2').textContent.toLowerCase();
    p.style.display = name.includes(query) ? 'block' : 'none';
  });
}
function filterProducts() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const products = document.querySelectorAll('.product');
  products.forEach(p => {
    const name = p.querySelector('h2').textContent.toLowerCase();
    const description = p.querySelector('.description').textContent.toLowerCase();
    p.style.display = name.includes(query) || description.includes(query) ? 'block' : 'none';
  });
}





