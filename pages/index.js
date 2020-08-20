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
let popupWindow = document.querySelector('.popup');

let btnClose = popupWindow.querySelector('.popup__btn-close');

let profileForm = popupWindow.querySelector('.input-group[name="profile"]');

let inputName = profileForm.querySelector('.input-group__text-input[name="name"]');
let inputActivity = profileForm.querySelector('.input-group__text-input[name="activity"]');




for (let i = 0; i < elementsArray.length; i++) {
  const element = elementTemplate.cloneNode(true);

  element.querySelector('.element__image').src = elementsArray[i].link;
  element.querySelector('.element__title').textContent = elementsArray[i].name;

  elements.append(element);
}

// Function definition: Open/Close popup window with form
function togglePopupForm() {
  if(popupWindow.classList.contains('popup_opened')) {
    popupWindow.classList.remove('popup_opened');

    inputName.value = '';
    inputActivity.value = '';
  } else {
    inputName.value = profileName.textContent;
    inputActivity.value = profileActivity.textContent;

    popupWindow.classList.add('popup_opened');
  }
}

// Function definition: Save Profile and close popup
function saveProfile(e) {
  e.preventDefault();

  profileName.textContent = inputName.value;
  profileActivity.textContent = inputActivity.value;

  togglePopupForm();
}



// Catch events:
btnEdit.addEventListener('click', togglePopupForm); // Click 'Edit' button

btnClose.addEventListener('click', togglePopupForm); // Click 'Close' button

profileForm.addEventListener('submit', saveProfile); // Click 'Save' button or submit the form by pressing Enter
