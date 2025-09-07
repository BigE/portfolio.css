document.addEventListener("DOMContentLoaded", function (event) {
  var body = document.body,
      menu_ul = document.getElementById('menu').querySelector('ul'),
      menu_items = document.body.querySelectorAll('#menu .pure-menu-item'),
      clicked = false,
      WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange':'resize';

  function clearActive() {
    menu_items.forEach(function (element, i, a) {
        element.classList.remove('pure-menu-active', 'active');
    });
  }

  function closeMenu() {
    if (body.classList.contains('header-visible')) {
        toggleMenu();
    }
  }

  function toggleMenu() {
    body.classList.toggle('header-visible');
    menu_ul.classList.toggle('pure-menu-horizontal');
  }

  document.getElementById('menuToggle').addEventListener('click', function (event) {
    toggleMenu();
    event.preventDefault();
  });

  document.getElementById('content').addEventListener('click', function (event) {
    if (body.classList.contains('header-visible')) {
      toggleMenu();
      event.preventDefault();
    }
  });

  window.addEventListener('scroll', function () {
    if (clicked) return;

    var elem = (document.scrollingElement || document.documentElement),
        top = elem.scrollTop,
        elements = Array.prototype.slice.call(document.getElementsByClassName('section')).reverse();

    if (elem.scrollTop > 200)
      document.getElementById('backToTop').classList.add('visible');
    else
      document.getElementById('backToTop').classList.remove('visible');

    clearActive();
    for (var i = 0; i < elements.length; i++) {
      if (top >= (elements[i].offsetTop - 200) && elem.scrollTop > 0) {
        menu_items.forEach(function (item, x, aa) {
          if (item.querySelector('.pure-menu-link').getAttribute('href').replace(/.*#/, '') === elements[i].id) {
            item.classList.add('pure-menu-active', 'active');
          }
        });
        break;
      }
    }
  });
  window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);
});
