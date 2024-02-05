"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.createProduct = void 0;

var _expressValidator = require("express-validator");

var _lodash = require("lodash");

var _ = {
  get: _lodash.get
};
/**
 * CreateProduct
 *
 */

var createProduct = function createProduct() {
  return [(0, _expressValidator.body)("category_id").not().isEmpty().withMessage("category id  is required"), (0, _expressValidator.body)("product_name").not().isEmpty().withMessage("product name is required"), (0, _expressValidator.body)("purchase_date").not().isEmpty().withMessage("purchase date is required"), (0, _expressValidator.body)("product_description").not().isEmpty().withMessage("product description is required"), (0, _expressValidator.body)("product_cost").not().isEmpty().withMessage("product cost is required")];
};

exports.createProduct = createProduct;
var _default = {
  createProduct: createProduct
};
exports["default"] = _default;