/*слайдер*/
var slideIndex = 0; //счетчик для слайдов
showSlides();       //запуск функции

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("slide");
    for (i = 0; i < slides.length; i++) {                   
        slides[i].style.display = "none";                  
    }
    slideIndex++;                       
    if (slideIndex > slides.length) {
      slideIndex = 1;
    } 
    slides[slideIndex-1].style.display = "block";   
    setTimeout(showSlides, 3000);   
}

function getYear() {
  var d = new Date();
  var yr=d.getFullYear();
  document.getElementById("year").innerHTML = yr;
}
