'use strict';
(function () {
  window.map = document.querySelector('.map');

  var form = document.querySelector('.notice__form');
  var pinMain = window.map.querySelector('.map__pin--main');
  var pinsContainer = window.map.querySelector('.map__pins');

  window.postData = window.getPosts(8);
  window.pins = pinsContainer.children;

  /**
   * enable/disable для карты
   */
  var toggleMap = function () {
    window.map.classList.toggle('map--faded');
  };

  /**
   * Обработчик клика по красному маркеру.
   */
  var bigRedPinClickHandler = function () {
    // Включить инпуты в форме
    window.toggleFormInputs(form);
    // Активировать карту
    toggleMap();
    // Удаляем старые Pin'ы
    window.removePins(pinsContainer);
    // Показать метки похожих объявлений
    window.renderPins(window.postData);
    //
    registerPinsHandlers();
    // Активировать форму
    window.toggleForm();

    pinMain.removeEventListener('mouseup', bigRedPinClickHandler);
  };

  /**
   * @todo: здесь ли ему место? Или где лучше?
   */
  var registerPinsHandlers = function () {
    var pinsList = Array.prototype.slice.call(window.map.querySelectorAll('.map__pin'));
    pinsList.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.addEventListener('click', function (ev) {
          // Почистить DOM от старых попапов
          window.removePopups(window.map);
          // Активировать пин
          window.processPin(ev);
          // Создать попап и отрендерить его на карте
          window.renderPopupOnMap(window.map, window.getPopUp(pin));
          // Повесить на document handler закрытия попапа по ESC
          window.registerPopUpWindowListener();
        });
      }
    });
  };

  // Отключить инпуты в форме
  window.toggleFormInputs(form);
  // Инициализация интерфейса с картой
  pinMain.addEventListener('mouseup', bigRedPinClickHandler);
})();
