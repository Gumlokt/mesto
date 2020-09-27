import { elementsArray } from './places.js';
import Card from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';



/** All variables */
const btnEdit = document.querySelector('.profile__btn-edit');
const btnAdd = document.querySelector('.profile__btn-add');



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



/** Object with methods to get and set user profile data. */
const userInfo = new UserInfo({
  name: '.profile__name',
  activity: '.profile__activity'
});



/** Prepares popup window with form to edit user profile. */
const profileWithForm = new PopupWithForm('.form[name="profile"]', {
  submitForm: () => {
    userInfo.setUserInfo(profileWithForm._getInputValues());
    profileWithForm.close();
  }
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

          newCard.setItem(cardElement.createCard());
        }
      }, '.elements');

    newCard.renderItems();

    cardWithForm.close();
  }
});

cardWithForm.setEventListeners();

/** Attaches 'click' event on the 'Add' button to popup window with creating card form. */
btnAdd.addEventListener('click', () => { cardWithForm.open(); });
