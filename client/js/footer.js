//Footer 랜더 식별자
const $orderList = document.querySelector('.order-list');
const $orderBtn = document.querySelector('.order-btn');
const $deleteAllItems = document.querySelector('.delete-all-items');

//결제내역 랜더 식별자
const $payList = document.querySelector('.pay-list');
const $totalItemNum = document.querySelector('.total-item-num');
const $totalItemPrice = document.querySelector('.total-item-price');


export var _list = [];

//주문 내역 렌더링
const render = (list) => {
    let orderHtml = '';
    let payHtml = '';
  
    _list = list;
    
    console.log(list[0])
    console.log(list[1])
  
    if (_list.length) {
      orderHtml = `<li class="order-item">
      <i class="remove-item far fa-times-circle"></i>
      <span class="item-name">${list[0]}</span>
      <span class="item-price">${list[1]}원</span>
      </li>`;

      payHtml = `<li class="pay-item">
      <span class="item-name">${list[0]}</span>
      <span class="item-price">${list[1]}원</span>
      </li>`;

      $orderList.innerHTML += orderHtml;
      $payList.innerHTML += payHtml;
      calculateTotal();
      payModalUpdate();
    } else {
      $orderList.innerHTML = orderHtml;
      $payList.innerHTML = payHtml;
      calculateTotal();
    }
    changeButtonColor();
    console.log('장바구니', _list);
};

// 주문 목록에 item 하나 이상 있을 시 결제하기 버튼과 전체삭제 버튼 활성화(=색상 변경)
const changeButtonColor = () => {
  if ($('.order-item').length) {
    $orderBtn.classList.replace('order-btn-invalid', 'order-btn-valid');
    $(".delete-all-items").css("background","tomato")
  } else {
    $orderBtn.classList.replace('order-btn-valid', 'order-btn-invalid');
    $(".delete-all-items").css("background","#645c5c")
  }
};

// 전체 삭제 버튼 클릭 시 주문 목록 초기화
const deleteAllItems = () => {
  if (!_list.length) return;
  _list = [];
  render(_list);
};

//주문 총합 금액 계산
function calculateTotal() {
  var total = 0;
  $('.item-price').each(function() {
      var price = Number($(this).text().replace(/[^0-9.-]+/g,"")) / 2;
      total += price;
  });
  $('.total-price').text(total + '원');

  if(total == 0){
    $('.total-price').text('');
  }
}

//주문 총합 금액 계산
function payModalUpdate() {
  $totalItemNum.textContent = $('.order-item').length + '개';
  $totalItemPrice.textContent = $('.total-price').text();
}

//매뉴 선택 삭제
$orderList.onclick = (e) => {
  if (!e.target.classList.contains('remove-item')) return;
  $(".remove-item").click(function(){
    //$(this).closest('.order-item').remove();
    var parent = $(this).closest('.order-item');
    var itemName = parent.find('.item-name').text();
    var itemPrice = parent.find('.item-price').text();

    // 결제 내역 중 item-name과 item-price가 동일한 메뉴도 삭제
    $(".pay-item").each(function() {
      var payItemName = $(this).find('.item-name').text();
      var payItemPrice = $(this).find('.item-price').text();

      if(payItemName === itemName && payItemPrice === itemPrice) {
        $(this).remove();
        return false;
      }
    });
    parent.remove();
  });
  calculateTotal();
  changeButtonColor();
  payModalUpdate();
};

//메뉴 전체삭제
$deleteAllItems.onclick = () => {
  deleteAllItems();
};


export default render;