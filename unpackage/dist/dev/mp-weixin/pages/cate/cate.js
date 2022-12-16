"use strict";
var common_vendor = require("../../common/vendor.js");
var http_service = require("../../http/service.js");
var utils_utils = require("../../utils/utils.js");
const _sfc_main = {
  data() {
    return {
      wh: 0,
      cateList: [],
      active: 0,
      cateLevel2: []
    };
  },
  onLoad() {
    const sysInfo = common_vendor.index.getSystemInfoSync();
    this.wh = sysInfo.windowHeight - 50;
    this.getCateList();
  },
  methods: {
    async getCateList() {
      const {
        data: res
      } = await http_service.api.get("/api/public/v1/categories");
      if (res.meta.status !== 200) {
        utils_utils.showMsg();
      }
      this.cateList = res.message;
      this.cateLevel2 = res.message[0].children;
    },
    activeChange(index) {
      this.active = index;
      this.cateLevel2 = this.cateList[index].children;
      console.log(this.cateLevel2);
    },
    imageUrl(url) {
      const arr = url.split("dev");
      return arr[0] + "web" + arr[1];
    },
    gotoGoodsList(item) {
      common_vendor.index.navigateTo({
        url: "/subpkg/goods_list/goods_list?cid=" + item.cat_id
      });
    },
    gotoSearch() {
      common_vendor.index.navigateTo({
        url: "/subpkg/search/search"
      });
    }
  }
};
if (!Array) {
  const _easycom_SearchBar2 = common_vendor.resolveComponent("SearchBar");
  _easycom_SearchBar2();
}
const _easycom_SearchBar = () => "../../components/SearchBar/SearchBar.js";
if (!Math) {
  _easycom_SearchBar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.gotoSearch),
    b: common_vendor.f($data.cateList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.cat_name),
        b: common_vendor.n(index === $data.active ? "active" : ""),
        c: item.cat_id,
        d: common_vendor.o(($event) => $options.activeChange(index), item.cat_id)
      };
    }),
    c: $data.wh + "px",
    d: common_vendor.f($data.cateLevel2, (item2, index2, i0) => {
      return common_vendor.e({
        a: item2.children !== void 0
      }, item2.children !== void 0 ? {
        b: common_vendor.t(item2.cat_name)
      } : {}, {
        c: common_vendor.f(item2.children, (item3, index3, i1) => {
          return {
            a: $options.imageUrl(item3.cat_icon),
            b: common_vendor.t(item3.cat_name),
            c: item3.cat_id,
            d: common_vendor.o(($event) => $options.gotoGoodsList(item3), item3.cat_id)
          };
        }),
        d: item2.cat_id
      });
    }),
    e: $data.wh + "px"
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Project/uni-app/uni-shop/uni-shop/pages/cate/cate.vue"]]);
wx.createPage(MiniProgramPage);
