import { observer } from "mobx-react-lite";
import { useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { useEffect, forwardRef } from "react";
import storeContainer from "../../../stores/storeContainer";
import { raycastFormat } from "../../../class/event-system/runtime/utils";
import { renderingContext_store } from "../../../stores/RenderingContext_Store";
import { objectViewModel } from "../../../view_models/Object_VM";
import { ObjectStateVM } from "../../../view_models/ObjectState_VM";

function RuntimeEvent(e, props, type) {
  return props.props[raycastFormat(type)]?.forEach((i) => {
    return i(e);
  });
}

const ReactMetaObject = observer((props) => {
  const { object } = props;
  let Cf = null;
  switch (object.type) {
    case "PerspectiveCamera":
      Cf = forwardRef((props, ref) => {
        return <primitive object={props.props.mesh} ref={ref} />;
      });
      break;
    case "OrthographicCamera":
      Cf = forwardRef((props, ref) => {
        return <OrthographicCamera ref={ref} />;
      });
      break;
    case "Light":
      Cf = forwardRef((props, ref) => {
        return <primitive object={props.props.mesh} ref={ref} />;
      });
      break;
    case "Mesh":
    case "Object":
      Cf = forwardRef((props, ref) => {
        return (
          <>
            <primitive
              object={props.props.mesh}
              ref={ref}
              onClick={(e) => RuntimeEvent(e, props, "onClick")}
              onPointerUp={(e) => RuntimeEvent(e, props, "onPointerUp")}
              onPointerDown={(e) => RuntimeEvent(e, props, "onPointerDown")}
            />
          </>
        );
      });
      break;
    case "Object3D":
    case "Group":
    case "3DAsset":
      Cf = forwardRef((props, ref) => {
        return (
          <>
            <primitive
              object={props.props.mesh}
              ref={ref}
              // onClick={(e) => RuntimeEvent(e, props, "onClick")}
              // onPointerUp={(e) => RuntimeEvent(e, props, "onPointerUp")}
              // onPointerDown={(e) => RuntimeEvent(e, props, "onPointerDown")}
            />
          </>
        );
      });
      break;

    default:
      console.warn("Unknown type: ", object.type);
      console.warn("Unknown type: ", object);
      return null;
  }
  return (
    Cf && <Cf key={object.objectId} props={object} metaUuid={object.objectId} />
  );
});
const ReactMetaScene = observer(() => {
  const { common_store } = storeContainer;
  const { gl } = useThree();
  const set = useThree((state) => state.set);
  useEffect(() => {
    return () => {
      gl.dispose();
    };
  }, [gl]);
  useEffect(() => {
    const changeView = () => {
      if (
        common_store.isPreview &&
        renderingContext_store.previewCamera !== null
      ) {
        set({
          camera: renderingContext_store.previewCamera,
        });
      } else if (!renderingContext_store.isPreview) {
        set({
          camera: renderingContext_store.camera,
        });
      }
    };
    changeView();
  }, [common_store.isPreview]);
  useFrame(() => {
    if (
      !common_store.isPreview &&
      objectViewModel.isObjectSelected &&
      !common_store.isMoveMode &&
      !ObjectStateVM.Lock &&
      ObjectStateVM.visible
    ) {
      common_store.transcontrol.visible = true;
    }
  });
  return objectViewModel.renderObjects?.map((child) => (
    <ReactMetaObject key={child.objectId} object={child} />
  ));
});

export default ReactMetaScene;
