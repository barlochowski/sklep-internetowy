document.getElementById('order-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Zamówienie złożone! Dziękujemy!');
  localStorage.removeItem('cart');
});