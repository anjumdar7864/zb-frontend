import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Case, Default } from "react-if";
import { size } from "lodash-es";
import { FaMapMarkerAlt, FaPen } from "react-icons/fa";
import { If, Then, Else, When } from "react-if";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  StreetViewPanorama,
} from "react-google-maps";
import { setKey, fromAddress } from "react-geocode";
import { MdOutlineArrowForward } from "react-icons/md";

import Assets from "@/assets";
import { changeLeadName, getProspectDetails } from "@/store/actions";
import { LightTooltip } from "@/components/common";
import { getInboxActivityList } from "@/store/actions";
import { Puff } from "react-loader-spinner";

import {
  SelectedTabContext,
  SelectedInboxItemContext,
} from "./SelectedInboxItemContext";
import { ProspectDetailsStyled, ProspectLayout } from "./styles";
import { ActivityTab, DetailsTab, NotesTab } from "./Tabs";
import { IoClose } from "react-icons/io5";
import PropertyAdress from "./PropertyAdress";

const GOOGLE_MAP_API = "AIzaSyDxWiX1-nWT5XxiZx_F4jdsvjDUMmwwQAQ";

const ProspectDetails = (props ,{
  inboxDetail,
  detailLoading,
  showInboxButton,
  onClickProspect,
  setShowSideBar,
  showSideBar ,
}) => {
  const dispatch = useDispatch();
  const { _id, selectedUserInbox } = useContext(SelectedInboxItemContext);
  const { notes } = selectedUserInbox;
  const { selectedTabIndex, setSelectedTabIndex } =
    useContext(SelectedTabContext);
  const { data: userInboxItem, activityList } = useSelector(
    (s) => s.inboxUserMessageReducer
  );

  const mapAddress = `${inboxDetail?.propertyAddress}-${inboxDetail?.propertyCity}-${inboxDetail?.propertyState}`;

  const [name, setName] = useState("");
  const [isMapShow, setIsMapShow] = useState(false);
  const [isShowLandDetails, setIsShowLandDetails] = useState(true);
  

  useEffect(() => {
    setName(userInboxItem.userName);
    setIsMapShow(false);
  }, [userInboxItem]);

  useEffect(() => {
   

    console.log("checking userInboxItem", userInboxItem);
    
    
    if (userInboxItem?._id) {
      dispatch(getInboxActivityList(userInboxItem._id));
    }
  }, [userInboxItem]);


  // useEffect(() => {
   

  //   console.log("checking userInboxItem", userInboxItem);
    
    
  //   if (showSideBar) {
  //     dispatch(getInboxActivityList(userInboxItem._id));
  //   }
  // }, [showSideBar]);

  // useEffect(() => {
  //   setName(userInboxItem.userName);
  //   setIsMapShow(false);
  //   // if (Object.keys(userInboxItem).length !== 0) {
  //   //   dispatch(getProspectDetails(userInboxItem?.to, userInboxItem._id));
  //   // }
  // }, [userInboxItem]);

  const onNameSubmit = () => {
    dispatch(changeLeadName(userInboxItem?._id, { name }));
  };

  return (
    <>
      {detailLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
  
          }}
        >
          <Puff height="50" width="50" radius="6" color="black" />
        </div>
      ) : (
        <ProspectLayout>
          <div>
         
            <ProspectDetailsStyled>
           <PropertyAdress {...props} />
              <div className="bottom">
                <div className="top">
                  <button
                    onClick={() => setSelectedTabIndex(0)}
                    className={selectedTabIndex === 0 ? "selected" : ""}
                  >
                    <h6 className="body4Medium textPrimeryColor" >Details</h6>
                  </button>
                  <button
                    onClick={() => setSelectedTabIndex(1)}
                    className={selectedTabIndex === 1 ? "selected" : ""}
                  >
                    <h6  className="body4Medium textPrimeryColor">Activity</h6>
                    <span>
                   
                      ({userInboxItem?.activityList
                        ? size(userInboxItem?.activityList)
                        : size(activityList)})
                    </span>
                  </button>
                  <button
                    onClick={() => setSelectedTabIndex(2)}
                    className={selectedTabIndex === 2 ? "selected" : ""}
                  >
                    <h6  className="body4Medium textPrimeryColor">Notes</h6>
                    <span>
                     ({userInboxItem?.notes
                        ? size(userInboxItem?.notes)
                        : size(notes)})
                    </span>
                  </button>
                  <div style={{borderBottom:"solid 1px #F0F0F0" , height:"100%" , display:"flex" , alignItems:"center" , justifyContent:"center"}}>
                 {/* <span style={{width:"24px" , height:"24px" , display:"flex" , alignItems:"center" , justifyContent:"center" , backgroundColor:"#E0E0E0" , borderRadius:"50%" , cursor:"pointer"}}>
                 <IoClose onClick={()=>setShowSideBar(false)} style={{fontSize:"16px" , color:"#012635"}} />

                 </span> */}
                  </div>
                </div>
                <div style={{ padding:"0px" , }} className="bottom">
                  <Switch>
                    <Case condition={selectedTabIndex === 0}>
                      <DetailsTab />
                    </Case>
                    <Case condition={selectedTabIndex === 1}>
                      <ActivityTab />
                    </Case>
                    <Case condition={selectedTabIndex === 2}>
                      <NotesTab />
                    </Case>
                    <Default>
                      <NotesTab />
                    </Default>
                  </Switch>
                </div>
              </div>
            </ProspectDetailsStyled>
          </div>
          <div>
            {showInboxButton ? (
              ""
            ) : (
              // <button className="btn_prospect-show" onClick={onClickProspect}>
              //   <MdOutlineArrowForward />
              // </button>
              <div></div>
            )}
          </div>
        </ProspectLayout>
      )}
    </>
  );
};

export default ProspectDetails;

const ProspectMap = withScriptjs(
  withGoogleMap(({ address }) => {
    setKey(GOOGLE_MAP_API);
    const [center, setCenter] = useState(null);

    useEffect(() => {
      fromAddress(address)
        .then(({ results }) => {
          const { lat, lng } = results[0].geometry.location;
          setCenter({
            lat,
            lng,
          });
        })
        .catch(console.error);
    }, [address]);

    return (
      <When condition={center}>
        <GoogleMap defaultZoom={8} defaultCenter={center}>
          <StreetViewPanorama
            defaultPosition={center}
            visible
          ></StreetViewPanorama>
        </GoogleMap>
      </When>
    );
  })
);
