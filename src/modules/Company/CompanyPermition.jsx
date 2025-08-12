import React from "react";
import styles from "./CompanyA.module.css";
import TableA from "./Billingtable";
import PermissionTable from "./PermissionTable";
const CompanyPermition = () => {
  return (
    <div className={styles.CompanyInfo_container}>
      <div
        style={{
          height: "fitContent",
          paddingLeft: " 0px",
          paddingRight: "0px",
          overflow: "hidden",
        }}
        className={styles.Company_securityLayout}
      >
        <div
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingBottom: "10px",
          }}
          className={styles.companyInfo_title}
        >
          Roles Access to Dashboard
        </div>
        <div className={styles.companyPermission_dis}>
          Read the &nbsp;
          <span style={{ color: "#00BD82" }}>Knowledge Base article</span> to
          learn how to use new dashboard Roles.
        </div>
        <div>
          <PermissionTable />
        </div>
      </div>
    </div>
  );
};

export default CompanyPermition;
