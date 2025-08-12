import React, { useState, useEffect } from "react";
import {
  CardElement,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getUserAuth } from "@/utils/storage";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY?.replace(/\/$/, '') ||
  "pk_test_51RbCRf2N3jMOC2OU3qoKdAKhRe2BIAgOPQctcgwrYVAqpkT5fQUTGOxoLsJte6CqPgsdW6OQjYLc7tlskoo7JoZO00xMTkKnRs"
);

function UpdateCardForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
 
  const authUser = getUserAuth();
  const user = JSON.parse(authUser.user);

  useEffect(() => {
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
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => setError("Failed to fetch client secret"));
  }, []);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/settings/billing");
      }, 2000); // Redirect after 2 seconds
    }
  }, [success, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const result = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      setError(null);

      const paymentMethodId = result.setupIntent.payment_method;

      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL
        }user/v1/api/admin/update/subscription/payment/method`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subscriptionId: user?.stripeSubscriptionId,
            paymentMethodId,
          }),
        }
      );

      const data = await response.json();

      if (
        data.success &&
        data.subscription.default_payment_method === paymentMethodId
      ) {
        setSuccess(true);
      } else {
        setError("Failed to update subscription");
      }
    }

    setIsProcessing(false);
  };

 

  return (
    <form onSubmit={handleSubmit}>
      {/* <CardElement /> */}
      <div>
        <div>
          Card number
        </div>
        <div style={{ border: "solid 1px #E0E0E0", borderRadius: "8px", height: '50px', paddingTop: "15px", paddingLeft: "15px" }}>
          <div>
            <CardNumberElement />

          </div>
          <div style={{}}>
            <div>
              <label>
                Expiration date
                <CardExpiryElement />
              </label>
            </div>
            <div></div>
          </div>

        </div>
      </div>
      <button type="submit" disabled={!stripe || isProcessing || !clientSecret}>
        {isProcessing ? "Processing..." : "Update Card"}
      </button>
      {error && <div>{error}</div>}
      {success && <div>Card updated successfully! Redirecting...</div>}
    </form>
  );
}

export default function App() {
  return (
    <Elements stripe={stripePromise}>
      <UpdateCardForm />
    </Elements>
  );
}
