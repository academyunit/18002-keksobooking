'use strict';
(function () {
  var KEYBOARD_KEY_ENTER = 13;
  var KEYBOARD_KEY_ESC = 27;

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
   * Получить случайный элемент массива
   *
   * @param {Array} arr
   * @return {string}
   */
  function getRandomArrayElement(arr) {
    return arr[getRandomArrayIndex(arr)];
  }

  /**
   * Получить случайный индекс
   *
   * @param {Array} arr
   * @return {number}
   */
  function getRandomArrayIndex(arr) {
    return Math.floor(Math.random() * arr.length);
  }

  /**
   * Получить случайное число
   *
   * @param {number} max
   * @param {number} min
   * @return {number}
   */
  function getRandom(max, min) {
    min = min || 0;
    return Math.floor(Math.random() * (max - min) + min);
  }

  /**
   * Перемешать массив.
   *
   * @param {Array} arr
   * @return {Array}
   */
  function shuffleArray(arr) {
    return arr.sort(function () {
      return 0.5 - Math.random();
    });
  }


  /**
   * Получить случайный уникальный элемент массива.
   *
   * @param {Array} arr Массив элементов
   * @return {string}
   */
  function getRandomUniqueValue(arr) {
    return shuffleArray(arr).pop();
  }

  /**
   * Получить случайный список фич.
   *
   * @param {Array} arr
   * @return {Array}
   */
  function getRandomFeatures(arr) {
    return shuffleArray(arr).filter(function () {
      return Math.random() < 0.5;
    });
  }

  /**
   * Сгенерировать фейковые объявления
   *
   * @param {number} amount Кол-во
   * @return {Array}
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
          'avatar': 'img/avatars/user0' + getRandomUniqueValue(avatarsCopy) + '.png'
        },
        'offer': {
          /*
           строка, заголовок предложения, одно из фиксированных значений:
           'Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
           'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
           'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'.
           Значения не должны повторяться.
           */
          'title': getRandomUniqueValue(titlesCopy),
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
   * @param {Array} data
   * @return {Array}
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
   * @param {Array} data
   * @param {number} i
   * @return {Element}
   */
  function getPin(data, i) {
    var pinButton = document.createElement('button');
    pinButton.style.left = data[i].location.x + 'px';
    pinButton.style.top = data[i].location.y + 'px';
    pinButton.className = 'map__pin';
    pinButton.tabIndex = 0;

    var pinImage = document.createElement('img');
    pinImage.src = data[i].author.avatar;
    pinImage.width = 40;
    pinImage.height = 40;
    pinImage.dragable = false;

    pinButton.appendChild(pinImage);

    return pinButton;
  }

  /**
   * Удалить все Pin с карты.
   *
   * @param {Element} pinsContainer
   */
  function removePins(pinsContainer) {
    removeChildNodes(pinsContainer, 2);
  }

  /**
   * Отрендерить Pin'ы на карте.
   *
   * @param {Array} pins
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
   * @param {number} rooms
   * @param {number} guests
   * @return {string}
   */
  function getGuestsAndRoomsDescription(rooms, guests) {
    return rooms + ' комнат' + (rooms > 1 ? 'ы' : 'a') + ' для ' + guests + ' гост' + (guests > 1 ? 'ей' : 'я');
  }

  /**
   * Время чекина.
   *
   * @param {number} timeIn
   * @param {number} timeOut
   * @return {string}
   */
  function getCheckTime(timeIn, timeOut) {
    return 'Заезд после ' + timeIn + ', выезд до ' + timeOut;
  }

  /**
   * Отформатировать прайс.
   *
   * @param {string} number
   * @return {string}
   */
  function getFormattedPrice(number) {
    return (number).toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }) + '/ночь';
  }

  /**
   * Сгенерировать DOM список фич.
   *
   * @param {Array} featuresList
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
   * Обработать фичи.
   *
   * @param {Element} featuresList
   * @param {Array} items
   */
  function processFeatures(featuresList, items) {
    removeChildNodes(featuresList);
    var features = getFeaturesList(items);
    if (!features) {
      return;
    }
    featuresList.appendChild(features);
  }

  /**
   * Удалить все дочерние элементы у DOM ноды.
   *
   * @param {Element} node
   * @param {number} startPosition
   */
  function removeChildNodes(node, startPosition) {
    if (!node) {
      return;
    }

    while (node.children[startPosition]) {
      node.removeChild(node.children[startPosition]);
    }
  }

  /**
   * Создать DOM для объявления.
   *
   * @param {Object[]} data
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
    var checkTime = post.querySelector('p:nth-of-type(4)');
    var featuresList = post.querySelector('.popup__features');
    var description = post.querySelector('.popup__features + p');
    var userAvatar = post.querySelector('.popup__avatar');

    title.textContent = data.offer.title;
    address.textContent = data.offer.address;
    price.textContent = getFormattedPrice(data.offer.price);
    type.textContent = getApartmentTitleByType(data.offer.type);
    roomsAndGuests.textContent = getGuestsAndRoomsDescription(data.offer.rooms, data.offer.guests);
    checkTime.textContent = getCheckTime(data.offer.checkin, data.offer.checkout);
    processFeatures(featuresList, data.offer.features);
    description.textContent = data.offer.description;
    userAvatar.src = data.author.avatar;

    return post;
  }

  /**
   * Нажат ENTER?
   *
   * @param {Event} e
   * @return {boolean}
   */
  function isKeyboardEnterKey(e) {
    return KEYBOARD_KEY_ENTER === e.keyCode;
  }

  /**
   * Нажат ESC?
   *
   * @param {Event} e
   * @return {boolean}
   */
  function isKeyboardEscKey(e) {
    return KEYBOARD_KEY_ESC === e.keyCode;
  }

  initInterface();

  /**
   * Инициализация интерфейса.
   */
  function initInterface() {
    var map = document.querySelector('.map');
    var form = document.querySelector('.notice__form');
    var pinMain = map.querySelector('.map__pin--main');
    var pinsContainer = map.querySelector('.map__pins');

    var postData = [];

    // Отключить инпуты в форме
    toggleFormInputs(form);

    // Инициализация интерфейса с картой
    pinMain.addEventListener('mouseup', function () {
      // Включить инпуты в форме
      toggleFormInputs(form);
      // Активировать карту
      toggleMap();
      // Удаляем старые Pin'ы
      removePins(pinsContainer);
      // Показать метки похожих объявлений
      showPins();
      // Активировать форму
      toggleForm();
    });

    /**
     * Следим за всеми Pin на карте по клику.
     */
    pinsContainer.addEventListener('click', function (e) {
      var target = e.target;
      if (target.tagName.toLowerCase() !== 'img' || !target.parentNode.classList.contains('map__pin')) {
        return;
      }
      if (target.parentNode.classList.contains('map__pin')) {
        target = target.parentNode;
      }

      processPin(target);
    });

    /**
     * Следим за всеми Pin на карте по нажатию ENTER.
     */
    pinsContainer.addEventListener('keydown', function (e) {
      if (isKeyboardEnterKey(e)) {
        pinClickHandler(e);
      }
    });

    /**
     * Handler клика на Pin.
     *
     * @param {Event} e
     */
    function pinClickHandler(e) {
      var target = e.target;
      if (!target.classList.contains('map__pin')) {
        return;
      }

      processPin(target);
    }

    /**
     * Логика обработки нажатия на Pin а карте.
     *
     * @param {EventTarget} pin
     */
    function processPin(pin) {
      // Почистить DOM от старых попапов
      removePopups();
      // Деактивировать все ранее активированные Pin'ы
      deactivatePins();
      // Текущий Pin ктивировать
      activatePin(pin);

      // Создать на его основе попап слева
      createPopUpWindow(pin);

      // Повесить на document handler закрытия попапа по ESC
      registerPopUpWindowListener();
    }

    /**
     * Закрытие поапа по нажатию ESC в document'e
     */
    function registerPopUpWindowListener() {
      document.addEventListener('keydown', closePopUpByEscHandler);
    }

    /**
     * Удалить handler акрытия попапа по нажатию ESC в document'e
     */
    function unregisterPopUpWindowListener() {
      document.removeEventListener('keydown', closePopUpByEscHandler);
    }

    /**
     * Закрыть попап.
     *
     * @param {Event} e
     */
    function closePopUpByEscHandler(e) {
      if (isKeyboardEscKey(e)) {
        removePopups();
        deactivatePins();
      }
    }

    /**
     * Создать попап.
     *
     * @param {Element} pin
     */
    function createPopUpWindow(pin) {
      var coordinateX = parseInt(pin.style.left, 10);
      var coordinateY = parseInt(pin.style.top, 10);

      // Находим данные для шаблона в массиве Pin'ов по коордиинатам х и у
      var postInfo = getPostByXandYlocation(coordinateX, coordinateY);
      // Создаем попап из шаблона
      var popupWindow = createPost(postInfo);
      var popupWindowCloseButton = popupWindow.querySelector('.popup__close');

      // Вешаем handler'ы на закрытие по клику и ENTER
      popupWindowCloseButton.addEventListener('click', popUpCloseHandler);
      popupWindowCloseButton.addEventListener('keydown', function (e) {
        if (isKeyboardEnterKey(e)) {
          popUpCloseHandler();
        }
      });


      addPopUpWindowToMap(popupWindow);
    }

    /**
     * Handler закрытия попапа.
     */
    function popUpCloseHandler() {
      removePopups();
      deactivatePins();
    }

    /**
     * Найти пост по координатам x + y.
     * @param {number} x
     * @param {number} y
     * @return {Array}
     */
    function getPostByXandYlocation(x, y) {
      for (var i = 0; i < postData.length; i++) {
        if (postData[i].location.x === x && postData[i].location.y === y) {
          return postData[i];
        }
      }

      return [];
    }

    /**
     * Сгенерировать и показать все Pin на карте.
     */
    function showPins() {
      postData = getGeneratedPosts(7);
      var posts = getGeneratedPins(postData);

      renderPins(posts);
    }

    /**
     * enable/disable для инпутво формы
     */
    function toggleFormInputs() {
      Array.from(form).forEach(function (element) {
        if (element.tagName.toLowerCase() !== 'fieldset') {
          return;
        }
        element.disabled = !element.disabled;
      });
    }

    /**
     * enable/disable для формы
     */
    function toggleForm() {
      form.classList.toggle('notice__form--disabled');
    }

    /**
     * enable/disable для карты
     */
    function toggleMap() {
      map.classList.toggle('map--faded');
    }

    /**
     * Выключить подсветку у всех Pin
     */
    function deactivatePins() {
      Array.from(pinsContainer.children).forEach(function (pin) {
        deactivatePin(pin);
      });
    }

    /**
     * Удалить все попапы из DOM'a
     */
    function removePopups() {
      Array.from(map.children).forEach(function (item) {
        if (item.classList.contains('popup')) {
          item.remove();
        }
      });

      // Удалить handler закрытия попапов по ESC
      unregisterPopUpWindowListener();
    }

    /**
     * Выключить подсветку для Pin.
     *
     * @param {Element} pin
     */
    function deactivatePin(pin) {
      if (!pin.classList.contains('map__pin')) {
        return;
      }
      pin.classList.remove('map__pin--active');
    }

    /**
     * Включить подсветку для Pin.
     *
     * @param {Element} pin
     */
    function activatePin(pin) {
      pin.classList.add('map__pin--active');
    }

    /**
     * Добавить объявление на карту.
     *
     * @param {Element} post
     */
    function addPopUpWindowToMap(post) {
      map.appendChild(post);
    }
  }
})();
