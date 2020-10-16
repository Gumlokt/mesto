import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupImage = this._popupSelector.querySelector('.popup__image');
    this._popupImageTitle = this._popupSelector.querySelector('.popup__image-title');
  }


  open(card) {
    super.open();

    this._popupImageTitle.textContent = card.name;
    this._popupImage.src = card.link;
    this._popupImage.alt = card.name.replace('Фото', 'Фото на весь экран');
  }
}
