# Zepto-compatible jQuery `moveTo` Plugin
Moves an element to either the specified element or position. Note that the element’s parent will *not* change.

## Usage
`moveTo` takes two arguments:
  1. `$to`: Either another `$` element or an object representing the left and top positions to which the element should be moved.
  2. `offset`: An options object containing the number of pixels by which the element should be offset from the destination (`left` or `top`).

Example:

```javascript
// Move `$toolbar` to the position of the `$link` element,
// offset 10px to the left and 20px from the top
$toolbar.moveTo($link, {
  left: 10,
  top: 20
});

// Now move `$toolbar` to an arbitrary position:
$toolbar.moveTo({
  left: 385,
  top: 1025
});
```

The plugin is aware of the window width and vertical scroll position, and behaves as follows:
  * If the width of the element is equal to the window width, then the offset will be ignored, and it will be up to you to set the styles in the CSS.
  * If the element’s width plus the total left offset is greater than the window width, then the element would normally be displayed off the right edge of the screen. To prevent this, the element will be moved to just off the right edge.
  * If the passed-in element or coordinates are at the very bottom of the current scroll position, then the element will be moved directly on top of it.
  * Otherwise, the element will be moved to the passed-in coordinates/element.