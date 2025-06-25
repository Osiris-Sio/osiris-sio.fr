fetch('/page/header.html')
.then(response => response.text())
.then(data => document.getElementById('header').innerHTML = data);
fetch('/page/footer.html')
.then(response => response.text())
.then(data => document.getElementById('footer').innerHTML = data);

window.addEventListener('scroll', function() {
    const header = document.querySelector('#menu');
    if (window.scrollY > 425) {
        header.classList.add('compact');
    } else {
        header.classList.remove('compact');
    }
});