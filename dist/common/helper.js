"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = require("lodash");

var _crypto = _interopRequireDefault(require("crypto"));

var _appConstants = _interopRequireDefault(require("./appConstants"));

var _ = {
  each: _lodash.each,
  size: _lodash.size,
  set: _lodash.set,
  isEmpty: _lodash.isEmpty,
  isObject: _lodash.isObject,
  startCase: _lodash.startCase,
  chain: _lodash.chain,
  map: _lodash.map,
  get: _lodash.get,
  has: _lodash.has,
  isNumber: _lodash.isNumber,
  cloneDeep: _lodash.cloneDeep
};
/**
* Check whether email addresses is valid or not.
*
* @param  String Email Address
* @return TRUE if email addresses is valid, FALSE otherwise
*/

var validateEmail = function validateEmail() {
  var email = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
/**
* Generate random string between min and max length
*
* @param  Object options
* @return Random string
*/


var generateRandomString = function generateRandomString() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  try {
    // Define the length of the string
    var stringLength = _.has(options, "length") && _.isNumber(options.length) ? options.length : 37; // Generate Random String

    var generatedString = _crypto["default"].randomBytes(stringLength).toString("hex"); // Check if string needs to be converted into Upper case


    if (_.has(options, "upper")) {
      generatedString = generatedString.toUpperCase();
    }

    return generatedString.substr(0, stringLength);
  } catch (error) {
    return error.message;
  }
};
/**
* Generate the email verification data once user signs up
*
* @return Email verification data
*/


var generateEmailVerificationDetails = function generateEmailVerificationDetails() {
  return {
    email_verified: 0,
    email_verified_at: null,
    email_verification_code: generateRandomString({
      length: 6,
      upper: true
    })
  };
};
/**
* Common pagination for data list
*
* @param  Object paginateData
* @return Pagination details object
*/


var dataPagination = function dataPagination() {
  var paginateData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var currentPage = parseInt(paginateData.page || 0) > 0 ? parseInt(paginateData.page) : 1;
  var pageSize = parseInt(paginateData.pageSize || 0) > 0 && parseInt(paginateData.pageSize || 0) <= _appConstants["default"].pageSizeLimit ? parseInt(paginateData.pageSize) : _appConstants["default"].pageSize;
  var defaultOffset = (currentPage - 1) * pageSize;
  return {
    limit: pageSize,
    offset: defaultOffset,
    page: currentPage,
    pageSize: pageSize,
    pagination: {
      totalPages: 0,
      pageRecords: 0,
      page: currentPage,
      pageSize: pageSize
    }
  };
};

var helper = {
  validateEmail: validateEmail,
  generateEmailVerificationDetails: generateEmailVerificationDetails,
  dataPagination: dataPagination
};
var _default = helper;
exports["default"] = _default;