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


window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    loader.style.display = 'none'; // Скрыть индикатор загрузки
    document.body.style.opacity = '1';
    stay_time() // Установить непрозрачность тела
});

// Установите начальную непрозрачность тела на 0
document.body.style.opacity = '0';


function stay_time(){
        setTimeout(4000); 
    };
