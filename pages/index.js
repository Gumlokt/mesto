let profileName = document.querySelector('.profile__name');
let profileActivity = document.querySelector('.profile__activity');

let inputName = document.querySelector('.input-group__text-input[name="name"]');
let inputActivity = document.querySelector('.input-group__text-input[name="activity"]');


// Catch event: Click 'Edit' button
let btnEdit = document.querySelector('.profile__btn-edit');
let popup = document.querySelector('.popup');

btnEdit.addEventListener('click', function () {
  popup.classList.add('popup_opened');

  inputName.value = profileName.textContent;
  inputActivity.value = profileActivity.textContent;
});


// Catch event: Click 'Close' icon
let popupTimes = document.querySelector('.popup__times');

popupTimes.addEventListener('click', function () {
  popup.classList.remove('popup_opened');

  inputName.value = '';
  inputActivity.value = '';
});


// Catch event: Click 'Save' button
let btnSave = document.querySelector('.input-group__btn-save');
btnSave.addEventListener('click', saveProfile);


// Catch event: press Enter on keyboard
inputName.addEventListener('keydown', function(e) {
  if (e.keyCode === 13) {
    saveProfile();
  }
});

inputActivity.addEventListener('keydown', function(e) {
  if (e.keyCode === 13) {
    saveProfile();
  }
});


// Function definition: Save Profile
function saveProfile() {
  popup.classList.remove('popup_opened');

  profileName.textContent = inputName.value;
  profileActivity.textContent = inputActivity.value;

  inputName.value = '';
  inputActivity.value = '';
}
