// pages/xr/index.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    width: 300,
    height: 300,
    renderWidth: 300,
    renderHeight: 300,
    loaded: false,
    xrVisible: true,
    model_id: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const info = wx.getSystemInfoSync();
    const width = info.windowWidth;
    const height = info.windowHeight;
    const dpi = info.pixelRatio;
    this.setData({
      width,
      height,
      renderWidth: width * dpi,
      renderHeight: height * dpi,
    });
  },
  handleModelTapped: function ({ detail }: { detail: string }) {
    this.setData({ model_id: detail });
    this.setData({ loaded: true });
  },
  handleWrapperTap: function () {
    this.setData({ loaded: false });
  },
  goPlace: function () {
    this.setData({ xrVisible: false });
    wx.navigateTo({ url: "/pages/place/index" });
  },
});
