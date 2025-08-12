import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AddTextSpinnerStyled,
  CreateDripAutomationsStyled,
  DayCountStyled,
  DripMessageArea,
  ErrorMessageStyled,
  ValidationStyled,
} from "./styles";
import {
  FaChevronDown,
  FaChevronUp,
  FaTrash,
  FaCheck,
  FaCheckCircle,
  FaCode,
  FaTimes,
  FaPlus,
  FaCircle,
  FaPlusCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useMessageTemplate } from "@/hooks";
import { BiCircle } from "react-icons/bi";
import { ConfirmModal as ConfirmModal2, LightTooltip } from "@/components/common";
import Components from "@/components";
import { useFormik } from "formik";
import { textSpinnerSchema, textSpinnerSchema2 } from "@/schema";
import MergeFieldDropDown from "./MergeFieldDropDown";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  createDrip,
  clearErrors,
  clearMessages,
  GetOneDripForInbox,
  updateDrip,
  UpdateOneDripForInbox,
} from "./../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { formatTemplateString } from "@/utils";
import { useDrag, useDrop } from "react-dnd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styles from './CreateDripAutomation.module.css';
import { FaChevronRight, FaMinus } from "react-icons/fa6";
import { GoInfo, GoPlus } from "react-icons/go";
import { LuCode2 } from "react-icons/lu";
import { IoAlertCircleOutline, IoCheckmarkSharp } from "react-icons/io5";
import { ConfirmModalStyled, MUIModalStyled } from "./styles";
import { AnimatePresence, motion } from "framer-motion";
import Assets from "@/assets";




const CreateDripAutomation = () => {
  const dispatch = useDispatch();
  const {
    loading,
    message,
    errors: error,
    singleDrip,
    singleMessage,
  } = useSelector((s) => s.dripAutomationReducer);

  const { dripId } = useParams();
  const naviagte = useNavigate();
  const [errors, setErrors] = useState([]);
  const [errorsNegative, setErrorsNegative] = useState([]);
  const [isPopUp, setIsPopUp] = useState(false);
  const [isPopUpDelete, setIsPopUpDelete] = useState(false);
  const [disableAll, setDisableAll] = useState(false);
  const [notMatchError, setNotMatchError] = useState([]);
  const [dripName, setDripName] = useState("");
  const [nameRequired, setNameRequired] = useState(false);
  const [html, setHtml] = useState("");
  const [dayCountError, setDayCountError] = useState({
    error: false,
    index: null,
  });
  const [isTextSpinnerShowing, setIsTextSpinnerShowing] = useState(false);
  const [currentDripIndex, setCurrentDripIndex] = useState(0);
  const [messageCount, setMessageCount] = useState([
    { day: 1, content: "", isDone: false },
  ]);
  const [isDragged, setIsDragged] = useState(false);
  const textArea = useRef(null);
  const handleDisableAll = (value, index) => {
    if (index) {
      const maxDay = messageCount.reduce((max, curr, i) => {
        if (i === index) {
          return max;
        }
        return curr.day > max ? curr.day : max;
      }, 0);
      const maxIndex = messageCount.reduce((maxIndex, obj, currentIndex) => {
        return obj.day > messageCount[maxIndex].day ? currentIndex : maxIndex;
      }, 0);

      if (messageCount[index].day <= maxDay && index > maxIndex) {
        toast.error(`day count should be greater than ${maxDay}`);
        setDayCountError({ error: true, index: index });
      } else {
        setDisableAll(value);
        setDayCountError({ error: false, index: null });
      }
    } else {
      setDisableAll(value);
    }
  };
  const handleDripMessageCount = () => {
    const newMassage = {
      day:
        messageCount?.length > 0
          ? messageCount.reduce(
            (max, curr) => (curr.day > max ? curr.day : max),
            0
          ) + 2
          : 1,
      content: "",
      isDone: false,
    };
    setMessageCount([...messageCount, newMassage]);
    setCurrentDripIndex(messageCount.length);
  };
  const spinnerRegex = /\[([^\]]+)?\]/g;
  const placeholderRegex = /\{([^}]+)?\}/g;
  const validPlaceholders = new Set([
    "FirstName",
    "LastName",
    "PropertyAddress",
    "PropertyCity",
    "MailingAddress",
    "AliasRepName",
    "No#Address",
    "CompanyName",
    "APN",
    "PROPERTYCOUNTY",
    "ACREAGE",
  ]);

  const negativeKeywords = [
    "random",
    "public",
    "blue",
    "out of the blue",
    "county",
    "properties",
    "purchasing",
    "selling",
    "buyer",
    "hoping",
    "right",
    "looking",
    "investment",
    // "consider",
    "considered",
    "person",
    "not sure",
    "interested",
    "story",
    "apologies",
    "apologize",
    "covid",
    "we buy house",
    "we buy houses",
     "sell house", "house to sell", "sell home", "home to sell", "your place", "your house", "bid", "coinbase",
  "bitcoin", "request to withdraw", "email change", "block the transaction", "withdraw funds", "coinbase",
  "affiliate", "affiliates", "referral", "referrals", "bonus", "commission", "commissions", "percent",
  "percentage", "gratuity", "dividend",  "%", "i came across", "i’ve come across", "came across",
  "i cam across", "i came acros", "i cam acros", "i’ve com acros", "cam across", "came acros", "come across",
  "came accrossed", "i come across", "i drove by", "drove by", "drivin by", "was driving by", "drove past",
  "drivin past", "was passin by", "just drove by", "i was drivin by", "passed by", "came by", "came thru",
  "was around the area", "are you the owner", "is this the owner", "this is {firstname}", "correct",
  "you’re the owner right", "am i speaking with the owner", "is this your property",
  "is this still yours", "are you still the homeowner", "are you the homeowner",
  "this your place", "this still your house",
  ];

  const [validations, setValidations] = useState([
    { name: "Minimum of 8 characters", isDone: false },
    { name: "At least 2 Text Spinners [0/2]", isDone: false },
    {
      name: "Each Text Spinner must have at least 3 elements",
      isDone: false,
    },
    { name: "Must have Merge Field", isDone: false },
    { name: "Must have no negative/restricted keywords", isDone: true },
    {
      name: "All Merge Fields and Text Spinners must be valid",
      isDone: true,
    },
  ]);

  const validateLength = () => {
    if (messageCount?.[currentDripIndex]?.content.length < 8) {
      setValidations((p) => {
        p[0].isDone = false;
        return p;
      });
    } else {
      setValidations((p) => {
        p[0].isDone = true;
        return p;
      });
    }
  };

  const validatePlaceholder = () => {
    const matches = Array.from(
      messageCount?.[currentDripIndex]?.content.matchAll(placeholderRegex)
    ).map((match) => match[1]);

    if (matches.length >= 1) {
      setValidations((p) => {
        p[3].isDone = true;
        return p;
      });
    } else {
      setValidations((p) => {
        p[3].isDone = false;
        return p;
      });
    }

    let error = [];
    const usedPlaceholder = new Set([]);
    if (matches.length === 0) {
      setNotMatchError([]);
    }
    for (const match of matches) {
      if (!validPlaceholders.has(match)) {
        error.push(
          `${match ? `'${match}'` : "Empty String"} isn't a valid merge field.`
        );
        setNotMatchError((p) => [
          ...p,
          `${match ? `'${match}'` : "Empty String"} isn't a valid merge field.`,
        ]);
      }
      {
        if (usedPlaceholder.has(match)) {
          error.push(`"${match}" is already used.`);
        } else {
          usedPlaceholder.add(match);
        }
      }
    }
    setNotMatchError([...error]);
    setErrors((p) => [...error]);
    return error;
  };

  const validateTextSpinner = () => {
    if (messageCount?.length > 0) {
      const matches = Array.from(
        messageCount[currentDripIndex].content.matchAll(spinnerRegex)
      ).map((match) => match[1]);
      let length = matches.length;

      if (length >= 2) {
        setValidations((p) => {
          p[1] = {
            name: "At least 2 Text Spinners [2/2]",
            isDone: true,
          };
          return p;
        });
      } else if (length === 1) {
        setValidations((p) => {
          p[1] = {
            name: "At least 2 Text Spinners [1/2]",
            isDone: false,
          };
          return p;
        });
      } else {
        setValidations((p) => {
          p[1] = {
            name: "At least 2 Text Spinners [0/2]",
            isDone: false,
          };
          return p;
        });
      }

      let errors = [];
      let threeElementSpinner = 0;
      for (const match of matches) {
        if (!match) {
          errors.push(`Empty Text Spinner isn't allowed!`);
          continue;
        }

        const arr = match.split("/");
        if (arr.length < 2) {
          errors.push(
            `Each Text Spinner must be contain more than or equal to 2 elements.`
          );
        }
        if (arr.length > 5) {
          errors.push(
            `Each Text Spinner must be contain less than or equal to 5 elements.`
          );
        }

        if (arr.length > 2) {
          threeElementSpinner = threeElementSpinner + 1;
        }
        for (const element of arr) {
          if (element.length < 2) {
            errors.push(`Each element must be contain at least 2 characters.`);
          }
        }
      }

      if (matches.length !== 0 && threeElementSpinner < 2) {
        errors.push(`Atleast two text spinners must contain 3 elements.`);
      }

      if (
        errors.length === 0 &&
        matches.length !== 0 &&
        threeElementSpinner >= 2
      ) {
        setValidations((p) => {
          p[2].isDone = true;
          return p;
        });
      } else {
        setValidations((p) => {
          p[2].isDone = false;
          return p;
        });
      }

      setErrors((p) => [...errors]);
      return errors;
    }
  };

  const validateBothPlaceholderAndTextSpinner = () => {
    const errors = [...validatePlaceholder(), ...validateTextSpinner()];

    if (errors.length === 0) {
      setValidations((p) => {
        p[5].isDone = true;
        return p;
      });
    } else {
      setValidations((p) => {
        p[5].isDone = false;
        return p;
      });
    }
  };

  const validateNegativeWords = () => {
    const err = [];
    const msg = messageCount?.[currentDripIndex]?.content
      .replace(/[().]/g, "") // Remove parentheses
      .replace(/\./g, "")    // Remove dots
      .toLowerCase();        // Convert the entire message to lowercase
  
    const negativeWords = [];
    for (const negativeKeyword of negativeKeywords) {
      const baseKeyword = negativeKeyword.toLowerCase(); // Convert keyword to lowercase
      const pluralPattern = new RegExp(`\\b(${baseKeyword}|${baseKeyword}s|${baseKeyword}es)\\b`, "gi"); // Match singular and plural forms
  
      // Find all matches in the message
      const matches = msg?.match(pluralPattern);
      if (matches && matches.length > 0) {
        negativeWords.push(...matches); // Add the exact matched words to negativeWords
      }
    }
    console.log("negativeWords",negativeWords);
    if (negativeWords.length > 0) {
      console.log("negativeWords",negativeWords);
      if (negativeWords.length === 1) {
        console.log("negativeWords",negativeWords);
        err.push(`"${negativeWords[0]}" is a negative word.`);
        console.log("err",err);
      } else {
        err.push(`"${negativeWords.join(", ")}" are negative words.`);
      }
    }
  
    if (err.length === 0) {
      setValidations((p) => {
        p[4].isDone = true;
        return p;
      });
    } else {
      setValidations((p) => {
        p[4].isDone = false;
        return p;
      });
    }
  
    setNotMatchError([...err]);
    setErrors([...err]);
    return err;
  };
  
  
  const formatTemplateString2 = () => {
    setHtml(
      messageCount?.[currentDripIndex]?.content
        .replace(placeholderRegex, '<span class="placeholder">{$1}</span>')
        .replace(spinnerRegex, '<span class="text-spinner">[$1]</span>')
        .replace(/ {2,}/g, (match) => "&nbsp;".repeat(match.length))
        .replace(/\n/g, "<br>")
    );
  };

  const handleRemoveMessageCount = (i) => {
    const newArray = messageCount.filter((item, index) => index !== i);
    setMessageCount(newArray);
    if (currentDripIndex !== 0) {
      setCurrentDripIndex(0);
    }
  };

  const handlePlaceholderInsertion = (textToInsert) => {
    const cursorPositions = cursorPosition();
    if (textArea.current) {
      const startPos = cursorPositions.start;
      const endPos = cursorPositions.end;
      setMessageCount((prevArray) => {
        return prevArray.map((item, i) =>
          i === currentDripIndex
            ? {
              ...item,
              content:
                item.content.substring(0, startPos) +
                textToInsert +
                item.content.substring(endPos),
              isDone: handleValidation(
                item.content.substring(0, startPos) +
                textToInsert +
                item.content.substring(endPos)
              ),
            }
            : item
        );
      });

      textArea.current.selectionStart = startPos + textToInsert.length;
      textArea.current.selectionEnd = startPos + textToInsert.length;
    } else {
      setMessageCount((prevArray) => {
        return prevArray.map((item, i) =>
          i === currentDripIndex
            ? { ...item, content: item.content + textToInsert }
            : item
        );
      });
    }
  };

  const cursorPosition = () => {
    // Get the current cursor position in the textarea
    const textarea = document.getElementById("myTextarea");
    const cursorPosition = textarea.selectionStart;

    if (cursorPosition === 0) {
      setNotMatchError([]);
    }
    // Focus the textarea to ensure the cursor is visible
    textarea.focus();
    return { start: textarea.selectionStart, end: textarea.selectionEnd };
  };

  const handlePaste = (e) => {
    e.preventDefault();
    setMessageCount((prevArray) => {
      return prevArray.map((item, i) =>
        i === currentDripIndex
          ? {
            ...item,
            content: item.content + e.clipboardData.getData("text"),
            isDone: handleValidation(e.clipboardData.getData("text")),
          }
          : item
      );
    });
  };

  const handleTextAreaChange = (e) => {
    e.preventDefault();
    setMessageCount((prevArray) => {
      return prevArray.map((item, i) =>
        i === currentDripIndex
          ? {
            ...item,
            content: e.target.value,
            isDone: handleValidation(e.target.value),
          }
          : item
      );
    });
  };

  const handleCountChange = (count) => {
    setMessageCount((prevArray) => {
      return prevArray.map((item, i) =>
        i === currentDripIndex ? { ...item, day: count } : item
      );
    });
  };

  const handleTextAreaInput = () => {
    if (textArea.current) {
      textArea.current.style.height = textArea.current.scrollHeight + "px";
    }
  };
  const handleValidation = (message) => {
    const error1 = [];
    const msg = message.replace(/[().]/g, "").replace(/\./g, "").toLowerCase();
  
    const negativeWords = [];
    for (const negativeKeyword of negativeKeywords) {
      const baseKeyword = negativeKeyword.toLowerCase(); // Convert keyword to lowercase
      const pluralPattern = new RegExp(`\\b(${baseKeyword}|${baseKeyword}s|${baseKeyword}es)\\b`, "i"); // Match singular and plural forms
  
      if (msg && pluralPattern.test(msg)) {
        negativeWords.push(negativeKeyword); // Push original keyword for error messages
      }
    }

    if (negativeWords.length > 0) {
      if (negativeWords.length === 1) {
        console.log("negativeWordsv",negativeWords)
        error1.push(`"${negativeWords[0]}" is a negative word.`);
        setErrorsNegative([...error1]);
        // return false
      } else {
        error1.push(`"${negativeWords.join(", ")}" are negative words.`);
        setErrorsNegative([...error1]);
        // return false
      }
    }

    setErrorsNegative(() => [...error1]);

    if (message.length < 8) {
      return false;
    }

    /////Spinner/////
    const matches = Array.from(message.matchAll(spinnerRegex)).map(
      (match) => match[1]
    );

    let threeElementSpinner = 0;
    for (const match of matches) {
      if (!match) {
        return false;
      }

      const arr = match.split("/");
      if (arr.length < 2) {
        return false;
      }
      if (arr.length > 5) {
        return false;
      }

      if (arr.length > 2) {
        threeElementSpinner = threeElementSpinner + 1;
      }
      for (const element of arr) {
        if (element.length < 2) {
          return false;
        }
      }
    }

    if (matches.length !== 0 && threeElementSpinner < 2) {
      return false;
    }

    if (
      error1.length === 0 &&
      matches.length !== 0 &&
      threeElementSpinner >= 2
    ) {
    } else {
      return false;
    }
    /////validate place holder
    const matches2 = Array.from(message.matchAll(placeholderRegex)).map(
      (match) => match[1]
    );

    if (matches.length < 1) {
      return false;
    }

    const usedPlaceholder = new Set([]);
    for (const match of matches2) {
      if (!validPlaceholders.has(match)) {
        return false;
      }
      {
        if (usedPlaceholder.has(match)) {
          return false;
        } else {
          usedPlaceholder.add(match);
        }
      }
    }
    return true;
  };
  useEffect(() => {
    if (dripId) {
      dispatch(GetOneDripForInbox(dripId));
    }
  }, [dripId]);

  useEffect(() => {
    if (singleDrip && dripId) {
      const messageNew = [];
      singleDrip?.messages?.map((message) => {
        messageNew.push({
          ...message,
          isDone: handleValidation(message.content),
        });
      });
      setMessageCount(messageNew);
      setDripName(singleDrip.name);
      setDisableAll(true);
    }
  }, [singleDrip]);
  useEffect(() => {
    if (messageCount?.length > 0) {
      // handleTextAreaInput();
      formatTemplateString2();
      validateNegativeWords();
      validateLength();
      validateTextSpinner();
      validateBothPlaceholderAndTextSpinner();
    }
  }, [
    messageCount,
    currentDripIndex,
    singleDrip,
    isTextSpinnerShowing,
    disableAll,
  ]);

  useEffect(() => {
    textArea?.current?.focus();
  }, [currentDripIndex]);

  const spinnerNumber1 = useMemo(() => {
    if (
      messageCount?.length > 0 &&
      currentDripIndex >= 0 &&
      messageCount[currentDripIndex]?.content
    ) {
      const matches = Array.from(
        messageCount[currentDripIndex]?.content.matchAll(spinnerRegex)
      )?.map((match) => match[1]);
      let length = matches.length;
      return length;
    }
  }, [messageCount, currentDripIndex]);

  const checkForDuplicateDayNumber = (messages) => {
    const seenDayNumbers = new Set();
    for (const message of messages) {
      if (seenDayNumbers.has(message.day)) {
        return true; // Found a duplicate
      }
      seenDayNumbers.add(message.day);
    }
    return false; // No duplicates found
  };

  const handleSaveMessage = (messageId) => {
    if (messageCount[currentDripIndex] && messageId) {
      // const body = {
      //   dripAutomationId: dripId,
      //   content: messageCount[currentDripIndex].content,
      //   day:messageCount[currentDripIndex].day
      // };
      // dispatch(UpdateOneDripForInbox(body, messageId));
      setDisableAll(true);
    }
  };

  const handleSaveDrip = (drag, data) => {
    const hasFalseIsDone = messageCount.some((item) => !item.isDone);
    if (hasFalseIsDone) {
      toast.error("Please complete all tasks before submitting.");
    } else {
      let messageCount1 = drag ? data : messageCount;
      let messages = [];
      messageCount1.map((message) => {
        messages.push({
          content: message.content,
          day: message.day,
          id: message._id,
        });
      });
      if (dripId) {
        const body = {
          name: dripName,
          messages: messages,
        };
        if (checkForDuplicateDayNumber(messages)) {
          toast.error(
            "Multiple messages for the same day in a drip are not allowed. Please choose a different day."
          );
          return;
        }
        dispatch(updateDrip(body, dripId, drag));
      } else {
        const body = {
          name: dripName,
          messages: messages,
        };
        if (checkForDuplicateDayNumber(messages)) {
          toast.error(
            "Multiple messages for the same day in a drip are not allowed. Please choose a different day."
          );
          return;
        }
        dispatch(createDrip(body));
      }
      // if (!drag) {
      //   naviagte(-1);
      // }
    }
  };

  useEffect(() => {
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message !== "") {
      toast.success(message);
      dispatch(clearMessages());
      naviagte(-1);
    }
  }, [error, message, singleMessage]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);

    let tempMessage = result[startIndex].content;
    result[startIndex].content = result[endIndex].content;
    result[endIndex].content = tempMessage;
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      messageCount,
      result.source.index,
      result.destination.index
    );
    setMessageCount(items);
    if (dripId) {
      handleSaveDrip(true, items);
    }
  };
  const navigate = useNavigate();

  const [deleteIndex, setDeleteIndex] = useState()

  return (
    <CreateDripAutomationsStyled>
      <ConfirmModal2
        content={{
          title: "Are you sure you want to leave?",
          message: " All unsaved changes will be lost",
        }}
        onClose={() => setIsPopUp(false)}
        onOkay={() => naviagte(-1)}
        open={isPopUp}
      />


      <ConfirmModal
        content={{
          title: "Are you sure you want to delete the message for this day?",
          message: 'This action will only remove the message for the selected day.'
        }}
        onClose={() => setIsPopUpDelete(false)}
        onOkay={() => {
          handleRemoveMessageCount(deleteIndex);
          setIsPopUpDelete(false);
        }}
        open={isPopUpDelete}
      />
      <div className={styles.container}>
        <div className={styles.breadcrumbsTop}>
          <div className={styles.innerBreadcrumbs}>
            <div>
              <h6 style={{ cursor: 'pointer' }} onClick={() => {
                navigate("/drip")
                window.location.reload();
              }} className={styles.parentBreadcrumb}>
                Drip Automation
              </h6>
            </div>
            <div style={{ marginInline: "5px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaChevronRight color='#012635' />
            </div>
            <div>
              <h6 className={styles.ChildBreadcrumb}>Add Drip Automation</h6>
            </div>
          </div>
        </div>
        <div style={{ flexGrow: 1 }}>
        </div>
      </div>






      <div className="bottom" >
        <div className="left">
          <h6>Add Drip Automation</h6>
          <p>Message count: {messageCount?.length} Message</p>
          <div className="InputWrapper" style={{ paddingTop: '3rem',position:'relative'}}>
            <div className="wrapper">
              <span className="text">Name Drip Automation</span>
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
                    <GoInfo style={{
                      color: "#012635",
                      fontSize: "1.8rem",
                    }} />
                  </span>
                </LightTooltip>
              </span>
            </div>
            <input
              value={dripName}
              placeholder="Enter Drip Automation"
              onChange={(e) => setDripName(e.target.value)}
            />
            {dripName?.length < 4 &&
              <span className="textRequired" >Name is required</span>
            }
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="vline"></div>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {messageCount?.length > 0 &&
                    messageCount.map((data, i) =>
                      currentDripIndex === i && !disableAll ? (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: 'center'
                          }}
                        >
                          <span className="vline2"></span>
                          <h3
                            style={{
                              display: "flex",
                              fontWeight: 500,
                              justifyContent: "center",
                              fontSize: "16px",
                              paddingInline: "4rem",
                              background: '#F0F0F0',
                              width: 'fit-content',
                              justifySelf: 'center',
                              borderRadius: "0.6rem"
                            }}
                          >
                            Message {i + 1}
                          </h3>
                          <span
                            className="vline2"
                            style={{
                              display: "flex",
                              width: "0.1rem",
                              height: "2rem",
                              backgroundColor: "gray",
                              alignSelf: "center",
                            }}
                          ></span>

                          <DripMessageArea
                            isTextSpinnerShowing={isTextSpinnerShowing}
                          >
                            <div style={{ width: '100%', borderBottom: '1px solid #d8d8d8' }}>
                              <DayCount
                                removeMessageCount={handleRemoveMessageCount}
                                index={i}
                                handleCountChange={handleCountChange}
                                data={data}
                                handleDisableAll={handleDisableAll}
                                handleSaveMessage={handleSaveMessage}
                              />
                            </div>
                            <div className="bottom">
                              <div className="top">
                                <div className="message">
                                  <textarea
                                    placeholder="Write Message"
                                    maxLength={320}
                                    onChange={handleTextAreaChange}
                                    value={
                                      messageCount[currentDripIndex].content
                                    }
                                    ref={textArea}
                                    id="myTextarea"
                                    onKeyUp={(e) => cursorPosition()}
                                    onMouseUp={(e) => cursorPosition()}
                                    onInput={handleTextAreaInput}
                                  ></textarea>
                                  <div className="container">
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html: html,
                                      }}
                                    ></p>
                                    {isTextSpinnerShowing && (
                                      <AddTextSpinner
                                        onSubmit={(val) => {
                                          handlePlaceholderInsertion(
                                            val + " "
                                          );
                                          setIsTextSpinnerShowing(false);
                                        }}
                                        spinnerNumber={spinnerNumber1 + 1}
                                      />
                                    )}
                                  </div>
                                  <p
                                    className="error"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        notMatchError.length > 0
                                          ? notMatchError[0]
                                          : errors.length > 0
                                            ? errors[0]
                                            : errorsNegative[0],
                                    }}
                                  ></p>
                                </div>
                                <div className="shortcuts">
                                  <div className="bottom">
                                    <Components.Common.EmojiPicker
                                      onClick={(emoji) =>
                                        handlePlaceholderInsertion(emoji)
                                      }
                                    />
                                    <LightTooltip
                                      placement="top"
                                      arrow
                                      title={
                                        <>
                                          <p>
                                            Maximize your message delivery by
                                          </p>
                                          <p>
                                            spinning synonym words or phrases.
                                          </p>
                                        </>
                                      }
                                    >
                                      <button
                                        onClick={() => {
                                          setIsTextSpinnerShowing(true);
                                        }}
                                      >
                                        <span className="icon">
                                          <LuCode2 />
                                        </span>
                                        <span className="text">
                                          Add Text Spinner
                                        </span>
                                      </button>
                                    </LightTooltip>


                                    <section>
                                      <MergeFieldDropDown handlePlaceholderInsertion={handlePlaceholderInsertion} />
                                    </section>
                                  </div>

                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                    <LightTooltip arrow placement="top" title="Delete">
                                      <div onClick={() => {
                                        setIsPopUpDelete(true)
                                        setDeleteIndex(i)
                                      }} style={{ cursor: "pointer", background: '#FFEEEE', width: '60px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                        <FaTrash
                                          className="icon2"
                                          size={18}
                                          color="#FF5D3E"
                                        />
                                      </div>
                                    </LightTooltip>

                                    <LightTooltip arrow placement="top" title="Save">
                                      <div onClick={() => {
                                        if (messageCount <= 0) {
                                          toast.error(
                                            "Number of days for a message must be atleast one day."
                                          );
                                        } else {
                                          handleDisableAll(true, i);
                                        }
                                      }} style={{ cursor: "pointer", marginLeft: "1.2rem", background: '#C2FFEC', width: '60px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                        <IoCheckmarkSharp
                                          className="icon2"
                                          size={22}
                                          color="#00BD82"

                                        />
                                      </div>
                                    </LightTooltip>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </DripMessageArea>
                        </div>
                      ) : (
                        <>
                          <span className="vline2"></span>
                          <DraggableItem
                            data={data}
                            index={i}
                            messageCount={messageCount}
                            setCurrentDripIndex={setCurrentDripIndex}
                            setDisableAll={setDisableAll}
                            key={i}
                          />
                          <span className="vline2"></span>
                        </>
                      )
                    )}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="vline"></div>
          </div>
          <div
            className="addButton"
            
            onClick={() => {
              handleDripMessageCount();
              handleDisableAll(false);
            }}
          >
            <GoPlus size={22} />
            <p style={{ marginLeft: 5,cursor:'pointer'}}>Add message {messageCount?.length + 1}</p>
          </div>
          <div style={{ display: "flex", position: "relative" }}>
            <div className="vline2"></div>
          
          </div>
          <div className="saveButtonWrap">
            <div></div>
            <div className="saveButton-container">
              <button
                className="saveButton"
                disabled={
                  messageCount?.some((item) => !item.isDone) || !dripName
                }
                onClick={() => handleSaveDrip()}
              >
                <span className="text">Save Drip Automation</span>
              </button>
            </div>

            <div></div>
          </div>
        </div>
        <div className="right">
          {/* {messageCount?.length > 0 && !disableAll && ( */}
          <ValidationStyled>
            <div key={1} className="working">
              <p>Messages</p>
              <div className="group">
                {validations.map((val, i) => (
                  <div
                    className={`item ${val.isDone ? "done" : ""}`}
                    key={i}
                  >
                    <span className="icon">
                      {val.isDone ? <FaCheckCircle /> : <BiCircle />}
                    </span>
                    <span className="text">{val.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </ValidationStyled>
          {/* )} */}
        </div>
      </div>
    </CreateDripAutomationsStyled>
  );
};

export default CreateDripAutomation;

const DayCount = ({
  removeMessageCount,
  index,
  handleCountChange,
  data,
  handleDisableAll,
  handleSaveMessage,
}) => {
  const [count, setCount] = useState(parseInt(data.day));
  const handleChange = (e) => {
    if (e.target.value <= 999) {
      setCount(parseInt(e.target.value || 0));
    }
  };
  useEffect(() => {
    handleCountChange(count);
  }, [count]);

  return (
    <DayCountStyled>
      <div>
        <div className="issue-of-space">
          <p className="MainHeading">Send on Day</p>
          <div onClick={() =>
            setCount((prev) => {
              if (prev - 1 !== 0 && prev !== 0 && prev - 1 <= 999) {
                return prev - 1;
              } else {
                return prev;
              }
            })
          } className="increase">
            <FaMinus className="icon" />
          </div>
          <input value={count} onChange={handleChange} />
          <div onClick={() =>
            setCount((prev) => {
              if (prev + 1 <= 999) {
                return prev + 1;
              } else {
                return prev;
              }
            })
          } className="decrease">
            <FaPlus className="icon" />

          </div>

          <p>After prospect has been added to the Drip Automation</p>
        </div>

      </div>
    </DayCountStyled>
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
        `[${values.word1}/${values.word2}${spinnerNumber <= 2
          ? `/${values.word3}`
          : values.word3
            ? `/${values.word3}`
            : ""
        }${values.word4 ? `/${values.word4}` : ""}${values.word5 ? `/${values.word5}` : ""
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
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const [isPopUp, setIsPopUp] = useState(false);
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
const DraggableItem = ({
  data,
  messageCount,
  index,
  setCurrentDripIndex,
  setDisableAll,
}) => {
  useEffect(() => { }, [messageCount]);

  const getItemStyle = (isDragging, draggableStyle) => ({
    ...draggableStyle,
  });
  return (
    <Draggable key={data.day} draggableId={data.day.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          {/* <span className="vline2"></span> */}
          <ErrorMessageStyled
            onClick={() => {
              setCurrentDripIndex(index);
              setDisableAll(false);
            }}
            isDone={messageCount[index].isDone}
            key={index}
          >
            <div>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: "space-between",
                width: "100%",
                padding: "1rem",
                borderBottom: '1px solid #E0E0E0'
              }}>
                <span style={{
                  color: messageCount[index].isDone ? "#012635" : "#EA3815",
                  opacity: 1,
                  fontWeight: 600,
                  fontSize: "1.7rem",
                }}>Message {index + 1}</span>
                <span style={{
                  background: "#F0F0F0",
                  borderRadius: "1rem",
                  color: '#012635',
                  fontWeight: 500,
                  paddingBlock: "10px",
                  paddingInline: "20px"
                }}>Day {data.day}</span>
              </div>
              {!messageCount[index].isDone && (
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    flexDirection: "row",
                    alignItems: "center",
                    fontWeight: 500,
                    color: '#EA3815',
                  }}
                >
                  <IoAlertCircleOutline size={22} color="#EA3815" /> Message Not Completed
                </div>
              )}
              {messageCount[index].isDone && (
                <div>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: formatTemplateString(data.content),
                    }}
                  />
                </div>
              )}

            </div>
          </ErrorMessageStyled>
        </div>
      )}
    </Draggable>
  );
};



const MotionedConfirmModalStyled = motion(ConfirmModalStyled);

const ConfirmModal = ({ open, onClose, onOkay, content }) => {
  const [isModalShow, setIsModalShow] = useState(false);

  useEffect(() => {
    if (open) {
      setIsModalShow(true);
    } else {
      const timeout = setTimeout(() => {
        setIsModalShow(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  return (
    isModalShow && (
      <MUIModalStyled open={isModalShow}>
        <AnimatePresence>
          {open && (
            <MotionedConfirmModalStyled>
              <motion.div
                className="overlay"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    ease: "linear",
                    duration: 0.3,
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    ease: "linear",
                    duration: 0.3,
                  },
                }}
                onClick={onClose}
              />
              <motion.div
                className="box"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  transition: {
                    ease: "linear",
                    duration: 0.3,
                  },
                }}
                exit={{
                  scale: 0,
                  opacity: 0,
                  transition: {
                    ease: "linear",
                    duration: 0.3,
                  },
                }}
              >
                <div>
                  <div className="top">
                    <span className="icon">
                      <Assets.Icons.WarningIcon />
                    </span>
                  </div>
                  <div className="bottom">
                    <h2 className="top">{content?.title || "Are you sure?"}</h2>
                    <div className="bottom">
                      <p>
                        {content?.message || "You want to confirm this operation?"}
                      </p>

                    </div>
                  </div>
                </div>
                <div className="group">
                  <button onClick={onOkay}>
                    Discard
                  </button>
                  <button onClick={onClose}>
                    Cancel
                  </button>
                </div>
              </motion.div>

            </MotionedConfirmModalStyled>
          )}
        </AnimatePresence>
      </MUIModalStyled>
    )
  );
};
