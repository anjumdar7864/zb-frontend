import React, { useEffect, useRef, useState } from "react";
import {
  FilterBox,
  FilterBoxContainer,
  InputStyled,
  SearchBox,
  TenatContainer,
  Dropdown,
  DropdownItem,
  TopContainer,
  QABox,
  CreateUserButton,
  DownloadCSvbtn,
  StyledStatus,
  ActionDropdown,
  ActionButton,
} from "./styles";
import { Flex, P, Paragraph } from "@/styles/CommonStyles";
import { TiArrowSortedDown } from "react-icons/ti";
import { FiMoreVertical, FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { TenatTable } from "./TenatTable";
import CreateUserModal from "./CreateUserModel/Model";
import { EditUser } from "./EditUser/EditUser";
import { GetAllTenets } from "@/store/actions/tenets.action";
import { useDispatch, useSelector } from "react-redux";
import Components from "@/components";
import axios from "axios";
import { downloadCsvAdmin, clearErrors, clearMessages, logOut } from "@/store/actions";
import toast from "react-hot-toast";
import { useGlobalContext } from "@/hooks";
// material UI drawer
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CiFilter } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import PaginationComp from "../DirectImport/Pagination";
import PaginationDropDown from "../DirectImport/PaginationDropDown";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { InitialTemplateStyled, TableRowStyled } from "./styles";
import { motion } from "framer-motion";
import { formatDateToShort, formatTemplateString, remToPixels } from "@/utils";
import { FaChevronDown, FaTrash, FaUser } from "react-icons/fa6";
import { FaEdit, FaEllipsisV, FaTimes } from "react-icons/fa";
import { LightTooltip } from "@/components/common";
import {
  LoginAsUser,
  ActiveTenant,
  DeActiveTenant,
  LoginAsUserMaster,
} from "../../store/actions";
import Assets from "@/assets";
import { ENDPOINTS, REQUEST_TYPES } from "@/utils/constant/url";
import { commonAPICall } from "@/services/api/common";
import { nextBillingDate } from "@/utils/helpers";
import { MdMoreVert } from "react-icons/md";
import MorePopover from "./MorePopover";

const filterOptions = ["Option 1", "Option 2", "Option 3"];
const CreateUserOptions = ["Create one user", "Create multiple users"];
const subscriptionOptions = [
  // { value: "cancel", label: "Canceled" },
  { value: "unsubscribe", label: "Expired" },
  // { value: "decline", label: "Declined " },
  { value: "custom", label: "Custom" },
  { value: "67445d36f4d8d6cff7dbde60", label: "I'm Serious" },
  { value: "67445e5cf4d8d6cff7dbde85", label: "Time to Scale" },
  { value: "6744614ba4d142ed16ea9c97", label: "Market Dominator" },
  { value: "6744617ea4d142ed16ea9c9e", label: "Jumpstart JV" },
];
export const Tenat = () => {
  const dispatch = useDispatch();
  const {
    errors: error,
    message,
    donwloadCsvLoading,
  } = useSelector((state) => state.billingReducer);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeDropdown2, setActiveDropdown2] = useState(null);
  const [createUserDropdown, setCreateUserDropdown] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState("Table");
  const [tenantData, setTenantData] = useState();
  const { setIsLoaderShowing } = useGlobalContext();
  const [subscriptionData, setSubscriptionData] = useState([]);
  // State for each dropdown's selected value
  const [selectedFilters, setSelectedFilters] = useState({
    status: null,
    subscription: null,
    onboardingDate: null,
    onboardingDateEnd: null,
    lastLoginDate: null,
    lastLoginDateEnd: null,
    paymentstatus: null,
    planExpiryDate: null,
    planExpiryDateEnd: null,
    companyName: "",
    pageNumber: 1,
    pageSize: 10,
  });

  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );
  const typeUSer = localStorage.getItem("type") ?? localStorage.getItem("type") ?? "{}"


  const handlePageChange = (event, value) => {
    setSelectedFilters((prev) => ({ ...prev, pageNumber: value }));
  };

  // Handle limit change
  const handleLimitChange = (event) => {
    const newLimit = Number(event.target.value);
    setSelectedFilters((prev) => ({
      ...prev,
      pageNumber: 1,
      pageSize: newLimit,
    }));
  };

  const {
    tenets,
    page,
    totalPages,
    totalResults,
    errors: error2,
    loading: loading2,
    message: message2,
    sessionExpireError,
  } = useSelector((state) => state.tenetsReducer);

  // console.log("sessionExpireError", sessionExpireError);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (sessionExpireError) {
  //     navigate("/Login");

  //     localStorage.clear();
  //     sessionStorage.clear()
  //   }
  // }, [sessionExpireError]);


  useEffect(() => {


    const hasPermissionTenant = ["FC_Tenant", "View_Tenant",].some(permission =>
      user?.permissions?.includes(permission)
    );
    if (typeUSer == "superAdmin") {
      generateQueryParams();

    } else if (hasPermissionTenant) {
      generateQueryParams();
    }
  }, [selectedFilters]);



  

  useEffect(() => {
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (error2.length > 0) {
      toast.error(error2);
      dispatch(clearErrors());
    }
    if (message !== "") {
      toast.success(message);
      dispatch(clearMessages());
    }
  }, [error, error2, dispatch, message]);

  function formatDateToISOString(date) {
    // Ensure the input is a Date object
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    // Format the date to the ISO string format
    return date.toISOString();
  }

  const generateQueryParams = () => {
    const {
      status,
      subscription,
      onboardingDate,
      onboardingDateEnd,
      lastLoginDate,
      lastLoginDateEnd,
      paymentstatus,
      planExpiryDate,
      planExpiryDateEnd,
      companyName,
      pageNumber,
      pageSize,
    } = selectedFilters;
    let params = [];
    if (pageNumber) params.push(`page=${pageNumber}`);
    if (pageSize) params.push(`limit=${pageSize}`);
    if (status) params.push(`status=${status}`);
    if (subscription) params.push(`subscription=${subscription}`);
    //if (onboardingDate) params.push(`onboardingDate=${formatDateToISOString(onboardingDate)}`);
    if (onboardingDate)
      params.push(`onboardingDate=${formatDateToISOString(onboardingDate)}`);
    if (onboardingDateEnd)
      params.push(`onboardingDateEnd=${formatDateToISOString(onboardingDateEnd)}`);
    if (lastLoginDate)
      params.push(`lastLogin=${formatDateToISOString(lastLoginDate)}`);
    if (lastLoginDateEnd)
      params.push(`lastLoginEnd=${formatDateToISOString(lastLoginDateEnd)}`);
    if (paymentstatus) params.push(`isPaymentReceived=${paymentstatus}`);
    if (planExpiryDate)
      params.push(`planExpiryDate=${formatDateToISOString(planExpiryDate)}`);
    if (planExpiryDateEnd)
      params.push(`planExpiryDateEnd=${formatDateToISOString(planExpiryDateEnd)}`);
    if (companyName) params.push(`companyName=${companyName}`);
    const queryString = params.length ? `?${params.join("&")}` : "";
    dispatch(GetAllTenets(queryString , ()=>{
      navigate("/Login")
    }));
  };

  // Helper function to check if any filter is active
  // Helper function to check if any filter is active
  const areFiltersSelected = (filters) => {
    return (
      filters.status !== null ||
      filters.subscription !== null ||
      filters.onboardingDate !== null ||
      filters.lastLoginDate !== null ||
      filters.paymentstatus !== null ||
      filters.planExpiryDate !== null ||
      filters.companyName !== ""
    );
  };
  // Set loader visibility based on loading state and selected filters
  const showLoader = loading2 && !areFiltersSelected(selectedFilters);
  setIsLoaderShowing(showLoader);

  const dropdownRef = useRef(null);
  const dropdownRef2 = useRef(null);
  const createdropdownRef = useRef(null);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActiveDropdown(null);
    }
    if (
      createdropdownRef.current &&
      !createdropdownRef.current.contains(event.target)
    ) {
      setCreateUserDropdown(null);
    }
    if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
      setActiveDropdown2(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchData = async () => {
    try {
      const { data, isError, message, sessionExpired } = await commonAPICall(
        REQUEST_TYPES.GET,
        `${ENDPOINTS.GET_ALL_SUBSCRIPTION}`
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
        ? [
          { value: "", label: "None" },
          { value: "unsubscribe", label: "UN SUBSCRIBE" },
          { value: "custom", label: "CUSTOM" },
          ...data.results.map((item) => {
            const name = item?.title ? item?.title : "";
            return { value: name, label: name };
          }),
        ]
        : [{ value: "", name: "None" }];
      setSubscriptionData(options);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const filters = [
    {
      title: "Status",
      options: [
        { label: "Active", value: "Active" },
        { label: "Suspended", value: "Suspended" },
        { label: "Unsubscribed", value: "unsubscribe" },
        { label: "Canceled", value: "cancel" },
        { label: "On-Hold", value: "On-Hold" },
      ],
      label: "Status",
    },
    {
      title: "Subscription",

      options: subscriptionOptions,
      label: "Subscription",
    },
  ];

  const otherFilters = [
    {
      title: "Payment Status",
      options: [
        { label: "past-due", value: "past-due" },
        { label: "Up-to-date", value: "true" },
        { label: "Pending", value: "false" },
        
      ],
      label: "Payment Status",
    },
  ];

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };
  const toggleDropdown2 = (index) => {
    setActiveDropdown2(activeDropdown2 === index ? null : index);
  };

  const handleFilterSelect = (filterTitle, value, label) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterTitle.toLowerCase().replace(" ", "")]: value,
      [`${filterTitle.toLowerCase().replace(" ", "")}Label`]: label,
      pageNumber: 1,
    }));
    setActiveDropdown2(null); // Close the dropdown after selection
  };

  const handleFilterSelectDate = (filterTitle, value) => {
    if (filterTitle === "companyName") {

      setSelectedFilters((prev) => ({
        ...prev,
        pageNumber: 1,
        [filterTitle.replace(" ", "")]: value.from,
        [`${filterTitle.replace(" ", "")}End`]: value.to,
        
      }));
      setActiveDropdown(null); // Close the dropdown after selection
    } else {
      setSelectedFilters((prev) => ({
        ...prev,
        [filterTitle.replace(" ", "")]: value.from,
        [`${filterTitle.replace(" ", "")}End`]: value.to,
        pageNumber: 1,
      }));
      setActiveDropdown(null); // Close the dropdown after selection
    }
  };

  const handleSearch = (filterTitle, value) => {
    // console.log("selectedFilters", selectedFilters , "value", value);
    if (filterTitle === "companyName") {

      setSelectedFilters((prev) => ({
        ...prev,
        pageNumber: 1,
        [filterTitle.replace(" ", "")]: value,

      }));
      setActiveDropdown(null); // Close the dropdown after selection
    } else {
      setSelectedFilters((prev) => ({
        ...prev,
        [filterTitle.replace(" ", "")]: value,

      }));
      setActiveDropdown(null); // Close the dropdown after selection
    }
  }

  const handleOpenCreateUser = (option) => {
    if (option === "Create one user") {
      handleOpenModal();
    }
  };

  const handleDownload = async () => {
    try {
      dispatch(downloadCsvAdmin());
    } catch (error) {
      toast.error(error);
    }
  };

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  const { windowWidth } = useGlobalContext();

  const scrollRef = useRef(null);
  const [offSidebar, setOffSidebar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollTop = scrollRef.current.scrollTop;
        setOffSidebar(scrollTop);
      }
    };

    const element = scrollRef.current;
    element.addEventListener("scroll", handleScroll);

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <InitialTemplateStyled
      tableWidth={windowWidth - remToPixels(7) - remToPixels(2.6)}
    >
      <TopContainer>
        <Flex
          mdJustify="space-between"
          justify="center"
          align="center"
          mdDirection="row"
          direction="column"
          bg="white"
          padding="2rem 4rem"
          style={{ borderTop: "1px solid #E0E0E0" }}
        >
          <Paragraph fontSize="2.3rem" weight="700" color="#012635">
            Tenant Management
          </Paragraph>
        </Flex>

        <Flex display="flex" justify="space-between" padding="2rem 4rem">
          <SearchBox>
            <InputStyled
              type="text"
              placeholder="Company Name"
              value={selectedFilters.companyName}
              onChange={(e) =>
                // handleFilterSelectDate("companyName", e.target.value)
                handleSearch("companyName", e.target.value)
              }
            />
            <FiSearch size={20} color="#A3A3A3" cursor={"pointer"} />
          </SearchBox>

          <Flex gap="1rem">
            <button
              onClick={() => {
                toggleDrawer(true);
                const storedUser = JSON.parse(
                  localStorage.getItem("userFilter")
                );
                setSelectedFilters((prevFilters) => ({
                  ...prevFilters,
                  ...(storedUser &&
                    Object.keys(storedUser).reduce((acc, key) => {
                      if (storedUser[key] !== undefined) {
                        acc[key] = storedUser[key];
                      }
                      return acc;
                    }, {})),
                }));
              }}
              style={{
                backgroundColor: "white",
                border: "1px solid #D3D7DD",
                // padding: '1.1rem 1.3rem',
                width: "103px",
                height: "48px",
                borderRadius: "0.8rem",
              }}
            >
              <img style={{ marginRight: "5px" }} src={Assets.Icons.filter} />
              All Filters
            </button>
            <Drawer
              anchor="right"
              open={open}
              onClose={() => toggleDrawer(false)}
            >
              <div
                style={{
                  width: "100%",
                  paddingInline: "2rem",
                  paddingBlock: "1.4rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #F7F7F7",
                }}
              >
                <p
                  style={{
                    color: "#012635",
                    fontWeight: "500",
                    fontSize: "1.4rem",
                  }}
                >
                  Filters
                </p>
                <button onClick={() => toggleDrawer(false)}>
                  <IoCloseOutline color="#012635" size={"2rem"} />
                </button>
              </div>

              <Flex
                width={"40rem"}
                padding={"0rem 2rem 2rem 2rem"}
                gap="5px"
                mdDirection="block"
                direction="column"
                wrap="wrap"
              >
                <p
                  style={{
                    color: "#012635",
                    fontWeight: "500",
                    fontSize: "1.1rem",
                    marginTop: "1rem",
                  }}
                >
                  Onboarding date
                </p>
                <Components.Common.DatePickerWrapper
                  selectedDate={selectedFilters.onboardingDate}
                  onDateChange={(date) => {
                    handleFilterSelectDate("onboardingDate", date);
                  }}
                  defaultText="Onboarding Date"
                />

                <p
                  style={{
                    color: "#012635",
                    fontWeight: "500",
                    fontSize: "1.1rem",
                    marginTop: "1rem",
                  }}
                >
                  Last Login Date
                </p>
                <Components.Common.DatePickerWrapper
                  selectedDate={
                    selectedFilters.lastLoginDate !== null
                      ? selectedFilters.lastLoginDate
                      : ""
                  }
                  onDateChange={(date) => {
                    handleFilterSelectDate("lastLoginDate", date);
                  }}
                  defaultText="Last Login Date"
                />
                <p
                  style={{
                    color: "#012635",
                    fontWeight: "500",
                    fontSize: "1.1rem",
                    marginTop: "1rem",
                  }}
                >
                  Plan Expiry Date
                </p>
                <Components.Common.DatePickerWrapper
                  selectedDate={
                    selectedFilters.planExpiryDate !== null
                      ? selectedFilters.planExpiryDate
                      : ""
                  }
                  onDateChange={(date) => {
                    handleFilterSelectDate("planExpiryDate", date);
                  }}
                  defaultText="Plan Expiry Date"
                />
                <div ref={dropdownRef}>
                  {filters.map((filter, index) => {
                    return (
                      <>
                        <p
                          style={{
                            color: "#012635",
                            fontWeight: "500",
                            fontSize: "1.1rem",
                            marginTop: "1rem",
                          }}
                        >
                          {filter?.label}
                        </p>
                        <FilterBoxContainer key={index}>
                          <FilterBox onClick={() => toggleDropdown(index)}>
                            <P color="#666666" fontSize="14px" fontweight="300">
                              {filter.title == "Subscription" &&
                                selectedFilters[
                                `${filter.title
                                  .toLowerCase()
                                  .replace(" ", "")}Label`
                                ]
                                ? selectedFilters[
                                `${filter.title
                                  .toLowerCase()
                                  .replace(" ", "")}Label`
                                ]
                                : selectedFilters[
                                  filter.title.toLowerCase().replace(" ", "")
                                ]
                                  ? `${selectedFilters[
                                  filter.title
                                    .toLowerCase()
                                    .replace(" ", "")
                                  ]
                                  }`
                                  : filter.title}
                            </P>
                            <TiArrowSortedDown size={20} />
                          </FilterBox>
                          {activeDropdown === index && (
                            <Dropdown width="15rem" top="110%">
                              {filter.options.map((option, idx) => (
                                <DropdownItem
                                  key={idx}
                                  onClick={() => {
                                    handleFilterSelect(
                                      filter.title,
                                      option.value,
                                      option.label
                                    );
                                    setActiveDropdown(null);
                                  }}
                                >
                                  {option.label}
                                </DropdownItem>
                              ))}
                            </Dropdown>
                          )}
                        </FilterBoxContainer>
                      </>
                    );
                  })}
                </div>
                <div ref={dropdownRef2}>
                  {otherFilters.map((filter, index) => (
                    <>
                      <p
                        style={{
                          color: "#012635",
                          fontWeight: "500",
                          fontSize: "1.1rem",
                          marginTop: "1rem",
                        }}
                      >
                        {filter?.label}
                      </p>

                      <FilterBoxContainer key={index}>
                        <FilterBox onClick={() => toggleDropdown2(index)}>
                          <P
                            textWrap={`nowrap`}
                            color="#666666"
                            fontSize="14px"
                            fontweight="300"
                          >
                            {selectedFilters[
                              filter.title.toLowerCase().replace(" ", "")
                            ]
                              ? selectedFilters[
                                filter.title.toLowerCase().replace(" ", "")
                              ] == "true"
                                ? `Up-to-Date`
                                : selectedFilters[
                                filter.title.toLowerCase().replace(" ", "")
                              ] == "past-due" ? "past-due" : "Pending" 
                              : filter.title}
                          </P>
                          <TiArrowSortedDown size={20} />
                        </FilterBox>
                        {activeDropdown2 === index && (
                          <Dropdown width="15rem" top="110%">
                            {filter.options.map((option, idx) => (
                              <DropdownItem
                                key={idx}
                                onClick={() => {
                                  handleFilterSelect(
                                    filter.title.toLowerCase().replace(" ", ""),
                                    option.value
                                  );
                                  setActiveDropdown2(null);
                                }}
                              >
                                {option.label}
                              </DropdownItem>
                            ))}
                          </Dropdown>
                        )}
                      </FilterBoxContainer>
                    </>
                  ))}
                </div>
              </Flex>

              <div
                style={{
                  width: "100%",
                  paddingInline: "2rem",
                  paddingBlock: "1.4rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "1px solid #F7F7F7",
                  position: "absolute",
                  bottom: 0,
                }}
              >
                <p
                  style={{
                    color: "#777777",
                    fontWeight: "400",
                    fontSize: "1.1rem",
                  }}
                >{`Result: ${totalResults ?? 0}`}</p>
                <div>
                  <button
                    style={{
                      color: "#777777",
                      paddingInline: "2rem",
                      paddingBlock: "0.8rem",
                    }}
                    onClick={() => {
                      localStorage.removeItem("userFilter");
                      setSelectedFilters({
                        status: null,
                        subscription: null,
                        onboardingDate: null,
                        lastLoginDate: null,
                        paymentstatus: null,
                        planExpiryDate: null,
                        companyName: "",
                        pageNumber: 1,
                        pageSize: 10,
                      });
                      setActiveDropdown(null);
                      toggleDrawer(false);
                    }}
                  >
                    Clear All
                  </button>
                  <button
                    style={{
                      background: "#00BD82",
                      color: "white",
                      paddingInline: "3rem",
                      paddingBlock: "0.8rem",
                      borderRadius: "0.8rem",
                    }}
                    onClick={() => {
                      localStorage.setItem(
                        "userFilter",
                        JSON.stringify(selectedFilters)
                      );
                      toggleDrawer(false);
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </Drawer>
            <DownloadCSvbtn
              onClick={() => {
                handleDownload();
              }}
            >
              <button disabled={donwloadCsvLoading}>Download CSV</button>
            </DownloadCSvbtn>
            {(user?.role === "superAdmin" ||
              user?.permissions?.includes("FC_Tenant")) && (
                <CreateUserButton
                  onClick={() => {
                    handleOpenCreateUser(`Create one user`);
                  }}
                >
                  <P color="white" fontSize="14px" fontweight="400">
                    Create Tenant
                  </P>
                </CreateUserButton>
              )}
          </Flex>
        </Flex>
      </TopContainer>
      <div ref={scrollRef} style={{ flexGrow: 1, display: "flex", flexDirection: "column" }} className="bottom">
        <div>
          <div style={{ height: "100%" }} className="table">
            <div style={{ height: "fit-content" }}>


              <div
                className="row"
                style={{
                  position: "sticky",
                  top: "0px",
                  zIndex: 100,
                  backgroundColor: "white",
                  borderBottom: "1.5px solid #80808052",
                  height: "60px",
                }}
              >
                <h6 className={`col sort info`}>
                  <span className="text">ID</span>
                </h6>
                <h6 className={`col sort info`}>
                  <span className="text">Company Name</span>
                </h6>
                <h6 className={`col sort info`}>
                  <span className="text">Name / Email</span>
                </h6>

                <h6 className={`col sort info`}>
                  <span className="text">Status</span>
                </h6>
                <h6 className={`col sort info`}>
                  <span className="text">Subscription</span>
                </h6>
                <h6 className={`col sort info`}>
                  <span className="text">Onboarding Date</span>
                </h6>
                <h6 className={`col sort info`}>
                  <span className="text">Plan Expiry Date</span>
                </h6>
                <h6 className={`col sort info`}>
                  <span className="text">Payment Status</span>
                </h6>
                <h6 className={`col sort info`}>
                  <span className="text">Last Login</span>
                </h6>
                <h6 className={`col sort info`}>
                  <span className="text">Message Sent</span>
                </h6>
                <h6 className={`col sort info`}>Action</h6>
              </div>

            </div>

            {tenets?.length === 0 && (
              <div style={{ height: "fit-content" }}>

                <div className="row body">
                  <p className="error">No Record Found!</p>
                </div>
              </div>
            )}
            {/* <div>
            
          </div> */}
            <div style={{ overflowY: "auto" }}>
              {tenets?.map((data, index) => {
                return (
                  <TableRow
                    offSidebar={offSidebar}
                    keyx={index}
                    onDelete={() => setSelectedDeleteId(data?._id)}
                    singleTemplate={data}
                    generateQueryParams={generateQueryParams}
                    currentPage={selectedFilters?.pageNumber}
                    numberOfRowsShowing={selectedFilters?.pageSize}
                    totalResults={totalResults ?? 0}
                    isLoading={loading2}
                    user={user}
                  />
                );
              })}
            </div>


          </div>
        </div>

        {tenets?.length > 0 && (
          <div
            style={{
              // position: "sticky",
              bottom: "0px",
              zIndex: 100,
              display: "flex",
              justifyContent: "space-between",
              height: "56px",
              backgroundColor: "white",
              borderBottomLeftRadius: "12px",
              padding: "0px 16px",
              alignItems: "center",
              paddingTop: "10px ",
              paddingBottom: "10px",
              borderTop: "1.5px solid #80808052",
            }}
          >
            <div>Total: {totalResults ?? 0}</div>

            <PaginationComp
              totalPages={totalPages || 1}
              currentPage={selectedFilters.pageNumber}
              onPageChange={handlePageChange}
            />

            <div
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <div
                style={{
                  fontSize: "14px",
                  lineHeight: "22px",
                  fontWeight: 500,
                  color: "#333333",
                }}
              >
                Entries
              </div>
              <PaginationDropDown
                limit={selectedFilters.pageSize}
                onLimitChange={handleLimitChange}
              />
            </div>
          </div>
        )}
        <CreateUserModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </InitialTemplateStyled>
  );
};

const TableRow = ({
  keyx,
  onDelete,
  singleTemplate,
  generateQueryParams,
  currentPage,
  numberOfRowsShowing,
  totalResults,
  isLoading,
  offSidebar,
  user,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // let displayIndex;
  // if (!isLoading) {
  //   const startingIndex =
  //     totalResults - (currentPage - 1) * numberOfRowsShowing;
  //   displayIndex = startingIndex - keyx;
  // }
  //  else {
  //   console.log("else condition is runnings");
  //   console.log("totalResults is", totalResults);
  //   displayIndex = totalResults - keyx;
  // }

  const subscriptionArray = [
    "67445d36f4d8d6cff7dbde60",
    "67445e5cf4d8d6cff7dbde85",
    "6744614ba4d142ed16ea9c97",
    "6744617ea4d142ed16ea9c9e",
  ];

  const findSubscription = subscriptionArray.find(
    (e) => e == singleTemplate?.subscriptionId?._id
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setActiveDropdown(null);
  }, [offSidebar]);

  // function convertTimestampToDate(timestamp) {
  //   const date = new Date(timestamp);
  //   const formattedDate =
  //     date.getFullYear() +
  //     "-" +
  //     ("0" + (date.getMonth() + 1)).slice(-2) +
  //     "-" +
  //     ("0" + date.getDate()).slice(-2) +
  //     "<br/> " +
  //     ("0" + date.getHours()).slice(-2) +
  //     ":" +
  //     ("0" + date.getMinutes()).slice(-2) +
  //     ":" +
  //     ("0" + date.getSeconds()).slice(-2);

  //   return formattedDate;
  // }



  function convertTimestampToDate(timestamp) {
    const date = new Date(timestamp);
    const formattedDate =
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2) +
      "-" +
      date.getFullYear() +



      "<br/> " +
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2) +
      ":" +
      ("0" + date.getSeconds()).slice(-2);

    return formattedDate;
  }
  function getExpiryDate(timestamp) {
    const date = new Date(timestamp);
    date.setDate(date.getDate() + 30);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  function formatLastLogin(lastLogin) {
    if (!lastLogin) {
      return "N/A";
    }

    const date = new Date(lastLogin);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActiveDropdown(null);
    }
  };
  const {
    errors: error,
    message,
    activeLoading,
    deActiveLoading,
  } = useSelector((state) => state.tenetsReducer);

  const loginAsUser = (user) => {
    const { email } = user;
    console.log("email", email);
    console.log(user);
    if (user?.role == "superAdmin") {
      console.log("here");
      dispatch(
        LoginAsUser(email, () => {
          navigate("/redirect?redirect=/dashboard");
          window.location.reload();
        })
      );
    } else {
      console.log("yes");
      dispatch(
        LoginAsUserMaster(email, () => {
          navigate("/redirect?redirect=/dashboard");
          window.location.reload();
        })
      );
    }
  };
  return (
    <TableRowStyled height className="row body" isOpen={isOpen} ref={dropdownRef}>
      <div className="col data">
        <p style={{ color: "#777777", fontWeight: 500 }}>
          {singleTemplate?.userId && singleTemplate.userId}
        </p>
      </div>
      <div className="col data">
        <p style={{ color: "#777777", fontWeight: 500 }}>
          {singleTemplate?.companyName || ""}
        </p>
      </div>

      <div
        className="col data"
        style={{ display: "flex", alignItems: "center" }}
      >

        <p
          style={{
            color: "#777777",
            fontWeight: 500,
            marginTop: 0,
            marginLeft: 5,
          }}
        >
          {singleTemplate?.firstName || ""} {singleTemplate?.lastName || ""} <br /> {singleTemplate?.email || ""}
        </p>
      </div>

      <div className="col data">
        <StyledStatus status={singleTemplate?.status}>
          {singleTemplate?.isDeclinedSubscription ? "Unsubscribed" :singleTemplate?.isCanceledSubscription && singleTemplate?.status != "Suspended" ? "Canceled":singleTemplate?.status || ""}
        </StyledStatus>
      </div>
      <div className="col data">
        <div style={{ width: "170px" }}>
          <StyledStatus
            subscription={
              singleTemplate?.subscriptionId == null && singleTemplate?.isPaymentReceived && singleTemplate?.isDeclinedSubscription ? "canceled" :
                singleTemplate?.subscriptionId == null &&
                  singleTemplate?.isPaymentReceived
                  ? "canceled"
                  : findSubscription == undefined
                    ? "custom"
                    : singleTemplate?.subscriptionId?._id
                      ? singleTemplate?.subscriptionId?._id
                      : `canceled`
            }
          >
            {
              singleTemplate?.subscriptionId == null && singleTemplate?.isPaymentReceived && singleTemplate?.isDeclinedSubscription ? "Declined" :
                singleTemplate?.subscriptionId?.title
                  ? singleTemplate?.subscriptionId?.title
                  : !singleTemplate?.subscriptionId?.title &&
                    !singleTemplate?.isPaymentReceived
                    ? "Not Completed"
                    : "Expired"}
          </StyledStatus>
        </div>

      </div>
      <div className="col data">
        <p style={{ color: "#777777", fontWeight: 500 }}>
          {convertTimestampToDate(singleTemplate?.createdAt).split('<br/>')[0]} <br />
          {convertTimestampToDate(singleTemplate?.createdAt).split('<br/>')[1]}
          {/* {nextBillingDate(singleTemplate.createdAt, singleTemplate.subscriptionType)} */}
        </p>
      </div>
      <div className="col data">
        <p style={{ color: "#777777", fontWeight: 500 }}>
          {convertTimestampToDate(singleTemplate?.nextInvoiceDate).split('<br/>')[0]} <br />
          {convertTimestampToDate(singleTemplate?.nextInvoiceDate).split('<br/>')[1]}
        </p>
      </div>
      <div className="col data">
        <StyledStatus
          pstatus={singleTemplate?.isPaymentReceived ? "Up-to-date" : "Pending"}
        >
          {singleTemplate?.isDeclinedSubscription ? "Past-due" : singleTemplate?.isPaymentReceived ? "Up-to-date" : "Pending"}
        </StyledStatus>
      </div>
      <div className="col data">
        <p style={{ color: "#777777", fontWeight: 500 }}>
          {formatLastLogin(singleTemplate?.lastLogin)}
        </p>
      </div>
      <div className="col data">
        <p style={{ color: "#777777", fontWeight: 500 }}>
          {singleTemplate?.sentOutBoundNumber > 0 ? "Yes" : "No"}{" "}
        </p>
      </div>
      {(user.role === "superAdmin" ||
        user?.permissions?.includes("FC_Tenant")) && (
          <div className="col actions" onClick={(e) => e.stopPropagation()}>
            {/* <ActionButton onClick={() => toggleDropdown(1)}>
              <FiMoreVertical size={20} />
            </ActionButton>
            {activeDropdown === 1 && (
              <ActionDropdown
                right="50%"
                top={keyx == 9 ? "-900%" : keyx == 8 ? "-900%" : "90%"}
              >
                <LightTooltip arrow placement="top" title="Login as a Tenant">
                  <DropdownItem onClick={() => loginAsUser(singleTemplate)}>
                    <FaUser />
                  </DropdownItem>
                </LightTooltip>
                <DropdownItem
                  onClick={() => {
                    navigate(`/tenant/edit/${singleTemplate?._id}`);
                  }}
                >
                  Edit
                </DropdownItem>
                {singleTemplate?.status === "Suspended" && (
                  <DropdownItem
                    onClick={() =>
                      dispatch(
                        ActiveTenant(
                          { status: "Active" },
                          singleTemplate?._id,
                          () => {
                            generateQueryParams();
                          }
                        )
                      )
                    }
                  >
                    <button disabled={activeLoading}>
                      {activeLoading ? "Activating..." : "Activate"}
                    </button>
                  </DropdownItem>
                )}
                {singleTemplate?.status === "Active" && (
                  <DropdownItem
                    onClick={() =>
                      dispatch(
                        DeActiveTenant(
                          { status: "Suspended" },
                          singleTemplate?._id,
                          () => {
                            generateQueryParams();
                          }
                        )
                      )
                    }
                  >
                    <button disabled={deActiveLoading}>
                      {deActiveLoading ? "Deactivate..." : "Deactivate"}
                    </button>
                  </DropdownItem>
                )}
              </ActionDropdown>
            )} */}
            <MorePopover
              loginAsUser={loginAsUser}
              singleTemplate={singleTemplate}
              singletemplateId={singleTemplate?._id}
              activeLoading={activeLoading}
              deActiveLoading={deActiveLoading}
              generateQueryParams={generateQueryParams}
              singleTemplateStatus={singleTemplate?.status}
            >
              <MdMoreVert
                style={{
                  cursor: "pointer",
                  fontSize: "20px",
                  color: "#777777",
                  textAlign: "right",
                }}

              />
            </MorePopover>

          </div>
        )}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="extraRows"
            exit={{
              height: 0,
              transition: { delay: 0.3, duration: 0.3, ease: "easeIn" },
            }}
          >
            {singleTemplate?.messages
              ? Object.keys(singleTemplate?.messages[0])
                .filter((key) => key !== "_id")
                .map((key) => singleTemplate?.messages[0][key])

                .map((data, index) => (
                  <motion.div
                    initial={{
                      x: "-2rem",
                      opacity: 0,
                      transition: { duration: 0.3, ease: "linear" },
                    }}
                    animate={{
                      x: "0rem",
                      opacity: 1,
                      transition: { duration: 0.3, ease: "linear" },
                    }}
                    exit={{
                      x: "-2rem",
                      opacity: 0,
                      transition: { duration: 0.3, ease: "linear" },
                    }}
                    className="item"
                    key={index}
                  >
                    <span>
                      {index === 4 ? "Alt Message" : `Message ${index + 1}`}
                    </span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: formatTemplateString(data),
                      }}
                    />
                  </motion.div>
                ))
              : ""}
          </motion.div>
        )}
      </AnimatePresence>
    </TableRowStyled>
  );
};

const MoreOptionMenu = ({ onDelete, _id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button ref={buttonRef} onClick={() => setIsOpen((p) => !p)}>
        {isOpen ? <FaTimes /> : <FaEllipsisV />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            className="menu"
            initial={{ x: "1rem", y: "-50%", opacity: 0 }}
            animate={{ x: "-1.5rem", y: "-50%", opacity: 1 }}
            exit={{ x: "1rem", y: "-50%", opacity: 0 }}
          >
            <button
              onClick={() => {
                setIsOpen(false);
                navigate(`/templates/create-template/${_id}?edit=true`);
              }}
            >
              <span className="icon">
                <FaEdit />
              </span>
              <span className="text">Edit</span>
            </button>
            <button
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
            >
              <span className="icon">
                <FaTrash />
              </span>
              <span className="text">Delete</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
