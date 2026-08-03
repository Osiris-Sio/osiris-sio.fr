/*
Auteur :
  - Louis AMEDRO (alias Osiris Sio)

© 2026 Osiris Sio - Tous droits réservés.
*/

// Chargement du header et footer
fetch('header.html')
  .then((response) => response.text())
  .then((data) => {
    const headerEl = document.getElementById('header');
    headerEl.innerHTML = data;
    initBurgerMenu();
  });
fetch('footer.html')
  .then((response) => response.text())
  .then((data) => {
    const footerEl = document.getElementById('footer');
    footerEl.innerHTML = data;
  });

// Gestion de la classe 'compact' sur le menu au scroll
window.addEventListener('scroll', function () {
  const header = document.querySelector('#menu');
  if (!header) return;
  if (window.scrollY > 425) {
    header.classList.add('compact');
  } else {
    header.classList.remove('compact');
  }
});

// Initialisation du menu burger
function initBurgerMenu() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.main-nav');
  if (burger && nav) {
    // Active l'animation seulement un peu après le chargement pour éviter le glissement initial
    setTimeout(() => {
      nav.classList.add('transition-ready');
    }, 100);

    burger.addEventListener('click', function () {
      nav.classList.add('transition-ready'); // S'assure que la transition est active
      nav.classList.toggle('open');
      burger.classList.toggle('open');
      // Ajoute ou retire la classe menu-open sur le body - Animation
      if (nav.classList.contains('open')) {
        document.body.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open');
      }
    });
    // Gestion du clic sur "Projets" pour le menu déroulant
    const dropdownToggle = nav.querySelector('.dropdown-toggle');
    if (dropdownToggle) {
      dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        dropdownToggle.parentElement.classList.toggle('open');
      });
    }

    // Fermer le menu quand on clique sur un lien (sauf le menu déroulant)
    nav.querySelectorAll('a').forEach((link) => {
      if (!link.classList.contains('dropdown-toggle')) {
        link.addEventListener('click', () => {
          nav.classList.remove('transition-ready'); // Désactive l'animation instantanément
          nav.classList.remove('open');
          burger.classList.remove('open');
          document.body.classList.remove('menu-open');
          // On peut aussi refermer le sous-menu
          if (dropdownToggle) {
            dropdownToggle.parentElement.classList.remove('open');
          }
        });
      }
    });

    // Fermer le menu quand on clique sur le fond (backdrop)
    const backdrop = document.querySelector('.menu-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        nav.classList.remove('open');
        burger.classList.remove('open');
        document.body.classList.remove('menu-open');
        if (dropdownToggle) {
          dropdownToggle.parentElement.classList.remove('open');
        }
      });
    }
  }
}

// Flèche remonter en haut
document.addEventListener('DOMContentLoaded', function () {
  const scrollBtn = document.getElementById('fleche-haut');
  if (!scrollBtn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });

  scrollBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Fonction pour copier l'email dans le presse-papiers
function copierEmail() {
  const email = 'louis.amedro@outlook.fr';
  navigator.clipboard.writeText(email).then(() => {
    const email = document.getElementById('message-email-copie');
    email.classList.add('show');
    setTimeout(() => email.classList.remove('show'), 2500);
  });
}
