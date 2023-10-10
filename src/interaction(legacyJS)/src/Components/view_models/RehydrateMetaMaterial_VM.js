import { action } from "mobx";
import { Material_store } from "../stores/Material_Store";

/** Rehydrate metaMaterialInfo, saved on Json
 * @param {Object} metaMaterialInfo - metaMaterialInfo saved on Json
 * @returns {void}
 */
const rehydrateMetaMaterial = action(function (metaMaterialInfo) {
  Material_store.metaMaterials = metaMaterialInfo;
  Material_store.materialIndex = Object.keys(metaMaterialInfo).length;
});
export default rehydrateMetaMaterial;
