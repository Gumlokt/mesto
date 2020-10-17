import Popup from '../components/Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, { submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm; // this is callback function
  }


  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', () => { this._submitForm(); });
  }
}
