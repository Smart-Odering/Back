const $orderList = document.querySelector('.order-list');

var _list = [];

const render = (list) => {
    let orderHtml = '';
    let payHtml = '';
  
    _list = list;
    
    console.log(list[0])
    console.log(list[1])
  
    // _list.forEach(({menuname, totalprice }) => {
      orderHtml += `<li class="order-item">
      <i class="remove-item far fa-times-circle"></i>
      <span class="item-name">${list[0]}</span>
      <span class="item-price">${list[1]}원</span>
      </li>`;
    // });

    $orderList.innerHTML = orderHtml;
};


export default render;