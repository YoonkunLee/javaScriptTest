var slideIndex1 = 0;
showSlides1();

function showSlides1() {
    var i;
    var slides1 = document.getElementsByClassName("myAutoSlides");
    var dots1 = document.getElementsByClassName("autoDot");
    for (i = 0; i < slides1.length; i++) {
        slides1[i].style.display = "none";
    }
    slideIndex1++;
    if (slideIndex1 > slides1.length) { slideIndex1 = 1 }
    for (i = 0; i < dots1.length; i++) {
        dots1[i].className = dots1[i].className.replace(" active", "");
    }
    slides1[slideIndex1 - 1].style.display = "block";
    dots1[slideIndex1 - 1].className += " active";
    setTimeout(showSlides1, 2000); // Change image every 2 seconds
}