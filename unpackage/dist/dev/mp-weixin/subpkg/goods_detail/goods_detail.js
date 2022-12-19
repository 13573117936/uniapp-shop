"use strict";
var common_vendor = require("../../common/vendor.js");
var http_service = require("../../http/service.js");
var utils_utils = require("../../utils/utils.js");
const _sfc_main = {
  data() {
    return {
      goodsInfo: {},
      options: [{
        icon: "shop",
        text: "\u5E97\u94FA",
        infoBackgroundColor: "#007aff",
        infoColor: "#f5f5f5"
      }, {
        icon: "cart",
        text: "\u8D2D\u7269\u8F66",
        info: 0
      }],
      buttonGroup: [
        {
          text: "\u52A0\u5165\u8D2D\u7269\u8F66",
          backgroundColor: "linear-gradient(90deg, #FFCD1E, #FF8A18)",
          color: "#fff"
        },
        {
          text: "\u7ACB\u5373\u8D2D\u4E70",
          backgroundColor: "linear-gradient(90deg, #FE6035, #EF1224)",
          color: "#fff"
        }
      ]
    };
  },
  onLoad(options) {
    const goods_id = options.goods_id;
    this.getGoodsInfo(goods_id);
  },
  methods: {
    async getGoodsInfo(goods_id) {
      const {
        data: res
      } = await http_service.api.get("/api/public/v1/goods/detail", {
        goods_id
      });
      if (res.meta.status !== 200)
        return utils_utils.showMsg();
      res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;"').replace(/webp/g, "jpg");
      console.log(res);
      this.goodsInfo = res.message;
    },
    onClick(e) {
      if (e.content.text === "\u8D2D\u7269\u8F66")
        common_vendor.index.switchTab({
          url: "/pages/cart/cart"
        });
    },
    buttonClick(e) {
      console.log(e);
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_goods_nav2 = common_vendor.resolveComponent("uni-goods-nav");
  (_easycom_uni_icons2 + _easycom_uni_goods_nav2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_goods_nav = () => "../../uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_goods_nav)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.goodsInfo.goods_name
  }, $data.goodsInfo.goods_name ? {
    b: common_vendor.f($data.goodsInfo.pics, (item, index, i0) => {
      return {
        a: item.pics_big,
        b: index
      };
    }),
    c: common_vendor.t($data.goodsInfo.goods_price),
    d: common_vendor.t($data.goodsInfo.goods_name),
    e: common_vendor.p({
      type: "star",
      size: "16"
    }),
    f: $data.goodsInfo.goods_introduce,
    g: common_vendor.o($options.onClick),
    h: common_vendor.o($options.buttonClick),
    i: common_vendor.p({
      options: $data.options,
      fill: true,
      ["button-group"]: $data.buttonGroup
    })
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Project/uni-app/uni-shop/uni-shop/subpkg/goods_detail/goods_detail.vue"]]);
wx.createPage(MiniProgramPage);
