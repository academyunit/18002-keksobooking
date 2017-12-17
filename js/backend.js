'use strict';

window.backend = (function () {
  var TIMEOUT_MAX_TIME = 10000;
  var DEFAULT_RESPONSE_TYPE = 'json';

  /**
   * Получить данные GET'ом с сервера.
   *
   * @param {String} url
   * @param {Function} onSuccess
   * @param {Function} onError
   */
  var load = function (url, onSuccess, onError) {
    sendRequest({
      url: url,
      onSuccess: onSuccess,
      onError: onError
    });
  };

  /**
   * Отправить POST запрос на сервер.
   *
   * @param {Array} data
   * @param {Function} onLoad
   * @param {Function} onError
   */
  var save = function (data, onLoad, onError) {
    sendRequest({
      url: 'https://1510.dump.academy/keksobooking',
      data: data,
      onSuccess: onLoad,
      onError: onError
    });
  };

  /**
   * Дефолтный callback для успешного выполнения AJAX-запроса.
   */
  var defaultOnSuccess = function () {
    // @todo: наверн не оч хороший вариант зависимость сюда сувать?
    window.util.showFlashMessage('Данные успешно загружены/отправлены с/на сервер!');
  };

  /**
   * Дефолтный callback для неудачного выполнения AJAX-запроса.
   *
   * @param {Array} error
   */
  var defaultOnError = function (error) {
    window.util.showFlashMessage('Ошибка загрузки данных c/на сервер!' + error, false);
  };

  /**
   * Обертка для работы с XMLHttpRequest.
   *
   * @param {Object} options Настройки
   */
  var sendRequest = function (options) {
    var timeOut = options.timeOut || TIMEOUT_MAX_TIME;
    var responseType = options.responseType || DEFAULT_RESPONSE_TYPE;
    var onSuccess = typeof options.onSuccess === 'function' ? options.onSuccess : defaultOnSuccess;
    var onError = typeof options.onError === 'function' ? options.onError : defaultOnError;
    var url = options.url ? options.url : '';
    var data = options.data ? options.data : null;

    var xhr = new XMLHttpRequest();
    xhr.responseType = responseType;

    xhr.addEventListener('load', function () {
      var error = null;

      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          error = xhr.status + ' - Неверный запрос';
          break;
        case 401:
          error = xhr.status + ' - Пользователь не авторизован';
          break;
        case 404:
          error = xhr.status + ' - Ничего не найдено';
          break;

        default:
          error = xhr.status + ' - Неизвестный статус' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения!');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = timeOut;

    if (data) {
      xhr.open('POST', url);
      xhr.send(data);
    } else {
      xhr.open('GET', url);
      xhr.send();
    }
  };

  return {
    load: load,
    save: save
  };
})();
