// import React from 'react'
// import styles from "./CompanyA.module.css";
// import { Checkbox } from '@mui/material';
// import { IoMdInformationCircleOutline } from 'react-icons/io';


// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


// const SubscribeFour = () => {
//     return (
//         <div >
//             <div style={{ paddingLeft: "30px", paddingRight: "20px", fontSize: "20px", lineHeight: "24px" }} className={styles.companyInfo_title}>You are about to subscribe to Aircall's Essentials plan</div>
//             <div>
//                 <div style={{ paddingLeft: "30px", paddingRight: "30px" }} className={styles.SubscribeFourText}>
//                     Once you have read and accepted Airco's Terms and Conditions, you will be able to fully set up your new telephony system and start levelling up your business.
//                 </div>
//                 <br />

//                 <div style={{ paddingLeft: "30px", paddingRight: "30px" }} className={styles.SubscribeFourText}>
//                     By submitting the information, you confirm that you have read and acknowledged <span style={{ color: "#00BD82" }}>ZeitBlast's Privacy Policy</span>.
//                 </div>
//                 <br />
//                 <div style={{ paddingLeft: "30px", paddingRight: "30px" }} className={styles.SubscribeFourText}>
//                     <span> <Checkbox
//                         sx={{
//                             color: '#00BD82',
//                             borderRadius: "5px",
//                             '&.Mui-checked': {
//                                 color: '#00BD82',
//                             },
//                         }} {...label} /></span> I understand and agree to  <span style={{ color: "#00BD82" }}>ZeitBlast's, Inc. Terms & Conditions</span>.
//                 </div>
//                 <br />
//                 <div style={{ paddingLeft: "30px", paddingRight: "30px", marginBottom: "20px", display: "flex" }} className={styles.SubscribeFourText}>
//                     <div style={{ color: "#00BD82", width: "18px", height: "18px", margin: "0px 10px" }}><IoMdInformationCircleOutline /></div>  <span style={{ marginLeft: "5px" }}>Taxes will be calculated according to your local tax regulations. You will be charged for the subscription, plus tax, usually within a working day.</span>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default SubscribeFour




import React from "react";
import styles from "./CompanyA.module.css";
import { Checkbox } from "@mui/material";
import { IoMdInformationCircleOutline } from "react-icons/io";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const SubscribeFour = ({ isAgreed, setIsAgreed , subscribeTitle }) => {
  return (
    <div>
      <div
        style={{
          paddingLeft: "30px",
          paddingRight: "20px",
          fontSize: "20px",
          lineHeight: "24px",
        }}
        className={styles.companyInfo_title}
      >
       {` You are about to subscribe to ${subscribeTitle} plan`}
      </div>
      <div>
        <div
          style={{ paddingLeft: "30px", paddingRight: "30px" }}
          className={styles.SubscribeFourText}
        >
          Once you have read and accepted Zeitblast's Terms and Conditions, you will
          be able to fully set up your new messaging  system and start levelling
          up your business.
        </div>
        <br />

        <div
          style={{ paddingLeft: "30px", paddingRight: "30px" }}
          className={styles.SubscribeFourText}
        >
          By submitting the information, you confirm that you have read and
          acknowledged{" "}
          <span style={{ color: "#00BD82" }}>ZeitBlast's Privacy Policy</span>.
        </div>
        <br />
        <div
          style={{ paddingLeft: "30px", paddingRight: "30px" }}
          className={styles.SubscribeFourText}
        >
          <span>
            <Checkbox
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              sx={{
                color: "#00BD82",
                borderRadius: "5px",
                "&.Mui-checked": {
                  color: "#00BD82",
                },
              }}
            />
          </span>
          I understand and agree to{" "}
          <span style={{ color: "#00BD82" }}>
            ZeitBlast's, Inc. Terms & Conditions
          </span>
          .
        </div>
        <br />
        <div
          style={{
            paddingLeft: "30px",
            paddingRight: "30px",
            marginBottom: "20px",
            display: "flex",
          }}
          className={styles.SubscribeFourText}
        >
          <div
            style={{
              color: "#00BD82",
              width: "18px",
              height: "18px",
              margin: "0px 10px",
            }}
          >
            <IoMdInformationCircleOutline />
          </div>{" "}
          <span style={{ marginLeft: "5px" }}>
            Taxes will be calculated according to your local tax regulations.
            You will be charged for the subscription, plus tax, usually within a
            working day.
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubscribeFour;
