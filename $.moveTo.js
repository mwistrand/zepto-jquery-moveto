!function(a,b){"use strict";function c(c,d,e){var f=c.width(),g=a(b).width();return f===g?0:f+d.left+e.left>g?g-f-e.left:d.left+e.left}var d={left:0,top:0};a.fn.moveTo=function(b,e){var f=a.isPlainObject(b)?b:b.position();return e=a.extend({},d,e),this.each(function(){var b=a(this);b.css({position:"absolute",top:f.top+e.top,left:c(b,f,e)})})}}(window.Zepto||window.jQuery,window);