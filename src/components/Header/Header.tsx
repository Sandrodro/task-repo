import { HeaderContainer } from "./HeaderStyles";
import MyAutoLogo from "../../assets/myAutoLogo.svg";

const Header = () => {
  return (
    <HeaderContainer>
      <img src={MyAutoLogo} alt="Logo"></img>
    </HeaderContainer>
  );
};

export default Header;
