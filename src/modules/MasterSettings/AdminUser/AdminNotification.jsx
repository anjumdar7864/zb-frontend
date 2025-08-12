import React, { useState } from "react";
import styles from "./AdminNotification.module.css";

const AdminNotification = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  return (
    <div className={styles.CompanyInfo_container}>
      <div
        style={{ padding: "20px" }}
        className={styles.CompanyInfo_fieldsContainer}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className={styles.companyInfo_title}>E-mail notifications</div>
        </div>
        <div>
          <div>
            <p className={styles.companyInfo_p1}>Calls assigned to you</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #E8EAED",
              }}
            >
              <p className={styles.companyInfo_p2}>
                Receive an e-mail for each call assigned to you
              </p>
              <div
                onClick={handleToggle}
                style={{
                  width: "40px",
                  height: "20px",
                  background: isToggled ? "#5BF1B2" : "#ccc",
                  borderRadius: "15px",
                  cursor: "pointer",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isToggled ? "flex-end" : "flex-start",
                  padding: "2px",
                  transition: "background 0.3s ease",
                }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    background: "#fff",
                    borderRadius: "50%",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                    transition: "transform 0.3s ease",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div style={{ paddingTop: "16px" }}>
            <p className={styles.companyInfo_p1}>
              Daily summary of calls to follow up
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #E8EAED",
              }}
            >
              <p className={styles.companyInfo_p2}>
                Every morning receive a list of calls to follow-up.
              </p>
              <div
                onClick={handleToggle}
                style={{
                  width: "40px",
                  height: "20px",
                  background: isToggled ? "#5BF1B2" : "#ccc",
                  borderRadius: "15px",
                  cursor: "pointer",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isToggled ? "flex-end" : "flex-start",
                  padding: "2px",
                  transition: "background 0.3s ease",
                }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    background: "#fff",
                    borderRadius: "50%",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                    transition: "transform 0.3s ease",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div style={{ paddingTop: "16px" }}>
            <p className={styles.companyInfo_p1}>Voicemails</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                // borderBottom: "1px solid #E8EAED",
              }}
            >
              <p className={styles.companyInfo_p2}>
                Receive voicemails by e-mail.
              </p>
              <div
                onClick={handleToggle}
                style={{
                  width: "40px",
                  height: "20px",
                  background: isToggled ? "#5BF1B2" : "#ccc",
                  borderRadius: "15px",
                  cursor: "pointer",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isToggled ? "flex-end" : "flex-start",
                  padding: "2px",
                  transition: "background 0.3s ease",
                }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    background: "#fff",
                    borderRadius: "50%",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                    transition: "transform 0.3s ease",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotification;
