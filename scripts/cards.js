
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
  }, this);
}

Card.searchResults = [];

Card.createTable = function(callback) {
  webDB.execute('DROP TABLE IF EXISTS searchResults', callback);
  webDB.execute(
    'CREATE TABLE searchResults (' +
      'id INTEGER PRIMARY KEY, ' +
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

var name;
var cmc;
var colors;
var types;
var rarity;
var text;
var power;
var toughness;
var queryString = 'https://api.magicthegathering.io/v1/cards';

setParameters = function() {
  var name = $('#titleInput').val();
  var cmc = $('#cmcInput').val();
  var colors = $('#colorSelect').val();
  var types = $('#typeLine').val();
  var rarity = $('#raritySelect').val();
  var text = $('#flavor').val();
  var power = $('#powerInput').val();
  var toughness = $('#toughInput').val();
};

concatString = function() {
  if(typeof name !== 'undefined') {
    console.log(name);
    queryString = queryString.concat('?page=' + name);
  }
  if(typeof cmc !== 'undefined') {
    console.log(cmc);
    queryString = queryString.concat('?cmc=' + cmc);
  }
  if(typeof colors !== 'undefined') {
    console.log(colors);
    queryString = queryString.concat('?colors=' + colors);
  }
  if(typeof types !== 'undefined') {
    console.log(types);
    queryString = queryString.concat('?types=' + types);
  }
  if(typeof rarity !== 'undefined') {
    console.log(rarity);
    queryString = queryString.concat('?rarity=' + rarity);
  }
  if(typeof text !== 'undefined') {
    console.log(text);
    queryString = queryString.concat('?text=' + text);
  }
  if(typeof power !== 'undefined') {
    console.log(power);
    queryString = queryString.concat('?power=' + power);
  }
  if(typeof toughness !== 'undefined') {
    console.log(toughness);
    queryString = queryString.concat('?toughness=' + toughness);
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
