(function(module){
  var videosController = {};
  videosController.reveal = function() {
    $('.tab-content').hide();
    $('.card-data').remove();
    $('#videos').fadeIn();
  }
  module.videosController = videosController;
}(window));
