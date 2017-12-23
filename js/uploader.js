'use strict';

window.uploader = (function () {
  /** Режимы загрузки файлов */
  var UPLOADING_MODES = {
    singleFileUpload: 1,
    multiFilesUpload: 2
  };
  /** Разрешенные расширения */
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  /**
   * Обработчик.
   * @param {Array} options
   */
  function register(options) {
    var uploadMode = options.mode || UPLOADING_MODES.singleFileUpload;
    if (!options.browseButton) {
      return;
    }
    var browseButton = document.querySelector(options.browseButton);
    if (!options.targetContainer) {
      return;
    }
    var targetContainer = document.querySelector(options.targetContainer);

    /**
     * Режим загрузки только 1 файла ?
     *
     * @return {boolean}
     */
    var isSingleFileUploadMode = function () {
      return uploadMode === UPLOADING_MODES.singleFileUpload;
    };

    /**
     * Проверка на соответствие файла разрешенному extension'y.
     *
     * @param {string} fileName
     * @return {boolean}
     */
    var hasValidExtension = function (fileName) {
      return FILE_TYPES.some(function (extension) {
        return fileName.toLowerCase().endsWith(extension);
      });
    };

    /**
     * Валидация extension'a у файлов.
     *
     * @param {Array} files
     * @return {boolean}
     */
    var hasValidationPassed = function (files) {
      if (!files.length) {
        return false;
      }

      for (var i = 0; i < files.length; i++) {
        if (!hasValidExtension(files[i].name)) {
          return false;
        }
      }

      return true;
    };

    /**
     * Генерация preview'шки.
     *
     * @param {string} encodedData
     * @return {Element}
     */
    var getGeneratedImageNode = function (encodedData) {
      var image = document.createElement('img');
      image.className = 'form__preview-photo';
      image.src = encodedData;

      var closeButton = document.createElement('button');
      closeButton.className = 'form__preview-photo-close';
      closeButton.type = 'button';
      closeButton.addEventListener('click', function () {
        if (!closeButton.parentNode) {
          return;
        }
        targetContainer.removeChild(closeButton.parentNode);
      });

      var imageContainer = document.createElement('div');
      imageContainer.className = 'form__preview-item';

      imageContainer.appendChild(image);
      imageContainer.appendChild(closeButton);

      return imageContainer;
    };

    /**
     * Вставить новую Dom ноду с картинкой в DOM.
     *
     * @param {string} encodedImage
     */
    var behaviorAttachNewNodeToDom = function (encodedImage) {
      targetContainer.appendChild(getGeneratedImageNode(encodedImage));
    };

    /**
     * Поменять у существующей DOM ноды src.
     *
     * @param {Object} sourceImage
     * @return {Function}
     */
    var behaviorReplaceExistingNodeContentInDom = function (sourceImage) {
      return function (encodedImage) {
        sourceImage.src = encodedImage;
      };
    };

    /**
     * Чтение файла.
     *
     * @param {string} file
     * @param {Function} onFileLoad
     */
    var readFile = function (file, onFileLoad) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        onFileLoad(reader.result);
      });
      reader.readAsDataURL(file);
    };

    /**
     * Обработчик изменения состояния инпута для файлов.
     */
    browseButton.addEventListener('change', function () {
      if (!browseButton.files.length) {
        return;
      }
      var files = browseButton.files;
      if (!hasValidationPassed(files)) {
        return;
      }

      Array.prototype.forEach.call(files, function (file) {
        if (isSingleFileUploadMode()) {
          readFile(file, behaviorReplaceExistingNodeContentInDom(targetContainer));
        } else {
          readFile(file, behaviorAttachNewNodeToDom);
        }
      });
    });
  }

  return {
    register: register,
    UPLOADING_MODES: UPLOADING_MODES
  };
})();
