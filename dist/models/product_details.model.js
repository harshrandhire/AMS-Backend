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
  var ProductDetails = sequelize.define("ProductDetails", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    category_id: {
      type: _sequelize["default"].INTEGER,
      // defaultValue: userRoles.VENDOR_ROLE.id,
      validate: {
        notEmpty: {
          msg: "category_id is Required"
        }
      }
    },
    product_name: {
      type: _sequelize["default"].STRING,
      validate: {
        notEmpty: {
          msg: "Product name is required"
        }
      }
    },
    purchase_date: {
      type: _sequelize["default"].DATEONLY,
      defaultStatus: null,
      validate: {
        notEmpty: {
          msg: "Purchase date is required"
        }
      }
    },

    /*  product_qty: {
         type: Sequelize.INTEGER,
         validate: {
             notEmpty: { msg: "qty is Required" },
         },
     }, */
    product_description: {
      type: _sequelize["default"].TEXT,
      validate: {
        notEmpty: {
          msg: "Product description is required"
        }
      }
    },
    product_cost: {
      type: _sequelize["default"].INTEGER,
      // defaultValue: userRoles.VENDOR_ROLE.id,
      validate: {
        notEmpty: {
          msg: "assign to is Required"
        }
      }
    },
    status: {
      type: _sequelize["default"].INTEGER,
      defaultValue: _appConstants.commonStatuses.INACTIVE.id
    }
  }, {
    tableName: "product_details",
    updatedAt: "updated_at",
    createdAt: "created_at"
  }); // Modal associations

  ProductDetails.associate = function (models) {
    models.ProductDetails.belongsTo(models.categoryDetails, {
      foreignKey: "category_id"
    });
    models.ProductDetails.hasOne(models.comboDetails, {
      foreignKey: "product_id"
    });
  };

  return ProductDetails;
};

exports["default"] = _default;