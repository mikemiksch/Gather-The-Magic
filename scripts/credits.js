(function(module){
  var creditsController = {};
  creditsController.reveal = function() {
    $('.tab-content').hide();
    $('.credit-data').remove();
    $('#credits').fadeIn();
  }
  module.creditsController = creditsController;
}(window));
