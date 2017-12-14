'use strict';
window.map = (function () {
  var LOCATION_RESTRICTIONS = {
    x: {
      min: 300,
      max: 900
    },
    y: {
      min: 100,
      max: 500
    }
  };

  var mapContainer = document.querySelector('.map');
  var pinsContainer = mapContainer.querySelector('.map__pins');

  var form = document.querySelector('.notice__form');
  var pinMain = mapContainer.querySelector('.map__pin--main');

  /**
   * enable/disable для карты
   */
  var showMap = function () {
    mapContainer.classList.remove('map--faded');
  };

  var checkLimit = function (number, limitMin, limitMax) {
    return Math.min(Math.max(number, limitMin), limitMax);
  };

  /**
   * Кнопка нажата
   * @param {Event} ev
   */
  var pinOnMouseDown = function(ev) {
    ev.preventDefault();

    var startCoordinates = {
      x: ev.clientX,
      y: ev.clientY
    };

    /**
     * В процессе.
     * @param {Event} moveEv
     */
    var onMouseMove = function (moveEv) {
      moveEv.preventDefault();

      var markerHalfSize = parseInt(getComputedStyle(window.map.pinMain).height, 10) / 2;

      var shift = {
        x: startCoordinates.x - window.map.pinMain.offsetLeft,
        y: startCoordinates.y - window.map.pinMain.offsetTop
      };

      var moveLimits = {
        minX: LOCATION_RESTRICTIONS.x.min,
        minY: LOCATION_RESTRICTIONS.y.min - markerHalfSize,
        maxX: LOCATION_RESTRICTIONS.x.max,
        maxY: LOCATION_RESTRICTIONS.y.max - markerHalfSize
      };

      startCoordinates = {
        x: moveEv.clientX,
        y: moveEv.clientY
      };

      var coordinateX = checkLimit(startCoordinates.x - shift.x, moveLimits.minX, moveLimits.maxX);
      var coordinateY = checkLimit(startCoordinates.y - shift.y, moveLimits.minY, moveLimits.maxY);

      window.offerForm.setAddress(coordinateX, parseInt(coordinateY + markerHalfSize));

      window.map.pinMain.style.top = coordinateY + 'px';
      window.map.pinMain.style.left = coordinateX + 'px';
    };

    /**
     * Отпустили.
     * @param {Event} upEv
     */
    var onMouseUp = function (upEv) {
      upEv.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  /**
   * @todo: здесь ли ему место? Или где лучше?
   */
  var registerPinsHandlers = function () {
    var pinsList = Array.prototype.slice.call(mapContainer.querySelectorAll('.map__pin'));
    pinsList.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.addEventListener('click', function (ev) {
          // Почистить DOM от старых попапов
          window.popupWindow.removePopups(mapContainer);
          // Активировать пин
          window.pin.processPin(ev);
          // Создать попап и отрендерить его на карте
          window.popupWindow.renderPopupOnMap(mapContainer, window.popupWindow.getPopUp(pin));
        });
      }
    });
  };

  // Отключить инпуты в форме
  window.util.switchFieldsetsControls(form, false);

  // Инициализация обработчиков формы
  window.offerForm.initValidators();
  window.offerForm.initRelatedFieldsHandlers();

  // Инициализация собыйтий и интерфейса карты по нажатию на красный маркер
  pinMain.addEventListener('mousedown', function(ev) {
    // Включить инпуты в форме
    window.util.switchFieldsetsControls(form);
    // Активировать карту
    showMap();
    // Удаляем старые Pin'ы
    window.pin.removePins(pinsContainer);
    // Показать метки похожих объявлений
    window.pin.renderPins(window.data.getPosts());
    registerPinsHandlers();
    // Активировать форму
    window.util.showForm(form);

    pinOnMouseDown(ev);
  });

  return {
    mapContainer: mapContainer,
    pinsContainer: pinsContainer,
    pinMain: pinMain
  };
})();
