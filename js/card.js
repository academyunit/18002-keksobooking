'use strict';

window.card = (function () {
  var APARTMENT_TYPE = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  /**
   * Кол-во комнат и гостей.
   *
   * @param {number} rooms
   * @param {number} guests
   * @return {string}
   */
  var getGuestsAndRoomsDescription = function (rooms, guests) {
    return rooms + ' комнат' + (rooms > 1 ? 'ы' : 'a') + ' для ' + guests + ' гост' + (guests > 1 ? 'ей' : 'я');
  };

  /**
   * Время чекина.
   *
   * @param {number} timeIn
   * @param {number} timeOut
   * @return {string}
   */
  var getCheckTime = function (timeIn, timeOut) {
    return 'Заезд после ' + timeIn + ', выезд до ' + timeOut;
  };

  /**
   * Отформатировать прайс.
   *
   * @param {string} number
   * @return {string}
   */
  var getFormattedPrice = function (number) {
    return number.toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }) + '/ночь';
  };

  /**
   * Сгенерировать DOM список фич.
   *
   * @param {Array} featuresList
   * @return {DocumentFragment}
   */
  var getFeaturesList = function (featuresList) {
    var fragment = document.createDocumentFragment();
    featuresList.forEach(function (feature) {
      var element = document.createElement('li');
      element.className = 'feature feature--' + feature;

      fragment.appendChild(element);
    });

    return fragment;
  };

  /**
   * Обработать фичи.
   *
   * @param {Element} featuresList
   * @param {Array} items
   */
  var processFeatures = function (featuresList, items) {
    window.util.removeChildNodes(featuresList, ['map__pinsoverlay', 'map__pin--main']);
    var features = getFeaturesList(items);
    if (features) {
      featuresList.appendChild(features);
    }
  };

  /**
   * Создать DOM для объявления.
   *
   * @param {Object[]} data
   * @return {Element}
   */
  var getCard = function (data) {
    var template = document.querySelector('template').content.querySelector('article.map__card');

    var post = template.cloneNode(true);
    var title = post.querySelector('h3');
    var address = post.querySelector('p small');
    var price = post.querySelector('.popup__price');
    var type = post.querySelector('h4');
    var roomsAndGuests = post.querySelector('h4 + p');
    var checkTime = post.querySelector('p:nth-of-type(4)');
    var featuresList = post.querySelector('.popup__features');
    var description = post.querySelector('.popup__features + p');
    var userAvatar = post.querySelector('.popup__avatar');
    var pictures = post.querySelector('.popup__pictures');

    var typeName = APARTMENT_TYPE[data.offer.type] || 'Тип жилья неизвестен';

    title.textContent = data.offer.title;
    address.textContent = data.offer.address;
    price.textContent = getFormattedPrice(data.offer.price);
    type.textContent = typeName;
    roomsAndGuests.textContent = getGuestsAndRoomsDescription(data.offer.rooms, data.offer.guests);
    checkTime.textContent = getCheckTime(data.offer.checkin, data.offer.checkout);
    processFeatures(featuresList, data.offer.features);
    description.textContent = data.offer.description;
    userAvatar.src = data.author.avatar;

    post.removeChild(pictures);

    return post;
  };

  return {
    getCard: getCard
  };
})();
