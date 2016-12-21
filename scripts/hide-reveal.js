(function(module) {

  var cardResults = {};

  cardResults.hideReveal = function() {
    $('.name-cost').on('click', function(e) {
      e.preventDefault();
      $('.reveal').attr('class', 'hidden');
      $(this).siblings().toggle();
    });
  };

  module.cardResults = cardResults;
})(window);
