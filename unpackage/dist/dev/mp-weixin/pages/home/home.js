"use strict";
var http_service = require("../../http/service.js");
var utils_utils = require("../../utils/utils.js");
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      swiperList: [],
      navList: []
    };
  },
  onLoad() {
    this.getSwiperList();
    this.getNavList();
  },
  methods: {
    async getSwiperList() {
      const {
        data: res
      } = await http_service.api.get("/api/public/v1/home/swiperdata");
      if (res.meta.status !== 200) {
        return utils_utils.showMsg();
      }
      this.swiperList = res.message;
    },
    async getNavList() {
      const {
        data: res
      } = await http_service.api.get("/api/public/v1/home/catitems");
      console.log(res.message);
      if (res.meta.status !== 200) {
        return utils_utils.showMsg();
      }
      this.navList = res.message;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.swiperList, (item, index, i0) => {
      return {
        a: item.image_src,
        b: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id,
        c: index
      };
    }),
    b: common_vendor.f($data.navList, (item, index, i0) => {
      return {
        a: item.image_src,
        b: index
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Project/uni-app/uni-shop/uni-shop/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
