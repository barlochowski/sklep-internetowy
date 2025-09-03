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
  updateCartCount();

  // Animacja lecenia do koszyka
  const product = document.querySelector(`button[onclick="addToCart(${id})"]`).closest('.product');
  const img = product.querySelector('img');
  const cartIcon = document.getElementById('cart-icon');

  const clone = img.cloneNode(true);
  clone.classList.add('fly-to-cart');
  document.body.appendChild(clone);

  const imgRect = img.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  clone.style.left = `${imgRect.left}px`;
  clone.style.top = `${imgRect.top}px`;

  setTimeout(() => {
    clone.style.left = `${cartRect.left}px`;
    clone.style.top = `${cartRect.top}px`;
    clone.style.opacity = '0';
    clone.style.transform = 'scale(0.5)';
  }, 10);

  setTimeout(() => {
    clone.remove();
  }, 800);
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

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount(); // ← uruchamia licznik po załadowaniu strony
});
const count = document.getElementById('cart-count');
count.classList.add('animate');
setTimeout(() => count.classList.remove('animate'), 400);

