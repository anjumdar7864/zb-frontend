import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DashboardStyled } from "./styles";
import { Line, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { Progress } from "react-sweet-progress";
import Assets from "@/assets";
import useResponsiveWidth from "./useResponsiveWidth";
import {
  FaCaretRight,
  FaFire,
  FaSeedling,
  FaThermometerEmpty,
  FaTint,
  FaCalendar,
  FaTrophy,
  FaInfoCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import Dropdown from "./WeekDropDown/WeekDropDown";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAvgReplyTime,
  GetLeadsBreakDown,
  GetProspectsLeads,
  GetReportMessage,
  GetReportMessagesInLast30,
  GetReportTags,
  GetTopThreeCampaigns,
  getStats,
  GetFlagStatus,
  GetMarket,
  GetOutbounds,
  GetTopDrip,
  GetReportOfDripSchedule,
} from "@/store/actions";
import { useNavigate } from "react-router-dom";
import { LightTooltip } from "@/components/common";
import Components from "@/components";

function Dashboard() {
  const width = useResponsiveWidth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const calenderRef = useRef();
  const calenderRef2 = useRef();
  const [dateRange, setDateRange] = useState("");
  const [numberOfRowsShowing, setNumberOfRowsShowing] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [lead2, setLead2] = useState(false);
  const [isCalender, setCalender] = useState(false);
  const [outBound, setOutBound] = useState("");
  const [outBoundOption, setOutBoundOption] = useState("today");
  const [custom, setCustom] = useState("");
  const [messageReportStatus, setMessageReportStatus] = useState("Today");
  const [avgFilterText, setAvgFilterText] = useState("This week");
  const [avgReplyDate, setAvgReplyDate] = useState("");
  const [avgTodayDate, setAvgTodayDate] = useState("");
  const [selectedProspectsOption, setselectedProspectsOption] =
    useState("Today");
  const {
    LeadBreakDown,
    totalLeads,
    topThreeCampaigns,
    avgReplyTime,
    reportMessage,
    reportTags,
    reportMessageLast30,
    loadingMessage,
    prospectLeads,
    flagStatus,
    market,
    topDrip,
    dripSchedule,
    loading,
  } = useSelector((state) => state.dashboardReducer);

  const type =
    localStorage.getItem("type") ?? localStorage.getItem("type") ?? "";

  useEffect(() => {
    if (type === "superAdmin") {
      navigate("/tenant");
    }
  }, []);

  useLayoutEffect(() => {
    dispatch(GetLeadsBreakDown("today"));
    dispatch(GetTopThreeCampaigns("today"));
    dispatch(GetReportMessage("today"));
    dispatch(GetReportTags("today"));
    // dispatch(GetProspectsLeads("week"));
    dispatch(GetReportMessagesInLast30());
    dispatch(GetFlagStatus("today"));
    dispatch(GetMarket("all", "today"));
    dispatch(GetTopDrip());
    dispatch(GetReportOfDripSchedule());
  }, []);

  useEffect(() => {
    handleMessageReportFilter(messageReportStatus);
  }, [loadingMessage]);

  const statsCounter = useSelector((state) => state.statsReducer);
  // useEffect(() => {
  //   dispatch(getStats());
  // }, []);

  const closeDropdown = (event) => {
    if (calenderRef.current && !calenderRef.current.contains(event.target)) {
      setCalender(false);
    }
  };
  const handleDateRange = (start, end) => {
    const startDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(start);
    const endDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(end);
    setDateRange(`${startDate}-${endDate}`);
  };

  useEffect(() => {
    dispatch(
      GetOutbounds("all", outBoundOption, currentPage, numberOfRowsShowing)
    );
  }, [currentPage, numberOfRowsShowing]);

  useEffect(() => {
    if (market?.length > 0) {
      setOutBound(market?.[0]?._id);
      setOutBoundNumber(market?.[0]?._id);
    }
  }, [market, dispatch]);

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);
  // Effect to dispatch the action on mount with the default value
  useEffect(() => {
    const opta = getOption(selectedProspectsOption);
    dispatch(GetProspectsLeads(opta));
  }, []);

  const getOption = (option) => {
    switch (option) {
      case "Yesterday":
        return "yesterday";
      case "Today":
        return "today";
      case "This Week":
        return "week";
      case "This Month":
        return "month";
      default:
        return "week";
    }
  };
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelection = (option) => {
    if (selectedOptions.some((val) => option._id === val._id)) {
      setSelectedOptions(
        selectedOptions.filter((item) => item._id !== option._id)
      );
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  const handleSelectProspects = (opt) => {
    const opta = getOption(opt);
    dispatch(GetProspectsLeads(opta));
    setselectedProspectsOption(opt); // Update the selected option
  };
  const [messageSent, setMessageSent] = useState([]);
  const [messageRevieve, setMessageRecieve] = useState([]);
  const [messageLabel, setMessageLabel] = useState([]);
  const [outBoundNumber, setOutBoundNumber] = useState("");
  const currentDate = new Date();
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);
  const formattedYesterday = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(yesterday);
  const formattedToday = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const getDates = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date(currentDate));
      dates.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const handleOutbounds = (number) => {
    setOutBoundNumber(number);
    dispatch(
      GetOutbounds(number, outBoundOption, currentPage, numberOfRowsShowing)
    );
  };
  const handleMessageReportFilter = (option, startDate, endDate) => {
    let messageReportDatasent = [];
    let messageReportDatareceive = [];
    switch (option) {
      case "Yesterday":
        reportMessage.map((value) => {
          messageReportDatasent.push(value.received);
          messageReportDatareceive.push(value.sent);
        });
        setMessageRecieve([...messageReportDatareceive]);
        setMessageSent([...messageReportDatasent]);
        setMessageLabel([formattedYesterday]);
        break;
      case "Today":
        reportMessage.map((value) => {
          messageReportDatasent.push(value.received);
          messageReportDatareceive.push(value.sent);
        });
        setMessageRecieve([...messageReportDatareceive]);
        setMessageSent([...messageReportDatasent]);
        setMessageLabel([formattedToday]);
        break;
      case "This Week":
        const days = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ];
        days.map((val) => {
          const find = reportMessage.find((data) => {
            if (data.day === val) {
              return data;
            }
          });
          if (find) {
            messageReportDatasent.push(find.received);
            messageReportDatareceive.push(find.sent);
          } else {
            messageReportDatasent.push(0);
            messageReportDatareceive.push(0);
          }
        });
        setMessageRecieve([...messageReportDatareceive]);
        setMessageSent([...messageReportDatasent]);
        setMessageLabel([
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ]);
        break;
      case "This Month":
        const label = [];
        reportMessage.map((value) => {
          messageReportDatasent.push(value.received);
          messageReportDatareceive.push(value.sent);
          label.push(value.date);
        });
        setMessageRecieve([...messageReportDatareceive]);
        setMessageSent([...messageReportDatasent]);
        setMessageLabel([...label]);
        break;
      case "Custom Range":
        const lab = [];
        reportMessage.map((value) => {
          messageReportDatasent.push(value.received);
          messageReportDatareceive.push(value.sent);
          lab.push(value.date);
        });
        setMessageRecieve([...messageReportDatareceive]);
        setMessageSent([...messageReportDatasent]);
        setMessageLabel([...lab]);
        break;
      default:
        break;
    }
  };

  const hot =
    LeadBreakDown?.find((val) => val.status?.[0] === "Hot")?.value || 0;
  const warm =
    LeadBreakDown?.find((val) => val.status?.[0] === "Warm")?.value || 0;
  const nurture =
    LeadBreakDown?.find((val) => val.status?.[0] === "Nurture")?.value || 0;
  const drip =
    LeadBreakDown?.find((val) => val.status?.[0] === "Drip")?.value || 0;
  const noStatus =
    LeadBreakDown?.find((val) => val.status?.[0] === "No Status")?.value || 0;

  const tagsColors = [
    "rgb(98, 127, 166)",
    "rgb(211, 142, 127)",
    "rgb(211, 142, 127)",
    "rgb(156, 184, 215)",
    "rgb(228, 180, 103)",
    "rgb(133, 142, 210)",
    "rgb(182, 136, 189)",
    "rgb(156, 184, 215)",
    "rgb(182, 136, 189)",
    "rgb(160, 200, 161)",
    "rgb(228, 180, 103)",
    "rgb(182, 136, 189)",
  ];
  const dataDoughnut = {
    labels: ["Hot Leads", "Warms Leads", "Nurture", "Drips", "No Status"],
    datasets: [
      {
        label: "",
        data: [hot, warm, nurture, drip, noStatus],
        backgroundColor: [
          "rgb(229, 41, 53)",
          "rgb(255, 193, 43)",
          "rgb(160, 200, 161)",
          "rgb(54, 163, 247)",
          "rgb(222, 223, 231)",
        ],
        borderWidth: 0,
        cutout: "75%",
      },
    ],
  };
  const optionsDoughnut = {
    maintainAspectRatio: false, // To allow explicit setting of width and height
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const optionsLine = {
    maintainAspectRatio: false, // To allow explicit setting of width and height
    responsive: true,
    // width: 400, // Set the width
    height: 300, // Set the height
    interaction: {
      mode: "x",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          // You can further configure your ticks here
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  const messageLabelWithGap =
    messageReportStatus === "This Week"
      ? [...messageLabel]
      : ["", ...messageLabel];
  const messageSentWithGap =
    messageReportStatus === "This Week"
      ? [...messageSent]
      : ["", ...messageSent];
  const messageRevieveWithGap =
    messageReportStatus === "This Week"
      ? [...messageRevieve]
      : ["", ...messageRevieve];
  const dataLine = {
    labels: messageLabelWithGap,
    datasets: [
      {
        label: `sent`,
        data: messageRevieveWithGap,
        borderColor: "rgb(160,200,161)",
        backgroundColor: "rgb(160,200,161)",
        fill: false,
        borderWidth: 1,
      },
      {
        label: `recieved`,
        data: messageSentWithGap,
        borderColor: "rgb(98,127,166)",
        backgroundColor: "rgb(98,127,166)",
        fill: false,
        borderWidth: 1,
      },
    ],
  };

  const data = {
    labels: reportTags.map((val) => {
      if (selectedOptions.length > 0) {
        if (selectedOptions.some((data) => val._id === data._id)) {
          return val._id;
        }
      } else {
        return val._id;
      }
    }),
    datasets: [
      {
        label: "",
        data: reportTags.map((val) => {
          if (selectedOptions.length > 0) {
            if (selectedOptions.some((data) => val._id === data._id)) {
              return val.count;
            }
          } else {
            return val.count;
          }
        }),
        backgroundColor: reportTags.map((val) => {
          if (selectedOptions.length > 0) {
            if (selectedOptions.some((data) => val.color === data.color[0])) {
              return data.color[0];
            } else {
              return val.color;
            }
          } else {
            return val.color;
          }
        }),
        barThickness: 50,
        borderSkipped: "start",
        spanGaps: true,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false, // To allow explicit setting of width and height
    responsive: true,
    width: 400, // Set the width
    height: 300, // Set the height
    indexAxis: "y", // Set the index axis to y for horizontal bars
    elements: {
      bar: {
        borderWidth: 1,
        barPercentage: 0.2,
        categoryPercentage: 0.8,
        minBarLength: 50,
        borderRadius: 10,
      },
      line: {
        spanGaps: true, // Ensure lines are drawn between points with null values in between
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: true, // Display the x-axis grid lines
        ticks: {
          display: false, // Hides the x-axis labels
        },
      },
      y: {
        min: 0, // Set the minimum value for the y-axis scale
        grid: {
          display: false, // Hide the vertical grid lines (y-axis in a horizontal bar chart)
        },
      },
    },
  };

  const calculatePercentageForDeliver = (leads) => {
    if (leads.length > 0) {
      const {
        sent,
        deliveredInitialCount,
        followDeliveryCount,
        sentInitialCount,
        followSentCount,
        sentDripCount,
      } = leads[0];

      const sentValue = sent ?? 0;
      const sentDripCountValue = sentDripCount ?? 0;

      const followDeliveryCountValue = parseInt(followDeliveryCount) || 0;
      const followSentCountValue = parseInt(followSentCount) || 0;
      let sentInitialCountValue = parseInt(sentInitialCount) || 0;
      let deliveredInitialCountValue = parseInt(deliveredInitialCount) || 0;

      const sentAndDeliveredSum = sentValue + deliveredInitialCountValue;
      const totalAndDeliveredSum = sentValue + sentInitialCountValue;

      if (totalAndDeliveredSum !== 0) {
        const percentage = (sentAndDeliveredSum / totalAndDeliveredSum) * 100;
        return percentage.toFixed(2); // returns the percentage as a string with 2 decimal places
      }
    }
    return "0.00"; // returns "0.00" if no leads or totalAndDeliveredSum is 0
  };
  const calculateTotalDelivery = (prospectLeads) => {
    if (prospectLeads.length === 0) return 0;

    const { sent, sentDripCount, deliveredInitialCount, followDeliveryCount } =
      prospectLeads[0];

    const sentValue = sent ?? 0;
    const sentDripCountValue = sentDripCount ?? 0;
    let deliveredInitialCountValue = parseInt(deliveredInitialCount) || 0;
    const followDeliveryCountValue = parseInt(followDeliveryCount) || 0;
    return sentValue + deliveredInitialCountValue;
  };
  const calculateTotal = (prospectLeads) => {
    if (prospectLeads.length === 0) return 0;

    const { sent, sentInitialCount, sentDripCount, followSentCount } =
      prospectLeads[0];

    const sentValue = sent ?? 0;
    const sentDripCountValue = sentDripCount ?? 0;
    let sentInitialCountValue = parseInt(sentInitialCount) || 0;
    const followSentCountValue = parseInt(followSentCount) || 0;
    return sentValue + sentInitialCountValue;
  };
  const calculateTotalResp = (prospectLeads) => {
    if (prospectLeads.length === 0) return 0;

    const { received, receivedDripCount, respInitialCount, respfollowCount } =
      prospectLeads[0];

    const receivedValue = received ?? 0;
    const receivedDripCountValue = receivedDripCount ?? 0;
    let respInitialCountValue = parseInt(respInitialCount) || 0;
    const respfollowCountValue = parseInt(respfollowCount) || 0;

    return receivedValue + respInitialCountValue;
  };

  const calculatePercentageForResponse = (leads) => {
    if (leads.length > 0) {
      const {
        received,
        respInitialCount,
        respfollowCount,
        sent,
        deliveredInitialCount,
        followDeliveryCount,
        sentDripCount,
        receivedDripCount,
      } = leads[0];

      const receivedValue = received ?? 0;
      const receivedDripCountValue = receivedDripCount ?? 0;
      let respInitialCountValue = parseInt(respInitialCount) || 0;
      const respfollowCountValue = parseInt(respfollowCount) || 0;
      const sentValue = sent ?? 0;
      const sentDripCountValue = sentDripCount ?? 0;
      let deliveredInitialCountValue = parseInt(deliveredInitialCount) || 0;
      const followDeliveryCountValue = parseInt(followDeliveryCount) || 0;

      const sentAndDeliveredSum = receivedValue + respInitialCountValue;
      const totalAndDeliveredSum = sentValue + deliveredInitialCountValue;

      if (totalAndDeliveredSum !== 0) {
        const percentage = (sentAndDeliveredSum / totalAndDeliveredSum) * 100;
        return percentage.toFixed(2); // Returns the percentage as a string with 2 decimal places
      }
    }
    return "0.00"; // Returns "0.00" if no leads or totalAndDeliveredSum is 0
  };

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    setAvgReplyDate(`${year}-${month}-${day}`);
    setAvgTodayDate(`${year}-${month}-${day}`);
    dispatch(GetAvgReplyTime(`${year}-${month}-${day}`));
  }, []);

  return (
    <DashboardStyled lead2={lead2}>
      <h1>Dashboard</h1>
      <div className="cards">
        <div className="item1">
          <h1>
            What's on your plate
            <span className="info">
              <LightTooltip
                placement="top"
                arrow
                title={
                  <>
                    <p>Quick access to your action items</p>
                  </>
                }
              >
                <span>
                  <FaInfoCircle />
                </span>
              </LightTooltip>
            </span>
          </h1>
          <div>
            <div
              className="item"
              onClick={() => navigate("/inbox?unread=true")}
            >
              <header>
                <img src={Assets.Images.i_1} alt="icon" />
              </header>
              <div>
                <h4>{statsCounter.unRead}</h4>
                <div className="subHeading">
                  <h5 style={{ color: "#F54257" }}>Unread</h5>
                  <div style={{ color: "#004828" }}>
                    <span>respond now </span>
                    <FaCaretRight size={"15px"} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="item"
              onClick={() => navigate("/inbox?unanswered=true")}
            >
              <header>
                <img src={Assets.Images.i_2} alt="icon" />
              </header>
              <div>
                <h4>{statsCounter.unAnswered}</h4>
                <div className="subHeading">
                  <h5 style={{ color: "#0860C7" }}>Unanswered</h5>
                  <div style={{ color: "#0860C7" }}>
                    <span>reply now </span>
                    <FaCaretRight size={"15px"} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="item"
              onClick={() => navigate("/inbox?showReminders=true")}
            >
              <header>
                <img src={Assets.Images.i_3} alt="icon" />
              </header>
              <div>
                <h4>{statsCounter.reminder}</h4>
                <div className="subHeading">
                  <h5 style={{ color: "#162E4B" }}>Reminders</h5>
                  <div style={{ color: "#162E4B" }}>
                    <span>View Reminders </span>
                    <FaCaretRight size={"15px"} />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="item"
              onClick={() => navigate("/inbox?noStatus=true")}
            >
              <header>
                <img src={Assets.Images.i_4} alt="icon" />
              </header>
              <div>
                <h4>{statsCounter.status}</h4>
                <div className="subHeading">
                  <h5 style={{ color: "#008C4F" }}>No Status</h5>
                  <div style={{ color: "#008C4F" }}>
                    <span>View Inbox </span>
                    <FaCaretRight size={"15px"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="item2">
          <div className="heading">
            <h1>
              Prospect Leads
              <span className="info">
                <LightTooltip
                  placement="top"
                  arrow
                  title={
                    <>
                      <p>Track delivery and resonse rates</p>
                      <p>at every stage of engagement</p>
                    </>
                  }
                >
                  <span>
                    <FaInfoCircle />
                  </span>
                </LightTooltip>
              </span>
            </h1>
            <div>
              <Dropdown
                name={selectedProspectsOption} // Set the name to the currently selected option
                options={["Yesterday", "Today", "This Week", "This Month"]}
                onSelect={handleSelectProspects} // Use the handleSelect function
              />
            </div>
          </div>

          <div>
            {!lead2 ? (
              <>
                <div className="item">
                  <div className="head">
                    <section>
                      {/* <div className="item">
                        <CircularProgressbarStyled
                          value={calculatePercentageForDeliver(prospectLeads)}
                          text={`${calculatePercentageForDeliver(
                            prospectLeads
                          )}%`}
                          styles={buildStyles({
                            textSize: "2.1rem",
                            pathTransitionDuration: 0.5,
                            pathColor: `${
                              !lead2 ? "#5791DE" : "rgb(160, 200, 161)"
                            }`,
                            trailColor: "#f8f8f8",
                            textAnchor: "middle",
                          })}
                        />
                      </div> */}
                      <div id="item">
                        <Progress
                          percent={calculatePercentageForDeliver(prospectLeads)}
                          type="circle"
                          width={width}
                          strokeWidth={7}
                          status="active"
                          theme={{
                            active: {
                              symbol:
                                calculatePercentageForDeliver(prospectLeads),
                              trailColor: "#f8f8f8",
                              color: `${
                                !lead2 ? "#5791DE" : "rgb(160, 200, 161)"
                              }`,
                            },
                          }}
                        />
                      </div>
                      <span className="info">
                        <LightTooltip
                          placement="top"
                          arrow
                          title={
                            <>
                              <p>
                                Circle displays Average Delivery Rate based on
                                Initial and Inbox messages.
                              </p>
                            </>
                          }
                        >
                          <span>
                            <FaInfoCircle />
                          </span>
                        </LightTooltip>
                      </span>
                    </section>
                    <div className="text">
                      <h6 className="count">
                        {calculateTotalDelivery(prospectLeads)}/
                        {calculateTotal(prospectLeads)}
                      </h6>
                      <p className="heading">Average Delivery Rate</p>
                    </div>
                  </div>
                  <div className="body">
                    <div className="subitem">
                      <span>Initial Msg</span>
                      <span>
                        {prospectLeads.length > 0 &&
                        parseFloat(
                          prospectLeads[0].deliveredInitialCountPer
                        ).toFixed(2) != "NaN"
                          ? parseFloat(
                              prospectLeads[0].deliveredInitialCountPer
                            ).toFixed(2) + "%"
                          : 0 + "%"}
                      </span>
                    </div>
                    <div className="subitem">
                      <span>Inbox</span>
                      <span>
                        {" "}
                        {prospectLeads.length > 0 &&
                        parseFloat(prospectLeads[0].sentPercentage).toFixed(
                          2
                        ) != "NaN"
                          ? parseFloat(prospectLeads[0].sentPercentage).toFixed(
                              2
                            ) + "%"
                          : 0 + "%"}
                      </span>
                    </div>
                    <div className="subitem">
                      <span>Drips</span>
                      <span>
                        {" "}
                        {prospectLeads.length > 0 &&
                        parseFloat(prospectLeads[0].sentDripPercentage).toFixed(
                          2
                        ) != "NaN"
                          ? parseFloat(
                              prospectLeads[0].sentDripPercentage
                            ).toFixed(2) + "%"
                          : 0 + "%"}
                      </span>
                    </div>
                    <div className="subitem">
                      <span>Follow Up</span>
                      <span>
                        {prospectLeads.length > 0 &&
                        parseFloat(
                          prospectLeads[0].deliveredfollowCountPer
                        ).toFixed(2) != "NaN"
                          ? parseFloat(
                              prospectLeads[0].deliveredfollowCountPer
                            ).toFixed(2) + "%"
                          : 0 + "%"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="head">
                    <blockquote>
                      {/* <div className="item">
                        <CircularProgressbarStyled
                          value={
                            calculatePercentageForResponse(prospectLeads)
                              ? calculatePercentageForResponse(prospectLeads)
                              : 0
                          }
                          text={`${
                            calculatePercentageForResponse(prospectLeads)
                              ? calculatePercentageForResponse(prospectLeads)
                              : 0
                          }%`}
                          styles={buildStyles({
                            strokeLinecap: "butt",
                            textSize: "2.1rem",
                            pathTransitionDuration: 0.5,
                            pathColor: `${
                              !lead2 ? "#004828" : "rgb(160, 200, 161)"
                            }`,
                            trailColor: "#f8f8f8",
                            textAnchor: "middle",
                          })}
                        />
                      </div> */}
                      <div id="item">
                        <Progress
                          percent={
                            calculatePercentageForResponse(prospectLeads)
                              ? calculatePercentageForResponse(prospectLeads)
                              : 0
                          }
                          type="circle"
                          width={width}
                          strokeWidth={7}
                          status="active"
                          theme={{
                            active: {
                              symbol: calculatePercentageForResponse(
                                prospectLeads
                              )
                                ? calculatePercentageForResponse(prospectLeads)
                                : 0,
                              trailColor: "#f8f8f8",
                              color: `${
                                !lead2 ? "#004828" : "rgb(160, 200, 161)"
                              }`,
                            },
                          }}
                        />
                      </div>
                      <span className="info">
                        <LightTooltip
                          placement="top"
                          arrow
                          title={
                            <>
                              <p>
                                Circle displays Average Response Rate based on
                                Initial and Inbox messages.
                              </p>
                            </>
                          }
                        >
                          <span>
                            <FaInfoCircle />
                          </span>
                        </LightTooltip>
                      </span>
                    </blockquote>
                    <div className="text">
                      <h6 className="count">
                        {calculateTotalResp(prospectLeads)}/
                        {calculateTotalDelivery(prospectLeads)}
                      </h6>
                      <p className="heading">Average Response Rate</p>
                    </div>
                  </div>
                  <div className="body">
                    <div className="subitem">
                      <span>Initial Msg</span>
                      <span>
                        {prospectLeads.length > 0 &&
                        parseFloat(
                          prospectLeads[0].respInitialCountPer
                        ).toFixed(2) != "NaN"
                          ? parseFloat(
                              prospectLeads[0].respInitialCountPer
                            ).toFixed(2) + "%"
                          : 0 + "%"}
                      </span>
                    </div>
                    <div className="subitem">
                      <span>Inbox</span>
                      <span>
                        {" "}
                        {prospectLeads.length > 0 &&
                        parseFloat(prospectLeads[0].receivedPercentage).toFixed(
                          2
                        ) != "NaN"
                          ? parseFloat(
                              prospectLeads[0].receivedPercentage
                            ).toFixed(2) + "%"
                          : 0 + "%"}
                      </span>
                    </div>
                    <div className="subitem">
                      <span>Drips</span>
                      <span>
                        {prospectLeads.length > 0 &&
                        parseFloat(
                          prospectLeads[0]?.receivedDripPercentage
                        ).toFixed(2) != "NaN"
                          ? parseFloat(
                              prospectLeads[0].receivedDripPercentage
                            ).toFixed(2) + "%"
                          : 0 + "%"}
                      </span>
                    </div>
                    <div className="subitem">
                      <span>Follow Up</span>
                      <span>
                        {prospectLeads.length > 0 &&
                        parseFloat(prospectLeads[0].followrespPer).toFixed(2) !=
                          "NaN"
                          ? parseFloat(prospectLeads[0].followrespPer).toFixed(
                              2
                            ) + "%"
                          : 0 + "%"}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="item" style={{ backgroundColor: "#ECF4EC" }}>
                <div className="head">
                  <blockquote>
                    {/* <div className="item">
                      <CircularProgressbarStyled
                        value={
                          calculatePercentageForResponse(prospectLeads)
                            ? calculatePercentageForResponse(prospectLeads)
                            : 0
                        }
                        text={`${
                          calculatePercentageForResponse(prospectLeads)
                            ? calculatePercentageForResponse(prospectLeads)
                            : 0
                        }%`}
                        styles={buildStyles({
                          strokeLinecap: "butt",
                          pathTransitionDuration: 0.5,
                          pathColor: `${
                            !lead2 ? "rgb(98, 127, 166)" : "rgb(160, 200, 161)"
                          }`,
                          trailColor: "#f8f8f8",
                          textAnchor: "middle",
                        })}
                      />
                    </div> */}
                    <div id="item">
                      <Progress
                        percent={
                          calculatePercentageForResponse(prospectLeads)
                            ? calculatePercentageForResponse(prospectLeads)
                            : 0
                        }
                        type="circle"
                        width={width}
                        strokeWidth={7}
                        status="active"
                        theme={{
                          active: {
                            symbol: calculatePercentageForResponse(
                              prospectLeads
                            )
                              ? calculatePercentageForResponse(prospectLeads)
                              : 0,
                            trailColor: "#f8f8f8",
                            color: `${
                              !lead2
                                ? "rgb(98, 127, 166)"
                                : "rgb(160, 200, 161)"
                            }`,
                          },
                        }}
                      />
                    </div>
                  </blockquote>
                  <div className="text">
                    <h6 className="count">
                      {calculateTotalResp(prospectLeads)}/
                      {calculateTotalDelivery(prospectLeads)}
                    </h6>
                    <p className="heading">
                      Average Response Rate
                      <span className="info">
                        <LightTooltip
                          placement="top"
                          arrow
                          title={
                            <>
                              <p>
                                Circle displays Average Response Rate based on
                                Initial and Inbox messages. List view shows
                                individual Response percentages for different
                                message types.
                              </p>
                            </>
                          }
                        >
                          <span>
                            <FaInfoCircle />
                          </span>
                        </LightTooltip>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="body">
                  <div className="subitem">
                    <span>Initial Msg</span>
                    <span>
                      {prospectLeads.length > 0 &&
                      parseFloat(prospectLeads[0].respInitialCountPer).toFixed(
                        2
                      ) != "NaN"
                        ? parseFloat(
                            prospectLeads[0].respInitialCountPer
                          ).toFixed(2) + "%"
                        : 0 + "%"}
                    </span>
                  </div>
                  <div className="subitem">
                    <span>Inbox</span>
                    <span>
                      {" "}
                      {prospectLeads.length > 0 &&
                      parseFloat(prospectLeads[0].receivedPercentage).toFixed(
                        2
                      ) != "NaN"
                        ? parseFloat(
                            prospectLeads[0].receivedPercentage
                          ).toFixed(2) + "%"
                        : 0 + "%"}
                    </span>
                  </div>
                  <div className="subitem">
                    <span>Drips</span>
                    <span>
                      {" "}
                      {prospectLeads.length > 0 &&
                      parseFloat(
                        prospectLeads[0]?.receivedDripPercentage
                      ).toFixed(2) != "NaN"
                        ? parseFloat(
                            prospectLeads[0].receivedDripPercentage
                          ).toFixed(2) + "%"
                        : 0 + "%"}
                    </span>
                  </div>
                  <div className="subitem">
                    <span>Follow Up</span>
                    <span>
                      {prospectLeads.length > 0 &&
                      parseFloat(prospectLeads[0].followrespPer).toFixed(2) !=
                        "NaN"
                        ? parseFloat(prospectLeads[0].followrespPer).toFixed(
                            2
                          ) + "%"
                        : 0 + "%"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="pagination">
            <button
              style={{ backgroundColor: `${lead2 ? "#d2d4d9" : "#249acf"}` }}
              className="button"
              onClick={() => setLead2(false)}
            />
            <button
              style={{ backgroundColor: `${lead2 ? "#249acf" : "#d2d4d9"}` }}
              className="button"
              onClick={() => setLead2(true)}
            />
          </div>
        </div>

        <div className="item3">
          <div className="heading">
            <h1>
              Lead Breakdown
              <span className="info">
                <LightTooltip
                  placement="top"
                  arrow
                  title={
                    <>
                      <p>Overview of lead disposition statuses</p>
                    </>
                  }
                >
                  <span>
                    <FaInfoCircle />
                  </span>
                </LightTooltip>
              </span>
            </h1>
            <div>
              <Dropdown
                name={"Today"}
                options={["Yesterday", "Today", "This Week", "This Month"]}
                onSelect={(opt) => {
                  const opta = getOption(opt);
                  dispatch(GetLeadsBreakDown(opta));
                }}
              />
            </div>
          </div>
          <div>
            <div className="item">
              {hot === 0 &&
              warm === 0 &&
              nurture === 0 &&
              drip === 0 &&
              noStatus === 0 ? (
                <section>
                  <img src={Assets.Images.dashboardDonutGraph} alt="icon" />
                </section>
              ) : (
                <div className="head">
                  <div className="item">
                    <Doughnut data={dataDoughnut} options={optionsDoughnut} />
                    {totalLeads > 0 && (
                      <div>
                        <p className="count">{totalLeads}</p>
                        <p className="total">Total</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="body">
                <div className="subitem">
                  <div>
                    <div
                      className="box"
                      style={{
                        backgroundColor: "rgb(220, 1, 1)",
                        width: "1.7rem",
                        height: "1.7rem",
                        borderRadius: "3px",
                      }}
                    ></div>
                    <span>Hot Leads</span>
                  </div>
                  <span>{hot}</span>
                </div>
                <div className="subitem">
                  <div>
                    <div
                      className="box"
                      style={{
                        backgroundColor: "rgb(225, 157, 23)",
                        width: "1.7rem",
                        height: "1.7rem",
                        borderRadius: "3px",
                      }}
                    ></div>
                    <span>Warm Leads</span>
                  </div>
                  <span>{warm}</span>
                </div>
                <div className="subitem">
                  <div>
                    <div
                      className="box"
                      style={{
                        backgroundColor: "rgb(150, 191, 151)",
                        width: "1.7rem",
                        height: "1.7rem",
                        borderRadius: "3px",
                      }}
                    ></div>
                    <span>Nurture</span>
                  </div>
                  <span>{nurture}</span>
                </div>
                <div className="subitem">
                  <div>
                    <div
                      className="box"
                      style={{
                        backgroundColor: "rgb(34, 143, 227)",
                        width: "1.7rem",
                        height: "1.7rem",
                        borderRadius: "3px",
                      }}
                    ></div>
                    <span>Drips</span>
                  </div>
                  <span>{drip}</span>
                </div>
                <div className="subitem">
                  <div>
                    <div
                      className="box"
                      style={{
                        backgroundColor: "rgb(222, 223, 231)",
                        width: "1.7rem",
                        height: "1.7rem",
                        borderRadius: "3px",
                      }}
                    ></div>
                    <span>No Status</span>
                  </div>
                  <span>{noStatus}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="item6">
          <div className="head">
            <h1>
              Top 3 Campaigns
              <span className="info">
                <LightTooltip
                  placement="top"
                  arrow
                  title={
                    <>
                      <p>Track your top performing campaigns"</p>
                    </>
                  }
                >
                  <span>
                    <FaInfoCircle />
                  </span>
                </LightTooltip>
              </span>
            </h1>
            <div>
              <span>
                <FaFire color="#f4516c" size={18} />
              </span>
              <span>
                <FaThermometerEmpty color="#ffb822" size={18} />
              </span>
              <span>
                <FaSeedling color="#a0c8a1" size={18} />
              </span>
              <span>
                <FaTint color="#36a3f7" size={18} />
              </span>
            </div>
          </div>
          <div className="body">
            {topThreeCampaigns.map((camp) => (
              <div
                className="item"
                onClick={() => navigate(`/campaigns/${camp.campaignId}`)}
              >
                <h2>{camp?.campaign && camp.campaign}</h2>
                <div>
                  <span>
                    {camp?.statuses?.find((val) => val.status === "Hot")
                      ?.count || 0}
                  </span>
                  <span>
                    {camp?.statuses?.find((val) => val.status === "Warm")
                      ?.count || 0}
                  </span>
                  <span>
                    {camp?.statuses?.find((val) => val.status === "Nurture")
                      ?.count || 0}
                  </span>
                  <span>
                    {camp?.statuses?.find((val) => val.status === "Drip")
                      ?.count || 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="avgFlex">
          <div className="avgReply">
            <div className="heading">
              <h1>
                Last 30 Minutes
                <span className="info">
                  <LightTooltip
                    placement="top"
                    arrow
                    title={
                      <>
                        <p>Last 30 minutes</p>
                      </>
                    }
                  >
                    <span>
                      <FaInfoCircle />
                    </span>
                  </LightTooltip>
                </span>{" "}
              </h1>
              <div></div>
            </div>
            <div className="body">
              <h3>{reportMessageLast30?.[0]?.sent || 0} Sent</h3>
              <section>
                <img src={Assets.Images.icon_Minus} alt="icon" />
                <div>
                  <p>{reportMessageLast30?.[0]?.received || 0} Received</p>
                </div>
              </section>
            </div>
          </div>

          <div className="avgReply">
            <div className="heading">
              <h1>
                Average Reply <br /> Time
                <span className="info">
                  <LightTooltip
                    placement="top"
                    arrow
                    title={
                      <>
                        <p>Monitor message response</p>
                        <p>times</p>
                        <p>across all users</p>
                      </>
                    }
                  >
                    <span>
                      <FaInfoCircle />
                    </span>
                  </LightTooltip>
                </span>
              </h1>
              <div style={{ marginLeft: "1rem" }}>
                {/* <Dropdown
                  name={"Today"}
                  options={["Yesterday", "Today", "This Week", "This Month"]}
                  onSelect={(opt) => {
                    const opta = getOption(opt);
                    setAvgFilterText(opt);
                    dispatch(GetAvgReplyTime(opta));
                  }}
                /> */}
                <input
                  type="date"
                  value={avgReplyDate}
                  max={avgTodayDate}
                  onChange={(e) => {
                    setAvgReplyDate(e.target.value);
                    dispatch(GetAvgReplyTime(e.target.value));
                  }}
                />
              </div>
            </div>
            <div className="body">
              <h3>
                {loading
                  ? ""
                  : avgReplyTime?.hours > 0
                  ? `${avgReplyTime.hours} Hours`
                  : `${avgReplyTime?.minutes} Minutes`}{" "}
              </h3>
              <section>
                <img src={Assets.Images.icon_Minus} alt="icon" />
                <div>
                  <p>
                    {avgReplyTime?.hours > 0 &&
                      `${avgReplyTime.minutes} Minutes`}
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="item5">
          <div className="head">
            <div>
              <div className="left">
                <h1>
                  Drip Automations
                  <span className="info">
                    <LightTooltip
                      placement="top"
                      arrow
                      title={
                        <>
                          <p>Monitor Drip Automation</p>
                          <p>activity and performance</p>
                        </>
                      }
                    >
                      <span>
                        <FaInfoCircle />
                      </span>
                    </LightTooltip>
                  </span>
                </h1>
                <p>
                  {dripSchedule?.todayMessageCount
                    ? dripSchedule?.todayMessageCount
                    : "No drips scheduled today"}
                </p>
              </div>
              <div className="right">
                <div id="item">
                  <Progress
                    type="circle"
                    width={width}
                    strokeWidth={8}
                    status="active"
                    theme={{
                      active: {
                        trailColor: "#d9d9d9",
                        color: "rgb(98, 127, 166)",
                      },
                    }}
                    percent={
                      !isNaN(dripSchedule.today) ? dripSchedule.today : 0
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="body">
            <div className="item">
              <header>
                <div>
                  <FaCalendar color="#5867dd" />
                </div>
                <h1>Upcoming Drips</h1>
              </header>
              <section>
                <div className="subitem">
                  <span>Tomorrow</span>
                  <span>{dripSchedule.tomorrow}</span>
                </div>
                <div className="subitem">
                  <span>Next 7 days</span>
                  <span>{dripSchedule.next7Days}</span>
                </div>
                <div className="subitem">
                  <span>Next 30 days</span>
                  <span>{dripSchedule.next30Days}</span>
                </div>
              </section>
            </div>
            <div className="item">
              <header>
                <div>
                  <FaTrophy color="#5867dd" />
                </div>
                <h1>Top Drip Automations</h1>
              </header>
              <section>
                {topDrip.map((data) => (
                  <div className="subitem">
                    <span>{data.dripName[0]}</span>
                    <span>{data.count}</span>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </div>
      </div>

      <div className="graphContainer">
        <div className="graphs">
          <div className="graphbody">
            <div className="head">
              <div className="heading">
                <h1>
                  Text Activity
                  <span className="info">
                    <LightTooltip
                      placement="top"
                      arrow
                      title={
                        <>
                          <p>Compare text activity</p>
                          <p>filtered by date range</p>
                        </>
                      }
                    >
                      <span>
                        <FaInfoCircle />
                      </span>
                    </LightTooltip>
                  </span>
                </h1>
              </div>
              <div className="dropDown-with-heading">
                <Dropdown
                  name={"Today"}
                  options={[
                    "Yesterday",
                    "Today",
                    "This Week",
                    "This Month",
                    "Custom Range",
                  ]}
                  onSelect={(opt) => {
                    const opta = getOption(opt);
                    if (opt !== "Custom Range") {
                      setDateRange("");
                      dispatch(GetReportMessage(opta));
                      setCustom("");
                      // handleMessageReportFilter(opt);
                    }
                    if (opt === "Custom Range") {
                      setCalender(true);
                    }
                    setMessageReportStatus(opt);
                    handleMessageReportFilter(opt);
                  }}
                  custom={custom}
                />
                <div
                  style={{
                    display: "flex",
                    position: "relative",
                    width: "4rem",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <DateRangePicker
                    ranges={[]}
                    open={isCalender}
                    ref={calenderRef2}
                    placement="autoHorizontal"
                    onChange={(e) => {
                      dispatch(GetReportMessage("", e[0], e[1]));
                      setCalender(false);
                      handleDateRange(e[0], e[1]);
                      setCustom("Custom Range");
                      setMessageReportStatus("Custom Range");
                    }}
                    style={{
                      display: "flex",
                      width: "30%",
                      height: "30%",
                      backgroundColor: "yellow",
                      justifyContent: "center",
                      marginLeft: "-1.8rem",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "white",
                      zIndex: 99,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        border: "0.05rem solid #d8d8d8",
                        borderRadius: ".4rem",
                        padding: ".6rem",
                        cursor: "pointer",
                        paddingRight: "-1rem",
                      }}
                      ref={calenderRef}
                      onClick={() => setCalender((prev) => !prev)}
                    >
                      <FaCalendarAlt color="#67AAF8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="body">
              {reportMessage && <Line data={dataLine} options={optionsLine} />}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "4.5rem",
                padding: "5px",
                marginTop: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    backgroundColor: "#00C06D",
                    borderRadius: "2px",
                  }}
                ></div>
                {messageRevieveWithGap?.reduce((accumulator, currentValue) => {
                  if (typeof currentValue === "number") {
                    return accumulator + currentValue;
                  }
                  return accumulator;
                }, 0)}{" "}
                Sent
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    backgroundColor: "#2279D8",
                    borderRadius: "2px",
                  }}
                ></div>
                {messageSentWithGap?.reduce((accumulator, currentValue) => {
                  if (typeof currentValue === "number") {
                    return accumulator + currentValue;
                  }
                  return accumulator;
                }, 0)}{" "}
                Received
              </div>
              {dateRange && <div>{dateRange}</div>}
            </div>
          </div>
        </div>

        <div className="graphs">
          <div className="graphbody">
            <div className="head">
              <div className="heading">
                <h1>
                  Tags
                  <span className="info">
                    <LightTooltip
                      placement="top"
                      arrow
                      title={
                        <>
                          <p>Tags overview. Tags can be used to reproduce</p>
                          <p>lead stages funnel</p>
                        </>
                      }
                    >
                      <span>
                        <FaInfoCircle />
                      </span>
                    </LightTooltip>
                  </span>
                </h1>
              </div>

              <section>
                <div>
                  <Dropdown
                    name={"Tags"}
                    options={reportTags}
                    onSelect={(option) => handleSelection(option)}
                    multiSelect={true}
                    selectedOptions={selectedOptions}
                    colors={tagsColors}
                    downIcon={true}
                  />
                </div>
                <div>
                  <Dropdown
                    name={"Today"}
                    options={["Yesterday", "Today", "This Week", "This Month"]}
                    onSelect={(opt) => {
                      const opta = getOption(opt);
                      dispatch(GetReportTags(opta));
                    }}
                  />
                </div>
              </section>
            </div>
            <div className="body">
              <Line data={data} options={options} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flagContainer">
        <div>
          <div className="item4">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Dropdown
                name={"Today"}
                options={["Yesterday", "Today", "This Week", "This Month"]}
                onSelect={(opt) => {
                  const opta = getOption(opt);
                  setOutBoundOption(opta);
                  dispatch(
                    GetOutbounds(
                      outBoundNumber,
                      opta,
                      currentPage,
                      numberOfRowsShowing
                    )
                  );
                  dispatch(GetMarket(outBoundNumber, opta));
                }}
              />
            </div>
            <div className="flag-container-margins">
              <div
                style={{ display: "flex", flexDirection: "row", gap: "3px" }}
              >
                <span>Total :</span>
                <span>
                  {Object.keys(flagStatus).length !== 0
                    ? flagStatus?.totalRecords
                    : 0}
                </span>
              </div>
              <div>
                <p>Outbounds: </p>
                {outBound && (
                  <Dropdown
                    name={outBound} // Set the name to the currently selected option
                    options={
                      market?.length > 0 ? market?.map((item) => item._id) : []
                    }
                    onSelect={(opt) => handleOutbounds(opt)} // Use the handleSelect function
                    percentage={
                      market?.length > 0
                        ? market?.map((item) => item?.deliveredPercentage)
                        : []
                    }
                  />
                )}
              </div>
            </div>
            <div className="head">
              <h1>
                FlagStatus
                <span className="info">
                  <LightTooltip
                    placement="top"
                    arrow
                    title={
                      <>
                        <p>Track your message failed flag with status"</p>
                      </>
                    }
                  >
                    <span>
                      <FaInfoCircle />
                    </span>
                  </LightTooltip>
                </span>
              </h1>
              <h1>Flag%</h1>
              <h1>Flag Count</h1>
              <h1>Sent Count</h1>
              <h1>
                Delivered Count
                <span className="info">
                  <LightTooltip
                    placement="top"
                    arrow
                    title={
                      <>
                        <p>
                          The send count may differ from the total of delivered
                          and flagged messages due to processing delays, system
                          errors, or discrepancies in tracking{" "}
                        </p>
                      </>
                    }
                  >
                    <span>
                      <FaInfoCircle />
                    </span>
                  </LightTooltip>
                </span>
              </h1>
              <h1>Delivered%</h1>
            </div>
            <div className="body">
              {flagStatus?.errorPercentages?.length > 0 ? (
                flagStatus?.errorPercentages.map((status) => (
                  <div className="item">
                    <LightTooltip
                      placement="top"
                      arrow
                      title={
                        <>
                          {status?.errorCode === 4720 ? (
                            <p>invalid-destination-address</p>
                          ) : status?.errorCode === 4431 ? (
                            <p>malformed-invalid-encoding</p>
                          ) : status?.errorCode === 4432 ? (
                            <p>malformed-invalid-from-number</p>
                          ) : status?.errorCode === 9902 ? (
                            <p>delivery-receipt-expired</p>
                          ) : status?.errorCode === 4750 ? (
                            <p>destination-rejected-message</p>
                          ) : status?.errorCode === 4700 ? (
                            <p>invalid-service-type</p>
                          ) : status?.errorCode === 5620 ? (
                            <p>destination-app-error</p>
                          ) : status?.errorCode === 9999 ? (
                            <p>unknown-error</p>
                          ) : status?.errorCode === 4781 ? (
                            <p>volume-violation-att</p>
                          ) : (
                            <p>unknown-error</p>
                          )}
                        </>
                      }
                    >
                      <h2>{status?.errorCode && status.errorCode}</h2>
                    </LightTooltip>
                    <div>
                      <span
                      // style={{
                      //   color: `${
                      //     parseFloat(status?.percentage.toFixed(2)) <= 74
                      //       ? "#ff0000be"
                      //       : "inherit"
                      //   }`,
                      //   fontWeight: `${
                      //     parseFloat(status?.percentage.toFixed(2)) <= 74
                      //       ? "600"
                      //       : "inherit"
                      //   }`,
                      // }}
                      >
                        {parseFloat(
                          status?.percentage && status.percentage
                        ).toFixed(2) + "%"}
                      </span>
                    </div>
                    <div>
                      <span>{status?.count && status.count}</span>
                    </div>
                    <div>
                      <span>
                        {flagStatus?.deliveredReport?.sentCount &&
                          flagStatus?.deliveredReport?.sentCount}
                      </span>
                    </div>
                    <div>
                      <span>
                        {flagStatus?.deliveredReport?.deliveredCount &&
                          flagStatus?.deliveredReport?.deliveredCount}
                      </span>
                    </div>
                    <div>
                      <span
                        style={{
                          color: `${
                            parseFloat(
                              flagStatus?.deliveredReport?.deliveredPercentage.toFixed(
                                2
                              )
                            ) <= 74
                              ? "#ff0000be"
                              : "inherit"
                          }`,
                          fontWeight: `${
                            parseFloat(
                              flagStatus?.deliveredReport?.deliveredPercentage.toFixed(
                                2
                              )
                            ) <= 74
                              ? "600"
                              : "inherit"
                          }`,
                        }}
                      >
                        {flagStatus?.deliveredReport?.deliveredPercentage &&
                          parseFloat(
                            flagStatus?.deliveredReport?.deliveredPercentage
                          ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="item">
                  <div>
                    <span>0</span>
                  </div>
                  <div>
                    <span
                      style={{
                        color: `${status?.percentage < 74 && "#ff0000be"}`,
                        fontWeight: `${status?.percentage < 74 && "600"}`,
                      }}
                    >
                      0
                    </span>
                  </div>
                  <div>
                    <span>0</span>
                  </div>
                  <div>
                    <span>
                      {flagStatus?.deliveredReport?.sentCount
                        ? parseFloat(
                            flagStatus?.deliveredReport?.sentCount
                          ).toFixed(2)
                        : 0}
                    </span>
                  </div>
                  <div>
                    <span>
                      {flagStatus?.deliveredReport?.deliveredCount
                        ? parseFloat(
                            flagStatus?.deliveredReport?.deliveredCount
                          ).toFixed(2)
                        : 0}
                    </span>
                  </div>
                  <div>
                    <span
                      style={{
                        color: `${
                          flagStatus?.deliveredReport?.deliveredPercentage <
                            74 && "#ff0000be"
                        }`,
                        fontWeight: `${
                          flagStatus?.deliveredReport?.deliveredPercentage <
                            74 && "600"
                        }`,
                      }}
                    >
                      {flagStatus?.deliveredReport?.deliveredPercentage
                        ? parseFloat(
                            flagStatus?.deliveredReport?.deliveredPercentage
                          ).toFixed(2)
                        : 0}
                    </span>
                  </div>
                  {/* <div>0</div> */}
                </div>
              )}
            </div>

            <div className="center" style={{ marginTop: "2rem" }}>
              <Components.Common.MyPagination
                currentPage={currentPage}
                onChange={(p) => setCurrentPage(p)}
                availableNumberOfRows={[10, 25, 50, 100]}
                currentlySelectedNumberOfRows={numberOfRowsShowing}
                onChangeNumberOfRows={(p) => setNumberOfRowsShowing(p)}
                totalItems={flagStatus?.totalResult ?? 0}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardStyled>
  );
}

export default Dashboard;
