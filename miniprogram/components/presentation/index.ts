// components/presentation/index.ts
import { Scene } from "XrFrame";
import { mockData } from "../../mock/data";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modelId: {
      type: String,
      value: "",
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    scene: {} as Scene,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleReady: async function ({ detail }: { detail: { value: Scene } }) {
      const scene = (this.data.scene = detail.value);
      const assetItem = mockData.find((i) => i.id === this.properties.modelId);
      wx.showToast({ title: this.properties.modelId });
      if (!assetItem) return;
      const { value: loadedAsset } = await scene.assets.loadAsset({
        type: "gltf",
        assetId: this.properties.modelId,
        src: assetItem.model,
        options: {},
      });
      const xrFrameSystem = wx.getXrFrameSystem();
      const shadow = scene.getElementById("shadow-node");
      const gltfElement = scene.createElement(xrFrameSystem.XRGLTF);
      shadow.addChild(gltfElement);
      const gltfComp = gltfElement.getComponent(xrFrameSystem.GLTF);
      gltfComp.setData({ model: loadedAsset });
      gltfElement
        .getComponent(xrFrameSystem.Transform)
        .scale.setArray(assetItem.scale);
      gltfElement
        .getComponent(xrFrameSystem.Transform)
        .position.setArray([
          assetItem.position[0],
          assetItem.position[1],
          assetItem.position[2],
        ]);
      gltfElement
        .getComponent(xrFrameSystem.Transform)
        .rotation.setArray(assetItem.rotation);
      gltfElement
        .getComponent(xrFrameSystem.Animator)
        .setData({ autoPlay: {} });
    },
  },
});
