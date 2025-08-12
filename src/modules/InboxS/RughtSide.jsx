
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  SelectedInboxItemContext,
  SelectedTabContext,
} from "./SelectedInboxItemContext";
import {
  RightSideStyled,
} from "./styles";
import ChatBox from "./ChatBox";
import ProspectDetails from "./ProspectDetails";
import { getProspectDetails } from "@/store/actions";
import { replace } from "lodash-es";
import { useContext } from "react";
import { getUserInboxMessages } from "@/store/actions";
import styles from "./Inbox.module.css";

const RightSide = ({ setSelectId }) => {
  const { selectedUserInbox } = useContext(SelectedInboxItemContext);
  const [updatedMessage, setUpdatedMessage] = useState(false);
  const { inboxDetail, detailLoading } = useSelector(
    (s) => s.inboxUserMessageReducer
  );

  const {
    results: inboxAllMessages,

  } = useSelector((s) => s.inboxAllMessageReducer);
  const dispatch = useDispatch();
  const [showProspect, setShowProspect] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showSideBar, setShowSideBar] = useState(false);
  const divRef = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (selectedUserInbox) {
      dispatch(
        getProspectDetails(
          selectedUserInbox?.to,
          selectedUserInbox?._id?._id || selectedUserInbox?._id
        )
      )
        .then((response) => {
          console.log("Prospect details API response:", response);
        })
        .catch((error) => {
          console.error("Error fetching prospect details:", error);
        });

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



  }, [selectedUserInbox, dispatch]);




  useEffect(() => {
    setUpdatedMessage(true)
  }, [inboxAllMessages])





  useEffect(() => {
    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setShowSideBar(false); // Close the div or perform an action
    }
  };

  return (
    // <>
    //   <RightSideStyled>
    //     {windowWidth <= 1024 ? (
    //       <div className="mobile-chatBox-show">
    //         <div style={{ position: "relative" }}>
    //           <ChatBox
    //             update={updatedMessage}
    //             setUpdatedMessage={setUpdatedMessage}
    //             inboxDetail={inboxDetail}
    //             showSideBar={showSideBar}
    //             setShowSideBar={setShowSideBar}
    //             setSelectId={setSelectId}

    //           />
    //           <div
    //             ref={divRef}
    //             style={{
    //               position: "absolute",
    //               right: 0,
    //               top: 0,
    //               height: "100%",
    //               backgroundColor: "white",
    //               zIndex: 200,
    //               width: "460px",
    //               border: "solid 1px #E0E0E0",
    //               display: showSideBar ? "block" : "none",
    //             }}
    //           >
    //             <ProspectDetails
    //               inboxDetail={inboxDetail}
    //               detailLoading={detailLoading}
    //               setShowSideBar={setShowSideBar}
    //             />
    //           </div>


    //         </div>
    //       </div>
    //     ) : (
    //       <div className="desktop-rightSide">
    //         <ChatBox
    //           update={updatedMessage}
    //           setUpdatedMessage={setUpdatedMessage}
    //           inboxDetail={inboxDetail}
    //           setShowSideBar={setShowSideBar}
    //           showSideBar={showSideBar}
    //         />

    //         <div
    //           ref={divRef}
    //           style={{
    //             position: "absolute",
    //             right: 0,
    //             height: "100%",
    //             backgroundColor: "white",
    //             zIndex: 200,
    //             width: "460px",
    //             border: "solid 1px #E0E0E0",
    //             display: showSideBar ? "block" : "none",
    //           }}
    //         >
    //           <ProspectDetails
    //             inboxDetail={inboxDetail}
    //             detailLoading={detailLoading}
    //             setShowSideBar={setShowSideBar}
    //             showSideBar={showSideBar}
    //           />
    //         </div>
    //       </div>
    //     )}
    //   </RightSideStyled>
    // </>

    <div className={styles.rightSideStyled}>
      {windowWidth <= 1024 ? (
        <div className={styles.mobileChatBoxShow}>
          <div style={{ position: "relative", width: "100%" , display:"flex" }}>
            <div  style={{ flexGrow: 1 }} >
            <ChatBox
              update={updatedMessage}
              setUpdatedMessage={setUpdatedMessage}
              inboxDetail={inboxDetail}
              showSideBar={showSideBar}
              setShowSideBar={setShowSideBar}
              setSelectId={setSelectId}
            />
            </div>
        
            <div style={{ borderLeft: "solid 1px #E0E0E0" }}>
              <ProspectDetails
                inboxDetail={inboxDetail}
                detailLoading={detailLoading}
                setShowSideBar={setShowSideBar}
                showSideBar={showSideBar}

                update={updatedMessage}
                setUpdatedMessage={setUpdatedMessage}
              />
            </div>

            {/* <div
              ref={divRef}
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                height: "100%",
                backgroundColor: "white",
                zIndex: 200,
                width: "460px",
                border: "solid 1px #E0E0E0",
                display: showSideBar ? "block" : "none",
              }}
            >
              <ProspectDetails
                inboxDetail={inboxDetail}
                detailLoading={detailLoading}
                setShowSideBar={setShowSideBar}
              />
            </div> */}
          </div>
        </div>
      ) : (
        <div className={styles.desktopRightSide}>
          <div style={{ flexGrow: 1 }} >
            <ChatBox
              update={updatedMessage}
              setUpdatedMessage={setUpdatedMessage}
              inboxDetail={inboxDetail}
              setShowSideBar={setShowSideBar}
              showSideBar={showSideBar}
            />
          </div>
          <div style={{ borderLeft: "solid 1px #E0E0E0" }}>
            <ProspectDetails
              inboxDetail={inboxDetail}
              detailLoading={detailLoading}
              setShowSideBar={setShowSideBar}
              showSideBar={showSideBar}

              update={updatedMessage}
              setUpdatedMessage={setUpdatedMessage}
            />
          </div>

          {/* <div
          ref={divRef}
          style={{
            position: "absolute",
            right: 0,
            height: "100%",
            backgroundColor: "white",
            zIndex: 200,
            width: "460px",
            border: "solid 1px #E0E0E0",
            display: showSideBar ? "block" : "none",
          }}
        >
          <ProspectDetails
            inboxDetail={inboxDetail}
            detailLoading={detailLoading}
            setShowSideBar={setShowSideBar}
            showSideBar={showSideBar}
          />
        </div> */}
        </div>
      )}
    </div>
  );
};


export default RightSide;