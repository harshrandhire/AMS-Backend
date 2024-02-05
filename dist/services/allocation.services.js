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
 *Single Allocation detail
 *
 * @param Request request
 */
var allocationDetails = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req) {
    var responseData, entityParams, searchText, defaultWhere, entityPagination, getAllocationDetails, pagination;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            entityParams = _.get(req, "query", {});
            searchText = _.get(entityParams, "q", "");
            defaultWhere = {
              status: 1
            };

            if (_.has(entityParams, "q") && !_.isEmpty(searchText)) {
              defaultWhere = (0, _defineProperty2["default"])({
                status: 1
              }, _sequelize.Op.or, {
                employee_id: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(searchText, "%")),
                combo_id: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(searchText, "%"))
              });
            }

            _context.prev = 5;
            entityPagination = _helper["default"].dataPagination(entityParams);
            _context.next = 9;
            return _models["default"].allocationDetails.findAndCountAll({
              include: [{
                model: _models["default"].UserDetails,
                attributes: _modelConstants["default"].employee
              }],
              where: defaultWhere,
              offset: entityPagination.offset,
              limit: entityPagination.limit,
              order: [['id', 'DESC']]
            });

          case 9:
            getAllocationDetails = _context.sent;
            pagination = entityPagination.pagination;
            pagination["totalPages"] = Math.ceil(((getAllocationDetails || {}).count || 0) / pagination.pageSize);
            pagination["pageRecords"] = ((getAllocationDetails || {}).rows || []).length || 0;
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              success: true,
              pagination: pagination,
              data: getAllocationDetails
            });
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](5);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context.t0.message
            });

          case 19:
            return _context.abrupt("return", responseData);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 16]]);
  }));

  return function allocationDetails(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Allocation Details
 *
 * @param Request request
 */


var getAllocation = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
    var responseData, Id, alloctaion, combo, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            Id = _.get(req, "employee_id", {});
            _context2.prev = 2;
            _context2.next = 5;
            return _models["default"].allocationDetails.findOne({
              where: {
                id: Id
              },
              include: [{
                model: _models["default"].UserDetails,
                attributes: _modelConstants["default"].employee
              }]
            });

          case 5:
            alloctaion = _context2.sent;
            _context2.next = 8;
            return _models["default"].comboDetails.findAndCountAll({
              where: {
                allocation_id: Id
              },
              attributes: _modelConstants["default"].combo,
              include: [{
                model: _models["default"].ProductDetails,
                attributes: _modelConstants["default"].product
              }]
            });

          case 8:
            combo = _context2.sent;
            data = {
              // allocationDetails: alloctaion,
              comboDetails: combo
            };

            if (alloctaion) {
              responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
                success: true,
                data: data
              });
            } else {
              responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
                message: "Allocation not found",
                success: false
              });
            }

            _context2.next = 16;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);
            responseData = _objectSpread({}, _statusConstants["default"].error);

          case 16:
            return _context2.abrupt("return", responseData);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));

  return function getAllocation(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 *Update Allocation detail
 *
 * @param Request request
 */


var updateAllocation = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req) {
    var responseData, data, Id, checkUserid, allocation, payload, checUser;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            data = _.get(req, "body", {});
            Id = _.get(req, "params.id", {}); //  console.log("data>>>", data);
            //  console.log("Id>>>", Id);

            _context3.next = 5;
            return _models["default"].UserDetails.findOne({
              where: {
                id: data.employee_id
              }
            });

          case 5:
            checkUserid = _context3.sent;

            if (!checkUserid) {
              _context3.next = 27;
              break;
            }

            _context3.prev = 7;
            _context3.next = 10;
            return _models["default"].allocationDetails.findOne({
              where: {
                id: Id
              }
            });

          case 10:
            allocation = _context3.sent;

            if (allocation) {
              _context3.next = 15;
              break;
            }

            return _context3.abrupt("return", _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "allocation not found",
              success: false
            }));

          case 15:
            payload = {
              employee_id: data.employee_id
            };
            _context3.next = 18;
            return _models["default"].allocationDetails.findOne({
              where: {
                employee_id: data.employee_id
              }
            });

          case 18:
            checUser = _context3.sent;

            if (!checUser) {
              allocation.update(_objectSpread({}, payload));
              responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
                message: "allocation udated successfully",
                success: true
              });
            } else {
              responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
                message: "employee_id already exicting ",
                success: false
              });
            }

          case 20:
            _context3.next = 25;
            break;

          case 22:
            _context3.prev = 22;
            _context3.t0 = _context3["catch"](7);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context3.t0.message
            });

          case 25:
            _context3.next = 28;
            break;

          case 27:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "User does not exicting ",
              success: false
            });

          case 28:
            return _context3.abrupt("return", responseData);

          case 29:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[7, 22]]);
  }));

  return function updateAllocation(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 *Delete Allocation
 *
 * @param Request request
 */


var deleteAllocation = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
    var responseData, allocation;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            _context4.prev = 1;
            _context4.next = 4;
            return _models["default"].allocationDetails.findOne({
              where: {
                id: id
              }
            });

          case 4:
            allocation = _context4.sent;

            if (allocation) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "allocation not found",
              success: false
            }));

          case 9:
            allocation.update({
              status: _appConstants.commonStatuses.INACTIVE.id
            });

          case 10:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              message: "allocation deleted successfully",
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

  return function deleteAllocation(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Allocation registrasion
 *
 * @param Request request
 */


var createAllocation = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req) {
    var responseData, data, checkUserid, allocationPayload, checUser, _allocationDetails, comboId, combo_id, errors;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            data = _.get(req, "body", {});
            _context5.next = 4;
            return _models["default"].UserDetails.findOne({
              where: {
                id: data.employee_id
              }
            });

          case 4:
            checkUserid = _context5.sent;

            if (!checkUserid) {
              _context5.next = 38;
              break;
            }

            _context5.prev = 6;
            allocationPayload = {
              employee_id: data.employee_id || "",
              status: _appConstants.commonStatuses.ACTIVE.id
            };
            _context5.next = 10;
            return _models["default"].allocationDetails.findOne({
              where: {
                employee_id: data.employee_id
              }
            });

          case 10:
            checUser = _context5.sent;

            if (checUser) {
              _context5.next = 28;
              break;
            }

            _context5.next = 14;
            return _models["default"].allocationDetails.create(allocationPayload, {
              raw: true
            });

          case 14:
            _allocationDetails = _context5.sent;
            comboId = _.get(_allocationDetails, "id", 0);
            _context5.next = 18;
            return _dbHelper["default"].generateUniqueId("combo", comboId);

          case 18:
            combo_id = _context5.sent;
            _context5.next = 21;
            return _allocationDetails.update({
              combo_id: combo_id
            });

          case 21:
            if (comboId) {
              _context5.next = 25;
              break;
            }

            throw new Error("Unable to create new Allowcation");

          case 25:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              message: "Allowcation create successfully",
              success: true,
              data: {
                data: data
              }
            });

          case 26:
            _context5.next = 29;
            break;

          case 28:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "employee_id already exicting ",
              success: false
            });

          case 29:
            _context5.next = 36;
            break;

          case 31:
            _context5.prev = 31;
            _context5.t0 = _context5["catch"](6);
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
                message: error.message,
                success: false
              });
            }

          case 36:
            _context5.next = 39;
            break;

          case 38:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "User does not exicting ",
              success: false
            });

          case 39:
            return _context5.abrupt("return", responseData);

          case 40:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[6, 31]]);
  }));

  return function createAllocation(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

var AllocationServices = {
  getAllocation: getAllocation,
  allocationDetails: allocationDetails,
  createAllocation: createAllocation,
  updateAllocation: updateAllocation,
  deleteAllocation: deleteAllocation
};
var _default = AllocationServices;
exports["default"] = _default;