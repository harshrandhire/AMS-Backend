"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _default = function _default(sequelize, DataTypes) {
  var User_roles = sequelize.define("User_roles", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    role: {
      type: _sequelize["default"].STRING,
      validate: {
        notEmpty: {
          msg: "User role is Required"
        }
      }
    }
  }, {
    tableName: "user_roles",
    updatedAt: "updated_at",
    createdAt: "created_at"
  }); // Modal associations

  User_roles.associate = function (models) {
    // modal associations goes here...
    models.User_roles.hasOne(models.UserDetails, {
      foreignKey: "user_role_id"
    });
  };

  return User_roles;
};

exports["default"] = _default;