'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.mainRenderFn = mainRenderFn;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _dataObj = require('./dataObj.js');

var _applicationFn = require('./applicationFn.js');

var _optionRenderFn = require('./optionRenderFn.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mainRenderFn(selectThis) {
  var content = [];
  var props_select = new _dataObj.nodeObj(selectThis.env, 'btb-select').props;
  if (selectThis.props.className) {
    props_select.className += ' ' + selectThis.props.className;
  }

  var props_input = new _dataObj.nodeObj(selectThis.env, 'select-input').props;
  var props_text = new _dataObj.nodeObj(selectThis.env, 'input-text').props;
  var props_addition = new _dataObj.nodeObj(selectThis.env, 'input-addition').props;

  content.push(_react2.default.createElement(
    'div',
    _extends({}, props_select, { ref: function ref(_ref) {
        _refHandler(_ref);
      } }),
    _react2.default.createElement(
      'div',
      props_input,
      _react2.default.createElement('input', _extends({}, props_text, {
        type: 'text',
        onChange: function onChange() {
          _inputOnChangeHandler('set');
        },
        onFocus: function onFocus() {
          (0, _applicationFn.optionsSwitchFn)(selectThis, true);
        },
        ref: 'searchInput',
        id: selectThis.env.selectorId,
        placeholder: selectThis.env.placeholder
      })),
      '' === selectThis.printoutData.inputValue ? selectThis.optionsActive && selectThis.env.featureSearch.enable ? _react2.default.createElement(
        'span',
        _extends({}, props_addition, {
          onClick: function onClick() {
            (0, _applicationFn.optionsSwitchFn)(selectThis, true);
          },
          id: selectThis.env.selectorId + '_button'
        }),
        selectThis.env.addtionalButton.searchButton
      ) : _react2.default.createElement(
        'span',
        _extends({}, props_addition, {
          onClick: function onClick() {
            (0, _applicationFn.optionsSwitchFn)(selectThis, true);
          },
          id: selectThis.env.selectorId + '_button'
        }),
        selectThis.env.addtionalButton.selectButton
      ) : _react2.default.createElement(
        'span',
        _extends({}, props_addition, {
          onClick: function onClick() {
            _inputOnChangeHandler('clear');
          },
          id: selectThis.env.selectorId + '_button'
        }),
        selectThis.env.addtionalButton.clearButton
      )
    ),
    selectThis.optionsActive ? (0, _optionRenderFn.optionRenderFn)(selectThis) : []
  ));
  return content;

  function _refHandler(ref) {
    (0, _applicationFn.refHandler)(selectThis, ref);
  }
  function _inputOnChangeHandler(actionType) {
    if (selectThis.env.featureSearch.enable) {
      (0, _applicationFn.inputOnChangeHandler)(selectThis, actionType);
    } else {
      selectThis.printoutData.selectedOption = {};
      selectThis.printoutData.inputValue = '';
      _reactDom2.default.findDOMNode(selectThis.refs.searchInput).value = '';
      selectThis.forceUpdate();
    }
  }
}