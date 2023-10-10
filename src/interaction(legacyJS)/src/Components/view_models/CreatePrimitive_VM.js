import storeContainer from "../stores/storeContainer";
import Geometry from "../class/Studio/Geometry";
import MetaPrimitive from "../class/Studio/MetaPrimitivie";
import AddObjCommand from "../class/commands/CanvasObject/AddObjCommand";

export default function CreatePrimitive_VM() {
  const { canvasHistory_store } = storeContainer;

  function createprimitive(shape) {
    const object = new Geometry(shape);
    const mesh_name = object.shape;
    const tempObject = new MetaPrimitive(object, {
      objectId: null,
      name: mesh_name,
      blobGlb: null,
      url: null,
      loadJSON: null,
      type: "Object",
    });

    canvasHistory_store.execute(
      new AddObjCommand(tempObject, tempObject.objectId)
    );
  }

  return {
    createprimitive,
  };
}
