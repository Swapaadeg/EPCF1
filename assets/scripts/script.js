//Message formulaire
const formulaire = document.querySelector('#contactform');

formulaire.addEventListener('submit', function(e) {
e.preventDefault();

formulaire.reset();


const message = document.createElement('p');
message.textContent = "Message envoyé avec succès!";
message.style.color = '#7F5A83';
message.style.marginTop = '10px';

const bouton = formulaire.querySelector('#contactform .submit-btn');
bouton.parentNode.appendChild(message)
setTimeout(() => {
    message.remove();
  }, 3000);
});


//CAROUSSEL

const carousel = document.querySelector('.carousel');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let index = 0;
let visibleCards = 3;
let cards;

function getCardHeight() {
  const card = document.querySelector('.carousel .card');
  if (!card) return 240;
  const style = getComputedStyle(card);
  const marginBottom = parseFloat(style.marginBottom);
  return card.offsetHeight + marginBottom;
}

// Calcule dynamiquement la hauteur du wrapper pour éviter les cartes coupées
function setCarouselWrapperHeight() {
  const wrapper = document.querySelector('.carousel__wrapper');
  const card = document.querySelector('.carousel .card');
  if (wrapper && card) {
    const style = getComputedStyle(card);
    const marginBottom = parseFloat(style.marginBottom);
    const totalHeight = (card.offsetHeight + marginBottom) * visibleCards;
    wrapper.style.height = `${totalHeight}px`;
  }
}
function cloneCards() {
  cards = document.querySelectorAll('.carousel .card');
  const firstClones = [];
  const lastClones = [];

  for (let i = 0; i < visibleCards; i++) {
    firstClones.push(cards[i].cloneNode(true));
    lastClones.push(cards[cards.length - 1 - i].cloneNode(true));
  }

  firstClones.forEach(clone => carousel.appendChild(clone));
  lastClones.reverse().forEach(clone => carousel.prepend(clone));

  cards = document.querySelectorAll('.carousel .card');
}

function resetToIndex(newIndex) {
  const cardHeight = getCardHeight();
  carousel.style.transition = 'none';
  index = newIndex;
  carousel.style.transform = `translateY(-${index * cardHeight}px)`;
}

function moveToIndex() {
  const cardHeight = getCardHeight();
  carousel.style.transition = 'transform 0.4s ease';
  carousel.style.transform = `translateY(-${index * cardHeight}px)`;
}

function initCarousel() {
  cloneCards();
  setCarouselWrapperHeight(); // 🔥 Ajout essentiel
  index = visibleCards;
  resetToIndex(index);
}

nextBtn.addEventListener('click', () => {
  index++;
  moveToIndex();

  if (index === cards.length - visibleCards) {
    setTimeout(() => {
      resetToIndex(visibleCards);
    }, 400);
  }
});

prevBtn.addEventListener('click', () => {
  index--;
  moveToIndex();

  if (index === 0) {
    setTimeout(() => {
      resetToIndex(cards.length - visibleCards * 2);
    }, 400);
  }
});

initCarousel();

//MENU BURGER

const burger = document.getElementById('burger');
const dropdown = document.getElementById('menuDropdown');

burger.addEventListener('click', () => {
  dropdown.classList.toggle('open');
});


//CURSOR LIGHT FOR FUN
const cursorLight = document.querySelector('.cursor-light');

document.addEventListener('mousemove', (e) => {
  cursorLight.style.left = `${e.clientX}px`;
  cursorLight.style.top = `${e.clientY}px`;
});


//TARDIS
const tardisLink = document.getElementById('tardisScroll');
function updateTardisLink() {
  if (window.innerWidth <= 1000) {
    // MOBILE => scroll au header
    tardisLink.setAttribute('href', '#header__wrapper container');
    tardisLink.setAttribute('target', '_self');
  } else {
    // DESKTOP => redirection vers générique
    tardisLink.setAttribute('href', 'https://www.youtube.com/watch?v=vyPw25rYKFM&list=PLcWquS7QYEpQDoXYs0aKXn1J8MiIgobE5&index=1');
    tardisLink.setAttribute('target', '_blank');
  }
}
updateTardisLink();
window.addEventListener('resize', updateTardisLink);



//La navbar est active
const sections = document.querySelectorAll('section[id*="wrapper"]');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      if (link) link.classList.add('active');
    }
  });
}, {
  root: null,
  rootMargin: '0px',
  threshold: 0.6
});

sections.forEach(section => {
  observer.observe(section);
});