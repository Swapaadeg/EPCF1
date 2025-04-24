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

let visibleCards = 3;
let index = visibleCards;
let cards;

function getCardHeight() {
  const card = document.querySelector('.carousel .card');
  return card ? card.offsetHeight + 20 : 240;
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
  resetToIndex(visibleCards);
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

//menu burger 

const burger = document.getElementById('burger');
const navbar = document.getElementById('navbar');

burger.addEventListener('click', () => {
  navbar.classList.toggle('open');
});
