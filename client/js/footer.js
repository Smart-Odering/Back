const $orderList = document.querySelector('.order-list');
const $orderBtn = document.querySelector('.order-btn');
const $deleteAllItems = document.querySelector('.delete-all-items');

var _list = [];

const render = (list) => {
    let orderHtml = '';
    let payHtml = '';
  
    _list = list;
    
    console.log(list[0])
    console.log(list[1])
  
    if (_list.length) {
      // _list.forEach(({menuname, totalprice }) => {
      orderHtml += `<li class="order-item">
      <i class="remove-item far fa-times-circle"></i>
      <span class="item-name">${list[0]}</span>
      <span class="item-price">${list[1]}원</span>
      </li>`;
      // });
      $orderList.innerHTML = orderHtml;
    } else {
      $orderList.innerHTML = orderHtml;
    }
    changeButtonColor();
    console.log('장바구니', _list);
};

$orderList.onclick = (e) => {
  if (!e.target.classList.contains('remove-item')) return;
  var emptylist = [];
  render(emptylist);
};

$deleteAllItems.onclick = () => {
  deleteAllItems();
};

// const removeItem = (emptylist) => {
//   model.menu = model.menu.filter((item) => item.id !== +id);
//   render(model.menu);
// };

const changeButtonColor = () => {
  if (_list.length) {
    $orderBtn.classList.replace('order-btn-invalid', 'order-btn-valid');
    $(".delete-all-items").css("background","tomato")
  } else {
    $orderBtn.classList.replace('order-btn-valid', 'order-btn-invalid');
    $(".delete-all-items").css("background","#645c5c")
  }
};

const deleteAllItems = () => {
  if (!_list.length) return;
  _list = [];
  render(_list);
};


export default render;