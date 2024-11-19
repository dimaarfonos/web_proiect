function openFullscreen(element) {
    const img = element.querySelector('.item-image');
    const overlay = document.getElementById('fullscreenOverlay');
    const fullscreenImg = document.createElement('img');
    
    fullscreenImg.src = img.src;
    fullscreenImg.style.objectFit = 'contain';
    
    overlay.innerHTML = ''; // Очищаем предыдущие изображения
    overlay.appendChild(fullscreenImg);
    overlay.style.display = 'flex'; // Показываем затемняющий фон
}

function closeFullscreen() {
    const overlay = document.getElementById('fullscreenOverlay');
    overlay.style.display = 'none'; // Скрываем затемняющий фон
}

document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', () => {
        alert('Вы купили этот товар!');
    });
});

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        alert('Товар добавлен в корзину!');
    });
});