
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navMenu = document.querySelector('.nav-menu');

  hamburgerMenu.addEventListener('click', () => {
    console.log("clicked")
    hamburgerMenu.classList.toggle('active'); // Toggle active class for animation
    navMenu.classList.toggle('show'); // Toggle the menu visibility
  });

  // Close the menu when a link is clicked
  navMenu.addEventListener('click', () => {
    hamburgerMenu.classList.remove('active');
    navMenu.classList.remove('show');
  });

  // Hero-action button when clicked scroll to services section
  const heroAction = document.querySelector('.hero-action');
  heroAction.addEventListener('click', () => {
    document.querySelector('#services').scrollIntoView({ behavior: 'smooth' });
  });
});

