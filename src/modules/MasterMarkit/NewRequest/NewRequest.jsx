import React, { useState, useEffect } from "react";
import styles from "../MarkitMaster.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import NewRequestTable from "./NewRequestTable";
import PaginationDropDown from "@/modules/DirectImport/PaginationDropDown";
import PaginationComp from "@/modules/DirectImport/Pagination";
import AddBondNumberModal from '../AddBondNumberModal';
import { toast } from "react-hot-toast";
import { commonAPICall } from "@/services/api/common";
import { REQUEST_TYPES, ENDPOINTS } from "@/utils/constant/url";
import Select from "react-select";
import { logOut } from "@/store/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const NewRequest = () => {
  const [tenent, setTenent] = useState("One");
  const [isLoading, setLoader] = useState(false);
  const [newRequestMarkets, setNewRequestMarket] = useState([]);
  const [tenantsOptions, setTenantsOptions] = useState([]);
  const [selectedTenant, setTenant] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [totalResults, setTotalResults] = useState("")
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);
  const [totalPage, setTotalPage] = useState(1);
  const [sorting, setSorting] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    console.log("event", e.target.value);
    setTenent(e.target.value);
  };

  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );
  // Debouncing the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      if(page > 1){
        setPage(1)
      }
      setDebouncedSearchValue(searchValue);
    }, 500); // Debounce delay of 500ms

    // Cleanup the timeout if searchValue changes before the delay
    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);
  const fetchFilterData = async () => {
    try {
      const { data, isError, message , sessionExpired } = await commonAPICall(
        REQUEST_TYPES.GET,
        ENDPOINTS.GET_ALL_COMPANIES
      );
      if(sessionExpired){
   

      
        // sessionStorage.clear()
        dispatch(logOut());

        navigate("/Login");

      }
      if (isError) {
        return toast.error(message);
      }
      const options = data?.results
        ?[
          { id: "", name: "None" }, // Default option
          ...data?.results.map((item) => {
            const name = item?.fullName
              ? item?.fullName
              : `${item?.firstName} ${item?.lastName}`; // Add space between firstName and lastName
            return { id: item?._id, name };
          }),
        ]
      : [{ id: "", name: "None" }];
      setTenantsOptions(options);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchData = async (tenantId, limit, page, search) => {
    try {
      setLoader(true);
      const params = {
        ...(tenantId && { tenantId }),
        ...(limit && { limit }),
        ...(page && { page }),
        ...(search && { search }),
      };

      const queryParams = new URLSearchParams(params);
      const { data, isError, message , sessionExpired } = await commonAPICall(
        REQUEST_TYPES.GET,
        `${ENDPOINTS.GET_ALL_NEW_REQUEST_MARKETS}?${queryParams}${sorting?.sort ? `&${sorting?.sort}` : ""}`
      );
      setLoader(false);
      if(sessionExpired){
   

      
        // sessionStorage.clear()
        dispatch(logOut());

        navigate("/Login");

      }
      if (isError) {
        return toast.error(message);
      }
      setNewRequestMarket(data?.results || []);
      setTotalPage(data?.totalPages);
      setTotalResults(data?.totalResults)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFilterData();
  }, []);
  useEffect(() => {
    fetchData(selectedTenant, limit, page, debouncedSearchValue);
  }, [selectedTenant, limit, page, debouncedSearchValue , sorting]);

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
    setPage(1);
    // fetchData(selectedTenant , e.target.value );
  };
  const handlePageChange = (e, value) => {
    setPage(value);
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
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
  return (
    <div className={styles.tabContainer}>
      <div className={styles.GeneralTop}>
        <div style={{ display: "flex", gap: "16px" }}>
          <div style={{ width: "150px" }} className={styles.dropdownContainer}>

            <Select


              onChange={(e) => {
                setTenant(e?.value)

              }}
              styles={customStyles}

              options={tenantsOptions.map((option) => ({
                value: option?.id,
                label: option?.name,
              }))}

              isSearchable
              placeholder="Search..."
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <div className={styles.searchContainer}>
            <FiSearch style={{ fontSize: "22px", color: "#012635" }} />
            <input className={styles.SearchInput} name="search" onChange={(e) => setSearchValue(e?.target?.value)} placeholder='Search for a Request' />
          </div>
          {(user.role === 'superAdmin' || user.permissions.includes('FC_New Request')) && (
          <AddBondNumberModal title="Create New Markets">
            <div className={styles.button}>Create new market</div>
          </AddBondNumberModal>
          )}

        </div>
      </div>

      <div  className={styles.GeneralBottom}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderBottom: "0px",
          
            height:"100%"
          }}
          className={`${styles.tableLayout} `}
        >
          <NewRequestTable sorting={sorting} setSorting={setSorting} data={newRequestMarkets} fetchData={fetchData} user={user} />
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
            <div>Total: {totalResults}</div>

            <div>
              <PaginationComp
                onPageChange={handlePageChange}
                totalPages={totalPage}
                currentPage={page}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
    </div>
  );
};

export default NewRequest;
