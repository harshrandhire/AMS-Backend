"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _statusConstants = _interopRequireDefault(require("./../common/statusConstants"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _appConfig = _interopRequireDefault(require("./../common/appConfig"));

var _user = _interopRequireDefault(require("../services/user.services"));

var _lodash = require("lodash");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var _ = {
  chain: _lodash.chain
};

var _default = function _default(req, res, next) {
  var token = _.chain(req).get("headers.authorization", "").replace("Bearer ", "").value(); // console.log('>>>>>>>>>>>>>?????????',token);


  if (token) {
    // Validate token
    try {
      _jsonwebtoken["default"].verify(token, _appConfig["default"].jwtSecretKey); // Match JTW with user table


      _user["default"].findByToken(token).then(function (data) {
        // console.log("data>>>>",data);
        if (data.status === 200) {
          // Pass token user with current request
          // console.log("req.tokenUser>>>>",req.tokenUser);
          req.tokenUser = data.data;
          next();
        } else {
          res.status(401).send({
            status: 401,
            message: "Invalid session"
          });
        }
      })["catch"](function (error) {
        res.status(401).send({
          status: 401,
          message: error.message
        });
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        res.status(401).send(_statusConstants["default"].tokenExpired);
      } else {
        res.status(401).send(_objectSpread(_objectSpread({}, _statusConstants["default"].tokenExpired), {}, {
          message: error.message
        }));
      }
    }
  } else {
    res.status(_statusConstants["default"].noTokenProvided.status).send(_statusConstants["default"].noTokenProvided);
  }
};

exports["default"] = _default;