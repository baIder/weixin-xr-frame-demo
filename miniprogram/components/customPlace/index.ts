// components/customPlace/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    handleReady: function ({ detail }: { detail: any }) {
      this.scene = detail.value;
    },
    handleAssetsLoaded: function ({ detail }) {
      wx.showToast({ title: "点击屏幕放置" });
      this.scene.event.add("touchstart", () => {
        this.scene.ar.placeHere("setitem", true);
      });
    },
    handleTouchModel: function ({ detail }) {
      const { target } = detail.value;
      const id = target.id;

      wx.showToast({ title: `模型： ${id}` });
    },
  },
});
