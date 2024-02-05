"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _statusConstants = _interopRequireDefault(require("../common/statusConstants"));

var _lodash = _interopRequireWildcard(require("lodash"));

var _models = _interopRequireDefault(require("../models"));

var _appConfig = _interopRequireDefault(require("../common/appConfig"));

var _appConstants = require("../common/appConstants");

var _helper = _interopRequireDefault(require("../common/helper"));

var _dbHelper = _interopRequireDefault(require("../common/dbHelper"));

var _modelConstants = _interopRequireDefault(require("../common/modelConstants"));

var _sequelize = _interopRequireWildcard(require("sequelize"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

// import EmailServices from "./email.services"

/**
 *Single Company detail
 *
 * @param Request request
 */
var categoryProfile = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(payload) {
    var responseData, categoryId, categoryData, categoryInfo;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            responseData = _statusConstants["default"].fetchResourceError;
            _context.prev = 1;
            categoryId = _lodash["default"].get(payload, "categoryId", ""); // console.log("categoryId>>>>>>>..",categoryId);

            _context.next = 5;
            return _models["default"].categoryDetails.findOne({
              where: {
                id: categoryId
              }
            });

          case 5:
            categoryData = _context.sent;
            categoryInfo = _lodash["default"].get(categoryData, "dataValues", {});

            if (categoryData) {
              responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].fetchSucccess), {}, {
                message: "category fetch successfully",
                success: true,
                categoryInfo: categoryInfo
              });
            } else {
              responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
                message: "category does not exist",
                success: false
              });
            }

            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "category not found",
              success: false
            });

          case 13:
            return _context.abrupt("return", responseData);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 10]]);
  }));

  return function categoryProfile(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Category Details
 *
 * @param Request request
 */


var categoryDetails = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
    var responseData, entityParams, searchText, defaultWhere, entityPagination, categoryDeatail, pagination;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            entityParams = _lodash["default"].get(req, "query", {});
            searchText = _lodash["default"].get(entityParams, "q", ""); // console.log("categoryDetails>>>>>>>",entityParams);

            defaultWhere = {
              status: 1
            };

            if (_lodash["default"].has(entityParams, "q") && !_lodash["default"].isEmpty(searchText)) {
              defaultWhere = (0, _defineProperty2["default"])({
                status: 1
              }, _sequelize.Op.or, {
                category_name: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(searchText, "%")),
                id: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(searchText, "%"))
              });
            }

            _context2.prev = 5;
            entityPagination = _helper["default"].dataPagination(entityParams);
            _context2.next = 9;
            return _models["default"].categoryDetails.findAndCountAll({
              attributes: _modelConstants["default"].categoryDeatail,
              where: defaultWhere,
              offset: entityPagination.offset,
              limit: entityPagination.limit,
              order: [['id', 'DESC']]
            });

          case 9:
            categoryDeatail = _context2.sent;
            // const categoryDeatail = await models.categoryDetails.findAll({});
            // console.log(">>>>>>>>>>><<><<><>",categoryDeatail);
            pagination = entityPagination.pagination;
            pagination["totalPages"] = Math.ceil((categoryDeatail || categoryDeatail).count / pagination.pageSize);
            pagination["pageRecords"] = ((categoryDeatail || {}).rows || []).length || 0;
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              success: true,
              pagination: pagination,
              data: categoryDeatail
            });
            _context2.next = 19;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](5);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context2.t0.message
            });

          case 19:
            return _context2.abrupt("return", responseData);

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 16]]);
  }));

  return function categoryDetails(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Category category_List
 *
 * @param Request request
 */


var categoryList = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req) {
    var responseData, entityParams, searchText, defaultWhere, entityPagination, _categoryList, pagination;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            entityParams = _lodash["default"].get(req, "query", {});
            searchText = _lodash["default"].get(entityParams, "q", "");
            defaultWhere = {
              /*  status: 1 */
            };

            if (_lodash["default"].has(entityParams, "q") && !_lodash["default"].isEmpty(searchText)) {
              defaultWhere = (0, _defineProperty2["default"])({}, _sequelize.Op.or, {
                category_name: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(searchText, "%")),
                id: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(searchText, "%"))
              });
            }

            _context3.prev = 5;
            entityPagination = _helper["default"].dataPagination(entityParams);
            _context3.next = 9;
            return _models["default"].categoryDetails.findAll({
              attributes: _modelConstants["default"].category_List,
              where: defaultWhere,
              offset: entityPagination.offset,
              limit: entityPagination.limit,
              order: [['id', 'DESC']]
            });

          case 9:
            _categoryList = _context3.sent;
            pagination = entityPagination.pagination;
            pagination["totalPages"] = Math.ceil(((_categoryList || {}).count || 0) / pagination.pageSize);
            pagination["pageRecords"] = ((_categoryList || {}).rows || []).length || 0;
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              success: true,
              data: _categoryList
            });
            _context3.next = 19;
            break;

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](5);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context3.t0.message
            });

          case 19:
            return _context3.abrupt("return", responseData);

          case 20:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[5, 16]]);
  }));

  return function categoryList(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 *Update Category detail
 *
 * @param Request request
 */


var updateCategory = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req) {
    var responseData, categoryId, data, category, categoryUpdatePayload;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            categoryId = _lodash["default"].get(req, "params.id", 0);
            data = _lodash["default"].get(req, "body", {});
            _context4.prev = 3;
            _context4.next = 6;
            return _models["default"].categoryDetails.findOne({
              where: {
                id: categoryId
              }
            });

          case 6:
            category = _context4.sent;

            if (category) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "category not found",
              success: false
            }));

          case 11:
            categoryUpdatePayload = {
              category_name: data.category_name || "",
              status: _appConstants.commonStatuses.ACTIVE.id
            };
            category.update(_objectSpread({}, categoryUpdatePayload));

          case 13:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              message: "Category udated successfully",
              success: true
            });
            _context4.next = 19;
            break;

          case 16:
            _context4.prev = 16;
            _context4.t0 = _context4["catch"](3);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context4.t0.message
            });

          case 19:
            return _context4.abrupt("return", responseData);

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 16]]);
  }));

  return function updateCategory(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 *Delete Category
 *
 * @param Request request
 */


var deleteCategory = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
    var responseData, category;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            _context5.prev = 1;
            _context5.next = 4;
            return _models["default"].categoryDetails.findOne({
              where: {
                id: id
              }
            });

          case 4:
            category = _context5.sent;

            if (category) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "category not found",
              success: false
            }));

          case 9:
            category.update({
              status: _appConstants.commonStatuses.INACTIVE.id
            });

          case 10:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              message: "category deleted successfully",
              success: true
            });
            _context5.next = 16;
            break;

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](1);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context5.t0.message
            });

          case 16:
            return _context5.abrupt("return", responseData);

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 13]]);
  }));

  return function deleteCategory(_x5) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * Category registrasion
 *
 * @param Request request
 */


var createCategory = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req) {
    var responseData, data, categoryPayload, _categoryDetails, errors;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            data = _lodash["default"].get(req, "body", {});
            _context6.prev = 2;
            categoryPayload = {
              category_name: data.category_name || "",
              status: _appConstants.commonStatuses.ACTIVE.id
            }; // Create new Category entity

            _context6.next = 6;
            return _models["default"].categoryDetails.create(categoryPayload, {
              raw: true
            });

          case 6:
            _categoryDetails = _context6.sent;

            if (_categoryDetails) {
              _context6.next = 11;
              break;
            }

            throw new Error("Unable to create new Category");

          case 11:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              message: "Category create successfully",
              success: true,
              data: _categoryDetails
            });

          case 12:
            _context6.next = 19;
            break;

          case 14:
            _context6.prev = 14;
            _context6.t0 = _context6["catch"](2);
            errors = {}; // Default message

            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context6.t0.message
            });

            try {
              if (["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(_context6.t0.name)) {
                errors = _dbHelper["default"].formatSequelizeErrors(_context6.t0);
                responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error1), {}, {
                  success: false
                });
              }
            } catch (error) {
              responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
                message: error.message
              });
            }

          case 19:
            return _context6.abrupt("return", responseData);

          case 20:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 14]]);
  }));

  return function createCategory(_x6) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * Multiple Delete Category
 *
 * @param Request request
 */


var multipleDeleteCategory = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(data) {
    var responseData, ID, category;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            ID = JSON.parse(data.id);
            _context7.prev = 2;
            _context7.next = 5;
            return _models["default"].categoryDetails.findAll({
              where: {
                id: (0, _defineProperty2["default"])({}, _sequelize.Op["in"], ID)
              }
            });

          case 5:
            category = _context7.sent;

            if (category) {
              _context7.next = 10;
              break;
            }

            return _context7.abrupt("return", _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "category not found",
              success: false
            }));

          case 10:
            category.map(function (result) {
              result.update({
                status: _appConstants.commonStatuses.INACTIVE.id
              });
            });

          case 11:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              message: "category deleted successfully",
              success: true
            });
            _context7.next = 17;
            break;

          case 14:
            _context7.prev = 14;
            _context7.t0 = _context7["catch"](2);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context7.t0.message
            });

          case 17:
            return _context7.abrupt("return", responseData);

          case 18:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[2, 14]]);
  }));

  return function multipleDeleteCategory(_x7) {
    return _ref7.apply(this, arguments);
  };
}();
/**
 * Get Stock
 *
 * @param Request request
 */


var generateStock = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req) {
    var responseData, stock, stockdetails, assingCombo, proId, productID, ProductDetails, assignstockdetails, kk, assign, test;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            _context8.prev = 1;
            _context8.next = 4;
            return _models["default"].ProductDetails.findAll({
              attributes: ["category_id", [_sequelize["default"].fn("COUNT", _sequelize["default"].col("category_id")), "Stock"]],
              //attributes: {exclude: ['category_id']},
              include: [{
                model: _models["default"].categoryDetails,
                attributes: _modelConstants["default"].category_List
              }],
              group: "category_id"
            });

          case 4:
            stock = _context8.sent;
            stockdetails = stock.map(function (result) {
              var data = result.dataValues;
              return data;
            }); //Assined product

            _context8.next = 8;
            return _models["default"].comboDetails.findAll({});

          case 8:
            assingCombo = _context8.sent;
            proId = [];
            productID = assingCombo.map(function (result) {
              var data = result.dataValues.product_id;
              proId.push(data);
            });
            _context8.next = 13;
            return _models["default"].ProductDetails.findAll({
              where: {
                id: (0, _defineProperty2["default"])({}, _sequelize.Op["in"], proId)
              },
              attributes: ["category_id", [_sequelize["default"].fn("COUNT", _sequelize["default"].col("category_id")), "AssingStock"]],
              include: [{
                model: _models["default"].categoryDetails,
                attributes: _modelConstants["default"].category_List
              }],
              group: "category_id"
            });

          case 13:
            ProductDetails = _context8.sent;
            assignstockdetails = ProductDetails.map(function (result) {
              var data = result.dataValues;
              return data;
            }); //stockdetails = stockdetails.map(stockdetails => { return _.omit(stockdetails, ['category_id']) }); //omit category id

            kk = stockdetails.map(function (data1) {
              return data1.CategoryName = data1.categoryDetail.category_name;
            });
            stockdetails = stockdetails.map(function (data) {
              return _lodash["default"].omit(data, ["categoryDetail"]);
            }); //assignstockdetails = assignstockdetails.map(assignstockdetails => { return _.omit(assignstockdetails, ['category_id']) }); //omit category id

            assign = assignstockdetails.map(function (data2) {
              return data2.CategoryName = data2.categoryDetail.category_name;
            });
            assignstockdetails = assignstockdetails.map(function (data) {
              return _lodash["default"].omit(data, ["categoryDetail"]);
            }); // const arr = [];
            // stockdetails.map(item => {
            //   arr.push(item.category_id)
            // })
            // console.log("----------->", arr);
            // console.log("startingStock>>>>>>>>", stockdetails);
            // console.log("AssigningStock>>>>>>>>", assignstockdetails);
            // let stockManage = {
            //   startingStock: stockdetails,
            //   AssigningStock: assignstockdetails,
            // }
            // let arry = []

            test = _lodash["default"].merge(stockdetails, assignstockdetails);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              success: true,
              data: test
            });
            _context8.next = 26;
            break;

          case 23:
            _context8.prev = 23;
            _context8.t0 = _context8["catch"](1);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context8.t0.message
            });

          case 26:
            return _context8.abrupt("return", responseData);

          case 27:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 23]]);
  }));

  return function generateStock(_x8) {
    return _ref8.apply(this, arguments);
  };
}();
/**
 * Change Status category
 *
 * @param Request request
 */


var statusChange = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(data) {
    var responseData, categoryId, category, statuschange;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            responseData = _statusConstants["default"].error;
            categoryId = data;
            _context9.prev = 2;
            _context9.next = 5;
            return _models["default"].categoryDetails.findOne({
              where: {
                id: categoryId
              }
            });

          case 5:
            category = _context9.sent;

            if (category) {
              _context9.next = 10;
              break;
            }

            return _context9.abrupt("return", _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: "Category not found",
              success: false
            }));

          case 10:
            if (category.status == 1) {
              statuschange = _appConstants.commonStatuses.INACTIVE.id;
            } else {
              statuschange = _appConstants.commonStatuses.ACTIVE.id;
            }

            category.update({
              status: statuschange
            });

          case 12:
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].success), {}, {
              message: "Status Changed",
              success: true
            });
            _context9.next = 18;
            break;

          case 15:
            _context9.prev = 15;
            _context9.t0 = _context9["catch"](2);
            responseData = _objectSpread(_objectSpread({}, _statusConstants["default"].error), {}, {
              message: _context9.t0.message
            });

          case 18:
            return _context9.abrupt("return", responseData);

          case 19:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[2, 15]]);
  }));

  return function statusChange(_x9) {
    return _ref9.apply(this, arguments);
  };
}();

var CategoryServices = {
  categoryProfile: categoryProfile,
  categoryDetails: categoryDetails,
  categoryList: categoryList,
  createCategory: createCategory,
  updateCategory: updateCategory,
  deleteCategory: deleteCategory,
  multipleDeleteCategory: multipleDeleteCategory,
  generateStock: generateStock,
  statusChange: statusChange
};
var _default = CategoryServices;
exports["default"] = _default;