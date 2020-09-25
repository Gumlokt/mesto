import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }


  open(e) {
    super.open();
    const element = e.target.closest('.element');

    const popupImage = this._popupSelector.querySelector('.popup__image');
    const popupImageTitle = this._popupSelector.querySelector('.popup__image-title');

    popupImage.src = e.target.src;
    popupImage.alt = e.target.alt.replace('Фото', 'Фото на весь экран');
    popupImageTitle.textContent = element.querySelector('.element__title').textContent;
  }
}
