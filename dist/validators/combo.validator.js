"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.createCombo = void 0;

var _expressValidator = require("express-validator");

var _lodash = require("lodash");

var _ = {
  get: _lodash.get,
  isEmpty: _lodash.isEmpty
};
/**
* Copany 
*
*/

var createCombo = function createCombo() {
  return [(0, _expressValidator.body)("allocation_id").not().isEmpty().withMessage("allocation id is required"), (0, _expressValidator.body)("product_id").not().isEmpty().withMessage("product id is required")];
};

exports.createCombo = createCombo;
var _default = {
  createCombo: createCombo
};
exports["default"] = _default;