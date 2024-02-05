"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _product = _interopRequireDefault(require("../services/product.services"));

var _lodash = require("lodash");

var _ = {
  get: _lodash.get,
  isEmpty: _lodash.isEmpty
};
/**
 * single Product info
 *  
 * @param Request request
 */

var productProfile = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var payload;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            payload = {
              productId: _.get(req, "params.id", {})
            };

            _product["default"].productProfile(payload).then(function (result) {
              res.status(result.status).send(result);
            })["catch"](function (err) {
              res.status(422).send({
                status: 422,
                message: err.message || "Something went wrong!"
              });
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function productProfile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Create Product 
 *
 */


var createProduct = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _product["default"].createProduct(req).then(function (result) {
              res.status(result.status).send(result);
            })["catch"](function (err) {
              res.status(422).send({
                status: 422,
                message: err.message || "Something went wrong!"
              });
            });

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function createProduct(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Get Product info
 *
 * @Request request
 */


var productDetails = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _product["default"].productDetails(req).then(function (result) {
              res.status(result.status).send(result);
            })["catch"](function (err) {
              res.status(422).send({
                status: 422,
                message: err.message || "Something went wrong!"
              });
            });

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function productDetails(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Update Product info
 *
 * @param Request request
 */


var updateProduct = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _product["default"].updateProduct(req).then(function (result) {
              res.status(result.status).send(result);
            })["catch"](function (err) {
              res.status(422).send({
                status: 422,
                message: err.message || "Something went wrong!"
              });
            });

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateProduct(_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Delete Product
 *
 * @param Request request
 */


var deleteProduct = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var productId;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            productId = _.get(req, "params.id", {});

            _product["default"].deleteProduct(productId).then(function (result) {
              res.status(result.status).send(result);
            })["catch"](function (err) {
              res.status(422).send({
                status: 422,
                message: err.message || "Something went wrong!"
              });
            });

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteProduct(_x12, _x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * Status change of category 
 *
 * @param Request request
 */


var changestatus = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var productId;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            productId = _.get(req, "params.id", 0);

            _product["default"].statusChange(productId).then(function (result) {
              res.status(result.status).send(result);
            })["catch"](function (err) {
              res.status(422).send({
                status: 422,
                message: err.message || "Something went wrong!"
              });
            });

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function changestatus(_x15, _x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}();

var productController = {
  productProfile: productProfile,
  productDetails: productDetails,
  createProduct: createProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  changestatus: changestatus
};
var _default = productController;
exports["default"] = _default;