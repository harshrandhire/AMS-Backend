"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
* Format an error Array to proper object
* Cleanup an unwanted values from array
*
* @param  Array array of errors
*/
var format = function format(errors) {
  var _errors = {};

  if (Array.isArray(errors)) {
    errors.forEach(function (e) {
      // Handle one error at a time
      if (!_errors[e.param]) {
        _errors[e.param] = e.msg;
      }
    });
  }

  return _errors;
};

var validator = {
  format: format
};
var _default = validator;
exports["default"] = _default;