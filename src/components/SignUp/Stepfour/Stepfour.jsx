import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Flex, H1, H2, P, Paragraph } from "@/styles/CommonStyles";
import { RoundButton, StyledForm } from "./styles";
import { FaArrowLeft } from "react-icons/fa";
import Components from "@/components";
import theme from "@/theme";
import CustomCheckbox from "@/components/common/CustomCheckBox/CustomCheckBox";
import { useGlobalContext } from "@/hooks";
import toast from "react-hot-toast";
import { RiArrowLeftSLine } from "react-icons/ri";
import JvTermsModal from "@/modules/Company/JvTermsModal";
import TermAndCondition from "@/components/common/Terms&Condition/TermsAndCondition";
import { Link } from "react-router-dom";

export default function StepFour({
  prevStep,
  nextStep,
  formData,
  handlePayment,
  selectedSubcriptionData,
  handleChange,
  errors,
  validateStep,
  handleCheckboxChange,
  createLoading,
  isClickedFourStep,
}) {
  const [buttonLoading, setButtonLOading] = useState(false);
  const [stripeDataComplete, setStripeDataComplete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTerms, setIsOpenTerms] = useState(false);
  const [dlcCheck, setDlcCheck] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { setIsLoaderShowing } = useGlobalContext();

  const points = [
    "15,000 monthly initial outbound messages",
    "Free unlimited inbound & outbound active conversations",
    "Full support with acquisition, contracts, and disposition",
    "Training on various exit strategies like novation and subject to",
    "Ideal for entry-level professionals looking to learn and earn",
    "Joint venture on deals with a 50/50 profit split",
  ];

  const icons = {
    tick: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="9" cy="9" r="9" fill="#5BF1B2" />
        <path
          d="M4.5 9.375L7.5 12L13.5 6"
          stroke="#012635"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    ),
  };

  const handlePaymentElementChange = (event) => {
    setStripeDataComplete(event?.complete);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = await validateStep();
    if (!isValid) return;
    if (!stripe || !elements) {
      return; // Stripe.js has not yet loaded.
    }
    setIsLoaderShowing(true);
    setButtonLOading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      // confirmParams: {
      //   return_url: `${window.location.origin}/signup-success`, // Replace with your success URL
      //   return_url: `${import.meta.env.VITE_APP_STRIPE_REDIRECT_URL}#/signup`,
      // },
      confirmParams: {},
      redirect: "if_required",
    });


    if (error) {
      toast.error(error?.message);

    } else if (paymentIntent.status === "succeeded") {
      //alert("paymentIntentpaymentIntentpaymentIntent");
      handlePayment(paymentIntent);
      //nextStep(); // Move to the next step if payment is successful
    }
    setIsLoaderShowing(false);
    setButtonLOading(false);
  };

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Add smooth scrolling
    });
  }, []);

  return (
    <Flex width={`100%`} direction={`column`} gap={`1rem`} paddingX={`1rem`}>
      <P
        color={theme.colors.white}
        fontSize={`38px`}
        fontweight={`600`}
        lineHeight="46px"
        paddingLeft="3rem"
        paddingRight="3rem"
        // paddingBottom={"15px"}
        textAlign="center"
      >
        Order Summary
      </P>
      <H2
        color="white"
        align={`center`}
        fontSize={`20px`}
        weight={`600`}
      //paddingX={"2rem"}
      >
        Order Details: {selectedSubcriptionData.title} -Plan
        <span style={{ color: "#5BF1B2" }}> ${selectedSubcriptionData.price}</span>
      </H2>
      <Flex width={`100%`} direction={`column`} gap={`1rem`}>
        {selectedSubcriptionData?.features?.map((item, index) => (
          <Flex color="white" key={index} gap={`0.5rem`}>
            <div style={{ color: theme.colors.primary }}>{icons.tick}</div>{" "}
            <div style={{ fontSize: "16px", fontWeight: "400", lineHeight: "24px" }}>{item}</div>
          </Flex>
        ))}
      </Flex>
      {/* <StyledForm id="paymentForm" onSubmit={handleSubmit}> */}
      <StyledForm>
        <PaymentElement onChange={handlePaymentElementChange} />
      </StyledForm>
      {/* <button disabled={!stripe}>Submit Payment</button> */}

      <Components.Common.InputWithError
        placeholder="Billing Street"
        name={`billingStreet`}
        value={formData.billingStreet}
        onChange={(e) => handleChange(e)}
        type="text"
        style={{
          backgroundColor: `rgba(255, 255, 255, 0.1)`,
          color: "white",
          border: !errors.billingStreet && "none",
          borderRadius: "0.8rem",
          padding: "19px 20px",
          height: "64px",
          fontSize: "18px",
        }}
        error={errors.billingStreet}
      />
      <Components.Common.InputWithError
        placeholder="Billing City"
        name={`billingCity`}
        value={formData.billingCity}
        onChange={(e) => handleChange(e)}
        type="text"
        style={{
          backgroundColor: `rgba(255, 255, 255, 0.1)`,
          color: "white",
          border: !errors.billingCity && "none",
          borderRadius: "0.8rem",
          padding: "19px 20px",
          height: "64px",
          fontSize: "18px",
        }}
        error={errors.billingCity}
      />
      <Components.Common.InputWithError
        placeholder="Billing Zip"
        name={`billingZip`}
        value={formData.billingZip}
        onChange={(e) => handleChange(e)}
        maxLength={10}
        type="text"
        style={{
          backgroundColor: `rgba(255, 255, 255, 0.1)`,
          color: "white",
          border: !errors.billingZip && "none",
          borderRadius: "0.8rem",
          padding: "19px 20px",
          height: "64px",
          fontSize: "18px",

        }}
        error={errors.billingZip}
      />
      {/* {formData.billingZip.toString().length > 5 && (
        <Paragraph color="#f4516c" fontSize={`1.5rem`} paddingY="0.5rem">
          Billing Zip must be at most 5 digits
        </Paragraph>
      )} */}
      <Flex width={`100%`} direction={`column`} gap={`1rem`}>
        <Flex color="white" gap={`0.5rem`}>
          <div style={{ color: theme.colors.primary, paddingTop: "5px" }}>
            <CustomCheckbox
              isChecked={formData.policy}
              onClick={() => handleCheckboxChange("policy", !formData.policy)}
            // onClick={() => {
            //   if (!formData.policy) {
            //     setIsOpenTerms(true);


            //   } else {
            //     handleCheckboxChange("policy", !formData.policy)

            //   }
            // }}
            />
          </div>{" "}
          <Paragraph color="white" fontSize={`16px`} >
            You agree that you have read and agree to Zeitblast's online <Link target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#00BD82", textDecoration: "underline" }} to="/terms-and-conditions">Terms
              of Use</Link> and Zeitblast's <Link target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#00BD82", textDecoration: "underline" }} to="/privacy-policy">Privacy Policy</Link> .
          </Paragraph>
        </Flex>
        {errors?.policy && (
          <Paragraph color="#f4516c" fontSize={`1.04rem`} paddingY="0.5rem">
            {errors.policy}
          </Paragraph>
        )}
        {selectedSubcriptionData?.title === "Jumpstart JV" && (
          <Flex color="white" gap={`0.5rem`}>
            <div style={{ color: theme.colors.primary }}>
              <CustomCheckbox
                isChecked={formData.terms}
                onClick={() => {
                  if (!formData.terms) {
                    setIsOpen(true);
                    return;
                  }
                  handleCheckboxChange("terms", !formData.terms)
                }}
              />
            </div>{" "}
            <Paragraph color="white" fontSize={`16px`}>
              You agree that you have read and agree to Zeitblast's Jumpstart JV
              - Plan Terms of Use
            </Paragraph>
          </Flex>
        )}
        {selectedSubcriptionData?.title === "Jumpstart JV" && errors?.terms && (
          <Paragraph color="#f4516c" fontSize={`1.5rem`} paddingY="0.5rem">
            {errors.terms}
          </Paragraph>
        )}

        <Flex color="white" gap={`0.5rem`}>
          <div style={{ color: theme.colors.primary, paddingTop: "5px" }}>
            <CustomCheckbox
              isChecked={dlcCheck}
              onClick={() =>
                setDlcCheck(!dlcCheck)
              }
            />
          </div>{" "}
          <Paragraph color="white" fontSize={`16px`}>
            To begin your <b>10DLC compliance process</b> — a required step before sending messages — a $50 registration fee is due today. Once your registration is approved (typically within 5 business days), the remaining <span style={{ color: "#00BD82" }}> ${selectedSubcriptionData.price - 50}</span> of your subscription will be charged, and your billing cycle will officially begin — ensuring you don’t lose any days of service. <br /> <br />
            While you wait, feel free to import your lead lists, set up outbound markets, and build your drip campaigns and templates. <Link target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#00BD82", textDecoration: "underline" }} to="">Learn more</Link>
          </Paragraph>
        </Flex>

        <Flex color="white" gap={`0.5rem`}>
          <div style={{ color: theme.colors.primary, paddingTop: "5px" }}>
            <CustomCheckbox
              isChecked={formData.marketing}
              onClick={() =>
                handleCheckboxChange("marketing", !formData.marketing)
              }
            />
          </div>{" "}
          <Paragraph color="white" fontSize={`16px`}>
            Yes, I would like to receive marketing communications about
            ZeitBlast products, knowledge content and events.
          </Paragraph>
        </Flex>


        {errors?.marketing && (
          <Paragraph color="#f4516c" fontSize={`1.04rem`} paddingY="0.5rem">
            {errors.marketing}
          </Paragraph>
        )}
      </Flex>

      <Flex width={`100%`} gap="1.5rem" mdGap="1rem" align="center">
        <div style={{ width: "10%" }}>
          <RoundButton onClick={prevStep}>
            <RiArrowLeftSLine
              size={24} />
          </RoundButton>
        </div>
        <div style={{ width: "90%", marginLeft: "12px" }}>
          <Components.Common.Button
            bgColor="white"
            text={buttonLoading ? `Creating User ...` : `Get Started`}
            color={buttonLoading ? `red` : `black`}
            onClick={handleSubmit}
            disabled={
              !formData.policy ||
              (selectedSubcriptionData?.title === "Jumpstart JV" &&
                !formData.terms) ||
              // formData.billingZip.toString().length > 5 ||
              !formData.billingZip ||
              buttonLoading ||
              isClickedFourStep ||
              !formData?.billingStreet ||
              !formData?.billingZip ||
              !formData?.billingCity ||
              !stripeDataComplete ||
              !dlcCheck
            }
            style={{ paddingTop: "15px", paddingBottom: "15px", width: "100%" }}
            hoverTextColor={theme.colors.white}
            hoverColor={`rgba(255, 255, 255, 0.1)`}
          />
        </div>
      </Flex>
      <JvTermsModal open={isOpen} setOpen={setIsOpen} confirmTerm={() => {
        setIsOpen(false);
        handleCheckboxChange("terms", !formData.terms)
      }} />
      <TermAndCondition open={isOpenTerms} setOpen={setIsOpenTerms} confirmTerm={() => {
        setIsOpenTerms(false);
        handleCheckboxChange("policy", !formData.policy)
      }} />
    </Flex>
  );
}
