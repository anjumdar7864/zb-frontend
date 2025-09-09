

import { useEffect } from "react";
import Components from "@/components";
import { remToPixels } from "@/utils";
import useResponsiveWidth from "@/components/common/Header/useResponsiveWidth";
import {
  FaChevronDown,
  FaExclamationTriangle,
  FaRegCheckCircle,
  FaPen,
  FaPlus,
  FaPlusCircle,
  FaSave,
  FaSearch,
  FaTimes,
  FaInfoCircle,
} from "react-icons/fa";
import { Progress } from "react-sweet-progress";
import { PiArrowElbowDownRightBold } from "react-icons/pi";
import {
  CreateNewModalStyled,
  MarketListTableStyled,
  MarketListsStyled,
  TableExtraRowStyled,
  TableRowStyled,
  CircularProgressbarStyled,
  LightTooltip,
  DlcModelStyle,
  FormInputStyle,
  UserTop,
  StyledSelect,
  StyledInput,
  CustomScroll,
} from "./styles";
import { buildStyles } from "react-circular-progressbar";
import { useLayoutEffect, useState } from "react";
import { useGlobalContext } from "@/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { Formik, Form, useField, ErrorMessage, Field, useFormik } from "formik";
import * as Yup from "yup";
import { marketSchema } from "@/schema";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";
import {
  createNewMarket,
  editMarketAction,
  getAllMarketsList,
  increaseMarketLimitAction,
  updateMarketStatus,
  updateCallForwardNumber,
  deleteOutBoundNumberAndItsRelatedData,
  createNewDLC,
  updateNewDLC,
} from "@/store/actions/market.action";
import {
  GetAllAreaCode,
  getTimeZoneAccordingToAreaCode,
  logOut,
} from "@/store/actions";
import { MdOutlineCancel, MdRemoveRedEye, MdDelete, MdInfoOutline } from "react-icons/md";
import Select, { components } from "react-select";
import { toast } from "react-hot-toast";
import { ConfirmModal } from "@/components/common";
import MarketListTableUser from "./MarketListTableUser";
import { FiSearch } from "react-icons/fi";
import DropDownFilter from "@/components/common/DropDownFilter/DropDownFilter";
import { IoMdAlert, IoMdClose } from "react-icons/io";
// import InputPhoneNo from "@/components/common/MyInputPhone/MyInputPhone";
// import PhoneInputFlag from "@/components/common/PhoneInputFlag/PhoneInputFlag";
import PhoneInputFlag from "@/components/common/PhoneInputFlag/PhoneInputFlag";
import { Alert, Button, Stack } from "@mui/material";
import { Country, State, City } from 'country-state-city';
import PhoneInputSec from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import "./MarketAndLimit.css";
import DropDown from "@/components/common/DropDwon/DropDown";
import { commonAPICall } from "@/services/api/common";
import { getAdminById, getDLCById, REQUEST_TYPES } from "@/utils/constant/url";
import { LuAsterisk } from "react-icons/lu";
import { SlArrowDown } from "react-icons/sl";
import { Note } from "@/modules/Tenat/CreateUserModel/styles";
import { Flex, Paragraph } from "@/styles/CommonStyles";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PreviewModal from "@/modules/Notification/NotificationPopUp";


const CustomDropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <SlArrowDown style={{ color: "#012635" }} />
  </components.DropdownIndicator>
);


const MarketLists = () => {
  const [isCreateNewModalOpen, setIsCreateNewModalOpen] = useState(false);
  const [isdlcModelOpen, setIsDlcModelOpen] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  const [editMarket, setEditMarket] = useState({});
  const [editMarketList, setEditMarketList] = useState({});
  const dispatch = useDispatch();
  const { marketsData } = useSelector((s) => s.marketReducer);
  const { setIsLoaderShowing } = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfRowsShowing, setNumberOfRowsShowing] = useState(25);
  const [searchText, setSearchText] = useState("");
  const [areaCodesOptions, setAreaCodesOptions] = useState([]);
  const [selectedAreaCode, setSelectedAreaCode] = useState("");
  const [marketOptions, setMarketptions] = useState([]);
  const [selectedAreaCodeVal, setSelectedAreaCodeVal] = useState()
  const [selectedMarketOptionVAl, setSelectedMarketOptionVAl] = useState()
  const [selectedMarketOption, setSelectedMarketOption] = useState("");
  const [searchParams] = useSearchParams();
  const [sorting, setSorting] = useState("")
  const { areaCodes, timeZoneOfAreaCode } = useSelector(
    (s) => s.areaCodeReducer
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = formData.get("search");
    if (!search) return;
    setSearchText(search);
  };


  useLayoutEffect(() => {
    dispatch(
      getAllMarketsList({
        limit: numberOfRowsShowing,
        page: currentPage,
        search: searchText,
        areaCode: selectedAreaCode === "Area Code" ? "" : selectedAreaCode,
        market: selectedMarketOption === "Market" ? "" : selectedMarketOption,

      }, () => { }, () => { }, sorting)
    );
  }, [currentPage, dispatch, numberOfRowsShowing, searchText, selectedAreaCode, selectedMarketOption, sorting]);

  const sessionData = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    // dispatch(GetAllAreaCode());
    dispatch(GetAllAreaCode('tenant', sessionData?.tenantId ? sessionData?.tenantId : sessionData._id));
  }, []);
  useEffect(() => {
    const options = (areaCodes && areaCodes.length) ? areaCodes.map(item => ({ ...item, name: item?.areaCode, marketName: item?.name })) : [];
    setAreaCodesOptions([{ _id: "Market", name: "Area Code" }, ...options])
  }, [JSON.stringify(areaCodes)])
  useLayoutEffect(() => {
    setIsLoaderShowing(marketsData?.loading);
  }, [marketsData?.loading, setIsLoaderShowing]);
  useEffect(() => {
    const data = marketsData && !!marketsData.results ? marketsData?.results?.map(item => ({ id: item?._id, name: item?.name, areaCode: item?.areaCode })) : [];
    if (data.length > marketOptions.length) {
      setMarketptions([{ _id: "Area Code", name: "Market" }, ...data]);

    }


  }, [marketsData])
  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );

  const type = localStorage.getItem("type") ?? localStorage.getItem("type");
  const areaCodeHandler = (value = "") => {


    setSelectedMarketOption("")
    setSelectedMarketOptionVAl({ label: value.MarketName != undefined ? value.MarketName : "Market", value: value.MarketName != undefined ? value.MarketName : "Market" });
    setSelectedAreaCodeVal({ label: value.label, value: value.value })
    // setSelectedAreaCode(value);
    setSelectedAreaCode(value.label);
  }
  const marketDropHandler = (value = "") => {
    console.log("areaccc", value);
    setSelectedMarketOption(value.label);
    setSelectedMarketOptionVAl(value);
    setSelectedAreaCode("")
    setSelectedAreaCodeVal({ label: value.areaCode != undefined ? value.areaCode : "Area Code", value: value.label })
    // setSelectedMarketOption(value);
    // console.log("calue checkoing" , value);

  }
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isDisabled ? '#f4f5f8' : 'white',
      borderColor: state.isFocused ? '#5BF1B2' : '#D3D7DD', // Change border color
      boxShadow: 'none',
      borderRadius: '8px', // Change border radius
      height: "48px",
      '&:hover': {
        borderColor: '#5BF1B2', // Hover border color
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: 8,
    }),
    indicatorSeparator: () => ({
      display: 'none', // Remove the indicator separator line
    }),
    menu: (provided) => ({
      ...provided,
      // Dropdown list background color
      zIndex: 1000, // Set z-index for menu
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 1000, // Set z-index for menu portal to ensure it’s on top
    }),
  };

  useEffect(() => {
    if (searchParams.get("form")) {
      setIsDlcModelOpen(true);
    }
  }, [searchParams])


  console.log("marketsData", marketsData);
  return (
    <MarketListsStyled>
      <div className="top">
        <div className="left" style={{ display: "flex", gap: "12px" }}>
          <div className="dropDown" style={{ width: "150px", }}>

            {/* <DropDown standard={true} name="" valueKey="name" option={"name"} ArrData={marketOptions} defaultValue={selectedMarketOption || ""} valFunc={marketDropHandler} /> */}
            <Select
              value={selectedMarketOptionVAl}
              onChange={marketDropHandler}
              styles={customStyles}
              options={marketOptions.map((option) => ({
                value: option.name,
                label: option.name,
                areaCode: option.areaCode,

              }))}
              isSearchable
              placeholder="Market"

            />
          </div>
          <div className="dropDown" style={{ width: "150px" }}>

            {/* <DropDown standard={true} name="" valueKey="name" option={"name"} ArrData={areaCodesOptions} defaultValue={selectedAreaCode || ""} valFunc={areaCodeHandler} /> */}
            <Select
              value={selectedAreaCodeVal}
              onChange={areaCodeHandler}
              styles={customStyles}
              options={areaCodesOptions.map((option) => ({
                value: option.name,
                label: option.name,
                MarketName: option.marketName,
              }))}
              isSearchable
              placeholder="Area code"

            />
          </div>

        </div>

        <div className="right">

        </div>

        {type === "superAdmin" && (
          <div className="right">
            <button onClick={() => setIsCreateNewModalOpen(true)}>
              <span className="text">Create New Market</span>
            </button>
          </div>
        )}
        {(type === "admin" || user.permissions.includes('Request New Market')) && (
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }} className="right">
            <div style={{ height: "100%", display: "flex", alignItems: "center", color: "#00BD82", gap: "16px", backgroundColor: "white", borderRadius: "20px", height: "38px", padding: "0px 8px", boxShadow: "0px 4px 4px rgba(143, 143, 143, 0.25)" }}>
              <span style={{ backgroundColor: "#00BD82", color: "white", fontWeight: 500, borderRadius: "12px", padding: "2px 8px" }}>
                Active Markets

              </span>
              <div style={{ color: "#00BD82", backgroundColor: "#E1F3EE", borderRadius: "12px", width: "25px", height: "25px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, boxShadow: "0px 2px 2px rgba(143, 143, 143, 0.25)" }}>{marketsData?.totalActiveCount}</div>
            </div>
            <button
              // disabled={user?.isTenDlcSubmit == "Accept" ? true : false}
              style={{ width: "150px", border: "solid 1px #00BD82", backgroundColor: "transparent" }} onClick={() => setIsDlcModelOpen(true)}>
              <span style={{ color: "#00BD82", }} className="text">10 DLC Form</span>
            </button>
            {
              user?.isNewUser && user?.isTenDlcSubmit != "Accept" ?
                <LightTooltip
                  title={
                    <div>Your 10 DLC forms have either not been submitted or have not been approved.</div>
                  }
                  placement="top"
                  arrow
                >
                  <button
                    disabled={user?.isNewUser && user?.isTenDlcSubmit != "Accept" ? true : !user?.isNewUser && user?.isTenDlcSubmit == "Reject" ? true : !user?.isNewUser && user?.marketAndLimitStatus == false ? true : false}
                    onClick={() => setIsCreateNewModalOpen(true)}>
                    <span className="text">Request New Market</span>
                  </button>
                </LightTooltip>

                : !user?.isNewUser && user?.isTenDlcSubmit == "Reject" ?

                  <LightTooltip
                    title={
                      <div>Your 10 DLC forms have either not been submitted or have not been approved.</div>
                    }
                    placement="top"
                    arrow
                  >
                    <button
                      disabled={user?.isNewUser && user?.isTenDlcSubmit != "Accept" ? true : !user?.isNewUser && user?.isTenDlcSubmit == "Reject" ? true : !user?.isNewUser && user?.marketAndLimitStatus == false ? true : false}
                      onClick={() => setIsCreateNewModalOpen(true)}>
                      <span className="text">Request New Market</span>
                    </button>
                  </LightTooltip>
                  : !user?.isNewUser && user?.marketAndLimitStatus == false ?
                    <LightTooltip
                      title={
                        <div>Your 10 DLC forms have either not been submitted or have not been approved.</div>
                      }
                      placement="top"
                      arrow
                    >
                      <button
                        disabled={user?.isNewUser && user?.isTenDlcSubmit != "Accept" ? true : !user?.isNewUser && user?.isTenDlcSubmit == "Reject" ? true : !user?.isNewUser && user?.marketAndLimitStatus == false ? true : false}
                        onClick={() => setIsCreateNewModalOpen(true)}>
                        <span className="text">Request New Market</span>
                      </button>
                    </LightTooltip>
                    :
                    <button
                      disabled={user?.isNewUser && user?.isTenDlcSubmit != "Accept" ? true : !user?.isNewUser && user?.isTenDlcSubmit == "Reject" ? true : !user?.isNewUser && user?.marketAndLimitStatus == false ? true : false}
                      onClick={() => setIsCreateNewModalOpen(true)}>
                      <span className="text">Request New Market</span>
                    </button>
            }

          </div>
        )}
      </div>

      <div style={{ height: "100%" }} className="bottom">


        {type === "superAdmin" ? (
          <MarketListTable
            setEditMarket={setEditMarket}
            setEditMarketList={setEditMarketList}
            currentPage={currentPage}
            numberOfRowsShowing={numberOfRowsShowing}
            setCurrentPage={setCurrentPage}
            setNumberOfRowsShowing={setNumberOfRowsShowing}
            search={searchText}
            setIsDlcModelOpen={setIsDlcModelOpen}

          />
        ) : (
          <MarketListTableUser
            setEditMarket={setEditMarket}
            setEditMarketList={setEditMarketList}
            currentPage={currentPage}
            numberOfRowsShowing={numberOfRowsShowing}
            setCurrentPage={setCurrentPage}
            setNumberOfRowsShowing={setNumberOfRowsShowing}
            search={searchText}
            setIsDlcModelOpen={setIsDlcModelOpen}
            user={user}
            sorting={sorting}
            setSorting={setSorting}
          />
        )}
      </div>

      <Components.Common.ModalTop
        open={isCreateNewModalOpen}
        onClose={() => { }}
      >
        <CreateNewModal
          onClose={() => setIsCreateNewModalOpen(false)}
          limit={numberOfRowsShowing}
          page={currentPage}
          search={searchText}
          extraMarket={marketsData?.extraNumber < 0 ? 0 : marketsData?.extraNumber}
          requestMarketCount={marketsData?.requestMarketCount}
          countOfOutBoundNumber={marketsData?.countOfOutBoundNumber}
          marketIncluded={marketsData?.tenantSubscription?.marketIncluded}

        />
      </Components.Common.ModalTop>
      <Components.Common.ModalTop
        open={Boolean(Object.keys(editMarket).length !== 0)}
        onClose={() => { }}
      >
        <EditModal
          onClose={() => setEditMarket({})}
          limit={numberOfRowsShowing}
          page={currentPage}
          search={searchText}
          editMarket={editMarket}
        />
      </Components.Common.ModalTop>
      <Components.Common.ModalTop
        open={isdlcModelOpen}
        onClose={() => {
          setIsDlcModelOpen(true);
        }}
      >
        <DlcModel
          open={isdlcModelOpen}
          onClose={() => setIsDlcModelOpen(false)}
          isAlertVisible={isAlertVisible}
          setIsAlertVisible={setIsAlertVisible}
        />
      </Components.Common.ModalTop>
      <Components.Common.ModalTop
        open={Boolean(Object.keys(editMarketList).length !== 0)}
        onClose={() => { }}
      >
        <IncreaseLimitModal
          onClose={() => setEditMarketList({})}
          limit={numberOfRowsShowing}
          page={currentPage}
          search={searchText}
          editMarketList={editMarketList}
        />
      </Components.Common.ModalTop>
    </MarketListsStyled>

  );
};

export default MarketLists;

const MarketListTable = ({
  setEditMarket,
  setEditMarketList,
  setCurrentPage,
  setNumberOfRowsShowing,
  currentPage,
  numberOfRowsShowing,
  search,
  setIsDlcModelOpen,
}) => {
  const [sortingInfo, setSortingInfo] = useState({
    sortedBy: "",
    direction: 0,
  });
  const width = useResponsiveWidth();
  const { windowWidth, isLarge } = useGlobalContext();
  const { marketsData } = useSelector((s) => s.marketReducer);

  const handleSort = (sortedBy) => {
    setSortingInfo((p) => {
      if (p.sortedBy !== sortedBy) {
        return { direction: 1, sortedBy };
      } else {
        return { ...p, direction: p.direction === 1 ? -1 : 1 };
      }
    });
  };
  const type = localStorage.getItem("type") ?? localStorage.getItem("type");
  return (
    <MarketListTableStyled
      tableWidth={
        windowWidth -
        remToPixels(7) -
        remToPixels(2.6 + 3) -
        (isLarge ? 0 : remToPixels(26))
      }
    >
      <div className="bottom">
        <div className="table">
          <div className="row">
            <h6 className="col" onClick={() => handleSort("name")}>
              <span
                className={`text  ${sortingInfo.sortedBy === "name" ? "select" : ""
                  }`}
              >
                Name
              </span>
              <Components.Common.SortIcon
                direction={sortingInfo.direction}
                isSorted={sortingInfo.sortedBy === "name"}
              />
            </h6>
            <h6 className="col" onClick={() => handleSort("areaCode")}>
              <span
                className={`text  ${sortingInfo.sortedBy === "areaCode" ? "select" : ""
                  }`}
              >
                Area Code
              </span>
              <Components.Common.SortIcon
                direction={sortingInfo.direction}
                isSorted={sortingInfo.sortedBy === "areaCode"}
              />
            </h6>
            <h6 className="col">
              <span className={`text`} style={{ marginRight: ".4rem" }}>
                Messages Sent Today
              </span>

              <LightTooltip
                title={
                  <>
                    <p style={{ fontWeight: "bold" }}>Daily Message Limit</p>
                    <p>
                      You've sent 0 / 1,200 Batch messages today{" "}
                      <a
                        href="https://help.zeitblast.us/en/articles/5884621-10dlc-market-registration"
                        style={{ color: "#36a3f7" }}
                      >
                        Learn more
                      </a>{" "}
                      about the limits.
                    </p>
                  </>
                }
                placement="top"
                arrow
              >

                <div id="item">
                  <Progress
                    type="circle"
                    width={width}
                    strokeWidth={8}
                    status="active"
                    theme={{
                      active: {
                        trailColor: "#d9d9d9",
                        color: "#007bff",
                      },
                    }}
                    percent={60}
                  />
                </div>
              </LightTooltip>

            </h6>
            <h6 className="col">
              <span className={`text`}>Messages Sent This Month</span>
              <LightTooltip
                title={
                  <>
                    <p style={{ fontWeight: "bold" }}>Daily Message Limit</p>
                    <p>
                      You've sent 0 / 20,000 Batch messages this month{" "}
                      <a
                        href="https://help.zeitblast.us/en/articles/5884621-10dlc-market-registration"
                        style={{ color: "#36a3f7" }}
                      >
                        Learn more
                      </a>{" "}
                      about the limits.
                    </p>
                  </>
                }
                placement="top"
                arrow
              >

                <div id="item">
                  <Progress
                    type="circle"
                    width={width}
                    strokeWidth={8}
                    status="active"
                    theme={{
                      active: {
                        trailColor: "#d9d9d9",
                        color: "#007bff",
                      },
                    }}
                    percent={60}
                  />
                </div>
              </LightTooltip>
            </h6>
            <h6
              className="col"
              onClick={() => handleSort("callForwardingNumber")}
            >
              <span
                className={`text  ${sortingInfo.sortedBy === "callForwardingNumber"
                  ? "select"
                  : ""
                  }`}
              >
                Call Forwarding Number
              </span>
              <Components.Common.SortIcon
                direction={sortingInfo.direction}
                isSorted={sortingInfo.sortedBy === "callForwardingNumber"}
              />
            </h6>
            <h6
              className="col"
              onClick={() => handleSort("registrationStatus")}
            >
              {type === "superAdmin" && (
                <>
                  <span
                    className={`text  ${sortingInfo.sortedBy === "registrationStatus"
                      ? "select"
                      : ""
                      }`}
                  >
                    Registeration Status
                  </span>
                  <Components.Common.SortIcon
                    direction={sortingInfo.direction}
                    isSorted={sortingInfo.sortedBy === "registrationStatus"}
                  />
                </>
              )}
            </h6>
            <h6 className="col">
              {type === "superAdmin" && <span className={`text`}>Actions</span>}
            </h6>
          </div>
          {marketsData.results.length === 0 && (
            <div className="row error">
              <p>No Record Found!</p>
            </div>
          )}
          {marketsData.results.map((singleMarketData, i) => (
            <TableRow
              key={i}
              setEditMarket={setEditMarket}
              setEditMarketList={setEditMarketList}
              singleMarketData={singleMarketData}
              limit={numberOfRowsShowing}
              page={currentPage}
              search={search}
              setIsDlcModelOpen={setIsDlcModelOpen}
            />
          ))}
        </div>
        {marketsData.length !== 0 && (
          <div className="bottom">
            <div>
              <span>Total: {marketsData?.totalResults ?? 0}</span>
            </div>
            <div>
              <Components.Common.MyPagination
                currentPage={currentPage}
                onChange={(p) => setCurrentPage(p)}
                availableNumberOfRows={[10, 25, 50]}
                currentlySelectedNumberOfRows={numberOfRowsShowing}
                onChangeNumberOfRows={(p) => setNumberOfRowsShowing(p)}
                totalItems={marketsData?.totalResults ?? 0}
              />
            </div>
            <div></div>
          </div>
        )}
      </div>
    </MarketListTableStyled>
  );
};

const TableRow = ({
  setEditMarket,
  setEditMarketList,
  singleMarketData,
  limit,
  page,
  search,
  setIsDlcModelOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const type = localStorage.getItem("type") ?? localStorage.getItem("type");
  const totalSendMessageCount =
    singleMarketData?.phoneNumber?.reduce(
      (acc, obj) => acc + obj.sendMessageCount,
      0
    ) ?? 0;
  const totalSendMonthlyMessageCount =
    singleMarketData?.phoneNumber?.reduce(
      (acc, obj) => acc + obj.sendMonthlyMessageCount,
      0
    ) ?? 0;
  let activatedCount = singleMarketData?.phoneNumber?.filter(
    (item) => item.active === true
  );
  let deActivatedCount = singleMarketData?.phoneNumber?.filter(
    (item) => item.active === false
  );
  return (
    <TableRowStyled
      className="row body"
      open={isOpen}
      onClick={() => setIsOpen((p) => !p)}
    >
      <div className="col icon">
        <p>
          <span className="icon">
            <FaChevronDown />
          </span>
          <span className="text">{singleMarketData?.name}</span>
        </p>
      </div>
      <div className="col data">
        <span className="text">{singleMarketData?.areaCode}</span>
      </div>
      <div className="col percentage">
        <span className="text"> {totalSendMessageCount}</span>

        {/* <span className="bar" style={{ "--value": 60 }}></span> */}
      </div>
      <div className="col percentage">
        <span className="text"> {totalSendMonthlyMessageCount}</span>
      </div>
      <div className="col data">
        <span className="text">
          {singleMarketData?.callForwardingNumber
            ? singleMarketData?.callForwardingNumber
            : ""}
        </span>
      </div>
      <div className="icons-for-total-active">
        {type === "superAdmin" && (
          <p>
            <div style={{ cursor: "pointer", color: "#34bfa3" }}>
              <Components.Common.LightTooltip
                placement="top"
                arrow
                title="Activated"
              >
                <span
                  className="checkIcon-style-modify"
                  style={{
                    color: "#34bfa3",
                    backgroundColor: "rgba(96,188,165,.12)",
                  }}
                >
                  <FaRegCheckCircle className="checkIcon-style-modify-icon" />
                  <span style={{ marginLeft: "0.5rem", fontSize: "1.2rem" }}>
                    {activatedCount?.length > 0 ? activatedCount?.length : 0}
                  </span>
                </span>
              </Components.Common.LightTooltip>
              <Components.Common.LightTooltip
                placement="top"
                arrow
                title="Deactivated"
              >
                <span
                  style={{
                    color: "red",
                    backgroundColor: "#FFCCCC",
                  }}
                  className="checkIcon-style-modify"
                >
                  <MdOutlineCancel className="checkIcon-style-modify-icon" />
                  <span style={{ marginLeft: "0.5rem" }}>
                    {deActivatedCount?.length > 0
                      ? deActivatedCount?.length
                      : 0}
                  </span>
                </span>
              </Components.Common.LightTooltip>
            </div>
          </p>
        )}
      </div>
      <div className="col actions" onClick={(e) => e.stopPropagation()}>
        {type === "superAdmin" && (
          <>
            <Components.Common.LightTooltip
              placement="left"
              arrow
              title="Edit Market"
            >
              <button
                onClick={() =>
                  setEditMarket({
                    name: singleMarketData?.name,
                    phone: singleMarketData?.phone
                      ? singleMarketData?.phone[0]
                      : "",
                    areaCode: singleMarketData?.areaCode,
                    allPhones: singleMarketData?.phone,
                    timeZone: singleMarketData?.abbrevation,
                    index: 0,
                    _id: singleMarketData?._id,
                    callForward: true,
                    callForwardingNumber:
                      singleMarketData?.callForwardingNumber,
                  })
                }
              >
                <FaPen />
              </button>
            </Components.Common.LightTooltip>
            <Components.Common.LightTooltip
              placement="left"
              arrowt
              title="Add Number to market"
            >
              <button
                onClick={() =>
                  setEditMarketList({
                    name: singleMarketData?.name,
                    phone: singleMarketData?.phone
                      ? singleMarketData?.phone[0]
                      : "",
                    areaCode: singleMarketData?.areaCode,
                    allPhones: singleMarketData?.phone,
                    timeZone: singleMarketData?.abbrevation,
                    index: 0,
                    _id: singleMarketData?._id,
                  })
                }
              >
                <FaPlusCircle />
              </button>
            </Components.Common.LightTooltip>
          </>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="col extraRows"
            onClick={(e) => e.stopPropagation()}
            initial={{
              opacity: 0,
              height: 0,
              transition: { ease: "easeIn", duration: 0.3 },
            }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: { ease: "easeIn", duration: 0.3 },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: { ease: "easeIn", duration: 0.3 },
            }}
          >
            {singleMarketData?.phoneNumber
              ? singleMarketData?.phoneNumber.map((phoneNumber, i) => (
                <TableExtraRow
                  key={i}
                  phone={phoneNumber}
                  singleMarketData={singleMarketData}
                  limit={limit}
                  page={page}
                  onEdit={() =>
                    setEditMarket({
                      name: singleMarketData?.name,
                      phone: singleMarketData?.phone
                        ? singleMarketData?.phone[i]
                        : "",
                      areaCode: singleMarketData?.areaCode,
                      allPhones: singleMarketData?.phone,
                      timeZone: singleMarketData?.abbrevation,
                      index: i,
                      _id: singleMarketData?._id,
                      extra: true,
                    })
                  }
                  search={search}
                  setIsDlcModelOpen={setIsDlcModelOpen}
                />
              ))
              : null}
          </motion.div>
        )}
      </AnimatePresence>
    </TableRowStyled>
  );
};

const TableExtraRow = ({
  phone,
  singleMarketData,
  limit,
  page,
  onEdit,
  search,
  setIsDlcModelOpen,
}) => {
  const [isPopUp, setIsPopUp] = useState(false);
  const [isOpenPopUp, setIsOpenPopUp] = useState(false);
  const [isConfirmationModel, setIsConfirmationModel] = useState(false);
  let dispatch = useDispatch();
  const type = localStorage.getItem("type") ?? localStorage.getItem("type");
  const statusChangeDate = (pushDate) => {
    let date = new Date(pushDate);

    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    let formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
  };
  return (
    <>
      {isPopUp && (
        <ConfirmModal
          content={{
            title: "Are you sure ",
            message: "You want to deactivate this outbound number ?",
          }}
          onClose={() => setIsPopUp(false)}
          onOkay={() => {
            dispatch(
              updateMarketStatus({
                body: {
                  active: false,
                },
                limit,
                page,
                search,
                phone: phone.number,
              })
            );
            setIsPopUp(false);
          }}
          open={isPopUp}
        />
      )}

      {isOpenPopUp && (
        <ConfirmModal
          content={{
            title: "Are you sure",
            message: "You want to activate this outbound number ?",
          }}
          onClose={() => setIsOpenPopUp(false)}
          onOkay={() => {
            dispatch(
              updateMarketStatus({
                body: {
                  active: true,
                },
                limit,
                page,
                search,
                phone: phone.number,
              })
            );
            setIsOpenPopUp(false);
          }}
          open={isOpenPopUp}
        />
      )}
      {isConfirmationModel && (
        <ConfirmModal
          content={{
            title: "Are you sure",
            message: "You want to delete this outbound number .",
          }}
          onClose={() => setIsConfirmationModel(false)}
          onOkay={() => {
            dispatch(
              deleteOutBoundNumberAndItsRelatedData({
                limit,
                page,
                search,
                number: phone.number,
              })
            );
            setIsOpenPopUp(false);
            setIsConfirmationModel(false);
          }}
          open={isConfirmationModel}
        />
      )}

      <TableExtraRowStyled>
        <div className="col icon">
          <p>
            <span className="icon">
              <PiArrowElbowDownRightBold />
            </span>
            <span className="text">{singleMarketData?.name}</span>
          </p>
        </div>
        <div className="col data">
          <span className="text">{singleMarketData?.areaCode}</span>
        </div>
        <div className="col percentage">
          {/* Hello world */}
          <span className="text">
            {phone?.sendMessageCount ? phone.sendMessageCount : 0}
          </span>
          {/* <span className="bar" style={{ "--value": 60 }}></span> */}
        </div>
        <div className="col percentage">
          <span className="text">
            {phone?.sendMonthlyMessageCount ? phone.sendMonthlyMessageCount : 0}
          </span>
          {/* <span className="bar" style={{ "--value": 60 }}></span> */}
        </div>
        <div className="col data">
          <span className="text">{phone?.number ?? ""}</span>
        </div>
        <div className="col status">
          {type === "superAdmin" && (
            <p>
              {phone?.active && phone?.active === true ? (
                <Components.Common.LightTooltip
                  placement="left"
                  arrow
                  title={
                    phone?.date
                      ? statusChangeDate(phone?.date)
                      : "No date found"
                  }
                >
                  <div
                    style={{ cursor: "pointer", color: "#34bfa3" }}
                    onClick={() => {
                      setIsPopUp(true);
                    }}
                  >
                    <span
                      className="icon"
                      style={{
                        color: "#34bfa3",
                        backgroundColor: "rgba(96,188,165,.12)",
                      }}
                    >
                      <FaRegCheckCircle />
                    </span>
                    <span style={{ marginLeft: "1rem", fontSize: "1.1rem" }}>
                      Activated
                    </span>
                  </div>
                </Components.Common.LightTooltip>
              ) : (
                <Components.Common.LightTooltip
                  placement="left"
                  arrow
                  title={
                    phone?.date
                      ? statusChangeDate(phone?.date)
                      : "No date found"
                  }
                >
                  <div
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => {
                      setIsOpenPopUp(true);
                    }}
                  >
                    <span
                      className="icon"
                      style={{
                        color: "red",
                        backgroundColor: "rgba(96,188,165,.12)",
                      }}
                    >
                      <MdOutlineCancel className="checkIcon-style-modify-icon" />
                    </span>
                    <span style={{ marginLeft: "1rem", fontSize: "1.1rem" }}>
                      Deactivated
                    </span>
                  </div>
                </Components.Common.LightTooltip>
              )}
            </p>
          )}
        </div>

        <div className="action-icons-display">
          <div
            className="col actions"
            onClick={(e) => e.stopPropagation()}
            style={{ marginRight: "1rem" }}
          >
            {type === "superAdmin" && (
              <Components.Common.LightTooltip
                placement="left"
                arrow
                title="Edit"
              >
                <button onClick={onEdit}>
                  <FaPen />
                </button>
              </Components.Common.LightTooltip>
            )}
          </div>

          <div
            className="col actions"
            onClick={(e) => e.stopPropagation()}
            style={{ marginRight: "1rem" }}
          >
            {type === "superAdmin" && (
              <Components.Common.LightTooltip
                placement="left"
                arrow
                title="View 10DLC Registration"
              >
                <button onClick={() => setIsDlcModelOpen(true)}>
                  <MdRemoveRedEye style={{ fontSize: "2rem" }} />
                </button>
              </Components.Common.LightTooltip>
            )}
          </div>
          <div className="col actions" onClick={(e) => e.stopPropagation()}>
            {type === "superAdmin" && (
              <Components.Common.LightTooltip
                placement="left"
                arrow
                title="Delete"
              >
                <button onClick={() => setIsConfirmationModel(true)}>
                  <MdDelete style={{ fontSize: "2rem" }} />
                </button>
              </Components.Common.LightTooltip>
            )}
          </div>
        </div>
      </TableExtraRowStyled>
    </>
  );
};

export const DlcModel = (props) => {
  const options = [
    // { value: "", label: "Please select" },
    // { value: "Publicly Traded Company", label: "Publicly Traded Company" },
    // { value: "Private Company", label: "Private Company" },
    // { value: "Non-Profit Company", label: "Non-Profit Company" },
    // { value: "Government", label: "Government" },
    // { value: "Sole Proprietor", label: "Sole Proprietor" },
    { value: "Privately Held Company", label: "Privately Held Company" },
    { value: "Publicly Traded Company", label: "Publicly Traded Company" },
    { value: "Nonprofit Organization", label: "Nonprofit Organization" },
    { value: "Government", label: "Government" },

  ]
  const [state, setState] = useState(null);
  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );

  const navigate = useNavigate()

  const validation = Yup.object({
    verticleType: Yup.string()
      .min(2, "Must be 2 characters")
      .max(30, "Must be 30 characters or less")
      .required("Required"),
    marketName: Yup.string()
      .min(2, "Must be 2 characters")
      .max(30, "Must be 30 characters or less")
      .required("Required"),
    ein: Yup.string()
      .min(2, "Must be 2 characters")
      .max(30, "Must be 30 characters or less")
      .required("Required"),
    legalCompanyName: Yup.string()
      .min(2, "Must be 2 characters")
      .max(30, "Must be 30 characters or less")
      .required("Required"),

    brandName: Yup.string()
      .min(2, "Must be 2 characters")
      .max(30, "Must be 30 characters or less")
      .required("Required"),
    // websiteUrl: Yup.string().url("Invalid URL format").required("Required"),
    websiteUrl: Yup.string().url("Invalid URL format")
      .required("Required"),
    firstName: Yup.string()
      .min(2, "Must be 2 characters")
      .max(30, "Must be 30 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Must be 2 characters")
      .max(30, "Must be 30 characters or less")
      .required("Required"),

    // email: Yup.string()
    // .email("Invalid email address").required("Required")
    // .matches(/^.$/, "Must be numeric"),
    email: Yup.string()
      // .email("Invalid email address")
      // .required("Required")
      // .test("has-dot", "Invalid email address", (value) => value && value.includes('.')),
      .email("Invalid email address")
      .required("Required")
      .matches(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,6}$/, "Invalid email address"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Must be numeric")
      .min(5, "Too short, minimum 5 characters")
      .max(15, "Too long, maximum 15 characters")
      .required("Required"),
    mailingAddress: Yup.string()
      .min(2, "Address is to short")
      .max(50, "Must be 50 characters or less")
      .required("Required"),

    city: Yup.string()
      .min(2, "Must be 2 characters")
      .max(30, "Must be 30 characters or less")
      .required("Required"),
    state: Yup.string().required("Required"),
    zip: Yup.string()
      .matches(/^\d{5}$/, "Zip code must be exactly 5 digits")
      .required("Required"),
  });
  const stateData = State.getStatesOfCountry("US")
  const VerticalData = [
    { value: "Real Estate", name: "Real Estate" },
    { value: "Healthcare", name: "Healthcare" },
    { value: "Energy and Utilities", name: "Energy and Utilities" },
    { value: "Entertainment", name: "Entertainment" },
    { value: "Retail", name: "Retail" },
    { value: "Agriculture", name: "Agriculture" },
    { value: "Insurance", name: "Insurance" },
    { value: "Education", name: "Education" },
    { value: "Hospitality and Travel", name: "Hospitality and Travel" },
    { value: "Financial", name: "Financial" },
    { value: "Gambling Lottery", name: "Gambling Lottery" },
    { value: "Construction and Material", name: "Construction and Material" },
    { value: "None Government Organization", name: "None Government Organization" },
    { value: "Manufacturing", name: "Manufacturing" },
    { value: "Government", name: "Government" },
    { value: "Information and Technology", name: "Information and Technology" },
    { value: "Communication and Mass Media", name: "Communication and Mass Media" },

  ]
  const dispatch = useDispatch()
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "solid 1px #d3d7dd",
      backgroundColor: state.isDisabled ? '#f4f5f8' : 'white',
      borderColor: state.isFocused ? '#5BF1B2' : '#5BF1B2',  // Change border color
      height: '48px',                                      // Set height
      minHeight: '100%',                                   // Ensure it respects the height
      width: '100%',                                      // Set width
      borderRadius: '10px',                                 // Set border radius
      boxShadow: state.isFocused ? 'none' : 'none', // Add shadow on focus
      '&:hover': {
        border: 'solid 1px #5BF1B2',                             // Change border color on hover
      },
      outline: 'none',
      color: "#777777"
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#777777',                                       // Placeholder color
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      // color: '#3498db',                                    // Dropdown icon color
      '&:hover': {
        // color: '#2980b9',                                   // Dropdown icon hover color
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',                                     // Remove the separator
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#777777", // Color of selected value text
    }),
  };




  return (

    <DlcModelStyle>
      <header
        style={{
          borderBottom: "1px solid #efefef",
          borderRadius: "16px 16px 0px 0px",
          fontSize: "18px",
          lineHeight: "26px",
          fontWeight: "600",
          color: "#012635",
        }}
      >
        <h2>Registration Info</h2>
        <button
          type="button"
          onClick={props.onClose}
          style={{ fontSize: "2rem" }}
        >
          <IoMdClose />
        </button>
      </header>

      <section style={{ padding: "0px 0px 16px 0px" }}>
        <Formik
          initialValues={{
            verticleType: "",
            marketName: "",
            ein: "",
            legalCompanyName: "",
            brandName: "",
            websiteUrl: undefined,
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            mailingAddress: "",
            city: "",
            zip: "",
            state: "",
          }}
          validateOnMount
          validationSchema={validation}
          // validationSchema={null}
          onSubmit={(values, { resetForm }) => {
            console.log('values', values);
            if (values.websiteUrl === "") {

              values.websiteUrl = undefined
            }
            if (values?.verticleType == state?.verticleType && values?.marketName == state?.marketName && values?.ein == state?.ein && values?.legalCompanyName == state?.legalCompanyName && values?.brandName == state?.brandName && values?.websiteUrl == state?.websiteUrl && values?.firstName == state?.firstName && values?.lastName == state?.lastName && values?.email == state?.email && values?.phoneNumber == state?.phoneNumber && values?.mailingAddress == state?.mailingAddress && values?.city == state?.city && values?.zip == state?.zip && values?.state == state?.state) {
              toast.error("Please enter different values")

            } else {

              if (state?._id) {

                dispatch(
                  updateNewDLC({
                    body: values,
                    id: user?._id,

                  }, () => {
                    props.onClose()
                    const shadowUser = { ...user }
                    shadowUser.marketAndLimitStatus = true ;
                    shadowUser.isTenDlcSubmit = "N/A"
                    localStorage.setItem('user', JSON.stringify(shadowUser));
                    // window.location.reload();
                  })
                );
                resetForm({ values: "" });
              } else {
                dispatch(
                  createNewDLC({
                    body: values,

                  }, () => {
                    props.onClose()
                    const shadowUser = { ...user }
                    shadowUser.marketAndLimitStatus = true
                          shadowUser.isTenDlcSubmit = "N/A"
                    localStorage.setItem('user', JSON.stringify(shadowUser));
                  })
                );
                resetForm({ values: "" });
              }

            }

          }}
        >
          {(formik) => {
            console.log("Validation Errors:", formik?.errors);

            const fetchData = async () => {
              try {
                // setLoader("imgLoading");
                const { data, isError, message, sessionExpired } = await commonAPICall(
                  REQUEST_TYPES.GET,
                  getDLCById(user?._id)
                );

                if (sessionExpired) {



                  // sessionStorage.clear()
                  dispatch(logOut());

                  navigate("/Login");

                }
                if (isError) {
                  if (message != "Error: No 10 DLC form submitted yet") {
                    return toast.error(message);

                  }
                }

                formik.setValues({
                  verticleType: data.verticleType || "",
                  marketName: data.marketName || "",
                  ein: data.ein || "",
                  legalCompanyName: data.legalCompanyName || "",
                  brandName: data.brandName || "",
                  websiteUrl: data.websiteUrl || "",
                  firstName: data.firstName || "",
                  lastName: data.lastName || "",
                  email: data.email || "",
                  phoneNumber: data.phoneNumber || "",
                  mailingAddress: data.mailingAddress || "",
                  city: data.city || "",
                  zip: data.zip || "",
                  state: data.state || "",
                });

                setState({
                  _id: data._id,
                  verticleType: data.verticleType || "",
                  marketName: data.marketName || "",
                  ein: data.ein || "",
                  legalCompanyName: data.legalCompanyName || "",
                  brandName: data.brandName || "",
                  websiteUrl: data.websiteUrl || "",
                  firstName: data.firstName || "",
                  lastName: data.lastName || "",
                  email: data.email || "",
                  phoneNumber: data.phoneNumber || "",
                  mailingAddress: data.mailingAddress || "",
                  city: data.city || "",
                  zip: data.zip || "",
                  state: data.state || "",
                })
              } catch (error) {
                console.log(error);
              }
            };
            useEffect(() => {
              fetchData();
            }, []);
            return (<Form >

              <header style={{ maxHeight: "58vh", height: "58vh", overflow: "auto", marginTop: "10px", padding: "0px 24px" }}>


                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <FormInput
                    name="brandName"
                    label="DBA or Brand Name"
                    type="string"
                    // toolTipText="if you’ll be texting under a name different from your exact Company Name "
                    placeHolder="Enter Name"
                    disabled={user?.isTenDlcSubmit == "Accept" ? true : false}
                  />
                  <div style={{ paddingBottom: "8px" }}>
                    <div style={{ paddingBottom: "3px" }}>
                      <label
                        htmlFor="city"
                        style={{
                          marginTop: "10px",
                          marginBottom: "0.3rem",
                          fontSize: "14px",
                          lineHeight: "24px",
                          color: "#012635",
                          fontWeight: "500",
                        }}
                      >
                        What Type of legal form is the org?<LuAsterisk style={{ color: "red" }} />
                      </label>
                    </div>

                    <Select
                      name="legalCompanyName"
                      // value={{ label: initialState?.legalCompanyName, value: initialState?.legalCompanyName }}
                      // onChange={(val) => setState({ ...initialState, 'legalCompanyName': val?.label })}
                      onChange={(selectedOption) =>
                        formik.setFieldValue("legalCompanyName", selectedOption?.value)
                      }
                      value={formik.values.legalCompanyName && { label: formik.values.legalCompanyName, value: formik.values.legalCompanyName }}
                      styles={customStyles}
                      options={options}
                      components={{ DropdownIndicator: CustomDropdownIndicator }}
                      isSearchable
                      placeholder="Select"
                      isDisabled={user?.isTenDlcSubmit == "Accept" ? true : false}
                    />
                    {formik.touched.legalCompanyName && formik.errors.legalCompanyName && (
                      <div style={{ color: "#ff0000b2", fontSize: "14px", marginTop: "4px" }}>
                        {formik.errors.legalCompanyName}
                      </div>
                    )}
                  </div>
                  <FormInput
                    name="marketName"
                    label="Legal Company Name"
                    type="string"
                    // toolTipText="If you’ll be texting under a name different from your exact Company Name "
                    placeHolder="Enter Market Name"
                    disabled={user?.isTenDlcSubmit == "Accept" ? true : false}

                  />
                  <FormInput
                    name="ein"
                    label="Tax Number / ID / EIN"
                    type="string"
                    // toolTipText="If you’ll be texting under a name different from your exact Company Name "
                    placeHolder="X-XXXXXXX OR XX-XXXXXXX"
                    disabled={user?.isTenDlcSubmit == "Accept" ? true : false}

                  />
                  <div >
                    <label
                      htmlFor="city"
                      style={{
                        marginTop: "10px",
                        marginBottom: "0.3rem",
                        fontSize: "14px",
                        lineHeight: "24px",
                        color: "#012635",
                        fontWeight: "500",

                      }}
                    >
                      Phone Number<LuAsterisk style={{ color: "red" }} />
                    </label>
                    <div style={{ paddingTop: "0.3rem" }}>
                      <PhoneInput
                        country={'us'}
                        disableDropdown={true}
                        enableSearch={true}
                        value={`1${formik.values.phoneNumber}`}
                        inputStyle={{
                          border: "solid 1px #D3D7DD",
                          height: "48px",
                          borderRadius: "8px",
                          color: "#777777",




                        }}
                        getDisable={user?.isTenDlcSubmit == "Accept" ? true : false}

                        containerStyle={{
                          borderRadius: "8px",
                        }}
                        onChange={(phoneNumber, country) => {
                          // Remove all non-numeric characters, including country code
                          const numericPhoneNumber = phoneNumber.replace(/\D/g, "").replace('1', "");
                          formik.setFieldValue("phoneNumber", numericPhoneNumber);
                        }}
                      />
                      {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                        <div style={{ color: "#ff0000b2", fontSize: "14px", marginTop: "4px" }}>
                          {formik.errors.phoneNumber}
                        </div>
                      )}
                    </div>

                  </div>

                  <FormInput
                    name="email"
                    label="Email"
                    type="email"
                    // toolTipText="Support email address for your Company "
                    placeHolder="Enter Email"
                    disabled={user?.isTenDlcSubmit == "Accept" ? true : false}

                  />
                  <FormInput
                    name="mailingAddress"
                    label="Mailing Address"
                    type="string"
                    // toolTipText="Your Company’s physical mailing address "
                    placeHolder="Enter Here"
                    disabled={user?.isTenDlcSubmit == "Accept" ? true : false}

                  />
                  <FormInput
                    // toolTipText=""
                    name="city"
                    label="City"
                    type="string"
                    placeHolder="Enter City"
                    disabled={user?.isTenDlcSubmit == "Accept" ? true : false}

                  />


                  <div style={{ display: "grid", paddingBottom: "0px" }}>
                    <label
                      htmlFor="city"
                      style={{
                        // marginTop: "1rem",
                        marginBottom: "0.3rem",
                        fontSize: "14px",
                        lineHeight: "24px",
                        color: "#012635",
                        fontWeight: "500",
                      }}
                    >
                      State
                    </label>
                    <StyledSelect
                      className="select"
                      value={formik.values.state}
                      name="state"
                      onChange={formik.handleChange}

                      onBlur={formik.handleBlur}
                      disabled={user?.isTenDlcSubmit == "Accept" ? true : false}
                    >
                      <option value="">
                        Select
                      </option>
                      {
                        stateData?.map((data, index) => {
                          return (
                            <option value={data.name}>
                              {data.name}
                            </option>
                          )
                        })
                      }

                    </StyledSelect>
                    {formik.touched.state && formik.errors.state && (
                      <div style={{ color: "#ff0000b2", fontSize: "14px", marginTop: "4px" }}>
                        {formik.errors.state}
                      </div>
                    )}
                  </div>

                  <FormInput
                    // toolTipText=""
                    name="zip"
                    label="ZIP"
                    type="string"
                    placeHolder="Enter ZIP"
                    maxLength={5}
                    disabled={user?.isTenDlcSubmit == "Accept" ? true : false}

                  />



                  <div style={{ display: "grid", paddingBottom: "0px" }}>
                    <label
                      htmlFor="city"
                      style={{
                        // marginTop: "1rem",
                        marginBottom: "0.3rem",
                        fontSize: "14px",
                        lineHeight: "24px",
                        color: "#012635",
                        fontWeight: "500",
                      }}
                    >
                      Vertical type
                    </label>
                    <StyledSelect
                      className="select"
                      value={formik.values.verticleType}
                      name="verticleType"
                      onChange={formik.handleChange}

                      onBlur={formik.handleBlur}
                      disabled={user?.isTenDlcSubmit == "Accept" ? true : false}
                    >
                      <option value="">
                        Select
                      </option>
                      {
                        VerticalData?.map((data, index) => {
                          return (
                            <option value={data.name}>
                              {data.name}
                            </option>
                          )
                        })
                      }

                    </StyledSelect>
                    {formik.touched.verticleType && formik.errors.verticleType && (
                      <div style={{ color: "#ff0000b2", fontSize: "14px", marginTop: "4px" }}>
                        {formik.errors.verticleType}
                      </div>
                    )}
                  </div>













                  <FormInput
                    name="websiteUrl"
                    label="Website URL"
                    type="string"
                    toolTipText={<div>If you don’t have a compliant website, visit <a href="https://10dlc-compliant.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#00BD82" }}>
                      10DLC-Compliant.com
                    </a> , use promo code ZB10dlc for $0.</div>}
                    placeHolder="Enter URL"
                    info={true}
                    disabled={user?.isTenDlcSubmit == "Accept" ? true : false}

                  />

                  <FormInput
                    name="firstName"
                    label="First Name"
                    type="string"
                    // toolTipText="Point of Contact "
                    placeHolder="Enter First Name"
                    disabled={user?.isTenDlcSubmit == "Accept" ? true : false}

                  />


                  <FormInput
                    name="lastName"
                    label="Last Name"
                    type="string"
                    // toolTipText="Point of Contact "
                    placeHolder="Enter Last Name"
                    disabled={user?.isTenDlcSubmit == "Accept" ? true : false}

                  />


                </div>
              </header>


              <div
                style={{ padding: "0px 16px", borderTop: "1px solid #efefef", height: "72px", }}
              >
                <button
                  type="button"
                  onClick={props.onClose}
                  style={{
                    width: "100px",
                    height: "40px",
                    borderRadius: "8px",
                    border: "solid 1px #777777",
                    color: "#777777",
                    fontSize: "16px",
                    fontWeight: 500,
                    padding: "8px 12px 8px 12px",
                    backgroundColor: "transparent",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>

                <button onClick={() => {
                  if (
                    formik?.errors &&
                    Object.keys(formik.errors).length > 0
                  ) {
                    toast.error("Please fill all the required fields");
                  }
                }} disabled={user?.isTenDlcSubmit == "Accept" ? true : false} style={{ width: "100px", height: "40px" }} type="submit" >Submit</button>

              </div>
            </Form>
            )
          }}
        </Formik>
      </section>
    </DlcModelStyle>
  );
};

const CreateNewModal = ({ onClose, limit, page, search, extraMarket, requestMarketCount, countOfOutBoundNumber, marketIncluded
}) => {
  const dispatch = useDispatch();
  const { areaCodes, timeZoneOfAreaCode } = useSelector(
    (s) => s.areaCodeReducer
  );
  const [selectedAreaCode, setSelectedAreaCode] = useState(null);
  const [getData, setGetData] = useState()
  const [getDisable, setGetDisable] = useState(false)
  const [isModelOpen, setIsModelOpen] = useState(false)
  const [loading, setIsLoading] = useState(false)
  const [showNotes, setShowNotes] = useState(true);
  const [warning , setWarning] = useState(false)
  const sessionData = JSON.parse(localStorage.getItem('user'));

  // const sessionDataType = JSON.parse(localStorage.getItem('type'));
  const sessionDataType = localStorage.getItem('type');
  const navigate = useNavigate();
  // console.log("data check" , sessionData._id);
  useEffect(() => {
    dispatch(GetAllAreaCode('market', sessionDataType == "other" && sessionData?.tenantId ? sessionData?.tenantId : sessionData._id));
  }, []);
  console.log("area code check", selectedAreaCode);
  const idList = [
    "67445e5cf4d8d6cff7dbde85",
    // "6744614ba4d142ed16ea9c97",
    "6744617ea4d142ed16ea9c9e",
    "67445d36f4d8d6cff7dbde60",
  ]




  const allTimezones = moment.tz.names();
  let timezones = allTimezones.filter((timezone) => {
    const zone = timezone;
    return zone && zone.includes("US");
  });
  if (timezones?.length > 0) {
    timezones = [...timezones, "Asia/Karachi"];
  }
  const formik = useFormik({
    initialValues: {
      callForwardingNumber: "",
      name: "",
      areaCode: "",
      timeZone: "",
    },

    enableReinitialize: true,
    validationSchema: marketSchema,


    onSubmit: (values) => {
      dispatch(
        createNewMarket(
          {
          body: {
            name: values.name,
            areaCode: values.areaCode,
            // callForwardingNumber: values.callForwardingNumber.replace(
            //   /\D/g,
            //   ""
            // ),
            callForwardingNumber: values.callForwardingNumber.toString().replace("1", '').replace(
              /\D/g,
              ""
            ),

            abbrevation: values.timeZone,
            timeZone: timeZoneOfAreaCode.timeZone,
          },
          limit,
          page,
          search,
        },
        )
      );
     
      onClose();

      formik.resetForm();
    },
  });



  useEffect(() => {
    console.log("check data", getData);

    if (getData) {
      setGetDisable(true)
      formik.setValues({
        ...formik.values,
        timeZone: getData?.abbrevation,
        name: getData?.name,
        callForwardingNumber: `(1${getData?.callForwardingNumber.slice(0, 2)}) ${getData?.callForwardingNumber.slice(2, 5)}-${getData?.callForwardingNumber.slice(5)}`,
        // areaCode: getData?.areaCode
      });
    } else if (getData == undefined && getDisable) {
      setGetDisable(false)
      setGetData(undefined)
      formik.setValues({
        ...formik.values,
        // timeZone: getData?.abbrevation,
        name: "",
        callForwardingNumber: "",
        // areaCode: getData?.areaCode
      });
    } else if (
      Object.keys(timeZoneOfAreaCode).length !== 0 &&
      formik.values.areaCode !== ""
    ) {
      formik.setValues({
        ...formik.values,
        timeZone: timeZoneOfAreaCode.abbrevation,

      });
    }
  }, [getData, timeZoneOfAreaCode]);
  useEffect(() => {
    console.log('Formik Validation Errors:', formik.errors, formik.values);
  }, [formik]);

  const type = localStorage.getItem("type") ?? localStorage.getItem("type");
  const handleChange = async (selectedOption) => {


    dispatch(getTimeZoneAccordingToAreaCode(selectedOption.value));


    setSelectedAreaCode(selectedOption);
    formik.setFieldValue("areaCode", selectedOption.areaCode);
    try {
      console.log("get data...");

      const { data, isError, message, sessionExpired } = await commonAPICall(
        REQUEST_TYPES.GET,
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}market/v1/api/market${selectedOption.areaCode ? `?areaCode=${selectedOption.areaCode}` : ""
        }`
      );
      if (sessionExpired) {




        // sessionStorage.clear()
        dispatch(logOut());

        navigate("/Login");
      }
      if (isError) {
        return toast.error(message);
      }

      setGetData(data?.results[0])

      console.log('get data', data?.results[0]);

    } catch (error) {
      console.log(error);
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isDisabled ? '#f4f5f8' : 'white',
      border: "solid 1px #d3d7dd",
      borderColor: state.isFocused ? '#00bd82' : '#00bd82',  // Change border color
      height: '50px',                                      // Set height
      minHeight: '100%',                                   // Ensure it respects the height
      width: '100%',                                      // Set width
      borderRadius: '8px',                                 // Set border radius
      boxShadow: state.isFocused ? 'none' : 'none', // Add shadow on focus
      '&:hover': {
        border: 'solid 1px #00bd82',                             // Change border color on hover
      },
      outline: 'none',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#999',                                       // Placeholder color
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      // color: '#3498db',                                    // Dropdown icon color
      '&:hover': {
        // color: '#2980b9',                                   // Dropdown icon hover color
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',                                     // Remove the separator
    }),
  };
  console.log("check formik values", (+requestMarketCount + +countOfOutBoundNumber), marketIncluded);

  return (

    <CreateNewModalStyled>
      {/* {type === "superAdmin" && ( */}
      <div
        className="top"
        style={{
          borderBottom: "1px solid #efefef",
          borderRadius: " 12px 12px 0 0 ",
        }}
      >
        <h2>Request New Marke</h2>
        <div
          onClick={(e) => {
            onClose(e);
            formik.resetForm();
          }}
          style={{ fontSize: "2rem" }}
        >
          <IoMdClose />
        </div>
      </div>
      <div style={{ padding: "16px 24px" }} >
        {
          showNotes && (
            <Note style={{ backgroundColor: "#D6E7FC" }}>
              <Flex align="center" gap="5px" justify="space-between" width="100%">
                <Flex direction="row" gap="0.5rem" align="center" width="100%">
                  <FaInfoCircle size={20} style={{ color: "royalblue" }} />
                  <Paragraph
                    color="#2E2E2E"
                    fontSize="14px"
                    lineHeight="14.8px"
                    weight="400"
                  >
                    Please note that this number/user will be charged according to your current subscription
                  </Paragraph>
                </Flex>
                <button
                  color="#2E2E2E"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowNotes(false)}
                >
                  Accept
                </button>
              </Flex>
            </Note>
          )
        }

      </div>
      <form className="bottom" onSubmit={formik.handleSubmit}>
        <div className="top">
          <div className="row">
            <label>
              <span>
                <span className="text">Market Name</span><LuAsterisk style={{ color: "red" }} />
              </span>
              <input
                disabled={getDisable}
                type="text"
                value={formik.values.name}
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Name"
                maxLength={21}
              />
              {formik.touched.name && formik.errors.name && (
                <p>{formik.errors.name}</p>
              )}
            </label>
            <label id="paddingLess">
              <span>
                <span className="text">Call Forwarding Number</span><LuAsterisk style={{ color: "red" }} />
              </span>
              <PhoneInput
                getDisable={getDisable}

                value={formik.values.callForwardingNumber}

                onChange={(value) =>

                  formik.setFieldValue("callForwardingNumber", value)
                }
                maxLength={14}
              />


              {formik.touched.callForwardingNumber &&
                formik.errors.callForwardingNumber && (
                  <p>{formik.errors.callForwardingNumber}</p>
                )}
            </label>
          </div>

          <div className="row">
            <label>
              <span>
                <span className="text">Area Code</span><LuAsterisk style={{ color: "red" }} />
              </span>
              <Select

                value={selectedAreaCode}
                onChange={handleChange}
                styles={customStyles}
                options={areaCodes.map((option) => ({
                  value: option._id,
                  label: `${option.areaCode} - ${option.cityName}`,
                  areaCode: option.areaCode,
                }))}

                isSearchable
                placeholder="Search..."
              />
              {formik.touched.areaCode && formik.errors.areaCode && (
                <p>{formik.errors.areaCode}</p>
              )}
            </label>



            <div style={{ padding: "3px 0px" }}>
              <label style={{ display: "block", marginBottom: "8px", color: "#333" }}>
                <span style={{ display: "block", marginBottom: "3px", color: "#012635", font: "14px" }}>Time Zone</span>
                <input
                  disabled
                  type="text"
                  value={formik.values.timeZone}
                  name="timeZone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{
                    width: "100%",
                    padding: "8px",
                    height: "48px",
                    borderRadius: "8px",
                    border: "1px solid #D3D7DD",
                    backgroundColor: "#F4F5F8",
                    color: "#777777",
                    cursor: "not-allowed",
                  }}
                />
                {formik.touched.timeZone && formik.errors.timeZone && (
                  <p style={{ color: "#f4516c", marginTop: "5px", fontSize: "1.1rem" }}>{formik.errors.timeZone}</p>
                )}
              </label>
            </div>
            {/* {formik.touched.timeZone && formik.errors.timeZone && (
              <p>{formik.errors.timeZone}</p>
            )} */}

          </div>
        </div>
        <div
          className="bottom"
          style={{
            borderTop: "1px solid #efefef",
            borderRadius: "0 0 12px 12px ",
            gap: "15px"
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              onClose(e);
              formik.resetForm();
            }}
            style={{
              border: "solid 1px #777777",
              color: "#777777",
              // width: "fit-content",
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
            // disabled={!formik.isValid || !formik.dirty}
            // type="submit"
            onClick={() => {

              const v = (formik?.values ?? formik?.values) || {};
              const phonePrefix = String(v.callForwardingNumber || "").replace(/\D/g, "").slice(1, 4);
              const areaPrefix  = String(v.areaCode || "").replace(/\D/g, "").slice(0, 3);
            console.log("phonePrefix",phonePrefix , areaPrefix , extraMarket);
            
              if (phonePrefix && areaPrefix && phonePrefix !== areaPrefix) {
                setWarning(true);
               
                return; // stop further actions
              }
if(!formik.values.name || !formik.values.callForwardingNumber || !formik.values.timeZone){
  formik.submitForm()
  return
}

              if ((sessionData?.subscriptionId === "67445e5cf4d8d6cff7dbde85" || sessionData?.subscriptionId === "6744617ea4d142ed16ea9c9e" ||
                sessionData?.subscriptionId === "67445d36f4d8d6cff7dbde60") && (parseInt(requestMarketCount) + parseInt(countOfOutBoundNumber) >= parseInt(marketIncluded))) {
                toast.error("You are not allowed to request extra market, please Upgrade your subscription plan.");

              } else if (extraMarket > 0) {
                console.log("phonePrefix",phonePrefix , areaPrefix);
                setIsModelOpen(true)
              } else if (parseInt(requestMarketCount) + parseInt(countOfOutBoundNumber) >= parseInt(marketIncluded)) {
                console.log("phonePrefix",phonePrefix , areaPrefix);
                setIsModelOpen(true)
              } else if (extraMarket == 0) {
                console.log("phonePrefix",phonePrefix , areaPrefix);
                formik.submitForm()

              }
            }}
            type="button"
            style={{
              backgroundColor: "#00BD82",
              // width: "fit-content",
              height: "40px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 500,
              width: "100px",
              color: "white",
              // padding: "16px",
            }}
          >
            Save
          </button>
        </div>
        <PreviewModal
        isOpen={warning}
        onClose={() =>{
           setWarning(false)
          //  formik.submitForm()
          }}
          onOk={async () =>{
            const errors = await formik.validateForm();
            if (Object.keys(errors).length) {
              formik.setTouched(
                Object.keys(formik.values).reduce((acc, k) => ({ ...acc, [k]: true }), {})
              );
              toast.error("Please fix the highlighted fields.");
              return;
            }

            if ((sessionData?.subscriptionId === "67445e5cf4d8d6cff7dbde85" || sessionData?.subscriptionId === "6744617ea4d142ed16ea9c9e" ||
              sessionData?.subscriptionId === "67445d36f4d8d6cff7dbde60") && (parseInt(requestMarketCount) + parseInt(countOfOutBoundNumber) >= parseInt(marketIncluded))) {
              toast.error("You are not allowed to request extra market, please Upgrade your subscription plan.");

            } else if (extraMarket > 0) {
              setIsModelOpen(true)
            } else if (parseInt(requestMarketCount) + parseInt(countOfOutBoundNumber) >= parseInt(marketIncluded)) {
              setIsModelOpen(true)
            } else if (extraMarket == 0) {
              formik.submitForm()

            }
          }}
        // form={form}
        previewText={"Warning"}
        previewSub={"The outbound area code does not match the preset configuration. Do you wish to proceed?"}
        category={"Warning"}
      />
      </form>

    
      {/* </CustomScroll> */}
      <Components.Common.WarningModal
        onClose={() => {
          setIsModelOpen(false);

        }}
        isLoading={loading}

        onOkay={() => {
          formik.submitForm()
          setIsLoading(false)
        }} // Confirm delete when "Okay" is clicked
        open={isModelOpen}

        WarningItemTitle={`Are you sure you want to request extra market?`}
        WarningItemName="Direct Import"
        warningItemText={` it would cost you 500$ and would be charged every month.`}
      />
    </CreateNewModalStyled>
  );
};

const EditModal = ({ onClose, limit, page, search, editMarket }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      callForwardingNumber:
        `1${editMarket?.callForwardingNumber}`,

      name: editMarket?.name,
      areaCode: editMarket?.areaCode,
      timeZone: editMarket?.timeZone,
    },
    validationSchema: marketSchema,

    // validateOnChange: true,
    // validateOnBlur: true,
    onSubmit: (values) => {



      dispatch(
        updateCallForwardNumber({
          body: {
            // callForwardingNumber: values.callForwardingNumber,
            callForwardingNumber: values.callForwardingNumber.toString().replace("1", '').replace(
              /\D/g,
              ""
            ),
            name: values?.name
          },
          limit,
          page,
          search,
          id: editMarket?._id,
        })
      )

      onClose();
    },
  });
  const fieldValidationStatus = Object.keys(formik.values).reduce((acc, field) => {
    acc[field] = {
      touched: !!formik.touched[field],
      isValid: !formik.errors[field], // true if there's no error for the field
    };
    return acc;
  }, {});

  return (
    <CreateNewModalStyled>
      <div
        className="top"
        style={{
          borderBottom: "1px solid #efefef",
          borderRadius: "12px 12px 0 0 ",
        }}
      >
        <h2>Edit Market</h2>
        <button type="button" onClick={onClose} style={{ fontSize: "2rem" }}>
          <IoMdClose />
        </button>
      </div>
      <form className="bottom" onSubmit={formik.handleSubmit}>
        <div className="top">
          <div className="row">
            <label className="col2">
              <span className="text">Market Name</span>
              <input
                type="text"
                value={formik.values.name}
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={editMarket?.extra}
                maxLength={20}
              />
              {formik.touched.name && formik.errors.name && (
                <p>{formik.errors.name}</p>
              )}
            </label>
          </div>
          <div className="row">
            <label>
              <span className="text">Area Code</span>
              <input
                type="text"
                value={formik.values.areaCode}
                name="areaCode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled
              />
              {formik.touched.areaCode && formik.errors.areaCode && (
                <p>{formik.errors.areaCode}</p>
              )}
            </label>
            <label>
              <span className="text">
                {/* {editMarket?.callForward === true
                  ? "Call Forwarding Number"
                  : "Outbound Number"} */}
                {editMarket?.callForward === true
                  ? "Call Forwarding Number"
                  : "Call Forwarding Number"}
              </span>
              <PhoneInput
                value={formik.values.callForwardingNumber}
                onChange={(value) =>
                  formik.setFieldValue("callForwardingNumber", value)
                }
                maxLength={14}
              />


              {formik.touched.callForwardingNumber &&
                formik.errors.callForwardingNumber && (
                  <p>{formik.errors.callForwardingNumber}</p>
                )}
            </label>
          </div>
          <div className="row">
            <label>
              <span className="text">Time Zone</span>
              <input
                type="text"
                value={formik.values.timeZone}
                name="timeZone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled
              />
              {formik.touched.timeZone && formik.errors.timeZone && (
                <p>{formik.errors.timeZone}</p>
              )}
            </label>
          </div>
        </div>
        <div
          className="bottom"
          style={{
            borderTop: "1px solid #efefef",
            borderRadius: "0 0 12px 12px ",
          }}
        >
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <Components.Common.ButtonRightIcon
            disabled={!formik.isValid || !formik.dirty}
            text={"Update"}
            style={{
              backgroundColor: "#00BD82",
              // width: "fit-content",
              // height: "40px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 500,
              // padding: "16px",
            }}
            type="submit"
          />
        </div>
      </form>
    </CreateNewModalStyled>
  );
};

const FormInput = ({ label, toolTipText, maxLength = 100, className, info = false, disabled = false, ...props }) => {
  const [field, meta] = useField(props);
  const [value, setValue] = useState("");
  return (

    <FormInputStyle>
      <label
        htmlFor={field.name}
        className={`form-label ${value !== "" && "form-label-input-value"}`}
      >

        {label}<LuAsterisk style={{ color: "red" }} /> {info && <Components.Common.LightTooltip placement="top" arrow title={toolTipText}> <MdInfoOutline style={{ cursor: "pointer" }} /></Components.Common.LightTooltip>}
      </label>
      <input
        type="text"
        {...field}
        {...props}
        autoComplete="off"
        style={{ color: "#575962", fontWeight: 400, fontSize: "14px" }}
        id={`${meta.touched && meta.error && "is-invalid"}`}
        onChangeCapture={(e) => setValue(e.target.value)}
        maxLength={maxLength}
        disabled={disabled}
      />
      <ErrorMessage component="div" name={field.name} />
    </FormInputStyle>

  );
};

const IncreaseLimitModal = ({
  onClose,
  limit,
  page,
  search,
  editMarketList,
}) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      callForwardingNumber: "",
      name: editMarketList?.name,
      areaCode: editMarketList?.areaCode,
      timeZone: editMarketList?.timeZone,
    },
    validationSchema: marketSchema,
    onSubmit: (values) => {
      if (new Set(editMarketList.allPhones).has(values.callForwardingNumber)) {
        toast.error("Number already exist");
        return;
      }
      editMarketList.allPhones.push(values.callForwardingNumber);
      dispatch(
        increaseMarketLimitAction({
          body: {
            phone: [values.callForwardingNumber.replace(/\D/g, "")],
            phoneNumber: [
              {
                number: values.callForwardingNumber.replace(/\D/g, ""),
                date: new Date(),
              },
            ],
          },
          limit,
          page,
          search,
          _id: editMarketList?._id,
        })
      );
      onClose();
    },
  });

  return (
    <CreateNewModalStyled>
      <div
        className="top"
        style={{
          borderBottom: "1px solid #efefef",
          borderRadius: "12px 12px 0 0 ",
        }}
      >
        <h2>Add Outbound Number</h2>
        <button type="button" onClick={onClose}>
          <IoMdClose style={{ fontSize: "24px", color: "#012635" }} />
        </button>
      </div>
      <form className="bottom" onSubmit={formik.handleSubmit}>
        <div className="top">
          <div className="row">
            <label className="col2">
              <span className="text">Market Name</span>
              <input
                type="text"
                value={formik.values.name}
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled
              />
              {formik.touched.name && formik.errors.name && (
                <p>{formik.errors.name}</p>
              )}
            </label>
          </div>
          <div className="row">
            <label>
              <span className="text">Outbound Number</span>
              <input
                type="text"
                value={formik.values.areaCode}
                name="areaCode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled
              />
              {formik.touched.areaCode && formik.errors.areaCode && (
                <p>{formik.errors.areaCode}</p>
              )}
            </label>
            <label>
              <span className="text">Outbound Number</span>
              <PhoneInput
                value={formik.values.callForwardingNumber}
                onChange={(value) =>
                  formik.setFieldValue("callForwardingNumber", value)
                }
                maxLength={14}
              />

              {formik.touched.callForwardingNumber &&
                formik.errors.callForwardingNumber && (
                  <p>{formik.errors.callForwardingNumber}</p>
                )}
            </label>
          </div>
          {/* <div className="row">
            <label>
              <span className="text">Time Zone</span>
              <input
                type="text"
                value={formik.values.timeZone}
                name="timeZone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled
              />
              {formik.touched.timeZone && formik.errors.timeZone && (
                <p>{formik.errors.timeZone}</p>
              )}
            </label>
          </div> */}
        </div>
        <div
          className="bottom"
          style={{
            borderTop: "1px solid #efefef",
            borderRadius: "0 0 12px 12px ",
          }}
        >
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <Components.Common.ButtonRightIcon
            disabled={!formik.isValid || !formik.dirty}
            text={"Add Number to market"}
            style={{
              backgroundColor: "#00BD82",
              // width: "fit-content",
              // height: "40px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 500,
              // padding: "16px",
            }}
            type="submit"
          />
        </div>
      </form>
    </CreateNewModalStyled>
  );
};

// New Inputs

const PhoneInput = ({ value, onChange, disabled, getDisable }) => {
  const handleChange = (e) => {
    // const inputValue = e.target.value;
    const inputValue = e;
    const formattedValue = inputValue.replace(/\D/g, "").slice(0, 11);

    let formattedNumber = "";
    for (let i = 0; i < formattedValue.length; i++) {
      if (i === 0) formattedNumber += "(";
      else if (i === 3) formattedNumber += ") ";
      else if (i === 6) formattedNumber += "-";
      formattedNumber += formattedValue[i];
    }

    onChange(formattedNumber);
  };


  return (
    // <input
    //   type="text"
    //   value={value}
    //   onChange={handleChange}
    //   placeholder="(___) ___-____"
    //   disabled={disabled}

    // />

    <PhoneInputSec
      country={'us'}
      disableDropdown={true}
      disabled={getDisable}
      value={value}
      onChange={(phone) => handleChange(phone)}
      containerStyle={{ backgroundColor: getDisable && "#F0F5F8", borderRadius: "8px", }}
      inputStyle={{ border: "solid 1px #D3D7DD", height: "48px", borderRadius: "8px", color: "#777777", backgroundColor: "red" }}
    />

  );
};
