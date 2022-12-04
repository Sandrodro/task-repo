import { HeaderContainer } from "./HeaderStyles";
import MyAutoLogo from "../../assets/myAutoLogo.svg";

const Header = () => {
  return (
    <HeaderContainer>
      <img src={MyAutoLogo}></img>
    </HeaderContainer>
  );
};

export default Header;
