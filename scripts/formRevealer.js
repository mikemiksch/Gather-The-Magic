(function(module){
  var formRevealer = {};
  formRevealer.reveal = function() {
    $('#not-found').hide();
    $('#loadingSvg').hide();
    $('.tab-content').hide();
    $('.card-data').remove();
    $('#searchForm').fadeIn();
  };
  module.formRevealer = formRevealer;
}(window));
