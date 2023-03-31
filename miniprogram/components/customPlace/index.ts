import { Scene, XRNode } from "XrFrame";
import { mockData } from "../../mock/data";

// components/customPlace/index.ts
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
    node: (undefined as unknown) as XRNode,
    scene: {} as Scene,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleReady: async function ({ detail }: { detail: { value: Scene } }) {
      const scene = (this.data.scene = detail.value);

      const assetItem = mockData.find(
        (i) =>
          i.id ===
          (this.properties.modelId === "" ? "miku" : this.properties.modelId)
      );

      if (!assetItem) return;
      const { value: loadedAsset } = await scene.assets.loadAsset({
        type: "gltf",
        assetId: assetItem.id,
        src: assetItem.model,
        options: {},
      });

      const xrFrameSystem = wx.getXrFrameSystem();
      const shadow = scene.getElementById("shadow-node");
      const node = (this.data.node = scene.createElement(xrFrameSystem.XRNode, {
        visible: "false",
      }));

      shadow.addChild(node);

      const gltfElement = scene.createElement(xrFrameSystem.XRGLTF);
      node.addChild(gltfElement);
      const gltfComp = gltfElement.getComponent(xrFrameSystem.GLTF);
      gltfComp.setData({ model: loadedAsset });
      gltfElement
        .getComponent(xrFrameSystem.Animator)
        .setData({ autoPlay: {} });
    },

    handleAssetsLoaded: function () {
      this.data.scene.event.add("touchstart", () => {
        this.data.scene.ar.placeHere(this.data.node, true);
      });
    },
  },
});
