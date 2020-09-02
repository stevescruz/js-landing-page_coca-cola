function isKeyValid(key) {
  const validKeys = new Set;
  validKeys.add('Enter');

  return validKeys.has(key);
}

function imageSlider(e) {

  console.log(e);
  console.log(typeof(e));

  if(!isKeyValid(e.code) && e.type !== 'click') {
    return false;
  }

  const imageAlt = {
    'assets/coke001.png': 'Classic Coca-Cola can',
    'assets/coke002.png': 'Diet Coca-Cola can',
    'assets/coke003.png': 'Coca-Cola Zero can',
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

  const backgroundColors = {
    'assets/coke001.png': 'var(--bg-primary-color)',
    'assets/coke002.png': 'var(--bg-secondary-color)',
    'assets/coke003.png': 'var(--bg-tertiary-color)',
  }

  const thumbnailImageName = e.target.getAttribute('src');
  document.body.style.backgroundColor = backgroundColors[thumbnailImageName];

  if(e.type === 'click') {
    e.target.blur();
  }
}

function addListeners() {
  const thumbnails = document.querySelectorAll('.thumbnails img');

  for(let i = 0; i < thumbnails.length; i ++) {
    const thumbnail = thumbnails[i];
    thumbnail.addEventListener('click', imageSlider);
    thumbnail.addEventListener('click', changeBackgroundColor);

    thumbnail.addEventListener('keyup', imageSlider);
    thumbnail.addEventListener('keyup', changeBackgroundColor);
  }
}

addListeners();
