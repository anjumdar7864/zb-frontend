import React, { useEffect, useState } from "react";
import {
  AdditionalPopup,
  BillingContainer,
  Card,
  CloseButton,
  EnterpriseCard,
  Modal,
  ModalContent,
  NewBox,
  PurchaseButton,
  SubscriptionCardBG,
  UpdateButton,
} from "./styles";
import { Flex, Grid, P } from "@/styles/CommonStyles";
import { FaCreditCard } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { HiInformationCircle } from "react-icons/hi2";
import { PaymentHistory } from "./PaymentHistory";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  GetAllSubscription,
  UpdateSubscription,
  clearErrors,
  clearMessages,
  GetSingleAdminUser,
} from "@/store/actions";
import { getUserAuth } from "@/utils/storage";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const Billing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAdditionalPopop, setShowAdditionalPopop] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const [loadingStates, setLoadingStates] = useState({}); // Manage loading state for each button

  const AdditionalData = [
    "Localized Numbers For Choosen Market",
    "Proprietary Algorithm that Delivers",
    "Analytics & KPI Dashboard",
    "CRM Integrations",
    "Live Individual Onboarding",
  ];

  const authUser = getUserAuth();
  const user = JSON.parse(authUser.user);

  useEffect(() => {
    dispatch(GetAllSubscription());
    dispatch(GetSingleAdminUser(user?._id));
  }, [dispatch]);

  const {
    results,
    errors: error,
    message,
    singleUser,
  } = useSelector((state) => state.billingReducer);

  useEffect(() => {
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message !== "") {
      toast.success(message);
      dispatch(clearMessages());
    }
  }, [error, dispatch, message]);

  const handleUpdateSubscription = (subscriptionId) => {
    setLoadingStates((prev) => ({ ...prev, [subscriptionId]: true }));
    dispatch(
      UpdateSubscription({
        adminId: singleUser?._id,
        stripeCustomerId: singleUser?.stripeCustomerId,
        newMongoSubscriptionId: subscriptionId,
      })
    ).finally(() => {
      setLoadingStates((prev) => ({ ...prev, [subscriptionId]: false }));
    });
  };

  return (
    <BillingContainer>
      <Flex direction="column" gap="7px">
        <P fontSize="20px" fontweight="500" color="black">
          Billing
        </P>
        <Flex align="center" justify="space-between">
          <P fontSize="14px" fontweight="300">
            Manage your subscription, update billing info, view invoices and
            receipts
          </P>
          <UpdateButton onClick={() => navigate("/settings/update-billing")}>
            <FaCreditCard />
            <P fontSize="14px" fontweight="300">
              Update Credit Card
            </P>
          </UpdateButton>
        </Flex>
      </Flex>
      <Flex direction="column" gap="5px">
        <P fontSize="16px" fontweight="500" color="black">
          Subscription
        </P>
        <SubscriptionCardBG>
          <Grid
            columns="repeat(1, 1fr)"
            lgColumns="repeat(3, 1fr)"
            padding="16px"
            gap={`1rem`}
            mdGap={`3rem`}
            margin="0 auto"
            justify="center"
            justifyItems={`center`}
          >
            {results?.length > 0 &&
              results
                //?.filter((item) => item.title !== "Custom")
                .map((item, index) => {
                  return (
                    <Card isPro={item.title === "PRO"} key={index}>
                      <Flex direction="column" justify="center" align="center">
                        <P fontSize="16px" fontweight="500" color="black">
                          {item.title}
                        </P>
                        {item?.title !== "Custom" && (
                          <Flex align="end" gap="5px">
                            <P
                              fontSize="24px"
                              fontweight="500"
                              color="#5867dd"
                              paddingBottom="5px"
                            >
                              {item.currency}
                            </P>
                            <P fontSize="48px" fontweight="600" color="#5867dd">
                              ${item.price}
                            </P>
                            <P
                              fontSize="12px"
                              fontweight="500"
                              color="gray"
                              paddingBottom="10px"
                            >
                              {item.period}
                            </P>
                          </Flex>
                        )}

                        <Flex direction="column" justify="flex-start">
                          {item?.features?.map((feature, index) => {
                            return (
                              <Flex justify="center" gap="5px" key={index}>
                                <IoCheckmark color="#5867dd" size={20} />
                                <P
                                  fontSize="10px"
                                  fontweight="300"
                                  color="gray"
                                  paddingBottom="10px"
                                  textAlign="left"
                                >
                                  {feature}
                                </P>
                                <HiInformationCircle color="gray" />
                              </Flex>
                            );
                          })}
                        </Flex>
                        {item.title === "PRO" && (
                          <Flex direction="column">
                            <Flex
                              direction="column"
                              gap="10px"
                              paddingTop="10px"
                              paddingBottom="20px"
                            >
                              <P
                                decoration="underline"
                                fontSize="12px"
                                fontweight="400"
                                color="#5867dd"
                                onMouseEnter={() =>
                                  setShowAdditionalPopop(true)
                                }
                                onMouseLeave={() =>
                                  setShowAdditionalPopop(false)
                                }
                              >
                                Additional Features
                              </P>
                              <P fontSize="12px" fontweight="400" color="gray">
                                Next Billing 11/22/2023
                              </P>
                            </Flex>
                            <UpdateButton>Update Subscription</UpdateButton>
                            {item.title === "PRO" && showAdditionalPopop && (
                              <AdditionalPopup>
                                {AdditionalData.map((feature, index) => {
                                  return (
                                    <Flex justify="left" gap="5px" key={index}>
                                      <IoCheckmark color="#5867dd" size={20} />
                                      <P
                                        fontSize="10px"
                                        fontweight="300"
                                        color="gray"
                                        paddingBottom="10px"
                                        textAlign="left"
                                      >
                                        {feature}
                                      </P>
                                    </Flex>
                                  );
                                })}
                              </AdditionalPopup>
                            )}
                          </Flex>
                        )}
                        {item?._id?.toString() ==
                        singleUser?.subscriptionId?._id?.toString() ? (
                          <PurchaseButton>Current Subscription</PurchaseButton>
                        ) : (
                          <>
                        {(item?.title !== "Custom" && item?.title !== "Jumpstart JV") && (
  <UpdateButton>
    <button
      onClick={() => {
        handleUpdateSubscription(item?._id);
      }}
      disabled={loadingStates[item?._id] || false}
    >
      {loadingStates[item?._id]
        ? "Updating Subscription..."
        : "Update Subscription"}
    </button>
  </UpdateButton>
)}

{(item?.title === "Custom" || item?.title === "Jumpstart JV") && (
  <UpdateButton>
    <button
      onClick={() => {
        setUpdatePopup(true);
      }}
      //disabled={loadingStates[item?._id] || false}
    >
      Contact Us
    </button>
  </UpdateButton>
)}

                          </>
                        )}
                      </Flex>
                    </Card>
                  );
                })}
          </Grid>
        </SubscriptionCardBG>
      </Flex>
      <PaymentHistory />

      {updatePopup && (
        <Modal>
          <ModalContent>
            <Flex justify="right" cursor="pointer">
              <RxCross2 size={20} onClick={() => setUpdatePopup(false)} />
            </Flex>
            <Flex align="center" justify="center" direction="column" gap="30px">
              <P
                fontSize="24px"
                fontweight="600"
                textAlign="center"
                color="black"
              >
                Update Your Subscription
              </P>

              <EnterpriseCard>
                <NewBox>New!</NewBox>
                <P
                  fontSize="18px"
                  fontweight="600"
                  textAlign="center"
                  color="black"
                >
                  ENTERPRISE
                </P>
                <P
                  fontSize="30px"
                  fontweight="600"
                  textAlign="center"
                  color="#5867dd"
                >
                  Contact Us
                </P>
                <Flex direction="column" align="left">
                  {AdditionalData.map((feature, index) => {
                    return (
                      <Flex justify="left" gap="5px" key={index}>
                        <IoCheckmark color="#5867dd" size={20} />
                        <P
                          fontSize="10px"
                          fontweight="300"
                          color="gray"
                          paddingBottom="10px"
                          textAlign="left"
                        >
                          {feature}
                        </P>
                        <HiInformationCircle color="gray" />
                      </Flex>
                    );
                  })}
                </Flex>
                <Flex direction="column" gap="20px">
                  <P
                    decoration="underline"
                    fontSize="12px"
                    fontweight="400"
                    color="#5867dd"
                  >
                    Additional Features
                  </P>
                  <UpdateButton onClick={() => setUpdatePopup(true)}>
                    Contact Us
                  </UpdateButton>
                </Flex>
              </EnterpriseCard>
            </Flex>
          </ModalContent>
        </Modal>
      )}
    </BillingContainer>
  );
};

export default Billing;
