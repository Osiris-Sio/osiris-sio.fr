fetch('header.html')
.then(response => response.text())
.then(data => {
    document.getElementById('header').innerHTML = data;
    initBurgerMenu();
});
fetch('footer.html')
.then(response => response.text())
.then(data => document.getElementById('footer').innerHTML = data);


// Gestion de la classe 'compact' sur le menu au scroll
window.addEventListener('scroll', function() {
  const header = document.querySelector('#menu');
  if (!header) return;
  if (window.scrollY > 425) {
    header.classList.add('compact');
  } else {
    header.classList.remove('compact');
  }
});

function initBurgerMenu() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.main-nav');
  if (burger && nav) {
    burger.addEventListener('click', function() {
      nav.classList.toggle('open');
      burger.classList.toggle('open');
      // Ajoute ou retire la classe menu-open sur le body
      if (nav.classList.contains('open')) {
        document.body.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open');
      }
    });
    // Fermer le menu quand on clique sur un lien
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        burger.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });
  }
}

// Flèche remonter en haut
document.addEventListener('DOMContentLoaded', function() {
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (!scrollBtn) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });

  scrollBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

function copierEmail() {
  const email = "osiris62100@hotmail.fr";
  navigator.clipboard.writeText(email).then(() => {
    const toast = document.getElementById("email-toast");
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
  });
}
