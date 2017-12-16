'use strict';
/**
 * Валидаторы формы.
 */
window.offerForm = (function () {
  var form = document.querySelector('.notice__form');
  var title = form.querySelector('#title');

  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var type = form.querySelector('#type');
  var price = form.querySelector('#price');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var address = form.querySelector('#address');

  /**
   * Проверка правильности введенных данных.
   * Делегирование с захватом =)
   */
  var initValidators = function () {
    form.addEventListener('invalid', function (e) {
      var fieldName = e.target.name;

      switch (fieldName) {
        case 'price':
          validatePrice();
          break;
        case 'title':
          validateTitle();
          break;
      }
    }, true);

    /**
     * Проверка минимальной цены.
     */
    var validatePrice = function () {
      errorShow(price);
      price.setCustomValidity('');

      if (price.validity.typeMismatch) {
        price.setCustomValidity('Цена должна быть числом!');
      }
      if (price.validity.valueMissing) {
        price.setCustomValidity('Обязательное поле');
      }
      if (price.validity.rangeUnderflow) {
        price.setCustomValidity('Минимальная цена - ' + price.min);
      }
      if (price.validity.rangeOverflow) {
        price.setCustomValidity('Максимальная цена - ' + price.max);
      }

      if (price.validity.valid) {
        errorHide(price);
      }
    };

    /**
     * Проверка названия.
     */
    var validateTitle = function () {
      title.addEventListener('invalid', function () {
        errorShow(title);
        title.setCustomValidity('');

        if (title.validity.valueMissing) {
          title.setCustomValidity('Обязательное поле');
        }
        if (title.validity.tooShort) {
          title.setCustomValidity('Минимальное количество символов - ' + title.minLength);
        }
        if (title.validity.tooLong) {
          title.setCustomValidity('Максимальное количество символов - ' + title.maxLength);
        }

        if (title.validity.valid) {
          errorHide(title);
        }
      });
    };

    /**
     * Показать ошибку на input'e.
     *
     * @param {Element} element
     */
    var errorHide = function (element) {
      errorShow(element, true);
    };

    /**
     * Скрыть ошибку на input'e.
     *
     * @param {Element} element
     * @param {boolean} revertChanges
     */
    var errorShow = function (element, revertChanges) {
      element.style.border = revertChanges ? '' : '2px solid red';
    };
  };

  /**
   * Автоматическая корректировка полей в форме.
   */
  var initRelatedFieldsHandlers = function () {
    var synchronizeFields = {
      rooms: {
        1: [1],
        2: [1, 2],
        3: [1, 2, 3],
        100: [0]
      }
    };
    var apartmentTypes = ['bungalo', 'flat', 'house', 'palace'];
    var prices = [0, 1000, 5000, 10000];
    var checkInTime = ['12:00', '13:00', '14:00'];

    /**
     * Валидатор гостей в комнатах.
     */
    var guestsNumberHandler = function () {
      if (!roomNumber.value) {
        return;
      }

      var allowedOptions = synchronizeFields['rooms'][roomNumber.value];
      Array.prototype.forEach.call(capacity, function (option) {
        option.disabled = isDisabled(allowedOptions, option);
        if (allowedOptions.length) {
          capacity.value = allowedOptions[0];
        }
      });
    };

    /**
     * Опция выключена ? (нет в списке разрешенных)
     *
     * @param {Array} allowedOptions
     * @param {Element} option
     * @return {boolean}
     */
    var isDisabled = function (allowedOptions, option) {
      return allowedOptions.indexOf(parseInt(option.value, 10)) < 0;
    };

    window.syncTools.synchronizeFields(timeIn, timeOut, checkInTime, checkInTime, window.syncTools.syncValues);
    window.syncTools.synchronizeFields(timeOut, timeIn, checkInTime, checkInTime, window.syncTools.syncValues);
    window.syncTools.synchronizeFields(type, price, apartmentTypes, prices, window.syncTools.syncValueWithMin);

    roomNumber.addEventListener('change', guestsNumberHandler);

    guestsNumberHandler();
  };

  /**
   * Обновить адрес в форме.
   *
   * @param {number} x
   * @param {number} y
   */
  var setAddress = function (x, y) {
    address.value = 'x: ' + x + ', y: ' + y;
  };

  return {
    initValidators: initValidators,
    initRelatedFieldsHandlers: initRelatedFieldsHandlers,
    setAddress: setAddress
  };
})();
