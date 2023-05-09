"use strict";

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
        $(".menu-item").on("click",function(){
            console.log(this);
            const imgSrc = $(`#${this.id} .menu-img`).attr("src");
            const name = $(`#${this.id} .menu-title`).text();
            const price = $(`#${this.id} .menu-price`).text();
            var totalprice = Number(price);
            var state = 0;
            $(".modal-img").attr("src", imgSrc);
            $(".modal-title").text(name);
            $(".modal-price").text(price+'원');
            $(".menu-modal-container").addClass("active");
            $(".btn-size-up").on("click",function(){
                if(state == 0){
                    console.log("size up click")
                    $(".btn-size-up").css("background","tomato")
                    $(".modal-price").css("color","orangered")
                    totalprice += 1000;
                    document.querySelector('.modal-price').textContent = `${totalprice}원`;
                    state = 1;
                }
                else if(state == 1){
                    $(".btn-size-up").css("background","")
                    $(".modal-price").css("color","black")
                    totalprice -= 1000;
                    document.querySelector('.modal-price').textContent = `${totalprice}원`;
                    state = 0;
                }
                
            });
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
}