import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  DashboardStyled,
  DropdownsContainer,
  DropdownSelector,
  Entries,
  Footer,
  FooterDropdown,
  HeaderTitle,
  Item9Container,
  StyledTable,
  TableContainer,
  TagsHeader,
  Total,
  WrapperEntries,
  WrapperEntries2,
} from "./styles";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import "chart.js/auto";
import "rsuite/dist/rsuite.min.css";
import { Progress } from "react-sweet-progress";
import Assets from "@/assets";
import useResponsiveWidth from "./useResponsiveWidth";
import { FaFire, FaSeedling, FaThermometerEmpty, FaTint } from "react-icons/fa";
// import Dropdown from "./WeekDropDown/WeekDropDown";
import Dropdown from "./WeekDropDown/WeekDropDownsec";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import {
  GetAvgReplyTime,
  GetSavedAvgReplyTime,
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
  resetavgTimeReply,
  GetSingleUser,
  getAllTagsList,
} from "@/store/actions";
import { useNavigate } from "react-router-dom";
import { LightTooltip } from "@/components/common";
import Components from "@/components";
import "chart.js/auto";
import getTotalMinutes from "@/utils/convertTime"
import color from "@/styles/color";
import { set } from "date-fns";
import { LuRotateCcw } from "react-icons/lu";
import { CustomCircularProgress } from "./progressBar";

function Dashboard() {
  const width = useResponsiveWidth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const calenderRef = useRef();
  const calenderRef2 = useRef();
  const [dateRange, setDateRange] = useState("");
  const [numberOfRowsShowing, setNumberOfRowsShowing] = useState(10);
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
  const [tagList , setTagList] = useState([])
  const allTagsData = useSelector((state) => state.tagReducer);
  const [selectedTag , setSelectedTag] = useState("All") ; 
  const [filterTag, setFilterTag] = useState([]);
  const [selectedProspectsOption, setselectedProspectsOption] =
    useState("Today");

  const {
    LeadBreakDown,
    totalLeads,
    topThreeCampaigns,
    avgReplyTime,
    savedAvgReplyTime,
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
    noStatusCount,
    reminderCount,
    unReadCount,
    unAnsweredCount,
  } = useSelector((state) => state.dashboardReducer);
  const { singleUser } = useSelector((state) => state.authReducer);
  // Convert avgReplyTime to total minutes
  const avgReplyTimeMinutes = getTotalMinutes(avgReplyTime);
  // Calculate total minutes from savedAvgReplyTime array
  let totalSavedMinutes = 0
  if (savedAvgReplyTime?.length > 0) {
    totalSavedMinutes = savedAvgReplyTime?.reduce((acc, entry) => {
      return acc + getTotalMinutes(entry.time);
    }, 0);
  }
  // Calculate the difference
  const avergaeReplyTimedifference = Math.abs(avgReplyTimeMinutes - totalSavedMinutes);
console.log("allTagsData", allTagsData?.results.map(item => item.name));

useEffect(()=>{
// setTagList( allTagsData?.results.map(item => item.name))
setTagList(["All", ...allTagsData?.results.map(item => item.name)]);
},[allTagsData])


console.log("filterTag", filterTag , reportTags);


useEffect(()=>{
    if (selectedTag == "All") {
      setFilterTag(reportTags);
    } else {
      const filteredTags = reportTags.filter((tag) => tag?._id === selectedTag);
      setFilterTag(filteredTags);
    }
},[tagList , selectedTag])

  const userGet = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );
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
    dispatch(GetMarket("all", "today", currentPage, numberOfRowsShowing));
    dispatch(GetTopDrip());
    dispatch(GetReportOfDripSchedule());
  }, []);

  useEffect(() => {
    handleMessageReportFilter(messageReportStatus);
  }, [loadingMessage]);

  // const statsCounter = useSelector((state) => state.statsReducer);
  // useEffect(() => {
  //   dispatch(getStats());
  // }, []);

  const closeDropdown = (event) => {
    if (calenderRef.current && !calenderRef.current.contains(event.target)) {
      setCalender(false);
    }
  };
  // const handleDateRange = (start, end) => {
  //   const startDate = new Intl.DateTimeFormat("en-US", {
  //     month: "long",
  //     day: "numeric",
  //     year: "numeric",
  //   }).format(start);
  //   const endDate = new Intl.DateTimeFormat("en-US", {
  //     month: "long",
  //     day: "numeric",
  //     year: "numeric",
  //   }).format(end);
  //   setDateRange(`${startDate}-${endDate}`);
  // };

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

  // const handleSelection = (option) => {
  //   if (selectedOptions.some((val) => option._id === val._id)) {
  //     setSelectedOptions(
  //       selectedOptions.filter((item) => item._id !== option._id)
  //     );
  //   } else {
  //     setSelectedOptions([...selectedOptions, option]);
  //   }
  // };
  const handleSelectProspects = (opt) => {
    const opta = getOption(opt);
    dispatch(GetProspectsLeads(opta));
    setselectedProspectsOption(opt); // Update the selected option
  };
  const [messageSent, setMessageSent] = useState([]);
  const [messageRevieve, setMessageRecieve] = useState([]);
  const [messageLabel, setMessageLabel] = useState([]);
  const [outBoundNumber, setOutBoundNumber] = useState("");
  const [avgReplyTimeReset, setAvgReplyTimeReset] = useState("reset");
  const [flagLimit, setFlagLimit] = useState(10);
  const [openDropdown, setOpenDropdown] = useState(null);
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

  const chartRef = useRef(null);
  const handleOutbounds = (number) => {
    setOutBoundNumber(number);
    dispatch(
      GetOutbounds(number, outBoundOption, currentPage, numberOfRowsShowing)
    );
  };
  const handleToggle = (index) => {

    setOpenDropdown((prev) => (prev === index ? null : index));
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

  const dataDoughnut = {
    labels: ["Hot Leads", "Warms Leads", "Nurture", "Drips", "No Status"],
    datasets: [
      {
        data: [hot, warm, nurture, drip, noStatus],
        backgroundColor: [
          "#DC0101",
          "#E19D17",
          "#34A853",
          "#228FE3",
          "#DEDFE7",
        ],
        borderColor: "#FFFFFF",
        borderWidth: 3,
        borderRadius: 10,
        cutout: "70%",
      },
    ],
  };
  const optionsDoughnut = {
    responsive: true,
    cutout: "88%", // Adjust cutout based on the chart size to get a 12px arc width
    plugins: {
      legend: { display: false }, // Hide default legend
      tooltip: { enabled: true },
    },
    elements: {
      arc: {
        borderWidth: 12, // Set arc thickness directly
        borderJoinStyle: "round", // Ensures smooth joins
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

  const graphData = {
    labels: messageLabelWithGap,
    datasets: [
      {
        label: "Sent",
        data: messageRevieveWithGap,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }

          const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
          gradient.addColorStop(0, "#00BD82");
          gradient.addColorStop(1, "rgba(0, 189, 130, 0.2)");
          return gradient;
        },
        borderColor: "#00C06D",
        borderWidth: 2,
        fill: true,
      },
      {
        label: "Received",
        data: messageSentWithGap,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }

          // Create the gradient
          const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
          gradient.addColorStop(0, "#3086EE");
          gradient.addColorStop(1, "rgba(48, 134, 238, 0.2)");
          return gradient;
        },
        borderColor: "#2279D8",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const optionsLine = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        ticks: {
          beginAtZero: true,
        },
        grid: {
          drawBorder: false,
          display: true,
        },
      },
    },
  };

  const errorCodeMap = {
    4001: "service-not-allowed",
    4301: "malformed-invalid-encoding",
    4302: "malformed-invalid-from-number",
    4303: "malformed-invalid-to-number",
    4350: "malformed-for-destination",
    4360: "message-not-sent-expiration-date-passed",
    4401: "rejected-routing-error",
    4403: "rejected-forbidden-from-number",
    4404: "rejected-forbidden-to-number",
    4405: "rejected-unallocated-from-number",
    4406: "rejected-unallocated-to-number",
    4407: "rejected-account-not-defined-from-number",
    4408: "rejected-account-not-defined-to-number",
    4409: "rejected-invalid-from-profile",
    4410: "media-unavailable",
    4411: "rejected-message-size-limit-exceeded",
    4412: "media-content-invalid",
    4420: "rejected-carrier-does-not-exist",
    4421: "rejected-forbidden-no-destination",
    4431: "rejected-forbidden-shortcode",
    4432: "rejected-forbidden-country",
    4433: "rejected-forbidden-tollfree",
    4434: "rejected-forbidden-tollfree-for-recipient",
    4435: "forbidden-too-many-recipients",
    4451: "rejected-wrong-user-id",
    4452: "rejected-wrong-application-id",
    4470: "rejected-spam-detected",
    4475: "destination-rejected-due-to-user-opt-out",
    4476: "blocked-unregistered",
    4481: "rejected-from-number-in-blacklist",
    4482: "rejected-to-number-in-blacklist",
    4492: "reject-emergency",
    4493: "rejected-unauthorized",
    4720: "invalid-destination-address",
    9902: "delivery-receipt-expired",
    4750: "destination-rejected-message",
    4700: "invalid-service-type",
    5620: "destination-app-error",
    9999: "unknown-error",
    4781: "volume-violation-att",
  };

  const colorConverter = (color) => {
    if (color == "#003d4c") {
      return "#EBEBEB"
    } else if (color == "#bb2100") {
      return "#FFEAE5"
    } else if (color == "#ff0000") {
      return "#FEE5DF"

    } else if (color == "#0662b5") {
      return "#E8F0FB"
    } else if (color == "#008f6c") {
      return "#E1F3EE"
    } else if (color == "#fcbb26") {
      return "#FDF5E0"
    } else if (color == "#29c8ff") {
      return "#E0F7FF"
    } else if (color == "#b285d1") {
      return "#EBE9F8"
    } else if (color == "#ff9d88") {
      return "#FFEEEE"
    } else if (color == "#ff854c") {
      return "#ffe9dc"
    } else if (color == "#acccf3") {
      return "#E0F7FF"
    } else if (color == "#48a0ff") {
      return "#cce5ff"
    } else if (color == "#65d289") {
      return "#b3e6c4"
    } else if (color == "#7f7f7f") {
      return "#bfbfbf"
    } else if (color == "#8c564b") {
      return "#e3c7c1"
    } else if (color == "#30106d") {
      return "#c4b7d2"
    } else {
      return "#EBEBEB"
    }
  }
  const borderColorConverter = (color) => {
    if (color == "#003d4c") {
      return "#000000"
    } else if (color == "#bb2100") {
      return "#FFEAE5"
    } else if (color == "#ff0000") {
      return "#BB2100"

    } else {
      return "#000000"
    }
  }
  const dataBar = {
    labels: filterTag?.map((val) => {
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
        label: "Counts",
        data: filterTag?.map((val) => {
          if (selectedOptions.length > 0) {
            if (selectedOptions.some((data) => val._id === data._id)) {
              return val.count;
            }
          } else {
            return val.count;
          }
        }),
        backgroundColor: filterTag?.map((val) => {
          if (selectedOptions.length > 0) {
            if (selectedOptions.some((data) => val.color === data.color[0])) {


              return colorConverter(data.color[0]);
            } else {
              return colorConverter(val.color);
            }
          } else {


            return colorConverter(val.color);
          }
        }),
        borderColor: filterTag?.map((val) => {
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
        // borderColor: [
        //   "#FFD700", // Listed
        //   "#8FE8D0", // Sold
        //   "#FF6F61", // Warm push
        //   "#FFA07A", // Verified + vague
        //   "#ADD8E6", // Expired
        //   "#696969", // Wrong number
        //   "#DDA0DD", // No status
        //   "#FF6347", // Not interested
        //   "#FFB347", // Hot push
        // ],
        borderWidth: 2,
        borderRadius: 5,
        barThickness: 20,
      },
    ],
  };

  // const optionsBar = {
  //   indexAxis: "y", // Horizontal bars
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   plugins: {
  //     legend: {
  //       display: false, // No legend needed
  //     },
  //     tooltip: {
  //       enabled: true, // Tooltip on hover
  //     },
  //   },
  //   scales: {
  //     x: {
  //       beginAtZero: true,
  //       grid: {
  //         display: true,
  //         color: "rgba(0, 0, 0, 0.1)", // Dotted grid lines
  //         borderDash: [4, 4],
  //       },
  //       ticks: {
  //         stepSize: 250, // Adjust step size
  //         font: {
  //           size: 12,
  //         },
  //         color: "#333",
  //       },
  //     },
  //     y: {
  //       grid: {
  //         display: false, // Hide horizontal grid lines
  //       },
  //       ticks: {
  //         font: {
  //           size: 14,
  //         },
  //         color: "#333",
  //       },
  //     },
  //   },
  // };

 
  const optionsBar = {
  indexAxis: "y", // Horizontal bars
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // No legend needed
    },
    tooltip: {
      enabled: true, // Tooltip on hover
    },
  },
  elements: {
    bar: {
      minBarLength: 5, // 👈 Ensures even the smallest bar has a visible size (5px)
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: true,
        color: "rgba(0, 0, 0, 0.1)", // Dotted grid lines
        borderDash: [4, 4],
      },
      ticks: {
        stepSize: 250, // Adjust step size
        font: {
          size: 12,
        },
        color: "#333",
      },
    },
    y: {
      grid: {
        display: false, // Hide horizontal grid lines
      },
      ticks: {
        font: {
          size: 14,
        },
        color: "#333",
      },
    },
  },
};

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
    labels: filterTag.map((val) => {
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
        data: filterTag.map((val) => {
          if (selectedOptions.length > 0) {
            if (selectedOptions.some((data) => val._id === data._id)) {
              return val.count;
            }
          } else {
            return val.count;
          }
        }),
        backgroundColor: filterTag.map((val) => {
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
  // const options = {
  //   maintainAspectRatio: false, // To allow explicit setting of width and height
  //   responsive: true,
  //   width: 400, // Set the width
  //   height: 300, // Set the height
  //   indexAxis: "y", // Set the index axis to y for horizontal bars
  //   elements: {
  //     bar: {
  //       borderWidth: 1,
  //       barPercentage: 0.2,
  //       categoryPercentage: 0.8,
  //       minBarLength: 50,
  //       borderRadius: 10,
  //     },
  //     line: {
  //       spanGaps: true, // Ensure lines are drawn between points with null values in between
  //     },
  //   },
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //   },
  //   scales: {
  //     x: {
  //       display: true, // Display the x-axis grid lines
  //       ticks: {
  //         display: false, // Hides the x-axis labels
  //       },
  //     },
  //     y: {
  //       min: 0, // Set the minimum value for the y-axis scale
  //       grid: {
  //         display: false, // Hide the vertical grid lines (y-axis in a horizontal bar chart)
  //       },
  //     },
  //   },
  // };

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
    // const currentDate = new Date();
    // const year = currentDate.getFullYear();
    // const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    // const day = String(currentDate.getDate()).padStart(2, "0");
    // setAvgReplyDate(`${year}-${month}-${day}`);
    // setAvgTodayDate(`${year}-${month}-${day}`);
    dispatch(GetAvgReplyTime("today"));
    dispatch(GetSavedAvgReplyTime("today"));
       dispatch(getAllTagsList("", "", ""));
  }, []);


  const statusList = [
    { label: "Hot", count: hot, color: "#DC0101" },
    { label: "Warm", count: warm, color: "#E19D17" },
    { label: "Nurture", count: nurture, color: "#34A853" },
    { label: "Drip", count: drip, color: "#228FE3" },
    { label: "No Status", count: noStatus, color: "#DEDFE7" },
  ];

  const handleReset = () => {
    console.log("chec kfalsdjf");

    dispatch(resetavgTimeReply(singleUser?.resetAverageReplyDate ? "cancel" : "reset", () => {
      dispatch(GetSingleUser(singleUser?._id, "admin"))
      dispatch(GetAvgReplyTime("today"));
      dispatch(GetSavedAvgReplyTime("today"));
    }));
  }


  useEffect(() => {
    if (singleUser?.resetAverageReplyDate) {
      setAvgReplyDate("Cancel")
    }
  }, [singleUser])
  console.log("dataBar", dataBar , selectedTag);

  return (
    <DashboardStyled lead2={lead2}>
      <div className="header">
        <span className="heading-text">
          <h1 style={{ color: " #012635" }}>Dashboard</h1>
        </span>
        {/* <div className="searchField">
          <input type="text" placeholder="Search for a user" />
        </div> */}
      </div>
      <div className="cards">
        <div style={{ maxWidth: "1280px", margin: "auto" }} className="section1">
          <div className="item1">
            <h1 style={{ padding: "16px" }}>
              What's on your plate
              <span className="info">
                <LightTooltip
                  placement="top"
                  arrow
                  title={<p>Quick access to your action items</p>}
                >

                  <img style={{ marginLeft: "8px" }} src={Assets.Images.FaInfoCircle} alt="icon" />

                </LightTooltip>
              </span>
            </h1>
            <span className="horizantalLine" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "16px",
              }}
            >
              <div className="itemsWrapper">
                <div
                  className="item updatedItem"
                  style={{ backgroundColor: "#FFF2CC" }}
                  onClick={() => navigate("/inbox?unread=true")}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <header className="iconWrapper">
                      <span>
                        <img style={{ width: "45px", height: "45px" }} src={Assets.Images.UnRead} alt="icon" />
                      </span>
                    </header>
                    <div className="subHeading">
                      <h5
                        style={{
                          fontWeight: "600",
                          color: "#00000099",
                          fontSize: "18px",
                        }}
                      >
                        Unread
                      </h5>
                      <div>
                        <span
                          style={{
                            color: "#777777",
                            fontSize: "12px",
                            fontWeight: "400",
                          }}
                        >
                          Respond now
                        </span>
                        <span>
                          <img src={Assets.Images.ArrowIcon} alt="icon" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 style={{ fontWeight: "400", fontSize: "32px", color: "#000000" }}>
                      {unReadCount}
                    </h5>
                  </div>
                </div>
                <div
                  className={"item updatedItem"}
                  style={{ backgroundColor: "#FFEEEE" }}
                  onClick={() => navigate("/inbox?unanswered=true")}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <header className="iconWrapper">
                      <span>
                        <img style={{ width: "45px", height: "45px" }} src={Assets.Images.UnAnswered} alt="icon" />
                      </span>
                    </header>
                    <div className="subHeading">
                      <h5
                        style={{
                          fontWeight: "600",
                          color: "#00000099",
                          fontSize: "18px",
                        }}
                      >
                        Unanswered
                      </h5>
                      <div>
                        <span
                          style={{
                            color: "#777777",
                            fontSize: "12px",
                            fontWeight: "400",
                          }}
                        >Replay now</span>
                        <span>
                          <img src={Assets.Images.ArrowIcon} alt="icon" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 style={{ fontWeight: "400", fontSize: "32px", color: "#000000" }}>
                      {unAnsweredCount}
                    </h5>
                  </div>
                </div>

                <div
                  className={"item updatedItem"}
                  style={{ backgroundColor: "#E8F0FB" }}
                  onClick={() => navigate("/inbox?showReminders=true")}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <header className="iconWrapper">
                      <span>
                        <img style={{ width: "45px", height: "45px" }} src={Assets.Images.Remainder} alt="icon" />
                      </span>
                    </header>
                    <div className="subHeading">
                      <h5
                        style={{
                          fontWeight: "600",
                          color: "#00000099",
                          fontSize: "18px",
                        }}
                      >
                        Reminder
                      </h5>
                      <div>
                        <span
                          style={{
                            color: "#777777",
                            fontSize: "12px",
                            fontWeight: "400",
                          }}
                        >View now</span>
                        <span>
                          <img src={Assets.Images.ArrowIcon} alt="icon" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 style={{ fontWeight: "400", fontSize: "32px" }}>
                      {reminderCount}
                    </h5>
                  </div>
                </div>
                <div
                  className={"item updatedItem"}
                  style={{ backgroundColor: "#EBE9F8" }}
                  onClick={() => navigate("/inbox?noStatus=true")}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <header
                      className="iconWrapper"
                      style={{ backgroundColor: "#EBE9F8" }}
                    >
                      <span>
                        <img style={{ width: "45px", height: "45px" }} src={Assets.Images.NoStatus} alt="icon" />
                      </span>
                    </header>
                    <div className="subHeading">
                      <h5
                        style={{
                          fontWeight: "600",
                          color: "#00000099",
                          fontSize: "18px",
                        }}
                      >
                        No status
                      </h5>
                      <div>
                        <span
                          style={{
                            color: "#777777",
                            fontSize: "12px",
                            fontWeight: "400",
                          }}
                        >View Inbox</span>
                        <span>
                          <img src={Assets.Images.ArrowIcon} alt="icon" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 style={{ fontWeight: "400", fontSize: "32px", color: "#000000" }}>
                      {noStatusCount}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="item2">
            <div className="heading" style={{ padding: "16px", marginBottom: "0px", height: "64px" }}>
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

                    <img style={{ marginLeft: "8px" }} src={Assets.Images.FaInfoCircle} alt="icon" />

                  </LightTooltip>
                </span>
              </h1>
              <div className="dropdown-selector">
                <Dropdown
                  name={selectedProspectsOption} // Set the name to the currently selected option
                  options={["Yesterday", "Today", "This Week", "This Month"]}
                  downIcon={true}
                  onSelect={handleSelectProspects} // Use the handleSelect function
                  isOpen={openDropdown === 1}
                  onToggle={(e) => {



                    if (e == "close") {
                      setOpenDropdown(null)

                    } else if (e == "open") {

                      handleToggle(1)
                    }

                  }}
                />
              </div>
            </div>
            <span className="horizantalLine" />
            <div style={{ padding: "16px", display: "flex", gap: "16px", height: "100%" }}>
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
                          {/* <Progress
                            percent={calculatePercentageForDeliver(
                              prospectLeads
                            )}
                            type="circle"
                            width={width}
                            strokeWidth={10}

                            status="active"
                            theme={{
                              active: {
                                symbol:
                                  calculatePercentageForDeliver(prospectLeads),
                                trailColor: "#C2FFEC",

                                color: `${!lead2 ? "#00BD82" : "rgb(160, 200, 161)"
                                  }`,
                              },
                            }}
                          /> */}

                          <CustomCircularProgress
                            percentage={calculatePercentageForDeliver(prospectLeads)}
                            strokeWidth={10}
                            trailWidth={6}
                            progressColor={!lead2 ? '#00BD82' : 'rgb(160, 200, 161)'}
                            trailColor="#C2FFEC"
                            textColor="#333"
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

                            <img
                              style={{ marginLeft: "8px" }}
                              src={Assets.Images.FaInfoCircle}
                              alt="icon"
                            />

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
                    <span className="verticalLine" />
                    <span className="horizantalLine" />
                    <div className="body">
                      <div className="subitem">
                        <span>Initial Msg</span>
                        <span style={{ fontWeight: "500", fontSize: "16px" }}>
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
                        <span style={{ fontWeight: "500", fontSize: "16px" }}>
                          {" "}
                          {prospectLeads.length > 0 &&
                            parseFloat(prospectLeads[0].sentPercentage).toFixed(
                              2
                            ) != "NaN"
                            ? parseFloat(
                              prospectLeads[0].sentPercentage
                            ).toFixed(2) + "%"
                            : 0 + "%"}
                        </span>
                      </div>
                      <div className="subitem">
                        <span>Drips</span>
                        <span style={{ fontWeight: "500", fontSize: "16px" }}>
                          {" "}
                          {prospectLeads.length > 0 &&
                            parseFloat(
                              prospectLeads[0].sentDripPercentage
                            ).toFixed(2) != "NaN"
                            ? parseFloat(
                              prospectLeads[0].sentDripPercentage
                            ).toFixed(2) + "%"
                            : 0 + "%"}
                        </span>
                      </div>
                      <div className="subitem">
                        <span>Follow Up</span>
                        <span style={{ fontWeight: "500", fontSize: "16px" }}>
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
                          {/* <Progress
                            percent={
                              calculatePercentageForResponse(prospectLeads)
                                ? calculatePercentageForResponse(prospectLeads)
                                : 0
                            }
                            type="circle"
                            width={width}
                            strokeWidth={10}
                            status="active"
                            theme={{
                              active: {
                                symbol: calculatePercentageForResponse(
                                  prospectLeads
                                )
                                  ? calculatePercentageForResponse(
                                    prospectLeads
                                  )
                                  : 0,
                                trailColor: "#D6E7FC",
                                color: `${!lead2 ? "#3086EE" : "rgb(160, 200, 161)"
                                  }`,
                              },
                            }}
                          /> */}


                              <CustomCircularProgress
                            percentage={
                              calculatePercentageForResponse(prospectLeads)
                                ? calculatePercentageForResponse(prospectLeads)
                                : 0
                            }
                            strokeWidth={10}
                            trailWidth={6}
                            progressColor={!lead2 ? '#3086EE' : 'rgb(160, 200, 161)'}
                            trailColor="#D6E7FC"
                            textColor="#333"
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

                            <img
                              style={{ marginLeft: "8px" }}
                              src={Assets.Images.FaInfoCircle}
                              alt="icon"
                            />

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
                    <span className="verticalLine" />
                    <span className="horizantalLine" />
                    <div className="body">
                      <div className="subitem">
                        <span>Initial Msg</span>
                        <span style={{ fontWeight: "500", fontSize: "16px" }}>
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
                        <span style={{ fontWeight: "500", fontSize: "16px" }}>
                          {" "}
                          {prospectLeads.length > 0 &&
                            parseFloat(
                              prospectLeads[0].receivedPercentage
                            ).toFixed(2) != "NaN"
                            ? parseFloat(
                              prospectLeads[0].receivedPercentage
                            ).toFixed(2) + "%"
                            : 0 + "%"}
                        </span>
                      </div>
                      <div className="subitem">
                        <span>Drips</span>
                        <span style={{ fontWeight: "500", fontSize: "16px" }}>
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
                        <span style={{ fontWeight: "500", fontSize: "16px" }}>
                          {prospectLeads.length > 0 &&
                            parseFloat(prospectLeads[0].followrespPer).toFixed(
                              2
                            ) != "NaN"
                            ? parseFloat(
                              prospectLeads[0].followrespPer
                            ).toFixed(2) + "%"
                            : 0 + "%"}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="item" style={{ backgroundColor: "#ECF4EC" }}>
                  <div className="head">
                    {/* <blockquote> */}
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
                            color: `${!lead2
                              ? "rgb(98, 127, 166)"
                              : "rgb(160, 200, 161)"
                              }`,
                          },
                        }}
                      />
                    </div>
                    {/* </blockquote> */}

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

                            <img
                              style={{ marginLeft: "8px" }}
                              src={Assets.Images.FaInfoCircle}
                              alt="icon"
                            />

                          </LightTooltip>
                        </span>
                      </p>
                    </div>
                  </div>
                  <span className="verticalLine" />
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
            <div className="heading" style={{ padding: "16px 16px 0px 16px", height: "64px" }}>
              <h1>
                Lead Breakdown
                <span style={{ display: "flex", alignItems: "center" }} className="info">
                  <LightTooltip
                    placement="top"
                    arrow
                    title={
                      <>
                        <p>Overview of lead disposition statuses</p>
                      </>
                    }
                  >

                    <img style={{ marginLeft: "8px" }} src={Assets.Images.FaInfoCircle} alt="icon" />

                  </LightTooltip>
                </span>
              </h1>
              <div className="dropdown-selector">
                <Dropdown
                  name={"Today"}
                  options={["Yesterday", "Today", "This Week", "This Month"]}
                  downIcon={true}
                  onSelect={(opt) => {
                    const opta = getOption(opt);
                    dispatch(GetLeadsBreakDown(opta));
                  }}
                  isOpen={openDropdown === 2}
                  onToggle={(e) => {
                    if (e == "close") {
                      setOpenDropdown(null)
                    } else if (e == "open") {
                      handleToggle(2)
                    }

                  }}
                />
              </div>
            </div>
            <span className="horizantalLine" />
            <div
              className="lead-breakdown-container"
              style={{ padding: "16px", height: "100%", justifyContent: "space-around" }}
            >
              {/* Doughnut Chart */}
              {hot === 0 &&
                warm === 0 &&
                nurture === 0 &&
                drip === 0 &&
                noStatus === 0 ? (
                <div className="chart-container">
                  {" "}
                  <img src={Assets.Images.dashboardDonutGraph} alt="icon" />
                </div>
              ) : (
                <div className="chart-container">
                  <Doughnut data={dataDoughnut} options={optionsDoughnut} />
                  {totalLeads > 0 && (
                    <div className="chart-center">
                      <p className="total-text">Total</p>

                      <p className="total-count">{totalLeads}</p>
                    </div>
                  )}
                </div>
              )}
              {/* Status Legend */}
              <div className="legend-container">
                {statusList.map((item, index) => (
                  <div className="legend-item" key={index}>
                    <div
                      className="legend-color"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="legend-label">{item.label}</span>
                    <span className="legend-count">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: "1280px", margin: "auto" }} className="section2">
          <span
            style={{
              display: "flex",
              position: "absolute",
              top: "90vh",
              transform: "translateY(-105%)",
              right: "2px",
              zIndex: "99999",
            }}
          >
            <img src={Assets.Images.InfoFloting} alt="icon" />
          </span>

          <div className="item4">
            <div className="head" style={{ padding: "16px 16px 0px 16px" }}>
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

                        <img style={{ marginLeft: "8px" }} src={Assets.Images.FaInfoCircle} alt="icon" />

                      </LightTooltip>
                    </span>
                  </h1>
                  <p>
                    {dripSchedule?.todayMessageCount
                      ? dripSchedule?.todayMessageCount
                      : "No drips scheduled today"}
                  </p>
                </div>
                <div
                  className="right"
                  style={{ display: "flex", gap: "5px", alignItems: "center" }}
                >
                  <p
                    style={{
                      fontWeight: 400,
                      fontSize: "12px",
                      color: "#777777",
                    }}
                  >
                    Today{" "}
                  </p>
                  <span
                    style={{
                      width: "1px",
                      height: "24px",
                      backgroundColor: "lightgray",
                    }}
                  />
                  <div id="item">
                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        fontWeight: 700,
                        fontSize: "16px",
                        height: "24px",
                        color: "#012635",
                      }}
                    >
                      {!isNaN(dripSchedule.today) ? dripSchedule.today : 0}%
                      <div
                        style={{
                          backgroundColor: " #D9D9D9",
                          width: "55px",
                          height: "8px",
                          borderRadius: "100px",
                          position: "relative",
                          top: "10px",
                        }}
                      ><div style={{ width: `${!isNaN(dripSchedule.today) ? dripSchedule.today : "0"}%`, height: "8px", backgroundColor: "#3086EE", borderRadius: "100px" }}></div></div>
                      <div
                        style={{
                          paddingTop: "8px",
                          width: "0%",
                          backgroundColor: "#3086EE",
                          borderRadius: "100px",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span className="horizantalLine" />
            <div className="body">
              <div className="item" style={{justifyContent: "start"  , gap:"30px"}}>
                <header>
                  <div>
                    <img style={{ width: "28px", height: "28px" }} src={Assets.Images.Calender} alt="icon" />
                  </div>
                  <h1>Upcoming Drips</h1>
                </header>
                <section>
                  <div className="subitem">
                    <span>Today</span>
                    <span style={{ fontWeight: 600 }}>
                      {isNaN(
                        Math.round(
                          (dripSchedule?.todayMessageCount ?? 0) -
                          (dripSchedule?.todaySendedMessageCount ?? 0)
                        )
                      )
                        ? 0
                        : Math.round(
                          (dripSchedule?.todayMessageCount ?? 0) -
                          (dripSchedule?.todaySendedMessageCount ?? 0)
                        )}
                    </span>
                  </div>
                  <div className="subitem">
                    <span>Tomorrow</span>
                    <span style={{ fontWeight: 600 }}>{dripSchedule.tomorrow}</span>
                  </div>
                  <div className="subitem">
                    <span>Next 7 days</span>
                    <span style={{ fontWeight: 600 }}>{dripSchedule.next7Days}</span>
                  </div>
                  <div className="subitem">
                    <span>Next 30 days</span>
                    <span style={{ fontWeight: 600 }}>{dripSchedule.next30Days}</span>
                  </div>
                </section>
              </div>
              <div className="item" style={{justifyContent: "start" , gap:"30px"}}>
                <header>
                  <div>
                    <img style={{ width: "28px", height: "28px" }} src={Assets.Images.Topdrip} alt="icon" />
                  </div>
                  <h1>Top Drip Automations</h1>
                </header>
                <section>
       
                  {topDrip?.map((data) => (
                    <div className="subitem">
                      <span>{data?._id && data._id}</span>
                      <span style={{ fontWeight: 600 }}>{data?.count && data.count}</span>
                    </div>
                  ))}
                </section>
              </div>
            </div>
          </div>

          <div className="item5">
            <div className="avgReply">
              <div
                className="heading"
                style={{ padding: "16px 16px 16px 16px" }}
              >
                <h1 style={{ display: "flex" }}>
                  Last 30 Minutes
                  <span style={{ display: "flex", alignItems: "center" }} className="info">
                    <LightTooltip
                      placement="top"
                      arrow
                      title={
                        <>
                          <p>Last 30 minutes</p>
                        </>
                      }
                    >

                      <img style={{ marginLeft: "8px" }} src={Assets.Images.FaInfoCircle} alt="icon" />

                    </LightTooltip>
                  </span>{" "}
                </h1>
              </div>
              <span className="horizantalLine" />
              <div className="body" style={{ padding: "16px 16px 16px 16px", height: "90px" }}>
                <span>
                  <h4
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      lineHeight: "28px",
                      color: "#012635",
                    }}
                  >
                    {reportMessageLast30?.[0]?.sent || 0} Sent
                  </h4>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: 400,
                      lineHeight: "20px",
                      color: "#777777",
                    }}
                  >
                    {reportMessageLast30?.[0]?.received || 0} Received
                  </p>
                </span>
                <section>
                  <img style={{ width: "32px", height: "32px" }} src={Assets.Images.icon_Arrow} alt="icon" />
                  <div></div>
                </section>
              </div>
            </div>

            <div className="avgReply">
              <div
                className="heading"
                style={{ padding: "8px 16px 8px 16px", display: "flex", alignItems: "center" }}

              >
                <h1 style={{ display: "flex" }}>
                  <span style={{ width: "90px" }}>
                    Avg.<br /> Reply Time
                  </span>
                  <span style={{ display: "flex", alignItems: "center" }} className="info">
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

                      <img style={{ marginLeft: "8px" }} src={Assets.Images.FaInfoCircle} alt="icon" />

                    </LightTooltip>
                  </span>


                </h1>
                <div className="right-selector">
                  <LightTooltip
                    placement="top"
                    arrow
                    title={
                      <>
                        <p>{singleUser?.resetAverageReplyDate ? moment(singleUser?.resetAverageReplyDate).tz(userGet?.timeZone).format('MMMM Do YYYY, h:mm:ss a') : "reset"}</p>

                      </>
                    }
                  >
                    <buttun onClick={handleReset} style={{ border: singleUser?.resetAverageReplyDate ? 0 : "solid 1px lightgray", borderRadius: "8px", backgroundColor: singleUser?.resetAverageReplyDate && "#EA3815", color: singleUser?.resetAverageReplyDate && "#fff", cursor: "pointer", height: "32px", width: "32px", display: "flex", justifyContent: "center", alignItems: "center" }} className="reset">
                      {singleUser?.resetAverageReplyDate ? <LuRotateCcw color="white" size={20} /> : <LuRotateCcw color="#012635" size={20} />}

                    </buttun>
                  </LightTooltip>
                  <div style={{ width: "fit-content" }} className="day-selector">

                    <Dropdown
                      name={"Today"}
                      options={["Yesterday", "Today", "This Week", "This Month"]}
                      downIcon={true}
                      onSelect={(opt) => {
                        const opta = getOption(opt);
                        setAvgFilterText(opt);
                        dispatch(GetAvgReplyTime(opta));
                        dispatch(GetSavedAvgReplyTime(opta))
                      }}
                      isOpen={openDropdown === 3}
                      onToggle={(e) => {
                        if (e == "close") {
                          setOpenDropdown(null)
                        } else if (e == "open") {
                          handleToggle(3)
                        }

                      }}
                    />
                    {/* <input
                  type="date"
                  value={avgReplyDate}
                  max={avgTodayDate}
                  onChange={(e) => {
                    setAvgReplyDate(e.target.value);
                    dispatch(GetAvgReplyTime(e.target.value));
                  }}
                /> */}
                  </div>
                </div>
              </div>
              <span className="horizantalLine" />
              <div className="body" style={{ padding: "16px", justifyContent: "start", height: "90px", alignItems: "center" }}>
                <h4
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    lineHeight: "28px",
                    color: "#012635",
                  }}
                >
                  {loading
                    ? ""
                    : avgReplyTime?.hours > 0
                      ? `${avgReplyTime.hours} Hours`
                      : `${avgReplyTime?.minutes} Minutes`}{" "}
                </h4>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    color: "#777777",
                    paddingLeft: "10px"
                  }}
                >
                  {avgReplyTime?.hours > 0 && `${avgReplyTime.minutes} Minutes`}
                </p>
                <div></div>
                <section style={{ flex: 1, justifyContent: "end" }} className="icons-align">
                  {avgReplyTimeMinutes > totalSavedMinutes && <img src={Assets.Images.Plus} alt="icon" />}
                  {avgReplyTimeMinutes < totalSavedMinutes && <img src={Assets.Images.Minus} alt="icon" />}
                  {avgReplyTimeMinutes > 0 && avergaeReplyTimedifference}
                </section>
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
                    title={<p>Track your top performing campaigns</p>}
                  >

                    <img style={{ marginLeft: "8px" }} src={Assets.Images.FaInfoCircle} alt="icon" />

                  </LightTooltip>
                </span>
              </h1>
            </div>

            {/* Campaigns Table */}
            <div className="campaign-table-container">
              <table className="campaign-table">
                <thead>
                  <tr>
                    <th
                      style={{
                        fontSize: "14px",
                        lineHeight: "22px",
                        fontWeight: "500",
                        color: "#012635",
                      }}
                    >
                      Campaigns
                    </th>
                    <th title="Hot">
                      <img src={Assets.Images.FaFireIcon} alt="icon" />
                    </th>
                    <th title="Warm">
                      <img
                        src={Assets.Images.FaThermometerEmptyIcon}
                        alt="icon"
                      />
                    </th>
                    <th title="Nurture">
                      <img src={Assets.Images.FaSeedlingIcon} alt="icon" />
                    </th>
                    <th title="Drip">
                      <img src={Assets.Images.FaTintIcon} alt="icon" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topThreeCampaigns?.map((camp) => (
                    <tr
                      key={camp.campaignId}
                      className="campaign-row"
                      onClick={() => navigate(`/campaigns/${camp.campaignId}`)}
                      onKeyDown={(e) => handleKeyDown(e, camp.campaignId)}
                      tabIndex="0" // Makes the row focusable
                      role="button" // Indicates that the row is clickable
                      aria-label={`View details for ${camp?.campaign && camp.campaign
                        }`} // Accessibility label
                    >
                      <td className="campaign-name">
                        {camp?.campaign && camp.campaign}
                      </td>
                      <td>
                        {camp?.statuses?.find((val) => val.status === "Hot")
                          ?.count || 0}
                      </td>
                      <td>
                        {" "}
                        {camp?.statuses?.find((val) => val.status === "Warm")
                          ?.count || 0}
                      </td>
                      <td>
                        {" "}
                        {camp?.statuses?.find((val) => val.status === "Nurture")
                          ?.count || 0}
                      </td>
                      <td>
                        {camp?.statuses?.find((val) => val.status === "Drip")
                          ?.count || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: "1280px", margin: "auto" }} className="section3">
          <div className="item7">
            <div className="graphs">
              <div className="graphbody">
                <div className="head" style={{ padding: "8px 16px 8px 16px" }}>
                  <div className="heading">
                    <h1 style={{ display: "flex", alignItems: "center" }}>
                      Text Activity
                      <span style={{ display: "flex", alignItems: "center" }} className="info">
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

                          <img style={{ marginLeft: "8px" }} src={Assets.Images.FaInfoCircle} alt="icon" />

                        </LightTooltip>
                      </span>
                    </h1>
                  </div>
                  <div className="dropDown-with-heading">
                    <div style={{ width: "95px" }} className="dropdown-selector">
                      <Dropdown
                        name="Today"
                        downIcon={true}
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
                        isOpen={openDropdown === 4}
                        onToggle={(e) => {
                          if (e == "close") {
                            setOpenDropdown(null)
                          } else if (e == "open") {
                            handleToggle(4)
                          }

                        }}
                        custom={custom}
                      />
                    </div>
                    <div
                      style={{ width: "124px" }}
                      className="dropdown-selector"
                    // onClick={(e) => e.stopPropagation()}
                    >
                      <Dropdown
                        name="Month"
                        downIcon={true}
                        options={[
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                        ]}
                        onSelect={(opt) => console.log(opt)} // Replace with logic
                        isOpen={openDropdown === 5}
                        onToggle={(e) => {
                          if (e == "close") {
                            setOpenDropdown(null)
                          } else if (e == "open") {
                            handleToggle(5)
                          }

                        }}
                      />
                      {/*  <DateRangePicker
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
                  /> */}

                      {/*  <div
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
                    </div>  */}
                    </div>
                  </div>
                </div>
                <span className="horizantalLine" />
                <div
                  className="body"
                  style={{ padding: "16px", opacity: "0.7", width: "100%" }}
                >
                  <Line data={graphData} options={optionsLine} />
                </div>
                <div className="summary">
                  <div className="summary-item">
                    <div
                      className="colorBox"
                      style={{ backgroundColor: "#00BD82" }}
                    ></div>
                    <p
                      style={{
                        color: "#777777",
                        fontSize: "14px",
                        fontWeight: "400",
                        lineHeight: "22px",
                      }}
                    >
                      Sent
                    </p>
                    {messageRevieveWithGap?.reduce(
                      (accumulator, currentValue) => {
                        if (typeof currentValue === "number") {
                          return accumulator + currentValue;
                        }
                        return accumulator;
                      },
                      0
                    )}{" "}
                  </div>
                  <div className="summary-item">
                    <div
                      className="colorBox"
                      style={{ backgroundColor: "#2279D8" }}
                    ></div>
                    <p
                      style={{
                        color: "#777777",
                        fontSize: "14px",
                        fontWeight: "400",
                        lineHeight: "22px",
                      }}
                    >
                      Received
                    </p>
                    {messageSentWithGap?.reduce((accumulator, currentValue) => {
                      if (typeof currentValue === "number") {
                        return accumulator + currentValue;
                      }
                      return accumulator;
                    }, 0)}{" "}
                  </div>
                  {dateRange && <div>{dateRange}</div>}
                </div>
              </div>
            </div>
          </div>
          <div className="item8">
            <div
              className="tagsHeader"
              style={{ padding: "8px 16px 8px 16px" }}
            >
              <h1 style={{ display: "flex", alignItems: "center" }}>
                Tags
                <span style={{ display: "flex", alignItems: "center" }} className="info">
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

                    <img style={{ marginLeft: "8px" }} src={Assets.Images.FaInfoCircle} alt="icon" />

                  </LightTooltip>
                </span>
              </h1>
              <div className="dropdowns">
                <div className="dropdown-selector">
                  <Dropdown
                    name="All"
                    // options={["All", "Some Option"]}
                    options={tagList}
                    downIcon={true}
                    onSelect={(opt) => setSelectedTag(opt)} // Add logic here
                    isOpen={openDropdown === 7}
                    onToggle={(e) => {
                      if (e == "colse") {
                        setOpenDropdown(null)
                      } else if (e == "open") {
                        handleToggle(7)
                      }

                    }}
                  />
                </div>
                <div
                  style={{
                    borderRadius: "8px",
                    border: "1px solid lightgray",
                    padding: "5px 12px 5px 12px",
                  }}
                >
                  <Dropdown
                    name="Today"
                    options={["Yesterday", "Today", "This Week", "This Month"]}
                    downIcon={true}
                    onSelect={(opt) => {
                      const opta = getOption(opt);
                      dispatch(GetReportTags(opta));
                    }}
                    isOpen={openDropdown === 6}
                    onToggle={(e) => {
                      if (e == "close") {
                        setOpenDropdown(null)
                      } else if (e == "open") {
                        handleToggle(6)
                      }

                    }}
                  />
                </div>
              </div>
            </div>
            <span className="horizantalLine" />
            <div
              className="tagsBody"
              style={{ padding: "16px", opacity: "0.5" }}
            >
              <Bar data={dataBar} options={optionsBar} />
            </div>
          </div>
        </div>
        <Item9Container>
          <TagsHeader>
            <div>
              <HeaderTitle>Flag</HeaderTitle>
            </div>

            <DropdownsContainer>
              <span
                style={{ fontSize: "14px", fontWeight: 400, color: "#777777" }}
              >
                Outbound:
              </span>
              <DropdownSelector>
                {outBound && (
                  <Dropdown
                    name={outBound}
                    downIcon={true}
                    options={
                      market?.length > 0 ? market.map((item) => item._id) : []
                    }
                    onSelect={(opt) => handleOutbounds(opt)}
                    percentage={
                      market?.length > 0
                        ? market.map((item) => item.deliveredPercentage)
                        : []
                    }
                    isOpen={openDropdown === 8}
                    onToggle={(e) => {
                      if (e == "close") {
                        setOpenDropdown(null)
                      } else if (e == "open") {
                        handleToggle(8)
                      }

                    }}
                  />
                )}
              </DropdownSelector>
              <FooterDropdown>
                <Dropdown
                  name="Today"
                  options={["Yesterday", "Today", "This Week", "This Month"]}
                  downIcon={true}
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
                    dispatch(GetMarket(outBoundNumber, opta, currentPage, numberOfRowsShowing));
                  }}
                  isOpen={openDropdown === 9}
                  onToggle={(e) => {
                    if (e == "close") {
                      setOpenDropdown(null)
                    } else if (e == "open") {
                      handleToggle(9)
                    }

                  }}
                />
              </FooterDropdown>
            </DropdownsContainer>
          </TagsHeader>
          <div style={{ padding: "0 16px 0 16px" }}>
            <TableContainer>
              <StyledTable>
                <thead>
                  <tr>
                    <th>
                      Flag Status{" "}
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

                          <img style={{ marginLeft: "8px", paddingBottom: "5px" }} src={Assets.Images.FaInfoCircle} alt="icon" />

                        </LightTooltip>
                      </span>
                    </th>
                    <th>
                      Flag%
                      <span className="info" style={{ marginLeft: "2px" }}>
                        <LightTooltip
                          placement="top"
                          arrow
                          title={
                            <>
                              <p></p>
                            </>
                          }
                        >

                          <img style={{ marginLeft: "8px", paddingBottom: "5px" }} src={Assets.Images.FaInfoCircle} alt="icon" />

                        </LightTooltip>
                      </span>
                    </th>
                    <th>
                      Flag Count{" "}
                      <span className="info" style={{ marginLeft: "2px" }}>
                        <LightTooltip
                          placement="top"
                          arrow
                          title={
                            <>
                              <p></p>
                            </>
                          }
                        >

                          <img style={{ marginLeft: "8px", paddingBottom: "5px" }} src={Assets.Images.FaInfoCircle} alt="icon" />

                        </LightTooltip>
                      </span>
                    </th>
                    <th>
                      Sent Count{" "}
                      <span className="info" style={{ marginLeft: "2px" }}>
                        <LightTooltip
                          placement="top"
                          arrow
                          title={
                            <>
                              <p></p>
                            </>
                          }
                        >

                          <img style={{ marginLeft: "8px", paddingBottom: "5px" }} src={Assets.Images.FaInfoCircle} alt="icon" />

                        </LightTooltip>
                      </span>
                    </th>
                    <th>
                      Delivered Count
                      <span className="info" style={{ marginLeft: "3px" }}>
                        <LightTooltip
                          placement="top"
                          arrow
                          title={
                            <>
                              <p>
                                The send count may differ from the total of
                                delivered and flagged messages due to processing
                                delays, system errors, or discrepancies in
                                tracking{" "}
                              </p>
                            </>
                          }
                        >

                          <img style={{ marginLeft: "8px", paddingBottom: "5px" }} src={Assets.Images.FaInfoCircle} alt="icon" />

                        </LightTooltip>
                      </span>
                    </th>
                    <th>
                      Delivered%
                      <span className="info" style={{ marginLeft: "2px" }}>
                        <LightTooltip
                          placement="top"
                          arrow
                          title={
                            <>
                              <p></p>
                            </>
                          }
                        >

                          <img style={{ marginLeft: "8px", paddingBottom: "5px" }} src={Assets.Images.FaInfoCircle} alt="icon" />

                        </LightTooltip>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {flagStatus?.errorPercentages?.length > 0 ? (
                    flagStatus.errorPercentages.map((status) => (
                      <tr key={status.errorCode}>
                        <td>
                          <LightTooltip
                            placement="top"
                            arrow
                            title={
                              <>
                                {errorCodeMap[status.errorCode] || "unknown-error"}
                              </>
                            }
                          >
                            <span>{status.errorCode}</span>
                          </LightTooltip>
                        </td>
                        <td>
                          <span>
                            {parseFloat(status.percentage).toFixed(2)}%
                          </span>
                        </td>
                        <td>
                          <span>{status.count}</span>
                        </td>
                        <td>
                          <span>
                            {flagStatus?.deliveredReport?.sentCount
                              ? flagStatus.deliveredReport.sentCount
                              : 0}
                          </span>
                        </td>
                        <td>
                          <span>
                            {flagStatus?.deliveredReport?.deliveredCount
                              ? flagStatus.deliveredReport.deliveredCount
                              : 0}
                          </span>
                        </td>
                        <td
                          style={{
                            color:
                              parseFloat(
                                flagStatus?.deliveredReport?.deliveredPercentage.toFixed(
                                  2
                                )
                              ) <= 74
                                ? "#ff0000be"
                                : "inherit",
                            fontWeight:
                              parseFloat(
                                flagStatus?.deliveredReport?.deliveredPercentage.toFixed(
                                  2
                                )
                              ) <= 74
                                ? "600"
                                : "inherit",
                          }}
                        >
                          {flagStatus?.deliveredReport?.deliveredPercentage
                            ? parseFloat(
                              flagStatus.deliveredReport.deliveredPercentage
                            ).toFixed(2)
                            : 0}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>0</td>
                      <td>0.00%</td>
                      <td>0</td>
                      <td>
                        <span>
                          {flagStatus?.deliveredReport?.sentCount
                            ? parseFloat(
                              flagStatus.deliveredReport.sentCount
                            ).toFixed(2)
                            : 0}
                        </span>
                      </td>
                      <td>
                        <span>
                          {flagStatus?.deliveredReport?.deliveredCount
                            ? parseFloat(
                              flagStatus.deliveredReport.deliveredCount
                            ).toFixed(2)
                            : 0}
                        </span>
                      </td>
                      <td
                        style={{
                          color:
                            flagStatus?.deliveredReport?.deliveredPercentage <
                              74
                              ? "#ff0000be"
                              : "inherit",
                          fontWeight:
                            flagStatus?.deliveredReport?.deliveredPercentage <
                              74
                              ? "600"
                              : "inherit",
                        }}
                      >
                        {flagStatus?.deliveredReport?.deliveredPercentage
                          ? parseFloat(
                            flagStatus.deliveredReport.deliveredPercentage
                          ).toFixed(2)
                          : 0}
                      </td>
                    </tr>
                  )}
                </tbody>
              </StyledTable>
            </TableContainer>
          </div>
          <Footer>
            {/* Full Screen View WrapperEntries */}
            <WrapperEntries>
              <Total>
                Total:{" "}
                {Object.keys(flagStatus).length !== 0
                  ? flagStatus.totalRecords
                  : 0}
              </Total>
              <Components.Common.MyPagination
                currentPage={currentPage}
                onChange={(p) => setCurrentPage(p)}
                availableNumberOfRows={[10, 25, 50, 100]}
                currentlySelectedNumberOfRows={numberOfRowsShowing}
                onChangeNumberOfRows={(p) => setNumberOfRowsShowing(p)}
                totalItems={flagStatus?.totalResult ?? 0}
              />
              <Entries>
                <span>Entries:</span>
                <div
                  style={{
                    borderRadius: "8px",
                    border: "1px solid lightgray",
                    padding: "5px 8px",
                  }}
                >
                  <Dropdown
                    name="Entries"
                    options={[10, 20, 50, 100]}
                    TopPosition={"top"}
                    downIcon={true}
                    onSelect={(opt) => {

                      setNumberOfRowsShowing(opt);
                      // const opta = getOption(opt);
                      // dispatch(GetReportTags(opta));
                    }}
                    isOpen={openDropdown === 10}
                    onToggle={(e) => {
                      if (e == "close") {
                        setOpenDropdown(null)
                      } else if (e == "open") {
                        handleToggle(10)
                      }

                    }}
                  />
                </div>
              </Entries>
            </WrapperEntries>
            {/* Mobile View WrapperEntries2 */}
            <WrapperEntries2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Total>
                  Total:{" "}
                  {Object.keys(flagStatus).length !== 0
                    ? flagStatus.totalRecords
                    : 0}
                </Total>
                <Entries>
                  <span>Entries:</span>
                  <div
                    style={{
                      borderRadius: "8px",
                      border: "1px solid lightgray",
                      padding: "5px 8px",
                    }}
                  >
                    <Dropdown
                      name="Entries"
                      options={[10, 20, 50, 100]}
                      TopPosition={"top"}
                      downIcon={true}
                      onSelect={(opt) => {

                        setNumberOfRowsShowing(opt);
                        // const opta = getOption(opt);
                        // dispatch(GetReportTags(opta));
                      }}
                      isOpen={openDropdown === 11}
                      onToggle={(e) => {
                        if (e == "close") {
                          setOpenDropdown(null)
                        } else if (e == "open") {
                          handleToggle(11)
                        }

                      }}
                    />
                  </div>
                </Entries>
              </div>
              <Components.Common.MyPagination
                currentPage={currentPage}
                onChange={(p) => setCurrentPage(p)}
                availableNumberOfRows={[10, 25, 50, 100]}
                currentlySelectedNumberOfRows={numberOfRowsShowing}
                onChangeNumberOfRows={(p) => setNumberOfRowsShowing(p)}
                totalItems={flagStatus?.totalResult ?? 0}
              />
            </WrapperEntries2>
          </Footer>
        </Item9Container>
      </div>
    </DashboardStyled>
  );
}

export default Dashboard;
