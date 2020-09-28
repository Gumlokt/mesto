export default class FormValidator {
  constructor(cssClasses, formElement) {
    this._cssClasses = cssClasses;
    this._formElement = formElement;
  }


  _showInputError(inputElement) {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    // Показываем сообщение об ошибке
    inputElement.classList.add(this._cssClasses.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._cssClasses.errorClass);
  }


  _hideInputError(inputElement) {
    // Находим элемент ошибки
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    // Скрываем сообщение об ошибке
    inputElement.classList.remove(this._cssClasses.inputErrorClass);
    errorElement.classList.remove(this._cssClasses.errorClass);
    errorElement.textContent = '';
  }


  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true, обход массива прекратится и вся фунцкция hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    })
  }


  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      // showInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле
      this._showInputError(inputElement);
    } else {
      // hideInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле
      this._hideInputError(inputElement);
    }
  }


  _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this._buttonElement.setAttribute('disabled', 'disabled');
      this._buttonElement.classList.add(this._cssClasses.inactiveButtonClass);
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._cssClasses.inactiveButtonClass);
    }
  }


  _setEventListeners() {
    // Находим все поля внутри формы, сделаем из них массив методом Array.from
    this._inputList = Array.from(this._formElement.querySelectorAll(this._cssClasses.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._cssClasses.submitButtonSelector);

    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
        this._isValid(inputElement);

        this._toggleButtonState();
      });
    });
  }


  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      // У каждой формы отменим стандартное поведение
      e.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    this._setEventListeners();
  }
}
