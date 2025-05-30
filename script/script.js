window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 30) {
        navbar.classList.add('compact');
    } else {
        navbar.classList.remove('compact');
    }
});