import { playMode } from '../Game_mode';

export default class Card {
  constructor({
    word, translation, image, audio, category,
  }) {
    this.category = category;
    this.word = word;
    this.translation = translation;
    this.image = image;
    this.audio = audio;
    this.clicks = 0;
  }

  generateCard() {
    this.card = document.createElement('div');
    this.card.classList.add('card');

    this.cardWrapper = document.createElement('div');
    this.cardWrapper.classList.add('card__wrapper');
    this.card.append(this.cardWrapper);

    if (this.category) this.card.setAttribute('data-category', this.category);

    if (this.word !== 'milky way' && this.word !== 'ice skates') {
      this.card.setAttribute('data-name', this.word.replace(/\s+/g, '-').toLowerCase());
    } else {
      this.card.setAttribute('data-name', this.word.replace(/\s+/g, ' ').toLowerCase());
    }

    this.cardFrontSide = document.createElement('div');
    this.cardFrontSide.classList.add('card__side_front');

    this.cardBackSide = document.createElement('div');
    this.cardBackSide.classList.add('card__side_back');

    this.cardWrapper.append(this.cardFrontSide, this.cardBackSide);

    this.cardImage = document.createElement('img');
    this.cardImage.classList.add('card__img');
    this.cardImage.setAttribute('src', this.image);

    this.cardDescription = document.createElement('div');
    this.cardDescription.classList.add('card__description');

    this.cardFrontSide.append(this.cardImage, this.cardDescription);

    const cardWord = document.createElement('div');
    cardWord.classList.add('card__word');

    this.cardButton = document.createElement('button');
    if (this.category === 'main') {
      this.cardButton.classList.add('card__button_play');
    } else {
      this.cardButton.classList.add('card__button');
    }
    this.cardButton.style.backgroundImage = 'url(\'./src/assets/icons/refresh.svg\')';

    this.cardDescription.append(cardWord, this.cardButton);

    cardWord.innerHTML = this.word;

    const cardImageBack = document.createElement('img');
    cardImageBack.classList.add('card__img');
    cardImageBack.setAttribute('src', this.image);

    const cardDescriptionBack = document.createElement('div');
    cardDescriptionBack.classList.add('card__description');

    const cardTranslation = document.createElement('div');
    cardTranslation.classList.add('card__word');
    if (this.translation) cardTranslation.innerHTML = this.translation;

    cardDescriptionBack.append(cardTranslation);

    this.cardBackSide.append(cardImageBack, cardDescriptionBack);

    // Game mode
    if (playMode.isPlaying) {
      if (this.category !== 'main') {
        this.cardImage.classList.add('card__img_play');
        this.cardDescription.classList.add('card__description_play');
      }
    }

    this.addEventListenersToCard();
    return this.card;
  }

  addEventListenersToCard() {
    this.cardButton.addEventListener('click', () => {
      this.cardWrapper.classList.toggle('flip-card');
    });
    this.cardBackSide.addEventListener('mouseleave', () => {
      this.cardWrapper.classList.toggle('flip-card');
    });
    document.querySelector('.wrapper__main').addEventListener('mouseover', (e) => {
      if (!e.target.closest('.card__side_back')) {
        if (this.cardWrapper.classList.contains('flip-card')) {
          this.cardWrapper.classList.remove('flip-card');
        }
      }
    });
    this.cardFrontSide.addEventListener('click', (e) => {
      if (!e.target.classList.contains('card__button') && !playMode.isPlaying) this.playAudio();
      let nameOfCard = e.target.closest('.card');
      let name = nameOfCard.getAttribute('data-name');
      if(localStorage.getItem(name) !== 0) this.clicks = +(localStorage.getItem(name));
      this.clicks += 1;
      if (!playMode.isPlaying) localStorage.setItem(name, this.clicks);
    });
  }

  playAudio() {
    const audio = new Audio();
    if (this.audio) audio.src = this.audio;
    audio.load();
    audio.play();
  }
}
