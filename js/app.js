/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll('section');
const header = document.querySelector('.page__header');
const navbar = document.getElementById('navbar__list');
const scrollToTopButton = document.getElementById('scrollToTopButton');
const pageFold = window.innerHeight;
let navigationAnchors = [];
let headerHideTimeout;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function hideHeader() {
  header.classList.add('page__header--hidden');
}

function showHeader() {
  header.classList.remove('page__header--hidden');
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildMenu() {
  const navFragment = document.createDocumentFragment()

  for (section of sections) {
    const listItem = document.createElement('li');
    const anchor = document.createElement('a');
    navigationAnchors.push(anchor);

    anchor.setAttribute('scroll-to', section.id);

    anchor.textContent = section.getAttribute('data-nav');
    anchor.classList.add('menu__link');

    anchor.addEventListener('click', scrollToElement);

    listItem.appendChild(anchor);
    navFragment.appendChild(listItem);
  }

  navbar.appendChild(navFragment);
}

// Adds the class your-active-class to the currently active section
// and the class navbar__menu--active to the corresponding navigation link.
// It removes both classes from all other sections and navigation links
function setActiveClass() {
  for (section of sections) {
    const rect = section.getBoundingClientRect();

    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      const navItem = document.querySelector(`a[scroll-to="${section.id}"]`);

      for (anchor of navigationAnchors) {
        anchor.classList.remove('navbar__menu--active');
      }

      navItem.classList.add('navbar__menu--active');
      section.classList.add('your-active-class');
      continue;
    }
    else {
      section.classList.remove('your-active-class');
    }
  }
}

// Scroll to anchor ID using scrollTO event`
function scrollToElement(event) {
  document.getElementById(event.target.getAttribute('scroll-to')).scrollIntoView({ behavior: "smooth" });
}

// Shows and hides the navigation menu depending on whether the user is scrolling or not.
// It uses a timer to hide the menu after a certain amount of time.
function controlVisibilityOfMenu() {
  window.clearTimeout(headerHideTimeout);
  headerHideTimeout = setTimeout(hideHeader, 1000);
  showHeader();
}

// Shows and hides the scroll-to-top button depending on whether the user
// has scrolled past the height of the viewport.
function controlVisibilityOfToTopButton() {
  if (window.pageYOffset > pageFold) {
    scrollToTopButton.classList.add('show');
  } else {
    scrollToTopButton.classList.remove('show');
  }
}


function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
// Scroll to section on link click
window.addEventListener('DOMContentLoaded', buildMenu)

// Set sections as active
window.addEventListener('scroll', setActiveClass);

// Show/Hide menu when scrolling/idle
window.addEventListener('scroll', controlVisibilityOfMenu);

// Control visibility of scroll to top button
window.addEventListener('scroll', controlVisibilityOfToTopButton);

// Scroll to top on button click
scrollToTopButton.addEventListener('click', scrollToTop);