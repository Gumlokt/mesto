// All variables
const elementsArray = [
  {
    name: 'Эльбрус',
    link: 'https://images.unsplash.com/photo-1587825159281-7d731eaebbc4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60'
  },
  {
    name: 'Домбай',
    link: 'https://images.unsplash.com/photo-1587825159836-58aa005add47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60'
  },
  {
    name: 'Архыз',
    link: 'https://images.unsplash.com/photo-1579721591734-5d961ca6c9f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2467&q=80'
  },
  {
    name: 'Плато Бермамыт',
    link: 'https://images.unsplash.com/photo-1582228538505-2b28df127681?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3289&q=80'
  },
  {
    name: 'Сентинский храм',
    link: 'https://images.unsplash.com/photo-1538819285938-6a9b4eda500b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1601&q=80'
  },
  {
    name: 'Бадукские озера',
    link: 'https://images.unsplash.com/photo-1582650517303-b42616d56fba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2698&q=80'
  }
];

let elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content;


let profileName = document.querySelector('.profile__name');
let profileActivity = document.querySelector('.profile__activity');

let btnEdit = document.querySelector('.profile__btn-edit');
let btnAdd = document.querySelector('.profile__btn-add');

let btnRemove; // Array of buttons with trash icon

let btnLike; // Array of buttons with heart icon
const emptyHeartIcon  = './images/icons/icon-heart.svg';
const filledHeartIcon = './images/icons/icon-heart-filled.svg';


const profileForm = document.querySelector('.input-group[name="profile"]');
const profileWindow = profileForm.parentElement.parentElement;
const btnProfileClose = profileForm.previousElementSibling;
let inputName = profileForm.querySelector('.input-group__text-input[name="name"]');
let inputActivity = profileForm.querySelector('.input-group__text-input[name="activity"]');

const articleForm = document.querySelector('.input-group[name="article"]');
const articleWindow = articleForm.parentElement.parentElement;
const btnArticleClose = articleForm.previousElementSibling;
let inputTitle = articleForm.querySelector('.input-group__text-input[name="title"]');
let inputLink = articleForm.querySelector('.input-group__text-input[name="link"]');

let elementImage; // Array of cards' images
const popupImageContainer = document.querySelector('.popup__image-container');
const imageWindow = popupImageContainer.parentElement.parentElement;
const btnImageClose = popupImageContainer.previousElementSibling;
let popupImage = popupImageContainer.querySelector('.popup__image');
let popupImageTitle = popupImageContainer.querySelector('.popup__image-title');





// Function definition: Helper function to check if popup window is opened
function isOpened(popupWindow) {
  if(popupWindow.classList.contains('popup_opened')) {
    return true;
  }

  return false;
}


// Function definition: Function to add 'popup_opened' and 'fade-in' classes
function fadeIn(windowToOpen) {
  windowToOpen.classList.add('popup_opened', 'fade-in');
}


// Function definition: Fade out function
function fadeOut(windowToClose) {
  window.setTimeout(() => { closePopup(windowToClose); }, 590);
  windowToClose.classList.add('fade-out');
}


// Function definition: Function to remove 'popup_opened', 'fade-in' and 'fade-out' classes
function closePopup(windowToClose) {
  windowToClose.classList.remove('popup_opened', 'fade-in', 'fade-out');
}


// Function definition: Open/Close popup window with profile form
function toggleProfileForm() {
  // if(profileWindow.classList.contains('popup_opened')) {
  if(isOpened(profileWindow)) {
    fadeOut(profileWindow);

    inputName.value = '';
    inputActivity.value = '';
  } else {
    inputName.value = profileName.textContent;
    inputActivity.value = profileActivity.textContent;

    fadeIn(profileWindow);
  }
}


// Function definition: Save Profile and close popup
function saveProfile(e) {
  e.preventDefault();

  profileName.textContent = inputName.value;
  profileActivity.textContent = inputActivity.value;

  toggleProfileForm();
}


// Function definition: Open/Close popup window with article form
function toggleArticleForm() {
  if(isOpened(articleWindow)) {
    fadeOut(articleWindow);

    inputTitle.value = '';
    inputLink.value = '';
  } else {
    fadeIn(articleWindow);
  }
}


// Function definition: Save Article and close popup
function saveArticle(e) {
  e.preventDefault();

  if ('' != inputTitle.value && '' != inputLink.value) {
    const element = elementTemplate.cloneNode(true);

    element.querySelector('.element__title').textContent = inputTitle.value;
    element.querySelector('.element__image').src = inputLink.value;

    elements.prepend(element);

    elementImage = document.querySelectorAll('.element__image') // Refresh/update the Array of cards' images
    elementImage.forEach(element => element.addEventListener('click', zoomImage)); // Reattach/refresh click event to cards' images

    btnRemove = document.querySelectorAll('.element__btn-remove'); // Refresh/update the Array of buttons with trash icon
    btnRemove.forEach(element => element.addEventListener('click', removeElement)); // Reattach/refresh click event to 'Remove' buttons

    btnLike = document.querySelectorAll('.element__btn-like'); // Refresh/update the Array of buttons with heart icon
    btnLike.forEach(element => element.addEventListener('click', toggleLike)); // Reattach/refresh click event to 'Add' buttons
  }

  toggleArticleForm();
}


// Function definition: Open/Close popup window with full sized image
function toggleImageWindow() {
  if(isOpened(imageWindow)) {
    fadeOut(imageWindow);
  } else {
    fadeIn(imageWindow);
  }
}


// Function definition: Set image source and image-title to popup window with full sized image
function zoomImage(e) {
  popupImage.src = e.target.src;
  popupImageTitle.textContent = e.target.parentElement.lastElementChild.firstElementChild.textContent;

  toggleImageWindow();
}


// Function definition: Remove card element
function removeElement(e) {
  e.target.parentElement.parentElement.remove()
}


// Function definition: Set/unset 'like' to the card
function toggleLike(e) {
  if(e.target.getAttribute('src') === emptyHeartIcon) {
    e.target.setAttribute('src', filledHeartIcon);
  } else {
    e.target.setAttribute('src', emptyHeartIcon);
  }
}






// Fill up articles/cards (or elements in BEM notation)
for (let i = 0; i < elementsArray.length; i++) {
  const element = elementTemplate.cloneNode(true);

  element.querySelector('.element__image').src = elementsArray[i].link;
  element.querySelector('.element__title').textContent = elementsArray[i].name;

  elements.append(element);
}

elementImage = document.querySelectorAll('.element__image'); // fill up the Array of cards' images

btnRemove = document.querySelectorAll('.element__btn-remove'); // fill up the Array of buttons with trash icon
btnLike = document.querySelectorAll('.element__btn-like'); // fill up the Array of buttons with heart icon





// Catch events:
btnEdit.addEventListener('click', toggleProfileForm); // Click 'Edit' button

btnProfileClose.addEventListener('click', toggleProfileForm); // Click 'Close' button

profileForm.addEventListener('submit', saveProfile); // Click 'Save' button or submit the Profile form by pressing Enter



btnAdd.addEventListener('click', toggleArticleForm); // Click 'Add' button

btnArticleClose.addEventListener('click', toggleArticleForm); // Click 'Close' button

articleForm.addEventListener('submit', saveArticle); // Click 'Save' button or submit the Article form by pressing Enter



elementImage.forEach(element => element.addEventListener('click', zoomImage)); // Attach click event to card's image

btnImageClose.addEventListener('click', toggleImageWindow); // Click 'Close' button

btnRemove.forEach(element => element.addEventListener('click', removeElement)); // Attach click event to 'Remove' buttons

btnLike.forEach(element => element.addEventListener('click', toggleLike)); // Attach click event to 'Add' buttons
