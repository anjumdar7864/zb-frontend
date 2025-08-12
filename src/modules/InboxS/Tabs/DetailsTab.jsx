import { useState, useEffect } from "react";
import { FaArrowRight, FaFileImport } from "react-icons/fa";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import moment from "moment";
import { When, If, Else, Then } from "react-if";
import { LightTooltip } from "@/components/common";
import {
  pushDataToCRM,
  getConnectedCrm,
  DripFilterForInbox,
} from "@/store/actions";
import { DetailsTabStyled } from "../styles";
import TagsList from "../TagsList";
import { FaTint } from "react-icons/fa";
import { TbInfoCircle } from "react-icons/tb";
import { last } from "lodash-es";

const DetailsTab = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [ userInboxId , setUserInboxId] = useState("");
  const [compaignName , setCompaignName] = useState("");
  const {
    data: selectedUserInbox,
    inboxDetail,
    pushDataToCRMLoading,
    dripFilterForInbox,
  } = useSelector((s) => s.inboxUserMessageReducer  , shallowEqual);

    const {
    data: userInboxItem,
   
  } = useSelector((s) => s.inboxUserMessageReducer  , shallowEqual);
  
  const { campagin } = userInboxItem;
  const { connectedCrm } = useSelector((state) => state.dncReducer);

  useEffect(() => {
   if(campagin?.name){
    setCompaignName(campagin?.name)
   }
    
  }, [campagin]);

  useEffect(() => {
    if(!connectedCrm){
      dispatch(getConnectedCrm());

    }
  }, []);

  useEffect(() => {
    setEmail(userInboxItem.email);
    if(userInboxId !== userInboxItem?._id ) {
      const userInboxIdData = userInboxItem?._id;
      dispatch(DripFilterForInbox(userInboxItem?._id));
      setUserInboxId(userInboxIdData);

// console.log("userInboxItem", userInboxItem?._id ,userInboxIdData ,  userInboxId);

    }
    
  }, [userInboxItem]);

  
  console.log("userInboxItem", userInboxItem?.campagin  );
  

  const onEmailSubmit = () => {};

  const pushToCRMClicked = () => {
    dispatch(pushDataToCRM({ ...inboxDetail, inbox: userInboxItem?._id }));
  };

  const getMobileType = (phoneType) => {
    if (phoneType == 1) {
      if (userInboxItem.isWrongNumber) {
        return "Wrong Number";
      }
      if (userInboxItem.isAddedToDNC) {
        return "DNC";
      }
    }
    if (phoneType == 2) {
      if (userInboxItem.isWrongNumberPhone2) {
        return "Wrong Number";
      }
      if (userInboxItem.isAddedToDNCPhone2) {
        return "DNC";
      }
    }
    if (phoneType == 3) {
      if (userInboxItem.isWrongNumberPhone3) {
        return "Wrong Number";
      }
      if (userInboxItem.isAddedToDNCPhone3) {
        return "DNC";
      }
    }
    return "Mobile";
  };

  dripFilterForInbox;
  let latestMessage = [];
  if (dripFilterForInbox?.length > 0) {
    latestMessage = dripFilterForInbox?.filter(
      (message) => !message.isMessageSend
    );
  } else {
    latestMessage = userInboxItem?.dripAutomationSchedule?.filter(
      (message) => !message.isMessageSend
    );
  }
  let userInfo = localStorage.getItem("user") || localStorage.getItem("user");
  userInfo = JSON.parse(userInfo);

  let formattedDate = "";
  if (latestMessage?.length > 0) {
    let date = new Date(latestMessage[0].date);

    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: userInfo?.timeZone || "UTC",
      // timeZoneName: "short",
    };

    formattedDate = new Intl.DateTimeFormat(undefined, options).format(date);
  }

  console.log("formattedDate", formattedDate , latestMessage , "dripFilterForInbox", dripFilterForInbox);
  

  const pushToCrmDate = (pushDate) => {
    if (!pushDate) {
      return "Invalid Date";
    }

    const date = new Date(pushDate);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.error("Invalid Date format:", pushDate);
      return "Invalid Date";
    }

    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: userInfo?.timeZone || "UTC", // Specify the desired time zone
      hour12: true, // Optional: Use 12-hour format
    };

    try {
      const formattedDate = new Intl.DateTimeFormat(undefined, options).format(
        date
      );
      return formattedDate;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };
  return (
    <DetailsTabStyled>
      {/* {userInboxItem?.dripAutomation && (
        <div
          style={{
            fontSize: "10px",
            backgroundColor: "#dedfe7",
            padding: "1rem 2rem",
            borderRadius: "2rem",
            color: "#888",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: ".5rem",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaTint color="#36a3f7" style={{ fontSize: "1.3rem" }} />
          </span>
          <span style={{ fontSize: "1.1rem" }}>Next drip {formattedDate}</span>
        </div>
      )} */}

      {/* {connectedCrm?.isCrmActive === true && (
        <div className="top">
          <If condition={userInboxItem?.pushedToCrmDate}>
            <Then>
              <div className="left">CRM</div>
              <div className="right">
                Pushed on {pushToCrmDate(userInboxItem?.pushedToCrmDate)}
              </div>
            </Then>
            <Else>
              <LightTooltip
                arrow
                placement="top"
                title="Sends the Prospect to CRM"
              >
                <button
                 
                onClick={pushToCRMClicked}
                  disabled={
                    pushDataToCRMLoading ||
                    (!userInboxItem.isVerifiedNumber &&
                      !userInboxItem.isVerifiedNumberPhone2 &&
                      !userInboxItem.isVerifiedNumberPhone3)
                  }
                  style={{
                    backgroundColor:
                      userInboxItem.isVerifiedNumber ||
                      userInboxItem.isVerifiedNumberPhone2 ||
                      userInboxItem.isVerifiedNumberPhone3
                        ? "#5867dd"
                        : "#384ad7",
                  }}
                >
                  <span className="text">Push to CRM</span>
                  <span className="icon">
                    <FaArrowRight />
                  </span>
                </button>
              </LightTooltip>
            </Else>
          </If>
        </div>
      )} */}

      <div style={{ padding: "8px 16px" , display: userInboxItem?.dripAutomation || userInboxItem?.pushedToCrmDate ? "block" : "none" }}>
        <div
          style={{
            backgroundColor: "#F7F8FC",
            borderRadius: "16px",
            padding: "8px 8px",
            display: userInboxItem?.dripAutomation ? "block" : "none",
          }}
        >
          Next drip {formattedDate}
        </div>
        <div
          style={{
            // color: "#777777",
            // fontSize: "12px",
            // fontWeight: 500,
            marginTop: "8px",
            padding: "4px 12px",
            display: userInboxItem?.pushedToCrmDate ? "block" : "none",
          }}
          className="body5Medium textSecondaryColor"
        >
       

          {userInboxItem?.pushedToCrmDate && (
            <span>CRM Pushed on {pushToCrmDate(userInboxItem?.pushedToCrmDate)}</span>
          )}
        </div>
      </div>

      <div style={{ gap: "0px" }} className="bottom">
        <TagsList />
        <header className="bottom">
          <h2>
            <span
              style={{
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="icon"
            >
              <TbInfoCircle size={18} />
            </span>
            <span 
            //  className="text"
                 className="body4Medium textPrimeryColor"
             >Details</span>
          </h2>
          <div className="bottom" style={{ padding: "8px 16px" }}>
            <div className="row">
              <div className="col">
                <h6 className="body4Medium textPrimeryColor">Mailing Address</h6>
                <span className="body5Regular textSecondaryColor">{inboxDetail?.mailingAddress}</span>
                <span className="body5Regular textSecondaryColor">
                  {inboxDetail?.mailingCity}, {inboxDetail?.mailingState}{" "}
                  {inboxDetail?.mailingZip}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h6 className="body4Medium textPrimeryColor">Email</h6>
                <input
                  type="text"
                  onBlur={onEmailSubmit}
                  value={email}
                  onChange={() => setEmail("")}
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h6 className="body4Medium textPrimeryColor">Phone 1</h6>
                <div>
                  <a className=" textSecondaryColor" href={`tel: ${inboxDetail?.phone1}`}>
                    {inboxDetail?.phone1}
                  </a>{" "}
                  , {getMobileType(1)}
                </div>
              </div>
              {/* <div className="col">
                <h6>Phone 1 Type</h6>
                <span>Mobile</span>
              </div> */}
            </div>
            <When
              condition={inboxDetail?.phone2 && inboxDetail?.phone2 != "N/A"}
            >
              <div className="row">
                <div className="col">
                  <h6 className="body4Medium textPrimeryColor">Phone 2</h6>
                  <div>
                    <a className=" textSecondaryColor" href={`tel: ${inboxDetail?.phone2}`}>
                      {inboxDetail?.phone2}
                    </a>{" "}
                    , {getMobileType(2)}
                  </div>
                </div>
                {/* <div className="col">
                  <h6>Phone 1 Type</h6>
                  <span>Mobile</span>
                </div> */}
              </div>
            </When>
            <When
              condition={inboxDetail?.phone3 && inboxDetail?.phone3 != "N/A"}
            >
              <div className="row">
                <div className="col">
                  <h6 className="body4Medium textSecondaryColor">Phone 3</h6>
                  <div>
                    <a className=" textSecondaryColor" href={`tel: ${inboxDetail?.phone3}`}>
                      {inboxDetail?.phone3}
                    </a>{" "}
                    , {getMobileType(3)}
                  </div>
                </div>
                {/* <div className="col">
                  <h6>Phone 1 Type</h6>
                  <span>Mobile</span>
                </div> */}
              </div>
            </When>
            <div className="row">
              <div className="col">
                <h6 className="body4Medium textPrimeryColor">Outbound Number</h6>
                <span style={{ padding:"0px 0px" , width:"fit-content" , borderRadius:"12px"}}  className="body5Medium textSecondaryColor">{selectedUserInbox.from}</span>
              </div>
              {/* <div className="col">
                <h6 className="body4Medium textPrimeryColor">Batch Id</h6>
                <span className="body5Regular textSecondaryColor">{userInboxItem?.batch?._id || userInboxItem?.batch}</span>
              </div> */}
            </div>
            <div className="row">
              <div className="col">
                <h6 className="body4Medium textPrimeryColor">Campaign</h6>
                <span  className="body5Medium textSecondaryColor">{compaignName}</span>
              </div>
              <div className="col">
                <h6 className="body4Medium textPrimeryColor">Batch Id</h6>
                <span className="body5Medium textSecondaryColor">{userInboxItem?.batch?._id || userInboxItem?.batch}</span>
              </div>
            </div>
            
            <div className="row">
              <div className="col">
                <h6 className="body4Medium textPrimeryColor">Batch Number</h6>
                <span className="body5Medium textSecondaryColor">{inboxDetail?.batchNumber}</span>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h6 className="body4Medium textPrimeryColor">Import File</h6>
                <span className="body5Medium textSecondaryColor">{inboxDetail?.listName}</span>
                <span className="body5Medium textSecondaryColor">
                  Uploaded:{moment(inboxDetail?.uploadedAt).format("llll")}
                </span>
              </div>
            </div>
          </div>
        </header>
      </div>
    </DetailsTabStyled>
  );
};

export default DetailsTab;
