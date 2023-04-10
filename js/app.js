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

/**
 * @description hides a header by applying hidden class to it
 */
function hideHeader() {
  header.classList.add('page__header--hidden');
}

/**
 * @description shows a header by removing hidden class to it
 */
function showHeader() {
  header.classList.remove('page__header--hidden');
}

/**
 * @description check if given element is in viewport
 * @param {Element} element - html element which will be checked
 * @returns {boolean} - value which tells whether given element is in viewport
 */
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

/**
 * @description dynamically builds navigation menu for sections. Adds scrolling on click to sections
 *     fills navigationAnchors array with created anchors.
 */
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

/**
 * @description adds css class your-active class to the currently active section
 *     Adds navbar__menu--active css class to the corresponding navigation link.
 *     Removes both css classes from all other sections and navigation links
 */
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

/**
 * @description scrolls to the element that is target of the event and contains 'scroll-to' attribute
 * @param {Event} event
 */
function scrollToElement(event) {
  document.getElementById(event.target.getAttribute('scroll-to')).scrollIntoView({ behavior: "smooth" });
}

/**
 * @description controls visibility of the scroll-to-top button.
 *     Shows it when users scrolls down at least one viewport height and hides it if scroll is higher than that.
 */
function controlVisibilityOfToTopButton() {
  if (window.pageYOffset > pageFold) {
    scrollToTopButton.classList.add('show');
  } else {
    scrollToTopButton.classList.remove('show');
  }
}

/**
 * @description smoothly scrolls to the top of the page
 */
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

// event for building section navigation menu on load. Each button has on an click event for scrolling to the section 
window.addEventListener('DOMContentLoaded', buildMenu)

// event for setting active class of section and item in navigation on scroll
window.addEventListener('scroll', setActiveClass);

// event for controlling visibility of the scroll-to-top button on scroll
window.addEventListener('scroll', controlVisibilityOfToTopButton);

// event for scrolling to the top of the page when scroll-to-top button is clicked
scrollToTopButton.addEventListener('click', scrollToTop);