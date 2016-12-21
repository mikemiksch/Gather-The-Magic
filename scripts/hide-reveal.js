(function(module) {

  var cardResults = {};

  cardResults.hideReveal = function() {
    $('.name-cost').on('click', function(e) {
      console.log('onclick firing');
      e.preventDefault();
      if ($(this).siblings().hasClass('reveal')) {
        $('.reveal').attr('class', 'hidden');
      } else {
        $(this).siblings().attr('class', 'reveal');
      }
    });
  };

  // cardResults.hideReveal();
  module.cardResults = cardResults;
})(window);
