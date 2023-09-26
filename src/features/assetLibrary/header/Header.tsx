import { basicColors } from "@/resources/colors/colors";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

const StyledSpan = styled.span`
  font-size: 18px;
  font-weight: 500;
  font-family: "SourceHanSansKR";
  color: ${basicColors.white};
`;

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <Container>
      <StyledSpan>{title}</StyledSpan>
    </Container>
  );
};

export default Header;
