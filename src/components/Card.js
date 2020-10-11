export default class Card {
  constructor(data, template) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes,
    this._isOwner = data.isOwner,
    this._handleCardClick = data.handleCardClick; // must be a function
    this._handleCardDeletion = data.handleCardDeletion; // must be a function

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
    const totalLikes = this._card.querySelector('.element__likes');

    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = 'Фото. ' + this._name;
    totalLikes.textContent = this._likes;

    cardImage.addEventListener('click', this._handleCardClick);
    this._likeButton.addEventListener('click', () => { this._toggleLike(); });

    if(this._isOwner) {
      // removeButton.addEventListener('click', () => { this._removeElement(); });
      removeButton.addEventListener('click', () => { this._handleCardDeletion(); });
    } else {
      removeButton.remove();
    }

    return this._card;
  }
}
