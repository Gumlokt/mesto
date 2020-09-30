export default class UserInfo {
  constructor(selectors) {
    this._name = document.querySelector(selectors.name);
    this._activity = document.querySelector(selectors.activity);
    this._sourceOfTruthAboutUser = {}; // Вот он, тот самый "один источник правды" ;-)
  }


  _renderUserInfo() {
    this._name.textContent = this._sourceOfTruthAboutUser.name;
    this._activity.textContent = this._sourceOfTruthAboutUser.activity;
  }


  getUserInfo() {
    return this._sourceOfTruthAboutUser;
  }


  setUserInfo(newValues) {
    this._sourceOfTruthAboutUser.name = newValues.name;
    this._sourceOfTruthAboutUser.activity = newValues.activity;

    this._renderUserInfo();
  }
}
