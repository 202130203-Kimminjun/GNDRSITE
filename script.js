document.addEventListener("DOMContentLoaded", function () {
    // 페이지 로드 후 모든 fade-in 요소에 show 클래스 추가
    document.querySelectorAll('.fade-in').forEach(element => {
        element.classList.add('show');
    });
});

const header = document.getElementById("header");
const topButton = document.getElementById("topButton");

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) { 
        // 헤더 나타나기
        header.style.visibility = "visible";
        header.style.opacity = "1";
        
        // '맨 위로' 버튼 나타나기
        topButton.style.visibility = "visible";
        topButton.style.opacity = "1";
    } else {
        // 헤더 숨기기
        header.style.opacity = "0";
        header.style.visibility = "hidden";
        
        // '맨 위로' 버튼 숨기기
        topButton.style.opacity = "0";
        topButton.style.visibility = "hidden";
    }
});

// '맨 위로' 버튼 클릭 시 페이지 상단으로 스크롤
topButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const slider = document.querySelector('.slider-items');
const items = document.querySelectorAll('.item');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

let currentIndex = 0;
let itemsPerSlide = 2; // 한번에 보이는 상품 개수
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;

function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
}

function animateSlider() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animateSlider);
}

function startDrag(e) {
    isDragging = true;
    startPos = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    animationID = requestAnimationFrame(animateSlider);
    slider.style.cursor = 'grabbing';
}

function endDrag() {
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100 && currentIndex < items.length - itemsPerSlide) currentIndex += itemsPerSlide;
    if (movedBy > 100 && currentIndex > 0) currentIndex -= itemsPerSlide;

    updatePosition();
    slider.style.cursor = 'grab';
}

function drag(e) {
    if (!isDragging) return;
    const currentPosition = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    currentTranslate = prevTranslate + currentPosition - startPos;
}

function updatePosition() {
    currentTranslate = currentIndex * -slider.clientWidth / itemsPerSlide;
    prevTranslate = currentTranslate;
    setSliderPosition();
}

leftBtn.addEventListener('click', () => {
    if (currentIndex > 0) currentIndex -= itemsPerSlide;
    updatePosition();
});

rightBtn.addEventListener('click', () => {
    if (currentIndex < items.length - itemsPerSlide) currentIndex += itemsPerSlide;
    updatePosition();
});

slider.addEventListener('mousedown', startDrag);
slider.addEventListener('mouseup', endDrag);
slider.addEventListener('mousemove', drag);
slider.addEventListener('mouseleave', endDrag);
slider.addEventListener('touchstart', startDrag);
slider.addEventListener('touchend', endDrag);
slider.addEventListener('touchmove', drag);

//GPT가 대충 알아서 해줌...