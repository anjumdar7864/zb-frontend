import { Flex, H2, H3, Paragraph } from "@/styles/CommonStyles";
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
      bg={`#F7F8FC`}
      padding={`16px`}
      radius={`32px`}
      mdRadius={`32px`}
      style={{ backgroundColor: "#F7F8FC", maxWidth: "100%", height: "100%" }}
      gap={`16px`}
      align={`center`}
      justify={`center`}
    >
      <StyledImage src={data.image} width={"100%"} />
      <Flex
        direction={`column`}
        align="center"
        mdAlign="flex-start"
        smAlign="flex-start"
        xsAlign="flex-start"
        gap={`8px`}
        style={{ maxWidth: "100%", height: "100%" }}
        justify={`center`}
      >
        <Paragraph
          fontSize={`32px`}
          weight="600"
          color={`#012635`}
          xsFontSize={`24px`}
        >
          {data?.title}
        </Paragraph>
        <Paragraph
          fontSize={`18px`}
          weight="400"
          color={`#012635`}
          align="center"
          mdAlign="left"
          smAlign="left"
          xsAlign="left"
        >
          {data?.subTitle}
        </Paragraph>
        <a href={data?.ctaUrl} style={isSmallScreen ? { width: "100%" } : {}}>
          <Components.Common.Button
            text="Learn More"
            style={isSmallScreen ? { width: "100%", padding: "10px 0px" } : {}}
            fontSize={18}
            weight={500}
          />
        </a>
      </Flex>

      <Flex
        direction={`column`}
        gap={`16px`}
        style={{ backgroundColor: "#FFFFFF", maxWidth: "100%", height: "100%" }}
        padding={`24px`}
        radius={`24px`}
      >
        <Flex
          direction={`column`}
          mdDirection={`row`}
          gap={`16px`}
          style={{
            backgroundColor: "#FFFFFF",
            maxWidth: "100%",
            height: "100%",
          }}
        >
    
          <Flex
            direction={`column`}
            style={{ maxWidth: "100%", height: "100%" }}
          >
            <Flex
              direction={`column`}
              style={{ maxWidth: "100%", height: "100%" }}
            >
              <H3 fontSize={`18px`} color={`#012635`} weight={500}>
                {data?.cardTitle}
              </H3>
              <Paragraph
                fontSize={`18px`}
                color={`#012635`}
                weight={400}
                // style={{
                //   whiteSpace: "pre-line",
                // }}
              >
                {data?.cardSubTitle}
              </Paragraph>
            </Flex>
            <Paragraph
              fontSize={`18px`}
              color={`#012635`}
              weight={400}
              style={{ paddingTop: "4px" }}
            >
              {data?.cardDescription}
            </Paragraph>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}