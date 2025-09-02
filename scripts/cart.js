fetch('data/products.json')
  .then(res => res.json())
  .then(products => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const list = document.getElementById('cart-items');
    let total = 0;

    cart.forEach(id => {
      const product = products.find(p => p.id === id);
      if (product) {
        const item = document.createElement('li');
        item.textContent = `${product.name} - ${product.price.toFixed(2)} zł`;
        list.appendChild(item);
        total += product.price;
      }
    });

    document.getElementById('total-price').textContent = `Łącznie: ${total.toFixed(2)} zł`;
  });