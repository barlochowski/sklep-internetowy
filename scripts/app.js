document.addEventListener("DOMContentLoaded", () => {
  fetch("data/products.json")
    .then(res => res.json())
    .then(products => {
      renderProducts(products);
      setupCategoryFilter();
      updateCartCount();
    })
    .catch(err => {
      console.error("Błąd wczytywania produktów:", err);
      document.getElementById("product-list").innerHTML = "<p>Nie udało się wczytać produktów.</p>";
    });
});

function renderProducts(products) {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  products.forEach(p => {
    const item = document.createElement("div");
    item.className = `product ${p.category}`;
    item.innerHTML = `
      <div class="product-content">
        <img src="${p.image}" alt="${p.name}" />
        <h2>${p.name}</h2>
        <p class="description">${p.description}</p>
      </div>
      <div class="product-footer">
        <p class="price">${p.price.toFixed(2)} zł</p>
        <button class="add-to-cart" data-id="${p.id}">Dodaj do koszyka</button>
      </div>
    `;
    list.appendChild(item);
  });

  // podpinamy eventy do przycisków
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      addToCart(id);
    });
  });
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: id, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  animateToCart(id);
}

function animateToCart(id) {
  const product = document.querySelector(`.add-to-cart[data-id="${id}"]`).closest(".product");
  const img = product.querySelector("img");
  const cartIcon = document.getElementById("cart-count");

  const clone = img.cloneNode(true);
  clone.classList.add("fly-to-cart");
  document.body.appendChild(clone);

  const imgRect = img.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  clone.style.position = "absolute";
  clone.style.left = `${imgRect.left}px`;
  clone.style.top = `${imgRect.top}px`;
  clone.style.width = `${img.width}px`;

  setTimeout(() => {
    clone.style.left = `${cartRect.left}px`;
    clone.style.top = `${cartRect.top}px`;
    clone.style.opacity = "0";
    clone.style.transform = "scale(0.5)";
  }, 10);

  setTimeout(() => clone.remove(), 800);

  cartIcon.classList.add("animate");
  setTimeout(() => cartIcon.classList.remove("animate"), 400);
}

function filterProducts() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const products = document.querySelectorAll(".product");
  products.forEach(p => {
    const name = p.querySelector("h2").textContent.toLowerCase();
    const description = p.querySelector(".description").textContent.toLowerCase();
    p.style.display = name.includes(query) || description.includes(query) ? "flex" : "none";
  });
}

function setupCategoryFilter() {
  document.querySelectorAll(".dropdown-content a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const selected = link.dataset.value;
      filterByCategory(selected);
    });
  });
}

function filterByCategory(selected) {
  const products = document.querySelectorAll(".product");
  products.forEach(p => {
    p.style.display = (!selected || p.classList.contains(selected)) ? "flex" : "none";
  });
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  document.getElementById("cart-count").textContent = totalItems;
}
