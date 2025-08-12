import Components from "@/components";
import { ContainerFluid, Flex } from "@/styles/CommonStyles";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  FormWrapper,
  ProgressContainer,
  // InsideCircle,
  // Mask,
  // ProgressCircle,
  SignupWrapper,
  StepContainer,
  // StyledProgressBar,
  // Circle,
  // FillFix,
} from "./styles";
import theme from "@/theme";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
} from "../../schema/index";
import {
  clearErrors,
  clearMessages,
  GetSingleAdminUserForSignup,
  signupFeedBackApi,
  signUpUser,
  signUpUserCreateByAdmin,
  stepRecord,
  VerifyNewEmail,
} from "@/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useGlobalContext } from "@/hooks";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY?.replace(/\/$/, '') || "pk_test_51RbCRf2N3jMOC2OU3qoKdAKhRe2BIAgOPQctcgwrYVAqpkT5fQUTGOxoLsJte6CqPgsdW6OQjYLc7tlskoo7JoZO00xMTkKnRs");


export default function SignUp() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { setIsLoaderShowing } = useGlobalContext();
  const [userId, setUserId] = useState(null);
  const [feedBackSending, setFeedBackSending] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [progress, setProgress] = useState("0");
  const [isClickedFirstStep, setIsClickedFirstStep] = useState(false);
  const [isClickedFourStep, setIsClickedFourStep] = useState(false);
  const [isClickedFiveStep, setIsClickedFiveStep] = useState(false);
  // const {
  //   loading,
  //   message: message2,
  //   errors: err,
  // } = useSelector((state) => state.authReducer);

  useEffect(() => {
    // Get the URL hash part (after #)
    const hash = window.location.hash;

    // Use a regex or split to extract the ID part
    const idFromUrl = hash.split("/")[2];
    // Set the ID to state
    setUserId(idFromUrl);
    if (idFromUrl) {
      dispatch(GetSingleAdminUserForSignup(idFromUrl));
    }
  }, [id]);

  const {
    errors: error1,
    message1,
    singleUser,
  } = useSelector((state) => state.billingReducer);

  const {
    message,
    errors: error,
    loading: createLoading,
  } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (message !== "") {
      toast.success(message);
      dispatch(clearMessages());
      // setTimeout(() => onClose(), 1000);
    }
  }, [dispatch, error, message]);

  const onClose = () => {
    navigate("/");
  };

  const selectedSubcriptionData = location.state;
  console.log("check selectedSubcriptionData", selectedSubcriptionData);

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Add smooth scrolling
    });
  }, []);

  const [timezones, setTimezones] = useState([
    "US/Pacific",
    "US/Eastern",
    "US/Central",
    "US/Mountain",
  ]);
  const [errors, setErrors] = useState({});
  const [clientSecret, setClientSecret] = useState("");
  const [formData, setFormData] = useState({
    email: singleUser && id ? singleUser?.email : "",
    firstName: singleUser && id ? singleUser?.firstName : "",
    lastName: singleUser && id ? singleUser?.lastName : "",
    companyName: "",
    phoneNumber: "",
    experienceLevel: "",
    targetMarketAreaCode: [],
    billingStreet: "",
    billingCity: "",
    billingZip: "",
    timeZone: timezones[0],
    aliasName: singleUser && id ? singleUser?.firstName : "",
    subscriptionId:
      singleUser && id
        ? singleUser?.subscriptionId?._id
        : selectedSubcriptionData?.subscriptionId,
    terms: false,
    marketing: false,
    policy: false,
    payment_intent: "",
    payment_method: "",
    payment_intent_client_secret: "",
    stripeCustomerId: "",
    stripeSubscriptionId: "",
    subscriptionType:
      singleUser && id
        ? singleUser?.subscriptionId?.subscriptionType
        : selectedSubcriptionData?.subscriptionType,
    url: import.meta.env.VITE_APP_FRONTEND_BASE_URL,
  });

  useEffect(() => {
    if (singleUser && userId) {
      setFormData((prevData) => ({
        ...prevData,
        email: singleUser?.email || "",
        firstName: singleUser?.firstName || "",
        lastName: singleUser?.lastName || "",
        subscriptionId: singleUser?.subscriptionId?._id || "",
        // Add other fields if needed
      }));
    }
  }, [singleUser, userId]);

  const handleCheckboxChange = (name, checked) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const ValidateUserEmail = async (data) => {
    setIsLoaderShowing(true);
    let body = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      companyName: data.companyName,
      phoneNumber: data.phoneNumber,
    };
    const result = await VerifyNewEmail(body);
    if (result?.status == true) {
      await handleFormDataForStripeRedirect();
      setIsLoaderShowing(false);
      return true;
    } else {
      toast.error(`${result?.message}`);
      setIsLoaderShowing(false);
      return false;
    }
  };

  const submitRecord = async (data, step) => {
    setIsLoaderShowing(true);
    if (step == 2) {
      var body = {
        email: data.email,
        experienceLevel: data.experienceLevel,
      };
    }
    if (step == 3) {
      var body = {
        email: data.email,
        targetMarketAreaCode: data.targetMarketAreaCode,
      };
    }
    const result = await stepRecord(body);
    if (result?.status == true) {
      if (step == 3) {
        await createSubscription();
      }
      setIsLoaderShowing(false);
      return true;
    } else {
      toast.error(`${result?.message}`);
      setIsLoaderShowing(false);
      return false;
    }
  };

  //stepRecord

  // const feedBackApi = async (data) => {

  // };

  const validateStep = async (step) => {
    setIsLoaderShowing(true);
    const data = { ...formData };
    let stepSchema;
    if (step === 1) {
      setIsClickedFirstStep(true);
      if (!id) {
        const result = await ValidateUserEmail(data);
        if (result == false) {
          setIsClickedFirstStep(false);
          return;
        }
      }

      stepSchema = step1Schema;
    } else if (step === 2) {
      const result = await submitRecord(data, step);
      if (result == false) {
        return;
      }
      stepSchema = step2Schema;
    } else if (step === 3) {
      const result = await submitRecord(data, step);
      if (result == false) {
        return;
      }
      stepSchema = step3Schema;
    } else if (step === 4) {
      stepSchema = step4Schema;
    } else if (step === 5) {
      stepSchema = step5Schema;
    }

    try {
      await stepSchema.validate(data, { abortEarly: false });
      setIsClickedFirstStep(false);
      setErrors({});
      // if (step === 3) {
      //   await createSubscription();
      // }

      // if (step === 1 && userId != null) {
      //   await createSubscriptionWhenUser();
      // }

      return true;
    } catch (validationErrors) {
      const errors = validationErrors.inner.reduce((acc, error) => {
        acc[error.path] = error.message;

        return acc;
      }, {});
      setErrors(errors);
      setIsClickedFirstStep(false);
      return false;
    }
  };

  //new
  const createSubscription = async () => {
    setIsLoaderShowing(true);
    if (userId == null) {
      var body = {
        subscriptionId: `${selectedSubcriptionData.priceId}`,
        email: formData?.email,
        firstName: formData?.firstName,
        lastName: formData?.lastName,
      };
    } else {
      var body = {
        // subscriptionId: `${singleUser?.subscriptionId?.priceId}`,
        subscriptionId: `${singleUser?.subscriptionId?.yearlyPriceId}`,
        email: formData?.email,
        firstName: formData?.firstName,
        lastName: formData?.lastName,
      };
    }

    // Fetch the client secret from your backend
    axios
      .post(
        `${
          import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/admin/create/subscription`,
        //{ subscriptionId: "price_1PmzAmCqlbj03UwyDs1chfTu" }
        body
        //
      )
      .then((response) => {
        setClientSecret(response.data.clientSecret);
        setFormData((prevData) => ({
          ...prevData,
          stripeCustomerId: response?.data?.stripeCustomerId,
          stripeSubscriptionId: response?.data?.stripeSubscriptionId,
        }));
        setIsLoaderShowing(false);
      })
      .catch((error) => {
        console.error("Error fetching client secret:", error);
        setIsLoaderShowing(false);
        navigate("/");
      });
    setIsLoaderShowing(false);
  };

  const handleFormDataForStripeRedirect = async () => {
    //start

    // createSubscription();

    // Update formData with the price from selectedSubcriptionData

    //uncomment amount when paload is set
    const updatedFormData = {
      ...formData,
      // amount: selectedSubcriptionData.price,
    };

    // Store updated formData in localStorage
    localStorage.setItem("formData", JSON.stringify(updatedFormData));
    setFormData(updatedFormData);

    // Store selectedSubcriptionData in localStorage
    const object1StringSelectedSubcriptionData = JSON.stringify(
      selectedSubcriptionData
    );
    localStorage.setItem(
      "selectedSubcriptionData",
      object1StringSelectedSubcriptionData
    );
  };

  const options = {
    clientSecret,
  };

  // Handle changes to the form inputs
  const handleChange = (e) => {
    // validateStep(currentStep)
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneNo = (value) => {
    // validateStep(currentStep)

    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: value,
    }));
  };

  const handleExperienceLevelClick = (e) => {
    const level = e.target.getAttribute("data-id");
    setFormData((prevData) => ({
      ...prevData,
      experienceLevel: level,
    }));
  };

  const handleHearaboutus = (e) => {
    const level = e.target.getAttribute("data-id");
    setFormData((prevData) => ({
      ...prevData,
      hearAboutUs: level,
    }));
  };

  const handleSelect = (selectedOption, dropdownNumber, setSelectedOption) => {
    setFormData((prevData) => {
      const updatedAreaCodes = [...prevData.targetMarketAreaCode];
      // Check if the selectedOption already exists in the array (but not in the same dropdown)
      if (
        updatedAreaCodes.includes(selectedOption) &&
        updatedAreaCodes[dropdownNumber] !== selectedOption
      ) {
        toast.error("Select different Area code");
        return prevData; // Return previous state without updating
      }
      // Replace the item at the index specified by dropdownNumber
      setSelectedOption(selectedOption);
      updatedAreaCodes[dropdownNumber] = selectedOption;
      return {
        ...prevData,
        targetMarketAreaCode: updatedAreaCodes,
      };
    });
  };

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const nextStep = async () => {
    setIsLoaderShowing(true);
    // setCurrentStep((prev) => (prev < totalSteps ? prev + 1 : prev));
    const isValid = await validateStep(currentStep);
    if (isValid) {
      setCurrentStep((prevStep) => prevStep + 1);
      //setIsLoaderShowing(false);
    }

    setTimeout(() => {
      setIsLoaderShowing(false);
    }, 500); // Adjust the delay (500ms) as needed
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handlePayment = async (paymentData) => {
    setIsClickedFourStep(true);
    const isValid = await validateStep(currentStep);
    if (isValid) {
      // Extract the relevant fields from paymentData
      const { id, client_secret, payment_method } = paymentData;

      // Update the formData state with the extracted values
      setFormData((prevData) => ({
        ...prevData,
        payment_intent: id, // Storing the id as paymentIntent in formData
        payment_method: payment_method,
        payment_intent_client_secret: client_secret, // Storing the client_secret
      }));
    }
  };

  const signupSubmit = () => {
    setIsLoaderShowing(true);
    const timezones = ["US/Pacific", "US/Eastern", "US/Central", "US/Mountain"];

    const { terms, marketing, policy, ...payload } = formData;
    if (userId == null) {
      dispatch(signUpUser(payload));
    } else {
      const { email, firstName, lastName, subscriptionId, ...filteredPayload } =
        payload;
      dispatch(signUpUserCreateByAdmin(filteredPayload, userId));
    }

    localStorage.setItem("NewSignUp", "yes");
    localStorage.removeItem("formData");
    localStorage.removeItem("selectedSubcriptionData");
    //navigate("/Login");
    setIsLoaderShowing(false);
    setCurrentStep(5);
  };

  useEffect(() => {
    if (formData.payment_intent && formData.payment_intent_client_secret) {
      signupSubmit(); // Call signupSubmit only when payment_intent and client_secret are set
      setIsClickedFourStep(false);
    }
  }, [formData.payment_intent, formData.payment_intent_client_secret]);

  const feedbackSubmit = async () => {
    setFeedBackSending(true);
    setIsLoaderShowing(true);
    const data = { ...formData };
    const signupId = localStorage.getItem("signupId");
    let body = {
      // billingStreet: data.billingStreet,
      // billingCity: data.billingCity,
      // billingZip: data.billingZip,
      hearAboutUs: data.hearAboutUs,
    };
    const result = await signupFeedBackApi(body, signupId);

    if (result.status == true) {
      setIsLoaderShowing(false);
      setFeedBackSending(false);
      navigate("/Login");
    } else {
      toast.error(`${result?.message}`);
      setFeedBackSending(false);
      setIsLoaderShowing(false);
      return false;
    }
  };

  useEffect(() => {
    currentStep == 1 && setProgress(0);
    currentStep == 2 && setProgress(50);
    currentStep == 3 && setProgress(75);
    currentStep == 4 && setProgress(100);
  }, [currentStep]);

  // console.log("paymentIntent ======= " , currentStep)

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission on Enter key
      nextStep(); // Call nextStep function when Enter is pressed
    }
  };

  return (
    <>
      <Components.Common.HeaderSignup />
      <SignupWrapper
        bgColor="#f9f9f9"
        bgImage="./images/signup/background.png"
        bgSize="cover"
        bgPosition="center"
        paddingY={`8rem`}
        paddingX={`5%`}
      >
        <Flex align={`center`} justify="center" width="100%">
          <FormWrapper maxWidth="640px">
            <Flex
              bg={theme.colors.white}
              direction="column"
              bgOpacity={0.15}
              radius="3rem"
              paddingY={`32px`}
              paddingX={`32px`}
              smPadding={`24px`}
              xsPadding={`24px`}
              boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
              align={`center`}
              justify={`center`}
            >
              {currentStep !== 5 && (
                <ProgressContainer style={{ width: "54px", height: "54px" }}>
                  <CircularProgressbar
                    value={progress}
                    text={`${Math.round(progress)}%`}
                    strokeWidth={10}
                    styles={buildStyles({
                      textSize: "24px",
                      pathColor: "#5BF1B2",
                      textColor: "#fff",
                      trailColor: "#FFFFFF66",
                    })}
                  />
                </ProgressContainer>
              )}
              <StepContainer onKeyDown={handleKeyDown} active={currentStep === 1}>
                <Components.Signup.StepOne
                  nextStep={nextStep}
                  formData={formData}
                  handleChange={handleChange}
                  handlePhoneNo={handlePhoneNo}
                  errors={errors}
                  isClickedFirstStep={isClickedFirstStep}
                />
              </StepContainer>

              <StepContainer active={currentStep === 2}>
                <Components.Signup.StepTwo
                  prevStep={prevStep}
                  nextStep={nextStep}
                  formData={formData}
                  handleChange={handleExperienceLevelClick}
                  errors={errors}
                />
              </StepContainer>

              <StepContainer active={currentStep === 3}>
                <Components.Signup.StepThree
                  prevStep={prevStep}
                  nextStep={nextStep}
                  formData={formData}
                  handleSelect={handleSelect}
                  errors={errors}
                />
              </StepContainer>

              <StepContainer active={currentStep === 4}>
                {clientSecret && (
                  <Elements stripe={stripePromise} options={options}  key={clientSecret}>
                    <Components.Signup.StepFour
                      prevStep={prevStep}
                      nextStep={nextStep}
                      formData={formData}
                      handlePayment={handlePayment}
                      handleChange={handleChange}
                      selectedSubcriptionData={
                        userId == null
                          ? selectedSubcriptionData
                          : singleUser?.subscriptionId
                      }
                      validateStep={() => validateStep(currentStep)}
                      handleCheckboxChange={handleCheckboxChange}
                      createLoading={createLoading}
                      errors={errors}
                      isClickedFourStep={isClickedFourStep}
                    />
                  </Elements>
                )}
              </StepContainer>
              <StepContainer active={currentStep === 5}>
                <Components.Signup.StepFive
                  prevStep={prevStep}
                  nextStep={feedbackSubmit}
                  formData={formData}
                  handleChange={handleChange}
                  handleSelection={handleHearaboutus}
                  errors={errors}
                  feedBackSending={feedBackSending}
                />
              </StepContainer>
            </Flex>
          </FormWrapper>
        </Flex>
      </SignupWrapper>
      <Components.Common.Footer />
      <style jsx>{`
        input::placeholder {
          color: white;
        }
      `}</style>
    </>
  );
}
