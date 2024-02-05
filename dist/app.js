"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _http = _interopRequireDefault(require("http"));

var _lodash = _interopRequireDefault(require("lodash"));

var _index = _interopRequireDefault(require("./routes/index"));

var _app = require("./routes/app.routes");

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _cookieParser["default"])());
app.use((0, _expressFileupload["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../assets'))); // End point of API

app.use(_app.API_PREFIXED, _index["default"]); // testing routes for dev

app.get('/', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var payload;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            payload = {
              "api.v1": "1.0.0",
              "healthCheck": "Ok"
            };
            res.status(200).send(payload);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()); // catch 404 and forward to error handler.

app.use(function (req, res, next) {
  next({
    status: 404,
    message: "Not Found!"
  });
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.status(err.status || 500).json({
    "status": err.status || 500,
    "message": err.message ? err.message : "Something went wrong."
  });
}); // Initialize the Server

/**
 * Get port from environment and store in Express.
 */

var PORT = process.env.PORT;
app.set("port", PORT);
/**
 * Create HTTP server.
 */

var server = _http["default"].createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */


server.listen(PORT);
server.on('error', function (error) {
  switch (error.code) {
    case 'EACCES':
      console.error("".concat(PORT, " requires elevated privileges"));

    case 'EADDRINUSE':
      console.error("".concat(PORT, " is already in use"));

    default:
      console.log("error ===", error);
  }
});
server.on('listening', function () {
  return console.log("App listening on ".concat(PORT));
});