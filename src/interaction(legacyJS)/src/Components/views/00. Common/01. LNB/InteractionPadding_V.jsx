import { Box, Button } from "@mui/material";
import storeContainer from "../../../stores/storeContainer";
import { observer } from "mobx-react-lite";

const EmptyButton = () => {
  return (
    <Button disabled>
      <Box width="32" />
    </Button>
  );
};

const InteractionPadding = observer(() => {
  const { common_store } = storeContainer;
  return (
    common_store.curCategory === "event" && (
      <>
        <EmptyButton />
        <EmptyButton />
      </>
    )
  );
});

export default InteractionPadding;
