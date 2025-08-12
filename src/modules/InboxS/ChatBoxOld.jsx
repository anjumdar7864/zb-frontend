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
} from "react-icons/fa";
import { RiInboxArchiveFill } from "react-icons/ri";
import { Menu, Box, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { BsEyeFill } from "react-icons/bs";
import { replace } from "lodash-es";
import { If, Then, Else, When } from "react-if";
import classNames from "classnames";
import toast from "react-hot-toast";
import Components from "@/components";

import {
  getUserInboxMessages,
  sendInboxMessage,
  markAsRead,
  getAllReplyTemplateCategories,
} from "@/store/actions";
import { inboxMessageConstants } from "@/store/constants";
import { ChatBoxStyled } from "./styles";
import { AddToDNCButton, VerifiedButton, WrongNumberButton } from "./Buttons";
import { QuickRepliesModal } from "./Modals";
import TagAdd from "./TagAdd";
import SetRemainderModal from "./SetRemainderModal";
import StatusUpdateMenu from "./StatusUpdateMenu";
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
  const messagesBoxRef = useRef(null);
  const dispatch = useDispatch();
  const {
    data: selectedUserInbox,
    loading,
    selectedPhone,
    newMessagePhone,
    detailLoading,
  } = useSelector((s) => s.inboxUserMessageReducer);
  const { _id } = selectedUserInbox;
  // const { setIsLoaderShowing } = useGlobalContext();

  // if((selectedPhone == 3 && !selectedUserInbox?.phone3) || (selectedPhone == 2 && !selectedUserInbox?.phone2)) {
  //   dispatch({ type: inboxMessageConstants.PHONE_SELECTED, payload: 1 });
  // }

  // useEffect(() => {
  //   setIsLoaderShowing(loading);
  // }, [loading, setIsLoaderShowing]);

  let reminderTitle = "Set Reminder";
  if (selectedUserInbox.isReminderSet && selectedUserInbox?.reminder?.date) {
    reminderTitle = moment(selectedUserInbox?.reminder?.date).format(
      "MM/DD/YY"
    );
  }

  useEffect(() => {
    setSendMessageText("");
  }, [selectedUserInbox?._id]);

  const { loading: sendMessageLoading } = useSelector(
    (s) => s.sendInboxMessage
  );

  const scrollToBottom = () => {
    if (messagesBoxRef.current) {
      const div = messagesBoxRef.current;
      div.scrollTop = div.scrollHeight;
      _id && dispatch(markAsRead(_id, () => {}));
    }
  };

  const handlePlaceholderInsertion = (textToInsert) => {
    if (textArea.current) {
      const startPos = textArea.current.selectionStart;
      const endPos = textArea.current.selectionEnd;

      // Update the textarea with the new text
      setSendMessageText((text) => {
        const currentText = text;
        return (
          currentText.substring(0, startPos) +
          textToInsert +
          currentText.substring(endPos)
        );
      });

      textArea.current.selectionStart = startPos + textToInsert.length;
      textArea.current.selectionEnd = startPos + textToInsert.length;
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
  }, [_id, sendMessageText]);

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
        () => {
          setSendMessageText("");
          if (selectedUserInbox) {
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
  return (
    <>
      <ChatBoxStyled>
        <div className="top">
          <div className="top">
            <StatusUpdateMenu
              selectedUserInbox={selectedUserInbox}
              showLeadTags={false}
            />
            <div className="right">
              <Components.Common.LightTooltip
                arrow
                placement="top"
                title="Add Tag"
              >
                <button
                  onClick={(e) => {
                    setTagMenuAnchor(e.currentTarget);
                    e.stopPropagation();
                  }}
                >
                  <FaTag />
                </button>
              </Components.Common.LightTooltip>
              <Components.Common.LightTooltip
                arrow
                placement="left"
                title={reminderTitle}
              >
                <button
                  className={classNames({
                    added: !!selectedUserInbox.reminder,
                  })}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenRemainder(selectedUserInbox);
                  }}
                >
                  <FaBell />
                </button>
              </Components.Common.LightTooltip>

              <button className="btnIcon-for-mobile">
                <RiInboxArchiveFill onClick={props.onClickContact} />
              </button>
              <button className="btnIcon-for-mobile">
                <BsEyeFill onClick={props.onClickProspect} />
              </button>

              {/* <button onClick={(e) => setTagMenuAnchor(e.currentTarget)}>
                <FaTag />
              </button> */}
              {/* <button
                className={classNames({
                    added: selectedUserInbox.isReminderSet,
                })}
                onClick={() => setSelectedRemainderId("asdf")}
              >
                <FaBell />
              </button> */}
            </div>
          </div>

          <div className="bottom">
            {/* <button className="selected block">
              <span className="icon">
                <FaTimesCircle />
              </span>
              <span className="text">{selectedUserInbox.to}</span>
            </button> */}
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
                onClick={() => setChatPhone(1)}
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
                  onClick={() => setChatPhone(2)}
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
                  onClick={() => setChatPhone(3)}
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
          </div>
        </div>
        <div className="middle" ref={messagesBoxRef}>
          <If condition={loading}>
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
                {selectedUserInbox?.messages?.map((messageItem) => (
                  <>
                    <div
                      key={messageItem._id}
                      className={`item ${
                        messageItem.isIncoming ? "other" : "me"
                      }`}
                    >
                      <p>{messageItem.content}</p>
                      {/* <span>{moment(messageItem.creationDate).format('MM/DD/YY hh:mm A')}</span> */}
                      <span>
                        {moment(messageItem.creationDate).calendar({
                          sameDay: "[Today at] hh:mm a",
                          lastDay: "[Yesterday at] hh:mm a",
                          lastWeek: "MM/DD/YY hh:mm a",
                          sameElse: "MM/DD/YY hh:mm a",
                        })}
                      </span>
                    </div>
                  </>
                ))}
              </When>
              <When condition={selectedPhone == 2}>
                {selectedUserInbox?.messagesPhone2?.map((messageItem) => (
                  <>
                    <div
                      key={messageItem._id}
                      className={`item ${
                        messageItem.isIncoming ? "other" : "me"
                      }`}
                    >
                      <p>{messageItem.content}</p>
                      {/* <span>{moment(messageItem.creationDate).format('MM/DD/YY hh:mm A')}</span> */}
                      <span>
                        {moment(messageItem.creationDate).calendar({
                          sameDay: "[Today at] hh:mm a",
                          lastDay: "[Yesterday at] hh:mm a",
                          lastWeek: "MM/DD/YY hh:mm a",
                          sameElse: "MM/DD/YY hh:mm a",
                        })}
                      </span>
                    </div>
                  </>
                ))}
              </When>
              <When condition={selectedPhone == 3}>
                {selectedUserInbox?.messagesPhone3?.map((messageItem) => (
                  <>
                    <div
                      key={messageItem._id}
                      className={`item ${
                        messageItem.isIncoming ? "other" : "me"
                      }`}
                    >
                      <p>{messageItem.content}</p>
                      {/* <span>{moment(messageItem.creationDate).format('MM/DD/YY hh:mm A')}</span> */}
                      <span>
                        {moment(messageItem.creationDate).calendar({
                          sameDay: "[Today at] hh:mm a",
                          lastDay: "[Yesterday at] hh:mm a",
                          lastWeek: "MM/DD/YY hh:mm a",
                          sameElse: "MM/DD/YY hh:mm a",
                        })}
                      </span>
                    </div>
                  </>
                ))}
              </When>
            </Else>
          </If>
        </div>

        <If condition={!loading}>
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
                        <FaPhoneSquare />
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
              <div className="middle">
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
              </div>
              <div className="bottom">
                <div className="left">
                  <When condition={getSendButtonTitle().send}>
                    <Components.Common.EmojiPicker
                      onClick={handlePlaceholderInsertion}
                    />
                  </When>
                </div>
                <div className="right">
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
                      <span className="icon">
                        <FaArrowUp />
                      </span>
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
          onClose={() => {}}
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
          transformOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <TagAdd
            setTagMenuAnchor={() => setTagMenuAnchor(null)}
            userInboxItem={selectedUserInbox}
          />
        </Menu>
      </ChatBoxStyled>
    </>
  );
};

export default ChatBox;
