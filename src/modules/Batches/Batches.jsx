import { useMemo, useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  FaArrowCircleRight,
  FaArrowLeft,
  FaArrowRight,
  FaArrowsAlt,
  FaArrowsAltH,
  FaBullhorn,
  FaCheck,
  FaCheckCircle,
  FaClock,
  FaEdit,
  FaEllipsisH,
  FaFilter,
  FaExchangeAlt,
  FaExpandArrowsAlt,
  FaHome,
  FaInfoCircle,
  FaPencilAlt,
  FaPlus,
  FaTimes,
  FaRegCheckCircle,
} from "react-icons/fa";
import {
  BatchBuilderModalStyled,
  BatchProcesingModalStyled,
  BatchSelectPartStyled,
  BatchesScroll,
  BatchesStyled,
  CampaignSelectPartStyled,
  CircularProgressbarStyled,
  CompletedTableRowStyled,
  Dropdown,
  InProgressTableRowStyled,
  LightSidebarStyled,
  ListItem,
  SelectCampaignModalStyled,
  StyledInput,
  TableStyled,
  TableStyledTop,
  TemplateChangeModalStyled,
  TemplateSelectPartStyled,
  TemplateTooltipStyled,
} from "./styles";
import { LightTooltip } from "@/components/common";
import Components from "@/components";
import { useGlobalContext, useMessageTemplate } from "@/hooks";
import { formatTemplateString, remToPixels } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { CircularProgress } from "@mui/material";
import Assets from "@/assets";
import { buildStyles } from "react-circular-progressbar";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCompleteStatusBatch,
  GetPausedStatusBatch,
  GetCampaignForBatch,
  getAllTemplatess,
  getSingleTemplate,
  CreateBatch,
  clearErrors,
  GetAllUserForBatch,
  clearMessages,
  GetBatchById,
  SendMessage,
  getSingleCampaign,
  ChangeTemplate,
  GetReportSendAndQueue,
  CheckCompaignWorkingHour,
  CancelBatch,
  UpdateDailyCount,
} from "./../../store/actions";
import { useNavigate } from "react-router-dom";
import { batchConstant, templateConstants } from "@/store/constants";
import { IoMdClose } from "react-icons/io";
import PaginationDropDown from "./Pagination/PaginationDropDown";
import PaginationComp from "./Pagination/Pagination";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { RxCross1, RxMobile } from "react-icons/rx";
import { FaChevronDown } from "react-icons/fa6";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { CircularLoader } from "@/components/common";
import { FaMobileAlt } from "react-icons/fa";
import moment from "moment-timezone";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";

let template = "";
let templateCategory = "";
const Batches = () => {
  const dispatch = useDispatch();
  const userType = JSON.parse(
    localStorage.getItem("user") || localStorage.getItem("user")
  );
  const [isCreateNewBatchModalOpen, setIsCreateNewBatchModalOpen] =
    useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isPrcessingBatchModalOpen, setIsPrcessingBatchModalOpen] =
    useState(false);
  const [isTemChangeOpen, setIsTemChangeOpen] = useState(false);
  const [temMode, setTemMode] = useState("");
  const { setIsLoaderShowing } = useGlobalContext();
  const [batchId, setBatchId] = useState("");
  const [userid, setUserId] = useState("");
  const [userTypeForPag, setUserTypePag] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [inQueue, setInQueue] = useState(0);
  const [checkResumeStatus, setCheckResumeStatus] = useState("");

  const { loading, cancelLoading } = useSelector((state) => state.batchReducer);
  const { messageSendData, reportSendAndQueue } = useSelector(
    (state) => state.dashboardReducer
  ); 
  const { completeBatch } = useSelector((state) => state.batchReducer);
  const showProcessingBatchModal = () => {
    setIsPrcessingBatchModalOpen(true);
  };

  useEffect(() => {
    if (completeBatch?.length > 0) {
      setInQueue(
        completeBatch.reduce((acc, item) => acc + item.totalMessagesInQueue, 0)
      );
    }
  }, [completeBatch]);

  useLayoutEffect(() => {
    setIsLoaderShowing(loading);
  }, [loading, setIsLoaderShowing]);

  useEffect(() => {
    dispatch(GetReportSendAndQueue());
  }, []);

  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );

  const SideBarRef = useRef(null);
  const handleClickOutside = (event) => {
    if (SideBarRef.current && !SideBarRef.current.contains(event.target)) {
      setIsLeftSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [templateId, setTemplateId] = useState("");
  console.log(
    "check batch condition",
    "in que",
    inQueue,
    "total inque",
    reportSendAndQueue?.totalMessagesInQueue,
    reportSendAndQueue?.totalMessagesInQueue +
    messageSendData?.totalSendDailyMessageCount +
    inQueue >=
    messageSendData?.dailyMessageLimit
  );

  console.log("check issue in disable" , messageSendData?.dailyMessageLimit ,  reportSendAndQueue?.totalMessagesInQueue,  messageSendData?.totalSendDailyMessageCount ,  reportSendAndQueue?.totalMessagesInQueue +
    messageSendData?.totalSendDailyMessageCount >=
    messageSendData?.dailyMessageLimit);
  

  return (
    <BatchesStyled style={{ display: "flex", flexDirection: "column" }}>
      <div className="top">
        <div className="left">
          <h1>Batches</h1>
        </div>
        <div className="right">
          {(user.role === "admin" ||
            user.permissions.includes("Create Batch")) && (
              <button
                disabled={
                   user?.isNewUser && user?.isTenDlcSubmit != "Accept" ? true : !user?.isNewUser && user?.isTenDlcSubmit == "Reject" ? true : !user?.isNewUser && user?.marketAndLimitStatus == false ? true :
                  reportSendAndQueue?.totalMessagesInQueue +
                  messageSendData?.totalSendDailyMessageCount >=
                  messageSendData?.dailyMessageLimit  ? true : false
                }
                onClick={() => setIsCreateNewBatchModalOpen(true)}
              >
                <span className="text">Create New Batches</span>
              </button>
            )}
        </div>
      </div>
      <div
        style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        className="bottom"
      >
        <div className="top">
          {(userType?.role === "admin" ||
            user.permissions.includes("Filter by User")) && (
              <button
                style={{ fontFamily: "fellix" }}
                onClick={() => setIsLeftSidebarOpen(true)}
              >
                <span className="icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.18474 0.75C1.39265 0.75 0.75 1.40346 0.75 2.20787V3.06591C0.75 3.66177 0.976589 4.23478 1.38191 4.66579L5.82384 9.38896L5.8258 9.38599C6.68332 10.2639 7.1658 11.4506 7.1658 12.688V16.8789C7.1658 17.159 7.4588 17.3377 7.702 17.2056L10.2316 15.8272C10.6135 15.6187 10.8518 15.2135 10.8518 14.7735V12.6771C10.8518 11.4467 11.3274 10.2649 12.1771 9.38896L16.6191 4.66579C17.0234 4.23478 17.25 3.66177 17.25 3.06591V2.20787C17.25 1.40346 16.6083 0.75 15.8162 0.75H2.18474Z"
                      stroke="#012635"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <span style={{ fontFamily: "fellix" }} className="text">
                  Filter by User
                </span>
              </button>
            )}
        </div>
        <div style={{ flexGrow: 1 }} className="bottom-tables-wrapper">
          <div
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
            className="bottom"
          >
            {(user.role === "admin" ||
              user.permissions.includes("In-progress Batch")) && (
                <InProgressTable
                  onResume={(getPayload) => {
                    setIsPrcessingBatchModalOpen(true);


                    setCheckResumeStatus(getPayload);
                  }}
                  onTemplateChange={(id, tempmode, templateId) => {
                    setBatchId(id);
                    setIsTemChangeOpen(true);
                    setTemMode(tempmode);
                    setTemplateId(templateId);
                  }}
                />
              )}
            {(user.role === "admin" ||
              user.permissions.includes("Complete Batch")) && (
                <CompletedTable
                  userId={userid}
                  userType={userTypeForPag}
                  setPageSize={(size) => setPageSize(size)}
                />
              )}
          </div>
        </div>
      </div>
      {/* {(user.role === 'admin' || user.permissions.includes('Filter by User')) && ( */}
      <AnimatePresence>
        {isLeftSidebarOpen && (
          <LightSidebar
            userId={userid}
            setUserId={setUserId}
            SideBarRef={SideBarRef}
            pageSize={pageSize}
            onClose={(id, userType) => {
              // setUserId(id);
              setUserTypePag(userType);
              setIsLeftSidebarOpen(false);
            }}
          />
        )}
      </AnimatePresence>
      {/* )} */}
      <Components.Common.ModalTop open={isTemChangeOpen} onClose={() => { }}>
        <TemplateChangeModal
          onClose={() => {
            setIsTemChangeOpen(false);
          }}
          batchId={batchId}
          mode={temMode}
          templateId={templateId}
        />
      </Components.Common.ModalTop>

      <Components.Common.ModalTop
        open={isCreateNewBatchModalOpen}
        onClose={() => { }}
      >
        <BatchBuilderModal
          onClose={() => {
            template = "";
            templateCategory = "";
            setIsCreateNewBatchModalOpen(false);
          }}
          showProcessingBatchModal={() => showProcessingBatchModal()}
        />
      </Components.Common.ModalTop>

      <Components.Common.ModalTop
        open={isPrcessingBatchModalOpen}
        onClose={() => { }}
      >
        <BatchProcesingModal
          onClose={() => setIsPrcessingBatchModalOpen(false)}
          payLoad={checkResumeStatus}
        />
      </Components.Common.ModalTop>
    </BatchesStyled>
  );
};

export default Batches;

const InProgressTable = ({ onResume, onTemplateChange }) => {
  const { windowWidth } = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfRowsShowing, setNumberOfRowsShowing] = useState(10);
  const [sortingProgress, setSortingProgress] = useState();
  const user = JSON.parse(
    localStorage.getItem("user") || localStorage.getItem("user")
  );
  const userType =
    localStorage.getItem("type") || localStorage.getItem("type");
  const dispatch = useDispatch();
  const { pauseBatch, pauseTotalResults, pauseTotalPages } = useSelector(
    (state) => state.batchReducer
  );
  useEffect(() => {
    if (userType !== "admin") {
      dispatch(
        GetPausedStatusBatch(
          user?._id,
          "user",
          currentPage,
          numberOfRowsShowing
        )
      );
    } else {
      dispatch(
        GetPausedStatusBatch(
          "",
          "",
          currentPage,
          numberOfRowsShowing,
          sortingProgress
        )
      );
    }
  }, [currentPage, numberOfRowsShowing, sortingProgress]);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleLimitChange = (event) => {
    // setLimit(Number(event.target.value));
    setCurrentPage(1);
    setNumberOfRowsShowing(Number(event.target.value));
  };

  return (
    <TableStyledTop
      style={{ display: pauseBatch.length == 0 && "none" }}
      tableWidth={windowWidth - remToPixels(7) - remToPixels(2.6)}
    >
      <div className="top">
        <h2>In Progress</h2>
      </div>
      <div className="bottom">
        <div
          style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
          className="table"
        >
          <div className="row">
            <h6 style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="text">Batch Number</span>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <BiSolidUpArrow
                  onClick={() => {
                    if (sortingProgress?.sort === "sortByBatchNumber=asec") {
                      setSortingProgress("");
                    } else {
                      setSortingProgress({ sort: "sortByBatchNumber=asec" });
                    }
                  }}
                  style={{
                    color:
                      sortingProgress?.sort === "sortByBatchNumber=asec"
                        ? "#00BD82"
                        : "#777777",
                    fontSize: "10px",
                    cursor: "pointer",
                  }}
                />
                <BiSolidDownArrow
                  onClick={() => {
                    if (sortingProgress?.sort === "sortByBatchNumber=desc") {
                      setSortingProgress("");
                    } else {
                      setSortingProgress({ sort: "sortByBatchNumber=desc" });
                    }
                    // setSorting({ sort:"sortByBatchNumber=desc"})
                  }}
                  style={{
                    color:
                      sortingProgress?.sort === "sortByBatchNumber=desc"
                        ? "#00BD82"
                        : "#777777",
                    fontSize: "10px",
                    cursor: "pointer",
                  }}
                />
              </div>
            </h6>
            <h6>
              <span className="text">Campaign</span>
              <span className="info">
                <LightTooltip
                  placement="top"
                  arrow
                  title={
                    <>
                      <p>Name of the Campaign</p>
                      <p>that prospects belong to</p>
                    </>
                  }
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z"
                      stroke="#777777"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125"
                      stroke="#777777"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z"
                      fill="#777777"
                    />
                  </svg>
                </LightTooltip>
              </span>
            </h6>
            <h6>
              <span className="text">User</span>
              <span className="info">
                <LightTooltip
                  placement="top"
                  arrow
                  title={
                    <>
                      <p>User that send out</p>
                      <p>the batches messages</p>
                    </>
                  }
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z"
                      stroke="#777777"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125"
                      stroke="#777777"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z"
                      fill="#777777"
                    />
                  </svg>
                </LightTooltip>
              </span>
            </h6>
            <h6>
              <span className="text">Prospects Contacted</span>
              <span className="info">
                <LightTooltip
                  placement="top"
                  arrow
                  title={
                    <>
                      <p>Number of Prospects</p>
                      <p>that are texted</p>
                    </>
                  }
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z"
                      stroke="#777777"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125"
                      stroke="#777777"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z"
                      fill="#777777"
                    />
                  </svg>
                </LightTooltip>
              </span>
            </h6>
            <h6>
              <span className="text">Total Prospects</span>
              <span className="info">
                <LightTooltip
                  placement="top"
                  arrow
                  title={
                    <>
                      <p>Total number of Prospects</p>
                      <p>Selected for texting in the batch</p>
                    </>
                  }
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z"
                      stroke="#777777"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125"
                      stroke="#777777"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z"
                      fill="#777777"
                    />
                  </svg>
                </LightTooltip>
              </span>
            </h6>
            <h6>
              <span className="text">Template</span>
              <span className="info">
                <LightTooltip
                  placement="top"
                  arrow
                  title={
                    <>
                      <p>Last message Template</p>
                      <p>used for texting</p>
                    </>
                  }
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z"
                      stroke="#777777"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125"
                      stroke="#777777"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z"
                      fill="#777777"
                    />
                  </svg>
                </LightTooltip>
              </span>
            </h6>
            <h6>
              <div className="text">Last Send</div>
              <span className="info">
                <LightTooltip
                  placement="top"
                  arrow
                  title={
                    <>
                      <p>Last message send date</p>
                    </>
                  }
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z"
                      stroke="#777777"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125"
                      stroke="#777777"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z"
                      fill="#777777"
                    />
                  </svg>
                </LightTooltip>
              </span>
            </h6>
            <h6>
              <div className="text">Actions</div>
              <span className="info">
                <LightTooltip
                  placement="top"
                  arrow
                  title={
                    <>
                      <p>Resume sending</p>
                      <p>your messages</p>
                    </>
                  }
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z"
                      stroke="#777777"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125"
                      stroke="#777777"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z"
                      fill="#777777"
                    />
                  </svg>
                </LightTooltip>
              </span>
            </h6>
          </div>

          {pauseBatch.length > 0 ? (
            pauseBatch.map((data, i) => {
              return (
                <InProgressTableRow
                  key={i}
                  onResume={onResume}
                  onTemplateChange={onTemplateChange}
                  data={data}
                />
              );
            })
          ) : (
            <div style={{ textAlign: "center", padding: "10px 0px" }}>
              No Record Found!
            </div>
          )}
        </div>

        <div className="mobilePagination">
          <div>
            Total: {pauseTotalResults ? pauseTotalResults : 0}
            {/* {templatesData?.totalResults ? templatesData.totalResults : 0} */}
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
                limit={numberOfRowsShowing}
                onLimitChange={handleLimitChange}
              />
            </div>
          </div>
        </div>

        <div
          className="desktopPagination"
        // style={{
        //   display: "flex",
        //   justifyContent: "space-between",
        //   height: "56px",
        //   backgroundColor: "white",
        //   borderBottomLeftRadius: "12px",
        //   borderEndEndRadius: "12px",
        //   borderTop: "0px",
        //   padding: "0px 16px",
        //   alignItems: "center",
        //   paddingTop: "10px ",
        //   paddingBottom: "10px",
        //   border: "solid 1px #E0E0E0",
        // }}
        >
          <div className="desktopView">
            Total: {pauseTotalResults ? pauseTotalResults : 0}
            {/* {templatesData?.totalResults ? templatesData.totalResults : 0} */}
          </div>

          <div>
            <PaginationComp
              totalPages={pauseTotalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>

          <div className="desktopViewTwo">
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
                limit={numberOfRowsShowing}
                onLimitChange={handleLimitChange}
              />
            </div>
          </div>
        </div>
      </div>
    </TableStyledTop>
  );
};

const InProgressTableRow = ({ onResume, onTemplateChange, data, key }) => {
  let userInfo = localStorage.getItem("user") || localStorage.getItem("user");
  userInfo = JSON.parse(userInfo);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const batchDate = new Date(data?.batchDate && data.batchDate);
  const { messageSendData, reportSendAndQueue } = useSelector(
    (state) => state.dashboardReducer
  );
  const formattedBatchNumber = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // Set this to false for 24-hour format
  }).format(data?.batchDate ? batchDate : new Date());
  const timeFormat = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // Set this to false for 24-hour format
  });
  const formatedTime = timeFormat.format(batchDate);
  const lastSeenDate = new Date(data?.lastSent && data.lastSent);
  const formattedLastSeenDate = new Intl.DateTimeFormat(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: userInfo?.timeZone || "UTC", // Default to UTC if timezone is
  }).format(lastSeenDate);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const formatMilliseconds = (milliseconds) => {
    return milliseconds.toFixed(0).padStart(3, "0");
  };

  // const formatedDateAndTime = (input) => {
  //   const date = new Date(input);

  //   const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
  //   const hours = String(date.getHours()).padStart(2, "0");
  //   const minutes = String(date.getMinutes()).padStart(2, "0");

  //   const formattedDateTime = `${month}-${day}-${year} ${hours}:${minutes}`;

  //   return formattedDateTime;
  // };
  const formatedDateAndTime = (input) => {
    const date = moment(input).tz(userInfo?.timeZone || "UTC");

    const month = String(date.month() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.date()).padStart(2, "0");
    const year = String(date.year()).slice(-2); // Get last two digits of the year
    const hours = String(date.hour()).padStart(2, "0");
    const minutes = String(date.minute()).padStart(2, "0");

    const formattedDateTime = `${month}-${day}-${year} ${hours}:${minutes}`;

    return formattedDateTime;
  };

  // console.log(
  //   "check remaining",
  //   !data?.batchActive,
  //   data?.isCanceled,
  //   messageSendData?.dailyMessageLimit -
  //   (reportSendAndQueue?.totalMessagesInQueue +
  //     messageSendData?.totalSendDailyMessageCount) <
  //   data?.remaning
  // );

  return (
    <InProgressTableRowStyled
      className="row body"
      percentage={(data?.batchSendMessage / data?.batchTotalProspects) * 100}
    >
      <div className="col data">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
            color: "#777777",
            fontWeight: 500,
          }}
        >
          <p>{data?.batchNumber && data.batchNumber}</p>-
          <p style={{ margin: "0px" }}>
            {data?.batchSenderNumber && data.batchSenderNumber.slice(-4)}
          </p>
        </div>
        <p>{formatedDateAndTime(data?.createdAt)}</p>
        {/* <p>{formatedTime}</p> */}
      </div>
      <div className="col data">
        <p>{data?.campagin?.title ?? data?.campagin?.name ?? ""}</p>
      </div>
      <div className="col data">
        <p>
          {(data?.user?.firstName &&
            data.user.firstName + " " + data.user.lastName) ||
            (data?.admin?.fullName && data.admin.fullName)}
        </p>
      </div>
      <div style={{ minWidth: "155px" }} className="col data">
        <p>{data?.batchSendMessage && Math.ceil(data.batchSendMessage)}</p>
      </div>
      <div className="col data">
        <p>
          {data?.batchTotalProspects && Math?.ceil(data.batchTotalProspects)}
        </p>
      </div>
      <div className="col data1" ref={dropdownRef}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "20px",
          }}
        >
          <Dropdown isOpen={isOpen}>
            <ListItem
              onClick={() => {
                setIsOpen(false);
                navigate(
                  data?.campagin?.permission == "compaign"
                    ? `/templates/create-template/${data?.template?._id}?edit=true`
                    : `/templates/create-template/${data?.template?._id}?follow=true`
                );
              }}
            >
              <FaEdit color="#575962" />
              Edit Template
            </ListItem>
            <ListItem
              onClick={() => {
                setIsOpen(false);
                onTemplateChange(
                  data?._id,
                  data?.campagin?.permission === "compaign"
                    ? "initial"
                    : "follow",
                  data?.template?._id
                );
              }}
            >
              <FaExchangeAlt color="#575962" />
              Change Template
            </ListItem>
          </Dropdown>

          <LightTooltip
            title={<TemplateTooltip template={data?.template?.messages?.[0]} />}
            placement="bottom"
            arrow
          >
            <p>{data?.template?.name && data.template.name}</p>
          </LightTooltip>
          <span
            style={{
              paddingRight: "6px",
              paddingTop: "3px",
              cursor: "pointer",
            }}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {/* <FaPencilAlt color="#36a3f7" /> */}
            <img src={Assets.Images.batchEdit} alt="ZeitBlast" />
          </span>
        </div>
      </div>
      <div className="col data">
        <p>{formattedLastSeenDate}</p>
      </div>
      <div className="col actions">
        <div>
          <button
            // disabled={!data?.batchActive || data?.isCanceled}
            disabled={
              !data?.batchActive || data?.isCanceled
              // ||
              // reportSendAndQueue?.totalMessagesInQueue +
              // messageSendData?.totalSendDailyMessageCount >=
              // messageSendData?.dailyMessageLimit
              // ||
              // messageSendData?.dailyMessageLimit -
              // (reportSendAndQueue?.totalMessagesInQueue +
              //   messageSendData?.totalSendDailyMessageCount) <
              // data?.remaning
            }
            onClick={() => {
              dispatch(GetBatchById(data?._id));
              onResume({
                batchId: data?._id,
                batchTotalProspects: data?.batchTotalProspects,
                batchSenderNumber: data?.batchSenderNumber,
                previousBatchUpdated: data?.previousBatchUpdated,
                batchData: data?.batchDate,
              });
            }}
          >
            {/* <span className="icon">
              <FaClock />
            </span> */}
            <span className="text">
              {data?.status === "paused" ? "Resume" : data.status}
            </span>
          </button>
        </div>
      </div>
      {/* <div className="col actions">
        <div>
          <button
            disabled={!data?.batchActive || data?.isCanceled}
            onClick={() => {
              dispatch(CancelBatch(data?._id));
            }}
            style={{ backgroundColor: "red", marginLeft: "-3rem" }}
          >
            <span className="icon">
              <FaClock />
            </span>
            <span className="text">
              {data?.isCanceled ? "Canceled" : "Cancel"}
            </span>
          </button>
        </div>
      </div> */}
    </InProgressTableRowStyled>
  );
};

const TemplateTooltip = ({ template }) => {
  return (
    <TemplateTooltipStyled>
      <p
        dangerouslySetInnerHTML={{
          __html: formatTemplateString(template?.message1),
        }}
      />
      <p
        dangerouslySetInnerHTML={{
          __html: formatTemplateString(template?.message2),
        }}
      />
      <p
        dangerouslySetInnerHTML={{
          __html: formatTemplateString(template?.message3),
        }}
      />
      <p
        dangerouslySetInnerHTML={{
          __html: formatTemplateString(template?.message4),
        }}
      />
      <p
        dangerouslySetInnerHTML={{
          __html: formatTemplateString(template?.altMessage),
        }}
      />
    </TemplateTooltipStyled>
  );
};

const CompletedTable = ({ userId, userType, setPageSize }) => {
  const { windowWidth } = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfRowsShowing, setNumberOfRowsShowing] = useState(10);
  const [limit, setLimit] = useState(10);
  const [sortingCompleted, setSortingCompleted] = useState();
  const [sortingProgress, setSortingProgress] = useState();
  const dispatch = useDispatch();
  const {
    completeBatch,
    page,
    totalPages,
    totalResults,
    errors: error,
  } = useSelector((state) => state.batchReducer);

  // useEffect(() => {
  //   if (error.length > 0) {
  //     toast.error(error);
  //     dispatch(clearErrors());
  //   }
  // }, [error]);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value));
    setCurrentPage(1);
    setNumberOfRowsShowing(Number(event.target.value));
  };


  console.log("completed batch", currentPage ,"number of rows" ,  numberOfRowsShowing , "userId" , userId , userType , sortingCompleted);
  

  useEffect(() => {
    dispatch(
      GetCompleteStatusBatch(
        currentPage,
        numberOfRowsShowing,
        userId,
        userType,
        sortingCompleted
      )
    );
    setPageSize(numberOfRowsShowing);
  }, [currentPage, numberOfRowsShowing, sortingCompleted]);
  return (
    <TableStyled
      style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      tableWidth={windowWidth - remToPixels(7) - remToPixels(2.6)}
      extra={true}
    >
      <div className="top">
        <h2>Completed</h2>
      </div>
      <div
        style={{
          gap: "0px",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
        className="bottom"
      >
        <div style={{ flexGrow: 1 }} className="table">
          <div className="row">
            <h6 style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="text">Batch Number</span>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <BiSolidUpArrow
                  onClick={() => {
                    if (sortingCompleted?.sort === "sortByBatchNumber=asec") {
                      setSortingCompleted("");
                    } else {
                      setSortingCompleted({ sort: "sortByBatchNumber=asec" });
                    }
                  }}
                  style={{
                    color:
                      sortingCompleted?.sort === "sortByBatchNumber=asec"
                        ? "#00BD82"
                        : "#777777",
                    fontSize: "10px",
                    cursor: "pointer",
                  }}
                />
                <BiSolidDownArrow
                  onClick={() => {
                    if (sortingCompleted?.sort === "sortByBatchNumber=desc") {
                      setSortingCompleted("");
                    } else {
                      setSortingCompleted({ sort: "sortByBatchNumber=desc" });
                    }
                    // setSorting({ sort:"sortByBatchNumber=desc"})
                  }}
                  style={{
                    color:
                      sortingCompleted?.sort === "sortByBatchNumber=desc"
                        ? "#00BD82"
                        : "#777777",
                    fontSize: "10px",
                    cursor: "pointer",
                  }}
                />
              </div>
            </h6>
            <h6>
              <span className="text">Campaign</span>
              <span className="info">
                <LightTooltip
                  placement="top"
                  arrow
                  title={
                    <>
                      <p>Name of the Campaign</p>
                      <p>that prospects belong to</p>
                    </>
                  }
                >
                  <span>
                    {/* <FaInfoCircle /> */}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z"
                        stroke="#777777"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125"
                        stroke="#777777"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z"
                        fill="#777777"
                      />
                    </svg>
                  </span>
                </LightTooltip>
              </span>
            </h6>
            <h6>
              <span className="text">User</span>
              <span className="info">
                <LightTooltip
                  placement="top"
                  arrow
                  title={
                    <>
                      <p>User that send out</p>
                      <p>the batches messages</p>
                    </>
                  }
                >
                  <span>
                    {/* <FaInfoCircle /> */}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z"
                        stroke="#777777"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125"
                        stroke="#777777"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z"
                        fill="#777777"
                      />
                    </svg>
                  </span>
                </LightTooltip>
              </span>
            </h6>
            <h6>
              <span className="text">Messages Sent</span>
              <span className="info">
                <LightTooltip
                  placement="top"
                  arrow
                  title={
                    <>
                      <p>Total messages sent to your Prospects</p>
                      <p>Hint:some Prospects may have 2 or 3 mobiles</p>
                    </>
                  }
                >
                  <span>
                    {/* <FaInfoCircle /> */}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z"
                        stroke="#777777"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125"
                        stroke="#777777"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z"
                        fill="#777777"
                      />
                    </svg>
                  </span>
                </LightTooltip>
              </span>
            </h6>
            <h6>
              <span className="text">Deliverability</span>
              <span className="info">
                <LightTooltip
                  placement="top"
                  arrow
                  title={
                    <>
                      <p>Percentage of successfully</p>
                      <p>delivered text messages</p>
                    </>
                  }
                >
                  <span>
                    {/* <FaInfoCircle /> */}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z"
                        stroke="#777777"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125"
                        stroke="#777777"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z"
                        fill="#777777"
                      />
                    </svg>
                  </span>
                </LightTooltip>
              </span>
            </h6>
            <h6>
              <span className="text">Response</span>
              <span className="info">
                <LightTooltip
                  placement="top"
                  arrow
                  title={
                    <>
                      <p>Percentage of received response</p>
                    </>
                  }
                >
                  <span>
                    {/* <FaInfoCircle /> */}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z"
                        stroke="#777777"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125"
                        stroke="#777777"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z"
                        fill="#777777"
                      />
                    </svg>
                  </span>
                </LightTooltip>
              </span>
            </h6>
            <h6>
              <span className="text">Template</span>
              <span className="info">
                <LightTooltip
                  placement="top"
                  arrow
                  title={
                    <>
                      <p>Last message Template</p>
                      <p>used for texting</p>
                    </>
                  }
                >
                  <span>
                    {/* <FaInfoCircle /> */}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z"
                        stroke="#777777"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125"
                        stroke="#777777"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z"
                        fill="#777777"
                      />
                    </svg>
                  </span>
                </LightTooltip>
              </span>
            </h6>
            <h6>
              <div className="text">Last Send</div>
              <span className="info">
                <LightTooltip
                  placement="top"
                  arrow
                  title={
                    <>
                      <p>Last message send date</p>
                    </>
                  }
                >
                  <span>
                    {/* <FaInfoCircle /> */}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z"
                        stroke="#777777"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125"
                        stroke="#777777"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z"
                        fill="#777777"
                      />
                    </svg>
                  </span>
                </LightTooltip>
              </span>
            </h6>
            <h6>
              <div className="text">Status</div>
            </h6>
          </div>
          {completeBatch.length > 0 ? (
            completeBatch.map((data, ind) => {
              return <CompletedTableRow key={ind} data={data} />;
            })
          ) : (
            <div style={{ textAlign: "center" }}>No Record Found!</div>
          )}
        </div>
        <div className="mobilePagination">
          <div>
            Total: {totalResults ? totalResults : 0}
            {/* {templatesData?.totalResults ? templatesData.totalResults : 0} */}
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
                limit={numberOfRowsShowing}
                onLimitChange={handleLimitChange}
              />
            </div>
          </div>
        </div>
        <div
          className="desktopPagination"
        // style={{
        //   display: "flex",
        //   justifyContent: "space-between",
        //   height: "56px",
        //   backgroundColor: "white",
        //   borderBottomLeftRadius: "12px",
        //   borderEndEndRadius: "12px",
        //   borderTop: "0px",
        //   padding: "0px 16px",
        //   alignItems: "center",
        //   paddingTop: "10px ",
        //   paddingBottom: "10px",
        //   border: "solid 1px #E0E0E0",
        // }}
        >
          <div className="desktopView">
            Total: {totalResults ? totalResults : 0}
            {/* {templatesData?.totalResults ? templatesData.totalResults : 0} */}
          </div>

          <div>
            <PaginationComp
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>

          <div className="desktopViewTwo">
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
                limit={numberOfRowsShowing}
                onLimitChange={handleLimitChange}
              />
            </div>
          </div>
        </div>
      </div>
    </TableStyled>
  );
};

const CompletedTableRow = (data) => {
  let userInfo = localStorage.getItem("user") || localStorage.getItem("user");
  userInfo = JSON.parse(userInfo);
  const batchDate = new Date(data?.data?.batchDate && data.data.batchDate);
  const formattedBatchNumber = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(data?.data?.batchDate ? batchDate : new Date());
  const timeFormat = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // Set this to false for 24-hour format
  });
  const formatedTime = timeFormat.format(batchDate);
  const lastSeenDate = new Date(data?.data?.lastSent && data.data.lastSent);
  const formattedLastSeenDate = new Intl.DateTimeFormat(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: userInfo?.timeZone || "UTC", // Default to UTC if timezone is
  }).format(lastSeenDate);

  const formatMilliseconds = (milliseconds) => {
    return milliseconds.toFixed(0).padStart(3, "0");
  };
  const formatedDateAndTime = (input) => {
    const date = moment(input).tz(userInfo?.timeZone || "UTC");

    const month = String(date.month() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.date()).padStart(2, "0");
    const year = String(date.year()).slice(-2); // Get last two digits of the year
    const hours = String(date.hour()).padStart(2, "0");
    const minutes = String(date.minute()).padStart(2, "0");

    const formattedDateTime = `${month}-${day}-${year} ${hours}:${minutes}`;

    return formattedDateTime;
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "failed":
        return "Failed";
      case "completed":
        return "Completed";
      default:
        return "In Queue";
    }
  };


  
  return (
    <CompletedTableRowStyled className="row body">
      <div className="col data">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
            color: "#777777",
            fontWeight: 500,
          }}
        >
          <p>{data?.data?.batchNumber && data?.data?.batchNumber}</p>-
          <p style={{ margin: "0px" }}>
            {data?.data?.batchSenderNumber &&
              data?.data?.batchSenderNumber.slice(-4)}
          </p>
        </div>
        <p>{formatedDateAndTime(data?.data?.createdAt)}</p>
        {/* <p>{formatedTime}</p> */}
      </div>
      <div className="col data">
        <p>{data?.data?.campagin?.title ?? data?.data?.campagin?.name ?? ""}</p>
      </div>
      <div className="col data">
        <p>
          {(data?.data?.user?.firstName &&
            data?.data.user.firstName + " " + data?.data.user.lastName) ||
            (data?.data?.admin?.fullName && data?.data.admin.fullName)}
        </p>
      </div>
      <div className="col data">
        <p>
          {data?.data?.batchSendMessage >= 0
            ? `${data?.data?.batchSendMessage} sent ${Math.abs(
              (data?.data?.totalMessagesInQueue
                ? data.data.totalMessagesInQueue
                : 0) +
              data?.data?.batchTotalProspects -
              data?.data?.batchSendMessage
            )} in queue`
            : "0"}
        </p>
      </div>
      <div className="col data">
        <p
          style={{
            color: `${parseFloat(data?.data?.delivered) < 84 ? "#ff0000be" : "inherit"
              }`,
            fontWeight: `${parseFloat(data?.data?.delivered) < 84 ? "600" : "inherit"
              }`,
          }}
        >
          {data?.data?.delivered >= 0
            ? parseFloat(data?.data?.delivered).toFixed(2)
            : "0"}
          %
        </p>
      </div>
      <div className="col data">
        <p>
          {data?.data?.response >= 0
            ? parseFloat(data?.data?.response).toFixed(2)
            : "0"}
          %
        </p>
      </div>
      <div className="col data">
        <LightTooltip
          title={
            <TemplateTooltip template={data?.data?.template?.messages?.[0]} />
          }
          placement="left"
          arrow
        >
          <p>{data?.data?.template?.name && data.data.template.name}</p>
        </LightTooltip>
      </div>
      <div className="col data">
        <p>{formattedLastSeenDate}</p>
      </div>

      <div className="col actions">
        <p
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <LightTooltip
            title={getStatusColor(data?.data?.status)}
            placement="top"
            arrow
          >
            <span className="icon">
              <div style={{
                fontSize: "14px",
                width: "24px",
                backgroundColor: data?.data?.status === "pending"
                  ? "orange"
                  : data?.data?.status === "failed"
                    ? "red"
                    : data?.data?.status === "completed"
                      ? "green"
                      : "white", height: "24px",
                border: `2px solid ${data?.data?.status === "pending"
                  ? "white"
                  : data?.data?.status === "failed"
                    ? "white"
                    : data?.data?.status === "completed"
                      ? "white"
                      : "#777777"}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                color: data?.data?.status === "pending"
                  ? "white"
                  : data?.data?.status === "failed"
                    ? "white"
                    : data?.data?.status === "completed"
                      ? "white"
                      : "#777777"
              }}>1</div>
              {/* <RxMobile
                size={24}
                style={{
                  color:
                    data?.data?.status === "pending"
                      ? "orange"
                      : data?.data?.status === "failed"
                        ? "red"
                        : data?.data?.status === "completed"
                          ? "green"
                          : "gray",
                }}
              /> */}
            </span>
          </LightTooltip>
          {!data?.data?.phone2Date ? (
            <LightTooltip title="In Queue" placement="top" arrow>
              <span className="icon">
                {/* <RxMobile
                  size={24}
                  style={{
                    color: "gray",
                  }}
                /> */}
                <div style={{
                  fontSize: "14px",
                  width: "24px",
                  backgroundColor: "white", height: "24px",
                  border: `2px solid  #777777`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#777777" , 
                  display:data?.data?.isPhone2Available === false ? "none" : "flex" , 

                }}>2</div>
              </span>
            </LightTooltip>
          ) : (
            data?.data?.phone2Date && (
              <LightTooltip
                title={getStatusColor(data?.data?.phone2status)}
                placement="top"
                arrow
              >
                <span className="icon">
                  {/* <RxMobile
                    size={24}
                    style={{
                      color:
                        data?.data?.phone2status === "pending"
                          ? "orange"
                          : data?.data?.phone2status === "failed"
                            ? "red"
                            : data?.data?.phone2status === "completed"
                              ? "green"
                              : "gray",
                    }}
                  /> */}
                  <div style={{
                    fontSize: "14px",
                    width: "24px",
                    backgroundColor: data?.data?.phone2status === "pending"
                      ? "orange"
                      : data?.data?.phone2status === "failed"
                        ? "red"
                        : data?.data?.phone2status === "completed"
                          ? "green"
                          : "white", height: "24px",
                    border: `2px solid ${data?.data?.phone2status === "pending"
                      ? "white"
                      : data?.data?.phone2status === "failed"
                        ? "white"
                        : data?.data?.phone2status === "completed"
                          ? "white"
                          : "#777777"}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    color: data?.data?.phone2status === "pending"
                      ? "white"
                      : data?.data?.phone2status === "failed"
                        ? "white"
                        : data?.data?.phone2status === "completed"
                          ? "white"
                          : "#777777" , 
                          display: !data?.data?.isPhone2Available  ? "none" : "flex" , 
                  }}>2</div>
                </span>
              </LightTooltip>
            )
          )}
          {!data?.data?.phone3Date ? (
            <LightTooltip title="In Queue" placement="top" arrow>
              <span className="icon">
                <div style={{
                  fontSize: "14px",
                  width: "24px",
                  backgroundColor: "white", height: "24px",
                  border: `2px solid  #777777`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#777777" , 
                  display: !data?.data?.isPhone3Available ? "none" : "flex" , 
                }}>3</div>
              </span>
            </LightTooltip>
          ) : (
            data?.data?.phone3Date && (
              <LightTooltip
                title={getStatusColor(data?.data?.phone3status)}
                placement="top"
                arrow
              >
                <span className="icon">
                  {/* <FaMobileAlt
                    style={{
                      color:
                        data?.data?.phone3status === "pending"
                          ? "orange"
                          : data?.data?.phone3status === "failed"
                            ? "red"
                            : data?.data?.phone3status === "completed"
                              ? "green"
                              : "gray",
                    }}
                  /> */}
                  <div style={{
                    fontSize: "14px",
                    width: "24px",
                    backgroundColor: data?.data?.phone3status === "pending"
                      ? "orange"
                      : data?.data?.phone3status === "failed"
                        ? "red"
                        : data?.data?.phone3status === "completed"
                          ? "green"
                          : "white", height: "24px",
                    border: `2px solid ${data?.data?.phone3status === "pending"
                      ? "white"
                      : data?.data?.phone3status === "failed"
                        ? "white"
                        : data?.data?.phone3status === "completed"
                          ? "white"
                          : "#777777"}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    color: data?.data?.phone3status === "pending"
                      ? "white"
                      : data?.data?.phone3status === "failed"
                        ? "white"
                        : data?.data?.phone3status === "completed"
                          ? "white"
                          : "#777777" ,
                          display: !data?.data?.isPhone3Available ? "none" : "flex" , 
                  }}>3</div>
                </span>
              </LightTooltip>
            )
          )}
        </p>
      </div>
    </CompletedTableRowStyled>
  );
};

const MotionLightSidebarStyled = motion(LightSidebarStyled);

const LightSidebar = ({ userId, setUserId, pageSize, onClose, SideBarRef }) => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const { users: uniqueUsers } = useSelector((state) => state.batchReducer);
  // let uniqueUsers = [];
  // if (users.length > 0) {
  //   uniqueUsers = users.filter((item, index, array) => {
  //     const firstIndex = array.findIndex(
  //       (obj) =>
  //         (obj.user && obj?.user?.firstName === item?.user?.firstName) ||
  //         (obj.admin && obj?.admin?.fullName === item?.admin?.fullName)
  //     );
  //     return index === firstIndex;
  //   });
  // }
  useEffect(() => {
    dispatch(GetAllUserForBatch());
    setSearchText("");
  }, []);

  const handleUserSearch = (id, userType) => {
    setUserId(id);
    dispatch(GetCompleteStatusBatch(1, pageSize, id, userType));
    dispatch(GetPausedStatusBatch(id, userType));
    onClose(id, userType);
  };
  return (
    <MotionLightSidebarStyled
      ref={SideBarRef}
      initial={{ opacity: 0, x: "-7rem" }}
      animate={{
        opacity: 1,
        x: "0rem",
        transition: { duration: 0.3, ease: "linear" },
      }}
      exit={{
        opacity: 0,
        x: "-7rem",
        transition: { duration: 0.3, ease: "linear" },
      }}
    >
      <div className="top">
        <h2>
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.56517 1.5C1.70108 1.5 1 2.21286 1 3.0904V4.02644C1 4.67647 1.24719 5.30158 1.68936 5.77177L6.5351 10.9243L6.53723 10.9211C7.47271 11.8788 7.99905 13.1734 7.99905 14.5233V19.0952C7.99905 19.4007 8.31869 19.5957 8.58399 19.4516L11.3436 17.9479C11.7602 17.7204 12.0201 17.2784 12.0201 16.7984V14.5114C12.0201 13.1691 12.539 11.8799 13.466 10.9243L18.3117 5.77177C18.7528 5.30158 19 4.67647 19 4.02644V3.0904C19 2.21286 18.3 1.5 17.4359 1.5H2.56517Z"
              stroke="#012635"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Filter by user
        </h2>
        <button onClick={onClose}>
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.3394 1.75L1.83936 15.25"
              stroke="#012635"
              stroke-width="1.5"
              stroke-linecap="square"
              stroke-linejoin="round"
            />
            <path
              d="M15.3394 15.25L1.83936 1.75"
              stroke="#012635"
              stroke-width="1.5"
              stroke-linecap="square"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="bottom">
        <div className="top">
          <div className="search">
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              placeholder="Search User"
            />
            <svg
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="8.39454"
                cy="8.8921"
                rx="7.36866"
                ry="7.36866"
                stroke="#012635"
                stroke-width="1.5"
                stroke-linecap="square"
              />
              <path
                d="M13.4258 14.3203L17.5998 18.4835"
                stroke="#012635"
                stroke-width="1.5"
                stroke-linecap="square"
              />
            </svg>
          </div>
          <button>
            <span className="text" onClick={() => handleUserSearch("", "")}>
              Reset
            </span>
          </button>
        </div>
        <div className="bottom">
          <div className="table">
            <div className="row">
              <h6 className="col">User</h6>
              <h6 className="col"></h6>
              <h6></h6>
            </div>
            {uniqueUsers.length > 0 &&
              uniqueUsers
                .filter((t) =>
                  (t?.user?.firstName || t?.admin?.fullName)
                    ?.toLowerCase()
                    .startsWith(searchText.toLowerCase())
                )
                .map((data, i) => {
                  return (
                    <div
                      style={{ cursor: "pointer" }}
                      className="row body"
                      key={i}
                      onClick={() =>
                        handleUserSearch(
                          (data?.user?._id && data.user._id) ||
                          (data?.admin?._id && data.admin._id),
                          (data.admin && "admin") || (data.user && "user")
                        )
                      }
                    >
                      <div className="col data">
                        <p>
                          {data?.user
                            ? data.user.firstName + " " + data.user.lastName
                            : data?.admin?.fullName}
                        </p>
                      </div>
                      <div className="col icon">
                        {(() => {
                          return (
                            userId === data?.user?._id ||
                            userId === data?.admin?._id
                          );
                        })() && (
                            <button>
                              <FaCheckCircle color="#00BD82" />
                            </button>
                          )}
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </MotionLightSidebarStyled>
  );
};

const BatchBuilderModal = ({ onClose, showProcessingBatchModal }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedBatchSize, setSelectedBatchSize] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch({ type: templateConstants.removeTemplates.remove });
    };
  }, []);
 

  return (
    <BatchBuilderModalStyled>
      <div className="top">
        <h2>Batch Builder</h2>
        <button type="button" onClick={onClose}>
          <IoMdClose />
        </button>
      </div>
      <div className="middle">
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className="top"
        >
          <div
            onClick={() => {
              setTimeout(() => {
                setCurrentStep(1);
              }, 500);
            }}
            className={`item one ${currentStep === 1 ? "working" : ""} ${currentStep > 1 ? "done" : ""
              }`}
            style={{
              flexGrow: currentStep === 1 ? 1 : 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: "80px",
              paddingTop: "10px",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                backgroundColor: currentStep >= 1 && "#00BD82",
                color: currentStep >= 1 && "white",
              }}
              className="circle"
            >
              1
            </span>
            <div
              style={{
                padding: "0px 1px",
                flexGrow: 1,
                width: "fit-content",
                borderLeft: `dashed 1px ${currentStep > 1 ? "#00BD82" : "#E0E0E0"
                  } `,
              }}
            ></div>
            {/* <span className="line" /> */}

            {/* <div className="bottom">
              <p>Campaign</p>
              <p>{selectedCampaign ? selectedCampaign.name : ""}</p>
            </div> */}
          </div>
          <div
            onClick={() => {
              if (selectedCampaign !== null) {
                setTimeout(() => {
                  setCurrentStep(2);
                }, 500);
              }
            }}
            className={`item two ${currentStep === 2 ? "working" : ""} ${currentStep > 2 ? "done" : ""
              }`}
            style={{
              flexGrow: currentStep === 2 ? 1 : 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: "80px",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                backgroundColor: currentStep >= 2 && "#00BD82",
                color: currentStep >= 2 && "white",
              }}
              className="circle"
            >
              2
            </span>
            <div
              style={{
                padding: "0px 1px",
                flexGrow: 1,
                width: "fit-content",
                borderLeft: `dashed 1px ${currentStep > 2 ? "#00BD82" : "#E0E0E0"
                  } `,
              }}
            ></div>

            {/* <span className="line" /> */}
            {/* <div className="bottom">
              <p>Message Template</p>
              <p>{selectedTemplate ? selectedTemplate?.name : ""}</p>
            </div> */}
          </div>
          <div
            onClick={() => {
              if (selectedCampaign !== null) {
                setTimeout(() => {
                  setCurrentStep(3);
                }, 500);
              }
            }}
            className={`item three ${currentStep === 3 ? "working" : ""} ${currentStep > 3 ? "done" : ""
              }`}
            style={{
              flexGrow: currentStep === 3 ? 1 : 0,
              paddingBottom: "20px",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                backgroundColor: currentStep == 3 && "#00BD82",
                color: currentStep == 3 && "white",
              }}
              className="circle"
            >
              3
            </span>
            <span className="line" />
            {/* <div className="bottom">
              <p>Batch Size</p>
              <p>{currentStep !== 3 ? "" : selectedBatchSize}</p>
            </div> */}
          </div>
        </div>
        <div className="bottom">
          <div>
            <div
              style={{
                border: "solid 1px #E0E0E0",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  color: "#012635",
                  fontSize: "20px",
                  fontWeight: 600,
                  lineHeight: "28px",
                  borderBottom: currentStep === 1 ? "solid 1px #E0E0E0" : "",
                  backgroundColor: currentStep != 1 && "#F7F7F7",
                  padding: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Select Campaign</span>
                <span
                  style={{
                    backgroundColor: "#E1DDF8",
                    border: "solid 1px #A69FEA",
                    color: "#6955DA",
                    borderRadius: "16px",
                    fontSize: "16px",
                    fontWeight: 500,
                    padding: "0px 8px",
                    display: currentStep <= 1 && "none",
                  }}
                >
                  {selectedCampaign?.name}
                </span>
              </div>
              <div>
                {currentStep === 1 && (
                  <SelectCampaignModal
                    onClose={(campaign) => {
                      setSelectedCampaign(campaign);
                      if (campaign) {
                        setTimeout(() => {
                          setCurrentStep(2);
                        }, 320);
                      }
                    }}
                  />
                )}
              </div>
            </div>

            <div
              style={{
                border: "solid 1px #E0E0E0",
                borderRadius: "12px",
                marginTop: "16px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  color: "#012635",
                  fontSize: "20px",
                  fontWeight: 600,
                  lineHeight: "28px",
                  borderBottom: currentStep === 2 ? "solid 1px #E0E0E0" : "",
                  padding: "16px",
                  backgroundColor: currentStep != 2 && "#F7F7F7",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Message Template</span>{" "}
                <span
                  style={{
                    backgroundColor: "#D6E7FC",
                    border: "solid 1px #005ABB",
                    color: "#005ABB",
                    borderRadius: "16px",
                    fontSize: "16px",
                    fontWeight: 500,
                    padding: "0px 8px",
                    display: currentStep <= 2 && "none",
                  }}
                >
                  {selectedTemplate?.name}
                </span>
              </div>
              {currentStep === 2 && (
                <TemplateSelectPart
                  campaign={selectedCampaign}
                  onClose={(template) => {
                  

                    setSelectedTemplate(template);
                    setCurrentStep(3);
                  }}
                />
              )}
              <div></div>
            </div>

            <div
              style={{
                border: "solid 1px #E0E0E0",
                borderRadius: "12px",
                marginTop: "16px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  color: "#012635",
                  fontSize: "20px",
                  fontWeight: 600,
                  lineHeight: "28px",
                  borderBottom: currentStep === 2 ? "solid 1px #E0E0E0" : "",
                  padding: "16px",
                  backgroundColor: currentStep != 3 && "#F7F7F7",
                }}
              >
                Batch Size
              </div>
              <div>
                {currentStep === 3 && (
                  <BatchSelectPart
                    selectedBatchSize={selectedBatchSize}
                    setSelectedBatchSize={setSelectedBatchSize}
                    onCreate={onClose}
                    showProcessingBatchModal={() => showProcessingBatchModal()}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BatchBuilderModalStyled>
  );
};

const CampaignSelectPart = ({ onClose }) => {
  const [openSelectCampaignModal, setOpenSelectCampaignModal] = useState(false);
  return (
    <CampaignSelectPartStyled>
      <button onClick={() => setOpenSelectCampaignModal(true)}>
        <span className="icon">
          <FaPlus />
        </span>
        <span className="text">Select Campaign</span>
      </button>

      <Components.Common.ModalTop
        open={openSelectCampaignModal}
        onClose={() => { }}
      >
        <SelectCampaignModal
          onClose={(campaign) => {
            setOpenSelectCampaignModal(false);
            if (campaign) {
              setTimeout(() => {
                onClose && onClose(campaign);
              }, 320);
            }
          }}
        />
      </Components.Common.ModalTop>
    </CampaignSelectPartStyled>
  );
};

let selectedComapin;
const SelectCampaignModal = ({ onClose }) => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const { campaigns, errors: error } = useSelector(
    (state) => state.batchReducer
  );
  let uniqueCampaigns = [];

  if (campaigns?.length > 0) {
    uniqueCampaigns = campaigns.filter((item, index, array) => {
      const firstIndex = array.findIndex(
        (obj) => obj?.assignCampaign?.name === item?.assignCampaign?.name
      );
      return index === firstIndex;
    });
  }
  useEffect(() => {
    dispatch(GetCampaignForBatch(1, 5000));
    setSearchText("");
  }, []);
  useEffect(() => {
    if (error?.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error]);
  function formatDate(dateString) {
    // Create a Date object from the input date string (assuming it's in ISO format)
    const date = new Date(dateString);
    // Get the individual date components (month, day, year)
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add 1 to month since it's zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    // Format the date as "MM/DD/YYYY"
    const formattedDate = `${month}/${day}/${year}`;

    return formattedDate;
  }

  const handleCloseCompaignModal = (item) => {
    onClose(item);
  };
  const handleAssignCompain = (item) => {
    let result = { campagin: item._id };
    selectedComapin = result;
    dispatch(CheckCompaignWorkingHour(result, handleCloseCompaignModal, item));
  };
  return (
    <SelectCampaignModalStyled>
      {/* <div className="top">
        <h2>Select A Campaign</h2>
        <button onClick={() => onClose(null)}>Cancel</button>
      </div> */}
      <div className="bottom">
        <div className="top">
          <div
            style={{
              display: "flex",
              border: "1px solid #D3D7DD",
              borderRadius: "8px",
              alignItems: "center",
              paddingRight: "12px",
            }}
          >
            <input
              type="text"
              placeholder="Search Campaigns"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
            <FiSearch style={{ fontSize: "22px" }} />
          </div>
          {/* <p>
            Filtering campaigns with prospects available from 01/29/23 -
            07/30/23
          </p> */}
        </div>
        <div
          style={{
            border: "solid 1px #E0E0E0",
            borderRadius: "8px",
            overflow: "hidden",
            maxHeight: "396px",
            overflow: "auto",
          }}
          className="bottom"
        >
          <table>
            <thead style={{ borderBottom: "solid 1px #E0E0E0" }}>
              <tr>
                <th>Created at</th>
                <th>Campaign </th>
                <th>Actions </th>
              </tr>
            </thead>
            <tbody>
              {/* eslint-disable-next-line no-constant-condition */}
              {1 === 0 ? (
                <tr>
                  <td className="loading" colSpan={3}>
                    <div>
                      <CircularProgress />
                    </div>
                    <div>LOADING</div>
                  </td>
                </tr>
              ) : (
                <>
                  {campaigns?.length > 0 &&
                    campaigns
                      .filter((t) => t?.remaning > 0 || t?.remaning === -1)
                      .filter((t) =>
                        t?.name
                          ?.toLowerCase()
                          ?.startsWith(searchText.toLowerCase())
                      )
                      .map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>
                              {" "}
                              {item?.createdAt && formatDate(item.createdAt)}
                            </td>
                            <td>
                              {item?.title ?? item?.name ?? ""}
                              <p>
                                Prospects Available:{" "}
                                {item?.remaning === -1
                                  ? item?.totalProspects
                                  : item?.remaning}
                              </p>
                            </td>
                            <td>
                              <button onClick={() => handleAssignCompain(item)}>
                                Select
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </SelectCampaignModalStyled>
  );
};

const TemplateSelectPart = ({ campaign, onClose }) => {

  const [selectedTemplateId, setSelectedTemplateId] = useState(template);
  const [selectedTemplateCategory, setSelectedTemplateCategory] =
    useState(templateCategory);
  const dispatch = useDispatch();
  const { templatesData, singleTemplate, loading } = useSelector(
    (state) => state.templateReducer
  );

  useEffect(() => {
    dispatch(
      getAllTemplatess({
        limit: 5000,
        page: 1,
        mode: campaign?.permission === "compaign" ? "initial" : "follow",
      })
    );
  }, []);

  const allTemplateTypes = [
    ...new Set(templatesData?.results.map((item) => item.type)),
  ];
  const handleSingleTemplate = (e) => {
    setSelectedTemplateId(e.target.value);
    template = e.target.value;
    dispatch(getSingleTemplate({ _id: e.target.value }));
  };

  const handleChangeCategoyTemplate = (e) => {
    setSelectedTemplateId("");
    templateCategory = e.target.value;
    setSelectedTemplateCategory(e.target.value);
  };

  return (
    <TemplateSelectPartStyled
      style={{ gap: "0px" }}
      ChevronDown={Assets.Images.ChevronDown}
    >
      <div
        // style={{ display: "flex", gap: "16px", padding: "16px" }}
        className="top"
      >
        <div>
          <select
            onChange={(e) => handleChangeCategoyTemplate(e)}
            value={templateCategory}
            style={{
              border: "2px solid #D3D7DD", // Border width and color
              width: "100%", // Adjust the width as needed
              height: "48px", // Adjust the height as needed
              borderRadius: "8px", // Optional: for rounded corners
              padding: "5px", // Optional: for spacing inside the select
              boxSizing: "border-box", // Ensures padding doesn’t affect the total width/height
              cursor: allTemplateTypes?.length <= 0 ? "no-drop" : "pointer", // Ensures padding doesn’t affect the total width/height
            }}
            disabled={allTemplateTypes?.length <= 0}
          >
            <option value="" disabled>
              Select Category
            </option>
            {allTemplateTypes?.map((template, index) => (
              <option value={template} key={index}>
                {template}
              </option>
            ))}
          </select>
        </div>
        <div>
          {/* <select
          onChange={(e) => handleSingleTemplate(e)}
          value={selectedTemplateId}
        >
          <option value="" disabled>
            Select Template
          </option>
          {templatesData?.results?.map((template, index) => (
            <option value={template?._id} key={index}>
              {template.name}
            </option>
          ))}
        </select> */}
          <select
            onChange={(e) => handleSingleTemplate(e)}
            value={template}
            style={{
              border: "1px solid #D3D7DD", // Border width and color
              width: "100%", // Adjust the width as needed
              height: "48px", // Adjust the height as needed
              borderRadius: "8px", // Optional: for rounded corners
              padding: "5px", // Optional: for spacing inside the select
              boxSizing: "border-box", // Ensures padding doesn’t affect the total width/height
              cursor: selectedTemplateCategory == "" ? "no-drop" : "pointer", // Ensures padding doesn’t affect the total width/height
            }}
            disabled={selectedTemplateCategory == ""}
          >
            <option value="" disabled>
              Select Template
            </option>
            {templatesData?.results
              ?.filter((tProp) => tProp?.type == selectedTemplateCategory)
              ?.map((template, index) => (
                <option value={template?._id} key={index}>
                  {template.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="bottom">
        {singleTemplate?.messages ? (
          <div
            style={{
              padding: "10px",
              margin: "0px 16px",
              borderRadius: "8px",
              border: "solid 1px #E0E0E0",
            }}
            className="top"
          >
            <div className="item">
              <h6 style={{ display: "flex", alignItems: "center" }}>
                Message 1
              </h6>
              <p
                dangerouslySetInnerHTML={{
                  __html: formatTemplateString(
                    Object.keys(singleTemplate).length === 0
                      ? "---"
                      : singleTemplate?.messages[0]?.message1
                  ),
                }}
                style={{
                  borderBottom: "solid 1px #E0E0E0",
                  paddingBottom: "8px",
                }}
              />
            </div>
            <div className="item">
              <h6 style={{ display: "flex", alignItems: "center" }}>
                Message 2
              </h6>
              <p
                dangerouslySetInnerHTML={{
                  __html: formatTemplateString(
                    Object.keys(singleTemplate).length === 0
                      ? "---"
                      : singleTemplate?.messages[0]?.message2
                  ),
                }}
                style={{
                  borderBottom: "solid 1px #E0E0E0",
                  paddingBottom: "8px",
                }}
              />
            </div>
            <div className="item">
              <h6 style={{ display: "flex", alignItems: "center" }}>
                Message 3
              </h6>
              <p
                dangerouslySetInnerHTML={{
                  __html: formatTemplateString(
                    Object.keys(singleTemplate).length === 0
                      ? "---"
                      : singleTemplate?.messages[0]?.message3
                  ),
                }}
                style={{
                  borderBottom: "solid 1px #E0E0E0",
                  paddingBottom: "8px",
                }}
              />
            </div>
            <div className="item">
              <h6 style={{ display: "flex", alignItems: "center" }}>
                Message 4
              </h6>
              <p
                dangerouslySetInnerHTML={{
                  __html: formatTemplateString(
                    Object.keys(singleTemplate).length === 0
                      ? "---"
                      : singleTemplate?.messages[0]?.message4
                  ),
                }}
                style={{
                  borderBottom: "solid 1px #E0E0E0",
                  paddingBottom: "8px",
                }}
              />
            </div>
            <div className="item">
              <h6 style={{ display: "flex", alignItems: "center" }}>
                Alt Message
              </h6>
              <p
                dangerouslySetInnerHTML={{
                  __html: formatTemplateString(
                    Object.keys(singleTemplate).length === 0
                      ? "---"
                      : singleTemplate?.messages[0]?.altMessage
                  ),
                }}
                style={{
                  borderBottom: "solid 1px #E0E0E0",
                  paddingBottom: "8px",
                }}
              />
            </div>
          </div>
        ) : (
          <div
            style={{
              color: "#777777",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "22px",
              height: "356px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
              margin: "0px 16px",
              borderRadius: "8px",
              border: "solid 1px #E0E0E0",
              textAlign: "center",
            }}
          >
            Please first select the message template and <br />
            see messages
          </div>
        )}

        <div className="bottom">
          {singleTemplate?.messages && selectedTemplateId !== "" ? (
            <span
              style={{
                color: "#012635",
                fontSize: "14px",
                lineHeight: "22px",
                fontWeight: 500,
              }}
            >{`Variations: ${singleTemplate?.totalVariations}`}</span>
          ) : (
            <span
              style={{
                color: "#012635",
                fontSize: "14px",
                lineHeight: "22px",
                fontWeight: 500,
              }}
            >{`Variations: 0`}</span>
          )}

          <button
            disabled={selectedTemplateId === ""}
            onClick={() => onClose(singleTemplate)}
          >
            <span className="text">Select batch size</span>
            {/* <span className="icon">
              <FaArrowRight />
            </span> */}
          </button>
        </div>
      </div>
    </TemplateSelectPartStyled>
  );
};

const BatchSelectPart = ({
  selectedBatchSize,
  setSelectedBatchSize,
  onCreate,
  showProcessingBatchModal,
}) => {
  const dispatch = useDispatch();
  const {
    message,
    errors: error,
    loading,
  } = useSelector((state) => state.batchReducer);
  const { campaigns, errors: error2 } = useSelector(
    (state) => state.batchReducer
  );

  const { messageSendData, reportSendAndQueue } = useSelector((state) => state.dashboardReducer);
  const handleCreateBatch = () => {
    let finalResult = {
      campagin: selectedComapin?.campagin,
      template: template,
      batchSize: selectedBatchSize,
    };
    dispatch(CreateBatch(finalResult, showProcessingBatchModal));
  };

  const remaningContent = Math.min(
    campaigns.filter((d) => d?._id == selectedComapin?.campagin)[0]?.remaning,
    messageSendData?.dailyMessageLimit -
    (messageSendData?.totalSendDailyMessageCount + reportSendAndQueue?.totalMessagesInQueue
    )
  );



  const userRemainingContent =
    messageSendData?.dailyMessageLimit -
    messageSendData?.totalSendDailyMessageCount;

  // const remaningContent = [{
  //   remaning:150
  // }]

  useEffect(() => {
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message !== "") {
      dispatch(clearMessages());
      onCreate();
    }
  }, [error, message]);
  //
  return (
    <BatchSelectPartStyled>
      {/* <div className="top">
        <h2>Batch size</h2>
      </div> */}
      <div className="bottom">
        <div className="top">
          {remaningContent < 50 ? (
            <button
              className={
                selectedBatchSize === remaningContent ? "selected" : ""
              }
              onClick={() => setSelectedBatchSize(remaningContent)}
            >
              {remaningContent}
            </button>
          ) : (
            <button
              className={selectedBatchSize === 50 ? "selected" : ""}
              onClick={() => setSelectedBatchSize(50)}
            >
              50
            </button>
          )}

          {remaningContent > 50 ? (
            <>
              {remaningContent < 100 ? (
                <button
                  className={
                    selectedBatchSize === remaningContent ? "selected" : ""
                  }
                  onClick={() => setSelectedBatchSize(remaningContent)}
                >
                  {remaningContent}
                </button>
              ) : (
                <button
                  className={selectedBatchSize === 100 ? "selected" : ""}
                  onClick={() => setSelectedBatchSize(100)}
                >
                  100
                </button>
              )}
            </>
          ) : (
            ""
          )}

          {remaningContent > 100 ? (
            <>
              {remaningContent < 150 ? (
                <button
                  className={
                    selectedBatchSize === remaningContent ? "selected" : ""
                  }
                  onClick={() => setSelectedBatchSize(remaningContent)}
                >
                  {remaningContent}
                </button>
              ) : (
                <button
                  className={selectedBatchSize === 150 ? "selected" : ""}
                  onClick={() => setSelectedBatchSize(150)}
                >
                  150
                </button>
              )}
            </>
          ) : (
            ""
          )}
        </div>
        <div className="bottom">
          <button disabled={selectedBatchSize === 0 || loading ? true : false}>
            <span className="text" onClick={() => handleCreateBatch()}>
              {loading ? "Please wait..." : "Create batch"}
            </span>
            {/* <span className="icon">
              <FaArrowRight />
            </span> */}
          </button>
        </div>
      </div>
    </BatchSelectPartStyled>
  );
};

const TemplateChangeModal = ({ onClose, batchId, mode, templateId }) => {
  useEffect(() => {
    dispatch(
      getAllTemplatess({
        limit: 5000,
        page: 1,
        mode: mode,
      })
    );
  }, []);
  const { templatesData } = useSelector((s) => s.templateReducer);
  const [selectedTemplate, setSelectedTemplate] = useState();
  const [loadTemplate, setLoadTemplate] = useState(true);
  useEffect(() => {
    setLoadTemplate(true);
    setSelectedTemplate(
      templatesData?.results?.filter((data) => data?._id === templateId)[0]
    );
    let timer = setTimeout(() => setLoadTemplate(false), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [templateId, batchId]);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (template) => {
    setSelectedTemplate(template);
    setIsOpen(false);
  };

  function formatTemplateString(templateString) {
    if (!templateString) return "";

    return templateString
      .replace(/\{(.*?)\}/g, '<span style="color: #3086ee">{$1}</span>')
      .replace(/\[(.*?)\]/g, '<span style="color: #EA3815">[$1]</span>');
  }
  useLayoutEffect(() => {
    dispatch(
      getAllTemplatess({
        limit: 5000,
        page: 0,
        mode: mode,
        search: searchText,
      })
    );
  }, [dispatch, searchText]);

  return (
    <TemplateChangeModalStyled>
      <div
        className="top"
        style={{
          borderBottom: "1px solid #F7F7F7",
          borderRadius: " 12px 12px 0px 0px",
        }}
      >
        <h2>Change Template</h2>
        <button type="button" onClick={onClose}>
          <RxCross1 />
        </button>
      </div>
      <div className="middle">
        {loadTemplate ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <CircularLoader />
          </div>
        ) : (
          <>
            <div style={{ position: "relative", width: "100%" }}>
              <div
                onClick={toggleDropdown}
                style={{
                  border: `1px solid ${isOpen ? "#5BF1B2" : "#D3D7DD"}`,
                  width: "100%",
                  height: "48px",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  boxSizing: "border-box",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {selectedTemplate ? selectedTemplate.name : "Select Template"}
                <FaChevronDown style={{ color: "#6B7280" }} />
              </div>
              {isOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "112%",
                    left: 0,
                    width: "100%",
                    border: "1px solid #D3D7DD",
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                    zIndex: 10,
                    maxHeight: "356px",
                    overflowY: "auto",
                  }}
                >
                  {templatesData?.results?.map((template, index) => (
                    <div
                      key={index}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => handleSelect(template)}
                      style={{
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        // borderBottom: "1px solid #D3D7DD",
                        borderRadius: "8px",
                        backgroundColor:
                          hoveredIndex === index ? "#F7F8FC" : "transparent",
                      }}
                    >
                      <span>{template.name}</span>
                      {hoveredIndex === index && (
                        <FaCheckCircle style={{ color: "#00BD82" }} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {selectedTemplate?.messages ? (
              <BatchesScroll
                style={{
                  padding: "10px",
                  overflow: "auto",
                  borderRadius: "8px",
                  border: "solid 1px #E0E0E0",
                  height: "414px",
                }}
                className="top"
              >
                <div
                  className="item"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "15rem 1fr",
                    padding: "0.65rem 1.3rem",
                  }}
                >
                  <h6
                    style={{
                      display: "flex",
                      alignItems: "center",
                      lineHeight: "22px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#012635",
                    }}
                  >
                    Message 1
                  </h6>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: formatTemplateString(
                        Object.keys(selectedTemplate).length === 0 ||
                          !selectedTemplate
                          ? "---"
                          : selectedTemplate?.messages[0]?.message1
                      ),
                    }}
                    style={{
                      borderBottom: "solid 1px #E0E0E0",
                      paddingBottom: "8px",
                      color: "#777777",
                    }}
                  />
                </div>
                <div
                  className="item"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "15rem 1fr",
                    padding: "0.65rem 1.3rem",
                  }}
                >
                  <h6
                    style={{
                      display: "flex",
                      alignItems: "center",
                      lineHeight: "22px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#012635",
                    }}
                  >
                    Message 2
                  </h6>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: formatTemplateString(
                        Object.keys(selectedTemplate).length === 0 ||
                          !selectedTemplate
                          ? "---"
                          : selectedTemplate?.messages[0]?.message2
                      ),
                    }}
                    style={{
                      borderBottom: "solid 1px #E0E0E0",
                      paddingBottom: "8px",
                      color: "#777777",
                    }}
                  />
                </div>
                <div
                  className="item"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "15rem 1fr",
                    padding: "0.65rem 1.3rem",
                  }}
                >
                  <h6
                    style={{
                      display: "flex",
                      alignItems: "center",
                      lineHeight: "22px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#012635",
                    }}
                  >
                    Message 3
                  </h6>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: formatTemplateString(
                        Object.keys(selectedTemplate).length === 0 ||
                          !selectedTemplate
                          ? "---"
                          : selectedTemplate?.messages[0]?.message3
                      ),
                    }}
                    style={{
                      borderBottom: "solid 1px #E0E0E0",
                      paddingBottom: "8px",
                      color: "#777777",
                    }}
                  />
                </div>
                <div
                  className="item"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "15rem 1fr",
                    padding: "0.65rem 1.3rem",
                  }}
                >
                  <h6
                    style={{
                      display: "flex",
                      alignItems: "center",
                      lineHeight: "22px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#012635",
                    }}
                  >
                    Message 4
                  </h6>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: formatTemplateString(
                        Object.keys(selectedTemplate).length === 0 ||
                          !selectedTemplate
                          ? "---"
                          : selectedTemplate?.messages[0]?.message4
                      ),
                    }}
                    style={{
                      borderBottom: "solid 1px #E0E0E0",
                      paddingBottom: "8px",
                      color: "#777777",
                    }}
                  />
                </div>
                <div
                  className="item"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "15rem 1fr",
                    padding: "0.65rem 1.3rem",
                  }}
                >
                  <h6
                    style={{
                      display: "flex",
                      alignItems: "center",
                      lineHeight: "22px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#012635",
                    }}
                  >
                    Alt Message
                  </h6>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: formatTemplateString(
                        Object.keys(selectedTemplate).length === 0 ||
                          !selectedTemplate
                          ? "---"
                          : selectedTemplate?.messages[0]?.altMessage
                      ),
                    }}
                    style={{
                      color: "#777777",
                      borderBottom: "solid 1px #E0E0E0",
                      paddingBottom: "8px",
                    }}
                  />
                </div>
              </BatchesScroll>
            ) : (
              <div
                style={{
                  color: "#777777",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "22px",
                  height: "414px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "solid 1px #E0E0E0",
                  textAlign: "center",
                }}
              >
                Please first select the message template and <br />
                see messages
              </div>
            )}
          </>
        )}
      </div>
      <div
        className="bottom"
        style={{
          borderTop: "1px solid #F7F7F7",
          borderRadius: "0px 0px 12px 12px",
        }}
      >
        <button
          style={{ color: "#777777", border: "solid 1px #777777 " }}
          type="button"
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            dispatch(
              ChangeTemplate({ template: selectedTemplate?._id }, batchId)
            );
            onClose();
          }}
          style={{
            fontSize: "16px",
            color: "#fff",
            fontWweight: "500",
            borderRadius: "8px",
            lineHeight: "24px",
            height: "40px",
            border: "none",
            backgroundColor: "#06AB78",
            width: "158px",
          }}
        >
          Select Template
        </button>
      </div>
    </TemplateChangeModalStyled>
  );
};
const BatchProcesingModal = ({ onClose, payLoad }) => {
  const message1 = useRef(null);
  const [count1, setCount1] = useState(0);
  const [batchData1, setBatchData1] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [displayMessage, setDisplayMessage] = useState("");
  const dispatch = useDispatch();
  const buttonRef = useRef(null);
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user") || "null");
  const {
    createBatchData,
    createBatchDirectImport,
    loading2,
    template,
    compaign,
    errors: error,
  } = useSelector((state) => state.batchReducer);

  useEffect(() => {
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error]);

  const isPastDate = (dateString, timeZone = "UTC") => {
    const now = new Date().toLocaleString("en-US", { timeZone });
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    const inputDate = new Date(dateString);
    inputDate.setHours(0, 0, 0, 0);

    return inputDate < today;
  };

  // Example Usage
  // console.log(isPastDate("2025-03-02", "Asia/Kolkata"));

  const { allVariations, messages } = useMessageTemplate();

  function replaceStrongTagsWithBraces(input) {
    const replacedString = input
      .replace(/<strong>/g, "{")
      .replace(/<\/strong>/g, "}");
    return replacedString;
  }
  const variation3 = allVariations.map(replaceStrongTagsWithBraces);
  useLayoutEffect(() => {
    messages[0].setMessage(template?.message1 ? template?.message1 : "");
    messages[1].setMessage(template?.message2 ? template?.message2 : "");
    messages[2].setMessage(template?.message3 ? template?.message3 : "");
    messages[3].setMessage(template?.message4 ? template?.message4 : "");
  }, [template]);

  let batchData = batchData1
    ?.filter((data) => data?.phone1 !== "N/A")
    .slice(0, createBatchData?.batchSize);

  let count = batchData?.filter((data) => data.status)?.length;
  let lastData = batchData?.length ? batchData[batchData?.length - 1] : {};
  let currentData = batchData?.find((data, i) => {
    if (
      (i == 0 && !data?.status) ||
      (i != 0 && batchData[i - 1].status && !data.status)
    ) {
      return data;
    }
  });
  let noTemplate = Math.ceil(batchData?.length / compaign?.phone?.length);
  let phoneNoDivision = Math.ceil(noTemplate);
  const removeStreetNumber = (address) => {
    const regex = /^\d+\s/;
    return address.replace(regex, "");
  };
  const replaceWordsInMessage = (messageTemplate) => {
    let message = messageTemplate;
    let userInfo = JSON.parse(
      localStorage.getItem("user") || localStorage.getItem("user")
    );
    message = message?.replace(/\{FirstName}/, () => {
      return currentData?.firstName || "";
    });
    message = message?.replace(/\{LastName}/, () => {
      return currentData?.lastName || "";
    });
    message = message?.replace(/\{PropertyCity}/, () => {
      return currentData?.propertyCity || "";
    });
    message = message?.replace(/\{MailingAddress}/, () => {
      return currentData?.mailingAddress || "";
    });
    message = message?.replace(/\{CompanyName}/, () => {
      return (
        createBatchData?.user?.companyName ||
        createBatchData?.admin?.companyName ||
        userInfo?.companyName ||
        ""
      );
    });
    message = message?.replace(/\{AliasRepName}/, () => {
      return (
        createBatchData?.user?.aliasName ||
        createBatchData?.admin?.aliasName ||
        userInfo?.aliasName ||
        ""
      );
    });
    message = message?.replace(/\{PropertyAddress}/, () => {
      return currentData?.propertyAddress &&
        currentData?.propertyAddress !== "N/A"
        ? currentData?.propertyAddress
        : "";
    });
    message = message?.replace(/\{No#Address}/, () => {
      return currentData?.propertyAddress &&
        currentData?.propertyAddress !== "N/A"
        ? removeStreetNumber(currentData?.propertyAddress)
        : "";
    });
    message = message?.replace(/\{APN}/, () => {
      return currentData?.apn && currentData?.apn !== "N/A"
        ? currentData?.apn
        : "";
    });
    message = message?.replace(/\{PROPERTYCOUNTY}/, () => {
      return currentData?.propertyCounty &&
        currentData?.propertyCounty !== "N/A"
        ? currentData?.propertyCounty
        : "";
    });
    message = message?.replace(/\{ACREAGE}/, () => {
      return currentData?.acreage && currentData?.acreage !== "N/A"
        ? currentData?.acreage
        : "";
    });
    return message;
  };

  const replaceWordsInMessageWithoutSomeFields = (
    messageTemplate,
    currentBatchData
  ) => {
    let message = messageTemplate;
    message = message?.replace(/\{PropertyCity}/, () => {
      return currentBatchData?.propertyCity
        ? currentBatchData?.propertyCity
        : currentData?.propertyCity || "";
    });
    message = message?.replace(/\{MailingAddress}/, () => {
      return currentBatchData?.mailingAddress
        ? currentBatchData.mailingAddress
        : currentData?.mailingAddress || "";
    });
    message = message?.replace(/\{PropertyAddress}/, () => {
      return currentBatchData?.propertyAddress
        ? currentBatchData.propertyAddress
        : currentData?.propertyAddress && currentData?.propertyAddress !== "N/A"
          ? currentData?.propertyAddress
          : "";
    });
    message = message?.replace(/\{No#Address}/, () => {
      return currentBatchData?.propertyAddress
        ? currentBatchData.propertyAddress
        : currentData?.propertyAddress && currentData?.propertyAddress !== "N/A"
          ? removeStreetNumber(currentData?.propertyAddress)
          : "";
    });
    message = message?.replace(/\{APN}/, () => {
      return currentBatchData?.apn
        ? currentBatchData.apn
        : currentData?.apn && currentData?.apn !== "N/A"
          ? currentData?.apn
          : "";
    });
    message = message?.replace(/\{PROPERTYCOUNTY}/, () => {
      return currentBatchData?.propertyCounty
        ? currentBatchData.propertyCounty
        : currentData?.propertyCounty && currentData?.propertyCounty !== "N/A"
          ? currentData?.propertyCounty
          : "";
    });
    message = message?.replace(/\{ACREAGE}/, () => {
      return currentBatchData?.acreage
        ? currentBatchData.acreage
        : currentData?.acreage && currentData?.acreage !== "N/A"
          ? currentData?.acreage
          : "";
    });
    return message;
  };

  const updateObject = (id) => {
    const updatedArray = batchData1?.map((obj) => {
      if (obj.id === id) {
        return { ...obj, status: true };
      }
      return obj;
    });
    setBatchData1(updatedArray);
  };

  let message;
  let senderPhoneNumber;

  const [isSendingStart, setIsSendingStart] = useState(false);

  // const handleSendMessage = () =>{
  //   if (isPastDate(payLoad?.batchData, userData?.timeZone) && !payLoad?.previousBatchUpdated) {
  //     dispatch(UpdateDailyCount({ batchId: payLoad?.batchId, batchSenderNumber: payLoad?.batchSenderNumber, batchTotalProspects: payLoad?.batchTotalProspects}))
  //   }
  //   console.log("log check payload", isPastDate(payLoad?.batchData, userData?.timeZone));
  // }

  const handleSendMessage = async () => {
    // setIsSendingStart(true);
    let currentPhoneIndex = 0;
    for (let i = 1; i < compaign?.phone?.length + 1; i++) {
      if (i === 1 && count + 1 <= noTemplate) {
        currentPhoneIndex = i - 1;
      }
      if (
        i > 1 &&
        count + 1 > noTemplate * (i - 1) &&
        count + 1 <= noTemplate * i
      ) {
        currentPhoneIndex = i - 1;
      }
    }

    // Increment batchSendMessage first
    const batchSendMessageValue = count + 1;
    if (currentData?.id === lastData?.id) {
      setCount1(0);
      count = 0;
      setIsComplete(true);
      setIsSendingStart(false);
    } else {
      // Increment count after setting batchSendMessage
      count++;

      setCount1(count);
    }

    message = replaceWordsInMessage(variation3[count % variation3.length]);
    message1.current.value = message;
    senderPhoneNumber = compaign?.phone[currentPhoneIndex];
    const user = JSON.parse(
      localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
    );
    const admin = JSON.parse(
      localStorage.getItem("admin") ?? localStorage.getItem("admin") ?? "{}"
    );
    let messageTemplate = replaceWordsInMessageWithoutSomeFields(
      variation3[count % variation3.length]
    );
    let data = {
      // batchSendMessage: count + 1,
      phoneId: currentData?.id || lastData?.id,
      batchId: createBatchData._id,
      phone:
        currentData?.phone1.replace(/[^\d]/g, "") ||
        lastData?.phone1.replace(/[^\d]/g, ""),
      userName:
        (currentData?.firstName || lastData?.firstName) +
        " " +
        (currentData?.lastName || lastData?.lastName),
      companyName:
        Object.keys(user).length === 0 ? admin?.companyName : user?.companyName,
      aliasName:
        Object.keys(user).length === 0 ? admin?.aliasName : user?.aliasName,
      message: message,
      senderPhoneNumber: senderPhoneNumber?.replace(/[^\d]/g, ""),
      completed: currentData?.id === lastData?.id ? true : false,
      campaign: createBatchData?.campagin?._id
        ? createBatchData?.campagin?._id
        : createBatchData?.campagin
          ? createBatchData?.campagin
          : "",
      messageTemplate,
    };
    // try {
    //   await dispatch(SendMessage(data, onClose));
    //   updateObject(currentData?.id); // Move inside try block to ensure it runs only on success
    // } catch (error) {
    //   console.error("Error hitting API:", error);
    // } finally {
    //   // Any cleanup or state updates can go here if needed
    // }
    dispatch(SendMessage(data, onClose));
    updateObject(currentData?.id);
    if (currentData?.id === lastData?.id) {
      setIsComplete(true);
      setIsSendingStart(false);
    }
  };

  useEffect(() => {
    if (isSendingStart == true) {
      // handleSendMessage();
    }
  }, [batchData1]);

  const message12 = useMemo(() => {
    // debugger
    if (currentData != undefined) {
      let message;

      if (count >= variation3?.length) {
        setCount1((prev) => (prev = count - variation3?.length));
        if (count === batchData?.length || count1 >= variation3?.length) {
          setCount1(0);
        }

        message = replaceWordsInMessage(variation3[count % variation3?.length]);
        setDisplayMessage(message);
        return message;
      }

      message = replaceWordsInMessage(variation3[count]);
      setDisplayMessage(message);
      return message;
    }
  }, [template, count, allVariations]);

  const user = JSON.parse(
    localStorage.getItem("user") || localStorage.getItem("user")
  );
  const userType =
    localStorage.getItem("type") || localStorage.getItem("type");

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        buttonRef.current.click();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      dispatch(GetCompleteStatusBatch(1, 10));
      dispatch({ type: templateConstants.removeTemplates.remove });
      if (userType !== "admin") {
        dispatch(GetPausedStatusBatch(user?._id, "user"));
      } else {
        dispatch(GetPausedStatusBatch());
      }
    };
  }, []);

  const handleBeforeUnload = (event) => {
    if (isSendingStart) {
      event.preventDefault();
      event.returnValue = "";
    }
  };
  useEffect(() => {
    const scrollToCompleted = () => {
      if (tableRef.current) {
        const rows = tableRef.current.getElementsByTagName("tr");
        for (let i = 0; i < batchData?.length; i++) {
          const row = rows[i];
          if (!batchData[i]?.status) {
            row?.scrollIntoView({ behavior: "smooth", block: "center" });
            break;
          }
        }
      }
    };

    scrollToCompleted();
  }, [createBatchData, batchData]);
  useEffect(() => {
    setBatchData1(createBatchDirectImport);
  }, [createBatchDirectImport]);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isSendingStart]);

  console.log("displayMessage" , displayMessage);
  

  return (
    <BatchProcesingModalStyled>
      <div
        className="top"
        style={{ borderBottom: "1px solid #f7f7f7", height: "58px" }}
      >
        <h2>Batch</h2>

        <button
          className="float"
          onClick={() => {
            if (isSendingStart) {
              toast.error("Please wait until the process is completed");
            } else {
              dispatch({ type: batchConstant.REMOVE_DATA_FROM_STORE });
              onClose();
              window.location.reload();
            }
          }}
        >
          {/* <FaTimes /> */}
          <RxCross1 />
        </button>
      </div>
      <div className="bottom">
        <div className="top">
          <div className="left">
            <div className="item one">
              <div
                className="ResponsiveContainer"
                style={{
                  backgroundColor: "#E8F0FB",
                  height: "107px",
                  width: "254px",
                  padding: "16px",
                  borderRadius: "16px",
                  display: "grid",
                  gap: "22px",
                }}
              >
                <div style={{ display: "flex", gap: "6px" }}>
                  <span
                    className="icon"
                    style={{ color: "#3086EE", fontSize: "18px" }}
                  >
                    {/* <FaBullhorn /> */}
                    <img src={Assets.Images.Megaphone} />
                  </span>
                  <span
                    className="text"
                    style={{
                      lineHeight: "24px",
                      fontWeight: "500",
                      color: "#3086ee",
                    }}
                  >
                    Campaign
                  </span>
                </div>
                <div>
                  <h6
                    style={{
                      fontSize: "18px",
                      lineHeight: "26px",
                      fontWeight: "500",
                      color: "#012635",
                    }}
                  >
                    {(compaign && compaign.name) || compaign.title || "---"}
                  </h6>
                </div>
              </div>
            </div>
            <div className="item two">
              <div
                className="ResponsiveContainer"
                style={{
                  backgroundColor: "#E1F3EE",
                  height: "107px",
                  width: "254px",
                  padding: "16px",
                  borderRadius: "16px",
                  display: "grid",
                  gap: "22px",
                }}
              >
                <div style={{ display: "flex", gap: "6px" }}>
                  <span
                    className="icon"
                    style={{ color: "#00BD82", fontSize: "18px" }}
                  >
                    {/* <FaHome /> */}
                    <img src={Assets.Images.Storefront} />
                  </span>
                  <span
                    className="text"
                    style={{
                      lineHeight: "24px",
                      fontWeight: "500",
                      color: "#00BD82",
                    }}
                  >
                    Current Market
                  </span>
                </div>
                <div>
                  <h6
                    style={{
                      fontSize: "18px",
                      lineHeight: "26px",
                      fontWeight: "500",
                      color: "#012635",
                    }}
                  >
                    {(compaign && compaign.market?.areaCode) || "---"}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div
              style={{
                backgroundColor: "#F7F7F7",
                height: "230px",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  lineHeight: "24px",
                  fontWeight: "500",
                  color: "#012635",
                  paddingBottom: "5px",
                }}
              >
                Message Preview & Process
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "166px 1fr",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "16px",
                    height: "166px",
                    padding: "16px",
                  }}
                >
                  <div
                    className="item three"
                    style={{
                      display: "grid",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      className="icon circle"
                      style={{
                        width: "120px",
                        height: "120px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CircularProgressbarStyled
                        value={(count / batchData?.length) * 100}
                        text={count >= 0 ? `${count}/${batchData?.length}` : ""}
                        styles={buildStyles({
                          // strokeLinecap: "butt",
                          // textSize: "2rem",
                          pathTransitionDuration: 0.5,
                          pathColor: `#384ad7`,
                          textColor: "#2022AE",
                          trailColor: "#d6d6d6",
                          textAnchor: "middle",

                          trailColor: "#EBE9F8",
                        })}
                      />
                    </div>
                    {/* <span className="text">Message To</span> */}
                    <h6
                      style={{
                        fontSize: "12px",
                        lineHeight: "20px",
                        fontWeight: "500",
                        color: "#777777",
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {currentData?.phone1}
                    </h6>
                  </div>
                </div>
                <div
                  style={{
                    // backgroundColor: "#fff",
                    borderRadius: "8px",
                    height: "166px",
                  }}
                >
                  <div style={{ display: "grid", gap: "5px", width: "100%" }}>
                    <div
                      style={{
                        width: "100%",
                        height: "124px",
                        overflow: "auto",
                        position: "relative",
                      }}
                    >
                      <textarea
                        disabled
                        ref={message1}
                        value={displayMessage}
                        style={{
                          backgroundColor: "#fff",
                          fontSize: "12px",
                          lineHeight: "22px",
                          fontWeight: "400",
                          padding: "20px 25px 25px 20px",
                          borderRadius: "8px",
                          color: "#777777",
                          height: "114px",
                          border: "none",
                          width: "100%",
                        }}
                        maxLength={300}
                        rows="3"
                      ></textarea>

                      <p
                        style={{
                          position: "absolute",
                          bottom: "15px",
                          right: "10px",
                          color: "#777777",
                        }}
                      >{`${displayMessage?.length}/300`}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                      }}
                    >
                      {isComplete ? (
                        <button
                          // ref={buttonRef}
                          onClick={() => {
                              navigate("/inbox")
                            setTimeout(() => {
                              window.location.reload();
                            }, 0);
                          }}
                          style={{
                            width: "147px",
                            height: "40px",
                            borderRadius: "8px",
                            color: "#fff",
                            fontSize: "16px",
                            fontWeight: 500,
                            lineHeight: "24px",
                            backgroundColor: "#06AB78",
                            cursor: "pointer",
                          }}
                        >
                          <span className="text">inbox</span>
                        </button>
                      ) : (
                        <button
                          ref={buttonRef}
                          disabled={
                            batchData?.length < 1 ||
                              isComplete ||
                              isSendingStart
                              ? true
                              : false
                          }
                          onClick={() => {
                            handleSendMessage();
                            if (
                              isPastDate(
                                payLoad?.batchData,
                                userData?.timeZone
                              ) &&
                              !payLoad?.previousBatchUpdated
                            ) {
                              dispatch(
                                UpdateDailyCount({
                                  batchId: payLoad?.batchId,
                                  batchSenderNumber: payLoad?.batchSenderNumber,
                                  batchTotalProspects:
                                    payLoad?.batchTotalProspects,
                                  previousBatchUpdated:
                                    payLoad?.previousBatchUpdated,
                                })
                              );
                            }
                          }}
                          style={{
                            width: "147px",
                            height: "40px",
                            borderRadius: "8px",
                            // border: "solid 1px #777777",
                            color: "#fff",
                            fontSize: "16px",
                            fontWeight: 500,
                            lineHeight: "24px",
                            // padding: "8px 20px 8px 20px",
                            backgroundColor: "#06AB78",
                            cursor:
                              isSendingStart || isComplete
                                ? "no-drop"
                                : "pointer",
                          }}
                        >
                          <span className="text">
                            {isSendingStart
                              ? "Please wait..."
                              : isComplete
                                ? "Completed"
                                : "Send Message"}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <table>
            <thead style={{ borderBottom: "1px solid #e0e0e0" }}>
              <tr>
                <th
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#012635",
                      fontWeight: 500,
                    }}
                  >
                    Name
                  </span>
                  <Components.Common.SortIcon
                    // direction={sortingInfo.direction}
                    // isSorted={sortingInfo.sortedBy === "name"}
                    style={{ marginLeft: "8px" }} // Space between text and icon
                  />
                </th>
                <th
                  style={{
                    display: "flex",
                    gap: "6px",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#012635",
                      fontWeight: 500,
                    }}
                  >
                    Phone Numbers
                  </span>
                  <img src={Assets.Icons.infoIcon} />
                </th>
                {/* <th>Phone Numbers</th> */}
                <th
                  style={{
                    fontSize: "14px",
                    color: "#012635",
                    fontWeight: 500,
                  }}
                >
                  Status
                </th>
              </tr>
            </thead>

            <tbody ref={tableRef}>
              {batchData?.map((data, i) => (
                <tr
                  key={i}
                  className={
                    data.status
                      ? "done"
                      : (i == 0 && !data.status) ||
                        (batchData[i - 1]?.status && !data.status)
                        ? "working"
                        : ""
                  }
                >
                  <td>{data.firstName + " " + data.lastName}</td>
                  <td>
                    <span>{data.phone1}</span>
                    {data?.phone2 !== "N/A" && ", "}
                    <span>
                      {data?.phone2 !== "N/A"
                        ? data.phone2 + ", "
                        : data?.phone3 !== "N/A"
                          ? data.phone3 + ", "
                          : ""}
                    </span>
                    {data?.phone2 && data?.phone3 !== "N/A" && (
                      <span>{data.phone3}</span>
                    )}
                  </td>
                  <td>
                    {data.status == 1 ? (
                      <FaCheckCircle size={"1.6rem"} />
                    ) : (
                      <IoCheckmarkCircleOutline
                        color="#D3D7DD"
                        size={"1.6rem"}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </BatchProcesingModalStyled>
  );
};
