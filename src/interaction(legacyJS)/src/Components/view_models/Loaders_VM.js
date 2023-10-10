import * as THREE from "three";
import MetaObject from "../class/Studio/MetaObject";
import MetaCamera from "../class/Studio/MetaCamera";
import MetaLight from "../class/Studio/MetaLight";
import MetaSound from "../class/Studio/MetaSound";
import { data_store } from "../stores/Data_Store";
import { renderingContext_store } from "../stores/RenderingContext_Store";
import { loader_store } from "../stores/Loader_Store";
import canvasHistory_store from "../stores/CanvasHistory_Store";
import AddObjCommand from "../class/commands/CanvasObject/AddObjCommand";
import AddSoundCommand from "../class/commands/CanvasObject/AddSoundCommand";
import { action } from "mobx";

const loadersViewModel = {
  //모든 Three load를 처리하는 함수
  async Load(type, dir) {
    let loader;
    let ktxTextureLoader;
    let dracoMeshLoader;
    switch (type) {
      case "gltf":
        loader = loader_store.gltfLoader;
        break;
      case "texture":
        loader = loader_store.textureLoader;
        break;
      case "cubetexture":
        loader = loader_store.cubeTextureLoader;
        break;
      case "font":
        loader = loader_store.fontLoader;
        break;
      case "ktx2texture":
        loader = loader_store.ktx2Loader;
        loader.setTranscoderPath("/basis/");
        loader.detectSupport(renderingContext_store.gl);
        break;
      case "gltf_item":
        loader = loader_store.gltfLoader;

        //set KTX transcoder for loading
        ktxTextureLoader = loader_store.ktx2Loader;
        ktxTextureLoader.setTranscoderPath("/basis/");
        ktxTextureLoader.detectSupport(renderingContext_store.gl);

        //set Draco decoder for loading
        dracoMeshLoader = loader_store.dracoLoader;
        dracoMeshLoader.setDecoderPath("/draco/gltf/");

        loader.setKTX2Loader(ktxTextureLoader);
        loader.setDRACOLoader(dracoMeshLoader);
        break;
      default:
        break;
    }
    try {
      return await new Promise((resolve, reject) => {
        loader.load(data_store.minio_url + dir, (model) => {
          resolve(model);
        });
      });
    } catch {
      console.log("load error");
    }
  },

  async AddMaterialTexture(name) {
    const model = await this.Load(
      "gltf",
      "/models/MaterialTemplates/" + name + ".glb"
    );
    const scene = model.scene;
    let material = null;
    await scene.traverse((child) => {
      if (child.isMesh) {
        material = child.material;
        material.name = name;
        material.userData = { template: true };
        loader_store.materialTextureList.push(material);
      }
    });
  },

  FindMaterialTexture(name) {
    return loader_store.materialTextureList.findIndex((e) => e.name === name);
  },
  async GetMaterialTextureByIdx(index) {
    const name = data_store.mat_tex_list[index][1];
    const listIndex = this.FindMaterialTexture(name);

    if (listIndex < 0) {
      await this.AddMaterialTexture(name);
      const material = await this.GetMaterialTextureByIdx(index);
      return material.clone();
    } else {
      return loader_store.materialTextureList[listIndex].clone();
    }
  },
  async GetMaterialTextureByName(name) {
    const listIndex = this.FindMaterialTexture(name);

    if (listIndex < 0) {
      await this.AddMaterialTexture(name);
      const material = await this.GetMaterialTextureByName(name);
      return material.clone();
    } else {
      return loader_store.materialTextureList[listIndex].clone();
    }
  },

  async LoadObject(object) {
    const loadUrl = "/models/Objects/" + object.fileName + ".glb";
    const model = await this.Load("gltf_item", loadUrl);

    // 애니메이션 배열을 모델로부터 복사
    model.scene.animations = [...model.animations];
    const metaObject = new MetaObject(model.scene, {
      objectId: null,
      name: object.name,
      blobGlb: null,
      url: process.env.REACT_APP_MINIO_URL + loadUrl,
      loadJSON: false,
      type: "3DAsset",
    });

    canvasHistory_store.execute(
      new AddObjCommand(metaObject, metaObject.objectId)
    );
  },

  async LoadApartObj() {
    const preset_list = data_store.apart;
    for (let i = 0; i < preset_list.length; i++) {
      const group = new THREE.Group();
      group.name = "apart";

      const model = await this.Load(
        "gltf",
        "/models/Apart/" + preset_list[i] + ".glb"
      );
      const scene = model.scene;
      loader_store.apartObj.push(scene);
    }
  },

  async LoadLightObject(index) {
    const loadUrl =
      "/models/Lights/" + data_store.light_list[index][1] + ".glb";
    const model = await this.Load("gltf_item", loadUrl);

    var tempObject = new MetaLight(model.scene, {
      objectId: null,
      name: data_store.light_list[index][0],

      blobGlb: null,
      url: process.env.REACT_APP_MINIO_URL + loadUrl,
      loadJSON: false,
      type: "Light",
    });
    canvasHistory_store.execute(
      new AddObjCommand(tempObject, tempObject.objectId)
    );
  },

  async LoadCamera(index) {
    if (renderingContext_store.isPreviewCameraExist) return;
    renderingContext_store.setIsPreviewCameraExist(true);

    const loadUrl = "/models/Objects/cinematicCamera.glb";

    const model = await this.Load("gltf_item", loadUrl);

    var tempObject = new MetaCamera(model.scene, {
      objectId: null,
      name: "카메라",
      url: process.env.REACT_APP_MINIO_URL + loadUrl,
      blobGlb: null,
      loadJSON: false,
      type: "PerspectiveCamera",
    });
    canvasHistory_store.execute(
      new AddObjCommand(tempObject, tempObject.objectId)
    );
  },

  async LoadSound() {
    const metaSoundObject = new MetaSound();

    canvasHistory_store.execute(new AddSoundCommand(metaSoundObject));
  },
  //스튜디오 실행 시 실행되는 함수
  //필수적으로 사용되는 요소들 미리 load
  init: action(async () => {
    loader_store.isLoaded = true;
  }),
};

export { loadersViewModel };
