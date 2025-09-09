import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CompanyA.module.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoInformationCircleSharp } from "react-icons/io5";
import { FaUser, FaUserAlt } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { HiArrowRight } from "react-icons/hi";
import SubscribeModal from "./SubscribeModal";
import JvTermsModal from "./JvTermsModal";
import HomeData from "@/data/HomeData.json";
const CompanyPlansCard = ({ planDetail ,activeCycle ,   setSubscribe , handleContinue=()=>{} , user }) => {
    const { _id, title, heading, price, monthlyPrice , yearlyPrice ,  features, color, bgColor, subscriptionType, monthlyOutBoundNumber } = planDetail || {};
    console.log("bg color", bgColor);
    const [open, setOpen] = useState(false);
    const [openJv, setOpenJv] = useState(false)
    const handleOpen = () => {
        // if(!disable){
        if(_id == "6744617ea4d142ed16ea9c9e"){
            setOpenJv(true)
        }else{
            setOpen(true)

        }
    
        // }
    
    
    };

    const filterFeature = (id)=> HomeData?.pricing?.cards?.filter((data)=> data?.subscriptionId == id)
console.log("HomeData" , filterFeature);

    const confirmTerm = async() => {
        setOpenJv(false)
        setOpen(true)
      }
    return (
        <div className={styles.card} style={{ backgroundColor: bgColor }} key={_id}>
            <div className={styles.cardLeftContainer}>
                <div style={{ color }} className={styles.card_title}>{title || ""}</div>
                <div style={{ display: title == "CUSTOM" && "none" }}>
                    <div style={{ color: bgColor != "white" && bgColor != "#D6E7FC" ? "white" : "" }} className={styles.cardPriceSmall}>Starting at</div>
                    <div >
                        {" "}
                        <span style={{ color: bgColor != "white" && bgColor != "#D6E7FC" ? "white" : "" }} className={styles.cardPrice}>${activeCycle == "monthly" ?  monthlyPrice : yearlyPrice}</span>{" "}
                        <span style={{ color: bgColor != "white" && bgColor != "#D6E7FC" ? "white" : "" }} className={styles.cardPriceSmall}>billed {subscriptionType || ""}*</span>{" "}
                    </div>
                
                </div>
                <div className={styles.cardBottomLayout}>
                    <div>
                        <div style={{ color, display: title == "I'm Serious" ? "flex" : "none", fontSize: "12px", marginBottom: "10px" }} className={styles.card_price_discount}>
                            <FaUser style={{ fontSize: "14px" }} /> &nbsp;Get started for ${price || 0}, billed {subscriptionType || ""}
                        </div>
                        {
                            title !== "CUSTOM" ?
                              <SubscribeModal handleOpen={handleOpen} open={open} setOpen={setOpen} handleContinue={handleContinue} selectedType={activeCycle}  planDetail={planDetail} setSubscribe={ setSubscribe}>
                            <button style={{ backgroundColor: color }} className={styles.card_subscribe}>
                             
                               {user?.currentSubscriptionId == _id && user?.isCanceledSubscription ? "Resubscribe" : "Subscribe"}  to {title} plan
                               
                            </button> 
                            </SubscribeModal> :
                                <div style={{ display: "flex", gap: "12px" }}>
                                    <span onClick={() => window.open("https://dev2.zeitblast.com/#/pricing", "_blank")} style={{ backgroundColor: color, width: "144px", fontSize: "16px", lineHeight: "24px", fontWeight: 500, cursor:"pointer" ,  fontFamily: "Fellix, -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif" }} className={styles.card_subscribe}>
                                        Call for Details
                                    </span>
                                    <span onClick={() => window.open("https://dev2.zeitblast.com/#/pricing", "_blank")} style={{ border: `solid 1px ${color}`, backgroundColor: "transparent", width: "144px", fontSize: "16px", lineHeight: "24px", fontWeight: 500, color: color, cursor:"pointer" ,  fontFamily: "Fellix, -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif" }} className={styles.card_subscribe}>
                                        Get Started
                                    </span>
                                </div>
                        }
                    </div>
                </div>
            </div>
            <div className={styles.cardRightContainer}>
                <div>
                    <div style={{ color: bgColor != "white" && bgColor != "#D6E7FC" ? "white" : "" }} className={styles.cardShortDis}>
                        {heading}
                    </div>
         
                </div>

                {features && features.length ? <div style={{ color: bgColor != "white" && bgColor != "#D6E7FC" ? "white" : "" }} className={styles.cardDis}>
                    All features from the {title || ""} plan, plus:
                </div> : ""}

                <div style={{ color: bgColor != "white" && bgColor != "#D6E7FC" ? "white" : "" }} className={styles.cardList}>
                    {/* <ul>
                        {features.map((data, index) => {
                            return <li>{data}</li>;
                        })}
                    </ul> */}
                      <ul>
                        {filterFeature(_id)[0]?.features.map((data, index) => {
                            return <li>{data}</li>;
                        })}
                    </ul>
                </div>
                <div >
                    {features && features.length && title != "I'm Serious" ? <Link style={{ color: bgColor != "white" && bgColor != "#D6E7FC" ? color : "#005ABB", display: "flex", alignItems: "center" }} to="/pricing">See more <HiArrowRight style={{ color: "black", marginLeft: "8px", fontSize: "20px" }} /></Link> : ""}

                </div>
            </div>
             <JvTermsModal open={openJv} setOpen={setOpenJv} confirmTerm={confirmTerm}/>
        </div>
    );
};

export default CompanyPlansCard;
