"use strict";
var common_vendor = require("../common/vendor.js");
function showMsg(title = "\u6570\u636E\u8BF7\u6C42\u5931\u8D25\uFF01", duration = 1500) {
  common_vendor.index.showToast({
    title,
    duration,
    icon: "none"
  });
}
exports.showMsg = showMsg;
