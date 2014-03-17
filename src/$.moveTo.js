/**
 * Moves an element to the specified location or element, and is
 * boundary-aware, so moveable elements will not be displayed off-screen.
 *
 * 
 */
(function($, window) {
'use strict';

// If the width of $el is equal to the window width, then ignore the offset
// and let the CSS determine the styles.
//
// If the width of $el plus the total left offset is greater than the window
// width, then $el will be displayed off the right edge of the screen. To
// prevent this, move it to just off the right edge.
//
// Otherwise, move $el to passed-in coordinates.
function calculateLeft($el, position, offset) {
  var w = $el.width(),
    winW = $(window).width();

  return (w === winW) ? 0 : (w + position.left + offset.left > winW) ?
      winW - w - offset.left :
      position.left + offset.left;
}

var defaultOffset = {
  left: 0,
  top: 0
};

$.fn.moveTo = function($to, offset) {
  var position = $.isPlainObject($to) ? $to : $to.position();

  offset = $.extend({}, defaultOffset, offset);

  return this.each(function() {
    var $el = $(this);

    $el.css({
      position: 'absolute',
      top: position.top + offset.top,
      left: calculateLeft($el, position, offset)
    });
  });
};

})((window.Zepto || window.jQuery), window);