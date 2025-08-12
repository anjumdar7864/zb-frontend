import Components from "@/components";
import { Flex, H1, P, Paragraph } from "@/styles/CommonStyles";
import theme from "@/theme";
import React, { useEffect } from "react";

export default function Stepone({
  nextStep,
  formData,
  handleChange,
  errors,
  handlePhoneNo,
  isClickedFirstStep,
}) {
  // useEffect(() => {
  //   console.log(",errors", errors);
  // }, [errors]);
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Add smooth scrolling
    });
  }, []);
  return (
    <>
      <Flex
        width={`100%`}
        direction={`column`}
        align="center"
        gap={`1.5rem`}
        paddingX={`1rem`}
      >
        <Paragraph
          color={theme.colors.white}
          fontSize={`38px`}
          weight={`600`}
          family={'Fellix'}
          align="center"
          lineHeight={`46px`}
          
        >
          Get started with<br/> ZeitBlast now
        </Paragraph>
        <Flex
          gap={`1.5rem`}
          direction="column"
          mdDirection="row"
          width={`100%`}
        >
          <Components.Common.InputWithError
            placeholder="Email"
            name={`email`}
            value={formData.email}
            onChange={(e) => handleChange(e)}
            style={{
              backgroundColor: `rgba(255, 255, 255, 0.1)`,
              color: "white",
              border: !errors.email && "none",
              borderRadius: "0.8rem",
              padding: "19px 20px",
              fontSize: "18px",
              height:"64px"
            }}
            error={errors.email}
          />
          {/* <Components.Common.InputWithError
            placeholder="Password"
            name={`password`}
            value={formData.password}
            type="password"
            onChange={(e) => handleChange(e)}
            style={{
              backgroundColor: `rgba(255, 255, 255, 0.1)`,
              color: "white",
              border: !errors.password && "none",
              borderRadius: "0.8rem",
              padding: "24px",
              fontSize: "18px",
            }}
            error={errors.password}
          /> */}
        </Flex>
        <Flex
          gap={`1.5rem`}
          direction="column"
          mdDirection="row"
          width={`100%`}
        >
          <Components.Common.InputWithError
            placeholder="First Name"
            name={`firstName`}
            value={formData.firstName}
            onChange={(e) => {
              const value = e.target.value;
              const regex = /^[a-zA-Z0-9\s]*$/;
              if (regex.test(value)) {
                handleChange(e)

              }
            }}
            style={{
              backgroundColor: `rgba(255, 255, 255, 0.1)`,
              color: "white",
              border: !errors.firstName && "none",
              borderRadius: "0.8rem",
              width: "100%",
              padding: "19px 20px",
              fontSize: "18px",
              height:"64px"
            }}
            error={errors.firstName}
          />
          <Components.Common.InputWithError
            placeholder="Last Name"
            name={`lastName`}
            value={formData.lastName}
            // onChange={(e) => handleChange(e)}
            onChange={(e) => {
              const value = e.target.value;
              const regex = /^[a-zA-Z0-9\s]*$/;
              if (regex.test(value)) {
                handleChange(e)

              }
            }}
            style={{
              backgroundColor: `rgba(255, 255, 255, 0.1)`,
              color: "white",
              border: !errors.lastName && "none",
              borderRadius: "0.8rem",
              width: "100%",
              padding: "19px 20px",
              fontSize: "18px",
              height:"64px"
            }}
            error={errors.lastName}
          />
        </Flex>
        <Components.Common.InputWithError
          placeholder="Company Name"
          name={`companyName`}
          value={formData.companyName}
          onChange={(e) => handleChange(e)}
          type="phone"
          style={{
            backgroundColor: `rgba(255, 255, 255, 0.1)`,
            color: "white",
            border: !errors.companyName && "none",
            borderRadius: "0.8rem",
            padding: "19px 20px",
              fontSize: "18px",
              height:"64px"
          }}
          error={errors.companyName}
        />

        <Components.Common.MyInputPhone
          placeholder="Phone No"
          name={`phoneNumber`}
          value={formData.phoneNumber}
          onChange={handlePhoneNo}
          type="phone"
          style={{
            backgroundColor: `rgba(255, 255, 255, 0.1)`,
            color: "white",
            width: "100%",
            border: !errors.phoneNumber && "none",
            borderRadius: "0.8rem",
            height: "64px",
            fontSize: "18px",
          }}
          error={errors.phoneNumber}
        />
        <Components.Common.Button
          bgColor={theme.colors.white}
          hoverTextColor={theme.colors.white}
          hoverColor={`rgba(255, 255, 255, 0.1)`}
          text={`Next`}
          color={`black`}
          disabled={isClickedFirstStep}
          onClick={nextStep}
          style={{
            paddingTop: "15px",
            marginTop: "10px",
            paddingBottom: "15px",
            width: "100%",
            height: "48px",
            fontSize: "16px !important",
            fontWeight: 500,
          }}
        />
      </Flex>
    </>
  );
}
