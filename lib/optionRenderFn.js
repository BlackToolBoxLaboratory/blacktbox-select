'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.optionRenderFn = optionRenderFn;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dataObj = require('./dataObj.js');

var _applicationFn = require('./applicationFn.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function optionRenderFn(selectThis) {
  var content = [];
  var props_optionList = new _dataObj.nodeObj(selectThis.env, 'select-optionList').props;
  var props_scrollFlat = new _dataObj.nodeObj(selectThis.env, 'scrollFlat').props;
  content.push(_react2.default.createElement(
    'div',
    props_optionList,
    optionHeadRenderFn(selectThis),
    _react2.default.createElement(
      'div',
      props_scrollFlat,
      optionBodyRenderFn(selectThis)
    )
  ));
  return content;
}

function optionHeadRenderFn(selectThis) {
  var content = [];
  if (selectThis.env.optionHeadVisible) {
    var props_listHead = new _dataObj.nodeObj(selectThis.env, 'optionList-head').props;
    var props_listHeadRow = new _dataObj.nodeObj(selectThis.env, 'head-row').props;
    content.push(_react2.default.createElement(
      'div',
      props_listHead,
      _react2.default.createElement(
        'div',
        props_listHeadRow,
        selectThis.env.optionHeadArr.map(function (head_entry) {
          var entry_row = new _dataObj.optionHeadObj(head_entry);
          var content_head_cell = [];
          var props_listHeadCell = new _dataObj.nodeObj(selectThis.env, 'row-cell').props;
          var cellName = 'cell-' + entry_row.index;
          props_listHeadCell.className += ' ' + cellName;
          content_head_cell.push(_react2.default.createElement(
            'div',
            props_listHeadCell,
            entry_row.name
          ));
          return content_head_cell;
        })
      )
    ));
  }
  return content;
}
function optionBodyRenderFn(selectThis) {
  var content = [];
  var headArr = selectThis.env.optionHeadArr;
  var dataArr = (0, _applicationFn.resultFn)(selectThis.searchStatusArr, selectThis.env.optionBodyArr);
  var props_listBody = new _dataObj.nodeObj(selectThis.env, 'optionList-body').props;
  content.push(_react2.default.createElement(
    'div',
    props_listBody,
    function () {
      var content_options = [];
      dataArr.map(function (body_entry, bodyIndex) {
        var props_listBodyRow = new _dataObj.nodeObj(selectThis.env, 'body-row').props;
        var rowName = 'row-' + bodyIndex;
        props_listBodyRow.className += ' ' + rowName;
        content_options.push(_react2.default.createElement(
          'div',
          _extends({}, props_listBodyRow, {
            onClick: function onClick() {
              _optionOnClickHandler(body_entry);
            }
          }),
          headArr.map(function (head_entry) {
            var entry_row = new _dataObj.optionHeadObj(head_entry);
            var content_optionContent = [];
            var props_listBodyCell = new _dataObj.nodeObj(selectThis.env, 'row-cell').props;
            var cellName = 'cell-' + entry_row.index;
            props_listBodyCell.className += ' ' + cellName;
            content_optionContent.push(_react2.default.createElement(
              'div',
              props_listBodyCell,
              body_entry[entry_row.index]
            ));
            return content_optionContent;
          })
        ));
      });
      return content_options;
    }(),
    function () {
      var content_noData = [];
      if (0 == dataArr.length) {
        var props_tr = new _dataObj.nodeObj(selectThis.env, 'row-noData').props;
        var props_td = new _dataObj.nodeObj(selectThis.env, 'cell-noData').props;
        content_noData.push(_react2.default.createElement(
          'div',
          _extends({}, props_tr, {
            onClick: function onClick() {
              _optionOnClickHandler({});
            }
          }),
          _react2.default.createElement(
            'div',
            props_td,
            selectThis.env.noDataMessage
          )
        ));
      }
      return content_noData;
    }()
  ));
  return content;

  function _optionOnClickHandler(optionObj) {
    (0, _applicationFn.optionOnClickHandler)(selectThis, optionObj);
  }
}