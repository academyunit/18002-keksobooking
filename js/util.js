'use strict';

window.util = (function () {
  var KEYBOARD_KEY_ENTER = 13;
  var KEYBOARD_KEY_ESC = 27;

  /**
   * Нажатие ENTER
   *
   * @param {Event} ev
   * @return {boolean}
   */
  var isEnterKeyPressed = function (ev) {
    return KEYBOARD_KEY_ENTER === ev.keyCode;
  };

  /**
   * Нажатие ESC
   *
   * @param {Event} ev
   * @return {boolean}
   */
  var isEscKeyPressed = function (ev) {
    return KEYBOARD_KEY_ESC === ev.keyCode;
  };

  /**
   * Получить случайный элемент массива
   *
   * @param {Array} arr
   * @return {string}
   */
  var getRandomArrayElement = function (arr) {
    return arr[getRandomArrayIndex(arr)];
  };

  /**
   * Получить случайный индекс
   *
   * @param {Array} arr
   * @return {number}
   */
  var getRandomArrayIndex = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  /**
   * Получить случайное число
   *
   * @param {number} max
   * @param {number} min
   * @return {number}
   */
  var getRandom = function (max, min) {
    min = min || 0;
    return Math.floor(Math.random() * (max - min) + min);
  };

  /**
   * Перемешать массив.
   *
   * @param {Array} arr
   * @return {Array}
   */
  var shuffleArray = function (arr) {
    return arr.sort(function () {
      return 0.5 - Math.random();
    });
  };

  /**
   * Получить случайный уникальный элемент массива.
   *
   * @param {Array} arr Массив элементов
   * @return {string}
   */
  var getRandomUniqueValue = function (arr) {
    return shuffleArray(arr).pop();
  };

  /**
   * Удалить все дочерние элементы у DOM ноды.
   *
   * @param {Element} node Текущая нода, у которой нужно удалить children'ов
   * @param {Array} skipClasses Массив классов, которые удалять нельзя
   */
  var removeChildNodes = function (node, skipClasses) {
    if (!node) {
      return;
    }
    skipClasses = skipClasses || [];

    var children = Array.prototype.slice.call(node.children);
    children.forEach(function (childNode) {
      var skipElement = skipClasses.some(function (skipClass) {
        return childNode.classList.contains(skipClass);
      });
      if (!skipElement) {
        node.removeChild(childNode);
      }
    });
  };

  /**
   * enable/disable для инпута формы
   *
   * @param {Element|Node} form
   * @param {boolean} isEnabled
   */
  var toggleFieldsets = function (form, isEnabled) {
    isEnabled = isEnabled || false;
    Array.prototype.slice.call(form).forEach(function (element) {
      if (element.tagName.toLowerCase() !== 'fieldset') {
        return;
      }
      element.disabled = isEnabled;
    });
  };

  /**
   * enable/disable для формы
   *
   * @param {Element|Node} form
   */
  var showForm = function (form) {
    form.classList.remove('notice__form--disabled');
  };

  return {
    isEnterKeyPressed: isEnterKeyPressed,
    isEscKeyPressed: isEscKeyPressed,
    getRandomArrayElement: getRandomArrayElement,
    getRandomArrayIndex: getRandomArrayIndex,
    getRandom: getRandom,
    shuffleArray: shuffleArray,
    getRandomUniqueValue: getRandomUniqueValue,
    removeChildNodes: removeChildNodes,
    switchFieldsetsControls: toggleFieldsets,
    showForm: showForm
  };
})();
