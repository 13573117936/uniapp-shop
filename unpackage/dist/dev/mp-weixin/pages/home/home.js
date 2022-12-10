"use strict";
var common_vendor = require("../../common/vendor.js");
var http_service = require("../../http/service.js");
var utils_utils = require("../../utils/utils.js");
const _sfc_main = {
  data() {
    return {
      swiperList: [],
      navList: [],
      floorList: []
    };
  },
  onLoad() {
    this.getSwiperList();
    this.getNavList();
    this.getFloorList();
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
      if (res.meta.status !== 200) {
        return utils_utils.showMsg();
      }
      this.navList = res.message;
    },
    async getFloorList() {
      const {
        data: res
      } = await http_service.api.get("/api/public/v1/home/floordata");
      if (res.meta.status !== 200) {
        return utils_utils.showMsg();
      }
      res.message.forEach((floor) => {
        floor.product_list.forEach((item) => {
          item.url = "/subpkg/goods_list/goods_list?" + item.navigator_url.split("?")[1];
        });
      });
      console.log(res.message);
      this.floorList = res.message;
    },
    navClickHandler(item) {
      common_vendor.index.switchTab({
        url: "/pages/cate/cate"
      });
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
        b: index,
        c: common_vendor.o(($event) => $options.navClickHandler(item), index)
      };
    }),
    c: common_vendor.f($data.floorList, (item, index, i0) => {
      return {
        a: item.floor_title.image_src,
        b: item.product_list[0].image_src,
        c: item.product_list[0].image_width + "rpx",
        d: item.product_list[0].url,
        e: common_vendor.f(item.product_list, (item2, index2, i1) => {
          return common_vendor.e({
            a: index2 !== 0
          }, index2 !== 0 ? {
            b: item2.image_src,
            c: item2.image_width + "rpx"
          } : {}, {
            d: item2.url,
            e: index2
          });
        }),
        f: index
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Project/uni-app/uni-shop/uni-shop/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
