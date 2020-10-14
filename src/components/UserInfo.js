export default class UserInfo {
  constructor(selectors) {
    this._name = document.querySelector(selectors.name);
    this._about = document.querySelector(selectors.about);
    this._avatar = document.querySelector(selectors.avatar);
    this._sourceOfTruthAboutUser = {}; // Вот он, тот самый "один источник правды" ;-)
  }


  _renderUserInfo() {
    this._name.textContent = this._sourceOfTruthAboutUser.name;
    this._about.textContent = this._sourceOfTruthAboutUser.about;
    this._avatar.src = this._sourceOfTruthAboutUser.avatar;
  }


  getUserInfo() {
    return this._sourceOfTruthAboutUser;
  }


  setUserInfo(newValues) {
    this._sourceOfTruthAboutUser._id = newValues._id;
    this._sourceOfTruthAboutUser.name = newValues.name;
    this._sourceOfTruthAboutUser.about = newValues.about;
    this._sourceOfTruthAboutUser.avatar = newValues.avatar;

    this._renderUserInfo();
  }
}
