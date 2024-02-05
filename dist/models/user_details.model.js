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
  var UserDetails = sequelize.define("UserDetails", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_role_id: {
      type: _sequelize["default"].INTEGER,
      // defaultValue: userRoles.VENDOR_ROLE.id,
      validate: {
        notEmpty: {
          msg: "User role is Required"
        }
      }
    },
    token: {
      type: _sequelize["default"].TEXT,
      defaultStatus: null
    },
    email: {
      type: _sequelize["default"].STRING,
      validate: {
        isEmail: {
          msg: "Valid email address is required"
        },
        notEmpty: {
          msg: "Email is required"
        }
        /* isUnique: dbHelper.isUnique("UserDetails", "email", {
            msg: "email is already in use"
        }) */

      }
    },
    password: {
      type: _sequelize["default"].STRING,
      validate: {
        notEmpty: {
          msg: "Password is required"
        }
      }
    },
    first_name: {
      type: _sequelize["default"].STRING,
      validate: {
        notEmpty: {
          msg: "First name is required"
        }
      }
    },
    last_name: {
      type: _sequelize["default"].STRING,
      validate: {
        notEmpty: {
          msg: "Last name is required"
        }
      }
    },
    phone: {
      type: _sequelize["default"].STRING,

      /* unique: true, */
      validate: {
        notEmpty: {
          msg: "phone number is required"
        }
        /* isUnique: dbHelper.isUnique("UserDetails", "phone", {
            msg: "Phone number is already in use"
        }) */

      }
    },
    dob: {
      type: _sequelize["default"].DATEONLY,
      defaultStatus: null,
      validate: {
        notEmpty: {
          msg: "birth-Date is required"
        }
      }
    },
    status: {
      type: _sequelize["default"].INTEGER,
      defaultValue: _appConstants.commonStatuses.INACTIVE.id
    },
    email_verified: {
      type: _sequelize["default"].INTEGER,
      defaultValue: 0
    },
    email_verified_at: {
      type: _sequelize["default"].DATE,
      defaultValue: null
    },
    email_verification_code: {
      type: _sequelize["default"].STRING,
      defaultValue: null
    },
    updated_by: {
      type: _sequelize["default"].STRING,
      defaultValue: null
    },
    created_by: {
      type: _sequelize["default"].STRING,
      defaultValue: null
    }
  }, {
    tableName: "user_details",
    updatedAt: "updated_at",
    createdAt: "created_at"
  }); // Modal associations

  UserDetails.associate = function (models) {
    models.UserDetails.belongsTo(models.User_roles, {
      foreignKey: "user_role_id"
    });
    models.UserDetails.hasOne(models.allocationDetails, {
      foreignKey: "employee_id"
    });
  };

  return UserDetails;
};

exports["default"] = _default;