import {
  FaCheckCircle,
  FaChevronDown,
  FaPlus,
  FaRocket,
  FaTimes,
} from "react-icons/fa";
import {
  CreateNewCategoryModalStyled,
  CreateRepliesStyled,
  ValidationStyled,
} from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import Components from "@/components";
import Assets from "@/assets";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useStateWithCallback from "@/hooks/useStateWithCallback";
import { useFormik } from "formik";
import { replyTemplateCategorySchema, replyTemplateSchema } from "@/schema";
import { toast } from "react-hot-toast";
import {
  createReplyTemplate,
  createReplyTemplateCategory,
  getAllReplyTemplateCategories,
  getSingleReplyTemplate,
  updateReplyTemplate,
} from "@/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useGlobalContext } from "@/hooks";
import { BiCircle } from "react-icons/bi";
import negativeKeywords from "@/utils/templateNegativeWords";
import { LightTooltip } from "@/components/common";
import { AnimatePresence, motion } from "framer-motion";
import { GoChevronDown } from "react-icons/go";
import Select, { components } from 'react-select';
import { FaSort } from "react-icons/fa6";



const CreateReplies = () => {
  const navigate = useNavigate();
  const textArea = useRef(null);
  const [negativeError, setNegativeError] = useState([]);
  const [isNegativeWordsShowing, setIsNegativeWordsShowing] = useState(false);
  const [message, setMessage] = useStateWithCallback("");
  const [isCreateNewCategoryModalOpen, setIsCreateNewCategoryModalOpen] =
    useState(false);
  const { templateId } = useParams();
  const dispatch = useDispatch();
  const { setIsLoaderShowing } = useGlobalContext();
  const { loading, replyTemplateCategories, singleTemplate, templatesData } =
    useSelector((s) => s.templateReducer);
  const placeholderRegex = /\{([^}]+)?\}/g;
  const validPlaceholders = new Set([
    "FirstName",
    "LastName",
    "PropertyAddress",
    "PropertyCity",
    "CompanyName",
    "AliasRepName",
    "MailingCity",
    "MailingState",
    "Phone1",
    "Phone2",
    "PropertyState",
    "PropertyZip",
    "MailingZip",
    "APN",
    "PROPERTYCOUNTY",
    "ACREAGE",
  ]);

  const [validations, setValidations] = useState([
    { name: "Minimum of 8 characters", isDone: false },
    { name: "Must have no negative/restricted keywords", isDone: false },
    {
      name: "All Merge Fields must be valid",
      isDone: true,
    },
  ]);
  const validateLength = () => {
    if (message.length < 8) {
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

  const validateNegativeWords = () => {
    const errors = [];
    const msg = message.replace(/[().]/g, "").replace(/\./g, "").toLowerCase();

    const negativeWords = [];
    for (const negativeKeyword of negativeKeywords) {
      const pattern = new RegExp(`\\b${negativeKeyword}\\b`, "i");
      if (
        Array.from(msg.matchAll(negativeKeyword)).length > 0 &&
        pattern.test(msg)
      ) {
        negativeWords.push(negativeKeyword);
      }
    }

    if (negativeWords.length > 0) {
      if (negativeWords.length === 1) {
        errors.push(`"${negativeWords[0]}" is a negative word.`);
      } else {
        errors.push(`"${negativeWords.join(", ")}" are negative words.`);
      }
    }
    setNegativeError(errors);
    if (errors.length === 0) {
      setValidations((p) => {
        p[1].isDone = true;
        return p;
      });
    } else {
      setValidations((p) => {
        p[1].isDone = false;
        return p;
      });
    }
    return errors;
  };
  const validateMergeFields = () => {
    const matches = Array.from(message.matchAll(placeholderRegex)).map(
      (match) => match[1]
    );
    let inValid = false;
    for (const match of matches) {
      if (!validPlaceholders.has(match)) {
        inValid = true;
      }
    }
    if (inValid) {
      setValidations((p) => {
        p[2].isDone = false;
        return p;
      });
    } else {
      setValidations((p) => {
        p[2].isDone = true;
        return p;
      });
    }
  };

  useEffect(() => {
    validateLength();
    validateNegativeWords();
    validateMergeFields();
  }, [message]);

  
  const { setFieldValue, ...formik } = useFormik({
    initialValues: {
      title: "",
      category: "",
      message: "",
    },
    validationSchema: replyTemplateSchema,
    onSubmit: (values) => {
      const body = {
        category: values.category,
        title: values.title,
        reply: values.message,
      };
      const existTemplate = templatesData?.results?.find((t) => {
        if (
          t?.category?._id == body.category &&
          t.title === body.title &&
          t.reply === body.reply
        ) {
          return true;
        }
        return false;
      });
      if (templateId) {
        dispatch(
          updateReplyTemplate({ body, _id: templateId }, () => {
            toast.success("Successfully updated!");
            navigate("/templates/quick-replies");
          })
        );
      } else {
        if (existTemplate) {
          toast.error("Duplicate Quick Reply");
        } else {
          dispatch(
            createReplyTemplate({ body }, () => {
              toast.success("Successfully created");
              navigate("/templates/quick-replies");
            })
          );
        }
      }
    },
  });

  const handleInsertion = (textToInsert) => {
    if (textArea.current) {
      const startPos = textArea.current.selectionStart;
      const endPos = textArea.current.selectionEnd;

      // Update the textarea with the new text
      setMessage(
        (text) => {
          const newText =
            text.substring(0, startPos) + textToInsert + text.substring(endPos);

          if (newText.length > 320) {
            toast.error(
              "Please make sure you message is less than or equal to 320 characters."
            );
            return newText.substring(0, 320);
          } else {
            return newText;
          }
        },
        () => {
          textArea.current.focus();
          textArea.current.setSelectionRange(
            startPos + textToInsert.length,
            startPos + textToInsert.length
          );
        }
      );
    } else {
      setMessage((prevText) => prevText + textToInsert);
    }
  };

  useEffect(() => {
    setFieldValue("message", message);
  }, [setFieldValue, message]);

  useLayoutEffect(() => {
    dispatch(
      getAllReplyTemplateCategories(null, () => {
        if (!templateId) return;
        dispatch(
          getSingleReplyTemplate({ _id: templateId }, null, () => {
            toast.error("Template not found!");
            navigate(`/templates/quick-replies`);
          })
        );
      })
    );
  }, [dispatch, navigate, templateId]);

  const validatePlaceholder = () => {
    const matches = Array.from(message.matchAll(placeholderRegex)).map(
      (match) => match[1]
    );

    let errors = [];
    const usedPlaceholder = new Set([]);
    for (const match of matches) {
      if (!validPlaceholders.has(match)) {
        errors.push(
          `${match ? `'${match}'` : "Empty String"} isn't a valid merge field.`
        );
      } else {
        if (usedPlaceholder.has(match)) {
          errors.push(`"${match}" is already used.`);
        } else {
          usedPlaceholder.add(match);
        }
      }
    }

    return errors;
  };
  useLayoutEffect(() => {
    setIsLoaderShowing(loading);
  }, [setIsLoaderShowing, loading]);

  useLayoutEffect(() => {
    if (!templateId) return;
    setFieldValue("title", singleTemplate?.title ?? "");
    setFieldValue("category", singleTemplate?.category?._id ?? "");
    setMessage(singleTemplate?.reply ?? "");
  }, [setFieldValue, setMessage, singleTemplate, templateId]);

  console.log(singleTemplate?.category?._id)
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <FaSort style={{ color: '#777777', paddingRight: 'rem' }} />
      </components.DropdownIndicator>
    );
  };

  const Templateoptions =
    replyTemplateCategories.length > 0 &&
    replyTemplateCategories?.map((data) => ({
      value: data?._id,
      label: data?.name,
    }))
    ;

  return (
    <CreateRepliesStyled ChevronDown={Assets.Images.SortDefault}>
      <div className="wrapper">
        <div className="bottom" style={{ background: "transparent", paddingInline: 0, border: "none" }}>
          <div className="top">
            <div className="top">
              <div className="top">
                <h2> {templateId ? "Edit " : "Create"}{" "} Quick Reply</h2>
                <div className="right">
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
                    >
                      <span className="icon">
                        <GoChevronDown size={'2rem'} color="#012635" />
                      </span>
                      <span className="text">Negative Keywords</span>
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
          </div>
        </div>
        <div className="bottom">
          <form onSubmit={formik.handleSubmit} className="bottom">
            <div className="top">
              <label className="item">
                <div className="left">
                  <span className="text">Category</span>
                </div>
                <div className="right select">
                  <div className="top">
                    {/* <Select
                      components={{
                        DropdownIndicator,
                        IndicatorSeparator: () => null,
                      }}
                      onChange={(e) => setFieldValue("category", e.value)}
                      options={Templateoptions}
                      className="react-select-container"
                      classNamePrefix="react-select"
                      placeholder={singleTemplate?.category?.name}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                          ...theme.colors,
                          primary25: '#F7F8FC',
                          primary: '#00BD82',
                        },
                      })}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          width: "100%",
                          height: '4rem',
                        }),
                      }}
                      IndicatorsContainer={false}
                    /> */}
                    <Select
                      components={{
                        DropdownIndicator,
                        IndicatorSeparator: () => null,
                      }}
                      onChange={(e) => setFieldValue("category", e?.value ?? "")}
                      options={
                        Templateoptions?.length > 0
                          ? Templateoptions
                          : [{ value: "", label: "No categories available", isDisabled: true }]
                      }
                      className="react-select-container"
                      classNamePrefix="react-select"
                      placeholder={
                        replyTemplateCategories?.length > 0
                          ? singleTemplate?.category?.name ?? "Select a category"
                          : "No categories available"
                      }
                      isDisabled={replyTemplateCategories?.length === 0}
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
                        control: (baseStyles) => ({
                          ...baseStyles,
                          width: "100%",
                          height: "4rem",
                        }),
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setIsCreateNewCategoryModalOpen(true)}
                    >
                      <span className="text">Create New Category</span>
                    </button>
                  </div>
                  <div className="bottom">
                    {formik.touched.category && formik.errors.category && (
                      <p>{formik.errors.category}</p>
                    )}
                  </div>
                </div>
              </label>
              <label className="item">
                <div className="left">
                  <span className="text">Title</span>
                </div>
                <div className="right input">
                  <div className="top">
                    <input
                      type="text"
                      placeholder="Write Your Title"
                      name="title"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.title}
                    />
                  </div>
                  <div className="bottom">
                    {formik.touched.title && formik.errors.title && (
                      <p>{formik.errors.title}</p>
                    )}
                  </div>
                </div>
              </label>
              <label className="item">
                <div className="left">
                  <span className="text">Reply</span>
                </div>
                <div className="right textarea">
                  <div className="top">
                    <textarea
                      placeholder="Write Your Replay"
                      maxLength={320}
                      onChange={(e) => setMessage(e.target.value)}
                      onBlur={formik.handleBlur}
                      name="message"
                      value={message}
                      ref={textArea}
                    />
                    <span className="info">{message.length} / 320</span>
                    <p
                      className="error"
                      dangerouslySetInnerHTML={{
                        __html:
                          validatePlaceholder(message)?.[0] ||
                          negativeError?.[0],
                      }}
                    ></p>
                  </div>
                </div>
              </label>
            </div>
          </form>
        </div>
        <div className="iconsFilter">
          <div className="bottom">
            {formik.touched.message && formik.errors.message && (
              <p>{formik.errors.message}</p>
            )}
            <div className="buttons">
              <Components.Common.EmojiPicker
                onClick={handleInsertion}
                disabled={message.length > 320 - 6}
              />
              <button
                disabled={message.length > 320 - 11}
                type="button"
                onClick={() => handleInsertion(`{FirstName} `)}
              >
                First Name
              </button>
              <button
                disabled={message.length > 320 - 10}
                type="button"
                onClick={() => handleInsertion(`{LastName} `)}
              >
                Last Name
              </button>
              <button
                disabled={message.length > 320 - 8}
                type="button"
                onClick={() => handleInsertion(`{Phone1} `)}
              >
                Phone 1
              </button>
              <button
                disabled={message.length > 320 - 8}
                type="button"
                onClick={() => handleInsertion(`{Phone2} `)}
              >
                Phone 2
              </button>
              <button
                disabled={message.length > 320 - 17}
                type="button"
                onClick={() => handleInsertion(`{PropertyAddress} `)}
              >
                Property Address
              </button>
              <button
                disabled={message.length > 320 - 14}
                type="button"
                onClick={() => handleInsertion(`{PropertyCity} `)}
              >
                Property City
              </button>
              <button
                disabled={message.length > 320 - 15}
                type="button"
                onClick={() => handleInsertion(`{PropertyState} `)}
              >
                Property State
              </button>
              <button
                disabled={message.length > 320 - 13}
                type="button"
                onClick={() => handleInsertion(`{PropertyZip} `)}
              >
                Property Zip
              </button>
              <button
                disabled={message.length > 320 - 14}
                type="button"
                onClick={() => handleInsertion(`{AliasRepName} `)}
              >
                Alias/Rep Name
              </button>
              <button
                disabled={message.length > 320 - 13}
                type="button"
                onClick={() => handleInsertion(`{CompanyName} `)}
              >
                Company Name
              </button>
              <button
                disabled={message.length > 320 - 13}
                type="button"
                onClick={() => handleInsertion(`{MailingCity} `)}
              >
                Mailing City
              </button>
              <button
                disabled={message.length > 320 - 14}
                type="button"
                onClick={() => handleInsertion(`{MailingState} `)}
              >
                Mailing State
              </button>
              <button
                disabled={message.length > 320 - 12}
                type="button"
                onClick={() => handleInsertion(`{MailingZip} `)}
              >
                Mailing Zip
              </button>
              <button
                disabled={message.length > 320 - 12}
                type="button"
                onClick={() => handleInsertion(`{APN} `)}
              >
                APN
              </button>
              <button
                disabled={message.length > 320 - 12}
                type="button"
                onClick={() => handleInsertion(`{PROPERTYCOUNTY} `)}
              >
                PROPERTY COUNTY
              </button>
              <button
                disabled={message.length > 320 - 12}
                type="button"
                onClick={() => handleInsertion(`{ACREAGE} `)}
              >
                ACREAGE
              </button>
            </div>
          </div>
        </div>
        <div className="bottomComplete" style={{ display: 'flex', alignItems: 'center' }}>
          <button
            type="submit"
            onClick={() => navigate(`/templates/quick-replies`)}
            className="cancelBtn"
          >
            <span className="text">Cancel</span>
          </button>
          <button
            type="submit"
            onClick={formik.handleSubmit}
            disabled={
              !formik.dirty ||
              !formik.isValid ||
              validatePlaceholder(message)?.length > 0 ||
              validations.find((val) => val.isDone === false)
            }
          >
            <span className="text">Save Quick Replay </span>
          </button>
        </div>
      </div>


      <ValidationStyled>
        <div className="working">
          <div className="group">
            {validations.map((val, index) => (
              <div className={`item ${val.isDone ? "done" : ""}`} key={index}>
                <span className="icon">
                  {val.isDone ? <FaCheckCircle /> : <BiCircle />}
                </span>
                <span className="text">{val.name}</span>
              </div>
            ))}
          </div>
        </div>
      </ValidationStyled>


      <Components.Common.ModalTop
        open={isCreateNewCategoryModalOpen}
        onClose={() => { }}
      >
        <CreateNewCategoryModal
          onClose={() => {
            setIsCreateNewCategoryModalOpen(false);
          }}
          setFieldValue={setFieldValue}
        />
      </Components.Common.ModalTop>
    </CreateRepliesStyled>
  );
};

export default CreateReplies;

const CreateNewCategoryModal = ({ onClose, setFieldValue }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: replyTemplateCategorySchema,
    onSubmit: (values) => {
      const body = {
        name: values.name,
      };
      dispatch(
        createReplyTemplateCategory({ body }, (data) => {
          toast.success("Category created successfully!");
          // New category object
          const newCategory = {
            _id: data?._id,
            name: values.name,
          };

          // Set the form field value to the newly created category
          // setFieldValue("category", newCategory._id);
          onClose();
        })
      );
    },
  });
  return (
    <CreateNewCategoryModalStyled onSubmit={formik.handleSubmit}>
      <div className="top">
        <h2>Add Category</h2>
        <button type="button" onClick={() => onClose(null)}>
          <FaTimes />
        </button>
      </div>
      <div className="middle">
        <p>Category</p>
        <div className="item">
          <input
            type="text"
            placeholder="Enter Category"
            value={formik.values.name}
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <p>{formik.errors.name}</p>
          )}
        </div>
      </div>
      <div className="bottom">
        <button className="button" type="button" onClick={() => onClose(null)}>
          Cancel
        </button>
        {/* <Components.Common.ButtonRightIcon
          disabled={!formik.isValid || !formik.dirty}
          text={"Save"}
          type="submit"
        /> */}

        <button type="submit" disabled={!formik.isValid || !formik.dirty} className="buttonSave">
          Save
        </button>
      </div>
    </CreateNewCategoryModalStyled>
  );
};
