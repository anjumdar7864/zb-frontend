import Components from "@/components";
import { Flex, Grid, H2 } from "@/styles/CommonStyles";
import React from "react";
import HomeData from "@/data/HomeData.json";

export default function ReliableSection() {
  return (
    <>
      <Flex
        direction="column"
        align={`center`}
        justify={`center`}
        xlPadding={"32px 112px"}
        xxlPadding={"32px 112px"}
        padding={"32px 112px"}
        lgPadding={"32px 112px"}
        mdpadding="48px 16px"
        smPadding={"48px 16px"}
        xsPadding={"48px 16px"}
        xxlggap={`56px`}
        xlggap={`56px`}
        lggap={`32px`}
        xsGap={"32px"}
        gap={"32px"}
        style={{ width: "100%" }}
      >
        <H2
          fontSize={`38px`}
          xsFontSize={`32px`}
          weight={`600`}
          color={`#012635`}
          padding={`5px`}
          align={`center`}
        >
          {HomeData?.ReliabailitySection?.title}
        </H2>
        <Grid
          columns="repeat(1, 1fr)" // One column on mobile
          lgColumns="repeat(2, 1fr)" // Two columns on large screens and above
          gap="32px" // Example gap, adjust as needed
          justify="center"
          justifyItems={`center`}
          style={{ backgroundColor: " #ffffff", width: "100%" }}
          align={`center`}
        >
          {HomeData?.ReliabailitySection?.data?.map((item, index) => (
            <Components.Common.ReliableCard key={index} data={item} />
          ))}
        </Grid>
      </Flex>
      <Flex
        xlPadding={"32px 112px"}
        xxlPadding={"32px 112px"}
        padding={"32px 112px"}
        lgPadding={"32px 112px"}
        mdpadding="48px 16px"
        smPadding={"48px 16px"}
        xsPadding={"48px 16px"}
        direction="column"
        align={`center`}
        xxlggap={`56px`}
        xlggap={`56px`}
        lggap={`32px`}
        xsGap={"32px"}
        gap={"32px"}
        style={{ width: "100%" }}
        justify={`center`}
      >
        <Components.Common.ReliableCardRow
          data={HomeData?.ReliabailitySection?.data[0]}
        />
      </Flex>
    </>
  );
}