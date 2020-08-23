// All variables
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

const articleForm = document.querySelector('.input-group[name="article"]');
const articleWindow = articleForm.parentElement.parentElement;
const btnArticleClose = articleForm.previousElementSibling;
const inputTitle = articleForm.querySelector('.input-group__text-input[name="title"]');
const inputLink = articleForm.querySelector('.input-group__text-input[name="link"]');

const popupImageContainer = document.querySelector('.popup__image-container');
const imageWindow = popupImageContainer.parentElement.parentElement;
const btnImageClose = popupImageContainer.previousElementSibling;

const popupImage = popupImageContainer.querySelector('.popup__image');
const popupImageTitle = popupImageContainer.querySelector('.popup__image-title');





// Function definition: Open/close popup window
function togglePopupWindow(popupWindow) {
  if(popupWindow.classList.contains('popup_opened')) {
    popupWindow.classList.remove('popup_opened');
  } else {
    popupWindow.classList.add('popup_opened');
  }
}


// Function definition: Save Profile and close popup window
function saveProfile(e) {
  e.preventDefault();

  profileName.textContent = inputName.value;
  profileActivity.textContent = inputActivity.value;

  togglePopupWindow(profileWindow);
}


// Function definition: Set image source and image-title to popup window with full sized image
function zoomImage(e) {
  console.log(e.target.src);

  popupImage.src = e.target.src;
  popupImageTitle.textContent = e.target.parentElement.parentElement.lastElementChild.firstElementChild.textContent;

  togglePopupWindow(imageWindow);
}


// Function definition: Remove card element
function removeElement(e) {
  e.target.parentElement.parentElement.remove()
}


// Function definition: Set/unset 'like' to the card
function toggleLike(e) {
  if(e.target.classList.contains('element__btn-like_clicked')) {
    e.target.classList.remove('element__btn-like_clicked');
  } else {
    e.target.classList.add('element__btn-like_clicked');
  }
}


// Function definition: Create new card (or new element in BEM notation)
function createCard(title, link) {
  const newCard = elementTemplate.cloneNode(true);

  const cardImage = newCard.querySelector('.element__image');
  const cardTitle = newCard.querySelector('.element__title');
  const removeButton = newCard.querySelector('.element__btn-remove');
  const likeButton = newCard.querySelector('.element__btn-like');

  cardImage.src = link;
  cardTitle.textContent = title;

  cardImage.addEventListener('click', zoomImage);
  removeButton.addEventListener('click', removeElement);
  likeButton.addEventListener('click', toggleLike);

  return newCard;
}


// Function definition: Save Article and close popup
function saveArticle(e) {
  e.preventDefault();

  if (inputTitle.value && inputLink.value) {
    elements.prepend(createCard(inputTitle.value, inputLink.value));
  }

  togglePopupWindow(articleWindow);
  articleForm.reset();
}






// Fill up page with predefined cards (or with predefined elements in BEM notation)
elementsArray.forEach((item) => { elements.append(createCard(item.title, item.link)); });



// Catch events:
btnEdit.addEventListener('click', () => { // Click 'Edit' button
  inputName.value = profileName.textContent;
  inputActivity.value = profileActivity.textContent;

  togglePopupWindow(profileWindow);
});

btnProfileClose.addEventListener('click', () => { // Click 'Close' button
  togglePopupWindow(profileWindow);
  profileForm.reset();
});

profileForm.addEventListener('submit', saveProfile); // Click 'Save' button or submit the Profile form by pressing Enter



btnAdd.addEventListener('click', () => { togglePopupWindow(articleWindow); }); // Click 'Add' button

btnArticleClose.addEventListener('click', () => { // Click 'Close' button
  togglePopupWindow(articleWindow);
  articleForm.reset();
});

articleForm.addEventListener('submit', saveArticle); // Click 'Save' button or submit the Article form by pressing Enter



btnImageClose.addEventListener('click', () => { togglePopupWindow(imageWindow); }); // Click 'Close' button
