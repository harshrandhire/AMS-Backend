"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _statusConstants = _interopRequireDefault(require("../common/statusConstants"));

var _expressValidator = require("express-validator");

var _index = _interopRequireDefault(require("../validators/index"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var _default = function _default(req, res, next) {
  // Validate request
  var errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    var formatted = _index["default"].format(errors.array());

    var responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].validationErrors), {}, {
      errors: formatted
    });

    return res.status(responseData.status).send(responseData);
  } // Send cursor to next request


  next();
};

exports["default"] = _default;