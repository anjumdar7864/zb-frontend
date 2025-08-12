import React from "react";
import {
  Button,
  ButtonBox,
  CustomSolutionBox,
  ItemBox,
  LogoWrapper,
  TopSection,
} from "./styles";
import { Flex, Grid, P } from "@/styles/CommonStyles";
import { stepicon } from "@/assets/icons";
import Assets from "@/assets";

export default function CustomSolutions() {
  return (
   
    <div
      style={{
        paddingRight: "10%",
        paddingLeft: "10%",
        paddingTop: "2%",
        backgroundColor: "#FFFFFF",
      }}
    >
      <CustomSolutionBox>
        <Grid
          columns="repeat(1, 1fr)"
          lgColumns="repeat(2, 1fr)"
          padding="16px"
          gap={`2rem`}
          mdGap={`2rem`}
          margin="0 auto"
          justify="center"
          justifyItems={`center`}
        >
          <Flex direction="column" textAlign="center" mdtextAlign="left">
            <Flex align="center" gap="5px" justify="center" mdJustify="left">
              <img src={stepicon} alt="" />
              <P fontSize="18px" fontweight="400" color="white">
                Step 1 of 6
              </P>
            </Flex>
            <P fontSize="38px" fontweight="700" color="white">
              Get a personalized quote for free
            </P>
            <P fontSize="24px" fontweight="200" color="white">
              Please answer a few questions to receive your customized plan
              today
            </P>
          </Flex>
          <Flex direction="column" gap="12px">
            <P fontSize="20px" fontweight="600" color="white">
              Why are you looking for a custom solution?
            </P>
            <Flex gap="2%">
              <ItemBox>
                <P fontSize="16px" fontweight="300" color="white">
                  Pricing
                </P>
              </ItemBox>
              <ItemBox>
                <P fontSize="16px" fontweight="300" color="white">
                  Integrations
                </P>
              </ItemBox>
            </Flex>
            <Flex gap="2%">
              <ItemBox>
                <P fontSize="16px" fontweight="300" color="white">
                  White labeling
                </P>
              </ItemBox>
              <ItemBox>
                <P fontSize="16px" fontweight="300" color="white">
                  Outbound allowance
                </P>
              </ItemBox>
            </Flex>
            <Flex gap="2%">
              <ItemBox>
                <P fontSize="16px" fontweight="300" color="white">
                  Support
                </P>
              </ItemBox>
              <ItemBox>
                <P fontSize="16px" fontweight="300" color="white">
                  Features
                </P>
              </ItemBox>
            </Flex>
            <ItemBox>
              <P fontSize="16px" fontweight="300" color="white">
                Other
              </P>
            </ItemBox>

            <ButtonBox bgColor="white">Next</ButtonBox>
          </Flex>
        </Grid>
      </CustomSolutionBox>

  <TopSection>
        <LogoWrapper>
          <img
            style={{ width: "30px" }}
            src={Assets.Images.sidebar_logoA}
            alt="ZeitBlast"
          />
        </LogoWrapper>
        <P fontweight={"700"} fontSize={"38px"} color="white">
          Not sure what plan is best for you?
        </P>
        <P fontweight={"400"} fontSize={"24px"} color="white">
          See how our system can work for your business
        </P>
        <Button>Request a Demo</Button>
      </TopSection> 
    </div>
  );
}
