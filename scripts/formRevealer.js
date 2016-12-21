(function(module){
  var formRevealer = {};
  formRevealer.reveal = function() {
    $('#loadingSvg').hide();
    $('.tab-content').hide();
    $('#searchForm').fadeIn();
  }
  module.formRevealer = formRevealer;
}(window));
