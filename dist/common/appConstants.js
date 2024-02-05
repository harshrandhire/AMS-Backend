"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRoles = exports.emailVerifyStatuses = exports["default"] = exports.commonStatuses = exports.bytesMb = exports.ROOT_DIR = exports.LOGO_IMAGES_DIR = exports.DS = exports.ASSET_IMAGES_DIR = exports.ASSETS_TMP_DIR = exports.ASSETS_DIR = void 0;

var _path = _interopRequireDefault(require("path"));

var DS = "/";
exports.DS = DS;

var ROOT_DIR = _path["default"].resolve('./');

exports.ROOT_DIR = ROOT_DIR;
var ASSETS_DIR = "".concat(ROOT_DIR).concat(DS, "assets");
exports.ASSETS_DIR = ASSETS_DIR;
var ASSETS_TMP_DIR = "".concat(ASSETS_DIR).concat(DS, "tmp");
exports.ASSETS_TMP_DIR = ASSETS_TMP_DIR;
var ASSET_IMAGES_DIR = "".concat(ASSETS_DIR).concat(DS, "images").concat(DS);
exports.ASSET_IMAGES_DIR = ASSET_IMAGES_DIR;
var LOGO_IMAGES_DIR = "".concat(ASSETS_DIR).concat(DS, "images").concat(DS, "logo").concat(DS);
exports.LOGO_IMAGES_DIR = LOGO_IMAGES_DIR;
var _default = {
  pageSize: 15,
  pageSizeLimit: 200,
  thumbMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/bmp'],
  imageMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/bmp'],
  fontMimeTypes: ['ttf', 'otf'],
  standardDateFormat: "YYYY-MM-DD HH:mm:ss"
};
exports["default"] = _default;
var userRoles = {
  ADMIN_ROLE: {
    id: 1,
    title: "admin"
  },
  VENDOR_ROLE: {
    id: 2,
    title: "hr"
  },
  EMPLOYEE_ROLE: {
    id: 3,
    title: "employee"
  }
};
/**
* All the MB conversion are made in bytes
*
*/

exports.userRoles = userRoles;
var bytesMb = {
  "mb_1": 1048576,
  "mb_2": 2097152,
  "mb_3": 3145728,
  "mb_4": 4194304,
  "mb_5": 5242880,
  "mb_10": 10485760,
  "mb_30": 31457280,
  "mb_50": 52428800
};
exports.bytesMb = bytesMb;
var emailVerifyStatuses = {
  UNVERIFIED: {
    id: 0,
    title: "unverified"
  },
  VERIFIED: {
    id: 1,
    title: "verified"
  }
};
exports.emailVerifyStatuses = emailVerifyStatuses;
var commonStatuses = {
  ACTIVE: {
    id: 1,
    title: "active"
  },
  INACTIVE: {
    id: 0,
    title: "inactive"
  }
};
exports.commonStatuses = commonStatuses;