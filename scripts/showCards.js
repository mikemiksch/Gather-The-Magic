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
  Card.hideSearch();
  Card.createTable();
  Card.loadTable();
};

submitSearch = function() {
  $('#search-submit').on('click', function(e) {
    e.preventDefault();
    $('.card-data').remove();
    $('#not-found').attr('class', 'hidden');
    getResults();
  });
};

submitSearch();
