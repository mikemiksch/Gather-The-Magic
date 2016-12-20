(function(module) {

  var showCards = {};

  var renderResults = function(card) {
    var template = Handlebars.compile($('#card-data-template').text());
    return template(card);
  };

  showCards.listAll = function() {
    Card.searchResults.forEach(function(x) {
      console.log('Firing Card.searchResults.forEach');
      $('#cards').append(renderResults(x, '#card-data-template'));
    });
  };

  Card.createTable();
  Card.loadTable();
  module.showCards = showCards;
})(window);
