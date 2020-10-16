export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._popupWindow = this._popupSelector.closest('.popup');
    this._btnClose = this._popupWindow.querySelector('.popup__btn-close');

    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this);
  }


  open() {
    this._popupWindow.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }


  close() {
    this._popupWindow.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }


  setBtnSaveText(text) {
    this._btnSave.textContent = text;
  }


  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }


  setEventListeners() {
    this._btnClose.addEventListener('click', this.close);
    this._popupWindow.addEventListener('click', (e) => {
      if (this._popupWindow.classList.contains('popup_opened') && e.target.classList.contains('popup')) {
        this.close();
      }
    });
  }
}
