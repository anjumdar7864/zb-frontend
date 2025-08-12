import { Flex, H2, Paragraph } from "@/styles/CommonStyles";
import React from "react";
import { ImageWrapper } from "./styles";
export default function FeaturesCard({ data }) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="space-between"
      style={{
        maxWidth: "100%",
      }}
    >
      <ImageWrapper>
        <img
          src={data?.image}
          style={{
            maxWidth: "100%",
            height: "auto",
            objectFit: "contain",
          }}
          alt={data?.title || "Feature image"}
        />
      </ImageWrapper>

      <Flex
        direction={`column`}
        gap={`8px`}
        align={`center`}
        justify={`center`}
      >
        <H2 fontSize={`32px`} weight={`600`} color={`#012635`} xsFontSize={`24px`} align={"center"} >
          {data?.title}
        </H2>
        <Paragraph
          align="center"
          fontSize="18px"
          color="#777777"
        >
          {data?.description}
        </Paragraph>
        <a href={data?.ctaUrl}>
          <Flex
            style={{
              display: "flex",
              gap: "12px",
              flexDirection: "row",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <Paragraph
              fontSize={`18px`}
              weight={`500`}
              color={`#012635`}
            >
              {data?.cta}
            </Paragraph>
            <img src="./icons/arrow-left.svg" alt="" width={24} height={24} />
          </Flex>
        </a>
      </Flex>
    </Flex>
  );
}