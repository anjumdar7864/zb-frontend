import Raect, { useState, useEffect } from "react";
import styles from "./CompanyA.module.css";
import { commonAPICall } from "@/services/api/common";
import { getInitials } from "@/utils/helpers";
import {
  REQUEST_TYPES,
  companyInfoUrl,
  getAdminById,
  deleteCompanyLogo
} from "@/utils/constant/url";
import { toast } from "react-hot-toast";
import CircularProgress from '@mui/material/CircularProgress';
import { CircularLoader } from "@/components/common";


const notify = (e) => toast.success(e);

const CompanyInfo = () => {
  const [activeSave, setActiveSave] = useState(false);
  const [companyLogo, setCompanyLogo] = useState("");
  const [state, setState] = useState({
    companyWebsite: "",
    companyName: "",
    companyInfo: {},
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setLoader] = useState("");
  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );

  const fetchData = async () => {
    try {
      // setLoader("imgLoading");
      const { data, isError, message, sessionExpired} = await commonAPICall(
        REQUEST_TYPES.GET,
        getAdminById(user?._id)
      );
      setLoader("");
      if(sessionExpired){
   

      
        // sessionStorage.clear()
        dispatch(logOut());

        navigate("/Login");

      }
      if (isError) {
        return toast.error(message);
      }
      const { companyLogo, companyName, companyWebsite } = data || {};
      setCompanyLogo(companyLogo);
      setState({
        ...state,
        companyName,
        companyWebsite,
        companyInfo: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const submitHandler = async (payload = "") => {
    try {
      // setLoader(true);
      const { data, isError, message , sessionExpired } = await commonAPICall(
        REQUEST_TYPES.PATCH,
        companyInfoUrl(user?._id),
        payload
      );
      setLoader("");
      if(sessionExpired){
   

      
        // sessionStorage.clear()
        dispatch(logOut());

        navigate("/Login");

      }
      if (isError) {
        return toast.error(message);
      }
      setActiveSave(false);
      notify("Updated successfully.")
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const fileHandler = async (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      // Check if the file is an image
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed!");
        e.target.value = ""; // Clear the input
        return; // Stop further processing if not an image
      }
      setLoader("imgLoading");
      const formData = new FormData();
      formData.append("companyLogo", file);
      const data = await submitHandler(formData);
      e.target.value = "";
      const { companyLogo, companyName, companyWebsite } = data || {};
      setCompanyLogo(companyLogo);
      setLoader("");
      setState({
        ...state,
        companyName,
        companyWebsite,
      });
    }
  };
  const changeHandler = (e) => {
    const { name, value } = e?.target || {};
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
    setState({
      ...state,
      [name]: value,
    });
    setActiveSave(true);
  };
  const blurHandler = (e) => {
    const { name, value } = e?.target || {};
    if (!value && name !== "companyWebsite") {
      setErrors({
        ...errors,
        [name]: "field is required.",
      });
    }
    // setActiveSave(true);
  };
  const undoHandler = () => {
    const { companyInfo, companyName, companyWebsite } = state;
    if (
      companyName !== companyInfo?.companyName ||
      companyWebsite !== companyInfo?.companyWebsite
    ) {
      setState({
        ...state,
        companyName: companyInfo?.companyName || "",
        companyWebsite: companyInfo?.companyWebsite || "",
      });
      setErrors({});
    }
    setActiveSave(false);
  };
  const saveHandler = async () => {
    setLoader("saveLoader")
    const { companyName, companyWebsite } = state;
    const payload = { companyName, companyWebsite };
    const data = await submitHandler(payload);
    
    
    
  };
  const deleteLogoHandler = async () => {
    try {
      setLoader("imgLoading");
      const { data, isError , sessionExpired } = await commonAPICall(REQUEST_TYPES.DELETE, deleteCompanyLogo(user?._id));
      if(sessionExpired){
   

      
        // sessionStorage.clear()
        dispatch(logOut());

        navigate("/Login");

      }
      if (!isError) {
        setCompanyLogo("");
        setLoader("");
        return toast.success(data?.message);
      }
    } catch (error) {

    }
  }
  return (
    <div className={styles.CompanyInfo_container}>
      <div>
        <div style={{ padding: "20px" }} className={styles.CompanyInfo_fieldsContainer} >
          <div style={{ height: "60px", display: "flex", alignItems: "center" }}>
            <div className={styles.companyInfo_title}>Company Logo</div>

          </div>

          <div className={styles.CompanyInfo_upload}>
            <div className={styles.CompanyInfo_uploadTop}>
              {
                companyLogo ?
                  <img className={styles.CompanyInfo_logoImg} width={"80px"} height={"80px"} src={companyLogo} />
                  :
                  <span className={styles.name_intial}>

                    {getInitials(state?.companyName || "", true)}

                  </span>
              }

            </div>
            <div className={styles.CompanyInfo_uploadBottom}>
              {/* <button className={styles.CompanyInfo_button}>Upload Picture</button> */}
              {
                companyLogo ?
                  <div style={{ width: "100%", height: "100%" }}>
                    {
                      isLoading ==  "imgLoading" ?
                        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                          {/* <CircularProgress sx={{ color: "#00b388" }} size="20px" disableShrink /> */}
                          <CircularLoader/>
                        </div>
                        :
                        <div style={{ width: "100%", height: "100%" }}>
                          <div className={styles.CompanyInfo_UploadedLayout} style={{ height: "100%" }}>
                            <div className={styles.CompanyInfo_UploadedLayoutChild} style={{ borderRight: "1px solid #E2E7E4" }}>
                              <span onClick={() => deleteLogoHandler()} style={{ paddingTop: "0px" }} className={styles.CompanyInfo_button} >Delete picture</span>
                            </div>


                            <div className={styles.CompanyInfo_UploadedLayoutChild} >
                              <label style={{ paddingTop: "8px" }} className={styles.CompanyInfo_button}>
                                Upload Picture

                                <input
                                  onChange={(e) => fileHandler(e)}
                                  type="file"
                                  name="companyLogo"
                                  style={{ visibility: " hidden" }}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                    }

                  </div>
                  :
                  <label className={styles.CompanyInfo_button}>
                    {isLoading  ==  "imgLoading" ? <div style={{ display: "flex", justifyContent: "center" }}> <CircularLoader/></div> : "Upload Picture"}

                    <input
                      onChange={(e) => fileHandler(e)}
                      type="file"
                      name="companyLogo"
                      style={{ visibility: " hidden" }}
                    />
                  </label>
              }

            </div>
          </div>


        </div>


        <div className={styles.CompanyInfo_fieldsContainer}>
          <div className={styles.CompanyInfo_fieldsTop}>
            <div className={styles.companyInfo_title}>Company information</div>
            <div className={styles.CompanyInfo_fields}>
              <div  className={styles.CompanyInfo_fieldsInputLayout} >
                <div>
                  <label className={styles.CompanyInfo_fieldsLabel}>Name</label>
                </div>

                <input
                  type="text"
                  name="companyName"
                  value={state?.companyName}
                  onChange={(e) => changeHandler(e)}
                  onBlur={(e) => blurHandler(e)}
                  className={styles.CompanyInfo_fieldsInput}
                  placeholder="Enter name"
                  style={{ border: errors.companyName && "solid 1px #FF8DA8" }}
                />
                <div style={{ color: "#EA3815", fontSize: "14px", fontWeight: "400", lineHeight: "22px", marginTop: "5px", display: errors.companyName ? "block" : "none" }}>This field is required</div>
              </div>
              <div className={styles.CompanyInfo_fieldsInputLayout}>
                <div>
                  <label className={styles.CompanyInfo_fieldsLabel}>
                    Website
                  </label>
                </div>

                <input
                  type="text"
                  name="companyWebsite"
                  value={state?.companyWebsite}
                  onChange={(e) => changeHandler(e)}
                  onBlur={(e) => blurHandler(e)}
                  className={styles.CompanyInfo_fieldsInput}
                  placeholder="Enter name"
                />
                <label>
                  {errors["companyWebsite"] ? errors["companyWebsite"] : ""}
                </label>
              </div>
            </div>
          </div>

          <div
            style={{
              height: activeSave ? "" : "0px",
              padding: activeSave ? "" : "0px 20px",
            }}
            className={styles.CompanyInfo_fieldsBottom}
          >
            <button
              onClick={() => undoHandler()}
              className={styles.CompanyInfo_undo}
            >
              Undo
            </button>
            {isLoading == "saveLoader" ? 
            <div style={{width:"133px" , display:"flex" , justifyContent:"center"}}>
              <CircularLoader/>
              </div>
              :
            <button
              onClick={() => saveHandler()}
              className={styles.CompanyInfo_save}
              disabled={!state?.companyName}
            >
           Save changes
            
            </button>
}
          </div>
        </div>
      </div>




    </div>
  );
};
export default CompanyInfo;
