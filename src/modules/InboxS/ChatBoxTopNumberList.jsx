import React from 'react'
import { When } from 'react-if';
import { FaCheckCircle } from 'react-icons/fa';
import { FaTimesCircle } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Components from "@/components";
import classNames from "classnames";
import { useDispatch } from 'react-redux';
import {
    getUserInboxMessages,
    sendInboxMessage,
    markAsRead,
    getAllReplyTemplateCategories,
    pushDataToCRM,
} from "@/store/actions";
import styles from "./InboxS.module.css";
import { inboxMessageConstants } from "@/store/constants";
const ChatBoxTopNumberList = () => {
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
    const getPhoneTitle = (phoneType) => {
        let title = "";
        switch (phoneType) {
            case 1:
                if (selectedUserInbox.isVerifiedNumber) {
                    title = "Verified Number";
                }
                if (selectedUserInbox.isAddedToDNC) {
                    title += " DNC";
                }
                break;
            case 2:
                if (selectedUserInbox.isVerifiedNumberPhone2) {
                    title = "Verified Number";
                }
                if (selectedUserInbox.isAddedToDNCPhone2) {
                    title += " DNC";
                }
                break;
            case 3:
                if (selectedUserInbox.isVerifiedNumberPhone3) {
                    title = "Verified Number";
                }
                if (selectedUserInbox.isAddedToDNCPhone3) {
                    title += " DNC";
                }
                break;
        }
        return title;
    };

    const pushToCRMClicked = () => {
        dispatch(pushDataToCRM({ ...inboxDetail, inbox: userInboxItem?._id }));
    };

     const setChatPhone = (phoneChat) => {
        dispatch({
          type: inboxMessageConstants.PHONE_SELECTED,
          payload: phoneChat,
        });
      };
    
    return (
        <div
        //  className="bottom"
         className={styles.topBottom}
         >
            <When condition={selectedUserInbox.to}>
                <Components.Common.LightTooltip
                    arrow
                    placement="top"
                    title={getPhoneTitle(1)}
                >
                    <button
                        // className={classNames({
                        //     selected: selectedPhone == 1,
                        //     verified: selectedUserInbox.isVerifiedNumber,
                        //     block: selectedUserInbox.isWrongNumber,
                        //     cut:
                        //         selectedUserInbox.isAddedToDNC ||
                        //         (!selectedUserInbox.isVerifiedNumber &&
                        //             (selectedUserInbox.isVerifiedNumberPhone2 ||
                        //                 selectedUserInbox.isVerifiedNumberPhone3)),
                        // })}


                    


                        className={
                            styles.pushToCrmButton +
                            (selectedPhone == 1 ? ' ' + styles.selected : '') +
                            (selectedUserInbox.isVerifiedNumber ? ' ' + styles.verified : '') +
                            (selectedUserInbox.isWrongNumber ? ' ' + styles.block : '') +
                            (
                              selectedUserInbox.isAddedToDNC ||
                              (!selectedUserInbox.isVerifiedNumber &&
                                (selectedUserInbox.isVerifiedNumberPhone2 || selectedUserInbox.isVerifiedNumberPhone3))
                                ? ' ' + styles.cut
                                : ''
                            )
                          }


                        onClick={() => {
                            setChatPhone(1)
                            scrollToBottom(1)
                        }}
                    >
                        <span 
                        // className="icon"
                        className={styles.icon}
                        >
                            <When condition={selectedUserInbox.isVerifiedNumber}>
                                <FaCheckCircle />
                            </When>
                            <When condition={selectedUserInbox.isWrongNumber}>
                                <FaTimesCircle />
                            </When>
                            <When condition={selectedUserInbox.isAddedToDNC}>
                                <FaTimes 
                                // className="red" 
                                className={styles.red}
                                />
                            </When>
                        </span>
                        <span 
                        // className="text"
                        // className={styles.text}
                        className="body4Medium textPrimeryColor"
                        
                        >{selectedUserInbox.to}</span>
                    </button>
                </Components.Common.LightTooltip>
            </When>
            <When condition={selectedUserInbox.phone2}>
                <Components.Common.LightTooltip
                    arrow
                    placement="top"
                    title={getPhoneTitle(2)}
                >
                    <button
                        // className={classNames({
                        //     selected: selectedPhone == 2,
                        //     verified: selectedUserInbox.isVerifiedNumberPhone2,
                        //     block: selectedUserInbox.isWrongNumberPhone2,
                        //     cut:
                        //         selectedUserInbox.isAddedToDNCPhone2 ||
                        //         (!selectedUserInbox.isVerifiedNumberPhone2 &&
                        //             (selectedUserInbox.isVerifiedNumber ||
                        //                 selectedUserInbox.isVerifiedNumberPhone3)),
                        // })}

                        
                        className={
                            styles.pushToCrmButton +
                            (selectedPhone == 2 ? ' ' + styles.selected : '') +
                            (selectedUserInbox.isVerifiedNumberPhone2 ? ' ' + styles.verified : '') +
                            (selectedUserInbox.isWrongNumberPhone2 ? ' ' + styles.block : '') +
                            (
                                selectedUserInbox.isAddedToDNCPhone2 ||
                                (!selectedUserInbox.isVerifiedNumberPhone2 &&
                                    (selectedUserInbox.isVerifiedNumber ||
                                        selectedUserInbox.isVerifiedNumberPhone3))
                                ? ' ' + styles.cut
                                : ''
                            )
                          }
                        onClick={() => {
                            if (selectedUserInbox?.messagesPhone2?.length != 0) {
                                setChatPhone(2);
                                scrollToBottom(2)
                            }
                        }}
                    >
                        <span 
                        //  className="icon"
                        className={styles.icon}
                         
                         >
                            <When condition={selectedUserInbox.isVerifiedNumberPhone2}>
                                <FaCheckCircle />
                            </When>
                            <When condition={selectedUserInbox.isWrongNumberPhone2}>
                                <FaTimesCircle />
                            </When>
                            <When condition={selectedUserInbox.isAddedToDNCPhone2}>
                                <FaTimes 
                                 className={styles.red} />
                            </When>
                        </span>
                        <span 
                        //  className="text"
                        className="body4Medium textPrimeryColor"
                         >{selectedUserInbox.phone2}</span>
                    </button>
                </Components.Common.LightTooltip>
            </When>
            <When condition={selectedUserInbox.phone3}>
                <Components.Common.LightTooltip
                    arrow
                    placement="top"
                    title={getPhoneTitle(3)}
                >
                    <button
                        // className={classNames({
                        //     selected: selectedPhone == 3,
                        //     verified: selectedUserInbox.isVerifiedNumberPhone3,
                        //     block: selectedUserInbox.isWrongNumberPhone3,
                        //     cut:
                        //         selectedUserInbox.isAddedToDNCPhone3 ||
                        //         (!selectedUserInbox.isVerifiedNumberPhone3 &&
                        //             (selectedUserInbox.isVerifiedNumber ||
                        //                 selectedUserInbox.isVerifiedNumberPhone2)),
                        // })}



                        className={
                            styles.pushToCrmButton +
                            (selectedPhone == 3 ? ' ' + styles.selected : '') +
                            (selectedUserInbox.isVerifiedNumberPhone3 ? ' ' + styles.verified : '') +
                            (selectedUserInbox.isWrongNumberPhone3 ? ' ' + styles.block : '') +
                            (
                                selectedUserInbox.isAddedToDNCPhone3 ||
                                (!selectedUserInbox.isVerifiedNumberPhone3 &&
                                    (selectedUserInbox.isVerifiedNumber ||
                                        selectedUserInbox.isVerifiedNumberPhone2))
                                ? ' ' + styles.cut
                                : ''
                            )
                          }


                        onClick={() => {
                            if (selectedUserInbox?.messagesPhone3?.length != 0) {
                                setChatPhone(3);
                                scrollToBottom(3)
                            }
                        }}
                    >
                        <span 
                        //  className="icon"
                         
                         className={styles.icon}
                         >
                            <When condition={selectedUserInbox.isVerifiedNumberPhone3}>
                                <FaCheckCircle />
                            </When>
                            <When condition={selectedUserInbox.isWrongNumberPhone3}>
                                <FaTimesCircle />
                            </When>
                            <When condition={selectedUserInbox.isAddedToDNCPhone3}>
                                <FaTimes  className={styles.red} />
                            </When>
                        </span>
                        <span 
                        //  className="text"
                           className="body4Medium textPrimeryColor"
                         >{selectedUserInbox.phone3}</span>
                    </button>
                </Components.Common.LightTooltip>
            </When>
            <div
                className={styles.bottomContainer}
                style={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "end",
                    padding: "8px 0px",
                }}
            >
                <div
                    //  className="pushToCrmDesktop"
                    className={styles.pushToCrmDesktop}

                >
                    {/* <button
                        // className={styles.pushToCrmButton}
                        disabled={
                            pushDataToCRMLoading ||
                            (!userInboxItem?.isVerifiedNumber &&
                                !userInboxItem?.isVerifiedNumberPhone2 &&
                                !userInboxItem?.isVerifiedNumberPhone3)
                        }
                        onClick={pushToCRMClicked}
                        style={{
                            width: "122px",
                            height: "32px",
                            backgroundColor: "#00BD82",
                            borderRadius: "8px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            fontWeight: 600,
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
                    </button> */}
                </div>
            </div>
        </div>
    )
}

export default ChatBoxTopNumberList