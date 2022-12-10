"use strict";
var common_vendor = require("../common/vendor.js");
const api = common_vendor.$http;
api.baseUrl = "https://www.uinav.com";
api.beforeRequest = function() {
  common_vendor.index.showLoading({
    title: "\u52A0\u8F7D\u4E2D..."
  });
};
api.afterRequest = function() {
  common_vendor.index.hideLoading();
};
exports.api = api;
