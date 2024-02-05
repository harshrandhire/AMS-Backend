"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = require("lodash");

var _models = _interopRequireDefault(require("../models"));

var _ = {
  each: _lodash.each,
  isEmpty: _lodash.isEmpty,
  startCase: _lodash.startCase,
  get: _lodash.get
};
/**
* Throw an unique field validation when requirement matches
*
*     const options = {
*        msg: Whether need to display explicit error message or not
*    }
*
*
* @param  String Modal name
* @param  String Field to be validated
* @param  Object See options object more for details
* @return Thrown an unique error Sequelize validation if criteria matches
*/

var isUnique = function isUnique(modelName, field) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return function (value, next) {
    var model = _models["default"][modelName]; // Validate the field only if has any value

    if (!_.isEmpty(value)) {
      var query = {};
      query[field] = value; // Check if error message is passed

      var errorMessage = _.get(options, "msg", "".concat(_.startCase(field), " is already in use"));

      model.findOne({
        where: query,
        attributes: ["id"]
      }).then(function (obj) {
        if (!_.isEmpty(obj)) {
          next(errorMessage);
        } else {
          next();
        }
      })["catch"](function (e) {
        next("Unexpected error ".concat(e.message));
      });
    } else {
      next();
    }
  };
};
/**
* Format the Sequelize error instance object to readable format
* 
* Custom thrown exceptions will always have higher priority
*
* @param  Instance SequelizeValidationError
* @return Formatted error messages in Object form
*/


var formatSequelizeErrors = function formatSequelizeErrors(errorsObject) {
  var errors = {};

  _.each(errorsObject.errors || [], function (e) {
    var field = _.get(e, "path", "");

    var message = _.get(e, "message", "");

    if (!_.isEmpty(field) && !_.isEmpty(message)) {
      errors[field] = message;
    }
  }); // Check if custom exception is thrown


  if (errorsObject.customThrow) {
    var field = _.get(errorsObject, "path", "");

    var message = _.get(errorsObject, "message", "");

    errors[field] = message;
  }

  return errors;
};
/*
*
* GenerateUniqueId for models base on thier id's 
* 
*/


var generateUniqueId = function generateUniqueId(type, id) {
  var model = type;
  var modelId = "";

  switch (model) {
    case "Employee":
      modelId = "DLE00000";
      break;

    case "Company":
      modelId = "DLC00000";
      break;

    case "User":
      modelId = "DLU00000";
      break;

    case "combo":
      modelId = "KOLI0000";
      break;

    default:
      modelId = id;
  }

  var idLength = id.toString().length;

  if (idLength) {
    var uniqueId = modelId.substring(0, modelId.length - idLength);
    return uniqueId + id;
  } else {
    return modelId;
  }
};

var dbHelper = {
  isUnique: isUnique,
  formatSequelizeErrors: formatSequelizeErrors,
  generateUniqueId: generateUniqueId
};
var _default = dbHelper;
exports["default"] = _default;