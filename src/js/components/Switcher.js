const switchButton = document.querySelector('.switch-btn');

const whatIsTextButton = () => {
  if (switchButton.classList.contains('switch-on')) {
    switchButton.innerText = 'Train'.toUpperCase();
  } else {
    switchButton.innerText = 'Play'.toUpperCase();
  }
};

const switchedButton = () => {
  switchButton.addEventListener('click', () => {
    if(!switchButton.classList.contains('switch-on')) {
      switchButton.classList.add('switch-on');
    } else {
      switchButton.classList.remove('switch-on');  
    }
    whatIsTextButton();
  });
};

export default switchedButton;

