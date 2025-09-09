import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Assets from "@/assets";
import { IoIosArrowBack, IoIosArrowForward, IoMdMore } from 'react-icons/io';
import { commonAPICall } from "@/services/api/common";
import {
  REQUEST_TYPES,
  getPaymentHistoryById,
} from "@/utils/constant/url";
import { styled } from "@mui/material/styles";
import moment from 'moment';
import { capitalizeFirstLetter } from "@/utils/helpers";
import styles from './CompanyA.module.css';
import { CircularProgress } from "@mui/material";
import { CircularLoader } from "@/components/common";
import { toast } from "react-hot-toast";
import PaginationComp from "../DirectImport/Pagination";
import PaginationDropDown from "../DirectImport/PaginationDropDown";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableA = ({pending , setPending}) => {
  const [data, setData] = useState([]);
  const [cloneData, setCloneData] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [focusArrow, setFocusArrow] = useState(null);
  const [paginationCounts, setPaginationCounts] = useState([]);
  const [downloadLoader, setDownloader] = useState("")
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );
  const fetchData = async () => {
    try {
      setLoader(true);
      const { data, isError, message, sessionExpired } = await commonAPICall(
        REQUEST_TYPES.GET,
        getPaymentHistoryById(user?._id)
      );
      setLoader(false);
      // console.log("check pending ----" , pending , message);

      if(message == "Error: Stripe customer ID not found for user" || data?.length == 0 ){
        setPending(true)
        console.log("check pending" , pending , message);

      }
   

      if (sessionExpired) {



        // sessionStorage.clear()
        dispatch(logOut());

        // toast.success("Session Expired")
        navigate("/Login" );


      }
      if (isError) {
        return toast.error(message);
      }

      const totalPages = Math.ceil(data.length / recordsPerPage);
      for (let i = 0; i < totalPages; i++) {
        paginationCounts.push(i + 1);
      }
      const currentRecords = data.slice(0, 10);
      setData(data || []);
      setCloneData(currentRecords)
      setTotalPages(totalPages || 0);
    } catch (error) {
      console.log(error);
    }

    
  };
  useEffect(() => {
    fetchData();
  }, []);
  const downloadInvoice = async (Url, id) => {
    if (Url)
      window.location.href = Url;

    setDownloader(id)
    setTimeout(() => {
      setDownloader("")
    }, 4000);
  }
  const getCurrentRecords = (activePage = 1) => {
    const indexOfLastRecord = activePage * limit;
    const indexOfFirstRecord = indexOfLastRecord - limit;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    return currentRecords;
  }
  console.log("clonedata" , cloneData);
  // const goToNextPage = () => {
  //   if (activePage === totalPages) return false;
  //   const currentRecords = getCurrentRecords(activePage + 1);
  //   setCloneData(currentRecords || [])
  //   setActivePage((prevPage) => Math.min(prevPage + 1, totalPages));
  // };
  // const goToPreviousPage = () => {
  //   if (activePage === 1) return false;
  //   const currentRecords = getCurrentRecords(activePage - 1);
  //   setCloneData(currentRecords || []);
  //   setActivePage((prevPage) => Math.max(prevPage - 1, 1));
  // };
  const selectedPageHandler = (currentPage = 1) => {
    const currentRecords = getCurrentRecords(currentPage);
    setCloneData(currentRecords || [])
    setActivePage(currentPage);
  }

  useEffect(() => {
    getCurrentRecords(currentPage)
  }, [currentPage, limit])

  const handlePageChange = (event, value) => {
    setActivePage(value);
  };

  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value));
    setCurrentPage(1);
  };
  

  return (
    <div>
      {
        cloneData.length < 1 && !pending ?
          <div style={{ paddingLeft: "20px" }}><CircularLoader /></div>
          :
          <div>
            <TableContainer sx={{ boxShadow: "none" }} component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ borderTop: "solid 1px #E0E0E0" }}>
                  <TableRow>
                    <TableCell
                      sx={{ width: "16.6%" }}
                      style={{
                        color: "#012635",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "22px",
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{ width: "16.6%" }}
                      style={{
                        color: "#012635",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "22px",
                      }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      sx={{ width: "16.6%" }}
                      style={{
                        color: "#012635",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "22px",
                      }}
                    >
                      Type&nbsp;
                    </TableCell>
                    <TableCell
                      sx={{ width: "16.6%" }}
                      style={{
                        color: "#012635",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "22px",
                      }}
                    >
                      Amount&nbsp;
                    </TableCell>
                    <TableCell
                      sx={{ width: "16.6%" }}
                      style={{
                        color: "#012635",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "22px",
                      }}
                    >
                      Status&nbsp;
                    </TableCell>
                    <TableCell
                      sx={{ width: "3.6%" }}
                      style={{
                        color: "#012635",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "22px",
                      }}
                      align="right"
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cloneData.length < 1 ? (
                  <TableRow>
                  <TableCell
                    colSpan="6"
                    align="center"
                    style={{
                      border: 0,
                      color: "#999999",
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: "22px",
                      textAlign: "center",
                    }}
                  >
                    No Data Found
                  </TableCell>
                </TableRow>
                  ) :(
                    cloneData.map((row) => (
                      <TableRow key={row?.paymentIntentId} sx={{ "": { border: 0 } }}>
                        <TableCell
                          style={{
                            border: 0,
                            color: "#999999",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "22px",
                          }}
                          component="th"
                          scope="row"
                        >
                          {row?.paymentIntentId?.slice(-7) || "N/A"}
                        </TableCell>
                        <TableCell
                          style={{
                            border: 0,
                            color: "#999999",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "22px",
                          }}
                        >
                          {moment(row?.date).format("MM/DD/YY")}
                        </TableCell>
                        <TableCell
                          style={{
                            border: 0,
                            color: "#999999",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "22px",
                          }}
                        >
                          {capitalizeFirstLetter(row?.type)}
                        </TableCell>
                        <TableCell
                          style={{
                            border: 0,
                            color: "#999999",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "22px",
                          }}
                        >
                          {row?.amount}
                        </TableCell>
                        <TableCell
                          style={{
                            border: 0,
                            color: "#999999",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "22px",
                          }}
                        >
                          {capitalizeFirstLetter(row?.status)}
                        </TableCell>
                        <TableCell
                          style={{
                            border: 0,
                            color: "#999999",
                            fontSize: "14px",
                            fontWeight: 500,
                            lineHeight: "22px",
                          }}
                          align="right"
                        >
                          {
                            downloadLoader == row?.paymentIntentId ?
                              <CircularLoader />
                              :
                              <img style={{ cursor: "pointer" }} onClick={() => downloadInvoice(row?.invoiceUrl, row?.paymentIntentId)} src={Assets.Images.download} />
  
                          }
  
                        </TableCell>
                      </TableRow>
                    ))
                  )}
               
                </TableBody>
              </Table>
            </TableContainer>
      
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: "56px",
                backgroundColor: "white",
                border: '1px solid #E0E0E0',
                borderEndEndRadius: "8px",
                borderEndStartRadius: "8px",
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
                {totalPages || 0}
              </p>

              <div>
                <PaginationComp
                  totalPages={totalPages || 1}
                  currentPage={activePage}
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
      }

    </div>

  );
};

export default TableA;
