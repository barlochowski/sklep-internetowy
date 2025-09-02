// Pobieranie produktów
fetch("data/products.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("products");
    if (!container) return;
    data.forEach(p => {
      const card = document.createElement("div");
      card.className = "product";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <strong>${p.price} zł</strong><br>
        <button onclick="addToCart(${p.id}, '${p.name}', ${p.price}, '${p.image}')">Dodaj do koszyka</button>
      `;
      container.appendChild(card);
    });
  });

function addToCart(id, name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, name, price, image, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} dodano do koszyka!`);
}

function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Koszyk jest pusty.</p>";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" width="50" alt="${item.name}">
      <span>${item.name}</span>
      <span>${item.price} zł</span>
      <div class="quantity">
        <button onclick="updateQuantity(${index}, -1)">➖</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity(${index}, 1)">➕</button>
      </div>
      <button onclick="removeFromCart(${index})">❌ Usuń</button>
    `;
    container.appendChild(div);
  });

  container.innerHTML += `<h3>Razem: ${total.toFixed(2)} zł</h3>`;
}

function updateQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart[index]) return;

  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}
