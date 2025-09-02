// Załadowanie produktów
fetch("data/products.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("products");
    data.forEach(p => {
      const card = document.createElement("div");
      card.className = "product";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.price} zł</p>
        <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Dodaj do koszyka</button>
      `;
      container.appendChild(card);
    });
  });

// Koszyk w localStorage
function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ id, name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} dodano do koszyka!`);
}
