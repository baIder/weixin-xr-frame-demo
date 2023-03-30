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
  handleModelTapped: function () {
    this.setData({ loaded: true });
  },
  handleWrapperTap: function () {
    wx.showToast({ title: "点击wrapper" });
    setTimeout(() => {
      this.setData({ loaded: false });
    }, 500);
  },
  goPlace: function () {
    this.setData({ xrVisible: false });
    wx.navigateTo({ url: "/pages/place/index" });
  },
});
