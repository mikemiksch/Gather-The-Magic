(function(module){
  var formRevealer = {};
  formRevealer.reveal = function() {
    $('.tab-content').hide();
    $('#searchForm').fadeIn();
  }
  module.formRevealer = formRevealer;
}(window));
