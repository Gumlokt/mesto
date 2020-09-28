export default class UserInfo {
  constructor(selectors) {
    this._name = document.querySelector(selectors.name);
    this._activity = document.querySelector(selectors.activity);
  }


  getUserInfo() {
    return { name: this._name.textContent, activity: this._activity.textContent };
  }


  setUserInfo(newValues) {
    this._name.textContent = newValues.name;
    this._activity.textContent = newValues.activity;
  }
}
