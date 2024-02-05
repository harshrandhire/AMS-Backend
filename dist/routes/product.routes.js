"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _product = _interopRequireDefault(require("../validators/product.validator"));

var _product2 = _interopRequireDefault(require("../controllers/product.controller"));

var _app = require("./app.routes");

var _validateRequest = _interopRequireDefault(require("../middleware/validateRequest.middleware"));

var _auth = _interopRequireDefault(require("../middleware/auth.middleware"));

var router = _express["default"].Router();

// Company routes // 
router.get(_app.productRoutes.product_details.path, [_auth["default"]], _product2["default"].productDetails);
router.get(_app.productRoutes.profile.path, [_auth["default"]], _product2["default"].productProfile);
router.post(_app.productRoutes.create.path, [_auth["default"], _product["default"].createProduct(), _validateRequest["default"]], _product2["default"].createProduct);
router.patch(_app.productRoutes.update.path, [_auth["default"], _product["default"].createProduct(), _validateRequest["default"]], _product2["default"].updateProduct);
router.patch(_app.productRoutes.status_change.path,
/* [authMiddleware,validateRequest], */
_product2["default"].changestatus);
router["delete"](_app.productRoutes["delete"].path, [_auth["default"], _validateRequest["default"]], _product2["default"].deleteProduct);
var _default = router;
exports["default"] = _default;