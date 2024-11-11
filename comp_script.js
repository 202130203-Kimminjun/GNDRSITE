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