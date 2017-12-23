'use strict';

/**
 * Валидаторы формы.
 */
window.offerForm = (function () {
  var APARTMENT_TYPES = ['bungalo', 'flat', 'house', 'palace'];
  var APARTMENT_PRICES = [0, 1000, 5000, 10000];
  var CHECK_IN_OUT_TIME = ['12:00', '13:00', '14:00'];
  var ROOM_GUESTS_VALIDATION = {
    rooms: [1, 2, 3, 100],
    guests: [1, [1, 2], [1, 2, 3], 0]
  };

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
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();

      window.backend.save(new FormData(form), function () {
        form.reset();
        initSync();
        window.util.showFlashMessage('Форма отправлена. Спасибо!');
      }, function (error) {
        window.util.showFlashMessage('Ошибка отправки формы! ' + error, false);
      });
    });

    form.addEventListener('invalid', function (ev) {
      var fieldName = ev.target.name;

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
  var initSync = function () {
    window.syncTools.synchronizeFields(
        timeIn,
        timeOut,
        CHECK_IN_OUT_TIME,
        CHECK_IN_OUT_TIME,
        window.syncTools.syncValues
    );

    window.syncTools.synchronizeFields(
        timeOut,
        timeIn,
        CHECK_IN_OUT_TIME,
        CHECK_IN_OUT_TIME,
        window.syncTools.syncValues
    );

    window.syncTools.synchronizeFields(
        roomNumber,
        capacity,
        ROOM_GUESTS_VALIDATION.rooms,
        ROOM_GUESTS_VALIDATION.guests,
        window.syncTools.syncMultipleValues,
        true
    );

    window.syncTools.synchronizeFields(
        type,
        price,
        APARTMENT_TYPES,
        APARTMENT_PRICES,
        window.syncTools.syncValueWithMin,
        true
    );
  };

  /**
   * Загрузка фотографий с предпросмотром.
   */
  var initUploader = function () {
    window.uploader.register({
      mode: window.uploader.UPLOADING_MODES.singleFileUpload,
      browseButton: '.notice__photo input[type="file"]',
      targetContainer: '.notice__preview img'
    });
    window.uploader.register({
      mode: window.uploader.UPLOADING_MODES.multiFilesUpload,
      browseButton: '.form__photo-container input[type="file"]',
      targetContainer: '.form__photo-container'
    });
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
    initSync: initSync,
    initUploader: initUploader,
    setAddress: setAddress
  };
})();
