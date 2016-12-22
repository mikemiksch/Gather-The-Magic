
function Card(options) {
  Object.keys(options).forEach(function(e, indx, keys) {
    this[e] = options[e];
    if(typeof this.power === 'undefined') {
      this.power = 'NA';
    }
    if(typeof this.toughness === 'undefined') {
      this.toughness = 'NA';
    }
    if(typeof this.cmc === 'undefined') {
      this.cmc = 'NA';
    }
    if(typeof this.colors === 'undefined') {
      this.colors = '';
    }
    if(typeof this.imageUrl === 'undefined') {
      this.imageUrl = 'assets/default.png';
    }
  }, this);
}

Card.searchResults = [];

Card.createTable = function(callback) {
  webDB.execute('DROP TABLE IF EXISTS searchResults', callback);
  webDB.execute(
    'CREATE TABLE searchResults (' +
      'id VARCHAR PRIMARY KEY, ' +
      'name VARCHAR(50) NOT NULL, ' +
      'cmc VARCHAR(2) NOT NULL, ' +
      'colors VARCHAR(50) NOT NULL, ' +
      'types VARCHAR(50) NOT NULL, ' +
      'rarity VARCHAR(50) NOT NULL, ' +
      'text VARCHAR(500) NOT NULL, ' +
      'imageUrl VARCHAR(500) NOT NULL, ' +
      'power VARCHAR, ' +
      'toughness VARCHAR);',
    callback
  );
};

Card.prototype.generateRow = function(callback) {
  webDB.execute(
    [{
      'sql': 'INSERT INTO searchResults ' +
      '(id, name, cmc, colors, types, rarity, text, imageUrl, power, toughness) ' +
      'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
      'data':
        [this.id,
        this.name,
        this.cmc,
        this.colors,
        this.types,
        this.rarity,
        this.text,
        this.imageUrl,
        this.power,
        this.toughness],
    }],
    callback
  );
};

var name;
var cmc;
var colors;
var types;
var rarity;
var text;
var power;
var toughness;
var queryString;

setParameters = function() {
  queryString = 'https://api.magicthegathering.io/v1/cards?';
  name = $('#titleInput').val();
  cmc = $('#cmcInput').val();
  colors = $('#colorSelect').val();
  types = $('#typeSelect').val();
  rarity = $('#raritySelect').val();
  text = $('#flavor').val();
  power = $('#powerInput').val();
  toughness = $('#toughInput').val();
};

concatString = function() {
  if(name !== '') {
    console.log(name);
    queryString = queryString.concat('&name=' + name);
  }
  if(cmc !== '') {
    console.log(cmc);
    queryString = queryString.concat('&cmc=' + cmc);
  }
  if(colors !== '') {
    console.log(colors);
    queryString = queryString.concat('&colors=' + colors);
  }
  if(types !== '') {
    console.log(types);
    queryString = queryString.concat('&types=' + types);
  }
  if(rarity !== '') {
    console.log(rarity);
    queryString = queryString.concat('&rarity=' + rarity);
  }
  if(typeof text !== 'undefined') {
    console.log(text);
    queryString = queryString.concat('&text=' + text);
  }
  if(power !== '') {
    console.log(power);
    queryString = queryString.concat('&power=' + power);
  }
  if(toughness !== '') {
    console.log(toughness);
    queryString = queryString.concat('&toughness=' + toughness);
  }
};

buildString = function() {
  setParameters();
  concatString();
};

Card.loadResults = function(rows) {
  Card.searchResults = rows.map(function(element) {
    return new Card(element);
  });
};

Card.loadTable = function(callback) {
  buildString();
  console.log(queryString);
  webDB.execute(
    $.getJSON(queryString, function(data) {
      data.cards.forEach(function(item) {
        var card = new Card(item);
        card.generateRow();
      });
      webDB.execute(
        'SELECT * FROM searchResults ORDER BY name ASC',
        function(rows) {
          if(!rows.length) {
            $('#not-found').show();
            Card.revealAgain();
          } else {
            $('#not-found').hide();
            Card.hideSearch();
            Card.loadResults(rows);
            showCards.listAll();
            cardResults.hideRevealResults();
            Card.revealAgain();
          }
        });
    })
  );
};

Card.hideSearch = function(){
  $('#search-submit').toggle();
  $('#loadingSvg').show();

};

Card.revealAgain = function(){
  $('#loadingSvg').hide();
  $('#search-again').show();
};
