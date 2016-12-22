(function(module){
  var videosController = {};
  videosController.reveal = function() {
    $('.tab-content').hide();
    $('#search-again').hide();
    $('.card-data').remove();
    $('#videos').fadeIn();
    $('.slider-nav').show();
    $('slider-for').show();
  };
  module.videosController = videosController;
}(window));
