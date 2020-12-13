import data from './data/Cards_data';
import Table from './components/Table';
import Card from './components/Card';
import { cardsData } from './Generate_field';
import { playMode } from './Game_mode';

const generateRows = (wordsData) => {
  const rows = [];
  wordsData.forEach((row) => {
    rows.push(new Table(row));
  });
  return rows;
};

const createArrayForTable = () => data.slice(2).flatMap((x) => x);
let dataForTable = createArrayForTable();

const wrapperMain  = document.querySelector('.wrapper__main');
const switchButton = document.querySelector('.switch-btn');
const statsButton = document.querySelector('.stats-btn');
const title = document.querySelector('.category-name');
const buttons = document.querySelector('.points');
const resetButton = document.createElement('div');
resetButton.innerText = 'Reset';
resetButton.classList.add('stats-btn', 'reset-btn');
const repeatWordsButton = document.createElement('div');
repeatWordsButton.innerText = 'Repeat difficult words';
repeatWordsButton.classList.add('stats-btn', 'repeat-words-btn');

const generateTable = () => {
  const table = new Table(dataForTable);
  const head = table.generateHeadOfTheTable();
  const main = document.createElement('div');
  main.classList.add('table');
  wrapperMain.append(main);
  main.append(head);
  const body = document.createElement('tbody');
  head.append(body);
  return body;
};

const addRowsToDom = (table) => {
  generateRows(dataForTable).forEach((row) => {
    table.append(row.generateRow());
  });
};

const deleteTable = () => {
  const tableBody = document.querySelector('tbody');
  tableBody.innerHTML = '';
};

const changeIconToAscendingSort = (icon) => {
  icon.classList.remove('sort-arrow-down');
  icon.classList.add('sort-arrow-up');
}

const changeIconToDescendingSort = (icon) => {
  icon.classList.remove('sort-arrow-up');
  icon.classList.add('sort-arrow-down');
}

const addEventListener = (table) => {
  dataForTable = generateRows(dataForTable);
  document.querySelector('tr').addEventListener('click', (e) => { 
    const icons = document.querySelectorAll('.sort-icon');
    icons.forEach(icon => {
      icon.classList.remove('sort-arrow-down', 'sort-arrow-up');
    })
    let icon = e.target.children[0];
    switch (e.target.innerText) {
      case 'Categories':
        e.target.classList.toggle('sort');
        deleteTable();
        if (e.target.classList.contains('sort')) {
          dataForTable.sort((a, b) => a.category.localeCompare(b.category));
          changeIconToAscendingSort(icon);
        } else {
          dataForTable.sort((a, b) => b.category.localeCompare(a.category));
          changeIconToDescendingSort(icon);
        }
        addRowsToDom(table);
        break;
      case 'Words':
        e.target.classList.toggle('sort');
        deleteTable();
        if (e.target.classList.contains('sort')) {
          dataForTable.sort((a, b) => a.word.localeCompare(b.word));
          changeIconToAscendingSort(icon);
        } else {
          dataForTable.sort((a, b) => b.word.localeCompare(a.word));
          changeIconToDescendingSort(icon);
        }
        addRowsToDom(table);
        break;
      case 'Translation':
        e.target.classList.toggle('sort');
        deleteTable();
        if (e.target.classList.contains('sort')) {
          dataForTable.sort((a, b) => a.translation.localeCompare(b.translation));
          changeIconToAscendingSort(icon);
        } else {
          dataForTable.sort((a, b) => b.translation.localeCompare(a.translation));
          changeIconToDescendingSort(icon);
        }
        addRowsToDom(table);
        break;
      case 'Trained':
        e.target.classList.toggle('sort');
        deleteTable();
        if (e.target.classList.contains('sort')) {
          console.log(dataForTable)
          dataForTable.sort((a, b) => a.trained - b.trained);
          changeIconToAscendingSort(icon);
        } else {
          dataForTable.sort((a, b) => b.trained - a.trained);
          changeIconToDescendingSort(icon);
        }
        addRowsToDom(table);
        break;
      case 'Correct':
        e.target.classList.toggle('sort');
        deleteTable();
        if (e.target.classList.contains('sort')) {
          dataForTable.sort((a, b) => a.correct - b.correct);
          changeIconToAscendingSort(icon);
        } else {
          dataForTable.sort((a, b) => b.correct - a.correct);
          changeIconToDescendingSort(icon);
        }
        addRowsToDom(table);
        break;
      case 'Incorrect':
        e.target.classList.toggle('sort');
        deleteTable();
        if (e.target.classList.contains('sort')) {
          dataForTable.sort((a, b) => a.incorrect - b.incorrect);
          changeIconToAscendingSort(icon);
        } else {
          dataForTable.sort((a, b) => b.incorrect - a.incorrect);
          changeIconToDescendingSort(icon);
        }
        addRowsToDom(table);
        break;
      case '%':
        e.target.classList.toggle('sort');
        deleteTable();
        if (e.target.classList.contains('sort')) {
          dataForTable.sort((a, b) => a.percent - b.percent);
          changeIconToAscendingSort(icon);
        } else {
          dataForTable.sort((a, b) => b.percent - a.percent);
          changeIconToDescendingSort(icon);
        }
        addRowsToDom(table);
        break;
      default:
    }
  });
};

const addTableToDom = () => {
  const table = generateTable();
  addRowsToDom(table);
  addEventListener(table);
};

const filterDifficultWords = () => {
  let difWordsArray = [];
  difWordsArray = generateRows(dataForTable);
  difWordsArray = difWordsArray.filter((item) => item.percent > 0 && item.percent !== 100);
  difWordsArray.sort((a, b) => a.percent - b.percent);
  difWordsArray = difWordsArray.slice(0, 8);
  return difWordsArray;
};
const generateCards = (cardsDataArray) => {
  const cards = [];
  cardsDataArray.forEach((card) => {
    cards.push(new Card(card));
  });
  return cards;
};

const addCardsToDom = () => {
  cardsData.array = filterDifficultWords();
  generateCards(cardsData.array).forEach((card) => {
    wrapperMain.append(card.generateCard());
  });
  return cardsData.array;
};

const addEventListenerToStatsButtons = () => {
  statsButton.addEventListener('click', () => {
    buttons.innerHTML = '';
    wrapperMain.innerHTML = '';
    buttons.append(repeatWordsButton, resetButton);
    switchButton.classList.add('none');
    document.querySelector('.repeat').classList.remove('flex');
    document.querySelector('.play-btn').classList.remove('flex');
    addTableToDom();
  });

  resetButton.addEventListener('click', () => {
    localStorage.clear();
    wrapperMain.innerHTML = '';
    addTableToDom();
  });

  repeatWordsButton.addEventListener('click', () => {
    filterDifficultWords();
    wrapperMain.innerHTML = '';
    buttons.innerHTML = '';
    title.innerText = 'Repeat'.toUpperCase(); 
    document.querySelector('.switch-btn').classList.remove('none');
    if (switchButton.classList.contains('switch-on')) {
      playMode.isPlaying = false;
    } else {
      playMode.isPlaying = true;
      document.querySelector('.play-btn').classList.add('flex');
    }
    addCardsToDom();
  });
};

export default addEventListenerToStatsButtons;
