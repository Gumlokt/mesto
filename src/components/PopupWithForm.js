import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitForm, cssClasses, resetForm, toggleButtonState }) {
    super(popupSelector);

    this._submitForm = submitForm; // this is callback function
    this._cssClasses = cssClasses;
    this._resetForm = resetForm;
    this._toggleButtonState = toggleButtonState;

    this._inputsArray = Array.from(this._popupSelector.querySelectorAll(this._cssClasses.inputSelector));
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

    this._toggleButtonState(this._inputsArray, this._popupSelector.elements.saveButton);
  }


  close() {
    super.close();
    this._resetForm(this._popupSelector, this._inputsArray);
  }


  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', this._submitForm);
  }
}
