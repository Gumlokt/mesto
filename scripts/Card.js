export default class Card {
  constructor(cardForm, template) {
    this._title = cardForm.elements.title.value;
    this._link = cardForm.elements.link.value;
    this._template = template;

    console.log(this._title);
  }


  _getTemplate() {
    const newCard = document.querySelector('#element').content.cloneNode(true);

    return newCard;
  }


  _zoomImage(e) {
    const element = e.target.closest('.element');

    const popupImageContainer = document.querySelector('.popup__image-container');
    const imageWindow = popupImageContainer.closest('.popup');
    const btnImageClose = imageWindow.querySelector('.popup__btn-close');

    const popupImage = popupImageContainer.querySelector('.popup__image');
    const popupImageTitle = popupImageContainer.querySelector('.popup__image-title');

    popupImage.src = e.target.src;
    popupImage.alt = e.target.alt.replace('Фото', 'Фото на весь экран');
    popupImageTitle.textContent = element.querySelector('.element__title').textContent;

    togglePopupWindow(imageWindow);
  }


  _removeElement(e) {
    e.target.closest('.element').remove();
  }


  _toggleLike(e) {
    if(e.target.classList.contains('element__btn-like_clicked')) {
      e.target.classList.remove('element__btn-like_clicked');
    } else {
      e.target.classList.add('element__btn-like_clicked');
    }
  }


  createCard() {
    this._card = this._getTemplate();


    const cardTitle = this._card.querySelector('.element__title');
    const cardImage = this._card.querySelector('.element__image');
    const removeButton = this._card.querySelector('.element__btn-remove');
    const likeButton = this._card.querySelector('.element__btn-like');


    cardTitle.textContent = this._title;
    cardImage.src = this._link;
    cardImage.alt = 'Фото. ' + this._title;


    cardImage.addEventListener('click', this._zoomImage);
    removeButton.addEventListener('click', this._removeElement);
    likeButton.addEventListener('click', this._toggleLike);

    return this._card;
  }
}
