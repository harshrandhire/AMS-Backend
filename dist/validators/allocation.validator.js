"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.createAllocation = void 0;

var _expressValidator = require("express-validator");

var _lodash = require("lodash");

var _ = {
  get: _lodash.get,
  isEmpty: _lodash.isEmpty
};
/**
* Allocation 
*
*/

var createAllocation = function createAllocation() {
  return [(0, _expressValidator.body)("employee_id").not().isEmpty().withMessage("employee_id is required")];
};

exports.createAllocation = createAllocation;
var _default = {
  createAllocation: createAllocation
};
exports["default"] = _default;