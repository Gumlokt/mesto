import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm; // this is callback function
  }


  _getInputValues() {
    this._inputsArray = Array.from(this._popupSelector.querySelectorAll('.form__text-input')); // исправить селектор на переменную!!!

    this._inputList = {};

    this._inputsArray.forEach((item) => {
      this._inputList[item.name] = item.value;
    });

    return this._inputList;
  }


  fillUpInputs(values) {
    this._inputsArray = Array.from(this._popupSelector.querySelectorAll('.form__text-input')); // исправить селектор на переменную!!!

    this._inputsArray.forEach((item) => {
      item.value = values[item.name];
    });
  }


  close() {
    super.close();
    this._popupSelector.reset();
    // добавить очистку ошибок, отображаемых пользователю (см. css-класс .form__input-error)
  }


  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', this._submitForm);
  }
}
