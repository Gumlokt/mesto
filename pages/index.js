/** All variables */
const elementsArray = [
  {
    title: 'Эльбрус',
    link: 'https://images.unsplash.com/photo-1587825159281-7d731eaebbc4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60'
  },
  {
    title: 'Домбай',
    link: 'https://images.unsplash.com/photo-1587825159836-58aa005add47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60'
  },
  {
    title: 'Архыз',
    link: 'https://images.unsplash.com/photo-1579721591734-5d961ca6c9f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2467&q=80'
  },
  {
    title: 'Плато Бермамыт',
    link: 'https://images.unsplash.com/photo-1582228538505-2b28df127681?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3289&q=80'
  },
  {
    title: 'Сентинский храм',
    link: 'https://images.unsplash.com/photo-1538819285938-6a9b4eda500b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1601&q=80'
  },
  {
    title: 'Бадукские озера',
    link: 'https://images.unsplash.com/photo-1582650517303-b42616d56fba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2698&q=80'
  }
];


const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content;


const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');

const btnEdit = document.querySelector('.profile__btn-edit');
const btnAdd = document.querySelector('.profile__btn-add');


const profileForm = document.querySelector('.input-group[name="profile"]');
const profileWindow = profileForm.parentElement.parentElement;
const btnProfileClose = profileForm.previousElementSibling;
const inputName = profileForm.querySelector('.input-group__text-input[name="name"]');
const inputActivity = profileForm.querySelector('.input-group__text-input[name="activity"]');

const cardForm = document.querySelector('.input-group[name="card"]');
const cardWindow = cardForm.parentElement.parentElement;
const btnCardClose = cardForm.previousElementSibling;
const inputTitle = cardForm.querySelector('.input-group__text-input[name="title"]');
const inputLink = cardForm.querySelector('.input-group__text-input[name="link"]');

const popupImageContainer = document.querySelector('.popup__image-container');
const imageWindow = popupImageContainer.parentElement.parentElement;
const btnImageClose = popupImageContainer.previousElementSibling;

const popupImage = popupImageContainer.querySelector('.popup__image');
const popupImageTitle = popupImageContainer.querySelector('.popup__image-title');





/**
 * Opens/closes popup window.
 * @function
 * @param {object} popupWindow - The popup window.
 */
function togglePopupWindow(popupWindow) {
  if(popupWindow.classList.contains('popup_opened')) {
    popupWindow.classList.remove('popup_opened');
  } else {
    popupWindow.classList.add('popup_opened');
  }
}


/**
 * Saves Profile and close popup window.
 * @function
 * @param {object} e - The submitted form.
 */
function saveProfile(e) {
  e.preventDefault();

  profileName.textContent = inputName.value;
  profileActivity.textContent = inputActivity.value;

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

  elements.prepend(createCard(inputTitle.value, inputLink.value));

  togglePopupWindow(cardWindow);
  cardForm.reset();
}






/** Fills up the page with predefined cards (or with predefined elements in BEM notation). */
elementsArray.forEach((item) => { elements.append(createCard(item.title, item.link)); });



/** Attaches 'click' event on the 'Edit' button. */
btnEdit.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputActivity.value = profileActivity.textContent;

  togglePopupWindow(profileWindow);
});

/** Attaches 'click' event on the 'Close' button of popup window with user profile. */
btnProfileClose.addEventListener('click', () => {
  togglePopupWindow(profileWindow);
  profileForm.reset();
});

/** Attaches 'submit' event on the form to save user's profile. */
profileForm.addEventListener('submit', saveProfile);



/** Attaches 'click' event on the 'Add' button to popup window with creating card form. */
btnAdd.addEventListener('click', () => { togglePopupWindow(cardWindow); });

/** Attaches 'click' event on the 'Close' button of popup window with creating card form. */
btnCardClose.addEventListener('click', () => {
  togglePopupWindow(cardWindow);
  cardForm.reset();
});

/** Attaches 'submit' event on the form to save new card. */
cardForm.addEventListener('submit', saveCard);



/** Attaches 'click' event on the 'Close' button of popup window full sized image. */
btnImageClose.addEventListener('click', () => { togglePopupWindow(imageWindow); });
