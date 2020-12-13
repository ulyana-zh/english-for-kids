import { cardsData, addCardsToDom, refreshField } from './Generate_field';

const playMode = {
  isPlaying: false,
  startGame: false,
  wordsArray: [],
  audioArray: [],
  clickedCard: null,
  currentCard: null,
  mistakes: 0,
  clicks: 0, 
  wrongClicks: 0,
  timer: null,
  error: './src/assets/audio/error.mp3',
  correct: './src/assets/audio/correct.mp3',
  success: './src/assets/audio/success.mp3',
  failure: './src/assets/audio/failure.mp3',
};

let {
  wordsArray, audioArray, clickedCard, currentCard, mistakes, clicks, wrongClicks, timer,
} = playMode;

const {
  error, correct, success, failure,
} = playMode;

const switchButton = document.querySelector('.switch-btn');
const playButton = document.querySelector('.play-btn');
const repeatButton = document.querySelector('.repeat');
const body = document.querySelector('body');
const points = document.querySelector('.points');
const overlay = document.querySelector('.overlay_result');
const categoryName = document.querySelector('.category-name');
const resultImage = document.querySelector('.result__img');
const resultMessage = document.querySelector('.result__text');

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const playAudio = (audioSrc) => {
  const audio = new Audio();
  audio.src = audioSrc;
  if (audio) audio.load();
  if (audio)audio.play();
};

const createWordsArray = () => {
  cardsData.array.forEach((card) => {
    wordsArray.push(card.word);
  });
  return wordsArray;
};

const createAudioArray = () => {
  cardsData.array.forEach((card) => {
    audioArray.push(card.audio);
  });
  return audioArray;
};

const setTargetCard = () => {
  document.querySelector('.wrapper__main').addEventListener('click', (e) => {
    if (!e.target.classList.contains('wrapper')) {
      clickedCard = e.target.closest('.card');
    }
  });
  return clickedCard;
};

const clearArrays = () => {
  wordsArray = [];
  audioArray = [];
};

const shiftArrays = () => {
  wordsArray.shift();
  audioArray.shift();
};

const starGame = () => {
  shuffleArray(cardsData.array);
  clearArrays();
  wordsArray = createWordsArray();
  audioArray = createAudioArray();
  playAudio(audioArray[0]);
};

const stopPlaying = () => {
  playMode.startGame = false;
  clearTimeout(timer);
};

const createRightStar = () => {
  const star = document.createElement('div');
  star.classList.add('star', 'star_right');
  points.append(star);
};

const createWrongStar = () => {
  const star = document.createElement('div');
  star.classList.add('star', 'star_wrong');
  points.append(star);
};

const clearScore = () => {
  points.innerHTML = '';
};

const showResultSuccess = () => {
  overlay.classList.add('overlay_result-active');
  body.classList.add('fixed-position');
  resultImage.classList.add('result__img_success');
  resultMessage.innerText = 'Congratulations!';
  playAudio(success);
};

const showResultFailure = () => {
  overlay.classList.add('overlay_result-active');
  body.classList.add('fixed-position');
  resultImage.classList.add('result__img_failure');
  let correctWord;
  if (mistakes === 1) {
    correctWord = 'mistake';
  } else {
    correctWord = 'mistakes'; 
  }
  resultMessage.innerText = `Oops! You have ${mistakes} ${correctWord}. Try again!`;
  playAudio(failure);
};

const deleteResult = () => {
  resultImage.classList.remove('result__img_success');
  resultImage.classList.remove('result__img_failure');
  overlay.classList.remove('overlay_result-active');
  clearScore();
  refreshField();
  stopPlaying();
  repeatButton.classList.remove('flex');
  body.classList.remove('fixed-position');
  categoryName.innerText = 'main'.toUpperCase();
  addCardsToDom('main');
};

const checkWord = () => {
  clickedCard = setTargetCard();
  document.querySelector('.wrapper__main').addEventListener('click', (e) => {
    if (e.target.classList.contains('wrapper__main')) return;
    if(clickedCard) currentCard = clickedCard.getAttribute('data-name');
    if (playMode.isPlaying && playMode.startGame && !cardsData.isStatsOn && wordsArray.length && audioArray.length) {
      if (currentCard === wordsArray[0]) {
        clickedCard.classList.add('card_disabled');
        createRightStar();
        shiftArrays();
        playAudio(correct);
        setTimeout(() => playAudio(audioArray[0]), 500);
        if(localStorage.getItem(`${currentCard}-right`) !== 0) clicks = +(localStorage.getItem(`${currentCard}-right`));
        clicks += 1;
        localStorage.setItem(`${currentCard}-right`, clicks);
      } else {
        createWrongStar();
        playAudio(error);
        mistakes += 1;
        if(localStorage.getItem(`${currentCard}-wrong`) !== 0) wrongClicks = +(localStorage.getItem(`${currentCard}-wrong`));
        wrongClicks +=1;
        localStorage.setItem(`${currentCard}-wrong`, wrongClicks);
      }
      if (!wordsArray.length) {
        if (!mistakes) {
          showResultSuccess();
          setTimeout(() => deleteResult(), 5000);
        } else {
          showResultFailure();
          setTimeout(() => deleteResult(), 5000);
        }
      }
    }
  });
};

const setTimeoutToPlayMode = () => {
  timer = setTimeout(checkWord);
};

switchButton.addEventListener('click', () => {
  playMode.isPlaying = !playMode.isPlaying;
  stopPlaying();
  clearScore();
  body.classList.toggle('play-mode');
  const card = document.querySelector('[data-category="main"]');
  if (switchButton.classList.contains('switch-on') && !card) {
    playButton.classList.add('flex');
  } else {
    playButton.classList.remove('flex');
  }
  repeatButton.classList.remove('flex');

  document.querySelectorAll('.card__img').forEach((elem) => {
    if (!elem.closest('[data-category="main"]') && elem.closest('.card__side_front')) {
      elem.classList.toggle('card__img_play');
    }
  });
  document.querySelectorAll('.card__description').forEach((elem) => {
    if (!elem.closest('[data-category="main"]') && elem.closest('.card__side_front')) {
      elem.classList.toggle('card__description_play');
    }
  });
  document.querySelectorAll('.card').forEach((elem) => {
    if (elem.classList.contains('card_disabled')) {
      elem.classList.remove('card_disabled');
    }
  });
});

playButton.addEventListener('click', () => {
  starGame();
  playButton.classList.remove('flex');
  repeatButton.classList.add('flex');
  if (wordsArray.length && audioArray.length) {
    stopPlaying();
    playMode.startGame = true;
    mistakes = 0;
  }
});

repeatButton.addEventListener('click', () => {
  playAudio(audioArray[0]);
});

export { playMode, setTimeoutToPlayMode, clearScore };
