"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _statusConstants = _interopRequireDefault(require("../common/statusConstants"));

var _lodash = require("lodash");

var _models = _interopRequireDefault(require("../models"));

var _appConfig = _interopRequireDefault(require("../common/appConfig"));

var _appConstants = require("../common/appConstants");

var _helper = _interopRequireDefault(require("../common/helper"));

var _dbHelper = _interopRequireDefault(require("../common/dbHelper"));

var _modelConstants = _interopRequireDefault(require("../common/modelConstants"));

var _sequelize = require("sequelize");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var _ = {
  get: _lodash.get,
  isEmpty: _lodash.isEmpty,
  isObject: _lodash.isObject,
  omit: _lodash.omit,
  find: _lodash.find,
  chain: _lodash.chain,
  has: _lodash.has
};

// import EmailServices from "./email.services"

/**
 *Single product detail
 *
 * @param Request request
 */
var productProfile = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(payload) {
    var responseData, entityParams, searchText, productId, productData, productInfo;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            responseData = _statusConstants["default"].fetchResourceError;
            entityParams = _.get(payload, "query", {});
            searchText = _.get(entityParams, "q", "");
            _context.prev = 3;
            productId = _.get(payload, "productId", "");
            _context.next = 7;
            return _models["default"].ProductDetails.findOne({
              where: {
                id: productId
              }
            });

          case 7:
            productData = _context.sent;
            productInfo = _.get(productData, "dataValues", {});

            if (productData) {
              responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].fetchSucccess), {}, {
                message: "product fetch successfully",
                success: true,
                productInfo: productInfo
              });
            } else {
              responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
                message: "product does not exist",
                success: false
              });
            }

            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](3);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "product not found",
              success: false
            });

          case 15:
            return _context.abrupt("return", responseData);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 12]]);
  }));

  return function productProfile(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Product Details
 *
 * @param Request request
 */


var productDetails = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
    var responseData, entityParams, searchText, defaultWhere, entityPagination, productDeatail, pagination;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            entityParams = _.get(req, "query", {});
            searchText = _.get(entityParams, "q", ""); //console.log();

            defaultWhere = {
              status: 1
            };

            if (_.has(entityParams, "q") && !_.isEmpty(searchText)) {
              defaultWhere = (0, _defineProperty2["default"])({
                status: 1
              }, _sequelize.Op.or, {
                product_name: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(searchText, "%")),
                id: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(searchText, "%"))
              });
            } //console.log("entityParams",defaultWhere);


            _context2.prev = 5;
            entityPagination = _helper["default"].dataPagination(entityParams);
            _context2.next = 9;
            return _models["default"].ProductDetails.findAndCountAll({
              attributes: _modelConstants["default"].productDeatail,
              where: defaultWhere,
              offset: entityPagination.offset,
              limit: entityPagination.limit,
              order: [['id', 'DESC']]
            });

          case 9:
            productDeatail = _context2.sent;
            pagination = entityPagination.pagination;
            pagination["totalPages"] = Math.ceil((productDeatail || productDeatail).count / pagination.pageSize);
            pagination["pageRecords"] = ((productDeatail || {}).rows || []).length || 0;
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              success: true,
              pagination: pagination,
              data: productDeatail
            });
            _context2.next = 19;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](5);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context2.t0.message
            });

          case 19:
            return _context2.abrupt("return", responseData);

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 16]]);
  }));

  return function productDetails(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 *Update Product detail
 *
 * @param Request request
 */


var updateProduct = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req) {
    var responseData, productId, data, product, productUpdatePayload;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            productId = _.get(req, "params.id", 0);
            data = _.get(req, "body", {});
            _context3.prev = 3;
            _context3.next = 6;
            return _models["default"].ProductDetails.findOne({
              where: {
                id: productId
              }
            });

          case 6:
            product = _context3.sent;

            if (product) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt("return", _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "product not found",
              success: false
            }));

          case 11:
            productUpdatePayload = {
              category_id: data.category_id || "",
              product_name: data.product_name || "",
              purchase_date: data.purchase_date || "",
              product_qty: data.product_qty || 1,
              product_description: data.product_description || "",
              product_cost: data.product_cost || "",
              status: _appConstants.commonStatuses.ACTIVE.id
            };
            product.update(_objectSpread({}, productUpdatePayload));

          case 13:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              message: "product udated successfully",
              success: true
            });
            _context3.next = 19;
            break;

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](3);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context3.t0.message
            });

          case 19:
            return _context3.abrupt("return", responseData);

          case 20:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 16]]);
  }));

  return function updateProduct(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 *Delete Product
 *
 * @param Request request
 */


var deleteProduct = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
    var responseData, product;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            _context4.prev = 1;
            _context4.next = 4;
            return _models["default"].ProductDetails.findOne({
              where: {
                id: id
              }
            });

          case 4:
            product = _context4.sent;

            if (product) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "Product not found",
              success: false
            }));

          case 9:
            product.update({
              status: _appConstants.commonStatuses.INACTIVE.id
            });

          case 10:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              message: "Product deleted successfully",
              success: true
            });
            _context4.next = 16;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](1);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context4.t0.message
            });

          case 16:
            return _context4.abrupt("return", responseData);

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 13]]);
  }));

  return function deleteProduct(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Product registrasion
 *
 * @param Request request
 */


var createProduct = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req) {
    var responseData, data, productPayload, _productDetails, productId, errors;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            data = _.get(req, "body", {});
            /* let filePath;
            let fileName;
            let file; */

            _context5.prev = 2;
            productPayload = {
              category_id: data.category_id || "",
              product_name: data.product_name || "",
              purchase_date: data.purchase_date || "",
              product_qty: data.product_qty || 1,
              product_description: data.product_description || "",
              product_cost: data.product_cost || "",
              status: _appConstants.commonStatuses.ACTIVE.id
            }; // Create new Category entity

            _context5.next = 6;
            return _models["default"].ProductDetails.create(productPayload, {
              raw: true
            });

          case 6:
            _productDetails = _context5.sent;
            productId = _.get(_productDetails, "id", 0); // Category not created, throw an exception

            if (productId) {
              _context5.next = 12;
              break;
            }

            throw new Error("Unable to create new Product");

          case 12:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              message: "Product create successfully",
              success: true,
              data: {
                data: data
              }
            });

          case 13:
            _context5.next = 20;
            break;

          case 15:
            _context5.prev = 15;
            _context5.t0 = _context5["catch"](2);
            errors = {}; // Default message

            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context5.t0.message
            });

            try {
              if (["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(_context5.t0.name)) {
                errors = _dbHelper["default"].formatSequelizeErrors(_context5.t0);
                responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].validationErrors), {}, {
                  errors: errors
                });
              }
            } catch (error) {
              responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
                message: error.message
              });
            }

          case 20:
            return _context5.abrupt("return", responseData);

          case 21:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 15]]);
  }));

  return function createProduct(_x5) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * Change Status category
 *
 * @param Request request
 */


var statusChange = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(data) {
    var responseData, productId, product, statuschange;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            productId = data;
            _context6.prev = 2;
            _context6.next = 5;
            return _models["default"].ProductDetails.findOne({
              where: {
                id: productId
              }
            });

          case 5:
            product = _context6.sent;

            if (product) {
              _context6.next = 10;
              break;
            }

            return _context6.abrupt("return", _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "Product not found",
              success: false
            }));

          case 10:
            if (product.status == 1) {
              statuschange = _appConstants.commonStatuses.INACTIVE.id;
            } else {
              statuschange = _appConstants.commonStatuses.ACTIVE.id;
            }

            product.update({
              status: statuschange
            });

          case 12:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              message: "Status Changed",
              success: true
            });
            _context6.next = 18;
            break;

          case 15:
            _context6.prev = 15;
            _context6.t0 = _context6["catch"](2);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context6.t0.message
            });

          case 18:
            return _context6.abrupt("return", responseData);

          case 19:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 15]]);
  }));

  return function statusChange(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

var ProductServices = {
  productProfile: productProfile,
  productDetails: productDetails,
  createProduct: createProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  statusChange: statusChange
};
var _default = ProductServices;
exports["default"] = _default;