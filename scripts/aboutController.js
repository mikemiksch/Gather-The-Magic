(function(module){
  var aboutController = {};
  aboutController.reveal = function() {
    $('.tab-content').hide();
    $('.card-data').remove();
    $('#search-again').hide();
    $('#about').fadeIn();
    $('#not-found').hide();
  };
  module.aboutController = aboutController;
}(window));
