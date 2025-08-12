import React from "react";
import {
  Container,
  Flex,
  FlexCol,
  FlexRowExtra,
  FooterBottom,
  ImageWrapper,
  LogoWrapper,
  ShowIcon,
} from "./style";
import { FlexRow, Paragraph, SpaceY } from "@/styles/CommonStyles";
import Assets from "@/assets";
import { Link } from "react-router-dom";
import { Company, Feature, Product, Resources, Solutions } from "@/libs/data";

const Footer = ({ round }) => {
  return (
    <Container round={round}>
      <Flex padding={"0"}>
        {/* First Column */}
        <FlexCol>
          <SpaceY spacing={"2.5rem"}>
            <ImageWrapper>
              <img src="./icons/Brand-logo.svg" alt="ZeitBlast" />
            </ImageWrapper>
            <Paragraph
              weight={"500"}
              color="#FFFFFF"
              fontSize={"24px"}
              paddingY="1rem"
            >
              The phone system for modern business
            </Paragraph>
            <Paragraph weight={"400"} fontSize={"16px"} color="#FFFFFF">
              Follow us
            </Paragraph>
            <FlexRow gap={"20px"}>
              {["facebook", "twitter", "linkdin", "instagram", "youtube"].map(
                (platform, index) => (
                  <Link to={"#"} target="_blank" key={index}>
                    <LogoWrapper>
                      <img src={Assets.Images[platform]} alt={platform} />
                    </LogoWrapper>
                  </Link>
                )
              )}
            </FlexRow>
            <Paragraph weight={"400"} fontSize={"16px"} color="#FFFFFF">
              Mobile app
            </Paragraph>
            <FlexRow gap={"20px"}>
              {[
                { name: "apple", alt: "Apple Store" },
                { name: "playstore", alt: "Google Play Store" },
              ].map((app, index) => (
                <Link to={"#"} target="_blank" key={index}>
                  <LogoWrapper>
                    <img src={Assets.Images[app.name]} alt={app.alt} />
                  </LogoWrapper>
                </Link>
              ))}
            </FlexRow>
          </SpaceY>
        </FlexCol>

        {/* First Row - Solutions, Product, Features */}
        <FlexCol>
          <Paragraph
            weight={"700"}
            fontSize={"20px"}
            paddingBottom={"20px"}
            color="#FFFFFF"
          >
            Solutions
          </Paragraph>
          <FlexCol>
            <SpaceY>
              {Solutions.map((data, index) => (
                <Paragraph
                  key={index}
                  weight={"400"}
                  fontSize={"16px"}
                  color="#FFFFFF"
                >
                  <Link className="hover-div" to={data.link}>
                    {data.title}
                  </Link>
                </Paragraph>
              ))}
            </SpaceY>
          </FlexCol>
        </FlexCol>

        <FlexCol>
          <Paragraph
            weight={"700"}
            fontSize={"20px"}
            paddingBottom={"10px"}
            color="#FFFFFF"
          >
            Product
          </Paragraph>
          <FlexCol>
            <SpaceY>
              {Product.map((data, index) => (
                <Paragraph
                  key={index}
                  weight={"400"}
                  fontSize={"16px"}
                  color="#FFFFFF"
                >
                  <Link className="hover-div" to={data.link}>
                    {data.title}
                  </Link>
                </Paragraph>
              ))}
            </SpaceY>
          </FlexCol>
        </FlexCol>

        <FlexCol>
          <Paragraph
            weight={"700"}
            fontSize={"20px"}
            paddingBottom={"10px"}
            color="#FFFFFF"
          >
            Features
          </Paragraph>
          <FlexCol>
            <SpaceY>
              {Feature.map((data, index) => (
                <Paragraph
                  key={index}
                  weight={"400"}
                  fontSize={"16px"}
                  color="#FFFFFF"
                >
                  <Link className="hover-div" to={data.link}>
                    {data.title}
                  </Link>
                </Paragraph>
              ))}
            </SpaceY>
          </FlexCol>
        </FlexCol>
      </Flex>

      {/* Second Row - Resources, Company */}
      <Flex>
        <FlexCol></FlexCol>
        <FlexCol>
          <Paragraph
            weight={"700"}
            fontSize={"20px"}
            paddingBottom={"10px"}
            color="#FFFFFF"
          >
            Resources
          </Paragraph>
          <FlexCol>
            <SpaceY>
              {Resources.map((data, index) => (
                <Paragraph
                  key={index}
                  weight={"400"}
                  fontSize={"16px"}
                  color="#FFFFFF"
                >
                  <Link className="hover-div" to={data.link}>
                    {data.title}
                  </Link>
                </Paragraph>
              ))}
            </SpaceY>
          </FlexCol>
        </FlexCol>

        <FlexCol>
          <Paragraph
            weight={"700"}
            fontSize={"20px"}
            paddingBottom={"10px"}
            color="#FFFFFF"
          >
            Company
          </Paragraph>
          <FlexCol>
            <SpaceY>
              {Company.map((data, index) => (
                <Paragraph
                  key={index}
                  fontweight={"300"}
                  fontSize={"16px"}
                  color="#FFFFFF"
                >
                  <Link className="hover-div" to={data.link}>
                    {data.title}
                  </Link>
                </Paragraph>
              ))}
            </SpaceY>
          </FlexCol>
        </FlexCol>
        <FlexCol>
          <ShowIcon>
            <img src="./icons/signature.svg" alt="ZeitBlast" />
          </ShowIcon>
        </FlexCol>
      </Flex>
      <FooterBottom>
        <Paragraph
          weight={"400"}
          fontSize={"14px"}
          opacity={"50%"}
          color="#FFFFFF"
        >
          Copyright ZeitBlast 2024
        </Paragraph>
        <FlexRowExtra gap={"30px"}>
          {[
            "Legal",
            "Privacy Policy",
            "Security",
            "Sitemap",
            "Cookies Preferences",
          ].map((item, idx) => (
            <Paragraph
              fontweight={"400"}
              fontSize={"16px"}
              key={idx}
              opacity={"50%"}
              color="#FFFFFF"
            >
              {item}
            </Paragraph>
          ))}
        </FlexRowExtra>
      </FooterBottom>
    </Container>
  );
};

export default Footer;
