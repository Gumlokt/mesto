import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(e) {
    const openImage = super.open();
    openImage.atrs = {};
    console.log(e);
    return openImage;
  }
}
