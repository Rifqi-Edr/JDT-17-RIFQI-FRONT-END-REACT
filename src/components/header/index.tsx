import React from "react";
import { useToken } from "../../hooks/useToken";

const Header = () => {
  const { logout } = useToken();
  return (
    <div>
      <button onClick={logout} className="text-blue-200" >Logout</button>
    </div>
  );
};

export default Header;