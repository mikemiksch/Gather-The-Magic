(function(module) {
  function Card(options) {
    Object.keys(options).forEach(function(e, indx, keys) {
      this[e] = options[e];
    }, this);
  }

  Card.searchResults = [];

  Card.createTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS searchResults (' +
        'id INTEGER PRIMARY KEY, ' +
        'name VARCHAR(50) NOT NULL, ' +
        'cmc VARCHAR(50) NOT NULL, ' +
        'colors VARCHAR(50) NOT NULL, ' +
        'types VARCHAR(50) NOT NULL, ' +
        'rarity VARCHAR(50) NOT NULL, ' +
        'text VARCHAR(500) NOT NULL, ' +
        'power INTEGER NOT NULL, ' +
        'toughness INTEGER NOT NULL);',
      callback
    );
  };

  Card.prototype.generateRow = function(callback) {
    webDB.execute(
      [{
        'sql': 'INSERT INTO searchResults ' +
        '(name, cmc, colors, types, rarity, text, power, toughness) ' +
        'VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
        'data':
          [this.name,
          this.cmc,
          this.colors,
          this.types,
          this.rarity,
          this.text,
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
      'SELECT * FROM searchResults ORDER BY name DESC',
        function(rows) {
          if(rows.length) {
            Card.loadResults(rows);
            // callback();
          } else {
            $.getJSON(queryString, function(data) {
              JSONdata.push($.getJSON(queryString));
              JSONdata.forEach(function(item) {
                var card = new Card(item);
                card.generateRow();
              });
              webDB.execute(
                'SELECT * FROM searchResults ORDER BY name DESC',
                function(rows) {
                  Card.loadResults(rows);
                  // callback();
                });
            });
          }
        });
  };

  module.Card = Card;
})(window);

//
// var cards = [];
//
// requestCards = function(callback) {
//   console.log('Requesting cards');
//   buildString();
//   $.get(queryString)
//   .done(function(data) {
//     cards = data;
//   })
//   .done(callback);
// };
