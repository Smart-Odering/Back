"use strict";

var menu = null;

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
        res.forEach(element => {
            createMenuHtml(element);
        });
        var menuList = $(".menu-list");
        menuList.append()

        // if (res.success) {
        //     location.href = "/";
        // } else{
        //     if (res.err) return alert(res.err);
        //     alert(res.msg);
        // }
    })
    .catch((err) => {
        console.error(err);
    });
}

const createMenuHtml = function(menu) {
    console.log(menu);
}