import { Scene } from "XrFrame";
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
  data: {},

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
        arTracker
          .getComponent(xrFrameSystem.Transform)
          .setData({ nodeId: i.id + "Tracker" });
        shadow.addChild(arTracker);

        const node = scene.createElement(xrFrameSystem.XRNode);

        const trackerComp = arTracker.getComponent(xrFrameSystem.ARTracker);
        arTracker.addChild(node);

        const nodeComp = node.getComponent(xrFrameSystem.Transform);

        nodeComp.setData({ nodeId: i.id });
        nodeComp.scale.setArray(i.scale);
        nodeComp.position.setArray(i.position);
        nodeComp.rotation.setArray(i.rotation);

        const gltfElement = scene.createElement(xrFrameSystem.XRGLTF);
        node.addChild(gltfElement);

        const gltfComp = gltfElement.getComponent(xrFrameSystem.GLTF);

        gltfComp.setData({
          model: scene.assets.getAsset("gltf", i.id),
        });

        // gltfElement.addComponent(xrFrameSystem.ShapeGizmos);

        gltfComp.el.event.add("touch-shape", () => {
          this.triggerEvent("onModelTapped", i.id);
        });

        gltfElement
          .getComponent(xrFrameSystem.Animator)
          .setData({ autoPlay: {} });

        trackerComp.el.event.add("ar-tracker-switch", (track: boolean) => {
          if (track) {
            wx.showToast({ title: i.id });
            gltfElement.addComponent(xrFrameSystem.CubeShape, {
              autoFit: true,
            });
          } else {
            gltfElement.removeComponent(xrFrameSystem.CubeShape);
          }
        });
      });
    },
  },
});
