'use strict';

(function () {
  var KEYBOARD_KEY_ENTER = 13;
  var KEYBOARD_KEY_ESC = 27;

  /**
   * @todo:
   * 1) здесь нужен JSDoc и в каком формате его писать? К каждому методу или просто для объекта?
   * 2) как-то теперь все очень странно выглядит и совсем неудобно. Как сделать лучше?
   * 3) Если нужно обратиться к методу этого модуля изнутри этого модуля, то обязательно дописывать window все время впереди
   *  (как в getRandomArrayElement() сделано сейчас) ?
   *
   * @type {{isEnterKeyPressed: Window.util.isEnterKeyPressed, isEscKeyPressed: Window.util.isEscKeyPressed}}
   */
  window.util = {
    isEnterKeyPressed: function (ev) {
      return KEYBOARD_KEY_ENTER === ev.keyCode;
    },
    isEscKeyPressed: function (ev) {
      return KEYBOARD_KEY_ESC === ev.keyCode;
    },
    /**
     * Получить случайный элемент массива
     *
     * @param {Array} arr
     * @return {string}
     */
    getRandomArrayElement: function (arr) {
      return arr[window.util.getRandomArrayIndex(arr)];
    },
    /**
     * Получить случайный индекс
     *
     * @param {Array} arr
     * @return {number}
     */
    getRandomArrayIndex: function (arr) {
      return Math.floor(Math.random() * arr.length);
    },
    /**
     * Получить случайное число
     *
     * @param {number} max
     * @param {number} min
     * @return {number}
     */
    getRandom: function (max, min) {
      min = min || 0;
      return Math.floor(Math.random() * (max - min) + min);
    },
    /**
     * Перемешать массив.
     *
     * @param {Array} arr
     * @return {Array}
     */
    shuffleArray: function (arr) {
      return arr.sort(function () {
        return 0.5 - Math.random();
      });
    },
    /**
     * Получить случайный уникальный элемент массива.
     *
     * @param {Array} arr Массив элементов
     * @return {string}
     */
    getRandomUniqueValue: function (arr) {
      return window.util.shuffleArray(arr).pop();
    },
    /**
     * Удалить все дочерние элементы у DOM ноды.
     *
     * @param {Element} node Текущая нода, у которой нужно удалить children'ов
     * @param {Array} skipClasses Массив классов, которые удалять нельзя
     */
    removeChildNodes: function (node, skipClasses) {
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
    }

  };
})();
