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
      if (cart[productId]!=0) {
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
    }

    // Открыть модальное окно
    function openModal() {
      
      document.getElementById('cart-modal').style.display = 'block';
    }

    // Закрыть модальное окно
    function closeModal() {
      document.getElementById('cart-modal').style.display = 'none';
    }

    // Закрытие модального окна при клике вне его
    window.onclick = function(event) {
      const modal = document.getElementById('cart-modal');
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    // Обработка отправки формы заказа
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();// обработка данных  формы без перезагрузки страницы.
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();

      if (name === '' || email === '' || phone === '') {
        showAlert('Пожалуйста, заполните все поля формы.', true);
        return;
      }

      // Здесь можно добавить отправку данных на сервер через AJAX
      // Например, используя fetch или XMLHttpRequest

      // Очистка корзины после успешного оформления заказа
      localStorage.removeItem('cart');
      cart = {};
      renderCart();
      closeModal();
      checkoutForm.reset();
      showAlert('Ваш заказ успешно оформлен!', false);
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