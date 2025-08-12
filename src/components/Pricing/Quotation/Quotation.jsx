import Components from "@/components";
import { RoundButton } from "@/components/SignUp/Stepfive/styles";
import { StepTwoOption } from "@/components/SignUp/Steptwo/styles";
import PrivacyPolicy from "@/modules/PrivacyPolicy/PrivacyPolicy";
import { ProgressContainer, StepContainer } from "@/modules/SignUp/styles";
import { ContainerFluid, Flex, P, Paragraph } from "@/styles/CommonStyles";
import theme from "@/theme";
import { borderRadius } from "@mui/system";
import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FaArrowLeft } from "react-icons/fa";
import * as Yup from "yup";
import {
  Button,
  ButtonWrapper,
  ChildWrapper,
  Container,
  FirstChildContainer,
  Nextbutton,
  Otherbutton,
  QuestionHeader,
  QuestionTitle,
  QuestionWrapper,
  SecondChildContainer,
} from "./styles";
import toast from "react-hot-toast";
import axios from "axios";

// Step 1 Schema
const stepOneSchema = Yup.object().shape({
  whyCustom: Yup.string().required("This field is required"),
});

// Step 2 Schema
const stepTwoSchema = Yup.object().shape({
  plantoBuy: Yup.string().required("This field is required"),
});

// Step 3 Schema
const stepThreeSchema = Yup.object().shape({
  messageLimit: Yup.string().required("This field is required"),
});

// Step 4 Schema
const stepFourSchema = Yup.object().shape({
  teamSize: Yup.string().required("This field is required"),
});

// Step 5 Schema
const stepFiveSchema = Yup.object().shape({
  message: Yup.string().required("This field is required"),
});

// Step 6 Schema
const stepSixSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  companyName: Yup.string().required("Company name is required"),
  companySize: Yup.string().required("Company size is required"),
  phoneNo: Yup.string().required("Phone number is required"),
  comapanyCrm: Yup.string().required("CRM is required"),
  marketingServices: Yup.boolean(),
  PrivacyPolicy: Yup.boolean().oneOf(
    [true],
    "You must accept the privacy policy"
  ),
});

const icon = (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.3301 12.3496C20.3301 7.93133 16.7484 4.34961 12.3301 4.34961C7.9118 4.34961 4.33008 7.93133 4.33008 12.3496C4.33008 16.7679 7.9118 20.3496 12.3301 20.3496C16.7484 20.3496 20.3301 16.7679 20.3301 12.3496Z"
      stroke="#00BD82"
      stroke-width="2"
    />
    <path
      d="M20.3301 12.3496C20.3301 7.93133 16.7484 4.34961 12.3301 4.34961C7.9118 4.34961 4.33008 7.93133 4.33008 12.3496C4.33008 16.7679 7.9118 20.3496 12.3301 20.3496C16.7484 20.3496 20.3301 16.7679 20.3301 12.3496Z"
      stroke="#F7F8FC"
      stroke-width="2.5"
      stroke-dasharray="50.27 50.27"
    />
  </svg>
);

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const companySizeArray = [
  { value: "50-100", label: "50 - 100" },
  { value: "100-200", label: "100 - 200" },
  { value: "200-500", label: "200 - 500" },
];

const companyCRMArray = [
  { value: "zapier", label: " zapier" },
  { value: "Podio", label: "Podio" },
  
];
export default function Quotation() {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    whyCustom: "",
    plantoBuy: "",
    messageLimit: "",
    teamSize: "",
    message: "",
    email: "",
    firstName: "",
    lastName: "",
    companyName: "",
    companySize: "",
    phoneNo: "",
    comapanyCrm: "",
    marketingServices: false,
    PrivacyPolicy: false,
  });

  const handleOptionSelect = (option, value) => {


    setFormData((prevData) => ({
      ...prevData,
      [option]: value,
    }));
  };




  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(1);
  const totalSteps = 6;

  useEffect(() => {
    currentStep == 1 && setProgress(0);
    currentStep == 2 && setProgress(20);
    currentStep == 3 && setProgress(40);
    currentStep == 4 && setProgress(60);
    currentStep == 5 && setProgress(80);
    currentStep == 6 && setProgress(100);
  }, [currentStep]);

  const validateStep = async (step) => {

    const data = { ...formData };
    let stepSchema;

    switch (step) {

      case 1:


        stepSchema = stepOneSchema;
        break;
      case 2:
        stepSchema = stepTwoSchema;
        break;
      case 3:
        stepSchema = stepThreeSchema;
        break;
      case 4:
        stepSchema = stepFourSchema;
        break;
      case 5:
        stepSchema = stepFiveSchema;
        break;
      case 6:
        stepSchema = stepSixSchema;
        break;
      default:
        return false;
    }

    try {
      await stepSchema.validate(data, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors) {
      const newErrors = validationErrors.inner.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {});
      setErrors(newErrors);
      return false;
    }
  };

  // Function to move to the next step
  const nextStep = async () => {

    const isValid = await validateStep(currentStep);

    if (isValid) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  // const submitForm = async () => {
  //   const payload = {
  //     lookingFor: formData.whyCustom,
  //     purchasePlan: formData.plantoBuy,
  //     outBoundNumber: formData.messageLimit,
  //     teamMember: formData.teamSize,
  //     anyThingElse: formData.message,
  //     email: formData.email,
  //     firstName: formData.firstName,
  //     lastName: formData.lastName,
  //     companyName: formData.companyName,
  //     companySite: formData.companySize,
  //     phoneNumber: formData.phoneNo,
  //     companyCrm: formData.comapanyCrm,


  //   }

    

  //   try {
  //     const response = await axios.post(import.meta.env.VITE_APP_BACKEND_BASE_URL + "user/v1/api/user/custom/solution/email", payload);
  //     toast.success("submitted successfully")
  //     setFormData({
  //       whyCustom: "",
  //       plantoBuy: "",
  //       messageLimit: "",
  //       teamSize: "",
  //       message: "",
  //       email: "",
  //       firstName: "",
  //       lastName: "",
  //       companyName: "",
  //       companySize: "",
  //       phoneNo: "",
  //       comapanyCrm: "",
  //       marketingServices: false,
  //       PrivacyPolicy: false,
  //     })
  //     setCurrentStep(1)
  //   } catch (error) {
  //     // console.error("Error submitting form:", response);
  //     toast.error(error.message)

  //   }
  // }


    const submitForm = async () => {
    const payload = {
      lookingFor: formData.whyCustom,
      purchasePlan: formData.plantoBuy,
      outBoundNumber: formData.messageLimit,
      teamMember: formData.teamSize,
      anyThingElse: formData.message,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      companyName: formData.companyName,
      companySite: formData.companySize,
      phoneNumber: formData.phoneNo,
      companyCrm: formData.comapanyCrm,


    }

    if (payload.lookingFor && payload.purchasePlan && payload.outBoundNumber && payload.teamMember && payload.anyThingElse && payload.email && payload.firstName && payload.lastName && payload.companyName && payload.companySite && payload.phoneNumber && payload.companyCrm) {

    try {
      const response = await axios.post(import.meta.env.VITE_APP_BACKEND_BASE_URL + "user/v1/api/user/custom/solution/email", payload);
      toast.success("submitted successfully")
      setFormData({
        whyCustom: "",
        plantoBuy: "",
        messageLimit: "",
        teamSize: "",
        message: "",
        email: "",
        firstName: "",
        lastName: "",
        companyName: "",
        companySize: "",
        phoneNo: "",
        comapanyCrm: "",
        marketingServices: false,
        PrivacyPolicy: false,
      })
      setCurrentStep(1)
    } catch (error) {
      // console.error("Error submitting form:", response);
      toast.error(error.message)

    }
  } else {
      toast.error("Please fill all the fields")
    }

  }
  const prevStep = () => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <>
     


      {/* <ContainerFluid > */}
      <QuestionWrapper>
        <Flex width="100%" paddingY="2rem" maxWidth="1440px" margin="auto">
          <Flex display="column" mdDisplay="row" width="100%" bg={theme.colors.secondary} paddingX="2rem" smPaddingX="3rem" mdPaddingX="5rem" paddingY="5rem" gap="3rem" radius="2.5rem" >
            <Flex width="100%" direction="column" mdWidth="100%"  >
       
              <QuestionHeader>
                <span>
                  <img src="./icons/ring.svg" alt="" width={16} height={16} />
                </span>
                <span
                  style={{
                    color: "#012635",
                    fontSize: "18px",
                    fontWeight: "500",
                  }}
                >
                  Steps {currentStep} of {totalSteps}
                </span>
              </QuestionHeader>
              <Paragraph fontSize="38px" align="center" mdAlign="left" lineHeight="52px" mdFontSize="32px" lgFontSize="38px" weight="700" color='white'>Get a personalized <br />
                quote for free</Paragraph>
              <Paragraph fontSize="24px" align="center" mdAlign="left" mdFontSize="18px" lgFontSize="24px" weight="400" color='#d9d9d9'>Please answer a few questions to
                receive your customized plan today</Paragraph>
            </Flex>
            <Flex width="100%" mdWidth="100%" paddingY="2rem" smPaddingX="0rem"  >
              <StepContainer active={currentStep === 1}>
                <Flex width={`100%`} direction={`column`} gap={`1rem`} >
                  <Paragraph align="center" mdAlign="left" color="white" fontSize="24px" mdFontSize="18px" lgFontSize="24px"  >
                    Why are you looking for a custom solution?
                  </Paragraph>
                  <Flex direction="column" lgDirection="row" gap={`1rem`} width={`100%`}>
                    <div
                      style={{
                        width: "100%",
                        "@media (min-width: 850px)": {
                          // Example breakpoint for md
                          width: "50%", // Full width on small screens
                        },
                      }}
                    >
                      <StepTwoOption
                        active={formData.whyCustom == "Pricing" ? true : false}
                        onClick={() => handleOptionSelect("whyCustom", "Pricing")}
                      >
                        Pricing
                      </StepTwoOption>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        "@media (min-width: 850px)": {
                          // Example breakpoint for md
                          width: "50%", // Full width on small screens
                        },
                      }}
                    >
                      <StepTwoOption
                        active={formData.whyCustom == "Integration" ? true : false}
                        onClick={() => handleOptionSelect("whyCustom", "Integration")}
                      >
                        Integration
                      </StepTwoOption>
                    </div>
                  </Flex>
                  <Flex direction="column" lgDirection="row" gap={`1rem`} width={`100%`}>
                    <div
                      style={{
                        width: "100%",
                        "@media (min-width: 850px)": {
                          // Example breakpoint for md
                          width: "50%", // Full width on small screens
                        },
                      }}
                    >
                      <StepTwoOption
                        active={formData.whyCustom == "White Labeling" ? true : false}
                        onClick={() => handleOptionSelect("whyCustom", "White Labeling")}
                      >
                        White Labeling
                      </StepTwoOption>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        "@media (min-width: 850px)": {
                          // Example breakpoint for md
                          width: "50%", // Full width on small screens
                        },
                      }}
                    >
                      <StepTwoOption
                        active={formData.whyCustom == "Outbound Allowance" ? true : false}
                        onClick={() => handleOptionSelect("whyCustom", "Outbound Allowance")}
                      >
                        Outbound Allowance
                      </StepTwoOption>
                    </div>
                  </Flex>
                  <Flex direction="column" lgDirection="row" gap={`1rem`} width={`100%`}>
                    <div
                      style={{
                        width: "100%",
                        "@media (min-width: 850px)": {
                          // Example breakpoint for md
                          width: "50%", // Full width on small screens
                        },
                      }}
                    >
                      <StepTwoOption
                        active={formData.whyCustom == "Support" ? true : false}
                        onClick={() => handleOptionSelect("whyCustom", "Support")}
                      >
                        Support
                      </StepTwoOption>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        "@media (min-width: 850px)": {
                          // Example breakpoint for md
                          width: "50%", // Full width on small screens
                        },
                      }}
                    >
                      <StepTwoOption
                        active={formData.whyCustom == "Features" ? true : false}
                        onClick={() => handleOptionSelect("whyCustom", "Features")}
                      >
                        Features
                      </StepTwoOption>
                    </div>
                  </Flex>
                  <StepTwoOption
                    active={formData.whyCustom == "Other" ? true : false}
                    onClick={() => handleOptionSelect("whyCustom", "Other")}
                  >
                    Other
                  </StepTwoOption>
                  {errors?.whyCustom && <Paragraph color="#f4516c" fontSize={`1.04rem`} paddingY="0.5rem">
                    {errors?.whyCustom}
                  </Paragraph>}
                  <Components.Common.Button
                    bgColor={theme.colors.white}
                    hoverTextColor={theme.colors.white}
                    hoverColor={`rgba(255, 255, 255, 0.1)`}
                    text={`Next`}
                    color={`black`}
                    //   disabled={isClickedFirstStep}
                    onClick={nextStep}
                    style={{
                      paddingTop: "15px",
                      marginTop: "10px",
                      paddingBottom: "15px",
                      width: "100%",
                    }}
                  />
                </Flex>
              </StepContainer>
              <StepContainer active={currentStep === 2}>
                <Flex width={`100%`} direction={`column`} gap={`1rem`} >
                  <Paragraph color="white" fontSize="1.8rem" >
                    How soon do you plan to purchase a solution?
                  </Paragraph>

                  <StepTwoOption
                    active={formData.plantoBuy == "Immediately" ? true : false}
                    onClick={() => handleOptionSelect("plantoBuy", "Immediately")}
                  >
                    Immediately
                  </StepTwoOption>

                  <StepTwoOption
                    active={formData.plantoBuy == "Within 2 Months" ? true : false}
                    onClick={() => handleOptionSelect("plantoBuy", "Within 2 Months")}
                  >
                    Within 2 Months
                  </StepTwoOption>

                  <StepTwoOption
                    active={formData.plantoBuy == "In more than 6 Moths" ? true : false}
                    onClick={() => handleOptionSelect("plantoBuy", "In more than 6 Moths")}
                  >
                    In more than 6 Moths
                  </StepTwoOption>


                  <StepTwoOption
                    active={formData.plantoBuy == "Not Sure" ? true : false}
                    onClick={() => handleOptionSelect("plantoBuy", "Not Sure")}
                  >
                    Not Sure
                  </StepTwoOption>

                  <Paragraph color="#f4516c" fontSize={`1.04rem`} paddingY="0.5rem">
                    {errors?.plantoBuy}
                  </Paragraph>
                  <Flex direction="column" mdDirection="row" gap="1rem">

                    <div
                      style={{
                        width: "100%",
                        "@media (min-width: 768px)": {
                          // Example breakpoint for md
                          width: "50%", // Full width on small screens
                        },
                      }}
                    >
                      <Components.Common.Button
                        bgColor={`#8A8D94`}
                        hoverTextColor={theme.colors.white}
                        hoverColor={`rgba(255, 255, 255, 0.1)`}
                        text={`Previous`}
                        color={`black`}
                        //   disabled={isClickedFirstStep}
                        onClick={prevStep}
                        style={{
                          paddingTop: "15px",
                          marginTop: "10px",
                          paddingBottom: "15px",
                          width: "100%",
                        }}
                      />
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
                      <Components.Common.Button
                        bgColor={theme.colors.white}
                        hoverTextColor={theme.colors.white}
                        hoverColor={`rgba(255, 255, 255, 0.1)`}
                        text={`Next`}
                        color={`black`}
                        //   disabled={isClickedFirstStep}
                        onClick={nextStep}
                        style={{
                          paddingTop: "15px",
                          marginTop: "10px",
                          paddingBottom: "15px",
                          width: "100%",
                        }}
                      />
                    </div>
                  </Flex>

                </Flex>
              </StepContainer>
              <StepContainer active={currentStep === 3}>
                <Flex width={`100%`} direction={`column`} gap={`1rem`} >
                  <Paragraph color="white" fontSize="1.8rem" >
                    How many outbound messages do you need?
                  </Paragraph>

                  <StepTwoOption
                    active={formData.messageLimit == "100,000 - 250,000" ? true : false}
                    onClick={() => handleOptionSelect("messageLimit", "100,000 - 250,000")}
                  >
                    100,000 - 250,000
                  </StepTwoOption>

                  <StepTwoOption
                    active={formData.messageLimit == "250,000 - 500,000" ? true : false}
                    onClick={() => handleOptionSelect("messageLimit", "250,000 - 500,000")}
                  >
                    250,000 - 500,000
                  </StepTwoOption>

                  <StepTwoOption
                    active={formData.messageLimit == "500,000 - 1m" ? true : false}
                    onClick={() => handleOptionSelect("messageLimit", "500,000 - 1m")}
                  >
                    500,000 - 1m
                  </StepTwoOption>


                  <StepTwoOption
                    active={formData.messageLimit == "Over 1m" ? true : false}
                    onClick={() => handleOptionSelect("messageLimit", "Over 1m")}
                  >
                    Over 1m
                  </StepTwoOption>
                  <Paragraph color="#f4516c" fontSize={`1.04rem`} paddingY="0.5rem">
                    {errors.messageLimit}
                  </Paragraph>

                  <Flex direction="column" mdDirection="row" gap="1rem">

                    <div
                      style={{
                        width: "100%",
                        "@media (min-width: 768px)": {
                          // Example breakpoint for md
                          width: "50%", // Full width on small screens
                        },
                      }}
                    >
                      <Components.Common.Button
                        bgColor={`#8A8D94`}
                        hoverTextColor={theme.colors.white}
                        hoverColor={`rgba(255, 255, 255, 0.1)`}
                        text={`Previous`}
                        color={`black`}
                        //   disabled={isClickedFirstStep}
                        onClick={prevStep}
                        style={{
                          paddingTop: "15px",
                          marginTop: "10px",
                          paddingBottom: "15px",
                          width: "100%",
                        }}
                      />
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
                      <Components.Common.Button
                        bgColor={theme.colors.white}
                        hoverTextColor={theme.colors.white}
                        hoverColor={`rgba(255, 255, 255, 0.1)`}
                        text={`Next`}
                        color={`black`}
                        //   disabled={isClickedFirstStep}
                        onClick={nextStep}
                        style={{
                          paddingTop: "15px",
                          marginTop: "10px",
                          paddingBottom: "15px",
                          width: "100%",
                        }}
                      />
                    </div>
                  </Flex>

                </Flex>
              </StepContainer>
              <StepContainer active={currentStep === 4}>
                <Flex width={`100%`} direction={`column`} gap={`1rem`} >
                  <Paragraph color="white" fontSize="1.8rem" >
                    How many team members will use the solution?
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
                        active={formData.teamSize == "1 to 3" ? true : false}
                        onClick={() => handleOptionSelect("teamSize", "1 to 3")}
                      >
                        1 to 3
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
                        active={formData.teamSize == " 4 to 10" ? true : false}
                        onClick={() => handleOptionSelect("teamSize", " 4 to 10")}
                      >
                        4 to 10
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
                        active={formData.teamSize == "11 to 50" ? true : false}
                        onClick={() => handleOptionSelect("teamSize", "11 to 50")}
                      >
                        11 to 50
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
                        active={formData.teamSize == "51 to 250" ? true : false}
                        onClick={() => handleOptionSelect("teamSize", "51 to 250")}
                      >
                        51 to 250
                      </StepTwoOption>
                    </div>
                  </Flex>


                  <StepTwoOption
                    active={formData.teamSize == " > 1000" ? true : false}
                    onClick={() => handleOptionSelect("teamSize", " > 1000")}
                  >
                    {`> 1000`}
                  </StepTwoOption>

                  <Paragraph color="#f4516c" fontSize={`1.04rem`} paddingY="0.5rem">
                    {errors?.teamSize}
                  </Paragraph>
                  <Flex direction="column" mdDirection="row" gap="1rem">

                    <div
                      style={{
                        width: "100%",
                        "@media (min-width: 768px)": {
                          // Example breakpoint for md
                          width: "50%", // Full width on small screens
                        },
                      }}
                    >
                      <Components.Common.Button
                        bgColor={`#8A8D94`}
                        hoverTextColor={theme.colors.white}
                        hoverColor={`rgba(255, 255, 255, 0.1)`}
                        text={`Previous`}
                        color={`black`}
                        //   disabled={isClickedFirstStep}
                        onClick={prevStep}
                        style={{
                          paddingTop: "15px",
                          marginTop: "10px",
                          paddingBottom: "15px",
                          width: "100%",
                        }}
                      />
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
                      <Components.Common.Button
                        bgColor={theme.colors.white}
                        hoverTextColor={theme.colors.white}
                        hoverColor={`rgba(255, 255, 255, 0.1)`}
                        text={`Next`}
                        color={`black`}
                        //   disabled={isClickedFirstStep}
                        onClick={nextStep}
                        style={{
                          paddingTop: "15px",
                          marginTop: "10px",
                          paddingBottom: "15px",
                          width: "100%",
                        }}
                      />
                    </div>
                  </Flex>

                </Flex>
              </StepContainer>
              <StepContainer active={currentStep === 5}>
                <Flex width={`100%`} direction={`column`} gap={`1rem`} >
                  <Paragraph color="white" fontSize="1.8rem" >
                    Do you want to add anything else?
                  </Paragraph>


                  <Flex direction="column" mdDirection="row" gap={`1rem`} width={`100%`}>
                    <Components.Common.TextArea
                      placeholder="Type Here..."
                      style={{
                        backgroundColor: `rgba(255, 255, 255, 0.1)`,
                        color: "white",
                        border: "none",
                        borderRadius: "10px"
                      }}
                      rows="10"
                      onChange={(e) => handleOptionSelect("message", e.target.value)}
                    >
                      {formData?.message}
                    </Components.Common.TextArea>
                  </Flex>
                  <Paragraph color="#f4516c" fontSize={`1.04rem`} paddingY="0.5rem">
                    {errors?.message}
                  </Paragraph>

                  <Flex direction="column" mdDirection="row" gap="1rem">

                    <div
                      style={{
                        width: "100%",
                        "@media (min-width: 768px)": {
                          // Example breakpoint for md
                          width: "50%", // Full width on small screens
                        },
                      }}
                    >
                      <Components.Common.Button
                        bgColor={`#8A8D94`}
                        hoverTextColor={theme.colors.white}
                        hoverColor={`rgba(255, 255, 255, 0.1)`}
                        text={`Previous`}
                        color={`black`}
                        //   disabled={isClickedFirstStep}
                        onClick={prevStep}
                        style={{
                          paddingTop: "15px",
                          marginTop: "10px",
                          paddingBottom: "15px",
                          width: "100%",
                        }}
                      />
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
                      <Components.Common.Button
                        bgColor={theme.colors.white}
                        hoverTextColor={theme.colors.white}
                        hoverColor={`rgba(255, 255, 255, 0.1)`}
                        text={`Next`}
                        color={`black`}
                        //   disabled={isClickedFirstStep}
                        onClick={nextStep}
                        style={{
                          paddingTop: "15px",
                          marginTop: "10px",
                          paddingBottom: "15px",
                          width: "100%",
                        }}
                      />
                    </div>
                  </Flex>

                </Flex>
              </StepContainer>
              <StepContainer active={currentStep === 6}>
                <Paragraph color="white" fontSize="1.8rem" >
                  Thank you! You're almost done.
                </Paragraph>
                <Flex
                  gap={`1.2rem`}
                  direction="column"

                  width={`100%`}
                >
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
                      onChange={(e) => handleOptionSelect("email", e.target.value)}
                      style={{
                        backgroundColor: `rgba(255, 255, 255, 0.1)`,
                        color: "white",
                        border: !errors.email && "none",
                        borderRadius: "0.8rem",
                        padding: "15px",
                        fontSize: "18px",
                      }}
                      error={errors.email}
                    />

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
                      onChange={(e) => handleOptionSelect("firstName", e.target.value)}
                      style={{
                        backgroundColor: `rgba(255, 255, 255, 0.1)`,
                        color: "white",
                        border: !errors.firstName && "none",
                        borderRadius: "0.8rem",
                        width: "100%",
                        padding: "15px",
                        fontSize: "18px",
                      }}
                      error={errors.firstName}
                    />
                    <Components.Common.InputWithError
                      placeholder="Last Name"
                      name={`lastName`}
                      value={formData.lastName}
                      onChange={(e) => handleOptionSelect("lastName", e.target.value)}
                      style={{
                        backgroundColor: `rgba(255, 255, 255, 0.1)`,
                        color: "white",
                        border: !errors.lastName && "none",
                        borderRadius: "0.8rem",
                        width: "100%",
                        padding: "15px",
                        fontSize: "18px",
                      }}
                      error={errors.lastName}
                    />
                  </Flex>
                  <Flex
                    gap={`1.5rem`}
                    direction="column"
                    mdDirection="row"
                    width={`100%`}
                  >
                    <Components.Common.InputWithError
                      placeholder="Company Name"
                      name={`companyName`}
                      value={formData.companyName}
                      onChange={(e) => handleOptionSelect("companyName", e.target.value)}
                      style={{
                        backgroundColor: `rgba(255, 255, 255, 0.1)`,
                        color: "white",
                        border: !errors.companyName && "none",
                        borderRadius: "0.8rem",
                        padding: "15px",
                        fontSize: "18px",
                      }}
                      error={errors.companyName}
                    />
                    <Components.Common.Dropdown2
                      bg="#2d313e"
                      color="white"
                      label="Company Size"
                      options={companySizeArray}
                      //   onSelect={handleSelect}
                      onSelect={(e) => handleOptionSelect("companySize", e.value)}
                      dropdownNumber={0}
                      id="custom-dropdown"
                      className="custom-class"
                      aria-label="Custom Dropdown"
                      style={{
                        backgroundColor: `rgba(255, 255, 255, 0.1)`,
                        color: "white",
                        border: "none",
                        borderRadius: "0.8rem",
                        padding: "15px",
                        fontSize: "18px",
                      }}
                    />
                  </Flex>
                  <Components.Common.MyInputPhone
                    placeholder="Phone No"
                    name={`phoneNumber`}
                    value={formData.phoneNo}
                    onChange={(e) => handleOptionSelect("phoneNo", e)}
                    // onChange={(e) => {
                    //   console.log("check form" , e);

                    // }}
                    type="phone"
                    style={{
                      backgroundColor: `rgba(255, 255, 255, 0.1)`,
                      color: "white",
                      width: "100%",
                      border: !errors.phoneNo && "none",
                      borderRadius: "0.8rem",
                      height: "55px",
                      fontSize: "18px",
                    }}
                    error={errors.phoneNo}
                  />
                  <Components.Common.Dropdown2
                    bg="#2d313e"
                    color="white"
                    label="Company CRM"
                    options={companyCRMArray}
                    // onSelect={(e)=>console.log("check form ==== " , e.value)}
                    onSelect={(e) => handleOptionSelect("comapanyCrm", e.value)}

                    dropdownNumber={1}
                    id="custom-dropdown"
                    className="custom-class"
                    aria-label="Custom Dropdown"
                    style={{
                      backgroundColor: `rgba(255, 255, 255, 0.1)`,
                      color: "white",
                      border: "none",
                      borderRadius: "0.8rem",
                      padding: "15px",
                      fontSize: "18px",
                    }}
                  />
                </Flex>
                <Flex direction="column" mdDirection="row" gap="1rem">

                  <div
                    style={{
                      width: "100%",
                      "@media (min-width: 768px)": {
                        // Example breakpoint for md
                        width: "50%", // Full width on small screens
                      },
                    }}
                  >
                    <Components.Common.Button
                      bgColor={`#8A8D94`}
                      hoverTextColor={theme.colors.white}
                      hoverColor={`rgba(255, 255, 255, 0.1)`}
                      text={`Previous`}
                      color={`black`}
                      //   disabled={isClickedFirstStep}
                      onClick={prevStep}
                      style={{
                        paddingTop: "15px",
                        marginTop: "10px",
                        paddingBottom: "15px",
                        width: "100%",
                      }}
                    />
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
                    <Components.Common.Button
                      bgColor={theme.colors.white}
                      hoverTextColor={theme.colors.white}
                      hoverColor={`rgba(255, 255, 255, 0.1)`}
                      text={`Request a Quote`}
                      color={`black`}
                      //   disabled={isClickedFirstStep}
                      onClick={submitForm}
                      style={{
                        paddingTop: "15px",
                        marginTop: "10px",
                        paddingBottom: "15px",
                        width: "100%",
                      }}
                    />
                  </div>
                </Flex>
              </StepContainer>
            </Flex>
          </Flex>
        </Flex>
      </QuestionWrapper>
      {/* </ContainerFluid> */}
    </>
  );
}
