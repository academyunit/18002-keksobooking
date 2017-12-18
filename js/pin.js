'use strict';

window.pin = (function () {
  var filter = {
    housingType: null,
    housingPrice: null,
    housingRooms: null,
    housingGuests: null,
    featureWifi: null,
    featureDishwasher: null,
    featureParking: null,
    featureWasher: null,
    featureElevator: null,
    featureConditioner: null
  };

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

  var getPriceRangeByName = function (name) {
    var min = 0;
    var max = 0;
    switch (name) {
      case 'middle':
        min = 10000;
        max = 50000;
        break;
      case 'low':
        min = 0;
        max = 10000;
        break;
      case 'high':
        min = 50000;
        max = -1;
        break;
      default:
        min = -1;
        max = -1;
    }

    return {
      min: min,
      max: max
    };
  };

  var isHousingPriceWithingRange = function (value, price) {
    var priceRange = getPriceRangeByName(value);
    if (priceRange.min < 0 && priceRange.max < 0) {
      return true;
    }
    if (price >= priceRange.min && priceRange.max < 0) {
      return true;
    }

    return (price >= priceRange.min && price <= priceRange.max);
  };

  var isFeatureTurnedOn = function (features, featureToCheck) {
    return features.indexOf(featureToCheck) > -1;
  };

  var getFilteredPins = function (ev) {
    var target = ev.target;
    var value = target.value;

    var posts = window.data.getPosts();

    if (target.id == 'housing-type') {
      filter.housingType = value == 'any' ? null : value;
    }
    if (target.id == 'housing-price') {
      filter.housingPrice = value == 'any' ? null : value;
    }
    if (target.id == 'housing-rooms') {
      filter.housingRooms = value == 'any' ? null : value;
    }
    if (target.id == 'housing-guests') {
      filter.housingGuests = value == 'any' ? null : value;
    }
    if (target.id == 'filter-wifi') {
      filter.featureWifi = target.checked ? value : null;
    }
    if (target.id == 'filter-dishwasher') {
      filter.featureDishwasher = target.checked ? value : null;
    }
    if (target.id == 'filter-parking') {
      filter.featureParking = target.checked ? value : null;
    }
    if (target.id == 'filter-washer') {
      filter.featureWasher = target.checked ? value : null;
    }
    if (target.id == 'filter-elevator') {
      filter.featureElevator = target.checked ? value : null;
    }
    if (target.id == 'filter-conditioner') {
      filter.featureConditioner = target.checked ? value : null;
    }

    posts = posts.filter(function(post) {
      if (filter.housingType && post.offer.type !== filter.housingType) {
        return false;
      }
      if (filter.housingRooms && post.offer.rooms !== parseInt(filter.housingRooms)) {
        return false;
      }
      if (filter.housingPrice && !isHousingPriceWithingRange(filter.housingPrice, post.offer.price)) {
        return false;
      }
      if (filter.housingGuests && post.offer.guests !== parseInt(filter.housingGuests)) {
        return false;
      }
      if (filter.featureWifi && !isFeatureTurnedOn(post.offer.features, filter.featureWifi)) {
        return false;
      }
      if (filter.featureDishwasher && !isFeatureTurnedOn(post.offer.features, filter.featureDishwasher)) {
        return false;
      }
      if (filter.featureParking && !isFeatureTurnedOn(post.offer.features, filter.featureParking)) {
        return false;
      }
      if (filter.featureWasher && !isFeatureTurnedOn(post.offer.features, filter.featureWasher)) {
        return false;
      }
      if (filter.featureElevator && !isFeatureTurnedOn(post.offer.features, filter.featureElevator)) {
        return false;
      }
      if (filter.featureConditioner && !isFeatureTurnedOn(post.offer.features, filter.featureConditioner)) {
        return false;
      }

      return true;
    });

    return posts;
  };

  return {
    processPin: processPin,
    deactivatePins: deactivatePins,
    renderPins: renderPins,
    removePins: removePins,
    getFilteredPins: getFilteredPins
  };
})();
