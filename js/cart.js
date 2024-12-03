let cart = JSON.parse(localStorage.getItem('cart')) || {};
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.getElementById('cart-count');
const checkoutForm = document.getElementById('checkout-form');
const alertMessage = document.getElementById('alert-message');

// Инициализация
renderCart();

// Добавить товар в корзину
function addToCart(productId, name, price) {
  if (!cart[productId]) {
    cart[productId] = { name, price, quantity: 1 };
  } else {
    cart[productId].quantity += 1;
  }
  saveCart();
  renderCart();
  showAlert('Товар добавлен в корзину!', false);
}

// Удалить товар из корзины
function removeFromCart(productId) {
  if (cart[productId] != 0) {
    delete cart[productId];
    saveCart();
    renderCart();
    showAlert('Товар удален из корзины!', false);
  }
}

// Обновить количество товара
function updateQuantity(productId, quantity) {
  quantity = parseInt(quantity);
  if (cart[productId]) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      cart[productId].quantity = quantity;
      saveCart();
      renderCart();
    }
  }
}

// Сохранить корзину в localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Отобразить корзину
function renderCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;
  let itemCount = 0;
  for (const productId in cart) {
    const { name, price, quantity } = cart[productId];
    total += price * quantity;
    itemCount += quantity;
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div>${name}</div>
      <div>${price} $</div>
      <div>
        <input type="number" min="1" value="${quantity}" onchange="updateQuantity('${productId}', this.value)">
      </div>
      <div class="actions">
        <button onclick="removeFromCart('${productId}')">Удалить</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  }
  cartTotalElement.textContent = total.toFixed(2);
  cartCountElement.textContent = itemCount;

  // Возвращаем общую стоимость
  return total.toFixed(2);
}

// Открыть модальное окно
function openModal() {
  document.body.style.overflow = 'hidden'; // Отключить прокрутку
  document.getElementById('cart-modal').style.display = 'block';
}

// Закрыть модальное окно
function closeModal() {
  document.body.style.overflow = 'auto';
  document.getElementById('cart-modal').style.display = 'none';
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
  const modal = document.getElementById('cart-modal');
  if (event.target == modal) {
    modal.style.display = "none";
    document.body.style.overflow = 'auto';
  }
}

// Обработка отправки формы заказа
checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault(); // предотвращаем перезагрузку страницы

  const totalAmount = renderCart(); // Получаем общую стоимость

  const orderData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    adres: document.getElementById('adres').value.trim(),
    total: totalAmount, // Добавляем общую стоимость
    items: []
  };

  // Добавляем информацию о каждом товаре в массив items
  for(const productId in cart){
    const {name, price, quantity} = cart[productId];
    orderData.items.push({
      productId: productId,
      name: name,
      price: price,
      quantity: quantity
    });
  }


  
      // Отправка данных на сервер
      // Отправка данных на сервер
fetch('../coffeeBD.php', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(orderData)
})
  .then(response => {
      if (!response.ok) {
          throw new Error(`Ошибка сервера: ${response.status}`);
          showAlert('Произошла ошибкаыы:',false);
          
      }
      return response.json(); // Если сервер возвращает JSON, парсим его
  })
  .then(data => {
      // Проверяем данные ответа (при необходимости)
      console.log('Ответ сервера:', data);

      showAlert('Ваш заказ успешно отправлен!',false);
  })
  .catch(error => {
      // Обработка ошибок
      console.error('Произошла ошибка:', error);
      showAlert('Произошла ошибка:',false);

  });

  });

    // Функция для отображения сообщений
    function showAlert(message, isError) {
      alertMessage.textContent = message;
      if (isError) {
        alertMessage.classList.add('error');
      } else {
        alertMessage.classList.remove('error');
      }
      alertMessage.style.display = 'block';
      setTimeout(() => {
        alertMessage.style.display = 'none';
      }, 3000);
    }