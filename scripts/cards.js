
function Card(options) {
  Object.keys(options).forEach(function(e, indx, keys) {
    this[e] = options[e];
    if(typeof this.power === 'undefined') {
      this.power = '';
    }
    if(typeof this.toughness === 'undefined') {
      this.toughness = '';
    }
    if(typeof this.cmc === 'undefined') {
      this.cmc === '';
    }
    if(typeof this.colors === 'undefined') {
      this.colors = '';
    }
  }, this);
}

Card.searchResults = [];

Card.createTable = function(callback) {
  webDB.execute('DROP TABLE IF EXISTS searchResults', callback);
  webDB.execute(
    'CREATE TABLE searchResults (' +
      'id INTEGER PRIMARY KEY, ' +
      'name VARCHAR(50) NOT NULL, ' +
      'cmc VARCHAR(50) NOT NULL, ' +
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
      '(name, cmc, colors, types, rarity, text, imageUrl, power, toughness) ' +
      'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);',
      'data':
        [this.name,
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

var name = $('#name').val();
var cmc = $('#cmc').val();
var colors = $('#colors').val();
var types = $('#types').val();
var rarity = $('#rarity').val();
var text = $('#text').val();
var power = $('#power').val();
var toughness = $('#toughness').val();
var queryString = 'https://api.magicthegathering.io/v1/cards';

buildString = function() {
  if(typeof name !== 'undefined') {
    name = name.split(' ').join('+');
    queryString = queryString.concat('?page=' + name);
  }
  if(typeof cmc !== 'undefined') {
    queryString = queryString.concat('?cmc=' + cmc);
  }
  if(typeof colors !== 'undefined') {
    queryString = queryString.concat('?colors=' + colors);
  }
  if(typeof types !== 'undefined') {
    queryString = queryString.concat('?types=' + types);
  }
  if(typeof rarity !== 'undefined') {
    queryString = queryString.concat('?rarity=' + rarity);
  }
  if(typeof text !== 'undefined') {
    text = text.split(' ').join('+');
    queryString = queryString.concat('?text=' + text);
  }
  if(typeof power !== 'undefined') {
    queryString = queryString.concat('?power=' + power);
  }
  if(typeof toughness !== 'undefined') {
    queryString = queryString.concat('?toughness=' + toughness);
  }
};

Card.loadResults = function(rows) {
  Card.searchResults = rows.map(function(element) {
    return new Card(element);
  });
};

Card.loadTable = function(callback) {
  buildString();
  var JSONdata = [];
  console.log(queryString);
  webDB.execute(
    'SELECT * FROM searchResults ORDER BY name ASC',
      function(rows) {
        if(rows.length) {
          Card.loadResults(rows);
          showCards.listAll();
        } else {
          $.getJSON(queryString, function(data) {
            data.cards.forEach(function(item) {
              var card = new Card(item);
              card.generateRow();
            });
            webDB.execute(
              'SELECT * FROM searchResults ORDER BY name ASC',
              function(rows) {
                Card.loadResults(rows);
                showCards.listAll();
              });
          });
        }
      });
};
