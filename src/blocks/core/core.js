window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  let tab = document.querySelectorAll('.img-item__link'),
    nav = document.querySelector('.img-list'),
    tabContent = document.querySelectorAll('.img-item__content');

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }
  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }
  nav.addEventListener('click', function (event) {
    let target = event.target;
    if (target && target.classList.contains('img-item__link')) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });
});