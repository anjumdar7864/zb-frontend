import React, { useEffect, useState } from "react";
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
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import styles from "../MarkitMaster.module.css";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import Components from "@/components";
import { MdDelete, MdOutlineCancel, MdRemoveRedEye } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import Assets from "@/assets";
import { HiMiniPlusCircle } from "react-icons/hi2";
import { GoDotFill } from "react-icons/go";
import AddBondNumberModal from "../AddBondNumberModal";
import { useDispatch } from "react-redux";
import {
  deleteOutBoundNumberAndItsRelatedData,
  updateMarketStatus,
} from "@/store/actions/market.action";
import EditBondNumberModal from "../EditBondNumberModal";
import RegisterationInfo from "../RegistrationInfo";
import { toNumber } from "lodash-es";
import SwitchButton from "./SwitchButton";


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
  const {
    row,
    index,
    tenantId,
    updateListing,
    setIsModelOpen,
    setRowId,
    setNumber,
    setStatus,
    setRowData,
    handleRegistrationInfo,
    user,
  } = props;
  const [open, setOpen] = useState(false);
  const [sentToday, setSentToday] = useState(0);
  const [sentMon, setSentMon] = useState(0);
  const [sorting, setSorting] = useState("");



  const activeCount = row?.phoneNumber.filter(
    (row) => row.active === true
  ).length;
  const deactivatedCount = row?.phoneNumber.filter(
    (row) => !!row.active === false
  ).length;

  useEffect(() => {
    if (row?.phoneNumber.length > 0) {
      row?.phoneNumber?.map((data) => {
        setSentToday(+sentToday + +data?.sendDailyMessageCount);
        setSentMon(+sentMon + +data?.sendMonthlyMessageCount);
      });
    }
  }, []);

  useEffect(() => {
    if (row?.phoneNumber?.length > 0) {
      const totalDailySent = row?.phoneNumber.reduce(
        (acc, data) => acc + Number(data?.sendDailyMessageCount || 0),
        0
      );
      const totalMonSent = row?.phoneNumber.reduce(
        (acc, data) => acc + Number(data?.sendMonthlyMessageCount || 0),
        0
      );
      setSentToday(totalDailySent); // Assuming setSentToday expects a single value.
      setSentMon(totalMonSent);
    }
  }, [row, sentToday, sentMon]);

  const shouldShowDeleteIcon = (active, date) => {
    return active === false && (new Date(date) - new Date() > 30 * 24 * 60 * 60 * 1000);
  }

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, border: "none" }}>
        <TableCell
          sx={{ border: "none", padding: "0px" }}
          style={{}}
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
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? (
                  <IoIosArrowUp
                    onClick={() => {
                      if (sorting?.sort === "sortByName=asec") {
                        setSorting("")
                      } else {
                        setSorting({ sort: "sortByName=asec" })

                      }
                    }}
                    style={{ fontSize: "20px", color: "#012635" }}
                  />
                ) : (
                  <IoIosArrowDown
                    onClick={() => {
                      if (sorting?.sort === "sortByName=desc") {
                        setSorting("")
                      } else {
                        setSorting({ sort: "sortByName=desc" })

                      }
                      // setSorting({ sort:"sortByName=desc"})
                    }
                    }
                    style={{ fontSize: "20px", color: "#012635" }}
                  />
                )}
              </IconButton>
              <div
                style={{
                  color: "#012635",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "22px",
                }}
              >
                {row?.name} - {row?.areaCode}
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell
          sx={{ border: "none", padding: "0px" }}
          style={{
            color: "#012635",
            width: "16.75%",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              gap: "8px",
              paddingLeft: "25px",
              backgroundColor: index % 2 == 0 ? "white" : "#F0F0F0",
              height: "56px",
            }}
          >
            {sentToday}
            {/* {row?.sentDay} */}
          </div>
        </TableCell>
        <TableCell
          sx={{ border: "none", padding: "0px" }}
          style={{
            color: "#012635",
            width: "16.75%",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              gap: "8px",
              paddingLeft: "20px",
              backgroundColor: index % 2 == 0 ? "white" : "#F0F0F0",
              height: "56px",
            }}
          >
            {/* {row?.month} */}
            {sentMon}
          </div>
        </TableCell>
        <TableCell
          sx={{ border: "none", padding: "0px" }}
          style={{
            color: "#012635",
            width: "16.75%",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "22px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              gap: "8px",
              paddingLeft: "20px",
              backgroundColor: index % 2 == 0 ? "white" : "#F0F0F0",
              height: "56px",
            }}
          >
            {`1${row?.callForwardingNumber}`}
          </div>
        </TableCell>
        <TableCell
          sx={{ border: "none", padding: "0px" }}
          style={{
            color: "#012635",
            width: "16.75%",
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                // gap: "4px",
                cursor: "pointer",
              }}
            >
              <Components.Common.LightTooltip
                placement="top"
                arrow
                title="Activated"
              >
                <span
                  className="checkIcon-style-modify"
                  style={{
                    color: "#00724E",
                    backgroundColor: "#C2FFEC",
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #5BF1B2",
                    padding: "2px 12px 2px 4px",
                  }}
                >
                  <FaRegCheckCircle
                    className="checkIcon-style-modify-icon"
                    style={{ color: "#00724E", fontSize: "18px" }}
                  />
                  <span
                    style={{
                      marginLeft: "0.5rem",
                      fontSize: "12px",
                      lineHeight: "20px",
                      fontWeight: "500",
                    }}
                  >
                    {activeCount || 0}
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
                    backgroundColor: "#FFEEEE",
                    border: "1px solid #EA3815",
                    display: "flex",
                    alignItems: "center",
                    padding: "2px 12px 2px 4px",
                  }}
                  className="checkIcon-style-modify"
                >
                  <MdOutlineCancel
                    className="checkIcon-style-modify-icon"
                    style={{ color: "#EA3815", fontSize: "18px" }}
                  />
                  <span style={{ marginLeft: "0.5rem" }}>
                    {deactivatedCount || 0}
                  </span>
                </span>
              </Components.Common.LightTooltip>
            </div>
          </div>
        </TableCell>
        {(user.role === "superAdmin" ||
          user.permissions.includes("FC_General")) && (
            <TableCell
              sx={{ border: "none", padding: "0px", minWidth: "157px" }}
              style={{
                color: "#012635",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "22px",
              }}
            >
              {/* {row.Action} */}
              <div style={{ paddingRight: "20px", width: "157px" }}>
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
                  <div style={{ display: "flex", gap: "4px" }}>
                    <AddBondNumberModal
                      title={"Edit Markets"}
                      rowData={row}
                      tenantId={row.tenantId}
                      updateListing={updateListing}
                      index={index}
                    >
                      <img
                        style={{ cursor: "pointer", }}
                        src={Assets.Icons.editFill}
                      />
                    </AddBondNumberModal>
                    {row.registerationStatus != "reject" ? (
                      <AddBondNumberModal
                        isIncriment={true}
                        title={"Add Outbound Number"}
                        rowData={row}
                        tenantId={tenantId}
                        updateListing={updateListing}
                        index={index}
                      >
                        <HiMiniPlusCircle
                          style={{ color: "#00bd82", fontSize: "20px" }}
                        />
                      </AddBondNumberModal>
                    ) : (
                      ""
                    )}
                       <Components.Common.LightTooltip
                placement="top"
                arrow
                title="Carieer B / Carieer WX"
              >
                    {/* <div style={{ paddingLeft: "8px", display: "flex", alignItems: "center", gap: "8px",  }}>
                      
                  
                        <SwitchButton
                          tenantId={tenantId}
                          active={row?.carrierType == "webex" ? true : false}
                          row={row}
                          handleActive={(row, value) => {
                            console.log("row check", row, value);

                          }}
                        />
                      
                     
                      
                    </div> */}
                    </Components.Common.LightTooltip>
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
                    {row?.phoneNumber.map((subRow, subIndex) => (
                      <TableRow key={subRow?.date}>
                        <TableCell
                          style={{
                            border: "none",
                            color: "#777777",
                            fontWeight: 500,
                            fontSize: "14px",
                            padding: "0px",
                          }}
                          component="th"
                          scope="row"
                        >
                          <div
                            style={{
                              display: "flex",
                              paddingLeft: "40px",
                              gap: "8px",
                              alignItems: "end",
                            }}
                          >
                            <img
                              src={Assets.Icons.subArrow}
                              style={{ marginLeft: "10px" }}
                            />
                            <div>{row?.areaCode} </div>
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
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "start",
                              paddingLeft: "0px",
                            }}
                          >
                            {subRow?.sendDailyMessageCount}
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
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "start",
                              paddingLeft: "0px",
                            }}
                          >
                            {subRow?.sendMonthlyMessageCount}
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
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "start",
                              paddingLeft: "0px",
                            }}
                          >{`1${subRow?.number}`}</div>{" "}
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
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                              cursor: "pointer",
                              paddingLeft: "10px",
                            }}
                          >
                            <GoDotFill
                              style={{
                                color:
                                  subRow.active == true ? "#00724E" : "#EA3815",
                              }}
                            />

                            <Components.Common.LightTooltip
                              placement="top"
                              arrow
                              title="Deactivated"
                            >
                              <span
                                style={{
                                  color:
                                    subRow.active == true
                                      ? "#00724E"
                                      : "#EA3815",
                                  backgroundColor:
                                    subRow.active == true
                                      ? "#C2FFEC"
                                      : "#FFEEEE",
                                  border: `1px solid ${subRow.active == true
                                    ? "#5BF1B2"
                                    : "#EA3815"
                                    }`,
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "2px 8px 2px 12px",
                                  gap: "5px",
                                }}
                                className="checkIcon-style-modify"
                                onClick={() => {
                                  if (
                                    user.role === "superAdmin" ||
                                    user.permissions.includes("FC_General")
                                  ) {
                                    setIsModelOpen(true);
                                    setRowId(row._id);
                                    setNumber(subRow.number);
                                    setStatus(
                                      subRow?.active
                                        ? "Deactivate"
                                        : "Activated"
                                    );
                                    setRowData({
                                      data: row?.phoneNumber,
                                      index: index,
                                      subIndex: subIndex,
                                    });
                                  }
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "12px",
                                    lineHeight: "20px",
                                    fontWeight: "500",
                                  }}
                                >
                                  {subRow?.active == true
                                    ? "Active"
                                    : "inactive"}
                                </span>
                              </span>
                            </Components.Common.LightTooltip>
                          </div>
                        </TableCell>
                        {(user.role === "superAdmin" ||
                          user.permissions.includes("FC_General")) && (
                            <TableCell
                              style={{
                                width: "150px",
                                border: "none",
                                color: "#777777",
                                fontWeight: 500,
                                fontSize: "14px",
                              }}
                            >
                              <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                                <EditBondNumberModal
                                  isIncriment={true}
                                  rootData={row}
                                  title={"Add Outbound Number"}
                                  rowData={subRow}
                                  phoneNumber={`1${subRow?.number}`}
                                  tenantId={tenantId}
                                  updateListing={updateListing}
                                  index={index}
                                >
                                  <img src={Assets.Icons.editFill} />
                                </EditBondNumberModal>

                                {/* <MdRemoveRedEye
                                onClick={() =>
                                  handleRegistrationInfo({
                                    row: row,
                                    subRow: subRow,
                                  })
                                }
                                style={{
                                  color: "#777777",
                                  fontSize: "20px",
                                  cursor: "pointer",
                                }}
                              /> */}
                                {
                                  shouldShowDeleteIcon(subRow.active, subRow?.date) ? <MdDelete
                                    onClick={() => {
                                      setStatus("delete");
                                      setIsModelOpen(true);
                                      setRowId(row._id);
                                      setNumber(subRow.number);
                                    }}
                                    style={{
                                      color: "#777777",
                                      fontSize: "20px",
                                      cursor: "pointer",
                                    }}
                                  /> : ""
                                }

                              </div>
                            </TableCell>
                          )}
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
  createData("Georgia 2 - 789", 4951, 37168, 4075042171, 4.0, 3.99, 8),
  createData("Texas - Forth Woth", 4951, 37168, 4075042171, 4.3, 4.99, 7),
  createData("Georgia 2", 4951, 37168, 4075042171, 6.0, 3.79, 6),
  createData("Texas - Forth Woth", 4951, 37168, 4075042171, 4.3, 2.5, 6),
  createData("Georgia 2 - 789", 4951, 37168, 4075042171, 3.9, 1.5, 4),
];

export default function TennentInfoTable({
  markets,
  tenantId,
  handleRefreshTableInfo,
  user,
  tenatData,
  sorting,
  setSorting,
}) {
  const [marketsArr, setMarketsArr] = React.useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rowId, setRowId] = useState("");
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (markets != undefined) {
      setMarketsArr(markets);
    }
  }, [markets]);
  const updateListing = (data, index) => {
    // const cloneData = [...markets];
    // cloneData[index] = data;
    // setMarketsArr(cloneData)
    handleRefreshTableInfo();
  };

  const handleActionConfirm = () => {
    // console.log("oday button working" , number , rowId , status );
    // handleRefreshTableInfo()
    if (status != "delete") {
      dispatch(
        updateMarketStatus(
          {
            body: {
              active: status == "Activated" ? true : false,
              tenantId: tenantId,
            },

            phone: number,
          },
          () => {
            setIsLoading(false);
            setIsModelOpen(false);
            handleRefreshTableInfo();
          }
        )
      );
    } else {
      dispatch(
        deleteOutBoundNumberAndItsRelatedData(
          {
            // body: {
            //   active: status == "Activated" ? true : false,
            //   tenantId:tenantId ,
            // },

            number: number,
            tenantId: tenantId,
          },
          () => {
            setIsLoading(false);
            setIsModelOpen(false);
            handleRefreshTableInfo();
          }
        )
      );
    }
  };

  const handleRegistrationInfo = (data) => {
    // console.log("data check" , data);

    setOpen(true);
  };

  let totalSendMonthlyMessageCount = 0;
  let totalSendDailyMessageCount = 0;
  if (marketsArr?.length > 0) {
    marketsArr?.forEach((result) => {
      (result.phoneNumber || []).forEach((phoneNumber) => {
        totalSendMonthlyMessageCount +=
          phoneNumber.sendMonthlyMessageCount || 0;
        totalSendDailyMessageCount += phoneNumber.sendDailyMessageCount || 0;
      });
    });
  }
  const calculateDailyLimit = (monthlyLimit) => {
    // Calculate the daily limit
    return Math.floor(monthlyLimit / 28); // Use Math.floor to round down to the nearest whole number
  };
  const dailyOutBoundNumber = calculateDailyLimit(
    tenatData?.subscriptionId?.monthlyOutBoundNumber
      ? tenatData?.subscriptionId?.monthlyOutBoundNumber
      : 0
  );
  const calculatePercentage = (sentCount, limit) => {
    if (limit === 0) return 0; // Avoid division by zero
    return (sentCount / limit) * 100;
  };
  return (
    <TableContainer
      className={styles.custom_scrollbar}
      sx={{ position: "relative" }}
      component={Paper}
    >
      <Table
        sx={{
          minWidth: "1150px !important",
          border: "none",
          boxShadow: "none",
        }}
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
                Market Name
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <BiSolidUpArrow
                    onClick={() => {
                      if (sorting?.sort === "sortByName=asec") {
                        setSorting("")
                      } else {
                        setSorting({ sort: "sortByName=asec" })

                      }
                    }}
                    style={{ color: sorting?.sort === "sortByName=asec" ? "#00BD82" : "#777777", fontSize: "10px" }}
                  />
                  <BiSolidDownArrow
                    onClick={() => {
                      if (sorting?.sort === "sortByName=desc") {
                        setSorting("")
                      } else {
                        setSorting({ sort: "sortByName=desc" })

                      }
                      // setSorting({ sort:"sortByName=desc"})
                    }
                    }
                    style={{ color: sorting?.sort === "sortByName=desc" ? "#00BD82" : "#777777", fontSize: "10px" }}
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
                <div>
                  Sent Today
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 500,
                        fontSize: "12px",
                        lineHeight: "20px",
                        color: "#012635",
                      }}
                    >
                      {`${parseFloat(
                        calculatePercentage(
                          totalSendDailyMessageCount,
                          dailyOutBoundNumber +
                          tenatData?.dailyExtraOutBoundMessage
                        )
                      ).toFixed(2)}%`}
                    </div>
                    <div
                      style={{
                        backgroundColor: "#D9D9D9",
                        width: "69px",
                        borderRadius: "100px",
                        height: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: `${parseFloat(
                            calculatePercentage(
                              totalSendDailyMessageCount,
                              dailyOutBoundNumber +
                              tenatData?.dailyExtraOutBoundMessage
                            )
                          ).toFixed(2)}%`,
                          backgroundColor: "#00BD82",
                          borderRadius: "100px",
                          height: "100%",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <BiSolidUpArrow
                    onClick={() => {
                      if (sorting?.sort === "sortByToday=asec") {
                        setSorting("")
                      } else {
                        setSorting({ sort: "sortByToday=asec" })

                      }
                    }}
                    style={{ color: sorting?.sort === "sortByToday=asec" ? "#00BD82" : "#777777", fontSize: "10px" }}
                  />
                  <BiSolidDownArrow
                    onClick={() => {
                      if (sorting?.sort === "sortByToday=desc") {
                        setSorting("")
                      } else {
                        setSorting({ sort: "sortByToday=desc" })

                      }
                      // setSorting({ sort:"sortByToday=desc"})
                    }
                    }
                    style={{ color: sorting?.sort === "sortByToday=desc" ? "#00BD82" : "#777777", fontSize: "10px" }}
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
                <div>
                  Sent This Month
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 500,
                        fontSize: "12px",
                        lineHeight: "20px",
                        color: "#012635",
                      }}
                    >
                      {`${parseFloat(
                        calculatePercentage(
                          totalSendMonthlyMessageCount,
                          tenatData?.subscriptionId?.monthlyOutBoundNumber +
                          tenatData?.monthlyExtraOutBoundMessage
                        )
                      ).toFixed(2)}%`}
                    </div>
                    <div
                      style={{
                        backgroundColor: "#D9D9D9",
                        width: "69px",
                        borderRadius: "100px",
                        height: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: `${parseFloat(
                            calculatePercentage(
                              totalSendMonthlyMessageCount,
                              tenatData?.subscriptionId?.monthlyOutBoundNumber +
                              tenatData?.monthlyExtraOutBoundMessage
                            )
                          ).toFixed(2)}%`,
                          backgroundColor: "#00BD82",
                          borderRadius: "100px",
                          height: "100%",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <BiSolidUpArrow
                    onClick={() => {
                      if (sorting?.sort === "sortByMonth=asec") {
                        setSorting("")
                      } else {
                        setSorting({ sort: "sortByMonth=asec" })

                      }
                    }}
                    style={{ color: sorting?.sort === "sortByMonth=asec" ? "#00BD82" : "#777777", fontSize: "10px" }}
                  />
                  <BiSolidDownArrow
                    onClick={() => {
                      if (sorting?.sort === "sortByMonth=desc") {
                        setSorting("")
                      } else {
                        setSorting({ sort: "sortByMonth=desc" })

                      }
                      // setSorting({ sort:"sortByMonth=desc"})
                    }
                    }
                    style={{ color: sorting?.sort === "sortByMonth=desc" ? "#00BD82" : "#777777", fontSize: "10px" }}
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
                Call forwarding/outbound number
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <BiSolidUpArrow
                    onClick={() => {
                      if (sorting?.sort === "sortByPhoneNumber=asec") {
                        setSorting("")
                      } else {
                        setSorting({ sort: "sortByPhoneNumber=asec" })

                      }
                    }}
                    style={{ color: sorting?.sort === "sortByPhoneNumber=asec" ? "#00BD82" : "#777777", fontSize: "10px" }}
                  />
                  <BiSolidDownArrow
                    onClick={() => {
                      if (sorting?.sort === "sortByPhoneNumber=desc") {
                        setSorting("")
                      } else {
                        setSorting({ sort: "sortByPhoneNumber=desc" })

                      }
                      // setSorting({ sort:"sortByPhoneNumber=desc"})
                    }
                    }
                    style={{ color: sorting?.sort === "sortByPhoneNumber=desc" ? "#00BD82" : "#777777", fontSize: "10px" }}
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
                Registration Status
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <BiSolidUpArrow
                    onClick={() => {
                      if (sorting?.sort === "sortByStatus=asec") {
                        setSorting("")
                      } else {
                        setSorting({ sort: "sortByStatus=asec" })

                      }
                    }}
                    style={{ color: sorting?.sort === "sortByStatus=asec" ? "#00BD82" : "#777777", fontSize: "10px" }}
                  />
                  <BiSolidDownArrow
                    onClick={() => {
                      if (sorting?.sort === "sortByStatus=desc") {
                        setSorting("")
                      } else {
                        setSorting({ sort: "sortByStatus=desc" })

                      }
                      // setSorting({ sort:"sortByStatus=desc"})
                    }
                    }
                    style={{ color: sorting?.sort === "sortByStatus=desc" ? "#00BD82" : "#777777", fontSize: "10px" }}
                  />
                </div>
              </div>
            </TableCell>
            {(user.role === "superAdmin" ||
              user.permissions.includes("FC_General")) && (
                <TableCell
                  style={{
                    color: "#012635",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "22px",
                    width: "150px",
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
          {marketsArr?.map((row, index) => {
            // console.log("check market data..." , index,row);

            return (
              <Row
                handleRegistrationInfo={handleRegistrationInfo}
                setRowData={setRowData}
                setStatus={setStatus}
                setNumber={setNumber}
                setRowId={setRowId}
                setIsModelOpen={setIsModelOpen}
                key={index}
                row={row}
                index={index}
                tenantId={tenantId}
                updateListing={updateListing}
                user={user}
              />
            );
          })}
        </TableBody>
      </Table>
      <Components.Common.WarningModal
        onClose={() => {
          setIsModelOpen(false);
          setSelectedDeleteId("");
        }}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onOkay={handleActionConfirm} // Confirm delete when "Okay" is clicked
        open={isModelOpen}
        WarningItemTitle={`Are you sure want to ${status}?`}
        WarningItemName="Direct Import"
        warningItemText={`Are you sure you want to  ${status} this outbound number? This action cannot be undone.`}
      />
      <RegisterationInfo open={open} setOpen={setOpen} tenantId={tenantId} />
    </TableContainer>
  );
}
