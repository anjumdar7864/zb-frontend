import Raect, { useState, useEffect } from "react";
import styles from "./CompanyA.module.css";
import CompanyPlansCard from "./CompanyPlansCard";
import { commonAPICall } from "@/services/api/common";
import { REQUEST_TYPES, ENDPOINTS } from "@/utils/constant/url";
import DropDown from "@/components/common/DropDwon/DropDown";
import { Country, State, City } from "country-state-city";
import { CircularLoader } from "@/components/common";
import PlanCardSkeleton from "./PlanCardSkeleton";
import CompanyPlanSubscribe from "./CompanyPlanSubscribe";
import { toast } from "react-hot-toast";
import { logOut } from "@/store/actions";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CancelModal from "./CancelModal";
import CancelConfirmModal from "./CancelConfirmModal";
import SubscribeModal from "./SubscribeModal";
const CompanyPlan = () => {
  const [state, setState] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const [activeCycle, setActiveCycle] = useState("monthly");
  const [subscribePackage, setSubscribePackage] = useState({});
  const [subscribe, setSubscribe] = useState(0);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openCancelModalConfirm, setOpenCancelModalConfirm] = useState(false);
  const [canceleReason, setCancelReason] = useState("");
  const [addionalData, setAddionalData] = useState("");
  const [open, setOpen] = useState(false);
  const [subscribedplan, setSubscribedplan] = useState({});
  const countries = Country.getAllCountries();
  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );
  const userToken = localStorage.getItem("userToken");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // const planColorScheme = [
  //   { name: "I'm Serious", color: "#00BD82", bgColor: "white" },
  //   { name: "Time to Scale", color: "#005ABB", bgColor: "white" },
  //   { name: "Market Dominator", color: "#012635", bgColor: "white" },
  //   { name: "Jumpstart JV", color: "#00BD82", bgColor: "#012635" },
  //   { name: "Custom", color: "#005ABB", bgColor: "#D6E7FC" },
  // ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const planColorScheme = [
    { name: "I’M SERIOUS", color: "#00BD82", bgColor: "white" },
    { name: "TIME TO SCALE", color: "#005ABB", bgColor: "white" },
    { name: "MARKET DOMINATOR", color: "#012635", bgColor: "white" },
    { name: "JUMPSTART JV", color: "#00BD82", bgColor: "#012635" },
    { name: "CUSTOM", color: "#005ABB", bgColor: "#D6E7FC" },
  ];
  // console.log("subscribePackage data", user);

  // const fetchDataGetUser = async () => {
  //   try {
  //     const response = await fetch('https://dev2-api.zeitblast.com/user/v1/api/admin/66fd37a04f9f1a3bc92a7111 '); // Replace with your API endpoint
  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.statusText}`);
  //     }
  //     const result = await response.json();
  //     setData(result);
  //     localStorage.setItem("user", result);
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     // setLoading(false);
  //   }
  // };

  useEffect(() => {
    const fetchDataGetUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/user/v1/api/admin/${user?._id
          }`,  {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userToken}` // replace with your actual token
        }},
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);

        // Convert result to JSON string before storing in sessionStorage
        // localStorage.setItem("user", JSON.stringify(result));
      } catch (err) {
        setError(err.message);
      } finally {
        // setLoading(false);
      }
    };
    fetchDataGetUser();
  }, []);

  const fetchDataGetUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/user/v1/api/admin/${user._id
        }`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userToken}`,
        },
      },
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);

      // Convert result to JSON string before storing in sessionStorage
      localStorage.setItem("user", JSON.stringify(result));
    } catch (err) {
      setError(err.message);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    // if (subscribePackage.title){
    //   setSubscribe(2)
    // }else {

    //   setSubscribe(1)
    // }
    if ( user?.isCanceledSubscription && user?.status === "Canceled") {
      setSubscribe(1);
    } else if (user.subscriptionId || user?.isDeclinedSubscription) {
      setSubscribe(2);
    } else {
      setSubscribe(1);
    }
  }, [user]);
  const fetchData = async (type = "monthly") => {
    try {
      setLoader(true);
      const { data, isError, message, sessionExpired } = await commonAPICall(
        REQUEST_TYPES.GET,
        `${ENDPOINTS.GET_PLAN}?tenantId=${user?._id}`
      );
      setLoader(false);
      if (sessionExpired) {
        // sessionStorage.clear()
        dispatch(logOut());
        toast.success("Logout Successfully.");
        navigate("/Login");
      }
      if (isError) {
        return toast.error(message);
      }
      const resp = [];
      data?.results.map((item) => {
        const plan = planColorScheme.find((x) => x.name === item.title);
        // item.color = plan?.color || "white";
        // item.bgColor = plan?.bgColor || "white";
        item.color = plan?.color || "#00BD82";
        item.bgColor = plan?.bgColor || "white";
        resp.push(item);
      });

        if (!resp?.length) return [];
  
      const currentUser = resp.find(item => item._id === user?.currentSubscriptionId,
  );
      const others = resp.filter(item => item._id !== user?.currentSubscriptionId,
  );
  
      const resp1 =  currentUser ? [currentUser, ...others] : resp;
      // setState(resp || []);
      setState(resp1 || []);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSubscribedPackge = async () => {
    const userFetch = JSON.parse(
      localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
    );
    const shadowUser = { ...userFetch }
    try {
      setLoader(true);
      const user = JSON.parse(
        localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
      );
      const { data, isError, message, sessionExpired } = await commonAPICall(
        REQUEST_TYPES.GET,
        `${ENDPOINTS.GET_SINGLE_SUBSCIPTION}/${user?.subscriptionId || user?.currentSubscriptionId}`
      );
      setLoader(false);

      if (sessionExpired) {
        // sessionStorage.clear()
        dispatch(logOut());
        // toast.success("Logout Successfully.");
        navigate("/Login");
      }
      if (isError) {
        return toast.error(message);
      }
      setSubscribePackage(data || {});
      console.log("subscribePackage", shadowUser);

      shadowUser.isCanceledSubscription = data?.isCanceledSubscription
      // localStorage.setItem("user", JSON.stringify(shadowUser));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user?.subscriptionId) {
      fetchSubscribedPackge();
    }else if (user?.currentSubscriptionId && user?.isDeclinedSubscription) {
      fetchSubscribedPackge();

    }
    fetchData(activeCycle);
  }, [activeCycle]);

  // useEffect(() => {
  //   if (subscribe == 2 && user?.subscriptionId) {
  //     fetchSubscribedPackge();
  //   }
  // }, [subscribe]);
  const handleContinue = () => {
    if (user?.subscriptionId) {
      fetchSubscribedPackge();
    }
  };

  const cancelSubcription = async (cancelReason, additionalInformation) => {
    try {
      setLoader(true);
      const user = JSON.parse(
        localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
      );
      const payload = {
        stripeCustomerId: user?.stripeCustomerId,
        adminId: user?._id,
        cancelReason: cancelReason,
        cancelAdditionalInfo: additionalInformation,
      };
      const payloadsecond = {
        stripeCustomerId: user?.stripeCustomerId,
        adminId: user?._id,
        cancelReason: cancelReason,
      };
      const { data, isError, message, sessionExpired } = await commonAPICall(
        REQUEST_TYPES.PATCH,
        `${ENDPOINTS.CANCEL_SUBSCIPTION}`,
        additionalInformation ? payload : payloadsecond
      );
      setLoader(false);
      // fetchDataGetUser()
      if (sessionExpired) {
        dispatch(logOut());
        // toast.success("Logout Successfully.");

        navigate("/Login");

        // sessionStorage.clear()
      }
      await fetchSubscribedPackge();
      console.log(
        "subscribePackage?.cancelSubcription is",
        subscribePackage?.isCanceledSubscription
      );
      if (!isError && !subscribePackage?.isCanceledSubscription) {
        return toast.success(
          "Your request has been submitted. It will affect next billing cycle"
        );
      } else if (!isError && subscribePackage?.isCanceledSubscription) {
        return toast.success("Your subscription has resumed");
      }
      // fetchDataGetUser();
      if (isError) {
        return toast.error(message);
      }
      // setSubscribe(false);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("state" , state);
  const handleCancel = () => {
    setOpenCancelModalConfirm(true);
  };
  const handleCancelConfirm = () => {
    cancelSubcription();
    setOpenCancelModalConfirm(false);
    setOpenCancelModal(false);
  };

  const handleOpen = () => {
    // if(!disable){
    if (_id == "6744617ea4d142ed16ea9c9e") {
      setOpenJv(true)
    } else {
      setOpen(true)

    }

    // }


  };
  useEffect(() => {
    if (queryParams.get('plan')) {
      setOpen(true)
    }



  }, [queryParams.get('plan')])



  useEffect(() => {

    const value = state.find((plan) => plan._id === queryParams.get("subscribedId"))
    setSubscribedplan(value)


  }, [state])
  // console.log("check state",subscribedplan );

  
  return (
    <div style={{ height: "100%" }}>
      {subscribe == 2 || subscribe == 3 ? (
        <CompanyPlanSubscribe
          handleContinue={handleContinue}
          setSubscribe={setSubscribe}
          cancelSubcription={cancelSubcription}
          setOpenCancelModal={setOpenCancelModal}
          subscribePackage={subscribePackage}
          data={state}
          isLoading={isLoading}
          user={user}
        />
      ) : subscribe == 1 ? (
        <div className={styles.CompanyInfo_container}>
          <div className={styles.CompanyPlan_container}>
            <div className={styles.CompanyPlanLeft}>
              <div
                style={{ fontSize: "20px" }}
                className={styles.companyInfo_title}
              >
                Define what you need
              </div>
              <div
                style={{
                  display: "block",
                  padding: "10px",
                  minHeight: "fit-content",
                  marginTop: "0px",
                }}
                className={styles.card}
              >
                <div>
                  <div className={styles.CompanyPlanLeftTitle}>
                    Billing Country
                  </div>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <DropDown
                    valueKey="isoCode"
                    option={"name"}
                    defaultValue={"US"}
                    ArrData={countries}
                    format={"country"}
                  />
                </div>
                <div style={{ marginTop: "10px" }}>
                  <div className={styles.CompanyPlanLeftTitle}>
                    Subscription Cycle
                  </div>
                </div>
                <div>
                  <div className={styles.subscription_cycle}>
                    <span
                      onClick={() => setActiveCycle("yearly")}
                      className={
                        activeCycle == "yearly"
                          ? styles.subscription_Annually
                          : styles.subscription_AnnuallyDis
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexGrow: 1,
                        }}
                      >
                        Annually
                      </div>
                      <span>save upto 20%</span>
                    </span>
                    <span
                      onClick={() => setActiveCycle("monthly")}
                      className={
                        activeCycle != "monthly"
                          ? styles.subscription_monthly
                          : styles.subscription_monthlyAc
                      }
                    >
                      Monthly
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{ fontSize: "20px" }}
                  className={styles.companyInfo_title}
                >
                  Choose your plan
                </div>
                <div
                  onClick={() =>
                    window.open(
                      "https://dev2.zeitblast.com/#/pricing",
                      "_blank"
                    )
                  }
                  style={{
                    padding: "0px 12px",
                    height: "40px",
                    cursor: "pointer",
                    backgroundColor: "#00BD82",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "24px",
                  }}
                >
                  Compare
                </div>
              </div>
              <div>
                {state.length > 0 ? (
                  state?.map((plan) => (
                    <CompanyPlansCard
                      activeCycle={activeCycle}
                      key={plan?._id}
                      handleContinue={handleContinue}
                      type={activeCycle}
                      planDetail={plan}
                      setSubscribe={setSubscribe}
                      user={user}
                    />
                  ))
                ) : (
                  <div>
                    <PlanCardSkeleton />
                    <PlanCardSkeleton />
                    <PlanCardSkeleton />
                  </div>
                )}
              </div>
              <div className={styles.CompanyPlan}>
                *This amount is an estimation based on your selection.
                Additional numbers or users you create in the Dashboard will be
                charged additionally.
                <br />
                <br />
                (1)Available in US, CA, UK, Germany, & France. MMS not available
                in Australia. Terms of Use apply. Additional international
                calling bundles are available. For SMS, free inbound messages
                are unlimited and free outbound messages per user per month are
                limited to 4000.
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PlanCardSkeleton />
      )}
      <CancelModal
        open={openCancelModal}
        setOpenCancelModal={setOpenCancelModal}
        handleCancel={handleCancel}
      />
      <CancelConfirmModal
        open={openCancelModalConfirm}
        setOpenCancelModal={() => {
          setOpenCancelModalConfirm(false);
          setOpenCancelModal(false);
        }}
        handleCancel={handleCancelConfirm}
        setCancelReason={setCancelReason}
        canceleReason={canceleReason}
        setAddionalData={setAddionalData}
        addionalData={addionalData}
      />

      <SubscribeModal handleOpen={handleOpen} open={open} setOpen={setOpen} planDetail={subscribedplan} handleContinue={handleContinue} selectedType={queryParams.get('subscriptionType')} setSubscribe={setSubscribe} />
    </div>
  );
};

export default CompanyPlan;
