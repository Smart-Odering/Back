"use strict";

$(".menu-item").click(function(){
    console.log(this);
    $("#modal-img").attr("src", $(`#${this.id} .menu-img`).attr("src"));
    $(".menu-modal-container").addClass("active");
});

//모달 취소 누를시
$(".modal-item .btn-close").click(function(){
    $(".menu-modal-container").removeClass("active");
});

