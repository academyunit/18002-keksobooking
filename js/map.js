function getRandomGuestsNumber(number) {
  var list = [];
  for (var i = 0; i <= number; i++) {
    list.push(i);
  }

  return getRandomArrayElement(list);
}

function getRandomArrayElement(arr) {
  return arr[getRandomArrayIndex(arr)];
}

function getRandomArrayIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

function getUniqueValueGenerator(arr, callback) {
  var usedIndexes = {};

  return function() {
    var currentIndex = getRandomArrayIndex(arr);

    while (usedIndexes[currentIndex]) {
      currentIndex = getRandomArrayIndex(arr);
    }

    usedIndexes[currentIndex] = true;

    if (typeof callback === 'function') {
      return callback(arr[currentIndex]);
    }

    return arr[currentIndex];
  }

}

function getFeaturesData(words, maxChars) {
  // Сколько символов осталось
  var charsLeft = 0;
  // Массив сосгенерированными предложениями
  var arr = [];
  // Текущее предложение
  var currentSentence = '';
  // Сколько слов в предложении (меняется для каждого нового предложения)
  var wordsSplitLimit = 10;
  // Номер текущего слова
  var currentWordCount = 0;
  while (charsLeft <= maxChars) {
    currentWordCount++;

    var currentWord = words[getRandomArrayIndex(words)];
    charsLeft += currentWord.length;
    // Собираем предложение
    currentSentence += currentSentence
      // если текущее слово находится где-то в середине или конце - доавляем ему пробел в начало
      ? ' ' + currentWord
      // если это самое первое слово, то делаем его с большой буквы
      : currentWord.charAt(0).toUpperCase() + currentWord.substring(1, currentWord.length - 1);
    // лимит слов в предложении исчерпан
    if (currentWordCount == wordsSplitLimit) {
      // сохраняем его
      arr.push(currentSentence);
      // подготавливаемся к созданию следующего предложения
      currentSentence = '';
      currentWordCount = 0;
      wordsSplitLimit = Math.floor(Math.random() * words.length * 4);
    }
  }

  return arr;
}

function getFakePosts(amount) {
  var LIST_TITLES = [
    "Большая уютная квартира",
    "Маленькая неуютная квартира",
    "Огромный прекрасный дворец",
    "Маленький ужасный дворец",
    "Красивый гостевой домик",
    "Некрасивый негостеприимный домик",
    "Уютное бунгало далеко от моря",
    "Неуютное бунгало по колено в воде"
  ];
  var LIST_PHOTOS = [1, 2, 3, 4, 5, 6, 7, 8];
  var LIST_WORDS = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

  var avatarGenerator = getUniqueValueGenerator(LIST_PHOTOS, function(value) {
    return 'img/avatars/user0' + value + '.png';
  });
  var titlesGenerator = getUniqueValueGenerator(LIST_TITLES);

  var posts = [];
  for (var i = 0; i < amount; i++) {
    var post = {
      "author": {
        /*
         строка, адрес изображения вида img/avatars/user{{xx}}.png, где xx это число от 1 до 8 с ведущим нулем.
         Например 01, 02 и т. д. Адреса изображений не повторяются
         */
        "avatar": avatarGenerator()
      },
      "offer": {
        /*
         строка, заголовок предложения, одно из фиксированных значений:
         "Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец",
         "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик",
         "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде".
         Значения не должны повторяться.
         */
        "title": titlesGenerator(),
        /*
         @todo: что-то не понял тут - это что и как? "{{location.x}}, {{location.y}}" что это значит и в каком формате тут данные должны быть?
         строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}"
         */
        "address": '',
        /*
         @todo: по поводу вот этой штуки тоже не очень понятно: не будешь же массив int'ов генерить с 1000 до 1.000.000 :) Как тут сделать лучше?
         * число, случайная цена от 1000 до 1 000 000
         */
        "price": '',
        /*
         строка с одним из трех фиксированных значений: flat, house или bungalo
         */
        "type": getRandomArrayElement(['flat', 'house','bungalo']),
        /*
         число, случайное количество комнат от 1 до 5
         */
        "rooms": getRandomArrayElement([1, 2, 3, 4, 5]),
        /*
         число, случайное количество гостей, которое можно разместить
         */
        "guests": getRandomGuestsNumber(20),
        /*
         строка с одним из трех фиксированных значений: 12:00, 13:00 или 14:00,
         */
        "checkin": getRandomArrayElement(['12:00', '13:00', '14:00']),
        /*
         строка с одним из трех фиксированных значений: 12:00, 13:00 или 14:00
         */
        "checkout": getRandomArrayElement(['12:00', '13:00', '14:00']),
        /*
         массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
         */
        "features": getFeaturesData(LIST_WORDS, 500),
        /*
         пустая строка
         */
        "description": '',
        /*
         пустой массив
         */
        "photos": []
      },
      /*
       @todo: вопрос аналогичен вопросу про price выше :)
       */
      "location": {
        /*
         случайное число, координата x метки на карте в блоке .tokyo__pin-map от 300 до 900,
         */
        "x": '',
        /*
         случайное число, координата y метки на карте в блоке .tokyo__pin-map от 100 до 500
         */
        "y": ''
      }
    };

    posts.push(post);
  }

  return posts;
}

console.log(getFakePosts(7));