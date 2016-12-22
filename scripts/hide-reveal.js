(function(module) {

  var cardResults = {};

  cardResults.hideRevealResults = function() {
    $('.name-cost').on('click', function(e) {
      e.preventDefault();
      $('.reveal').attr('class', 'hidden');
      $(this).siblings().toggle();
    });
  };

  cardResults.hideRevealForm = function() {
    $('#search-submit').on('click', function(e) {
      e.preventDefault();
      $('#searchForm').toggle();
    });
    $('#search-again').on('click', function(e) {
      e.preventDefault();
      $('#searchForm').toggle();
    });
  };

  module.cardResults = cardResults;
})(window);
