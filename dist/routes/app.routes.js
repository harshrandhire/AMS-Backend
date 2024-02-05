"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRoutes = exports.productRoutes = exports.moduleRoutes = exports.comboRoutes = exports.categoryRoutes = exports.allocationRoutes = exports.API_PREFIXED = void 0;
// API Prefixed from where application starts pointing
var API_PREFIXED = "/api";
/**
 * Module routes
 *
 */

exports.API_PREFIXED = API_PREFIXED;
var moduleRoutes = {
  user: "/user",
  category: "/category",
  product: "/product",
  allocation: "/allocation",
  combo: "/combo"
};
/**
 * Generate User router routes
 *
 */

exports.moduleRoutes = moduleRoutes;
var userRoutes = {
  login: {
    path: "/login"
  },
  logout: {
    path: "/logout"
  },
  create: {
    path: "/create"
  },
  changePassword: {
    path: "/change-password"
  },
  profile: {
    path: "/:id"
  },
  update: {
    path: "/:id"
  },
  "delete": {
    path: "/:id"
  },
  emp_profile: {
    path: "/emp/:id"
  },
  users: {
    path: "/"
  },

  /* category_list: {
    path: "/list",
  }, */
  status_change: {
    path: "/status/:id"
  }
};
exports.userRoutes = userRoutes;
var categoryRoutes = {
  profile: {
    path: "/:id"
  },
  update: {
    path: "/:id"
  },
  "delete": {
    path: "/:id"
  },
  multiple_delete: {
    path: "/"
  },
  create: {
    path: "/create"
  },
  category_list: {
    path: "/list"
  },
  stock: {
    path: "/stock"
  },
  category_details: {
    path: "/"
  },
  status_change: {
    path: "/status/:id"
  }
};
exports.categoryRoutes = categoryRoutes;
var productRoutes = {
  profile: {
    path: "/:id"
  },
  update: {
    path: "/:id"
  },
  "delete": {
    path: "/:id"
  },
  create: {
    path: "/create"
  },
  product_details: {
    path: "/"
  },
  status_change: {
    path: "/status/:id"
  }
};
exports.productRoutes = productRoutes;
var allocationRoutes = {
  get: {
    path: "/:id"
  },
  update: {
    path: "/:id"
  },
  "delete": {
    path: "/:id"
  },
  create: {
    path: "/create"
  },
  allocation_details: {
    path: "/"
  }
};
exports.allocationRoutes = allocationRoutes;
var comboRoutes = {
  get: {
    path: "/:id"
  },
  update: {
    path: "/:id"
  },
  "delete": {
    path: "/:id"
  },
  create: {
    path: "/create"
  },
  combo_details: {
    path: "/"
  }
};
exports.comboRoutes = comboRoutes;