import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { useFormik } from "formik";
import { userSchema } from "@/schema";
import styles from "./SubscriptionManagement.module.css";
import { CircularLoader, MyCheckbox } from "@/components/common";
import * as Yup from "yup";
import { commonAPICall } from "@/services/api/common";
import { ENDPOINTS, REQUEST_TYPES } from "@/utils/constant/url";
import { toNumber } from "lodash-es";
import toast from "react-hot-toast";
import { logOut } from "@/store/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  heading: Yup.string()
    .required("Heading is required")
    .min(5, "Heading must be at least 5 characters"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than zero")
    .required("Price is required"),
  maxTenants: Yup.number()
    .typeError("Max Tenants must be a number")
    .integer("Max Tenants must be a whole number")
    .positive("Max Tenants must be greater than zero")
    .required("Max Tenants is required"),
  monthlyOutBoundNumber: Yup.number()
    .typeError("Monthly Outbound Number must be a number")
    .integer("Monthly Outbound Number must be a whole number")
    .positive("Monthly Outbound Number must be greater than zero")
    .required("Monthly Outbound Number is required"),
  monthlyPrice: Yup.number()
    .typeError("Monthly Price must be a number")
    .positive("Monthly Price must be greater than zero")
    .required("Monthly Price is required"),

  marketIncluded: Yup.string().required("Market Included is required"),
  // .min(3, "Market Included must be at least 3 characters"),
  // mostPopular: Yup.boolean().required("Most Popular is required"),
  status: Yup.string()
    .oneOf(
      ["active", "inactive", "pending"],
      "Status must be 'active', 'inactive', or 'pending'"
    )
    .required("Status is required"),
});

const SubscriptionManagementModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      heading: "",
      price: "",
      maxTenants: "",
      monthlyOutBoundNumber: "",
      monthlyPrice: "",
      yearlyPrice: "",
      marketIncluded: "",
      mostPopular: false,
      status: "",
      features: [],

      subscriptionType: "monthly",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("holla");

      const {
        title,
        heading,
        price,
        maxTenants,
        monthlyOutBoundNumber,
        monthlyPrice,
        yearlyPrice,
        marketIncluded,
        mostPopular,
        status,
        features,

        subscriptionType,
      } = values;

      let finalResult = {
        title,
        heading,
        price,
        maxTenants,
        monthlyOutBoundNumber,
        monthlyPrice:toNumber(monthlyPrice),
        yearlyPrice,
        marketIncluded,
        mostPopular,
        status,
        features,

        subscriptionType,
      };
      setLoading(true);
      try {
        const { data, isError, message, sessionExpired } = await commonAPICall(
          REQUEST_TYPES.POST,
          `${ENDPOINTS.GET_SINGLE_SUBSCRIPTION}`,
          finalResult
        );
        setLoading(true);
        if(sessionExpired){
   

        
          // sessionStorage.clear()
          dispatch(logOut());

          navigate("/Login");

        }
        if (isError) {
          toast.error(message);
          setLoading(false);
          return;
        }
        toast.success("Plan saved successfully!");

        onClose();
      } catch (error) {
        console.log(error);
        toast.error("An unexpected error occurred!");
      } finally {
        setLoading(false);
      }
    },
  });

  console.log("check formik", formik.errors, formik.values);

  return (
    <div className={styles.modalContainer}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          borderBottom: "1px solid #f0f0f0",
          height: "58px",
        }}
      >
        <p className={styles.modalHeading}>Create Plan</p>
        <MdClose onClick={onClose} />
      </div>

      <form
        className={styles.custom_scrollbar}
        style={{ overflow: "auto" }}
        onSubmit={formik.handleSubmit}
      >
        <div
          style={{
            height: "448px",
            padding: "16px",
            display: "grid",
            gap: "16px",
            flexGrow: 1,
            // overflow: "auto",
          }}
        >
          <div style={{ display: "flex", gap: "16px", height: "74px" }}>
            <div style={{ flex: 1 }}>
              <label className={styles.labels}>Plan Name</label>
              <input
                type="text"
                name="title"
                placeholder="Plan Name"
                className={styles.inputField}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title ? (
                <div style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.title}
                </div>
              ) : null}
            </div>
            <div style={{ flex: 1 }}>
              <label className={styles.labels}>Status</label>
              <select
                name="status"
                className={styles.select}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.status}
              >
                <option value="" label="Select status" />
                <option value="active" label="Active" />
                {/* <option value="inactive" label="Inactive" /> */}
                <option value="pending" label="Pending" />
              </select>
              {formik.touched.status && formik.errors.status ? (
                <div style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.status}
                </div>
              ) : null}
            </div>
          </div>
          <div style={{ height: "108px" }}>
            <label className={styles.labels}>Description</label>
            <textarea
              name="heading"
              placeholder="description"
              style={{
                minHeight: "82px",
                resize: "none",
              }}
              className={styles.inputField}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.heading}
            />
            {formik.touched.heading && formik.errors.heading ? (
              <div style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.heading}
              </div>
            ) : null}
          </div>
          <div style={{ display: "flex", gap: "16px", height: "74px" }}>
            <div style={{ flex: 1 }}>
              <label className={styles.labels}>Price</label>
              <div style={{ display: "flex", position: "relative" }}>
                <input
                  type="text"
                  name="monthlyPrice"
                  placeholder="Monthly Price"
                  style={{
                    width: "50%",
                    padding: "8px",
                    borderRadius: "8px 0 0 8px",
                    borderRight: "1px solid #D3D7DD",
                  }}
                  className={styles.inputField}
                  // onChange={formik.handleChange}
                  onChange={(e) => {
                    formik.setFieldValue("monthlyPrice", e.target.value);
                    formik.setFieldValue("price", e.target.value);
                    formik.setFieldValue(
                      "yearlyPrice",
                      Math.round(   ( toNumber(e.target.value) -
                        (20 / 100) * toNumber(e.target.value)) * 13)
                    );
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.monthlyPrice}
                />
                <input
                  type="text"
                  disabled={true}
                  name="yearlyPrice"
                  placeholder="Yearly Price"
                  style={{
                    width: "50%",
                    padding: "8px",
                    borderRadius: "0 8px 8px 0",

                    borderLeft: "none",
                  }}
                  className={styles.inputField}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    Math.round(  ( toNumber(formik.values.monthlyPrice) -
                        (20 / 100) * toNumber(formik.values.monthlyPrice)) * 13)
                  }
                />
              </div>
              {formik.touched.monthlyPrice && formik.errors.monthlyPrice ? (
                <div style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.monthlyPrice}
                </div>
              ) : null}
              {formik.touched.yearlyPrice && formik.errors.yearlyPrice ? (
                <div style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.yearlyPrice}
                </div>
              ) : null}
            </div>

            <div style={{ flex: 1 }}>
              <label className={styles.labels}>Markets Included</label>
              <input
                type="text"
                name="marketIncluded"
                placeholder="Markets Included"
                className={styles.inputField}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.marketIncluded}
              />
              {formik.touched.marketIncluded && formik.errors.marketIncluded ? (
                <div style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.marketIncluded}
                </div>
              ) : null}
            </div>
          </div>
          <div style={{ display: "flex", gap: "16px", height: "74px" }}>
            <div style={{ flex: 1 }}>
              <label className={styles.labels}>User Limit</label>
              <input
                type="text"
                name="maxTenants"
                placeholder="Limit"
                className={styles.inputField}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.maxTenants}
              />
              {formik.touched.maxTenants && formik.errors.maxTenants ? (
                <div style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.maxTenants}
                </div>
              ) : null}
            </div>
            <div style={{ flex: 1 }}>
              <label className={styles.labels}>
                Outbound Initital Messages
              </label>
              <input
                type="text"
                name="monthlyOutBoundNumber"
                placeholder="Outbound Initital Messages"
                className={styles.inputField}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.monthlyOutBoundNumber}
              />
              {formik.touched.monthlyOutBoundNumber &&
              formik.errors.monthlyOutBoundNumber ? (
                <div style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.monthlyOutBoundNumber}
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <MyCheckbox
              title={"Most Popular"}
              isChecked={formik.values.mostPopular}
              
              onClick={() =>
                formik.setFieldValue("mostPopular", !formik.values.mostPopular)
              }
            />
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

          {loading ? (
            <div
              style={{
                backgroundColor: "white",

                height: "40px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 500,
                width: "100px",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularLoader />
            </div>
          ) : (
            <button
              style={{
                backgroundColor: "#00BD82",
                height: "40px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 500,
                width: "100px",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SubscriptionManagementModal;
