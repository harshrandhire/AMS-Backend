"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _category = _interopRequireDefault(require("../validators/category.validator"));

var _category2 = _interopRequireDefault(require("../controllers/category.controller"));

var _app = require("./app.routes");

var _validateRequest = _interopRequireDefault(require("../middleware/validateRequest.middleware"));

var _auth = _interopRequireDefault(require("../middleware/auth.middleware"));

var router = _express["default"].Router();

// Company routes // 
router.get(_app.categoryRoutes.category_list.path, [_auth["default"]], _category2["default"].categoryList);
router.get(_app.categoryRoutes.category_details.path, [_auth["default"]], _category2["default"].categoryDetails);
router.get(_app.categoryRoutes.profile.path, [_auth["default"]], _category2["default"].categoryProfile); //get stock

router.post(_app.categoryRoutes.stock.path, _category2["default"].generateStock);
router.post(_app.categoryRoutes.create.path, [_auth["default"], _category["default"].createCategory(), _validateRequest["default"]], _category2["default"].createCategory);
router.patch(_app.categoryRoutes.update.path, [_auth["default"], _category["default"].createCategory(), _validateRequest["default"]], _category2["default"].updateCategory);
router.patch(_app.categoryRoutes.status_change.path, [_auth["default"], _validateRequest["default"]], _category2["default"].changestatus);
router["delete"](_app.categoryRoutes["delete"].path, [_auth["default"], _validateRequest["default"]], _category2["default"].deleteCategory);
router["delete"](_app.categoryRoutes.multiple_delete.path, [_auth["default"], _validateRequest["default"]], _category2["default"].multipleDeleteCategory);
var _default = router;
exports["default"] = _default;