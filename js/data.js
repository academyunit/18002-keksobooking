'use strict';

(function () {
  /**
   * Сгенерировать фейковые объявления
   *
   * @param {number} amount Кол-во
   * @return {Array}
   */
  window.getPosts = function (amount) {
    var avatarsCopy = window.LIST_PHOTOS.slice();
    var titlesCopy = window.LIST_TITLES.slice();

    var posts = [];
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
          type: window.util.getRandomArrayElement(window.LIST_APARTMENTS_TYPES),
          rooms: window.util.getRandom(1, 5),
          guests: window.util.getRandom(1, 20),
          checkin: window.util.getRandomArrayElement(window.LIST_CHECK_IN),
          checkout: window.util.getRandomArrayElement(window.LIST_CHECK_OUT),
          features: getRandomFeatures(window.LIST_FEATURES),
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

    return posts;
  };

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
})();
