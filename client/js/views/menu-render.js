const $menuList = document.querySelector('.menu-list');

function menuRender(data) {
  $menuList.innerHTML = data
    .map(
      (menu) => `<li id="${menu.id}" class="menu-item">
  <figure id="${menu.id}">
    <img id="${menu.id}" class="menu-img" src="${menu.imgUrl}">
    <figcaption id="${menu.id}" class="menu-title">${menu.menuName}</figcaption>
    <span class="menu-price">${menu.price}원</span>
  </figure>        
</li>`
    )
    .join('');
}

export default menuRender;
