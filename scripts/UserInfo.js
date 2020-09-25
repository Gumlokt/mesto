import Popup from './Popup.js';

export default class UserInfo extends Popup {
  constructor(selectors) {
    super(selectors.name);
    this._name = selectors.name;
    this._activity = selectors.activity;
  }

  close() {
    super.close();
    this._popupSelector.reset();
    // добавить очистку ошибок, отображаемых пользователю (см. css-класс .form__input-error)
  }


  setEventListeners() {
    super.setEventListeners();
    // this._popupSelector.addEventListener('submit', this._submitForm);
  }


  getUserInfo() {
    const profileName = document.querySelector('.profile__name');
    const profileActivity = document.querySelector('.profile__activity');

    this._userProfile = {};

    this._userProfile.name = profileName.textContent;
    this._userProfile.activity = profileActivity.textContent;

    return this._userProfile;
  }


  setUserInfo() {}
}
