import { useState } from "react";
import * as THREE from "three";
import stores from "../../stores/storeContainer";
import THREEx from "../../views/00. Common/threex.domevents";
import { TransformControls } from "../../views/00. Common/TransformControls";
import { OrbitControls } from "../../class/OrbitControls.js";
import ambientLightViewModel from "./SceneSettingAmbientLight_VM";
import directionalLightViewModel from "./SceneSettingDirectionalLight_VM";
import UndoSceneSetting_VM from "./UndoSceneSetting_VM";
import sceneSettingModeViewModel from "./SceneSettingMode_VM";
import {
  backgroundColorViewModel,
  gridViewModel,
} from "./SceneSettingDisplay_VM";
import { renderingContext_store } from "../../stores/RenderingContext_Store";
import { SelectionBox } from "three/examples/jsm/interactive/SelectionBox";
import { SelectionHelper } from "three/examples/jsm/interactive/SelectionHelper";
import { ObjectControllerVM } from "../ObjectController_VM";

THREE.ColorManagement.legacyMode = false;
THREE.ColorManagement.enabled = true;

export default function SceneSetting_VM() {
  const { common_store, scene_store, undo_store, object_store } = stores;
  const InitiateScene = async (gl, camera, scene) => {
    //Set gl
    //THREE.ColorManagement.legacyMode = false;

    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFShadowMap;
    gl.physicallyCorrectLights = true;
    //gl.toneMappingExposure = 1; //default
    gl.sortObjects = true;
    gl.outputEncoding = THREE.sRGBEncoding;
    renderingContext_store.setCamera(camera);
    renderingContext_store.setScene(scene);
    renderingContext_store.setGl(gl);
    camera.fov = 50;
    camera.updateProjectionMatrix();

    var canvas = document.getElementById("canvas");
    // resetStore();
    common_store.createFloor();
    scene_store.grid = creategrid();
    scene.add(scene_store.grid);
    if (renderingContext_store.canvas == null) {
      setControl(canvas, camera, gl, scene);
      setTransControl(camera, gl, scene);
      setOrientationHelper(canvas, camera);
      MouseMultiSelect();
    }
    // var sceneHelpers = new THREE.Scene();
    // sceneHelpers.add(scene_store.grid);
    // common_store.setSceneHelpers(sceneHelpers);
  };

  const creategrid = () => {
    /**Grid1: white grid*/

    var grid = new THREE.Group();
    var grid1 = new THREE.GridHelper(50, 50, 0x888888);
    // grid1.material.color.setHex(0x888888);
    grid1.material = new THREE.LineBasicMaterial({
      color: 0x888888,
      fog: false,
      toneMapped: false,
      transparent: true,
    });
    grid1.material.vertexColors = false;
    grid.add(grid1);

    /**Grid2: gray grid*/
    var grid2 = new THREE.GridHelper(50, 10, 0x222222);
    // grid2.material.color.setHex(0x222222);
    grid2.material = new THREE.LineBasicMaterial({
      color: 0x222222,
      fog: false,
      toneMapped: false,
      transparent: true,
    });
    grid2.material.vertexColors = false;
    grid.add(grid2);
    grid.position.set(0, 0.01, 0);

    /**Grid3: axis grid*/
    const axisLength = 25;
    const grid3 = new THREE.Group();

    //x axis
    const xAxisGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(axisLength, 0, 0),
      new THREE.Vector3(-axisLength, 0, 0),
    ]);
    const xAxisMaterial = new THREE.LineBasicMaterial({
      color: 0xd14e66,
      fog: false,
      toneMapped: false,
      transparent: true,
    });
    const xAxis = new THREE.Line(xAxisGeometry, xAxisMaterial);
    grid3.add(xAxis);

    //y axis
    const yAxisGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, axisLength),
      new THREE.Vector3(0, 0, -axisLength),
    ]);
    const yAxisMaterial = new THREE.LineBasicMaterial({
      color: 0x5a93ba,
      fog: false,
      toneMapped: false,
      transparent: true,
    });
    const yAxis = new THREE.Line(yAxisGeometry, yAxisMaterial);
    grid3.add(yAxis);
    grid.add(grid3);
    return grid;
  };
  const setControl = (canvas, camera, gl) => {
    renderingContext_store.setCanvas(canvas);

    // init camera
    camera.position.x = 0;
    camera.position.y = 2;
    camera.position.z = 3.0;
    // create domEvents
    var domEvents = new THREEx.DomEvents(camera, gl.domElement);
    common_store.setDomEvents(domEvents);

    // create controls
    var orbitcontrols = new OrbitControls(camera, gl.domElement);

    // orbitcontrols.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    // orbitcontrols.dampingFactor = 0.05;

    orbitcontrols.screenSpacePanning = true;
    common_store.setOrbitcontrol(orbitcontrols);
    // common_store.orbitcontrol.target.y = 1.5;
  };
  const setTransControl = (camera, gl, scene) => {
    const transcontrol = new TransformControls(camera, gl.domElement);
    common_store.setTranscontrol(scene, transcontrol);

    common_store.transcontrol.addEventListener("mouseDown", orbitToFalse);
    common_store.transcontrol.addEventListener("mouseUp", orbitToTrue);
  };
  function orbitToFalse() {
    common_store.orbitcontrol.enabled = false;
  }
  function orbitToTrue() {
    common_store.orbitcontrol.enabled = true;
  }
  const setOrientationHelper = (canvas, camera) => {
    common_store.lastClick = Date.now();
    const ohOptions = {
        className: "orientation-helper-in-scene",
      },
      ohLabels = {
        px: "East",
        nx: "West",
        pz: "South",
        nz: "North",
        py: "Sky",
        ny: "Ground",
      };

    const orientationHelper = new OrientationHelper(
      camera,
      common_store.orbitcontrol,
      ohOptions,
      ohLabels
    );

    orientationHelper.addEventListener("change", onOrientationHelperChange);
    orientationHelper.addEventListener("click", onOrientationHelperClick);

    common_store.setorientationHelper(orientationHelper);
    document.body.appendChild(orientationHelper.domElement);
    common_store.orientationHelper.domElement.id = "orientation";
    common_store.orientationHelper.domElement.style.position = "fixed";
    common_store.orientationHelper.domElement.style.top = "196.5px";
    common_store.orientationHelper.domElement.style.right = "30px";
    common_store.orientationHelper.domElement.style.width = "90px";
    common_store.orientationHelper.domElement.style.height = "90px";
    common_store.orientationHelper.domElement.style.zIndex = "10";

    canvas.addEventListener("mousedown", orientationHelperMouseDown);
    canvas.addEventListener("mouseup", orientationHelperMouseUp);
  };
  function onOrientationHelperChange(ev) {
    translateCamera(ev.direction, common_store.orbitcontrol);
  }

  function onOrientationHelperClick(ev) {
    // Simulate double-click (less than 250ms)
    common_store.nClick = Date.now();
    if (common_store.nClick - common_store.lastCLick < 250) {
      translateCamera(ev.normal);
    }
    common_store.lastCLick = common_store.nClick;
  }
  function translateCamera(direction) {
    common_store.orbitcontrol.enabled = false;

    const dist = renderingContext_store.camera.position.distanceTo(
        common_store.orbitcontrol.target
      ),
      newCameraPos = common_store.orbitcontrol.target
        .clone()
        .add(direction.multiplyScalar(dist));

    renderingContext_store.camera.position.set(
      newCameraPos.x,
      newCameraPos.y,
      newCameraPos.z
    );
    common_store.orbitcontrol.enabled = true;
  }

  function orientationHelperMouseDown() {
    if (
      common_store.controlercheck == null &&
      common_store.orbitcontrol.enabled === true
    ) {
      common_store.orbitcontrol.enabled = true;
    }
  }
  function orientationHelperMouseUp() {
    common_store.setControlercheck(null);
  }
  function MouseMultiSelect() {
    const camera = renderingContext_store.camera;
    const scene = renderingContext_store.scene;
    const renderer = renderingContext_store.gl;
    const selectionBox = new SelectionBox(camera, scene);
    const helper = new SelectionHelper(renderer, "selectBox");

    helper.element.style.border = "3px dotted white";
    helper.element.style.backgroundColor = "rgba(150, 150, 150, 0.3)";
    helper.element.style.position = "fixed";

    document.addEventListener("pointerdown", function (event) {
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey ||
        event.altKey
      ) {
        helper.element.style.border = "3px dotted white";
        helper.element.style.backgroundColor = "rgba(150, 150, 150, 0.3)";
        for (const item of selectionBox.collection) {
          selectionBox.startPoint.set(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1,
            0.5
          );
        }
      } else {
        helper.element.style.border = "";
        helper.element.style.backgroundColor = "rgba(0,0,0,0)";
      }
    });

    document.addEventListener("pointermove", function (event) {
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey ||
        event.altKey
      ) {
        if (helper.isDown) {
          selectionBox.endPoint.set(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1,
            0.5
          );
        }
      }
    });

    document.addEventListener("pointerup", function (event) {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        selectionBox.endPoint.set(
          (event.clientX / window.innerWidth) * 2 - 1,
          -(event.clientY / window.innerHeight) * 2 + 1,
          0.5
        );

        const allSelected = selectionBox.select();

        for (let i = 0; i < allSelected.length; i++) {
          for (let j = 0; j < object_store.metaObjects.length; j++) {
            const metaobject = object_store.metaObjects[j];
            //console.log(metaobject.mesh.geometry)
            metaobject.mesh.traverse((child) => {
              if (child.isMesh) {
                if (child.uuid === allSelected[i].uuid) {
                  if (event.metaKey || event.ctrlKey) {
                    // console.log("control")
                    ObjectControllerVM.CtrlSelect(metaobject);
                  }
                  if (event.altKey) {
                    // console.log("Alt")
                    ObjectControllerVM.DeSelect(metaobject.objectId);
                    ObjectControllerVM.AttachTranscontrolToSelectedObject();
                  }
                  if (event.shiftKey)
                    ObjectControllerVM.ShiftSelect(metaobject);
                }
              }
            });
          }
        }
      }
    });
  }
  const onMouseDown = (value) => {
    scene_store.SnapShotTempValueForSlider = value;
  };
  const onMouseUp = (value, mode, uuid, name) => {
    const curValue = scene_store.SnapShotTempValueForSlider;
    const data = {
      name: name,
      mode: mode,
      prevValue: curValue,
      curValue: value,
    };
    undo_store.AddUnDoCommand(
      undefined,
      data,
      UndoSceneSetting_VM().sceneSettingUndo,
      UndoSceneSetting_VM().sceneSettingRedo
    );
  };
  const GetOutlineColor = (selectedObjectType) => {
    switch (selectedObjectType) {
      case "Multiple":
        return "#d4ed3e";

      case "Group":
        return "#94ec4f";

      case "Dependency":
        return "#f8d453";

      case "Camera":
      case "Light":
        return "#ffffff";
      case "Object":
        return "#d4ed3e";
      default:
        return null;
    }
  };
  //**HDRI template selector handlers */
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [, setMenuName] = useState("");
  const openMenu = Boolean(anchorMenu);
  const handleClickMenu = (event) => {
    if (
      event.currentTarget.value !== null &&
      typeof event.currentTarget.value !== "undefined"
    ) {
      setMenuName(event.currentTarget.value);
    }
    setAnchorMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorMenu(null);
  };

  return {
    InitiateScene,
    anchorMenu,
    openMenu,
    handleCloseMenu,
    handleClickMenu,
    onMouseDown,
    onMouseUp,
    GetOutlineColor,
  };
}

export {
  ambientLightViewModel,
  directionalLightViewModel,
  backgroundColorViewModel,
  gridViewModel,
  sceneSettingModeViewModel,
};
