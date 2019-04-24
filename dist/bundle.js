'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

/* props

  seconds = Number, speed of animation from start to completion (Optional)

  paginateArr = Array, returns the currentIndex of the array. When the animation is completed, the currentIndex is updated and returned. Automatically cycles the array. (Optional)

*/

/* Available in Children

  percent = percentage of animation completed 
  currentIndex = current index of the array passed through props. 

*/

var ProgressIterator = function ProgressIterator(_ref) {
  var seconds = _ref.seconds,
      paginateArr = _ref.paginateArr,
      children = _ref.children;

  var _useState = React.useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      percent = _useState2[0],
      setPercent = _useState2[1];

  var _useState3 = React.useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      currentIndex = _useState4[0],
      setCurrentIndex = _useState4[1];

  var iterate = function iterate() {
    if (paginateArr && _typeof(paginateArr) === 'object' && paginateArr.length >= 1) {
      if (percent >= 100) {
        if (currentIndex >= paginateArr.length - 1) {
          setCurrentIndex(0);
          setPercent(0);
        } else {
          setCurrentIndex(currentIndex + 1);
          setPercent(0);
        }
      } else {
        setPercent(percent + 1);
      }
    } else {
      if (percent >= 100) {
        setPercent(0);
      } else {
        setPercent(percent + 1);
      }
    }
  };

  var mSeconds = seconds * 1000 / 100;
  React.useEffect(function () {
    var timer = setInterval(function () {
      iterate();
    }, mSeconds || 50);
    return function () {
      clearInterval(timer);
    };
  });

  if (paginateArr && _typeof([]) === 'object' && paginateArr.length >= 1) {
    return children({
      percent: percent,
      currentIndex: currentIndex
    });
  }

  return children({
    percent: percent
  });
};

/* Documentation

percent = Number, passed from ProgressIteration as a child (Required)
diameter = Number, diameter of the outer circle to be created. Inner circle's diameter is proportional to the diameter set here. (Default = 30)
strokeWidth = Number, width of the stroke that revolves around each circle. Helps determine radius. (Default = 2) 
Color = String, color of the Stroke (Default = 'grey')
outlineColor = String, color of stationary circle. (Optional, defaults color prop),
showOutline, = Pass prop to set to true. Stationary circles will be made visible
sync = Pass prop to set to true, align the beginning animation of both circles with the top of the page
genesis = Pass prop to set to true, a special variation of the animation
flash = Pass prop to set to true, whether or not the inner circle will appear filled at 90% and 94% completed. (Only an option if the genesis prop is set to true)
lg = Pass prop to set to true, (diameter is set to 40);
*/

var Revolve = function Revolve(_ref) {
  var percent = _ref.percent,
      _ref$diameter = _ref.diameter,
      diameter = _ref$diameter === void 0 ? 30 : _ref$diameter,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === void 0 ? 2 : _ref$strokeWidth,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? '#05F7EC' : _ref$color,
      outlineColor = _ref.outlineColor,
      showOutline = _ref.showOutline,
      sync = _ref.sync,
      genesis = _ref.genesis,
      flash = _ref.flash,
      lg = _ref.lg;
  if (lg) diameter = 40;
  var radius = diameter / 2 - strokeWidth * 2;
  var circumference = radius * 2 * Math.PI;
  var offset = circumference - percent / 100 * circumference;
  var innerCoordinates = diameter / 4;
  var counterDiameter = diameter / 2;
  var counterRadius = counterDiameter / 2 - strokeWidth * 2;
  var counterCircumference = counterRadius * 2 * Math.PI;
  var counterPercent = percent * 2;
  var counterOffset = counterCircumference + counterPercent / 100 * circumference;

  var calcCounterStrokeOpacity = function calcCounterStrokeOpacity(percent) {
    if (percent >= 25) {
      return percent / 100;
    }

    if (percent >= 50 && percent <= 60) {
      return 0.01;
    }

    return 0.25;
  };

  var counterStrokeOpacity = calcCounterStrokeOpacity(percent);
  return React__default.createElement("svg", {
    className: "progress-ring",
    height: diameter,
    width: diameter
  }, React__default.createElement("circle", {
    className: "progress-ring-circle-stroke",
    style: {
      strokeDasharray: "".concat(genesis ? "".concat(percent) : "".concat(circumference, " ").concat(circumference)),
      strokeDashoffset: offset,
      strokeLinecap: 'rounded',
      transition: 'strokeDashoffset 0.35s',
      transform: "".concat(sync ? 'rotate(-90deg)' : 'rotate(-220deg)'),
      transformOrigin: '50% 50%',
      textAlign: 'center'
    },
    stroke: color,
    strokeWidth: strokeWidth,
    strokeOpacity: 100 - percent && (100 - percent) / 100,
    fill: "transparent",
    r: radius,
    cx: diameter / 2,
    cy: diameter / 2
  }), showOutline && React__default.createElement("circle", {
    className: "progress-ring-circle",
    style: {
      opacity: 0.2
    },
    stroke: outlineColor || color,
    fill: "transparent",
    r: radius,
    cx: diameter / 2,
    cy: diameter / 2
  }), React__default.createElement("svg", {
    className: "progress-counter-ring",
    height: counterDiameter,
    width: counterDiameter,
    y: innerCoordinates,
    x: innerCoordinates
  }, React__default.createElement("circle", {
    className: "progress-ring-counter-circle-stroke",
    style: {
      strokeDasharray: "".concat(genesis ? "".concat(100 - percent) : "".concat(counterCircumference, " ").concat(counterCircumference)),
      strokeDashoffset: counterOffset,
      strokeLinecap: 'rounded',
      transition: 'strokeDashoffset 0.35s',
      transform: "".concat(sync ? 'rotate(-90deg)' : 'rotate(30deg)'),
      transformOrigin: '50% 50%',
      textAlign: 'center'
    },
    stroke: color,
    strokeWidth: strokeWidth,
    strokeOpacity: counterStrokeOpacity,
    fill: 100 - percent === 0 && genesis && flash || 100 - percent === 1 && genesis && flash || 100 - percent <= 100 && 100 - percent >= 70 ? color : 'transparent',
    fillOpacity: 100 - percent >= 70 && (100 - percent * 10) / 100,
    r: counterRadius,
    cx: counterDiameter / 2,
    cy: counterDiameter / 2
  }), showOutline && React__default.createElement("circle", {
    className: "progress-ring-circle",
    style: {
      opacity: 0.2
    },
    stroke: outlineColor || color,
    fill: "transparent",
    r: counterRadius,
    cx: counterDiameter / 2,
    cy: counterDiameter / 2
  })));
};

/* Documentation

percent = Number, passed from ProgressIteration as a child (Required)
diameter = Number, diameter of the outer circle to be created. Inner circle's diameter is proportional to the diameter set here. (Default = 30)
strokeWidth = Number, width of the stroke that revolves around each circle. Helps determine radius. (Default = 2) 
Color = String, color of the Stroke (Default = 'grey')
outlineColor = String, color of stationary circle. (Optional, defaults color prop),
showOutline, = Pass prop to set to true. Stationary circles will be made visible
sync = Pass prop to set to true, align the beginning animation of both circles with the top of the page
lg = Pass prop to set to true, (diameter is set to 40);

*/

var Hazard = function Hazard(_ref) {
  var percent = _ref.percent,
      _ref$diameter = _ref.diameter,
      diameter = _ref$diameter === void 0 ? 30 : _ref$diameter,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === void 0 ? 2 : _ref$strokeWidth,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'yellow' : _ref$color,
      outlineColor = _ref.outlineColor,
      showOutline = _ref.showOutline,
      sync = _ref.sync,
      lg = _ref.lg;
  if (lg) diameter = 40;
  var radius = diameter / 2 - strokeWidth * 2;
  var circumference = radius * 2 * Math.PI;
  var offset = circumference - percent / 100 * circumference;
  var innerCoordinates = diameter / 4;
  var counterDiameter = diameter / 2;
  var counterRadius = counterDiameter / 2 - strokeWidth * 2;
  var counterCircumference = counterRadius * 2 * Math.PI;
  var counterPercent = percent * 2;
  var counterOffset = counterCircumference + counterPercent / 100 * circumference;

  var calStrokeOpacity = function calStrokeOpacity(value) {
    if (value >= 90 && value < 100 && value % 5 === 0 || value > 45 && value <= 55 && value % 5 === 0) {
      return 1;
    }

    return 0.7;
  };

  var outerRingStrokeOpacity = calStrokeOpacity(percent);
  return React__default.createElement("svg", {
    className: "progress-ring",
    height: diameter,
    width: diameter
  }, React__default.createElement("circle", {
    className: "progress-ring-circle-stroke",
    style: {
      // strokeDasharray: `${(lg) ? 1.5 : 0.4}`,
      strokeDasharray: "".concat(circumference, " ").concat(circumference),
      strokeDashoffset: offset,
      strokeLinecap: 'rounded',
      transition: 'strokeDashoffset 0.35s',
      transform: "".concat(sync ? 'rotate(-90deg)' : 'rotate(-220deg)'),
      transformOrigin: '50% 50%',
      textAlign: 'center'
    },
    stroke: color,
    strokeWidth: strokeWidth,
    strokeOpacity: outerRingStrokeOpacity,
    fill: "transparent",
    r: radius,
    cx: diameter / 2,
    cy: diameter / 2
  }), showOutline && React__default.createElement("circle", {
    className: "progress-ring-circle",
    style: {
      opacity: 0.3
    },
    stroke: outlineColor || color,
    fill: "transparent",
    r: radius,
    cx: diameter / 2,
    cy: diameter / 2
  }), React__default.createElement("svg", {
    className: "progress-counter-ring",
    height: counterDiameter,
    width: counterDiameter,
    y: innerCoordinates,
    x: innerCoordinates
  }, React__default.createElement("circle", {
    className: "progress-ring-counter-circle-stroke",
    style: {
      strokeDasharray: "".concat(lg ? 6.5 : 3.5),
      strokeDashoffset: counterOffset,
      strokeLinecap: 'rounded',
      transition: 'strokeDashoffset 0.35s',
      transform: "".concat(sync ? 'rotate(-90deg)' : 'rotate(30deg)'),
      transformOrigin: '50% 50%',
      textAlign: 'center'
    },
    stroke: color,
    strokeWidth: strokeWidth,
    strokeOpacity: 1,
    fill: "transparent",
    fillOpacity: 1,
    r: counterRadius,
    cx: counterDiameter / 2,
    cy: counterDiameter / 2
  })));
};

/* Props

  Percent = Number, passed from ProgressIteration as a child (Required)
  Diameter = Number, diameter of the circle to be created. (Default is 30) (Optional)
  StrokeWidth = Number, width of the stroke that revolves around the circle. Together with the diameter, the circle's radius is determined. (Default is 2) (Optional)
  Color = String, color of the Stroke, (Optional)
  OutlineColor = String, color of stationary circle, (Optional) (If passed, has precedence over other color styling, defaults to color, themeColor color has precedence over color)
  StrokeOpacity = Number (Optional)

*/

var Basic = function Basic(_ref) {
  var percent = _ref.percent,
      _ref$diameter = _ref.diameter,
      diameter = _ref$diameter === void 0 ? 30 : _ref$diameter,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === void 0 ? 2 : _ref$strokeWidth,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'black' : _ref$color,
      outlineColor = _ref.outlineColor,
      _ref$strokeOpacity = _ref.strokeOpacity,
      strokeOpacity = _ref$strokeOpacity === void 0 ? 0.7 : _ref$strokeOpacity,
      _ref$showOutline = _ref.showOutline,
      showOutline = _ref$showOutline === void 0 ? true : _ref$showOutline,
      lg = _ref.lg;
  if (lg) diameter = 40;
  var radius = diameter / 2 - strokeWidth * 2;
  var circumference = radius * 2 * Math.PI;
  var offset = circumference - percent / 100 * circumference;
  return React__default.createElement("svg", {
    className: "progress-ring",
    height: diameter,
    width: diameter
  }, React__default.createElement("circle", {
    className: "progress-ring-circle-stroke",
    style: {
      strokeDasharray: "".concat(circumference, " ").concat(circumference),
      strokeDashoffset: offset,
      transition: 'strokeDashoffset 0.35s',
      transform: 'rotate(-90deg)',
      transformOrigin: '50% 50%',
      textAlign: 'center'
    },
    stroke: color,
    strokeWidth: strokeWidth,
    strokeOpacity: strokeOpacity,
    fill: "transparent",
    r: radius,
    cx: diameter / 2,
    cy: diameter / 2
  }), showOutline && React__default.createElement("circle", {
    className: "progress-ring-circle",
    style: {
      opacity: 0.2
    },
    stroke: outlineColor || color,
    fill: "transparent",
    r: radius,
    cx: diameter / 2,
    cy: diameter / 2
  }));
};

exports.Basic = Basic;
exports.Hazard = Hazard;
exports.ProgressIterator = ProgressIterator;
exports.Revolve = Revolve;
