// All variables
let profileName = document.querySelector('.profile__name');
let profileActivity = document.querySelector('.profile__activity');

let btnEdit = document.querySelector('.profile__btn-edit');
let popupWindow = document.querySelector('.popup');

let btnClose = popupWindow.querySelector('.popup__btn-close');

let profileForm = popupWindow.querySelector('.input-group[name="profile"]');

let inputName = profileForm.querySelector('.input-group__text-input[name="name"]');
let inputActivity = profileForm.querySelector('.input-group__text-input[name="activity"]');



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
