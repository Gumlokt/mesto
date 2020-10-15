export default class Card {
  constructor(data, template) {
    this._cardData = data.cardData;
    this._userInfo = data.userInfo;

    this._handleCardClick = data.handleCardClick; // must be a function
    this._handleLikeClick = data.handleLikeClick; // must be a function
    this._handleCardDeletion = data.handleCardDeletion; // must be a function

    this._template = template;
  }


  _getTemplate() {
    const newCard = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);

    return newCard;
  }


  _removeElement() {
    this._card.remove();
    this._card = null;
  }


  _checkIfLiked() {
    return this._cardData.likes.some((item) => {
      return item._id === this._userInfo._id;
    });
  }


  _toggleLike(totalLikes) {
    this._likeButton.classList.toggle('element__btn-like_clicked');
    this._totalLikes.textContent = totalLikes;
  }


  createCard() {
    this._card = this._getTemplate();

    const cardTitle = this._card.querySelector('.element__title');
    const cardImage = this._card.querySelector('.element__image');
    const removeButton = this._card.querySelector('.element__btn-remove');
    this._likeButton = this._card.querySelector('.element__btn-like');
    this._totalLikes = this._card.querySelector('.element__likes');

    cardTitle.textContent = this._cardData.name;
    cardImage.src = this._cardData.link;
    cardImage.alt = `Фото. ${this._cardData.name}`;
    this._totalLikes.textContent = this._cardData.likes.length;

    cardImage.addEventListener('click', this._handleCardClick);
    this._likeButton.addEventListener('click', () => { this._handleLikeClick(this._cardData._id); });

    if(this._userInfo._id === this._cardData.owner._id) {
      removeButton.addEventListener('click', () => { this._handleCardDeletion(); });
    } else {
      removeButton.remove();
    }

    if(this._checkIfLiked()) {
      this._toggleLike(this._cardData.likes.length);
    }

    return this._card;
  }
}
