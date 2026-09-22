const glow = document.querySelector('.cursor-glow');
const petalField = document.querySelector('#petal-field');
const sparkButton = document.querySelector('#spark-button');
const shareButton = document.querySelector('#share-button');
const shareStatus = document.querySelector('#share-status');

window.addEventListener('pointermove', (event) => {
  if (!glow) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

function createPetal() {
  const petal = document.createElement('span');
  petal.className = 'falling-petal';
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.setProperty('--drift', `${(Math.random() - 0.5) * 220}px`);
  petal.style.setProperty('--fall-time', `${4 + Math.random() * 3}s`);
  petal.style.animationDelay = `${Math.random() * .8}s`;
  petal.style.transform = `scale(${.6 + Math.random() * .7}) rotate(${Math.random() * 180}deg)`;
  petalField.appendChild(petal);
  window.setTimeout(() => petal.remove(), 8000);
}

function bloom(count = 13) {
  if (!petalField) return;
  for (let index = 0; index < count; index += 1) {
    window.setTimeout(createPetal, index * 100);
  }
}

sparkButton?.addEventListener('click', () => {
  bloom(22);
  sparkButton.querySelector('span').textContent = '✹';
  window.setTimeout(() => { sparkButton.querySelector('span').textContent = '✦'; }, 900);
});

shareButton?.addEventListener('click', async () => {
  const shareData = {
    title: 'Flor Amarilla',
    text: 'Te comparto un poquito de sol 🌼',
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      shareStatus.textContent = 'Listo: el jardín ya está viajando ✦';
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      shareStatus.textContent = 'Enlace copiado. Ahora regala un poquito de sol ✦';
    } else {
      shareStatus.textContent = 'Copia este enlace y compártelo con alguien especial ✦';
    }
  } catch (error) {
    if (error.name !== 'AbortError') shareStatus.textContent = 'El jardín te espera cuando quieras ✦';
  }
});

window.setInterval(() => {
  if (document.visibilityState === 'visible') createPetal();
}, 5500);

