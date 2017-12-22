'use strict';

window.data = (function () {
  /** Кол-во сущностей, выдаваемых за раз. */
  var MAX_ITEMS_LIMIT = 5;

  /** Массив сгенерированных постов. */
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
    var copy = posts.slice();
    limitItems(copy);

    return copy;
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

  /**
   * Ограничить количество выдаыаемой информации.
   *
   * @param {Array} items
   * @param {number} limit
   */
  var limitItems = function (items, limit) {
    limit = limit || MAX_ITEMS_LIMIT;
    if (items.length < limit) {
      return;
    }
    items.splice(limit, items.length - 1);
  };

  return {
    setPosts: setPosts,
    getPosts: getPosts,
    findPinById: findPinById
  };
})();
