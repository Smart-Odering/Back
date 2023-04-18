import model from '../model/model';
import menuRender from '../views/menu-render';
import menuModalRender from '../views/menu-render';

// DOM
const $menuList = document.querySelector('.menu-list');
const $modalContainer = document.querySelector('.menu-modal-container');

// Function
const getMenu = async (url, callback) => {
  try {
    const menu = await model.getMenu(url);

    callback(menu);
  } catch (e) {
    console.error(e);
  }
};

// EVENT
$menuList.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) return;
  $modalContainer.classList.toggle('active');
  getMenu(`/${model.state}/${e.target.id}`, menuModalRender); //
});

document.addEventListener('DOMContentLoaded', () => {
  getMenu(`/${model.state}`, menuRender); //
});
