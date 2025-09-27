// error-handler.js
let showErrorFn = () => {};

export const registerErrorHandler = (fn) => {
  showErrorFn = fn;
};

export const showError = (title, message) => {
  showErrorFn(title, message);
};
