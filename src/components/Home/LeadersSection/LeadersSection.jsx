import React from "react";
import { MainWrapper, InnerWrapper } from "./styles";
import {
  ContainerFluid,
  Flex,
  Grid,
  Paragraph,
} from "@/styles/CommonStyles";
import Components from "@/components";
import theme from "@/theme";
import HomeData from "@/data/HomeData.json";

export default function LeadersSection({scrollToRequestDemoSection , onPricingButtonClick}) {
  return (
    <MainWrapper>
      <ContainerFluid>
        <Flex
          direction={`column`}
          lgDirection={`row`}
          mdPadding={"64px 112px"}
          xlPadding={"64px 0"}
          xxlPadding={"64px 56px"}
          xsPadding={"48px 16px 96px 16px"}
          smPadding={"48px 16px 96px 16px"}
          style={{
            overflow: "hidden",
            borderTopLeftRadius: "30px",
            borderTopRightRadius: "30px",

            display: "flex",
          }}
          gap={"10px"}
          xxlGap="140px"
          xlGap="138px"
          lgGap="138px"
          mdGap="10px"
        >
          <Flex
            align={`center`}
            lgAlign={`flex-start`}
            xlgAlign={`flex-start`}
            xxlgAlign={`flex-start`}
            direction={`column`}
            justify={`center`}
            padding={`0`}
            gap={"8px"}
          >
            <Paragraph
              color="#FFFFFF"
              fontSize={`38px`}
              weight="600"
              align="center"
              lgAlign={`left`}
              xlgAlign={`left`}
              xxlgAlign={`left`}
            >
              Leaders in SMS Lead Generation
            </Paragraph>
            <Paragraph
              color="#FFFFFF"
              fontSize={`16px`}
              weight="400"
              align="center"
              lgAlign={`left`}
              xlgAlign={`left`}
              xxlgAlign={`left`}
            >
              Proud to be recognized as a top-rated platform for real estate and
              marketing professionals.
              <br />
              Zeitblast empowers real estate professionals and marketers to
              generate more leads, close more deals, and scale their businesses
              with confidence.
            </Paragraph>
            <Flex
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "15px",
                paddingTop: "15px",
              }}
            >
              <Components.Common.Button
                text="Get Started"
                bgColor={`#FFFFFF`}
                fontSize={`18px`}
                style={{ fontWeight: "500", }}
                color={theme.colors.tertiary}
                onClick={onPricingButtonClick}
              />

              <Components.Common.Button
                text="Request a Demo"
                fontSize={`18px`}
                bgColor={theme.colors.tertiary}
                color={theme.colors.white}
                style={{ border: "1px solid #FFFFFF", }}
                onClick={scrollToRequestDemoSection}

              />
            </Flex>
          </Flex>
          <Flex>
            <img src="./images/home/certificates.png" width={`100%`} />
          </Flex>
        </Flex>
      </ContainerFluid>
      <InnerWrapper>
      
        <Flex
          direction={`column`}
          justify={`center`}
          align={`center`}
          gap={`8px`}
        >
          <Paragraph
            align="center"
            fontSize={`38px`}
            xsFontSize={`32px`}
            color="#012635"
            weight="600"
          >
            Smarter conversations, in a few minutes
          </Paragraph>
          <Paragraph
            fontSize={`18px`}
            xsFontSize="16px"
            weight="400"
            align="center"
            color="#012635"
          >
            User-friendly text marketing packed with powerful features.{" "}
          </Paragraph>
        </Flex>

        <ContainerFluid>
          <Flex align="center" justify="center">
            <Flex maxWidth="100%">
              <Grid
                columns="1fr" // Default single column
                lgColumns="repeat(2, 1fr)" // Two columns on larger screens
                gap="32px" // Spacing between rows and columns
                xsGap="32px"
                padding="24px"
                xsPadding="0"
                justifyItems="center" // Center items horizontally
                alignItems="start" // Align items to the top
              >
                {HomeData?.featuresSection?.data?.map((item, index) => (
                  <Components.Common.FeaturesCard key={index} data={item} />
                ))}
              </Grid>
            </Flex>
          </Flex>
        </ContainerFluid>
      </InnerWrapper>
    </MainWrapper>
  );
}