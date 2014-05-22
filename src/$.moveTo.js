/**
 * Moves an element to the specified location or element, and is
 * boundary-aware, so moveable elements will not be displayed off-screen.
 */
(function($, window) {
'use strict';

// If the width of $el is equal to the window width,
// then do nothing and let the CSS determine the styles.
//
// If the height/width of $el plus the total left/top offset is greater
// than the vertical scroll position/width, then $el will be displayed off
// the bottom/right edge of the screen. To prevent this, move it to just
// off the bottom/right edge.
//
// Otherwise, move $el to passed-in coordinates.
var getPoint = function getPoint(dimension) {
    return function(d, winD, position, offset) {
      var direction = (dimension === 'height') ? 'top' : 'left';

      return (d + position[direction] + offset[direction] > winD) ?
            winD - d - offset[direction] :
            position[direction] + offset[direction];
    };
  },

  getX = getPoint('width'),
  getY = getPoint('height'),

  getStyles = function($el, position, offset) {
    var rect = $el.get(0).getBoundingClientRect(),
      w = Math.abs(rect.width || rect.left - rect.right),
      $win = $(window),
      winW = $win.width();

    if (w >= winW) {
      return false;
    }

    return {
      position: 'absolute',
      left: getX(w, winW, position, offset),
      top: getY(
        Math.abs(rect.bottom - rect.top),
        $win.height() + $win.scrollTop(),
        position,
        offset
      )
    };
  },

  defaultOffset = {
    left: 0,
    top: 0
  };

$.fn.moveTo = function($to, offset, staticIfFullWidth) {
  var position = $.isPlainObject($to) ? $to : $to.position(),
    $win = $(window);

  offset = $.extend({}, defaultOffset, offset);

  return this.each(function() {
    var $el = $(this),
      css = getStyles($el, position, offset);
    
    if (css) {
      $el.css(css);
    }
  });
};

})((window.Zepto || window.jQuery), window);