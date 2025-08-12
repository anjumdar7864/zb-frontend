import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DropDown from "@/components/common/DropDwon/DropDown";
import Modal from "@mui/material/Modal";
import { commonAPICall } from "@/services/api/common";
import { MdOutlineClose } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";
import styles from "./MarkitMaster.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllAreaCode,
  getTimeZoneAccordingToAreaCode,
  logOut,
} from "@/store/actions";
import Select, { components } from "react-select";
import { toast } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import { REQUEST_TYPES, ENDPOINTS } from "@/utils/constant/url";
import { FaChevronDown } from "react-icons/fa6";
import { SlArrowDown } from "react-icons/sl";
import {
  acceptNewRequestOfMarket,
  increaseMarketLimitAction,
} from "@/store/actions/market.action";
import { CircularLoader } from "@/components/common";
import { LuAsterisk } from "react-icons/lu";
import Components from "@/components";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  borderRadius: "16px",
  // boxShadow: 24,
  // p: 4,
};

const initialValues = {
  name: "",
  areaCode: "",
  timeZone: "",
  callForwardingNumber: "",
  abbrevation: "",
  tenantId: "",
};

const CustomDropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <SlArrowDown style={{ color: "#012635" }} />{" "}
      {/* Customize the icon and styling */}
    </components.DropdownIndicator>
  );
};

const AddBondNumberModal = ({
  children,
  isIncriment = false,
  title = "Add Outbound Number",
  rowData = {},
  refresh,
  tenantId,
  updateListing,
  index,
  refreshHandler,
}) => {
  const [open, setOpen] = React.useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [extraNumber, setExtraNumber] = useState(false);
  const [createDisable, setCreateDisable] = useState({
    tenant: false,
    areaCode: false,
  });
  const [validation, setValidation] = useState({
    phone: false,
    name: false,
    areacode: false,
  });
  const [tenants, setTenants] = useState([]);
  const [state, setSate] = useState(initialValues);
  const [warning, setWarning] = useState(true);
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [tenantsResult, setTenantsResult] = useState(false);
  const [limitExceed, setLimitExceed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [createPayload, setCreatePayload] = useState({});
  // const [ isModelOpen , setIsModelOpen] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { areaCodes, timeZoneOfAreaCode } = useSelector(
    (s) => s.areaCodeReducer
  );
  const handleOpen = () => setOpen(true);
  useEffect(() => {
    if (title == "Create New Markets" && !state.tenantId) {
      setSate({
        name: "",
        areaCode: "",
        timeZone: "",
        callForwardingNumber: "",
        abbrevation: "",
        tenantId: "",
        outBoundNumber: "",
      });
      setCreateDisable({
        tenant: true,
        areaCode: true,
      });
    } else if (title == "Create New Markets" && state.tenantId) {
      dispatch(GetAllAreaCode("market", state.tenantId));

      setCreateDisable({
        tenant: false,
        areaCode: true,
      });
    }
  }, [state.tenantId]);
  const handleClose = () => {
    setValidation({
      phone: false,
      name: false,
      areacode: false,
    });
    updateListing && updateListing();
    setLoading(false);
    if (title == "Add Outbound Number") {
      refresh && refresh();
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  // areaCode

  const marketId = rowData?._id;

  const fetchData = async () => {
    console.log("check fetch");

    // if (open) {
    try {
      const { data, isError, message, sessionExpired } = await commonAPICall(
        REQUEST_TYPES.GET,
        ENDPOINTS.GET_ALL_COMPANIES
      );
      if (sessionExpired) {
        // sessionStorage.clear()
        dispatch(logOut());

        navigate("/Login");
      }
      if (isError) {
        return toast.error(message);
      }
      const options = data?.results
        ? data?.results.map((item) => {
            //const name = item?.fullName ? item?.fullName : item?.firstName + "" + item?.lastName
            const name = item?.companyName || "N/A";
            const userId = item?.userId || "N/A";
            return { id: item?._id, name, userId };
          })
        : [];
      setTenants(options);
      setTenantsResult(data?.results);
    } catch (error) {
      console.log(error);
    }
    // }
  };
  useEffect(() => {
    fetchData();
    if (open) {
      dispatch(GetAllAreaCode());
    }
  }, [open]);
  // console.log('state' , state ,rowData);

  useEffect(() => {
    if (isIncriment) {
      setSate({
        name: rowData?.name || "",
        areaCode: { value: rowData?.areaCode, label: rowData?.areaCode } || "",
        timeZone: rowData?.timeZone || "",
        // callForwardingNumber: rowData?.callForwardingNumber || "",
        callForwardingNumber: `` || "",
        abbrevation: rowData?.abbrevation || "",
        tenantId: tenantId || rowData?._id || "",
      });
    } else {
      setSate({
        name: rowData?.name || "",
        areaCode: { value: rowData?.areaCode, label: rowData?.areaCode } || "",
        timeZone: rowData?.timeZone || "",
        // callForwardingNumber: rowData?.callForwardingNumber || "",
        callForwardingNumber: `1${rowData?.callForwardingNumber}` || "",
        abbrevation: rowData?.abbrevation || "",
        tenantId: tenantId || rowData?._id || "",
      });
    }
  }, [JSON.stringify(rowData)]);
  useEffect(() => {
    if (
      Object.keys(timeZoneOfAreaCode).length !== 0 &&
      Object.keys(state.areaCode).length !== 0
    ) {
      setSate({
        ...state,
        timeZone: timeZoneOfAreaCode?.timeZone,
        abbrevation: timeZoneOfAreaCode?.abbrevation,
      });
    }
  }, [timeZoneOfAreaCode]);
  const handleChange = (e) => {
    setSate({
      ...state,
      [e?.target?.name]: e?.target?.value,
    });
  };
  const commonHandler = (value, name, phoneData) => {
    // dispatch(getTimeZoneAccordingToAreaCode());
    if (name == "tenantId") {
      const tenantVal = tenantsResult.find((itemKey) => itemKey._id == value);

      if (
        +tenantVal?.countOfOutBoundNumber +
          +tenantVal?.requestedOutBoundNumber >=
        tenantVal?.marketIncluded
      ) {
        setLimitExceed({
          status: true,
          subscriptionName: tenantVal?.subscriptionName,
        });
      } else {
        setLimitExceed(false);
      }
      // console.log("tenant data", +tenantVal?.countOfOutBoundNumber + +tenantVal?.requestedOutBoundNumber, tenantVal, tenantsResult);
    }

    if (name == "callForwardingNumber" || name == "outBoundNumber") {
      const result = value
        .toString()
        .replace(phoneData?.dialCode.toString(), "");
      // console.log("phone Data" ,value ,  phoneData , result , name);
      setCountryCode(phoneData?.dialCode);
      setSate({
        ...state,
        [name]: value,
      });
    } else {
      setSate({
        ...state,
        [name]: value,
      });
    }
  };
  // const areaCodeHandler = (obj = {}) => {
  //   dispatch(getTimeZoneAccordingToAreaCode(obj?.value));

  //   console.log("check datat", obj);

  //   setSate({
  //     ...state,
  //     areaCode: obj
  //   })
  // }

  const areaCodeHandler = async (obj = {}) => {
    if (title == "Create New Markets") {
      const { data, isError, message, sessionExpired } = await commonAPICall(
        REQUEST_TYPES.GET,
        `${ENDPOINTS.GET_ALL_MARKET_TENANT}?tenantId=${state?.tenantId}&areaCode=${obj?.label}`
      );
      if (sessionExpired) {
        // sessionStorage.clear()
        dispatch(logOut());
        navigate("/Login");
      }
      if (isError) {
        return toast.error(message);
      }
      if (data?.markets?.results?.length < 1) {
        dispatch(getTimeZoneAccordingToAreaCode(obj?.value));
        setCreateDisable({
          tenant: false,
          areaCode: false,
        });
      }

      console.log("check data ...", data?.tenant?.extraNumber);
      setExtraNumber(data?.tenant?.extraNumber);

      setSate({
        ...state,
        areaCode: obj,
        callForwardingNumber: `1${data?.markets?.results[0]?.callForwardingNumber}`,
        name: data?.markets?.results[0]?.name,
        timeZone: data?.markets?.results[0]?.timeZone,
        abbrevation: data?.markets?.results[0]?.abbrevation,
      });
    } else {
      dispatch(getTimeZoneAccordingToAreaCode(obj?.value));

      console.log("check datat", obj);

      setSate({
        ...state,
        areaCode: obj,
      });
    }
  };

  const saveHandler = async () => {
    setLoading(true);

    if (title != "Add Outbound Number") {
      if (title == "Create New Markets") {
        try {
          const {
            name,
            areaCode,
            timeZone,
            callForwardingNumber,
            tenantId,
            abbrevation,
            outBoundNumber,
          } = state;
          const result = callForwardingNumber
            .toString()
            .replace(countryCode.toString(), "");
          const result2 = outBoundNumber
            .toString()
            .replace(countryCode.toString(), "");
          if (
            !name ||
            !areaCode?.value ||
            !timeZone ||
            !result ||
            !tenantId ||
            !outBoundNumber
          ) {
            setLoading(false);

            return toast.error("All Fields are required!");
          }
          console.log("check number", callForwardingNumber);
          if (callForwardingNumber.length < 11 || outBoundNumber.length < 11) {
            setLoading(false);
            return toast.error("use a valid phone number");
          }
          let payload = {};
          if (title === "Edit Markets") {
            payload = {
              marketId,
              tenantId,
              callForwardingNumber: result,
              name,
              outBoundNumber: result2,
            };
          } else {
            payload = {
              ...payload,
              name,
              areaCode: areaCode?.label,
              timeZone: abbrevation,
              callForwardingNumber: result,
              abbrevation,
              tenantId,
              outBoundNumber: result2,
            };
          }

          if (limitExceed?.status && title == "Create New Markets") {
            setIsModelOpen(true);
            setCreatePayload(payload);
            setLoading(false);
          } else {
            const Method =
              title === "Edit Markets"
                ? REQUEST_TYPES.PATCH
                : REQUEST_TYPES.POST;
            const Url =
              title === "Edit Markets"
                ? ENDPOINTS.UPDATE_CALL_FORWARD_MASTER
                : ENDPOINTS.CREATE_NEW_MARKET;

            const { data, isError, message, sessionExpired } =
              await commonAPICall(Method, Url, payload);
            if (sessionExpired) {
              // sessionStorage.clear()
              dispatch(logOut());

              navigate("/Login");
            }
            if (isError) {
              setLoading(false);
              return toast.error(message);
            }
            rowData = {
              ...rowData,
              name,
              areaCode: areaCode?.label,
              timeZone,
              callForwardingNumber,
              abbrevation: timeZone,
            };

            toast.success(
              title === "Edit Markets"
                ? "Successfully updated."
                : `Successfully created.`
            );
            setSate(initialValues);
            if (title === "Create New Markets") {
              refreshHandler && refreshHandler(tenantId);
            }
            // updateListing && updateListing(rowData, index)

            handleClose();
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      } else {
        try {
          const {
            name,
            areaCode,
            timeZone,
            callForwardingNumber,
            tenantId,
            abbrevation,
          } = state;
          const result = callForwardingNumber
            .toString()
            .replace(countryCode.toString(), "");
          if (!name || !areaCode?.value || !timeZone || !result || !tenantId) {
            setLoading(false);

            return toast.error("All Fields are required!");
          }
          console.log("check number", callForwardingNumber);
          if (callForwardingNumber.length < 11) {
            setLoading(false);
            return toast.error("use a valid phone number");
          }
          let payload = {};
          if (title === "Edit Markets") {
            payload = {
              marketId,
              tenantId,
              callForwardingNumber: result,
              name,
            };
          } else {
            payload = {
              ...payload,
              name,
              areaCode: areaCode?.label,
              timeZone: abbrevation,
              callForwardingNumber: result,
              abbrevation,
              tenantId,
            };
          }
          const Method =
            title === "Edit Markets" ? REQUEST_TYPES.PATCH : REQUEST_TYPES.POST;
          const Url =
            title === "Edit Markets"
              ? ENDPOINTS.UPDATE_CALL_FORWARD_MASTER
              : ENDPOINTS.CREATE_NEW_MARKET;

          const { data, isError, message, sessionExpired } =
            await commonAPICall(Method, Url, payload);
          if (sessionExpired) {
            // sessionStorage.clear()
            dispatch(logOut());

            navigate("/Login");
          }
          if (isError) {
            setLoading(false);
            return toast.error(message);
          }
          rowData = {
            ...rowData,
            name,
            areaCode: areaCode?.label,
            timeZone,
            callForwardingNumber,
            abbrevation: timeZone,
          };

          toast.success(
            title === "Edit Markets"
              ? "Successfully updated."
              : `Successfully created.`
          );
          setSate(initialValues);
          if (title === "Create New Markets") {
            refreshHandler && refreshHandler(tenantId);
          }
          // updateListing && updateListing(rowData, index)

          handleClose();
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      }
    } else {
      // setLoading(true)

      // const out_bondNumber = state.callForwardingNumber
      const out_bondNumber = state.callForwardingNumber
        .toString()
        .replace(countryCode.toString(), "");
      if (title === "Add Outbound Number" && isIncriment) {
        console.log(
          "check limit add",
          tenantsResult.find((itemKey) => itemKey._id == tenantId),
          tenantId
        );
        const findResult = tenantsResult.find(
          (itemKey) => itemKey._id == tenantId
        );

        if (state?.callForwardingNumber?.length < 11) {
          setValidation((prev) => ({ ...prev, phone: true }));
          setLoading(false);
        } else {
          if (
            findResult?.countOfOutBoundNumber +
              findResult?.requestedOutBoundNumber >=
            findResult?.marketIncluded
          ) {
            setIsModelOpen(true);
            setLimitExceed({
              status: true,
              subscriptionName: findResult?.subscriptionName,
            });
            setLoading(false);
          } else {
            dispatch(
              increaseMarketLimitAction(
                {
                  body: {
                    phone: [out_bondNumber.replace(/\D/g, "")],
                    phoneNumber: [
                      {
                        number: out_bondNumber.replace(/\D/g, ""),
                        date: new Date(),
                      },
                    ],
                    tenantId,
                  },
                  _id: marketId,
                },
                () => handleClose()
              )
            );
            setLoading(false);
            rowData.callForwardingNumber = out_bondNumber;
            updateListing && updateListing(rowData, index);
          }

          // return handleClose();
        }
      }

      if (
        state.callForwardingNumber == `1${rowData.callForwardingNumber}` &&
        title == "Add Outbound Number" &&
        !isIncriment
      ) {
        toast.error(
          "The Outbound Number cannot be the same as the Call Forwarding number."
        );
        setLoading(false);
      } else if (!isIncriment) {
        if (state?.callForwardingNumber?.length < 11) {
          setValidation((prev) => ({ ...prev, phone: true }));
          setLoading(false);
        } else {
          setValidation((prev) => ({ ...prev, phone: false }));
          await dispatch(
            acceptNewRequestOfMarket(
              { marketId },
              { out_bondNumber },
              () => {
                toast.success("Market request has been accepted");
                handleClose();
                setLoading(false);
                // setAcceptLoading((prev) => ({ ...prev, [marketId]: false }));
                // props.fetchData();
              },
              (error) => {
                setLoading(false);
                console.log("check error", error?.response?.data?.message);

                toast.error(error?.response?.data?.message);
              }
            )
          );
        }
      }
      // console.log("check state" ,state?.callForwardingNumber?.length        , state);
    }
  };
  const cancelHandler = () => {
    // setSate(initialValues);
    setSate({
      name: rowData?.name || "",
      areaCode: { value: rowData?.areaCode, label: rowData?.areaCode } || "",
      timeZone: rowData?.timeZone || "",
      // callForwardingNumber: rowData?.callForwardingNumber || "",
      callForwardingNumber: `1${rowData?.callForwardingNumber}` || "",
      abbrevation: rowData?.abbrevation || "",
      tenantId: tenantId || rowData?._id || "",
    });
    handleClose();
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "solid 1px #d3d7dd",
      borderColor: state.isFocused ? "#5BF1B2" : "#5BF1B2", // Change border color
      height: "48px", // Set height
      minHeight: "100%", // Ensure it respects the height
      width: "100%", // Set width
      borderRadius: "8px", // Set border radius
      boxShadow: state.isFocused ? "none" : "none", // Add shadow on focus
      "&:hover": {
        border: "solid 1px #5BF1B2", // Change border color on hover
      },
      outline: "none",
      color: "#777777",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#777777", // Placeholder color
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      // color: '#3498db',                                    // Dropdown icon color
      "&:hover": {
        // color: '#2980b9',                                   // Dropdown icon hover color
      },
    }),
    indicatorSeparator: () => ({
      display: "none", // Remove the separator
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#777777", // Color of selected value text
    }),
  };

  // console.log("tenant data===", limitExceed);
  const handleActionAdd = async () => {
    const out_bondNumber = state.callForwardingNumber
      .toString()
      .replace(countryCode.toString(), "");
    dispatch(
      increaseMarketLimitAction(
        {
          body: {
            phone: [out_bondNumber.replace(/\D/g, "")],
            phoneNumber: [
              {
                number: out_bondNumber.replace(/\D/g, ""),
                date: new Date(),
              },
            ],
            tenantId,
          },
          _id: marketId,
        },
        () => handleClose()
      )
    );

    setIsLoading(false);
    setLoading(false);
    setIsModelOpen(false);
    handleClose();
    rowData.callForwardingNumber = out_bondNumber;
    updateListing && updateListing(rowData, index);
  };
  const handleActionConfirm = async () => {
    setLimitExceed(false);

    const { data, isError, message, sessionExpired } = await commonAPICall(
      REQUEST_TYPES.POST,
      ENDPOINTS.CREATE_NEW_MARKET,
      createPayload
    );
    if (sessionExpired) {
      // sessionStorage.clear()
      dispatch(logOut());

      navigate("/Login");
    }
    if (isError) {
      setLoading(false);
      setIsLoading(false);
      return toast.error(message);
    }

    toast.success(`Successfully created.`);
    setSate(initialValues);
    refreshHandler && refreshHandler(tenantId);
    setIsLoading(false);
    setLoading(false);
    setIsModelOpen(false);
    handleClose();
  };
  return (
    <div>
      <div
        style={{ display: "flex", alignItems: "ceneter" }}
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        open={open}
        // onClose={handleClose}
        onClose={cancelHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              padding: "16px",
              color: "#012635",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "26px",
              borderBottom: "solid 1px #F7F7F7",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{title}</span>{" "}
            <span>
              <MdOutlineClose
                //  onClick={() => handleClose()}
                onClick={() => cancelHandler()}
                style={{ fontSize: "24px", cursor: "pointer" }}
              />
            </span>
          </div>
          <div style={{ padding: "16px 24px" }}>
            <div
              style={{
                display: warning ? "flex" : "none",
                backgroundColor: "#D6E7FC",
                borderRadius: "12px",
                height: "60px",
                padding: "0px 16px",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div>
                <RiErrorWarningFill
                  style={{ fontSize: "28px", color: "#005ABB" }}
                />
              </div>
              <div
                style={{
                  color: "#012635",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "22px",
                }}
              >
                Please note that this number/user will be charged according to
                your current subscription
              </div>
              <div
                onClick={() => setWarning(false)}
                style={{
                  color: "#012635",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                  cursor: "pointer",
                }}
              >
                Accept
              </div>
            </div>
          </div>

          <div style={{ padding: "16px 24px" }}>
            <div
              style={{
                display: title == "Create New Markets" ? "flex" : "none",
                gap: "16px",
              }}
            >
              <div
                onClick={() => {
                  if (!state?.tenantId) {
                    console.log("check fetchc");
                    if (tenants.length < 1) {
                      fetchData();
                    }
                  }
                }}
                style={{ width: "49%" }}
              >
                <label
                  style={{
                    color: "#012635",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "22px",
                  }}
                >
                  Tenant
                  <LuAsterisk style={{ color: "red" }} />
                </label>
                <Select
                  defaultValue={state?.tenantId}
                  onChange={(val) =>
                    commonHandler(
                      val?.value || "",
                      "tenantId",
                      "",
                      val?.marketIncluded
                    )
                  }
                  styles={customStyles}
                  options={tenants.map((option) => ({
                    value: option.id,
                    label: `${option?.name}-${option?.userId}`,
                  }))}
                  components={{ DropdownIndicator: CustomDropdownIndicator }}
                  isSearchable
                  placeholder="Search..."
                />
              </div>
              <div style={{ width: "50%" }}>
                <label
                  style={{
                    color: "#012635",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "22px",
                  }}
                >
                  Area Code
                  <LuAsterisk style={{ color: "red" }} />
                </label>

                <Select
                  placeholder="Search..."
                  isDisabled={createDisable.tenant && true}
                  value={
                    state?.areaCode?.value == undefined ? "" : state?.areaCode
                  }
                  onChange={(val) => areaCodeHandler(val || "", "areaCode")}
                  styles={customStyles}
                  options={areaCodes.map((option) => ({
                    value: option._id,
                    label: option.areaCode,
                  }))}
                  components={{ DropdownIndicator: CustomDropdownIndicator }}
                  isSearchable
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
              <div style={{ width: "50%" }}>
                <label
                  style={{
                    color: "#012635",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "22px",
                  }}
                >
                  Market Name
                  <LuAsterisk style={{ color: "red" }} />
                </label>
                {title == "Add Outbound Number" ? (
                  <input
                    disabled={title == "Add Outbound Number" && true}
                    name="name"
                    value={state?.name}
                    placeholder="Enter"
                    style={{
                      backgroundColor:
                        title == "Add Outbound Number" && "#F0F0F0",
                    }}
                    className={styles.outbondInput}
                  />
                ) : (
                  <input
                    disabled={createDisable?.areaCode && true}
                    name="name"
                    value={state?.name}
                    onChange={(e) => handleChange(e)}
                    maxLength={20}
                    placeholder="Enter"
                    style={{
                      backgroundColor:
                        title == "Add Outbound Number" && "#F0F0F0",
                    }}
                    className={styles.outbondInput}
                  />
                )}
              </div>
              <div style={{ width: "50%" }}>
                <label
                  style={{
                    color: "#012635",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "22px",
                  }}
                >
                  {title == "Add Outbound Number"
                    ? "Outbound Number"
                    : "Call Forwarding Number"}
                  <LuAsterisk style={{ color: "red" }} />
                </label>
                {isIncriment ? (
                  <PhoneInput
                    country={"us"}
                    disableDropdown={true}
                    placeholder="Enter your phone number"
                    // value={!isIncriment && title =="Add Outbound Number"  ? "" : state?.callForwardingNumber}
                    onChange={(phone, data) =>
                      commonHandler(phone, "callForwardingNumber", data)
                    }
                    inputStyle={{
                      border: "solid 1px #D3D7DD",
                      height: "48px",
                      borderRadius: "8px",
                      color: "#777777",
                    }}
                  />
                ) : title == "Create New Markets" ? (
                  <PhoneInput
                    disabled={createDisable?.areaCode && true}
                    country={"us"}
                    disableDropdown={true}
                    containerStyle={{
                      backgroundColor: createDisable?.areaCode && "#F0F0F0",
                    }}
                    placeholder="Enter your phone number"
                    value={
                      !isIncriment && title == "Add Outbound Number"
                        ? ""
                        : state?.callForwardingNumber
                    }
                    onChange={(phone, data) =>
                      commonHandler(phone, "callForwardingNumber", data)
                    }
                    inputStyle={{
                      border: "solid 1px #D3D7DD",
                      height: "48px",
                      borderRadius: "8px",
                      color: "#777777",
                    }}
                  />
                ) : (
                  <PhoneInput
                    country={"us"}
                    disableDropdown={true}
                    placeholder="Enter your phone number"
                    value={
                      !isIncriment && title == "Add Outbound Number"
                        ? ""
                        : state?.callForwardingNumber
                    }
                    onChange={(phone, data) =>
                      commonHandler(phone, "callForwardingNumber", data)
                    }
                    inputStyle={{
                      border: "solid 1px #D3D7DD",
                      height: "48px",
                      borderRadius: "8px",
                      color: "#777777",
                    }}
                  />
                )}
                {validation.phone && (
                  <div style={{ color: "red", fontSize: "10px" }}>
                    Provide a valid phone number.
                  </div>
                )}
              </div>
            </div>
            <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
              <div
                style={{
                  display: title == "Create New Markets" ? "none" : "block",
                  width: "50%",
                }}
              >
                <label
                  style={{
                    color: "#012635",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "22px",
                  }}
                >
                  Area Code
                  <LuAsterisk style={{ color: "red" }} />
                </label>

                {title == "Add Outbound Number" ? (
                  <Select
                    isDisabled={true}
                    value={state?.areaCode || {}}
                    // onChange={(val) => areaCodeHandler(val || "", "areaCode")}
                    styles={customStyles}
                    options={areaCodes.map((option) => ({
                      value: option._id,
                      label: option.areaCode,
                    }))}
                    components={{ DropdownIndicator: CustomDropdownIndicator }}
                    isSearchable
                    placeholder="Search..."
                  />
                ) : (
                  <Select
                    value={state?.areaCode}
                    isDisabled={title == "Edit Markets"}
                    onChange={(val) => areaCodeHandler(val || "", "areaCode")}
                    styles={customStyles}
                    options={areaCodes.map((option) => ({
                      value: option._id,
                      label: option.areaCode,
                    }))}
                    components={{ DropdownIndicator: CustomDropdownIndicator }}
                    isSearchable
                    placeholder="Search..."
                  />
                )}
              </div>
              <div
                style={{
                  width: "50%",
                  display: title == "Create New Markets" ? "block" : "none",
                }}
              >
                <label
                  style={{
                    color: "#012635",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "22px",
                  }}
                >
                  Outbound Number
                  <LuAsterisk style={{ color: "red" }} />
                </label>

                <PhoneInput
                  country={"us"}
                  disableDropdown={true}
                  placeholder="Enter your phone number"
                  // value={!isIncriment && title =="Add Outbound Number"  ? "" : state?.callForwardingNumber}
                  onChange={(phone, data) =>
                    commonHandler(phone, "outBoundNumber", data)
                  }
                  inputStyle={{
                    border: "solid 1px #D3D7DD",
                    height: "48px",
                    borderRadius: "8px",
                    color: "#777777",
                  }}
                />

                {validation.phone && (
                  <div style={{ color: "red", fontSize: "10px" }}>
                    Provide a valid phone number.
                  </div>
                )}
              </div>
              <div style={{ width: "50%" }}>
                <label
                  style={{
                    color: "#012635",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "22px",
                  }}
                >
                  Time Zone
                  <LuAsterisk style={{ color: "red" }} />
                </label>
                {/* <select style={{ backgroundColor: title == "Add Outbound Number" && '#F0F0F0', color: "#777777", fontSize: "14px", paddingLeft: "12px" }} className={styles.custom_select}>
                  <option value="">{state?.timeZone}</option>
                </select> */}

                <input
                  disabled={true}
                  value={state?.abbrevation || rowData?.abbrevation}
                  name="time_sone"
                  placeholder="Time Zone"
                  style={{
                    backgroundColor:
                      title == "Add Outbound Number" && "#F0F0F0",
                  }}
                  className={styles.outbondInput}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "16px",
              borderTop: "solid 1px #F0F0F0",
              height: "72px",
              display: "flex",
              justifyContent: "end",
              gap: "16px",
            }}
          >
            <div
              onClick={() => cancelHandler()}
              style={{
                color: "#777777",
                border: "solid 1px #777777",
                borderRadius: "8px",
                height: "40px",
                width: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              Cancel
            </div>
            {loading ? (
              <div
                style={{
                  color: "white",
                  borderRadius: "8px",
                  height: "40px",
                  width: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularLoader />
              </div>
            ) : (
              <button
                disabled={
                  title == "Add Outbound Number"
                    ? false
                    : `1${rowData?.callForwardingNumber}` !=
                        state.callForwardingNumber ||
                      rowData?.name != state.name
                    ? false
                    : true
                }
                onClick={() => saveHandler()}
                style={{
                  color: "white",
                  backgroundColor: "#00BD82",
                  borderRadius: "8px",
                  height: "40px",
                  width: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: `${
                    state.callForwardingNumber.length < 9 ||
                    (`1${rowData?.callForwardingNumber}` ==
                      state.callForwardingNumber &&
                      title == "Add Outbound Number")
                      ? ""
                      : "pointer"
                  }`,
                }}
              >
                Save
              </button>
            )}
          </div>
        </Box>
      </Modal>
      <Components.Common.WarningModal
        onClose={() => {
          setIsModelOpen(false);
          setSelectedDeleteId("");
        }}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onOkay={() => {
          if (title == "Create New Markets") {
            handleActionConfirm();
          } else {
            handleActionAdd();
          }
        }} // Confirm delete when "Okay" is clicked
        open={isModelOpen}
        WarningItemTitle={`Are you sure want to add market?`}
        WarningItemName="Direct Import"
        warningItemText={`This tenant subscribed to ${limitExceed?.subscriptionName}, and the tenant market limit has already been reached.`}
      />
    </div>
  );
};

export default AddBondNumberModal;
