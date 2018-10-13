'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateENVFn = updateENVFn;
exports.dataSearching = dataSearching;
exports.resultFn = resultFn;
exports.autoSelectFn = autoSelectFn;
exports.valuePrintoutFn = valuePrintoutFn;
exports.clickListenerFn = clickListenerFn;
exports.optionsSwitchFn = optionsSwitchFn;
exports.refHandler = refHandler;
exports.inputOnChangeHandler = inputOnChangeHandler;
exports.optionOnClickHandler = optionOnClickHandler;

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _dataObj = require('./dataObj.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateENVFn(selectThis, source) {
  selectThis.env = new _dataObj.ENVDefaultObj().env;
  Object.keys(source).map(function (entry) {
    switch (entry) {
      case 'styleObj':
        Object.keys(source.styleObj).map(function (node_entry) {
          selectThis.env.styleObj[node_entry] = {};
          Object.keys(source.styleObj[node_entry]).map(function (style_entry) {
            var camelCaseStyleName = camelCaseTransformerFn(style_entry);
            selectThis.env.styleObj[node_entry][camelCaseStyleName] = source.styleObj[node_entry][style_entry];
          });
        });
        break;
      case 'addtionalButton':
      case 'featureSearch':
        Object.keys(source[entry]).map(function (modeObj_entry) {
          selectThis.env[entry][modeObj_entry] = source[entry][modeObj_entry];
        });
        break;
      default:
        selectThis.env[entry] = source[entry];
        break;
    }
  });
  selectThis.printoutData = new _dataObj.POInfoObj(selectThis.env.selectorId).printout;
  selectThis.searchStatusArr = dataSearching(selectThis);

  function camelCaseTransformerFn(orinal_name) {
    var newName = '';
    newName = orinal_name.replace(/-(\w)/g, function (all, letter) {
      return letter.toUpperCase();
    });
    return newName;
  }
}
function dataSearching(selectThis) {
  var searchStatusArr = [];
  var searchConfig = {
    enable: selectThis.env.featureSearch.enable,
    searchInput: selectThis.printoutData.inputValue,
    searchMatchRateTheshold: 1,
    searchSpecAttributeEnable: selectThis.env.featureSearch.searchSpecAttributeEnable,
    searchSpecAttributeArr: selectThis.env.featureSearch.searchSpecAttributeArr
  };
  var attributeArr = [];
  var matchArr = [];
  var headArr = selectThis.env.optionHeadArr;
  var bodyArr = selectThis.env.optionBodyArr;
  if (searchConfig.enable && '' !== searchConfig.searchInput) {
    if (searchConfig.searchSpecAttributeEnable) {
      attributeArr = searchConfig.searchSpecAttributeArr.slice(0);
    } else {
      attributeArr = headArr.map(function (entry) {
        return entry.index;
      });
    }
    matchArr = bodyArr.map(function (data) {
      var matchCounter = 0;
      for (var i = 0; i < attributeArr.length; i++) {
        if (data[attributeArr[i]].toString().match(searchConfig.searchInput)) {
          matchCounter += 1;
          break;
        }
      }
      return matchCounter;
    });
    searchStatusArr = matchArr.map(function (entry) {
      return searchConfig.searchMatchRateTheshold <= entry;
    });
  } else {
    searchStatusArr = bodyArr.map(function () {
      return true;
    });
  }
  return searchStatusArr;
}
function resultFn(searchStatusArr, source) {
  var resultArr = [];
  source.map(function (entry, index) {
    if (searchStatusArr[index]) {
      resultArr.push(entry);
    }
  });
  return resultArr;
}
function autoSelectFn(selectThis) {
  var data = resultFn(selectThis.searchStatusArr, selectThis.env.optionBodyArr);
  if (selectThis.env.featureSearch.enable && '' != selectThis.printoutData.inputValue) {
    if (0 < data.length) {
      selectThis.printoutData.selectedOption = data[0];
      selectThis.printoutData.inputValue = data[0][selectThis.env.indexAttribute];
    } else {
      selectThis.printoutData.selectedOption = {};
      selectThis.printoutData.inputValue = '';
    }
  }
  _reactDom2.default.findDOMNode(selectThis.refs.searchInput).value = selectThis.printoutData.inputValue;
  selectThis.searchStatusArr = dataSearching(selectThis);
}
function valuePrintoutFn(selectThis) {
  selectThis.env.printoutFn(selectThis.printoutData);
}
function clickListenerFn(selectThis, event) {
  var target = event.target;
  var target_parentClasaName = target.parentNode.className;
  var target_pparentClasaName = target.parentNode.parentNode.className;
  var target_ppparentClasaName = target.parentNode.parentNode.parentNode.className;
  if (selectThis.env.selectorId !== target.id && selectThis.env.selectorId + '_button' !== target.id) {
    if (-1 === target_parentClasaName.search('optionList-body') && -1 === target_pparentClasaName.search('optionList-body') && -1 === target_ppparentClasaName.search('optionList-body')) {
      if (selectThis.refs.searchInput) {
        _reactDom2.default.findDOMNode(selectThis.refs.searchInput).value = selectThis.printoutData.inputValue;
      }
    }
    optionsSwitchFn(selectThis, false);
  }
}
function optionsSwitchFn(selectThis, turn) {
  var isShowingOptions = false;
  document.removeEventListener("click", selectThis.__clickListenerFn);
  if (turn) {
    isShowingOptions = true;
    document.addEventListener("click", selectThis.__clickListenerFn);
  } else {
    isShowingOptions = false;
    autoSelectFn(selectThis);
    valuePrintoutFn(selectThis);
  }
  selectThis.optionsActive = isShowingOptions;
  selectThis.forceUpdate();
}
function refHandler(selectThis, ref) {
  selectThis.env.refFn(ref);
}
function inputOnChangeHandler(selectThis, actionType) {
  var inputValue = '';
  switch (actionType) {
    case 'set':
      inputValue = _reactDom2.default.findDOMNode(selectThis.refs.searchInput).value;
      break;
    default:
      inputValue = '';
      break;
  }
  selectThis.printoutData.inputValue = inputValue;
  _reactDom2.default.findDOMNode(selectThis.refs.searchInput).value = inputValue;
  selectThis.searchStatusArr = dataSearching(selectThis);
  selectThis.forceUpdate();
}
function optionOnClickHandler(selectThis, optionObj) {
  if (optionObj[selectThis.env.indexAttribute]) {
    selectThis.printoutData.selectedOption = optionObj;
    selectThis.printoutData.inputValue = optionObj[selectThis.env.indexAttribute];
  } else {
    selectThis.printoutData.selectedOption = {};
    selectThis.printoutData.inputValue = '';
  }
  _reactDom2.default.findDOMNode(selectThis.refs.searchInput).value = selectThis.printoutData.inputValue;
  selectThis.searchStatusArr = dataSearching(selectThis);
  optionsSwitchFn(selectThis, false);
  selectThis.forceUpdate();
}