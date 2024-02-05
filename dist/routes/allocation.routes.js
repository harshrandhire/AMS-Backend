"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _allocation = _interopRequireDefault(require("../validators/allocation.validator"));

var _allocation2 = _interopRequireDefault(require("../controllers/allocation.controller"));

var _app = require("./app.routes");

var _validateRequest = _interopRequireDefault(require("../middleware/validateRequest.middleware"));

var _auth = _interopRequireDefault(require("../middleware/auth.middleware"));

var router = _express["default"].Router();

// Allocation routes // 
// router.get(allocationRoutes.combo_details.path, /* [authMiddleware], */allocationController.categoryDetails);
// router.get(allocationRoutes.profile.path,/* [authMiddleware], */ allocationController.categoryProfile);
router.post(_app.allocationRoutes.create.path, [_auth["default"], _allocation["default"].createAllocation(), _validateRequest["default"]], _allocation2["default"].createAllocation);
router.get(_app.allocationRoutes.get.path, _allocation2["default"].getAllocation);
router.get(_app.allocationRoutes.allocation_details.path, _allocation2["default"].allocationDetails);
router["delete"](_app.allocationRoutes["delete"].path, [_auth["default"], _validateRequest["default"]], _allocation2["default"].deleteAllocation);
router.patch(_app.allocationRoutes.update.path, [_auth["default"], _allocation["default"].createAllocation(), _validateRequest["default"]], _allocation2["default"].updateAllocation);
var _default = router;
exports["default"] = _default;