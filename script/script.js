window.addEventListener('scroll', function() {
    const header = document.querySelector('#menu');
    if (window.scrollY > 500) {
        header.classList.add('compact');
    } else {
        header.classList.remove('compact');
    }
});