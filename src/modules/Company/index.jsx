import Raect, { useState, useEffect } from "react";
import CompanyInfo from "./CompanyInfo";
import styles from "./CompanyA.module.css";
import { set } from "lodash-es";
import CompanyPlan from "./CompanyPlan";
import CompanySecurity from "./CompanySecurity";
import CompanyBilling from "./CompanyBilling";
import CompanyPermition from "./CompanyPermition";
import { useLocation } from 'react-router-dom';

const Company = () => {
  const [tab, setTab] = useState("General");
  const [tabList, setTabList] = useState([
    "General",
    "Plan",
    "Billing",
    "Roles & Permissions",
    "Security",
  ]);
  const content = {
    General: <CompanyInfo />,
    Plan: <CompanyPlan />,
    Security: <CompanySecurity />,
    Billing: <CompanyBilling />,
    "Roles & Permissions": <CompanyPermition />,
  };
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
 
  // console.log("check plan", queryParams.get('plan'));

  useEffect(() => {
    if (queryParams.get('plan')) {
      setTab("Plan")
    }
  }, [queryParams.get('plan')])
  
  return (
    <div style={{ height:"100%" , maxHeight:"100%" ,  display:"flex" , flexDirection:"column" , fontFamily:"Fellix" }}>
      <div className={styles.bg}>
        <div style={{fontFamily:"Fellix"}} className={styles.company_logo}>My Company </div>
        <div className={styles.tab_container}>
          {tabList.map((data, index) => {
            return (
              <span
                style={{ boxShadow: data == tab && " 0 2px 0 0 #00BD82" }}
                className={styles.tab_item}
                onClick={() =>
                  setTab(data)
                }
              >
                <span className={styles.tab_itemText}>
                {data}
                </span>
              </span>
            );
          })}
        </div>
      </div>
      <div style={{flexGrow:1 ,  overflow:"auto"}}>
        {content[tab]}
      </div>
    </div>
  );
};
export default Company;
