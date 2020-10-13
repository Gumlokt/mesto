import { elementsArray } from '../utils/places.js';
import { cssClasses, resetForm, toggleButtonState } from '../utils/validate.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import './index.css';


/** All variables */
const btnEditAvatar = document.querySelector('.profile__btn-edit-avatar');
const btnEdit = document.querySelector('.profile__btn-edit');
const btnAdd = document.querySelector('.profile__btn-add');




const appApi = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-16",
  headers: {
		authorization: '7e8aae9c-bb81-4fe9-ac24-f206bc985678',
    "Content-Type": "application/json",
  },
});


const getUserInfoPromise = appApi.getUserInfo();
const getInitialCardsPromise = appApi.getInitialCards();



/** Object with methods to get and set user profile data. */
const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__about'
});

getUserInfoPromise.then((data) => {
  userInfo.setUserInfo(data);
  }).catch((err) => { console.log(err); });




/** Fills up the page with predefined cards (or with predefined elements in BEM notation). */
getInitialCardsPromise.then((data) => {
  const cardList = new Section({
    items: data, // pass here array of objects from server
    renderer: (item) => {
      const cardElement = new Card({
        cardData: item,
        userInfo: userInfo.getUserInfo(),
        handleCardClick: (e) => {
          const popupWithImage = new PopupWithImage('.popup__image-container');
          popupWithImage.setEventListeners();
          popupWithImage.open(e); // e - это элемент, на котором произошло событие (в данном случае клик по картинке)
        },
        handleLikeClick: (cardId) => {
          if(cardElement._checkIfLiked()) {
            const unsetLikePromise = appApi.unsetLike(cardId);

            unsetLikePromise.then((data) => {
              cardElement._cardData = data;
              cardElement._toggleLike(data.likes.length);
            }).catch((err) => { console.log(err); });
          } else {
            const setLikePromise = appApi.setLike(cardId);

            setLikePromise.then((data) => {
              cardElement._cardData = data;
              cardElement._toggleLike(data.likes.length);
            }).catch((err) => { console.log(err); });
          }
        },
        handleCardDeletion: () => {
          const popupConfirmDeletion = new PopupWithSubmit('.form[name="confirmation"]', {
            submitForm: () => {
              console.log('card id: ' + cardElement._id);

              const deleteCardPromise = appApi.deleteCard(cardElement._id);

              deleteCardPromise.then((data) => {
                return cardElement._removeElement();
              }).catch((err) => { console.log(err); });

              popupConfirmDeletion.close();
            }
          });

          popupConfirmDeletion.setEventListeners();
          popupConfirmDeletion.open(); // e - это элемент, на котором произошло событие (в данном случае клик по картинке)
        }
      }, '#element');

      cardList.appendItem(cardElement.createCard());
    }
  }, '.elements');

  cardList.renderItems();
}).catch((err) => { console.log(err); });





/** Prepares popup window with form to edit user avatar. */
const profileWithAvatarForm = new PopupWithForm('.form[name="avatar"]', {
  submitForm: () => {
    const inputValues = profileWithAvatarForm._getInputValues();

    const setUserInfoPromise = appApi.setUserInfo(inputValues);

    setUserInfoPromise.then((data) => {
      userInfo.setUserInfo(data);
      }).catch((err) => { console.log(err); });

    profileWithAvatarForm.close();
  },
  cssClasses: cssClasses,
  resetForm: resetForm,
  toggleButtonState: toggleButtonState
});

profileWithAvatarForm.setEventListeners();

/** Attaches 'click' event on the 'Edit Avatar' button. */
btnEditAvatar.addEventListener('click', () => {
  // profileWithAvatarForm.fillUpInputs(userInfo.getUserInfo());
  profileWithAvatarForm.open();
});



/** Prepares popup window with form to edit user profile. */
const profileWithForm = new PopupWithForm('.form[name="profile"]', {
  submitForm: () => {
    const inputValues = profileWithForm._getInputValues();

    const setUserInfoPromise = appApi.setUserInfo(inputValues);

    setUserInfoPromise.then((data) => {
      userInfo.setUserInfo(data);
      }).catch((err) => { console.log(err); });

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

    const addCardPromiese = appApi.addCard(inputValues);

    addCardPromiese.then((data) => {
      const newCard = new Section({
        items: [ data ],
        renderer: (item) => {
          const cardElement = new Card({
            cardData: item,
            userInfo: userInfo.getUserInfo(),
            handleCardClick: (e) => {
              const popupWithImage = new PopupWithImage('.popup__image-container');
              popupWithImage.setEventListeners();
              popupWithImage.open(e); // e - это элемент, на котором произошло событие (в данном случае клик по картинке)
            },
            handleLikeClick: (cardId) => {
              if(cardElement._checkIfLiked()) {
                const unsetLikePromise = appApi.unsetLike(cardId);
    
                unsetLikePromise.then((data) => {
                  cardElement._cardData = data;
                  cardElement._toggleLike(data.likes.length);
                }).catch((err) => { console.log(err); });
              } else {
                const setLikePromise = appApi.setLike(cardId);
    
                setLikePromise.then((data) => {
                  cardElement._cardData = data;
                  cardElement._toggleLike(data.likes.length);
                }).catch((err) => { console.log(err); });
              }
            },
            handleCardDeletion: () => {
              const popupConfirmDeletion = new PopupWithSubmit('.form[name="confirmation"]', {
                submitForm: () => {
                  const deleteCardPromise = appApi.deleteCard(cardElement._id);

                  deleteCardPromise.then((data) => {
                    return cardElement._removeElement();
                  }).catch((err) => { console.log(err); });

                  popupConfirmDeletion.close();
                }
              });

              popupConfirmDeletion.setEventListeners();
              popupConfirmDeletion.open(); // e - это элемент, на котором произошло событие (в данном случае клик по картинке)
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
