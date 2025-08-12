import React, { useEffect, useState } from "react";
import {
  FirstChildContainer,
  SectionTitle,
  Subtitle,
  PriceWrapper,
  Price,
  PriceNote,
  SplitNote,
  Description,
  ButtonWrapper,
  Button,
  SecondChildContainer,
  IncludedItems,
  ListItem,
  SubItems,
  SubItem,
  SubHeading,
} from "./style";

import { Flex } from "@/styles/CommonStyles";
import { useNavigate } from "react-router-dom";
import HomeData from "@/data/HomeData.json";
import Components from "@/components";
import SignupPausedModal from "@/components/common/SiginUpRestrictPopUp/WarningPopUp";

export const PackageDetails = ({ results }) => {
  const navigate = useNavigate();
  const handleClick = (data) => {
    navigate("/signup", { state: data });
  };

  const [pricingData, setPricingData] = useState(null);
      const [openPausedModal, setOpenPausedModal] = useState(false)

  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        console.log(results);
        // Filter the response to find only the specified subscription
        const filteredData = results.filter((item) =>
          ["6744617ea4d142ed16ea9c9e"].includes(item._id)
        );

        console.log("filteredData", filteredData);

        if (filteredData.length > 0) {
          const item = filteredData[0];
          // Create a single object instead of an array
          const formattedData = {
            subscriptionId: item._id,
            title: item.title,
            heading: item.heading,
            price: item.price,
            features: HomeData.jumpStart.features,
            theme: HomeData.jumpStart.theme,
            description: HomeData.jumpStart.description,
            subDescription:
              "Get started for $" + item.price + ", billed monthly",
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
          };
          setPricingData(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch subscription data:", error);
      }
    };

    fetchSubscriptionData();
  }, [results]);

  console.log("pricingData", pricingData);

  if (!pricingData) {
    // Show nothing or a loader until data is fetched
    return null;
  }

  return (
    <Flex
      direction="column"
      lgDirection="row"
      xxlggap={`56px`}
      xlggap={`56px`}
      lggap={`32px`}
      xsGap={"32px"}
      gap={"32px"}
      bg="#151a28"
      xlPadding={"96px 112px"}
      xxlPadding={"96px 112px"}
      padding={"96px 112px"}
      lgPadding={"96px 112px"}
      mdpadding="48px 16px"
      smPadding={"48px 16px"}
      xsPadding={"48px 16px"}
      color="#FFFFFF"
      style={{
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        backgroundColor: "#151a28",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      {/* First Child */}
      <FirstChildContainer>
        <SectionTitle>{pricingData.title}</SectionTitle>
        <Subtitle>
          Unlock Powerful Lead Generation Tools and Exclusive Education to
          Skyrocket Your Success
        </Subtitle>
        <PriceWrapper>
          <Price>
            ${pricingData.price} <PriceNote>/month</PriceNote>
          </Price>

          <SplitNote>+ 50/50 split on deals</SplitNote>
        </PriceWrapper>
        <SubHeading>
          Don’t Just Generate Leads — Close More Deals and Dominate the Market
        </SubHeading>
        <Description>
          Get the tools, the education, and the support you need to succeed in
          real estate. With Jumpstart JV + Vault Access, you're not just getting
          a lead generation platform — you're getting a complete system to build
          your business, sharpen your skills, and close more deals.
        </Description>
        <ButtonWrapper>
          <Button primary
            // onClick={() => handleClick(pricingData)}
           onClick={() => setOpenPausedModal(true)}
           >
            Get Started
          </Button>
          <Button onClick={()=>setOpen(true)}>Learn More</Button>
        </ButtonWrapper>
      </FirstChildContainer>

      {/* Second Child */}
      <SecondChildContainer>
        <SectionTitle>What’s Included</SectionTitle>
        <IncludedItems>
          <ListItem>
            <span className="icon-parent">
              <div className="icon" />
              5K Free Skip-Traced List
            </span>
          </ListItem>
          <ListItem>
            <span className="icon-parent">
              <div className="icon" />
              Vault Access — Your Path to Real Estate Mastery
            </span>
          </ListItem>
          <ListItem numbered>
            1. Unlimited Education
            <SubItems>
              <SubItem>Novation Agreements</SubItem>
              <SubItem>Subject-To Deals</SubItem>
              <SubItem>Traditional Wholesaling</SubItem>
              <SubItem>Sales Mastery</SubItem>
            </SubItems>
          </ListItem>
          <ListItem numbered>2. Weekly Q&A Sessions</ListItem>
          <ListItem numbered>3. Essential Contracts Library</ListItem>
          <ListItem>
            <span className="icon-parent">
              <div className="icon" />
              Disposition Support and Transaction Coordination (TC)
            </span>
            <SubItems>
              <ListItem numbered>1. Expert Disposition Support</ListItem>
              <ListItem numbered>2. Transaction Coordination</ListItem>
            </SubItems>
          </ListItem>
        </IncludedItems>
      </SecondChildContainer>
      <Components.Common.VideoPlyar  open={open} setOpen={setOpen} id={"2g811Eo7K8U"}/>
       <SignupPausedModal
              open={openPausedModal}
              handleClose={() => setOpenPausedModal(false)} />
    </Flex>
  );
};
