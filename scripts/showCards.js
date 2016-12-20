var showCards = {};

var renderResults = function(card) {
  var template = Handlebars.compile($('#card-data-template').text());
  return template(card);
};

showCards.listAll = function() {
  Card.searchResults.forEach(function(x) {
    $('#cards').append(renderResults(x, '#card-data-template'));
  });
};

getResults = function() {
  Card.createTable();
  Card.loadTable();
};
