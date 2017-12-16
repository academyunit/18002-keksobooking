'use strict';

window.syncTools = (function () {
  var synchronizeFields = function (element1, element2, values1, values2, callback) {
    element1.addEventListener('change', function () {
      for (var i = 0; i < values1.length; i++) {
        if (element1.value === values1[i]) {
          callback(element2, values2[i]);
          return;
        }
      }
    });
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

  return {
    synchronizeFields: synchronizeFields,
    syncValues: syncValues,
    syncValueWithMin: syncValueWithMin
  };
})();
