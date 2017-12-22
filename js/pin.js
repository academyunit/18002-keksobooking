'use strict';

window.pin = (function () {
  var filter = {
    'housing-type': null,
    'housing-price': null,
    'housing-rooms': null,
    'housing-guests': null,
    'filter-wifi': null,
    'filter-dishwasher': null,
    'filter-parking': null,
    'filter-washer': null,
    'filter-elevator': null,
    'filter-conditioner': null
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

    pins.forEach(function (pin) {
      fragment.appendChild(getPinButton(pin));
    });

    pinContainer.appendChild(fragment);
  };

  /**
   * Выключить подсветку для Pin.
   *
   * @param {Element} pinNodes
   */
  var deactivatePin = function (pinNodes) {
    if (pinNodes.classList.contains('map__pin')) {
      pinNodes.classList.remove('map__pin--active');
    }
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
    deactivatePins(window.map.pinsContainer.children);
    activatePin(ev.currentTarget);
  };

  /**
   * Получить диапазон min/max по имени.
   *
   * @param {string} name
   * @return {{min: number, max: number}}
   */
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

  /**
   * Прайс находится в разрешенном диапазоне.
   *
   * @param {number} value price range name
   * @param {number} price current price
   * @return {boolean}
   */
  var isHousingPriceWithingRange = function (value, price) {
    var priceRange = getPriceRangeByName(value);
    if (priceRange.min < 0 && priceRange.max < 0) {
      return true;
    }
    if (price >= priceRange.min && priceRange.max < 0) {
      return true;
    }

    return price >= priceRange.min && price <= priceRange.max;
  };

  /**
   * Фича включена?
   *
   * @param {Array} features An Массив с фичами
   * @param {string} featureToCheck проверяемая фича
   * @return {boolean}
   */
  var isFeatureTurnedOn = function (features, featureToCheck) {
    return features.indexOf(featureToCheck) > -1;
  };

  /**
   * Отфильтровать пины по критериям.
   *
   * @param {Event} ev
   * @return {Array}
   */
  var getFilteredPosts = function (ev) {
    var target = ev.target;
    var value = target.value;

    var posts = window.data.getPosts();

    for (var key in filter) {
      if (!filter.hasOwnProperty(key)) {
        continue;
      }
      if (target.id !== key) {
        continue;
      }
      // для селектов
      if (target.type === 'select-one') {
        filter[key] = value === 'any' ? null : value;
      }
      // для чекбоксов
      if (target.type === 'checkbox') {
        filter[key] = target.checked ? value : null;
      }
    }

    return posts.filter(function (post) {
      for (var filterName in filter) {
        if (!filter.hasOwnProperty(filterName)) {
          continue;
        }
        var filterValue = filter[filterName];
        if (!filterValue) {
          continue;
        }
        // Фильтруем по чекбоксам
        if (filterName.indexOf('filter-') > -1 && !isFeatureTurnedOn(post.offer.features, filterValue)) {
          return false;
        }
        // Фильтруем по обычным селектовским фильтрам
        if (filterName.indexOf('housing-') > -1) {
          if (filterName === 'housing-type' && post.offer.type !== filterValue) {
            return false;
          }
          if (filterName === 'housing-rooms' && post.offer.rooms !== parseInt(filterValue, 10)) {
            return false;
          }
          if (filterName === 'housing-guests' && post.offer.guests !== parseInt(filterValue, 10)) {
            return false;
          }
          if (filterName === 'housing-price' && !isHousingPriceWithingRange(filterValue, post.offer.price)) {
            return false;
          }
        }
      }

      return true;
    });
  };

  return {
    processPin: processPin,
    deactivatePins: deactivatePins,
    renderPins: renderPins,
    removePins: removePins,
    getFilteredPins: getFilteredPosts
  };
})();
