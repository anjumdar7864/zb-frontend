import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
// import { InitialTemplateStyled, TableRowStyled } from "./styles";
import {
  FaChevronDown,
  FaEdit,
  FaEllipsisV,
  FaInfoCircle,
  FaListAlt,
  FaPlus,
  FaReply,
  FaSearch,
  FaSync,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { MdMessage } from "react-icons/md";

// New
import { LightTooltip, SortIcon } from "@/components/common";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Components from "@/components";
import { useEffectWithDependency, useGlobalContext } from "@/hooks";
import {
  formatDateToShort,
  formatTemplateString,
  remToPixels,
  formatDate,
} from "@/utils";
import { FiSearch } from "react-icons/fi";
import DropDownFilter from "@/components/common/DropDownFilter/DropDownFilter";

import Assets from "@/assets";
import {
  deleteTemplate,
  getAllTemplates,
  getAllTemplatesWithoutLoader,
  getTemplateCounts,
} from "@/store/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  TransferModelStyle,
  InitialTemplateStyled,
  PasswordModelStyle,
  Button,
  StyledInputWrapper,
  TemplateTop,
  TableRowStyled,
} from "./styles";
import PaginationComp from "../Pagination/Pagination";
import PaginationDropDown from "../Pagination/PaginationDropDown";
import Select, { components } from "react-select";
import { FaSort } from "react-icons/fa6";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { GoChevronDown } from "react-icons/go";
import { toast } from "react-hot-toast";

const disableFeatures = () => {
  // Disable Right-Click
  const disableRightClick = (e) => {
    e.preventDefault();
    //toast.error("Right-click is disabled.");
  };

  // Disable Text Selection and Copy
  const disableCopy = (e) => {
    e.preventDefault();
    //toast.error("Copying content is disabled.");
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

const InitialTemplate = () => {
  const { windowWidth, setIsLoaderShowing } = useGlobalContext();
  const [selectedDeleteId, setSelectedDeleteId] = useState("");
  const [numberOfRowsShowing, setNumberOfRowsShowing] = useState(25);
  const [templateType, setTemplateType] = useState("all");
  // const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();
  const { loading, countData, templatesData } = useSelector(
    (s) => s.templateReducer
  );
  const [sortingInfo, setSortingInfo] = useState({
    direction: 0,
    sortedBy: "",
  });
  const [limit, setLimit] = useState(50);
  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );
  console.log("template data ", templatesData);

  const [searchText, setSearchText] = useState("");
  useEffectWithDependency(() => {
    dispatch(
      getAllTemplatesWithoutLoader({ ...queryParams, search: searchText })
    );
  }, [searchText]);
  useEffect(() => {
    if (user?.subscriptionId === "6744617ea4d142ed16ea9c9e") {
      const cleanup = disableFeatures();
      return cleanup;
    }
  }, [user?.subscriptionId]);
  const handleSort = (sortedBy) => {
    setSortingInfo((p) => {
      if (p.sortedBy !== sortedBy) {
        return { direction: 1, sortedBy };
      } else {
        return { ...p, direction: p.direction === 1 ? -1 : 1 };
      }
    });
  };


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // const formData = new FormData(e.target);
    // const search = formData.get("search");
    // if (search) setSearchText(search);
  };

  const queryParams = useMemo(
    () => ({
      limit,
      mode: "initial",
      page: currentPage,
      type: templateType,
      sortByDate:
        sortingInfo?.sortedBy !== "date"
          ? undefined
          : sortingInfo?.direction === 1
            ? "asec"
            : "desc",
      sortByMessage:
        sortingInfo?.sortedBy !== "messages"
          ? undefined
          : sortingInfo?.direction === 1
            ? "asec"
            : "desc",
      sortByName:
        sortingInfo?.sortedBy !== "name"
          ? undefined
          : sortingInfo?.direction === 1
            ? "asec"
            : "desc",
      sortByType:
        sortingInfo?.sortedBy !== "type"
          ? undefined
          : sortingInfo?.direction === 1
            ? "asec"
            : "desc",
      sortByResponse:
        sortingInfo?.sortedBy !== "response"
          ? undefined
          : sortingInfo?.direction === 1
            ? "asec"
            : "desc",

      sortByDelivery:
        sortingInfo?.sortedBy !== "delivery"
          ? undefined
          : sortingInfo?.direction === 1
            ? "asec"
            : "desc",
    }),
    [
      currentPage,
      limit,
      sortingInfo?.direction,
      sortingInfo?.sortedBy,
      templateType,
    ]
  );

  useLayoutEffect(() => {
    dispatch(getTemplateCounts({ mode: "initial" }));
  }, [dispatch]);

  useLayoutEffect(() => {
    setIsLoaderShowing(loading);
  }, [loading, setIsLoaderShowing]);

  useEffect(() => {
    if (templatesData?.results?.length > 0) {
      setIsLoading(false);

    }
  }, [templatesData])

  useLayoutEffect(() => {
    dispatch(getAllTemplates({ ...queryParams, search: searchText }));
    setIsLoading(true)
  }, [dispatch, queryParams, searchText]);

  // useEffectWithDependency(() => {
  //   dispatch(
  //     getAllTemplatesWithoutLoader({ ...queryParams, search: searchText })
  //   );
  // }, [searchText]);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Handle limit change
  const handleLimitChange = (event) => {
    const newLimit = Number(event.target.value);
    setLimit(newLimit);
    setCurrentPage(1);
  };

  // Template category option
  const Templateoptions = [
    { value: "all", label: `All (${countData?.totalCount ?? 0})` },
    {
      value: "Residential",
      label: `Residential (
              ${countData?.countWithType?.find((c) => c._id === "Residential")
          ?.totalCount ?? 0
        }
              )`,
    },
    {
      value: "Commercial",
      label: `Commercial (
              ${countData?.countWithType?.find((c) => c._id === "Commercial")
          ?.totalCount ?? 0
        }
              )`,
    },
    {
      value: "Land",
      label: `Land (
              ${countData?.countWithType?.find((c) => c._id === "Land")
          ?.totalCount ?? 0
        }
              )`,
    },
    {
      value: "Multi Family",
      label: `Multi Family (
              ${countData?.countWithType?.find((c) => c._id === "Multi Family")
          ?.totalCount ?? 0
        }
              )`,
    },
    {
      value: "Pre-Foreclosure / Liens / Auction",
      label: `Pre-Foreclosure / Liens / Auction (
              ${countData?.countWithType?.find(
        (c) => c._id === "Pre-Foreclosure / Liens / Auction"
      )?.totalCount ?? 0
        }
              )`,
    },
    {
      value: "Probate / Bankruptcy",
      label: `Probate / Bankruptcy (
              ${countData?.countWithType?.find(
        (c) => c._id === "Probate / Bankruptcy"
      )?.totalCount ?? 0
        }
              )`,
    },
    {
      value: "Vacant / Absentee",
      label: `Vacant / Absentee (
              ${countData?.countWithType?.find(
        (c) => c._id === "Vacant / Absentee"
      )?.totalCount ?? 0
        }
              )`,
    },
  ];
  // Template category option


  console.log("loading", loading);



  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <FaSort style={{ color: "#777777" }} />
      </components.DropdownIndicator>
    );
  };



  return (
    <InitialTemplateStyled
      tableWidth={windowWidth - remToPixels(7) - remToPixels(2.6)}
    >
      <TemplateTop>
        <div className="left">
          {(user.role === "admin" ||
            user.permissions.includes("Initial Template Search")) && (
              <div className="searchContainer">
                <FiSearch style={{ fontSize: "22px", color: "#012635" }} />
                <input
                  name="search"
                  value={searchText}
                  onChange={(e) => setSearchText(e?.target?.value)}
                  placeholder="Search initial template"
                />
              </div>
            )}
          {/* <div className="dropDown" ><DropDownFilter placeHolder={"Teams"} /></div> */}
        </div>
        <div className="right">
          <div
            className={`TemplateC body4Medium textSecondaryColor`}
            style={{ cursor: "pointer", marginRight: "10px" }}

          >
            Template type
          </div>
          <Select
            components={{
              DropdownIndicator,
              IndicatorSeparator: () => null,
            }}
            onChange={(e) => setTemplateType(e.value)}
            options={Templateoptions}
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder={`All (${templatesData?.totalResults ?? 0})`}
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
                width: 300,
                height: "40px",
              }),
            }}
            IndicatorsContainer={false}
          />
          {(user.role === "admin" ||
            user.permissions.includes("Create Initial Template")) && (
              <LightTooltip
                placement="top"
                arrow
                title={
                  <>
                    <p>Create New (Initial Template)</p>
                  </>
                }
              >
                <Link to="/templates/create-template">
                  <div
                    onClick={() => setIsCreateUserOpen(true)}
                    style={{
                      width: "111px",
                      height: "40px",
                      backgroundColor: "#00BD82",
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    <span className="text">Create New</span>
                  </div>
                </Link>
              </LightTooltip>
            )}
        </div>
      </TemplateTop>

      <div style={{ flexGrow: 1 }} className="bottom">
        <div style={{ height: "calc(100% - 56px)", overflowX: "auto" }}>
          <div className="table">
            <div
              className="row"
              style={{
                position: "sticky",
                top: "0px",
                zIndex: 100,
                backgroundColor: "white",
                borderBottom: "1.5px solid #80808052",
              }}
            >
              <h6
                className={`col sort ${sortingInfo.sortedBy === "name" ? "select" : ""
                  }`}
              // onClick={() => handleSort("name")}
              >
                <span className="text body4Medium textPrimeryColor ">Name</span>
                {/* <SortIcon
                direction={sortingInfo.direction}
                isSorted={sortingInfo.sortedBy === "name"}
              /> */}

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <BiSolidUpArrow
                    onClick={() => {
                      if (sortingInfo.direction === 1 && sortingInfo.sortedBy === "name") {
                        setSortingInfo("")
                      } else {
                        setSortingInfo({ direction: 1, sortedBy: "name" })
                      }

                    }}
                    style={{ color: sortingInfo.direction === 1 && sortingInfo.sortedBy === "name" ? "#00BD82" : "#777777", fontSize: "10px", cursor: "pointer" }}
                  />
                  <BiSolidDownArrow
                    onClick={() => {
                      if (sortingInfo.direction === -1 && sortingInfo.sortedBy === "name") {
                        setSortingInfo("")
                      } else {
                        setSortingInfo({ direction: -1, sortedBy: "name" })
                      }

                    }}
                    style={{ color: sortingInfo.direction === -1 && sortingInfo.sortedBy === "name" ? "#00BD82" : "#777777", fontSize: "10px", cursor: "pointer" }}
                  />
                </div>
              </h6>
              <h6
                className={`col sort info ${sortingInfo.sortedBy === "messages" ? "select" : ""
                  }`}
              // onClick={() => handleSort("messages")}
              >
                <span className="text body4Medium textPrimeryColor">Messages</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <BiSolidUpArrow
                    onClick={() => {
                      if (sortingInfo.direction === 1 && sortingInfo.sortedBy === "messages") {
                        setSortingInfo("")
                      } else {
                        setSortingInfo({ direction: 1, sortedBy: "messages" })
                      }

                    }}
                    style={{ color: sortingInfo.direction === 1 && sortingInfo.sortedBy === "messages" ? "#00BD82" : "#777777", fontSize: "10px", cursor: "pointer" }}
                  />
                  <BiSolidDownArrow
                    onClick={() => {
                      if (sortingInfo.direction === -1 && sortingInfo.sortedBy === "messages") {
                        setSortingInfo("")
                      } else {
                        setSortingInfo({ direction: -1, sortedBy: "messages" })
                      }

                    }}
                    style={{ color: sortingInfo.direction === -1 && sortingInfo.sortedBy === "messages" ? "#00BD82" : "#777777", fontSize: "10px", cursor: "pointer" }}
                  />
                </div>
              </h6>
              <h6
                className={`col sort ${sortingInfo.sortedBy === "type" ? "select" : ""
                  }`}
              // onClick={() => handleSort("type")}
              >
                <span className="text body4Medium textPrimeryColor">Type</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <BiSolidUpArrow
                    onClick={() => {
                      if (sortingInfo.direction === 1 && sortingInfo.sortedBy === "type") {
                        setSortingInfo("")
                      } else {
                        setSortingInfo({ direction: 1, sortedBy: "type" })
                      }

                    }}
                    style={{ color: sortingInfo.direction === 1 && sortingInfo.sortedBy === "type" ? "#00BD82" : "#777777", fontSize: "10px", cursor: "pointer" }}
                  />
                  <BiSolidDownArrow
                    onClick={() => {
                      if (sortingInfo.direction === -1 && sortingInfo.sortedBy === "type") {
                        setSortingInfo("")
                      } else {
                        setSortingInfo({ direction: -1, sortedBy: "type" })
                      }

                    }}
                    style={{ color: sortingInfo.direction === -1 && sortingInfo.sortedBy === "type" ? "#00BD82" : "#777777", fontSize: "10px", cursor: "pointer" }}
                  />
                </div>
              </h6>
              <h6
                className={`col sort info ${sortingInfo.sortedBy === "delivery" ? "select" : ""
                  }`}
              // onClick={() => handleSort("delivery")}
              >
                <span className="text body4Medium textPrimeryColor">Delivery %</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <BiSolidUpArrow
                    onClick={() => {
                      if (sortingInfo.direction === 1 && sortingInfo.sortedBy === "delivery") {
                        setSortingInfo("")
                      } else {
                        setSortingInfo({ direction: 1, sortedBy: "delivery" })
                      }

                    }}
                    style={{ color: sortingInfo.direction === 1 && sortingInfo.sortedBy === "delivery" ? "#00BD82" : "#777777", fontSize: "10px", cursor: "pointer" }}
                  />
                  <BiSolidDownArrow
                    onClick={() => {
                      if (sortingInfo.direction === -1 && sortingInfo.sortedBy === "delivery") {
                        setSortingInfo("")
                      } else {
                        setSortingInfo({ direction: -1, sortedBy: "delivery" })
                      }

                    }}
                    style={{ color: sortingInfo.direction === -1 && sortingInfo.sortedBy === "delivery" ? "#00BD82" : "#777777", fontSize: "10px", cursor: "pointer" }}
                  />
                </div>
              </h6>
              <h6
                className={`col sort info ${sortingInfo.sortedBy === "response" ? "select" : ""
                  }`}
              // onClick={() => handleSort("response")}
              >
                <span className="text body4Medium textPrimeryColor">Response %</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <BiSolidUpArrow
                    onClick={() => {
                      if (sortingInfo.direction === 1 && sortingInfo.sortedBy === "response") {
                        setSortingInfo("")
                      } else {
                        setSortingInfo({ direction: 1, sortedBy: "response" })
                      }

                    }}
                    style={{ color: sortingInfo.direction === 1 && sortingInfo.sortedBy === "response" ? "#00BD82" : "#777777", fontSize: "10px", cursor: "pointer" }}
                  />
                  <BiSolidDownArrow
                    onClick={() => {
                      if (sortingInfo.direction === -1 && sortingInfo.sortedBy === "response") {
                        setSortingInfo("")
                      } else {
                        setSortingInfo({ direction: -1, sortedBy: "response" })
                      }

                    }}
                    style={{ color: sortingInfo.direction === -1 && sortingInfo.sortedBy === "response" ? "#00BD82" : "#777777", fontSize: "10px", cursor: "pointer" }}
                  />
                </div>
              </h6>
              <h6
                className={`col sort info ${sortingInfo.sortedBy === "response" ? "select" : ""
                  }`}
              // onClick={() => handleSort("response")}
              >
                <span className="text body4Medium textPrimeryColor">Date</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <BiSolidUpArrow
                    onClick={() => {
                      if (sortingInfo.direction === 1 && sortingInfo.sortedBy === "date") {
                        setSortingInfo("")
                      } else {
                        setSortingInfo({ direction: 1, sortedBy: "date" })
                      }

                    }}
                    style={{ color: sortingInfo.direction === 1 && sortingInfo.sortedBy === "date" ? "#00BD82" : "#777777", fontSize: "10px", cursor: "pointer" }}
                  />
                  <BiSolidDownArrow
                    onClick={() => {
                      if (sortingInfo.direction === -1 && sortingInfo.sortedBy === "date") {
                        setSortingInfo("")
                      } else {
                        setSortingInfo({ direction: -1, sortedBy: "date" })
                      }

                    }}
                    style={{ color: sortingInfo.direction === -1 && sortingInfo.sortedBy === "date" ? "#00BD82" : "#777777", fontSize: "10px", cursor: "pointer" }}
                  />
                </div>
              </h6>
              <h6
                className={`col sort info ${sortingInfo.sortedBy === "response" ? "select" : ""
                  }`}
              >      <span className="text body4Medium textPrimeryColor">Action</span></h6>
            </div>
            {isLoading &&  templatesData?.results?.length === 0 ? (
              <div className="row body">
                <p className="error">Loading...</p>
              </div>
            ) : templatesData?.results?.length === 0 ? (
              <div className="row body">
                <p className="error">No Record Found!</p>
              </div>
            ) : null}
            {templatesData?.results?.map((data, i) => (
              <TableRow
                key={i}
                onDelete={() => setSelectedDeleteId(data?._id)}
                singleTemplate={data}
                user={user}
              />
            ))}
          </div>
        </div>
        <div
          style={{
            position: "sticky",
            bottom: "0px",
            zIndex: 100,
            display: "flex",
            justifyContent: "space-between",
            height: "56px",
            backgroundColor: "white",
            borderBottomLeftRadius: "12px",
            padding: "0px 16px",
            alignItems: "center",
            paddingTop: "10px ",
            paddingBottom: "10px",
            borderTop: "1.5px solid #80808052",
          }}
        >
          <div>Total: {templatesData?.totalResults ?? 0}</div>

          <PaginationComp
            totalPages={templatesData?.totalPages || 1}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                // fontSize: "14px",
                // lineHeight: "22px",
                // fontWeight: 500,
                // color: "#333333",
              }}
              className="body4Medium textPrimeryColor"
            >
              Entries
            </div>
            <PaginationDropDown
              limit={limit}
              onLimitChange={handleLimitChange}
            />
          </div>
        </div>
      </div>

      <Components.Common.DeleteModal
        onClose={() => setSelectedDeleteId("")}
        onOkay={() => {
          setSelectedDeleteId((p) => {
            dispatch(
              deleteTemplate({ ...queryParams, _id: p, search: searchText } , "", (e)=> toast.error(e?.response?.data?.message)
              )
            );
            return "";
          });
        }}
        open={Boolean(selectedDeleteId)}
        deleteItemName="template"
      />
    </InitialTemplateStyled>
  );
};

export default InitialTemplate;

const TableRow = ({ onDelete, singleTemplate, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <TableRowStyled
      className="row body"
      isOpen={isOpen}
      style={{
        paddingBottom: isOpen ? "0px" : "1rem",
        paddingInline: isOpen ? "0px" : "1rem",
      }}
    >
      <div
        className="col2 data"
        style={{ paddingLeft: isOpen ? "1rem" : "0rem" }}
      >
        <p style={{ fontWeight: 500 }} className="textSecondaryColor">
          {singleTemplate?.name}
        </p>
      </div>
      <div className="col message">
        <AnimatePresence>
          {!isOpen && (
            <motion.p
              dangerouslySetInnerHTML={{
                __html: formatTemplateString(
                  singleTemplate?.messages
                    ? singleTemplate?.messages[0]?.message1 ?? ""
                    : ""
                ),
              }}
            ></motion.p>
          )}
        </AnimatePresence>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen && "Show less"}
          <span className="icon">
            <GoChevronDown
              onClick={() => setIsOpen((p) => !p)}
              color="#012635"
              size={25}
            />
          </span>
        </button>
      </div>
      <div className="col data">
        <p className="textSecondaryColor">{singleTemplate?.type}</p>
      </div>
      <div className="col data">
        <p
          style={{
            color: `${parseFloat(singleTemplate?.deliveredPercentage) <= 84
              ? "#ff0000be"
              : "inherit"
              }`,
            fontWeight: `${parseFloat(singleTemplate?.deliveredPercentage) <= 84
              ? "600"
              : "500"
              }`,
          }}
        >
          {parseFloat(singleTemplate?.deliveredPercentage).toFixed(2)}%
        </p>
      </div>
      <div className="col data">
        <p className="textSecondaryColor">
          {parseFloat(singleTemplate?.responsePercentage).toFixed(2)}%
        </p>
      </div>
      <div className="col data">
        <p className="textSecondaryColor">
          {formatDate(singleTemplate?.createdAt)}
        </p>
      </div>
      {(user.role === "admin" ||
        user.permissions.includes("Edit Initial Template") ||
        user.permissions.includes("Delete Initial Template")) && (
          <div className="col actions" onClick={(e) => e.stopPropagation()}>
            <MoreOptionMenu
              onDelete={onDelete}
              _id={singleTemplate?._id}
              user={user}
            />
          </div>
        )}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="extraRows"
            exit={{
              height: 0,
              transition: { delay: 0.3, duration: 0.3, ease: "easeIn" },
            }}
          >
            {singleTemplate?.messages
              ? Object.keys(singleTemplate?.messages[0])
                .filter((key) => key !== "_id")
                .map((key) => singleTemplate?.messages[0][key])
                .map((data, index) => (
                  <motion.div
                    initial={{
                      x: "-2rem",
                      opacity: 0,
                      transition: { duration: 0.3, ease: "linear" },
                    }}
                    animate={{
                      x: "0rem",
                      opacity: 1,
                      transition: { duration: 0.3, ease: "linear" },
                    }}
                    exit={{
                      x: "-2rem",
                      opacity: 0,
                      transition: { duration: 0.3, ease: "linear" },
                    }}
                    className="item"
                    key={index}
                  >
                    <span className="body4Medium textPrimeryColor">{`Message ${index + 1}`}</span>
                    <div
                      className="itemInner"
                      style={{
                        borderBottom:
                          index == 4
                            ? "0px solid #80808052"
                            : "1px solid #80808052",
                      }}
                    >
                      <p
                        dangerouslySetInnerHTML={{
                          __html: formatTemplateString(data),
                        }}
                      />
                    </div>
                  </motion.div>
                ))
              : ""}
          </motion.div>
        )}
      </AnimatePresence>
    </TableRowStyled>
  );
};

const MoreOptionMenu = ({ onDelete, _id, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button ref={buttonRef} onClick={() => setIsOpen((p) => !p)}>
        {isOpen ? <FaTimes /> : <FaEllipsisV />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            className="menu"
            initial={{ x: "1rem", y: "-50%", opacity: 0 }}
            animate={{ x: "-1.5rem", y: "-50%", opacity: 1 }}
            exit={{ x: "1rem", y: "-50%", opacity: 0 }}
          >
            {(user.role === "admin" ||
              user.permissions.includes("Edit Initial Template")) && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate(`/templates/create-template/${_id}?edit=true`);
                  }}
                >
                  <span className="icon">
                    <FaEdit />
                  </span>
                  <span className="text">Edit</span>
                </button>
              )}
            {(user.role === "admin" ||
              user.permissions.includes("Delete Initial Template")) && (
                <button
                  onClick={() => {
                    onDelete();
                    setIsOpen(false);
                  }}
                >
                  <span className="icon">
                    <FaTrash />
                  </span>
                  <span className="text">Delete</span>
                </button>
              )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
