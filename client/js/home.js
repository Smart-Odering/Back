"use strict";

const menuList = document.querySelector('.menu-list');
const sttRecog = document.querySelector('.stt-recog');

//홈화면 메뉴 관련 변수
export var menuname = null;
export var price = null;

jQuery(document).ready(function() {
    $('.menu-tab #coffee').on("click", () => {
        changeCategory("coffee")
        renderHome("coffee");
    });
    $('.menu-tab #beverage').on("click", () => {
        changeCategory("beverage");
        renderHome("beverage");
    });
    $('.menu-tab #dessert').on("click", () => {
        changeCategory("dessert");
        renderHome("dessert");
    });
});

renderHome("coffee");

function renderHome(categoryName) {
    const req = {
        category: categoryName
    };
    console.log(JSON.stringify(req));

    fetch("/home", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())
    .then((res) => {
        $(".menu-list").empty();
        res.forEach(element => {
            createMenuHtml(element);
        });
    })
    .catch((err) => {
        console.error(err);
    });
}

function createMenuHtml(menu) {
    // console.log(menu);
    document.querySelector('.menu-list').insertAdjacentHTML(
        'beforeend',
        `
        <li id="menu_${menu.id}" class="menu-item">
            <figure id="menu_${menu.id}">
                <img id="menu_${menu.id}" class="menu-img" src="/res/${menu.image}">
                <figcaption id="menu_${menu.id}" class="menu-title">${menu.name_kor}</figcaption>
                <span class="menu-price">${menu.price}</span>
            </figure>
        </li>
        `
    );
}

function changeCategory(categoryName){
    document.querySelectorAll('.tab-list').forEach(element =>{
        element.classList.remove('btn-active');
    });
    document.querySelector(`#${categoryName}.tab-list`).classList.add('btn-active');
    if(categoryName == "dessert"){
        $("#size-up").css("visibility","hidden");
        $("#size-up").css("height","0px");
    }
    else{
        $("#size-up").css("visibility","visible");
        $("#size-up").css("height","");
    }
        

}

//홈화면에서 메뉴 클릭시 이뤄지는 이벤트
menuList.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) return;
    var imgSrc = $(`#${e.target.id} .menu-img`).attr("src");
    menuname = $(`#${e.target.id} .menu-title`).text();
    price = $(`#${e.target.id} .menu-price`).text();

    $(".modal-img").attr("src", imgSrc);
    $(".modal-title").text(menuname);
    $(".modal-price").text(price+'원');
    $(".menu-modal-container").addClass("active");
  });

//음성 인식 후 메뉴 추천에서 메뉴 클릭시 이뤄지는 이벤트
sttRecog.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) return;
    console.log(e.target.id)
    var imgSrc = $(`.stt-modal #${e.target.id} .menu-img`).attr("src");
    menuname = $(`.stt-modal #${e.target.id} .menu-title`).text();
    price = $(`.stt-modal #${e.target.id} .menu-price`).text();

    $(".modal-img").attr("src", imgSrc);
    $(".modal-title").text(menuname);
    $(".modal-price").text(price+'원');
    $(".menu-modal-container").addClass("active");
});