'use strict';

window.backend = (function () {
  /** Адреса API сервера (для загрузки и отправления данных). */
  var URL = 'https://js.dump.academy/keksobooking';
  /** Макисмальный timeout ожидания. */
  var TIMEOUT_MAX_TIME = 10000;
  /** Получаемый тип данных по-умолчанию. */
  var DEFAULT_RESPONSE_TYPE = 'json';

  /**
   * Адрес для загрузки данных.
   *
   * @return {string}
   */
  var getDataUrl = function () {
    return URL + '/data';
  };

  /**
   * Получить данные GET'ом с сервера.
   *
   * @param {Function} onSuccess
   * @param {Function} onError
   */
  var load = function (onSuccess, onError) {
    sendRequest({
      url: getDataUrl(),
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
      url: URL,
      data: data,
      onSuccess: onLoad,
      onError: onError
    });
  };

  /**
   * Обертка для работы с XMLHttpRequest.
   *
   * @param {Object} options Настройки
   */
  var sendRequest = function (options) {
    var timeOut = options.timeOut || TIMEOUT_MAX_TIME;
    var responseType = options.responseType || DEFAULT_RESPONSE_TYPE;
    var url = options.url ? options.url : '';
    var data = options.data ? options.data : null;

    var xhr = new XMLHttpRequest();
    xhr.responseType = responseType;

    xhr.addEventListener('load', function () {
      var error = null;

      switch (xhr.status) {
        case 200:
          options.onSuccess(xhr.response);
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
        options.onError(error);
      }
    });
    xhr.addEventListener('error', function () {
      options.onError('Ошибка соединения!');
    });
    xhr.addEventListener('timeout', function () {
      options.onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
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
