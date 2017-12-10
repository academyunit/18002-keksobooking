'use strict';

/**
 * @todo: есть какой-нибудь вариант лучше экспортировать эти константы?
 * Ну и мне все не нужныы, из тех что используются в 2-х разных местах (map + card): APARTMENT_* только.
 */
(function () {
  window.LIST_TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  window.LIST_PHOTOS = [1, 2, 3, 4, 5, 6, 7, 8];
  window.LIST_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  window.LIST_CHECK_IN = ['12:00', '13:00', '14:00'];
  window.LIST_CHECK_OUT = ['12:00', '13:00', '14:00'];
  window.APARTMENT_TYPE_FLAT = 'flat';
  window.APARTMENT_TYPE_HOUSE = 'house';
  window.APARTMENT_TYPE_BUNGALO = 'bungalo';
  window.LIST_APARTMENTS_TYPES = [window.APARTMENT_TYPE_FLAT, window.APARTMENT_TYPE_HOUSE, window.APARTMENT_TYPE_BUNGALO];
})();
