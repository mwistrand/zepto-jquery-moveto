/**
 * Moves an element to the specified location or element, and is
 * boundary-aware, so moveable elements will not be displayed off-screen.
 */
(function($, window) {
'use strict';

// If the height/width of $el is equal to the window scroll top/left,
// then ignore the offset and let the CSS determine the styles.
//
// If the height/width of $el plus the total left/top offset is greater
// than the window scroll top/left, then $el will be displayed off
// the bottom/right edge of the screen. To prevent this, move it to just
// off the bottom/right edge.
//
// Otherwise, move $el to passed-in coordinates.
function getCalculator(dimension) {
  return function($win, $el, position, offset) {
    var rect = $el.get(0).getBoundingClientRect(),
      d = dimension === 'width' ?
          Math.abs(rect.left - rect.right) :
          Math.abs(rect.bottom - rect.top),
      winD = dimension === 'width' ?
          $win.width() + $win.scrollLeft() :
          $win.height() + $win.scrollTop(),
      direction = dimension === 'width' ? 'left' : 'top';
console.log(d);
    return (d === winD) ? 0 : (d + position[direction] + offset[direction] > winD) ?
        winD - d - offset[direction] :
        position[direction] + offset[direction];
  };
}

var calcX = getCalculator('width'),
  calcY = getCalculator('height'),
  defaultOffset = {
    left: 0,
    top: 0
  };

$.fn.moveTo = function($to, offset) {
  var position = $.isPlainObject($to) ? $to : $to.position(),
    $win = $(window);

  offset = $.extend({}, defaultOffset, offset);

  return this.each(function() {
    var $el = $(this);

    $el.css({
      position: 'absolute',
      top: calcY($win, $el, position, offset),
      left: calcX($win, $el, position, offset)
    });
  });
};

})((window.Zepto || window.jQuery), window);