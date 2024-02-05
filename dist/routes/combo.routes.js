"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _combo = _interopRequireDefault(require("../validators/combo.validator"));

var _combo2 = _interopRequireDefault(require("../controllers/combo.controller"));

var _app = require("./app.routes");

var _validateRequest = _interopRequireDefault(require("../middleware/validateRequest.middleware"));

var _auth = _interopRequireDefault(require("../middleware/auth.middleware"));

var router = _express["default"].Router();

// Allocation routes // 
router.get(_app.comboRoutes.get.path, [_auth["default"]], _combo2["default"].getCombo);
router.post(_app.comboRoutes.create.path, [_auth["default"], _combo["default"].createCombo(), _validateRequest["default"]], _combo2["default"].createCombo);
router.patch(_app.comboRoutes.update.path, [_auth["default"], _combo["default"].createCombo(), _validateRequest["default"]], _combo2["default"].updateCombo);
router["delete"](_app.comboRoutes["delete"].path, [_auth["default"], _validateRequest["default"]], _combo2["default"].deleteCombo);
var _default = router;
exports["default"] = _default;