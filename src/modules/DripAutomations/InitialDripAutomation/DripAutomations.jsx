import React, { useEffect, useRef, useState } from "react";
import {
  DripAutomationTableRowStyled,
  DripAutomationsStyled,
  InitialTemplateStyled,
  TableStyled,
  TemplateTop,
} from "./styles";
import {
  FaChevronDown,
  // FaClock,
  FaEdit,
  FaEllipsisV,
  FaInfoCircle,
  FaPlus,
  FaSearch,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { LightTooltip, SortIcon } from "@/components/common";
import { formatTemplateString, remToPixels } from "@/utils";
import { useGlobalContext } from "@/hooks";
import Components from "@/components";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  GetAllDripForInbox,
  clearErrors,
  clearMessages,
  deleteDrip,
  updateDripAutomationPosition,
} from "./../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./dripAutomation.module.css";
import { FiSearch } from "react-icons/fi";
import { FaAngleUp } from "react-icons/fa6";
import PaginationComp from "../Pagination/Pagination";
import PaginationDropDown from "../Pagination/PaginationDropDown";
import Assets from "@/assets";
import { ConfirmModalStyled, MUIModalStyled } from "./styles";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import Info from "../../../assets/icons/info.svg";





const DripAutomations = () => {
  const dispatch = useDispatch();
  const [textValue, setTextValue] = useState("");
  const {
    loading,
    message,
    errors: error,
  } = useSelector((s) => s.dripAutomationReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message !== "") {
      toast.success(message);
      dispatch(clearMessages());
    }
  }, [error, message]);


  const { drips, totalResults, totalPages } = useSelector((s) => s.dripAutomationReducer);
  const { windowWidth } = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sorting, setSorting] = useState()
  const [dataTable, setDataTable] = useState([]);
  useEffect(() => {
    dispatch(GetAllDripForInbox(textValue, currentPage, limit, sorting));
  }, [currentPage, limit, textValue, sorting]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleLimitChange = (event) => {
    const newLimit = Number(event.target.value);
    setLimit(newLimit);
    setCurrentPage(1);
  };

  const [sortingInfo, setSortingInfo] = useState({
    direction: 0,
    sortedBy: "",
  });

  const handleSort = (sortedBy) => {
    setSortingInfo((p) => {
      if (p.sortedBy !== sortedBy) {
        return { direction: 1, sortedBy };
      } else {
        return { ...p, direction: p.direction === 1 ? -1 : 1 };
      }
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const draggedItem = dataTable[source.index];
    const updatedDataTable = Array.from(dataTable);
    updatedDataTable.splice(source.index, 1);
    updatedDataTable.splice(destination.index, 0, draggedItem);
   
    updatedDataTable.forEach((item, index) => {
      item.position = index;
    });
 
    console.log("updatedDataTable",draggedItem ,"draggedItem",  source , destination ,   updatedDataTable);
    
    setDataTable(updatedDataTable);
    dispatch(updateDripAutomationPosition(updatedDataTable));
  };

  useEffect(() => {
    setDataTable(drips);
  }, [drips]);
  

  
  return (
    <InitialTemplateStyled
      tableWidth={windowWidth - remToPixels(7) - remToPixels(2.6)}
    >
      <TemplateTop>
        <div className="left">
          <div className="searchContainer">
            <FiSearch style={{ fontSize: "22px", color: "#012635" }} />
            <input
              name="search"
              onChange={(e) => setTextValue(e.target.value)}
              placeholder="Search"
            />
          </div>

        </div>
        <div className="right">
        </div>
      </TemplateTop>


      <div style={{ flexGrow: 1 }} className="bottom">
        <div className="table">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="row" style={{ position: "sticky", top: "0px", zIndex: 100, backgroundColor: "white", borderBottom: "1.5px solid #80808052" }}>
            <h6
              className={`col sort ${sortingInfo.sortedBy === "name" ? "select" : ""
                }`}
              onClick={() => handleSort("name")}
            >
              <span className="text">Name</span>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <BiSolidUpArrow
                  onClick={() => {
                    if (sorting?.sort === "sortByName=asec") {
                      setSorting("")
                    } else {
                      setSorting({ sort: "sortByName=asec" })

                    }
                  }}
                  style={{ color: sorting?.sort === "sortByName=asec" ? "#00BD82" : "#777777", cursor: "pointer", fontSize: "10px" }}
                />
                <BiSolidDownArrow

                  onClick={() => {
                    if (sorting?.sort === "sortByName=desc") {
                      setSorting("")
                    } else {
                      setSorting({ sort: "sortByName=desc" })

                    }
                    // setSorting({ sort:"sortByName=desc"})
                  }
                  }
                  style={{ color: sorting?.sort === "sortByName=desc" ? "#00BD82" : "#777777", cursor: "pointer", fontSize: "10px" }}
                />
              </div>
            </h6>
            <h6
              style={{ justifyContent: 'flex-start', alignItems: 'center' }}
              className={`col sort info`}
            >
              <span className="text">Messages</span>
              <span className="info" style={{ paddingLeft: "5px" }}>
                <LightTooltip arrow placement="top" title="Day when the message will be automatically sent out (the day after a prospect has been added to Drip Automation)">
                  <span>
                    <img
                      src={Info}
                      style={{ width: "18px", height: "18px" }}
                    ></img>
                  </span>
                </LightTooltip>
              </span>
            </h6>
            <h6 className={`col sort info`}></h6>
          </div>
          {drips?.length === 0 && (
            <div className="row body">
              <p className="error">No Record Found!</p>
            </div>
          )}
          <Droppable droppableId="table">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {dataTable?.map((data, i) => (
                  <Draggable
                    key={data._id}
                    draggableId={data._id}
                    index={i}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <DripAutomationsTableRow
                          key={i}
                          onDelete={() => setSelectedDeleteId(data?._id)}
                          data={data}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
          {drips?.length > 0 && (
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
              <div>Total: {totalResults ?? 0}</div>

              <PaginationComp
                totalPages={totalPages || 1}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    fontSize: "14px",
                    lineHeight: "22px",
                    fontWeight: 500,
                    color: "#333333",
                  }}
                >
                  Entries
                </div>
                <PaginationDropDown limit={limit} onLimitChange={handleLimitChange} />
              </div>
            </div>
          )}
        
        </DragDropContext >
        </div>
      </div>

    </InitialTemplateStyled>
  );
};

export default DripAutomations;

const DripAutomationsTable = ({ onResume, textValue }) => {
  const dispatch = useDispatch();
  const { drips, totalResults, totalPages } = useSelector((s) => s.dripAutomationReducer);
  const { windowWidth } = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    dispatch(GetAllDripForInbox(textValue, currentPage, limit));
  }, [currentPage, limit, textValue]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleLimitChange = (event) => {
    const newLimit = Number(event.target.value);
    setLimit(newLimit);
    setCurrentPage(1);
  };

  return (
    <TableStyled tableWidth={windowWidth - remToPixels(7) - remToPixels(2.6)}>
      <div style={{ flexGrow: 1 }} className="bottom">
        <div className="table">
          <div className="row" style={{ position: "sticky", top: "0px", zIndex: 100, backgroundColor: "white", borderBottom: "1.5px solid #80808052" }}>
            <h6 className={`col sort`}>
              <span className="text">Name</span>
            </h6>
            <h6
              className={`col sort info`}
            >
              <span className="text">Messages</span>
            </h6>
            <h6 className={`col sort info`}></h6>
          </div>
          {drips?.length === 0 && (
            <div className="row body">
              <p className="error">No Record Found!</p>
            </div>
          )}
          {drips?.map((data, i) => (
            <DripAutomationsTableRow
              key={i}
              onDelete={() => setSelectedDeleteId(data?._id)}
              data={data}
            />
          ))}
          {drips?.length > 0 && (
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
              <div>Total: {totalResults ?? 0}</div>

              <PaginationComp
                totalPages={totalPages || 1}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    fontSize: "14px",
                    lineHeight: "22px",
                    fontWeight: 500,
                    color: "#333333",
                  }}
                >
                  Entries
                </div>
                <PaginationDropDown limit={limit} onLimitChange={handleLimitChange} />
              </div>
            </div>
          )}
        </div>
      </div>
    </TableStyled>
  );
};

const DripAutomationsTableRow = ({ data }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  return (
    <DripAutomationTableRowStyled isOpen={isOpen}>
      <ConfirmModal
        content={{
          title: "Are you sure you want to discard this changes?",
          message: 'If you discard this change, you will lose the all-filled data in this drip automation form.'
        }}
        onClose={() => setIsPopUp(false)}
        onOkay={() => {
          dispatch(deleteDrip(data._id));
          setIsPopUp(false);
        }}
        open={isPopUp}
      />
      <div className="col data">
        <p> {data.name}</p>
      </div>
      <div className="col message">
        <AnimatePresence>
          {!isOpen ? (
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
            >
              <div>
                <motion.div>Day {data?.messages[0]?.day}</motion.div>
                <motion.span></motion.span>
                <motion.div className="messageText">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: formatTemplateString(
                        data ? data?.messages[0]?.content ?? "" : ""
                      ),
                    }}
                  />
                </motion.div>
              </div>
              {data.messages.length > 1 &&
                <span onClick={() => setIsOpen((p) => !p)}>
                  {data.messages && data.messages.length > 1
                    ? `+${data.messages.length - 1} more`
                    : ""}
                </span>
              }
            </motion.div>
          ) : (
            <motion.div
              className="extraRows"
              exit={{
                height: 0,
                transition: { delay: 0.3, duration: 0.3, ease: "easeIn" },
              }}
            >
              {data.messages.map((item, index) => (
                <motion.div
                  initial={{
                    y: "-2rem",
                    opacity: 0,
                    transition: { duration: 0.3, ease: "linear" },
                  }}
                  animate={{
                    y: "0rem",
                    opacity: 1,
                    transition: { duration: 0.3, ease: "linear" },
                  }}
                  exit={{
                    y: "-2rem",
                    opacity: 0,
                    transition: { duration: 0.3, ease: "linear" },
                  }}
                  className="item"
                  key={index}
                >
                  <div>
                    <motion.div>Day {item.day}</motion.div>
                    <motion.span></motion.span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: formatTemplateString(item.content),
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div
        style={{
          display: "flex",
          gap: "5px",
          alignItems: "center",
          cursor: "pointer",
          paddingLeft: "2rem",
        }}
        onClick={() => setIsOpen((p) => !p)}
      >

        <p style={{ color: "#777777" }}>{!isOpen ? "Show More" : "Show Less"}</p>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!isOpen ?
            <FaChevronDown style={{ fontSize: "1.1rem", color: "#777777" }} /> :
            <FaAngleUp Down style={{ fontSize: "1.1rem", color: "#777777" }} />
          }
        </button>
      </div>
      <div className="col actions" onClick={(e) => e.stopPropagation()}>
        <MoreOptionMenu id={data._id} onDelete={() => setIsPopUp(true)} />
      </div>
    </DripAutomationTableRowStyled>
  );
};

const MoreOptionMenu = ({ id, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const dispatch = useDispatch();

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

  const navigateAndReload = () => {
    // navigate(`/drip-automations/${id}`);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
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
            <button>
              <Link to={`/drip-automations/${id}`} onClick={navigateAndReload}>
                <span className="icon">
                  <FaEdit />
                </span>
                <span className="text">Edit</span>
              </Link>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
                  <button onClick={onClose}>
                    Cancel
                  </button>
                  <button onClick={onOkay}>
                    Delete
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

