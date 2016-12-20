(function(module) {

  var cardResults = {};

  cardResults.hideData = function() {
    $('.expanded-info').show().hide();
    $('.name-cost').on('click', function(e) {
      e.preventDefault();
      $('.expanded-info').hide();
      $(this).siblings().show();
    });
  };

  module.cardResults = cardResults;
})(window);
