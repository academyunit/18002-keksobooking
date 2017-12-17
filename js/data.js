'use strict';

window.data = (function () {
  /** Массив сгенерированных постов */
  var posts = [];

  /**
   * Сохранить посты в переменную posts.
   *
   * @param {Array} data
   */
  var setPosts = function (data) {
    if (posts.constructor === Array) {
      posts = data;
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

  return {
    setPosts: setPosts,
    getPosts: getPosts,
    findPinById: findPinById
  };
})();
