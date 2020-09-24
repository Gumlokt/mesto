import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm; // callback func
  }

  _getInputValues() {
    this._inputsArray = Array.from(this._popupSelector.querySelectorAll('.form__text-input')); // исправить селектор на переменную!!!

    this._inputsArray.forEach((item) => {
      this._inputList[item.name] = item.value;
    });

    return this._inputList;
  }

  // setEventListeners() {
  //   const events = super.setEventListeners();
  //   this._popupSelector.addEventListener('submit', this._submitForm);
  // }

  // close() {
  //   super.close();
  //   this._popupSelector.reset();
  // }
}
