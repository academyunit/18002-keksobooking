'use strict';

(function () {
  /**
   * Создать Pin кнопку для карты.
   *
   * @param {Array} data
   * @return {Element}
   */
  var getPinButton = function (data) {
    var pinButton = document.createElement('button');
    pinButton.style.left = data.location.x + 'px';
    pinButton.style.top = data.location.y + 'px';
    pinButton.className = 'map__pin';
    pinButton.tabIndex = 0;
    pinButton.dataset.id = data.id;

    var pinImage = document.createElement('img');
    pinImage.src = data.author.avatar;
    pinImage.width = 40;
    pinImage.height = 40;
    pinImage.dragable = false;

    pinButton.appendChild(pinImage);

    return pinButton;
  };

  /**
   * Удалить все Pin с карты.
   *
   * @param {Element} pinsContainer
   */
  window.removePins = function (pinsContainer) {
    window.util.removeChildNodes(pinsContainer, ['map__pinsoverlay', 'map__pin--main']);
  };

  /**
   * Отрендерить Pin'ы на карте.
   *
   * @param {Array} pins
   */
  window.renderPins = function (pins) {
    var pinContainer = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(getPinButton(pins[i]));
    }
    pinContainer.appendChild(fragment);
  };

  /**
   * Выключить подсветку для Pin.
   *
   * @param {Element} pin
   */
  window.deactivatePin = function (pin) {
    if (!pin.classList.contains('map__pin')) {
      return;
    }
    pin.classList.remove('map__pin--active');
  };

  /**
   * Включить подсветку для Pin.
   *
   * @param {Element} pin
   */
  window.activatePin = function (pin) {
    pin.classList.add('map__pin--active');
  };

  /**
   * @param {Array} pins
   * Выключить подсветку у всех Pin
   */
  window.deactivatePins = function (pins) {
    Array.prototype.forEach.call(pins, function (pin) {
      window.deactivatePin(pin);
    });
  };

  /**
   * Найти Pin по его ID.
   *
   * @param {number} id
   * @return {Array|null}
   */
  window.findPinById = function (id) {
    /**
     * @todo: вот так вот дергать из window postData - думается мне это очень-чень плохо =))
     * Как пофиксить?
    */
    for (var i = 0; i < window.postData.length; i++) {
      if (parseInt(window.postData[i].id, 10) === parseInt(id, 10)) {
        return window.postData[i];
      }
    }

    return null;
  };

  /**
   * Логика обработки нажатия на Pin на карте.
   *
   * @param {Event} ev
   */
  window.processPin = function (ev) {
    var pin = ev.currentTarget;
    // Деактивировать все ранее активированные Pin'ы
    // @todo: вот так ок передавать сюда параметры или это странно? или зашить window.pins внутрь deactivatePins() ?
    window.deactivatePins(window.pins);
    // Текущий Pin ктивировать
    window.activatePin(pin);
  };
})();
