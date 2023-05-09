import {name, price} from './home.js'
"use strict";

var totalprice = Number(price);
var state = 0;

$(function(){
    //모달 취소 누를시
    $(".modal-item .btn-close").on("click",function(){
        $(".menu-modal-container").removeClass("active");
    });
    $(".btn-size-up").on("click",function(){
        if(state == 0){
            $(".btn-size-up").css("background","tomato")
            $(".modal-price").css("color","orangered")
            totalprice += 1000;
            document.querySelector('.modal-price').textContent = `${totalprice}원`;
            state = 1;
        }else if(state == 1){
            $(".btn-size-up").css("background","")
            $(".modal-price").css("color","black")
            totalprice -= 1000;
            document.querySelector('.modal-price').textContent = `${totalprice}원`;
            state = 0;
        }
    });
    $(".btn-order").on("click",function(){
        $(".modal-title").val();
        console.log($(".modal-title").val())
        console.log(name)
        console.log(price)
    });
});


