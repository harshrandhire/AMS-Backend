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
  var comboDetails = sequelize.define("comboDetails", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    allocation_id: {
      type: _sequelize["default"].INTEGER,
      validate: {
        notEmpty: {
          msg: "allocation id is required"
        }
      }
    },
    product_id: {
      type: _sequelize["default"].INTEGER,
      validate: {
        notEmpty: {
          msg: "product_id is required"
        },
        isUnique: _dbHelper["default"].isUnique("comboDetails", "product_id", {
          msg: "product_id is already in use"
        })
      }
    },
    status: {
      type: _sequelize["default"].INTEGER,
      defaultValue: _appConstants.commonStatuses.INACTIVE.id
    }
  }, {
    tableName: "combo",
    updatedAt: "updated_at",
    createdAt: "created_at"
  }); // Modal associations

  comboDetails.associate = function (models) {
    // modal associations goes here...
    models.comboDetails.belongsTo(models.allocationDetails, {
      foreignKey: "allocation_id"
    });
    models.comboDetails.belongsTo(models.ProductDetails, {
      foreignKey: "product_id"
    });
  };

  return comboDetails;
};

exports["default"] = _default;