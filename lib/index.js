'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _applicationFn = require('./applicationFn.js');

var _mainRenderFn = require('./mainRenderFn.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Searchelector = function (_React$Component) {
  _inherits(Searchelector, _React$Component);

  function Searchelector(props) {
    _classCallCheck(this, Searchelector);

    var _this = _possibleConstructorReturn(this, (Searchelector.__proto__ || Object.getPrototypeOf(Searchelector)).call(this, props));

    _this.env = {};
    _this.searchStatusArr = new Array();
    _this.printoutData = {};
    _this.optionsActive = false;

    _this.__clickListenerFn = _this._clickListenerFn.bind(_this);
    return _this;
  }

  _createClass(Searchelector, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._updateENVFn(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this._updateENVFn(nextProps);
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _mainRenderFn.mainRenderFn)(this);
    }
  }, {
    key: '_updateENVFn',
    value: function _updateENVFn(nextProps) {
      (0, _applicationFn.updateENVFn)(this, nextProps);
    }
  }, {
    key: '_clickListenerFn',
    value: function _clickListenerFn(event) {
      (0, _applicationFn.clickListenerFn)(this, event);
    }
  }]);

  return Searchelector;
}(_react2.default.Component);

Searchelector.propTypes = {
  selectorId: _propTypes2.default.string.isRequired,
  optionHeadArr: _propTypes2.default.array.isRequired,
  optionBodyArr: _propTypes2.default.array.isRequired
};
Searchelector.defaultProps = {
  selectorId: 'btbSelect',
  optionHeadArr: [],
  optionBodyArr: []
};

exports.default = Searchelector;