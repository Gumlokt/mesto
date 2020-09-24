export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._popupWindow = this._popupSelector.closest('.popup');
    this._btnClose = this._popupWindow.querySelector('.popup__btn-close');
  }

  open() {
    this._popupWindow.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  
  close() {
    this._popupWindow.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      console.log('Escape pressed');
      this.close();
    }
  }

  setEventListeners() {
    this._btnClose.addEventListener('click', this.close);
  }
}
