import React, { useEffect, useState } from "react";
import styles from "./CompanyA.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// import { CiShare1 } from "react-icons/ci";
import FormLabel from "@mui/material/FormLabel";
import Components from "@/components";
import { RiShareBoxFill } from "react-icons/ri";
import { commonAPICall } from "@/services/api/common";
import {
  REQUEST_TYPES,
  addSecurity,
} from "@/utils/constant/url";
import SimpleDialogDemo from "@/components/common/ErrorPopup/ErrorPopup";
import { logOut } from "@/store/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const user = JSON.parse(
  localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
);
const CompanySecurity = () => {
  const [activeSave, setActiveSave] = useState("google");
  const [isLoading, setLoader] = useState(false);
  const [successOpen , setSuccessOpen] = useState(false)
  const [status , setStatus] = useState("success")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateAuthentication = async(value = "password")=>{
    setStatus("loading")
    try {
      setLoader(true);
      const payload = {};
      if(value === "password"){
        payload.isPasswordLogin = true;
      }else {
        payload.isGoogleLogin= true;
      }
      const { data, isError, message , sessionExpired } = await commonAPICall(
        REQUEST_TYPES.POST,
        addSecurity(user?._id),
        payload
      );
      setLoader(false);
      setSuccessOpen(true)
      setStatus("success")
      if(sessionExpired){
   

      
        // sessionStorage.clear()
        dispatch(logOut());

        navigate("/Login");

      }
      if (isError) {
        return toast.error(message);
      }
      setActiveSave(value);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={styles.CompanyInfo_container}>
      <div style={{paddingBottom:"20px"}} className={styles.Company_securityLayout}>
        <div className={styles.companyInfo_title}>Authentication Method</div>
        <div className={styles.Company_securityDis}>
        Immediately after switching authentication method, all users will be logged out.
        </div>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Password"
            name="radio-buttons-group"
           
          >
            <div className={styles.Company_securitySelection}>
              <div
                style={{
                  borderBottom: "1px solid #E2E7E4",
                  padding: "16px 16px",
                }}
              >
                <div>
                  <div>
                    <FormControlLabel
                      value={"password"}
                      onChange={()=> updateAuthentication('password')}
                      checked={activeSave === "password" ? true : false}
                      control={
                        <Radio
                          sx={{
                            color: "#00b388",

                            transform: "scale(1.5)",
                            "&.Mui-checked": {
                              color: "#00b388", // Radio button color when checked
                            },
                          }}
                        />
                      }
                      label="Password"
                      sx={{
                        ".MuiFormControlLabel-label": {
                          fontSize: "14px", // Label size
                          fontWeight: 500,
                          lineHeight: "18px",
                          color: "#2E2E2E",
                        },
                      }}
                    />
                  </div>
                  <div className={styles.securityDis}>
                    Allow users to uniquely sign in with their password
                  </div>
                </div>
              </div>
              <div style={{ padding: "16px 16px" }}>
                <div>
                  <div style={{ display: "flex" }}>
                    <div style={{ flexGrow: 1 }}>
                      <FormControlLabel
                        value="google"
                        onChange={()=> updateAuthentication('google')}
                        checked={activeSave === "google" ? true : false}
                        control={
                          <Radio
                            sx={{
                              color: "#00b388",

                              transform: "scale(1.5)",
                              "&.Mui-checked": {
                                color: "#00b388", // Radio button color when checked
                              },
                            }}
                          />
                        }
                        label="Google"
                        sx={{
                          ".MuiFormControlLabel-label": {
                            fontSize: "14px", // Label size
                            fontWeight: 500,
                            lineHeight: "18px",
                            color: "#2E2E2E",
                          },
                        }}
                      />
                    </div>
                    <div>
                      <a
                        style={{ display: "flex", justifyContent: "center" }}
                        className={styles.Company_securityLink}
                      >
                        Learn more &nbsp; <RiShareBoxFill />
                      </a>
                    </div>
                  </div>
                  <div className={styles.securityDis}>
                    Allow users to uniquely sign in with their Google account
                  </div>
                </div>
              </div>
            </div>
          </RadioGroup>
        </FormControl>

        {/* <div>
          <button className={styles.Company_securityMAnage}>
            Manage Privileged Users
          </button>
        </div> */}
        {/* <div
          style={{
            height: activeSave ? "" : "0px",
            padding: activeSave ? "" : "0px 20px",
          }}
          className={styles.CompanyInfo_fieldsBottom}
        >
          <button
            onClick={() => setActiveSave(false)}
            className={styles.CompanyInfo_undo}
          >
            Undo
          </button>
          <button className={styles.CompanyInfo_save}>Save changes</button>
        </div> */}
      </div>

      {/* <div className={styles.Company_securityLayoutSec}>
        <div className={styles.companyInfo_title}>
          Two-Factor Authentication
        </div>
        <div
          style={{ width: "55%", marginBottom: "20px" }}
          className={styles.Company_securityDis}
        >
          Add an extra layer of security! Once enabled, all accounts that can
          access the Aircall Dashboard are protected.
          <a className={styles.Company_securityLink}>Learn more</a>
        </div>

        <div>
          <button className={styles.CompanyInfo_save}>
            Enable Two-Factor Authentication
          </button>
        </div>
      </div> */}
      <SimpleDialogDemo cat={status} errorMessage={status == "loading" ? "Please wait" : "changes has been saved"} open={successOpen} setOpen={setSuccessOpen} />
    </div>
  );
};

export default CompanySecurity;
