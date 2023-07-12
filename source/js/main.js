import {Form} from './modules/form-validate/form';

const video = document.querySelector('.video-player__video');
const videoButton = document.querySelector('.video-player__play-button');
const tabsButtonList = document.querySelector('.subscription__list');
const initiallyActiveButton = tabsButtonList.querySelector('.subscription__button--active');
const tabIndicatorFill = document.querySelector('.subscription__indicator-fill');
const tabsBlock = document.querySelector('.subscription__wrapper');
const tabClickableArea = document.querySelector('.faq__tabs-item');
const tabsList = document.querySelector('.faq__tabs-list');
const toggleTabsList = document.querySelector('.faq__buttons-list');
const tabsGroupList = document.querySelectorAll('.faq__tabs-list');
const tabsWrapper = document.querySelector('.faq__tabs-wrapper');
const formMainPage = document.querySelector('.free-visit__form');
const formSubmit = document.querySelector('.free-visit__form button[type="submit"]');

const handleTabButtonClick = (clickedButton) => {
  const tabsType = clickedButton.dataset.tabGroupButton;
  const currentActiveButton = toggleTabsList.querySelector('.is-active');
  const currentActiveTabGroup = tabsWrapper.querySelector('.is-shown');

  currentActiveButton.classList.remove('is-active');
  currentActiveTabGroup.classList.remove('is-shown');
  clickedButton.classList.add('is-active');
  for (let i = 0; i < tabsGroupList.length + 1; i++) {
    if (tabsGroupList[i].dataset.tabGroupName === tabsType) {
      tabsGroupList[i].classList.add('is-shown');
      break;
    }
  }
};

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

if (tabClickableArea && tabsList && toggleTabsList && tabsGroupList) {
  handleTabButtonClick(document.querySelector('[data-tab-group-button="gym"]'));

  tabsWrapper.addEventListener('click', (evt) => {
    const tabElement = evt.target.closest('[data-tab-item="tab"]');
    if (tabElement) {
      const clickedTabButton = tabElement.querySelector('[data-tab-item="button"]');

      clickedTabButton.classList.toggle('tab-button--active');
      tabElement.classList.toggle('is-active');
    }
  });

  toggleTabsList.addEventListener('click', (evt) => {
    if (evt.target.hasAttribute('data-tab-group-button') && !evt.target.classList.contains('is-active')) {
      handleTabButtonClick(evt.target);
    }
  });
}

const form = new Form();
form.init();
window.form = form;

if (formSubmit && formMainPage) {
  formMainPage.addEventListener('submit', (evt) => {
    evt.preventDefault();
    formMainPage.reset().submit();
  });
}
