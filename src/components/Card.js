export default class Card {
  constructor(data, template) {
    this._title = data.title;
    this._link = data.link;
    this._handleCardClick = data.handleCardClick; // must be a function

    this._template = template;
  }


  _getTemplate() {
    const newCard = document.querySelector(this._template).content.cloneNode(true);

    return newCard;
  }


  _removeElement(e) {
    e.target.closest('.element').remove();
    // this._card.remove();
    // Вызов this._card.remove() не срабатывает. И, если я правильно понял, это связано с тем, что
    // this._card в момент добавления обработчика события клика на кнопку removeButton является
    // объетом DocumentFragment. А согласно документации, у DocumentFragment нет метода remove().
    // Ссылка на документацию: https://developer.mozilla.org/ru/docs/Web/API/DocumentFragment
    // 
    // В связи с вышесказаным, я начал сомневаться в том, что методы _removeElement и _toggleLike 
    // можно сделать независимыми от объекта события. Если можно, дайте, пожалуйста, дополнительную
    // наводку на то, как можно обойтись без объекта события. Заранее благодарен :-)
  }


  _toggleLike(e) {
    e.target.classList.toggle('element__btn-like_clicked');
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

    cardImage.addEventListener('click', this._handleCardClick);
    removeButton.addEventListener('click', this._removeElement);
    // removeButton.addEventListener('click', this._removeElement.bind(this)); // см. коммент в строке 21
    likeButton.addEventListener('click', this._toggleLike);

    return this._card;
  }
}
