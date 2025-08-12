import React, { useEffect } from 'react'
import { If, Then, Else, When } from "react-if";
import { Box, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment-timezone";
import { shallowEqual } from "react-redux";
import { useRef } from "react";
import dayjs from "dayjs";
import styles from "./InboxS.module.css";
import Assets from '@/assets';
import { useDispatch } from 'react-redux';
import { markAsRead } from '@/store/actions';
const ChatBoxMessages = (props) => {
  const messagesBoxRef = useRef(null);
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
  const { _id } = selectedUserInbox;
  const formatDate = (date) => dayjs(date).format("MMMM D, YYYY");
  let phone1LastDate = null;
  let phone2LastDate = null;
  let phone3LastDate = null;
  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );
  const DetailId = useSelector((s) => s.inboxUserMessageReducer.DetailId, shallowEqual);

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
  

      useEffect(() => {
        scrollToBottom();
    
      }, [DetailId]);

  return (
    <div 
    //  className="middle"
     className={styles.chatBoxMiddle}
     ref={messagesBoxRef}>
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
                        // margin: "10px 0",
                        // color: "#777777",
                        // fontSize: "12px",
                        // fontWeight: 400,
                        gap: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      className='body5Regular textSecondaryColor'
                    >
                      <hr style={{ flex: 1 , margin:"0px"}} /> {messageDate}{" "}
                      <hr style={{ flex: 1 , margin:"0px"}} />
                    </div>
                  )}
                  <div
                    key={messageItem._id}
                    // className={`item ${messageItem.isIncoming ? "other" : "me"
                    //   }`}

                      className={styles.chatBoxMiddleItem + " " + (messageItem.isIncoming ? styles.chatBoxMiddleOther : styles.chatBoxMiddleMe)}
                  >
                    <div>
                    <p
                      style={{
                        maxWidth: "368px",
                        overflow: "hidden",
                        wordWrap: "anywhere",
                        // fontSize: "16px",
                        // fontWeight: 400,
                        // textAlign: "right",
                      }}
                      className='body5Regular'
                    >
                      {messageItem.content}
                    </p> <span>{messageItem.isOutgoing  && messageItem?.isDripOutgoingMessage ? <img src={Assets.Images.dripUnselected} width={18} height={18}/>:""}</span>
                    </div>
         
                    {/* <span>{moment(messageItem.creationDate).format('MM/DD/YY hh:mm A')}</span> */}
                    <span style={{width:messageItem.isIncoming && "100%"}}>
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
                        // color: "#777777",
                        // fontSize: "12px",
                        // fontWeight: 400,
                        gap: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      className='body5Regular textSecondaryColor'
                    >
                      <hr style={{ flex: 1 , margin:"0px"}} /> {messageDate}{" "}
                      <hr style={{ flex: 1 , margin:"0px"}} />
                    </div>
                  )}
                  <div
                    key={messageItem._id}
                    // className={`item ${messageItem.isIncoming ? "other" : "me"
                    //   }`}

                    className={styles.chatBoxMiddleItem + " " + (messageItem.isIncoming ? styles.chatBoxMiddleOther : styles.chatBoxMiddleMe)}
                  >
                    {/* <p
                      style={{
                        maxWidth: "368px",
                        overflow: "hidden",
                        wordWrap: "anywhere",
                        // fontSize: "16px",
                        // fontWeight: 400,
                        // textAlign: "right",
                      }}
                      className='body5Regular textPrimaryColor'
                    >
                      {messageItem.content}
                    </p> */}




                    <div>
                    <p
                      style={{
                        maxWidth: "368px",
                        overflow: "hidden",
                        wordWrap: "anywhere",
                        // fontSize: "16px",
                        // fontWeight: 400,
                        // textAlign: "right",
                      }}
                      className='body5Regular'
                    >
                      {messageItem.content}
                    </p> <span>{messageItem.isOutgoing  && messageItem?.isDripOutgoingMessage ? <img src={Assets.Images.dripUnselected} width={18} height={18}/>:""}</span>
                    </div>



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
                        // color: "#777777",
                        // fontSize: "12px",
                        // fontWeight: 400,
                        gap: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      className='body5Regular textSecondaryColor'
                    >
                      <hr style={{ flex: 1 , margin:"0px"}} /> {messageDate}{" "}
                      <hr style={{ flex: 1 , margin:"0px"}} />
                    </div>
                  )}
                  <div
                    key={messageItem._id}
                    // className={styles.chatBoxMiddleItem + " " + messageItem.isIncoming ? styles.chatBoxMiddleOther : styles.chatBoxMiddleMe
                    //   }

                    className={styles.chatBoxMiddleItem + " " + (messageItem.isIncoming ? styles.chatBoxMiddleOther : styles.chatBoxMiddleMe)}
                  >
                    {/* <p
                      style={{
                        maxWidth: "368px",
                        overflow: "hidden",
                        wordWrap: "anywhere",
                        // fontSize: "16px",
                        // fontWeight: 400,
                        // textAlign: "right",
                      }}
                      className='body5Regular textPrimaryColor'
                    >
                      {messageItem.content}
                    </p> */}
  <div>
                    <p
                      style={{
                        maxWidth: "368px",
                        overflow: "hidden",
                        wordWrap: "anywhere",
                        // fontSize: "16px",
                        // fontWeight: 400,
                        // textAlign: "right",
                      }}
                      className='body5Regular'
                    >
                      {messageItem.content}
                    </p> <span>{messageItem.isOutgoing  && messageItem?.isDripOutgoingMessage ? <img src={Assets.Images.dripUnselected} width={18} height={18}/>:""}</span>
                    </div>
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
  )
}

export default ChatBoxMessages