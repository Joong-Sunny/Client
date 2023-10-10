import { common_store } from "./Common_Store";
import { user_store } from "./User_Store";
import { data_store } from "./Data_Store";
import {
  eventSystem_store,
  string_store,
  interactionhistory_store,
} from "./Interaction_Stores";
import { hierarchy_store } from "./Hierarchy_Store";
import { scene_store } from "./Scene_Store";
import { mypage_store } from "./MyPage_Store";
import canvasHistory_store from "./CanvasHistory_Store";
import { object_store } from "./Object_Store";
import { renderingContext_store } from "./RenderingContext_Store";
const storeContainer = {
  common_store,
  user_store,
  data_store,
  object_store,
  scene_store,
  eventSystem_store,
  string_store,
  hierarchy_store,
  interactionhistory_store,
  mypage_store,
  canvasHistory_store,
  renderingContext_store,
};

export default storeContainer;
