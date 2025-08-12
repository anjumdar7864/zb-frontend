import { useEffect, useReducer, useState } from "react";
import { FaCaretDown, FaHistory, FaRegQuestionCircle, FaTimesCircle } from "react-icons/fa";
import { MdMail, MdOutlineMarkChatUnread } from "react-icons/md";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { When } from "react-if";

import { LightTooltip } from "@/components/common";
import { getUserAuth } from "@/utils/storage";

import {
  CampaignsFilter,
  StatusFilter,
  StatusFilterTab,
  TagsFilter,
  TagsFilterTab,
  UsersFilter,
} from "../Filters";
import { statusIcons } from "../Filters/StatusFilter";
import { actions, initialFilterReducer, reducer } from "./InboxFilterReducer";
import { size, isEmpty } from "lodash-es";
import { getAllStatusList } from "@/store/actions";
import styles from "../Inbox.module.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline, IoMailUnreadOutline } from "react-icons/io5";
import { FaHourglassHalf } from "react-icons/fa6";
import { LiaHourglassEndSolid } from "react-icons/lia";
import { TbHourglassHigh } from "react-icons/tb";
const InboxFilter = ({
  setFilters,
  isRemainderTableOpen,
  setIsRemainderTableOpen,
  dispatch,
  filters
}) => {
  // const [filters, dispatch] = useReducer(reducer, initialFilterReducer);
  const { results: statuses } = useSelector((s) => s.statusReducer);
  const [searchParams] = useSearchParams();
  const [isCampaignDropdownOpen, setCampaignDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [isTagDropdownOpen, setTagDropdownOpen] = useState(false);

  const user = getUserAuth();

  useEffect(() => {
    setFilters(filters);
  }, [filters]);
  useEffect(() => {
    if (!size(statuses)) {
      dispatch(getAllStatusList());
    }
  }, []);




  const selectUser = (user) => {
    setCampaignDropdownOpen(false);
    setStatusDropdownOpen(false);
    setTagDropdownOpen(false);
    dispatch({
      type: actions.USER,
      payload: user?._id,
    });
  };
  const selectTag = (tag) => {
    setUserDropdownOpen(false);
    setStatusDropdownOpen(false);
    setCampaignDropdownOpen(false);
    dispatch({
      type: actions.TAG,
      payload: tag?._id,
    });
  };

  const selectCampaign = (campaign) => {
    setUserDropdownOpen(false);
    setStatusDropdownOpen(false);
    setTagDropdownOpen(false);
    dispatch({
      type: actions.CAMPAIGN,
      payload: campaign?._id,
    });
  };

  const selectStatus = (statuses) => {
    setUserDropdownOpen(false);
    setCampaignDropdownOpen(false);
    setTagDropdownOpen(false);


    dispatch({
      type: actions.STATUS,
      payload: statuses,
    });
  };


  const quickFilterAdd = (statuses) => {


    dispatch({
      type: actions.QUICK_FILTER_ADD,
      payload: statuses,
    });
  };

  const quickFilterRemove = (statuses) => {
    dispatch({
      type: actions.QUICK_FILTER_REMOVE,
      payload: statuses,
    });
  };

  useEffect(() => {
    if (searchParams.get("showReminders")) {
      setIsRemainderTableOpen(true);
    } else {
      setIsRemainderTableOpen(false);
    }
    if (searchParams.get("noStatus")) {
      for (let status of statuses) {
        if (
          searchParams.get("noStatus") &&
          status.name.replace(" ", "").toLowerCase() == "nostatus"
        ) {
          selectStatus([status._id]);
          break;
        }
      }
      quickFilterAdd("noStatus1");
    } else if (!searchParams.get("noStatus")) {
      resetFilter();
    }
    if (searchParams.get("unanswered")) {
      resetFilter();
      quickFilterAdd("unAnswered");
    } else if (!searchParams.get("unanswered")) {
      quickFilterRemove("unAnswered");
    }
    if (searchParams.get("unread")) {
      resetFilter();
      quickFilterAdd("unRead");
    } else {
      // resetFilter();
      quickFilterRemove("unRead");

    }
  }, [searchParams]);

  const removeStatus = (status) => {
    setStatusDropdownOpen(false);
    setCampaignDropdownOpen(false);
    setUserDropdownOpen(false);
    setTagDropdownOpen(false);
    const newFilters = [...filters.status];
    const index = newFilters.indexOf(status);
    if (index > -1) {
      newFilters.splice(index, 1);
    } else {
      newFilters.push(status);
    }
    selectStatus(newFilters);
  };

  const resetFilter = () => {
    dispatch({
      type: actions.QUICK_FILTER_REMOVE_ALL,
      payload: statuses,
    });
    const filters = statuses.map((status) => {
      if (statusIcons[status.name]?.active) {
        return status._id;
      }
    });
    selectStatus(filters);
  };
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!event.target.closest(".dropdown")) {
        setStatusDropdownOpen(false);
        setCampaignDropdownOpen(false);
        setUserDropdownOpen(false);
        setTagDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);



  useEffect(() => {
    let filters = [];
    for (let status of statuses) {
      if (
        searchParams.get("noStatus") &&
        status.name.replace(" ", "").toLowerCase() == "nostatus"
      ) {
        filters = [status._id];
        break;
      }
      if (statusIcons[status.name]?.active) {
        filters.push(status._id);
      }
    }
    if (size(statuses)) {
      selectStatus(filters);
    }
  }, [statuses]);





  return (
    <div
    //  className="top"
    >
      {/* <div className="top">
        <div>
          <StatusFilterTab
            selectedStatues={filters.status}
            removeStatus={removeStatus}
            selectStatus={selectStatus}
            isOpen={isStatusDropdownOpen}
            toggleDropdown={() => {
              setStatusDropdownOpen(!isStatusDropdownOpen);
              setCampaignDropdownOpen(false);
              setUserDropdownOpen(false);
              setTagDropdownOpen(false);
            }}
          />
        </div>
      
        <CampaignsFilter
          selectCampaign={selectCampaign}
          isOpen={isCampaignDropdownOpen}
          toggleDropdown={() => {
            setCampaignDropdownOpen(!isCampaignDropdownOpen);
            setUserDropdownOpen(false);
            setStatusDropdownOpen(false);
            setTagDropdownOpen(false);
          }}
        />
        <When condition={user.type == "admin"}>
          <UsersFilter
            selectUser={selectUser}
            isOpen={isUserDropdownOpen}
            toggleDropdown={() => {
              setUserDropdownOpen(!isUserDropdownOpen);
              setCampaignDropdownOpen(false);
              setStatusDropdownOpen(false);
              setTagDropdownOpen(false);
            }}
          />
        </When>
        <div>

          <TagsFilterTab
            selectTag={selectTag}
            isOpen={isTagDropdownOpen}
            toggleDropdown={() => {
              setTagDropdownOpen(!isTagDropdownOpen);
              setCampaignDropdownOpen(false);
              setStatusDropdownOpen(false);
              setUserDropdownOpen(false);
            }}
          />
        </div>
        <LightTooltip
          title="Toggle the reminders display on and off"
          placement="top"
        >
          <button
            className={`remainder ${isRemainderTableOpen ? "open" : ""}`}
            onClick={() => setIsRemainderTableOpen((p) => !p)}
          >
            <span className="icon">
              <FaCaretDown />
            </span>
            <span className="text">Reminders</span>
          </button>
        </LightTooltip>
      </div> */}
      <div
        //    className="bottom"
        className={styles.statusFilterBottom}
      >
        <h6
          //  className="left"
          className={`${styles.activeFilterText} body4Medium textSecondaryColor`}

        >Active Filters:</h6>
        <div
          //  className="right"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {statuses.map((status, i) => {
            if (filters.status?.includes(status._id)) {
              return (
                <LightTooltip
                  title={
                    status?.name === "Hot" || status?.name === "Warm"
                      ? status.name + " Lead"
                      : status.name
                  }
                  placement="top"
                >
                  <section className={styles.StatusFilterSection}>
                    <div key={i}
                      //  className="item"
                      className={styles.StatusFilterItem}
                    >
                      <span
                        //    className="icon"
                        className={styles.icon}
                      >
                        {statusIcons[status.name]?.icon}
                      </span>
                      <span
                        //    className="text"
                        className={`${styles.text} body5Medium textPrimeryColor`}
                      >{status.name}</span>
                      <button style={{ display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => removeStatus(status._id)}>
                        {/* <FaTimesCircle /> */}
                        <IoCloseCircleOutline size={16} />
                      </button>
                    </div>
                  </section>
                </LightTooltip>
              );
            }
          })}
          <When condition={filters.unRead}>
            <section className={styles.StatusFilterSection}>
              <div
                //  className="item"
                className={styles.StatusFilterItem}
              >
                <span
                  //  className="icon"
                  className={styles.icon}
                >
                  <MdOutlineMarkChatUnread style={{ color: "#000", fontSize: "16px" }} />
                </span>
                <span
                  //  className="text"
                  className={`${styles.text} body5Medium textPrimeryColor`}
                >Unread</span>
                <button
                  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                  onClick={() => {
                    quickFilterRemove("unRead");
                  }}
                >
                  <IoCloseCircleOutline size={16} />

                </button>
              </div>
            </section>
          </When>

          <When condition={filters.unAnswered}>
            <section className={styles.StatusFilterSection}>
              <div
                //  className="item"
                className={styles.StatusFilterItem}
              >
                <span
                  //  className="icon"
                  className={styles.icon}
                >

                  <TbHourglassHigh style={{ color: "#012635", fontSize: "18px" }} />
                </span>
                <span
                  //  className="text"
                  className={`${styles.text} body5Medium textPrimeryColor`}
                >Unanswered</span>
                <button
                  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                  onClick={() => {
                    quickFilterRemove("unAnswered");
                  }}
                >
                  <IoCloseCircleOutline size={16} />

                </button>
              </div>
            </section>
          </When>
          {/* <When condition={filters.unAnswered}>
                <div className="item">
                  <span className="icon"><MdMail /></span>
                  <span className="text">Unanswered</span>
                  <button onClick={() => {quickFilterRemove('unAnswered')}}>
                    <FaTimesCircle />
                  </button>
                </div>
              </When> */}
          <LightTooltip title="Reset filters" placement="top">
            <button style={{ background: "#f0f0f0", height: "28px", width: "28px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={resetFilter}>
              <FaHistory />
            </button>
          </LightTooltip>
        </div>
      </div>
    </div>
  );
};

export default InboxFilter;
