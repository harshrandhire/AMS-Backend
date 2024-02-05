"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _dbHelper = _interopRequireDefault(require("../common/dbHelper"));

var _appConstants = require("../common/appConstants");

var _default = function _default(sequelize, DataTypes) {
  var allocationDetails = sequelize.define("allocationDetails", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    combo_id: {
      type: _sequelize["default"].STRING,
      unique: true,
      validate: {
        notEmpty: {
          msg: "combo id is required"
        }
      },
      comment: '(combo id KOLI0001)'
    },
    employee_id: {
      type: _sequelize["default"].INTEGER,
      validate: {
        notEmpty: {
          msg: "employee_id is required"
        },
        isUnique: _dbHelper["default"].isUnique("allocationDetails", "employee_id", {
          msg: "employee_id is already in use"
        })
      }
    },
    status: {
      type: _sequelize["default"].INTEGER,
      defaultValue: _appConstants.commonStatuses.INACTIVE.id
    }
  }, {
    tableName: "allocations",
    updatedAt: "updated_at",
    createdAt: "created_at"
  }); // Modal associations

  allocationDetails.associate = function (models) {
    // modal associations goes here...
    models.allocationDetails.belongsTo(models.UserDetails, {
      foreignKey: "employee_id"
    });
    models.allocationDetails.hasOne(models.comboDetails, {
      foreignKey: "allocation_id"
    });
  };

  return allocationDetails;
};

exports["default"] = _default;