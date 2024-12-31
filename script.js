
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navMenu = document.querySelector('.nav-menu');

  hamburgerMenu.addEventListener('click', () => {
    console.log("clicked")
    hamburgerMenu.classList.toggle('active'); // Toggle active class for animation
    navMenu.classList.toggle('show'); // Toggle the menu visibility
  });
});