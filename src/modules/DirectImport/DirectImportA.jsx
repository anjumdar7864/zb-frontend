import React, { useLayoutEffect, useState, useEffect } from "react";
import styles from "./DirectImport.module.css";
import { IoIosArrowDown } from "react-icons/io";
import DirectImportTable from "./DirectImportTable";
import PaginationDropDown from "./PaginationDropDown";
import PaginationComp from "./Pagination";
import DirectImportModal from "./DirectImportModall";
import ImportListButton from "./ImportListButton";
import { useDispatch, useSelector } from "react-redux";
import { getAllDirectImport } from "@/store/actions";
import toast, { Toaster } from 'react-hot-toast';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { FaSearch } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";



const notify = () => toast((t) => (
  <div style={{ width: "256px" }}>
    <Box sx={{ width: '100%' }}>
      <LinearProgress
        sx={{
          height: '12px',
          backgroundColor: '#F0F0F0',
          borderRadius: '12px',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#00BD82',
            borderRadius: '12px',
          },
        }}
        variant="indeterminate"  // Use indeterminate for a dynamic loading bar
      />
    </Box>
    <div style={{ width: "100%", display: "flex", justifyContent: "center", color: "#012635", fontSize: "18px", fontWeight: 500, lineHeight: "26px", paddingTop: "10px" }}>
      Uploading...
    </div>
  </div>
), {
  position: "bottom-left",
  autoClose: false,
  duration: Infinity,
  style: {
    marginLeft: "80px", 

  },
});

const DirectImportA = () => {
  const dispatch = useDispatch();
  const { directImportData, queueLoading, fileCompleted } = useSelector(
    (s) => s.directImportReducer
  );
  const [directImportLocalStorageData, setIsDirectImportLocalStorageData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10); // Limit can be made dynamic if needed
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);

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

  useLayoutEffect(() => {
    dispatch(
      getAllDirectImport({
        limit: debouncedSearchValue ? 10 : limit,
        page: debouncedSearchValue ? 1 : currentPage,
        search: debouncedSearchValue,
      })
    );
  }, [dispatch, debouncedSearchValue, currentPage, limit]);



  useEffect(() => {
   
    return () => {
      console.log("Component unmounted");
      toast.dismiss();
    };
  }, []);


  useEffect(() => {
    let directImportLocalStorage = localStorage.getItem("directImport");
    setIsDirectImportLocalStorageData(directImportLocalStorage);
    console.log("check if loading is continiue....",queueLoading);
    // Show the toast notification if the process is loading
    if (queueLoading) {
      console.log("check if loading is continiue" , queueLoading , fileCompleted );
      
      notify();
    }
    if (fileCompleted) {
      toast.dismiss();  // Correct function to dismiss the toast notification
      console.log("check if loading is continiue====" , queueLoading , fileCompleted );
        
    }
    console.log("this", fileCompleted);
    if (fileCompleted && directImportLocalStorageData) {
      setIsDirectImportLocalStorageData("");
      dispatch(
        getAllDirectImport({
          limit: debouncedSearchValue ? 10 : limit,
          page: debouncedSearchValue ? 1 : currentPage,
          search: debouncedSearchValue || "",
        })
      );
      // localStorage.removeItem("directImport");
    }

  }, [dispatch, fileCompleted, queueLoading, debouncedSearchValue, currentPage, limit]);



  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div style={{ height: "100%", overflow: "auto" , display:"flex" , flexDirection:"column" }}>
      <div style={{paddingBottom:"40px" , height:"100%" , overflow:"none"}} className={styles.container}>
        <div className={styles.top}>
          <div className={styles.title}>Direct Import</div>
          <div >
            <div style={{ display: "flex", gap: "10px" }}>
            {(user.role === 'admin' || user.permissions.includes('Search')) && (
              <div className={styles.searchContainer}>
                <div style={{display:"flex" , alignItems:"center"}}>
                <FiSearch size={22}/>
                </div>
                <input
                  placeholder="Search for a user"
                  onChange={(e) => setSearchValue(e.target.value)}
                  style={{ outline: "none", border: "none" }}
                />
              </div>
              )}
               {(user.role === 'admin' || user.permissions.includes('Import or Drag & Drop File')) && (
              <ImportListButton
                isDisabled={queueLoading && directImportLocalStorageData}
                directImportData={directImportData?.results[0]}
              />
               )}
            </div>
          </div>
        </div>
        <div style={{display:"flex" , flexDirection:"column"  , paddingBottom:"0px" ,  overflow:"none"}} className={styles.bottom}>
          <div  style={{flexGrow:1  ,  height:"calc(100% - 56px)" }} >
          <DirectImportTable
            directImportData={directImportData}
            numberOfRowsShowing={limit}
            currentPage={currentPage}
            loadingDelete={directImportData.loadingDelete}
            search={debouncedSearchValue}
            handlePageChange={handlePageChange}
            handleLimitChange={handleLimitChange}
            user={user}
          />
          </div>
            <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "56px",
            backgroundColor: "white",
            border: '1px solid #E0E0E0', 
            borderEndEndRadius:"8px" , 
            borderEndStartRadius:"8px" , 
            borderTop: "1px solid var(--Extra-Grey, #e0e0e0)",
            // minWidth: '1278px',
            padding: "0px 16px",
            alignItems: "center",
            paddingTop: "10px ",
            paddingBottom: "10px",
            position: "sticky",
            bottom: "0px",
            zIndex: 100,
            backgroundColor: "white"
          }}
        >
          <p style={{ color: '#012635', lineHeight: '22px', fontSize: '14px', fontWeight: 500 }}>
            Total:{" "}
            {directImportData?.totalResults ? directImportData.totalResults : 0}
          </p>

          <div>
            <PaginationComp
              totalPages={directImportData?.totalPages || 1}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "22px",
                fontWeight: 500,
                color: "#333333",
              }}
            >
              Entries
            </p>

            <div>
              <PaginationDropDown limit={limit} onLimitChange={handleLimitChange} />
            </div>
          </div>
        </div>
        </div>
       
      </div>
      <DirectImportModal />
    </div>
  );
};

export default DirectImportA;
