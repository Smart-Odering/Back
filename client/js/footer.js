const $orderList = document.querySelector('.order-list');

var _list = [];

const render = (list) => {
    let orderHtml = '';
    let payHtml = '';
  
    _list = list;
    
    console.log(list)
    console.log(_list)
  
    _list.forEach(({menuname, totalprice }) => {
      orderHtml += `<li class="order-item">
      <i class="remove-item far fa-times-circle"></i>
      <span class="item-name">${menuname}</span>
      <span class="item-price">${totalprice}원</span>
      </li>`;
    });

    $orderList.innerHTML = orderHtml;
};


export default render;