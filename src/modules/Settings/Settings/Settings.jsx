import { FaInfoCircle } from "react-icons/fa";
import { BiListMinus } from "react-icons/bi";
import { HiOutlinePhoneMissedCall } from "react-icons/hi";
import { SiStardock } from "react-icons/si";
import { TbColorSwatch } from "react-icons/tb";
import { GrIntegration } from "react-icons/gr";
import { AdminSettingsStyled } from "./styles";
import { LightTooltip } from "@/components/common";
import { Link, useNavigate } from "react-router-dom";

const AdminSettings = () => {
 
  return (
    <AdminSettingsStyled>
      <div className="top">
        <h1 >Settings</h1>
      </div>
      <div className="bottom">
        <div className="item">
          <div className="top">
            <h2>
              <span className="text">Available Settings</span>
              <LightTooltip arrow placement="top" title="Available Settings">
                <sup className="icon">
                  <FaInfoCircle />
                </sup>
              </LightTooltip>
            </h2>
          </div>
          <div className="bottom">
            <Link to="market-lists">
              <span className="icon">
                <BiListMinus />
              </span>
              <span className="text">Market & Lists</span>
            </Link>
            <Link to="do-not-calls">
              <span className="icon">
                <HiOutlinePhoneMissedCall />
              </span>
              <span className="text">Do Not Calls</span>
            </Link>
            <Link to="export-prospects">
              <span className="icon">
                <SiStardock />
              </span>
              <span className="text">Export Prospects</span>
            </Link>
            <Link to="tags">
              <span className="icon">
                <TbColorSwatch />
              </span>
              <span className="text">Tags</span>
            </Link>
            <Link to="integrations">
              <span className="icon">
                <GrIntegration />
              </span>
              <span className="text">Integrations</span>
            </Link>
          </div>
        </div>
      </div>
    </AdminSettingsStyled>
  );
};

export default AdminSettings;
