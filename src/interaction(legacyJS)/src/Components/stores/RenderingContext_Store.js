import { observable } from "mobx";
import * as THREE from "three";

const renderingContext_store = observable({
  canvas: null,
  camera: null,
  gl: null,
  scene: new THREE.Scene(),
  isPreviewCameraExist: false,
  previewCamera: null,

  setCamera(camera) {
    this.camera = camera;
  },
  setCanvas(canvas) {
    this.canvas = canvas;
  },
  setGl(gl) {
    this.gl = gl;
  },
  setScene(scene) {
    this.scene = scene;
  },
  setIsPreviewCameraExist(bool) {
    this.isPreviewCameraExist = bool;
  },
  setPreviewCamera(camera) {
    this.previewCamera = camera;
  },

  //transform contorl 추가 삭제
  setTransformControls(transcontrol) {
    this.scene.add(transcontrol);
  },
  deleteTransformControls() {
    this.scene.children = this.scene.children.filter((child) => {
      return child.constructor.name !== "TransformControls";
    });
  },
});

export { renderingContext_store };
