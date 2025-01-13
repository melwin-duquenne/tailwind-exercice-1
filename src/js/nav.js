// Gestion du menu burger
const burgerMenu = document.getElementById('burger-menu');
const menu = document.getElementById('menu');

burgerMenu.addEventListener('click', () => {
  // Basculer les classes hidden/block pour afficher ou cacher le menu
  menu.classList.toggle('hidden');
});

const openModalButton = document.getElementById('openModalButton');
const closeModalButton = document.getElementById('closeModalButton');
const modal = document.getElementById('myModal');

// Ouvrir la modal
openModalButton.addEventListener('click', () => {
  modal.classList.remove('hidden');  // Supprimer la classe "hidden" pour afficher la modal
});

// Fermer la modal
closeModalButton.addEventListener('click', () => {
  modal.classList.add('hidden');  // Ajouter la classe "hidden" pour cacher la modal
});

// Fermer la modal si l'utilisateur clique en dehors de la modal
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.add('hidden');
  }
});


// progresse bar 

document.addEventListener("DOMContentLoaded", () => {
  const progressBars = document.querySelectorAll(".progress-bar");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute("data-width");
        bar.style.width = width;
        observer.unobserve(bar); // Stop observing once animated
      }
    });
  }, {
    threshold: 0.1 // Trigger when 10% of the element is visible
  });

  progressBars.forEach(bar => {
    observer.observe(bar);
  });
});
      