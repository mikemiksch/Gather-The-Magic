(function(module){
  var videosController = {};
  videosController.reveal = function() {
    $('.tab-content').hide();
    $('#search-again').hide();
    $('.card-data').remove();
    $('#videos').fadeIn();
  };
  module.videosController = videosController;
}(window));
