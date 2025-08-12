import { H2, Paragraph } from "@/styles/CommonStyles";
import React from "react";
import { Button, ContainerQuestion, LogoWrapper, TopSection } from "./styles";
import Assets from "@/assets";
import { AskedQuestions } from "./AskedQuestions";
import { useNavigate } from "react-router-dom";

export const Questionsection = () => {
  const navigate = useNavigate();
  return (
    <ContainerQuestion>
      <TopSection>
        <LogoWrapper>
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
        <Button onClick={()=> navigate('/?section=request')}>Request a Demo</Button>
      </TopSection>
      <AskedQuestions />
    </ContainerQuestion>
  );
};
