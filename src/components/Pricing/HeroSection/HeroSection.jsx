import React, { useState } from "react";
import { Flex } from "@/styles/CommonStyles";
import {
  Wrapper,
  ContentWrapper,
  Heading,
  Subheading,
  InnerWrapper,
  DurationWrapper,
  CountryWrapper,
  ButtonWrapper,
  Label,
  CountryText,
  TextContainer,
  DurationButton,
  AnnualText,
  AnnualPercentage,
} from "./style";
import { PricingPlans } from "..";

export default function HeroSection() {
  const [isMonthly, setIsMonthly] = useState(true);
  const [noOfUser, setNoOfUsers] = useState(0);

  const handleAnnuallyClick = () => {
    setIsMonthly(false);
  };

  const handleMonthlyClick = () => {
    setIsMonthly(true);
  };

  const handleUserNumber = (sign) => {
    if (sign === "+") {
      setNoOfUsers(noOfUser + 1);
    } else {
      if (noOfUser > 0) {
        setNoOfUsers(noOfUser - 1);
      }
    }
  };

  return (
    <>
      <Wrapper>
        <ContentWrapper>
          <Flex
            alignItems={`center`}
            gap="24px"
            direction={`column`}
            justify={`center`}
          >
            <Heading>
              Flexible Pricing Plans for Your
              <br />
              Lead Generation Needs
            </Heading>
            <Subheading>
              Everything you need to turn conversations into business results.
            </Subheading>
          </Flex>
        </ContentWrapper>
        <div style={{maxWidth: "1440px", margin: "auto",  width: "100%"}}>
          <InnerWrapper>
            <DurationWrapper>
              <DurationButton
                onClick={handleAnnuallyClick}
                selected={!isMonthly}
                bgColor={!isMonthly ? "#000000" : "#FFFFFF"}
                textColor={!isMonthly ? "#FFFFFF" : "#777777"}
              >
                <AnnualText textColor={!isMonthly ? "#FFFFFF" : "#777777"}>
                  Annually
                </AnnualText>
                <AnnualPercentage
                  textColor={!isMonthly ? "#FFFFFF" : "#777777"}
                  borderColor={
                    !isMonthly ? "1px solid #FFFFFF66" : "1px solid #777777"
                  }
                >
                  -20%
                </AnnualPercentage>
              </DurationButton>

              <DurationButton
                onClick={handleMonthlyClick}
                selected={isMonthly}
                bgColor={isMonthly ? "#000000" : "#FFFFFF"}
                textColor={isMonthly ? "#FFFFFF" : "#777777"}
              >
                Monthly
              </DurationButton>
            </DurationWrapper>

            <CountryWrapper>
              <TextContainer>
                <Label>Country</Label>
                <CountryText>United States</CountryText>
              </TextContainer>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="./icons/drop-down-arrow.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
            </CountryWrapper>

            <ButtonWrapper>
              <TextContainer>
                <Label>Estimated Users</Label>
                <CountryText>{noOfUser}</CountryText>
              </TextContainer>
              <div
                style={{ display: "flex", alignItems: "flex-end", gap: "12px" }}
              >
                <img
                  src="./icons/MinusIcon.svg"
                  alt=""
                  width={32}
                  height={32}
                  onClick={() => {
                    handleUserNumber("-");
                  }}
                />
                <img
                  src="./icons/PlusIcon.svg"
                  alt=""
                  width={32}
                  height={32}
                  onClick={() => {
                    handleUserNumber("+");
                  }}
                />
              </div>
            </ButtonWrapper>
          </InnerWrapper>
        </div>

      </Wrapper>
      <PricingPlans isMonthly={isMonthly} />
    </>
  );
}
