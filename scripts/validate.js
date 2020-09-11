/** The set of CSS selectors and classes. */
export const cssClasses = {
  formSelector: '.form',
  inputSelector: '.form__text-input',
  submitButtonSelector: '.form__btn-save',
  inactiveButtonClass: 'form__btn-save_disabled',
  inputErrorClass: 'form__text-input_type_error',
  errorClass: 'form__input-error_active'
};


/**
 * Displays error message for editing input.
 * @function
 * @param {object} formElement - The form.
 * @param {object} inputElement - The input.
 * @param {string} errorMessage - The error message to display.
 * @param {object} cssClasses - The set of CSS selectors and classes.
 */
const showInputError = (formElement, inputElement, errorMessage, cssClasses) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  // Показываем сообщение об ошибке
  inputElement.classList.add(cssClasses.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(cssClasses.errorClass);
};


/**
 * Hides error message for editing input.
 * @function
 * @param {object} formElement - The form.
 * @param {object} inputElement - The input.
 * @param {object} cssClasses - The set of CSS selectors and classes.
 */
const hideInputError = (formElement, inputElement, cssClasses) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  // Скрываем сообщение об ошибке
  inputElement.classList.remove(cssClasses.inputErrorClass);
  errorElement.classList.remove(cssClasses.errorClass);
  errorElement.textContent = '';
};


/**
 * Checks if at least one of all inputs has invalid value.
 * @function
 * @param {object} inputList - All inputs of the editing form.
 */
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true, обход массива прекратится и вся фунцкция hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};


/**
 * Checks if editing input has (or does not have) invalid value to envoke appropriate function.
 * @function
 * @param {object} formElement - The form.
 * @param {object} inputElement - The input.
 * @param {object} cssClasses - The set of CSS selectors and classes.
 */
const isValid = (formElement, inputElement, cssClasses) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage, cssClasses);
  } else {
    // hideInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, cssClasses);
  }
};


/**
 * Sets/unsets 'disabled' state for submit button.
 * @function
 * @param {object} inputList - All inputs of the editing form.
 * @param {object} buttonElement - The submit button.
 * @param {string} inactiveButtonClass - The CSS class for disabled button.
 */
export const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.setAttribute('disabled', 'disabled');
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(inactiveButtonClass);
  }
};


/**
 * Resets form to default values.
 * @function
 * @param {object} formElement - The form of popup window.
 */
export function resetForm(formElement) {
  formElement.reset();

  const inputList = Array.from(formElement.querySelectorAll(cssClasses.inputSelector));

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, cssClasses);
  });

  toggleButtonState(inputList, formElement.elements.saveButton, cssClasses.inactiveButtonClass);
}


/**
 * Sets event listeners to all inputs of the passed form.
 * @function
 * @param {object} formElement - The form.
 * @param {object} cssClasses - The set of CSS selectors and classes.
 */
const setEventListeners = (formElement, cssClasses) => {
  // Находим все поля внутри формы, сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(cssClasses.inputSelector));
  const buttonElement = formElement.querySelector(cssClasses.submitButtonSelector);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, cssClasses);

      toggleButtonState(inputList, buttonElement, cssClasses.inactiveButtonClass);
    });
  });
};


/**
 * Sets event listeners for all forms of the page to validate all its inputs.
 * @function
 * @param {object} cssClasses - The set of CSS selectors and classes.
 */
const enableValidation = (cssClasses) => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(cssClasses.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => {
      // У каждой формы отменим стандартное поведение
      e.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement, cssClasses);
  });
};


/** Starts the validation process. */
enableValidation(cssClasses);
