"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.login = exports["default"] = exports.createUser = exports.changePassword = void 0;

var _expressValidator = require("express-validator");

var _lodash = require("lodash");

var _ = {
  get: _lodash.get
};
/**
 * Validate Login Authentication
 *
 */

var login = function login() {
  return [(0, _expressValidator.body)("email").not().isEmpty().withMessage("Email is required"), (0, _expressValidator.body)("password").not().isEmpty().withMessage("Password is required")];
};
/**
 * CreateUser
 *
 */


exports.login = login;

var createUser = function createUser() {
  return [(0, _expressValidator.body)("user_role_id").not().isEmpty().withMessage("user role id  is required"), (0, _expressValidator.body)("email").not().isEmpty().withMessage("Email is required").isEmail().withMessage("Valid email address is required"), (0, _expressValidator.body)("password").not().isEmpty().withMessage("password is required"), (0, _expressValidator.body)("confirm_password").not().isEmpty().withMessage("Confirm password is required").custom(function (value, _ref) {
    var req = _ref.req;

    if (value !== req.body.password) {
      throw new Error("Password and Confirm password does not match");
    }

    return true;
  }), (0, _expressValidator.body)("first_name").not().isEmpty().withMessage("First name is required"), (0, _expressValidator.body)("last_name").not().isEmpty().withMessage("Last name is required"), (0, _expressValidator.body)("phone").not().isEmpty().withMessage("Phone number is required").isLength({
    min: 10,
    max: 10
  }).withMessage("Incorrect phone number"), (0, _expressValidator.body)("dob").not().isEmpty().withMessage("Date of birth is required")];
};
/**
 * Change password
 *
 */


exports.createUser = createUser;

var changePassword = function changePassword() {
  return [(0, _expressValidator.body)("currentPassword").not().isEmpty().withMessage("Current password is required"), (0, _expressValidator.body)("newPassword").not().isEmpty().withMessage("New password is required").isLength({
    min: 4,
    max: 16
  }).withMessage("Password must be between 4 to 16 characters").matches(/^(?=.*[a-z])(?!.* )(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/).withMessage("Must contains at least upper case, lower case, digit, special character and no white space").custom(function (value, _ref2) {
    var req = _ref2.req;

    if (value === req.body.currentPassword) {
      throw new Error("Current password and New password cannot be same");
    }

    return true;
  }), (0, _expressValidator.body)("confirmPassword").not().isEmpty().withMessage("Confirm password is required").custom(function (value, _ref3) {
    var req = _ref3.req;

    if (value !== req.body.newPassword) {
      throw new Error("Password and Confirm password does not match");
    }

    return true;
  })];
};
/**
 * CreateEmployee
 *
 */


exports.changePassword = changePassword;

var updateUser = function updateUser() {
  return [(0, _expressValidator.body)("user_role_id").not().isEmpty().withMessage("user role id  is required"), (0, _expressValidator.body)("first_name").not().isEmpty().withMessage("First name is required"), (0, _expressValidator.body)("last_name").not().isEmpty().withMessage("Last name is required"), (0, _expressValidator.body)("dob").not().isEmpty().withMessage("Date of birth is required")];
};

exports.updateUser = updateUser;
var _default = {
  login: login,
  createUser: createUser,
  changePassword: changePassword,
  updateUser: updateUser
};
exports["default"] = _default;