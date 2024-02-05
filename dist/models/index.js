'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _nodeNotifier = _interopRequireDefault(require("node-notifier"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _lodash = require("lodash");

var basename = _path["default"].basename(__filename);

var _ = {
  get: _lodash.get
};
var db = {};

var HOST = _.get(process, "env.DB_HOST", "192.168.0.1");

var USERNAME = _.get(process, "env.DB_USERNAME", "root");

var PASSWORD = _.get(process, "env.DB_PASSWORD", "root");

var DATABASE = _.get(process, "env.DB_DATABASE", "db_name");

var ENV = _.get(process, "env.APP_ENV", "local");

var TIME_ZONE = "+05:30";
var sequelize = new _sequelize["default"](DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  dialect: 'mysql',
  logging: ENV === 'local' ? console.log : false,
  // logging: false,
  dialectOptions: {
    // useUTC: false, //for reading from database
    charset: 'utf8mb4',
    dateStrings: true,
    typeCast: function typeCast(field, next) {
      // for reading from database
      if (field.type === 'DATETIME') {
        return field.string();
      }

      return next();
    }
  },
  timezone: TIME_ZONE
});

try {
  // Attempt to connect to the database
  sequelize.authenticate().then(function (conn) {
    console.log("Connection has been established successfully");

    if (ENV === 'local') {
      _nodeNotifier["default"].notify({
        title: "Success",
        message: "🔥 Successfully compiled files..."
      });
    }
  })["catch"](function (err) {
    return console.error("Unable to connect to the database:", err);
  });
} catch (error) {
  console.error('Unable to connect to the database:', error.message);
} // Import all models and its relationships


_fs["default"].readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-9) === '.model.js';
}).forEach(function (file) {
  var model = sequelize['import'](_path["default"].join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = _sequelize["default"]; // drop the table if it already exists

/* db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  sequelize.query("INSERT INTO `user_roles` (`id`, `role`, `created_at`, `updated_at`) VALUES (NULL, 'admin', NOW(), NOW()), (NULL, 'hr', NOW(), NOW()),  (NULL, 'employee', NOW(), NOW())")
}); */
// sequelize.query("INSERT INTO `user_details` (`id`, `user_role_id`, `token`, `email`, `password`, `first_name`, `last_name`, `phone`, `dob`, `status`, `email_verified`, `email_verified_at`, `email_verification_code`, `updated_by`, `created_by`, `created_at`, `updated_at`) VALUES (NULL, '1', NULL, 'admin@gmail.com', '$2b$12$J5xmzmUhWzgoTJ1fiGzjxeY3emGyK3jUVNoLMMvXgIMiZrbwVCBaO', 'Ram', 'Van', '7069989488', '1999-08-18', '0', '1', '2022-03-17 12:45:03.000000', NULL, NULL, NULL, '2022-03-17 12:45:03.000000', '2022-03-17 12:45:03.000000')")
// The export will have all initialized Models + sequelize connection + Sequelize Object it self

var _default = db;
exports["default"] = _default;