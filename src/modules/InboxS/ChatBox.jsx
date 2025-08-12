import { useEffect, useRef, useState } from "react";

import { Menu, Box, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";
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

import dayjs from "dayjs";

import { shallowEqual } from 'react-redux';
import ChatBoxTop from "./ChatBoxTop";
import ChatBoxMessages from "./ChatBoxMessages";
import ChatBoxBottom from "./ChatBoxBottom";
const ChatBox = (props) => {
  const [activeProspect, setActiveProspect] = useState(true);
  const [isMouseHover, setIsMouseHover] = useState(false);
  const ref = useRef(null);
  const textArea = useRef(null);
  const [sendMessageText, setSendMessageText] = useState("");
  const [sendMessageCategry, setSendMessageCategory] = useState("");


  const [selectedStatus, setSelectedStatus] = useState(null);

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

  const DetailId = useSelector((s) => s.inboxUserMessageReducer.DetailId, shallowEqual);
  const {

    dripFilterForInbox,
  } = useSelector((s) => s.inboxUserMessageReducer);

  console.log("formattedDate ==", dripFilterForInbox);

  const { results: statuses } = useSelector((s) => s.statusReducer);
  const { _id } = selectedUserInbox;


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
      console.log("check id of unread ===", _id);
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

  }, [DetailId]);



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
        <ChatBoxTop {...props} />

        <ChatBoxMessages {...props} />


        <If condition={!loading || props?.update}>
          <Then>
            <ChatBoxBottom {...props} />

          </Then>
        </If>


      </ChatBoxStyled>
    </>
  );
};

export default ChatBox;
