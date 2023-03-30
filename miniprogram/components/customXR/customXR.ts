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
      this.data.scene = detail.value;
    },
    handleTrackerSwitch: function ({ detail }: { detail: any }) {
      if (detail.value) wx.showToast({ title: `识别成功` });
    },
    handleTouchModel: function ({ detail }: { detail: any }) {
      const { target } = detail.value;
      const id = target.id;

      this.triggerEvent("onModelTapped", id);
    },
  },
});
