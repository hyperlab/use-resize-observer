"use strict";

var react = require("react");

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

  return _extends.apply(this, arguments);
}

function index(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
    ref = _ref.ref,
    _ref$defaultWidth = _ref.defaultWidth,
    defaultWidth = _ref$defaultWidth === void 0 ? 1 : _ref$defaultWidth,
    _ref$defaultHeight = _ref.defaultHeight,
    defaultHeight = _ref$defaultHeight === void 0 ? 1 : _ref$defaultHeight,
    _ref$useDefaults = _ref.useDefaults,
    useDefaults = _ref$useDefaults === void 0 ? true : _ref$useDefaults;

  // `defaultRef` Has to be non-conditionally declared here whether or not it'll
  // be used as that's how hooks work.
  // @see https://reactjs.org/docs/hooks-rules.html#explanation
  var defaultRef = react.useRef(null);
  ref = ref || defaultRef;

  var _useState = react.useState(
      useDefaults
        ? {
            width: defaultWidth,
            height: defaultHeight
          }
        : null
    ),
    size = _useState[0],
    setSize = _useState[1]; // Using a ref to track the previous width / height to avoid unnecessary renders

  var previous = react.useRef({
    width: defaultWidth,
    height: defaultHeight
  });
  react.useEffect(
    function() {
      if (
        typeof ref !== "object" ||
        ref === null ||
        !(ref.current instanceof Element)
      ) {
        return;
      }

      var element = ref.current;
      var resizeObserver = new ResizeObserver(function(entries) {
        if (!Array.isArray(entries)) {
          return;
        } // Since we only observe the one element, we don't need to loop over the
        // array

        if (!entries.length) {
          return;
        }

        var entry = entries[0]; // `Math.round` is in line with how CSS resolves sub-pixel values

        var newWidth = Math.round(entry.contentRect.width);
        var newHeight = Math.round(entry.contentRect.height);

        if (
          previous.current.width !== newWidth ||
          previous.current.height !== newHeight
        ) {
          previous.current.width = newWidth;
          previous.current.height = newHeight;
          setSize({
            width: newWidth,
            height: newHeight
          });
        }
      });
      resizeObserver.observe(element);
      return function() {
        return resizeObserver.unobserve(element);
      };
    },
    [ref, ref.current]
  );
  return react.useMemo(
    function() {
      return _extends(
        {
          ref: ref
        },
        size
      );
    },
    [ref, size ? size.width : null, size ? size.height : null]
  );
}

module.exports = index;
