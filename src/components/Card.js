export default class Card {
  constructor(data, template) {
    this._title = data.title;
    this._link = data.link;
    this._handleCardClick = data.handleCardClick; // must be a function

    this._template = template;
  }


  _getTemplate() {
    const newCard = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);

    return newCard;
  }


  _removeElement() {
    this._card.remove();
  }


  _toggleLike() {
    this._likeButton.classList.toggle('element__btn-like_clicked');
  }


  createCard() {
    this._card = this._getTemplate();

    const cardTitle = this._card.querySelector('.element__title');
    const cardImage = this._card.querySelector('.element__image');
    const removeButton = this._card.querySelector('.element__btn-remove');
    this._likeButton = this._card.querySelector('.element__btn-like');

    cardTitle.textContent = this._title;
    cardImage.src = this._link;
    cardImage.alt = 'Фото. ' + this._title;

    cardImage.addEventListener('click', this._handleCardClick);
    removeButton.addEventListener('click', () => { this._removeElement(); });
    this._likeButton.addEventListener('click', () => { this._toggleLike(); });

    return this._card;
  }
}
