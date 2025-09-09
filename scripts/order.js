document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("checkout-products");
  const valueEl = document.getElementById("summary-value");
  const discountEl = document.getElementById("summary-discount");
  const totalEl = document.getElementById("summary-total");

  // Jeśli koszyk pusty
  if (cart.length === 0) {
    container.innerHTML = `<p>Koszyk jest pusty. <a href="index.html">Wróć do sklepu</a></p>`;
    return;
  }

  fetch("data/products.json")
    .then(res => res.json())
    .then(products => renderCheckout(products, cart));
});

function renderCheckout(products, cart) {
  const container = document.getElementById("checkout-products");
  const valueEl = document.getElementById("summary-value");
  const discountEl = document.getElementById("summary-discount");
  const totalEl = document.getElementById("summary-total");

  let total = 0;

  cart.forEach(entry => {
    const product = products.find(p => p.id === entry.id);
    if (!product) return;

    const subtotal = product.price * entry.quantity;
    total += subtotal;

    const item = document.createElement("div");
    item.className = "checkout-product";
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="checkout-info">
        <h3>${product.name}</h3>
        <p class="description">${product.description}</p>
        <p class="price">${product.price.toFixed(2)} zł × ${entry.quantity} = ${subtotal.toFixed(2)} zł</p>
      </div>
    `;
    container.appendChild(item);
  });

  // Podsumowanie
  valueEl.textContent = `${total.toFixed(2)} zł`;
  discountEl.textContent = `0,00 zł`;
  totalEl.textContent = `${total.toFixed(2)} zł`;
}
