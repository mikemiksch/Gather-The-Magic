(function(module){
  var formRevealer = {};
  formRevealer.reveal = function() {
    $('#not-found').hide();
    $('#search-again').hide();
    $('#loadingSvg').hide();
    $('.tab-content').hide();
    $('.card-data').remove();
    $('#searchForm').fadeIn();
    $('#submit-search').show();
  };
  module.formRevealer = formRevealer;
}(window));
