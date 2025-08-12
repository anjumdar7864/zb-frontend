import React from "react";
import { MdClose } from "react-icons/md";
import { useFormik } from "formik";
import { masterUserSchema } from "@/schema";
import styles from "./AdminUser.module.css";
import { MyCheckbox } from "@/components/common";
import { Alert, Button, Stack } from "@mui/material";
import { IoMdAlert } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { CreateNewUser } from "@/store/actions";
import toast from "react-hot-toast";
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
};



const CreateAdminModal = ({ onClose, handleDismiss, isAlertVisible, roles = [] }) => {
  const dispatch = useDispatch();
  const onSuccess =() =>{
    toast.success("The email has been successfully sent!");
    onClose();
  }
  const onError = (message) =>{
    toast.error(message);
  }
  console.log("values" , roles);
  const formik = useFormik({
    initialValues,
    validationSchema: masterUserSchema,
    onSubmit: (values) => {
      const num = `547654${Math.floor(1000 + Math.random() * 9000)}`
      
      const { firstName, lastName, email, role } = values;
      let finalResult = new FormData();
      finalResult.append("firstName", firstName);
      finalResult.append("lastName", lastName);
      finalResult.append("email", email);
      finalResult.append("role", role);
      finalResult.append("aliasName", "aliasName");
      finalResult.append("companyName", "companyName");
      finalResult.append("phoneNumber", num);
      finalResult.append("active", true);
      finalResult.append("timeZone", "US/Eastern");
      finalResult.append("url" ,  "https://dev2.zeitblast.com/#/create-password/")
      dispatch(CreateNewUser(finalResult , onSuccess , onError));
    },
  });

  return (
    <div

      className={styles.modalContainer}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          // borderBottom: "1px solid #f0f0f0",
          height: "58px",
        }}
      >
        <p className={styles.modalHeading}>Create Admin</p>
        <MdClose onClick={onClose} />
      </div>

      <div
        className={styles.custom_scrollbar}
        style={{
          height: "594px",
          // backgroundColor: "#fff",
          // backgroundColor: "red",
          borderRadius: "16px",
          flexGrow: 1,
          overflow: "auto",
          display: "flex",
        }}
      >
     

        <form style={{display:"flex" , flexDirection:"column"}} onSubmit={formik.handleSubmit}>
          <div
            style={{

              height: isAlertVisible ? "auto" : "594px",
              flex: 1,
            }}
            className={styles.modalBody}

          >
            <div
              style={{
                flex: 1,
                padding: "16px",
                display: "grid",
                gap: "16px",
              }}
            >
              <div style={{ display: "grid", gap: "4px" }}>
                <p className={styles.modalHeading}>User Information</p>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "22px",
                    fontWeight: "400",
                    color: "#777",
                  }}
                >
                  This new user will receive an invitation e-mail to easily
                  connect to ZeitBlast.
                </p>
              </div>
              <div className={styles.inputContainer}>
                <div style={{ display: "flex", gap: "16px", height: "90px", width: "100%" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ paddingBottom: "3px" }}>
                      <label className={styles.labels}>First Name</label>
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      className={styles.inputField}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                      placeholder="Enter First Name"
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <div style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.firstName}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px", height: "90px", width: "100%" }}>
                  <div style={{ flex: 1  }}>
                    <div style={{ paddingBottom: "3px"  }}>
                      <label className={styles.labels}>Last Name</label>
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      className={styles.inputField}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                      placeholder="Enter Last Name"
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <div style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.lastName}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "16px", height: "74px", width: "100%" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ paddingBottom: "3px" }}>
                      <label className={styles.labels}>Email</label>

                    </div>
                    <input
                      type="text"
                      name="email"
                      className={styles.inputField}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      placeholder="Enter Your Email"
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div
              style={{
                width: "1px",
                backgroundColor: "#F1F3F8",
                margin: "0 16px",
                height: "438px",
              }}
              className={styles.seprator}
            ></div>

            {/* Right Column */}
            <div
              style={{
                flex: 1,
                padding: "16px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gap: "24px",
                }}
              >
                <div style={{ display: "grid", gap: "4px" }}>
                  <p className={styles.modalHeading}>Roles</p>
                  {/* <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "22px",
                      fontWeight: "400",
                      color: "#777",
                    }}
                  >
                    Select multiple roles providing access to the phone app
                    and/or dashboard.
                  </p> */}
                </div>
                <div>
                  {roles.map((item) => (
                    <div key={item?.name} style={{ marginBottom: "8px" }}>
                      <MyCheckbox
                        title={item?.name || ''}
                        isChecked={formik.values.role === item._id} // Check if this role is selected
                        onClick={() => {
                          formik.setFieldValue("role", item._id); // Set the selected role
                        }}
                      />
                      <p
                        style={{
                          fontSize: "16px",
                          lineHeight: "22px",
                          fontWeight: "500",
                          color: "#777",
                          marginLeft: "38px",
                        }}
                      >
                        {item?.permissions && item?.permissions.length
                          ? item?.permissions.map((per) => <span key={per}>{per}, </span>)
                          : ""}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              gap: "16px",
              padding: "16px",
              height: "88px",
              borderTop: "1px solid #f0f0f0",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                border: "solid 1px #777777",
                color: "#777777",
                height: "40px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 500,
                width: "100px",
                padding: "0px",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              // disabled={!formik.isValid || !formik.dirty} // Validation handling
              style={{
                backgroundColor: "#00BD82",
                height: "40px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 500,
                width: "100px",
                color: "white",
              }}
            >
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateAdminModal;
