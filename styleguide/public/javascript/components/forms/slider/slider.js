$(function() {
  $('.js-slider').each(function() {
    var min = $(this).data('min');
    var max = $(this).data('max');
    var $slider = $(this).find('.js-slider-path');
    var $input = $(this).find('input');
    var $handle = $slider.find('.js-slider-handle');
    $slider.slider({
      value: $input.val(),
      create: function () {
        $handle.text($(this).slider('value'));
      },
      slide: function (event, ui) {
        $handle.text(ui.value);
      },
      change: function (event, ui) {
        $input.val(ui.value);
      },
      min: min,
      max: max
    });
  });
});
