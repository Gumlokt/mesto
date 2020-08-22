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

let btnLike; // Array of buttons with heart icon
let emptyHeartIcon  = './images/icons/icon-heart.svg';
let filledHeartIcon = './images/icons/icon-heart-filled.svg';


let profileForm = document.querySelector('.input-group[name="profile"]');
let profileWindow = profileForm.parentElement.parentElement;
let btnProfileClose = profileForm.previousElementSibling;
let inputName = profileForm.querySelector('.input-group__text-input[name="name"]');
let inputActivity = profileForm.querySelector('.input-group__text-input[name="activity"]');

let articleForm = document.querySelector('.input-group[name="article"]');
let articleWindow = articleForm.parentElement.parentElement;
let btnArticleClose = articleForm.previousElementSibling;
let inputTitle = articleForm.querySelector('.input-group__text-input[name="title"]');
let inputLink = articleForm.querySelector('.input-group__text-input[name="link"]');





// Fill up articles
for (let i = 0; i < elementsArray.length; i++) {
  const element = elementTemplate.cloneNode(true);

  element.querySelector('.element__image').src = elementsArray[i].link;
  element.querySelector('.element__title').textContent = elementsArray[i].name;

  elements.append(element);
}

btnLike = document.querySelectorAll('.element__btn-like');


// Function definition: Open/Close popup window with profile form
function toggleProfileForm() {
  if(profileWindow.classList.contains('popup_opened')) {
    profileWindow.classList.remove('popup_opened');

    inputName.value = '';
    inputActivity.value = '';
  } else {
    inputName.value = profileName.textContent;
    inputActivity.value = profileActivity.textContent;

    profileWindow.classList.add('popup_opened');
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
  if(articleWindow.classList.contains('popup_opened')) {
    articleWindow.classList.remove('popup_opened');

    inputTitle.value = '';
    inputLink.value = '';
  } else {
    articleWindow.classList.add('popup_opened');
  }
}


// Function definition: Save Article and close popup
function saveArticle(e) {
  e.preventDefault();

  const element = elementTemplate.cloneNode(true);

  element.querySelector('.element__image').src = inputLink.value;
  element.querySelector('.element__title').textContent = inputTitle.value;

  elements.prepend(element);

  btnLike = document.querySelectorAll('.element__btn-like'); // Refresh/update Array of buttons with heart icon
  btnLike.forEach(element => element.addEventListener('click', toggleLike)); // Reattach/refresh click event to 'Add' buttons

  toggleArticleForm();
}


// Function definition: Set/unset 'like' to the card
function toggleLike(e) {
  if(e.target.getAttribute('src') === emptyHeartIcon) {
    e.target.setAttribute('src', filledHeartIcon);
  } else {
    e.target.setAttribute('src', emptyHeartIcon);
  }
}



// Catch events:
btnEdit.addEventListener('click', toggleProfileForm); // Click 'Edit' button

btnProfileClose.addEventListener('click', toggleProfileForm); // Click 'Close' button

profileForm.addEventListener('submit', saveProfile); // Click 'Save' button or submit the Profile form by pressing Enter


btnAdd.addEventListener('click', toggleArticleForm); // Click 'Add' button

btnArticleClose.addEventListener('click', toggleArticleForm); // Click 'Close' button

articleForm.addEventListener('submit', saveArticle); // Click 'Save' button or submit the Article form by pressing Enter


btnLike.forEach(element => element.addEventListener('click', toggleLike)); // Attach click event to 'Add' buttons
