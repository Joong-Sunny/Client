import styled from "styled-components";
import Category from "./category/Category";
import { bgColors } from "@/resources/colors/colors";
import Toolbar from "./assetList/toolbar";
import AssetGrid from "./assetList/grid/AssetGrid";

const Container = styled.div`
  display: flex;
  background-color: ${bgColors[222222]};
  color: white;
  height: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Body = () => {
  return (
    <Container>
      <Category />
      {
        //here comes asset list tab
      }
      <ContentContainer>
        <Toolbar />
        <AssetGrid />
      </ContentContainer>
    </Container>
  );
};

export default Body;
