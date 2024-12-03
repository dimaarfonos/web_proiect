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

function toggleMenu() {
    const menu = document.querySelector('.menu-center');
    menu.classList.toggle('active');
    }


function scrollSnacks(direction) {
  const snacksContainer = document.querySelector(".snacks");
  const itemWidth = document.querySelector(".desserts").offsetWidth; // Получаем ширину одного элемента
  const scrollAmount = itemWidth + 15; // Добавляем отступ между элементами

  snacksContainer.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth", // Плавная прокрутка
  });
}
function scrollSnacksDrinks(direction) {
    const snacksContainer = document.querySelector(".drinks");
    const itemWidth = document.querySelector(".desserts").offsetWidth; // Получаем ширину одного элемента
    const scrollAmount = itemWidth + 20; // Добавляем отступ между элементами
  
    snacksContainer.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth", // Плавная прокрутка
    });
  }

  function scrollSnacksDesserts(direction) {
    const snacksContainer = document.querySelector(".desserts");
    const itemWidth = document.querySelector(".desserts").offsetWidth; // Получаем ширину одного элемента
    const scrollAmount = itemWidth + 25; // Добавляем отступ между элементами
  
    snacksContainer.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth", // Плавная прокрутка
    });
  }

  function scrollSnacksRec(direction) {
    const snacksContainer = document.querySelector(".recommendations");
    const itemWidth = document.querySelector(".desserts").offsetWidth; // Получаем ширину одного элемента
    const scrollAmount = itemWidth + 15; // Добавляем отступ между элементами
  
    snacksContainer.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth", // Плавная прокрутка
    });
  }

  // Показывать кнопку только при прокрутке вниз
window.onscroll = function() {
    const backToTopButton = document.getElementById('backToTop');
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.style.display = 'block'; // Показать кнопку
    } else {
        backToTopButton.style.display = 'none'; // Скрыть кнопку
    }
};

// Функция для плавного скролла наверх
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Плавный переход
    });
}
