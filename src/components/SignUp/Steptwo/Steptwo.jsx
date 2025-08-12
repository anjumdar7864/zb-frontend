import { Flex, H1, P, Paragraph } from "@/styles/CommonStyles";
import theme from "@/theme";
import React, { useEffect } from "react";
import { RoundButton, StepTwoOption } from "./styles";
import { FaArrowLeft } from "react-icons/fa";
import Components from "@/components";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { SlArrowLeft } from "react-icons/sl";
import { RiArrowLeftSLine } from "react-icons/ri";

export default function Steptwo({
  nextStep,
  prevStep,
  formData,
  handleChange,
  errors,
}) {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Add smooth scrolling
    });
  }, []);
  return (
    <>
      <Flex width={`100%`} direction={`column`} gap={`16px`} paddingX={`1rem`}>
        <P
          color={theme.colors.white}
          fontSize={`38px`}
          fontweight={`600`}
          lineHeight="46px"
          paddingLeft="2rem"
          paddingRight="2rem"
          // paddingBottom={"15px"}
          textAlign="center"
      
        >
          Whats your Experience Level in Real Estate ?
        </P>
        <Paragraph color="#FFFFFF99" fontSize={`16px`} fontweight={`500`} lineHeight="24px" align={`center`}>
          This enables us to recommend the best options for your business
        </Paragraph>
        <Flex  direction="row" gap={`16px`} width={`100%`}>
          <div
            style={{
              width: "100%",
              "@media (min-width: 768px)": {
                
                width: "50%", 
              },
            }}
          >
            <StepTwoOption
              active={formData.experienceLevel == "Beginner" ? true : false}
              data-id="Beginner"
              onClick={(e) => handleChange(e)}
            >
              Beginner
            </StepTwoOption>
          </div>
          <div
            style={{
              width: "100%",
              "@media (min-width: 768px)": {
                // Example breakpoint for md
                width: "50%", // Full width on small screens
              },
            }}
          >
            <StepTwoOption
              active={formData.experienceLevel == "Intermediate" ? true : false}
              data-id="Intermediate"
              onClick={(e) => handleChange(e)}
            >
              Intermediate
            </StepTwoOption>
          </div>
        </Flex>
        <Flex  direction="row" gap={`16px`} width={`100%`}>
          <div
            style={{
              width: "100%",
              "@media (min-width: 768px)": {
                // Example breakpoint for md
                width: "50%", // Full width on small screens
              },
            }}
          >
            <StepTwoOption
              active={formData.experienceLevel == "Advanced" ? true : false}
              data-id="Advanced"
              onClick={(e) => handleChange(e)}
            >
              Advanced
            </StepTwoOption>
          </div>
          <div
            style={{
              width: "100%",
              "@media (min-width: 768px)": {
                // Example breakpoint for md
                width: "50%", // Full width on small screens
              },
            }}
          >
            <StepTwoOption
              active={formData.experienceLevel == "Expert" ? true : false}
              data-id="Expert"
              onClick={(e) => handleChange(e)}
            >
              Expert
            </StepTwoOption>
          </div>
        </Flex>
        <StepTwoOption
          data-id="Veteran"
          active={formData.experienceLevel == "Veteran" ? true : false}
          onClick={(e) => handleChange(e)}
        >
          Veteran
        </StepTwoOption>
        <Paragraph color="#f4516c" fontSize={`1.04rem`} paddingY="0.5rem">
          {errors.experienceLevel}
        </Paragraph>
        <Flex width={`100%`} gap="1.5rem" mdGap="1rem" align="center">
          <div style={{ width: "10%" }}>
            <RoundButton onClick={prevStep}>
            <RiArrowLeftSLine size={24}/>
            </RoundButton>
          </div>
          <div style={{ width: "90%", marginLeft: "12px" }}>
            <Components.Common.Button
              bgColor={theme.colors.white}
              hoverTextColor={theme.colors.white}
              hoverColor={`rgba(255, 255, 255, 0.1)`}
              text={`Next`}
              color={`black`}
              onClick={nextStep}
              style={{
                paddingTop: "15px",
                paddingBottom: "15px",
                width: "100%",
              }}
            />
          </div>
        </Flex>
      </Flex>
    </>
  );
}
