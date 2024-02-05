"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _combo = _interopRequireDefault(require("../services/combo.services"));

var _lodash = require("lodash");

var _ = {
  get: _lodash.get,
  isEmpty: _lodash.isEmpty
};
/**
 * single Category info
 *  
 * @param Request request
 */

var getCombo = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var payload;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            payload = {
              categoryId: _.get(req, "params.id", {})
            };
            console.log("???????????", payload);

            _combo["default"].getCombo(payload).then(function (result) {
              res.status(result.status).send(result);
            })["catch"](function (err) {
              res.status(422).send({
                status: 422,
                message: err.message || "Something went wrong!"
              });
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getCombo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Create Category 
 *
 */


var createCombo = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _combo["default"].createCombo(req).then(function (result) {
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

  return function createCombo(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Get Category info
 *
 * @Request request
 */

/* const categoryDetails = async (req, res, next) => {
  categoryServices.categoryDetails(req).then(result => {
    res.status(result.status).send(result);
  }).catch(err => {
    res.status(422).send({ status: 422, message: (err.message || "Something went wrong!") });
  });
} */

/**
 * Update category info
 *
 * @param Request request
 */


var updateCombo = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // let data = _.get(req,"body",{});
            // console.log("data>>>>",data);
            _combo["default"].updateCombo(req).then(function (result) {
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

  return function updateCombo(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Delete category
 *
 * @param Request request
 */


var deleteCombo = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var comboId;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            comboId = _.get(req, "params.id", {});

            _combo["default"].deleteCombo(comboId).then(function (result) {
              res.status(result.status).send(result);
            })["catch"](function (err) {
              res.status(422).send({
                status: 422,
                message: err.message || "Something went wrong!"
              });
            });

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function deleteCombo(_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

var categoryController = {
  getCombo: getCombo,
  //categoryDetails,
  createCombo: createCombo,
  updateCombo: updateCombo,
  deleteCombo: deleteCombo
};
var _default = categoryController;
exports["default"] = _default;