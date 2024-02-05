"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = require("lodash");

var _ = {
  startCase: _lodash.startCase
};
var _default = {
  /**
   * Failed to upload Image validation error message
   *
   * `Example` - Failed to upload image
   * @param  String File Type
   * @return Formatted message
   */
  uploadFailed: function uploadFailed(fileType) {
    return "Failed to upload ".concat(_.startCase(fileType));
  },

  /**
  * Request forgot password email not found error message
  *
  * `Example` - We couldn't find an account associated with xyz@abc.com. Please try with an alternate email
  * @param  String File Type
  * @return Formatted message
  */
  resetPasswordEmailNotFound: function resetPasswordEmailNotFound(email) {
    return "We couldn't find an account associated with ".concat(email, ". Please try with an alternate email");
  }
};
exports["default"] = _default;