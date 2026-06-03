// Initialisation des filtres de projets
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons
        filterBtns.forEach((b) => b.classList.remove('active'));
        // Ajouter la classe active au bouton cliqué
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach((card) => {
          // Si le filtre est 'all' ou correspond à l'année de la carte ou si c'est un favori
          const matchYear = card.getAttribute('data-year') === filterValue;
          const matchFeatured =
            filterValue === 'featured' &&
            card.getAttribute('data-featured') === 'true';

          if (filterValue === 'all' || matchYear || matchFeatured) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300); // 300ms correspond à la transition CSS
          }
        });
      });
    });
  }
});
