import { useEffect, useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import moment from "moment-timezone";
import { If, Then, Else, When } from "react-if";
import { toast } from "react-hot-toast";

import Components from "@/components";
import {
  setUserReminder,
  updateUserReminder,
  cancelUserReminder,
} from "@/store/actions";
import { setRemainderSchema } from "@/schema";

import { SetRemainderModalStyled } from "./styles";
import { MdAlarm } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { CircularLoader } from "@/components/common";

const SetRemainderModal = ({ onClose, selectedUserInbox }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.selectedRemainderReducer);
  let userInfo = localStorage.getItem("user") || localStorage.getItem("user");
  userInfo = JSON.parse(userInfo);
  const { _id: id, userName, reminder } = selectedUserInbox;
 
 
  const [time, setTime] = useState(
    reminder?.date && moment(reminder?.date).tz(userInfo?.timeZone || "UTC").format("HH:mm:ss")
  );


  const enabledMessageInput =
    selectedUserInbox.isVerifiedNumber ||
    selectedUserInbox.isVerifiedNumberPhone2 ||
    selectedUserInbox.isVerifiedNumberPhone3;
  const message = !enabledMessageInput
    ? "Prospect must have a verified number to set message"
    : reminder?.message;
  const formik = useFormik({
    initialValues: {
      prospect: userName,
      note: reminder?.note,
      message,
      date: reminder?.date
        ? moment(reminder?.date).tz(userInfo?.timeZone || "UTC").format("Y-MM-DD HH:mm:ss")
        : "",
    },

    validationSchema: setRemainderSchema,
    onSubmit: (values) => {
      const newDate =
        values.date && values.date.includes(" ")
          ? values.date.split(" ")[0]
          : formik.values.date;

      values.prospect = userName;
      //values.date = moment(`${newDate} ${time}`).toISOString()
      values.date = moment.tz(`${newDate} ${time}`, userInfo?.timeZone || "UTC").format("YYYY-MM-DD HH:mm:ss z");

      if (!reminder) {
        if (enabledMessageInput) {
          values["isVerified"] = true;
        } else {
          values["isVerified"] = false;
        }
        dispatch(
          setUserReminder(id, values, () => {
            toast.success("Reminder set successfully");
            onClose();
          })
        );
      } else {
        if (enabledMessageInput) {
          values["isVerified"] = true;
        } else {
          values["isVerified"] = false;
        }
        if (new Date().toISOString().split("T")[0] > newDate) {
          toast.error("Please select a date later than today.");
        } else {
          dispatch(
            updateUserReminder(id, values, () => {
              toast.success("Reminder set successfully");
              onClose();
            })
          );
        }
      }
    },
  });

  // useEffect(() => {
  //   dispatch(getUserReminder(id));
  // }, [id]);

  // useEffect(() => {
  //   formik.setFieldValue("note", reminder?.note || "");
  //   formik.setFieldValue("message", reminder?.message || "");
  //   formik.setFieldValue("date", moment(reminder?.date).format("Y-MM-DD") || "");
  // }, [reminder])

  // const getFormattedDate = () => {

  //   const storedTimezone = userInfo?.timeZone || "UTC";
  //   // Get current date in the stored timezone
  //   const now = new Date();
  //   const options = { timeZone: storedTimezone, year: "numeric", month: "2-digit", day: "2-digit" };
  //   const formatter = new Intl.DateTimeFormat("en-CA", options); // "en-CA" ensures YYYY-MM-DD format

  //   // Convert formatted date to proper format
  //   const parts = formatter.formatToParts(now);
  //   const year = parts.find((p) => p.type === "year")?.value;
  //   const month = parts.find((p) => p.type === "month")?.value;
  //   const day = parts.find((p) => p.type === "day")?.value;

  //   return `${year}-${month}-${day}`;
  // };
  const getFormattedDate = () => {
    const storedTimezone = userInfo?.timeZone || "UTC";
    const now = new Date();
    const options = { timeZone: storedTimezone, year: "numeric", month: "2-digit", day: "2-digit" };
    const formatter = new Intl.DateTimeFormat("en-CA", options); // Ensures YYYY-MM-DD format
  
    const parts = formatter.formatToParts(now);
    const year = parts.find((p) => p.type === "year")?.value;
    const month = parts.find((p) => p.type === "month")?.value;
    const day = parts.find((p) => p.type === "day")?.value;
  
    const formattedDate = `${year}-${month}-${day}`;
  
    // Set default date in formik if empty
    if (!formik.values.date) {
      formik.setFieldValue("date", formattedDate);
    }
  
    return formattedDate;
  };
  const getFormattedTime = () => {

    const storedTimezone = userInfo?.timeZone || "UTC";

    // Get current time in the stored timezone
    const now = new Date();
    const options = { timeZone: storedTimezone, hour: "2-digit", minute: "2-digit", hour12: false };
    const formatter = new Intl.DateTimeFormat("en-GB", options); // "en-GB" ensures 24-hour format

    // Extract formatted time and return it
    const parts = formatter.formatToParts(now);
    const hours = parts.find((p) => p.type === "hour")?.value.padStart(2, "0");
    const minutes = parts.find((p) => p.type === "minute")?.value.padStart(2, "0");

    return `${hours}:${minutes}`;
  };


  useEffect(() => {
    if(reminder?.date){
      setTime(reminder?.date && moment(reminder?.date).tz(userInfo?.timeZone || "UTC").format("HH:mm:ss"))

    }else{
      setTime(getFormattedTime()); // Set default time based on stored timezone

    }
  }, []);

  const cancelRemainderButtonClicked = () => {
    dispatch(
      cancelUserReminder(id, () => {
        toast.success("Reminder cancel successfully");
        onClose();
      })
    );
  };
  // console.log(reminder?.date && moment(reminder?.date).format("HH:mm:ss") === time , "check condition");

  return (
    <SetRemainderModalStyled>
      {/* <If condition={loading}> */}
      {/* <Then>
          <div className="top">
            <h2>{reminder?._id ? "Updating Reminder" : "Setting Reminder"}</h2>
            <button type="button" onClick={onClose}>
              <FaTimes />
            </button>
            <IoCloseOutline onClick={onClose} size={24} color="#012635" />
          </div>
        </Then> */}
      <Else>
        <div className="top">
          <div className="body3Medium textPrimeryColor">{reminder?._id ? "Edit Reminder" : "Set Reminder"}</div>
          {/* <button type="button" onClick={onClose}>
              <FaTimes />
            </button> */}
          <IoCloseOutline onClick={onClose} size={24} color="#012635" />
        </div>
        <div className="middle">
          <div
            // style={{ display: "flex", alignItems: "end" }}
            className="item"
          >
            <div>
              <div className="left">
                <span
                  // style={{
                  //   fontSize: "14px",
                  //   fontWeight: 500,
                  //   color: "#012635",
                  // }}
                  className="body4Medium textPrimeryColor"
                >
                  Prospect
                </span>
              </div>
              <div
                style={{
                  border: "solid 1px #D3D7DD ",
                  width: "318px",
                  height: "48px",
                  backgroundColor: "#F0F0F0",
                  borderRadius: "8px",
                  padding: "0px 12px",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "4px",
                }}
                className="right"
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#777777",
                  }}
                  className="name"
                >
                  {selectedUserInbox.userName}
                </span>
              </div>
            </div>

            <div>
              <div style={{ paddingBottom: "4px" }} className="left">
                <span
                  // style={{
                  //   fontSize: "14px",
                  //   fontWeight: 500,
                  //   color: "#012635",
                  // }}
                  className="body4Medium textPrimeryColor"
                >
                  Show Reminder
                </span>
              </div>
              <div style={{ position: "relative" }} className="right">
                {/* <input
                    type="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="date"
                    value={
                      formik.values.date && formik.values.date.includes(" ")
                        ? formik.values.date.split(" ")[0]
                        : formik.values.date
                    }
                    min={new Date().toISOString().split("T")[0]} // Set min to today's date
                    style={{
                      width: "155px",
                      height: "48px",
                      border: "solid 1px #D3D7DD",
                      borderRadius: "8px",
                      padding: "0px 12px",
                      color: "#777777",
                      fontSize: "14px",
                      fontWeight: 400,
                    }}
                  /> */}


                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker", "TimePicker"]}>

                    <DatePicker
                      label="Controlled picker"
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
                    />
                    <TimePicker
                      label="Select Time"
                      value={timesec}
                      onChange={(newValue) =>
                        setTime(newValue ? newValue.tz("Asia/Karachi") : null)
                      } // Keep timezone consistent
                    />
                  </DemoContainer>
                </LocalizationProvider> */}


                <input
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="date"
                  value={
                    formik.values.date
                      ? formik.values.date.includes(" ")
                        ? formik.values.date.split(" ")[0]
                        : formik.values.date
                      : getFormattedDate() // Set default date based on stored timezone
                  }
                  min={getFormattedDate()}// Set min to today's date
                  style={{
                    width: "155px",
                    height: "48px",
                    border: "solid 1px #D3D7DD",
                    borderRadius: "8px",
                    padding: "0px 12px",
                    color: "#777777",
                    fontSize: "14px",
                    fontWeight: 400,
                  }}
                />
                {formik.touched.date && formik.errors.date && (
                  <p style={{ position: "absolute", color: "#F4516c" }}>
                    {formik.errors.date}
                  </p>
                )}
              </div>
            </div>
            {/* <div style={{ border: "solid 1px #D3D7DD", borderRadius: "8px", width: "155px", height: "48px", padding: "0px 12px", fontSize: "14px", fontWeight: 400, color: "#777777", display: "flex", alignItems: "center", justifyContent: "space-between" }}> */}
            <input
              type="time"
              onChange={(e) => setTime(e.target.value)}
              // onBlur={formik.handleBlur}
              // name="date"
              value={time}
              style={{
                width: "155px",
                height: "48px",
                border: "solid 1px #D3D7DD",
                borderRadius: "8px",
                padding: "0px 12px",
                color: "#777777",
                fontSize: "14px",
                fontWeight: 400,
              }}
            />
            {/* <MdAlarm size={22} color="#012635" /> */}
            {/* </div> */}
          </div>
          <div className="item">
            <div className="left">
              <span         className="body4Medium textPrimeryColor">Note:</span>
            </div>
            <div className="right">
              <textarea
                type="text"
                placeholder="Note"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="note"
                value={formik.values.note}
                maxLength={500}
              ></textarea>
              {formik.touched.note && formik.errors.note && (
                <p>{formik.errors.note}</p>
              )}
            </div>
          </div>
          <div className="item">
            <div className="left">
              <span className="body4Medium textPrimeryColor">Set Message:</span>
            </div>
            <div className="right">
              <textarea
                type="text"
                placeholder="Message"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="message"
                value={formik.values.message}
                disabled={!enabledMessageInput}
                maxLength={500}
              ></textarea>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 400,
                  color: "#777777",
                }}
              >
                * This will be an auto filled message you can quickly send to
                the prospect
              </span>
              {formik.touched.message && formik.errors.message && (
                <p>{formik.errors.message}</p>
              )}
            </div>
          </div>
          {/* <div className="item">
              <div className="left">
                <span className="text">Show Reminder</span>
              </div>
              <div className="right">
                <input
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="date"
                  value={formik.values.date}
                />
                {formik.touched.date && formik.errors.date && (
                  <p>{formik.errors.date}</p>
                )}
              </div>
            </div> */}
        </div>
        <div className="bottom">
          <div className="left">
            {/* <button type="button" onClick={onClose}>
                Close
              </button> */}
          </div>
          <div className="right">
            <When condition={reminder}>
              <Components.Common.ButtonRightIcon
                text="Cancel Reminder"
                icon={<FaTimes />}
                type="button"
                onClick={cancelRemainderButtonClicked}
              />
            </When>
            <Components.Common.ButtonRightIcon
              disabled={
                !enabledMessageInput ? true : (!formik.dirty || !formik.isValid || !enabledMessageInput) && reminder?.date && moment(reminder?.date).format("HH:mm:ss") != time ? false : (!formik.dirty || !formik.isValid || !enabledMessageInput) && reminder?.date && moment(reminder?.date).format("HH:mm:ss") == time ? true : false
              }
              text={loading ? <CircularLoader color="white" /> : reminder?._id ? "Update Reminder" : "Set Reminder"}
              icon={!loading && <GoPlus />}
              style={{
                backgroundColor: "#00BD82",
                borderColor: "#00BD82",
                borderRadius: "8px",
                fontSize: "14px",
              }}
              type="submit"
              onClick={() => {


                formik.submitForm();


              }}
            />
          </div>
        </div>
      </Else>
      {/* </If> */}
    </SetRemainderModalStyled>
  );
};

export default SetRemainderModal;
