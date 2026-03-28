const hamburger = document.getElementById('hamburgerBtn');

// Skapa mobilmeny med separat stäng-knapp
const mobileMenu = document.createElement('div');
mobileMenu.id = 'mobileMenu';
mobileMenu.innerHTML = `
  <button id="closeMobileMenu">✕</button>
  <a href="index.html">HOME</a>
  <a href="gallery.html">PROJECTS</a>
  <a href="atelier.html">ATELIER</a>
  <a href="about.html">ABOUT</a>
  <a href="contact.html">CONTACT</a>
`;
document.body.appendChild(mobileMenu);

const closeMenuBtn = document.getElementById('closeMobileMenu');
const spans = hamburger.querySelectorAll('span');

// Startfärg för hamburger
spans.forEach(span => span.style.background = 'black');
closeMenuBtn.style.color = 'white'; // Kryssets färg direkt, kommer vara vit

function openMenu() {
  mobileMenu.classList.add('open');
  hamburger.classList.add('active');
  hamburger.style.display = 'none'; // göm hamburgaren
  closeMenuBtn.style.display = 'block'; // visa kryss
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('active');
  hamburger.style.display = 'flex'; // visa hamburgare
  closeMenuBtn.style.display = 'none'; // göm kryss
}

// Event listeners
hamburger.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);

// Dölj kryssknapp från start
closeMenuBtn.style.display = 'none';

window.addEventListener('resize', () => {
    if (window.innerWidth >= 670) { // Desktop breakpoint
      mobileMenu.classList.remove('open'); // stäng mobilmeny
      hamburger.classList.remove('active'); // reset hamburger state
      hamburger.style.display = 'none'; // göm hamburger
      closeMenuBtn.style.display = 'none'; // göm kryss
      // Visa vanliga nav-länkar
      document.getElementById('navOptionsContainer').style.display = 'flex';
    } else {
      hamburger.style.display = 'flex'; // visa hamburger igen
      document.getElementById('navOptionsContainer').style.display = 'none'; // göm nav-länkar
    }
  });