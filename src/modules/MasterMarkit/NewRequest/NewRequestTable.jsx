import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "../MarkitMaster.module.css";
import {
  acceptNewRequestOfMarket,
  rejectNewRequestOfMarket,
} from "@/store/actions/market.action";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import Assets from "@/assets";
import AddBondNumberModal from "../AddBondNumberModal";
import { CircularLoader } from "@/components/common";

function createData(name, sentDay, month, call, Registration, price, Action) {
  return {
    name,
    sentDay,
    month,
    call,
    Registration,
    Action,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row, index, user } = props;
  const [open, setOpen] = React.useState(false);
  const [acceptLoading, setAcceptLoading] = useState({});
  const [rejectLoading, setRejectLoading] = useState({});
  const dispatch = useDispatch();
  const { marketsData } = useSelector((s) => s.marketReducer);

  const handleReject = async (marketId) => {
    setRejectLoading((prev) => ({ ...prev, [marketId]: true }));
    await dispatch(
      rejectNewRequestOfMarket({ marketId }, () => {
        toast.success("Market request has been rejected");
        setRejectLoading((prev) => ({ ...prev, [marketId]: false }));
        props.fetchData();
      })
    );
    setRejectLoading((prev) => ({ ...prev, [marketId]: false }));
  };

  // const handleAccept = async (marketId) => {
  //   setAcceptLoading((prev) => ({ ...prev, [marketId]: true }));
  //    await dispatch(
  //     acceptNewRequestOfMarket({ marketId }, () => {
  //       toast.success("Market request has been accepted");
  //       setAcceptLoading((prev) => ({ ...prev, [marketId]: false }));
  //       props.fetchData();
  //     })
  //   );
  //   console.log("check response" , response);
    
  //   setAcceptLoading((prev) => ({ ...prev, [marketId]: false }));
  // };


  // const  handleAccept = (marketId) =>{

  // }

  const refresh = () =>{
    props.fetchData();
  }

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          border: "none",
          boxShadow: "none",
        }}
      >
        <TableCell
          sx={{ border: "none", width: "25%", padding: "0px" }}
          component="th"
          scope="row"
        >
          <div style={{ paddingLeft: "20px", height: "56px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                paddingLeft: "20px",
                backgroundColor: index % 2 == 0 ? "white" : "#F0F0F0",
                height: "56px",
                borderTopLeftRadius: "8px",
                borderEndStartRadius: open ? "0px" : "8px",
              }}
            >
              {/* <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? (
                  <IoIosArrowUp
                    style={{ fontSize: "20px", color: "#012635" }}
                  />
                ) : (
                  <IoIosArrowDown
                    style={{ fontSize: "20px", color: "#012635" }}
                  />
                )}
              </IconButton> */}
              <div
                style={{
                  color: "#012635",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "22px",
                }}
              >
                {/* {`${row.tenantId.firstName} ${row.tenantId.lastName}`} */}
                {row?.tenantName}
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell
          sx={{ border: "none", width: "16.75%", padding: "0px" }}
          style={{
            color: "#012635",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              paddingLeft: "20px",
              backgroundColor: index % 2 == 0 ? "white" : "#F0F0F0",
              height: "56px",
            }}
          >
            {row.name}
          </div>
        </TableCell>

        <TableCell
          sx={{ border: "none", width: "16.75%", padding: "0px" }}
          style={{
            color: "#012635",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
          }}
        >
          {/* {row.Registration} */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              paddingLeft: "20px",
              backgroundColor: index % 2 == 0 ? "white" : "#F0F0F0",
              height: "56px",
            }}
          >
          {`1${row.callForwardingNumber}`}
          </div>
        </TableCell>
        {(user.role === 'superAdmin' || user.permissions.includes('FC_New Request')) && (
        <TableCell
          sx={{ border: "none", width: "8%", padding: "0px" }}
          style={{
            color: "#012635",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
          }}
        >
          {/* {row.Action} */}
          
          <div style={{ paddingRight: "20px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                paddingLeft: "20px",
                backgroundColor: index % 2 == 0 ? "white" : "#F0F0F0",
                height: "56px",
                borderTopRightRadius: "8px",
                borderEndEndRadius: open ? "0px" : "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  justifyContent: "center",
                }}
              >
              
                <button
                disabled={marketsData?.rejectLoading}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#EA3815",
                  width: "66px",
                  height: "32px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "22px",
                  borderRadius: "8px",
                }}
                onClick={() => handleReject(row._id)}
              >
                {rejectLoading[row._id] ?  <div style={{paddingTop:"5px"}}><CircularLoader color={"white"}/></div> : "Decline"}
              </button>

                <AddBondNumberModal refresh={refresh} rowData={row} title="Add Outbound Number">
                <button
                  disabled={marketsData?.acceptLoading}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#06AB78",
                    width: "66px",
                    height: "32px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "22px",
                    borderRadius: "8px",
                  }}
                  // onClick={() => handleAccept(row._id)}

                >
                  {acceptLoading[row._id] ? "Please wait..." : "Accept"}
                </button>
                </AddBondNumberModal>
              </div>
            </div>
          </div>
         
        </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: "0px 20px ", border: "none" }} colSpan={6}>
          <div
            style={{
              backgroundColor: index % 2 == 0 ? "white" : "#F0F0F0",
              borderEndEndRadius: "8px",
              borderEndStartRadius: "8px",
            }}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: "10px 0px" }}>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                    {row?.history?.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell
                          style={{
                            width: "25%",
                            border: "none",
                            color: "#777777",
                            fontWeight: 500,
                            fontSize: "14px",
                          }}
                          component="th"
                          scope="row"
                        ></TableCell>

                        <TableCell
                          style={{
                            width: "16.75%",
                            border: "none",
                            color: "#777777",
                            fontWeight: 500,
                            fontSize: "14px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                              alignItems: "end",
                            }}
                          >
                            <img
                              src={Assets.Icons.subArrow}
                              style={{ marginLeft: "10px" }}
                            />
                            <div>- 789 </div>
                          </div>
                        </TableCell>
                        <TableCell
                          style={{
                            width: "16.75%",
                            border: "none",
                            color: "#777777",
                            fontWeight: 500,
                            fontSize: "14px",
                          }}
                        >
                          {/* {historyRow.amount} */}
                          4075042171
                        </TableCell>
                        <TableCell
                          style={{
                            width: "8%",
                            border: "none",
                            color: "#777777",
                            fontWeight: 500,
                            fontSize: "14px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "6px",
                              justifyContent: "center",
                            }}
                          >
                            <div
                              style={{
                                backgroundColor: "#EA3815",
                                width: "66px",
                                height: "32px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "white",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "22px",
                                borderRadius: "8px",
                                cursor: "pointer",
                              }}
                            >
                              Decline
                            </div>
                            <div
                              style={{
                                backgroundColor: "#06AB78",
                                width: "66px",
                                height: "32px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "white",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "22px",
                                borderRadius: "8px",
                              }}
                            >
                              {/* Accept */}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </div>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    sentDay: PropTypes.number.isRequired,
    call: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    Registration: PropTypes.number.isRequired,
    Action: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData("Omid", "Georgia 2 - 789", 4075042171, 4.0, 3.99, 8),
  createData("Vijay", "Texas - Forth Woth", 4075042171, 4.3, 4.99, 7),
  createData("Omid", "Georgia 2 - 789", 4075042171, 6.0, 3.79, 6),
  createData("Vijay", "Texas - Forth Woth", 4075042171, 4.3, 2.5, 6),
  createData("Omid", "Georgia 2 - 789", 4075042171, 3.9, 1.5, 4),
];

export default function NewRequestTable({ data = [], fetchData, user , sorting , setSorting}) {
  return (
    <TableContainer
      className={styles.custom_scrollbar}
      sx={{ flexGrow: 1, position: "relative", boxShadow: "none" }}
      component={Paper}
    >
      <Table
        sx={{ minWidth: "1150px !important", border: "none" }}
        aria-label="collapsible table"
      >
        <TableHead
          style={{
            position: "sticky",
            top: "0px",
            zIndex: 100,
            backgroundColor: "white",
          }}
        >
          <TableRow>
            <TableCell
              style={{
                color: "#012635",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "22px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                Tenant name
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <BiSolidUpArrow
                    onClick={() =>{
                      if(sorting?.sort === "sortByTenantName=asec"){
                        setSorting("")
                      }else{
                        setSorting({sort:"sortByTenantName=asec"})
    
                      }
                      }}
                    style={{  color:sorting?.sort === "sortByTenantName=asec" ? "#00BD82" : "#777777", fontSize: "10px" , cursor:"pointer" }}
                  />
                  <BiSolidDownArrow
                   onClick={() =>{
                    if(sorting?.sort === "sortByTenantName=desc"){
                      setSorting("")
                    }else{
                      setSorting({sort:"sortByTenantName=desc"})
  
                    }
                    // setSorting({ sort:"sortByTenantName=desc"})
                  }
                  }
                    style={{  color:sorting?.sort === "sortByTenantName=desc" ? "#00BD82" : "#777777", fontSize: "10px" , cursor:"pointer" }}
                  />
                </div>
              </div>
            </TableCell>

            <TableCell
              style={{
                color: "#012635",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "22px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                Market Name
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <BiSolidUpArrow
                   onClick={() =>{
                    if(sorting?.sort === "sortByMarketName=asec"){
                      setSorting("")
                    }else{
                      setSorting({sort:"sortByMarketName=asec"})
  
                    }
                    }}
                    style={{  color:sorting?.sort === "sortByMarketName=asec" ? "#00BD82" : "#777777", fontSize: "10px" }}
                  />
                  <BiSolidDownArrow
                     onClick={() =>{
                      if(sorting?.sort === "sortByMarketName=desc"){
                        setSorting("")
                      }else{
                        setSorting({sort:"sortByMarketName=desc"})
    
                      }
                      // setSorting({ sort:"sortByName=desc"})
                    }
                    }
                    style={{ color:sorting?.sort === "sortByMarketName=desc" ? "#00BD82" : "#777777", fontSize: "10px" }}
                  />
                </div>
              </div>
            </TableCell>
            <TableCell
              style={{
                color: "#012635",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "22px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                Call Forwarding Number
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <BiSolidUpArrow
                     onClick={() =>{
                      if(sorting?.sort === "sortByCallForwardingNumber=asec"){
                        setSorting("")
                      }else{
                        setSorting({sort:"sortByCallForwardingNumber=asec"})
    
                      }
                      }}
                    style={{ color:sorting?.sort === "sortByCallForwardingNumber=asec" ? "#00BD82" : "#777777", fontSize: "10px" }}
                  />
                  <BiSolidDownArrow
                    onClick={() =>{
                      if(sorting?.sort === "sortByCallForwardingNumber=desc"){
                        setSorting("")
                      }else{
                        setSorting({sort:"sortByCallForwardingNumber=desc"})
    
                      }
                      // setSorting({ sort:"sortByName=desc"})
                    }
                    }
                    style={{ color:sorting?.sort === "sortByCallForwardingNumber=desc" ? "#00BD82" : "#777777", fontSize: "10px" }}
                  />
                </div>
              </div>
            </TableCell>
            {(user.role === 'superAdmin' || user.permissions.includes('FC_New Request')) && (
            <TableCell
              style={{
                color: "#012635",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "22px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                Action
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <BiSolidUpArrow
                    style={{ color: "#777777", fontSize: "10px" }}
                  />
                  <BiSolidDownArrow
                    style={{ color: "#777777", fontSize: "10px" }}
                  />
                </div>
              </div>
            </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data?.length
            ? data.map((item, index) => (
                <Row
                  key={index}
                  row={item}
                  index={index}
                  fetchData={fetchData}
                  user={user}
                />
              )) :
            <TableCell colSpan={5} align="center" sx={{ padding: "16px" , borderBottom:"0px" }}>
              <div style={{fontSize:"14px" , color:"#212529"}}>
              No Record Found!

              </div>
          </TableCell>}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
