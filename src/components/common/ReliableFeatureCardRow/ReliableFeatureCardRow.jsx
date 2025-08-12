import { Flex, Paragraph } from "@/styles/CommonStyles";
import React, { useEffect, useState } from "react";
import { StyledImage } from "./styles";
import Components from "@/components";

export default function ReliableFeatureCard({ data }) {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Flex
      direction="column"
      lgDirection="row"
      gap="48px"
      bg="#012635"
      padding="48px"
      xsPadding="16px"
      xsGap="16px"
      radius="32px"
      color="#FFFFFF"
      style={{
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        backgroundColor: "#012635",
        width: "100%",
        maxWidth: "100%",
      }}
    >
      {/* First Div: Image Section */}
      <Flex
        justify="center"
        align="center"
        style={{
          width: "100%",
          borderRadius: "24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <StyledImage
          src={data.cardImage}
          style={{
            borderRadius: "12px",
            // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        />
      </Flex>

      {/* Second Div: Content Section */}
      <Flex
        direction="column"
        gap="24px"
        padding="48px"
        style={{
          width: "100%",
          maxWidth: "100%",
          height: "auto",
          backgroundColor: "#012635",
          borderRadius: "24px",
          overflow: "hidden",
        }}
        mdPadding="16px 0 0 0"
        smPadding="16px 0 0 0"
        xsPadding="16px 0 0 0"
        xsGap="16px"
      >
        {/* Title Section */}
        <Paragraph
          fontSize="32px"
          weight="600"
          style={{
            lineHeight: "40px",
            color: "#FFFFFF",
            width: "536px",
          }}
          xsFontSize="24px"
        >
          True Accurate Deliverability
        </Paragraph>

        {/* Subtitle Section */}
        <Paragraph
          style={{
            fontSize: "18px",
            fontWeight: "400",
            lineHeight: "26px",
            color: "#D3D7DD",
            width: "536px",
          }}
        >
          Achieve the highest deliverability rates in the industry with our
          service. Your messages will reach the right audience, maximizing your
          lead generation efforts.
        </Paragraph>

        {/* Button Section */}
        <a href={data?.ctaUrl} style={isSmallScreen ? { width: "100%" } : {}}>
          <Components.Common.Button
            text="Learn More"
            bgColor="#FFFFFF"
            color="#000000"
            style={{
              height: "48px",
              padding: "10px 20px",
              borderRadius: "40px",
              fontSize: "16px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: isSmallScreen ? "100%" : "135px",
            }}
          />
        </a>

        {/* Testimonial Section */}
        <Flex
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: "24px",
            borderRadius: "24px",
            gap: "16px",
            maxWidth: "100%",
          }}
          direction={`column`}
          // lgDirection={``}
          // xsDirection={`column`}
        >
          <Paragraph
            style={{
              fontSize: "18px",
              fontWeight: "400",
              lineHeight: "24px",
              color: "#FFFFFF",
            }}
          >
            Nicole Lalabam
            <br />
            Operation Manager @ Yuna Homes
          </Paragraph>
          <Paragraph
            style={{
              fontSize: "18px",
              fontWeight: "400",
              lineHeight: "24px",
              color: "#FFFFFF",
            }}
          >
            The deliverability of our messages has been phenomenal. We've seen a
            significant increase in responses and engagement.
          </Paragraph>
        </Flex>
      </Flex>
    </Flex>
  );
}