"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../services/user.services"));

var _user2 = _interopRequireDefault(require("../validators/user.validator"));

var _lodash = require("lodash");

var _ = {
  get: _lodash.get,
  isEmpty: _lodash.isEmpty
};
/*
**   
login Controller 
**  
*/

var login = function login(req, res, next) {
  var bodyData = _.get(req, "body", {}); // console.log("reqqqqqqqqqqq____________",bodyData);


  _user["default"].login(bodyData).then(function (result) {
    res.status(result.status).send(result);
  })["catch"](function (err) {
    res.status(422).send({
      status: 422,
      message: err.message || "Something went wrong!"
    });
  });
};
/*
**   
Create Controller 
**  
*/


var createUser = function createUser(req, res) {
  _user["default"].createUser(req).then(function (result) {
    res.status(result.status).send(result);
  })["catch"](function (err) {
    res.status(422).send({
      status: 422,
      message: err.message || "Something went wrong!"
    });
  });
};
/*
*   
* User Profile Controller 
*  
*/


var userProfile = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var payload;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            payload = {
              userId: _.get(req, "params.id", {})
            };

            _user["default"].userProfile(payload).then(function (result) {
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

  return function userProfile(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var emp_userProfile = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var tokenUser;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            tokenUser = _.get(req, "tokenUser", {}); //console.log("tokenUser>>>",tokenUser);

            _user["default"].emp_userProfile(tokenUser).then(function (result) {
              res.status(result.status).send(result);
            })["catch"](function (err) {
              res.status(422).send({
                status: 422,
                message: err.message || "Something went wrong!"
              });
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function emp_userProfile(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
/*
*   
* User Details Controller 
*  
*/


var users = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _user["default"].users(req).then(function (result) {
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

  return function users(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
/*
**   
Change-Password Controller 
**  
*/


var changePassword = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var payload;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            payload = {
              tokenUser: _.get(req, "tokenUser", {}),
              formData: _.get(req, "body", {})
            };

            _user["default"].changePassword(payload).then(function (result) {
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

  return function changePassword(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Update User info
 *
 * @param Request request
 */


var updateUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            // let data = _.get(req,"body",{});
            _user["default"].updateUser(req).then(function (result) {
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

  return function updateUser(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * Delete User
 *
 * @param Request request
 */


var deleteUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _user["default"].deleteUser(req).then(function (result) {
              res.status(result.status).send(result);
            })["catch"](function (err) {
              res.status(422).send({
                status: 422,
                message: err.message || "Something went wrong!"
              });
            });

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function deleteUser(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

var logout = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _user["default"].logout(req).then(function (result) {
              res.status(result.status).send(result);
            })["catch"](function (err) {
              res.status(422).send({
                status: 422,
                message: err.message || "Something went wrong!"
              });
            });

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function logout(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();
/**
 * Status change of User 
 *
 * @param Request request
 */


var changestatus = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var userId;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            userId = _.get(req, "params.id", 0);

            _user["default"].statusChange(userId).then(function (result) {
              res.status(result.status).send(result);
            })["catch"](function (err) {
              res.status(422).send({
                status: 422,
                message: err.message || "Something went wrong!"
              });
            });

          case 2:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function changestatus(_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();

var userController = {
  createUser: createUser,
  login: login,
  userProfile: userProfile,
  emp_userProfile: emp_userProfile,
  users: users,
  changePassword: changePassword,
  updateUser: updateUser,
  deleteUser: deleteUser,
  logout: logout,
  changestatus: changestatus
};
var _default = userController;
exports["default"] = _default;