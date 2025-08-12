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
import Assets from "@/assets";
import { IoCloseCircleOutline } from "react-icons/io5";
import { TbHourglassHigh } from "react-icons/tb";

const InboxFilter = ({
  setFilters,
  isRemainderTableOpen,
  setIsRemainderTableOpen,
  filters,
  dispatch,
  removeStatus,
  selectStatus,
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
    // console.log("selectCampaignClicked...inbox", campaign);

    setUserDropdownOpen(false);
    setStatusDropdownOpen(false);
    setTagDropdownOpen(false);
    dispatch({
      type: actions.CAMPAIGN,
      payload: campaign?._id,
    });
  };

  // const selectStatus = (statuses) => {
  //   setUserDropdownOpen(false);
  //   setCampaignDropdownOpen(false);
  //   setTagDropdownOpen(false);

  //   // dispatch({
  //   //   type: actions.STATUS,
  //   //   payload: statuses,
  //   // });
  // };

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

  // useEffect(() => {
  //   if (searchParams.get("showReminders")) {
  //     setIsRemainderTableOpen(true);
  //   }
  //   if (!searchParams.get("showReminders")) {
  //     setIsRemainderTableOpen(false);
  //   }
  //   if (searchParams.get("noStatus")) {
  //     for (let status of statuses) {
  //       if (
  //         searchParams.get("noStatus") &&
  //         status.name.replace(" ", "").toLowerCase() == "nostatus"
  //       ) {
  //         selectStatus([status._id]);
  //         break;
  //       }
  //     }
  //     quickFilterAdd("noStatus1");
  //   }
  //   if (searchParams.get("unanswered")) {
  //     resetFilter();
  //     quickFilterAdd("unAnswered");
  //   }
  //   if (searchParams.get("unread")) {
  //     resetFilter();
  //     quickFilterAdd("unRead");
  //   }
  //   if (!searchParams.get("unread")) {
  //     resetFilter();
  //     quickFilterRemove("unRead");
  //   }
  // }, [searchParams]);


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
  // const removeStatus = (status) => {

  //   setStatusDropdownOpen(false);
  //   setCampaignDropdownOpen(false);
  //   setUserDropdownOpen(false);
  //   setTagDropdownOpen(false);
  //   const newFilters = [...filters.status];
  //   const index = newFilters.indexOf(status);
  //   if (index > -1) {
  //     newFilters.splice(index, 1);
  //   } else {
  //     newFilters.push(status);
  //   }
  //   console.log("check status id", status , newFilters);

  //   selectStatus(newFilters);
  // };

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

    // setFilters(filters);
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
  // console.log("check status in sidebar....inbox" , filters.status , statuses);
  return (
    <div className="top">
      <div style={{ display: "none" }} className="top">
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
      </div>
      <div style={{ flexWrap: "wrap" }} className="bottom">
        <h6 style={{ color: "#777777", fontSize: "16px", fontWeight: 600, lineHeight: "24px" }} className="left">Active Filters:</h6>
        <div style={{ display: "flex", flexWrap: "wrap" }} className="right">
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
                  <section style={{ display: "block" }}>
                    <div key={i} className="item">
                      <span className="icon">
                        {statusIcons[status.name]?.icon}
                      </span>
                      <span className="body5Medium textPrimeryColor">{status.name}</span>
                      <div>
                        <button onClick={() => removeStatus(status._id)}>

                          <img src={Assets.Images.filterClose} />
                        </button>
                      </div>

                    </div>
                  </section>
                </LightTooltip>
              );
            }
          })}
          <When condition={filters.unRead}>
            <section>
              <div className="item">
                <span className="icon">
                  <MdOutlineMarkChatUnread style={{ color: "#000", fontSize: "16px" }} />
                </span>
                <span  className="body5Medium textPrimeryColor">Unread</span>
                <div>
                <button
                  onClick={() => {
                    quickFilterRemove("unRead");
                  }}
                >
                  <img src={Assets.Images.filterClose} />

                </button>
                </div>
              </div>
            </section>
          </When>
          <When condition={filters.unAnswered}>
            <section>
              <div className="item">
                <span className="icon">
                  <TbHourglassHigh  style={{ color: "#000", fontSize: "16px" }} />
                </span>
                <span  className="body5Medium textPrimeryColor">Unanswered</span>
                <div>
                <button
                  onClick={() => {
                    quickFilterRemove("unAnswered");
                  }}
                >
                  <img src={Assets.Images.filterClose} />

                </button>
                </div>
              </div>
            </section>
          </When>
          <LightTooltip title="Reset filters" placement="top">
            <button onClick={resetFilter}>

              <img src={Assets.Images.history} />
            </button>
          </LightTooltip>
        </div>
      </div>
    </div>
  );
};

export default InboxFilter;
