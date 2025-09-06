document.addEventListener('DOMContentLoaded', () => {
  const cartCount = document.getElementById('cart-count');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Aktualizacja licznika
  function updateCartCount() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.classList.add('animate');
    setTimeout(() => cartCount.classList.remove('animate'), 400);
  }

  updateCartCount();

  // Dodawanie do koszyka
  document.querySelectorAll('.product button').forEach(button => {
    button.addEventListener('click', () => {
      const productEl = button.closest('.product');
      const id = parseInt(productEl.dataset.id);
      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ id, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      animateToCart(productEl.querySelector('img'));
    });
  });

  // Animacja dodania do koszyka
  function animateToCart(img) {
    const cartIcon = document.querySelector('.fa-cart-shopping');
    const clone = img.cloneNode(true);
    clone.classList.add('fly-to-cart');
    document.body.appendChild(clone);

    const start = img.getBoundingClientRect();
    const end = cartIcon.getBoundingClientRect();

    clone.style.position = 'absolute';
    clone.style.left = `${start.left}px`;
    clone.style.top = `${start.top}px`;
    clone.style.width = `${start.width}px`;
    clone.style.height = `${start.height}px`;

    requestAnimationFrame(() => {
      clone.style.left = `${end.left}px`;
      clone.style.top = `${end.top}px`;
      clone.style.transform = 'scale(0.2)';
      clone.style.opacity = '0';
    });

    setTimeout(() => clone.remove(), 800);
  }
});
