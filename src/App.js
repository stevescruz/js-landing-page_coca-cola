//Constants Config
const imageAlt = {
  'assets/coke001.png': 'Classic Coca-Cola can',
  'assets/coke002.png': 'Diet Coca-Cola can',
  'assets/coke003.png': 'Coca-Cola Zero can',
}

const backgroundColors = {
  'assets/coke001.png': 'var(--bg-primary-color)',
  'assets/coke002.png': 'var(--bg-secondary-color)',
  'assets/coke003.png': 'var(--bg-tertiary-color)',
}

const validKeys = new Set;
validKeys.add('Enter');
validKeys.add('Space');

//Mains Functions

function imageSlider(e) {
  if(e.type !== 'click' && !isKeyValid(e.code)) {
    return false;
  }

  const thumbnailImageName = e.target.getAttribute('src');
  const images = document.getElementsByClassName('coke');

  for(let i = 0; i < images.length; i ++) {
    images[i].setAttribute('src', thumbnailImageName);
    images[i].setAttribute('alt', imageAlt[thumbnailImageName]);
  }

  if(e.type === 'click') {
    e.target.blur();
  } 
}

function changeBackgroundColor(e) {
  if(e.type !== 'click' && isKeyValid(e.code)) {
    return false;
  }

  const thumbnailImageName = e.target.getAttribute('src');

  const pageWrapper = document.querySelector('.wrapper');

  pageWrapper.style.backgroundColor = backgroundColors[thumbnailImageName];

  if(e.type === 'click') {
    e.target.blur();
  }
}

function setPositionNavMarker(e) {
  const marker = document.querySelector('.navbar #marker');
  const elementOffsetWidth = e.target.offsetWidth;
  const elementOffsetLeft = e.target.offsetLeft;

  marker.style.width = elementOffsetWidth + 'px';
  marker.style.left = elementOffsetLeft + 'px';
}

function toggleMenu(e) {
  if(e.type !== 'click' && !isKeyValid(e.code)) {
    return false;
  }

  const hamburguerMenu = document.querySelector('.toggleMenu');
  const navigation = document.querySelector('.navbar')

  hamburguerMenu.classList.toggle('active');
  navigation.classList.toggle('active');
  
  e.target.blur();
}

//Helpers

function isKeyValid(key) {
  return validKeys.has(key);
}

function preventDefaultBehavior(event, key) {
  const nodeName = event.target.nodeName;
  
  if(nodeName === "A" && key === "Space") {
    event.preventDefault();
  }
  else if(nodeName !== "BUTTON" && key === "Space") {
    event.preventDefault();
  }
  else if(nodeName !== "BUTTON" && key === "Enter") {
    event.preventDefault();
  }

  return;
}

function addEventListeners() {
  const hamburguerMenu = document.querySelector('.toggleMenu');
  const navLinks = document.querySelectorAll('.navbar a')
  const thumbnails = document.querySelectorAll('.thumbnails img');

  hamburguerMenu.addEventListener('click', toggleMenu);
  hamburguerMenu.addEventListener('keydown', (event) => {
    preventDefaultBehavior(event, event.code);
    toggleMenu(event);
  });

  for(let i = 0; i < navLinks.length; i++) {
    const navLink = navLinks[i];
    navLink.addEventListener('focus', setPositionNavMarker);
  }

  for(let i = 0; i < thumbnails.length; i ++) {
    const thumbnail = thumbnails[i];
    thumbnail.addEventListener('click', imageSlider);
    thumbnail.addEventListener('click', changeBackgroundColor);

    thumbnail.addEventListener('keydown', (event) => {
      preventDefaultBehavior(event, event.code);
      imageSlider(event);
    });
    thumbnail.addEventListener('keydown', (event) => {
      preventDefaultBehavior(event, event.code);
      changeBackgroundColor(event);
    });
  }
}

//Initialize App

addEventListeners();
