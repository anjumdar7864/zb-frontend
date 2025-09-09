import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import styles from './Notification.module.css'
import PaginationComp from "./Pagination";
import PaginationDropDown from "./PaginationDropDown";
import { addNotification, REQUEST_TYPES } from "@/utils/constant/url";
import { commonAPICall } from "@/services/api/common";

const TableComponent = ({debouncedSearchTerm , currentPage , setCurrentPage}) => {
    const [numberOfRowsShowing, setNumberOfRowsShowing] = useState(10);
    const [loader, setLoader] = useState(false)
    const [response , setResponse] = useState([])
    // Dummy data for the table
    const data = [
        { id: 1, date: "12-10-2023, 10:00pm", category: "Lorem Ipsum", title: "Lorem Ipsum", description: "Lorem Ipsum is simply dummy text", status: "Cancelled", notificationType: "Email, Popup" },
        { id: 2, date: "12-10-2023, 10:00pm", category: "Lorem Ipsum", title: "Lorem Ipsum", description: "Lorem Ipsum is simply dummy text", status: "Active", notificationType: "Email, Popup" },
        { id: 3, date: "12-10-2023, 10:00pm", category: "Lorem Ipsum", title: "Lorem Ipsum", description: "Lorem Ipsum is simply dummy text", status: "Pending", notificationType: "Email, Popup" },
        { id: 4, date: "12-10-2023, 10:00pm", category: "Lorem Ipsum", title: "Lorem Ipsum", description: "Lorem Ipsum is simply dummy text", status: "Cancelled", notificationType: "Email, Popup" },
        { id: 5, date: "12-10-2023, 10:00pm", category: "Lorem Ipsum", title: "Lorem Ipsum", description: "Lorem Ipsum is simply dummy text", status: "Active", notificationType: "Email, Popup" },
        // Add more dummy data as needed
    ];



    console.log("check array data", response?.results);

    const GetNotification = async (value = 'password') => {
        try {
            setLoader(true);


            const { data, isError, message, sessionExpired } = await commonAPICall(
                `${REQUEST_TYPES.GET}`,
                addNotification(numberOfRowsShowing ,currentPage , debouncedSearchTerm ),

            );
            setLoader(false);
            if (data) {
        
                setResponse(data)

            }


            if (sessionExpired) {
                // sessionStorage.clear()
                dispatch(logOut());
                navigate('/Login');
            }
            if (isError) {
                return toast.error(message);
            }

            setLoader(false);
        } catch (error) {
            console.log(error);
        }
    };

useEffect(()=>{
    
 
    GetNotification()
},[currentPage , numberOfRowsShowing , debouncedSearchTerm])

    const totalResults = response?.totalResults
    const totalPages = response?.totalPages

    const handlePageChange = (event, value) => {
        setCurrentPage(value)
    }


    const handleLimitChange = (event) => {
        setNumberOfRowsShowing(Number(event.target.value));
        setCurrentPage(1);
    };

    function convertTimestampToDate(timestamp) {
        // Create a new JavaScript Date object based on the timestamp (in milliseconds)
        const date = new Date(timestamp);
    
        // Format the date to a readable format (e.g., "YYYY-MM-DD HH:mm:ss")
        const formattedDate =
          date.getFullYear() +
          "-" +
          ("0" + (date.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + date.getDate()).slice(-2) +
          " " +
          ("0" + date.getHours()).slice(-2) +
          ":" +
          ("0" + date.getMinutes()).slice(-2) +
          ":" +
          ("0" + date.getSeconds()).slice(-2);
    
        return formattedDate;
      }


    return (
        <div className={styles.tableContainer}>
            <div className={styles.table}>
                <TableContainer

                    sx={{
                        border: "none",
                        boxShadow: "none",
                        borderBottom: "solid 1px #E0E0E0",
                        flexGrow: 1
                    }}

                    component={Paper}>
                    <Table sx={{ minWidth: 850, border: "none", boxShadow: "none" }} >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ padding: "8px 16px" }}><div className="body4Medium textPrimeryColor">No</div></TableCell>
                                <TableCell sx={{ padding: "8px 16px" }}><div className="body4Medium textPrimeryColor">Date & Time</div></TableCell>
                                <TableCell sx={{ padding: "8px 16px" }}><div className="body4Medium textPrimeryColor">Category</div></TableCell>
                                <TableCell sx={{ padding: "8px 16px" }}><div className="body4Medium textPrimeryColor">Notification Title</div></TableCell>
                                <TableCell sx={{ padding: "8px 16px" }}><div className="body4Medium textPrimeryColor">Description</div></TableCell>
                               
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {response?.results?.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell sx={{ padding: "8px 16px" }}><div className="body4Medium textSecondaryColor">{index + 1 + (numberOfRowsShowing * (currentPage - 1))}</div></TableCell>
                                    <TableCell sx={{ padding: "8px 16px" }}><div className="body4Medium textSecondaryColor">{convertTimestampToDate(row.createdAt)}</div></TableCell>
                                    <TableCell sx={{ padding: "8px 16px" }}><div className="body4Medium textSecondaryColor" style={{
                                        border: `solid 1px ${row.category == "general" ? "#5BF1B2" : row.category == "Warning" ? "#FFC107" : "#EA3815"
                                            }`,
                                        backgroundColor:
                                            row.category == "general" ? "#C2FFEC" : row.category == "Warning" ? "#FFF3CD" : "#FFEEEE",

                                        color: row.category == "general" ? "#00724E" : row.category == "Warning" ? "#FFC107" : "#EA3815",
                                        width: "fit-content",
                                        borderRadius: "13px",
                                        padding: "0px 8px",
                                        fontSize: "12px",
                                        fontWeight: "500",
                                        lineHeight: "22px",
                                    }}>{row.category}</div></TableCell>
                                    <TableCell sx={{ padding: "8px 16px" }}><div className="body4Medium textSecondaryColor">{row.title}</div></TableCell>
                                    <TableCell sx={{ padding: "8px 16px" }}><div className="body4Medium textSecondaryColor">{row.description}</div></TableCell>
                                  
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


                <div
                    className={styles.DesktopPagination}
                    style={{
                        // display: "flex",

                        justifyContent: "space-between",
                        height: "56px",
                        backgroundColor: "white",
                        border: '1px solid #E0E0E0',
                        borderTop: '0px',
                        borderEndEndRadius: "8px",
                        borderEndStartRadius: "8px",
        
                        padding: "0px 16px",
                        alignItems: "center",
                        paddingTop: "10px ",
                        paddingBottom: "10px",
                        // position: "sticky",
                        bottom: "0px",
                        // zIndex: 100,
                        backgroundColor: "white"
                    }}
                >
                    <p style={{ color: '#012635', lineHeight: '22px', fontSize: '14px', fontWeight: 500 }}>
                        Total:{" "}
                        {totalResults ? totalResults : 0}
                    </p>

                    <div>
                        <PaginationComp
                            totalPages={totalPages || 1}
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
                            <PaginationDropDown limit={numberOfRowsShowing} onLimitChange={handleLimitChange} />
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default TableComponent;
