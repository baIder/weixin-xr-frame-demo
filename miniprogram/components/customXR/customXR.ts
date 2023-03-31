import { Scene, XRARTracker } from "XrFrame";
import { mockData } from "../../mock/data";

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
    scene: {} as Scene,
    trackerList: {} as { [key: string]: XRARTracker },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleReady: async function ({ detail }: { detail: { value: Scene } }) {
      const scene = detail.value;
      mockData.forEach(async (i) => {
        await scene.assets.loadAsset({
          type: "gltf",
          assetId: i.id,
          src: i.model,
          options: {},
        });

        const xrFrameSystem = wx.getXrFrameSystem();
        const shadow = scene.getElementById("shadow-node");

        const arTracker = scene.createElement(xrFrameSystem.XRARTracker, {
          mode: "Marker",
          src: i.image,
        });
        shadow.addChild(arTracker);

        const tracker = arTracker.getComponent(xrFrameSystem.ARTracker);
        tracker.el.event.add("ar-tracker-switch", this.handleTrackerSwitch);

        const node = scene.createElement(xrFrameSystem.XRNode);
        arTracker.addChild(node);

        const gltfElement = scene.createElement(xrFrameSystem.XRGLTF);
        node.addChild(gltfElement);

        gltfElement
          .getComponent(xrFrameSystem.Transform)
          .scale.setArray(i.scale);
        gltfElement
          .getComponent(xrFrameSystem.Transform)
          .position.setArray(i.position);
        gltfElement
          .getComponent(xrFrameSystem.Transform)
          .rotation.setArray(i.rotation);

        const gltfComp = gltfElement.getComponent(xrFrameSystem.GLTF);

        gltfComp.setData({
          model: scene.assets.getAsset("gltf", i.id),
        });

        gltfElement.addComponent(xrFrameSystem.CubeShape, {
          autoFit: true,
        });

        gltfComp.el.event.add("touch-shape", this.handleTouchModel);

        gltfElement
          .getComponent(xrFrameSystem.Animator)
          .setData({ autoPlay: {} });
      });
    },
    handleTrackerSwitch: function () {
      // handleTrackerSwitch: function ({ detail }: { detail: any }) {
      wx.showToast({ title: "arTracker" });
      // if (detail.value) wx.showToast({ title: "识别成功" });
    },
    handleTouchModel: function () {
      // handleTouchModel: function ({ detail }: { detail: any }) {
      wx.showToast({ title: "点击模型" });
      // const { target } = detail.value;
      // const id = target.id;

      // this.triggerEvent("onModelTapped", id);
    },
  },
});
