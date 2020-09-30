import { elementsArray } from '../utils/places.js';
import { cssClasses, resetForm, toggleButtonState } from '../utils/validate.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';


/** All variables */
let defaultUserData = { name: 'Жак-Ив Кусто', activity: 'Исследователь океана' };
const btnEdit = document.querySelector('.profile__btn-edit');
const btnAdd = document.querySelector('.profile__btn-add');



/** Fills up the page with predefined cards (or with predefined elements in BEM notation). */
const cardList = new Section({
  items: elementsArray,
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

      cardList.appendItem(cardElement.createCard());
    }
  }, '.elements');

cardList.renderItems();



/** Object with methods to get and set user profile data. */
const userInfo = new UserInfo({
  name: '.profile__name',
  activity: '.profile__activity'
});

userInfo.setUserInfo(defaultUserData);


/** Prepares popup window with form to edit user profile. */
const profileWithForm = new PopupWithForm('.form[name="profile"]', {
  submitForm: () => {
    userInfo.setUserInfo(profileWithForm._getInputValues());
    profileWithForm.close();
  },
  cssClasses: cssClasses,
  resetForm: resetForm,
  toggleButtonState: toggleButtonState
});

profileWithForm.setEventListeners();

/** Attaches 'click' event on the 'Edit' button. */
btnEdit.addEventListener('click', () => {
  profileWithForm.fillUpInputs(userInfo.getUserInfo());
  profileWithForm.open();
});



/** Prepares popup window with form to add new card. */
const cardWithForm = new PopupWithForm('.form[name="card"]', {
  submitForm: () => {
    const newCard = new Section({
      items: [ cardWithForm._getInputValues() ],
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

          newCard.prependItem(cardElement.createCard());
        }
      }, '.elements');

    newCard.renderItems();

    cardWithForm.close();
  },
  cssClasses: cssClasses,
  resetForm: resetForm,
  toggleButtonState: toggleButtonState
});

cardWithForm.setEventListeners();

/** Attaches 'click' event on the 'Add' button to popup window with creating card form. */
btnAdd.addEventListener('click', () => { cardWithForm.open(); });
