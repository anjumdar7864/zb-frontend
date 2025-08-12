import Components from "@/components";
import { Flex, H1, P, Paragraph } from "@/styles/CommonStyles";
import theme from "@/theme";
import React, { useEffect } from "react";
import { RoundButton } from "./styles";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { GetAllAreaCode } from "@/store/actions";
import { RiArrowLeftSLine } from "react-icons/ri";

export default function Stepthree({
  handleSelect,
  prevStep,
  nextStep,
  formData,
  handleChange,
  errors,
}) {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const dispatch = useDispatch();
  const { areaCodes } = useSelector((s) => s.areaCodeReducer);

  useEffect(() => {
    dispatch(GetAllAreaCode());
  }, []);

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
        <Paragraph
          color={theme.colors.white}
          fontSize={`40px`}
          fontweight={`600`}
          lineHeight={`44px`}
          align="center"
        >
          Whats are your target market area codes ?
        </Paragraph>
        <Paragraph color="#FFFFFF99" fontSize={`16px`} lineHeight={`24px`} align={`center`}>
          These are your primary area codes or markets you plan to target. Best
          practice is to select the area code of the market you’ll be targeting.
          <br />
          <Flex align="center" justify="center" gap={`0.3rem`}>
            <div style={{ color: "#5BF1B2" }}>Note:</div>{" "}
            <div>You can text nationwide with any area code.</div>
          </Flex>
        </Paragraph>
        <Components.Common.Dropdown
          bg="#2d313e"
          color="white"
          label="Pick any Area Code"
          options={areaCodes}
          onSelect={handleSelect}
          dropdownNumber={0}
          id="custom-dropdown"
          className="custom-class"
          aria-label="Custom Dropdown"
          style={{
            backgroundColor: `rgba(255, 255, 255, 0.1)`,
            color: "white",
            border: "none",
            borderRadius: "0.8rem",
            padding: "18px",
            fontSize: "18px",
            height:"64px"
          }}
        />

        <Components.Common.Dropdown
          bg="#2d313e"
          color="white"
          label="Pick any Area Code"
          options={areaCodes}
          onSelect={handleSelect}
          dropdownNumber={1}
          id="custom-dropdown"
          className="custom-class"
          aria-label="Custom Dropdown"
          style={{
            backgroundColor: `rgba(255, 255, 255, 0.1)`,
            color: "white",
            border: "none",
            borderRadius: "0.8rem",
            padding: "18px",
            fontSize: "18px",
              height:"64px"
          }}
        />

        <Paragraph color="#f4516c" fontSize={`1.04rem`} paddingY="0.5rem">
          {errors.targetMarketAreaCode}
        </Paragraph>
        {/* <Components.Common. */}
        <Flex width={`100%`} gap="1.5rem" mdGap="1rem" align="center">
          <div style={{ width: "10%" }}>
            <RoundButton onClick={prevStep}>
              <RiArrowLeftSLine size={24}/>
            </RoundButton>
          </div>
          <div style={{ width: "90%", marginLeft: "12px" }}>
            <Components.Common.Button
              bgColor={theme.colors.white}
              text={`Next`}
              color={`black`}
              onClick={nextStep}
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
      </Flex>
    </>
  );
}
