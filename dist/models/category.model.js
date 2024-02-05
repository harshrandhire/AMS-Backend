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
  var categoryDetails = sequelize.define("categoryDetails", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    category_name: {
      type: _sequelize["default"].STRING,
      validate: {
        notEmpty: {
          msg: "category name is required"
        },
        isUnique: _dbHelper["default"].isUnique("categoryDetails", "category_name", {
          msg: "category name is already in use"
        })
      }
    },
    status: {
      type: _sequelize["default"].INTEGER,
      defaultValue: _appConstants.commonStatuses.INACTIVE.id
    }
  }, {
    tableName: "Categories",
    updatedAt: "updated_at",
    createdAt: "created_at"
  }); // Modal associations

  categoryDetails.associate = function (models) {
    // modal associations goes here...
    models.categoryDetails.hasOne(models.ProductDetails, {
      foreignKey: "category_id"
    });
    /* models.categoryDetails.hasOne(models.allocationDetails,{
        foreignKey: "category_id"
    }); */
  };

  return categoryDetails;
};

exports["default"] = _default;