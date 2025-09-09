
import React, { useEffect, useState } from "react";
import styles from "./CompanyA.module.css";
import SubscribeFirst from "./SubscribeFirst";
import SubscribeSec from "./SubscribeSec";
import SubscribeThr from "./SubscribeThr";
import SubscribeFour from "./SubscribeFour";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { CircularLoader } from "@/components/common";
import { commonAPICall } from "@/services/api/common";
import { REQUEST_TYPES, ENDPOINTS } from "@/utils/constant/url";
import { countOfMessageSend, GetReportOfNoStatus, GetReportOfReminder, GetReportOfUnAnswered, GetReportOfUnRead, GetSingleUser, logOut } from "@/store/actions";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import styled from '@emotion/styled';
const SubscribeCom = ({ onClose, setSubscribeMain, currentPackageId ,  selectPackageMain, planDetail = { planDetail }, handleContinue = () => { }, selectedType , tenantSubscriptionType }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [isAgreed, setIsAgreed] = useState(false);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(planDetail);
  // const [selectedPackageItem, setSelectedPackageItem] = useState(selectPackageMain);
  const [packageType, setPackageType] = useState(selectedType);
  const [isLoading, setLoader] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [userData, setUserData] = useState(null)
  const [downGradeData, setDownGradeData] = useState(null);
  const [numberList, setNumberList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );


  const packageTypeValidation =  selectedPackage?._id == currentPackageId && packageType != tenantSubscriptionType
  // const packageTypePValidation =  selectedPackage?._id == currentPackageId && packageType != selectedType
  const packageTypePValidation =  selectedPackage?._id == currentPackageId && packageType == tenantSubscriptionType
  
console.log("tenantSubscriptionType" , tenantSubscriptionType , packageType);

  useEffect(()=>{
    if(packageTypePValidation){
setPackageType(packageType == "yearly" ? "monthly" : "yearly")
    }
  } , [selectedPackage])

  console.log("selectPackage" , packageTypeValidation);


  const idList = [
    "67445e5cf4d8d6cff7dbde85",
    // "6744614ba4d142ed16ea9c97",
    "6744617ea4d142ed16ea9c9e",
    "67445d36f4d8d6cff7dbde60",
  ]

  const handleCheck = (number) => {
    const checkIndex = numberList.findIndex((dataNumber) => number === dataNumber);

    if (checkIndex !== -1) {
      const updatedList = [...numberList];
      updatedList.splice(checkIndex, 1);
      setNumberList(updatedList); // Assuming you're using React state to manage the list
    } else {
      setNumberList((prev) => [...prev, number])
    }
  }

  useEffect(() => {
    // Initialize numberList with the first 5 numbers from arrList
    // setNumberList(arrList.slice(0, 5));
    if (downGradeData?.outBoundNumber?.length > 0) {
      setNumberList(downGradeData?.outBoundNumber);
    }
  }, [downGradeData]);

  const downGradeHandler = async () => {
    const searchParams = new URLSearchParams(location.search);
    const subscribedId = searchParams.get("subscribedId");
    const subscriptionType = searchParams.get("subscriptionType");
    const payload = {
      newMongoSubscriptionId: selectedPackage?._id,
      adminId: user?._id,
      subscriptionType: packageType || subscriptionType,
    };

    const { data, isError, message, sessionExpired } = await commonAPICall(
      REQUEST_TYPES.POST,
      `${ENDPOINTS.CHECK_SUBSCRIPTION}`,
      payload
    );

    setDownGradeData(data);
  }

  const CheckboxContainer = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 23px;
  cursor: pointer;
  font-size: 22px;
  user-select: none;

  &:hover input ~ .checkmark {
    background-color: #ccc;
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  input:checked ~ .checkmark {
    background-color: #c2ffec;
    border: solid 2px #00bd82;
  }

  input:checked ~ .checkmark:after {
    display: block;
  }
`;
  const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 24px;
  width: 24px;
  // background-color: #eee;
  border-radius: 5px;
  border: solid 2px #d3d7dd;

  .container input:checked ~ .checkmark {
    border: solid 2px #00bd82;
  }
  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 7px;
    top: 2px;
    width: 7px; /* Adjust width */
    height: 12px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
    border-color: #00bd82;
  }
`;

  useEffect(() => {
    if (user?.status === "Canceled" || user?.status === "UnSubscribe") {
      downGradeHandler()

    }
  }, [selectedPackage]);

  useEffect(() => {
    setSelectedPackage(planDetail)
  }, [planDetail])
  const fetchData = async (type = "monthly") => {
    try {
      setLoader("listing");
      const { data, isError, message, sessionExpired } = await commonAPICall(
        REQUEST_TYPES.GET,
        `${ENDPOINTS.GET_PLAN}?subscriptionType=${type}&tenantId=${user?._id}`
      );
      setLoader("");
      if (sessionExpired) {



        // sessionStorage.clear()
        dispatch(logOut());

        navigate("/Login");

      }
      if (isError) {
        return toast.error(message);
      }


      const packages = data?.results;
      if (packages && packages.length) {
        if (selectedPackage) {
          const currentPackage = packages?.find(
            (x) => x?.title === selectedPackage?.title
          );
          if (currentPackage) {
            setSelectedPackage(currentPackage);
          }
        } else {
          setSelectedPackage(packages[0]);
        }
      }
      setPackages(packages || []);
    } catch (error) {
      setLoader("");
      console.log(error);
    }
  };
  useEffect(() => {
    const type = packageType || selectedPackage?.subscriptionType;
    if (type) {
      fetchData(type);
    }
  }, [packageType, planDetail]);



  const subscriptionSubmitHandler = async (isSubscribed = false) => {

    const payload = {
      stripeCustomerId: user?.stripeCustomerId || "",
      adminId: user?._id || "",
      newMongoSubscriptionId: selectedPackage?._id || "",
      subscriptionType: packageType,
      ...((user?.status === "Canceled" || user?.status === "UnSubscribe") && { phone: numberList }),
    };
    try {
      setLoader("saveLoader");

      const { data, isError, message, sessionExpired } = await commonAPICall(
        REQUEST_TYPES.PATCH,
        `${ENDPOINTS.UPDATE_SUBSCRIPTION}`,
        payload
      );
      setLoader("");
      if (sessionExpired) {




        dispatch(logOut());

        navigate("/Login");

      }



      // localStorage.setItem("user", JSON.stringify(data));
      setUserData(data)
      dispatch(GetReportOfNoStatus());
      dispatch(GetReportOfReminder());
      dispatch(GetReportOfUnRead());
      dispatch(GetReportOfUnAnswered());
      dispatch(countOfMessageSend());
      // if (storedType == "admin") {
      dispatch(GetSingleUser(user?._id, "admin"));

      // }
      if (isError) {
        return toast.error(message);
      }
      if (isSubscribed) {
        user.subscriptionId = selectedPackage?._id;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
        return setSubscribe(true);
      }
      // setActiveStep(2);
    } catch (error) {
      setLoader("");
      console.log(error);
    }
  };
  const handleStep = (e) => {

    // console.log("numberList", numberList, downGradeData?.limit, user?.status, idList.findIndex((id) => id == selectedPackage?._id), selectedPackage?._id);


    if (numberList.length != 0 && numberList.length !== downGradeData?.limit && (user?.status === "Canceled" || user?.status === "UnSubscribe") && idList.findIndex((id) => id == selectedPackage?._id) > -1) {
      toast.error(`Please select  ${downGradeData?.limit} outbound number`);

    } else if (numberList.length != 0 &&
      idList.findIndex((id) => id == selectedPackage?._id) == -1 &&
      typeof downGradeData?.limit === "number" &&
      numberList.length < downGradeData.limit && (user?.status === "Canceled" || user?.status === "UnSubscribe")
    ) {
      toast.error(`Please select at least ${downGradeData.limit} outbound number(s).`);
    } else {
      if (activeStep === 1) {
        // subscriptionSubmitHandler();
        setActiveStep(2);
      } else {
        if (e == "next" && activeStep < 4) {
          setActiveStep(activeStep + +1);
        } else if (e == "reverse" && activeStep > 1) {
          setActiveStep(activeStep - +1);
        } else if (e === "next" && activeStep === 4) {
          subscriptionSubmitHandler(true);
        }
      }
    }

  };
  const continueHandler = () => {
    setSubscribe(true);
    setSubscribeMain(2)
    handleContinue()
    userData && localStorage.setItem("user", JSON.stringify(userData));
    onClose();
    // console.log('chuuling button');

  }


  return (
    <div className={styles.subscribeContainer}>
      {subscribe && activeStep == 4 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "500px",
            textAlign: "center",
            padding: "32px",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "600",
              lineHeight: "40px",
              color: "#012635",
              marginBottom: "20px",
            }}
          >
            Thanks for subscribing!
          </h1>
          <h1
            style={{
              fontSize: "20px",
              fontWeight: "400",
              lineHeight: "28px",
              color: "#073F56",
            }}
          >
            Your subscription has been confirmed. You've been added to
          </h1>
          <h1
            style={{
              fontSize: "20px",
              fontWeight: "400",
              lineHeight: "28px",
              color: "#073F56",
              marginBottom: "40px",
            }}
          >
            our list and will hear from us soon.
          </h1>
          <button
            style={{
              fontSize: "16px",
              fontWeight: "500",
              lineHeight: "24px",
              color: "#fff",
              backgroundColor: "#00BD82",
              border: "none",
              borderRadius: "8px",
              padding: "8px 12px",
              cursor: "pointer",
            }}
            onClick={() => continueHandler()}
          >
            Continue
          </button>
        </div>
      ) : (
        <>
          <div
            style={{ display: "flex", flexDirection: "column" }}
            className={styles.subscribeLeft}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: "30px",
              }}
            >
              <div
                style={{ paddingBottom: "0px" }}
                className={styles.companyInfo_title}
              >
                {activeStep == 1
                  ? "Subscription options"
                  : activeStep == 2
                    ? "Company Information"
                    : activeStep == 3
                      ? "Payment Method"
                      : activeStep == 4
                        ? "Terms and conditions"
                        : ""}
              </div>

              <div
                style={{
                  border: "solid 1px #E0E0E0",
                  backgroundColor: "#F7F7F7",
                  display: "flex",
                  borderRadius: "12px",
                }}
              >
                <div className={styles.SubscribePageContainer}>
                  <div
                    style={{
                      border: activeStep == 1 && "solid 1px #00724E",
                      backgroundColor:
                        activeStep == 1
                          ? "#C2FFEC"
                          : activeStep > 1
                            ? "#00BD82"
                            : "",
                      color: activeStep == 1 && "#00724E",
                    }}
                    className={styles.SubscribePage}
                  >
                    {activeStep == 1 ? (
                      "1"
                    ) : (
                      <FaCheck style={{ color: "white" }} />
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      lineHeight: "22px",
                      fontWeight: 600,
                      color: "#212121",
                      display: activeStep == 1 ? "flex" : "none",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "5px",
                    }}
                  >
                    Subscription Option
                  </div>
                </div>
                <div className={styles.SubscribePageContainer}>
                  <div
                    style={{
                      border: activeStep == 2 && "solid 1px #00724E",
                      backgroundColor:
                        activeStep == 2
                          ? "#C2FFEC"
                          : activeStep > 2
                            ? "#00BD82"
                            : "",
                      color: activeStep == 2 && "#00724E",
                    }}
                    className={styles.SubscribePage}
                  >
                    {activeStep <= 2 ? (
                      "2"
                    ) : (
                      <FaCheck style={{ color: "white" }} />
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      lineHeight: "22px",
                      fontWeight: 600,
                      color: "#212121",
                      display: activeStep == 2 ? "flex" : "none",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "5px",
                    }}
                  >
                    Company Information
                  </div>
                </div>
                <div className={styles.SubscribePageContainer}>
                  <div
                    style={{
                      border: activeStep == 3 && "solid 1px #00724E",
                      backgroundColor:
                        activeStep == 3
                          ? "#C2FFEC"
                          : activeStep > 3
                            ? "#00BD82"
                            : "",
                      color: activeStep == 3 && "#00724E",
                    }}
                    className={styles.SubscribePage}
                  >
                    {activeStep <= 3 ? (
                      "3"
                    ) : (
                      <FaCheck style={{ color: "white" }} />
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      lineHeight: "22px",
                      fontWeight: 600,
                      color: "#212121",
                      display: activeStep == 3 ? "flex" : "none",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "5px",
                    }}
                  >
                    Payment Method
                  </div>
                </div>
                <div className={styles.SubscribePageContainer}>
                  <div
                    style={{
                      border: activeStep == 4 && "solid 1px #00724E",
                      backgroundColor:
                        activeStep == 4
                          ? "#C2FFEC"
                          : activeStep > 4
                            ? "#00BD82"
                            : "",
                      color: activeStep == 4 && "#00724E",
                    }}
                    className={styles.SubscribePage}
                  >
                    {activeStep <= 4 ? (
                      "4"
                    ) : (
                      <FaCheck style={{ color: "white" }} />
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      lineHeight: "22px",
                      fontWeight: 600,
                      color: "#212121",
                      display: activeStep == 4 ? "flex" : "none",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "5px",
                    }}
                  >
                    Terms and conditions
                  </div>
                </div>
              </div>
            </div>
            <div style={{ flexGrow: 1 }}>
              {activeStep == 1 ? (
                <SubscribeFirst
                  isLoading={isLoading}
                  packages={packages}
                  selectedPackage={selectedPackage}
                  setSelectedPackage={setSelectedPackage}
                  setPackageType={setPackageType}
                  packageType={packageType}
                  numberList={numberList}
                  downGradeData={downGradeData}
                  packageTypeValidation={packageTypeValidation}



                />
              ) : activeStep == 2 ? (
                <SubscribeSec setActiveStep={setActiveStep} />
              ) : activeStep == 3 ? (
                <SubscribeThr subscribeTitle={selectedPackage?.title} />
              ) : activeStep == 4 ? (
                <SubscribeFour subscribeTitle={selectedPackage?.title} isAgreed={isAgreed} setIsAgreed={setIsAgreed} />
              ) : (
                ""
              )}
            </div>
            {activeStep !== 2 ? (
              <div
                style={{
                  height: "88px",
                  display: "flex",
                  justifyContent: "end",
                  padding: "0px 20px",
                  alignItems: "center",
                  borderTop: "solid 1px #E0E0E0",
                }}
              >
                <button
                  onClick={() => handleStep("reverse")}
                  style={{
                    width: "100px",
                    marginRight: "20px",
                    height: "40px",
                    border: "solid 1px #777777",
                    display: activeStep == 1 && "none",
                  }}
                  className={styles.CompanyInfo_undo}
                >
                  Previous
                </button>
                {isLoading === "saveLoader" ? (
                  <div
                    style={{
                      width: "133px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <CircularLoader />
                  </div>
                ) : (
                  <button
                    style={{ width: "120px", height: "40px" }}
                    className={styles.CompanyInfo_save}
                    onClick={() => handleStep("next")}
                    disabled={activeStep === 4 && !isAgreed}
                  >
                    {activeStep === 3
                      ? "Next Step"
                      : activeStep === 4
                        ? "Subscribe"
                        : "Confirm"}
                  </button>
                )}
              </div>
            ) : (
              ""
            )}
          </div>

          <div className={styles.subscribeRight}>
            <div style={{ padding: "30px" }}>
              <div
                style={{ paddingBottom: "0px" }}
                className={styles.companyInfo_title}
              >
                Your plan
              </div>
              <br />
              <div>
                <div className={styles.SubscribePlanTitle}>
                  {selectedPackage?.title || ""} Plan
                </div>
                <div
                  style={{
                    color: "#777777",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  {packageType === "yearly"
                    ? "Annual"
                    : "Monthly"}{" "}
                  Subscription
                </div>
              </div>

              <div style={{ marginTop: "10px" }}>
                <div className={styles.SubscribePlanTitle}>Features</div>

                <div
                  style={{
                    color: "#777777",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    justifyContent: "space-between",
                  }}
                >
                  {selectedPackage?.features?.map((fea) => {
                    return <span key={fea}>{fea}</span>;
                  })}
                </div>
                {packageType == "monthly" ? "" :
                  <div
                    style={{
                      display: "flex",
                      gap: "5px",
                      fontSize: "12px",
                      fontWeight: 400,
                      lineHeight: "20px",
                      color: "#00BD82",
                      marginTop: "5px",
                    }}
                  >
                    <span>

                      <div
                        style={{
                          color: "#00BD82",
                          width: "18px",
                          height: "18px",
                          margin: "0px 0px",
                          fontSize: "18px",
                        }}
                      >
                        <IoMdInformationCircleOutline />
                      </div>

                    </span>
                    <span>{`You're saving $${((selectedPackage?.monthlyPrice * 12) / 100) * 20} per year`}</span>
                  </div>
                }
              </div>

              <div style={{ marginTop: "10px" }}>
                <div className={styles.SubscribePlanTitle}>Amount</div>
                <div
                  style={{
                    color: "#777777",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ display: "inline-block" }}>
                    {packageType == "monthly" ? selectedPackage?.monthlyPrice + (500 * (numberList.length - downGradeData?.limit > 0 ? numberList.length - downGradeData?.limit : 0 )) : packageType == "yearly" ? selectedPackage?.yearlyPrice + (500 * (numberList.length - downGradeData?.limit > 0 ? numberList.length - downGradeData?.limit : 0 ))  : 0}
                  </span>
                </div>
              </div>
              <div style={{ marginTop: "10px" }}>
                {downGradeData?.outBoundNumber?.length > 0 && (
                  <div>
                    <div style={{ color: "#012635", fontSize: "16px", fontWeight: 400 }}>
                      {` Pick ${downGradeData?.limit}  outbound number. Data's safe. Old chats still work.`}
                    </div>
                    <div style={{ marginTop: "10px", display: 'flex', flexDirection: "column", gap: "10px", }} className={styles.customScroll}>
                      {

                        downGradeData?.outBoundNumber.map((data, index) => {
                          return (
                            <div style={{ display: "flex" }}>
                              <CheckboxContainer>
                                <input checked={numberList.find((num) => data == num) ? true : false} onClick={() => handleCheck(data)} type='checkbox' />
                                <Checkmark className="checkmark" />
                              </CheckboxContainer>
                              <div style={{ fontWeight: 500, fontSize: "14px", lineHeight: "22px", color: "#151A28" }}>
                                {data}
                              </div>

                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                )

                }
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SubscribeCom;

