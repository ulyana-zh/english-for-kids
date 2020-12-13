import data from './data/Cards_data';
import Card from './components/Card';
import { playMode, clearScore } from './Game_mode';

const cardsData = {
  array: [],
  currentCard: null,
  isStatsOn: false,
};

const playButton = document.querySelector('.play-btn');
const switchButton = document.querySelector('.switch-btn');
const repeatButton = document.querySelector('.repeat');
const categoryName = document.querySelector('.category-name');
const stats = document.querySelector('.stats-btn');
categoryName.innerText = 'Main'.toUpperCase();

const generateCards = (cardsDataArray) => {
  const cards = [];
  cardsDataArray.forEach((card) => {
    cards.push(new Card(card));
  });
  return cards;
};

const filterCategories = (category) => data.flatMap((x) => x).filter((element) => element.category === category);

const refreshField = () => {
  const main = document.querySelector('.wrapper__main');
  main.innerHTML = '';
};

const addCardsToDom = (category) => {
  const main = document.querySelector('.wrapper__main');
  const currentCardsData = filterCategories(category);
  generateCards(currentCardsData).forEach((card) => {
    main.append(card.generateCard());
  });
  return currentCardsData;
};

const chooseCategory = () => {
  const nav = document.querySelector('.navigation');
  const main = document.querySelector('.wrapper__main');

  stats.addEventListener('click', () => {
    cardsData.isStatsOn = true;
  })

  nav.addEventListener('click', (e) => {
    if (switchButton.classList.contains('switch-on')) playMode.isPlaying = false;
    playMode.startGame = false;
    clearScore();
    const targetCategory = e.target.getAttribute('data-name');
    nav.childNodes.forEach((category) => {
      if (!e.target.classList.contains('navigation')) {
        if (category.innerText === e.target.innerText) {
          categoryName.innerText = e.target.innerText.toUpperCase();
          category.classList.add('active');
        } else {
          category.classList.remove('active');
        }
      }
    });

    if (targetCategory) {
      if (switchButton.classList.contains('switch-on')) playMode.isPlaying = false;
      switchButton.classList.remove('none');
      if (repeatButton && !switchButton.classList.contains('switch-on')) {
        if (targetCategory === 'main') {
          repeatButton.classList.remove('flex');
          playButton.classList.remove('flex');
        } else {
          repeatButton.classList.remove('flex');
          playButton.classList.add('flex');
        }
      }
      playMode.startGame = false;
      cardsData.isStatsOn = false;
      refreshField();
      cardsData.array = addCardsToDom(targetCategory);
    } return cardsData.array;
  });

  main.addEventListener('click', (e) => {
    if (!e.target.classList.contains('wrapper')) {
      const clickedCard = e.target.closest('.card');
      if (!cardsData.isStatsOn) cardsData.currentCard = clickedCard.getAttribute('data-name');
      if (clickedCard && clickedCard.getAttribute('data-category') === 'main') {
        if (cardsData.currentCard) {
          if (!switchButton.classList.contains('switch-on')) {
            playButton.classList.add('flex');
          }
          playMode.startGame = false;
          cardsData.isStatsOn = false;
          categoryName.innerText = cardsData.currentCard.toUpperCase().replace(/-/g, ' ');
          refreshField();
          cardsData.array = addCardsToDom(cardsData.currentCard);

          nav.childNodes.forEach((category) => {
            let currentCategory = category.innerText.replace(/\s+/g, '-').toLowerCase();
              if (currentCategory === cardsData.currentCard) {
                category.classList.add('active');
              } else {
                category.classList.remove('active');
              }
          });
      
        }
      }
    } return cardsData.array;
  });
};

export {
  generateCards, addCardsToDom, chooseCategory, refreshField, cardsData,
};
