import FormValidator from "./FormValidator.js";


/** The set of CSS selectors and classes. */
export const cssClasses = {
  formSelector: '.form',
  inputSelector: '.form__text-input',
  submitButtonSelector: '.form__btn-save',
  inactiveButtonClass: 'form__btn-save_disabled',
  inputErrorClass: 'form__text-input_type_error',
  errorClass: 'form__input-error_active'
};


/** Prepares array containing all forms of the page. */
const formList = Array.from(document.querySelectorAll(cssClasses.formSelector));


/** Starts to validate inputs of the forms. */
formList.forEach((formElement) => {
  const validatingForm = new FormValidator(cssClasses, formElement);
  validatingForm.enableValidation();
});
