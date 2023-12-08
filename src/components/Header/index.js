import React from "react";
import { HeaderContainer } from "./styles";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { logout } = useAuth();
  return (
    <HeaderContainer>
      <h1>Hub SearchTag</h1>
      <button onClick={logout}>Sair</button>
    </HeaderContainer>
  );
};

export default Header;
