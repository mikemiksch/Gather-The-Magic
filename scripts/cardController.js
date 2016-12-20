// (function(module) {
//
//   var cardController = {};
//
//   Card.createTable();
//
//   cardController.index = function(ctx, next) {
//     console.log(ctx);
//     if(ctx.searchResults.length) {
//       showCards.listAll(ctx.searchResults);
//     }
//   };
//
//   cardController.loadAll = function(ctx, next) {
//     var cardData = function(allCards) {
//       ctx.searchResults = Card.allCards;
//       next();
//     };
//
//     if(Card.searchResults.length) {
//       ctx.searchResults = Card.allCards;
//       next();
//     } else {
//       Card.loadTable(cardData);
//     }
//   };
//
//   module.cardController = cardController;
//
//   cardController.loadAll();
//   cardController.index(searchResults, next);
// })(window);
