// components/customXR/customXR.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    avatarTextureId: "white",
    scene: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleReady: function ({ detail }: { detail: any }) {
      this.scene = detail.value;
    },
    handleAssetsLoaded: function ({ detail }: { detail: any }) {
      wx.showToast({ title: "点击屏幕放置" });
      this.scene.event.add("touchstart", () => {
        this.scene.ar.placeHere("setitem", true);
        console.log(111);
      });
    },
    handleTrackerSwitch: function ({ detail }: { detail: any }) {
      console.log(detail.value);
    },
  },
});