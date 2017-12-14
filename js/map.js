'use strict';
window.map = (function () {
  var mapContainer = document.querySelector('.map');
  var pinsContainer = mapContainer.querySelector('.map__pins');

  var form = document.querySelector('.notice__form');
  var pinMain = mapContainer.querySelector('.map__pin--main');

  /**
   * enable/disable для карты
   */
  var toggleMap = function () {
    mapContainer.classList.toggle('map--faded');
  };

  /**
   * Обработчик клика по красному маркеру.
   */
  var draggablePinClickHandler = function () {
    // Включить инпуты в форме
    window.util.toggleFieldsets(form);
    // Активировать карту
    toggleMap();
    // Удаляем старые Pin'ы
    window.pin.removePins(pinsContainer);
    // Показать метки похожих объявлений
    window.pin.renderPins(window.data.getPosts());
    //
    registerPinsHandlers();
    // Активировать форму
    window.util.toggleForm(form);

    pinMain.removeEventListener('mouseup', draggablePinClickHandler);
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
  window.util.toggleFieldsets(form);

  // Инициализация обработчиков формы
  window.offerForm.initValidators();
  window.offerForm.initRelatedFieldsHandlers();

  // Инициализация собыйтий и интерфейса карты по нажатию на красный маркер
  pinMain.addEventListener('mousedown', function(ev) {
    draggablePinClickHandler(ev);
    pin.pinOnMouseDown(ev);
  });

  return {
    mapContainer: mapContainer,
    pinsContainer: pinsContainer,
    pinMain: pinMain
  };
})();
