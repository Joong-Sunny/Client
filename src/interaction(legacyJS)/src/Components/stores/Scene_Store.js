import { observable } from "mobx";

const scene_store = observable({
  hdriToggle: true,
  hdriBackgroundToggle: false,
  hdriXRotation: 0,
  hdriYRotation: 0,
  hdriZRotation: 0,
  hdriIntensity: 1,
  selectedHdriTemplate: 0,
  appliedHdriTemplate: 0,
  dlIntensity: 2.5,
  dlColor: { h: 0, s: 0, v: 100, a: 1 },
  dlToggle: true,
  alIntensity: 0.3,
  alColor: { h: 0, s: 0, v: 100, a: 1 },
  alToggle: true,
  canvasBackgroundColorToggle: false,
  canvasBackgroundColor: { h: 0, s: 0, v: 20, a: 1 },
  initCanvasBackgroundColor: { h: 0, s: 0, v: 10.98, a: 1 },
  SnapShotTempValueForSlider: null,
  envMapIntensity: 1.0,
  // templates: [
  //   ["3점 조명 스튜디오", "MX_hdr_indoor_3pointLightStudio_01"],
  //   ["화가의 작업실", "MX_hdr_indoor_artistWorkroom_01"],
  //   ["그랜드 볼룸", "MX_hdr_indoor_ballroom_01"],
  //   ["정오", "MX_hdr_outdoor_dayLight_01"],
  //   ["해질녘_01", "MX_hdr_outdoor_sunsetLight_01"],
  //   ["해질녘_02", "MX_hdr_outdoor_sunsetLight_02"],
  //   ["맑은 구름 하늘", "MX_hdr_outdoor_clearedCloud_01"],
  //   ["밤", "MX_hdr_outdoor_night_01"],
  //   ["도시 스트리트", "MX_hdr_outdoor_cityStreet_01"],
  //   ["숲 속", "MX_hdr_outdoor_forest_01"],
  // ],
  templates: [
    "MX_hdr_indoor_3pointLightStudio_01",
    "MX_hdr_indoor_artistWorkroom_01",
    "MX_hdr_indoor_ballroom_01",
    "MX_hdr_outdoor_cityStreet_01",
    "MX_hdr_outdoor_clearedCloud_01",
    "MX_hdr_outdoor_dayLight_01",
    "MX_hdr_outdoor_forest_01",
    "MX_hdr_outdoor_night_01",
    "MX_hdr_outdoor_sunsetLight_01",
    "MX_hdr_outdoor_sunsetLight_02",
  ],

  SSAOToggle: false,
  SSAOIntensity: 30,
  SSAOsamples: 20, // amount of samples per pixel (shouldn't be a multiple of the ring count)
  SSAOrings: 4, // amount of rings in the occlusion sampling pattern
  SSAOdistanceThreshold: 1.0, // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
  SSAOdistanceFalloff: 0.5, // distance falloff. min: 0, max: 1
  SSAOrangeThreshold: 0.5, // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
  SSAOrangeFalloff: 0.1, // occlusion range falloff. min: 0, max: 1
  SSAOluminanceInfluence: 0.9, // how much the luminance of the scene influences the ambient occlusion
  SSAOradius: 20, // occlusion sampling radius
  SSAOscale: 0.5, // scale of the ambient occlusion
  SSAObias: 0.5, // occlusion bias
  SSAOfade: 0.6,

  bloomToggle: false,
  bloomIntensity: 0.5,
  bloomLuminanceThreshold: 0.9,
  bloomLuminanceSmoothing: 0.025,

  //grid
  grid: null,
  isGridVisible: true,
  isAxisVisible: true,
});

export { scene_store };
