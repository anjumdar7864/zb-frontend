import { useEffect, useRef, useState } from "react";
import {
  FaArrowUp,
  FaBell,
  FaCheckCircle,
  FaTag,
  FaPhoneSquare,
  FaTimesCircle,
  FaTimes,
  FaArrowDown,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { RiInboxArchiveFill } from "react-icons/ri";
import { Menu, Box, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";
import { BsEyeFill } from "react-icons/bs";
import { replace } from "lodash-es";
import { If, Then, Else, When } from "react-if";
import classNames from "classnames";
import toast from "react-hot-toast";
import Components from "@/components";
import { statusIcons } from "./Filters/StatusFilter";
import {
  getUserInboxMessages,
  sendInboxMessage,
  markAsRead,
  getAllReplyTemplateCategories,
  pushDataToCRM,
} from "@/store/actions";
import { inboxMessageConstants } from "@/store/constants";
import { ChatBoxStyled } from "./styles";
import { AddToDNCButton, VerifiedButton, WrongNumberButton } from "./Buttons";
import { QuickRepliesModal } from "./Modals";
import TagAdd from "./TagAdd";
import SetRemainderModal from "./SetRemainderModal";
import StatusUpdateMenu from "./StatusUpdateMenu";
import { LiaPhoneSolid } from "react-icons/lia";
import Assets from "@/assets";
import { FaExclamation } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import NotePopup from "./Tabs/NotePopup";
import { PiBellBold, PiBellLight } from "react-icons/pi";
import dayjs from "dayjs";
import ChatInput from "./TextArea";
import { shallowEqual } from 'react-redux';
const ChatBox = (props) => {
  const [activeProspect, setActiveProspect] = useState(true);
  const [isMouseHover, setIsMouseHover] = useState(false);
  const ref = useRef(null);
  const textArea = useRef(null);
  const [sendMessageText, setSendMessageText] = useState("");
  const [sendMessageCategry, setSendMessageCategory] = useState("");
  const [isQuickRepliesModalOpen, setIsQuickRepliesModalOpen] = useState(false);
  const [tagMenuAnchor, setTagMenuAnchor] = useState(null);
  const [openRemainder, setOpenRemainder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isLandDetailsOpen, setIsLandDetailsOpen] = useState(false);
  const [openNotePopup, setOpenNotePopup] = useState(false);
  let phone1LastDate = null;
  let phone2LastDate = null;
  let phone3LastDate = null;
  const mapAddress = `${props?.inboxDetail?.propertyAddress}-${props?.inboxDetail?.propertyCity}-${props?.inboxDetail?.propertyState}`;
  console.log("check chulling", props.update);

  const messagesBoxRef = useRef(null);
  const textAreaRef = useRef();
  const inputValueRef = useRef();
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
  // console.log("check chulling=========000000==" , selectedUserInbox);

  const  DetailId = useSelector((s) => s.inboxUserMessageReducer.DetailId, shallowEqual);
  const {
  
    dripFilterForInbox,
  } = useSelector((s) => s.inboxUserMessageReducer);

  console.log("formattedDate ==" , dripFilterForInbox);
  
  const { results: statuses } = useSelector((s) => s.statusReducer);
  const { _id } = selectedUserInbox;
  // const { setIsLoaderShowing } = useGlobalContext();

  // if((selectedPhone == 3 && !selectedUserInbox?.phone3) || (selectedPhone == 2 && !selectedUserInbox?.phone2)) {
  //   dispatch({ type: inboxMessageConstants.PHONE_SELECTED, payload: 1 });
  // }

  // useEffect(() => {
  //   setIsLoaderShowing(loading);
  // }, [loading, setIsLoaderShowing]);

  let reminderTitle = "Set Reminder";
  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );
  if (selectedUserInbox.isReminderSet && selectedUserInbox?.reminder?.date) {
    reminderTitle = moment(selectedUserInbox?.reminder?.date)
      .tz(user?.timeZone || "UTC")
      .format("MM/DD/YY");
  }

  useEffect(() => {
    setSendMessageText("");
    // props?.setUpdatedMessage(false)
  }, [selectedUserInbox?._id]);



  const { loading: sendMessageLoading } = useSelector(
    (s) => s.sendInboxMessage
  );

  const scrollToBottom = (selectedID) => {
    console.log("check id of unread", _id);
    
    let phoneObj = {}
    const keyVAl = `phone${selectedID ? selectedID : selectedPhone}`

    phoneObj = { [keyVAl]: true }
    if (messagesBoxRef.current) {
      const div = messagesBoxRef.current;
      div.scrollTop = div.scrollHeight;
      _id && dispatch(markAsRead(_id, phoneObj, () => { }));
    }
  };

  const scrollToBottomMessage = () => {
    let phoneObj = {}
    const keyVAl = `phone${selectedPhone}`

    phoneObj = { [keyVAl]: true }
    if (messagesBoxRef.current) {
      const div = messagesBoxRef.current;
      div.scrollTop = div.scrollHeight;
      // _id && dispatch(markAsRead(_id, phoneObj ,  () => {}));
    }
  };
  useEffect(() => {

    scrollToBottomMessage()



  }, [selectedUserInbox?.messages, selectedUserInbox?.messagesPhone2, selectedUserInbox?.messagesPhone3])
  const handlePlaceholderInsertion = (textToInsert) => {
    if (textAreaRef.current) {
      const startPos = textAreaRef.current.selectionStart;
      const endPos = textAreaRef.current.selectionEnd;

      // Update the textarea with the new text
      setSendMessageText((text) => {
        const currentText = text;
        return (
          currentText.substring(0, startPos) +
          textToInsert +
          currentText.substring(endPos)
        );
      });

      textAreaRef.current.selectionStart = startPos + textToInsert.length;
      textAreaRef.current.selectionEnd = startPos + textToInsert.length;
    } else {
      setSendMessageText((prevText) => prevText + textToInsert);
    }
  };

  const setChatPhone = (phoneChat) => {
    dispatch({
      type: inboxMessageConstants.PHONE_SELECTED,
      payload: phoneChat,
    });
  };

  useEffect(() => {
    textArea?.current?.focus();
  }, [sendMessageText]);

  useEffect(() => {
    scrollToBottom();
    
  }, [    DetailId     ]);

  //  useEffect(() => {
  //    scrollToBottom();
  //  }, [_id,  selectedPhone , inboxDetail]);

  useEffect(() => {
    if (newMessagePhone == selectedPhone) {
      scrollToBottom();
    }

  }, [_id, newMessagePhone, selectedPhone]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const targetElement = ref.current;
      if (targetElement && targetElement.contains(e.target)) {
        setIsMouseHover(true);
      } else {
        setIsMouseHover(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const sendMessageClicked = (message) => {
    if (selectedPhone == 1) {
      if (selectedUserInbox.isWrongNumber) {
        return;
      }
      if (selectedUserInbox.isAddedToDNC) {
        return;
      }
    }
    if (selectedPhone == 2) {
      if (selectedUserInbox.isWrongNumberPhone2) {
        return;
      }
      if (selectedUserInbox.isAddedToDNCPhone2) {
        return;
      }
    }
    if (selectedPhone == 3) {
      if (selectedUserInbox.isWrongNumberPhone3) {
        return;
      }
      if (selectedUserInbox.isAddedToDNCPhone3) {
        return;
      }
    }
    if (!sendMessageText.length) {
      toast.error("Message field is empty");
      return;
    }
    const batchId = selectedUserInbox.batch?._id || selectedUserInbox.batch;
    let phone = selectedUserInbox.to;
    let type = "";
    if (selectedPhone == 2) {
      phone = selectedUserInbox.phone2;
      type = "phone2";
    } else if (selectedPhone == 3) {
      phone = selectedUserInbox.phone3;
      type = "phone3";
    }
    dispatch(
      sendInboxMessage(
        type,
        {
          phone,
          batchId,
          userName: selectedUserInbox.userName,
          message,
          senderPhoneNumber: selectedUserInbox.from,
        },
        // () => {
        //   setSendMessageText("");
        //   if (selectedUserInbox) {
        //     if (selectedUserInbox?.to) {
        //       dispatch(
        //         getUserInboxMessages({
        //           from: replace(selectedUserInbox.from, "+", ""),
        //           to: replace(selectedUserInbox.to, "+", ""),
        //           limit: 50,
        //         })
        //       );
        //     } else if (selectedUserInbox?.phone2) {
        //       dispatch(
        //         getUserInboxMessages({
        //           from: replace(selectedUserInbox.from, "+", ""),
        //           phone2: replace(selectedUserInbox.phone2, "+", ""),
        //           limit: 50,
        //         })
        //       );
        //     } else if (selectedUserInbox?.phone3) {
        //       dispatch(
        //         getUserInboxMessages({
        //           from: replace(selectedUserInbox.from, "+", ""),
        //           phone3: replace(selectedUserInbox.phone3, "+", ""),
        //           limit: 50,
        //         })
        //       );
        //     }
        //   }
        // }

        () => {


          dispatch({
            type: inboxMessageConstants.NEW_MESSAGE_SEND,
            payload: {
              content: message,
              phone: phone,
              isIncoming: false,
              type: type,
            },
          });
          setSendMessageText("")
        }
      )
    );
  };

  const getSendButtonTitle = () => {
    const messages = {
      noReplyFromProspect: {
        title: "Sending is disabled until the prospect has responded.",
        placeholder:
          "Direct messaging is disabled until incoming message is received",
        send: false,
      },
      dnc: {
        title:
          "This number is in your Do Not Call List and texting is disabled",
        placeholder: "Send Message",
        send: false,
      },
      wrongNumber: {
        title: "",
        placeholder: "Send Message",
        send: false,
      },
      default: {
        title: "",
        placeholder: "Send Message",
        send: true,
      },
    };
    const { phone1, phone2, phone3 } = selectedUserInbox.responsePhone || {};
    if (selectedPhone == 1) {
      if (selectedUserInbox.to != phone1) {
        return messages.noReplyFromProspect;
      }
      if (selectedUserInbox.isAddedToDNC) {
        return messages.dnc;
      }

      if (selectedUserInbox.isWrongNumber) {
        return messages.wrongNumber;
      }
    }
    if (selectedPhone == 2) {
      if (selectedUserInbox.phone2 != phone2) {
        return messages.noReplyFromProspect;
      }
      if (selectedUserInbox.isAddedToDNCPhone2) {
        return messages.dnc;
      }
      if (selectedUserInbox.isWrongNumberPhone2) {
        return messages.wrongNumber;
      }
    }
    if (selectedPhone == 3) {
      if (selectedUserInbox.phone3 != phone3) {
        return messages.noReplyFromProspect;
      }
      if (selectedUserInbox.isAddedToDNCPhone3) {
        return messages.dnc;
      }

      if (selectedUserInbox.isWrongNumberPhone3) {
        return messages.wrongNumber;
      }
    }
    return messages.default;
  };

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

  const onKeyPressSendMessageText = (e) => {
    if (e.keyCode == 13) {
      sendMessageClicked(sendMessageText);
    }
  };

  const handleProspectDetail = () => {
    setActiveProspect(!activeProspect);
  };

  useEffect(() => {
    if (sendMessageCategry !== "") {
      localStorage.setItem("sendMessageCategry", sendMessageCategry);
    }
  }, [sendMessageCategry]);
  useEffect(() => {
    dispatch(getAllReplyTemplateCategories({ limit: 100 }));
  }, []);

  useEffect(() => {
    // const statusFind = find(statuses, { _id: selectedUserInbox.status });
    const statusFind = statuses.find(
      (status) => status._id === selectedUserInbox.status
    );

    let statusTemp = null;
    if (selectedUserInbox.status && statusFind) {
      statusTemp = statusIcons[statusFind.name];
    }
    setSelectedStatus(statusTemp);
  }, [selectedUserInbox.status]);
  const pushToCRMClicked = () => {
    dispatch(pushDataToCRM({ ...inboxDetail, inbox: userInboxItem?._id }));
  };
  const formatDate = (date) => dayjs(date).format("MMMM D, YYYY");




  return (
    <>
      <ChatBoxStyled
        style={{
          userSelect:
            user.subscriptionId == "6744617ea4d142ed16ea9c9e" && "none",
        }}
      >
        <div className="top">
          <div className="top">
            <div>
              <div style={{ position: "relative", height: "42px" }}>
                <div style={{ position: "absolute", top: 0, left: 0 }}>
                  <StatusUpdateMenu
                    selectedUserInbox={selectedUserInbox}
                    showLeadTags={false}
                    chatboxProps={true}
                    chatbox={true}
                  />
                </div>
              </div>

              <div
                className="optionLayout"
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <Components.Common.LightTooltip
                  arrow
                  placement="top"
                  title={"add Tag"}
                >
                  <div
                    onClick={(e) => {
                      setTagMenuAnchor(e.currentTarget);
                      e.stopPropagation();
                    }}
                    style={{
                      display: "flex",
                      height: "32px",
                      alignItems: "center",
                      color: userInboxItem?.tags.length > 0 ? "white" : "#012635",
                      border: "solid 1px #E0E0E0",
                      padding: "0px 8px",
                      borderRadius: "8px",
                      gap: "4px",
                      minWidth: "95px",
                      backgroundColor: userInboxItem?.tags.length > 0 && "#00BD82",

                    }}
                  >
                    <div style={{ fontSize: "12px", fontWeight: 500, }}>
                      Add a tag
                    </div>
                    <IoIosArrowDown />
                  </div>
                </Components.Common.LightTooltip>
                <Components.Common.LightTooltip
                  arrow
                  placement="top"
                  title={"Set Reminder"}
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenRemainder(selectedUserInbox);
                    }}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "6px",
                      backgroundColor: !!selectedUserInbox?.reminder?._id
                        ? "#3086EE"
                        : "#F0F0F0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* <img
                      src={Assets.Images.bell}
                      style={{ width: "20px", height: "20px" }}
                    /> */}
                    <PiBellBold
                      size={20}
                      color={!!selectedUserInbox?.reminder?._id && "white"}
                    />
                  </div>
                </Components.Common.LightTooltip>
                <Components.Common.LightTooltip
                  arrow
                  placement="top"
                  title={"Add Note"}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "6px",
                      backgroundColor: "#F0F0F0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      onClick={() => setOpenNotePopup(true)}
                      src={Assets.Images.notes}
                      style={{ width: "20px", height: "20px" }}
                    />
                  </div>
                </Components.Common.LightTooltip>
                <Components.Common.LightTooltip
                  arrow
                  placement="top"
                  title={"Activity"}
                >
                  <div
                    onClick={() => props.setShowSideBar(!props.showSideBar)}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "6px",
                      backgroundColor: "#F0F0F0",

                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="detail"
                  >
                    <FaExclamation size={20} />
                  </div>
                </Components.Common.LightTooltip>
                <div
                  className="close"
                  onClick={() => props.setSelectId()}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "6px",
                    backgroundColor: "#F0F0F0",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IoMdClose size={20} />
                </div>
              </div>
            </div>
            <div className="right">
              <div
                className="detailBox"
                style={{
                  backgroundColor: "#012635",
                  height: "106px",
                  borderRadius: "8px",
                  padding: "12px",
                  width: "214px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      color: "white",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    Property Address
                  </div>{" "}
                  <div style={{ display: "flex", gap: "4px" }}>
                    {" "}
                    <div
                      style={{
                        backgroundColor: "#073F56",
                        width: "24px",
                        height: "24px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "8px",
                      }}
                    >
                      <a
                        href={`https://www.zillow.com/homes/${mapAddress}_rb`}
                        target="_blank"
                        rel="noreferrer"
                      >
                      <Components.Common.LightTooltip
                      arrow
                      placement="top"
                      title={"Zillow"}
                    >
                        <img
                          src={Assets.Images.zillowIcon}
                          style={{ width: "20px", height: "20px" }}
                        />
                        </Components.Common.LightTooltip>
                      </a>
                    </div>{" "}
                    <div
                      style={{
                        backgroundColor: "#073F56",
                        width: "24px",
                        height: "24px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "8px",
                      }}
                    >
                      <a
                        target="_blank"
                        href={`https://maps.google.com/?q=${mapAddress}`}
                        rel="noreferrer"
                      >
                      <Components.Common.LightTooltip
                      arrow
                      placement="top"
                      title={"Map"}
                    >
                        <img src={Assets.Images.mapIcon} />
                        </Components.Common.LightTooltip>
                      </a>

                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontWeight: 400,
                    fontSize: "12px",
                    color: "#FFFFFF99",
                    paddingTop: "8px",
                    lineHeight: "20px"
                  }}
                >
                  {props?.inboxDetail?.propertyAddress} <br />
                  {props?.inboxDetail?.propertyCity}{" "}
                  {props?.inboxDetail?.propertyState}{" "}
                  {props?.inboxDetail?.propertyZip}
                </div>
              </div>
              <div
                className="detailBox"
                style={{
                  backgroundColor: "#012635",
                  height: "106px",
                  borderRadius: "8px",
                  padding: "12px",
                  width: "214px"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      color: "white",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    Land Details:
                  </div>
                  <div style={{ display: "flex", gap: "4px" }}>
                    <MdOutlineRemoveRedEye
                      onClick={() => setIsLandDetailsOpen(!isLandDetailsOpen)}
                      style={{ color: "white", cursor: "pointer" }}
                      size={20}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: "4px",
                    paddingTop: "8px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#073F56",
                      borderRadius: "12px",
                      height: "24px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    {isLandDetailsOpen
                      ? inboxDetail?.apn
                        ? inboxDetail?.apn
                        : "--"
                      : "APN"}
                  </div>
                  <div
                    style={{
                      backgroundColor: "#073F56",
                      borderRadius: "12px",
                      height: "24px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    {isLandDetailsOpen
                      ? inboxDetail?.propertyCounty
                        ? inboxDetail?.propertyCounty
                        : "--"
                      : "Country"}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      backgroundColor: "#073F56",
                      borderRadius: "12px",
                      height: "24px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      marginTop: "4px",
                      color: "white",
                    }}
                  >
                    {isLandDetailsOpen
                      ? inboxDetail?.acreage
                        ? inboxDetail?.acreage
                        : "--"
                      : "Acreage"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pushToCrm">
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
          <div className="bottom">
            <When condition={selectedUserInbox.to}>
              <Components.Common.LightTooltip
                arrow
                placement="top"
                title={getPhoneTitle(1)}
              >
                <button
                  className={classNames({
                    selected: selectedPhone == 1,
                    verified: selectedUserInbox.isVerifiedNumber,
                    block: selectedUserInbox.isWrongNumber,
                    cut:
                      selectedUserInbox.isAddedToDNC ||
                      (!selectedUserInbox.isVerifiedNumber &&
                        (selectedUserInbox.isVerifiedNumberPhone2 ||
                          selectedUserInbox.isVerifiedNumberPhone3)),
                  })}
                  onClick={() => {
                    setChatPhone(1)
                    scrollToBottom(1)
                  }}
                >
                  <span className="icon">
                    <When condition={selectedUserInbox.isVerifiedNumber}>
                      <FaCheckCircle />
                    </When>
                    <When condition={selectedUserInbox.isWrongNumber}>
                      <FaTimesCircle />
                    </When>
                    <When condition={selectedUserInbox.isAddedToDNC}>
                      <FaTimes className="red" />
                    </When>
                  </span>
                  <span className="text">{selectedUserInbox.to}</span>
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
                  className={classNames({
                    selected: selectedPhone == 2,
                    verified: selectedUserInbox.isVerifiedNumberPhone2,
                    block: selectedUserInbox.isWrongNumberPhone2,
                    cut:
                      selectedUserInbox.isAddedToDNCPhone2 ||
                      (!selectedUserInbox.isVerifiedNumberPhone2 &&
                        (selectedUserInbox.isVerifiedNumber ||
                          selectedUserInbox.isVerifiedNumberPhone3)),
                  })}
                  onClick={() => {
                    if (selectedUserInbox?.messagesPhone2?.length != 0) {
                      setChatPhone(2);
                      scrollToBottom(2)
                    }
                  }}
                >
                  <span className="icon">
                    <When condition={selectedUserInbox.isVerifiedNumberPhone2}>
                      <FaCheckCircle />
                    </When>
                    <When condition={selectedUserInbox.isWrongNumberPhone2}>
                      <FaTimesCircle />
                    </When>
                    <When condition={selectedUserInbox.isAddedToDNCPhone2}>
                      <FaTimes className="red" />
                    </When>
                  </span>
                  <span className="text">{selectedUserInbox.phone2}</span>
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
                  className={classNames({
                    selected: selectedPhone == 3,
                    verified: selectedUserInbox.isVerifiedNumberPhone3,
                    block: selectedUserInbox.isWrongNumberPhone3,
                    cut:
                      selectedUserInbox.isAddedToDNCPhone3 ||
                      (!selectedUserInbox.isVerifiedNumberPhone3 &&
                        (selectedUserInbox.isVerifiedNumber ||
                          selectedUserInbox.isVerifiedNumberPhone2)),
                  })}
                  onClick={() => {
                    if (selectedUserInbox?.messagesPhone3?.length != 0) {
                      setChatPhone(3);
                      scrollToBottom(3)
                    }
                  }}
                >
                  <span className="icon">
                    <When condition={selectedUserInbox.isVerifiedNumberPhone3}>
                      <FaCheckCircle />
                    </When>
                    <When condition={selectedUserInbox.isWrongNumberPhone3}>
                      <FaTimesCircle />
                    </When>
                    <When condition={selectedUserInbox.isAddedToDNCPhone3}>
                      <FaTimes className="red" />
                    </When>
                  </span>
                  <span className="text">{selectedUserInbox.phone3}</span>
                </button>
              </Components.Common.LightTooltip>
            </When>
            <div
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "end",
                padding: "8px 0px",
              }}
            >
              <div className="pushToCrmDesktop">
                <button
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
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="middle" ref={messagesBoxRef}>
          <If condition={loading && !props?.update}>
            <Then>
              <Box style={{ display: "grid" }}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={30}
                  style={{ justifySelf: "flex-end" }}
                />

                <br></br>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={30}
                  style={{ justifySelf: "flex-end" }}
                />
                <br></br>
                <Skeleton variant="rectangular" width="100%" height={30} />
                <br></br>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={30}
                  style={{ justifySelf: "flex-end" }}
                />
                <br></br>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={30}
                  style={{ justifySelf: "flex-end" }}
                />
                <br></br>
                <Skeleton variant="rectangular" width="100%" height={30} />
                <br></br>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={30}
                  style={{ justifySelf: "flex-end" }}
                />
                <br></br>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={30}
                  style={{ justifySelf: "flex-end" }}
                />
                <br></br>
                <Skeleton variant="rectangular" width="100%" height={30} />
                <br></br>
                <Skeleton variant="rectangular" height={100} width="100%" />
              </Box>
            </Then>
            <Else>
              <When condition={selectedPhone == 1}>
                {selectedUserInbox?.messages?.map((messageItem) => {
                  const messageDate = formatDate(messageItem.creationDate);
                  const showDivider = messageDate !== phone1LastDate;
                  phone1LastDate = messageDate;

                  return (
                    <>
                      {showDivider && (
                        <div
                          style={{
                            textAlign: "center",
                            margin: "10px 0",
                            color: "#777777",
                            fontSize: "12px",
                            fontWeight: 400,
                            gap: "14px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <hr style={{ flex: 1 }} /> {messageDate}{" "}
                          <hr style={{ flex: 1 }} />
                        </div>
                      )}
                      <div
                        key={messageItem._id}
                        className={`item ${messageItem.isIncoming ? "other" : "me"
                          }`}
                      >
                        <p
                          style={{
                            maxWidth: "290px",
                            overflow: "hidden",
                            wordWrap: "anywhere",
                            fontSize: "16px",
                            fontWeight: 400,
                            // textAlign: "right",
                          }}
                        >
                          {messageItem.content}
                        </p>
                        {/* <span>{moment(messageItem.creationDate).format('MM/DD/YY hh:mm A')}</span> */}
                        <span>
                          {moment(messageItem.creationDate)
                            .tz(user?.timeZone || "UTC")
                            .calendar({
                              sameDay: "[Today at] hh:mm a",
                              lastDay: "[Yesterday at] hh:mm a",
                              lastWeek: "MM/DD/YY hh:mm a",
                              sameElse: "MM/DD/YY hh:mm a",
                            })}
                        </span>
                      </div>
                    </>
                  );
                })}
              </When>
              <When condition={selectedPhone == 2}>
                {selectedUserInbox?.messagesPhone2?.map((messageItem) => {
                  const messageDate = formatDate(messageItem.creationDate);
                  const showDivider = messageDate !== phone2LastDate;
                  phone2LastDate = messageDate;
                  return (
                    <>
                      {showDivider && (
                        <div
                          style={{
                            textAlign: "center",
                            margin: "10px 0",
                            color: "#777777",
                            fontSize: "12px",
                            fontWeight: 400,
                            gap: "14px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <hr style={{ flex: 1 }} /> {messageDate}{" "}
                          <hr style={{ flex: 1 }} />
                        </div>
                      )}
                      <div
                        key={messageItem._id}
                        className={`item ${messageItem.isIncoming ? "other" : "me"
                          }`}
                      >
                        <p
                          style={{
                            maxWidth: "290px",
                            overflow: "hidden",
                            wordWrap: "anywhere",
                            fontSize: "16px",
                            fontWeight: 400,
                            // textAlign: "right",
                          }}
                        >
                          {messageItem.content}
                        </p>
                        {/* <span>{moment(messageItem.creationDate).format('MM/DD/YY hh:mm A')}</span> */}
                        <span>
                          {moment(messageItem.creationDate)
                            .tz(user?.timeZone || "UTC")
                            .calendar({
                              sameDay: "[Today at] hh:mm a",
                              lastDay: "[Yesterday at] hh:mm a",
                              lastWeek: "MM/DD/YY hh:mm a",
                              sameElse: "MM/DD/YY hh:mm a",
                            })}
                        </span>
                      </div>
                    </>
                  );
                })}
              </When>
              <When condition={selectedPhone == 3}>
                {selectedUserInbox?.messagesPhone3?.map((messageItem) => {
                  const messageDate = formatDate(messageItem.creationDate);
                  const showDivider = messageDate !== phone3LastDate;
                  phone3LastDate = messageDate;
                  return (
                    <>
                      {showDivider && (
                        <div
                          style={{
                            textAlign: "center",
                            margin: "10px 0",
                            color: "#777777",
                            fontSize: "12px",
                            fontWeight: 400,
                            gap: "14px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <hr style={{ flex: 1 }} /> {messageDate}{" "}
                          <hr style={{ flex: 1 }} />
                        </div>
                      )}
                      <div
                        key={messageItem._id}
                        className={`item ${messageItem.isIncoming ? "other" : "me"
                          }`}
                      >
                        <p
                          style={{
                            maxWidth: "290px",
                            overflow: "hidden",
                            wordWrap: "anywhere",
                            fontSize: "16px",
                            fontWeight: 400,
                            // textAlign: "right",
                          }}
                        >
                          {messageItem.content}
                        </p>

                        <span>
                          {moment(messageItem.creationDate)
                            .tz(user?.timeZone || "UTC")
                            .calendar({
                              sameDay: "[Today at] hh:mm a",
                              lastDay: "[Yesterday at] hh:mm a",
                              lastWeek: "MM/DD/YY hh:mm a",
                              sameElse: "MM/DD/YY hh:mm a",
                            })}
                        </span>
                      </div>
                    </>
                  );
                })}
              </When>
            </Else>
          </If>
        </div>

        <If condition={!loading || props?.update}>
          <Then>
            <div className="bottom">
              <When
                condition={
                  selectedUserInbox?.isNewMessage &&
                  selectedPhone == newMessagePhone
                }
              >
                <div className="new-message">
                  <button onClick={scrollToBottom}>
                    <span className="icon">
                      <FaArrowDown />
                    </span>
                    <span className="text">New Messages</span>
                  </button>
                </div>
              </When>
              <div className="top">
                <div className="left">
                  <Components.Common.LightTooltip
                    arrow
                    placement="top"
                    title="Outbound phone number"
                  >
                    <button>
                      <span className="icon">
                        {/* <FaPhoneSquare /> */}
                        <LiaPhoneSolid
                          style={{ fontSize: "20px", color: "#012635" }}
                        />
                      </span>
                      <span className="text">{selectedUserInbox.from}</span>
                    </button>
                  </Components.Common.LightTooltip>
                </div>
                <div className="right">
                  <VerifiedButton />
                  <WrongNumberButton />
                  <AddToDNCButton />
                </div>
              </div>
              {/* <div className="middle">
                <textarea
                  ref={textArea}
                  maxLength={800}
                  placeholder={getSendButtonTitle().placeholder}
                  value={sendMessageText}
                  onChange={(e) => setSendMessageText(e.target.value)}
                  onKeyDown={onKeyPressSendMessageText}
                  readOnly={!getSendButtonTitle().send || sendMessageLoading}
                />
                <span className="info">{sendMessageText?.length} / 800</span>
              </div> */}
              <div style={{ minHeight: "56px", height: "auto", alignItems: "end" }} className="bottom">
                <div style={{ paddingBottom: "9px" }} className="left">
                  <When condition={getSendButtonTitle().send}>
                    <Components.Common.EmojiPicker
                      onClick={handlePlaceholderInsertion}
                    />
                  </When>
                </div>
                <div style={{ flexGrow: 1, paddingBottom: "9px" }}>
                 

                  <ChatInput
                    onUpdateMessage={(e) => setSendMessageText(e)}
                    selectedUserId={selectedUserInbox?._id}
                    sendMessageLoading={sendMessageLoading}
                    getSendButtonTitle={getSendButtonTitle}
                    textAreaRef={textAreaRef}
                    inputValueRef={inputValueRef}
                    sendMessageText={sendMessageText}
                    // handleKeyDown={()=> sendMessageClicked(sendMessageText)}
                    handleKeyDown={(e)=> sendMessageClicked(e)
                    }
                  />
                </div>
                <div style={{ paddingBottom: "9px" }} className="right">
                  <When condition={getSendButtonTitle().send}>
                    <Components.Common.LightTooltip
                      arrow
                      placement="top"
                      title="Insert a canned response"
                    >
                      <button
                        onClick={() => setIsQuickRepliesModalOpen(true)}
                        disabled={sendMessageLoading || detailLoading}
                      >
                        <span className="text">Quick Replies</span>
                      </button>
                    </Components.Common.LightTooltip>
                  </When>

                  <Components.Common.LightTooltip
                    arrow
                    placement="top"
                    title={getSendButtonTitle().title}
                  >
                    <button
                      onClick={() => sendMessageClicked(sendMessageText)}
                      disabled={
                        !getSendButtonTitle().send || sendMessageLoading
                      }
                    >
                      <span className="icon">{/* <FaArrowUp /> */}</span>
                      <span className="text">
                        {sendMessageLoading ? "Sending" : "Send"}
                      </span>
                    </button>
                  </Components.Common.LightTooltip>
                </div>
              </div>
            </div>
          </Then>
        </If>

        <Components.Common.ModalTop
          open={isQuickRepliesModalOpen}
          onClose={() => { }}
        >
          <QuickRepliesModal
            onClose={() => setIsQuickRepliesModalOpen(false)}
            setSendMessageText={setSendMessageText}
            setSendMessageCategory={setSendMessageCategory}
          />
        </Components.Common.ModalTop>
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
        <Menu
          open={Boolean(tagMenuAnchor)}
          onClose={() => setTagMenuAnchor(null)}
          anchorEl={tagMenuAnchor}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
        >
          <TagAdd
            setTagMenuAnchor={() => setTagMenuAnchor(null)}
            userInboxItem={selectedUserInbox}
          />
        </Menu>
        <NotePopup
          open={openNotePopup}
          onClose={() => setOpenNotePopup(false)}
        />
      </ChatBoxStyled>
    </>
  );
};

export default ChatBox;
