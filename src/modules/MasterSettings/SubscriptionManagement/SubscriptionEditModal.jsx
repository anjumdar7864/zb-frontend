import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useFormik } from "formik";
import { userSchema } from "@/schema";
import styles from "./SubscriptionManagement.module.css";
import { CircularLoader, MyCheckbox } from "@/components/common";
import { ENDPOINTS, REQUEST_TYPES } from "@/utils/constant/url";
import { commonAPICall } from "@/services/api/common";
import { toNumber } from "lodash-es";
import * as Yup from "yup";
import toast from "react-hot-toast";

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
  yearlyPrice: Yup.number()
    .typeError("Yearly Price must be a number")
    .positive("Yearly Price must be greater than zero")
    .required("Yearly Price is required"),
  marketIncluded: Yup.string().required("Market Included is required"),
  // .min(3, "Market Included must be at least 3 characters"),
  mostPopular: Yup.boolean().required("Most Popular is required"),
  status: Yup.string()
    .oneOf(
      ["active", "inactive", "pending"],
      "Status must be 'active', 'inactive', or 'pending'"
    )
    .required("Status is required"),
});

const SubscriptionEditModal = ({ onClose, userId }) => {
  const [singleUser, setSingleUser] = useState({});
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: singleUser?.title && singleUser?.title,
      heading: singleUser?.heading && singleUser?.heading,
      price: singleUser?.price && singleUser?.price,
      maxTenants: singleUser?.maxTenants && singleUser?.maxTenants,
      monthlyOutBoundNumber:
        singleUser?.monthlyOutBoundNumber && singleUser?.monthlyOutBoundNumber,
      monthlyPrice: singleUser?.monthlyPrice ? singleUser?.monthlyPrice : "0",
      yearlyPrice: singleUser?.yearlyPrice ? singleUser?.yearlyPrice : "",
      marketIncluded: singleUser?.marketIncluded
        ? singleUser?.marketIncluded
        : "",
      mostPopular: singleUser?.mostPopular && singleUser?.mostPopular,
      status: singleUser?.status && singleUser?.status,
      features: singleUser?.features ? singleUser?.features : "",
      // priceId: singleUser?.priceId || "",

      priceId: singleUser?.priceId && singleUser?.priceId ,
      subscriptionType: singleUser?.subscriptionType
        ? singleUser?.subscriptionType
        : "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
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
        priceId,
        subscriptionType,
      } = values;

      let finalResult = {
        title: title !== formik.initialValues?.title ? title : undefined ,
        heading: heading !== formik.initialValues?.heading ? heading : undefined,
        price: price !== formik.initialValues?.price ? price : undefined,
        maxTenants: maxTenants !== formik.initialValues?.maxTenants ? maxTenants : undefined,
        monthlyOutBoundNumber:
          monthlyOutBoundNumber !== formik.initialValues?.monthlyOutBoundNumber
            ? monthlyOutBoundNumber
            : undefined,
        monthlyPrice:
          monthlyPrice !== formik.initialValues?.monthlyPrice
            ? toNumber(monthlyPrice)
            : undefined,
        yearlyPrice:
          yearlyPrice !== formik.initialValues?.yearlyPrice
            ? yearlyPrice
            : undefined,
        marketIncluded:
          marketIncluded !== formik.initialValues?.marketIncluded ?
            marketIncluded
            : undefined,
        mostPopular:
          mostPopular !== formik.initialValues?.mostPopular ? mostPopular : undefined,
        status: status !== formik.initialValues?.status ? status : undefined,
        features:
          features !== formik.initialValues?.features ? features : undefined,
        //  priceId:
        //    priceId !== formik.initialValues?.priceId ? priceId : undefined,
        priceId,
        // subscriptionType,
      };
      setLoading(true);

      try {
        const { data, isError, message } = await commonAPICall(
          REQUEST_TYPES.PATCH,
          `${ENDPOINTS.GET_SINGLE_SUBSCRIPTION}${userId}`,
          finalResult
        );

        if (isError) {
          toast.error(message);
          setLoading(false);
          return;
        }

        toast.success("Plan updated successfully!");
        onClose();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const specialIds = [
    "67445d36f4d8d6cff7dbde60",
    "67445e5cf4d8d6cff7dbde85",
    "6744614ba4d142ed16ea9c97",
    "6744617ea4d142ed16ea9c9e",
  ];

  const fetchData = async () => {
    try {
      const { data, isError, message } = await commonAPICall(
        REQUEST_TYPES.GET,
        `${ENDPOINTS.GET_SINGLE_SUBSCRIPTION}/${userId}`
      );
      if (isError) {
        return toast.error(message);
      }
      setSingleUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
 

  return (
    <div
      // style={{
      //   width: "700px",
      //   height: "594px",
      //   backgroundColor: "#fff",
      //   borderRadius: "16px",
      // }}
      className={styles.modalContainer}
    >
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
        <p className={styles.modalHeading}>Edit Plan</p>
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
            // overflow: "auto",
          }}
        >
          <div style={{ display: "flex", gap: "16px", height: "74px" }}>
            <div style={{ flex: 1 }}>
              <label className={styles.labels}>Plan Name</label>
              <input
                type="text"
                name="title"
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
                disabled={specialIds.includes(singleUser?._id)}
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
                {/* MONTHLY PRICE INPUT */}
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
                  onChange={(e) => {
                    const monthlyVal = e.target.value;
                    // 1) Set monthly price
                    formik.setFieldValue("monthlyPrice", monthlyVal);
                    // 2) Also set `price` if you need to track it
                    formik.setFieldValue("price", monthlyVal);
                    // 3) Now compute the yearly price
                    const monthlyNum = Number(monthlyVal) || 0;
                    const discount = 0.20;    // 20% discount
                    const yearFactor = 13;    // e.g. "12 months + 1 free" = 13
                    const discountedMonthly = monthlyNum - monthlyNum * discount;
                    const computedYearlyPrice = Math.round(discountedMonthly * yearFactor);

                    // 4) Finally, push that into Formik for yearlyPrice
                    formik.setFieldValue("yearlyPrice", computedYearlyPrice);
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.monthlyPrice}
                />

                <input
                  type="text"
                  name="yearlyPrice"
                  placeholder="Yearly Price"
                  disabled={true}
                  style={{
                    width: "50%",
                    padding: "8px",
                    borderRadius: "0 8px 8px 0",
                    borderLeft: "none",
                  }}
                  className={styles.inputField}
                  onChange={formik.handleChange}    // optional if you want to let Formik handle it
                  onBlur={formik.handleBlur}        // optional
                  value={formik.values.yearlyPrice} // <== display what's actually in Formik
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
              // style={{marginTop: "2px"}}
              // className="marginTop:2px"
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
                // border: "1px solid #00BD82",
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
              disabled={formik?.dirty ? false : true}
              // onClick={handleSave}
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
                // cursor: isPointer ? "pointer" : "",
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

export default SubscriptionEditModal;
