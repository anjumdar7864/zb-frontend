import {
  FaArrowLeft,
  FaArrowRight,
  FaCalculator,
  FaChartBar,
  FaCheck,
  FaEdit,
  FaEllipsisV,
  FaFireAlt,
  FaInfoCircle,
  FaPlus,
  FaSave,
  FaSearch,
  FaTimes,
  FaTint,
  FaTrash,
} from "react-icons/fa";
import PaginationNumber from "@/components/common/PaginationNumber/PaginationNumber";
import { Modal } from "@mui/material";
import { createPortal } from "react-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  IconButton,
  Box,
} from "@mui/material";
import "./camp.css";
import DropdownP from "./DropdownP";

import {
  CampaignsStyled,
  NewCampaignModalStyled,
  NewCampaignModalTooltipStyled,
} from "./styles";
import { useNavigate } from "react-router-dom";
import Assets from "@/assets";
import { useGlobalContext } from "@/hooks";
import { formatDateToShort, remToPixels, formatDate } from "@/utils";
import Components from "@/components";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { SortIcon } from "@/components/common";
import { useDispatch, useSelector } from "react-redux";
// import Fire from "assets/icons/fire.svg";
import Fire from "../../../assets/icons/fire.svg";
import Info from "../../../assets/icons/info.svg";
import Search from "../../../assets/icons/search.svg";
import {
  createCampaign,
  deleteCampaign,
  deleteFollowUpCampaign,
  editSingleCampaign,
  editSingleFollowUpCampaign,
  getAllCompaignsWithFollowUps,
  getAllFollowUpCompaigns,
  getAllMarkets,
} from "@/store/actions";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import { campaignSchema } from "@/schema";
import { IoMdClose } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useOutletContext } from "react-router-dom";

const LightTooltip = styled(Components.Common.LightTooltip)`
  & > .MuiTooltip-tooltip {
    text-align: center;
    max-width: 20rem;
  }
`;

const Campaigns = (props) => {
  const navigate = useNavigate();
  const { windowWidth, setIsLoaderShowing } = useGlobalContext();
  const [selectedDeleteId, setSelectedDeleteId] = useState("");
  const [isShowOnlyFollowUp, setIsShowOnlyFollowUp] = useState(false);
  const [numberOfRowsShowing, setNumberOfRowsShowing] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingInfo, setSortingInfo] = useState({
    direction: 0,
    sortedBy: "",
  });
  const [searchText, setSearchText] = useState("");
  const [editId, setEditId] = useState("");
  // const [isNewCampaignModalOpen, setIsNewCampaignModalOpen] = useState(false);
  // const [isFollowUpCampaign, setIsFollowUpCampaign] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );

  const handleSort = (sortedBy) => {
    setSortingInfo((p) => {
      if (p.sortedBy !== sortedBy) {
        return { direction: 1, sortedBy };
      } else {
        return { ...p, direction: p.direction === 1 ? -1 : 1 };
      }
    });
  };

  const [
    isNewCampaignModalOpen,
    isFollowUpCampaign,
    setIsNewCampaignModalOpen,
    setIsFollowUpCampaign,
  ] = useOutletContext();

  const { campaignData } = useSelector((s) => s.campaignReducer);
  const dispatch = useDispatch();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setSearchText(formData.get("search"));
  };

  const handleDelete = () => {
    if (isShowOnlyFollowUp) {
      dispatch(
        deleteFollowUpCampaign({
          limit: numberOfRowsShowing,
          page: currentPage,
          search: searchText,
          _id: selectedDeleteId,
          isShowOnlyFollowUp: isShowOnlyFollowUp,
          sortByName:
            sortingInfo.sortedBy === "campaignName"
              ? sortingInfo.direction === 1
                ? "asec"
                : "desc"
              : "",
          sortByDate:
            sortingInfo.sortedBy === "created"
              ? sortingInfo.direction === 1
                ? "asec"
                : "desc"
              : "",
        })
      );
    } else {
      dispatch(
        deleteCampaign({
          limit: numberOfRowsShowing,
          page: currentPage,
          search: searchText,
          _id: selectedDeleteId,
          isShowOnlyFollowUp: isShowOnlyFollowUp,
          sortByName:
            sortingInfo.sortedBy === "campaignName"
              ? sortingInfo.direction === 1
                ? "asec"
                : "desc"
              : "",
          sortByDate:
            sortingInfo.sortedBy === "created"
              ? sortingInfo.direction === 1
                ? "asec"
                : "desc"
              : "",
        })
      );
    }
    setSelectedDeleteId("");
  };

  useLayoutEffect(() => {
    if (isShowOnlyFollowUp) {
      dispatch(
        getAllFollowUpCompaigns({
          limit: numberOfRowsShowing,
          page: currentPage,
          search: searchText,
          sortByName:
            sortingInfo.sortedBy === "campaignName"
              ? sortingInfo.direction === 1
                ? "asec"
                : "desc"
              : "",
          sortByDate:
            sortingInfo.sortedBy === "created"
              ? sortingInfo.direction === 1
                ? "asec"
                : "desc"
              : "",
        })
      );
    } else {
      dispatch(
        getAllCompaignsWithFollowUps({
          limit: numberOfRowsShowing,
          page: currentPage,
          search: searchText,
          sortByName:
            sortingInfo.sortedBy === "campaignName"
              ? sortingInfo.direction === 1
                ? "asec"
                : "desc"
              : "",
          sortByDate:
            sortingInfo.sortedBy === "created"
              ? sortingInfo.direction === 1
                ? "asec"
                : "desc"
              : "",
        })
      );
    }
  }, [
    currentPage,
    dispatch,
    isShowOnlyFollowUp,
    numberOfRowsShowing,
    searchText,
    sortingInfo,
  ]);

  useEffect(() => {
    setIsLoaderShowing(campaignData.loading);
  }, [campaignData.loading, setIsLoaderShowing]);

  return (
    <CampaignsStyled
      tableWidth={windowWidth - remToPixels(7) - remToPixels(2.6)}
      isShowOnlyFollowUp={isShowOnlyFollowUp}
    >
      {/* <div className="top">
        <div
          className="top"
          style={{ margin: "0px 0px", padding: "24px 40px" }}
        >
          <h1>Campaigns</h1>
          <div className="right">
            <LightTooltip
              arrow
              placement="top"
              title="Creates a new Campaign for sending initial messages"
            >
              <button
                style={{ width: '187px' }}
                onClick={() => {
                  setIsNewCampaignModalOpen(true);
                  setIsFollowUpCampaign(false);
                }}
              >
                Create New Campaign
              </button>
            </LightTooltip>

            <LightTooltip
              arrow
              placement="top"
              title="Picking out the campaigns where the people we contacted haven't answered for at least a week."
            >
              <button onClick={() => navigate("create-follow-up")}>
                Create New Follow Up Campaign
              </button>
            </LightTooltip>
          </div>
        </div>
      </div> */}

      <div
        className="bottom"
        style={{ padding: "24px 40px 24px 40px", overflow: "hidden" }}
      >
        <div className="left">
          {(user.role === "admin" ||
            user.permissions.includes("Search Campaign")) && (
            <form className="search-form" onSubmit={handleSearchSubmit}>
              <img style={{ height: 22, width: 22 }} src={Search}></img>
              <input
                className="input"
                type="text"
                placeholder="Search for a Campaign"
                name="search"
                style={{ fontSize: "12px" }}
                onChange={(e) =>
                  e.target.value === "" ? setSearchText("") : null
                }
              />
            </form>
          )}
        </div>

        <div
          className="right"
          style={{
            backgroundColor: isShowOnlyFollowUp ? "#C2FFEC" : "transparent",
            border: `1px solid ${isShowOnlyFollowUp ? "#00BD82" : "grey"}`,
          }}
        >
          <button onClick={() => setIsShowOnlyFollowUp((p) => !p)}>
            {/* <div className="icon">
                {isShowOnlyFollowUp ? <FaCheck /> : <FaArrowRight />}
              </div> */}
            <div className="text">Show only Follow Ups</div>
          </button>
        </div>
      </div>
      <div style={{ padding: "0px 40px 20px 40px", flexGrow: 1 }}>
        <div
          className="bottomTable"
          style={{ border: "1px solid var(--Extra-Grey, #e0e0e0)" }}
        >
          <div
            style={{ overflow: "auto", height: "calc(100% - 50px)" }}
            className="table"
          >
            <div
              className="row"
              style={{
                position: "sticky",
                top: "0px",
                zIndex: 100,
                backgroundColor: "white",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
                position: "sticky",
                bottom: "0px",
                zIndex: 100,
                // borderTop:'1px solid var(--Extra-Grey, #e0e0e0)'
              }}
            >
              <h6>
                <span
                  className="text"
                  style={{ fontSize: "1.2", fontWeight: "500", padding: 0 }}
                >
                  Campaign Name
                </span>
              </h6>
              <h6 className="col info">
                <span className="text">Market</span>
              </h6>
              <h6 className="col info">
                <span className="text">Sent</span>
              </h6>
              <h6 className="col info">
                <span className="text">Remaining</span>
              </h6>
              <h6 className="col info">
                <span className="icon">
                  <img
                    style={{ width: "18px", height: "18px" }}
                    src={Fire}
                  ></img>
                </span>
                <span className="text" style={{ paddingInline: 6 }}>
                  Hot
                </span>
                <span className="info">
                  <LightTooltip arrow title="Number of Hot Leads">
                    <span>
                      <img
                        src={Info}
                        style={{ width: "18px", height: "18px" }}
                      ></img>
                    </span>
                  </LightTooltip>
                </span>
              </h6>
              <h6 className="col info">
                <span className="icon">
                  <img
                    style={{ width: "18px", height: "18px" }}
                    src={Fire}
                  ></img>
                </span>
                <span className="text" style={{ paddingInline: 6 }}>
                  Drip
                </span>
                <span className="info">
                  <LightTooltip
                    placement="top"
                    arrow
                    title="Number of Leads on Drip Automation"
                  >
                    <span>
                      <img
                        src={Info}
                        style={{ width: "18px", height: "18px" }}
                      ></img>
                    </span>
                  </LightTooltip>
                </span>
              </h6>
              <h6 className="col info">
                <span className="text" style={{ paddingRight: 6 }}>
                  Deliverability
                </span>
                <span className="info">
                  <LightTooltip
                    placement="top"
                    arrow
                    title="Percentage of successfully delievered messages"
                  >
                    <span className="info">
                      <LightTooltip
                        placement="top"
                        arrow
                        title="Number of Leads on Drip Automation"
                      >
                        <span>
                          <img
                            src={Info}
                            style={{ width: "18px", height: "18px" }}
                          ></img>
                        </span>
                      </LightTooltip>
                    </span>
                  </LightTooltip>
                </span>
              </h6>
              <h6 className="col info">
                {/* <span className="icon">
                <FaTint />
              </span> */}
                <span className="text" style={{ paddingRight: 6 }}>
                  Response
                </span>
                <span className="info">
                  <LightTooltip
                    placement="top"
                    arrow
                    title="Percentage of responses received"
                  >
                    <span className="info">
                      {/* <LightTooltip
                        placement="top"
                        arrow
                        title="Number of Leads on Drip Automation"
                      > */}
                      <span>
                        <img
                          src={Info}
                          style={{ width: "18px", height: "18px" }}
                        ></img>
                      </span>
                      {/* </LightTooltip> */}
                    </span>
                  </LightTooltip>
                </span>
              </h6>
              <h6>
                <span
                  className="text"
                  style={{ fontSize: "1.2", fontWeight: "500" }}
                >
                  Created
                </span>
              </h6>
              {(user.role === "admin" ||
                user.permissions.includes("Edit Initial Campaign") ||
                user.permissions.includes("Delete Initial Campaign") ||
                user.permissions.includes("Campaign Details")) && (
                <h6
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    className="text"
                    style={{ fontSize: "1.2", fontWeight: "500" }}
                  >
                    Actions
                  </span>
                </h6>
              )}
            </div>
            {campaignData.results.length === 0 && (
              <div
                className="row"
                style={{
                  width: "100%",
                  paddingBlock: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottom: "0px",
                }}
              >
                <p className="error">No Record Found!</p>
              </div>
            )}
            {campaignData.results.map((singleCampaign, i) => (
              <div
                className="row body"
                key={i}
                onClick={() =>
                  user.role === "admin" ||
                  user.permissions.includes("Edit Initial Campaign")
                    ? navigate(
                        `${singleCampaign?._id}${
                          isShowOnlyFollowUp ||
                          singleCampaign?.permission === "followCompaign"
                            ? "?followUp=true"
                            : ""
                        }`
                      )
                    : ""
                }
              >
                <div className="col data" style={{ cursor: "pointer" }}>
                  <p>{singleCampaign?.title ?? singleCampaign?.name ?? "--"}</p>
                </div>
                <div className="col data">
                  <p>
                    {singleCampaign?.permission === "followCompaign" ||
                    singleCampaign?.permission === "followCompaign2" ||
                    singleCampaign?.permission === "followCompaign3"
                      ? `${singleCampaign?.followMarket?.name} - ${singleCampaign?.followMarket?.areaCode}`
                      : `${singleCampaign?.market?.name} - ${singleCampaign?.market?.areaCode}` ??
                        "--"}
                  </p>
                </div>
                <div className="col dot">
                  <p>
                    <span className="dot"></span>
                    <span className="text">
                      {singleCampaign?.sent ?? singleCampaign?.sent ?? "--"}
                    </span>
                  </p>
                </div>
                <div className="col data">
                  <p>
                    {Math.abs(singleCampaign?.remaning) ??
                      Math.abs(singleCampaign?.remaning) ??
                      "--"}
                  </p>
                </div>
                <div className="col data">
                  <p>
                    {Math.abs(singleCampaign?.hot) ??
                      Math.abs(singleCampaign?.hot) ??
                      "--"}
                  </p>
                </div>
                <div className="col dot">
                  <p>
                    <span className="dot"></span>
                    <span className="text">
                      {Math.abs(singleCampaign?.drip) ??
                        Math.abs(singleCampaign?.drip) ??
                        "--"}
                    </span>
                  </p>
                </div>
                <div className="col dot">
                  <p>
                    <span className="dot"></span>
                    <span
                      className="text"
                      style={{
                        color: `${
                          parseFloat(singleCampaign?.delivered) <= 84
                            ? "#ff0000be"
                            : "inherit"
                        }`,
                        fontWeight: `${
                          parseFloat(singleCampaign?.delivered) <= 84
                            ? "600"
                            : "inherit"
                        }`,
                      }}
                    >
                      {singleCampaign?.delivered &&
                        parseFloat(singleCampaign?.delivered).toFixed(2)}
                      %
                    </span>
                  </p>
                </div>
                <div className="col data">
                  <p>
                    {singleCampaign?.response &&
                      parseFloat(singleCampaign?.response).toFixed(2)}
                    %
                  </p>
                </div>
                <div className="col data">
                  <p>
                    {singleCampaign?.createdAt
                      ? formatDate(singleCampaign?.createdAt)
                      : "--"}
                  </p>
                </div>
                {(user.role === "admin" ||
                  user.permissions.includes("Edit Initial Campaign") ||
                  user.permissions.includes("Delete Initial Campaign") ||
                  user.permissions.includes("Campaign Details")) && (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className="col data"
                  >
                    <section
                      className="actions"
                      style={{ justifySelf: "center" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreOptionMenu
                        id={singleCampaign?._id}
                        setSelectedDeleteId={setSelectedDeleteId}
                        setEditId={setEditId}
                        setIsFollowUpCampaign={setIsFollowUpCampaign}
                        isShowOnlyFollowUp={
                          isShowOnlyFollowUp ||
                          singleCampaign?.permission === "followCompaign"
                        }
                        handleOpenDetail={() =>
                          navigate(
                            `${singleCampaign?._id}${
                              isShowOnlyFollowUp ||
                              singleCampaign?.permission === "followCompaign"
                                ? "?followUp=true"
                                : ""
                            }`
                          )
                        }
                        sentMessage={singleCampaign?.sentALL}
                        permission={singleCampaign?.permission}
                        user={user}
                      />
                    </section>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div
            className="paginationrow"
            style={{
              backgroundColor: "white",
              padding: "8px 1rem",
              borderTop: "1px solid var(--Extra-Grey, #e0e0e0)",
              borderRadius: "8px",
              borderTopLeftRadius: "0px",
              borderTopRightRadius: "0px",
              position: "sticky",
              bottom: "0px",
              zIndex: 100,
              backgroundColor: "white",
            }}
          >
            <PaginationNumber
              currentPage={currentPage}
              onChange={(p) => setCurrentPage(p)}
              availableNumberOfRows={[10, 25, 50]}
              currentlySelectedNumberOfRows={numberOfRowsShowing}
              onChangeNumberOfRows={(p) => setNumberOfRowsShowing(p)}
              totalItems={campaignData?.totalResults}
            />
          </div>
        </div>
      </div>

      <Components.Common.DeleteModal
        onClose={() => setSelectedDeleteId("")}
        onOkay={handleDelete}
        open={Boolean(selectedDeleteId)}
        deleteItemName="Campaign"
      />

      <Components.Common.ModalTop open={isNewCampaignModalOpen || editId}>
        <NewCampaignModal
          onClose={() => {
            setIsNewCampaignModalOpen(false);
            setEditId("");
          }}
          limit={numberOfRowsShowing}
          page={currentPage}
          search={searchText}
          isFollowUpCampaign={isFollowUpCampaign}
          editCampaign={
            editId
              ? campaignData.results?.find(
                  (singleCampaign) => singleCampaign._id === editId
                )
              : undefined
          }
          sortByName={
            sortingInfo.sortedBy === "campaignName"
              ? sortingInfo.direction === 1
                ? "asec"
                : "desc"
              : ""
          }
          sortByDate={
            sortingInfo.sortedBy === "created"
              ? sortingInfo.direction === 1
                ? "asec"
                : "desc"
              : ""
          }
        />
      </Components.Common.ModalTop>
    </CampaignsStyled>
  );
};

export default Campaigns;

const MoreOptionMenu = ({
  id,
  setSelectedDeleteId,
  setEditId,
  setIsFollowUpCampaign,
  isShowOnlyFollowUp,
  handleOpenDetail,
  sentMessage,
  permission,
  user,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  console.log("sentAll", user);
  const options = [
    ...(user?.role == "admin" || user?.permissions?.includes("Campaign Details")
      ? [
          {
            label: "View",
            onClick: () => {
              handleOpenDetail();
              setEditId(id);
              setIsOpen(false);
            },
          },
        ]
      : []),
    ...(user?.role == "admin" ||
    user?.permissions?.includes("Edit Initial Campaign")
      ? [
          {
            label: "Edit",
            onClick: () => {
              setEditId(id);
              setIsOpen(false);
            },
          },
        ]
      : []),
    // Conditionally include the "Delete" option only if not a follow-up campaign
    ...((user?.role == "admin" ||
      user?.permissions?.includes("Delete Initial Campaign")) &&
    permission === "compaign"
      ? [
          {
            label: "Delete",
            message: (
              <span
                style={{
                  color: sentMessage > 0 ? "red" : "inherit", // Red for this condition
                  fontWeight: "bold", // Optional: Add bold styling
                }}
              >
                {sentMessage > 0
                  ? "This campaign cannot be deleted as it has already run batches."
                  : ""}
              </span>
            ),
            onClick: () => {
              if (sentMessage === 0 || !sentMessage) {
                setSelectedDeleteId(id);
                setIsOpen(false);
              }
            },
          },
        ]
      : []),
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <button ref={buttonRef} onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? <FaTimes /> : <FaEllipsisV />}
      </button>
      <div style={{ position: "relative" }}>
        <DropdownP targetRef={buttonRef} options={options} isOpen={isOpen} />
      </div>
    </div>
  );
};

const NewCampaignModal = ({
  onClose,
  limit,
  page,
  search,
  editCampaign,
  isFollowUpCampaign,
  sortByName,
  sortByDate,
}) => {
  const { markets } = useSelector((s) => s.campaignReducer);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  let initialValues = {};
  if (isFollowUpCampaign) {
    initialValues = {
      campaignName: editCampaign?.title ?? "",
      market: editCampaign?.followMarket?._id ?? "",
    };
  } else {
    initialValues = {
      campaignName: editCampaign?.name ?? "",
      market: editCampaign?.market?._id ?? "",
      callNumber: editCampaign?.market?.phone ?? [],
    };
  }
  const formik = useFormik({
    initialValues,
    validationSchema: campaignSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      let body = {};
      if (isFollowUpCampaign) {
        body = {
          title: values.campaignName,
          followMarket: values.market,
          //phone: values.callNumber,
        };
      } else {
        body = {
          name: values.campaignName,
          market: values.market,
          phone: values.callNumber,
        };
      }

      const payload = {
        body,
        limit: limit,
        page: page,
        search: search,
        sortByName,
        sortByDate,
      };
      if (editCampaign) {
        if (isFollowUpCampaign) {
          dispatch(
            editSingleFollowUpCampaign({ ...payload, _id: editCampaign?._id })
          );
        } else {
          dispatch(editSingleCampaign({ ...payload, _id: editCampaign?._id }));
        }
      } else {
        dispatch(createCampaign(payload));
      }
      onClose();
    },
  });

  useLayoutEffect(() => {
    dispatch(
      getAllMarkets(
        null,
        () => {
          setIsLoading(false);
        },
        () => {
          toast.error("Something went wrong in loading markets!");
          setIsLoading(false);
        }
      )
    );
  }, [dispatch]);

  useEffect(() => {
    if (formik.values.market) {
      const market = markets?.find(
        (market) => market?._id === formik.values.market
      );
      formik.setFieldValue("callNumber", [
        market?.callForwardingNumber
          ? market?.callForwardingNumber
          : market?.phone,
      ]);
    }
  }, [formik.setFieldValue, formik.values.market, markets]);

  return (
    <NewCampaignModalStyled
      icon={Assets.Images.SortDefault}
      onSubmit={formik.handleSubmit}
    >
      <div className="top">
        <h2>{editCampaign ? "Edit" : "Create New"} Campaign</h2>
        <button type="button" onClick={onClose}>
          <IoMdClose />
        </button>
      </div>
      <div className="middle">
        <div className="middleCover">
          <div className="item">
            <div className="right">
              <span className="text">Campaign name</span>
              <input
                type="text"
                placeholder="Enter name"
                value={formik.values.campaignName}
                name="campaignName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.campaignName && formik.errors.campaignName && (
                <p>{formik.errors.campaignName}</p>
              )}
            </div>
          </div>
          <div className="item">
            <div className="right">
              <span className="text">Select Market</span>
              <div className="SelectCover">
                <select
                  value={formik.values.market}
                  name="market"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={editCampaign ? true : false}
                >
                  {isLoading ? (
                    <option value="" disabled>
                      Loading...
                    </option>
                  ) : markets?.length === 0 ? (
                    <option value="" disabled>
                      Not found any market!
                    </option>
                  ) : (
                    <>
                      <option value="" disabled>
                        Select
                      </option>
                      {markets?.map((market, i) => (
                        <option key={i} value={market?._id}>
                          {`${market?.name} - ${market?.areaCode}`}
                        </option>
                      ))}
                    </>
                  )}
                </select>
                <FaAngleDown
                  size={"1.5rem"}
                  style={{
                    position: "absolute",
                    right: "1.8rem",
                    top: "calc(50% - 10px)",
                  }}
                />
              </div>
              {formik.touched.market && formik.errors.market && (
                <p>{formik.errors.market}</p>
              )}
            </div>
          </div>
        </div>
        <div className="item">
          <div className="right">
            <div style={{ display: "flex" }} className="left">
              <span
                style={{ display: "flex", alignItems: "center" }}
                className="text"
              >
                Call Forwarding Number
              </span>
              <LightTooltip
                arrow
                placement="right"
                title={
                  <NewCampaignModalTooltipStyled>
                    <p>
                      <strong>
                        This is the number where all of the incoming calls from
                        sent messages will be routed to.
                      </strong>{" "}
                      It could be your cellphone, however best practice is to
                      set up 1 dedicated number with a predefined caller ID
                      using tool like (CallRail).
                    </p>
                    <p>
                      Click <a href="#">here</a> for more info
                    </p>
                  </NewCampaignModalTooltipStyled>
                }
              >
                <div
                  style={{
                    height: "25px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  className="icon"
                >
                  <AiOutlineInfoCircle
                    style={{ marginLeft: "5px" }}
                    size={"20px"}
                  />
                </div>
              </LightTooltip>
            </div>
            <input
              type="text"
              placeholder="(___) ___-____"
              disabled
              value={
                formik?.values?.callNumber
                  ? formik?.values?.callNumber[0] ?? "(___) ___-____"
                  : "(___) ___-____"
              }
              name="callNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.callNumber && formik.errors.callNumber && (
              <p>{formik.errors.callNumber}</p>
            )}
          </div>
        </div>
      </div>
      <div className="bottom">
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <button
          className="buttonSave"
          disabled={!formik.isValid || !formik.dirty}
          type="submit"
          onClick={onClose}
        >
          {editCampaign ? "Update" : "Save"}
        </button>
      </div>
    </NewCampaignModalStyled>
  );
};
