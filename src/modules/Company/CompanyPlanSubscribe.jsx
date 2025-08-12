import React, { useState } from "react";
import styles from "./CompanyA.module.css";
import { CircularLoader } from "@/components/common";
import { MdInfoOutline, MdOutlineRefresh } from "react-icons/md";
import { nextBillingDate } from "@/utils/helpers";
import SubscribedTable from "./SubscribedTable";
import CompanyPlansMinCard from "./CompanyPlansMinCard";
import DownGradeModal from "./DownGradeModal";
import SelectOutbonNumber from "./SelectOutbondNumber";
import CancelModal from "./CancelModal";
import CancelConfirmModal from "./CancelConfirmModal";

const CompanyPlanSubscribe = ({
  subscribePackage = {},
  data,
  cancelSubcription,
  isLoading,
  setSubscribe,

  handleContinue = () => { },

}) => {
  const {
    _id,
    title,
    tenantSubscriptionType,
    createdAt,
    nextInvoiceDate,
    isCanceledSubscription,
    updatedAt,
    lastPayment="",
  } = subscribePackage;

  const [downGradeStep, setDownGradeStep] = useState(0);
  const [isRenewalLoading, setIsRenewalLoading] = useState(false); // Add loading state
  const [downGradePakage, setDownGradePakage] = useState({
    curruntPackageTitle: "",
    selectedPackageTitle: "",
    selectedPackagePrice: "",
  });
  const [marketRemove, setMarketRemove] = useState(false);

  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openCancelModalConfirm, setOpenCancelModalConfirm] = useState(false);
  const [packageType, setPackageType] = useState("monthly")
  const user = localStorage.getItem("user");
  const [canceleReason, setCancelReason] = useState("")
  const [additionalCancelReason, setAdditionalCancelReason] = useState("")
  const createdDate = JSON.parse(user)?.createdAt;

  const date = new Date(nextInvoiceDate);
  const updatedAtDate = new Date(lastPayment);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const formattedUpdatedDate = updatedAtDate.toLocaleDateString("en-US", options);
  const handleRenewClick = () => {
    setIsRenewalLoading(true); // Set loading state to true
    setTimeout(() => {
      setIsRenewalLoading(false); // Reset loading state after 1 second
    }, 500);
  };

  console.log("subscribePackage", subscribePackage);

  const handleCancel = () => {
    setOpenCancelModalConfirm(true)
  }


  const handleCancelConfirm = () => {
    cancelSubcription(canceleReason, additionalCancelReason)
    setOpenCancelModalConfirm(false)
    setOpenCancelModal(false)
  }


  const sortedUsers = React.useMemo(() => {
    if (!data?.length) return [];

    const currentUser = data.find(user => user._id === _id,
);
    const others = data.filter(user => user._id !== _id,
);

    return currentUser ? [currentUser, ...others] : data;
  }, [data, _id,
]);



  return (
    <div
      style={{ paddingBottom: "40px" }}
      className={styles.CompanyInfo_container}
    >
      <div style={{ display: "flex", gap: "20px", height: "100%" }}>
        <div
          style={{ flexGrow: 1, }}
          className={styles.CompanyInfo_fieldsContainer}
        >
          <div style={{ padding: "20px" }} className={styles.companyInfo_title}>
            Overview
          </div>

          <div style={{ padding: "0px 16px" }}>
            <div className={styles.SubscribedTop}>
              <div className={styles.SubscribedTopItem}>
                <div style={{ color: "#012635", textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    Your Plan
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: "22px",
                    }}
                  >
                    {title || ""}
                  </div>
                </div>
              </div>
              <div className={styles.SubscribedTopItem}>
                <div style={{ color: "#012635", textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    {" "}
                    {tenantSubscriptionType?.toUpperCase()}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: "22px",
                    }}
                  >
                    {" "}
                    {tenantSubscriptionType?.toUpperCase()}
                  </div>
                  {/* <div style={{ fontSize: "12px", fontWeight: 400, lineHeight: "20px" }}> MOUNTHLY</div>
                                    <div style={{ fontSize: "14px", fontWeight: 500, lineHeight: "22px" }}> MOUNTHLY</div> */}
                </div>
              </div>
              <div className={styles.SubscribedTopItem}>
                <div style={{ color: "#012635", textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    Last Billing Date
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: "22px",
                    }}
                  >
                    {nextInvoiceDate && formattedUpdatedDate}
                  </div>
                </div>
              </div>
              <div style={{ border: 0 }} className={styles.SubscribedTopItem}>
                <div style={{ color: "#012635", textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    Renewal Date{" "}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "22px",
                      }}
                    >
                      {isRenewalLoading ? (
                        <div>Loading...</div>
                      ) : (
                        <div>{nextInvoiceDate ? formattedDate : ""}</div>
                      )}
                    </div>
                    <MdOutlineRefresh
                      style={{
                        fontSize: "18px",
                        backgroundColor: "#C2FFEC",
                        borderRadius: "5px",
                      }}
                      onClick={handleRenewClick}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                color: "#666666",
                fontSize: "14px",
                lineHeight: "22px",
                fontWeight: 400,
                padding: "15px 0px",
              }}
            >
              Here is the current status of your plan. You can add or remove
              users, number or teams in their related pages
            </div>

            <div className={styles.SubscribedBody}>
              <SubscribedTable subscribePackage={subscribePackage} />
              <div style={{ display: "flex", gap: "8px", padding: "10px 0px" }}>
                <div>
                  <MdInfoOutline
                    style={{ fontSize: "22px", color: "#00BD82" }}
                  />
                </div>
                <div
                  style={{
                    color: "#777777",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "22px",
                  }}
                >
                  Any additional user or number that you add will be reflected
                  in the cost of your next invoice.
                </div>
              </div>
              <div
                style={{
                  color: "#012635",
                  fontWeight: 600,
                  fontSize: "24px",
                  lineHeight: "32px",
                  marginTop: "10px",
                }}
              >
                Included Messaging destinations
              </div>
              <div
                style={{
                  color: "#012635",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "22px",
                  marginTop: "10px",
                }}
              >
                Inbound calls
              </div>
              <div
                style={{
                  color: "#012635",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "22px",
                  marginTop: "5px",
                  marginBottom: "20px",
                }}
              >
                Unlimited messages to mobiles to USA
              </div>
            </div>
          </div>
          <div className={styles.SubscribedBottom}>
            {isLoading ? (
              <CircularLoader />
            ) : (
              <div
                // onClick={() => cancelSubcription()}
                onClick={() => {
                  if (isCanceledSubscription) {
                    cancelSubcription()
                  } else {
                    setOpenCancelModal(true)

                  }
                }}
                style={{
                  cursor: "pointer",
                  border: "solid  1px #E0E0E0 ",
                  padding: "0px 12px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  color: "#777777",
                }}
              >
                {isCanceledSubscription
                  ? "Resume Subscription"
                  : "Cancel Subscription"}
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            width: "40%",
            minWidth: "408px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            // height: "740px",
            overflow: "auto",
            height: "100%",
          }}
          className={styles.CompanyInfo_fieldsContainer}
        >
          <div>
            <div
              style={{
                color: "#012635",
                fontSize: "24px",
                fontWeight: 600,
                lineHeight: "32px",
              }}
            >
              Upgrade Plan
            </div>
            <div
              style={{
                color: "#666666",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "22px",
                color: "#666666",
                margin: "10px 0px",
              }}
            >
              Try our add-ons to for great performance teams.
            </div>




            <div>
              <div className={styles.subscription_cycle}>
                <span onClick={() => setPackageType("yearly")} className={packageType == "yearly" ? styles.subscription_Annually : styles.subscription_AnnuallyDis}>
                  <div style={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>Annually</div>
                  <span>save upto 20%</span>
                </span>
                <span onClick={() => setPackageType("monthly")} className={packageType != "monthly" ? styles.subscription_monthly : styles.subscription_monthlyAc}>Monthly</span>
              </div>
              <div style={{ color: "#777777", fontSize: "12px", fontWeight: 400, lineHeight: "20px", marginTop: "5px" }}>Pay once a year, commit annually</div>
            </div>




          </div>
          <div
            style={{
              flexGrow: 1,
              overflow: "auto",
              paddingRight: "15px",
              marginBottom: "24px",
            }}
            className={styles.customScroll}
          >
            {sortedUsers.map((cardData, index) => {
              return (
                <CompanyPlansMinCard
                  setDownGradePakage={setDownGradePakage}
                  downGradeStep={downGradeStep}
                  setDownGradeStep={setDownGradeStep}
                  handleContinue={handleContinue}
                  data={cardData}
                  setSubscribe={setSubscribe}
                  currentPackageId={_id}
                  currentPackageTitle={title}
                  packageType={packageType}
                  tenantSubscriptionType={tenantSubscriptionType}
                  extraMarket={subscribePackage.extraNumber}
                  setMarketRemove={setMarketRemove}
                  marketRemove={marketRemove}
                  user={user}
                />
              );
            })}
          </div>
        </div>
      </div>
      <DownGradeModal
        downGradePakage={downGradePakage}
        downGradeStep={downGradeStep}
        setDownGradeStep={setDownGradeStep}
        marketRemove={marketRemove}
        setMarketRemove={setMarketRemove}
      />
      <SelectOutbonNumber
        downGradePakage={downGradePakage}
        downGradeStep={downGradeStep}
        setDownGradeStep={setDownGradeStep}
        marketRemove={marketRemove}
        setMarketRemove={setMarketRemove}
      />
      <CancelModal

        open={openCancelModal}
        setOpenCancelModal={setOpenCancelModal}
        handleCancel={handleCancel}
      />
      <CancelConfirmModal

        open={openCancelModalConfirm}
        setOpenCancelModal={() => {
          setOpenCancelModalConfirm(false)
          setOpenCancelModal(false)
        }}
        handleCancel={handleCancelConfirm}
        setCancelReason={setCancelReason}
        setAdditionalCancelReason={setAdditionalCancelReason}
        additionalCancelReason={additionalCancelReason}
        canceleReason={canceleReason}
      />
    </div>
  );
};

export default CompanyPlanSubscribe;
