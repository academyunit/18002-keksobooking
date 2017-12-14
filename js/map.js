'use strict';
window.map = (function () {
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

  /**
   * Кнопка нажата
   * @param {Event} ev
   */
  var pinOnMouseDown = function(ev) {
    ev.preventDefault();

    var startCoords = {
      x: ev.clientX,
      y: ev.clientY
    };

    /**
     * В процессе.
     * @param {Event} ev
     */
    var onMouseMove = function (moveEv) {
      moveEv.preventDefault();

      var shift = {
        x: startCoords.x - moveEv.clientX,
        y: startCoords.y - moveEv.clientY
      };

      startCoords = {
        x: moveEv.clientX,
        y: moveEv.clientY
      };

      window.offerForm.setAddress(startCoords.x, startCoords.y);

      window.map.pinMain.style.top = (window.map.pinMain.offsetTop - shift.y) + 'px';
      window.map.pinMain.style.left = (window.map.pinMain.offsetLeft - shift.x) + 'px';
    };

    /**
     * Отпустили.
     * @param {Event} ev
     */
    var onMouseUp = function (upEv) {
      upEv.preventDefault();

      window.offerForm.setAddress(startCoords.x, startCoords.y);

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
