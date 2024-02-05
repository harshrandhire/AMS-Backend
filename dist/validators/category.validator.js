"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.createCategory = void 0;

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

var createCategory = function createCategory() {
  return [(0, _expressValidator.body)("category_name").not().isEmpty().withMessage("Category name is required")];
};

exports.createCategory = createCategory;
var _default = {
  createCategory: createCategory
};
exports["default"] = _default;