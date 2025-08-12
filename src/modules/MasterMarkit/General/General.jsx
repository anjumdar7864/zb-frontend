import React, { useState, useEffect, useRef } from "react";
import styles from "../MarkitMaster.module.css";
import DropDown from "@/components/common/DropDwon/DropDown";
import { FaChevronDown } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import GeneralTable from "./GeneralTable";
import TennentInfo from "./TennentInfo";
import { commonAPICall } from "@/services/api/common";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { GetAllAreaCode, logOut } from "@/store/actions";
import Select from "react-select";
import { REQUEST_TYPES, ENDPOINTS } from "@/utils/constant/url";
import AddBondNumberModal from "../AddBondNumberModal";
import zIndex from "@mui/material/styles/zIndex";
import PaginationDropDown from "@/modules/DirectImport/PaginationDropDown";
import PaginationComp from "@/modules/DirectImport/Pagination";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SwitchButton from "@/components/common/Switch/Switch";
// import DropDown from '@/components/common/DropDwon/DropDown';
const General = ({ props }) => {
  const [tenent, setTenent] = useState("One");
  const [adminOptions, setAdminsOptions] = useState([]);
  const [tenantOptions, setTenantOptions] = useState([]);
  const [areaCodeOptions, setAreaCodeOptions] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [companyTotalPage, setCompanyTotalPage] = useState();
  const [selectedTenantOpt, setSelectedTenantOpt] = useState("");
  const [selectedAmdinOpt, setSelectedAdminOpt] = useState();
  const [areaCode, setAreaCode] = useState("");
  const [tenantData, setTenantData] = useState({});
  const [selectedTenantOptValue, setSelectedTenantOptValue] = useState(null);
  const [areaCodeValue, setAreaCodeValue] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);
  const [limit, setLimit] = useState(10);
  const [infoLimit, setInfoLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [infoCurrentPage, setinfoCurrentPage] = useState(1);
  const [sorting, setSorting] = useState();
  const [active, setActive] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );
  // Debouncing the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500); // Debounce delay of 500ms

    // Cleanup the timeout if searchValue changes before the delay
    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);
  const dispatch = useDispatch();
  const { areaCodes, timeZoneOfAreaCode } = useSelector(
    (s) => s.areaCodeReducer
  );
  // const handleChange = (e) => {

  //     setTenent(e.target.value)

  // }

  const fetchData = async (debouncedSearchValue) => {
    try {
      const { data, isError, message, sessionExpired } = await commonAPICall(
        REQUEST_TYPES.GET,
        `${ENDPOINTS.GET_ALL_COMPANIES}${limit ? `?limit=${limit}&` : ""}${currentPage ? `page=${currentPage}&` : ""
        }${debouncedSearchValue ? `&search=${debouncedSearchValue}` : ""}${`&userStatus=${active}`}`
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
          { id: "", name: "None" },
          ...data.results.map((item) => {
            const name = item?.fullName
              ? item.fullName
              : `${item.firstName} ${item.lastName}`;
            return { id: item?._id, name };
          }),
        ]
        : [{ id: "", name: "None" }];
      // setAdminsOptions(options);
      setCompanies(data?.results);
      setCompanyTotalPage({
        totalPages: data?.totalPages,
        totalData: data?.totalResults,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getallMarketTenant = async (
    id = "",
    markit = "",
    areaCode = "",
    search = "",
    getMarket = "",
    Limit
  ) => {
    //   console.log("check log filter" , id ,markit );

    try {
      if (id != "" || markit != "" || areaCode != "") {
        const { data, isError, message, sessionExpiredq } = await commonAPICall(
          REQUEST_TYPES.GET,
          `${ENDPOINTS.GET_ALL_MARKET_TENANT}?${id != "" && id != "areaCode" ? `tenantId=${id}` : ""
          }${infoLimit
            ? `${id != "areaCode" ? "&" : ""}limit=${infoLimit}`
            : `${id != "areaCode" ? "&" : ""}limit=100`
          }${infoCurrentPage ? `&page=${infoCurrentPage}` : ""}${markit != "" && markit != "None" ? `&marketName=${markit}` : ""
          }${areaCode != "" && areaCode !== "None" ? `&areaCode=${areaCode}` : ""
          }${debouncedSearchValue ? `&search=${debouncedSearchValue}` : ""}${sorting?.sort ? `&${sorting?.sort}` : ""
          }`
        );
        // if(sessionExpired){

        //     // sessionStorage.clear()
        //     dispatch(logOut());

        //     navigate("/Login");

        //   }
        if (isError) {
          return toast.error(message);
        }
        const { markets } = data;
        // const options = markets?.results ? markets?.results.map(item => ({ id: item?._id, name: item?.name })) : [];
        const options = markets?.results
          ? [
            { id: "", name: "None" },
            ...markets.results.map((item) => ({
              id: item?._id,
              name: item?.name,
            })),
          ]
          : [{ id: "", name: "None" }];

        const areaCodeOptions = markets?.results
          ? [
            { id: "", name: "None" },
            ...Array.from(
              new Set(markets.results.map((item) => item?.areaCode)) // Step 1: deduplicate area codes
            ).map((areaCode) => ({ id: areaCode, name: areaCode })),
          ] // Step 2: map back to objects
          : [{ id: "", name: "None" }];
        if (!markit && !areaCode) {
          setTenantOptions(options);
          setAreaCodeOptions(areaCodeOptions || []);
        }
        if (getMarket != "none") {
          setTenantOptions(options);
        }

        setTenantData(data);
        console.log("tenantData ===", data);
      }

      if (id == "" && getMarket != "none") {
        const { data, isError, message, sessionExpired } = await commonAPICall(
          REQUEST_TYPES.GET,
          `${ENDPOINTS.GET_ALL_MARKET}`
        );
        if (sessionExpired) {
          // sessionStorage.clear()
          dispatch(logOut());

          navigate("/Login");
        }
        if (isError) {
          return toast.error(message);
        }
        const markets = data?.markets;
        const TenantData = data?.tenants;
        // const options = markets?.results ? markets?.results.map(item => ({ id: item?._id, name: item?.name })) : [];
        const options = markets
          ? [
            { id: "", name: "None" },
            ...markets.map((item) => ({
              id: item?._id,
              name: item?.name,
              tenantId: item?.tenantId,
              tenantName: item?.tenantName,
            })),
          ]
          : [{ id: "", name: "None" }];

        const optionsAreacode = markets
          ? [
            { id: "", name: "None" },
            ...Array.from(
              new Set(markets.map((item) => item?.areaCode)) // Deduplicate area codes
            ).map((areaCode) => ({ id: areaCode, name: areaCode })), // Map to objects
          ]
          : [{ id: "", name: "None" }];
        const optionsTenant = TenantData
          ? [
            { id: "", name: "None" },
            ...TenantData.map((item) => {
              //const name = item?.fullName ? item.fullName : `${item.firstName} ${item.lastName}`;
              const name = item?.companyName || "N/A";
              const userId = item?.userId || "N/A";
              return { id: item?._id, name, userId };
            }),
          ]
          : [{ id: "", name: "None" }];
        setAdminsOptions(optionsTenant);
        setTenantOptions(options);
        setAreaCodeOptions(optionsAreacode || []);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    dispatch(GetAllAreaCode());
    if ((selectedAmdinOpt?.value == "", selectedTenantOpt == "")) {
      getallMarketTenant();
    }
  }, [limit, currentPage, active]);


  useEffect(() => {
    if (tenent == "One") {
      fetchData(debouncedSearchValue);
    } else {
      dispatch(GetAllAreaCode());
      if ((selectedAmdinOpt?.value == "", selectedTenantOpt == "")) {
        getallMarketTenant(selectedAmdinOpt?.value);
      }
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    // console.log("check log filter-==" , selectedAmdinOpt);

    // selectedTenantOpt && getallMarketTenant(selectedAmdinOpt?.id, selectedTenantOpt, "", debouncedSearchValue, "none")
    selectedTenantOpt &&
      getallMarketTenant(
        selectedAmdinOpt?.value,
        selectedTenantOpt,
        "",
        debouncedSearchValue,
        "none"
      );
    areaCode &&
      getallMarketTenant(
        selectedAmdinOpt?.value,
        selectedTenantOpt,
        areaCode,
        debouncedSearchValue
      );
  }, [selectedTenantOpt, areaCode, debouncedSearchValue, infoLimit]);

  useEffect(() => {
    if (areaCode != "" && !selectedAmdinOpt?.value) {
      if (areaCode == "None") {
        setTenent("One");
      } else {
        setTenent("Two");
      }

      getallMarketTenant("areaCode", "", areaCode, "", "none");
    }
  }, [areaCode]);
  useEffect(() => {
    // console.log('infp limit', infoLimit);
    getallMarketTenant(
      selectedAmdinOpt?.value,
      selectedTenantOpt,
      "",
      debouncedSearchValue,
      "none",
      infoLimit
    );
  }, [infoLimit, infoCurrentPage, , sorting]);

  const handleRefreshTableInfo = () => {
    getallMarketTenant(
      selectedAmdinOpt?.value,
      selectedTenantOpt,
      "",
      debouncedSearchValue
    );
    areaCode &&
      getallMarketTenant(
        selectedAmdinOpt?.value,
        selectedTenantOpt,
        areaCode,
        debouncedSearchValue
      );
  };

  const handleTenantChange = (e) => {
    if (e.value != "") {
      setTenent("Two");
    } else {
      setTenent("One");
    }
    setSearchValue("");

    setSelectedAdminOpt(e);
    setSelectedTenantOpt("");
    setAreaCode("");
    getallMarketTenant(e.value);
    setSelectedTenantOptValue(null);
    setAreaCodeValue(null);
  };


  const rowHanlder = (obj = {}) => {
    obj && Object.keys(obj).length && handleTenantChange(obj);
  };




  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const company = searchParams.get("company");

    console.log("ID:", id);
    console.log("Company:", company);
if(id){
   handleTenantChange({
      value: id || "",
      label: company || "",
    });
}
 
  }, [location.search]);


  // const customStyles = {
  //   control: (provided, state) => ({
  //     ...provided,
  //     borderColor: state.isFocused ? "#5BF1B2" : "#D3D7DD", // Change border color
  //     boxShadow: "none",
  //     borderRadius: "8px", // Change border radius
  //     height: "48px",
  //     "&:hover": {
  //       borderColor: "#5BF1B2", // Hover border color
  //     },
  //   }),
  //   dropdownIndicator: (provided) => ({
  //     ...provided,
  //     padding: 8,
  //   }),
  //   indicatorSeparator: () => ({
  //     display: "none", // Remove the indicator separator line
  //   }),
  //   menu: (provided) => ({
  //     ...provided,
  //     // Dropdown list background color
  //     zIndex: 1000, // Set z-index for menu
  //     // color:"red" , 
  //     // whiteSpace: "nowrap",
  //     // overflow: "hidden",
  //     // textOverflow: "ellipsis",
  //   }),
  //   menuPortal: (provided) => ({
  //     ...provided,
  //     zIndex: 1000, // Set z-index for menu portal to ensure it’s on top
  //   }),
  // };
 
    const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "#5BF1B2" : "#D3D7DD",
    boxShadow: "none",
    borderRadius: "8px",
    height: "48px",
    "&:hover": {
      borderColor: "#5BF1B2",
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: 8,
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 1000,
    width: "auto",         // ✅ Allow width to adjust
    minWidth: "100%",      // ✅ Maintain minimum width same as control
    whiteSpace: "nowrap", 
    maxWidth: "550px",      // ✅ Prevent wrapping for long text
  }),
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 1000,
  }),
};
  const marketHandler = (obj) => {
    if (
      obj.value != "None" &&
      (!selectedAmdinOpt || !selectedAmdinOpt?.value)
    ) {
      setTenent("Two");

      setSelectedAdminOpt({ label: obj?.tenantName, id: obj?.tenantId });
      getallMarketTenant(obj?.tenantId, obj?.value);
      // setSelectedTenantOpt(obj?.value);
      setSelectedTenantOptValue(obj);
      // setSelectedAdminOpt({ label: obj?.tenantName, id: obj?.tenantId })
      setSelectedTenantOpt(obj?.value);
    } else if (obj.value != "None" && selectedAmdinOpt) {
      setSelectedTenantOpt(obj?.value);
      setSelectedTenantOptValue(obj);
    } else if (obj.value == "None") {
      setSelectedTenantOpt(obj.value);
      setSelectedTenantOptValue(obj);
    }
  };
  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value)); // Update limit based on dropdown selection
    setCurrentPage(1); // Reset page to 1 when changing limit
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const refreshHandler = (tenantId = "") => {
    getallMarketTenant(tenantId);
  };


  

  return (
    <div className={styles.tabContainer}>
      <div className={styles.GeneralTop}>
        <div style={{ display: "flex", gap: "16px" }}>
          <div style={{ width: "150px" }} className={styles.dropdownContainer}>
            <Select
              value={selectedAmdinOpt && selectedAmdinOpt} // Use `value` instead of `defaultValue`
              onChange={handleTenantChange}
              styles={customStyles}
              options={adminOptions.map((option) => ({
                value: option.id,
                label: `${option?.name}-${option?.userId}`,
              }))}
              isSearchable
              placeholder="Tenant"
            />
          </div>

          <div style={{ width: "150px" }} className={styles.dropdownContainer}>
            <Select
              value={selectedTenantOptValue}
              onChange={(e) => marketHandler(e)}
              styles={customStyles}
              // isDisabled={(!areaCode == "" || areaCode != "None") ? true : false}
              isDisabled={areaCode !== "" && areaCode !== "None"}
              options={tenantOptions.map((option) => ({
                value: option.name,
                label: option.name,
                tenantId: option?.tenantId,
                tenantName: option?.tenantName,
              }))}
              isSearchable
              placeholder="Market"
            />
          </div>

          <div style={{ width: "150px" }} className={styles.dropdownContainer}>
            <Select
              // isDisabled={(selectedTenantOpt != "" && selectedTenantOpt != "None") && selectedAmdinOpt?.label != "" ? true : false}
              isDisabled={
                selectedTenantOpt &&
                selectedTenantOpt !== "None" &&
                selectedAmdinOpt?.label
              }
              value={areaCodeValue}
              onChange={(e) => {
                setAreaCode(e.value);
                setAreaCodeValue(e);
              }}
              styles={customStyles}
              options={areaCodeOptions.map((option) => ({
                value: option.name,
                label: option.name,
              }))}
              isSearchable
              placeholder="Area code"
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" , fontSize:"12px" , fontWeight:"500" }}>
          <span style={{color:"#777777"}}>Inactive</span>
          <SwitchButton

            active={active}
            // row={arr}
            handleActive={() => {
              setActive(!active)
              setCurrentPage(1); // Reset to first page when toggling active state
              setSearchValue("");
            }}
          />
          <span style={{color:"#00BD82"}}>Active</span>
          <div className={styles.searchContainer}>
            <FiSearch style={{ fontSize: "22px", color: "#012635" }} />
            <input
              className={styles.SearchInput}
              value={searchValue}
              name="search"
              onChange={(e) => setSearchValue(e?.target?.value)}
              placeholder="Search..."
            />
          </div>
          {(user.role === "superAdmin" ||
            user.permissions.includes("FC_General")) && (
              <AddBondNumberModal
                title="Create New Markets"
                refreshHandler={refreshHandler}
              >
                <div style={{ justifyContent: "center" }} className={styles.button}>Create new market</div>
              </AddBondNumberModal>
            )}
        </div>
      </div>
      {tenent == "One" ? (
        <div className={styles.GeneralBottom}>
          <div
            style={{ display: "flex", flexDirection: "column" }}
            className={`${styles.tableLayout} ${styles.custom_scrollbar}`}
          >
            <GeneralTable data={companies} rowHanlder={rowHanlder} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: "56px",
                backgroundColor: "white",
                border: "solid 1px #E0E0E0",
                borderEndEndRadius: "12px",
                borderBottomLeftRadius: "12px",
                padding: "0px 16px",
                alignItems: "center",
                paddingTop: "10px ",
                paddingBottom: "10px",
              }}
            >
              <div>Total: {companyTotalPage?.totalData}</div>

              <div>
                <PaginationComp
                  totalPages={companyTotalPage?.totalPages || 1}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>

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

                <div>
                  <PaginationDropDown
                    limit={limit}
                    onLimitChange={handleLimitChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.GeneralBottomSec}>
          <TennentInfo
            sorting={sorting}
            setSorting={setSorting}
            handleRefreshTableInfo={handleRefreshTableInfo}
            setinfoCurrentPage={setinfoCurrentPage}
            infoCurrentPage={infoCurrentPage}
            tenantData={tenantData}
            infoLimit={infoLimit}
            setInfoLimit={setInfoLimit}
            tenantId={selectedAmdinOpt?.value || ""}
            user={user}
          />
        </div>
      )}
    </div>
  );
};

export default General;
