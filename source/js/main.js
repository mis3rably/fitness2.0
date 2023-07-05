import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
    const form = new Form();
    window.form = form;
    form.init();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)

const video = document.querySelector('.video-player__video');
const videoButton = document.querySelector('.video-player__play-button');
const tabsButtonList = document.querySelector('.subscription__list');
const initiallyActiveButton = tabsButtonList.querySelector('.subscription__button--active');
const tabIndicatorFill = document.querySelector('.subscription__indicator-fill');
const tabsBlock = document.querySelector('.subscription__wrapper');


if (video && videoButton) {
  video.removeAttribute('controls');
  videoButton.classList.remove('video-player__play-button--hidden');

  videoButton.addEventListener('click', () => {
    video.setAttribute('controls', '');
    videoButton.classList.add('video-player__play-button--hidden');
    video.play();
  });
}

if (tabsButtonList && tabIndicatorFill) {
  tabIndicatorFill.style.width = `${initiallyActiveButton.getBoundingClientRect().width}px`;
  tabIndicatorFill.style.left = `${initiallyActiveButton.offsetLeft}px`;

  tabsButtonList.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('subscription__button') && !evt.target.classList.contains('subscription__button--active')) {
      const tabId = evt.target.dataset.tabButton;
      const activeTabList = tabsBlock.querySelectorAll('.subscription-card__price-wrapper--active');
      const changedTabList = tabsBlock.querySelectorAll(`.subscription-card__price-wrapper[data-tab-content="${tabId}"]`);

      tabsButtonList.querySelector('.subscription__button--active').classList.remove('subscription__button--active');
      tabIndicatorFill.style.width = `${evt.target.getBoundingClientRect().width}px`;
      tabIndicatorFill.style.left = `${evt.target.offsetLeft}px`;
      evt.target.classList.add('subscription__button--active');
      activeTabList.forEach((el) => {
        el.classList.remove('subscription-card__price-wrapper--active');
      });
      changedTabList.forEach((el) => {
        el.classList.add('subscription-card__price-wrapper--active');
      });
    }
  });
}
