import Swiper from './vendor/swiper';

export const coachesSlider = new Swiper('.swiper', {
  slidesPerView: 'auto',
  loop: true,

  navigation: {
    nextEl: '.coaches__wrapper .swiper-button-next',
    prevEl: '.coaches__wrapper .swiper-button-prev',
  },
});

export const reviewsSlider = new Swiper('.reviews__slider-wrapper', {
  slidesPerView: 1,
  spaceBetween: 40,

  navigation: {
    nextEl: '.reviews__content-wrapper .swiper-button-next',
    prevEl: '.reviews__content-wrapper .swiper-button-prev',
  },
});
