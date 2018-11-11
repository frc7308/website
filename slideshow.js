var slideIndex = 0;

function changeSlide(n) {
    showSlide(slideIndex += n);
}

function showSlide(n) {
    var i;
    var x = document.getElementById("slideshow").children;
    if (n > x.length) {slideIndex = 1} 
    if (n < 1) {slideIndex = x.length} ;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none"; 
    }
    x[slideIndex-1].style.display = "block"; 
}

var topBarSlideImages = ["col1.jpg", "col3.jpg", "col8.jpg", "col9.jpg", "col11.jpg", "col13.jpg", "col15.jpg", "col16.jpg", "col18.jpg", "col19.jpg", "col21.jpg"];
var topBarSlideIndex = Math.floor(Math.random() * topBarSlideImages.length);

function topBarChangeSlide() {
    topBarSlideIndex += 1;
    if (topBarSlideIndex >= topBarSlideImages.length) {
        topBarSlideIndex = 0;
    }
    document.getElementById("topBarSlideshowQueueImage").src = "images/collage/" + topBarSlideImages[topBarSlideIndex];
    document.getElementById("topBarSlideshowImage").id = "topBarSlideshowImgTemp";
    document.getElementById("topBarSlideshowQueueImage").id = "topBarSlideshowImage";
    document.getElementById("topBarSlideshowImgTemp").id = "topBarSlideshowQueueImage";
}

function fadeIn() {
    document.getElementById("topBarSlideshowImagePreload").id = "topBarSlideshowImage";
}

window.onload = function() {
    document.getElementById("topBarSlideshowImagePreload").src = "images/collage/" + topBarSlideImages[topBarSlideIndex];
    setTimeout(fadeIn, 10);
    document.getElementById("topBarSlideshowQueueImage").src = "images/collage/" + topBarSlideImages[topBarSlideIndex + 1];
    setInterval(topBarChangeSlide, 10000);
};