"use strict";

import {menuname, price} from './home.js';
import footerRender from './footer.js';

export var totalprice = 0;
var state = 0;

function initialize() {
    totalprice = 0;
    state = 0;
    $(".btn-size-up").css("background","")
    $(".modal-price").css("color","black")
};

$(function(){
    //모달 취소 누를시
    $(".modal-item .btn-close").on("click",function(){
        $(".menu-modal-container").removeClass("active");
        initialize();
    });
    $(".btn-size-up").on("click",function(){
        if(state == 0){
            $(".btn-size-up").css("background","tomato")
            $(".modal-price").css("color","orangered")
            totalprice = Number(price) + 1000;
            document.querySelector('.modal-price').textContent = `${totalprice}원`;
            state = 1;
        }else if(state == 1){
            totalprice -= 1000;
            document.querySelector('.modal-price').textContent = `${totalprice}원`;
            initialize();
        }
    });
    $(".btn-order").on("click",function(){
        console.log(menuname)
        console.log(totalprice)
        if(totalprice == 0){
            totalprice = Number(price);
        }
        var selectmenu = [menuname, String(totalprice)];
        footerRender(selectmenu);
        $(".menu-modal-container").removeClass("active");
        initialize();
    });
});


