import { Outlet } from "react-router-dom";
import { HeaderSidebarStyled } from "./styles";
import Components from "@/components";

const HeaderSidebar = () => {
  return (
    <HeaderSidebarStyled>
      <div className="top">
        <Components.Common.Header />
      </div>
      <div className="bottom">
        <div className="left">
          <Components.Common.Sidebar />
        </div>
        <div className="right">
          <Outlet />
        </div>
      </div>
    </HeaderSidebarStyled>
  );
};

export default HeaderSidebar;
