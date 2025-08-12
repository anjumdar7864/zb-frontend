import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { PiBellBold } from "react-icons/pi";
import { FaExclamation } from "react-icons/fa6";
import StatusUpdateMenu from "./StatusUpdateMenu";
import Components from "@/components";
import { useSelector } from 'react-redux';
import Assets from "@/assets";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import NotePopup from './Tabs/NotePopup';
import { Menu, Box, Skeleton } from "@mui/material";
import TagAdd from "./TagAdd";
import SetRemainderModal from "./SetRemainderModal";
import Styles from "./InboxS.module.css";
const ChatBoxTopProfile = (props) => {
      const [isLandDetailsOpen, setIsLandDetailsOpen] = useState(false);
      const [openNotePopup, setOpenNotePopup] = useState(false);
      const [openRemainder, setOpenRemainder] = useState(null);
      const [tagMenuAnchor, setTagMenuAnchor] = useState(null);
      const [selectedStatus, setSelectedStatus] = useState(null);
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
        const mapAddress = `${props?.inboxDetail?.propertyAddress}-${props?.inboxDetail?.propertyCity}-${props?.inboxDetail?.propertyState}`;
   
        // console.log("inboxDetail === ", selectedUserInbox);
 
        return (
    <div 
    //  className="top"
     className={Styles.chatBoxTopBody}
     >
    <div 
    // className="chatBoxTopDiv"
    className={Styles.chatBoxTopDiv}
    
    >
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
            // className="optionLayout"
            className={Styles.optionLayout}
            style={{
                cursor: "pointer",
                display: "flex",
                // alignItems: "center",
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
                    className={`${userInboxItem?.tags.length > 0 ? "textWhiteColor" : "textPrimeryColor"} ${userInboxItem?.tags.length > 0 && "primeryBackground" }`}
                    style={{
                        display: "flex",
                        height: "28px",
                        alignItems: "center",
                        // color: userInboxItem?.tags.length > 0 ? "white" : "#012635",
                        border: "solid 1px #E0E0E0",
                        padding: "0px 8px",
                        borderRadius: "8px",
                        gap: "4px",
                        minWidth: "95px",
                        // backgroundColor: userInboxItem?.tags.length > 0 && "#00BD82",

                    }}
                >
                    <div className='body5Medium' >
                        Add a tag
                    </div>
                    <IoIosArrowDown />
                </div>
            </Components.Common.LightTooltip>
            {/* <Components.Common.LightTooltip
                arrow
                placement="top"
                title={"Set Reminder"}
            >
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenRemainder(selectedUserInbox);
                    }}
                    className={`${!!selectedUserInbox?.reminder?._id ? "bluePrimery" : "secondaryBackground"}`}
                    style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "6px",
                        // backgroundColor: !!selectedUserInbox?.reminder?._id
                        //     ? "#3086EE"
                        //     : "#F0F0F0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <PiBellBold
                        size={18}
                        // color={!!selectedUserInbox?.reminder?._id && "white"}
                        // className={`${!!selectedUserInbox?.reminder?._id && "textWhiteColor" }`}
                       
                    />
                </div>
            </Components.Common.LightTooltip>
            <Components.Common.LightTooltip
                arrow
                placement="top"
                title={"Add Note"}
            >
                <div
                    className="secondaryBackground"
                    style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "6px",
                        // backgroundColor: "#F0F0F0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <img
                        onClick={() => setOpenNotePopup(true)}
                        src={Assets.Images.notes}
                        style={{ width: "18px", height: "18px" }}
                    />
                </div>
            </Components.Common.LightTooltip> */}
            {/* <Components.Common.LightTooltip
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
                    // className="detail"
                    className={Styles.detail}
                >
                    <FaExclamation size={20} />
                </div>
            </Components.Common.LightTooltip> */}
            <div
                // className="close"
                 className={Styles.close}
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

 {/* address area */}

    <div
    //  className="right"
    className={Styles.proertyRightSideStyled}
     
     >
        {/* <div
            // className="detailBox"
            className={Styles.detailBox}
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
            // className="detailBox"
            className={Styles.detailBox}
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
        </div> */}
    </div>




    
    <NotePopup
          open={openNotePopup}
          onClose={() => setOpenNotePopup(false)}
        />
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
</div>
  )
}

export default ChatBoxTopProfile