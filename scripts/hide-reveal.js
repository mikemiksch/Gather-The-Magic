(function(module) {

  var cardResults = {};

  cardResults.hideReveal = function() {
    $('.name-cost').on('click', function(e) {
      e.preventDefault();
      $('.reveal').attr('class', 'hidden');
      if ($(this).siblings().hasClass('reveal')) {
        $(this).siblings().attr('class', 'hidden');
      } else {
        $(this).siblings().attr('class', 'reveal');
      }
    });
  };

  module.cardResults = cardResults;
})(window);
