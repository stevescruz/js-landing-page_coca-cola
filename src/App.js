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
  if(e.type !== 'click' && !isKeyValid(e.code)) {
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

  if(e.type === 'mouseenter') {
    document.activeElement.blur();
  }
}

function toggleMenu(e) {
  if(e.type !== 'click' && !isKeyValid(e.code)) {
    return false;
  }

  const hamburgerMenu = document.querySelector('.toggleMenu');
  const navigation = document.querySelector('.navbar')

  hamburgerMenu.classList.toggle('active');
  navigation.classList.toggle('active');
  
  hamburgerMenu.classList.add('rotate');

  setTimeout(() => {
    hamburgerMenu.classList.remove('rotate');
  }, 1000)

  toggleAnchorMenuEvent();
  e.target.blur();
}

//Helpers

// NOTE: toggleAnchorMenuEvent() is a hack to make my hamburger menu and slider
// menu work together in GitHub pages.
// 
// 1 - To properly work, my slider menu requires the page to not reload (href="#")
// The anchors in my hamburger menu reload the page to exit it (href="/")
// 2 - In GitHub Pages anchors with href="/" don't work as it redirects you
// to [username].github.io instead of [user_name].github.io/[repo_name].
// 
// If you are not using GitHub Pages AND not using the slider menu in conjunction
// with the hamburger menu remove toggleAnchorMenuEvent().

function toggleAnchorMenuEvent() {
  const hamburgerMenu = document.querySelector('.toggleMenu');
  const navLinks = document.querySelectorAll('.navbar a')

  const isMenuToggled = hamburgerMenu.classList.contains('toggleMenu');

  for(let i = 0; i < navLinks.length; i++) {
    const navLink = navLinks[i];

    if(isMenuToggled) {
      navLink.addEventListener('click', toggleMenu);
      navLink.addEventListener('keydown', (event) => {
        preventDefaultBehavior(event, event.code);
        toggleMenu(event);
      });
    } 
    else {
      navLink.removeEventListener('click', toggleMenu);
      navLink.removeEventListener('keydown', (event) => {
        preventDefaultBehavior(event, event.code);
        toggleMenu(event);
      });
    }
  }

  return;
}

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
  const hamburgerMenu = document.querySelector('.toggleMenu');
  const navLinks = document.querySelectorAll('.navbar a')
  const thumbnails = document.querySelectorAll('.thumbnails img');

  hamburgerMenu.addEventListener('click', toggleMenu);
  hamburgerMenu.addEventListener('keydown', (event) => {
    preventDefaultBehavior(event, event.code);
    toggleMenu(event);
  });

  for(let i = 0; i < navLinks.length; i++) {
    const navLink = navLinks[i];
    navLink.addEventListener('focus', setPositionNavMarker);
    navLink.addEventListener('mouseenter', setPositionNavMarker);
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
