'use strict';

window.cardTools = (function () {
  var showCard = function (post) {
    window.map.mapContainer.appendChild(post);
  };

  return {
    showCard: showCard
  };
})();
