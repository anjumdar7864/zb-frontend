import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import Assets from '@/assets';
import { IoMdClose } from 'react-icons/io';
import { InboxFilter, StatusFilterTab, statusIcons } from './Filters';
import { useState, useReducer, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { actions, initialFilterReducer, reducer } from './Filters/InboxFilterReducer';
import { getUserAuth } from '@/utils/storage';
import UserSelect from './Filters/userSelect';
import CampaignFilter from './Filters/CampaignFilter';
import UserSecond from './Filters/userSecond';
import TagFilter from './Filters/TagFilter';
import {
    FilterContainer,
} from "./styles";
import { FormControlLabel, Radio } from '@mui/material';

export default function FilterSidebar({
    setFilters,
    isRemainderTableOpen,
    setIsRemainderTableOpen,
    filters,
    dispatch,
    totalResults
}) {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    // const [filters, dispatch] = useReducer(reducer, initialFilterReducer);
    const { results: statuses } = useSelector((s) => s.statusReducer);
    const [searchParams] = useSearchParams();
    const [isCampaignDropdownOpen, setCampaignDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
    const [isStatusDropdownOpen, setStatusDropdownOpen] = useState(false);
    const [isTagDropdownOpen, setTagDropdownOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isPushToCRM, setIsPushToCRM] = useState(false);
    const [filtersState, dispatchFilter] = useReducer(
        reducer,
        initialFilterReducer
    );

    const navigate = useNavigate()
    // console.log("check filters" , filtersState , filters );

    const handleChange = (event) => {

        if (isRemainderTableOpen != true) {
            setIsRemainderTableOpen(true)

        } else {
            setIsRemainderTableOpen(false)
            navigate("/inbox")
        }

        // setIsChecked(event.target.checked);
    };
    const user = getUserAuth();

    useEffect(() => {
        setFilters(filters);
    }, [filters]);


    // console.log("check user log" ,   filters);

    const selectUser = (user) => {

        setCampaignDropdownOpen(false);
        setStatusDropdownOpen(false);
        setTagDropdownOpen(false);
        dispatch({
            type: actions.USER,
            payload: user?._id,
        });
        dispatch({
            type: actions.USER_OBJECT,
            payload: user,
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
    const handlePushtoCRM = () => {

    }
  

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


    // console.log("check status in sidebar", filters.status);


    const removeStatus = (status) => {
        // console.log("check status id in sidebar", status);
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
        dispatch({
            type: actions.CAMPAIGN,
            payload: null,
        });
        dispatch({
            type: actions.USER,
            payload: null,
        });
        dispatch({
            type: actions.TAG,
            payload: null,
        });
        const filters = statuses.map((status) => {
            if (statusIcons[status.name]?.active) {
                return status._id;
            }
        });
        selectStatus(filters);
        setIsPushToCRM(false)
        setIsRemainderTableOpen(false)
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
        if (isPushToCRM) {
            dispatch({
                type: actions.CRM,
                payload: true,
            });
        } else {
            dispatch({
                type: actions.CRM,
                payload: null,
            });
        }
    }, [isPushToCRM]);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 419, height: "100%", display: "flex", flexDirection: "column" }}
            role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
        >
            <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 24px", borderBottom: "solid 1px #D3D7DD" }}>
                <div className='body3Medium textPrimeryColor'>Filter</div> <div><IoMdClose style={{ cursor: "pointer" }} onClick={toggleDrawer('right', false)} /></div>

            </div>
            <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px", flexGrow: 1 }}>
                <div style={{ display: "flex", justifyContent: "center", }}>
                    <UserSelect
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
                <div style={{ display: "flex", justifyContent: "center", }}>
                    <CampaignFilter
                        selectCampaign={selectCampaign}
                        removeStatus={removeStatus}
                        selectStatus={selectStatus}
                        filters={filters}
                        isOpen={isStatusDropdownOpen}
                        toggleDropdown={() => {
                            setStatusDropdownOpen(!isStatusDropdownOpen);
                            setCampaignDropdownOpen(false);
                            setUserDropdownOpen(false);
                            setTagDropdownOpen(false);
                        }}

                    />
                </div>
                <div style={{ display: "flex", justifyContent: "center", }}>
                    <UserSecond
                        selectUser={selectUser}
                        filters={filters}
                        toggleDropdown={() => {
                            setUserDropdownOpen(!isUserDropdownOpen);
                            setCampaignDropdownOpen(false);
                            setStatusDropdownOpen(false);
                            setTagDropdownOpen(false);
                        }}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "center", }}>
                    <TagFilter
                        selectTag={selectTag}
                        isOpen={isTagDropdownOpen}
                        filters={filters}
                        toggleDropdown={() => {
                            setTagDropdownOpen(!isTagDropdownOpen);
                            setCampaignDropdownOpen(false);
                            setStatusDropdownOpen(false);
                            setUserDropdownOpen(false);
                        }}

                    />
                </div>
                <div style={{ display: "flex", justifyContent: "center", }}>
                    <div style={{ width: "387px", height: "42px", borderRadius: "8px", border: "solid 1px #D3D7DD", display: "flex", alignItems: "center", padding: "0px 12px", justifyContent: "space-between" }}>
                        <div className="body4Regular textPrimeryColor" >Reminders</div>
                        <div style={{ padding: "1px", border: `solid 1px ${isRemainderTableOpen ? "#00BD82" : "#777777"}`, borderRadius: "16px", width: "18px", height: "18px" }} onClick={handleChange}>
                            <div style={{ width: "100%", height: "100%", backgroundColor: isRemainderTableOpen ? "#00BD82" : "white", borderRadius: "50%" }}>

                            </div>
                        </div>

                    </div>

                </div>
                <div style={{ display: "flex", justifyContent: "center", }}>
                    <div style={{ width: "387px", height: "42px", borderRadius: "8px", border: "solid 1px #D3D7DD", display: "flex", alignItems: "center", padding: "0px 12px", justifyContent: "space-between" }}>
                        <div  className="body4Regular textPrimeryColor" >Push to CRM</div>
                        <div>
                            <div style={{ padding: "1px", border: `solid 1px ${isPushToCRM ? "#00BD82" : "#777777"}`, borderRadius: "16px", width: "18px", height: "18px" }} onClick={() => setIsPushToCRM(!isPushToCRM)}>
                                <div style={{ width: "100%", height: "100%", backgroundColor: isPushToCRM ? "#00BD82" : "white", borderRadius: "50%" }}>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                 <FilterContainer>
                 <InboxFilter
                    setFilters={setFilters}
                    setIsRemainderTableOpen={setIsRemainderTableOpen}
                    filters={filters}
                    dispatch={dispatch}
                    removeStatus={removeStatus}
                    selectStatus={selectStatus}
                />
                 </FilterContainer>
               

            </div>
            <div style={{ height: "88px", display: "flex", padding: "0px 24px", justifyContent: "space-between", alignItems: "center", borderTop: "solid 1px #D3D7DD" }}>
                <div style={{ color: "#777777", fontSize: "16px", fontWeight: 500 }}>{totalResults} Result</div>
                <div style={{ display: "flex", gap: "16px" }}>
                    <div
                        onClick={resetFilter}
                        style={{ height: "40px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "8px", cursor: "pointer", fontSize: "16px", fontWeight: 500, color: "#777777" }}>
                        Clear All
                    </div>
                    <div>
                        <div onClick={toggleDrawer('right', false)} style={{ backgroundColor: "#00BD82", color: "white", width: "100px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "8px", cursor: "pointer", fontSize: "16px", fontWeight: 500 }}>
                            Save
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    );

    return (
        <div>
            <div 
             style={{  backgroundColor: "white", border: "solid 1px #D3D7DD", borderRadius: "8px", width: "103px", display: "flex", justifyContent: "center", cursor: "pointer", alignItems: "center" }} onClick={toggleDrawer('right', true)}
             className="boxHeight body4Regular textPrimeryColor"
             ><img src={Assets.Icons.filter} style={{width:"18px", height:"18px"}} />All Filter</div>
            <Drawer
                anchor='right'
                open={state['right']}

            onClose={toggleDrawer('right', false)}
            >
                {list('right')}
            </Drawer>
        </div>
    );
}
