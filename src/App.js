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

//Mains Functions

function imageSlider(e) {

  if(!isKeyValid(e.code) && e.type !== 'click') {
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
  if(!isKeyValid(e.code) && e.type !== 'click') { 
    return false;
  }

  const thumbnailImageName = e.target.getAttribute('src');

  const pageWrapper = document.querySelector('.wrapper');

  pageWrapper.style.backgroundColor = backgroundColors[thumbnailImageName];

  if(e.type === 'click') {
    e.target.blur();
  }
}

function setPositionMarker(e) {
  const marker = document.querySelector('.navbar #marker');
  const elementOffsetWidth = e.target.offsetWidth;
  const elementOffsetLeft = e.target.offsetLeft;

  marker.style.width = elementOffsetWidth + 'px';
  marker.style.left = elementOffsetLeft + 'px';
}

//Helpers

function isKeyValid(key) {
  const validKeys = new Set;
  validKeys.add('Enter');

  return validKeys.has(key);
}

function addEventListeners() {
  const thumbnails = document.querySelectorAll('.thumbnails img');
  const navLinks = document.querySelectorAll('.navbar a')

  for(let i = 0; i < thumbnails.length; i ++) {
    const thumbnail = thumbnails[i];
    thumbnail.addEventListener('click', imageSlider);
    thumbnail.addEventListener('click', changeBackgroundColor);

    thumbnail.addEventListener('keyup', imageSlider);
    thumbnail.addEventListener('keyup', changeBackgroundColor);
  }

  for(let i = 0; i < navLinks.length; i++) {
    const navLink = navLinks[i];
    navLink.addEventListener('focus', setPositionMarker);
  }
}

//Initialize App

addEventListeners();
