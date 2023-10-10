import rehydrateMetaMaterial from "./RehydrateMetaMaterial_VM";
import rehydrateObjectInfo from "./RehydrateObjectSettingInfo_VM";
import rehydrateSceneSettingInfo from "./RehydrateSceneSettingInfo_VM";

/**
 * Parsing MetaObject and SceneSettingInfo from JSON data
 * @param {Object} projectDatas - saved user's JSON data
 * @returns {void}
 */

async function createSceneByJson(projectDatas) {
  const savedMaterials = projectDatas.metaMaterials;
  const savedMetaObjects = projectDatas.metaObjects;
  const savedSceneSettingInfo = projectDatas.sceneSettingInfo;
  rehydrateMetaMaterial(savedMaterials);
  rehydrateObjectInfo(savedMetaObjects);
  rehydrateSceneSettingInfo(savedSceneSettingInfo);
}

export default createSceneByJson;
