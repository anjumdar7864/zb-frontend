import React, { useState, useEffect } from "react";
import {
  PricingContainer,

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
import HomeData from "@/data/HomeData.json";
import { PricingCards } from "./PricingCards";
import { ContainerFluid, Flex } from "@/styles/CommonStyles";
import Components from "@/components";
import { useNavigate } from "react-router-dom";
import SignupPausedModal from "@/components/common/SiginUpRestrictPopUp/WarningPopUp";

// Helper for matching local JSON data with the subscriptionId
const getMatchingCards = (subscriptionId) => {
  return HomeData.pricing.cards.filter(
    (card) => card.subscriptionId === subscriptionId
  );
};
export default function PricingPlans({ isMonthly }) {
  // 1. State for fetched subscriptions
  const [subsData, setSubsData] = useState([]);
  const [pricingData, setpricingData] = useState([]);
  // 2. Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open , setOpen] = useState(false);
 const [openPausedModal, setOpenPausedModal] = useState(false)

  const navigate = useNavigate()
  // console.log(isMonthly);
  // 3. Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // 4. Fetch subscription data once on mount
  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_APP_BACKEND_BASE_URL+"user/v1/api/subscription"
        );
        const { results } = response.data;
        setpricingData(results);
        // Filter for the IDs you want
        const filteredData = results.filter((item) =>
          [
            "67445d36f4d8d6cff7dbde60",
            "67445e5cf4d8d6cff7dbde85",
            "6744614ba4d142ed16ea9c97",
          ].includes(item._id)
        );

        // Map to the shape you need
        const mappedData = filteredData.map((item) => {
          const localMatch = getMatchingCards(item._id)[0] || {};

          // ------------------------------------------
          // IF monthly is selected => show yearly price
          // (Based on your specific request!)
          // ------------------------------------------
          const price = isMonthly ? item.monthlyPrice : item.yearlyPrice;
          const priceId = isMonthly ? item.monthlyPriceId : item.yearlyPriceId;
          const duration = isMonthly ? "month" : "year";
          return {
            subscriptionId: item._id,
            title: item.title,
            heading: item.heading,
            // Use your chosen logic:
            price,
            features: localMatch.features ?? [],
            theme: localMatch.theme,
            description: localMatch.description,
            subDescription: `Get started for $${price}, billed monthly`, 
            // or however you want to dynamically change subDescription
            maxTenants: item.maxTenants,
            monthlyOutBoundNumber: item.monthlyOutBoundNumber,
            subscriptionType: isMonthly ? "monthly" : "yearly",
            status: item.status,
            monthlyPrice: item.monthlyPrice,
            yearlyPrice: item.yearlyPrice,
            marketIncluded: item.marketIncluded,
            mostPopular: item.mostPopular,
            // Decide on priceId as well
            priceId,
            stripeProductId: item.stripeProductId,
            yearlyPriceId: item.yearlyPriceId,
            monthlyPriceId: item.monthlyPriceId,
            duration: duration,
          };
        });

        // Save to local state
        setSubsData(mappedData);
      } catch (err) {
        setError(err.message || "Error fetching subscription data");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, [isMonthly]);

  // 5. Render loading, error, or the final content
  if (loading) {
    return (
      <div  style={{ backgroundColor:"#F7F8FC"}}>
        <ContainerFluid>
          <Flex direction="column" justify="center" align="center">
            <div>Loading...</div>
          </Flex>
        </ContainerFluid>
      </div>
    );
  }

  if (error) {
    return (
      <div  style={{ backgroundColor:"#F7F8FC"}}>
        <ContainerFluid>
          <Flex direction="column" justify="center" align="center">
            <div style={{ color: "red" }}>Error: {error}</div>
          </Flex>
        </ContainerFluid>
      </div>
    );
  }
  const handleSubscribe = (planData) => {
    navigate("/signup", { state: planData });
  };

  return (
    <>
      <PricingContainer>
        <PlansWrapper>
        {subsData.map((plan, index) => (
            <PlanCard
              key={plan.subscriptionId}
              bgColor={plan.theme === "tertiary" ? "#012635" : "#ffffff"}
              textColor={plan.theme === "tertiary" ? "#ffffff" : "#000000"}
              borderRadius={
                index === 0
                  ? "32px 0 0 32px"
                  : index === 2
                  ? "0 32px 32px 0"
                  : "0"
              }
            >
              <PlanTitle
                color={
                  plan.theme === "primary"
                    ? "#00BD82"
                    : plan.theme === "secondary"
                    ? "#005ABB"
                    : "#ffffff"
                }
              >
                {plan.title}
              </PlanTitle>

              <PlanDescription
                color={plan.theme === "tertiary" ? "#FFFFFF" : "#012635"}
              >
                {plan.description}
              </PlanDescription>
              <PriceWrapper
                style={plan.theme === "tertiary" ? { paddingTop: "0px" } : {}}
              >
                <Price
                  color={plan.theme === "tertiary" ? "#FFFFFF" : "#000000"}
                >
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
                // onClick={() => handleSubscribe(plan)}
                 onClick={() => setOpenPausedModal(true)}
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
                onClick={()=> setOpen(true)}
              >
                Learn More →
              </SeeMore>
            </PlanCard>
          ))}
        </PlansWrapper>
      </PricingContainer>
      <PricingCards isMonthly={isMonthly} results={pricingData}/>
      <Components.Common.VideoPlyar  open={open} setOpen={setOpen} id={"2g811Eo7K8U"}/>
         <SignupPausedModal
                    open={openPausedModal}
                    handleClose={() => setOpenPausedModal(false)} />
    </>
  );
}