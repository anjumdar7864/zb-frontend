
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';
import { inboxMessageConstants } from "@/store/constants";
import { MessageItemStyled } from './styles';
import Components from "@/components";
import StatusUpdateMenu from "./StatusUpdateMenu";
import { If, Then, Else, When } from "react-if";
import { Menu, Box, Skeleton } from "@mui/material";
import TagAdd from "./TagAdd";
import NotePopup from "./Tabs/NotePopup";
import ActionMenu from "./ActionMenu";
import SetRemainderModal from "./SetRemainderModal";
import Assets from '@/assets';
import classNames from "classnames";
import styles from "./Inbox.module.css";
import { FaExclamation, FaFire, FaPhoneSlash, FaQuestion, FaSeedling } from "react-icons/fa6";
import color from "@/styles/color";
import { FaEllipsisV, FaMobileAlt, FaThermometerEmpty, FaTimes, FaTint } from "react-icons/fa";
const MessageItem = ({ message, onClick, index, selectedId }) => {
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [tagMenuAnchor, setTagMenuAnchor] = useState(null);
    const [openRemainder, setOpenRemainder] = useState(null);
    const [openNote, setOpenNote] = useState(null);
    const dispatch = useDispatch();
    const { data: selectedItem } = useSelector((s) => s.inboxUserMessageReducer);


    const openPhoneChat = (e, chat, message) => {
    

        if (chat == 1 && message?.messages?.length > 0 || chat == 2 && message?.messagesPhone2?.length > 0 || chat == 3 && message?.messagesPhone3?.length > 0) {
            e.stopPropagation();
            dispatch({ type: inboxMessageConstants.PHONE_SELECTED, payload: chat });
            onClick();
        }
    

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
            <div
                //  className={styles.MessageItemStyled}
                className={
                    styles.MessageItemStyled +
                    (message._id === selectedItem?._id ? ' ' + styles.selected : '')
                }
                key={index}
                selected={message._id == selectedItem?._id}
            >
                <div className={styles.MessageItemStyledTop}>
                    <StatusUpdateMenu selectedUserInbox={message} showLeadTags={true}  selectedId={message._id === selectedItem?._id}/>
                    <div className={styles.MessageItemStyledTopRight}>
                        <div
                            style={{
                                // marginBottom: "10px",
                                // color: "#777777",
                                backgroundColor: "#0000000D",
                                height: "20px",
                                padding: "0px 8px",
                                display: "flex",
                                alignItems: "center",
                                borderRadius: "12px",
                                fontSize: "12px",
                                fontWeight: 500,
                                lineHeight: "20px",
                            }}
                            className="body4Medium textSecondaryColor"
                        >
                            {/* Omid A */}
                            {message?.batch?.admin?.firstName?.charAt(0)}
                            {message?.batch?.admin?.lastName?.charAt(0)}
                            {message.user?.firstName?.charAt(0)}
                            {message?.user?.lastName?.charAt(0)}
                        </div>
                        <span
                            // style={{ fontSize: "14px", fontWeight: 400, color: "#777777" }}
                            className="body5Regular textSecondaryColor"
                        >

                            {displayValue}
                        </span>
                        <img
                            onClick={(e) => {
                                e.stopPropagation();
                                setMenuAnchor(e.currentTarget);
                            }}
                            src={Assets.Images.more}
                            style={{ width: "18px", height: "18px" }}
                        />
                    </div>
                </div>
                <div className={styles.MessageItemStyledBottom}>
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




                            if (checkCondition(chat)) {
                                if (msgSecondsAgo < 120) {
                                    unreadMessage = "blue";
                                } else if (msgSecondsAgo < 300) {
                                    unreadMessage = "yellow";
                                } else {
                                    unreadMessage = "red";
                                }
                            }

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

                            return (
                                <>
                                    <div
                                        className={styles.message}
                                        key={msg._id}
                                        onClick={(e) => {

                                            openPhoneChat(e, chat, message);
                                        }}
                                    >
                                        <Components.Common.LightTooltip
                                            arrow
                                            placement="top"
                                            title={moment(msg.creationDate).fromNow()}
                                        >
                                            <span
                                                // className={classNames({
                                                //     dot: true,
                                                //     "unread-yellow": unreadMessage == "yellow",
                                                //     "unread-blue": unreadMessage == "blue",
                                                //     "unread-red": unreadMessage == "red",
                                                // })}

                                                // style={{
                                                //     "--color": statusIcons[status.name].color,
                                                //     "--background":
                                                //       statusIcons[status.name].BackgroundColor,
                                                //   }}


                                                className={
                                                    styles.dot +
                                                    (unreadMessage === 'yellow' ? ' ' + styles.unreadYellow : '') +
                                                    (unreadMessage === 'blue' ? ' ' + styles.unreadBlue : '') +
                                                    (unreadMessage === 'red' ? ' ' + styles.unreadRed : '')
                                                }
                                            ></span>
                                        </Components.Common.LightTooltip>
                                        <p
                                            id="messageControler-displaynone"
                                            // className={classNames({
                                            //     unread: !message.isRead,

                                            // })}

                                            // className={( !message.isRead ? styles.unread : '')}
                                            className={(!message.isRead ? "body5Medium textSecondaryColor  " : 'body5Regular textSecondaryColor')}
                                        >
                                            {msg.content}
                                        </p>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                    <div>

                        <Components.Common.LightTooltip
                            arrow
                            placement="left"
                            title={message?.batch?.admin?.firstName ? `${message?.batch?.admin?.firstName
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

                        </Components.Common.LightTooltip>
                        <div className={styles.phone}>
                            <Components.Common.LightTooltip
                                disableInteractive
                                arrow
                                placement="left"
                                title="Phone 1"
                            >
                                <span
                                    className={styles.phoneSpan +
                                        (message.isVerifiedNumberPhone3 ? ' ' + styles.phoneSpanVerified : '') +
                                        (message.isAddedToDNCPhone3 ? ' ' + styles.phoneSpanDnc : '') +
                                        (message.isWrongNumberPhone3 ? ' ' + styles.phoneSpanWrong : '')}
                                    onClick={(e) => openPhoneChat(e, 1, message)}
                                >

                                    {message.isVerifiedNumber ? (
                                        <img src={Assets.Images.phone_1} style={{ width: "20px", height: "20px" }} />
                                    ) : message.isAddedToDNC || message.isWrongNumber ? (
                                        <img src={Assets.Images.phone_3} style={{ width: "20px", height: "20px" }} />
                                    ) : (
                                        <img src={Assets.Images.phone_2} style={{ width: "20px", height: "20px" }} />
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
                                        className={styles.phoneSpan}
                                        style={{ margin: "0px 0px" }}
                                        onClick={(e) => openPhoneChat(e, 2, message)}
                                    >

                                        {message.isVerifiedNumberPhone2 ? (
                                            <img src={Assets.Images.phone_1} style={{ width: "20px", height: "20px" }} />
                                        ) : message.isAddedToDNCPhone2 ||
                                            message.isWrongNumberPhone2 ? (
                                            <img src={Assets.Images.phone_3} style={{ width: "20px", height: "20px" }} />
                                        ) : (
                                            <img src={Assets.Images.phone_2} style={{ width: "20px", height: "20px" }} />
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
                                        // className={classNames({
                                        //     verified: message.isVerifiedNumberPhone3,
                                        //     dnc: message.isAddedToDNCPhone3,
                                        //     wrong: message.isWrongNumberPhone3,
                                        // })}
                                        className={styles.phoneSpan}

                                        style={{opacity:0.5}}
                                        // style={{height:"20px",width:"20px" , paddingTop:"-22px"}}
                                        onClick={(e) => openPhoneChat(e, 3, message)}
                                    >

                                        {message.isVerifiedNumberPhone3 ? (
                                            <img src={Assets.Images.phone_1} style={{ width: "20px", height: "20px"   }} />
                                        ) : message.isAddedToDNCPhone3 ||
                                            message.isWrongNumberPhone3 ? (
                                            <img src={Assets.Images.phone_3} style={{ width: "20px", height: "20px"   }} />
                                        ) : (
                                            <img src={Assets.Images.phone_2} style={{ width: "20px", height: "20px"    }} />
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
                <NotePopup open={openNote} message={message} onClose={() => setOpenNote(false)} />
                <ActionMenu
                    message={message}
                    menuAnchor={menuAnchor}
                    setMenuAnchor={setMenuAnchor}
                    setOpenRemainder={setOpenRemainder}
                    setOpenNote={setOpenNote}
                    selectedId={selectedId}
                />
            </div>
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


export default MessageItem;