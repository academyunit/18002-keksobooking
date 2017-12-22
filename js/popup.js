'use strict';

window.popupWindow = (function () {
  /**
   * Закрытие поапа по нажатию ESC в document'e
   */
  var registerPopUpWindowListener = function () {
    document.addEventListener('keydown', keyDownHandler);
  };

  /**
   * Удалить handler акрытия попапа по нажатию ESC в document'e
   */
  var unregisterPopUpWindowListener = function () {
    document.removeEventListener('keydown', keyDownHandler);
  };

  /**
   * Закрыть попап.
   *
   * @param {Event} ev
   */
  var keyDownHandler = function (ev) {
    if (window.util.isEscKeyPressed(ev)) {
      window.popupWindow.removePopups(window.map.mapContainer);
      window.pin.deactivatePins(window.map.pinsContainer.children);
    }
  };

  /**
   * Создать попап.
   *
   * @param {Element} pin
   * @return {Element}
   */
  var getPopUp = function (pin) {
    // Ищем Pin по его ID
    var postInfo = window.data.findPinById(pin.dataset.id);
    // Создаем попап из шаблона
    var popup = window.card.getCard(postInfo);
    var popupCloseButton = popup.querySelector('.popup__close');

    // Вешаем handler'ы на закрытие по клику и ENTER
    popupCloseButton.addEventListener('click', popUpCloseHandler);
    popupCloseButton.addEventListener('keydown', function (e) {
      if (window.util.isEnterKeyPressed(e)) {
        popUpCloseHandler();
      }
    });

    registerPopUpWindowListener();

    return popup;
  };

  /**
   * Handler закрытия попапа.
   */
  var popUpCloseHandler = function () {
    window.popupWindow.removePopups(window.map.mapContainer);
    window.pin.deactivatePins(window.map.pinsContainer.children);
  };

  /**
   * Удалить все попапы из DOM'a
   *
   * @param {Element} popUpContainer
   */
  var removePopups = function (popUpContainer) {
    Array.prototype.slice.call(popUpContainer.children).forEach(function (item) {
      if (item.classList.contains('popup')) {
        popUpContainer.removeChild(item);
      }
    });

    // Удалить handler закрытия попапов по ESC
    unregisterPopUpWindowListener();
  };

  return {
    getPopUp: getPopUp,
    removePopups: removePopups
  };
})();
