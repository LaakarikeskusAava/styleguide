
$(function() {
  $('.js-slider').each(function() {
    var min = $(this).data('min');
    var max = $(this).data('max');
    var $slider = $(this).children('.js-slider-path');
    var $handle = $slider.children('.js-slider-handle');
    $slider.slider({
      create: function() {
        $handle.text($(this).slider('value'));
      },
      slide: function (event, ui) {
        $handle.text(ui.value);
      },
      min: min,
      max: max
    });
  });
});
