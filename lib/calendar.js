"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dayjs = _interopRequireDefault(require("dayjs"));

var _util = require("./util");

require("./calendar.css");

var _arrow = _interopRequireDefault(require("../public/arrow.svg"));

var _doubleArrow = _interopRequireDefault(require("../public/double-arrow.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var head = ['???', '???', '???', '???', '???', '???', '???'];

var MonthView = /*#__PURE__*/function (_PureComponent) {
  _inherits(MonthView, _PureComponent);

  var _super = _createSuper(MonthView);

  function MonthView(props) {
    var _this;

    _classCallCheck(this, MonthView);

    _this = _super.call(this, props);
    _this.handleTouchMove = (0, _util.throttle)(function (e) {
      e.stopPropagation();
      var disableWeekView = _this.props.disableWeekView;
      var moveX = e.touches[0].clientX - _this.touchStartPositionX;
      var moveY = e.touches[0].clientY - _this.touchStartPositionY;
      var calendarWidth = _this.calendarRef.current.offsetWidth;
      var calendarHeight = _this.calendarRef.current.offsetHeight;

      if (Math.abs(moveX) > Math.abs(moveY)) {
        // ????????????
        _this.setState({
          touch: {
            x: moveX / calendarWidth,
            y: 0
          }
        });
      } else if (!disableWeekView) {
        _this.setState({
          touch: {
            x: 0,
            y: moveY / calendarHeight
          }
        });
      }

      _this.props.onTouchMove(e);
    }, 25);

    _this.handleTouchStart = function (e) {
      e.stopPropagation();
      _this.touchStartPositionX = e.touches[0].clientX;
      _this.touchStartPositionY = e.touches[0].clientY;
      _this.isTouching = true;

      _this.props.onTouchStart(e);
    };

    _this.handleTouchEnd = function (e) {
      e.stopPropagation();
      var showType = _this.state.showType;
      var disableWeekView = _this.props.disableWeekView;
      var calendarHeight = _this.calendarRef.current.offsetHeight;
      var _this$state = _this.state,
          touch = _this$state.touch,
          translateIndex = _this$state.translateIndex,
          currentMonthFirstDay = _this$state.currentMonthFirstDay,
          currenWeekFirstDay = _this$state.currenWeekFirstDay;
      _this.f = false;
      _this.isTouching = false;
      var absTouchX = Math.abs(touch.x);
      var absTouchY = Math.abs(touch.y);

      if (absTouchX > absTouchY && absTouchX > 0.15) {
        var isMonthView = showType === 'month';
        var newTranslateIndex = touch.x > 0 ? translateIndex + 1 : translateIndex - 1;

        if (isMonthView) {
          // ?????????
          var nextMonthFirstDay = currentMonthFirstDay[touch.x > 0 ? 'subtract' : 'add'](1, 'month');
          var nextMonthStartDay = nextMonthFirstDay.startOf('week');
          var nextMonthEndDay = nextMonthStartDay.add(42, 'day');

          _this.setState(_objectSpread({
            translateIndex: newTranslateIndex
          }, (0, _util.formatMonthData)(nextMonthFirstDay)), _this.props.onTouchEnd(nextMonthStartDay.valueOf(), nextMonthEndDay.valueOf()));
        } else {
          // ?????????
          var nextWeekFirstDay = currenWeekFirstDay[touch.x > 0 ? 'subtract' : 'add'](1, 'week');
          var nextWeekLastDay = nextWeekFirstDay.add(7, 'day');

          _this.setState(_objectSpread({
            translateIndex: newTranslateIndex
          }, (0, _util.formatWeekData)(nextWeekFirstDay)), _this.props.onTouchEnd(nextWeekFirstDay.valueOf(), nextWeekLastDay.valueOf()));
        }
      } else if (absTouchY > absTouchX && Math.abs(touch.y * calendarHeight) > 50) {
        if (disableWeekView) {// ???????????????
        } else if (touch.y > 0 && showType === 'week') {
          _this.setState({
            showType: 'month'
          }, function () {
            var dataArray = _this.state.monthDates[1];

            _this.props.onToggleShowType({
              showType: _this.state.showType,
              startTime: dataArray[0].valueOf(),
              endTime: dataArray[dataArray.length - 1].add(1, 'day').valueOf()
            });
          });
        } else if (touch.y < 0 && showType === 'month') {
          _this.setState({
            showType: 'week'
          }, function () {
            var dataArray = _this.state.weekDates[1];

            _this.props.onToggleShowType({
              showType: _this.state.showType,
              startTime: dataArray[0].valueOf(),
              endTime: dataArray[dataArray.length - 1].add(1, 'day').valueOf()
            });
          });
        }
      }

      _this.setState({
        touch: {
          x: 0,
          y: 0
        }
      });
    };

    _this.handleMonthToggle = function (type) {
      var _this$state2 = _this.state,
          currentMonthFirstDay = _this$state2.currentMonthFirstDay,
          currenWeekFirstDay = _this$state2.currenWeekFirstDay,
          showType = _this$state2.showType;
      var isMonthView = showType === 'month';
      var isPrev = type === 'prev';
      var formatFun = isMonthView ? _util.formatMonthData : _util.formatWeekData;
      var operateDate = isMonthView ? currentMonthFirstDay : currenWeekFirstDay;
      var updateStateData = formatFun(operateDate[isPrev ? 'subtract' : 'add'](1, isMonthView ? 'month' : 'week'));

      _this.setState(updateStateData, function () {
        var dataArray = updateStateData[isMonthView ? 'monthDates' : 'weekDates'][1];

        _this.props.onTouchEnd(dataArray[0].valueOf(), dataArray[dataArray.length - 1].add(1, 'day').valueOf());
      });
    };

    _this.handleDayClick = function (date) {
      _this.props.onDateClick(date);
    };

    _this.state = {
      currentMonthFirstDay: null,
      monthDates: [],
      // ?????????????????????????????? ??????????????? ?????? ?????????
      currenWeekFirstDay: null,
      weekDates: [],
      // ??????????????????????????????  ??????????????? ?????? ?????????
      currentDate: '',
      touch: {
        x: 0,
        y: 0
      },
      translateIndex: 0,
      calendarY: 0,
      // ???Y????????????
      showType: props.showType
    };
    _this.isTouching = false;
    _this.calendarRef = /*#__PURE__*/(0, _react.createRef)(null);
    return _this;
  }

  _createClass(MonthView, [{
    key: "handleBottomOperate",
    value: function handleBottomOperate() {}
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state3 = this.state,
          monthDates = _this$state3.monthDates,
          weekDates = _this$state3.weekDates,
          touch = _this$state3.touch,
          translateIndex = _this$state3.translateIndex,
          calendarY = _this$state3.calendarY,
          currentMonthFirstDay = _this$state3.currentMonthFirstDay,
          currenWeekFirstDay = _this$state3.currenWeekFirstDay,
          showType = _this$state3.showType;
      var _this$props = this.props,
          currentDate = _this$props.currentDate,
          transitionDuration = _this$props.transitionDuration,
          markDates = _this$props.markDates,
          markType = _this$props.markType,
          disableWeekView = _this$props.disableWeekView;
      var isMonthView = showType === 'month';
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "react-h5-calendar"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "calendar-operate"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "icon left-icon",
        onClick: this.handleMonthToggle.bind(this, 'prev')
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: _arrow.default
      })), /*#__PURE__*/_react.default.createElement("div", null, (isMonthView ? currentMonthFirstDay : currenWeekFirstDay).format('YYYY-MM')), /*#__PURE__*/_react.default.createElement("div", {
        className: "icon right-icon",
        onClick: this.handleMonthToggle.bind(this, 'next')
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: _arrow.default
      }))), /*#__PURE__*/_react.default.createElement("div", {
        className: "calendar-head"
      }, head.map(function (i) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "head-cell",
          key: i
        }, i);
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "calendar-body ".concat(isMonthView ? '' : 'week-mode'),
        ref: this.calendarRef,
        onTouchStart: this.handleTouchStart,
        onTouchMove: this.handleTouchMove,
        onTouchEnd: this.handleTouchEnd
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          transform: "translate3d(".concat(-translateIndex * 100, "%, 0, 0)")
        }
      }, (isMonthView ? monthDates : weekDates).map(function (item, index) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "month-cell",
          key: "month-cell-".concat(index),
          style: {
            transform: "translate3d(".concat((index - 1 + translateIndex + (_this2.isTouching ? touch.x : 0)) * 100, "%, ").concat(calendarY, "px, 0)"),
            transitionDuration: "".concat(_this2.isTouching ? 0 : transitionDuration, "s")
          }
        }, item.map(function (date, itemIndex) {
          var isCurrentDay = date.isSame(currentDate, 'day');
          var isOtherMonthDay = showType === 'week' ? false : !date.isSame(currentMonthFirstDay, 'month');
          var isMarkDate = markDates.find(function (i) {
            return date.isSame(i.date, 'day');
          });
          var resetMarkType = isMarkDate && isMarkDate.markType || markType;
          var showDotMark = isCurrentDay ? false : isMarkDate && resetMarkType === 'dot';
          var showCircleMark = isCurrentDay ? false : isMarkDate && resetMarkType === 'circle';
          return /*#__PURE__*/_react.default.createElement("div", {
            key: itemIndex,
            className: "day-cell ".concat(isOtherMonthDay ? 'is-other-month-day' : ''),
            onClick: _this2.handleDayClick.bind(_this2, date)
          }, /*#__PURE__*/_react.default.createElement("div", {
            className: "day-text ".concat(isCurrentDay ? 'current-day' : '', " ").concat(showCircleMark ? 'circle-mark' : ''),
            style: showCircleMark ? {
              borderColor: isMarkDate.color || '#4378be'
            } : null
          }, date.format('DD')), showDotMark && /*#__PURE__*/_react.default.createElement("div", {
            className: isMarkDate ? 'dot-mark' : '',
            style: {
              background: isMarkDate.color || '#4378be'
            }
          }));
        }));
      }))), disableWeekView ? null : /*#__PURE__*/_react.default.createElement("div", {
        className: "bottom-operate"
      }, /*#__PURE__*/_react.default.createElement("img", {
        className: isMonthView ? 'top' : 'down',
        src: _doubleArrow.default
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var currentDate = nextProps.currentDate;

      if (currentDate !== prevState.currentDate) {
        var dayjsDate = (0, _dayjs.default)(currentDate);
        return _objectSpread(_objectSpread(_objectSpread({}, (0, _util.formatMonthData)(dayjsDate)), (0, _util.formatWeekData)(dayjsDate)), {}, {
          currentDate: currentDate
        });
      }

      return null;
    }
  }]);

  return MonthView;
}(_react.PureComponent);

MonthView.propTypes = {
  currentDate: _propTypes.default.string,
  showType: _propTypes.default.oneOf(['week', 'month']),
  transitionDuration: _propTypes.default.number,
  onDateClick: _propTypes.default.func,
  onTouchStart: _propTypes.default.func,
  onTouchMove: _propTypes.default.func,
  onTouchEnd: _propTypes.default.func,
  onToggleShowType: _propTypes.default.func,
  markType: _propTypes.default.oneOf(['dot', 'circle']),
  markDates: _propTypes.default.array,
  disableWeekView: _propTypes.default.bool
};
MonthView.defaultProps = {
  currentDate: (0, _dayjs.default)().format('YYYY-MM-DD'),
  showType: 'month',
  transitionDuration: 0.3,
  onDateClick: function onDateClick() {},
  onTouchStart: function onTouchStart() {},
  onTouchMove: function onTouchMove() {},
  onTouchEnd: function onTouchEnd() {},
  onToggleShowType: function onToggleShowType() {},
  markType: 'dot',
  markDates: [],
  disableWeekView: false
};
var _default = MonthView;
exports.default = _default;