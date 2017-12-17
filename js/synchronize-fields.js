'use strict';

window.syncTools = (function () {
  /**
   * Синхронизировать значения поля 1 со значениями поля 2, используя логику из callback.
   *
   * @param {Element} element1
   * @param {Element} element2
   * @param {Array} values1
   * @param {Array} values2
   * @param {Function} callback
   * @param {Boolean} runOnInit Запустить callback сразу после объявления обработчика.
   */
  var synchronizeFields = function (element1, element2, values1, values2, callback, runOnInit) {
    var changeEventHandler = function () {
      for (var i = 0; i < values1.length; i++) {
        if (element1.value === values1[i].toString()) {
          callback(element2, values2[i]);
          return;
        }
      }
    };
    element1.addEventListener('change', changeEventHandler);

    if (runOnInit) {
      changeEventHandler();
    }
  };

  /**
   * Синхронизация значения.
   *
   * @param {Element} element
   * @param {number} value
   */
  var syncValues = function (element, value) {
    element.value = value;
  };

  /**
   * Синхронизация с минимальным значением.
   *
   * @param {Element} element
   * @param {number} value
   */
  var syncValueWithMin = function (element, value) {
    element.min = value;
    element.placeholder = value;
  };

  /**
   * Простановка disabled для элементов, которые вне диапазона допустимых значений.
   *
   * @param {Element} element
   * @param {String|Array} value
   */
  var syncDisabledValues = function (element, value) {
    Array.prototype.forEach.call(element, function (item) {
      if (value.constructor === Array) {
        item.disabled = true;

        if (value.indexOf(parseInt(item.value, 10)) > -1) {
          item.disabled = false;
          element.value = item.value;
        }
        return;
      }

      item.disabled = true;
      if (parseInt(item.value, 10) === parseInt(value, 10)) {
        item.disabled = false;
        element.value = item.value;
      }
    });
  };

  return {
    synchronizeFields: synchronizeFields,
    syncValues: syncValues,
    syncValueWithMin: syncValueWithMin,
    syncMultipleValues: syncDisabledValues
  };
})();
