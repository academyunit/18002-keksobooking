'use strict';

window.pin = (function () {
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
  var removePins = function (pinsContainer) {
    window.util.removeChildNodes(pinsContainer, ['map__pinsoverlay', 'map__pin--main']);
  };

  /**
   * Отрендерить Pin'ы на карте.
   *
   * @param {Array} pins
   */
  var renderPins = function (pins) {
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
  var deactivatePin = function (pin) {
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
  var activatePin = function (pin) {
    pin.classList.add('map__pin--active');
  };

  /**
   * Выключить подсветку у всех Pin
   *
   * @param {Array} pins
   */
  var deactivatePins = function (pins) {
    Array.prototype.forEach.call(pins, function (pin) {
      deactivatePin(pin);
    });
  };

  /**
   * Логика обработки нажатия на Pin на карте.
   *
   * @param {Event} ev
   */
  var processPin = function (ev) {
    var pin = ev.currentTarget;
    // Деактивировать все ранее активированные Pin'ы
    /**
     * @todo: есть ли какой способ лучше это сделать?
     */
    deactivatePins(window.map.pinsContainer.children);
    activatePin(pin);
  };

  var pinOnMouseDown = function() {
    document.addEventListener('mousemove', pinOnMouseMove);
    document.addEventListener('mouseup', pinOnMouseUp);
  };

  var pinOnMouseMove = function(ev) {
    var markerSize = parseInt(getComputedStyle(window.map.pinMain).height, 10);
    var coordinateX = ev.clientX - window.map.mapContainer.offsetLeft;

    var limitSky = 100 - markerSize / 2;
    var limitGround = 500 - markerSize / 2;

    var coordinateY = ev.clientY - window.map.mapContainer.offsetTop;
    if (coordinateY < limitSky) {
      coordinateY = limitSky;
    }
    if (coordinateY > limitGround) {
      coordinateY = limitGround;
    }

    window.map.pinMain.style.left = coordinateX + 'px';
    window.map.pinMain.style.top = coordinateY + 'px';
  };

  var pinOnMouseUp = function(ev) {
    document.removeEventListener('mousemove', pinOnMouseMove);
    document.removeEventListener('mouseup', pinOnMouseUp);
  };


  return {
    processPin: processPin,
    deactivatePins: deactivatePins,
    renderPins: renderPins,
    removePins: removePins,
    pinOnMouseDown: pinOnMouseDown
  };
})();
