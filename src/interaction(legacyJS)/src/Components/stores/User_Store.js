import { observable } from "mobx";
import { componentViewModel } from "../view_models/Component_VM";
import UUIDGenerator from "../../utils/uuid";

const user_store = observable({
  email: "",
  id: null,
  guest: false,
  accessToken: "",
  projectData: null,
  selectedProject: -1,
  currentPage: 0,
  searchKeyword: "",
  my_project_thumbnail_list: [],
  my_project_search_list: [],
  my_project_name_list: [],
  my_project_id_list: [],
  my_project_url_list: [],
  my_project_json: null,
  my_project_ui_image_list: [],
  my_project_template_list: [],
  my_project_createDate_list: [],
  my_project_updateDate_list: [],
  my_project_interaction: null,
  isFirstVisit: false,
  popUpOpen: false,

  setUserId(id) {
    user_store.id = id;
  },

  DeleteProject() {
    this.my_project_thumbnail_list = [];
    this.my_project_search_list = [];
    this.my_project_url_list = [];
    this.my_project_name_list = [];
    this.my_project_json_list = [];
    this.my_project_id_list = [];
    this.my_project_ui_image_list = [];
    this.my_project_template_list = [];
    this.my_project_createDate_list = [];
    this.my_project_updateDate_list = [];
  },
  setCookie(key, value) {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    document.cookie =
      key +
      "=" +
      value +
      ";expires=" +
      date.toUTCString() +
      ";path=/;SameSite=Lax;";
  },

  getCookie(key) {
    const value = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
    return value ? value[2] : null;
  },

  delCookie(key) {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    document.cookie = key + "=; expires=" + date.toUTCString() + ";";
  },

  checkCookie(key) {
    return user_store.getCookie(key) != null ? true : false;
  },

  AddUserData(data) {
    user_store.my_project_id_list.push(data.id);
    user_store.my_project_name_list.push(data.name);

    user_store.my_project_thumbnail_list.push(data.thumbnail);
    user_store.my_project_url_list.push(data.url);
    if (data.updatedAt) {
      user_store.my_project_createDate_list.push(
        user_store.timeForTodat(data.updatedAt)
      );
    }
    this.selectedProject = user_store.my_project_id_list.length - 1;
    // user_store.my_project_json_list.push(jsonParse.metaObjects);
    // user_store.my_project_interaction_list.push(jsonParse.interactionSystem);
  },
  SearchUserData(data, offeset) {
    if (offeset === 0) user_store.my_project_search_list = [];
    user_store.my_project_search_list = [
      ...user_store.my_project_search_list,
      ...data,
    ];
  },
  async UpdataUserData(data) {
    user_store.my_project_name_list[this.selectedProject] = data.name;
    user_store.my_project_thumbnail_list[this.selectedProject] =
      data.thumbnail + `?v=${UUIDGenerator.run()}`;
    user_store.my_project_url_list[this.selectedProject] = data.url;
    user_store.my_project_json = data.metaObjects;
    user_store.my_project_interaction = data.interactionSystem;
  },

  timeForTodat(value) {
    const timeValue = new Date(value);
    const year = timeValue.getFullYear();
    const month = ("0" + (timeValue.getMonth() + 1)).slice(-2);
    const day = ("0" + timeValue.getDate()).slice(-2);
    const hours = ("0" + timeValue.getHours()).slice(-2);
    const minutes = ("0" + timeValue.getMinutes()).slice(-2);
    const formattedTime = `${year}년-${month}월-${day}일 ${hours}:${minutes}`;

    return formattedTime;
  },
  setCurrentPage(page) {
    user_store.currentPage = page;
  },
  async GetSelPrj(index) {
    this.selectedProject = index;

    componentViewModel.setComponentName(
      user_store.my_project_name_list[this.selectedProject]
    );

    const jsonInfo = await fetch(
      user_store.my_project_url_list[this.selectedProject]
    ).then((res) => res.json());

    this.projectDatas = jsonInfo;

    return this.projectDatas;
  },

  async UpdateProjectName(name, index) {
    const seldProjId = user_store.my_project_id_list[index];

    const datas = { name: name };

    const res = TransferData.UpdateDataById(seldProjId, datas);
    if (res) user_store.my_project_name_list[index] = name;
  },
  GetProjID() {
    return user_store.my_project_id_list[this.selectedProject];
  },
  isProjectName(name) {
    for (const projName of user_store.my_project_name_list) {
      if (projName === name) return true;
    }
    return false;
  },
});

export { user_store };
