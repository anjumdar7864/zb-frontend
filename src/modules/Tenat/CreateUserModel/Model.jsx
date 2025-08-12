import { Flex, Grid, P, Paragraph } from "@/styles/CommonStyles";
import {
  CloseButton,
  ModalButton,
  ModalContent,
  ModalForm,
  ModalInput,
  ModalOverlay,
  ModalTitle,
  Note,
} from "./styles";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { CreateTenetAdmin } from "@/store/actions/tenets.action";
import { useFormik } from "formik";
import { CreateAdminSchema } from "@/schema";
import Components from "@/components";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { clearMessages, GetAllSubscription } from "@/store/actions";
import { IoMdClose } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import SwitchButton from "@/components/common/Switch/Switch";



const CreateUserModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [selectedPlan, setSelectedPlan] = useState(null); // State to track selected plan
  const [showNotes, setShowNotes] = useState(true);
  const [customCheck, setCustomCheck] = useState(false);

   

  

  useEffect(() => {
    dispatch(GetAllSubscription());
  }, [dispatch]);

  const {
    results,
    errors: error1,
    message: message2,
  } = useSelector((state) => state.billingReducer);

  // Moved this hook usage outside of any conditional logic   // check testing
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneApp: false,
      roles: [],
    },
    validationSchema: CreateAdminSchema,
    onSubmit: (values) => {
      const { firstName, lastName, email } = values;
      const result = {
        firstName,
        lastName,
        email,
        subscriptionId: selectedPlan,
        url: import.meta.env.VITE_APP_PAYMENT_PAGE || "https://dev3.zeitblast.com/#/signup/",
      };
      dispatch(CreateTenetAdmin(result));
      handleClose();
    },
  });

  const {
    message,
    errors: error,
    loading: createLoading,
  } = useSelector((state) => state.tenetsReducer);

  useEffect(() => {
    if (message !== "") {
      toast.success(message);
      setSelectedPlan(null);
      dispatch(clearMessages());
      setTimeout(() => onClose(), 1000);
    }
  }, [message]);

  const handleCheckboxChange = (plan) => {
    if (plan == "67445d36f4d8d6cff7dbde60" || plan == "67445e5cf4d8d6cff7dbde85" || plan == "6744614ba4d142ed16ea9c97" || plan == "6744617ea4d142ed16ea9c9e") {
      setCustomCheck(false)
    }
    setSelectedPlan(plan);
  };

  // Modified onClose handler to clear form and reset states
  const handleClose = () => {
    formik.resetForm();  // Reset the form fields
    setSelectedPlan(null); // Reset the selected plan
    setCustomCheck(false); // Reset the custom check state
    onClose(); // Close the modal
  };

   const priorityIds = [
    "67445d36f4d8d6cff7dbde60",
    "67445e5cf4d8d6cff7dbde85",
    "6744614ba4d142ed16ea9c97",
    "6744617ea4d142ed16ea9c9e",
    "67a46abcc15fce67f83fb05f"
  ]

   const reordered = [
    ...priorityIds
      .map(id => results.find(item => item._id === id))
      .filter(Boolean), // Remove undefined if any ID not found
    ...results.filter(item => !priorityIds.includes(item._id)),
  ];
  console.log("Reordered Results:", reordered);

  return isOpen ? (
    <ModalOverlay onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Flex direction="row" justify="space-between" align="center">
          {/* <ModalTitle>Create User</ModalTitle> */}
          <ModalTitle>Create Tenant</ModalTitle>
          <IoMdClose style={{ fontSize: '18px', cursor: 'pointer' }} onClick={handleClose} />

        </Flex>

        {showNotes && (
          <Note>
            <Flex align="center" gap="5px" justify="space-between" width="100%">
              <Flex direction="row" gap="0.5rem" align="center" width="100%">
                <FaInfoCircle size={20} style={{ color: "royalblue" }} />
                <Paragraph
                  color="#2E2E2E"
                  fontSize="16px"
                  lineHeight="14.8px"
                  weight="400"
                >
                  This Tenant would be charged according to the plan selected here
                </Paragraph>
              </Flex>
              <button
                color="#2E2E2E"
                style={{ cursor: "pointer", fontSize: "16px" }}
                onClick={() => setShowNotes(false)}
              >
                Dismiss
              </button>
            </Flex>
          </Note>
        )}
        <ModalForm onSubmit={formik.handleSubmit}>
          <Grid
            columns="repeat(1, 1fr)"
            lgColumns="repeat(2, 1fr)"
            padding="16px"
            gap={`1rem`}
            marginTop="15px"
            mdGap={`2rem`}
            margin="0 auto"
            justify="center"
            justifyItems={`left`}
            divideX={true}
            divideBorderColor={`#d5d0d0`}
          >
            <Flex direction="column" gap="30px" width="100%" paddingX="2rem">
              <Flex direction="column" gap="3px">
                <Paragraph color="#2E2E2E" fontSize="16px" weight="600">
                  User information
                </Paragraph>
                <Paragraph
                  color="#2E2E2E"
                  fontSize="16px"
                  lineHeight="14.8px"
                  weight="400"
                >
                  This new user will receive an invitation e-mail to easily
                  connect to Zeitblast.
                </Paragraph>
              </Flex>
              <Flex direction="column" gap="1rem">
                <Flex direction="column" gap="5px">
                  <Paragraph color="#2E2E2E" fontSize="16px" weight="600">
                    First Name
                  </Paragraph>
                  <Components.Common.MyInput
                    errormsg={false}
                    error={
                      formik.touched.firstName && formik.errors.firstName
                        ? formik.errors.firstName
                        : ""
                    }
                    style={{
                      border: formik.touched.firstName && formik.errors.firstName
                        ? "thin solid maroon"
                        : ""
                    }}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="First Name"
                    type="text"
                    value={formik.values.firstName}
                    name="firstName"
                    errorColor={`maroon`}
                  />
                </Flex>

                <Flex direction="column" gap="5px">
                  <Paragraph color="#2E2E2E" fontSize="16px" weight="600">
                    Last Name
                  </Paragraph>
                  <Components.Common.MyInput
                    errormsg={false}
                    style={{
                      border: formik.touched.lastName && formik.errors.lastName
                        ? "thin solid maroon"
                        : ""
                    }}
                    error={
                      formik.touched.lastName && formik.errors.lastName
                        ? formik.errors.lastName
                        : ""
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="Last Name"
                    type="text"
                    value={formik.values.lastName}
                    name="lastName"
                    errorColor={`maroon`}
                  />
                </Flex>

                <Flex direction="column" gap="5px">
                  <Paragraph color="#2E2E2E" fontSize="16px" weight="600">
                    Email
                  </Paragraph>
                  <Components.Common.MyInput
                    style={{
                      border: formik.touched.email && formik.errors.email
                        ? "thin solid maroon"
                        : ""
                    }}
                    errorColor={`maroon`}
                    errormsg={false}
                    error={
                      formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : ""
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="Email"
                    type="text"
                    value={formik.values.email}
                    name="email"
                  />
                </Flex>
              </Flex>
            </Flex>

            <Flex direction="column" gap="20px" paddingX="2rem">

              <Flex direction="column" gap="15px">
                <Paragraph color="#2E2E2E" fontSize="16px" weight="600">
                  Subscription
                </Paragraph>
                <Flex direction="column" gap="1.5rem">
                   <Flex gap="5px" align="start">
                    <div>
                      {/* <ModalInput
                        paddingTop="4px"
                        type="checkbox"
                        placeholder=""
                        checked={customCheck}
                        onChange={() => setCustomCheck(!customCheck)}
                      /> */}

                      <SwitchButton
                        // disabled={arr?.replaceHistory ? true : false}
                        active={customCheck}
                        // row={arr}
                        handleActive={() => setCustomCheck(!customCheck)}
                      />
                    </div>
                    <Flex direction="column" align="start" justify="center">
                      <Paragraph color="#2E2E2E" fontSize="16px" weight="600">
                        CUSTOM
                      </Paragraph>
                      <Paragraph

                        color="#2E2E2E"
                        fontSize="16px"
                        Weight="300"
                        lineHeight="14.8px"
                      >

                      </Paragraph>
                    </Flex>
                  </Flex>
                  {reordered?.map((result, index) => (
                    // <Flex style={{display:index > 3 && !customCheck ? "none" : ""}} key={index} gap="5px" align="start">
                    <Flex style={{ display: customCheck && index > 4 ? "" : customCheck && index <= 4 ? "none" : !customCheck && index > 4 ? "none" : !customCheck && index < 4 ? "" : "" }} key={index} gap="5px" align="start">
                      <div>
                        <ModalInput
                          paddingTop="4px"
                          type="checkbox"
                          placeholder=""
                          checked={selectedPlan === result?._id}
                          onChange={() => handleCheckboxChange(result?._id)}
                        /></div>
                      <Flex direction="column" align="start" justify="center">
                        <Paragraph color="#2E2E2E" fontSize="16px" weight="600">
                          {result?.title}
                        </Paragraph>
                        <Paragraph
                          key={index}
                          color="#2E2E2E"
                          fontSize="16px"
                          Weight="300"
                          lineHeight="14.8px"
                        >
                          {result?.features?.map((description, index) => (
                            <span key={index} style={{ marginRight: "8px" }}>
                              <strong>•</strong> {description}
                            </span>
                          ))}
                        </Paragraph>
                      </Flex>
                    </Flex>
                  ))}
                 
                </Flex>
              </Flex>
            </Flex>
          </Grid>
          <div style={{ width: '100%', height: "1px", backgroundColor: "#ebebeb", margin: "10px 0px" }}></div>
          <Flex gap="16px" justify="end" align="center">
            <Paragraph style={{ cursor: "pointer" }} color="#2E2E2E" fontSize="16px" onClick={handleClose}>Close</Paragraph>
            {/* <ModalButton
              bg="white"
              border="1px solid #1E9B50"
              color="#1E9B50"
              onClick={onClose}
            >
              Cancel
            </ModalButton> */}
            <ModalButton disabled={selectedPlan == null || (!(formik.isValid && formik.dirty)) ? true : false} bg={selectedPlan == null || (!(formik.isValid && formik.dirty)) ? "#E0E0E0" : "#1E9B50"} color={selectedPlan == null || (!(formik.isValid && formik.dirty)) ? "gray" : "white"} type="submit">
              Confirm
            </ModalButton>
          </Flex>
        </ModalForm>
        <CloseButton onClick={handleClose}>
          <IoCloseSharp size={20} />
        </CloseButton>
      </ModalContent>
    </ModalOverlay>
  ) : null; // Only renders the modal if isOpen is true
};

export default CreateUserModal;
