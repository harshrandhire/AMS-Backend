"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _nodeCron = _interopRequireDefault(require("node-cron"));

/**
* Empty tmp folder from physical location
* Run @ Every morning 3:00 am
*
* @return Void
*/
_nodeCron["default"].schedule("0 * * * *", function () {
  console.log("cron job started ---------------");
});