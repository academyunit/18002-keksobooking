'use strict';
window.data = (function () {
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

  /** Значение по-умолчанию (сколько постов генерировать, если не указано). */
  var DEFAULT_POSTS_AMOUNT = 8;

  /**
   * Получить ссылку на аватар пользователя.
   *
   * @param {number} number
   * @return {string}
   */
  var getAvatar = function (number) {
    return 'img/avatars/user0' + number + '.png';
  };

  /**
   * Получить отформатированную строку координат.
   *
   * @param {number} locationX
   * @param {number} locationY
   * @return {string}
   */
  var getAddressCoordinates = function (locationX, locationY) {
    return locationX + ', ' + locationY;
  };

  /**
   * Получить случайный список фич.
   *
   * @param {Array} arr
   * @return {Array}
   */
  var getRandomFeatures = function (arr) {
    return window.util.shuffleArray(arr).filter(function () {
      return Math.random() < 0.5;
    });
  };

  /**
   * Сгенерировать фейковые объявления
   *
   * @param {number} amount Кол-во
   */
  var generatePosts = function (amount) {
    var avatarsCopy = LIST_PHOTOS.slice();
    var titlesCopy = LIST_TITLES.slice();

    for (var i = 0; i < amount; i++) {
      var locationX = window.util.getRandom(300, 900);
      var locationY = window.util.getRandom(100, 500);
      var post = {
        id: i,
        author: {
          'avatar': getAvatar(window.util.getRandomUniqueValue(avatarsCopy))
        },
        offer: {
          title: window.util.getRandomUniqueValue(titlesCopy),
          address: getAddressCoordinates(locationX, locationY),
          price: window.util.getRandom(1000, 1000000),
          type: window.util.getRandomArrayElement(LIST_APARTMENTS_TYPES),
          rooms: window.util.getRandom(1, 5),
          guests: window.util.getRandom(1, 20),
          checkin: window.util.getRandomArrayElement(LIST_CHECK_IN),
          checkout: window.util.getRandomArrayElement(LIST_CHECK_OUT),
          features: getRandomFeatures(LIST_FEATURES),
          description: '',
          photos: []
        },
        location: {
          x: locationX,
          y: locationY
        }
      };

      posts.push(post);
    }
  };

  /**
   * Получить сгенерированные ранее посты.
   *
   * @return {Array}
   */
  var getPosts = function () {
    return posts.slice();
  };

  /**
   * Найти Pin по его ID.
   *
   * @param {number} id
   * @return {Array|null}
   */
  var findPinById = function (id) {
    for (var i = 0; i < posts.length; i++) {
      if (parseInt(posts[i].id, 10) === parseInt(id, 10)) {
        return posts[i];
      }
    }

    return null;
  };

  /** Массив сгенерированных постов */
  var posts = generatePosts(DEFAULT_POSTS_AMOUNT);

  return {
    /**
     * @todo: вот тут придумал такое решение, чтобы можно было один раз посты сгенерить
     * и потом между разных модулей их передавать:
     * 1) Запускаем в модуле map generatePosts(8)
     * 2) В том же модуле map используем getPosts(), во всех остальных модулях тоже
     */
    getPosts: getPosts,
    findPinById: findPinById,
    // @todo: экспорт констант, потому что 1-му другому модулю они тоже нужен. что-то жесть костыль)
    constants: {
      APARTMENT_TYPE_FLAT: APARTMENT_TYPE_FLAT,
      APARTMENT_TYPE_HOUSE: APARTMENT_TYPE_HOUSE,
      APARTMENT_TYPE_BUNGALO: APARTMENT_TYPE_BUNGALO
    }
  };
})();
