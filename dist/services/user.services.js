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
 * Login to user and generate JWT
 *
 * @param Request request
 */
var login = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req) {
    var responseData, email, password, User, userPassword, validPassword, tokenData, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            responseData = _statusConstants["default"].authError; // const data = _.get(req, "body", "");

            _context.prev = 1;
            email = req.email;
            password = req.password; // Find the user by email and if active

            _context.next = 6;
            return _models["default"].UserDetails.findOne({
              where: {
                email: email,
                status: _appConstants.commonStatuses.ACTIVE.id
              }
            });

          case 6:
            User = _context.sent;
            // console.log("User>>>>>>>>>>",User);
            userPassword = _.get(User, "password", "");
            _context.next = 10;
            return _bcrypt["default"].compare(password, userPassword);

          case 10:
            validPassword = _context.sent;

            if (!(!_.isEmpty(User) && _.isObject(User) && validPassword === true && !_.isEmpty(password))) {
              _context.next = 24;
              break;
            }

            if (!(User.dataValues.email_verified == 0)) {
              _context.next = 16;
              break;
            }

            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].authError), {}, {
              message: "Email not verified"
            });
            _context.next = 24;
            break;

          case 16:
            _context.next = 18;
            return generateToken({
              id: User.id
            });

          case 18:
            tokenData = _context.sent;
            token = _.get(tokenData, "token", null);

            if (!token) {
              _context.next = 24;
              break;
            }

            _context.next = 23;
            return User.update({
              token: token
            });

          case 23:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].authSuccess), {}, {
              data: {
                token: token
              }
            });

          case 24:
            _context.next = 29;
            break;

          case 26:
            _context.prev = 26;
            _context.t0 = _context["catch"](1);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context.t0.message
            });

          case 29:
            return _context.abrupt("return", responseData);

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 26]]);
  }));

  return function login(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Generate the Token based on User PK
 *
 * @param  Options Object
 * @return String Token with 12h expired date
 */


var generateToken = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var options,
        responseData,
        userId,
        updateToken,
        userTableAttributes,
        User,
        userData,
        token,
        _args2 = arguments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            options = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
            responseData = _statusConstants["default"].error;
            userId = _.get(options, "id", 0);
            updateToken = _.get(options, "updateToken", false) || false;
            _context2.prev = 4;
            // Add associated modules
            userTableAttributes = ["id", "user_role_id", "email", "password", "first_name", "last_name", "phone", "dob", "status", "email_verified", "email_verified_at", "email_verification_code", "updated_by", "created_by", "updated_at", "created_at"]; // Find user by id

            _context2.next = 8;
            return _models["default"].UserDetails.findOne({
              attributes: userTableAttributes,
              where: {
                id: userId
              }
            });

          case 8:
            User = _context2.sent;

            if (!_.isEmpty(User)) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "User not found",
              success: false
            }));

          case 11:
            userData = User.get({
              plain: true
            }) || {}; // Change the status and roles to string from integer

            userData.status = _.chain(_appConstants.commonStatuses).find({
              id: userData.status
            }).get("title", "").value();
            userData.role = _.chain(_appConstants.userRoles).find({
              id: userData.user_role_id
            }).get("title", "").value(); // Omit unwanted data in the last once all the related activities are done

            userData = _.omit(userData, ["UserDetail"], "id", "email", "password", "user_role_id", "phone", "email_verified", "email_verified_at", "email_verification_code", "updated_at", "status"); // Generate JWT with payload

            token = _jsonwebtoken["default"].sign(userData, _appConfig["default"].jwtSecretKey); //const token = jwt.sign(userData, appConfig.jwtSecretKey, { expiresIn: '3h' });
            //const token = jwt.sign({ id: userData.id }, process.env.RESET_PASSWORD_KEY, { expiresIn: '3h' });
            // Update the token

            if (!(updateToken == true)) {
              _context2.next = 19;
              break;
            }

            _context2.next = 19;
            return User.update({
              token: token
            });

          case 19:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              token: token,
              success: true
            });
            _context2.next = 25;
            break;

          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2["catch"](4);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context2.t0.message
            });

          case 25:
            return _context2.abrupt("return", responseData);

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 22]]);
  }));

  return function generateToken() {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * create user
 *
 * @param Request request
 */


var createUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(data) {
    var responseData, bodyData, checkUser, checkEmailExicteInTable, userPayload, user, userId, errors;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            bodyData = _.get(data, "body", {});
            checkUser = _.get(data, "tokenUser", {}); // console.log("checkUser>>>>>>>>>>>",checkUser);

            _context3.next = 5;
            return _models["default"].UserDetails.findOne({
              where: {
                email: bodyData.email
              }
            });

          case 5:
            checkEmailExicteInTable = _context3.sent;

            if (checkEmailExicteInTable) {
              _context3.next = 48;
              break;
            }

            _context3.prev = 7;
            _context3.t0 = bodyData.user_role_id || 1;
            _context3.t1 = bodyData.email || "";
            _context3.t2 = bodyData.token || "";
            _context3.t3 = bodyData.first_name || "";
            _context3.t4 = bodyData.last_name || "";
            _context3.t5 = bodyData.phone || "";
            _context3.t6 = bodyData.dob || "";
            _context3.next = 17;
            return _bcrypt["default"].hash(bodyData.password, _appConfig["default"].bcryptSaltRound);

          case 17:
            _context3.t7 = _context3.sent;

            if (_context3.t7) {
              _context3.next = 20;
              break;
            }

            _context3.t7 = "";

          case 20:
            _context3.t8 = _context3.t7;
            _context3.t9 = _appConstants.commonStatuses.ACTIVE.id;
            _context3.t10 = checkUser.first_name + " " + checkUser.last_name;
            userPayload = {
              user_role_id: _context3.t0,
              email: _context3.t1,
              token: _context3.t2,
              first_name: _context3.t3,
              last_name: _context3.t4,
              phone: _context3.t5,
              dob: _context3.t6,
              password: _context3.t8,
              status: _context3.t9,
              created_by: _context3.t10,
              updated_by: ""
            };

            if (!(checkUser.user_role_id == 1 || checkUser.user_role_id == 2)) {
              _context3.next = 38;
              break;
            }

            if (!(checkUser.user_role_id == 2 && userPayload.user_role_id == 1)) {
              _context3.next = 29;
              break;
            }

            // HR can not create Admin
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "HR can not create admin"
            });
            _context3.next = 36;
            break;

          case 29:
            _context3.next = 31;
            return _models["default"].UserDetails.create(userPayload);

          case 31:
            user = _context3.sent;
            // console.log("user>>>>>>>>",user);
            userId = _.get(user, "id", 0); // User  not created, throw an exception

            if (userId) {
              _context3.next = 35;
              break;
            }

            throw new Error("Unable to create new User ");

          case 35:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              message: "User created successfully",
              success: true,
              data: user
            });

          case 36:
            _context3.next = 39;
            break;

          case 38:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "Unauthorized user"
            });

          case 39:
            _context3.next = 46;
            break;

          case 41:
            _context3.prev = 41;
            _context3.t11 = _context3["catch"](7);
            errors = {}; // Default message

            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context3.t11.message
            });

            try {
              if (["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(_context3.t11.name)) {
                errors = _dbHelper["default"].formatSequelizeErrors(_context3.t11);
                responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].validationErrors), {}, {
                  errors: errors
                });
              }
            } catch (error) {
              responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
                message: error.message
              });
            }

          case 46:
            _context3.next = 49;
            break;

          case 48:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "Email alredy in use",
              success: false
            });

          case 49:
            return _context3.abrupt("return", responseData);

          case 50:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[7, 41]]);
  }));

  return function createUser(_x2) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 *
 * display single user details
 *
 */


var userProfile = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(payload) {
    var responseData, userId, userData, userDataPayload;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            responseData = _statusConstants["default"].fetchResourceError;
            _context4.prev = 1;
            userId = _.get(payload, "userId", 0);
            _context4.next = 5;
            return _models["default"].UserDetails.findOne({
              where: {
                id: userId
              }
            });

          case 5:
            userData = _context4.sent;
            // console.log(">>>>>>>>",userData);
            userDataPayload = {
              id: userData.id,
              user_role_id: userData.user_role_id,
              email: userData.email,
              first_name: userData.first_name,
              last_name: userData.last_name,
              phone: userData.phone,
              dob: userData.dob,
              status: userData.status,
              email_verified: userData.email_verified
            };

            if (userData) {
              responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].fetchSucccess), {}, {
                message: "User fetch successfully",
                success: true,
                data: userDataPayload
              });
            } else {
              responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].fetchResourceError), {}, {
                message: "User does not exist"
              });
            }

            _context4.next = 13;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](1);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "User not found",
              success: false
            });

          case 13:
            return _context4.abrupt("return", responseData);

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 10]]);
  }));

  return function userProfile(_x3) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 *
 * display single employee user details
 *
 */


var emp_userProfile = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(payload) {
    var responseData, userData;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            responseData = _statusConstants["default"].fetchResourceError;
            _context5.prev = 1;
            _context5.next = 4;
            return _models["default"].UserDetails.findOne({
              // where: { id: userId },
              where: {
                id: payload.id
              }
            });

          case 4:
            userData = _context5.sent;

            if (userData) {
              responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].fetchSucccess), {}, {
                message: "User fetch successfully",
                success: true,
                data: userData
              });
            } else {
              responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].fetchResourceError), {}, {
                message: "User does not exist"
              });
            }

            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](1);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "User not found",
              success: false
            });

          case 11:
            return _context5.abrupt("return", responseData);

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 8]]);
  }));

  return function emp_userProfile(_x4) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * Get users details
 *
 * @Request request
 */


var users = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req) {
    var responseData, entityParams, searchText, defaultWhere, entityPagination, _users, pagination;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            entityParams = _.get(req, "query", {});
            searchText = _.get(entityParams, "q", "");
            defaultWhere = {
              /* status: 1 */
            };

            if (_.has(entityParams, "q") && !_.isEmpty(searchText)) {
              defaultWhere = (0, _defineProperty2["default"])({}, _sequelize.Op.or, {
                first_name: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(searchText, "%")),
                last_name: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(searchText, "%")),
                phone: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(searchText, "%")),
                email: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(searchText, "%")),
                user_role_id: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(searchText, "%"))
              });
            }

            _context6.prev = 5;
            entityPagination = _helper["default"].dataPagination(entityParams);
            _context6.next = 9;
            return _models["default"].UserDetails.findAndCountAll({
              attributes: _modelConstants["default"].userDeatail,
              where: defaultWhere,
              offset: entityPagination.offset,
              limit: entityPagination.limit,
              order: [["id", "DESC"]]
            });

          case 9:
            _users = _context6.sent;
            pagination = entityPagination.pagination;
            pagination["totalPages"] = Math.ceil(((_users || {}).count || 0) / pagination.pageSize);
            pagination["pageRecords"] = ((_users || {}).rows || []).length || 0;
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              success: true,
              pagination: pagination,
              data: _users
            });
            _context6.next = 19;
            break;

          case 16:
            _context6.prev = 16;
            _context6.t0 = _context6["catch"](5);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context6.t0.message
            });

          case 19:
            return _context6.abrupt("return", responseData);

          case 20:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[5, 16]]);
  }));

  return function users(_x5) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * Find User by Token
 *
 * @param String JWT token
 */


var findByToken = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(token) {
    var responseData, User;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "user not found",
              success: false
            });
            _context7.prev = 1;
            _context7.next = 4;
            return _models["default"].UserDetails.findOne({
              where: {
                token: token,
                status: _appConstants.commonStatuses.ACTIVE.id
              }
            });

          case 4:
            User = _context7.sent;

            if (!_.isEmpty(User) && _.isObject(User)) {
              responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
                success: true,
                data: User
              });
            } else {
              responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
                message: "user not found",
                success: false
              });
            }

            _context7.next = 11;
            break;

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7["catch"](1);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context7.t0.message
            });

          case 11:
            return _context7.abrupt("return", responseData);

          case 12:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 8]]);
  }));

  return function findByToken(_x6) {
    return _ref7.apply(this, arguments);
  };
}();

var changePassword = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(payload) {
    var responseData, userId, currentPassword, newPassword, userData, validPassword, hashPassword;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            responseData = _statusConstants["default"].authError;
            _context8.prev = 1;
            userId = _.get(payload, "tokenUser.id", 0);
            currentPassword = _.get(payload, "formData.currentPassword", "");
            newPassword = _.get(payload, "formData.newPassword", "");
            _context8.next = 7;
            return _models["default"].UserDetails.findOne({
              where: {
                id: userId,
                status: _appConstants.commonStatuses.ACTIVE.id
              }
            });

          case 7:
            userData = _context8.sent;

            if (!userData) {
              _context8.next = 25;
              break;
            }

            _context8.next = 11;
            return _bcrypt["default"].compare(currentPassword, userData.password);

          case 11:
            validPassword = _context8.sent;

            if (!validPassword) {
              _context8.next = 22;
              break;
            }

            _context8.next = 15;
            return _bcrypt["default"].hash(newPassword, _appConfig["default"].bcryptSaltRound);

          case 15:
            hashPassword = _context8.sent;
            userData.password = hashPassword;
            _context8.next = 19;
            return userData.save();

          case 19:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].authSuccess), {}, {
              message: "Password change succesfully",
              success: true
            });
            _context8.next = 23;
            break;

          case 22:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "Current password is not vailid",
              success: false
            });

          case 23:
            _context8.next = 26;
            break;

          case 25:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "User not found",
              success: false
            });

          case 26:
            _context8.next = 31;
            break;

          case 28:
            _context8.prev = 28;
            _context8.t0 = _context8["catch"](1);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context8.t0.message
            });

          case 31:
            return _context8.abrupt("return", responseData);

          case 32:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 28]]);
  }));

  return function changePassword(_x7) {
    return _ref8.apply(this, arguments);
  };
}();
/**
 *Update User detail
 *
 * @param Request request
 */


var updateUser = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req) {
    var responseData, userId, data, checkUser, user, userUpdatePayload, updatedUser;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            userId = _.get(req, "params.id", 0);
            data = _.get(req, "body", {});
            checkUser = _.get(req, "tokenUser", {});
            _context9.prev = 4;
            _context9.next = 7;
            return _models["default"].UserDetails.findOne({
              where: {
                id: userId
              }
            });

          case 7:
            user = _context9.sent;

            if (user) {
              _context9.next = 12;
              break;
            }

            return _context9.abrupt("return", _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "User not found",
              success: false
            }));

          case 12:
            _context9.t0 = data.user_role_id || "";
            _context9.t1 = data.email || "";
            _context9.t2 = data.token || "";
            _context9.t3 = data.first_name || "";
            _context9.t4 = data.last_name || "";
            _context9.t5 = data.phone || "";
            _context9.t6 = data.dob || "";
            _context9.next = 21;
            return _bcrypt["default"].hash(data.password, _appConfig["default"].bcryptSaltRound);

          case 21:
            _context9.t7 = _context9.sent;

            if (_context9.t7) {
              _context9.next = 24;
              break;
            }

            _context9.t7 = "";

          case 24:
            _context9.t8 = _context9.t7;
            _context9.t9 = _appConstants.commonStatuses.ACTIVE.id;
            _context9.t10 = checkUser.first_name + " " + checkUser.last_name;
            userUpdatePayload = {
              user_role_id: _context9.t0,
              email: _context9.t1,
              token: _context9.t2,
              first_name: _context9.t3,
              last_name: _context9.t4,
              phone: _context9.t5,
              dob: _context9.t6,
              password: _context9.t8,
              status: _context9.t9,
              updated_by: _context9.t10
            };
            updatedUser = user.update(_objectSpread({}, userUpdatePayload));
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              message: "User udated successfully",
              success: true,
              updatedUser: updatedUser
            });

          case 30:
            _context9.next = 35;
            break;

          case 32:
            _context9.prev = 32;
            _context9.t11 = _context9["catch"](4);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context9.t11.message
            });

          case 35:
            return _context9.abrupt("return", responseData);

          case 36:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[4, 32]]);
  }));

  return function updateUser(_x8) {
    return _ref9.apply(this, arguments);
  };
}();
/**
 *Delete User
 *
 * @param Request request
 */


var deleteUser = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req) {
    var responseData, userId, user;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            userId = _.get(req, "params.id", {});
            _context10.prev = 2;
            _context10.next = 5;
            return _models["default"].UserDetails.findOne({
              where: {
                id: userId
              }
            });

          case 5:
            user = _context10.sent;

            if (user) {
              _context10.next = 10;
              break;
            }

            return _context10.abrupt("return", _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "user not found",
              success: false
            }));

          case 10:
            user.update({
              status: _appConstants.commonStatuses.INACTIVE.id
            });
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              message: "user deleted successfully",
              success: true
            });

          case 12:
            _context10.next = 17;
            break;

          case 14:
            _context10.prev = 14;
            _context10.t0 = _context10["catch"](2);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context10.t0.message
            });

          case 17:
            return _context10.abrupt("return", responseData);

          case 18:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[2, 14]]);
  }));

  return function deleteUser(_x9) {
    return _ref10.apply(this, arguments);
  };
}();

var logout = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req) {
    var responseData, tokenUser, user;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            tokenUser = _.get(req, "tokenUser", {}); // console.log(">>>>>>>>>>>>>tokenUser",tokenUser);

            _context11.prev = 2;
            _context11.next = 5;
            return _models["default"].UserDetails.findOne({
              where: {
                id: tokenUser.id
              }
            });

          case 5:
            user = _context11.sent;

            if (user) {
              _context11.next = 10;
              break;
            }

            return _context11.abrupt("return", _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "user not found",
              success: false
            }));

          case 10:
            user.update({
              token: ""
            });
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              message: "user logout successfully",
              success: true
            });

          case 12:
            _context11.next = 17;
            break;

          case 14:
            _context11.prev = 14;
            _context11.t0 = _context11["catch"](2);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "User already loged out",
              success: false
            });

          case 17:
            return _context11.abrupt("return", responseData);

          case 18:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[2, 14]]);
  }));

  return function logout(_x10) {
    return _ref11.apply(this, arguments);
  };
}();
/**
 * Change Status category
 *
 * @param Request request
 */


var statusChange = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(data) {
    var responseData, userId, user, statuschange;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            userId = data;
            _context12.prev = 2;
            _context12.next = 5;
            return _models["default"].UserDetails.findOne({
              where: {
                id: userId
              }
            });

          case 5:
            user = _context12.sent;

            if (user) {
              _context12.next = 10;
              break;
            }

            return _context12.abrupt("return", _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "User not found",
              success: false
            }));

          case 10:
            if (user.status == 1) {
              statuschange = _appConstants.commonStatuses.INACTIVE.id;
            } else {
              statuschange = _appConstants.commonStatuses.ACTIVE.id;
            }

            user.update({
              status: statuschange
            });

          case 12:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              message: "Status Changed",
              success: true
            });
            _context12.next = 18;
            break;

          case 15:
            _context12.prev = 15;
            _context12.t0 = _context12["catch"](2);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context12.t0.message
            });

          case 18:
            return _context12.abrupt("return", responseData);

          case 19:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[2, 15]]);
  }));

  return function statusChange(_x11) {
    return _ref12.apply(this, arguments);
  };
}();

var UserServices = {
  createUser: createUser,
  login: login,
  generateToken: generateToken,
  userProfile: userProfile,
  emp_userProfile: emp_userProfile,
  users: users,
  changePassword: changePassword,
  findByToken: findByToken,
  updateUser: updateUser,
  deleteUser: deleteUser,
  logout: logout,
  statusChange: statusChange
};
var _default = UserServices;
exports["default"] = _default;