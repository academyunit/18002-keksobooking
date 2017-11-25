'use strict';
(function () {
  var LIST_TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var LIST_PHOTOS = [1, 2, 3, 4, 5, 6, 7, 8];
  var LIST_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var LIST_CHECK_IN = ['12:00', '13:00', '14:00'];
  var LIST_CHECK_OUT = ['12:00', '13:00', '14:00'];
  var APARTMENT_TYPE_FLAT = 'flat';
  var APARTMENT_TYPE_HOUSE = 'house';
  var APARTMENT_TYPE_BUNGALO = 'bungalo';
  var LIST_APARTMENTS_TYPES = [APARTMENT_TYPE_FLAT, APARTMENT_TYPE_HOUSE, APARTMENT_TYPE_BUNGALO];

  /**
   * Toggle для DOM'a.
   *
   * @param {Node} selector
   * @param {string} className
   */
  function toggleBlock(selector, className) {
    className = className.replace('.', '');
    document.querySelector(selector).classList.toggle(className);
  }

  /**
   * Получить случайный элемент массива
   *
   * @param {[]} arr
   * @return {*}
   */
  function getRandomArrayElement(arr) {
    return arr[getRandomArrayIndex(arr)];
  }

  /**
   * Получить случайный индекс
   *
   * @param {[]} arr
   * @return {number}
   */
  function getRandomArrayIndex(arr) {
    return Math.floor(Math.random() * arr.length);
  }

  /**
   * Получить случайное число
   *
   * @param {int} min
   * @param {int} max
   * @return {number}
   */
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  /**
   * Перемешать массив.
   *
   * @param {[]} arr
   * @return {[]}
   */
  function shuffleArray(arr) {
    return arr.sort(function () {
      return 0.5 - Math.random();
    });
  }


  /**
   * Получить случайные элементы массива(ов)
   *
   * @param {[]} arr Массив элементов
   * @return {[]}
   */
  function getRandomUniqueValues(arr) {
    return shuffleArray(arr).pop();
  }

  /**
   * Получить случайный список фич.
   *
   * @param {[]} arr
   * @return {[]}
   */
  function getRandomFeatures(arr) {
    var copiedArr = arr.slice();

    var indexMin = getRandom(0, arr.length);
    var indexMax = getRandom(0, arr.length);
    if (indexMin > indexMax) {
      var swapIndex = indexMin;
      indexMin = indexMax;
      indexMax = swapIndex;
    }

    var shuffledFeatures = shuffleArray(copiedArr);
    var randomFeatures = shuffleArray(copiedArr).splice(indexMin, indexMax);
    if (!randomFeatures.length) {
      return shuffledFeatures.splice(0, 1);
    }

    return randomFeatures;
  }

  /**
   * Сгенерировать фейковые объявления
   *
   * @param {int} amount Кол-во
   * @return {[]}
   */
  function getGeneratedPosts(amount) {
    var avatarsCopy = LIST_PHOTOS.slice();
    var titlesCopy = LIST_TITLES.slice();

    var posts = [];
    for (var i = 0; i < amount; i++) {
      var locationX = getRandom(300, 900);
      var locationY = getRandom(100, 500);
      var post = {
        'author': {
          /*
           строка, адрес изображения вида img/avatars/user{{xx}}.png, где xx это число от 1 до 8 с ведущим нулем.
           Например 01, 02 и т. д. Адреса изображений не повторяются
           */
          'avatar': 'img/avatars/user0' + getRandomUniqueValues(avatarsCopy) + '.png'
        },
        'offer': {
          /*
           строка, заголовок предложения, одно из фиксированных значений:
           'Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
           'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
           'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'.
           Значения не должны повторяться.
           */
          'title': getRandomUniqueValues(titlesCopy),
          /*
           строка, адрес предложения, представляет собой запись вида '{{location.x}}, {{location.y}}'
           */
          'address': locationX + ', ' + locationY,
          /*
           * число, случайная цена от 1000 до 1000000
           */
          'price': getRandom(1000, 1000000),
          /*
           строка с одним из трех фиксированных значений: flat, house или bungalo
           */
          'type': getRandomArrayElement(LIST_APARTMENTS_TYPES),
          /*
           число, случайное количество комнат от 1 до 5
           */
          'rooms': getRandom(1, 5),
          /*
           число, случайное количество гостей, которое можно разместить
           */
          'guests': getRandom(1, 20),
          /*
           строка с одним из трех фиксированных значений: 12:00, 13:00 или 14:00,
           */
          'checkin': getRandomArrayElement(LIST_CHECK_IN),
          /*
           строка с одним из трех фиксированных значений: 12:00, 13:00 или 14:00
           */
          'checkout': getRandomArrayElement(LIST_CHECK_OUT),
          /*
           массив строк случайной длины из ниже предложенных: 'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
           */
          'features': getRandomFeatures(LIST_FEATURES),
          /*
           пустая строка
           */
          'description': '',
          /*
           пустой массив
           */
          'photos': []
        },
        'location': {
          /*
           случайное число, координата x метки на карте в блоке .tokyo__pin-map от 300 до 900,
           */
          'x': locationX,
          /*
           случайное число, координата y метки на карте в блоке .tokyo__pin-map от 100 до 500
           */
          'y': locationY
        }
      };

      posts.push(post);
    }

    return posts;
  }

  /**
   * Сгенерировать Dom'ы для Pin'ов на карте.
   *
   * @param {[]} data
   * @return {[]}
   */
  function getGeneratedPins(data) {
    var elements = [];
    for (var i = 0; i < data.length; i++) {
      elements.push(getPin(data, i));
    }

    return elements;
  }

  /**
   * Создать Pin кнопку для карты.
   *
   * @param {[]} data
   * @param {int} i
   * @return {Element}
   */
  function getPin(data, i) {
    var pinButton = document.createElement('button');
    pinButton.style.left = data[i].location.x + 'px';
    pinButton.style.top = data[i].location.y + 'px';
    pinButton.className = 'map__pin';

    var pinImage = document.createElement('img');
    pinImage.src = data[i].author.avatar;
    pinImage.width = 40;
    pinImage.height = 40;
    pinImage.dragable = false;

    pinButton.appendChild(pinImage);

    return pinButton;
  }

  /**
   * Отрендерить Pin'ы на карте.
   *
   * @param {[]} pins
   */
  function renderPins(pins) {
    var pinContainer = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(pins[i]);
    }
    pinContainer.appendChild(fragment);
  }

  /**
   * Получить название жилья по типу.
   *
   * @param {string} type
   * @return {string}
   */
  function getApartmentTitleByType(type) {
    switch (type) {
      case APARTMENT_TYPE_FLAT:
        return 'Квартира';
      case APARTMENT_TYPE_HOUSE:
        return 'Дом';
      case APARTMENT_TYPE_BUNGALO:
        return 'Бунгало';
      default:
        return 'Тип жилья неизвестен';
    }
  }

  /**
   * Кол-во комнат и гостей.
   *
   * @param {int} rooms
   * @param {int} guests
   * @return {string}
   */
  function getGuestsAndRoomsDescription(rooms, guests) {
    return rooms + ' комнат' + (rooms > 1 ? 'ы' : 'a') + ' для ' + guests + ' гост' + (guests > 1 ? 'ей' : 'я');
  }

  /**
   * Время чекина.
   *
   * @param {int} timeIn
   * @param {int} timeOut
   * @return {string}
   */
  function getCheckTime(timeIn, timeOut) {
    return 'Заезд после ' + timeIn + ', выезд до ' + timeOut;
  }

  function getPrice(number) {
    return (number).toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    });
  }

  /**
   * Сгенерировать DOM список фич.
   *
   * @param {[]} featuresList
   * @return {DocumentFragment}
   */
  function getFeaturesList(featuresList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < featuresList.length; i++) {
      var feature = document.createElement('li');
      feature.className = 'feature feature--' + featuresList[i];

      fragment.appendChild(feature);
    }

    return fragment;
  }

  /**
   * Добавить объявление на карту.
   *
   * @param {string} map
   * @param {Node} post
   */
  function addPostToMap(map, post) {
    var mapContainer = document.querySelector(map);

    mapContainer.appendChild(post);
  }

  /**
   * Создать DOM для объявления.
   *
   * @param {{}} data
   * @return {Node}
   */
  function createPost(data) {
    var template = document.querySelector('template').content.querySelector('article.map__card');

    var post = template.cloneNode(true);
    var title = post.querySelector('h3');
    var address = post.querySelector('p small');
    var price = post.querySelector('.popup__price');
    var type = post.querySelector('h4');
    var roomsAndGuests = post.querySelector('h4 + p');
    var checkTime = post.querySelector('p:nth-of-type(3)');
    var featuresList = post.querySelector('.popup__features');
    var description = post.querySelector('.popup__features + p');
    var userAvatar = post.querySelector('.popup__avatar');

    title.textContent = data.offer.title;
    address.textContent = data.offer.address;
    price.textContent = getPrice(data.offer.price);
    type.textContent = getApartmentTitleByType(data.offer.type);
    roomsAndGuests.textContent = getGuestsAndRoomsDescription(data.offer.rooms, data.offer.guests);
    checkTime.textContent = getCheckTime(data.offer.checkin, data.offer.checkout);
    var features = getFeaturesList(data.offer.features);
    if (features) {
      featuresList.appendChild(features);
    }
    description.textContent = data.offer.description;
    userAvatar.src = data.author.avatar;

    return post;
  }

  toggleBlock('.map', '.map--faded');
  var posts = getGeneratedPins(getGeneratedPosts(7));
  renderPins(posts);
  addPostToMap('.map', createPost(posts[0]));
})();
