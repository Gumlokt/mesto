import { elementsArray } from '../utils/places.js';
import { cssClasses, resetForm, toggleButtonState } from '../utils/validate.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import './index.css';


/** All variables */
const btnEdit = document.querySelector('.profile__btn-edit');
const btnAdd = document.querySelector('.profile__btn-add');




const userApi = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-16/users/me",
  headers: {
		authorization: '7e8aae9c-bb81-4fe9-ac24-f206bc985678',
    "Content-Type": "application/json",
  },
});


const cardsApi = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-16/cards",
  headers: {
		authorization: '7e8aae9c-bb81-4fe9-ac24-f206bc985678',
    "Content-Type": "application/json",
  },
});


const getUserInfoPromise = userApi.getUserInfo();
const getInitialCardsPromise = cardsApi.getInitialCards();



getInitialCardsPromise.then((data) => {
/** Fills up the page with predefined cards (or with predefined elements in BEM notation). */
console.log(data[29].likes.length);

  const cardList = new Section({
    items: data,
    renderer: (item) => {
        const cardElement = new Card({
          name: item.name,
          link: item.link,
          likes: item.likes.length,
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
}).catch((err) => { console.log(err); });





/** Object with methods to get and set user profile data. */
const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__about'
});

getUserInfoPromise.then((data) => {
  userInfo.setUserInfo(data);
  }).catch((err) => { console.log(err); });



/** Prepares popup window with form to edit user profile. */
const profileWithForm = new PopupWithForm('.form[name="profile"]', {
  submitForm: () => {
    const inputValues = profileWithForm._getInputValues();

    const setUserInfoPromise = userApi.setUserInfo(inputValues);

    setUserInfoPromise.then((data) => {
      userInfo.setUserInfo(data);
      }).catch((err) => { console.log(err); });

    // userInfo.setUserInfo(inputValues);
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
    const inputValues = cardWithForm._getInputValues();

    const addCardPromiese = cardsApi.addCard(inputValues);

    addCardPromiese.then((data) => {
      console.log(data);

      // userInfo.setUserInfo(data);
      const newCard = new Section({
        items: [ data ],
        renderer: (item) => {
            const cardElement = new Card({
              name: item.name,
              link: item.link,
              likes: item.likes.length,
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
      }).catch((err) => { console.log(err); });


    cardWithForm.close();
  },
  cssClasses: cssClasses,
  resetForm: resetForm,
  toggleButtonState: toggleButtonState
});

cardWithForm.setEventListeners();

/** Attaches 'click' event on the 'Add' button to popup window with creating card form. */
btnAdd.addEventListener('click', () => { cardWithForm.open(); });
