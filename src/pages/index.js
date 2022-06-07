import '../pages/index.css';
import Section from '../scripts/components/Section';
import Indicator from '../scripts/components/Indicator';
import Popup from '../scripts/components/Popup';
import api from '../scripts/utils/Api';
import agentData from '../scripts/utils/agentData';

const buttonMenu = document.querySelector('.header__menu');
const listsLinks = document.querySelector('.header__links');
const links = document.querySelectorAll('.link');
const checkboxErrorSpan = document.querySelector('.feedback__input-error');
const checkboxInputs = Array.from(document.querySelectorAll('.feedback__checkbox_input'));
const buttonSubmit = document.querySelector('.feedback__button-submit');
const form = document.querySelector('.feedback__form');
const buttonReviewsLeft = document.querySelector('.reviews__left');
const buttonReviewsRight = document.querySelector('.reviews__right');
const numberReviews = document.querySelector('.reviews__number');
const totalReviews = document.querySelector('.reviews__quantity');
const arrayBlocksReview = Array.from(document.querySelectorAll('.reviews__item'));
const policyFoto = document.querySelector('.insurance__foto');
const buttonPlayVideo = document.querySelectorAll('.foto__button');
const agentFoto = document.querySelector('#agentFoto');
const agentName = document.querySelector('#agentName');
const agentAge = document.querySelector('#agentAge');
const agentExperience = document.querySelector('#agentExperience');
const agentTransactions = document.querySelector('#agentTransactions');

let reviewsNumberPage = 4;
let numberPage = 1;

const section = new Section(rendereIndicator, '.reviews__list');
const popupImageZoom = new Popup('.popup_type_image-zoom');
const popupPlayVideo = new Popup('.popup_type_play-video');
const popupMessage = new Popup('.popup_type_message');

//*Заполняем по расписанию данные об агенте
const agentDataLoading = () => {
  const dayNumber = new Date().getDay();
  agentFoto.style.backgroundImage = `url('${agentData[dayNumber].foto}')`;
  agentName.textContent = agentData[dayNumber].name;
  agentAge.textContent = agentData[dayNumber].age;
  agentExperience.textContent = agentData[dayNumber].experience;
  agentTransactions.textContent = agentData[dayNumber].transactions;

}

//! Заполнение информации для демо режима
//* Устанавливаем заполнение автора и даты
const autoDate = () => {
  document.querySelector('.footer__copyright')
    .textContent = `© 2022 - ${new Date().getFullYear()}. Батурин Сергей`;
}

//*Обрабатываем клик по кнопкам воспроизведения видео
const openPopupVideo = () => {
  popupPlayVideo.open();
}

//*Обработка клика по полису страхования
const openPopupImagePolicy = (evt) => {
  if (evt.target == policyFoto) {
    popupImageZoom.open();
  }
}

//*Открытие страницы с отзывами
function openPageReviews() {
  arrayBlocksReview.forEach(el => {
    if (el.classList.contains('reviews__item_visible') == false) {
      el.classList.add('reviews__item_visible');
    }
  })
  let lastElement = Number(numberPage * reviewsNumberPage);
  let firstElement = Number(lastElement - reviewsNumberPage);
  for (let index = firstElement; index < lastElement; index++) {
    const element = arrayBlocksReview[index];
    element.classList.remove('reviews__item_visible')
  }
}

//*Блокировка активности кнопки
const offActiveButton = (button) => {
  button.disabled = true;
  button.classList.remove('reviews_actived');
}

//*Включение активности кнопки
const onActiveButton = (button) => {
  button.disabled = false;
  button.classList.add('reviews_actived');
}

//*Отключение активности кнопки пролистывания слайдера
const disabledButtonSlider = (activ) => {
  if (numberPage == 1) {
    offActiveButton(buttonReviewsLeft);
  } if (numberPage == (arrayBlocksReview.length / reviewsNumberPage)) {
    offActiveButton(buttonReviewsRight);
  } if (numberPage == 2 && buttonReviewsLeft.disabled == true || activ) {
    onActiveButton(buttonReviewsLeft);
  } if (numberPage == ((arrayBlocksReview.length / reviewsNumberPage) - 1) && buttonReviewsRight.disabled == true || activ) {
    onActiveButton(buttonReviewsRight);
  }
}

//*Обработка события клика по индикатору
const handleClickIndicator = (evt) => {
  const checkedInput = evt.currentTarget.querySelector('.reviews__radio-input');
  numberPage = Number(checkedInput.value);
  fillValuesFeedbackSwitch();
  openPageReviews();
  disabledButtonSlider(true);
}

//*Обработка события клика на кнопку слайдера отзывов вправо
const switchingSliderRight = () => {
  if (numberPage < (totalReviews.textContent / reviewsNumberPage)) {
    const radioPrevious = document.querySelector(`#reviewsPage-${numberPage}`)
    const radioActiv = document.querySelector(`#reviewsPage-${numberPage + 1}`);
    radioActiv.checked = true;
    radioPrevious.checked = false;
    numberPage = numberPage + 1;
    fillValuesFeedbackSwitch();
    disabledButtonSlider(false);
    openPageReviews();
  }
}

//*Обработка события клика на кнопку слайдера отзывов влево
const switchingSliderLeft = () => {
  if (numberPage > 1) {
    const radioPrevious = document.querySelector(`#reviewsPage-${numberPage}`)
    const radioActiv = document.querySelector(`#reviewsPage-${numberPage - 1}`);
    radioActiv.checked = true;
    radioPrevious.checked = false;
    numberPage = numberPage - 1;
    fillValuesFeedbackSwitch();
    disabledButtonSlider(false);
    openPageReviews();
  }
}

//*Удаляем радио кнопки
const deleteIndicators = (indicators) => {
  if (indicators != 0) {
    indicators.forEach(el => {
      el.remove()
    })
  }
}

//*Создать элемент индикатор
const createIndicator = (index) => {
  const indicator = new Indicator(handleClickIndicator);
  const indicatorElement = indicator.generateIndicator();
  indicatorElement.setAttribute('for', `reviewsPage-${index}`);
  const indicatorInput = indicatorElement.querySelector('.reviews__radio-input')
  indicatorInput.id = `reviewsPage-${index}`;
  indicatorInput.value = `${index}`;
  if (indicatorInput.value == 1) {
    indicatorInput.setAttribute('checked', true)
  }
  return indicatorElement;
}

//*Добавление индикаторов слайдора отзывов в DOM
const rendereIndicator = (numberPages) => {
  for (let i = 0; i < numberPages; i++) {
    section.setItem(createIndicator(i + 1));
  }
}

//*Расчитываем количество страниц с отзывами
const installingFeedbackPageIndicator = () => {
  const numberPages = Math.ceil(arrayBlocksReview.length / reviewsNumberPage);
  const indicators = Array.from(document.querySelectorAll('.reviews__radio-label'));
  if (indicators.length != numberPages) {
    numberPage = 1;
    fillValuesFeedbackSwitch();
    openPageReviews();
    deleteIndicators(indicators);
    rendereIndicator(numberPages);
  }
}

//*Переворачиваем аватар на правую сторону
const addSelectorAvatarReviews = () => {
  const urlAvatars = Array.from(document.querySelectorAll('.reviews__avatar'));
  for (let i = 1; i < urlAvatars.length; i = i + 2) {
    urlAvatars[i].classList.add('reviews__avatar_right');
  }
}

//*Переворачиваем аватар на левую сторону
const removeSelectorAvatarReviews = () => {
  const urlAvatars = Array.from(document.querySelectorAll('.reviews__avatar'));
  for (let i = 1; i < urlAvatars.length; i = i + 2) {
    urlAvatars[i].classList.remove('reviews__avatar_right');
  }
}

//*Заполнение информационной панели слайдера для отзывов
const fillValuesFeedbackSwitch = () => {
  numberReviews.textContent = `${((numberPage - 1) * reviewsNumberPage) + 1} - ${numberPage * reviewsNumberPage}`;
  totalReviews.textContent = arrayBlocksReview.length;
}

//*Установка количества отзывов на странице при изменении ширины экрана
const eventChangeScreenWidth = () => {
  const windowInnerWidth = document.documentElement.clientWidth;
  if (windowInnerWidth < 1050) {
    addSelectorAvatarReviews();
    reviewsNumberPage = 2;
    installingFeedbackPageIndicator();
  } else {
    removeSelectorAvatarReviews();
    reviewsNumberPage = 4;
    installingFeedbackPageIndicator();
  }
}

//*Открытие навигационного меню мобильной версии
const openCloseMenuMobile = () => {
  listsLinks.classList.toggle('header__links_activ')
};

//*Закрытие навигационного меню мобильной версии
const closeMenuMobile = () => {
  listsLinks.classList.remove('header__links_activ')
};

//*Установка выбора в чекбоксе при клике по кнопке с предложением услуг
const settingSelectionMarkCheckbox = (link) => {
  const titleCard = link.parentElement.querySelector('.card__title');
  if (titleCard) {
    const serviceInput = document.getElementById(`service-${titleCard.id}`);
    serviceInput.setAttribute('checked', 'true');
    checkedInputValid();
  }
}

//*Поиск якоря и плавный скроллинг к нему
const handleClickLinkAnchor = (link) => {
  let href = link.getAttribute('href').substring(1);
  const scrollTarget = document.getElementById(href);
  const topOffset = document.querySelector('.scrollto').offsetHeight;
  const elementPosition = scrollTarget.getBoundingClientRect().top;
  const offsetPosition = elementPosition - topOffset;
  window.scrollBy({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

//*Подписка на клик по ссылкам для плавного скрола по странице
const addEventLinksScroll = (links) => {
  links.forEach(link => {
    link.addEventListener('click', evt => {
      evt.preventDefault();
      closeMenuMobile();
      handleClickLinkAnchor(link);
      settingSelectionMarkCheckbox(link);
    })
  })
}

//*Снятие блокировки с кнопки отправки события формы обратной связи
const activationCheckboxError = () => {
  checkboxErrorSpan.classList.add('feedback__input-error_disabled');
  buttonSubmit.removeAttribute('disabled');
}

//* Блокируем кнопку сабмита формы
const blockingButtonSubmitForm = () => {
  buttonSubmit.setAttribute('disabled', true);
}

//*Установка блокировки на кнопку отправки события формы обратной связи
const disablingCheckboxError = () => {
  checkboxErrorSpan.classList.remove('feedback__input-error_disabled');
  blockingButtonSubmitForm();
}

//*Деактивация/активация кнопки сабмита после проверки
const checkedInputValid = () => {
  if (!hasInvalidInput()) {
    disablingCheckboxError();
  } else {
    activationCheckboxError();
  }
}

//*Проверка валидности чекбоксов согласно условию
const hasInvalidInput = () => {
  return checkboxInputs.find(input => input.checked === true);
}
//!Удалить form.reset(); checkedInputValid(); evt.preventDefault(); для работы формы
//* Открываем попап об успешной отправки сообщения
const openPopupSubmit = (evt) => {
  evt.preventDefault();
  popupMessage.open();
  form.reset();
  checkedInputValid();
}

//! Восстановить для коректоной работы формы.
//! Выключил чтобы сделать демонстрацию сайта
// //*Обработка события отправки формы обратной связи
// const submitForm = (evt) => {
//   blockingButtonSubmitForm();
//   evt.preventDefault();
//   buttonSubmit.textContent = 'Отправляем сообщение...';
//   api
//     .sendingFormMessage(assemblingDataSendServer())
//     .then((res) => {
//       console.log('Ответ сервера:', res.message)
//       openPopupSubmit();
//       form.reset();
//       checkedInputValid();
//     })
//     .catch((err) => {
//       console.log('Ошибка сервера:', err)
//       // err.then((res) => {
//       //   console.log('Ошибка сервера:', res)
//       // })
//     })
//     .finally(() => {
//       checkedInputValid();
//       buttonSubmit.textContent = 'Получить консультацию';
//     })
// }
//! Восстановить для коректоной работы формы.
//! Выключил чтобы сделать демонстрацию сайта

//* Сборка formData для отправки по почте
const assemblingDataSendServer = () => {
  let formData = new FormData(form);
  const date = new Date();
  formData.append("date", `${date}`);
  formData.append("agentName", `${agentName.textContent}`);
  // console.log(Array.from(formData));
  return formData;
}

//*Первоначальный замер ширины экрана и выставление количества отзывов на странице
eventChangeScreenWidth();

//*Первоначальная блокировка кнопки сабмита
checkedInputValid();

//*Первоначальная подписка на клик по ссылке для скрола по странице
addEventLinksScroll(links);

//*Первоначальное заполнение информационной панели слайдера для отзывов
fillValuesFeedbackSwitch();

//*Первоначальное создание радио
installingFeedbackPageIndicator();

//*Подписка на изменение ширины экрана
document.addEventListener("DOMContentLoaded", () => {
  window.onresize = function () {
    eventChangeScreenWidth();
  }
})

//*Первоначальное заполнение отзывов
openPageReviews(numberPage, reviewsNumberPage);

//* Первоначальное отключение кнопки слайдера
disabledButtonSlider(false);

//*Подписка на клик по кнопке вправо управления слайдером отзывов
buttonReviewsRight.addEventListener('click', switchingSliderRight);

//*Подписка на клик по кнопке влево управления слайдером отзывов
buttonReviewsLeft.addEventListener('click', switchingSliderLeft);

//*Подписка на клик по кнопке управления меню навигации для мобильной версии
buttonMenu.addEventListener('click', openCloseMenuMobile);

//!Изменить функцию сабмита на submitForm
//*Подписка на событие отправки формы обратной связи
form.addEventListener('submit', openPopupSubmit);

//*Подписка на событие выбора чекбокса на форме обратной связи
checkboxInputs.forEach(input => {
  input.addEventListener('input', () => {
    checkedInputValid();
  })
})

//*Подписка на клик по фотографии полиса страхования
policyFoto.addEventListener('click', openPopupImagePolicy)

//*Подписка на оверлей и закрыть попап с фотографией
popupImageZoom.setEventListeners();

//*Подписка на кнопку воспроизведения видео
buttonPlayVideo.forEach(button => {
  button.addEventListener('click', openPopupVideo)
})

//*Подписка на оверлей и закрыть попап с видео
popupPlayVideo.setEventListeners();

//*Подписка на оверлей и закрыть попап с видео
popupMessage.setEventListeners();

//*Заполняем данные об агенте
agentDataLoading();

//! Дополнетельная информация дла демо режима
//* Заполнение данных об авторе при запуске
autoDate();