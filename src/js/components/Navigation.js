import data from '../data/Cards_data';

const burger = document.querySelector('.hamburger');
const line = document.querySelector('.hamburger__line');
const nav = document.querySelector('.navigation');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');
const categories = data[0];

const generateNavigation = () => {
  categories.forEach((element) => {
    const category = document.createElement('li');
    const dataName = element.replace(/\s+/g, '-').toLowerCase();
    category.innerHTML = `<div class='ico ${dataName}'></div><a href=# data-name=${dataName} class='category'>${element}</a>`;
    if (element === 'Main') category.classList.add('active');
    nav.append(category);
  });
};

const slider = () => {
  nav.classList.toggle('navigation-active');
  burger.classList.toggle('hamburger-active');
  line.classList.toggle('hamburger__line_active');
  overlay.classList.toggle('overlay-active');
  body.classList.toggle('fixed-position');
};

const addEventListenersToNavigation = () => {
  burger.addEventListener('click', () => {
    slider();
  });
  overlay.addEventListener('click', () => {
    slider();
  });
  nav.addEventListener('click', (e) => {
    if (e.target.classList.contains('category')) {
      slider();
    }
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      slider();
    }
  });
  window.addEventListener('resize', () => {
    if (nav.classList.contains('navigation-active')) {
      slider();
    }
  });
};

export { addEventListenersToNavigation, generateNavigation };
