import { cssClasses } from './validate.js';
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm; // this is callback function
    this._inputsArray = Array.from(this._popupSelector.querySelectorAll(cssClasses.inputSelector));
  }


    _getInputValues() {
    this._inputList = {};

    this._inputsArray.forEach((item) => {
      this._inputList[item.name] = item.value;
    });

    return this._inputList;
  }


  fillUpInputs(values) {
    this._inputsArray.forEach((item) => {
      item.value = values[item.name];
    });
  }


  close() {
    super.close();
    this._popupSelector.reset();

    // очистка ошибок, отображаемых пользователю
    this._inputsArray.forEach((inputElement) => {
      const errorElement = this._popupSelector.querySelector(`#${inputElement.id}-error`);

      inputElement.classList.remove(cssClasses.inputErrorClass);
      errorElement.classList.remove(cssClasses.errorClass);
      errorElement.textContent = '';
    });

  }


  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', this._submitForm);
  }
}
