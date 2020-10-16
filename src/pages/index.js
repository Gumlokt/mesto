import { getBtnSaveText, getBtnCreateText } from '../utils/helpers.js';
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



/** Object with methods to open popup with image. */
const popupWithImage = new PopupWithImage('.popup__image-container');
popupWithImage.setEventListeners();



/** Object with methods to get and set user profile data. */
const userInfo = new UserInfo({
  name: '.profile__name', // Jacques-Yves Cousteau
  about: '.profile__about', // Sailor, researcher
  avatar: '.profile__avatar' // https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg
});



/** Object with methods to send and request all data on the server side. */
const appApi = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-16",
  headers: {
		authorization: '7e8aae9c-bb81-4fe9-ac24-f206bc985678',
    "Content-Type": "application/json",
  },
});



// const getUserInfoPromise = appApi.getUserInfo();
// const getInitialCardsPromise = appApi.getInitialCards();

Promise.all([ //в Promise.all передаем массив промисов которые нужно выполнить
  appApi.getUserInfo(),
  appApi.getInitialCards()
])    
.then((values) => { //попадаем сюда когда оба промиса будут выполнены
  const [userData, initialCards] = values;

  userInfo.setUserInfo(userData);

  /** Fills up the page with predefined cards (or with predefined elements in BEM notation). */
    const cardList = new Section({
      cardsList: initialCards, // pass here array of objects from server
      renderer: (card) => {
        const cardElement = new Card({
          cardData: card,
          userInfo: userInfo.getUserInfo(),
          handleCardClick: () => { // клик по картинке
            popupWithImage.open(card);
          },
          handleLikeClick: (cardId) => {
            if(cardElement._checkIfLiked()) {
              const unsetLikePromise = appApi.unsetLike(cardId);

              unsetLikePromise.then((data) => {
                cardElement._cardData = data;
                cardElement.toggleLike(data.likes.length);
              }).catch((err) => { console.log(err.message); });
            } else {
              const setLikePromise = appApi.setLike(cardId);

              setLikePromise.then((data) => {
                cardElement._cardData = data;
                cardElement.toggleLike(data.likes.length);
              }).catch((err) => { console.log(err.message); });
            }
          },
          handleCardDeletion: () => {
            const popupConfirmDeletion = new PopupWithSubmit('.form[name="confirmation"]', {
              submitForm: () => {
                const deleteCardPromise = appApi.deleteCard(cardElement._cardData._id);

                deleteCardPromise.then((data) => {
                  popupConfirmDeletion.close();
                  return cardElement._removeElement();
                }).catch((err) => { console.log(err.message); });
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



  /** Prepares popup window with form to edit user avatar. */
  const profileWithAvatarForm = new PopupWithForm('.form[name="avatar"]', {
    submitForm: (inputValues) => {
      profileWithAvatarForm.setBtnSaveText(getBtnSaveText(true));

      // const inputValues = profileWithAvatarForm._getInputValues();

      const setUserAvatarPromise = appApi.setAvatar(inputValues);

      setUserAvatarPromise.then((data) => {
          userInfo.setUserInfo(data);
          profileWithAvatarForm.setBtnSaveText(getBtnSaveText());
          profileWithAvatarForm.close();
        }).catch((err) => { console.log(err.message); });
    },
    cssClasses: cssClasses,
    resetForm: resetForm,
    toggleButtonState: toggleButtonState
  });

  profileWithAvatarForm.setEventListeners();

  /** Attaches 'click' event on the 'Edit Avatar' button. */
  btnEditAvatar.addEventListener('click', () => {
    // profileWithAvatarForm.fillUpInputs(userInfo.getUserInfo()); // разкомментить, если нужно, чтобы при редактировании авы ссыла заполнялась текущим значением
    profileWithAvatarForm.open();
  });



  /** Prepares popup window with form to edit user profile. */
  const profileWithForm = new PopupWithForm('.form[name="profile"]', {
    submitForm: (inputValues) => {
      profileWithForm.setBtnSaveText(getBtnSaveText(true));

      // const inputValues = profileWithForm._getInputValues();

      const setUserInfoPromise = appApi.setUserInfo(inputValues);

      setUserInfoPromise.then((data) => {
          userInfo.setUserInfo(data);
          profileWithForm.setBtnSaveText(getBtnSaveText());
          profileWithForm.close();
        }).catch((err) => { console.log(err.message); });
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
    submitForm: (inputValues) => {
      cardWithForm.setBtnSaveText(getBtnCreateText(true));

      // const inputValues = cardWithForm._getInputValues();

      const addCardPromiese = appApi.addCard(inputValues);

      addCardPromiese.then((data) => {
        const newCard = new Section({
          cardsList: [ data ],
          renderer: (card) => {
            const cardElement = new Card({
              cardData: card,
              userInfo: userInfo.getUserInfo(),
              handleCardClick: () => { // клик по картинке
                popupWithImage.open(card);
              },
              handleLikeClick: (cardId) => {
                if(cardElement._checkIfLiked()) {
                  const unsetLikePromise = appApi.unsetLike(cardId);

                  unsetLikePromise.then((data) => {
                    cardElement._cardData = data;
                    cardElement.toggleLike(data.likes.length);
                  }).catch((err) => { console.log(err.message); });
                } else {
                  const setLikePromise = appApi.setLike(cardId);

                  setLikePromise.then((data) => {
                    cardElement._cardData = data;
                    cardElement.toggleLike(data.likes.length);
                  }).catch((err) => { console.log(err.message); });
                }
              },
              handleCardDeletion: () => {
                const popupConfirmDeletion = new PopupWithSubmit('.form[name="confirmation"]', {
                  submitForm: () => {
                    const deleteCardPromise = appApi.deleteCard(cardElement._cardData._id);

                    deleteCardPromise.then((data) => {
                      popupConfirmDeletion.close();
                      return cardElement._removeElement();
                    }).catch((err) => { console.log(err.message); });
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
        cardWithForm.setBtnSaveText(getBtnCreateText());
        cardWithForm.close();
      }).catch((err) => { console.log(err.message); });
    },
    cssClasses: cssClasses,
    resetForm: resetForm,
    toggleButtonState: toggleButtonState
  });

  cardWithForm.setEventListeners();



  /** Attaches 'click' event on the 'Add' button to popup window with creating card form. */
  btnAdd.addEventListener('click', () => { cardWithForm.open(); });
})
.catch((err) => { //попадаем сюда если один из промисов завершаться ошибкой
  console.log(err.message);
})


