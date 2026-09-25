/*
Auteur :
  - Louis AMEDRO (alias Osiris Sio)

© 2026 Osiris Sio - Tous droits réservés.
*/

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

          const isVisible = filterValue === 'all' || matchYear || matchFeatured;
          card.classList.toggle('is-hidden', !isVisible);
        });
      });
    });
  }
});
