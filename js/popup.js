'use strict';

(function () {
  /**
   * Закрытие поапа по нажатию ESC в document'e
   */
  window.registerPopUpWindowListener = function () {
    document.addEventListener('keydown', keyDownHandler);
  };

  /**
   * Удалить handler акрытия попапа по нажатию ESC в document'e
   */
  window.unregisterPopUpWindowListener = function () {
    document.removeEventListener('keydown', keyDownHandler);
  };

  /**
   * Закрыть попап.
   *
   * @param {Event} ev
   */
  var keyDownHandler = function (ev) {
    if (window.util.isEscKeyPressed(ev)) {
      window.removePopups(window.map);
      window.deactivatePins(window.pins);
    }
  };

  /**
   * Создать попап.
   *
   * @param {Element} pin
   * @return {Element}
   */
  window.getPopUp = function (pin) {
    // Ищем Pin по его ID
    var postInfo = window.findPinById(pin.dataset.id);
    // Создаем попап из шаблона
    var popup = window.getCard(postInfo);
    var popupCloseButton = popup.querySelector('.popup__close');

    // Вешаем handler'ы на закрытие по клику и ENTER
    popupCloseButton.addEventListener('click', popUpCloseHandler);
    popupCloseButton.addEventListener('keydown', function (e) {
      if (window.util.isEnterKeyPressed(e)) {
        popUpCloseHandler();
      }
    });

    return popup;
  };

  /**
   * Handler закрытия попапа.
   */
  var popUpCloseHandler = function () {
    // @todo: что думаешь по поводу этого ? :)
    window.removePopups(window.map);
    window.deactivatePins(window.pins);
  };

  /**
   * @param {Element} popUpContainer
   * Удалить все попапы из DOM'a
   */
  window.removePopups = function (popUpContainer) {
    Array.prototype.slice.call(popUpContainer.children).forEach(function (item) {
      if (item.classList.contains('popup')) {
        popUpContainer.removeChild(item);
      }
    });

    // Удалить handler закрытия попапов по ESC
    window.unregisterPopUpWindowListener();
  };

  /**
   * Добавить объявление на карту.
   *
   * @param {Element} map
   * @param {Element} post
   */
  window.renderPopupOnMap = function (map, post) {
    map.appendChild(post);
  };
})();
