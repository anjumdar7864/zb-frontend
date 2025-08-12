import Components from "@/components";
import { Flex, H1, P, Paragraph } from "@/styles/CommonStyles";
import theme from "@/theme";
import React, { useEffect } from "react";
import { RoundButton, StepTwoOption } from "./styles";
import { FaArrowLeft } from "react-icons/fa";
import InputPhoneNo from "@/components/common/MyInputPhone/styles";

export default function Stepfive({
  prevStep,
  nextStep,
  formData,
  handleChange,
  handleSelection,
  errors,
  feedBackSending,
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
      <Flex width={`100%`} direction={`column`} gap={`1rem`} paddingX={`1rem`}>
        <P
          color={theme.colors.white}
          fontSize={`38px`}
          fontweight={`600`}
          // lineHeight="46px"
          paddingLeft="2rem"
          paddingRight="2rem"
          paddingBottom={"15px"}
          textAlign="center"
        >
          {/* Where did you hear from us ? */}
          Welcome to <span style={{ color: "#5BF1B2" }}>Zeitblast! </span>
          How did you hear about us?
        </P>
        <Paragraph color="#FFFFFF" fontSize={`16px`} align={`center`}>
          This enables us to recommend the best options for your business
        </Paragraph>
        <Flex direction="column" mdDirection="row" gap={`1rem`} width={`100%`}>
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
              active={formData.hearAboutUs == "Google" ? true : false}
              data-id="Google"
              onClick={(e) => handleSelection(e)}
            >
              Google
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
              active={formData.hearAboutUs == "Facebook" ? true : false}
              data-id="Facebook"
              onClick={(e) => handleSelection(e)}
            >
              Facebook
            </StepTwoOption>
          </div>
        </Flex>
        <Flex direction="column" mdDirection="row" gap={`1rem`} width={`100%`}>
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
              active={formData.hearAboutUs == "Instagram" ? true : false}
              data-id="Instagram"
              onClick={(e) => handleSelection(e)}
            >
              Instagram
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
              active={formData.hearAboutUs == "Referral" ? true : false}
              data-id="Referral"
              onClick={(e) => handleSelection(e)}
            >
              Referral
            </StepTwoOption>
          </div>
        </Flex>
        <Components.Common.TextArea
          placeholder="Other..."
          style={{
            backgroundColor: `rgba(255, 255, 255, 0.1)`,
            color: "white",
            border: "none",
          }}
          rows="5"
          onChange={(e) => {
            handleChange(e);
          }}
        >
          {formData?.hearAboutUs}
        </Components.Common.TextArea>
        <Flex width={`100%`} gap="1rem" marginTop="20px" align="center">
          {/* <div style={{ width: "10%" }}>
            <RoundButton onClick={prevStep}>
              <FaArrowLeft />
            </RoundButton>
          </div> */}
          <div style={{ width: "100%" }}>
            <Components.Common.Button
              bgColor={theme.colors.white}
              text={feedBackSending ? `sending feedback` : `Submit`}
              color={feedBackSending ? `red` : `black`}
              onClick={nextStep}
              disabled={feedBackSending}
              style={{
                paddingTop: "15px",
                paddingBottom: "15px",
                width: "100%",
              }}
              hoverTextColor={theme.colors.white}
              hoverColor={`rgba(255, 255, 255, 0.1)`}
            />
          </div>
        </Flex>

        <InputPhoneNo></InputPhoneNo>
      </Flex>
    </>
  );
}
