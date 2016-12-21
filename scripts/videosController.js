(function(module){
  var videosController = {};
  videosController.reveal = function() {
    $('.tab-content').hide();
    $('#videos').fadeIn();
  }
  module.videosController = videosController;
}(window));
