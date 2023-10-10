import Root from "./Components/views/00. Common/Root_V";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { loadersViewModel } from "./Components/view_models/Loaders_VM";
import { loader_store } from "./Components/stores/Loader_Store";
import getUrlParams from "./utils/getUrlParams";
import storeContainer from "./Components/stores/storeContainer";

const App = observer(() => {
  const { user_store } = storeContainer;
  useEffect(() => {
    loadersViewModel.init();
  }, [loader_store]);

  useEffect(() => {
    async function init() {
      const params = getUrlParams();
      user_store.setUserId(params.id);
    }
    init();
  }, []);

  return <Root />;
});

export default App;
