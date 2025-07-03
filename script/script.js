fetch('/page/header.html')
.then(response => response.text())
.then(data => {
    document.getElementById('header').innerHTML = data;
    initBurgerMenu(); // Initialiser le menu burger après l'injection du header
});
fetch('/page/footer.html')
.then(response => response.text())
.then(data => document.getElementById('footer').innerHTML = data);

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
        });
        // Fermer le menu quand on clique sur un lien
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => nav.classList.remove('open'));
        });
    }
}