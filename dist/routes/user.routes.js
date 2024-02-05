"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _validateRequest = _interopRequireDefault(require("../middleware/validateRequest.middleware"));

var _user = _interopRequireDefault(require("../controllers/user.controller"));

var _auth = _interopRequireDefault(require("../middleware/auth.middleware"));

var _user2 = _interopRequireDefault(require("../validators/user.validator"));

var _app = require("./app.routes");

var router = _express["default"].Router();

// User routes // 
router.get(_app.userRoutes.profile.path, [_auth["default"]], _user["default"].userProfile);
router.get(_app.userRoutes.emp_profile.path, [_auth["default"]], _user["default"].emp_userProfile);
router.get(_app.userRoutes.users.path, _user["default"].users);
router.post(_app.userRoutes.create.path, [_auth["default"], _user2["default"].createUser(), _validateRequest["default"]], _user["default"].createUser);
router.post(_app.userRoutes.login.path, [_user2["default"].login(), _validateRequest["default"]], _user["default"].login);
router.post(_app.userRoutes.changePassword.path, [_auth["default"], _user2["default"].changePassword(), _validateRequest["default"]], _user["default"].changePassword);
router["delete"](_app.userRoutes.logout.path, [_auth["default"]], _user["default"].logout);
router["delete"](_app.userRoutes["delete"].path, [_auth["default"]], _user["default"].deleteUser);
router.patch(_app.userRoutes.update.path, [_auth["default"], _user2["default"].updateUser(), _validateRequest["default"]], _user["default"].updateUser);
router.patch(_app.userRoutes.status_change.path, [_auth["default"], _validateRequest["default"]], _user["default"].changestatus);
var _default = router;
exports["default"] = _default;