import React, { useState, useEffect, forwardRef } from "react";
import {
  PricingContainer,
  Title,
  PlansWrapper,
  PlanCard,
  PlanTitle,
  PlanDescription,
  PriceWrapper,
  Price,
  PriceNote,
  SubscribeButton,
  FeaturesList,
  SeeMore,
  Subtitle,
} from "./styles"; 
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import HomeData from "@/data/HomeData.json";
import Components from "@/components";
import SignupPausedModal from "@/components/common/SiginUpRestrictPopUp/WarningPopUp";

// Helper for matching local JSON data with the subscriptionId
const getMatchingCards = (subscriptionId) => {
  return HomeData.pricing.cards.filter(
    (card) => card.subscriptionId === subscriptionId
  );
};

const PricingSection= forwardRef(({ results }, ref) => {
  const [pricingData, setPricingData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [open, setOpen] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [openPausedModal, setOpenPausedModal] = useState(false)


  const navigate = useNavigate(); 

  useEffect(() => {
    // Only run if we actually have subscription results
    if (results && results.length) {
      // Filter the results for IDs we want
      const filteredData = results.filter((item) =>
        ["67445d36f4d8d6cff7dbde60", "67445e5cf4d8d6cff7dbde85", "6744614ba4d142ed16ea9c97"].includes(item._id)
      );

      // Map those results into the shape needed for rendering
      const mappedData = filteredData.map((item) => {
        const localMatch = getMatchingCards(item._id)[0]; // or undefined if not found
        return {
          subscriptionId: item._id,
          title: item.title,
          heading: item.heading,
          price: item.price,
          features: localMatch?.features ?? [],
          theme: localMatch?.theme,
          description: localMatch?.description,
          subDescription: `Get started for $${item.price}, billed monthly`,
          maxTenants: item.maxTenants,
          monthlyOutBoundNumber: item.monthlyOutBoundNumber,
          subscriptionType: item.subscriptionType,
          status: item.status,
          monthlyPrice: item.monthlyPrice,
          yearlyPrice: item.yearlyPrice,
          marketIncluded: item.marketIncluded,
          mostPopular: item.mostPopular,
          priceId: item.monthlyPriceId,
          stripeProductId: item.stripeProductId,
          yearlyPriceId: item.yearlyPriceId,
          duration: "month"
        };
      });

      setPricingData(mappedData);
      setLoading(false);
    }
  }, [results]);

  // Handle navigation on Subscribe button click
  const handleSubscribe = (planData) => {
    navigate("/signup", { state: planData });
  };

  if (loading) {
    return (
      <PricingContainer>
        <Title>Loading Pricing Plans...</Title>
      </PricingContainer>
    );
  }

  if (error) {
    return (
      <PricingContainer>
        <Title>{error}</Title>
      </PricingContainer>
    );
  }


  return (
    <PricingContainer ref={ref}>
      <Title>Four Plans Loaded with Opportunities</Title>
      <PlansWrapper>
        {pricingData?.map((plan) => (
          <PlanCard
            key={plan.subscriptionId}
            bgColor={
              plan.theme === "tertiary"
                ? "#012635"
                : "#ffffff"
            }
            textColor={plan.theme === "tertiary" ? "#ffffff" : "#000000"}
          >
            <PlanTitle
              color={
                plan.theme === "primary"
                  ? "#00BD82"
                  : plan.theme === "secondary"
                  ? "#005ABB"
                  : "#ffffff"
              }
              style={{display:"flex" , gap:"10px"}}
            >
              {plan.title} <span style={{ display:plan.mostPopular ? "flex" : "none" , fontSize:"10px" , backgroundColor:"#F0F0F0" , padding:"0px 8px" , height:"fit-content", borderRadius:"4px" , color:"#00BD82"}}>most popular</span>
            </PlanTitle>

            <PlanDescription
              color={plan.theme === "tertiary" ? "#FFFFFF" : "#012635"}
            >
              {plan.description}
            </PlanDescription>
            <PriceWrapper
              style={plan.theme === "tertiary" ? { paddingTop: "0px" } : {}}
            >
              <Price color={plan.theme === "tertiary" ? "#FFFFFF" : "#000000"}>
                ${plan.price}
              </Price>
              <PriceNote
                color={plan.theme === "tertiary" ? "#FFFFFF" : "#012635"}
              >
                {plan.duration === "year" ? "/year" : "/month"}
              </PriceNote>
            </PriceWrapper>
            <SubscribeButton
              bgColor={
                plan.theme === "primary"
                  ? "#00BD82"
                  : plan.theme === "secondary"
                  ? "#005ABB"
                  : "#ffffff"
              }
              textColor={plan.theme === "tertiary" ? "#012635" : "#ffffff"}
                 onClick={() => handleSubscribe(plan)}
              // onClick={() => setOpenPausedModal(true)}
            >
              Subscribe
            </SubscribeButton>
            <Subtitle
              iconColor={plan.theme === "tertiary" ? "#ffffff" : "#28a745"}
            >
              {plan.subTitle}
            </Subtitle>
            <FeaturesList
              iconColor={plan.theme === "tertiary" ? "#ffffff" : "#012635"}
            >
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </FeaturesList>
            <SeeMore
              color={
                plan.theme === "primary"
                  ? "#00BD82"
                  : plan.theme === "secondary"
                  ? "#005ABB"
                  : "#ffffff"
              }
              // onClick={() => navigate("/pricing")}
             onClick={() => {
                if(plan.subscriptionId === "67445d36f4d8d6cff7dbde60"){
                setVideoId("YXB0cJBVSmc")

                }else if(plan.subscriptionId === "67445e5cf4d8d6cff7dbde85"){
                  setVideoId("jeh-WDDALYU")
                }else if(plan.subscriptionId === "6744614ba4d142ed16ea9c97"){
                  setVideoId("NtRvqPby96o")
                }else if(plan.subscriptionId === "6744617ea4d142ed16ea9c9e"){
                  setVideoId("Ji8LsW9bHII")
                }else if(plan.subscriptionId === "67a46abcc15fce67f83fb05f"){
                      setVideoId("aDtsA4cg5nU")
                }
                setOpen(true)
              }}
            >
              Learn More →
            </SeeMore>
          </PlanCard>
        ))}
      </PlansWrapper>
      <Components.Common.VideoPlyar  open={open} setOpen={setOpen} id={videoId}/>
      <SignupPausedModal
        open={openPausedModal}
        handleClose={() => setOpenPausedModal(false)} />
    </PricingContainer>
  );
});

export default PricingSection;