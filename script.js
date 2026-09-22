const scene = document.querySelector('.scene');
let bouquet = document.querySelector('#bouquet');
const fieldTemplate = document.querySelector('#field-flower-template');
const flowerField = document.querySelector('#flower-field');
const butterflyField = document.querySelector('#butterfly-field');
const sparkles = document.querySelector('#sparkles');
const sceneButtons = [...document.querySelectorAll('.scene-button')];
const sceneStatus = document.querySelector('#scene-status');
const captionIndex = document.querySelector('.caption-index');
const replayButton = document.querySelector('#replay');
const cursorLight = document.querySelector('.cursor-light');
const requestedScene = new URLSearchParams(window.location.search).get('scene');

const sceneCopy = {
  bouquet: { index: '00', text: 'Tu ramo está listo' },
  field: { index: '01', text: 'Un campo entero de luz' },
  butterflies: { index: '02', text: 'Mariposas entre las flores' },
  landscape: { index: '03', text: 'Todo florece al mismo tiempo' },
};

function buildField() {
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < 62; index += 1) {
    const node = fieldTemplate.content.firstElementChild.cloneNode(true);
    const depth = index / 61;
    node.style.setProperty('--left', `${Math.random() * 102 - 1}%`);
    node.style.setProperty('--bottom', `${Math.random() * 38 - 10}%`);
    node.style.setProperty('--scale', `${.38 + depth * .9 + Math.random() * .25}`);
    node.style.setProperty('--enter-delay', `${Math.random() * .75}s`);
    node.style.setProperty('--sway-time', `${3 + Math.random() * 2.4}s`);
    node.style.setProperty('--sway-delay', `${-Math.random() * 3}s`);
    fragment.appendChild(node);
  }
  flowerField.appendChild(fragment);
}

function buildButterflies() {
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < 14; index += 1) {
    const butterfly = document.createElement('span');
    butterfly.className = 'butterfly';
    butterfly.innerHTML = '<i class="wing wing-left"></i><i class="butterfly-body"></i><i class="wing wing-right"></i>';
    butterfly.style.setProperty('--left', `${8 + Math.random() * 83}%`);
    butterfly.style.setProperty('--top', `${12 + Math.random() * 59}%`);
    butterfly.style.setProperty('--scale', `${.55 + Math.random() * .85}`);
    butterfly.style.setProperty('--fly-time', `${5 + Math.random() * 4}s`);
    butterfly.style.setProperty('--fly-delay', `${-Math.random() * 5}s`);
    butterfly.style.setProperty('--appear-delay', `${Math.random() * .7}s`);
    fragment.appendChild(butterfly);
  }
  butterflyField.appendChild(fragment);
}

function buildSparkles() {
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < 28; index += 1) {
    const spark = document.createElement('span');
    spark.className = 'spark';
    spark.style.setProperty('--left', `${4 + Math.random() * 92}%`);
    spark.style.setProperty('--top', `${8 + Math.random() * 78}%`);
    spark.style.setProperty('--delay', `${-Math.random() * 2}s`);
    fragment.appendChild(spark);
  }
  sparkles.appendChild(fragment);
}

function finishIntro() {
  document.body.classList.remove('intro-running');
  document.body.classList.add('ready');
  setScene(sceneCopy[requestedScene] ? requestedScene : 'bouquet');
}

function setScene(mode) {
  scene.dataset.mode = mode;
  const copy = sceneCopy[mode];
  captionIndex.textContent = copy.index;
  sceneStatus.textContent = copy.text;
  sceneButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.scene === mode));
  });
}

function replayBouquet() {
  document.body.classList.remove('ready');
  document.body.classList.add('intro-running');
  setScene('bouquet');
  const freshBouquet = bouquet.cloneNode(true);
  bouquet.replaceWith(freshBouquet);
  bouquet = freshBouquet;
  sceneStatus.textContent = 'Armando tu ramo…';
  window.setTimeout(finishIntro, 5600);
}

sceneButtons.forEach((button) => {
  button.addEventListener('click', () => setScene(button.dataset.scene));
});

replayButton.addEventListener('click', replayBouquet);

window.addEventListener('pointermove', (event) => {
  cursorLight.style.left = `${event.clientX}px`;
  cursorLight.style.top = `${event.clientY}px`;
});

buildField();
buildButterflies();
buildSparkles();

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  finishIntro();
} else {
  window.setTimeout(finishIntro, 5600);
}

