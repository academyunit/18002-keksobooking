window.backend = (function () {
  var TIMEOUT_MAX_TIME = 10000;

  var load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var error;
      switch(xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;

        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Неизвестный статус' + xhr.status + ' ' + xhr.statusText;
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
    xhr.timeout = TIMEOUT_MAX_TIME;
    xhr.open('GET', url);
    xhr.send();
  };

  var save = function(data, onLoad, onError) {
    var URL = 'https://1510.dump.academy/keksobooking';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function() {
      onLoad(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send();
  };

  return {
    load: load,
    save: save
  };
})();
