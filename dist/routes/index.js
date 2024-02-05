"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _app = require("./app.routes");

var _user = _interopRequireDefault(require("./user.routes"));

var _category = _interopRequireDefault(require("./category.routes"));

var _product = _interopRequireDefault(require("./product.routes"));

var _allocation = _interopRequireDefault(require("./allocation.routes"));

var _combo = _interopRequireDefault(require("./combo.routes"));

var router = _express["default"].Router();

router.use(_app.moduleRoutes.user, _user["default"]);
router.use(_app.moduleRoutes.category, _category["default"]);
router.use(_app.moduleRoutes.product, _product["default"]);
router.use(_app.moduleRoutes.allocation, _allocation["default"]);
router.use(_app.moduleRoutes.combo, _combo["default"]); // Redirect when no route matches (Wildcard)

router.use('/*', function (req, res, next) {
  next({
    status: 404,
    message: "The page not found!"
  });
});
var _default = router;
exports["default"] = _default;