import { observable } from "mobx";

const mypage_store = observable({
  MyPageOpen: false,
  MyPageTab: 0,
  selProIdx: -1,
  selProId:'',

  popUpOpen: false,
  check: true,
});

export { mypage_store };
