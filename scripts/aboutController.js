(function(module){
  var aboutController = {};
  aboutController.reveal = function() {
    $('.tab-content').hide();
    $('.card-data').remove();
    $('#about').fadeIn();
  }
  module.aboutController = aboutController;
}(window));
