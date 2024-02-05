"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _allocation = _interopRequireDefault(require("../services/allocation.services"));

var _lodash = require("lodash");

var _ = {
  get: _lodash.get,
  isEmpty: _lodash.isEmpty
};
/**
 * single Allocation info
 *  
 * @param Request request
 */

var getAllocation = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var payload;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            payload = {
              employee_id: _.get(req, "params.id", {})
            };

            _allocation["default"].getAllocation(payload).then(function (result) {
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

  return function getAllocation(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Create Allocation 
 *
 */


var createAllocation = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _allocation["default"].createAllocation(req).then(function (result) {
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

  return function createAllocation(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Get Allocation info
 *
 * @Request request
 */


var allocationDetails = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _allocation["default"].allocationDetails(req).then(function (result) {
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

  return function allocationDetails(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Update Allocation info
 *
 * @param Request request
 */


var updateAllocation = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // let data = _.get(req,"body",{});
            _allocation["default"].updateAllocation(req).then(function (result) {
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

  return function updateAllocation(_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Delete Allocation
 *
 * @param Request request
 */


var deleteAllocation = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var allocationId;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            allocationId = _.get(req, "params.id", {});

            _allocation["default"].deleteAllocation(allocationId).then(function (result) {
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

  return function deleteAllocation(_x12, _x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}();

var categoryController = {
  getAllocation: getAllocation,
  allocationDetails: allocationDetails,
  createAllocation: createAllocation,
  updateAllocation: updateAllocation,
  deleteAllocation: deleteAllocation
};
var _default = categoryController;
exports["default"] = _default;