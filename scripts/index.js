import { cssClasses, toggleButtonState, resetForm } from './validate.js';

import { elementsArray } from './places.js';

import Card from './Card.js';
import FormValidator from './FormValidator.js';



/** All variables */
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content;


const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');

const btnEdit = document.querySelector('.profile__btn-edit');
const btnAdd = document.querySelector('.profile__btn-add');


const profileForm = document.querySelector('.form[name="profile"]');
const profileWindow = profileForm.closest('.popup');
const btnProfileClose = profileWindow.querySelector('.popup__btn-close');

const cardForm = document.querySelector('.form[name="card"]');
const cardWindow = cardForm.closest('.popup');
const btnCardClose = cardWindow.querySelector('.popup__btn-close');

const popupImageContainer = document.querySelector('.popup__image-container');
const imageWindow = popupImageContainer.closest('.popup');
const btnImageClose = imageWindow.querySelector('.popup__btn-close');

const popupImage = popupImageContainer.querySelector('.popup__image');
const popupImageTitle = popupImageContainer.querySelector('.popup__image-title');

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
function togglePopupWindow(popupWindow) {
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
 * Sets image source, image-title and image alt to display full sized image in popup window.
 * @function
 * @param {object} e - The image that was clicked on.
 */
function zoomImage(e) {
  const element = e.target.closest('.element');

  popupImage.src = e.target.src;
  popupImage.alt = e.target.alt.replace('Фото', 'Фото на весь экран');
  popupImageTitle.textContent = element.querySelector('.element__title').textContent;

  togglePopupWindow(imageWindow);
}


/**
 * Removes card element.
 * @function
 * @param {object} e - The button with trash icon.
 */
function removeElement(e) {
  e.target.closest('.element').remove();
}


/**
 * Sets/unsets 'like' to the card.
 * @function
 * @param {object} e - The button with heart icon.
 */
function toggleLike(e) {
  if(e.target.classList.contains('element__btn-like_clicked')) {
    e.target.classList.remove('element__btn-like_clicked');
  } else {
    e.target.classList.add('element__btn-like_clicked');
  }
}


/**
 * Creates new card (or new element in BEM notation).
 * @function
 * @param {string} title - The title of the card.
 * @param {string} link - The URL of the image.
 */
function createCard(title, link) {
  const newCard = elementTemplate.cloneNode(true);

  const cardImage = newCard.querySelector('.element__image');
  const cardTitle = newCard.querySelector('.element__title');
  const removeButton = newCard.querySelector('.element__btn-remove');
  const likeButton = newCard.querySelector('.element__btn-like');

  cardImage.src = link;
  cardImage.alt = 'Фото. ' + title;
  cardTitle.textContent = title;

  cardImage.addEventListener('click', zoomImage);
  removeButton.addEventListener('click', removeElement);
  likeButton.addEventListener('click', toggleLike);

  return newCard;
}


/**
 * Saves card and closes popup window.
 * @function
 * @param {object} e - The submitted form.
 */
function saveCard(e) {
  e.preventDefault();

  // elements.prepend(createCard(cardForm.elements.title.value, cardForm.elements.link.value));

  let cardElement = new Card(cardForm, '#element');
  elements.prepend(cardElement.createCard());

  togglePopupWindow(cardWindow);
}






/** Fills up the page with predefined cards (or with predefined elements in BEM notation). */
elementsArray.forEach((item) => { elements.append(createCard(item.title, item.link)); });



/** Attaches 'click' event on the 'Edit' button. */
btnEdit.addEventListener('click', () => {
  resetForm(profileForm);

  profileForm.elements.name.value = profileName.textContent;
  profileForm.elements.activity.value = profileActivity.textContent;

  const inputList = Array.from(profileForm.elements);
  toggleButtonState(inputList, profileForm.elements.saveButton, cssClasses.inactiveButtonClass);

  togglePopupWindow(profileWindow);
});

/** Attaches 'click' event on the 'Close' button of popup window with user profile. */
btnProfileClose.addEventListener('click', () => { togglePopupWindow(profileWindow); });

/** Attaches 'submit' event on the form to save user's profile. */
profileForm.addEventListener('submit', saveProfile);



/** Attaches 'click' event on the 'Add' button to popup window with creating card form. */
btnAdd.addEventListener('click', () => {
  resetForm(cardForm);
  togglePopupWindow(cardWindow);
});

/** Attaches 'click' event on the 'Close' button of popup window with creating card form. */
btnCardClose.addEventListener('click', () => { togglePopupWindow(cardWindow); });

/** Attaches 'submit' event on the form to save new card. */
cardForm.addEventListener('submit', saveCard);



/** Attaches 'click' event on the 'Close' button of popup window full sized image. */
btnImageClose.addEventListener('click', () => { togglePopupWindow(imageWindow); });



/** Catches 'Click' event on overlay to close any opened popup window. */
popupWindowsList.forEach((popupWindow) => {
  popupWindow.addEventListener('click', (e) => {
    if (popupWindow.classList.contains('popup_opened') && e.target.classList.contains('popup')) {
      togglePopupWindow(popupWindow);
    }
  });
});
