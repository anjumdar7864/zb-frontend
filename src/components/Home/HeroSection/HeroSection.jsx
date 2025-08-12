
import React, { useEffect, useState , forwardRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Components from "@/components";
import companies from "@/assets/icons";
import { useNavigate } from "react-router-dom";
import {
  Wrapper,
  ContentWrapper,
  Heading,
  Subheading,
  ImageWrapper,
  TrustedBySection,
  TrustedByText,
  LogoWrapper,
  DesktopLogoWrapper,
  SearchBarWrapper,
} from "./styles";
import { Flex } from "@/styles/CommonStyles";

 const HeroSection = forwardRef(({ onPricingButtonClick }, ref)=> {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 3000,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
  };

  const navigate = useNavigate();

  return (
    <Wrapper ref={ref}>
      <ContentWrapper>
        <Flex
          alignItems={`center`}
          gap="24px"
          direction={`column`}
          justify={`center`}
        >
          <Heading>
            Generate More Leads &<br /> Close More Deals
          </Heading>
          <Subheading>
            Create Opportunities with Us! Become a Zeitblast Partner <br />
            and Accelerate Your Real Estate Success.
          </Subheading>
          <Flex
            display="block"
            smDisplay="none"
            mdDisplay="none"
            lgDisplay="none"
          >
            <Components.Common.Button
              fontSize="18px"
              weight="500"
              text="Get Free Access"
              style={{ width: "100%" }}
              // onClick={()=>{navigate('/signup')}}
              onClick={onPricingButtonClick}
            />
          </Flex>
          <SearchBarWrapper>
            <Components.Common.SearchBar />
          </SearchBarWrapper>
        </Flex>{" "}
        <ImageWrapper>
          <img src="./images/home/herosection.png" alt="Hero Section" />
        </ImageWrapper>
      </ContentWrapper>
      <TrustedBySection>
        <TrustedByText>
          TRUSTED BY YOUR FAVORITE GROUPS & MANY MORE
        </TrustedByText>
        {isMobile ? (
          <Slider {...sliderSettings} style={{ width: "100%" }}>
            {companies.map((item, index) => (
              <LogoWrapper key={index}>
                <img src={item} alt={`company-logo-${index}`} />
              </LogoWrapper>
            ))}
          </Slider>
        ) : (
          <DesktopLogoWrapper>
            {companies.map((item, index) => (
              <img key={index} src={item} alt={`company-logo-${index}`} />
            ))}
          </DesktopLogoWrapper>
        )}
      </TrustedBySection>
    </Wrapper>
  );
})

export default HeroSection;