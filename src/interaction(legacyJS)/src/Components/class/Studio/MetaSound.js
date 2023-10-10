import { makeObservable, observable, action } from "mobx";
import * as THREE from "three";
import { objectViewModel } from "../../view_models/Object_VM";
import { renderingContext_store } from "../../stores/RenderingContext_Store";
import UUIDGenerator from "../../../utils/uuid";

class MetaSound {
  type = "Audio";
  url = "";
  loop = false;
  autoplay = false;
  detune = 0;
  volume = 1;
  props = {};
  objectId = 0;

  constructor() {
    makeObservable(this, {
      type: observable,
      url: observable,
      loop: observable,
      autoplay: observable,
      detune: observable,
      volume: observable,
      props: observable,
      objectId: observable,
      SetProps: action,
      initProps: action,
    });
    this.objectId = UUIDGenerator.run();

    this.listener = new THREE.AudioListener();
    renderingContext_store.scene.add(this.listener);
    this.sound = new THREE.Audio(this.listener);
    this.audioLoader = new THREE.AudioLoader();

    this.initProps();
  }

  initClass() {
    objectViewModel.AddMetaObject(this);
  }

  setUrl(url) {
    this.url = url;
  }

  playAndStopSound() {
    if (!this.sound.isPlaying) {
      this.audioLoader.load(this.url, (buffer) => {
        this.sound.setBuffer(buffer);
        this.sound.setLoop(false);
        this.sound.setVolume(this.volume);
        this.sound.detune = this.detune;
        this.sound.play();
      });
    }

    if (this.sound.isPlaying) {
      this.sound.stop();
    }
  }

  playAndStopSoundLoop() {
    if (!this.sound.isPlaying) {
      this.audioLoader.load(this.url, (buffer) => {
        this.sound.setBuffer(buffer);
        this.sound.setLoop(true);
        this.sound.play();
      });
    }

    if (this.sound.isPlaying) {
      this.sound.stop();
    }
  }

  stopSound() {
    if (this.sound.isPlaying) {
      this.sound.stop();
    }
  }

  initProps() {
    this.props = {
      position: new THREE.Vector3(),
      rotation: new THREE.Euler(),
      scale: new THREE.Vector3(),
    };
  }

  SetProps(prop, value) {
    switch (prop) {
      case "detune":
        this.detune = value;
        break;
      case "volume":
        this.volume = value;
        break;
    }
  }

  deleteMeta() {
    objectViewModel.DeleteMetaObject(this);
  }
}

export default MetaSound;
