import React, { useState, useEffect } from "react";
import styles from "../MarkitMaster.module.css";
import PaginationDropDown from "@/modules/DirectImport/PaginationDropDown";
import PaginationComp from "@/modules/DirectImport/Pagination";
import { toast } from "react-hot-toast";
import { commonAPICall } from "@/services/api/common";
import { REQUEST_TYPES, ENDPOINTS } from "@/utils/constant/url";
import SubmissionTable from "./SubmissionTable";
import { CircularLoader } from "@/components/common";
import RegisterationInfo from "../RegistrationInfo";
import { logOut } from "@/store/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";

const Submission = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [rowId, setRowId] = useState('');
  const [rowBody, setRowBody] = useState({});
  const [open, setOpen] = useState(false);
    const [active, setActive] = useState(true);
    const [loading1, setLoading1] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLimitChange = (e) => {
    setLimit(e.target.value);
    // fetchData(selectedTenant , e.target.value );
  };
  const handlePageChange = (e, value) => {
    setPage(value);
  };

  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );

  // const fetchData1 = async (page = 1, limit = 10) => {
  //   try {
  //     setLoading(true);
  //     const params = { page, limit };
  //     const queryParams = new URLSearchParams(params);
  //     const { data, isError, message, sessionExpired } = await commonAPICall(
  //       REQUEST_TYPES.GET,
  //       `${ENDPOINTS.GET_ALL_TENDLC}?${queryParams}${debouncedSearchValue ? `&search=${debouncedSearchValue}` : ""
  //       }`
  //     );
  //     if (sessionExpired) {



  //       // sessionStorage.clear()
  //       dispatch(logOut());

  //       navigate("/Login");

  //     }
  //     if (isError) {
  //       setLoading(false);
  //       return toast.error(message);
  //     }
  //     // setLoading(false);
  //     // setListing(data?.results || []);
  //     // setTotalPage(data?.totalPages || 1);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };
 
 


  const fetchData = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const params = { page, limit };
      const queryParams = new URLSearchParams(params);
      const { data, isError, message, sessionExpired } = await commonAPICall(
        REQUEST_TYPES.GET,
        `${ENDPOINTS.GET_ALL_COMPANIES}?${queryParams}${debouncedSearchValue ? `&search=${debouncedSearchValue}` : ""
        }${`&userStatus=${active}`}`
      );
      if (sessionExpired) {



        // sessionStorage.clear()
        dispatch(logOut());

        navigate("/Login");

      }
      if (isError) {
        setLoading(false);
        return toast.error(message);
      }
      setLoading(false);
      setListing(data?.results || []);
      setTotalPage(data?.totalPages || 1);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
 
 
 
  useEffect(() => {
    console.log("change");

    fetchData(page, limit, debouncedSearchValue);
  
  }, [page, limit, debouncedSearchValue , active]);
  const deleteHandler = async (id = "") => {
    console.log("id is", id);
    
    if (id) {
      try {
        const { data, isError, message, sessionExpired } = await commonAPICall(
          REQUEST_TYPES.DELETE,
          `${ENDPOINTS.UPDATE_SINGLE_DIC_BY_TENANTID}/${id}`
        );
        if (sessionExpired) {



          // sessionStorage.clear()
          dispatch(logOut());

          navigate("/Login");

        }
        if (isError) {
          return toast.error(message);
        }
        const cloneData = [...listing];
        const filteredData = cloneData.filter((item) => item?._id !== id);
        setListing(filteredData);
        setIsModelOpen(false);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setLoading(false);
        setIsModelOpen(false);
        console.log(error);
      }
    }
  };

  const changeStatusHandler = async (id = "", body) => {
    setRowId(id);
    setRowBody(body);
    setOpenDelete(true);
  };


  const changeStatusHandlerPass = async () => {
    if (rowId) {
      try {
        const { isError, message, sessionExpired } = await commonAPICall(
          REQUEST_TYPES.PATCH,
          `${ENDPOINTS.UPDATE_SINGLE_DIC_BY_TENANTID}/${rowId}`,
          rowBody
        );
        if (sessionExpired) {



          // sessionStorage.clear()
          dispatch(logOut());

          navigate("/Login");

        }
        if (isError) {
          return toast.error(message);
        }
        fetchData();
        setIsModelOpen(false);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setLoading(false);
        setIsModelOpen(false);
        console.log(error);
      }
    }
  };

  const changeStatusHandlerPassAccept = async (id = "", body) => {

    if (id) {
      setRowId(id);
     setLoading1(true)
      try {
        const { isError, message, sessionExpired } = await commonAPICall(
          REQUEST_TYPES.PATCH,
          `${ENDPOINTS.UPDATE_SINGLE_DIC_BY_TENANTID}/${id}`,
          body
        );
        if (sessionExpired) {



          // sessionStorage.clear()
          dispatch(logOut());

          navigate("/Login");

        }
        if (isError) {
          setLoading1(false);
          return toast.error(message);
        }
        fetchData();
        setIsModelOpen(false);
        setLoading1(false);
      } catch (error) {
        setLoading1(false);
        setLoading(false);
        setIsModelOpen(false);
        console.log(error);
      }
    }
  };



  const editHandler = (record = {}) => {
    setSelectedRecord(record);
    setOpen(true);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);
  return (
    <div className={styles.tabContainer}>
      <div className={styles.SubmissionBottom}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderBottom: "0px",
            height: "100%",
          }}
          className={`${styles.tableLayout} `}
        >
          {/* {loading ?
          <div style={{padding:"20px"}}>
            <CircularLoader /> 

          </div>
            : */}
          <SubmissionTable
            setLoading={setIsLoading}
            setLoading1={setLoading1}
            loading1={loading1}
            setIsModelOpen={setIsModelOpen}
            isModelOpen={isModelOpen}
            debouncedSearchValue={debouncedSearchValue}
            setDebouncedSearchValue={setDebouncedSearchValue}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
            loading={isLoading}
            data={listing}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
            user={user}
            changeStatusHandler={changeStatusHandler}
            changeStatusHandlerPassAccept={changeStatusHandlerPassAccept}
            rowId={rowId}
            active={active}
            setActive={setActive}
            setPage={setPage}
            
           
          />
          {/* } */}
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
            <div>Total: {listing?.length || 0}</div>

            <div>
              <PaginationComp
              currentPage={page}
                onPageChange={handlePageChange}
                totalPages={totalPage}
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
      <RegisterationInfo
        open={open}
        setOpen={setOpen}
        selectedRecord={selectedRecord}
        refreshData={fetchData}
        tenantId={selectedRecord?.tenantId}
      />
      <DeleteModal
        // refreshDetails={refreshDetails}
        // curruntNumber={curruntNumber}
        // originalNumber={originalNumber}
        handleDelete={() => {
          changeStatusHandlerPass();
        }}

        open={openDelete}
        setOpen={setOpenDelete}
      // noMessageSent={noMessageSent}
      />
    </div>
  );
};

export default Submission;
