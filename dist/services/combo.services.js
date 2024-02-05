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
 *Single Company detail
 *
 * @param Request request
 */
var getCombo = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(payload) {
    var responseData, _getCombo, comboData, comboDetails;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            responseData = _statusConstants["default"].fetchResourceError;
            _context.prev = 1;
            _getCombo = _.get(payload, "categoryId", "");
            _context.next = 5;
            return _models["default"].comboDetails.findOne({
              where: {
                id: _getCombo
              }
            });

          case 5:
            comboData = _context.sent;
            comboDetails = _.get(comboData, "dataValues", {});

            if (comboData) {
              responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].fetchSucccess), {}, {
                message: "combo fetch successfully",
                success: true,
                comboDetails: comboDetails
              });
            } else {
              responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].fetchResourceError), {}, {
                message: "combo does not exist",
                success: false
              });
            }

            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "combo not found",
              success: false
            });

          case 13:
            return _context.abrupt("return", responseData);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 10]]);
  }));

  return function getCombo(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 *Update Category detail
 *
 * @param Request request
 */


var updateCombo = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
    var responseData, comboId, data, product, comboPayload, checkProduct, combo;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            comboId = _.get(req, "params.id", 0);
            data = _.get(req, "body", {});
            _context2.next = 5;
            return _models["default"].ProductDetails.findOne({
              where: {
                id: data.product_id
              }
            });

          case 5:
            product = _context2.sent;

            if (!product) {
              _context2.next = 32;
              break;
            }

            _context2.prev = 7;
            //Check if  exist
            comboPayload = {
              allocation_id: data.allocation_id,
              product_id: data.product_id
            };
            _context2.next = 11;
            return _models["default"].comboDetails.findOne({
              where: {
                product_id: data.product_id
              }
            });

          case 11:
            checkProduct = _context2.sent;

            if (checkProduct) {
              _context2.next = 24;
              break;
            }

            _context2.next = 15;
            return _models["default"].comboDetails.findOne({
              where: {
                id: comboId
              }
            });

          case 15:
            combo = _context2.sent;

            if (combo) {
              _context2.next = 20;
              break;
            }

            return _context2.abrupt("return", _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "combo not found",
              success: false
            }));

          case 20:
            combo.update(_objectSpread({}, comboPayload));

          case 21:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              message: "combo udated successfully",
              success: true
            });
            _context2.next = 25;
            break;

          case 24:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "product is already in use",
              success: false
            });

          case 25:
            _context2.next = 30;
            break;

          case 27:
            _context2.prev = 27;
            _context2.t0 = _context2["catch"](7);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context2.t0.message
            });

          case 30:
            _context2.next = 33;
            break;

          case 32:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "product does not exicte",
              success: false
            });

          case 33:
            return _context2.abrupt("return", responseData);

          case 34:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[7, 27]]);
  }));

  return function updateCombo(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 *Delete Category
 *
 * @param Request request
 */


var deleteCombo = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
    var responseData, combo;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            _context3.prev = 1;
            _context3.next = 4;
            return _models["default"].comboDetails.findOne({
              where: {
                id: id
              }
            });

          case 4:
            combo = _context3.sent;

            if (combo) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "combo not found",
              success: false
            }));

          case 9:
            combo.update({
              status: _appConstants.commonStatuses.INACTIVE.id
            });

          case 10:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              message: "combo deleted successfully",
              success: true
            });
            _context3.next = 16;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](1);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context3.t0.message
            });

          case 16:
            return _context3.abrupt("return", responseData);

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 13]]);
  }));

  return function deleteCombo(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Combo registrasion
 *
 * @param Request request
 */


var createCombo = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req) {
    var responseData, data, product, comboPayload, checkProduct, comboDetails, comboId, errors;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            data = _.get(req, "body", {});
            _context4.next = 4;
            return _models["default"].ProductDetails.findOne({
              where: {
                id: data.product_id
              }
            });

          case 4:
            product = _context4.sent;

            if (!product) {
              _context4.next = 33;
              break;
            }

            _context4.prev = 6;
            comboPayload = {
              allocation_id: data.allocation_id || "",
              //category_id: data.category_id || "",
              product_id: data.product_id || "",
              status: _appConstants.commonStatuses.ACTIVE.id
            };
            _context4.next = 10;
            return _models["default"].comboDetails.findOne({
              where: {
                product_id: data.product_id
              }
            });

          case 10:
            checkProduct = _context4.sent;

            if (checkProduct) {
              _context4.next = 23;
              break;
            }

            _context4.next = 14;
            return _models["default"].comboDetails.create(comboPayload, {
              raw: true
            });

          case 14:
            comboDetails = _context4.sent;
            comboId = _.get(comboDetails, "id", 0); // Category not created, throw an exception

            if (comboId) {
              _context4.next = 20;
              break;
            }

            throw new Error("Unable to create new Combo");

          case 20:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              message: "Combo create successfully",
              success: true,
              data: {
                data: data
              }
            });

          case 21:
            _context4.next = 24;
            break;

          case 23:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "product is already in use",
              success: false
            });

          case 24:
            _context4.next = 31;
            break;

          case 26:
            _context4.prev = 26;
            _context4.t0 = _context4["catch"](6);
            errors = {}; // Default message

            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context4.t0.message
            });

            try {
              if (["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(_context4.t0.name)) {
                errors = _dbHelper["default"].formatSequelizeErrors(_context4.t0);
                responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].validationErrors), {}, {
                  errors: errors
                });
              }
            } catch (error) {
              responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
                message: error.message
              });
            }

          case 31:
            _context4.next = 34;
            break;

          case 33:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "product does not exicte",
              success: false
            });

          case 34:
            return _context4.abrupt("return", responseData);

          case 35:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[6, 26]]);
  }));

  return function createCombo(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var AllocationServices = {
  getCombo: getCombo,
  // categoryDetails,
  createCombo: createCombo,
  updateCombo: updateCombo,
  deleteCombo: deleteCombo
};
var _default = AllocationServices;
exports["default"] = _default;