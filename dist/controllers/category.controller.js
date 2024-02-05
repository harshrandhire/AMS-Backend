"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _category = _interopRequireDefault(require("../services/category.services"));

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

var categoryProfile = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var payload;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //console.log(">>>>>>>>>",req);
            payload = {
              categoryId: _.get(req, "params.id", {})
            }; // console.log("categoryId>>>>>",payload);

            _category["default"].categoryProfile(payload).then(function (result) {
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

  return function categoryProfile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Create Category 
 *
 */


var createCategory = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _category["default"].createCategory(req).then(function (result) {
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

  return function createCategory(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Get Category info
 *
 * @Request request
 */


var categoryDetails = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _category["default"].categoryDetails(req).then(function (result) {
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

  return function categoryDetails(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Get Category Category_List
 *
 * @Request request
 */


var categoryList = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _category["default"].categoryList(req).then(function (result) {
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

  return function categoryList(_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Update category info
 *
 * @param Request request
 */


var updateCategory = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _category["default"].updateCategory(req).then(function (result) {
              res.status(result.status).send(result);
            })["catch"](function (err) {
              res.status(422).send({
                status: 422,
                message: err.message || "Something went wrong!"
              });
            });

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function updateCategory(_x12, _x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * Delete category
 *
 * @param Request request
 */


var deleteCategory = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var categoryId;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            categoryId = _.get(req, "params.id", {});

            _category["default"].deleteCategory(categoryId).then(function (result) {
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

  return function deleteCategory(_x15, _x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 *  Multiple Delete employee 
 *
 * @param Request request
 */


var multipleDeleteCategory = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var id;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return req.query;

          case 2:
            id = _context7.sent;

            _category["default"].multipleDeleteCategory(id).then(function (result) {
              res.status(result.status).send(result);
            })["catch"](function (err) {
              res.status(422).send({
                status: 422,
                message: err.message || "Something went wrong!"
              });
            });

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function multipleDeleteCategory(_x18, _x19, _x20) {
    return _ref7.apply(this, arguments);
  };
}();
/**
 *  generateStock 
 *
 * @param Request request
 */


var generateStock = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _category["default"].generateStock(req).then(function (result) {
              res.status(result.status).send(result);
            })["catch"](function (err) {
              res.status(422).send({
                status: 422,
                message: err.message || "Something went wrong!"
              });
            });

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function generateStock(_x21, _x22, _x23) {
    return _ref8.apply(this, arguments);
  };
}();
/**
 * Status change of category 
 *
 * @param Request request
 */


var changestatus = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
    var categoryId;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            categoryId = _.get(req, "params.id", 0);

            _category["default"].statusChange(categoryId).then(function (result) {
              res.status(result.status).send(result);
            })["catch"](function (err) {
              res.status(422).send({
                status: 422,
                message: err.message || "Something went wrong!"
              });
            });

          case 2:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function changestatus(_x24, _x25, _x26) {
    return _ref9.apply(this, arguments);
  };
}();

var categoryController = {
  categoryProfile: categoryProfile,
  categoryDetails: categoryDetails,
  categoryList: categoryList,
  createCategory: createCategory,
  updateCategory: updateCategory,
  deleteCategory: deleteCategory,
  multipleDeleteCategory: multipleDeleteCategory,
  generateStock: generateStock,
  changestatus: changestatus
};
var _default = categoryController;
exports["default"] = _default;