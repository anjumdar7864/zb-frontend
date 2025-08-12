import { useEffect, useState, useContext, useRef, useReducer } from "react";

import ChatBox from "./ChatBox";
import { FaEllipsisV, FaMobileAlt, FaThermometerEmpty, FaTimes, FaTint } from "react-icons/fa";
import { Menu, Box, Skeleton } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { replace, size, first } from "lodash-es";
import { If, Then, Else, When } from "react-if";
import classNames from "classnames";
import Components from "@/components";
import color from "@/styles/color";
import {
  getAllInboxMessages,
  getUserInboxMessages,
  getProspectDetails,
  getInboxActivityList,
  getStats,
  clearErrors,
  getAllInboxMessagesFilters,
  getAllStatusList,
} from "@/store/actions";
import { useGlobalContext } from "@/hooks";
import { inboxMessageConstants } from "@/store/constants";

import {
  InboxMainStyled,
  InboxStyled,
  MessageItemStyled,
  RightSideStyled,
} from "./styles";

import {
  SelectedInboxItemContext,
  SelectedTabContext,
} from "./SelectedInboxItemContext";

import { InboxFilter } from "./Filters";
import TagAdd from "./TagAdd";
import SearchInbox from "./SearchInbox";
import RemainderTable from "./RemainderTable";
import SetRemainderModal from "./SetRemainderModal";
import ActionMenu from "./ActionMenu";
import StatusUpdateMenu from "./StatusUpdateMenu";
import ProspectDetails from "./ProspectDetails";
import Assets from "@/assets";
import PaginationDropDown from "../DirectImport/PaginationDropDown";
import PaginationComp from "../DirectImport/Pagination";
import FilterSidebar from "./FilterSidebar";
import { initialFilterReducer, reducer, actions } from "./Filters/InboxFilterReducer";
import NotePopup from "./Tabs/NotePopup";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import { FaExclamation, FaFire, FaPhoneSlash, FaQuestion, FaSeedling } from "react-icons/fa6";

const InboxMainStyledMotioned = motion(InboxMainStyled);

const InboxMain = () => {
  const [selectedId, setSelectedId] = useState("");
  const [selectedUserInbox, setSelectedUserInbox] = useState(null);
  const [selectedRemainderId, setSelectedRemainderId] = useState("");
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  useEffect(() => {
    if (selectedUserInbox?._id) {
      setSelectedId(selectedUserInbox._id);
    }
  }, [selectedUserInbox]);

  return (
    <SelectedInboxItemContext.Provider
      value={{
        selectedUserInbox,
        setSelectedUserInbox,
      }}
    >
      <SelectedTabContext.Provider
        value={{
          selectedTabIndex,
          setSelectedTabIndex,
          selectedRemainderId,
          setSelectedRemainderId,
        }}
      >
        <InboxMainStyledMotioned
          open={Boolean(selectedId)}
          transition={{
            type: selectedId ? "spring" : "just",
            duration: selectedId ? 2 : 0.5,
            bounce: 0.5,
          }}
        >
          <div id={selectedId && "inboxMainStyleLayout"}>
            <Inbox
              selectedId={selectedId}
              setSelectedRemainderId={setSelectedRemainderId}
            />
            <AnimatePresence>
              {Boolean(selectedId) && (
                <motion.div
                  className="right"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ width: 0, scaleX: 0, opacity: 0 }}
                >
                  <RightSide setSelectId={() => setSelectedId("")} />
                </motion.div>
              )}
            </AnimatePresence>

            <Components.Common.ModalTop
              open={selectedRemainderId}
              onClose={() => { }}
            >
              <SetRemainderModal
                onClose={() => setSelectedRemainderId("")}
                selectedUserInbox={selectedUserInbox}
              />
            </Components.Common.ModalTop>
          </div>
        </InboxMainStyledMotioned>
      </SelectedTabContext.Provider>
    </SelectedInboxItemContext.Provider>
  );
};

const Inbox = ({ setSelectedRemainderId, selectedId }) => {
  const [numberOfRowsShowing, setNumberOfRowsShowing] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(null);
  const [isRemainderTableOpen, setIsRemainderTableOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const { results: statuses } = useSelector((s) => s.statusReducer);


  const [hasMore, setHasMore] = useState(true);
  const [filtersState, dispatchFilter] = useReducer(
    reducer,
    initialFilterReducer
  );
  const [firstLoad, setFirstLoad] = useState(false)
  const dispatch = useDispatch();
  const { setIsLoaderShowing } = useGlobalContext();
  const { setSelectedUserInbox } = useContext(SelectedInboxItemContext);
  const statusIcons = {
    Hot: {
      active: 1,
      icon: <FaFire />,
      color: "#e52935",
      message: {
        content: "! Status was changed to Hot Lead",
        color: color.Info,
      },
    },
    Warm: {
      active: 1,
      icon: <FaThermometerEmpty />,
      color: "#ffc12b",
      message: {
        content: "! Status was changed to Warm Lead",
        color: color.Info,
      },
    },
    Nurture: {
      active: 1,
      icon: <FaSeedling />,
      color: "#43cd80",
      message: {
        content: "! Status was changed to Nurture",
        color: color.Info,
      },
    },
    Drip: { active: 1, icon: <FaTint />, color: "#36a3f7" },
    DNC: { active: 0, icon: <FaPhoneSlash />, color: "" },
    "No Status": { active: 1, icon: <FaQuestion />, color: "#dedfe7" },
    "Not Interested": {
      active: 0,
      icon: <FaTimes />,
      color: "#a62921",
      message: {
        content: "! Status was changed to Not Interested",
        color: color.Warning,
      },
    },
    "Wrong Number": { active: 0, icon: <FaExclamation />, color: "#a62921" },
  };

  const [searchParams] = useSearchParams();
  const intialFilter = {
    from: null,
    to: null,
    user: null,
    campaign: null,
    status: [
      "651ebe268042b1b3f4674e9b",
      "651ebe4e8042b1b3f4674e9d",
      "651ebe5b8042b1b3f4674ea0",
      "651ebe648042b1b3f4674ea2",
      "651ebe828042b1b3f4674ea8",
    ],
    tag: null,
    noStatus1: null,
    unRead: null,
    unAnswered: null,
    pushToCrm: null,
  };
  // const { results: statuses, loading: loadingStatuses } = useSelector((s) => s.statusReducer);

  // useEffect(() => {
  //   if (filters?.status != null) {

  //     dispatch(
  //       getAllInboxMessages({
  //         limit: numberOfRowsShowing,
  //         page: currentPage,
  //         ...filters,
  //       })
  //     );
  //     if (numberOfRowsShowing != 25) {
  //       // dispatch(getStats());
  //     }
  //   }
  // }, [currentPage, numberOfRowsShowing, filters]);

  useEffect(() => {

    if (filters?.status != null && filters?.status.length > 0 && !firstLoad) {
      setFirstLoad(true)
      setCurrentPage(1);
      dispatch(
        getAllInboxMessagesFilters({
          limit: numberOfRowsShowing,
          page: 1,
          ...filters,
        })
      );
      if (numberOfRowsShowing != 25) {
        // dispatch(getStats());
      }
    } else if (filters?.status != null && firstLoad) {
      setCurrentPage(1);
      dispatch(
        getAllInboxMessagesFilters({
          limit: numberOfRowsShowing,
          page: 1,
          ...filters,
        })
      );
      if (numberOfRowsShowing != 25) {
        // dispatch(getStats());
      }
    }
   

  }, [filters]);

  // useEffect(() => {
  //   if (intialFilter?.status != null) {

  //     dispatch(
  //       getAllInboxMessages({
  //         limit: numberOfRowsShowing,
  //         page: currentPage,
  //         ...intialFilter,
  //       })
  //     );
  //     if (numberOfRowsShowing != 25) {
  //       // dispatch(getStats());
  //     }
  //   }

  // }, [ ]);

  const onScrollEnd = () => {
    if (filters?.status != null) {
      dispatch(
        getAllInboxMessages({
          limit: numberOfRowsShowing,
          page: +currentPage + 1,
          ...filters,
        })
      );
      if (numberOfRowsShowing != 25) {
        // dispatch(getStats());
      }
    }
  };

  const {
    results: inboxAllMessages,
    totalResults,
    totalPages,
    loading,
  } = useSelector((s) => s.inboxAllMessageReducer);
  const { errors } = useSelector((s) => s.authReducer);

  useEffect(() => {
    if (errors.length > 0) {
      dispatch(clearErrors());
    }

  }, [errors]);

  useEffect(() => {
    setIsLoaderShowing(loading);

  }, [loading, setIsLoaderShowing]);

  // useEffect(() => {
  //   setIsLoaderShowing(loadingStatuses);
  // }, [loadingStatuses, setIsLoaderShowing]);

  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );


  useEffect(() => {


    if (inboxAllMessages.length >= totalResults) {
      setHasMore(false); // Stop fetching if we have all messages
    }
  }, [inboxAllMessages]);

  useEffect(() => {
    const container = document.getElementById("scrollableDiv");
    if (!container) return;

    // Store the current scroll position before new messages are added
    const previousScrollHeight = container.scrollHeight;
    const previousScrollTop = container.scrollTop;

    requestAnimationFrame(() => {
      const newScrollHeight = container.scrollHeight;
      container.scrollTop =
        previousScrollTop + (newScrollHeight - previousScrollHeight);
    });
  }, [inboxAllMessages]);

  useEffect(() => {
    if (!size(statuses)) {
      dispatch(getAllStatusList());
    }
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


      dispatchFilter({
        type: actions.STATUS,
        payload: filters,
      });
    }
  }, [statuses]);
  useEffect(() => {
    if (searchParams.get("showReminders")) {
      setIsRemainderTableOpen(true);
    } else {
      setIsRemainderTableOpen(false);
    }

    if (searchParams.get("unread")) {
      setNumberOfRowsShowing(50)
    } else {
      setNumberOfRowsShowing(10)

    }
  }, [searchParams])

  return (
    <InboxStyled
      style={{
        userSelect: user.subscriptionId == "6744617ea4d142ed16ea9c9e" && "none",
      }}
    >
      <div className="top">
        <div className="left">
          <h1>Inbox</h1>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          <div className="rightFilter">
            <FilterSidebar
              setFilters={setFilters}
              setIsRemainderTableOpen={setIsRemainderTableOpen}
              filters={filtersState}
              dispatch={dispatchFilter}
              isRemainderTableOpen={isRemainderTableOpen}
              totalResults={totalResults}
            />
          </div>

          <SearchInbox filters={filters} searchText={searchText} currentPage={currentPage} setCurrentPage={setCurrentPage} setSearchText={setSearchText} />
        </div>
      </div>
      <div style={{ paddingRight: selectedId && "14px" }} className="bottom">
        {/* <InboxFilter
          setFilters={setFilters}
          setIsRemainderTableOpen={setIsRemainderTableOpen}
          filters={filtersState}
          dispatch={dispatchFilter}
        /> */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
          className="bottom"
        >
          <AnimatePresence>
            <When condition={isRemainderTableOpen}>
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                exit={{ height: 0, scaleY: 0, opacity: 0 }}
              >
                <div
                  style={{ position: "absolute", width: "100%", zIndex: 100 }}
                >
                  <RemainderTable
                    setIsRemainderTableOpen={setIsRemainderTableOpen}
                  />
                </div>
              </motion.div>
            </When>
          </AnimatePresence>
          <div style={{ flexGrow: 1, display: "flex" }} className="bottom">
            <div style={{ flexGrow: 1 }} className="top">
              <If condition={!size(inboxAllMessages)}>
                <Then>
                  <div className="no-prospects">
                    <h3>
                      {loading ? (
                        "Loading..."
                      ) : (
                        <div
                          style={{
                            color: "#012635",
                            fontSize: "16px",
                            fontWeight: 400,
                          }}
                        >
                          No Record Found
                        </div>
                      )}
                    </h3>
                  </div>
                </Then>

                <Else>
                  <div
                    id="scrollableDiv"
                    style={{
                      height: "100%",
                      overflow: "auto",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <style>
                      {`
      #scrollableDiv::-webkit-scrollbar {
        width: 4px;
      }
      #scrollableDiv::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
      }
      #scrollableDiv::-webkit-scrollbar-thumb {
        background: #00BD82;
        border-radius: 10px;
      }
      #scrollableDiv::-webkit-scrollbar-thumb:hover {
        background: #00BD82;
      }
    `}
                    </style>
                    <InfiniteScroll
                      dataLength={inboxAllMessages.length}
                      next={() => {
                        setCurrentPage(+currentPage + 1);
                        onScrollEnd();
                      }}
                      hasMore={totalResults == inboxAllMessages.length || searchText ? false : true}
                      loader={<h4></h4>}
                      scrollableTarget="scrollableDiv"
                    >
                      {inboxAllMessages.map((message, index) => (
                        <MessageItem
                          index={index}
                          message={message}
                          key={message._id}
                          selectedId={selectedId}
                          onClick={() => {
                            setSelectedUserInbox(message);
                          }}
                          setSelectedRemainderId={setSelectedRemainderId}
                        />
                      ))}
                    </InfiniteScroll>
                  </div>
                </Else>
              </If>
            </div>
            {/* <div className="bottom">
              <div className="left">
                <span>Total: {totalResults}</span>
              </div>
              <div className="center">
                <Components.Common.MyPagination
                  currentPage={currentPage}
                  onChange={(p) => setCurrentPage(p)}
                  availableNumberOfRows={[25, 50, 100]}
                  currentlySelectedNumberOfRows={numberOfRowsShowing}
                  onChangeNumberOfRows={(p) => setNumberOfRowsShowing(p)}
                  totalItems={totalResults}
                />
              </div>
              <div className="right"></div>
            </div> */}
          </div>
          <div className="paginationMobile">
            <div>Total: {totalResults}</div>

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
                  onLimitChange={(event) =>
                    setNumberOfRowsShowing(Number(event.target.value))
                  }
                />
              </div>
            </div>
          </div>
          <div
            className="paginationDesktop"
            style={{
              height: "56px",
              minHeight: "48px",
              backgroundColor: "white",

              borderEndEndRadius: "12px",
              borderBottomLeftRadius: "12px",
              padding: "0px 16px",
              alignItems: "center",
              paddingTop: "10px ",
              paddingBottom: "10px",
            }}
          >
            <div style={{ fontSize: "14px", fontWeight: "500", color: "#012635" }} className="desktopView">Total: {totalResults}</div>

            <div>
              {/* <PaginationComp
                totalPages={totalPages || 1}
                currentPage={currentPage}
                onPageChange={(e, value) => setCurrentPage(value)}
              /> */}
            </div>

            {/* <div
              className="desktopViewTwo"
              style={{ alignItems: "center", gap: "10px" }}
            >
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
                  onLimitChange={(event) =>
                    setNumberOfRowsShowing(Number(event.target.value))
                  }
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </InboxStyled>
  );
};

export default InboxMain;

const MessageItem = ({ message, onClick, index, selectedId }) => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [tagMenuAnchor, setTagMenuAnchor] = useState(null);
  const [openRemainder, setOpenRemainder] = useState(null);
  const [openNote, setOpenNote] = useState(null);
  const dispatch = useDispatch();
  const { data: selectedItem } = useSelector((s) => s.inboxUserMessageReducer);
  // let reminderTitle = "Set Reminder";
  // if (message.isReminderSet && message?.reminder?.date) {
  //   reminderTitle = moment(message?.reminder?.date).format("MM/DD/YY");
  // }

  const openPhoneChat = (e, chat) => {


    e.stopPropagation();
    dispatch({ type: inboxMessageConstants.PHONE_SELECTED, payload: chat });
    onClick();
  };

  let userInfo = localStorage.getItem("user") || localStorage.getItem("user");
  userInfo = JSON.parse(userInfo);
  // const creationDate = moment(first(message?.messages)?.creationDate);
  const creationDate = moment(message?.updatedAt).tz(
    userInfo?.timeZone || "UTC"
  );
  const today = moment()
    .tz(userInfo?.timeZone || "UTC")
    .startOf("day");

  let displayValue;

  if (creationDate.isSame(today, "day")) {
    displayValue = creationDate.format("h:mm A");
  } else {
    displayValue = creationDate.format("M/D/YY");
  }


  const checkCondition = (chat) => {
    if (chat == 1 && !message?.isRead) {
      return true
    }
    if (chat == 2 && !message?.isReadPhone2) {
      return true
    }
    if (chat == 3 && !message?.isReadPhone3) {
      return true
    }
  }
  return (
    <>
      <MessageItemStyled
        key={index}
        selected={message._id == selectedItem?._id}
      >
        <div className="top">
          <StatusUpdateMenu selectedUserInbox={message} showLeadTags={true} />
          <div className="right">
            {/* <Components.Common.LightTooltip
              arrow
              placement="left"
              title={`${message?.batch?.admin?.firstName} ${message?.batch?.admin?.lastName}`}
            >
              <span>
                {message?.batch?.admin?.firstName?.charAt(0)}
                {message?.batch?.admin?.lastName?.charAt(0)}
              </span>
            </Components.Common.LightTooltip>
            <Components.Common.LightTooltip
              arrow
              placement="left"
              title={`${message?.batch?.user?.firstName} ${message?.batch?.user?.lastName}`}
            >
              <span>
                {message?.batch?.user?.firstName?.charAt(0)}
                {message?.batch?.user?.lastName?.charAt(0)}
              </span>
            </Components.Common.LightTooltip> */}
            <span
              style={{ fontSize: "14px", fontWeight: 400, color: "#777777" }}
            >
              {/* {moment(first(message?.messages)?.creationDate).format("M/D/YY")} */}
              {displayValue}
            </span>
            <img
              onClick={(e) => {
                e.stopPropagation();
                setMenuAnchor(e.currentTarget);
              }}
              src={Assets.Images.more}
            />
          </div>
        </div>
        <div className="bottom">
          <div>
            {message.messages?.map((msg) => {
              const msgSecondsAgo = moment().diff(
                moment(msg.creationDate),
                "seconds"
              );
              let chat = 1;
              if (msg.phone == message.phone2) {
                chat = 2;
              } else if (msg.phone == message.phone3) {
                chat = 3;
              }
              let unreadMessage = "";
              // if (!msg.isViewed) {
              //   if (msgSecondsAgo < 120) {
              //     unreadMessage = "blue";
              //   } else if (msgSecondsAgo < 300) {
              //     unreadMessage = "yellow";
              //   } else {
              //     unreadMessage = "red";
              //   }
              // }


              if (checkCondition(chat)) {
                if (msgSecondsAgo < 120) {
                  unreadMessage = "blue";
                } else if (msgSecondsAgo < 300) {
                  unreadMessage = "yellow";
                } else {
                  unreadMessage = "red";
                }
              }
              return (
                <>
                  <div
                    className="message"
                    key={msg._id}
                    onClick={(e) => {

                      openPhoneChat(e, chat);
                    }}
                  >
                    <Components.Common.LightTooltip
                      arrow
                      placement="top"
                      title={moment(msg.creationDate).fromNow()}
                    >
                      <span
                        className={classNames({
                          dot: true,
                          "unread-yellow": unreadMessage == "yellow",
                          "unread-blue": unreadMessage == "blue",
                          "unread-red": unreadMessage == "red",
                        })}
                      ></span>
                    </Components.Common.LightTooltip>
                    <p
                      id="messageControler-displaynone"
                      className={classNames({
                        unread: !message.isRead,
                      })}
                    >
                      {msg.content}
                    </p>
                  </div>
                </>
              );
            })}
          </div>
          <div>
            {/* <div className="moreOptions">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuAnchor(e.currentTarget);
                }}
              >
                <FaEllipsisV />
              </button>
            </div> */}
            <Components.Common.LightTooltip
              arrow
              placement="left"
              title={ message?.batch?.admin?.firstName ?`${message?.batch?.admin?.firstName
                ? message?.batch?.admin?.firstName
                : message?.batch?.admin?.firstName
                } ${message?.batch?.admin?.lastName
                  ? message?.batch?.admin?.lastName
                  : message?.batch?.admin?.lastName 
                
                }  
                 ` : ` ${message?.user?.firstName
                  ? message?.user?.firstName
                  : message?.user?.firstName
                  } ${message?.user?.lastName
                    ? message?.user?.lastName
                    : message?.user?.lastName 
                  
                  }`}
            >
              <div
                style={{
                  marginBottom: "10px",
                  color: "#777777",
                  backgroundColor: "#0000000D",
                  height: "24px",
                  padding: "0px 8px",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                {/* Omid A */}
                {message?.batch?.admin?.firstName?.charAt(0)}
                {message?.batch?.admin?.lastName?.charAt(0)}
                {message.user?.firstName?.charAt(0)}
                {message?.user?.lastName?.charAt(0)}
              </div>
            </Components.Common.LightTooltip>
            <div className="phone">
              <Components.Common.LightTooltip
                disableInteractive
                arrow
                placement="left"
                title="Phone 1"
              >
                <span
                  className={classNames({
                    // verified: message.isVerifiedNumber,
                    // dnc: message.isAddedToDNC,
                    // wrong: message.isWrongNumber,
                  })}
                  onClick={(e) => openPhoneChat(e, 1)}
                >
                  {/* <FaMobileAlt /> */}
                  {/* <img src={Assets.Images.phone_1} /> */}
                  {message.isVerifiedNumber ? (
                    <img src={Assets.Images.phone_1} />
                  ) : message.isAddedToDNC || message.isWrongNumber ? (
                    <img src={Assets.Images.phone_3} />
                  ) : (
                    <img src={Assets.Images.phone_2} />
                  )}
                </span>
              </Components.Common.LightTooltip>
              <When condition={message.phone2}>
                <Components.Common.LightTooltip
                  disableInteractive
                  arrow
                  placement="left"
                  title="Phone 2"
                >
                  <span
                    className={classNames({
                      // verified: message.isVerifiedNumberPhone2,
                      // dnc: message.isAddedToDNCPhone2,
                      // wrong: message.isWrongNumberPhone2,
                    })}
                    style={{ margin: "0px 4px" }}
                    onClick={(e) => openPhoneChat(e, 2)}
                  >
                    {/* <FaMobileAlt /> */}
                    {message.isVerifiedNumberPhone2 ? (
                      <img src={Assets.Images.phone_1} />
                    ) : message.isAddedToDNCPhone2 ||
                      message.isWrongNumberPhone2 ? (
                      <img src={Assets.Images.phone_3} />
                    ) : (
                      <img src={Assets.Images.phone_2} />
                    )}
                  </span>
                </Components.Common.LightTooltip>
              </When>
              <When condition={message.phone3}>
                <Components.Common.LightTooltip
                  disableInteractive
                  arrow
                  placement="left"
                  title="Phone 3"
                >
                  <span
                    className={classNames({
                      verified: message.isVerifiedNumberPhone3,
                      dnc: message.isAddedToDNCPhone3,
                      wrong: message.isWrongNumberPhone3,
                    })}
                    onClick={(e) => openPhoneChat(e, 3)}
                  >
                    {/* <FaMobileAlt /> */}
                    {/* <img src={Assets.Images.phone_3} /> */}
                    {message.isVerifiedNumberPhone3 ? (
                      <img src={Assets.Images.phone_1} />
                    ) : message.isAddedToDNCPhone3 ||
                      message.isWrongNumberPhone3 ? (
                      <img src={Assets.Images.phone_3} />
                    ) : (
                      <img src={Assets.Images.phone_2} />
                    )}
                  </span>
                </Components.Common.LightTooltip>
              </When>
            </div>
          </div>
        </div>

        <Menu
          open={Boolean(tagMenuAnchor)}
          onClose={() => setTagMenuAnchor(null)}
          anchorEl={tagMenuAnchor}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <TagAdd
            setTagMenuAnchor={() => setTagMenuAnchor(null)}
            userInboxItem={message}
          />
        </Menu>
        <NotePopup open={openNote} onClose={() => setOpenNote(false)} />
        <ActionMenu
          message={message}
          menuAnchor={menuAnchor}
          setMenuAnchor={setMenuAnchor}
          setOpenRemainder={setOpenRemainder}
          setOpenNote={setOpenNote}
          selectedId={selectedId}
        />
      </MessageItemStyled>
      <Components.Common.ModalTop
        open={openRemainder}
        onClose={(e) => {
          e.stopPropagation();
          setOpenRemainder(null);
        }}
      >
        <SetRemainderModal
          onClose={(e) => {
            e && e.stopPropagation();
            setOpenRemainder(null);
          }}
          selectedUserInbox={openRemainder}
        />
      </Components.Common.ModalTop>
    </>
  );
};

const RightSide = ({ setSelectId }) => {
  const { selectedUserInbox } = useContext(SelectedInboxItemContext);
  const [updatedMessage, setUpdatedMessage] = useState(false);
  const { inboxDetail, detailLoading } = useSelector(
    (s) => s.inboxUserMessageReducer
  );

  const {
    results: inboxAllMessages,

  } = useSelector((s) => s.inboxAllMessageReducer);
  const dispatch = useDispatch();
  const [showProspect, setShowProspect] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showSideBar, setShowSideBar] = useState(false);
  const divRef = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (selectedUserInbox) {
      dispatch(
        getProspectDetails(
          selectedUserInbox?.to,
          selectedUserInbox?._id?._id || selectedUserInbox?._id
        )
      )
        .then((response) => {
          console.log("Prospect details API response:", response);
        })
        .catch((error) => {
          console.error("Error fetching prospect details:", error);
        });
      // dispatch(getInboxActivityList(selectedUserInbox._id));
      if (selectedUserInbox?.to) {
        dispatch(
          getUserInboxMessages({
            from: replace(selectedUserInbox.from, "+", ""),
            to: replace(selectedUserInbox.to, "+", ""),
            limit: 50,
          })
        );
      } else if (selectedUserInbox?.phone2) {
        dispatch(
          getUserInboxMessages({
            from: replace(selectedUserInbox.from, "+", ""),
            phone2: replace(selectedUserInbox.phone2, "+", ""),
            limit: 50,
          })
        );
      } else if (selectedUserInbox?.phone3) {
        dispatch(
          getUserInboxMessages({
            from: replace(selectedUserInbox.from, "+", ""),
            phone3: replace(selectedUserInbox.phone3, "+", ""),
            limit: 50,
          })
        );
      }
    }
    // setUpdatedMessage(true)


  }, [selectedUserInbox, dispatch]);




  useEffect(() => {
    setUpdatedMessage(true)
  }, [inboxAllMessages])





  useEffect(() => {
    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setShowSideBar(false); // Close the div or perform an action
    }
  };

  return (
    <>
      <RightSideStyled>
        {windowWidth <= 1024 ? (
          <div className="mobile-chatBox-show">
            <div style={{ position: "relative" }}>
              <ChatBox
                // onClickProspect={() => setShowProspect(!showProspect)}
                // onClickContact={props.setSelectId}
                update={updatedMessage}
                setUpdatedMessage={setUpdatedMessage}
                inboxDetail={inboxDetail}
                showSideBar={showSideBar}
                setShowSideBar={setShowSideBar}
                setSelectId={setSelectId}

              />
              <div
                ref={divRef}
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  height: "100%",
                  backgroundColor: "white",
                  zIndex: 200,
                  width: "460px",
                  border: "solid 1px #E0E0E0",
                  display: showSideBar ? "block" : "none",
                }}
              >
                <ProspectDetails
                  inboxDetail={inboxDetail}
                  detailLoading={detailLoading}
                  setShowSideBar={setShowSideBar}
                />
              </div>

              {/* <div
              className="mobile-prospect-show"
              style={{
                right: `${showProspect ? "-75" : "0"}%`,
                transition: "all ease-in-out 0.3s",
                display: `${showProspect ? "none" : "block"}`,
              }}
            >
              <ProspectDetails
                inboxDetail={inboxDetail}
                detailLoading={detailLoading}
                showInboxButton={showProspect}
                onClickProspect={() => setShowProspect(!showProspect)}
              />
            </div> */}
            </div>
          </div>
        ) : (
          <div className="desktop-rightSide">
            <ChatBox
              update={updatedMessage}
              setUpdatedMessage={setUpdatedMessage}
              inboxDetail={inboxDetail}
              setShowSideBar={setShowSideBar}
              showSideBar={showSideBar}
            />
            {/* <ProspectDetails
              inboxDetail={inboxDetail}
              detailLoading={detailLoading}
            /> */}
            <div
              ref={divRef}
              style={{
                position: "absolute",
                right: 0,
                height: "100%",
                backgroundColor: "white",
                zIndex: 200,
                width: "460px",
                border: "solid 1px #E0E0E0",
                display: showSideBar ? "block" : "none",
              }}
            >
              <ProspectDetails
                inboxDetail={inboxDetail}
                detailLoading={detailLoading}
                setShowSideBar={setShowSideBar}
                showSideBar={showSideBar}
              />
            </div>
          </div>
        )}
      </RightSideStyled>
    </>
  );
};
