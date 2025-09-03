document.addEventListener('DOMContentLoaded', () => {
  fetch('data/products.json')
    .then(res => res.json())
    .then(products => {
      const list = document.getElementById('product-list');
      products.forEach(p => {
        const item = document.createElement('div');
        item.className = `product ${p.category}`;
        item.innerHTML = `
          <img src="${p.image}" alt="${p.name}" />
          <h2>${p.name}</h2>
          <p class="description">${p.description}</p>
          <p class="price">${p.price.toFixed(2)} zł</p>
          <button onclick="addToCart(${p.id})" data-testid="add-to-cart">Dodaj do koszyka</button>
        `;
        list.appendChild(item);
      });

      // Obsługa kliknięć w dropdown
      document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          const selected = this.dataset.value;
          filterByCategory(selected);
        });
      });
    });
});

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(id);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Dodano do koszyka!');
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

function filterByCategory(selected) {
  const products = document.querySelectorAll('.product');
  products.forEach(p => {
    if (!selected || p.classList.contains(selected)) {
      p.style.display = 'block';
    } else {
      p.style.display = 'none';
    }
  });
}
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('cart-count').textContent = cart.length;
}
const count = document.getElementById('cart-count');
count.classList.add('animate');
setTimeout(() => count.classList.remove('animate'), 400);
item.innerHTML = `
  <img src="${p.image}" alt="${p.name}" />
  <h2>${p.name}</h2>
  <p class="description">${p.description}</p>
  <div class="product-footer">
    <p class="price">${p.price.toFixed(2)} zł</p>
    <button onclick="addToCart(${p.id})">Dodaj do koszyka</button>
  </div>
`;
