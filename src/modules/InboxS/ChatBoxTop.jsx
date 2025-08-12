import React, { useState } from 'react'





import { useSelector } from 'react-redux';


import {

    pushDataToCRM,
} from "@/store/actions";
import { useDispatch } from 'react-redux';
import ChatBoxTopProfile from './ChatBoxTopProfile';
import ChatBoxTopNumberList from './ChatBoxTopNumberList';
import Styles from "./InboxS.module.css";
const ChatBoxTop = (props) => {

    const dispatch = useDispatch();
    const {
        data: selectedUserInbox,
        loading,
        selectedPhone,
        newMessagePhone,
        detailLoading,

        data: userInboxItem,
        inboxDetail,
        pushDataToCRMLoading,
    } = useSelector((s) => s.inboxUserMessageReducer);
    const pushToCRMClicked = () => {
        dispatch(pushDataToCRM({ ...inboxDetail, inbox: userInboxItem?._id }));
    };
    const mapAddress = `${props?.inboxDetail?.propertyAddress}-${props?.inboxDetail?.propertyCity}-${props?.inboxDetail?.propertyState}`;


    return (
        <div 
        // className="top"
        className={Styles.chatBoxTopContainer}
        >
            <ChatBoxTopProfile {...props} />

            <div
             // className="pushToCrm"
             className={Styles.pushToCrm}
             >
                <button
                    disabled={
                        pushDataToCRMLoading ||
                        (!userInboxItem?.isVerifiedNumber &&
                            !userInboxItem?.isVerifiedNumberPhone2 &&
                            !userInboxItem?.isVerifiedNumberPhone3)
                    }
                    onClick={pushToCRMClicked}
                    style={{
                        width: "100%",
                        height: "32px",
                        backgroundColor: "#00BD82",
                        borderRadius: "8px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        fontWeight: 500,
                        fontSize: "14px",
                        cursor:
                            pushDataToCRMLoading ||
                                (!userInboxItem?.isVerifiedNumber &&
                                    !userInboxItem?.isVerifiedNumberPhone2 &&
                                    !userInboxItem?.isVerifiedNumberPhone3)
                                ? "no-drop"
                                : "pointer",
                        display: userInboxItem?.pushedToCrmDate ? "none" : "flex",
                    }}
                >
                    Push to CRM
                </button>
            </div>

            <ChatBoxTopNumberList />

        </div>
    )
}

export default ChatBoxTop