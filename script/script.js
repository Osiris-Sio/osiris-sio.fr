/*
Auteur :
  - Louis AMEDRO (alias Osiris Sio)

© 2026 Osiris Sio - Tous droits réservés.
*/

// Chargement du header et footer
function chargerHeaderEtFooter() {
  fetch('header.html')
    .then((response) => {
      if (!response.ok) throw new Error('Erreur HTTP ' + response.status);
      return response.text();
    })
    .then((data) => {
      const headerEl = document.getElementById('header');
      if (headerEl) {
        headerEl.innerHTML = data;
        initBurgerMenu();
        mettreEnValeurLienActif();
      }
    })
    .catch((err) => console.error('Impossible de charger header.html :', err));

  fetch('footer.html')
    .then((response) => {
      if (!response.ok) throw new Error('Erreur HTTP ' + response.status);
      return response.text();
    })
    .then((data) => {
      const footerEl = document.getElementById('footer');
      if (footerEl) {
        footerEl.innerHTML = data;
      }
    })
    .catch((err) => console.error('Impossible de charger footer.html :', err));
}

// Mise en valeur du lien de la page courante dans la barre de navigation
function mettreEnValeurLienActif() {
  const pageCourante =
    window.location.pathname.split('/').pop() || 'index.html';
  const liens = document.querySelectorAll('.nav-liens a');
  liens.forEach((lien) => {
    const href = lien.getAttribute('href');
    if (
      href === pageCourante ||
      (pageCourante === '' && href === 'index.html')
    ) {
      lien.classList.add('actif');
    }
  });
}

// Lancement au chargement du DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', chargerHeaderEtFooter);
} else {
  chargerHeaderEtFooter();
}

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
      nav.classList.add('transition-ready');
      const isOpen = nav.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      if (isOpen) {
        document.body.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open');
      }
    });

    // Fermer le menu quand on clique sur un lien
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('transition-ready');
        nav.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      });
    });

    // Fermer le menu quand on clique sur le fond (backdrop)
    const backdrop = document.querySelector('.menu-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        nav.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
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

// Affichage de la confirmation visuelle de copie
function afficherConfirmationEmail() {
  const notif = document.getElementById('message-email-copie');
  if (!notif) return;
  notif.classList.add('show');
  setTimeout(() => notif.classList.remove('show'), 2500);
}

// Fallback si Clipboard API n'est pas supporté ou restreint
function fallbackCopierEmail(text) {
  const input = document.createElement('textarea');
  input.value = text;
  input.style.position = 'fixed';
  input.style.opacity = '0';
  document.body.appendChild(input);
  input.select();
  try {
    document.execCommand('copy');
    afficherConfirmationEmail();
  } catch (e) {
    window.prompt("Copiez l'adresse e-mail :", text);
  }
  document.body.removeChild(input);
}

// Fonction pour copier l'email dans le presse-papiers
function copierEmail() {
  const adresseEmail = 'louis.amedro@outlook.fr';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(adresseEmail)
      .then(() => afficherConfirmationEmail())
      .catch(() => fallbackCopierEmail(adresseEmail));
  } else {
    fallbackCopierEmail(adresseEmail);
  }
}
