import React from "react";
import {
  ImgBox,
  LearnButton,
  StyledImg,
  TeamBox,
  TeamContainer,
  TeamImgBox,
  TopDiv,
} from "./styles";
import { Flex, Grid, P } from "@/styles/CommonStyles";
import {
  team,
  teamimg,
  teamimg1,
  teamimg2,
  teamimg3,
  teamimg4,
} from "@/assets/images";
import { HoverableFlex } from "@/components/common/MenuItem/styles";
import { IoIosArrowForward } from "react-icons/io";
import { Button } from "@/components/common";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import companies, { companies1 } from "@/assets/icons";

export default function TeamSection() {
  const TeamData = [
    {
      pic: teamimg,
      head: "[Spota Home]",
      description:
        "Seamless Integration and Outstanding Results We chose Zeitblast because of its seamless integration with our existing systems and the outstanding results we've achieved. Within days, our team was generating high-quality leads and improving our conversion rates significantly.",
      name: "Alexis Martinez",
      position: "Head of Sales, RealEstatePro",
    },
    {
      pic: teamimg,
      head: "[Spota Home]",
      description:
        "Seamless Integration and Outstanding Results We chose Zeitblast because of its seamless integration with our existing systems and the outstanding results we've achieved. Within days, our team was generating high-quality leads and improving our conversion rates significantly.",
      name: "Alexis Martinez",
      position: "Head of Sales, RealEstatePro",
    },
    {
      pic: teamimg,
      head: "[Spota Home]",
      description:
        "Seamless Integration and Outstanding Results We chose Zeitblast because of its seamless integration with our existing systems and the outstanding results we've achieved. Within days, our team was generating high-quality leads and improving our conversion rates significantly.",
      name: "Alexis Martinez",
      position: "Head of Sales, RealEstatePro",
    },
  ];
  const settings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  return (
    <TeamContainer>
      <Flex
        justify="center"
        align="center"
        gap="10%"
        lgDirection="row"
        direction="column"
      >
        <Flex direction="column" gap="15px" align="left">
          <img src={team} alt="" width={"80px"} height={"80px"} />
          <P color="white" fontSize="32px" fontweight="600">
            We believe in our teams.
          </P>
          <P color="white" fontSize="24px" fontweight="400" lineHeight="32px">
            Zeitblast is on a mission, and our culture is the foundation of our
            success.
          </P>
          <P color="#D5D5D6" fontSize="16px" fontweight="400" lineHeight="26px">
            We learn, experiment, and improve each day. We approach new
            initiatives with enthusiasm and are committed to achieving success —
            for ourselves as individuals, for our team, and most importantly,
            for our customers, who inspire us in everything we do. Our diverse
            team spans the globe, with members from various countries, bringing
            unique perspectives and expertise to Zeitblast.
          </P>
          <HoverableFlex>
            <P fontSize="14px" color="white" fontweight="600" lineHeight="26px">
              Learn more
            </P>
            <IoIosArrowForward color="#1F5AFF" size={15} />
          </HoverableFlex>
        </Flex>
        <Grid
          columns="repeat(1, 1fr)"
          mdColumns="repeat(2, 1fr)"
          gap="25px"
          padding="16px"
          margin="0 auto"
          justify="center"
          justifyItems={`center`}
        >
          <Flex position="relative">
            <ImgBox>
              <img src={teamimg1} alt="" />
            </ImgBox>
            <TopDiv top="70%">
              <P
                fontSize="20px"
                color="white"
                fontweight="500"
                lineHeight="26px"
              >
                $226 million
              </P>
              <P
                fontSize="12px"
                color="white"
                fontweight="300"
                lineHeight="16px"
              >
                in venture funding
              </P>
            </TopDiv>
          </Flex>
          <Flex position="relative">
            <ImgBox pt="70px">
              <StyledImg src={teamimg2} width={"100%"} alt="" />
            </ImgBox>
            <TopDiv top="70%">
              <P
                fontSize="20px"
                color="white"
                fontweight="500"
                lineHeight="26px"
              >
                15,000+
              </P>
              <P
                fontSize="12px"
                color="white"
                fontweight="300"
                lineHeight="16px"
              >
                customers around the world
              </P>
            </TopDiv>
          </Flex>
          <Flex position="relative">
            <ImgBox>
              <StyledImg src={teamimg3} alt="" />
            </ImgBox>
            <TopDiv top="50%">
              <P
                fontSize="20px"
                color="white"
                fontweight="500"
                lineHeight="26px"
              >
                84
              </P>
              <P
                fontSize="12px"
                color="white"
                fontweight="300"
                lineHeight="16px"
              >
                countries with ZeitBlast
              </P>
            </TopDiv>
          </Flex>
          <Flex position="relative">
            <ImgBox>
              <StyledImg src={teamimg4} alt="" />
            </ImgBox>
            <TopDiv top="73%">
              <P
                fontSize="20px"
                color="white"
                fontweight="500"
                lineHeight="26px"
              >
                800+
              </P>
              <P
                fontSize="12px"
                color="white"
                fontweight="300"
                lineHeight="16px"
              >
                friendly team members
              </P>
            </TopDiv>
          </Flex>
        </Grid>
      </Flex>

      <Flex align="center" paddingTop="7%" direction="column" lgDirection="row">
        <Flex direction="column" gap="10px" mdWidth="30%" width="100%">
          <P color="white" fontSize="35px" lineHeight="40px" fontweight="600">
            They believe in Zeitblast
          </P>
          <LearnButton>Learn More</LearnButton>
        </Flex>
        <div style={{ width: "70%" }}>
          <Slider {...settings}>
            {TeamData.map((item, index) => {
              return (
                <div key={index} style={{ width: "100%" }}>
                  <TeamBox>
                    <Flex align="center" justify="space-between">
                      <TeamImgBox src={item.pic} alt="" />
                      <P color="#32B496">{item.head}</P>
                    </Flex>
                    <P
                      color="white"
                      fontSize="12px"
                      fontweight="300"
                      paddingTop="10px"
                    >
                      {item.description}
                    </P>
                    <Flex direction="column" paddingTop="10px">
                      <P color="white" fontSize="14px" fontweight="500">
                        {item.name}
                      </P>
                      <P color="white" fontSize="14px" fontweight="400">
                        {item.position}
                      </P>
                    </Flex>
                  </TeamBox>
                </div>
              );
            })}
          </Slider>
        </div>
      </Flex>

      <Flex direction="column" gap="15px" paddingY="5%" paddingTop="13%">
        <P
          fontSize="16px"
          fontWeight="600"
          color="white"
          lineHeight="24px"
          opacity="50%"
          textAlign="center"
        >
          TRUSTED BY 18,000+ COMPANIES.
        </P>
        <Flex
          align="center"
          justify="center"
          gap="5%"
          overflowX="auto"
          width="100%"
          paddingY="10px"
        >
          {companies1.map((item, index) => {
            return <img key={index} src={item} alt="" />;
          })}
        </Flex>
      </Flex>
    </TeamContainer>
  );
}
