(function(module){
  var formRevealer = {};
  formRevealer.reveal = function() {
    $('#loadingSvg').hide();
    $('.tab-content').hide();
    $('.card-data').remove();
    $('#searchForm').fadeIn();
  }
  module.formRevealer = formRevealer;
}(window));
