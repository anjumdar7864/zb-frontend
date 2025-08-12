import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGlobalContext } from "@/hooks";
import {
    SelectedInboxItemContext,
    SelectedTabContext,
} from "./SelectedInboxItemContext";

import { color } from '@/constants/colors';
import { useReducer } from 'react';
import { initialFilterReducer, reducer, actions } from "./Filters/InboxFilterReducer";
import {
    InboxMainStyled,
    InboxStyled,
    MessageItemStyled,
    RightSideStyled,
} from "./styles";
import FilterSidebar from "./FilterSidebar";
import { FaExclamation, FaFire, FaPhoneSlash, FaQuestion, FaSeedling } from "react-icons/fa6";
import { FaEllipsisV, FaMobileAlt, FaThermometerEmpty, FaTimes, FaTint } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import SearchInbox from "./SearchInbox";
import { AnimatePresence, motion } from "framer-motion";
import { If, Then, Else, When } from "react-if";
import RemainderTable from "./RemainderTable";
import { replace, size, first } from "lodash-es";
import InfiniteScroll from "react-infinite-scroll-component";
import PaginationDropDown from "./PaginationDropDown";
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
import MessageItem from './MessageItem';
import styles from "./Inbox.module.css";
import InboxFilter from './Filters/InboxFilterS';
import PaginationComp from './Pagination';

const Inbox = ({ setSelectedRemainderId, selectedId }) => {
    const [numberOfRowsShowing, setNumberOfRowsShowing] = useState(25);
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

    useEffect(() => {
        if (filters?.status != null) {
            dispatch(
                getAllInboxMessages({
                    limit: numberOfRowsShowing,
                    page: +currentPage,
                    ...filters,
                })
            );
            if (numberOfRowsShowing != 25) {
                // dispatch(getStats());
            }
        }
    }, [currentPage, numberOfRowsShowing])

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
            setNumberOfRowsShowing(25)

        }
    }, [searchParams])

    const handlePageChange = (event, value) => {
        setCurrentPage(value)
    }


    const handleLimitChange = (event) => {
        setNumberOfRowsShowing(Number(event.target.value));
        setCurrentPage(1);
    };


    

    return (
        <InboxStyled
            // className={`   lightBackground ${styles.InboxStyled} `}
            className={styles.InboxStyled}
            style={{
                userSelect: user.subscriptionId == "6744617ea4d142ed16ea9c9e" && "none",
            }}
        >
            <div
                //  className={styles.InboxStyledTop}
                className='pageHeaderLayout'
            >
                <div className={styles.InboxStyledTopLeft}>
                    <h1
                        //  className={styles.InboxStyledTopLeftH1}
                        className='body1SemiBold textPrimeryColor'
                    >Inbox</h1>
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
                            statuses={statuses}
                        />
                    </div>

                    <SearchInbox filters={filters} searchText={searchText} currentPage={currentPage} setCurrentPage={setCurrentPage} setSearchText={setSearchText} />
                </div>
            </div>
            <div style={{ paddingRight: selectedId && "4px" }}
                className={`bottom ${styles.listContainer}`}

            >
                <InboxFilter
                    setFilters={setFilters}
                    setIsRemainderTableOpen={setIsRemainderTableOpen}
                    filters={filtersState}
                    dispatch={dispatchFilter}
                    isRemainderTableOpen={isRemainderTableOpen}
                    totalResults={totalResults}
                    statuses={statuses}
                />
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
                    <div style={{ flexGrow: 1, display: "flex", overflow: "unset" }} className="bottom">
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
                                    {/* <div
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
                                        > */}
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
                                    {/* </InfiniteScroll>
                                    </div> */}
                                </Else>
                            </If>
                        </div>

                    </div>
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
                            // borderTop: "1px solid var(--Extra-Grey, #e0e0e0)",
                            // minWidth: '1278px',
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

                    <div
                        className={styles.MobilePagination}
                        style={{
                            // display: "flex",

                            justifyContent: "space-between",
                            // height: "56px",
                            backgroundColor: "white",
                            border: '1px solid #E0E0E0',
                            borderEndEndRadius: "8px",
                            borderEndStartRadius: "8px",
                            borderTop: "1px solid var(--Extra-Grey, #e0e0e0)",
                            // minWidth: '1278px',
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


                        <div style={{display:"flex" , justifyContent:"center"}}>
                            <PaginationComp
                                totalPages={totalPages || 1}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>

                        <div style={{display:"flex" , justifyContent:"space-between"}}>
                            <p style={{ color: '#012635', lineHeight: '22px', fontSize: '14px', fontWeight: 500 }}>
                                Total:{" "}
                                {totalResults ? totalResults : 0}
                            </p>



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



                    {/* <div className="paginationMobile">
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

                        </div>


                    </div> */}
                </div>
            </div>
        </InboxStyled>


    );
};

export default Inbox;