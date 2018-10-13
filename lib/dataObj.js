'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ENVDefaultObj = ENVDefaultObj;
exports.POInfoObj = POInfoObj;
exports.optionHeadObj = optionHeadObj;
exports.nodeObj = nodeObj;
function ENVDefaultObj() {
  this['env'] = {
    selectorId: '',
    optionHeadVisible: true,
    optionHeadArr: [],
    optionBodyArr: [],
    placeholder: '',
    noDataMessage: 'No data avaliable',
    indexAttribute: '',
    styleObj: {},
    printoutFn: function printoutFn() {},
    refFn: function refFn() {},
    addtionalButton: {
      enable: true,
      selectButton: 'Select',
      searchButton: 'Search',
      clearButton: 'Clear'
    },
    featureSearch: {
      enable: false,
      searchSpecAttributeEnable: false,
      searchSpecAttributeArr: []
    }
  };
}

function POInfoObj(id) {
  this['printout'] = {
    selectorId: id,
    selectedOption: {},
    inputValue: ''
  };
}

function optionHeadObj(source) {
  var _this = this;

  this['name'] = '';
  this['index'] = '';
  Object.keys(source).map(function (key) {
    _this[key] = source[key];
  });
}

function nodeObj(env, name) {
  this['props'] = {
    key: name,
    className: name,
    style: env.styleObj[name] ? Object.assign({}, env.styleObj[name]) : {}
  };
}