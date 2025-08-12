import React, { useState, useEffect } from "react";
import { TableData } from "@/libs/data";
import { IoIosArrowDown } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";
import {
  Button,
  PlanButton,
  PlanDasktopWrapper,
  PlanMobileWrapper,
  TableCell,
  TableHeader,
  TableRow,
  TableWrapper,
  Title,
  DropdownHeader,
  DropdownBody,
  DropdownIcon,
  DropdownValue,
  DropdownWrapper,
  DropdownRow,
} from "./styles";
import axios from "axios";

const plans = [
  {
    name: "Jumpstart JV",
    key: "jumpstartIV",
    color: "#000000",
    BackgroundColor: "#5BF1B2",
  },
  {
    name: "I'm Serious",
    key: "imSerious",
    color: "#FFFFFF",
    BackgroundColor: "#00BD82",
  },
  {
    name: "Time to Scale",
    key: "timeToScale",
    color: "#FFFFFF",
    BackgroundColor: "#005ABB",
  },
  {
    name: "Market Dominator",
    key: "marketDominator",
    color: "#FFFFFF",
    BackgroundColor: "#012635",
  },
];

export default function ReviewFeatures() {
  const [isMobile, setIsMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open
  const [pricingData, setPricingData] = useState([]);
  const [tableDataArr, setTableDataArr] = useState([])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchSubscriptionData = async () => {

    try {
      const response = await axios.get(
        import.meta.env.VITE_APP_BACKEND_BASE_URL + "user/v1/api/subscription"
      );
      const { results } = response.data;
      const filteredData = results.filter((item) =>
        [
          "67445d36f4d8d6cff7dbde60",
          "67445e5cf4d8d6cff7dbde85",
          "6744614ba4d142ed16ea9c97",
          "6744617ea4d142ed16ea9c9e",
        ].includes(item._id)
      );

      const objData = filteredData.map((item) => ({
        subscriptionId: item._id,
        name: item.title,
        key: item._id === "67445d36f4d8d6cff7dbde60" ? "imSerious" : item._id === "67445e5cf4d8d6cff7dbde85" ? "timeToScale" : item._id === "6744614ba4d142ed16ea9c97" ? "marketDominator" : "jumpstartIV",
        BackgroundColor: item._id === "67445d36f4d8d6cff7dbde60" ? "#00BD82" : item._id === "67445e5cf4d8d6cff7dbde85" ? "#005ABB" : item._id === "6744614ba4d142ed16ea9c97" ? "#012635" : "#5BF1B2",
        color: item._id === "6744617ea4d142ed16ea9c9e" ? "#000000" : "white"
      }));
      setPricingData(objData)
      const filterKeyObject = {
        jumpstartIV: results.find((data) => data._id === "6744617ea4d142ed16ea9c9e"),
        imSerious: results.find((data) => data._id === "67445d36f4d8d6cff7dbde60"),
        timeToScale: results.find((data) => data._id === "67445e5cf4d8d6cff7dbde85"),
        marketDominator: results.find((data) => data._id === "6744614ba4d142ed16ea9c97")
      }
      const tableArray = TableData.map((item) => {

        return {
          title: item.title,
          jumpstartIV: item.title === "Outbound/Infield Messages" ? `${filterKeyObject?.jumpstartIV?.monthlyOutBoundNumber} / M` : item.title === "Users" ? filterKeyObject?.jumpstartIV?.maxTenants : item.title === "Markets Included" ? filterKeyObject?.jumpstartIV?.marketIncluded : "tick",
          imSerious: item.title === "Outbound/Infield Messages" ? `${filterKeyObject?.imSerious?.monthlyOutBoundNumber} / M` : item.title === "Users" ? filterKeyObject?.imSerious?.maxTenants : item.title === "Markets Included" ? filterKeyObject?.imSerious?.marketIncluded : "tick",
          timeToScale: item.title === "Outbound/Infield Messages" ? `${filterKeyObject?.timeToScale?.monthlyOutBoundNumber} / M` : item.title === "Users" ? filterKeyObject?.timeToScale?.maxTenants : item.title === "Markets Included" ? filterKeyObject?.timeToScale?.marketIncluded : "tick",
          marketDominator: item.title === "Outbound/Infield Messages" ? `${filterKeyObject?.marketDominator?.monthlyOutBoundNumber} / M` : item.title === "Users" ? filterKeyObject?.marketDominator?.maxTenants : item.title === "Markets Included" ? filterKeyObject?.marketDominator?.marketIncluded : "tick",
        }


      })
      setTableDataArr(tableArray)




    } catch (error) {

    }
  }
  useEffect(() => {
    fetchSubscriptionData()
  }, [])


  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const renderTick = (value) =>
    value === "tick" ? <IoCheckmarkSharp /> : value;

  const renderDesktopContent = (feature) => {
    return pricingData.map((plan) => {


      return (
        <TableCell
          justify={"center"}
          width="232px"
          key={plan.name}
          weight={"400"}
        >
          {renderTick(feature[plan.key])}
        </TableCell>
      )
    });
  };

  return (
    <>
      {/* Desktop View */}
      <div style={{padding:"64px 112px"}}>
        <PlanDasktopWrapper>
          <Title>Plan Comparison</Title>
          <TableWrapper>
            <TableHeader>
              <TableCell width="292px">Features</TableCell>
              {pricingData.map((plan) => (
                <PlanButton key={plan.name} style={{ cursor: "default" }}>
                  <Button style={{ cursor: "default" }} textColor={plan.color} bgColor={plan.BackgroundColor}>
                    {plan.name}
                  </Button>
                </PlanButton>
              ))}
            </TableHeader>
            <div>
              {tableDataArr.map((feature, index) => (
                <TableRow
                  key={feature.title}
                  odd={index % 2 !== 0}
                  firstRow={index === 0}
                  isLastRow={index === TableData.length - 1}
                >
                  <TableCell width="310px" textColor="#000000">
                    {feature.title}
                  </TableCell>
                  {renderDesktopContent(feature)}
                </TableRow>
              ))}
            </div>
          </TableWrapper>
        </PlanDasktopWrapper>
      </div>


      {/* Mobile View */}
      <PlanMobileWrapper>
        <Title>Plan Comparison</Title>
        {TableData.map((feature, index) => (
          <DropdownWrapper odd={index % 2 !== 0} key={index}>
            <DropdownHeader
              style={{
                backgroundColor: openDropdown === index ? "#f7f8fc" : "#ffffff",
              }}
              onClick={() => toggleDropdown(index)}
            >
              <DropdownValue>{feature.title}</DropdownValue>
              <DropdownIcon isOpen={openDropdown === index}>
                <IoIosArrowDown />
              </DropdownIcon>
            </DropdownHeader>
            {openDropdown === index && (
              <DropdownBody>
                {plans.map((plan, index) => (
                  <DropdownRow odd={index % 2 !== 0} key={plan.key}>
                    <DropdownValue>{plan.name}</DropdownValue>
                    <DropdownValue weight={"400"}>
                      {renderTick(feature[plan.key])}
                    </DropdownValue>
                  </DropdownRow>
                ))}
              </DropdownBody>
            )}
          </DropdownWrapper>
        ))}
      </PlanMobileWrapper>
    </>
  );
}
