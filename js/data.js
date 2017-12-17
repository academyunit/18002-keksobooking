'use strict';
window.data = (function () {
  /** Массив сгенерированных постов */
  var posts = [];

  /**
   * Add Ids
   *
   * @param {Array} data
   * @returns {Array}
   */
  var assignIds = function (data) {
    return data.map(function(item, index) {
      item.id = index;
      return item;
    });
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

  window.backend.load('https://1510.dump.academy/keksobooking/data', function (response) {
    if (!response || !response) {
      return;
    }
    posts = assignIds(response);
  });

  return {
    getPosts: getPosts,
    findPinById: findPinById
  };
})();
