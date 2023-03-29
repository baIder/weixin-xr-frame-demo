// index.ts
// 获取应用实例
const app = getApp<IAppOption>();

Page({
  data: {},
  onLoad() {},
  goAR() {
    wx.navigateTo({ url: "/pages/xr/index" });
  },
  goPlace() {
    wx.navigateTo({ url: "/pages/place/index" });
  },
});
