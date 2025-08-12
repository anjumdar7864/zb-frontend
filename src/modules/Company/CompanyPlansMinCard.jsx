import React, { useState } from 'react'
import styles from "./CompanyA.module.css";
import SubscribeModal from './SubscribeModal';
import { commonAPICall } from '@/services/api/common';
import { ENDPOINTS, REQUEST_TYPES } from '@/utils/constant/url';
import toast from 'react-hot-toast';
import JvTermsModal from './JvTermsModal';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '@/store/actions';
import UpdateStripWarning from './UpdateStripWarning';
const CompanyPlansMinCard = ({
  setDownGradePakage,
  downGradeStep,
  setDownGradeStep,
  packageType,
  data,
  currentPackageTitle = '',
  currentPackageId = "",
  extraMarket,
  tenantSubscriptionType = "yearly",
  setMarketRemove,

  handleContinue = () => { },
  setSubscribe = () => { }
}) => {
  const { _id, title, heading, price, features, color, bgColor, monthlyPrice, yearlyPrice, subscriptionType, monthlyOutBoundNumber } = data || {};
  const calculateYearlyWithDiscount = (monthlyCost = 0) => {
    const yearlyCost = monthlyCost * 12;
    const discount = yearlyCost * 0.20; // 20% discount
    const discountedPrice = yearlyCost - discount;
    return discount;
  }
  const [open, setOpen] = useState(false);
  const [openJv, setOpenJv] = useState(false)
  const [openUpdateStripWarning, setOpenUpdateStripWarning] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );
  const handleOpen = async () => {


    if (user?.isNewUser && user?.isTenDlcSubmit != "Accept") {








    } else {



      if (_id == "6744617ea4d142ed16ea9c9e" && user?.isDeclinedSubscription) {
        setOpen(true)
      } else if (_id == "6744617ea4d142ed16ea9c9e" && !user?.isDeclinedSubscription) {
        setOpenJv(true)

      } else {
        if (!isCurrentPlan && !user?.isDeclinedSubscription) {
          const user = JSON.parse(
            localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
          );
          const payload = {
            newMongoSubscriptionId: _id,
            adminId: user?._id,
            subscriptionType: packageType,
          };
          const { data, isError, message, sessionExpired } = await commonAPICall(
            REQUEST_TYPES.POST,
            `${ENDPOINTS.CHECK_SUBSCRIPTION}`,
            payload
          );
          if (sessionExpired) {



            // sessionStorage.clear()
            dispatch(logOut());

            navigate("/Login");

          }
          if (data.isDowngrade) {
            setDownGradePakage({
              curruntPackageTitle: currentPackageTitle,
              selectedPackageTitle: title,
              selectedPackageId: _id,
              selectedPackagePrice: monthlyPrice,
              data: data,
            })
            setDownGradeStep(1)
          } else {
            // setOpen(true)
            if(!user?.IsStripeNew || user?.IsStripeNew == undefined){
              setOpenUpdateStripWarning(true)
            }else{
            setOpen(true)

            }
          }

          // if(!isCurrentPlan){
          //     setOpen(true)

          // }

        } else if (isCurrentPlan && extraMarket > 0 && !user?.isDeclinedSubscription) {
          // If the user is on the current plan and has extra market, show a message
          const user = JSON.parse(
            localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
          );
          const payload = {
            newMongoSubscriptionId: _id,
            adminId: user?._id,
            subscriptionType: packageType,
          };
          const { data, isError, message, sessionExpired } = await commonAPICall(
            REQUEST_TYPES.POST,
            `${ENDPOINTS.CHECK_SUBSCRIPTION}`,
            payload
          );
          if (sessionExpired) {



            // sessionStorage.clear()
            dispatch(logOut());

            navigate("/Login");

          }
          if (data.isDowngrade) {
            setDownGradePakage({
              curruntPackageTitle: currentPackageTitle,
              selectedPackageTitle: title,
              selectedPackageId: _id,
              selectedPackagePrice: monthlyPrice,
              data: data,
            })
            setMarketRemove(true)

            setDownGradeStep(1)
          } else {
            setOpen(true)
          }


        } else if ( user?.isDeclinedSubscription) {

          setOpen(true)
        }
      }



    }


  };



  const confirmTerm = async () => {
    setOpenJv(false)
    if (!isCurrentPlan) {
      const user = JSON.parse(
        localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
      );
      const payload = {
        newMongoSubscriptionId: _id,
        adminId: user?._id,
      };
      const { data, isError, message, sessionExpired } = await commonAPICall(
        REQUEST_TYPES.POST,
        `${ENDPOINTS.CHECK_SUBSCRIPTION}`,
        payload
      );
      if (sessionExpired) {



        // sessionStorage.clear()
        dispatch(logOut());

        navigate("/Login");

      }
      if (data.isDowngrade) {
        setDownGradePakage({
          curruntPackageTitle: currentPackageTitle,
          selectedPackageTitle: title,
          selectedPackageId: _id,
          selectedPackagePrice: monthlyPrice,
          data: data,
        })
        setDownGradeStep(1)
      } else {
        setOpen(true)
      }

      // if(!isCurrentPlan){
      //     setOpen(true)

      // }

    }
  }
  // console.log("currentPackageId",subscriptionType , packageType , tenantSubscriptionType);

  // const isCurrentPlan = _id === currentPackageId && packageType == subscriptionType ;
  const isCurrentPlan = _id === currentPackageId && packageType == tenantSubscriptionType;
  return (
    <div style={{ border: "solid 1px #E0E0E0", borderRadius: "12px", padding: "24px", backgroundColor: bgColor, marginTop: "20px" }}>

      <div style={{ color: color, fontSize: "12px", fontWeight: 600, lineHeight: "20px" }}>{title || ""}</div>
      <div style={{ display: title == "CUSTOM" && "none" }}>
        <div style={{ fontSize: "12px", fontWeight: 500, lineHeight: "20px", marginTop: "20px", color: bgColor != "white" && bgColor != "#D6E7FC" ? "white" : "#012635" }}>
          <div>Starting at</div>
          <div><span style={{ fontSize: "32px", lineHeight: "40px", fontWeight: 700 }}>${packageType == "monthly" ? monthlyPrice : yearlyPrice}</span><span>/billed {subscriptionType}*</span></div>
          <div style={{ color: bgColor != "white" && bgColor != "#D6E7FC" ? color : "" }}>Save ${calculateYearlyWithDiscount(monthlyPrice) || 0} per year</div>
        </div>
      </div>
      {
        title !== "CUSTOM" ?
          <SubscribeModal handleOpen={handleOpen} open={open} setOpen={setOpen} selectedType={packageType} disable={isCurrentPlan && packageType != subscriptionType ? true : false} planDetail={data} setSubscribe={setSubscribe} handleContinue={handleContinue}>
            <div
              style={{
                // backgroundColor: isCurrentPlan && packageType == subscriptionType ? '#E0E0E0' : color, // Change color if it's the current plan
                backgroundColor: user?.isDeclinedSubscription && isCurrentPlan ? color : user?.isNewUser && user?.isTenDlcSubmit != "Accept" ? '#E0E0E0' : isCurrentPlan && extraMarket > 0 ? color : isCurrentPlan && packageType == tenantSubscriptionType ? '#E0E0E0' : color, // Change color if it's the current plan
                // cursor: isCurrentPlan && packageType != tenantSubscriptionType ? 'not-allowed' : 'pointer', // Disable cursor if it's the current plan
                cursor: user?.isDeclinedSubscription && isCurrentPlan ? "pointer" : user?.isNewUser && user?.isTenDlcSubmit != "Accept" ? 'not-allowed' : isCurrentPlan && packageType != subscriptionType ? 'not-allowed' : 'pointer', // Disable cursor if it's the current plan
                color: 'white',
                height: '48px',
                padding: '0px 12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
                marginTop: '40px',
                opacity: user?.isDeclinedSubscription && isCurrentPlan ? 1 : isCurrentPlan && isCurrentPlan && extraMarket > 0 ? 1 : isCurrentPlan ? 0.6 : 1, // Make it look disabled when it's the current plan
              }}
            // Disable click if it's the current plan
            >
              {user?.isDeclinedSubscription && isCurrentPlan ? `Resubscribe "${title}" ` :
                isCurrentPlan && extraMarket > 0 ? `Remove Extra market ` : isCurrentPlan ? `You are on the "${title}" plan` : `Upgrade to "${title}" plan`}
            </div>
          </SubscribeModal>
          :
          <div style={{ display: "flex", gap: "12px" }}>
            <span onClick={() => window.open("https://dev3.zeitblast.com/#/pricing", "_blank")} style={{ backgroundColor: color, width: "144px", fontSize: "16px", lineHeight: "24px", cursor: "pointer", fontWeight: 500, fontFamily: "Fellix, -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif" }} className={styles.card_subscribe}>
              Call for Details
            </span>
            <span onClick={() => window.open("https://dev3.zeitblast.com/#/pricing", "_blank")} style={{ border: `solid 1px ${color}`, backgroundColor: "transparent", width: "144px", cursor: "pointer", fontSize: "16px", lineHeight: "24px", fontWeight: 500, color: color, fontFamily: "Fellix, -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif" }} className={styles.card_subscribe}>
              Get Started
            </span>
          </div>
      }

      <JvTermsModal open={openJv} setOpen={setOpenJv} confirmTerm={confirmTerm} />

      <UpdateStripWarning
           open={openUpdateStripWarning}
           setOpen={setOpenUpdateStripWarning}
           price={`${packageType == "monthly" ? monthlyPrice : yearlyPrice}`}
           hadleUpgrade={()=>setOpen(true)}
          //  setMarketRemove={setMarketRemove}
         />
    </div>
  )
}

export default CompanyPlansMinCard
