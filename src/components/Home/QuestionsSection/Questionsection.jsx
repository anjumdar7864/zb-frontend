import {
  H2,
  Paragraph,
} from "@/styles/CommonStyles";
import React from "react";
import {
  Button,
  ContainerQuestion,
  LogoWrapper,
  TopSection,
} from "./styles";
import Assets from "@/assets";
import { AskedQuestions } from "./AskedQuestions";

export const Questionsection = ({scrollToRequestDemoSection}) => {
  return (
    <ContainerQuestion>
      <TopSection>
        <LogoWrapper>
          {/* <img src={Assets.Images.sidebar_logoA} alt="ZeitBlast" /> */}
          <img src="./icons/Brand-logo.svg" alt="ZeitBlast" />
        </LogoWrapper>
        <H2
          style={{ textAlign: "center" }}
          weight={"700"}
          fontSize={"38px"}
          xsFontSize="32px"
          color="#FFFFFF"
        >
          Not sure what plan is best for you?
        </H2>
        <Paragraph
          color="#FFFFFF"
       
          style={{ textAlign: "center" }}
          weight={"400"}
          fontSize={"24px"}
          xsFontSize="18px"
        >
          See how our system can work for your business
        </Paragraph>
        <Button onClick={scrollToRequestDemoSection}>Request a Demo</Button>
      </TopSection>
      <AskedQuestions />
    </ContainerQuestion>
  );
};