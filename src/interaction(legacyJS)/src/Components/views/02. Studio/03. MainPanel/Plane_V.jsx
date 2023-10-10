import Plane_VM from "../../../view_models/Plane_VM";
import { useEffect, useRef } from "react";
import { common_store } from "../../../stores/Common_Store";
import { objectViewModel } from "../../../view_models/Object_VM";
import { observer } from "mobx-react";

const Plane = observer((props) => {
  const { createPlane } = Plane_VM();
  const group = useRef();

  useEffect(() => {
    common_store.setPlane(createPlane());
    objectViewModel.addRaycastObject(common_store.plane);
    group.current.getObjectByName("plain").add(common_store.plane);
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="plain"></group>
    </group>
  );
});

export default Plane;
