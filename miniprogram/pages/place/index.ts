// pages/place/index.ts
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
    positions: [
      [0, 0, "rgba(44, 44, 44, 0.5)", ""],
      [0, 0, "rgba(44, 44, 44, 0.5)", ""],
    ],
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
});