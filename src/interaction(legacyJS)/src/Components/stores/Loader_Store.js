import { observable } from "mobx";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const loader_store = observable({
  isNewObjectLoading: false,
  isLoaded: false,
  myCameraCubeTexture: null,
  materialTextureList: [],
  //Three loader들 미리 선언하고 계속 활용
  gltfLoader: new GLTFLoader(),
  textureLoader: new THREE.TextureLoader(),
  cubeTextureLoader: new THREE.CubeTextureLoader(),
  fontLoader: new FontLoader(),
  ktx2Loader: new KTX2Loader(),
  dracoLoader: new DRACOLoader(),
  apartObj: [],
  apartTexture: [],
});

export { loader_store };
