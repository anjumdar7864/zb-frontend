import Components from "@/components";
import { remToPixels } from "@/utils";
import { FaChevronDown, FaRegCheckCircle } from "react-icons/fa";
import { PiArrowElbowDownRightBold, PiPencilSimpleFill } from "react-icons/pi";
import { Progress } from "react-sweet-progress";
import {
  MarketListTableUserStyled,
  TableExtraRowStyled,
  TableRowStyled,
  CircularProgressbarStyled,
  LightTooltip,
} from "./styles";
import { buildStyles } from "react-circular-progressbar";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/hooks";
import { motion } from "framer-motion";

import { useSelector } from "react-redux";
import { BackgroundColor } from "@/styles/color";
import PaginationDropDown from "@/modules/DirectImport/PaginationDropDown";
import PaginationComp from "@/modules/DirectImport/Pagination";
import Assets from "@/assets";
import {
  MdDelete,
  MdMoreVert,
  MdOutlineCancel,
  MdRemoveRedEye,
} from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { AiFillPlusCircle } from "react-icons/ai";
import { IoMdMore } from "react-icons/io";
import MorePopover from "./MorePopover";
import { IoEye } from "react-icons/io5";
import { HiMiniPlusCircle } from "react-icons/hi2";
import { logOut } from "@/store/actions";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

const MarketListTableUser = ({
  setEditMarket,
  setEditMarketList,
  setCurrentPage,
  setNumberOfRowsShowing,
  currentPage,
  numberOfRowsShowing,
  search,
  setIsDlcModelOpen,
  user , 
  sorting , 
  setSorting 
}) => {
  const [sortingInfo, setSortingInfo] = useState({
    sortedBy: "",
    direction: 0,
  });
  const { windowWidth, isLarge } = useGlobalContext();
  const { marketsData } = useSelector((s) => s.marketReducer);
  // const [sorting, setSorting] = useState("");
  const [limit, setLimit] = useState(10);

  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value));
    setCurrentPage(1);
  };
  const handleSort = (sortedBy) => {
    setSortingInfo((p) => {
      if (p.sortedBy !== sortedBy) {
        return { direction: 1, sortedBy };
      } else {
        return { ...p, direction: p.direction === 1 ? -1 : 1 };
      }
    });
  };
  let totalSendMonthlyMessageCount = 0;
  let totalSendDailyMessageCount = 0;

  if (marketsData?.results?.length > 0) {
    marketsData.results.forEach((result) => {
      (result.phoneNumber || []).forEach((phoneNumber) => {
        totalSendMonthlyMessageCount +=
          phoneNumber.sendMonthlyMessageCount || 0;
        totalSendDailyMessageCount += phoneNumber.sendDailyMessageCount || 0;
      });
    });
  }
  const calculateDailyLimit = (monthlyLimit) => {
    // Get the current date
    const now = new Date();

    // Get the number of days in the current month
    // const daysInMonth = new Date(
    //   now.getFullYear(),
    //   now.getMonth() + 1,
    //   0
    // ).getDate();

    // Calculate the daily limit
    return Math.floor(monthlyLimit / 28); // Use Math.floor to round down to the nearest whole number
  };
  const dailyOutBoundNumber = calculateDailyLimit(
    marketsData?.tenantSubscription?.monthlyOutBoundNumber
      ? marketsData?.tenantSubscription?.monthlyOutBoundNumber
      : 0
  );
  const calculatePercentage = (sentCount, limit) => {
    if (limit === 0) return 0; // Avoid division by zero
    return (sentCount / limit) * 100;
  };
  const type = localStorage.getItem("type") ?? localStorage.getItem("type");
  return (
    <MarketListTableUserStyled

    // tableWidth={
    //   windowWidth -
    //   remToPixels(7) -
    //   remToPixels(2.6 + 3) -
    //   (isLarge ? 0 : remToPixels(26))
    // }
    >
      <div
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
        className="bottom"
      >
        <div style={{ flexGrow: 1, overflow: "auto", position: "relative" }}>
          <div style={{ width: "100%", minWidth: "1520px" }} className="table">
            <div
              className="row"
              style={{
                borderBottom: "solid 1px #E0E0E0",
                // gap: "10px",
                position: "sticky",
                top: "0px",
                zIndex: 100,
                backgroundColor: "white",
              }}
            >
              <h6
                className="col"
                style={{ minWidth: "400px" }}
                onClick={() => handleSort("name")}
              >
                <span
                  className={`text  ${sortingInfo.sortedBy === "name" ? "select" : ""
                    }`}
                  style={{
                    marginRight: ".4rem",
                    color: "#012635",
                    fontSize: "14px",
                    lineHeight: "22px",
                    fontWeight: "500",
                  }}
                >
                  Market Name
                </span>
                {/* <Components.Common.SortIcon
                  direction={sortingInfo.direction}
                  isSorted={sortingInfo.sortedBy === "name"}
                /> */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "0.8rem",
                    width: "fit-content",
                  }}
                >
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
              </h6>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              // className="col"
              >
                <h6
                  // className="col"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span
                      className={`text`}
                      style={{
                        marginRight: ".4rem",
                        color: "#012635",
                        fontSize: "14px",
                        lineHeight: "22px",
                        fontWeight: "500",
                      }}
                    >
                      Sent Today
                    </span>

                    <LightTooltip
                      title={
                        <>
                          <p style={{ fontWeight: "bold" }}>
                            Daily Message Limit
                          </p>
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
                    />
                  </div>
                  {(user.role === 'admin' || user.permissions.includes('View Market and Limit Stats')) && (

                    <div
                      id="item"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
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
                            marketsData?.dailyExtraOutBoundMessage
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
                                marketsData?.dailyExtraOutBoundMessage
                              )
                            ).toFixed(2)}%`,
                            backgroundColor: "#00BD82",
                            borderRadius: "100px",
                            height: "100%",
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                  {/* <div style={{ marginTop: "0.5rem" }}>
                  <div className="item">
                    <Progress
                      percent={75}
                      theme={{
                        active: {
                          color: "#00BD82",
                        },
                      }}
                    />
                  </div>
                </div> */}
                </h6>

                {/* <Components.Common.SortIcon
                  direction={sortingInfo.direction}
                  isSorted={sortingInfo.sortedBy === "callForwardingNumber"}
                /> */}

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <BiSolidUpArrow
                    onClick={() => {
                      if (sorting?.sort === "sortByToday=asec") {
                        setSorting("")
                      } else {
                        setSorting({ sort: "sortByToday=asec" })

                      }
                    }}
                    style={{ color: sorting?.sort === "sortByToday=asec" ? "#00BD82" : "#777777", fontSize: "10px" , cursor:"pointer" }}
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
                    style={{ color: sorting?.sort === "sortByToday=desc" ? "#00BD82" : "#777777", fontSize: "10px" , cursor:"pointer" }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h6
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span
                      className={`text`}
                      style={{
                        marginRight: ".4rem",
                        color: "#012635",
                        fontSize: "14px",
                        lineHeight: "22px",
                        fontWeight: "500",
                      }}
                    >
                      Sent This Month
                    </span>

                    <LightTooltip
                      title={
                        <>
                          <p style={{ fontWeight: "bold" }}>
                            Daily Message Limit
                          </p>
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
                    />
                  </div>
                  {(user.role === 'admin' || user.permissions.includes('View Market and Limit Stats')) && (
                    <div
                      id="item"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
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
                            marketsData?.tenantSubscription
                              ?.monthlyOutBoundNumber +
                            marketsData?.monthlyExtraOutBoundMessage
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
                                marketsData?.tenantSubscription
                                  ?.monthlyOutBoundNumber +
                                marketsData?.monthlyExtraOutBoundMessage
                              )
                            ).toFixed(2)}%`,
                            backgroundColor: "#00BD82",
                            borderRadius: "100px",
                            height: "100%",
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                  {/* <div style={{ marginTop: "0.5rem" }}>
                  <div className="item">
                    <Progress
                      percent={75}
                      theme={{
                        active: {
                          color: "#00BD82",
                        },
                      }}
                    />
                  </div>
                </div> */}
                </h6>

                {/* <Components.Common.SortIcon
                  direction={sortingInfo.direction}
                  isSorted={sortingInfo.sortedBy === "callForwardingNumber"}
                /> */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <BiSolidUpArrow
                    onClick={() => {
                      if (sorting?.sort === "sortByMonth=asec") {
                        setSorting("")
                      } else {
                        setSorting({ sort: "sortByMonth=asec" })

                      }
                    }}
                    style={{ color: sorting?.sort === "sortByMonth=asec" ? "#00BD82" : "#777777", fontSize: "10px" , cursor:"pointer" }}
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
                    style={{ color: sorting?.sort === "sortByMonth=desc" ? "#00BD82" : "#777777", fontSize: "10px" , cursor:"pointer" }}
                  />
                </div>
              </div>

              <h6 className="col">
                <span
                  className={`text`}
                  style={{
                    color: "#012635",
                    fontSize: "14px",
                    lineHeight: "22px",
                    fontWeight: "500",
                  }}
                >
                  Call Forwarding Number
                </span>
                {/* <Components.Common.SortIcon
                  direction={sortingInfo.direction}
                  isSorted={sortingInfo.sortedBy === "callForwardingNumber"}
                /> */}

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
                  style={{
                    color: "#012635",
                    fontSize: "14px",
                    lineHeight: "22px",
                    fontWeight: "500",
                  }}
                >
                  Registration Status
                </span>
                {/* <Components.Common.SortIcon
                  direction={sortingInfo.direction}
                  isSorted={sortingInfo.sortedBy === "callForwardingNumber"}
                /> */}
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
              </h6>
              {/* {(type === "admin" ||  user.permissions.includes('Request New Market')  ) && ( */}
              <h6
                className="col"
                style={{ width: "10%", maxWidth: "150px" }}
              // onClick={() => handleSort("callForwardingNumber")}
              >
                <span
                  className={`text`}
                  style={{
                    color: "#012635",
                    fontSize: "14px",
                    lineHeight: "22px",
                    fontWeight: "500",
                  }}
                >
                  Actions
                </span>
                {/* <Components.Common.SortIcon
                  direction={sortingInfo.direction}
                  isSorted={sortingInfo.sortedBy === "actions"}
                /> */}
              </h6>
              {/* )} */}
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
                user={user}
              />
            ))}
          </div>
        </div>
        {marketsData.length !== 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: "56px",
              backgroundColor: "white",
              borderTop: "solid 1px #E0E0E0",
              borderEndEndRadius: "12px",
              borderBottomLeftRadius: "12px",
              padding: "0px 16px",
              alignItems: "center",
              paddingTop: "10px ",
              paddingBottom: "10px",
            }}
          >
            <div>Total: {marketsData?.totalResults ?? 0}</div>

            <div>
              <PaginationComp
                totalPages={1}
                currentPage={currentPage}
                onChange={(p) => setCurrentPage(p)}
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
        )}
      </div>
    </MarketListTableUserStyled>
  );
};

export default MarketListTableUser;

const TableRow = ({
  setEditMarket,
  singleMarketData,
  limit,
  page,
  search,
  setIsDlcModelOpen,
  user
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sentToday, setSentToday] = useState(0);
  const [sentMon, setSentMon] = useState(0);
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
  const formateNumber = (number = "") => {
    const formattedValue = number.replace(/\D/g, "").slice(0, 10);
    let formattedNumber = "";
    for (let i = 0; i < formattedValue.length; i++) {
      if (i === 0) formattedNumber += "(";
      else if (i === 3) formattedNumber += ") ";
      else if (i === 6) formattedNumber += "-";
      formattedNumber += formattedValue[i];
    }
    return formattedNumber;
  };
  const editHandler = () => {
    const formateNum = formateNumber(singleMarketData?.callForwardingNumber);
    const cloneObj = { ...singleMarketData };
    if (formateNum) {
      cloneObj.callForwardingNumber = formateNum;
    }
    setEditMarket(cloneObj);
  };


  useEffect(() => {
    if (singleMarketData?.phoneNumber?.length > 0) {
      const totalDailySent = singleMarketData.phoneNumber.reduce(
        (acc, data) => acc + Number(data?.sendDailyMessageCount || 0),
        0
      );
      const totalMonSent = singleMarketData.phoneNumber.reduce(
        (acc, data) => acc + Number(data?.sendMonthlyMessageCount || 0),
        0
      );
      setSentToday(totalDailySent); // Assuming setSentToday expects a single value.
      setSentMon(totalMonSent);
    }
  }, [singleMarketData, sentToday, sentMon]);
  return (
    <TableRowStyled
      className="row body"
      open={isOpen}
      onClick={() => setIsOpen((p) => !p)}

    // onClick={() => setEditMarket(true)}
    // onClick={() => setIsDlcModelOpen(true)}
    >
      <div style={{ minWidth: "400px" }} className="col icon">
        <p>
          <span className="icon">
            <FaChevronDown />
          </span>
          <span className="text">{singleMarketData?.name}</span> -
          <span className="text">{singleMarketData?.areaCode}</span>
        </p>
      </div>
      <div className="col data">
        {/* <span className="text">{singleMarketData?.areaCode}</span> */}
        <span className="text"> {sentToday}</span>
      </div>
      <div className="col percentage">
        {/* <span className="text"> {totalSendMessageCount}</span> */}
        <span className="text"> {sentMon}</span>
      </div>
      <div className="col percentage">
        <span style={{ paddingLeft: "5px" }} className="text">
          {" "}
          {`1${singleMarketData?.callForwardingNumber}`
            ? `1${singleMarketData?.callForwardingNumber}`
            : ""}
        </span>
      </div>

      {/* registration status */}
      <div style={{ paddingLeft: "5px" }} className="col data">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            // gap: "4px",

            cursor: "pointer",
          }}
        >
          {singleMarketData?.registerationStatus === "accept" ? (
            <Components.Common.LightTooltip
              placement="top"
              arrow
              title="Accepted"
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
                  Accepted
                </span>
              </span>
            </Components.Common.LightTooltip>
          ) : (
            <Components.Common.LightTooltip
              placement="top"
              arrow
              title="Rejected"
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
                <span style={{ marginLeft: "0.5rem" }}>Rejected</span>
              </span>
            </Components.Common.LightTooltip>
          )}
        </div>
      </div>
      {/* actions  */}
      <div
        className="col data"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          maxWidth: "150px",
        }}
      >
        <div
          onClick={() => {
            editHandler();
          }}
          style={{ display: "flex", gap: "4px" }}
        >
          <img src={Assets.Icons.editFill} />
          {/* <HiMiniPlusCircle style={{ color: "#00bd82", fontSize: "18px" }} /> */}
        </div>
        {/* <div>
          <MorePopover>
            <MdMoreVert style={{ cursor: "pointer" }} />
          </MorePopover>
        </div> */}
      </div>

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
                    timeZone: singleMarketData?.timeZone,
                    index: i,
                    _id: singleMarketData?._id,
                    extra: true,
                  })
                }
                search={search}
                setIsDlcModelOpen={setIsDlcModelOpen}
                user={user}
              />
            ))
            : null}
        </motion.div>
      )}
    </TableRowStyled>
  );
};

const TableExtraRow = ({ phone, singleMarketData, setIsDlcModelOpen, user }) => {
  return (
    <>
      <TableExtraRowStyled>
        <div
          className="col icon"
          style={{ padding: "0rem .7rem", minWidth: "390px" }}
        >
          <p>
            <span className="icon">
              <img src={Assets.Icons.subArrow} style={{ marginLeft: "10px" }} />
              {/* <PiArrowElbowDownRightBold /> */}
            </span>
            <span className="text">{singleMarketData?.name}</span>
          </p>
        </div>
        <div className="col data" style={{ padding: "0rem 0.3rem" }}>
          {/* <span className="text">{singleMarketData?.areaCode}</span> */}
          <span style={{ paddingLeft: "5px" }} className="text">
            {" "}
            {phone?.sendDailyMessageCount ? phone.sendDailyMessageCount : 0}
          </span>
        </div>
        <div className="col percentage" style={{ padding: "0rem 0.3rem" }}>
          <span style={{ paddingLeft: "5px" }} className="text">
            {phone?.sendMonthlyMessageCount ? phone.sendMonthlyMessageCount : 0}
          </span>
        </div>
        <div className="col percentage" style={{ padding: "0rem .7rem" }}>
          <span style={{ paddingLeft: "10px" }} className="text">
            {/* {phone?.sendMonthlyMessageCount ? phone.sendMonthlyMessageCount : 0} */}
            {phone?.number ? phone?.number : ""}
          </span>
        </div>

        <div className="col data" style={{ padding: "0rem .7rem" }}>
          <div className="col data">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
              }}
            >
              <GoDotFill
                style={{
                  color: phone.active ? "#00724E" : "#EA3815",
                }}
              />

              <Components.Common.LightTooltip
                placement="top"
                arrow
                title={phone.active ? "Active" : "Deactive"}
              >
                <span
                  style={{
                    color: phone.active ? "#00724E" : "#EA3815",
                    backgroundColor: phone.active ? "#C2FFEC" : "#FFEEEE",
                    border: `1px solid ${phone.active ? "#5BF1B2" : "#EA3815"
                      } `,
                    display: "flex",
                    alignItems: "center",
                    padding: "2px 8px 2px 12px",
                    gap: "5px",
                  }}
                  className="checkIcon-style-modify"
                >
                  <span
                    style={{
                      fontSize: "12px",
                      lineHeight: "20px",
                      fontWeight: "500",
                    }}
                  >
                    {phone.active ? "Active" : "Deactive"}
                  </span>
                </span>
              </Components.Common.LightTooltip>
            </div>
          </div>
        </div>
        {/* for actions col */}
        <div
          className="col data"
          style={{
            padding: "0rem .7rem",
            maxWidth: "150px",
            justifyContent: "center",
          }}
        >
          <div
            className="col data"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "6px" }}>
              {/* <img src={Assets.Icons.editFill} /> */}
              {/* {(user.role === 'admin' || user.permissions.includes('View 10 DLC Registration Details')) && (
              <MdRemoveRedEye
                onClick={() => setIsDlcModelOpen(true)}
                style={{
                  color: "#777777",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              />
              )} */}
              {/* <MdDelete style={{ color: "#777777", fontSize: "18px" }} /> */}
            </div>
            {/* <div>
              <MorePopover>
                <MdMoreVert style={{ cursor: "pointer" }} />
              </MorePopover>
            </div> */}
          </div>
        </div>
      </TableExtraRowStyled>
    </>
  );
};
