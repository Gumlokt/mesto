import { toggleButtonState, resetForm } from './validate.js';
import { elementsArray } from './places.js';
import Card from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';


/** All variables */
const elements = document.querySelector('.elements');


const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');

const btnEdit = document.querySelector('.profile__btn-edit');
const btnAdd = document.querySelector('.profile__btn-add');


const profileForm = document.querySelector('.form[name="profile"]');
const profileWindow = profileForm.closest('.popup');
const btnProfileClose = profileWindow.querySelector('.popup__btn-close');

const cardForm = document.querySelector('.form[name="card"]');
const cardWindow = cardForm.closest('.popup');


export const popupImageContainer = document.querySelector('.popup__image-container');
export const imageWindow = popupImageContainer.closest('.popup');

const popupWindowsList = Array.from(document.querySelectorAll('.popup'));



/**
 * Catches pressing 'Escape' key on the keyboard to close any opened popup window.
 * @function
 * @param {object} e - Pressed key on the keyboard.
 */
function catchPressingEscape(e) {
  if (e.key === 'Escape') {
    togglePopupWindow(document.querySelector('.popup_opened'));
  }
}


/**
 * Opens/closes popup window.
 * @function
 * @param {object} popupWindow - The popup window.
 */
export function togglePopupWindow(popupWindow) {
  if(popupWindow.classList.contains('popup_opened')) {
    popupWindow.classList.remove('popup_opened');
    document.removeEventListener('keydown', catchPressingEscape);
  } else {
    popupWindow.classList.add('popup_opened');
    document.addEventListener('keydown', catchPressingEscape);
  }
}


/**
 * Saves Profile and close popup window.
 * @function
 * @param {object} e - The submitted form.
 */
function saveProfile(e) {
  e.preventDefault();

  profileName.textContent = profileForm.elements.name.value;
  profileActivity.textContent = profileForm.elements.activity.value;

  togglePopupWindow(profileWindow);
}


/**
 * Saves card and closes popup window.
 * @function
 * @param {object} e - The submitted form.
 */
function saveCard(e) {
  e.preventDefault();

  const cardElement = new Card({ title: cardForm.elements.title.value, link: cardForm.elements.link.value }, '#element');
  elements.prepend(cardElement.createCard());

  togglePopupWindow(cardWindow);
}






/** Fills up the page with predefined cards (or with predefined elements in BEM notation). */
const cardList = new Section({
  items: elementsArray.reverse(),
  renderer: (item) => {
      const cardElement = new Card({
        title: item.title,
        link: item.link,
        handleCardClick: (e) => {
          const popupWithImage = new PopupWithImage('.popup__image-container');
          popupWithImage.setEventListeners();
          popupWithImage.open(e); // e - это элемент, на котором произошло событие (в данном случае клик по картинке)
        }
      }, '#element');

      cardList.setItem(cardElement.createCard());
    }
  }, '.elements');

cardList.renderItems();





/** Attaches 'click' event on the 'Edit' button. */
btnEdit.addEventListener('click', () => {
  resetForm(profileForm);

  profileForm.elements.name.value = profileName.textContent;
  profileForm.elements.activity.value = profileActivity.textContent;

  const inputList = Array.from(profileForm.elements);
  toggleButtonState(inputList, profileForm.elements.saveButton);

  togglePopupWindow(profileWindow);
});

/** Attaches 'click' event on the 'Close' button of popup window with user profile. */
btnProfileClose.addEventListener('click', () => { togglePopupWindow(profileWindow); });

/** Attaches 'submit' event on the form to save user's profile. */
profileForm.addEventListener('submit', saveProfile);






const popupWithForm = new PopupWithForm('.form[name="card"]', {
  submitForm: () => {
    const newCard = new Section({
      items: popupWithForm._getInputValues(),
      renderer: (item) => {
          const cardElement = new Card({
            title: item.title,
            link: item.link,
            handleCardClick: (e) => {
              const popupWithImage = new PopupWithImage('.popup__image-container');
              popupWithImage.setEventListeners();
              popupWithImage.open(e); // e - это элемент, на котором произошло событие (в данном случае клик по картинке)
            }
          }, '#element');

          newCard.setItem(cardElement.createCard());
        }
      }, '.elements');

    newCard.renderItems();

    popupWithForm.close();
  }
});

popupWithForm.setEventListeners();

/** Attaches 'click' event on the 'Add' button to popup window with creating card form. */
btnAdd.addEventListener('click', () => { popupWithForm.open(); });












/** Catches 'Click' event on overlay to close any opened popup window. */
popupWindowsList.forEach((popupWindow) => {
  popupWindow.addEventListener('click', (e) => {
    if (popupWindow.classList.contains('popup_opened') && e.target.classList.contains('popup')) {
      togglePopupWindow(popupWindow);
    }
  });
});
