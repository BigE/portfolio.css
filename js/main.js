/**
 * Attach the menu toggle to an element
 *
 * @param {string} className Class to pass into the toggleMenu function
 * @param {string} menuToggleId Menu toggle element ID
 */
export function attachMenuToggle(className, menuToggleId) {
  document.getElementById(menuToggleId).addEventListener('click', (event) => {
    event.preventDefault();
    toggleMenu(className);
  });
}

/**
 * Clear any active className from the menu_items
 *
 * @param {HTMLLIElement[]} menu_items
 * @param {string} className
 */
export function clearActive(menu_items, className='active') {
  menu_items.forEach((element) => {
    element.classList.remove('pure-menu-active', className)
  });
}

/**
 * Close the menu by toggling the className
 *
 * @param {string} className
 */
export function closeMenu(className) {
  if (document.body.classList.contains(className)) {
    toggleMenu(className);
  }
}

/**
 * Make the "on page" navigation turn active on scroll
 *
 * @param {HTMLLIElement[]} menu_items Menu items to check against
 */
export function highlightNavigationOnScroll(menu_items, className='active') {
    const elem = (document.scrollingElement || document.documentElement),
          top = elem.scrollTop,
          elements = Array.prototype.slice.call(document.querySelectorAll('main > section[id]')).reverse();

    if (elem.scrollTop > 200)
      document.getElementById('backToTop').classList.add('visible');
    else
      document.getElementById('backToTop').classList.remove('visible');

    clearActive(menu_items, className);
    for (var i = 0; i < elements.length; i++) {
      if (top >= (elements[i].offsetTop - (window.innerHeight * 0.50)) && elem.scrollTop > 0) {
        menu_items.forEach(function (item, x, aa) {
          if (item.querySelector('.pure-menu-link').getAttribute('href').replace(/.*#/, '') === elements[i].id) {
            item.classList.add('pure-menu-active', className);
          }
        });
        break;
      }
    }
}

/**
 * Toggle the visibility of the menu
 *
 * @param {string} className Class to toggle on the body
 * @param {string} menuId Menu identifier to toggle pure-menu-horizontal
 * @param {number} breakpoint Breakpoint to stop toggling classes at
 */
export function toggleMenu(className, menuId, breakpoint=1024) {
  if (window.innerWidth >= breakpoint) return;
  document.body.classList.toggle(className);
  document.getElementById(menuId).querySelector("ul").classList.toggle("pure-menu-horizontal");
}

export function bindElements(event) {
  var body = document.body,
      menu_items = document.body.querySelectorAll('#menu .pure-menu-item'),
      WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange':'resize';

  document.getElementById('menuToggle').addEventListener('click', function (event) {
    toggleMenu('header-visible', 'menu');
    event.preventDefault();
  });

  document.getElementById('content').addEventListener('click', function (event) {
    if (body.classList.contains('header-visible')) {
      toggleMenu('header-visible', 'menu');
      event.preventDefault();
    }
  });

  document.getElementById('menu').querySelectorAll('.item .link').forEach(item => {
    item.addEventListener('click', closeMenu);
  });

  window.addEventListener('scroll', (_event) => highlightNavigationOnScroll(menu_items));
  window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);
}
