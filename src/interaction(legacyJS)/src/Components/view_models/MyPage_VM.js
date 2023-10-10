import { common_store } from "../stores/Common_Store";
import { data_store } from "../stores/Data_Store";
import { objectViewModel } from "../view_models/Object_VM";
import { user_store } from "../stores/User_Store";
import { action } from "mobx";
import createSceneByJson from "./CreateSceneByJson_VM";
import { eventSystem_store } from "../stores/Interaction_Stores";
import { mypage_store } from "../stores/MyPage_Store";
import { undo_store } from "../stores/Undo_Store";
import { component_store } from "../stores/Component_Store";
import { projectLisViewModel } from "./ProjectList_VM";

const MyPageVM = {
  get MyPageTab() {
    return mypage_store.MyPageTab;
  },
  get open() {
    return mypage_store.MyPageOpen;
  },
  OnOpen: action(() => {
    projectLisViewModel.setCurrentPage(0);
    projectLisViewModel.requestProjectData();
    if (user_store.isFirstVisit) {
      mypage_store.MyPageTab = 1;
    } else {
      mypage_store.MyPageTab = 0;
    }
    mypage_store.MyPageOpen = true;
  }),
  OnClose: action(() => {
    mypage_store.MyPageOpen = false;
  }),
  OnChangeTabValue: action((event, newValue) => {
    mypage_store.MyPageTab = newValue;
    mypage_store.selProIdx = -1;
  }),
  get selProIdx() {
    return mypage_store.selProIdx;
  },
  LoadComonet: action(async () => {
    common_store.setIsLoading(true);
    undo_store.ClearStore();

    eventSystem_store.clearStore();
    objectViewModel.clearObject_store(); // Wait for clearObject_store() to finish
    component_store.componentName = "";
    if (mypage_store.selProIdx !== 0) {
      let projectDatas = null;
      if (MyPageVM.MyPageTab === 0)
        // user 컴퍼넌트 Tab
        projectDatas = await user_store.GetSelPrj(mypage_store.selProIdx - 1);
      else if (MyPageVM.MyPageTab === 1) {
        //컴포넌트 템플릿 Tab
        const res = await fetch(
          `${
            process.env.REACT_APP_MINIO_URL +
            "/public/exampleProject/" +
            data_store.exampleProjects[mypage_store.selProIdx - 1][1]
          }.json`
        ).then((res) => res.json());

        projectDatas = res.json;
      }

      await createSceneByJson(projectDatas); // Wait for createSceneByJson() to finish rebuilding Objects, Scene

      eventSystem_store.parseInteractions(projectDatas.interactionSystem);
    }
    common_store.setIsLoading(false);
    MyPageVM.OnClose();
  }),
  onClickLoadComponent: action(async (e) => {
    if (!undo_store.ChangeCheck()) {
      mypage_store.check = false;
      MyPageVM.onOpenPopup();
    } else if (mypage_store.selProIdx !== -1 && mypage_store.check) {
      await MyPageVM.LoadComonet();
    }
  }),
  onClickProjectBtn: action((index, id) => {
    mypage_store.selProIdx = index;
    mypage_store.selProId = id;
  }),
  OnClickHanlderDelete: action(async () => {
    if (MyPageVM.selProIdx > 0) {
      const projectId = user_store.my_project_id_list[MyPageVM.selProIdx - 1];
      await TransferData.DeleteDataById(projectId);

      user_store.my_project_id_list.splice(MyPageVM.selProIdx - 1, 1);
      user_store.my_project_name_list.splice(MyPageVM.selProIdx - 1, 1);
      user_store.my_project_createDate_list.splice(MyPageVM.selProIdx - 1, 1);
      user_store.my_project_thumbnail_list.splice(MyPageVM.selProIdx - 1, 1);
      user_store.my_project_url_list.splice(MyPageVM.selProIdx - 1, 1);
    }
  }),

  get popUpOpen() {
    return mypage_store.popUpOpen;
  },
  onOpenPopup: action(() => {
    mypage_store.popUpOpen = true;
  }),
  onClosePopup: action(() => {
    mypage_store.popUpOpen = false;
  }),
  onClickLoadBtn: action(async () => {
    mypage_store.check = true;
    if (mypage_store.selProIdx !== -1 && mypage_store.check) {
      await MyPageVM.LoadComonet();
    }
    MyPageVM.onClosePopup();
    MyPageVM.OnClose();
  }),
};
export { MyPageVM };
