import {
  FaArrowLeft,
  FaCheck,
  FaCheckCircle,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaCode,
  FaEnvelope,
  FaExclamationCircle,
  FaInfoCircle,
  FaPlus,
  FaRocket,
  FaTimes,
  FaTrash,
  FaMagic,
  FaLayerGroup,
} from "react-icons/fa";
import { SlArrowUp } from "react-icons/sl";
import { BiCircle } from "react-icons/bi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  HiMiniChevronDoubleLeft,
  HiMiniChevronDoubleRight,
  HiMiniChevronLeft,
  HiMiniChevronRight,
} from "react-icons/hi2";
import {
  AddTextSpinnerModalStyled,
  AddTextSpinnerStyled,
  CreateTemplateStyled,
  PaginationStyled,
  StyledMenu,
  VariationsModalStyled,
} from "./styles";
import { LightTooltip } from "@/components/common";
import Assets from "@/assets";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGlobalContext, useMessageTemplate } from "@/hooks";
import Components from "@/components";
import { useFormik } from "formik";
import {
  createTemplateSchema,
  textSpinnerSchema,
  textSpinnerSchema2,
} from "@/schema";
import { useDispatch, useSelector } from "react-redux";
import { find } from "lodash-es";
import {
  createTemplate,
  getSingleTemplate,
  updateTemplate,
  getAllTemplates,
} from "@/store/actions";
import toast from "react-hot-toast";
import { templateNegativeWords as negativeKeywords } from "@/utils";
import { MessageSimilarityNoticeModal } from "./MessageSimilarityNoticeModal";
import { GoInfo } from "react-icons/go";
import Picker from "@emoji-mart/react";
import Emojidata from "@emoji-mart/data";
import { BsEmojiSmile } from "react-icons/bs";
import { LuCode2 } from "react-icons/lu";
import { PiStack } from "react-icons/pi";
import Select, { components } from "react-select";
import { FaSort } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import PaginationComp from "../Pagination/Pagination";
import { LiaTimesSolid } from "react-icons/lia";

const disableFeatures = () => {
  // Disable Right-Click
  const disableRightClick = (e) => {
    e.preventDefault();
    //toast.error("Right-click is disabled.");
  };

  // Disable Text Selection and Copy
  const disableCopy = (e) => {
    e.preventDefault();
    // toast.error("Copying content is disabled.");
  };

  // Detect Print Screen (Partial Prevention)
  const detectPrintScreen = (e) => {
    if (e.key === "PrintScreen") {
      //toast.error("Screenshots are disabled.");
      document.body.style.visibility = "hidden";
      setTimeout(() => (document.body.style.visibility = "visible"), 1000);
    }
  };

  // Add Event Listeners
  document.addEventListener("contextmenu", disableRightClick);
  document.addEventListener("copy", disableCopy);
  document.addEventListener("keydown", detectPrintScreen);

  return () => {
    // Cleanup: Remove Event Listeners when the component unmounts
    document.removeEventListener("contextmenu", disableRightClick);
    document.removeEventListener("copy", disableCopy);
    document.removeEventListener("keydown", detectPrintScreen);
  };
};

const CreateTemplate = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const navigate = useNavigate();
  const [isNegativeWordsShowing, setIsNegativeWordsShowing] = useState(false);
  const [isMessageSimilarityNoticeModal, setIsMessageSimilarityNoticeModal] =
    useState(false);
  const [similarMessage, setIsSimilarMessage] = useState("");
  const [existTemplate, setExistTemplate] = useState(null);
  const { allVariations, currentIndex, setMessage, setCurrentIndex, messages } =
    useMessageTemplate();
  const textArea = useRef(null);
  const [isAddTextSpinnerModalOpen, setIsAddTextSpinnerModalOpen] =
    useState(false);
  const { templateId } = useParams();
  const queryParams = new URLSearchParams(useLocation().search);
  const isFollowUp = Boolean(queryParams.get("follow"));

  const [showingVariations, setShowingVariations] = useState([]);
  const { loading, singleTemplate } = useSelector((s) => s.templateReducer);
  const [isTextSpinnerShowing, setIsTextSpinnerShowing] = useState(false);
  const dispatch = useDispatch();
  const { setIsLoaderShowing } = useGlobalContext();
  const spinnerRegex = /\[([^\]]+)?\]/g;
  const { setFieldValue, ...formik } = useFormik({
    initialValues: {
      templateName: "",
      templateType: "Residential",
      message1: "",
      message2: "",
      message3: "",
      message4: "",
      message5: "",
    },
    validationSchema: createTemplateSchema,
   
    onSubmit: (values) => {
      const body = {
        name: values.templateName,
        type: values.templateType,
        totalVariations: allVariations?.length || 0,
        messages: [
          {
            message1: values.message1,
            message2: values.message2,
            message3: values.message3,
            message4: values.message4,
            altMessage: values.message5,
          },
        ],
        mode: isFollowUp ? "follow" : "initial",
      };
      // if (templateId) {
      //   delete body.mode;
      // }
      console.log(body.messages);
      // Update Template
      if (templateId) {
        dispatch(
          updateTemplate({ body, _id: templateId }, () => {
            toast.success("Template Updated!");
            navigate(
              isFollowUp
                ? "/templates/follow-up-messages"
                : "/templates/initial-templates"
            );
          })
        );
      } else {
        // Create Template
        // dispatch(
        //   getAllTemplates({ limit: 1000, mode: isFollowUp ? "follow" : "initial" }, (res) => {
        //     const existTemplate = find(res?.results, (t) => {
        //       if (t.name === body.name) return true;
        //       const messages = t.messages[0];
        //       for (const key in messages) {
        //         if (messages[key] === body.messages[0][key] && key !== "altMessage") {
        //           console.log("mkey",messages[key]);
        //           console.log("bkey",body.messages[0][key]);
        //           return true;
        //         }
        //       }
        //       return false;
        //     });

        //     if (existTemplate) {
        //       setIsMessageSimilarityNoticeModal(true);
        //       setExistTemplate(existTemplate);
        //     } else {
        //       dispatch(
        //         createTemplate({ body }, () => {
        //           toast.success("Template Created!");
        //           navigate(isFollowUp ? "/templates/follow-up-messages" : "/templates/initial-templates");
        //         })
        //       );
        //     }
        //   })
        // );
        dispatch(
          getAllTemplates(
            { limit: 1000, mode: isFollowUp ? "follow" : "initial" },
            (res) => {
              console.log("res", res);
              const existTemplate = find(res?.results, (t) => {
                if (t.name === body.name) return true;

                const messages = t.messages[0];
                if (!messages || !body.messages || !body.messages[0])
                  return false; // Ensure valid structures

                for (const key in messages) {
                  if (
                    key !== "altMessage" &&
                    messages[key] !== undefined &&
                    body.messages[0][key] !== undefined &&
                    messages[key] === body.messages[0][key]
                  ) {
                    // console.log("Key:", key);
                    // console.log("Message Key Value:", messages[key]);
                    // console.log("Body Key Value:", body.messages[0][key]);
                    setIsSimilarMessage(key);
                    return true; // Similarity found
                  }
                }
                return false;
              });
              if (existTemplate) {
                setIsMessageSimilarityNoticeModal(true);
                setExistTemplate(existTemplate);
              } else if (!loading) {
                dispatch(
                  createTemplate({ body }, () => {
                    toast.success("Template Created!");
                    navigate(
                      isFollowUp
                        ? "/templates/follow-up-messages"
                        : "/templates/initial-templates"
                    );
                  })
                );
              }
            }
          )
        );
      }
    },
  });

  const cursorPosition = () => {
    // Get the current cursor position in the textarea
    const textarea = document.getElementById("myTextarea");
    const cursorPosition = textarea.selectionStart;

    console.log("text", cursorPosition);
    // Focus the textarea to ensure the cursor is visible
    textarea.focus();
    return { start: textarea.selectionStart, end: textarea.selectionEnd };
  };
  const spinnerNumber1 = useMemo(() => {
    const matches = Array.from(
      messages[currentIndex].message.matchAll(spinnerRegex)
    ).map((match) => match[1]);
    let length = matches.length;
    return length;
  }, [messages]);
  const handleTextAreaChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const handleTextAreaInput = () => {
    if (textArea.current) {
      textArea.current.style.height = textArea.current.scrollHeight + "px";
    }
  };

  const handlePlaceholderInsertion = (textToInsert) => {
    const cursorPositions = cursorPosition();
    if (textArea.current) {
      const startPos = cursorPositions.start;
      const endPos = cursorPositions.end;

      // Update the textarea with the new text
      setMessage((text) => {
        const currentText = text;
        return (
          currentText.substring(0, startPos) +
          textToInsert +
          currentText.substring(endPos)
        );
      });

      textArea.current.selectionStart = startPos + textToInsert.length;
      textArea.current.selectionEnd = startPos + textToInsert.length;
    } else {
      setMessage((prevText) => prevText + textToInsert);
    }
  };

  useEffect(() => {
    handleTextAreaInput();
  }, [messages]);

  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );

  useEffect(() => {
    if (user?.subscriptionId === "6744617ea4d142ed16ea9c9e") {
      const cleanup = disableFeatures();
      return cleanup;
    }
  }, [user?.subscriptionId]);

  useEffect(() => {
    textArea?.current?.focus();
    setFieldValue("message1", messages[0].message);
    setFieldValue("message2", messages[1].message);
    setFieldValue("message3", messages[2].message);
    setFieldValue("message4", messages[3].message);
    setFieldValue("message5", messages[4].message);
  }, [messages, currentIndex, setFieldValue]);

  useLayoutEffect(() => {
    setIsLoaderShowing(loading);
  }, [loading, setIsLoaderShowing]);

  useLayoutEffect(() => {
    if (templateId)
      dispatch(
        getSingleTemplate({ _id: templateId }, null, () => {
          toast.error("Template not found!");
          navigate(`/templates${isFollowUp ? "/follow-up-messages" : ""}`);
        })
      );
  }, [dispatch, isFollowUp, navigate, templateId]);

  useLayoutEffect(() => {
    if (!templateId) return;
    setFieldValue("templateName", singleTemplate?.name);
    setFieldValue("templateType", singleTemplate?.type);
    setFieldValue(
      "message1",
      singleTemplate?.messages ? singleTemplate?.messages[0]?.message1 : ""
    );
    setFieldValue(
      "message2",
      singleTemplate?.messages ? singleTemplate?.messages[0]?.message2 : ""
    );
    setFieldValue(
      "message3",
      singleTemplate?.messages ? singleTemplate?.messages[0]?.message3 : ""
    );
    setFieldValue(
      "message4",
      singleTemplate?.messages ? singleTemplate?.messages[0]?.message4 : ""
    );
    setFieldValue(
      "message5",
      singleTemplate?.messages ? singleTemplate?.messages[0]?.altMessage : ""
    );

    messages[0].setMessage(
      singleTemplate?.messages ? singleTemplate?.messages[0]?.message1 : ""
    );
    messages[1].setMessage(
      singleTemplate?.messages ? singleTemplate?.messages[0]?.message2 : ""
    );
    messages[2].setMessage(
      singleTemplate?.messages ? singleTemplate?.messages[0]?.message3 : ""
    );
    messages[3].setMessage(
      singleTemplate?.messages ? singleTemplate?.messages[0]?.message4 : ""
    );
    messages[4].setMessage(
      singleTemplate?.messages ? singleTemplate?.messages[0]?.altMessage : ""
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setFieldValue, singleTemplate, templateId]);

  const [anchorEl, setAnchorEl] = useState(null);
  const { isSmall } = useGlobalContext();
  const handleClick = (data) => {
    onClick(data?.native);
    setAnchorEl(null);
  };

  const Templateoptions = [
    "Residential",
    "Commercial",
    "Land",
    "Multi Family",
    "Pre-Foreclosure / Liens / Auction",
    "Probate / Bankruptcy",
    "Vacant / Absentee",
  ]?.map((data, index) => ({
    value: index,
    label: data,
  }));
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <FaAngleDown style={{ color: "#777777", paddingRight: "rem" }} />
      </components.DropdownIndicator>
    );
  };
  return (
    <CreateTemplateStyled
      ChevronDown={Assets.Images.SortDefault}
      isNegativeWordsShowing={isNegativeWordsShowing}
      isTextSpinnerShowing={isTextSpinnerShowing}
    >
      <div className="top">
        <h1>
          {templateId ? "Edit " : "Create"}{" "}
          {isFollowUp ? "Follow Up" : "Initial"} Template
        </h1>
      </div>
      <div className="bottom">
        <form className="left" onSubmit={(e) => e.preventDefault()}>
          <div className="top">
            <label className="item">
              <p className="title">
                <div className="wrapper">
                  <span className="text">Template Name</span>
                  <span className="icon">
                    <LightTooltip
                      arrow
                      placement="top"
                      title={
                        <>
                          <p>Best practice is to name it according</p>
                          <p>to type of properties you are texting</p>
                          <p>(e.g. Vacant, High Equity, Liens, etc)</p>
                        </>
                      }
                    >
                      <span className="info">
                        <GoInfo
                          style={{
                            color: "#012635",
                            fontSize: "1.8rem",
                          }}
                        />
                      </span>
                    </LightTooltip>
                  </span>
                </div>
              </p>
              <input
                type="text"
                placeholder="Enter Template Name"
                name="templateName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.templateName}
              />
              {formik.errors.templateName && formik.touched.templateName && (
                <p className="error">{formik.errors.templateName}</p>
              )}
            </label>
            <label className="item">
              <p className="title">
                <div className="wrapper">
                  <span className="text">Template Type</span>
                  <span className="icon">
                    <LightTooltip
                      arrow
                      placement="top"
                      title={
                        <>
                          <p>Choose a template type</p>
                          <p>based on prospects you&apos;re texting</p>
                        </>
                      }
                    >
                      <span className="info">
                        <GoInfo
                          style={{
                            color: "#012635",
                            fontSize: "1.8rem",
                          }}
                        />
                      </span>
                    </LightTooltip>
                  </span>
                </div>
              </p>

              <Select
                components={{
                  DropdownIndicator,
                  IndicatorSeparator: () => null,
                }}
                onChange={(e) => setFieldValue("templateType", e.label)}
                options={Templateoptions}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder={formik.values.templateType}
                defaultValue={formik.values.templateType}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: "#F7F8FC",
                    primary: "#00BD82",
                  },
                })}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    width: "100%",
                    height: "4rem",
                  }),
                }}
                IndicatorsContainer={false}
              />
              <p className="info">
                Kickstart conversations with a variety of motivated sellers
              </p>
              {/* <p className="error">This is error</p> */}
            </label>
          </div>
          <div className="bottom">
            <div className="top">
              <div className="top">
                <div className="right">
                  <div className="inner">
                    <h2>Messages</h2>
                    <p>
                      Follow our
                      <span> Best Practices </span>
                      to build high-converting content
                    </p>
                  </div>
                  <LightTooltip
                    placement="top"
                    arrow
                    title={
                      <>
                        <p style={{ fontWeight: "bold" }}>
                          DO NOT use negative keywords
                        </p>
                        <p>These words and phrases have high chance</p>
                        <p>flagging your message as spam</p>
                      </>
                    }
                  >
                    <button
                      type="button"
                      onClick={() => setIsNegativeWordsShowing((p) => !p)}
                      style={{ fontSize: "1.2rem" }}
                    >
                      <SlArrowUp
                        style={{
                          fontWeight: "bolder",
                          color: "#012635",
                        }}
                      />
                      Negative Keywords
                    </button>
                  </LightTooltip>
                </div>
              </div>
              <AnimatePresence>
                {isNegativeWordsShowing && (
                  <motion.ul
                    className="bottom"
                    initial={{
                      opacity: 0,
                      height: "0",
                      padding: "0rem .65rem 0rem 1.5rem",
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                      padding: "1.2rem 1.2rem 1.2rem 1.2rem",
                      transition: { duration: 0.3, ease: "easeIn" },
                    }}
                    exit={{
                      opacity: 0,
                      height: "0",
                      padding: "0rem .65rem 0rem 1.5rem",
                      transition: { duration: 0.3, ease: "easeIn" },
                    }}
                  >
                    {negativeKeywords.map((word, i) => (
                      <li key={i}>{word}</li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
            <div className="bottom">
              <div className="top">
                <div className="topHeader">
                  <div className="messageUnderHeader">
                    <h5>{`Message ${currentIndex + 1}`}</h5>
                  </div>
                  <div className="track">
                    <div className="trackChild">
                      <div
                        className={`item ${
                          currentIndex === 0 ? "active" : ""
                        } ${messages[0].isDone ? "done" : ""} ${
                          messages[0].errors.length !== 0 ? "error" : ""
                        }`}
                        onClick={() => setCurrentIndex(0)}
                      >
                        <div className="bottom">
                          <span className="text">
                            {messages[0].isDone ? (
                              <FaCheck />
                            ) : (
                              <span className="text">1</span>
                            )}
                          </span>
                          {/* <span className="right"></span> */}
                        </div>
                        {currentIndex === 0 && (
                          <h6>
                            <span className="text">Message 1</span>
                            {/* {messages[0].isDone ? (
                            <span className="icon">
                              <FaCheck />
                            </span>
                          ) : (
                            (messages[0].errors.length !== 0 ||
                              messages[0].message !== "") &&
                            currentIndex !== 0 && (
                              <span className="icon error">
                                <FaExclamationCircle />
                              </span>
                            )
                          )} */}
                          </h6>
                        )}
                      </div>
                      <div className="itemHr"></div>
                      <div
                        className={`item ${
                          currentIndex === 1 ? "active" : ""
                        } ${messages[1].isDone ? "done" : ""} ${
                          messages[1].errors.length !== 0 ? "error" : ""
                        }`}
                        onClick={() => setCurrentIndex(1)}
                      >
                        <div className="bottom">
                          <span className="text">
                            {messages[1].isDone ? (
                              <FaCheck />
                            ) : (
                              <span className="text">2</span>
                            )}
                          </span>
                        </div>
                        {currentIndex === 1 && (
                          <h6>
                            <span className="text">Message 2</span>
                            {/* {messages[1].isDone ? (
                            <span className="icon">
                              <FaCheck />
                            </span>
                          ) : (
                            (messages[1].errors.length !== 0 ||
                              messages[1].message !== "") &&
                            currentIndex !== 1 && (
                              <span className="icon error">
                                <FaExclamationCircle />
                              </span>
                            )
                          )} */}
                          </h6>
                        )}
                      </div>
                      <div className="itemHr"></div>
                      <div
                        className={`item ${
                          currentIndex === 2 ? "active" : ""
                        } ${messages[2].isDone ? "done" : ""} ${
                          messages[2].errors.length !== 0 ? "error" : ""
                        }`}
                        onClick={() => setCurrentIndex(2)}
                      >
                        <div className="bottom">
                          <span className="text">
                            {messages[2].isDone ? (
                              <FaCheck />
                            ) : (
                              <span className="text">3</span>
                            )}
                          </span>
                        </div>

                        {currentIndex === 2 && (
                          <h6>
                            <span className="text">Message 3</span>
                            {/* {messages[2].isDone ? (
                            <span className="icon">
                              <FaCheck />
                            </span>
                          ) : (
                            (messages[2].errors.length !== 0 ||
                              messages[2].message !== "") &&
                            currentIndex !== 2 && (
                              <span className="icon error">
                                <FaExclamationCircle />
                              </span>
                            )
                          )} */}
                          </h6>
                        )}
                      </div>
                      <div className="itemHr"></div>
                      <div
                        className={`item ${
                          currentIndex === 3 ? "active" : ""
                        } ${messages[3].isDone ? "done" : ""} ${
                          messages[3].errors.length !== 0 ? "error" : ""
                        }`}
                        onClick={() => setCurrentIndex(3)}
                      >
                        <div className="bottom">
                          <span className="text">
                            {messages[3].isDone ? (
                              <FaCheck />
                            ) : (
                              <span className="text">4</span>
                            )}
                          </span>
                        </div>
                        {currentIndex === 3 && (
                          <h6>
                            <span className="text">Message 4</span>
                            {/* {messages[3].isDone ? (
                            <span className="icon">
                              <FaCheck />
                            </span>
                          ) : (
                            (messages[3].errors.length !== 0 ||
                              messages[3].message !== "") &&
                            currentIndex !== 3 && (
                              <span className="icon error">
                                <FaExclamationCircle />
                              </span>
                            )
                          )} */}
                          </h6>
                        )}
                      </div>
                      <div className="itemHr"></div>
                      <div
                        className={`item ${
                          currentIndex === 4 ? "active" : ""
                        } ${messages[4].isDone ? "done" : ""} ${
                          messages[4].errors.length !== 0 ? "error" : ""
                        }`}
                        onClick={() => setCurrentIndex(4)}
                      >
                        <div className="bottom">
                          <span className="text">
                            {messages[4].isDone ? (
                              <FaCheck />
                            ) : (
                              <span className="text">5</span>
                            )}
                          </span>
                        </div>
                        {currentIndex === 4 && (
                          <h6>
                            <span className="text">Message 5</span>
                            {/* {messages[4].isDone ? (
                            <span className="icon">
                              <FaCheck />
                            </span>
                          ) : (
                            (messages[4].errors.length !== 0 ||
                              messages[4].message !== "") &&
                            currentIndex !== 4 && (
                              <span className="icon error">
                                <FaExclamationCircle />
                              </span>
                            )
                          )} */}
                          </h6>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="message">
                  <textarea
                    placeholder="Write your message"
                    maxLength={320}
                    onChange={handleTextAreaChange}
                    value={messages[currentIndex].message}
                    ref={textArea}
                    id="myTextarea"
                    onKeyUp={(e) => cursorPosition()}
                    onMouseMove={(e) => cursorPosition()}
                    onInput={handleTextAreaInput}
                    style={{ height: 200 }}
                  ></textarea>
                  <div className="container">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: messages[currentIndex].html,
                      }}
                    ></p>
                    {isTextSpinnerShowing && (
                      <AddTextSpinner
                        onSubmit={(val) => {
                          handlePlaceholderInsertion(val + " ");
                          setIsTextSpinnerShowing(false);
                        }}
                        spinnerNumber={spinnerNumber1 + 1}
                      />
                    )}
                  </div>
                  <p className="info">{messages[currentIndex].length} / 320</p>
                  <p
                    className="error"
                    dangerouslySetInnerHTML={{
                      __html: messages[currentIndex].errors[0],
                    }}
                  ></p>
                </div>

                <div className="menuSection">
                  <section>
                    {/* <p>Beta AI</p> */}
                    <button>
                      {/* <FaMagic /> */}
                      Generate Template
                    </button>
                  </section>
                  <div>
                    <LightTooltip arrow placement="top" title="Insert Emoji">
                      <button
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        className="emoji"
                        type="button"
                        style={{
                          backgroundColor: "#F0F0F0",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          fontSize: "1.1rem",
                          fontWeight: 500,
                          padding: "0.8rem 0.8rem",
                          borderRadius: "0.8rem",
                        }}
                      >
                        <BsEmojiSmile fontSize={"1.4rem"} />
                      </button>
                    </LightTooltip>
                    <StyledMenu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={() => setAnchorEl(null)}
                    >
                      <Picker
                        data={Emojidata}
                        onEmojiSelect={handleClick}
                        theme="light"
                        emojiSize={16}
                        emojiButtonSize={isSmall ? 28 : 36}
                        previewPosition={"none"}
                        skin={1}
                        searchPosition="none"
                        navPosition="none"
                      />
                    </StyledMenu>

                    <LightTooltip
                      placement="top"
                      arrow
                      title={
                        <>
                          <p>Maximize your message delivery by</p>
                          <p>spinning synonym words or phrases.</p>
                        </>
                      }
                    >
                      <button
                        onClick={() => {
                          setIsTextSpinnerShowing(true);
                        }}
                        disabled={
                          messages[currentIndex].message.length + 15 > 320
                        }
                        style={{
                          backgroundColor: isTextSpinnerShowing && "#C2FFEC",
                        }}
                      >
                        <LuCode2 color="#012635" />
                        Add Text Spinner
                      </button>
                    </LightTooltip>

                    <section>
                      <button
                        onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                      >
                        <PiStack color="#012635" />
                        Add Merge Field
                      </button>

                      {isDropDownOpen && (
                        <div>
                          <button
                            onClick={() => {
                              handlePlaceholderInsertion("{FirstName} ");
                              setIsDropDownOpen(!isDropDownOpen);
                            }}
                            disabled={
                              messages[currentIndex].message.length + 11 > 320
                            }
                          >
                            First Name
                          </button>
                          <button
                            onClick={() => {
                              handlePlaceholderInsertion("{LastName} ");
                              setIsDropDownOpen(!isDropDownOpen);
                            }}
                            disabled={
                              messages[currentIndex].message.length + 11 > 320
                            }
                          >
                            Last Name
                          </button>
                          <button
                            onClick={() => {
                              handlePlaceholderInsertion("{PropertyAddress} ");
                              setIsDropDownOpen(!isDropDownOpen);
                            }}
                            disabled={
                              messages[currentIndex].message.length + 17 > 320
                            }
                          >
                            Property Address
                          </button>
                          <button
                            onClick={() => {
                              handlePlaceholderInsertion("{PropertyCity} ");
                              setIsDropDownOpen(!isDropDownOpen);
                            }}
                            disabled={
                              messages[currentIndex].message.length + 14 > 320
                            }
                          >
                            Property City
                          </button>
                          <button
                            onClick={() => {
                              handlePlaceholderInsertion("{MailingAddress} ");
                              setIsDropDownOpen(!isDropDownOpen);
                            }}
                            disabled={
                              messages[currentIndex].message.length + 16 > 320
                            }
                          >
                            Mailing Address
                          </button>
                          <button
                            onClick={() => {
                              handlePlaceholderInsertion("{AliasRepName} ");
                              setIsDropDownOpen(!isDropDownOpen);
                            }}
                            disabled={
                              messages[currentIndex].message.length + 15 > 320
                            }
                          >
                            Alias/Rep Name
                          </button>
                          <button
                            onClick={() => {
                              handlePlaceholderInsertion("{No#Address} ");
                              setIsDropDownOpen(!isDropDownOpen);
                            }}
                            disabled={
                              messages[currentIndex].message.length + 12 > 320
                            }
                          >
                            No# Address
                          </button>
                          <button
                            onClick={() => {
                              handlePlaceholderInsertion("{CompanyName} ");
                              setIsDropDownOpen(!isDropDownOpen);
                            }}
                            disabled={
                              messages[currentIndex].message.length + 13 > 320
                            }
                          >
                            Company Name
                          </button>
                          <button
                            onClick={() => {
                              handlePlaceholderInsertion("{APN} ");
                              setIsDropDownOpen(!isDropDownOpen);
                            }}
                            disabled={
                              messages[currentIndex].message.length + 13 > 320
                            }
                          >
                            APN
                          </button>
                          <button
                            onClick={() => {
                              handlePlaceholderInsertion("{PROPERTYCOUNTY} ");
                              setIsDropDownOpen(!isDropDownOpen);
                            }}
                            disabled={
                              messages[currentIndex].message.length + 13 > 320
                            }
                          >
                            PROPERTY COUNTY
                          </button>
                          <button
                            onClick={() => {
                              setIsDropDownOpen(!isDropDownOpen);
                              handlePlaceholderInsertion("{ACREAGE} ");
                            }}
                            disabled={
                              messages[currentIndex].message.length + 13 > 320
                            }
                          >
                            ACREAGE
                          </button>
                        </div>
                      )}
                    </section>
                  </div>
                </div>
                <div className="buttons">
                  {/* {currentIndex !== 0 ? ( */}
                  <button
                    disabled={currentIndex !== 0 ? false : true}
                    className="back"
                    onClick={() => setCurrentIndex((p) => p - 1)}
                  >
                    <span className="text">Previous Message</span>
                  </button>
                  {/* ) : (
                    <span />
                  )} */}
                  <p className="info">
                    <span className="text">
                      Total Variations{" "}
                      {messages[currentIndex].variations.length}
                    </span>
                    <span className="icon">
                      <LightTooltip
                        placement="top"
                        arrow
                        title={
                          <>
                            <p>Total number of different messages variations</p>
                            <p>
                              that will be sent with the help of Text Spinners
                            </p>
                          </>
                        }
                      ></LightTooltip>
                    </span>
                  </p>
                  {currentIndex !== 4 ? (
                    <LightTooltip
                      placement="top"
                      arrow
                      title={
                        <>
                          <p>Minimum of 8 characters,</p>
                          <p>At least 2 Text Spinners</p>
                          <p>At least one merge field is required</p>
                        </>
                      }
                    >
                      <button
                        onClick={() => setCurrentIndex((p) => p + 1)}
                        className="next"
                        disabled={
                          !messages[currentIndex].message ||
                          messages[currentIndex].validations.find(
                            (validation) => !validation.isDone
                          ) ||
                          messages[currentIndex].errors[0]
                        }
                        style={{
                          border: "none",
                          paddingInline: "2rem",
                          background: "#3086EE",
                        }}
                      >
                        <span className="text">Next Message</span>
                      </button>
                    </LightTooltip>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div
                className="bottom"
                style={{ display: "flex", alignItems: "center" }}
              >
                <button
                  type="submit"
                  onClick={() =>
                    navigate(
                      isFollowUp
                        ? `/templates/follow-up-messages`
                        : `/templates/initial-templates`
                    )
                  }
                  className="cancelBtn"
                >
                  <span className="text">Cancel</span>
                </button>
                <button
                  type="submit"
                  disabled={messages.find((message) => !message.isDone)}
                  onClick={formik.handleSubmit}
                >
                  <span className="text">Save Template</span>
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="right">
          <div className="top">
            {messages.map((message, index) =>
              currentIndex === index ? (
                <div key={index} className="working">
                  {/* <div className="top">
                    <span className="text">
                      {index === 4 ? "Message 5" : `Message ${index + 1}`}
                    </span>
                  </div> */}

                  <div className="successHeaderInner">
                    <div className="top">
                      <span className="text">
                        {index === 4 ? "Message 5" : `Message ${index + 1}`}
                      </span>
                    </div>
                    <div className="bottom">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowingVariations(message.variations);
                        }}
                      >
                        Variations: {message.variations.length}
                      </button>
                    </div>
                  </div>

                  <div className="group">
                    {message.validations.map((validation, index) => (
                      <div
                        className={`item ${validation?.isDone ? "done" : ""}`}
                        key={index}
                      >
                        <span className="icon">
                          {validation?.isDone ? (
                            <FaCheckCircle />
                          ) : (
                            <BiCircle />
                          )}
                        </span>
                        <span className="text">{validation.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : message?.isDone ? (
                <div
                  key={index}
                  className="success"
                  onClick={() => setCurrentIndex(index)}
                >
                  <div className="successHeaderInner">
                    <div className="top">
                      <span className="icon">
                        <FaCheckCircle />
                      </span>
                      <span className="text">
                        {index === 4 ? "Message 5" : `Message ${index + 1}`}
                      </span>
                    </div>
                    <div className="bottom">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowingVariations(message.variations);
                        }}
                      >
                        Variations: {message.variations.length}
                      </button>
                    </div>
                  </div>
                  <p dangerouslySetInnerHTML={{ __html: message.html }}></p>
                </div>
              ) : message.message !== "" ? (
                <div
                  key={index}
                  className="error"
                  onClick={() => setCurrentIndex(index)}
                >
                  <div className="errorHeaderInner">
                    <div className="top">
                      <span className="icon">
                        <FaExclamationCircle />
                      </span>
                      <span className="text">
                        {index === 4 ? "Message 5" : `Message ${index + 1}`}
                      </span>
                    </div>
                    <div className="bottom">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowingVariations(message.variations);
                        }}
                      >
                        Variations: {message.variations.length}
                      </button>
                    </div>
                  </div>
                  <p dangerouslySetInnerHTML={{ __html: message.html }}></p>
                </div>
              ) : (
                <div
                  key={index}
                  className="empty"
                  onClick={() => setCurrentIndex(index)}
                >
                  <p>{index === 4 ? "Message 5" : `Message ${index + 1}`}</p>
                </div>
              )
            )}
          </div>
          <div className="bottom">
            <button onClick={() => setShowingVariations(allVariations)}>
              <span className="text">
                Total Variations: {allVariations.length}
              </span>
              <span className="icon">
                <LightTooltip
                  placement="left"
                  arrow
                  title={
                    <>
                      <p>Total number of message variations</p>
                      <p>for this message template</p>
                    </>
                  }
                >
                  <span className="info">
                    <FaInfoCircle />
                  </span>
                </LightTooltip>
              </span>
            </button>
          </div>
        </div>
      </div>

      <Components.Common.ModalTop
        onClose={() => {}}
        open={isAddTextSpinnerModalOpen}
      >
        <AddTextSpinnerModal
          onClose={(text) => {
            setIsAddTextSpinnerModalOpen(false);
            if (!text) return;
            handlePlaceholderInsertion(text + " ");
          }}
        />
      </Components.Common.ModalTop>
      <Components.Common.ModalTop
        open={showingVariations.length !== 0}
        onClose={() => {}}
      >
        <VariationsModal
          variations={showingVariations}
          onClose={() => setShowingVariations([])}
        />
      </Components.Common.ModalTop>
      <Components.Common.ModalTop
        open={isMessageSimilarityNoticeModal}
        onClose={() => {}}
      >
        <MessageSimilarityNoticeModal
          template={existTemplate}
          similarMessage={similarMessage}
          onClose={() => {
            setIsMessageSimilarityNoticeModal(false);
            setCurrentIndex(0);
          }}
        />
      </Components.Common.ModalTop>
    </CreateTemplateStyled>
  );
};

export default CreateTemplate;

const AddTextSpinnerModal = ({ onClose }) => {
  const formik = useFormik({
    initialValues: {
      word1: "",
      word2: "",
      word3: "",
      word4: "",
      word5: "",
    },
    validationSchema: textSpinnerSchema,
    onSubmit: ({ word1, word2, word3, word4, word5 }) => {
      onClose(
        `[${word1}/${word2}/${word3}${word4 ? `/${word4}` : ""}${
          word5 ? `/${word5}` : ""
        }]`
      );
    },
  });

  return (
    <AddTextSpinnerModalStyled>
      <div className="top">
        <h2>Add Text Spinner</h2>
        <button type="button" onClick={() => onClose(null)}>
          <FaTimes />
        </button>
      </div>
      <div className="middle">
        <div className="item">
          <div className="left">
            <span className="text">
              Alternative Word 1 <span>*</span>
            </span>
          </div>
          <div className="right">
            <input
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Alternative Word 1"
              name="word1"
            />
            {formik.errors.word1 && formik.touched.word1 && (
              <p>{formik.errors.word1}</p>
            )}
          </div>
        </div>
        <div className="item">
          <div className="left">
            <span className="text">
              Alternative Word 2 <span>*</span>
            </span>
          </div>
          <div className="right">
            <input
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Alternative Word 2"
              name="word2"
            />
            {formik.errors.word2 && formik.touched.word2 && (
              <p>{formik.errors.word2}</p>
            )}
          </div>
        </div>
        <div className="item">
          <div className="left">
            <span className="text">
              Alternative Word 3 <span>*</span>
            </span>
          </div>
          <div className="right">
            <input
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Alternative Word 3"
              name="word3"
            />
            {formik.errors.word3 && formik.touched.word3 && (
              <p>{formik.errors.word3}</p>
            )}
          </div>
        </div>
        <div className="item">
          <div className="left">
            <span className="text">Alternative Word 4</span>
          </div>
          <div className="right">
            <input
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Alternative Word 4"
              name="word4"
            />
            {formik.errors.word4 && formik.touched.word4 && (
              <p>{formik.errors.word4}</p>
            )}
          </div>
        </div>
        <div className="item">
          <div className="left">
            <span className="text">Alternative Word 5</span>
          </div>
          <div className="right">
            <input
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Alternative Word 5"
              name="word5"
            />
            {formik.errors.word5 && formik.touched.word5 && (
              <p>{formik.errors.word5}</p>
            )}
          </div>
        </div>
      </div>
      <div className="bottom">
        <button type="button" onClick={() => onClose(null)}>
          Cancel
        </button>
        <Components.Common.ButtonRightIcon
          text="Save"
          icon={<FaCheckCircle />}
          type="submit"
          onClick={formik.handleSubmit}
        />
      </div>
    </AddTextSpinnerModalStyled>
  );
};

const VariationsModal = ({ onClose, variations }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  console.log(Math.ceil(variations.length / 10));
  return (
    <VariationsModalStyled>
      <div
        className="top"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ lineHeight: "25px" }}>
          Variations of Message | {variations.length} messages
        </h2>
        <button type="button" onClick={onClose}>
          <LiaTimesSolid size={"2rem"} />
        </button>
      </div>
      <div className="middle">
        <div className="top">
          {variations
            .slice((currentPage - 1) * 10, currentPage * 10)
            .map((variation, index) => (
              <div className="item" key={index}>
                <span className="sr">{(currentPage - 1) * 10 + index + 1}</span>
                <p dangerouslySetInnerHTML={{ __html: variation }} />
              </div>
            ))}
        </div>
        {/*<div className="bottom">
           <Pagination
            currentPage={currentPage}
            onPageChange={(newPage) => setCurrentPage(newPage)}
            totalPages={Math.ceil(variations.length / 10)}
          />

        </div> */}
      </div>
      <div className="bottom">
        <div>
          <p
            style={{ color: "#777777", fontWeight: 600 }}
          >{`Page ${currentPage} of ${Math.ceil(variations.length / 10)}`}</p>
        </div>
        <PaginationComp
          totalPages={Math.ceil(variations.length / 10)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </VariationsModalStyled>
  );
};

const AddTextSpinner = ({ onSubmit, spinnerNumber }) => {
  const [numberOfInputs, setNumberOfInputs] = useState(
    spinnerNumber <= 2 ? 3 : 2
  );
  const { setFieldValue, setFieldTouched, ...formik } = useFormik({
    initialValues: {
      word1: "",
      word2: "",
      word3: "",
      word4: "",
      word5: "",
    },
    validationSchema:
      spinnerNumber <= 2 ? textSpinnerSchema : textSpinnerSchema2,
    onSubmit: (values) => {
      onSubmit(
        `[${values.word1}/${values.word2}${
          spinnerNumber <= 2
            ? `/${values.word3}`
            : values.word3
            ? `/${values.word3}`
            : ""
        }${values.word4 ? `/${values.word4}` : ""}${
          values.word5 ? `/${values.word5}` : ""
        }]`
      );
    },
  });

  const inputRef = useRef(null);

  const handleFieldDel = (e, index) => {
    e.stopPropagation();
    if (index === 4) {
      setNumberOfInputs(4);
      setFieldValue("word5", "");
      setFieldTouched("word5", false);
    } else if (index === 3) {
      if (numberOfInputs === 5) {
        setFieldValue("word4", formik.values.word5);
        setFieldValue("word5", "");
        setFieldTouched("word5", false);
        setNumberOfInputs(4);
      } else {
        setNumberOfInputs(3);
        setFieldValue("word4", "");
        setFieldTouched("word4", false);
      }
    } else if (index === 2) {
      if (numberOfInputs === 5) {
        setFieldValue("word3", formik.values.word4);
        setFieldValue("word4", formik.values.word5);
        setFieldValue("word5", "");
        setFieldTouched("word5", false);
        setNumberOfInputs(4);
      } else if (numberOfInputs === 4) {
        setFieldValue("word3", formik.values.word4);
        setFieldValue("word4", "");
        setFieldTouched("word4", false);
        setNumberOfInputs(3);
      } else {
        setNumberOfInputs(2);
        setFieldValue("word3", "");
        setFieldTouched("word3", false);
      }
    }
  };
  console.log("spinner compo lenght", spinnerNumber);
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  return (
    <AddTextSpinnerStyled numberOfInputs={numberOfInputs}>
      {Array(numberOfInputs)
        .fill(0)
        .map((_, i) => (
          <div className="item" key={i}>
            <input
              type="text"
              placeholder="word or phrase"
              name={`word${i + 1}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[`word${i + 1}`]}
              ref={i === 0 ? inputRef : undefined}
            />
            {i !== numberOfInputs - 1 && <span>/</span>}
            {i >= 2 && spinnerNumber > 2 && (
              <button
                onClick={(e) => handleFieldDel(e, i)}
                style={{ "--extra": numberOfInputs === 5 && i === 3 ? 0.9 : 0 }}
              >
                <FaTimes />
              </button>
            )}
            {i > 2 && spinnerNumber <= 2 && (
              <button
                onClick={(e) => handleFieldDel(e, i)}
                style={{ "--extra": numberOfInputs === 5 && i === 3 ? 0.9 : 0 }}
              >
                <FaTimes />
              </button>
            )}
          </div>
        ))}
      {numberOfInputs !== 5 && (
        <button
          className="add"
          onClick={() => setNumberOfInputs((p) => (p < 5 ? p + 1 : p))}
        >
          <FaPlus />
        </button>
      )}
      <LightTooltip
        arrow
        placement="top"
        title={
          <>
            <p>Complete fields to save</p>
          </>
        }
      >
        <button className="check" onClick={formik.handleSubmit}>
          <FaCheck />
        </button>
      </LightTooltip>
      <LightTooltip
        arrow
        placement="top"
        title={
          <>
            <p>Cancel</p>
          </>
        }
      >
        <button className="trash" onClick={() => onSubmit("")}>
          <FaTrash />
        </button>
      </LightTooltip>

      {formik.errors.word1 && formik.touched.word1 ? (
        <p>{formik.errors.word1}</p>
      ) : formik.errors.word2 && formik.touched.word2 ? (
        <p>{formik.errors.word2}</p>
      ) : formik.errors.word3 && formik.touched.word3 ? (
        <p>{formik.errors.word3}</p>
      ) : formik.errors.word4 && formik.touched.word4 ? (
        <p>{formik.errors.word4}</p>
      ) : formik.errors.word5 && formik.touched.word5 ? (
        <p>{formik.errors.word5}</p>
      ) : null}
    </AddTextSpinnerStyled>
  );
};
