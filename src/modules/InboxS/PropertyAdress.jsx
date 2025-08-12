import React, { useState } from 'react'
import Styles from "./InboxS.module.css";
import Components from '@/components';
import Assets from '@/assets';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {

    pushDataToCRM,
} from "@/store/actions";
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { PiBellBold } from 'react-icons/pi';
import NotePopup from './Tabs/NotePopup';
import SetRemainderModal from './SetRemainderModal';
const PropertyAdress = (props) => {
          const [isLandDetailsOpen, setIsLandDetailsOpen] = useState(false);
                const [openNotePopup, setOpenNotePopup] = useState(false);
                const [openRemainder, setOpenRemainder] = useState(null);
    const mapAddress = `${props?.inboxDetail?.propertyAddress}-${props?.inboxDetail?.propertyCity}-${props?.inboxDetail?.propertyState}`;
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
    const dispatch = useDispatch();
     const pushToCRMClicked = () => {
            dispatch(pushDataToCRM({ ...inboxDetail, inbox: userInboxItem?._id }));
        };
    return (
        <div
            className={Styles.detailBoxContainer}
        >
      
            <div
                // className="detailBox"
                className={`${Styles.detailBox} darkBackground`}
                style={{
                    // backgroundColor: "#012635",
                    // height: "106px",
                    borderRadius: "8px",
                    padding: "12px",
                    // width: "214px",
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
                            // fontWeight: 600,
                            // fontSize: "14px",
                        }}
                        className='body4Medium textWhiteColor'
                    >
                        Property Address
                    </div>{" "}
                    <div style={{ display: "flex", gap: "4px" }}>
                        {" "}
                        <div
                            style={{
                                backgroundColor: "#073F56",
                                width: "28px",
                                height: "28px",
                                display: "flex",
                                justifyContent: "center",
                                // alignItems: "center",
                                borderRadius: "8px",
                                
                            }}
                        >
                            <a
                                href={`https://www.zillow.com/homes/${mapAddress}_rb`}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    height:"22px"
                                 }}
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
                                width: "28px",
                                height: "28px",
                                display: "flex",
                                justifyContent: "center",
                                // alignItems: "center",
                                borderRadius: "8px",
                            }}
                        >
                            <a
                                target="_blank"
                                href={`https://maps.google.com/?q=${mapAddress}`}
                                rel="noreferrer"
                                style={{
                                   height:"22px"
                                }}
                            >
                                <Components.Common.LightTooltip
                                    arrow
                                    placement="top"
                                    title={"Map"}
                                >
                                    <img style={{ width: "22px", height: "22px" }} src={Assets.Images.mapIcon} />
                                </Components.Common.LightTooltip>
                            </a>

                        </div>
                    </div>
                </div>
                <div
                    style={{
                        // fontWeight: 400,
                        // fontSize: "12px",
                        // color: "#FFFFFF99",
                        
                        lineHeight: "20px"
                    }}
                    className='body5Regular textWhiteColor'
                >
                    {props?.inboxDetail?.propertyAddress} <br />
                    {props?.inboxDetail?.propertyCity}{" "}
                    {props?.inboxDetail?.propertyState}{" "}
                    {props?.inboxDetail?.propertyZip}
                </div>



      <div
            // className="detailBox"
            className={`${Styles.detailBox} darkBackground`}
            style={{
                // backgroundColor: "#012635",
                // height: "106px",
                borderRadius: "8px",
                paddingTop: "8px",
                // width: "214px"
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
                        // fontWeight: 600,
                        // fontSize: "14px",
                    }}
                    className='body4Medium textWhiteColor'
                >
                    Land Details:
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                    {/* <MdOutlineRemoveRedEye
                        onClick={() => setIsLandDetailsOpen(!isLandDetailsOpen)}
                        style={{ color: "white", cursor: "pointer" }}
                        size={20}
                    /> */}
                </div>
            </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
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
                        // marginTop: "4px",
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
            <div style={{width:"100%" , paddingTop:"8px" , display:"flex" , justifyContent:"space-between" , alignItems:"center" , gap:"12px"}}>
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
                    className={`${!!selectedUserInbox?.reminder?._id ? "bluePrimery" : "secondaryBackground"}`}
                    style={{
                        width: "28px",
                        height: "28px",
                        minWidth: "28px",
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
                        minWidth: "28px",
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
            </Components.Common.LightTooltip>
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
                        height: "28px",
                        // backgroundColor: "#00BD82",
                        borderRadius: "8px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // color: "white",
                        // fontWeight: 500,
                        // fontSize: "14px",
                        cursor:
                            pushDataToCRMLoading ||
                                (!userInboxItem?.isVerifiedNumber &&
                                    !userInboxItem?.isVerifiedNumberPhone2 &&
                                    !userInboxItem?.isVerifiedNumberPhone3)
                                ? "no-drop"
                                : "pointer",
                        display: userInboxItem?.pushedToCrmDate ? "none" : "flex",
                    }}

                    className='body4Medium textWhiteColor primeryBackground'
                >
                    Push to CRM
                </button>
            </div>


            <NotePopup
          open={openNotePopup}
          onClose={() => setOpenNotePopup(false)}
        />
     
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

export default PropertyAdress