describe('$.fn.moveTo Plugin', function() {
  'use strict';

  var $a,
    $moveable;

  beforeEach(function() {
    jasmine.Clock.useMock();

    // set the width on both elements to 1px so that the width of the browser
    // running in the background doesn't throw off the tests.
    $moveable = $('<div />').css('width', '1px').appendTo(document.body);
    $a = $('<a />').css({
      display: 'block',
      height: '1px',
      width: '1px'
    }).appendTo(document.body);
  });

  afterEach(function() {
    $a.remove();
    $moveable.remove();
  });

  describe('when an element is positioned normally', function() {
    beforeEach(function() {
      spyOn($a, 'position').andCallFake(function() {
        return {
          left: 100,
          top: 100
        };
      });
    });

    it('moves an element to the specified object of coordinates', function() {
      $moveable.moveTo({
        top: 100,
        left: 100
      });
      expect($moveable.css('top')).toEqual('100px');
      expect($moveable.css('left')).toEqual('100px');
    });

    it('moves an element to the position of another element', function() {
      $moveable.moveTo($a);
      expect($moveable.css('position')).toEqual('absolute');
      expect($moveable.css('top')).toEqual('100px');
      expect($moveable.css('left')).toEqual('100px');
    });

    it('offsets the element by the specified number of pixels', function() {
      $moveable.moveTo($a, {
        left: 10,
        top: 10
      });
      expect($moveable.css('position')).toEqual('absolute');
      expect($moveable.css('top')).toEqual('110px');
      expect($moveable.css('left')).toEqual('110px');
    });
  });

  describe('when an element is positioned along the right edge of the screen',
      function() {

    it('moves the element to the left of the anchor', function() {
      var anchorX = $(window).width() - $a.width();

      $a.css({
        position: 'absolute',
        left: anchorX
      });
      $moveable.moveTo($a);

      expect($moveable.css('left')).toEqual(anchorX + 'px');
    });
  });

  describe('when an element is positioned along the bottom edge of the screen',
      function() {
    it('moves the element above that anchor', function() {
      var anchorY = $(window).height() - $a.height();

      $a.css({
        position: 'absolute',
        top: anchorY
      });
      $moveable.moveTo($a);

      expect($moveable.css('top')).toEqual(anchorY + 'px');
    });
  });
});