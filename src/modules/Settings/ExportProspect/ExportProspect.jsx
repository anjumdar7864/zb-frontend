// ExportProspect.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  ArrowIcon,
  CheckboxLabel,
  CheckboxWrapper,
  Column,
  Container,
  CustomDatePicker,
  Dropdown,
  EmailSection,
  EmailText,
  ErrorMessage,
  ExportButton,
  ExportButtonContainer,
  ExportCampaignStyle,
  ExportProspectPageStyle,
  FlexRow,
  InfoIconContainer,
  ParagraphText,
  StatusName,
  StyledCheckbox,
  TimeOption,
  TimePeriodContainer,
  TimePeriodRow,
  Title,
} from "./style";
// import {
//   FaFire,
//   FaSeedling,
//   FaThermometerEmpty,
//   FaTint,
//   FaCheckSquare,
//   FaQuestion,
//   FaRegFile,
//   FaRegAddressBook,
//   FaExclamation,
//   FaTimes,
//   FaPhoneSlash,
// } from "react-icons/fa";
import { DateRangePicker } from "rsuite";
import Components from "@/components";
import CompaignModel from "./CompaignModel";
import { LightTooltip } from "@/components/common";
import {
  getAllCompaignsWithFollowUps,
  getAllTagsList,
  getAllStatusList,
  exportProspect,
  clearErrors,
  clearMessages,
} from "@/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import MultiSelectorDropDown from "./MultiSelectorDropDown";
import Assets from "@/assets";
import { AiFillInfoCircle, AiOutlineStop } from "react-icons/ai";
import { FaCheck, FaExclamation, FaPhoneSlash } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const statusIconMap = {
  Hot: (
    <img
      style={{ width: "18px", height: "18px" }}
      src={Assets.Images.LeadIcon}
      alt="icon"
    />
  ),
  Warm: (
    <img
      style={{ width: "18px", height: "18px" }}
      src={Assets.Images.temprature}
      alt="icon"
    />
  ),
  Drip: (
    <img
      style={{ width: "18px", height: "18px" }}
      src={Assets.Images.sidebar_drop}
      alt="icon"
    />
  ),
  Nurture: (
    <img
      style={{ width: "18px", height: "18px" }}
      src={Assets.Images.nature}
      alt="icon"
    />
  ),
  // Verified: <img src={Assets.Images.LeadIcon} alt="icon" />,
  Verified: <FaCheck size={18} />,
  "No Status": (
    <img
      style={{ width: "18px", height: "18px" }}
      src={Assets.Images.question}
      alt="icon"
    />
  ),
  "Wrong Number": <FaExclamation size={18} />,
  "Not Interested": <MdClose size={18} />,
  DNC: <FaPhoneSlash size={18} />,
  "No Response": <AiOutlineStop size={18} />,
};

const ExportProspect = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [menuActive, setMenuActive] = useState(false);
  const [handleMenuActive, setHandleMenuActive] = useState(false);
  const dispatch = useDispatch();
  const allTagsData = useSelector((state) => state.tagReducer);
  const selectorDropDownData = allTagsData?.results;
  const [selectorData, setSelectorData] = useState(selectorDropDownData);
  const { results: campaignData } = useSelector(
    (s) => s.campaignReducer.campaignData
  );
  const doNotCalls = useSelector((state) => state.dncReducer);
  const { results: statuses } = useSelector((s) => s.statusReducer);

  useEffect(() => {
    setSelectorData(allTagsData?.results);
  }, [allTagsData?.results]);

  const updatedStatuses = [
    ...statuses.slice(0, 4),
    {
      _id: "verified_status",
      name: "Verified",
    },
    ...statuses.slice(4),
    {
      _id: "no_response",
      name: "No Response",
    },
  ];

  const [statusState, setStatusState] = useState({});
  const [disableNoResponse, setDisableNoResponse] = useState(true);
  const [selectAnyRatherThenNoResponse, setSelectAnyOneRatherThenNoResponse] =
    useState(false);
  const [selectNoResponse, setSelectNoResponse] = useState(false);
  const [selectedStatusId, setSelectedStatusId] = useState("");
  const [statusError, setStatusError] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [selectedDateActive, setSelectedDateActive] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [showTimePeriodError, setShowTimePeriodError] = useState(false);
  const [dropDownData, setDropDownData] = useState([...campaignData]);
  if (dropDownData?.length <= 0 && campaignData?.length > 0) {
    setDropDownData(campaignData);
  }
  const [compaignName, setCompaignName] = useState("All Compaigns");
  const [compaignID, setCompaignID] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [customeDate, setCustomeDate] = useState("Custome Date");
  const [isCalender, setCalender] = useState(false);
  const calenderRef2 = useRef();
  const [toastId, setToastId] = useState(null);
  const [isLeadVerified, setIsLeadVerified] = useState(false);

  useEffect(() => {
    if (doNotCalls?.errors?.length > 0) {
      toast.success(doNotCalls?.errors, {
        position: "bottom-right",
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
      dispatch(clearErrors());
      if (toastId) {
        toast.dismiss(toastId);
        setToastId(null);
      }
    }
    if (doNotCalls?.message !== "") {
      toast.success(doNotCalls?.message, {
        position: "bottom-right",
        style: {
          backgroundColor: "#34bfa3",
          color: "white",
        },
      });
      dispatch(clearMessages());
      if (toastId) {
        toast.dismiss(toastId);
        setToastId(null);
      }
    }
    if (doNotCalls?.exportLoading === true) {
      const loadingToastId = toast.loading(`Beginning prospect export`, {
        position: "bottom-right",
        style: {
          backgroundColor: "#36a3f7",
          color: "white",
        },
      });
      setToastId(loadingToastId);
    }
  }, [doNotCalls?.errors, doNotCalls?.message, doNotCalls?.exportLoading]);
  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );

  const timeZone = user?.timeZone ?? "America/New_York";
  useEffect(() => {
    dispatch(
      getAllCompaignsWithFollowUps({
        page: 1,
        limit: 5000,
        search: "",
      })
    );
    dispatch(getAllTagsList({ inbox: true }));
    dispatch(getAllStatusList());
  }, [dispatch]);

  useEffect(() => {
    const initialStatusState = {};
    statuses.forEach((status) => {
      initialStatusState[status.id] = false;
    });
    setStatusState(initialStatusState);
  }, [statuses]);

  const onSelect = (selectedList, selectedItem) => {
    setSelectedOptions(selectedList);
  };
  const onRemove = (selectedList, removedItem) => {
    setSelectedOptions(selectedList);
  };
  const todayDate = new Date();
  // const lastMonth = new Date(today);
  // lastMonth.setMonth(lastMonth.getMonth() - 1);
  // const lastThreeMonth = new Date(today);
  // lastThreeMonth.setMonth(lastThreeMonth.getMonth() - 3);

  const today = new Date(
    new Intl.DateTimeFormat('en-US', { timeZone }).format(todayDate)
  );

  const lastMonth = new Date(today);
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  const lastThreeMonth = new Date(today);
  lastThreeMonth.setMonth(lastThreeMonth.getMonth() - 3);



  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleDateRange = (start, end) => {
    const startDate = new Intl.DateTimeFormat("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    }).format(start);
    const endDate = new Intl.DateTimeFormat("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    }).format(end);
    setCustomeDate(`${startDate} - ${endDate}`);
    setSelectedDate({
      from: startDate,
      to: endDate,
    });
  };

  function handleSubmit() {
    let selectedStatuses = Object.entries(statusState)
      .filter(([id, checked]) => checked && id !== "no_response")
      .map(([id]) => id);
    if (
      statusState["verified_status"] &&
      Object.keys(statusState).length === 2
    ) {
      const verifiedStatuses = updatedStatuses
        .filter(
          (status) =>
            status.name === "Hot" ||
            status.name === "Warm" ||
            status.name === "Nurture" ||
            status.name === "Drip"
        )
        .map((status) => status._id);
      selectedStatuses = [...verifiedStatuses, "651ebe828042b1b3f4674ea8"];
      setIsLeadVerified(true);
    } else {
      selectedStatuses = Object.entries(statusState)
        .filter(
          ([id, checked]) =>
            checked && id !== "no_response" && id !== "verified_status"
        )
        .map(([id]) => id);
    }
    if (statusState["no_response"]) {
      // setDisableInput(false);
      selectedStatuses = [];
    }

    let campaignFinalResult;
    if (compaignName === "All Compaigns") {
      let campaignIds = campaignData?.map((item) => item._id);
      campaignFinalResult = campaignIds;
    } else {
      campaignFinalResult = [compaignID];
    }
    const user = JSON.parse(
      localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
    );
    let selectedTags = selectedValues?.map((option) => option._id);

    const selectedStatusesError = Object.entries(statusState)
      .filter(([id, checked]) => checked)
      .map(([id]) => {
        return id;
      });
    if (selectedStatusesError.length === 0) {
      setStatusError(true);
    } else {
      setStatusError(false);
    }

    if (selectedDate.length === 0) {
      setShowTimePeriodError(true);
    } else {
      setShowTimePeriodError(false);
    }
    if (selectedStatusesError.length === 0 || selectedDate.length === 0) {
      return;
    }
    let submitData;
    if (selectedTags.length <= 0) {
      const requiredFilters = [
        "651ebe268042b1b3f4674e9b",
        "651ebe4e8042b1b3f4674e9d",
        "651ebe5b8042b1b3f4674ea0",
        "651ebe648042b1b3f4674ea2",
        "651ebe828042b1b3f4674ea8",
      ];
      const isAllFiltersAvailable = requiredFilters.every((filter) =>
        selectedStatuses.includes(filter)
      );
      if (isAllFiltersAvailable) {
        setIsLeadVerified(true);
      } else {
        setIsLeadVerified(false);
      }
      submitData = {
        campagin: campaignFinalResult,
        status: selectedStatuses,
        isEmail,
        email: user?.email,
        monthDates: selectedDate,
        isLeadVerified,
      };
    } else {
      const requiredFilters = [
        "651ebe268042b1b3f4674e9b",
        "651ebe4e8042b1b3f4674e9d",
        "651ebe5b8042b1b3f4674ea0",
        "651ebe648042b1b3f4674ea2",
        "651ebe828042b1b3f4674ea8",
      ];
      const isAllFiltersAvailable = requiredFilters.every((filter) =>
        selectedStatuses.includes(filter)
      );
      if (isAllFiltersAvailable) {
        setIsLeadVerified(true);
      } else {
        setIsLeadVerified(false);
      }
      submitData = {
        campagin: campaignFinalResult,
        status: selectedStatuses,
        tags: selectedTags,
        isEmail,
        email: user?.email,
        monthDates: selectedDate,
        isLeadVerified,
      };
    }
    dispatch(exportProspect(submitData));
  }

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        event.target.tagName.toLowerCase() == "blockquote" ||
        event.target.tagName.toLowerCase() == "div" ||
        event.target.tagName.toLowerCase() == "p"
      ) {
        event.stopPropagation();
        setMenuActive(false);
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    setMenuActive(false);
  }, [handleMenuActive]);

  const type = localStorage.getItem("type") ?? localStorage.getItem("type");
  return (
    <>
      <Components.Common.ModalTop open={isOpen} onClose={() => { }}>
        <CompaignModel
          cancelButtonHandler={() => setIsOpen(!isOpen)}
          data={dropDownData}
          setData={setDropDownData}
          selectCompaignName={setCompaignName}
          selectedCompaignID={setCompaignID}
        />
      </Components.Common.ModalTop>

      <ExportProspectPageStyle>
        <blockquote>
          <div>
            <div style={{ padding: "24px" }}>
              <ParagraphText>
                Select single or multiple Lead Status, choose a desired Time
                Period and click the Export" button
              </ParagraphText>
            </div>
            <ExportCampaignStyle>
              {/* Campaign Dropdown */}
              <Container>
                <Title>Campaign</Title>
                <Dropdown onClick={() => setIsOpen(true)}>
                  <ParagraphText>{compaignName}</ParagraphText>
                  <ArrowIcon isOpen={isOpen} />
                </Dropdown>
              </Container>

              {/* Lead Status Section */}
              <Container marginTop="18px">
                <Title>Lead Status</Title>
                <FlexRow>
                  {/* Left Column */}
                  <Column>
                    {updatedStatuses.slice(0, 5).map((status) => (
                      <CheckboxWrapper key={status._id}>
                        <StyledCheckbox
                          type="checkbox"
                          checked={statusState[status._id]}
                          disabled={selectNoResponse}
                          onChange={(e) => {
                            setStatusState({
                              ...statusState,
                              [status._id]: e.target.checked
                                ? status._id
                                : false,
                            });
                            setSelectedStatusId(status._id);
                            if (
                              selectedStatusId === status._id ||
                              selectedStatusId === ""
                            ) {
                              setSelectAnyOneRatherThenNoResponse(
                                !selectAnyRatherThenNoResponse
                              );
                            }
                            if (status.name === "Verified") {
                              setIsLeadVerified(true);
                            } else {
                              setIsLeadVerified(false);
                            }
                          }}
                        />
                        <CheckboxLabel>
                          {statusIconMap[status.name]}
                          <StatusName>{status.name}</StatusName>
                          {["Verified", "No Status", "No Response"].includes(
                            status.name
                          ) && (
                              <LightTooltip
                                placement="top"
                                arrow
                                title={
                                  ["Verified"].includes(status.name) && (
                                    <p>All Leads with verified phone number</p>
                                  )
                                }
                              >
                                <InfoIconContainer>
                                  <AiFillInfoCircle
                                    style={{
                                      color: "#7c7c7c4b",
                                      fontSize: "1.2rem",
                                    }}
                                  />
                                </InfoIconContainer>
                              </LightTooltip>
                            )}
                        </CheckboxLabel>
                      </CheckboxWrapper>
                    ))}
                  </Column>

                  {/* Right Column */}
                  <Column>
                    {updatedStatuses.slice(5).map((status) => (
                      <CheckboxWrapper key={status._id}>
                        <StyledCheckbox
                          type="checkbox"
                          checked={statusState[status._id]}
                          disabled={
                            (selectAnyRatherThenNoResponse &&
                              status.name === "No Response") ||
                            (selectNoResponse && status.name !== "No Response")
                          }
                          onChange={(e) => {
                            setStatusState({
                              ...statusState,
                              [status._id]: e.target.checked
                                ? status._id
                                : false,
                            });
                            status.name === "No Response" &&
                              setSelectNoResponse(!selectNoResponse);
                          }}
                        />
                        <CheckboxLabel>
                          {statusIconMap[status.name]}
                          <StatusName>{status.name}</StatusName>
                          {["Verified", "No Status", "No Response"].includes(
                            status.name
                          ) ? (
                            <LightTooltip
                              placement="top"
                              arrow
                              title={
                                ["No Status"].includes(status.name) ? (
                                  <p>
                                    Leads that responded, but without any status
                                    selected yet
                                  </p>
                                ) : (
                                  <p>Leads that haven't responded</p>
                                )
                              }
                            >
                              <InfoIconContainer>
                                <AiFillInfoCircle
                                  style={{
                                    color: "#7c7c7c4b",
                                    fontSize: "1.2rem",
                                  }}
                                />
                              </InfoIconContainer>
                            </LightTooltip>
                          ) : null}
                        </CheckboxLabel>
                      </CheckboxWrapper>
                    ))}
                  </Column>
                </FlexRow>

                {/* Error Message Section */}
                {statusError && (
                  <ErrorMessage>
                    Please select at least one Lead Status
                  </ErrorMessage>
                )}
              </Container>

              {/* Tags */}
              {/* <div>
              <p>Tags</p>
              <Multiselect
                options={allTagsData?.results}
                displayValue="name"
                selectedValues={selectedOptions}
                onSelect={onSelect}
                onRemove={onRemove}
                placeholder="Type to add tags"
              />
            </div> */}
              <div style={{ maxWidth: "400px" }}>
                <MultiSelectorDropDown
                  data={selectorData}
                  setData={setSelectorData}
                  selectedData={selectedValues}
                  setSelectedData={setSelectedValues}
                  setActive={setMenuActive}
                  active={menuActive}
                />
              </div>


              {/* Time Period Section */}
              <TimePeriodContainer>
                <Title>Time Period</Title>
                <TimePeriodRow>
                  <TimeOption
                    active={selectedDateActive === 1}
                    onClick={() => {
                      setMenuActive(false);
                      setSelectedDateActive(1);
                      setSelectedDate({
                        from: formatDate(lastMonth),
                        to: formatDate(today),
                      });
                    }}
                  >
                    <LightTooltip
                      placement="top"
                      arrow
                      title={
                        <>
                          <p>
                            {formatDate(lastMonth)} - {formatDate(today)}
                          </p>
                        </>
                      }
                    >
                      <ParagraphText opacity={0.7}>
                        {selectedDateActive === 1
                          ? formatDate(lastMonth)
                          : "Last month"}
                      </ParagraphText>
                    </LightTooltip>
                  </TimeOption>
                  <TimeOption
                    active={selectedDateActive === 2}
                    onClick={() => {
                      setSelectedDateActive(2);
                      setSelectedDate({
                        from: formatDate(lastThreeMonth),
                        to: formatDate(today),
                      });
                    }}
                  >
                    <LightTooltip
                      placement="top"
                      arrow
                      title={
                        <>
                          <p>
                            {formatDate(lastThreeMonth)} - {formatDate(today)}
                          </p>
                        </>
                      }
                    >
                      <ParagraphText opacity={0.7}>
                        {selectedDateActive === 2
                          ? formatDate(lastThreeMonth)
                          : "Last 3 months"}
                      </ParagraphText>
                    </LightTooltip>
                  </TimeOption>
                  <CustomDatePicker>
                    <DateRangePicker
                      placeholder="Custom dates"
                      onChange={(e) => {
                        setCalender(false);
                        handleDateRange(e[0], e[1]);
                      }}
                    />
                  </CustomDatePicker>
                </TimePeriodRow>
                {showTimePeriodError && (
                  <ErrorMessage>Please select a Time Period</ErrorMessage>
                )}
              </TimePeriodContainer>

              {/* Email Section (Admin Only) */}
              {type === "admin" && (
                <EmailSection>
                  <CheckboxWrapper>
                    <StyledCheckbox
                      type="checkbox"
                      checked={isEmail}
                      onChange={(e) => setIsEmail(e.target.checked)}
                    />
                    <CheckboxLabel>
                      <EmailText>
                        Email export results to <strong>admin</strong>
                      </EmailText>
                      <LightTooltip
                        placement="top"
                        arrow
                        title={
                          <>
                            <p>
                              Check this option if you want the account admin to
                              receive an email with the export results
                            </p>
                          </>
                        }
                      >
                        <InfoIconContainer>
                          <img src={Assets.Images.FaInfoCircle} alt="icon" />
                        </InfoIconContainer>
                      </LightTooltip>
                    </CheckboxLabel>
                  </CheckboxWrapper>
                </EmailSection>
              )}

              {/* Export Button */}
              <ExportButtonContainer>
                <LightTooltip
                  placement="top"
                  arrow
                  title={
                    <>
                      <p>
                        Export File will be downloaded in your browser (can take
                        up to a few minutes)
                      </p>
                    </>
                  }
                >
                  <ExportButton onClick={handleSubmit}>
                    {/* <FaRegFile /> */}
                    {doNotCalls?.exportLoading ? "..........." : "Export"}
                  </ExportButton>
                </LightTooltip>
              </ExportButtonContainer>
            </ExportCampaignStyle>
          </div>
        </blockquote>
      </ExportProspectPageStyle>
    </>
  );
};

export default ExportProspect;
