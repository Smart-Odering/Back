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
    })
    .catch((err) => {
        console.error(err);
    });
}

function createMenuHtml(menu) {
    console.log(menu);
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