
// Get the hamburger menu and nav menu
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.nav-menu');

// Add click event to toggle menu visibility with transition
hamburgerMenu.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('active'); // Toggle active class for animation
  navMenu.classList.toggle('show'); // Toggle the menu visibility
});