import React, { useEffect, useRef, useState } from 'react'
import { When } from 'react-if'
import Components from '@/components'
import { LiaPhoneSolid } from 'react-icons/lia'
import { FaArrowDown } from 'react-icons/fa'
import { FaPhoneSquare } from 'react-icons/fa'
import { AddToDNCButton, VerifiedButton, WrongNumberButton } from "./Buttons";
import { useSelector } from 'react-redux'
import ChatInput from "./TextArea";
import { QuickRepliesModal } from './Modals'
import {
  getUserInboxMessages,
  sendInboxMessage,
  markAsRead,
  getAllReplyTemplateCategories,
  pushDataToCRM,
} from "@/store/actions";
import toast from 'react-hot-toast'
import styles from "./InboxS.module.css";
import { useDispatch } from 'react-redux' ; 
import { inboxMessageConstants } from "@/store/constants";
const ChatBoxBottom = () => {
  const [sendMessageText, setSendMessageText] = useState("");
  const [isQuickRepliesModalOpen, setIsQuickRepliesModalOpen] = useState(false);
  const [sendMessageCategry, setSendMessageCategory] = useState("");
  const textAreaRef = useRef();
  const inputValueRef = useRef();
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
 

  useEffect(() => {
    if (sendMessageCategry !== "") {
      localStorage.setItem("sendMessageCategry", sendMessageCategry);
    }
  }, [sendMessageCategry]);
  
 const dispatch = useDispatch();
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


  const sendMessageClicked = (message) => {
    // console.log("Enter key pressed ===", message);
  
    
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

  const { loading: sendMessageLoading } = useSelector(
    (s) => s.sendInboxMessage
  );
  return (
    <div 
      // className="bottom"
      className={styles.chatBoxBottom}
      >
      <When
        condition={
          selectedUserInbox?.isNewMessage &&
          selectedPhone == newMessagePhone
        }
      >
        <div 
        //  className="new-message"
         
         className={styles.newMessage}
         >
          <button 
          
          onClick={scrollToBottom}
          className={styles.newMessageButton}
          >
            <span className="icon">
              <FaArrowDown />
            </span>
            <span className="text">New Messages</span>
          </button>
        </div>
      </When>
      <div 
      //  className="top"
      className={styles.chatBoxBTop}
       
       >
        <div 
        // className="left"
        >
          {/* <Components.Common.LightTooltip
            arrow
            placement="top"
            title="Outbound phone number"
          >
            <button 
            
            className={styles.phoneNumberButton}
            >
              <span
           
              className={styles.icon}

               >
               
                <LiaPhoneSolid
                  style={{ fontSize: "20px", color: "#012635" }}
                />
              </span>
              <span 
             
               className={styles.text}
               >{selectedUserInbox.from}</span>
            </button>
          </Components.Common.LightTooltip> */}
        </div>
        <div 
        // className="right"
        className={styles.chatBTopRight}
        >
          <VerifiedButton />
          <WrongNumberButton />
          <AddToDNCButton />
        </div>
      </div>
<div  >
<div style={{ flexGrow: 1, padding: "9px 16px" , borderBottom:"1px solid #E0E0E0" , height:"48" }}>


<ChatInput
  onUpdateMessage={(e) => setSendMessageText(e)}
  selectedUserId={selectedUserInbox?._id}
  sendMessageLoading={sendMessageLoading}
  getSendButtonTitle={getSendButtonTitle}
  textAreaRef={textAreaRef}
  inputValueRef={inputValueRef}
  sendMessageText={sendMessageText}
  // handleKeyDown={()=> sendMessageClicked(sendMessageText)}
  handleKeyDown={(e) => sendMessageClicked(e)
  }
/>
</div>
<div style={{ minHeight: "48px", height: "auto", alignItems: "end" }}
      //  className="bottom"
       className={styles.chatBBottom}
       
       >
        <div style={{ paddingBottom: "9px" }} 
        //  className="left"
         >
          <When condition={getSendButtonTitle().send}>
            <Components.Common.EmojiPicker
              onClick={handlePlaceholderInsertion}
            />
          </When>
        </div>
   
        <div style={{ paddingBottom: "9px" }}
        //  className="right"
         className={styles.chatBBottomRight}
         >
          <When condition={getSendButtonTitle().send}>
            <Components.Common.LightTooltip
              arrow
              placement="top"
              title="Insert a canned response"
            >
              <button
              className={styles.sendButton}
                onClick={() => setIsQuickRepliesModalOpen(true)}
                disabled={sendMessageLoading || detailLoading}
              >
                <span
                //  className="text"
                //  className={styles.text}
                className='body5Medium textSecondaryColor'
                 >Quick Replies</span>
              </button>
            </Components.Common.LightTooltip>
          </When>

          <Components.Common.LightTooltip
            arrow
            placement="top"
            title={getSendButtonTitle().title}
          >
            <button
            className={styles.sendButton}
              onClick={() => sendMessageClicked(sendMessageText)}
              disabled={
                !getSendButtonTitle().send || sendMessageLoading
              }
            >
              <span
              //  className="icon"
               className={styles.icon}
               >{/* <FaArrowUp /> */}</span>
              <span 
              // className="text"
              // className={styles.text}
              className='body5Medium textWhiteColor'
              >
                {sendMessageLoading ? "Sending" : "Send"}
              </span>
            </button>
          </Components.Common.LightTooltip>
        </div>
      </div>
</div>
 

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
    </div>
  )
}

export default ChatBoxBottom