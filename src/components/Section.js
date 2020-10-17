export default class Section {
  constructor({ cardsList, renderer }, containerSelector) {
    this._cardsList = cardsList;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }


  appendItem(element) {
    this._container.append(element);
  }


  prependItem(element) {
    this._container.prepend(element);
  }


  renderItems() {
    this._cardsList.forEach((card) => {
      this._renderer(card, true); // true means append item, false - prepend
    });
  }


  addItem(card) {
    this._renderer(card, false);
  }
}
