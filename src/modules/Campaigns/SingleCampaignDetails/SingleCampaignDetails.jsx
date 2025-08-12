import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  AllProspectsStyled,
  BatchReportsStyled,
  CircularProgressbarStyled,
  ImportReportsStyled,
  LightSidebarStyled,
  SingleCampaignDetailsStyled,
} from "./styles";
import DoughnutPieChart from "./DoughnutPieChart";

import {
  FaArrowCircleRight,
  FaArrowLeft,
  FaEllipsisH,
  FaPhoneSlash,
  FaTimes,
} from "react-icons/fa";
import { buildStyles } from "react-circular-progressbar";

import PieChart from "./PieChart";
import Components from "@/components";
import { styled } from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import { useGlobalContext } from "@/hooks";
import { formatDateToLong, formatDateToShort, remToPixels } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCompaignsWithFollowUps,
  getBtachReportForSingleCompaign,
  getSingleCampaign,
  getSingleFollowUpCampaign,
} from "@/store/actions";
import { toast } from "react-hot-toast";
import { FaAngleDown } from "react-icons/fa6";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosCheckmarkCircle } from "react-icons/io";
import PaginationComp from "@/modules/DirectImport/Pagination";
import PaginationDropDown from "@/modules/DirectImport/PaginationDropDown";







const LightTooltip = styled(Components.Common.LightTooltip)`
  & > .MuiTooltip-tooltip {
    text-align: center;
    max-width: 20rem;
  }
`;

const MotionLightSidebarStyled = motion(LightSidebarStyled);

const SingleCampaignDetails = () => {
  const navigate = useNavigate();
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [haltPieValue, setFullPieValue] = useState(0);
  const [statuses, setStatuses] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isFollowUp = Boolean(queryParams.get("followUp"));
  const { setIsLoaderShowing } = useGlobalContext();
  let { campaignData, singleCampaign } = useSelector((s) => s.campaignReducer);
  let allData = singleCampaign?.totalLeads?.total || 0;
  singleCampaign = isFollowUp ? singleCampaign : singleCampaign?.compaign
  const dispatch = useDispatch();
  const { campaignId } = useParams();


  console.log("single campagin data", singleCampaign);
  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );

  const pieData = {
    labels: ["Hot", "Warm", "Nurture", "Drip", "No Status"],
    datasets: [
      {
        label: "",
        data: [
          statuses?.length > 0 &&
            statuses?.find((val) => val?.status?.[0] === "Hot")
            ? statuses?.find((val) => val?.status?.[0] === "Hot")?.value
            : 0,
          statuses?.length > 0 &&
            statuses?.find((val) => val?.status?.[0] === "Warm")
            ? statuses?.find((val) => val?.status?.[0] === "Warm")?.value
            : 0,
          statuses?.length > 0 &&
            statuses?.find((val) => val?.status?.[0] === "Nurture")?.value
            ? statuses?.find((val) => val?.status?.[0] === "Nurture")?.value
            : 0,
          statuses?.length > 0 &&
            statuses?.find((val) => val?.status?.[0] === "Drip")
            ? statuses?.find((val) => val?.status?.[0] === "Drip")?.value
            : 0,
          statuses?.length > 0 &&
            statuses?.find((val) => val?.status?.[0] === "No Status")
            ? statuses?.find((val) => val?.status?.[0] === "No Status")?.value
            : 0,
        ],
        backgroundColor: [
          "rgb(229, 41, 53)",
          "rgb(255, 193, 43)",
          "rgb(160, 200, 161)",
          "rgb(54, 163, 247)",
          "rgb(222, 223, 231)",
        ],
        borderWidth: 0,
      },
    ],
  };

  const optionsPie = {
    plugins: {
      legend: {
        display: false,
      },
      tooltips: {
        position: "center",
        bodyFont: { size: 28 }, // Adjust font size here
        titleFont: { size: 28 },
      },
    },
  };
  useLayoutEffect(() => {
    if (isFollowUp) {
      dispatch(
        getSingleFollowUpCampaign(
          { _id: campaignId },
          () => {
            dispatch(getAllCompaignsWithFollowUps({}));
          },
          (error) => {
            toast.error(error?.response?.data?.message ?? error?.message);
            navigate("/campaigns");
          }
        )
      );
    } else {
      dispatch(
        getSingleCampaign(
          { _id: campaignId },
          (res) => {
            setStatuses(res?.statuses);
            dispatch(getAllCompaignsWithFollowUps({}));
          },
          (error) => {
            toast.error(error?.response?.data?.message ?? error?.message);
            navigate("/campaigns");
          }
        )
      );
    }
  }, [dispatch, isFollowUp, campaignId, navigate]);

  useEffect(() => {
    setIsLoaderShowing(campaignData.loading);
  }, [campaignData.loading, setIsLoaderShowing]);



 

    const value = singleCampaign?.totalProspects
    ? (singleCampaign.sent / singleCampaign.totalProspects) * 100
    : 0;
    const remaining = singleCampaign?.totalProspects
    ? (singleCampaign.remaning / singleCampaign.totalProspects) * 100
    : 0;




  // console.log("logooo", remaining, value);


  return (
    <SingleCampaignDetailsStyled>
      <div className="top">
        <div className="bottom">
          <button onClick={() => setIsLeftSidebarOpen(true)}>
            <span style={{ overflow: "visible" }} className="text">
              {singleCampaign?.title ?? singleCampaign?.name ?? ""}
            </span>
            <span className="icon">
              <FaAngleDown />
            </span>
          </button>
          <p>
            <span>Market: </span>
            <span>
              {singleCampaign?.market?.areaCode ??
                singleCampaign?.followMarket?.areaCode ??
                "--"}
            </span>
          </p>
        </div>
      </div>
      <div className="charts" style={{ width: "100%" }}>
        <div className="left">
          <div className="Header">
            <h2>
              Campaign Message Statics
            </h2>
          </div>
          <div className="bottom">
            <div className="left">
              <div
                className="item"
                style={{ minHeight: "300px", position: "relative", display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <DoughnutPieChart
                  singleCampaign={singleCampaign}
                  data={[
                    { value: value, name: "Sent Message" },
                    { value: remaining, name: "Remaining" },
                  ]}
                ></DoughnutPieChart>
              </div>
            </div>
            <div className="center">
              <div className="item">
                <h6>Total Delivered</h6>
                <div className="top">
                  <span className="dot"></span>
                  <span className="text">
                    {singleCampaign?.totalDelivered &&
                      singleCampaign?.totalDelivered}
                  </span>
                </div>
              </div>
              <div className="item">
                <h6>Delivery</h6>
                <div className="top">
                  <span
                    className="text"

                  >
                    {singleCampaign?.delivered && singleCampaign?.delivered}%
                  </span>
                </div>
              </div>
              <div className="item">
                <h6>Total Undelivered</h6>
                <div className="top">
                  <span
                    className="dot"
                    style={{ backgroundColor: "red" }}
                  ></span>
                  <span className="text">
                    {singleCampaign?.sentALL &&
                      Math.abs(
                        singleCampaign?.sentALL - singleCampaign?.totalDelivered
                      )}
                  </span>
                </div>
              </div>
              <div className="item">
                <h6>Total Responses</h6>
                <div className="top">
                  <span className="dot"></span>
                  <span className="text">
                    {singleCampaign?.totalResponse &&
                      singleCampaign?.totalResponse}
                  </span>
                </div>
              </div>

              <div className="item">
                <h6>Response</h6>
                <div className="top">
                  <span className="dot"></span>
                  <span className="text">
                    {singleCampaign?.response && singleCampaign?.response}%
                  </span>
                </div>
              </div>

              <div className="item">
                <h6>Total Leads</h6>
                <div className="top">
                  <span className="text">{allData && allData}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="right"
          style={{ backgroundColor: "white", borderRadius: "12px" , display: 'flex', flexDirection: 'column',   }}
        >
          <div className="Header">
            <h2>
              Leads Breakdown
            </h2>
          </div>
          <div  className="chart">
            <PieChart data={pieData}></PieChart>
          </div>
        </div>
      </div>
      {singleCampaign?.permission == "compaign" ? <DirectImportReports /> : <></>}



      <BatchReports />

      {/* <AllProspects /> */}
      {(user.role === 'admin' || user.permissions.includes('Select Campaign')) && (

      <AnimatePresence>
        {isLeftSidebarOpen && (
          <LightSidebar onClose={() => setIsLeftSidebarOpen(false)} />
        )}
      </AnimatePresence>
      )}
    </SingleCampaignDetailsStyled>
  );
};

export default SingleCampaignDetails;

const DirectImportReports = () => {
  const { singleCampaign } = useSelector((s) => s.campaignReducer);
  const directImports = singleCampaign.directImport ?? [];
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0)
  const [currentData, setCurruntData] = useState([])

  console.log("checkTotal page", totalPages);

  useEffect(() => {
    const totalPagesCal = Math.ceil(directImports.length / limit);
    setTotalPages(totalPagesCal)
  }, [limit])


  useEffect(() => {
    const getCurrentData = directImports.slice(
      (currentPage - 1) * limit,
      currentPage * limit
    );
    setCurruntData(getCurrentData)
  }, [limit, currentPage])

  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );
  
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value));
    setCurrentPage(1);

  };

  return (
    <>
      <ImportReportsStyled>
        <div className="Header">
          <h2>Direct Import Reports</h2>
        </div>
        <div className="overflow">
          <div className="table">

            <div className="row" style={{ position: "sticky", top: "0px", zIndex: 100, backgroundColor: "white", borderBlock: "1.5px solid #80808052" }}>
              <h6 style={{ justifyContent: 'space-between' }}>
                List Name
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <BiSolidUpArrow style={{ color: "#777777", fontSize: "10px" }} />
                  <BiSolidDownArrow style={{ color: "#777777", fontSize: "10px" }} />
                </div>
              </h6>
              <h6>
                Total Rows
                <span className="info">
                  <LightTooltip
                    placement="top"
                    arrow
                    title={
                      <>
                        <p>Total number of rows in your list</p>

                      </>
                    }
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z" fill="#777777" /></svg>
                  </LightTooltip>
                </span>
              </h6>
              <h6>
                Total Prospects
                <span className="info">
                  <LightTooltip
                    placement="top"
                    arrow
                    title={
                      <>
                        <p>Total number of Prospects with at least one mobile phone number</p>
                        {/* <p>that prospects belong to</p> */}
                      </>
                    }
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z" fill="#777777" /></svg>
                  </LightTooltip>
                </span>
              </h6>
              <h6>
                Mobiles
                <span className="info">
                  <LightTooltip
                    placement="top"
                    arrow
                    title={
                      <>
                        <p>Total mobile phone numbers that your Prospects have.<i> Hint: Zeitblast Text the first 3 mobiles</i> </p>

                      </>
                    }
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z" fill="#777777" /></svg>
                  </LightTooltip>
                </span>
              </h6>
              <h6>
                Landlines
                <span className="info">
                  <LightTooltip
                    placement="top"
                    arrow
                    title={
                      <>
                        <p>Total Landline numbers identified. <i>Hint: Zeitblast texts mobiles only.</i></p>

                      </>
                    }
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z" fill="#777777" /></svg>
                  </LightTooltip>
                </span>
              </h6>
              <h6>
                Existing Matches
                <span className="info">
                  <LightTooltip
                    placement="top"
                    arrow
                    title={
                      <>
                        <p>Previously imported Prospects that you texted already.</p>

                      </>
                    }
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z" fill="#777777" /></svg>
                  </LightTooltip>
                </span>
              </h6>
              <h6>
                Deliverability
                <span className="info">
                  <LightTooltip
                    placement="top"
                    arrow
                    title={
                      <>
                        <p>Percentage of successfully delievered messages</p>

                      </>
                    }
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z" fill="#777777" /></svg>
                  </LightTooltip>
                </span>
              </h6>
              <h6>
                Response
                <span className="info">
                  <LightTooltip
                    placement="top"
                    arrow
                    title={
                      <>
                        <p>Percentage of responses received</p>

                      </>
                    }
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z" fill="#777777" /></svg>
                  </LightTooltip>
                </span>
              </h6>
              <h6>
                Created
                <span className="info">
                  <LightTooltip
                    placement="top"
                    arrow
                    title={
                      <>
                        <p>Created</p>

                      </>
                    }
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z" fill="#777777" /></svg>
                  </LightTooltip>
                </span>
              </h6>
            </div>
            <tbody>
              {directImports.length === 0 && (
                <tr>
                  <td className="error" colSpan={7}>
                    No Record Found
                  </td>
                </tr>
              )}
              {currentData.map((singleDirectImport, i) => (
                <tr key={i}>
                  <LightTooltip
                    arrow
                    placement="top"
                    title={
                      singleDirectImport?.listName && singleDirectImport?.listName
                    }
                  >
                    <td>
                      {singleDirectImport?.listName
                        ? singleDirectImport?.listName.endsWith(".csv")
                          ? singleDirectImport?.listName.slice(
                            0,
                            singleDirectImport?.listName.length - 4
                          )
                          : singleDirectImport?.listName
                        : "--"}
                    </td>
                  </LightTooltip>
                  <td>
                    {singleDirectImport?.totalRows
                      ? singleDirectImport?.totalRows
                      : 0}
                  </td>
                  <td>{singleDirectImport?.totalPropspects ?? 0}</td>
                  <td>{singleDirectImport?.mobile ?? 0}</td>
                  <td>{singleDirectImport?.landlines ?? 0}</td>
                  <td>{singleDirectImport?.excistingMatches ?? 0}</td>
                  <td
                    style={{
                      color: `${parseFloat(
                        (singleDirectImport?.delivered /
                          singleDirectImport?.sentCount) *
                        100
                      ).toFixed(2) < 84
                        ? "#ff0000be"
                        : "inherit"
                        }`,
                      fontWeight: `${parseFloat(
                        (singleDirectImport?.delivered /
                          singleDirectImport?.sentCount) *
                        100
                      ).toFixed(2) < 84
                        ? "600"
                        : "inherit"
                        }`,
                    }}
                  >
                    {singleDirectImport?.sentCount > 0
                      ? (
                        (singleDirectImport?.delivered /
                          singleDirectImport?.sentCount) *
                        100
                      ).toFixed(2)
                      : 0}
                    %
                  </td>
                  <td>
                    {singleDirectImport?.delivered > 0
                      ? (
                        (singleDirectImport?.response /
                          singleDirectImport?.delivered) *
                        100
                      ).toFixed(2)
                      : 0}{" "}
                    %
                  </td>
                  <td>
                    {formatDateToLong(
                      singleDirectImport?.createdAt ?? new Date()
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </div>
        </div>
        <div
          style={{
            position: "sticky",
            bottom: "0px",
            zIndex: 100,
            display: "flex",
            justifyContent: "space-between",
            height: "56px",
            backgroundColor: "white",
            borderBottomLeftRadius: "12px",
            padding: "0px 16px",
            alignItems: "center",
            paddingTop: "10px ",
            paddingBottom: "10px",
            borderTop: "1.5px solid #80808052"
          }}
        >
          <div>
            Total:{" "}0

          </div>

          <div>
            <PaginationComp
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
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
              <PaginationDropDown limit={limit} onLimitChange={handleLimitChange} />
            </div>
          </div>
        </div>
      </ImportReportsStyled>
    </>
  );
};

const BatchReports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfRowsShowing, setNumberOfRowsShowing] = useState(10);
  const params = useParams();
  const dispatch = useDispatch();
  const { compaignBatchReport } = useSelector((s) => s.campaignReducer);
  useEffect(() => {
    dispatch(
      getBtachReportForSingleCompaign({
        _id: params?.campaignId,
        currentPage,
        numberOfRowsShowing,
      })
    );
  }, [params?.campaignId, currentPage, numberOfRowsShowing]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear());

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${month}/${day}/${year} - ${hours}:${minutes}:${seconds}`;
  };

  const formatDateOnlyDate = (isoString) => {
    const date = new Date(isoString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${month}/${day}/${year}`;
  };


  const [limit, setLimit] = useState(10);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value));
    setCurrentPage(1);
  };

  console.log(compaignBatchReport)
  return (
    <BatchReportsStyled>
      <div className="Header">
        <h2>Batch Reports</h2>
      </div>
      <div className="overflow">
        <div className="table">
          <div className="row" style={{ position: "sticky", top: "0px", zIndex: 100, backgroundColor: "white", borderBlock: "1.5px solid #80808052" }}>
            <h6 style={{ justifyContent: 'space-between' }}>
              Batch Number
              <div style={{ display: "flex", flexDirection: "column" }}>
                <BiSolidUpArrow style={{ color: "#777777", fontSize: "10px" }} />
                <BiSolidDownArrow style={{ color: "#777777", fontSize: "10px" }} />
              </div>
            </h6>
            <h6>
              List Name
              <span className="info">
                <LightTooltip
                  placement="top"
                  arrow
                  title={
                    <>
                      <p>List Name</p>

                    </>
                  }
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z" fill="#777777" /></svg>
                </LightTooltip>
              </span>
            </h6>
            <h6>
              User
              <span className="info">
                <LightTooltip
                  placement="top"
                  arrow
                  title={
                    <>
                      <p>User that send out the batches messages</p>

                    </>
                  }
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z" fill="#777777" /></svg>
                </LightTooltip>
              </span>
            </h6>
            <h6>
              Deliverability
              <span className="info">
                <LightTooltip
                  placement="top"
                  arrow
                  title={
                    <>
                      <p>Percentage of successfully delievered messages</p>

                    </>
                  }
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z" fill="#777777" /></svg>
                </LightTooltip>
              </span>
            </h6>
            <h6>
              Response
              <span className="info">
                <LightTooltip
                  placement="top"
                  arrow
                  title={
                    <>
                      <p>Percentage of responses received</p>

                    </>
                  }
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z" fill="#777777" /></svg>
                </LightTooltip>
              </span>
            </h6>
            <h6>
              Template
              <span className="info">
                <LightTooltip
                  placement="top"
                  arrow
                  title={
                    <>
                      <p>Last message Template used for texting</p>

                    </>
                  }
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z" fill="#777777" /></svg>
                </LightTooltip>
              </span>
            </h6>
            <h6>
              Last Send
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
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z" fill="#777777" /></svg>
                </LightTooltip>
              </span>
            </h6>
          </div>
          {compaignBatchReport?.result?.map((data, i) => (
            <div className="row2" key={i}>
              <div style={{ display: "flex", flexDirection: 'column', fontSize: "14px", color: "#777777", fontWeight: 500, paddingInline: "1.3rem", paddingBlock: "0.7rem" }}>
                <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '0.5rem' }}>
                  <p >{data?.batchNumber && data.batchNumber}</p>
                  -
                  <p style={{ margin: "0px" }}>{data?.batchSenderNumber && data.batchSenderNumber.slice(-4)}</p>
                </div>
                <p>{formatDate(data?.createdAt)}</p>
              </div>
              <td>
                <LightTooltip
                  arrow
                  placement="top"
                  title={data?.listName && data?.listName}
                >
                  <td>
                    {data?.listName
                      ? data?.listName.length > 42
                        ? data?.listName.slice(0, 42) + "..."
                        : data?.listName
                      : "-"}
                  </td>
                </LightTooltip>
              </td>
              <td>
                {(data?.user?.firstName &&
                  data.user.firstName + " " + data.user.lastName) ||
                  (data?.admin?.fullName && data.admin.fullName)}
              </td>  
              <td
                style={{
                  color: `${parseFloat(data?.delivered) <= 84
                    ? "#ff0000be"
                    : "inherit"
                    }`,
                  fontWeight: `${parseFloat(data?.delivered) <= 84 ? "600" : "inherit"
                    }`,
                }}
              >
                {data?.delivered && data?.delivered.toFixed(2)}%
              </td>
              <td>{data?.response && data?.response.toFixed(2)}%</td>
              <td>{data?.template?.name}</td>
              <td>
                {formatDateOnlyDate(data?.lastSent)}
              </td>
            </div>
          ))}

        </div>
      </div>
      <div
        style={{
          position: "sticky",
          bottom: "0px",
          zIndex: 100,
          display: "flex",
          justifyContent: "space-between",
          height: "56px",
          backgroundColor: "white",
          borderBottomLeftRadius: "12px",
          padding: "0px 16px",
          alignItems: "center",
          paddingTop: "10px ",
          paddingBottom: "10px",
          borderTop: "1.5px solid #80808052"
        }}
      >
        <div>
          Total:{" "}
          {compaignBatchReport?.totalResults ? compaignBatchReport.totalResults : 0}
        </div>

        <div>
          <PaginationComp
            totalPages={compaignBatchReport?.totalPages || 1}
            currentPage={currentPage}
            onPageChange={handlePageChange}
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
            <PaginationDropDown limit={limit} onLimitChange={handleLimitChange} />
          </div>
        </div>
      </div>
    </BatchReportsStyled>
  );
};


const DIReport = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfRowsShowing, setNumberOfRowsShowing] = useState(10);
  const params = useParams();
  const dispatch = useDispatch();
  const { compaignBatchReport } = useSelector((s) => s.campaignReducer);
  useEffect(() => {
    dispatch(
      getBtachReportForSingleCompaign({
        _id: params?.campaignId,
        currentPage,
        numberOfRowsShowing,
      })
    );
  }, [params?.campaignId, currentPage, numberOfRowsShowing]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear());

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${month}/${day}/${year} - ${hours}:${minutes}:${seconds}`;
  };

  const formatDateOnlyDate = (isoString) => {
    const date = new Date(isoString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${month}/${day}/${year}`;
  };


  const [limit, setLimit] = useState(10);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value));
    setCurrentPage(1);
  };

  console.log(compaignBatchReport)
  const compaignBatchReport2 = []
  return (
    <BatchReportsStyled>
      <div className="Header">
        <h2>Direct Import Reports</h2>
      </div>
      <div className="overflow">
        <div className="table">
          <div className="row" style={{ position: "sticky", top: "0px", zIndex: 100, backgroundColor: "white", borderBlock: "1.5px solid #80808052" }}>
            <h6 style={{ justifyContent: 'space-between' }}>
              Batch Number

              <div style={{ display: "flex", flexDirection: "column" }}>
                <BiSolidUpArrow style={{ color: "#777777", fontSize: "10px" }} />
                <BiSolidDownArrow style={{ color: "#777777", fontSize: "10px" }} />
              </div>
            </h6>
            <h6>
              List Name
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
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z" fill="#777777" /></svg>
                </LightTooltip>
              </span>
            </h6>
            <h6>
              User
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
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z" fill="#777777" /></svg>
                </LightTooltip>
              </span>
            </h6>
            <h6>
              Deliverability
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
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z" fill="#777777" /></svg>
                </LightTooltip>
              </span>
            </h6>
            <h6>
              Response
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
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z" fill="#777777" /></svg>
                </LightTooltip>
              </span>
            </h6>
            <h6>
              Template
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
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z" fill="#777777" /></svg>
                </LightTooltip>
              </span>
            </h6>
            <h6>
              Last Send
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
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 4.44365 13.5563 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25Z" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.3125 8.3125C8.49484 8.3125 8.6697 8.38493 8.79864 8.51386C8.92757 8.6428 9 8.81766 9 9V12.4375C9 12.6198 9.07243 12.7947 9.20136 12.9236C9.33029 13.0526 9.50516 13.125 9.6875 13.125" stroke="#777777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M8.65625 6.25C9.22579 6.25 9.6875 5.78829 9.6875 5.21875C9.6875 4.64921 9.22579 4.1875 8.65625 4.1875C8.08671 4.1875 7.625 4.64921 7.625 5.21875C7.625 5.78829 8.08671 6.25 8.65625 6.25Z" fill="#777777" /></svg>
                </LightTooltip>
              </span>
            </h6>
          </div>
          {compaignBatchReport2?.result?.map((data, i) => (
            <div className="row2" key={i}>
              <div style={{ display: "flex", flexDirection: 'column', fontSize: "14px", color: "#777777", fontWeight: 500, paddingInline: "1.3rem", paddingBlock: "0.7rem" }}>
                <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '0.5rem' }}>
                  <p >{data?.batchNumber && data.batchNumber}</p>
                  -
                  <p style={{ margin: "0px" }}>{data?.batchSenderNumber && data.batchSenderNumber.slice(-4)}</p>
                </div>
                <p>{formatDate(data?.createdAt)}</p>
              </div>
              <td>
                <LightTooltip
                  arrow
                  placement="top"
                  title={data?.listName && data?.listName}
                >
                  <td>
                    {data?.listName
                      ? data?.listName.length > 42
                        ? data?.listName.slice(0, 42) + "..."
                        : data?.listName
                      : "-"}
                  </td>
                </LightTooltip>
              </td>
              <td>
                {(data?.user?.firstName &&
                  data.user.firstName + " " + data.user.lastName) ||
                  (data?.admin?.fullName && data.admin.fullName)}
              </td>
              <td
                style={{
                  color: `${parseFloat(data?.delivered) <= 84
                    ? "#ff0000be"
                    : "inherit"
                    }`,
                  fontWeight: `${parseFloat(data?.delivered) <= 84 ? "600" : "inherit"
                    }`,
                }}
              >
                {data?.delivered && data?.delivered.toFixed(2)}%
              </td>
              <td>{data?.response && data?.response.toFixed(2)}%</td>
              <td>{data?.template?.name}</td>
              <td>
                {formatDateOnlyDate(data?.lastSent)}
              </td>
            </div>
          ))}
          <div
            style={{
              position: "sticky",
              bottom: "0px",
              zIndex: 100,
              display: "flex",
              justifyContent: "space-between",
              height: "56px",
              backgroundColor: "white",
              borderBottomLeftRadius: "12px",
              padding: "0px 16px",
              alignItems: "center",
              paddingTop: "10px ",
              paddingBottom: "10px",
              borderTop: "1.5px solid #80808052"
            }}
          >
            <div>
              Total:{" "}
              {compaignBatchReport?.totalResults ? compaignBatchReport.totalResults : 0}
            </div>

            <div>
              <PaginationComp
                totalPages={compaignBatchReport?.totalPages || 1}
                currentPage={currentPage}
                onPageChange={handlePageChange}
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
                <PaginationDropDown limit={limit} onLimitChange={handleLimitChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="bottom" style={{ marginTop: "2rem" }}>
        <div className="left">
          <span>
            Total:
            {compaignBatchReport?.totalResults &&
              compaignBatchReport?.totalResults}
          </span>
        </div>
        <div className="center">
          <Components.Common.MyPagination
            currentPage={currentPage}
            onChange={(p) => setCurrentPage(p)}
            availableNumberOfRows={[10, 25, 50]}
            currentlySelectedNumberOfRows={numberOfRowsShowing}
            onChangeNumberOfRows={(p) => setNumberOfRowsShowing(p)}
            totalItems={
              compaignBatchReport?.totalResults &&
              compaignBatchReport?.totalResults
            }
          />
        </div>
        <div className="right"></div>
      </div> */}
    </BatchReportsStyled>
  );
};


const AllProspects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingInfo, setSortingInfo] = useState({
    sortedBy: "",
    direction: 0,
  });
  const [numberOfRowsShowing, setNumberOfRowsShowing] = useState(10);
  const { windowWidth } = useGlobalContext();

  const handleSort = (sortedBy) => {
    setSortingInfo((p) => {
      if (p.sortedBy !== sortedBy) {
        return { direction: 1, sortedBy };
      } else {
        return { ...p, direction: p.direction === 1 ? -1 : 1 };
      }
    });
  };

  return (
    <AllProspectsStyled
      tableWidth={windowWidth - remToPixels(7) - remToPixels(2.6)}
    >
      <h2>All Prospects</h2>
      <div className="bottom">
        <div className="table">
          <div className="row">
            <h6 className="col" onClick={() => handleSort("name")}>
              <span
                className={`text  ${sortingInfo.sortedBy === "name" ? "select" : ""
                  }`}
              >
                Name
              </span>
              <Components.Common.SortIcon
                direction={sortingInfo.direction}
                isSorted={sortingInfo.sortedBy === "name"}
              />
            </h6>
            <h6 className="col" onClick={() => handleSort("phone")}>
              <span
                className={`text  ${sortingInfo.sortedBy === "phone" ? "select" : ""
                  }`}
              >
                Phone
              </span>
              <Components.Common.SortIcon
                direction={sortingInfo.direction}
                isSorted={sortingInfo.sortedBy === "phone"}
              />
            </h6>
            <h6 className="col" onClick={() => handleSort("status")}>
              <span
                className={`text  ${sortingInfo.sortedBy === "status" ? "select" : ""
                  }`}
              >
                Status
              </span>
              <Components.Common.SortIcon
                direction={sortingInfo.direction}
                isSorted={sortingInfo.sortedBy === "status"}
              />
            </h6>
            <h6 className="col" onClick={() => handleSort("lastMessage")}>
              <span
                className={`text  ${sortingInfo.sortedBy === "lastMessage" ? "select" : ""
                  }`}
              >
                Last Message
              </span>
              <Components.Common.SortIcon
                direction={sortingInfo.direction}
                isSorted={sortingInfo.sortedBy === "lastMessage"}
              />
            </h6>
          </div>
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <div className="row body" key={i}>
                <div className="col data">
                  <p>Michael Belmont</p>
                </div>
                <div className="col data">
                  <p>(201) 207-1883</p>
                </div>
                <div className="col icon">
                  <p>
                    <span className="icon">
                      <FaPhoneSlash />
                    </span>
                    <span className="text">DNC</span>
                  </p>
                </div>
                <div className="col data">
                  <p>Stop</p>
                </div>
              </div>
            ))}
        </div>
        <div className="bottom">
          <div className="left">
            <span>Total: 61</span>
          </div>
          <div className="center">
            <Components.Common.MyPagination
              currentPage={currentPage}
              onChange={(p) => setCurrentPage(p)}
              availableNumberOfRows={[10, 25, 50]}
              currentlySelectedNumberOfRows={numberOfRowsShowing}
              onChangeNumberOfRows={(p) => setNumberOfRowsShowing(p)}
              totalItems={73}
            />
          </div>
          <div className="right"></div>
        </div>
      </div>
    </AllProspectsStyled>
  );
};

const LightSidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const { campaignData } = useSelector((s) => s.campaignReducer);
  const [filtered, setFiltered] = useState([]);
  const { campaignId } = useParams();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setFiltered(
      campaignData?.results.filter((campaign) => {
        if (campaign.title) {
          return campaign.title
            .toLowerCase()
            .includes(searchText.toLowerCase());
        }
        if (campaign.name) {
          return campaign.name.toLowerCase().includes(searchText.toLowerCase());
        }
      })
    );
  }, [campaignData?.results, campaignId, searchText]);
  return (
    <MotionLightSidebarStyled
      // initial={{ opacity: 0, x: "-7rem" }}
      animate={{
        opacity: 1,
        // x: "0rem",
        transition: { duration: 0.3, ease: "linear" },
      }}
      exit={{
        opacity: 0,
        // x: "-7rem",
        transition: { duration: 0.3, ease: "linear" },
      }}
    >
      <div className="top">
        <div className="top">
          <h2>Select Campaign</h2>
          <button onClick={onClose}>
            <IoClose />
          </button>
        </div>
        <div className="bottom">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="Search here"
          />
          <span>
            <IoSearchOutline />
          </span>
        </div>
      </div>
      <div className="table">
        <div className="row">
          <h6 className="col">Campaigns</h6>
        </div>
        {filtered.length === 0 && (
          <div className="row body">
            <p>No Record Found!</p>
          </div>
        )}
        {filtered.map((singleCampaign, i) => (
          <div style={{ cursor: 'pointer' }} className="row body" key={i} onClick={() => {
            navigate(
              `/campaigns/${singleCampaign?._id}${singleCampaign?.permission === "followCompaign"
                ? "?followUp=true"
                : ""
              }`
            );
            onClose();
          }}>
            <div className="col data">
              <p>{singleCampaign?.name ?? singleCampaign?.title ?? ""}</p>
            </div>
            {campaignId == singleCampaign?._id &&
              <div className="col icon">
                <button>
                  <IoIosCheckmarkCircle />
                </button>
              </div>
            }
          </div>
        ))}
      </div>
    </MotionLightSidebarStyled>
  );
};
