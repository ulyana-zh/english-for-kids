import { addEventListenersToNavigation, generateNavigation } from './components/Navigation';
import switchedButton from './components/Switcher';
import { addCardsToDom , chooseCategory  } from './Generate_field';
import { setTimeoutToPlayMode } from './Game_mode';
import addEventListenerToStatsButtons from './Generate_table';

window.onload = () => {
  addCardsToDom('main');
  generateNavigation();
  addEventListenersToNavigation();
  switchedButton();
  chooseCategory();
  setTimeoutToPlayMode();
  addEventListenerToStatsButtons();
};
