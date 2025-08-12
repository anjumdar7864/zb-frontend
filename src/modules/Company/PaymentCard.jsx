import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  Elements,
} from "@stripe/react-stripe-js";
import styles from "./CompanyA.module.css";
import { getUserAuth } from "@/utils/storage";
// import ProcessingModal from "./ProcessingModal";
import AllGood from "./AllGood";
import DottedCircularLoader from "@/components/common/DottedCircularLoader/DottedCircularLoader";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY?.replace(/\/$/, '') ||
  "pk_test_51RbCRf2N3jMOC2OU3qoKdAKhRe2BIAgOPQctcgwrYVAqpkT5fQUTGOxoLsJte6CqPgsdW6OQjYLc7tlskoo7JoZO00xMTkKnRs"
);

const PaymentForm = ({ handleClose, handleSuccess, setProcessing }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);


  const stripe = useStripe();
  const elements = useElements();
  const authUser = getUserAuth();
  const user = JSON.parse(authUser.user);
  const userToken = localStorage.getItem("userToken");
  const navigate = useNavigate()

  // Handle success state to close modal
  useEffect(() => {
    if (success) {
      handleSuccess();
    }
  }, [success, handleSuccess]);

  useEffect(() => {
    // Fetch the client secret for the setup intent
    fetch(
      `${import.meta.env.VITE_APP_BACKEND_BASE_URL
      }user/v1/api/admin/create/setup/intent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId: user?.stripeCustomerId }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setError("Failed to retrieve client secret");
        }
      })
      .catch((err) => setError("Failed to fetch client secret"));
  }, [user?.stripeCustomerId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setTimeout(() => {
      setIsProcessing(true);
      setProcessing(true);
    }, 1000);

    try {
      const result = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        const paymentMethodId = result.setupIntent.payment_method;

        const response = await fetch(
          `${import.meta.env.VITE_APP_BACKEND_BASE_URL
          }user/v1/api/admin/update/subscription/payment/method`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${userToken}`,
            },
            // headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              subscriptionId: user?.stripeSubscriptionId,
              customerId: user?.stripeCustomerId,
              paymentMethodId,
            }),
          }
        );

        const data = await response.json();
        if (user?.status == "Canceled" ) {
        navigate(`/company?subscribedId=${data?.currentSubscriptionId}&subscriptionType=monthly&plan=true`)
        // console.log("Payment method updated successfully", data);
          
        }
        if (
          data.success
          // &&
          // data?.updatedSubscriptions[0]?.default_payment_method ===
          //   paymentMethodId
        ) {

          setSuccess(true);
        } else {
          setError("Failed to update subscription");
        }
      }

    } catch (error) {
      console.log("check update error", error,);

      setError("Payment processing failed. Please try again.");
    } finally {
      // setIsProcessing(false);
      setTimeout(() => {
        setIsProcessing(false);
        setProcessing(false);
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {isProcessing ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "24px 16px",
          }}
        >
          <DottedCircularLoader />
          <div
            style={{
              color: "#073F56",
              fontSize: "16px",
              paddingLeft: "24px",
              paddingRight: "24px",
              paddingBottom: "24px",
              fontWeight: "400",
            }}
          >
            We are currently checking your credit card details. Please wait
            until we receive confirmation from your bank.
          </div>
        </div>
      ) : (
        <div className={styles.payment_form}>
          <div className={styles.form_group} style={{ marginBottom: "10px" }}>
            <div style={{ paddingBottom: "5px" }}>Card Number</div>
            <div className={styles.card_number_container}>
              <CardNumberElement className={styles.card_input} />
              <div className={styles.card_icons}>
                {/* Placeholder for card icons */}
              </div>
            </div>
          </div>

          <div className={styles.form_row}>
            <div className={styles.form_group}>
              <div style={{ paddingBottom: "5px" }}>Expiration Date</div>
              <CardExpiryElement className={styles.card_input} />
            </div>
            <div className={styles.form_group}>
              <div style={{ paddingBottom: "5px" }}>CVC</div>
              <CardCvcElement className={styles.card_input} />
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          border: "1px solid #E0E0E0",
          display: "flex",
          justifyContent: "end",
          padding: "10px",
          gap: "20px",
        }}
      >
        {error && <div style={{ color: "red" }}>{error}</div>}
        {!isProcessing && (
          <button
            onClick={handleClose}
            type="button"
            style={{ padding: "10px 12px" }}
            className={styles.CompanyInfo_undo}
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          style={{ height: "40px" }}
          className={
            isProcessing ? styles.CompanyInfo_cancel : styles.CompanyInfo_save
          }
          disabled={!stripe || isProcessing || !clientSecret}
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

const PaymentCard = ({ handleClose, handleSuccess, setProcessing }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        handleClose={handleClose}
        handleSuccess={handleSuccess}
        setProcessing={setProcessing}
      />
    </Elements>
  );
};

export default PaymentCard;
