import {
  BoxGeometry,
  BufferGeometry,
  CylinderGeometry,
  DoubleSide,
  Euler,
  Float32BufferAttribute,
  Line,
  LineBasicMaterial,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PlaneGeometry,
  Quaternion,
  Raycaster,
  TorusGeometry,
  Vector3,
  MathUtils,
} from "three";
import * as THREE from "three";
import { common_store } from "../../stores/Common_Store";
import { objectViewModel } from "../../view_models/Object_VM";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { mouseEvent_store } from "../../stores/MouseEvent_Store";
import { runInAction } from "mobx";
import { HotKeyFunctionsAboutViewViewModel } from "../../view_models/03. HotKey/HotKeyFunctionsAboutView_VM";
import { controllerBar_store } from "../../stores/ControllerBar_Store";
import { renderingContext_store } from "../../stores/RenderingContext_Store";
import { transformation_store } from "../../stores/Transformation_Store";
import SetTransformCommand from "../../class/commands/CanvasObject/SetTransformCommand";
import canvasHistory_store from "../../stores/CanvasHistory_Store";
import { object_store } from "../../stores/Object_Store";
import SetTransformXYZCommand from "../../class/commands/CanvasObject/SetTransformXYZCommand";

const _raycaster = new Raycaster();
const raycaster = new THREE.Raycaster();
const _tempVector = new Vector3();
const _tempVector2 = new Vector3();
var isMoved = false;
var isobject = false;
const _currVector = new Vector3();
const _prevVector = new Vector3();
const _currRotation = new Euler();
const _prevRotation = new Euler();
const _tempQuaternion = new Quaternion();

const _unit = {
  X: new Vector3(1, 0, 0),
  Y: new Vector3(0, 1, 0),
  Z: new Vector3(0, 0, 1),
};

const _changeEvent = { type: "change" };
const _mouseDownEvent = { type: "mouseDown" };
const _mouseUpEvent = { type: "mouseUp", mode: null };
const _objectChangeEvent = { type: "objectChange" };
var isMetaCam = false;

class TransformControls extends Object3D {
  constructor(camera, domElement) {
    super();

    if (domElement === undefined) {
      console.warn(
        'THREE.TransformControls: The second parameter "domElement" is now mandatory.'
      );
      domElement = document;
    }

    document.addEventListener("mousemove", this.onMouseMove, false);

    this.visible = false;
    this.domElement = domElement;
    this.domElement.style.touchAction = "none"; // disable touch scroll

    const _gizmo = new TransformControlsGizmo();
    _gizmo.renderOrder = 999;

    this._gizmo = _gizmo;
    this.add(_gizmo);

    const _plane = new TransformControlsPlane();
    this._plane = _plane;
    this.add(_plane);

    const scope = this;

    // Defined getter, setter and store for a property
    function defineProperty(propName, defaultValue) {
      let propValue = defaultValue;

      Object.defineProperty(scope, propName, {
        get: function () {
          return propValue !== undefined ? propValue : defaultValue;
        },

        set: function (value) {
          if (propValue !== value) {
            propValue = value;
            _plane[propName] = value;
            _gizmo[propName] = value;

            scope.dispatchEvent({ type: propName + "-changed", value: value });
            scope.dispatchEvent(_changeEvent);
          }
        },
      });

      scope[propName] = defaultValue;
      _plane[propName] = defaultValue;
      _gizmo[propName] = defaultValue;
    }

    // Define properties with getters/setter
    // Setting the defined property will automatically trigger change event
    // Defined properties are passed down to gizmo and plane

    defineProperty("camera", camera);
    defineProperty("object", undefined);
    defineProperty("enabled", true);
    defineProperty("axis", null);
    defineProperty("mode", "translate");
    defineProperty("axisType", "world");
    defineProperty("translationSnap", null);
    defineProperty("rotationSnap", null);
    defineProperty("scaleSnap", null);
    defineProperty("space", "world");
    defineProperty("size", 1);
    defineProperty("dragging", false);
    defineProperty("showX", true);
    defineProperty("showY", true);
    defineProperty("showZ", true);

    // Reusable utility variables

    const worldPosition = new Vector3();
    const worldPositionStart = new Vector3();
    const worldQuaternion = new Quaternion();
    const worldQuaternionStart = new Quaternion();
    const cameraPosition = new Vector3();
    const cameraQuaternion = new Quaternion();
    const pointStart = new Vector3();
    const pointEnd = new Vector3();
    const rotationAxis = new Vector3();
    const rotationAngle = 0;
    const eye = new Vector3();

    // TODO: remove properties unused in plane and gizmo

    defineProperty("worldPosition", worldPosition);
    defineProperty("worldPositionStart", worldPositionStart);
    defineProperty("worldQuaternion", worldQuaternion);
    defineProperty("worldQuaternionStart", worldQuaternionStart);
    defineProperty("cameraPosition", cameraPosition);
    defineProperty("cameraQuaternion", cameraQuaternion);
    defineProperty("pointStart", pointStart);
    defineProperty("pointEnd", pointEnd);
    defineProperty("rotationAxis", rotationAxis);
    defineProperty("rotationAngle", rotationAngle);
    defineProperty("eye", eye);

    this._offset = new Vector3();
    this._offset1 = new Vector3();

    this._cameraScale = new Vector3();

    this._parentPosition = new Vector3();
    this._parentQuaternion = new Quaternion();
    this._parentQuaternionInv = new Quaternion();
    this._parentScale = new Vector3();

    this._worldScaleStart = new Vector3();
    this._worldQuaternionInv = new Quaternion();
    this._worldScale = new Vector3();

    this._positionStart = new Vector3();
    this._quaternionStart = new Quaternion();
    this._scaleStart = new Vector3();

    this._getPointer = getPointer.bind(this);
    this._onPointerDown = onPointerDown.bind(this);
    this._onPointerHover = onPointerHover.bind(this);
    this._onPointerMove = onPointerMove.bind(this);
    this._onPointerUp = onPointerUp.bind(this);

    this.domElement.addEventListener("pointerdown", this._onPointerDown);
    this.domElement.addEventListener("pointermove", this._onPointerHover);
    this.domElement.addEventListener("pointerup", this._onPointerUp);
  }

  // updateMatrixWorld  updates key transformation variables
  updateMatrixWorld() {
    if (this.object !== undefined) {
      this.object.updateMatrixWorld();

      if (this.object.parent === null) {
        // console.error(
        //   "TransformControls: The attached 3D object must be a part of the scene graph."
        // );
      } else {
        this.object.parent.matrixWorld.decompose(
          this._parentPosition,
          this._parentQuaternion,
          this._parentScale
        );
      }

      this.object.matrixWorld.decompose(
        this.worldPosition,
        this.worldQuaternion,
        this._worldScale
      );

      this._parentQuaternionInv.copy(this._parentQuaternion).invert();
      this._worldQuaternionInv.copy(this.worldQuaternion).invert();
    }

    this.camera.updateMatrixWorld();
    this.camera.matrixWorld.decompose(
      this.cameraPosition,
      this.cameraQuaternion,
      this._cameraScale
    );

    if (this.camera.isOrthographicCamera) {
      this.camera.getWorldDirection(this.eye);
    } else {
      this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize();
    }

    super.updateMatrixWorld(this);
  }

  pointerHover(pointer) {
    if (this.object === undefined || this.dragging === true) return;

    _raycaster.setFromCamera(pointer, this.camera);

    const intersect = intersectObjectWithRay(this._gizmo, _raycaster);

    if (intersect) {
      this.mode = intersect.object.gizmotype;
      this.axis = intersect.object.name;
    } else {
      this.axis = null;
    }
  }

  pointerDown(pointer) {
    if (
      this.object === undefined ||
      this.dragging === true ||
      pointer.button !== 0
    )
      return;

    if (this.axis !== null) {
      common_store.setIsTransControl(true);

      _raycaster.setFromCamera(pointer, this.camera);

      const planeIntersect = intersectObjectWithRay(
        this._plane,
        _raycaster,
        true
      );
      const gizmoIntersect = intersectObjectWithRay(
        this._gizmo,
        _raycaster,
        true
      );
      if (gizmoIntersect) {
        this.mode = gizmoIntersect.object.gizmotype;
      }
      if (planeIntersect) {
        this.object.updateMatrixWorld();
        this.object.parent.updateMatrixWorld();

        this._positionStart.copy(this.object.position);
        this._quaternionStart.copy(this.object.quaternion);
        this._scaleStart.copy(this.object.scale);

        this.object.matrixWorld.decompose(
          this.worldPositionStart,
          this.worldQuaternionStart,
          this._worldScaleStart
        );

        this.pointStart.copy(planeIntersect.point).sub(this.worldPositionStart);
      }

      this.dragging = true;
      _mouseDownEvent.mode = this.mode;
      this.dispatchEvent(_mouseDownEvent);
      isobject = true;
      if (this.mode === "scale") _prevVector.copy(this.object.scale);
      if (this.mode === "translate") _prevVector.copy(this.object.position);
      if (this.mode === "rotate") _prevRotation.copy(this.object.rotation);
    }
  }

  onMouseMove(event) {
    if (isMetaCam && controllerBar_store.magneticMode) {
      const mouse = new THREE.Vector2();
      mouse.set(
        (event.x / window.innerWidth) * 2 - 1,
        -(event.y / window.innerHeight) * 2 + 1
      );
      raycaster.setFromCamera(mouse, renderingContext_store.camera);
      const intersects = raycaster.intersectObjects(
        common_store.meta3DCanvas,
        false
      );
      if (intersects.length > 0) {
        const intersect = intersects[0];
      }
    }
  }

  pointerMove(pointer) {
    if (!isMoved) {
      isMoved = true;
    }
    const axis = this.axis;
    const mode = this.mode;
    const object = this.object;
    const space = this.space;

    if (
      object === undefined ||
      axis === null ||
      this.dragging === false ||
      pointer.button !== -1
    )
      return;

    _raycaster.setFromCamera(pointer, this.camera);

    const planeIntersect = intersectObjectWithRay(
      this._plane,
      _raycaster,
      true
    );

    if (!planeIntersect) return;

    this.pointEnd.copy(planeIntersect.point).sub(this.worldPositionStart);

    if (mode === "translate") {
      if (
        axis === "XYZ" &&
        // common_store.attachMode &&
        objectViewModel.selectedObjects.length === 1
      ) {
        HotKeyFunctionsAboutViewViewModel.moveModeOn();
      } else {
        // Apply translate
        mouseEvent_store.transformControllerTriggeredAfterMoved = true;

        if (this.object.name === "camRoutePoint용") {
          isMetaCam = true;
        }

        this._offset.copy(this.pointEnd).sub(this.pointStart);

        if (space === "local" && axis !== "XYZ") {
          this._offset.applyQuaternion(this._worldQuaternionInv);
        }

        if (axis.indexOf("X") === -1) this._offset.x = 0;
        if (axis.indexOf("Y") === -1) this._offset.y = 0;
        if (axis.indexOf("Z") === -1) this._offset.z = 0;

        if (space === "local" && axis !== "XYZ") {
          this._offset
            .applyQuaternion(this._quaternionStart)
            .divide(this._parentScale);
        } else {
          this._offset
            .applyQuaternion(this._parentQuaternionInv)
            .divide(this._parentScale);
        }

        const combinedVector = new THREE.Vector3();
        combinedVector.copy(this._offset).add(this._positionStart);
        // objectViewModel.SetProps("position", combin
        if (common_store.originMode === true) {
          object.geometry.translate(
            axis.indexOf("X") === 0 ? this._offset1.x - this._offset.x : 0,
            axis.indexOf("Y") === 0 ? this._offset1.y - this._offset.y : 0,
            axis.indexOf("Z") === 0 ? this._offset1.z - this._offset.z : 0
          );
          object.position.copy(combinedVector);
          this._offset1.copy(this._offset);
        } else {
          object.position.copy(combinedVector);
        }

        // Apply translation snap

        if (this.translationSnap) {
          if (space === "local") {
            object.position.applyQuaternion(
              _tempQuaternion.copy(this._quaternionStart).invert()
            );

            if (axis.search("X") !== -1) {
              object.position.x =
                Math.round(object.position.x / this.translationSnap) *
                this.translationSnap;
            }

            if (axis.search("Y") !== -1) {
              object.position.y =
                Math.round(object.position.y / this.translationSnap) *
                this.translationSnap;
            }

            if (axis.search("Z") !== -1) {
              object.position.z =
                Math.round(object.position.z / this.translationSnap) *
                this.translationSnap;
            }

            object.position.applyQuaternion(this._quaternionStart);
          }

          if (space === "world") {
            if (object.parent) {
              object.position.add(
                _tempVector.setFromMatrixPosition(object.parent.matrixWorld)
              );
            }

            if (axis.search("X") !== -1) {
              object.position.x =
                Math.round(object.position.x / this.translationSnap) *
                this.translationSnap;
            }

            if (axis.search("Y") !== -1) {
              object.position.y =
                Math.round(object.position.y / this.translationSnap) *
                this.translationSnap;
            }

            if (axis.search("Z") !== -1) {
              object.position.z =
                Math.round(object.position.z / this.translationSnap) *
                this.translationSnap;
            }

            if (object.parent) {
              object.position.sub(
                _tempVector.setFromMatrixPosition(object.parent.matrixWorld)
              );
            }
          }
        }
        if (controllerBar_store.magneticMode) {
          if (objectViewModel.isObjectSelected) {
            this.object.position.x = Math.round(this.object.position.x);
            this.object.position.y = Math.round(this.object.position.y);
            this.object.position.z = Math.round(this.object.position.z);
          }
        }

        if (common_store.originMode === false) {
          objectViewModel.SetProps("position", object.position);

          if (objectViewModel.isObjectSelected) {
            transformation_store.setPositionX(this.object.position.x);
            transformation_store.setPositionY(this.object.position.y);
            transformation_store.setPositionZ(this.object.position.z);
          }
        }
      }
    } else if (mode === "scale") {
      let targetmetaobject;
      for (const metaobject of objectViewModel.metaObjects)
        if (metaobject.mesh === this.object) targetmetaobject = metaobject;

      if (
        targetmetaobject === undefined ||
        !targetmetaobject.type.includes("Camera")
      ) {
        mouseEvent_store.transformControllerTriggeredAfterMoved = true;
        if (axis.search("XYZ") !== -1) {
          let d = this.pointEnd.length() / this.pointStart.length();

          if (this.pointEnd.dot(this.pointStart) < 0) d *= -1;

          _tempVector2.set(d, d, d);
        } else if (axis.search("XY") !== -1) {
          let d = this.pointEnd.length() / this.pointStart.length();

          if (this.pointEnd.dot(this.pointStart) < 0) d *= -1;

          _tempVector2.set(d, d, 1);
        } else if (axis.search("YZ") !== -1) {
          let d = this.pointEnd.length() / this.pointStart.length();

          if (this.pointEnd.dot(this.pointStart) < 0) d *= -1;

          _tempVector2.set(1, d, d);
        } else if (axis.search("XZ") !== -1) {
          let d = this.pointEnd.length() / this.pointStart.length();

          if (this.pointEnd.dot(this.pointStart) < 0) d *= -1;

          _tempVector2.set(d, 1, d);
        } else {
          _tempVector.copy(this.pointStart);
          _tempVector2.copy(this.pointEnd);

          _tempVector.applyQuaternion(this._worldQuaternionInv);
          _tempVector2.applyQuaternion(this._worldQuaternionInv);

          _tempVector2.divide(_tempVector);

          if (axis.search("X") === -1) {
            _tempVector2.x = 1;
          }

          if (axis.search("Y") === -1) {
            _tempVector2.y = 1;
          }

          if (axis.search("Z") === -1) {
            _tempVector2.z = 1;
          }
        }

        // Apply scale

        //object.scale.copy(this._scaleStart).multiply(_tempVector2);
        const combinedVector = new THREE.Vector3();
        combinedVector.copy(this._scaleStart).multiply(_tempVector2);
        objectViewModel.SetProps("scale", combinedVector);
        if (targetmetaobject === undefined)
          object.scale.set(
            combinedVector.x,
            combinedVector.y,
            combinedVector.z
          );
        if (this.scaleSnap) {
          if (axis.search("X") !== -1) {
            object.scale.x =
              Math.round(object.scale.x / this.scaleSnap) * this.scaleSnap ||
              this.scaleSnap;
          }

          if (axis.search("Y") !== -1) {
            object.scale.y =
              Math.round(object.scale.y / this.scaleSnap) * this.scaleSnap ||
              this.scaleSnap;
          }

          if (axis.search("Z") !== -1) {
            object.scale.z =
              Math.round(object.scale.z / this.scaleSnap) * this.scaleSnap ||
              this.scaleSnap;
          }
        }
      }

      if (objectViewModel.isObjectSelected) {
        transformation_store.setScaleX(this.object.scale.x);
        transformation_store.setScaleY(this.object.scale.y);
        transformation_store.setScaleZ(this.object.scale.z);
      }
    } else if (mode === "rotate") {
      mouseEvent_store.transformControllerTriggeredAfterMoved = true;
      this._offset.copy(this.pointEnd).sub(this.pointStart);

      if (axis === "X" || axis === "Y" || axis === "Z") {
        this.rotationAxis.copy(_unit[axis]);

        _tempVector.copy(_unit[axis]);

        if (space === "local") {
          _tempVector.applyQuaternion(this.worldQuaternion);
        }
        this.rotationAngle = this.pointStart.angleTo(this.pointEnd);
        if (axis === "X") {
          this.rotationAngle *= Math.sign(
            this.pointStart.clone().cross(this._offset.clone()).x *
              Math.sign(_v1.x)
          );
        } else if (axis === "Y") {
          this.rotationAngle *= Math.sign(
            this.pointStart.clone().cross(this._offset.clone()).y *
              Math.sign(_v2.y)
          );
        } else if (axis === "Z") {
          this.rotationAngle *= Math.sign(
            this.pointStart.clone().cross(this._offset.clone()).z *
              Math.sign(_v3.z)
          );
        }
      }

      // Apply rotate
      if (space === "local") {
        object.quaternion.copy(this._quaternionStart);

        object.quaternion
          .multiply(
            _tempQuaternion.setFromAxisAngle(
              this.rotationAxis,
              this.rotationAngle
            )
          )
          .normalize();
        if (controllerBar_store.rotationSnapMode) {
          object.rotation.x =
            Math.round(object.rotation.x / (Math.PI / 4)) * (Math.PI / 4);
          object.rotation.y =
            Math.round(object.rotation.y / (Math.PI / 4)) * (Math.PI / 4);
          object.rotation.z =
            Math.round(object.rotation.z / (Math.PI / 4)) * (Math.PI / 4);
        }
        objectViewModel.SetProps(
          "rotation",
          new Euler().copy(this.object["rotation"])
        );
      } else {
        this.rotationAxis.applyQuaternion(this._parentQuaternionInv);
        object.quaternion.copy(
          _tempQuaternion.setFromAxisAngle(
            this.rotationAxis,
            this.rotationAngle
          )
        );
        object.quaternion.multiply(this._quaternionStart).normalize();
        if (controllerBar_store.rotationSnapMode) {
          object.rotation.x =
            Math.round(object.rotation.x / (Math.PI / 4)) * (Math.PI / 4);
          object.rotation.y =
            Math.round(object.rotation.y / (Math.PI / 4)) * (Math.PI / 4);
          object.rotation.z =
            Math.round(object.rotation.z / (Math.PI / 4)) * (Math.PI / 4);
        }
        objectViewModel.SetProps(
          "rotation",
          new Euler().copy(this.object["rotation"])
        );
      }

      if (objectViewModel.isObjectSelected) {
        transformation_store.setRotationX(
          MathUtils.radToDeg(this.object.rotation.x)
        );
        transformation_store.setRotationY(
          MathUtils.radToDeg(this.object.rotation.y)
        );
        transformation_store.setRotationZ(
          MathUtils.radToDeg(this.object.rotation.z)
        );
      }
    }

    this.dispatchEvent(_changeEvent);
    this.dispatchEvent(_objectChangeEvent);
  }

  pointerUp(pointer) {
    let xyz = false;
    if (
      this.mode === "translate" &&
      this.axis === "XYZ" &&
      objectViewModel.isObjectSelected
    ) {
      let targetmetaobject;
      for (const metaobject of objectViewModel.metaObjects)
        if (metaobject.mesh === this.object) targetmetaobject = metaobject;
      targetmetaobject.AddMeshToRaycasterArray();
      common_store.setIsMoveMode(false);
      common_store.setIsMoveModeEnd(true);
      xyz = true;
    }
    if (pointer.button !== 0) return;

    if (this.dragging && this.axis !== null) {
      _mouseUpEvent.mode = this.mode;
      this.dispatchEvent(_mouseUpEvent);
    }
    isMetaCam = false;
    this.dragging = false;
    this.axis = null;
    let data = null;
    if (isobject && isMoved) {
      if (this.mode === "scale") {
        _currVector.copy(this.object.scale);
        data = {
          type: "scale",
          oldValue: _prevVector.clone(),
          newValue: _currVector.clone(),
        };
      }
      if (this.mode === "translate") {
        if (xyz) {
          _currVector.copy(this.object.position);
          _currRotation.copy(this.object.rotation);
          data = {
            type: "snap",
            newPosition: _currVector.clone(),
            oldPosition: _prevVector.clone(),
            newRotation: _currRotation.clone(),
            oldRotation: _prevRotation.clone(),
          };
        } else {
          _currVector.copy(this.object.position);
          data = {
            type: "position",
            oldValue: _prevVector.clone(),
            newValue: _currVector.clone(),
          };
        }
      }
      if (this.mode === "rotate") {
        _currRotation.copy(this.object.rotation);
        data = {
          type: "rotation",
          oldValue: _prevRotation.clone(),
          newValue: _currRotation.clone(),
        };
      }
      if (xyz) {
        if (object_store.selectedObjects.length === 1) {
          canvasHistory_store.execute(
            new SetTransformXYZCommand(object_store.selectedObjects[0], data)
          );
        }
      } else {
        if (object_store.selectedObjects.length === 1) {
          canvasHistory_store.execute(
            new SetTransformCommand(object_store.selectedObjects[0], data)
          );
        }
      }

      // if (objectViewModel.isObjectSelected) {
      //   let targetmetaobject;
      //   for (const metaobject of objectViewModel.metaObjects)
      //     if (metaobject.mesh === this.object) targetmetaobject = metaobject;
      //   undo_store.AddUnDoCommand(
      //     targetmetaobject,
      //     data,
      //     objectSettingUndo,
      //     objectSettingRedo
      //   );
      // }
      isobject = false;
      common_store.setIsMoveModeEnd(true);
    }

    isMoved = false;
    this._offset1.copy(new Vector3(0, 0, 0));
  }

  dispose() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown);
    this.domElement.removeEventListener("pointermove", this._onPointerHover);
    this.domElement.removeEventListener("pointermove", this._onPointerMove);
    this.domElement.removeEventListener("pointerup", this._onPointerUp);

    this.traverse(function (child) {
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
    });
  }

  // Set current object
  attach(object) {
    this.object = object;
    this.visible = true;

    return this;
  }

  // Detatch from object
  detach() {
    this.object = undefined;
    this.visible = false;
    this.axis = null;

    return this;
  }

  reset() {
    if (!this.enabled) return;

    if (this.dragging) {
      this.object.position.copy(this._positionStart);
      this.object.quaternion.copy(this._quaternionStart);
      this.object.scale.copy(this._scaleStart);

      this.dispatchEvent(_changeEvent);
      this.dispatchEvent(_objectChangeEvent);

      this.pointStart.copy(this.pointEnd);
    }
  }

  // TODO: deprecate

  getaxisType() {
    return this.axisType;
  }

  setaxisType(type) {
    this.axisType = type;

    runInAction(() => {
      controllerBar_store.gizmoStatus = type;
    });
  }

  setSize(size) {
    this.size = size;
  }

  setSpace(space) {
    this.space = space;
  }

  update() {
    console.warn(
      "THREE.TransformControls: update function has no more functionality and therefore has been deprecated."
    );
  }
}

// mouse / touch event handlers

function getPointer(event) {
  if (this.domElement.ownerDocument.pointerLockElement) {
    return {
      x: 0,
      y: 0,
      button: event.button,
    };
  } else {
    const rect = this.domElement.getBoundingClientRect();

    return {
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: (-(event.clientY - rect.top) / rect.height) * 2 + 1,
      button: event.button,
    };
  }
}

function onPointerHover(event) {
  if (!this.enabled) return;

  switch (event.pointerType) {
    case "mouse":
      this.pointerHover(this._getPointer(event));
      break;
    case "pen":
      this.pointerHover(this._getPointer(event));
      break;
    default:
      console.log(
        "THREE.TransformControls: Unsupported pointer type. (TransformControls.js 포인터타입 오류)"
      );
  }
}

function onPointerDown(event) {
  mouseEvent_store.transformControllerTriggeredAfterMoved = false;
  if (!this.enabled) return;

  if (!document.pointerLockElement) {
    this.domElement.setPointerCapture(event.pointerId);
  }

  this.domElement.addEventListener("pointermove", this._onPointerMove);

  this.pointerHover(this._getPointer(event));
  this.pointerDown(this._getPointer(event));
}

function onPointerMove(event) {
  if (!this.enabled) return;

  this.pointerMove(this._getPointer(event));
}

function onPointerUp(event) {
  if (!this.enabled) return;

  common_store.setIsTransControl(false);

  this.domElement.releasePointerCapture(event.pointerId);

  this.domElement.removeEventListener("pointermove", this._onPointerMove);

  this.pointerUp(this._getPointer(event));
}

function intersectObjectWithRay(object, raycaster, includeInvisible) {
  const allIntersections = raycaster.intersectObject(object, true);

  for (let i = 0; i < allIntersections.length; i++) {
    if (allIntersections[i].object.visible || includeInvisible) {
      return allIntersections[i];
    }
  }

  return false;
}

//

// Reusable utility variables

const _tempEuler = new Euler();
const _alignVector = new Vector3(0, 1, 0);
const _zeroVector = new Vector3(0, 0, 0);
const _lookAtMatrix = new Matrix4();
const _identityQuaternion = new Quaternion();
const _dirVector = new Vector3();
const _tempMatrix = new Matrix4();

const _unitX = new Vector3(1, 0, 0);
const _unitY = new Vector3(0, 1, 0);
const _unitZ = new Vector3(0, 0, 1);

const _v1 = new Vector3();
const _v2 = new Vector3();
const _v3 = new Vector3();

class TransformControlsGizmo extends Object3D {
  constructor() {
    super();

    this.type = "TransformControlsGizmo";

    // shared materials

    const gizmoMaterial = new MeshBasicMaterial({
      depthTest: false,
      depthWrite: false,
      fog: false,
      toneMapped: false,
      transparent: true,
    });

    const gizmoLineMaterial = new LineBasicMaterial({
      depthTest: false,
      depthWrite: false,
      fog: false,
      toneMapped: false,
      transparent: true,
    });

    // Make unique material for each axis/color

    const matInvisible = gizmoMaterial.clone();
    matInvisible.opacity = 0.15;

    const matHelper = gizmoLineMaterial.clone();
    matHelper.opacity = 0.5;

    const matRed = gizmoMaterial.clone();
    matRed.color.setHex(0xbc2a3b);

    const matGreen = gizmoMaterial.clone();
    matGreen.color.setHex(0x50bc25);

    const matBlue = gizmoMaterial.clone();
    matBlue.color.setHex(0x616dff);

    const matHelperRed = gizmoMaterial.clone();
    matHelperRed.color.setHex(0xf86c6c);
    matHelperRed.opacity = 0.5;

    const matHelperGreen = gizmoMaterial.clone();
    matHelperGreen.color.setHex(0x6cf89f);
    matHelperGreen.opacity = 0.5;

    const matHelperBlue = gizmoMaterial.clone();
    matHelperBlue.color.setHex(0x6c70f8);
    matHelperBlue.opacity = 0.5;

    const matscaleRed = gizmoMaterial.clone();
    matscaleRed.color.setHex(0xbc2a3b);

    const matscaleGreen = gizmoMaterial.clone();
    matscaleGreen.color.setHex(0x50bc25);

    const matscaleBlue = gizmoMaterial.clone();
    matscaleBlue.color.setHex(0x616dff);
    const matrotateRed = gizmoMaterial.clone();
    matrotateRed.color.setHex(0xbc2a3b);

    const matrotateGreen = gizmoMaterial.clone();
    matrotateGreen.color.setHex(0x50bc25);

    const matrotateBlue = gizmoMaterial.clone();
    matrotateBlue.color.setHex(0x616dff);

    const matRedTransparent = gizmoMaterial.clone();
    matRedTransparent.color.setHex(0xbc2a3b);
    matRedTransparent.opacity = 0.5;

    const matGreenTransparent = gizmoMaterial.clone();
    matGreenTransparent.color.setHex(0x50bc25);
    matGreenTransparent.opacity = 0.5;

    const matBlueTransparent = gizmoMaterial.clone();
    matBlueTransparent.color.setHex(0x616dff);
    matBlueTransparent.opacity = 0.5;

    const matWhiteTransparent = gizmoMaterial.clone();
    matWhiteTransparent.opacity = 0.25;

    const matYellowTransparent = gizmoMaterial.clone();
    matYellowTransparent.color.setHex(0xff880e);
    matYellowTransparent.opacity = 0.25;

    const matYellow = gizmoMaterial.clone();
    matYellow.color.setHex(0xff880e);

    const matGray = gizmoMaterial.clone();
    matGray.color.setHex(0x787878);

    // reusable geometry

    const arrowGeometry = new CylinderGeometry(0, 0.06, 0.1, 12);
    arrowGeometry.translate(0, 0.05, 0);
    const arrowPickerGeometry = new CylinderGeometry(0.08, 0.08, 0.1, 12);
    arrowPickerGeometry.translate(0, 0.05, 0);
    const arrowCenterGeometry = new CylinderGeometry(0.03, 0.03, 0.1, 24);

    const scaleHandleGeometry = new RoundedBoxGeometry(
      0.08,
      0.08,
      0.08,
      3,
      0.02
    );
    const scalePickerGeometry = new RoundedBoxGeometry(0.1, 0.1, 0.1, 3, 0.02);
    scaleHandleGeometry.translate(0, 0.04, 0);

    const lineGeometry = new BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new Float32BufferAttribute([0, 0, 0, 1, 0, 0], 3)
    );

    const lineGeometry2 = new CylinderGeometry(0.005, 0.005, 0.35, 3);
    lineGeometry2.translate(0, 0.25, 0);

    function CircleGeometry(radius, arc, thickness) {
      const geometry = new TorusGeometry(
        radius,
        thickness,
        3,
        64,
        arc * Math.PI * 2
      );
      geometry.rotateY(Math.PI / 2);
      geometry.rotateX(Math.PI / 2);
      return geometry;
    }

    // Special geometry for transform helper. If scaled with position vector it spans from [0,0,0] to position

    function TranslateHelperGeometry() {
      const geometry = new BufferGeometry();

      geometry.setAttribute(
        "position",
        new Float32BufferAttribute([0, 0, 0, 1, 1, 1], 3)
      );

      return geometry;
    }

    // Gizmo definitions - custom hierarchy definitions for setupGizmo() function

    const gizmoTranslate = {
      X: [
        [
          new Mesh(arrowGeometry, matRed),
          [0.6, 0, 0],
          [0, 0, -Math.PI / 2],
          null,
          "translate",
        ],
        [
          new Mesh(lineGeometry2, matRed),
          [0.2, 0, 0],
          [0, 0, -Math.PI / 2],
          null,
          "translate",
        ],
        [
          new Mesh(scaleHandleGeometry, matscaleRed),
          [0.2, 0, 0],
          [0, 0, -Math.PI / 2],
          null,
          "scale",
        ],
        [
          new Mesh(CircleGeometry(0.4, 0.25, 0.005), matrotateRed),
          null,
          [0, Math.PI, 0],
          null,
          "rotate",
        ],
      ],
      Y: [
        [
          new Mesh(arrowGeometry, matGreen),
          [0, 0.6, 0],
          null,
          null,
          "translate",
        ],
        [
          new Mesh(lineGeometry2, matGreen),
          [0, 0.2, 0],
          [0, -Math.PI / 2, 0],
          null,
          "translate",
        ],
        [
          new Mesh(scaleHandleGeometry, matscaleGreen),
          [0, 0.2, 0],
          null,
          null,
          "scale",
        ],
        [
          new Mesh(CircleGeometry(0.4, 0.25, 0.005), matrotateGreen),
          null,
          [0, Math.PI / 2, -Math.PI / 2],
          null,
          "rotate",
        ],
      ],
      Z: [
        [
          new Mesh(arrowGeometry, matBlue),
          [0, 0, -0.6],
          [-Math.PI / 2, 0, 0],
          null,
          "translate",
        ],
        [
          new Mesh(lineGeometry2, matBlue),
          [0, 0, -0.2],
          [-Math.PI / 2, 0, 0],
          null,
          "translate",
        ],
        [
          new Mesh(scaleHandleGeometry, matscaleBlue),
          [0, 0, -0.3],
          [Math.PI / 2, 0, 0],
          null,
          "scale",
        ],
        [
          new Mesh(CircleGeometry(0.4, 0.25, 0.005), matrotateBlue),
          null,
          [0, Math.PI / 2, 0],
          null,
          "rotate",
        ],
      ],
      XY: [
        [
          new Mesh(
            new BoxGeometry(0.07, 0.07, 0.01),
            matBlueTransparent.clone()
          ),
          [0.22, 0.22, 0],
          [0, 0, Math.PI / 4],
          null,
          "scale",
        ],
        [
          new Mesh(
            new CylinderGeometry(0, 0.04, 0.00001, 3),
            matBlueTransparent.clone()
          ),
          [0.33, 0.33, 0],
          [Math.PI / 2, Math.PI / 12, 0],
          null,
          "translate",
        ],
      ],
      YZ: [
        [
          new Mesh(
            new BoxGeometry(0.07, 0.07, 0.01),
            matRedTransparent.clone()
          ),
          [0, 0.22, -0.22],
          [0, Math.PI / 2, Math.PI / 4],
          null,
          "scale",
        ],
        [
          new Mesh(
            new CylinderGeometry(0, 0.04, 0.00001, 3),
            matRedTransparent.clone()
          ),
          [0, 0.33, -0.33],
          [-Math.PI / 12, 0, Math.PI / 2],
          null,
          "translate",
        ],
      ],
      XZ: [
        [
          new Mesh(
            new BoxGeometry(0.07, 0.07, 0.01),
            matGreenTransparent.clone()
          ),
          [0.22, 0, -0.22],
          [-Math.PI / 2, 0, Math.PI / 4],
          null,
          "scale",
        ],
        [
          new Mesh(
            new CylinderGeometry(0, 0.04, 0.00001, 3),
            matGreenTransparent.clone()
          ),
          [0.33, 0, -0.33],
          [0, Math.PI / 12, 0],
          null,
          "translate",
        ],
      ],

      XYZ: [
        [
          new Mesh(arrowCenterGeometry, matGray),
          [0, 0, 0],
          [Math.PI / 2, 0, 0],
          null,
          "translate",
        ],
        [
          new Mesh(CircleGeometry(0.8, 1, 0.005), matYellow),
          null,
          [0, Math.PI / 2, 0],
          null,
          "scale",
        ],
      ],
    };

    const pickerTranslate = {
      X: [
        [
          new Mesh(arrowPickerGeometry, matRed),
          [0.6, 0, 0],
          [0, 0, -Math.PI / 2],
          null,
          "translate",
        ],
        [
          new Mesh(scalePickerGeometry, matscaleRed),
          [0.2, 0, 0],
          [0, 0, -Math.PI / 2],
          null,
          "scale",
        ],
        [
          new Mesh(CircleGeometry(0.4, 0.25, 0.04), matrotateRed),
          null,
          [0, Math.PI, 0],
          null,
          "rotate",
        ],
      ],
      Y: [
        [
          new Mesh(arrowPickerGeometry, matGreen),
          [0, 0.6, 0],
          null,
          null,
          "translate",
        ],
        [
          new Mesh(scalePickerGeometry, matscaleGreen),
          [0, 0.2, 0],
          null,
          null,
          "scale",
        ],
        [
          new Mesh(CircleGeometry(0.4, 0.25, 0.04), matrotateGreen),
          null,
          [0, Math.PI / 2, -Math.PI / 2],
          null,
          "rotate",
        ],
      ],
      Z: [
        [
          new Mesh(arrowPickerGeometry, matBlue),
          [0, 0, -0.6],
          [-Math.PI / 2, 0, 0],
          null,
          "translate",
        ],
        [
          new Mesh(scalePickerGeometry, matscaleBlue),
          [0, 0, -0.3],
          [Math.PI / 2, 0, 0],
          null,
          "scale",
        ],
        [
          new Mesh(CircleGeometry(0.4, 0.25, 0.04), matrotateBlue),
          null,
          [0, Math.PI / 2, 0],
          null,
          "rotate",
        ],
      ],
      XYZ: [
        [
          new Mesh(arrowPickerGeometry, matGray),
          [0, 0, 0],
          [0, 0, 0],
          null,
          "translate",
        ],
        [
          new Mesh(CircleGeometry(0.8, 1, 0.1), matYellow),
          null,
          [0, Math.PI / 2, 0],
          null,
          "scale",
        ],
      ],
    };

    const helperTranslate = {
      X: [
        [
          new Line(lineGeometry, matHelperRed.clone()),
          [-1e3, 0, 0],
          null,
          [1e6, 1, 1],
          "helper",
        ],
      ],
      Y: [
        [
          new Line(lineGeometry, matHelperGreen.clone()),
          [0, -1e3, 0],
          [0, 0, Math.PI / 2],
          [1e6, 1, 1],
          "helper",
        ],
      ],
      Z: [
        [
          new Line(lineGeometry, matHelperBlue.clone()),
          [0, 0, -1e3],
          [0, -Math.PI / 2, 0],
          [1e6, 1, 1],
          "helper",
        ],
      ],
    };
    const helperRotate = {
      X: [
        [
          new Line(lineGeometry, matHelperRed.clone()),
          [-1e3, 0, 0],
          null,
          [1e6, 1, 1],
          "helper",
        ],
        [
          new Mesh(CircleGeometry(0.4, 1, 0.005), matHelperRed),
          null,
          [0, Math.PI, 0],
          null,
          "helper",
        ],
      ],
      Y: [
        [
          new Line(lineGeometry, matHelperGreen.clone()),
          [0, -1e3, 0],
          [0, 0, Math.PI / 2],
          [1e6, 1, 1],
          "helper",
        ],
        [
          new Mesh(CircleGeometry(0.4, 1, 0.005), matHelperGreen),
          null,
          [0, Math.PI / 2, -Math.PI / 2],
          null,
          "helper",
        ],
      ],
      Z: [
        [
          new Line(lineGeometry, matHelperBlue.clone()),
          [0, 0, -1e3],
          [0, -Math.PI / 2, 0],
          [1e6, 1, 1],
          "helper",
        ],
        [
          new Mesh(CircleGeometry(0.4, 1, 0.005), matHelperBlue),
          null,
          [0, Math.PI / 2, 0],
          null,
          "helper",
        ],
      ],
    };
    const helperScale = {
      X: [
        [
          new Line(lineGeometry, matHelperRed.clone()),
          [-1e3, 0, 0],
          null,
          [1e6, 1, 1],
          "helper",
        ],
      ],
      Y: [
        [
          new Line(lineGeometry, matHelperGreen.clone()),
          [0, -1e3, 0],
          [0, 0, Math.PI / 2],
          [1e6, 1, 1],
          "helper",
        ],
      ],
      Z: [
        [
          new Line(lineGeometry, matHelperBlue.clone()),
          [0, 0, -1e3],
          [0, -Math.PI / 2, 0],
          [1e6, 1, 1],
          "helper",
        ],
      ],
    };

    const gizmoRotate = gizmoTranslate;
    const gizmoScale = gizmoTranslate;

    const pickerRotate = pickerTranslate;
    const pickerScale = pickerTranslate;

    // Creates an Object3D with gizmos described in custom hierarchy definition.

    function setupGizmo(gizmoMap) {
      const gizmo = new Object3D();

      for (const name in gizmoMap) {
        for (let i = gizmoMap[name].length; i--; ) {
          const object = gizmoMap[name][i][0].clone();
          const position = gizmoMap[name][i][1];
          const rotation = gizmoMap[name][i][2];
          const scale = gizmoMap[name][i][3];
          const tag = gizmoMap[name][i][4];

          // name and tag properties are essential for picking and updating logic.
          object.name = name;
          object.tag = tag;
          object.gizmotype = tag;
          if (position) {
            object.position.set(position[0], position[1], position[2]);
          }

          if (rotation) {
            object.rotation.set(rotation[0], rotation[1], rotation[2]);
          }

          if (scale) {
            object.scale.set(scale[0], scale[1], scale[2]);
          }

          object.updateMatrix();

          const tempGeometry = object.geometry.clone();
          tempGeometry.applyMatrix4(object.matrix);
          object.geometry = tempGeometry;
          object.renderOrder = Infinity;

          if (object.tag === "helper") {
            const geo_box = new THREE.BoxGeometry(0.0001, 0.0001, 0.0001);
            object.geometry.boundingBox = geo_box;
            object.geometry.boundingSphere = geo_box;
          }
          object.position.set(0, 0, 0);
          object.rotation.set(0, 0, 0);
          object.scale.set(1, 1, 1);

          gizmo.add(object);
        }
      }

      return gizmo;
    }

    // Gizmo creation

    this.gizmo = {};
    this.picker = {};
    this.helper = {};

    this.add((this.gizmo["translate"] = setupGizmo(gizmoTranslate)));
    this.add((this.gizmo["rotate"] = setupGizmo(gizmoRotate)));
    this.add((this.gizmo["scale"] = setupGizmo(gizmoScale)));
    this.add((this.picker["translate"] = setupGizmo(pickerTranslate)));
    this.add((this.picker["rotate"] = setupGizmo(pickerRotate)));
    this.add((this.picker["scale"] = setupGizmo(pickerScale)));
    this.add((this.helper["translate"] = setupGizmo(helperTranslate)));
    this.add((this.helper["rotate"] = setupGizmo(helperRotate)));
    this.add((this.helper["scale"] = setupGizmo(helperScale)));

    // Pickers should be hidden always

    this.picker["translate"].visible = false;
    this.picker["rotate"].visible = false;
    this.picker["scale"].visible = false;
  }

  // updateMatrixWorld will update transformations and appearance of individual handles

  updateMatrixWorld(force) {
    // scale always oriented to local rotation

    const space = this.axisType === "local" ? "local" : "world"; // scale always oriented to local rotation

    const quaternion =
      space === "local" ? this.worldQuaternion : _identityQuaternion;

    // Show only gizmos for current transform mode

    this.gizmo["translate"].visible = this.mode === "translate";
    this.gizmo["rotate"].visible = this.mode === "rotate";
    this.gizmo["scale"].visible = this.mode === "scale";

    this.helper["translate"].visible = this.mode === "translate";
    this.helper["rotate"].visible = this.mode === "rotate";
    this.helper["scale"].visible = this.mode === "scale";

    let handles = [];
    handles = handles.concat(this.picker[this.mode].children);
    handles = handles.concat(this.gizmo[this.mode].children);
    handles = handles.concat(this.helper[this.mode].children);

    for (let i = 0; i < handles.length; i++) {
      const handle = handles[i];

      // hide aligned to camera

      handle.visible = true;
      handle.rotation.set(0, 0, 0);
      handle.position.copy(this.worldPosition);

      let factor;

      if (this.camera.isOrthographicCamera) {
        factor = (this.camera.top - this.camera.bottom) / this.camera.zoom;
      } else {
        factor =
          this.worldPosition.distanceTo(this.cameraPosition) *
          Math.min(
            (1.9 * Math.tan((Math.PI * this.camera.fov) / 360)) /
              this.camera.zoom,
            7
          );
      }

      handle.scale.set(1, 1, 1).multiplyScalar((factor * this.size) / 4);

      // TODO: simplify helpers and consider decoupling from gizmo

      if (handle.tag === "helper") {
        handle.visible = false;

        if (handle.name === "AXIS") {
          handle.position.copy(this.worldPositionStart);
          handle.visible = Boolean(this.axis);

          if (this.axis === "X") {
            _tempQuaternion.setFromEuler(_tempEuler.set(0, 0, 0));
            handle.quaternion.copy(quaternion).multiply(_tempQuaternion);

            if (
              Math.abs(
                _alignVector
                  .copy(_unitX)
                  .applyQuaternion(quaternion)
                  .dot(this.eye)
              ) > 0.9
            ) {
              handle.visible = false;
            }
          }

          if (this.axis === "Y") {
            _tempQuaternion.setFromEuler(_tempEuler.set(0, 0, Math.PI / 2));
            handle.quaternion.copy(quaternion).multiply(_tempQuaternion);

            if (
              Math.abs(
                _alignVector
                  .copy(_unitY)
                  .applyQuaternion(quaternion)
                  .dot(this.eye)
              ) > 0.9
            ) {
              handle.visible = false;
            }
          }

          if (this.axis === "Z") {
            _tempQuaternion.setFromEuler(_tempEuler.set(0, Math.PI / 2, 0));
            handle.quaternion.copy(quaternion).multiply(_tempQuaternion);

            if (
              Math.abs(
                _alignVector
                  .copy(_unitZ)
                  .applyQuaternion(quaternion)
                  .dot(this.eye)
              ) > 0.9
            ) {
              handle.visible = false;
            }
          }

          if (this.axis === "XYZE") {
            _tempQuaternion.setFromEuler(_tempEuler.set(0, Math.PI / 2, 0));
            _alignVector.copy(this.rotationAxis);
            handle.quaternion.setFromRotationMatrix(
              _lookAtMatrix.lookAt(_zeroVector, _alignVector, _unitY)
            );
            handle.quaternion.multiply(_tempQuaternion);
            handle.visible = this.dragging;
          }

          if (this.axis === "E") {
            handle.visible = false;
          }
        } else if (handle.name === "START") {
          handle.position.copy(this.worldPositionStart);
          handle.visible = this.dragging;
        } else if (handle.name === "END") {
          handle.position.copy(this.worldPosition);
          handle.visible = this.dragging;
        } else if (handle.name === "DELTA") {
          handle.position.copy(this.worldPositionStart);
          handle.quaternion.copy(this.worldQuaternionStart);
          _tempVector
            .set(1e-10, 1e-10, 1e-10)
            .add(this.worldPositionStart)
            .sub(this.worldPosition)
            .multiplyScalar(-1);
          _tempVector.applyQuaternion(
            this.worldQuaternionStart.clone().invert()
          );
          handle.scale.copy(_tempVector);
          handle.visible = this.dragging;
        } else {
          handle.quaternion.copy(quaternion);

          if (this.dragging) {
            handle.position.copy(this.worldPositionStart);
          } else {
            handle.position.copy(this.worldPosition);
          }

          if (this.axis) {
            handle.visible = this.axis.search(handle.name) !== -1;
          }
        }

        // If updating helper, skip rest of the loop
        continue;
      }

      // Align handles to current local or world rotation

      handle.quaternion.copy(quaternion);

      if (handle.name.search("XYZ") !== -1) {
        handle.quaternion.setFromRotationMatrix(
          _lookAtMatrix.lookAt(this.eye, _zeroVector, _unitY)
        );
      }

      // Hide disabled axes
      handle.visible =
        handle.visible && (handle.name.indexOf("X") === -1 || this.showX);
      handle.visible =
        handle.visible && (handle.name.indexOf("Y") === -1 || this.showY);
      handle.visible =
        handle.visible && (handle.name.indexOf("Z") === -1 || this.showZ);
      handle.visible =
        handle.visible &&
        (handle.name.indexOf("E") === -1 ||
          (this.showX && this.showY && this.showZ));

      // highlight selected axis

      handle.material._color =
        handle.material._color || handle.material.color.clone();
      handle.material._opacity =
        handle.material._opacity || handle.material.opacity;

      handle.material.color.copy(handle.material._color);
      handle.material.opacity = handle.material._opacity;

      if (this.enabled && this.axis) {
        if (handle.name === this.axis && handle.gizmotype === this.mode) {
          handle.material.color.setHex(0xffff00);
          handle.material.opacity = 1.0;
        } else if (
          this.axis.split("").some(function (a) {
            return handle.name === a;
          }) &&
          handle.mode === this.mode
        ) {
          handle.material.color.setHex(0xffff00);
          handle.material.opacity = 1.0;
        }
      }
    }

    super.updateMatrixWorld(force);
  }
}

//

class TransformControlsPlane extends Mesh {
  constructor() {
    super(
      new PlaneGeometry(100000, 100000, 2, 2),
      new MeshBasicMaterial({
        visible: false,
        wireframe: false,
        side: DoubleSide,
        transparent: true,
        opacity: 0.1,
        toneMapped: false,
      })
    );

    this.type = "TransformControlsPlane";
  }

  updateMatrixWorld(force) {
    const space = this.space;

    this.position.copy(this.worldPosition);

    // scale always oriented to local rotation

    _v1
      .copy(_unitX)
      .applyQuaternion(
        space === "local" ? this.worldQuaternion : _identityQuaternion
      );
    _v2
      .copy(_unitY)
      .applyQuaternion(
        space === "local" ? this.worldQuaternion : _identityQuaternion
      );
    _v3
      .copy(_unitZ)
      .applyQuaternion(
        space === "local" ? this.worldQuaternion : _identityQuaternion
      );

    // Align the plane for current transform mode, axis and space.

    _alignVector.copy(_v2);

    switch (this.mode) {
      case "translate":
      case "scale":
        switch (this.axis) {
          case "X":
            _alignVector.copy(this.eye).cross(_v1);
            _dirVector.copy(_v1).cross(_alignVector);
            break;
          case "Y":
            _alignVector.copy(this.eye).cross(_v2);
            _dirVector.copy(_v2).cross(_alignVector);
            break;
          case "Z":
            _alignVector.copy(this.eye).cross(_v3);
            _dirVector.copy(_v3).cross(_alignVector);
            break;
          case "XY":
            _dirVector.copy(_v3);
            break;
          case "YZ":
            _dirVector.copy(_v1);
            break;
          case "XZ":
            _alignVector.copy(_v3);
            _dirVector.copy(_v2);
            break;
          case "XYZ":
          case "E":
            _dirVector.set(0, 0, 0);
            break;
        }

        break;
      case "rotate":
        switch (this.axis) {
          case "X":
            _dirVector.copy(_v1);
            break;
          case "Y":
            _alignVector.copy(_v3);
            _dirVector.copy(_v2);
            break;
          case "Z":
            _dirVector.copy(_v3);
            break;
        }
        break;
      default:
        // special case for rotate
        _dirVector.set(0, 0, 0);
    }

    if (_dirVector.length() === 0) {
      // If in rotate mode, make the plane parallel to camera
      this.quaternion.copy(this.cameraQuaternion);
    } else {
      _tempMatrix.lookAt(_tempVector.set(0, 0, 0), _dirVector, _alignVector);

      this.quaternion.setFromRotationMatrix(_tempMatrix);
    }

    super.updateMatrixWorld(force);
  }
}

export { TransformControls, TransformControlsGizmo, TransformControlsPlane };
