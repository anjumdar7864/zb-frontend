import React, { useEffect, useState } from "react";
import {
  FirstChildContainer,
  SectionTitle,
  Subtitle,
  PriceWrapper,
  Price,
  PriceNote,
  Description,
  ButtonWrapper,
  SecondChildContainer,
  IncludedItems,
  ListItem,
  SubItems,
  SubItem,
  Button,
  NoteTitle,
  Wrapper,
  TrustWrapper,
  TrustedBySection,
  TrustedByText,
  LogoWrapper,
  DesktopLogoWrapper,
  CardWrapper,
  MainWrapper,
  ChildContent,
  CardHeader,
  SecondButtonWrapper,
  Note,
  StyledContainer,
} from "./styles";
import Slider from "react-slick";
import companies from "@/assets/icons";
import { useNavigate, } from "react-router-dom";
import HomeData from "@/data/HomeData.json";
import Components from "@/components";
import SignupPausedModal from "@/components/common/SiginUpRestrictPopUp/WarningPopUp";

export const PricingCards = ({ isMonthly, results }) => {
  const navigate = useNavigate();
  const [pricingData, setPricingData] = useState(null);
  const [custompricingData, setCustomPricingData] = useState(null)
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
      const [openPausedModal, setOpenPausedModal] = useState(false)


  // Fetch subscription data
  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const filteredData = results.filter((item) =>
          ["6744617ea4d142ed16ea9c9e"].includes(item._id)
        );
        const customFilteredData = results.filter((item) =>
          ["67a46abcc15fce67f83fb05f"].includes(item._id)
        );
        if (filteredData.length > 0) {
          const item = filteredData[0];
          const price = isMonthly ? item.monthlyPrice : item.yearlyPrice;
          const priceId = isMonthly ? item.monthlyPriceId : item.yearlyPriceId;
          const duration = isMonthly ? "month" : "year";

          setPricingData({
            subscriptionId: item._id,
            title: item.title,
            heading: item.heading,
            price,
            features: HomeData.jumpStart.features,
            theme: HomeData.jumpStart.theme,
            description: HomeData.jumpStart.description,
            subDescription:
              "Get started for $" + item.price + ", billed monthly",
            maxTenants: item.maxTenants,
            monthlyOutBoundNumber: item.monthlyOutBoundNumber,
            subscriptionType: isMonthly ? "monthly" : "yearly",
            status: item.status,
            monthlyPrice: item.monthlyPrice,
            yearlyPrice: item.yearlyPrice,
            marketIncluded: item.marketIncluded,
            mostPopular: item.mostPopular,
            priceId,
            stripeProductId: item.stripeProductId,
            yearlyPriceId: item.yearlyPriceId,
            duration,
          });
        }

        if (customFilteredData.length > 0) {
          const item = customFilteredData[0];
          const price = isMonthly ? item.monthlyPrice : item.yearlyPrice;
          const priceId = isMonthly ? item.monthlyPriceId : item.yearlyPriceId;
          const duration = isMonthly ? "month" : "year";

          setCustomPricingData({
            subscriptionId: item._id,
            title: item.title,
            heading: item.heading,
            price,
            features: HomeData.doneForU.features,
            theme: HomeData.doneForU.theme,
            description: HomeData.doneForU.description,
            subDescription:
              "Get started for $" + item.price + ", billed monthly",
            maxTenants: item.maxTenants,
            monthlyOutBoundNumber: item.monthlyOutBoundNumber,
            subscriptionType: isMonthly ? "monthly" : "yearly",
            status: item.status,
            monthlyPrice: item.monthlyPrice,
            yearlyPrice: item.yearlyPrice,
            marketIncluded: item.marketIncluded,
            mostPopular: item.mostPopular,
            priceId,
            stripeProductId: item.stripeProductId,
            yearlyPriceId: item.yearlyPriceId,
            duration,
          });
        }
      } catch (error) {
        console.error("Failed to fetch subscription data:", error);
      }
    };

    fetchSubscriptionData();
  }, [isMonthly, results]);

  // Handle mobile view
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent rendering until data is ready
  if (!pricingData) return null;

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 3000,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
  };

  const handleClick = (data) => {
    navigate("/signup", { state: data });
  };


  return (
    <>
      <Wrapper>
        <div style={{ maxWidth: "1440px", margin: "auto", display: "flex", gap: "24px" }}>
          <StyledContainer
            style={{
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",

              border: "2px solid #012635",
            }}
          >
            {/* First Child */}
            <FirstChildContainer>
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <img
                  src="./icons/sparkles-icon-green.svg"
                  alt=""
                  width={32}
                  height={33}
                />
                <SectionTitle>Jumpstart JV + Vault Access</SectionTitle>
              </div>
              <Subtitle>
                Generate Leads, Close Deals, and Learn the Ropes with
                Comprehensive Support
              </Subtitle>
              <Description>
                Are you ready to dive into the real estate market but need a
                little extra help to get started?{" "}
                <span style={{ color: "#5BF1B2" }}>The Jumpstart JV</span>Plan is
                designed for entry-level real estate professionals who want to
                generate leads, close deals, and gain hands-on experience with
                unparalleled support and guidance.
              </Description>
              <PriceWrapper>
                <Price>
                  ${pricingData.price}{" "}
                  <PriceNote textColor={"#FFFFFF"}>
                    /{pricingData.duration}
                  </PriceNote>
                </Price>
                <PriceNote textColor={"#FFFFFF"}>
                  + 50/50 split on deals
                </PriceNote>
              </PriceWrapper>
            </FirstChildContainer>

            {/* Second Child */}
            <SecondChildContainer>
              <IncludedItems>
                <ListItem>
                  <span className="icon-parent">
                    <div className="icon" />
                    Affordable Entry
                  </span>
                </ListItem>
                <ListItem style={{ paddingLeft: "27px" }}>
                  Get access to all the features included in our ‘I’m Serious’
                  Plan for just $195/month.
                </ListItem>
                <ListItem>
                  <span className="icon-parent">
                    <div className="icon" />
                    Lead Generation Power
                  </span>
                </ListItem>
                <ListItem style={{ paddingLeft: "27px" }}>
                  Send 15,000 outbound messages per month to kickstart your lead
                  generation efforts.
                </ListItem>
                <ListItem>
                  <span className="icon-parent">
                    <div className="icon" />
                    Comprehensive Support
                  </span>
                </ListItem>
                <ListItem style={{ paddingLeft: "27px" }}>
                  Receive expert help with:
                  <SubItems>
                    <SubItem>Acquisition Calls</SubItem>
                    <SubItem>Closing Calls</SubItem>
                    <SubItem>Contractual Agreements</SubItem>
                    <SubItem>Disposition of Your Deals</SubItem>
                  </SubItems>
                </ListItem>
                <ListItem>
                  <span className="icon-parent">
                    <div className="icon" />
                    Real Estate Education
                  </span>
                </ListItem>
                <ListItem style={{ paddingLeft: "27px" }}>
                  Learn essential exit strategies, including:
                  <SubItems>
                    <SubItem>Novation Agreements</SubItem>
                    <SubItem>Subject-To Deals</SubItem>
                    <SubItem>Wholesaling Techniques</SubItem>
                  </SubItems>
                </ListItem>
                <ListItem>
                  <span className="icon-parent">
                    <div className="icon" />
                    Joint Venture Partnership
                  </span>
                </ListItem>
                <ListItem style={{ paddingLeft: "27px" }}>
                  <SubItems>
                    <SubItem>
                      Partner with us and share profits with a 50/50 split on
                      closed deals.
                    </SubItem>
                    <SubItem>
                      Learn while you earn and gain real-world experience.
                    </SubItem>
                  </SubItems>
                </ListItem>
              </IncludedItems>
              <NoteTitle>Ready to Jumpstart Your Real Estate Career?</NoteTitle>
              <ButtonWrapper>
                <Button onClick={() => setOpen(true)}>Learn More</Button>
                <Button
                  bgColor={"#5BF1B2"}
                  borderColor={"none"}
                  textColor={"#012635"}
                  // onClick={() => handleClick(pricingData)}
                 onClick={() => setOpenPausedModal(true)}
                  
                >
                  Get Started
                </Button>
              </ButtonWrapper>
            </SecondChildContainer>
          </StyledContainer>
          <StyledContainer
            style={{
              background: "linear-gradient(180deg, #d6e7fc 0%, #f2f8ff 100%)",
              border: "2px solid #74B5FF",
            }}
          >
            {/* First Child */}
            <FirstChildContainer>
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <img
                  src="./icons/thunder-icon-purple.svg"
                  alt=""
                  width={32}
                  height={33}
                />
                <SectionTitle textColor={"#005ABB"}>
                  {/* Done-for-You Lead Generation{" "} */}
                  {custompricingData.title}
                </SectionTitle>
              </div>
              <Subtitle textColor={"#005ABB"}>
                Lead Generation on Autopilot — So You Can Focus on Closing Deals
              </Subtitle>
              <Description textColor={"#012635"}>
                Struggling to generate leads while closing deals? With Zeitblast’s
                Done-for-You Lead Gen Subscription, we take care of the entire
                lead generation process — no time, expertise, or effort needed on
                your end. You focus on closing deals, we handle the rest.
              </Description>
              <PriceWrapper>
                <PriceNote>Starting at</PriceNote>
                <Price>
                  ${custompricingData.price}{" "}
                  <PriceNote>/{custompricingData.duration}</PriceNote>
                </Price>
              </PriceWrapper>
            </FirstChildContainer>

            {/* Second Child */}
            <SecondChildContainer>
              <IncludedItems>
                <ListItem textColor={"#012635"}>
                  <span className="icon-parent">
                    <div className="icon" textColor={"#005ABB"} />
                    Fully Managed SMS Campaigns
                  </span>
                </ListItem>
                <ListItem style={{ paddingLeft: "27px" }} textColor={"#073F56"}>
                  No need to learn or run campaigns. Our experts handle everything
                  from strategy to execution.
                </ListItem>
                <ListItem textColor={"#012635"}>
                  <span className="icon-parent">
                    <div className="icon" textColor={"#005ABB"} />
                    Virtual Assistant Hiring & Management
                  </span>
                </ListItem>
                <ListItem style={{ paddingLeft: "27px" }} textColor={"#073F56"}>
                  We source, train, and manage skilled VAs to support your lead
                  generation efforts.
                </ListItem>
                <ListItem textColor={"#012635"}>
                  <span className="icon-parent">
                    <div className="icon" textColor={"#005ABB"} />
                    Daily Lead Delivery
                  </span>
                </ListItem>
                <ListItem style={{ paddingLeft: "27px" }} textColor={"#073F56"}>
                  Receive 3+ vetted, qualified leads delivered directly to your
                  CRM every day.
                </ListItem>
                <ListItem textColor={"#012635"}>
                  <span className="icon-parent">
                    <div className="icon" textColor={"#005ABB"} />
                    Complete Operational Oversight
                  </span>
                </ListItem>
                <ListItem style={{ paddingLeft: "27px" }} textColor={"#073F56"}>
                  Forget about the complexities of operations. We handle all
                  logistics, systems, and workflows.
                </ListItem>
                <ListItem textColor={"#012635"}>
                  <span className="icon-parent">
                    <div className="icon" textColor={"#005ABB"} />
                    Seamless CRM Integration
                  </span>
                </ListItem>
                <ListItem style={{ paddingLeft: "27px" }} textColor={"#073F56"}>
                  Leads are automatically pushed to your CRM for easy follow-up
                  and tracking.
                </ListItem>
                <ListItem textColor={"#012635"}>
                  <span className="icon-parent">
                    <div className="icon" textColor={"#005ABB"} />
                    Expert Execution
                  </span>
                </ListItem>
                <ListItem style={{ paddingLeft: "27px" }} textColor={"#073F56"}>
                  Leverage our proven processes and industry knowledge for
                  consistent lead flow.
                </ListItem>
              </IncludedItems>

              <Note textColor={"#012635"}>
                Ready to Free Yourself from Lead Generation Hassles?
              </Note>
              <SecondButtonWrapper>
                <Button onClick={() => setOpen(true)} borderColor={"1px solid #005ABB"} textColor={"#005ABB"}>
                  Learn More
                </Button>
                <Button
                  bgColor={"#005ABB"}
                 
                  // onClick={() => handleClick(custompricingData)}
                 onClick={() => setOpenPausedModal(true)}

                  borderColor={"none"}
                >
                  Get Started
                </Button>
              </SecondButtonWrapper>
            </SecondChildContainer>
          </StyledContainer>
        </div>

        <Components.Common.VideoPlyar open={open} setOpen={setOpen} id={"2g811Eo7K8U"} />
           <SignupPausedModal
          open={openPausedModal}
          handleClose={() => setOpenPausedModal(false)} />
      </Wrapper>
      <TrustWrapper>
        <TrustedBySection>
          <TrustedByText>
            TRUSTED BY YOUR FAVORITE GROUPS & MANY MORE
          </TrustedByText>
          {isMobile ? (
            <Slider {...sliderSettings} style={{ width: "100%" }}>
              {companies.map((item, index) => (
                <LogoWrapper key={index}>
                  <img src={item} alt={`company-logo-${index}`} />
                </LogoWrapper>
              ))}
            </Slider>
          ) : (
            <DesktopLogoWrapper>
              {companies.map((item, index) => (
                <img key={index} src={item} alt={`company-logo-${index}`} />
              ))}
            </DesktopLogoWrapper>
          )}
        </TrustedBySection>
      </TrustWrapper>
      <div style={{ padding: "64px 112px 0", backgroundColor: " #ffffff" }}>
        <MainWrapper>
          <CardWrapper>
            <CardHeader>
              <span>
                {" "}
                <img src="./icons/Group.svg" alt="" width={88} height={24} />
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span>
                  <img
                    src="./icons/star-grouping.svg"
                    alt=""
                    width={96}
                    height={24}
                  />
                </span>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: 400,
                    color: "#777777",
                  }}
                >
                  4.3
                </span>
              </div>
            </CardHeader>
            <ChildContent>
              Zeitblast's text marketing platform revolutionized our lead
              generation process. The implementation was seamless, and within
              weeks, we saw a significant increase in quality leads. Highly
              recommended!
            </ChildContent>
          </CardWrapper>
          <CardWrapper>
            <CardHeader>
              <span>
                {" "}
                <img src="./icons/capterra.svg" alt="" width={88} height={24} />
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span>
                  <img
                    src="./icons/star-grouping.svg"
                    alt=""
                    width={96}
                    height={24}
                  />
                </span>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: 400,
                    color: "#777777",
                  }}
                >
                  4.5
                </span>
              </div>
            </CardHeader>
            <ChildContent>
              The platform's deliverability rates are outstanding. It's
              user-friendly and packed with features that make managing our
              campaigns easy and effective. We particularly love the built-in
              compliance tools.
            </ChildContent>
          </CardWrapper>
          <CardWrapper>
            <CardHeader>
              <span>
                {" "}
                <img src="./icons/reviews.svg" alt="" width={88} height={24} />
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span>
                  <img
                    src="./icons/star-grouping.svg"
                    alt=""
                    width={96}
                    height={24}
                  />
                </span>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: 400,
                    color: "#777777",
                  }}
                >
                  4.6
                </span>
              </div>
            </CardHeader>
            <ChildContent>
              Our response rates have skyrocketed since switching to Zeitblast.
              The integration with our CRM was simple, and the customer support is
              top-notch. It’s a game-changer for our business.
            </ChildContent>
          </CardWrapper>
        </MainWrapper>
      </div>

    </>
  );
};
