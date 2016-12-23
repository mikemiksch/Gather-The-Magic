(function(module){
  var creditsController = {};
  creditsController.reveal = function() {
    $('.tab-content').hide();
    $('.credit-data').remove();
    $('#search-again').hide();
    $('.card-data').remove();
    $('#credits').fadeIn();
    $('#not-found').hide();
  };
  module.creditsController = creditsController;
}(window));
