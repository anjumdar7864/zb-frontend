import { Link, NavLink, useNavigate } from "react-router-dom";
// import { QuickRepliesStyled, TableMainSection, TableRowStyled } from "./styles";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  FaEdit,
  FaEllipsisV,
  FaInfoCircle,
  FaPlus,
  FaReply,
  FaSearch,
  FaSync,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { LightTooltip, SortIcon } from "@/components/common";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Components from "@/components";
import { useEffectWithDependency, useGlobalContext } from "@/hooks";
import { formatTemplateString, remToPixels } from "@/utils";
import Assets from "@/assets";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteReplyTemplate,
  getAllRepliesTemplates,
  getAllRepliesTemplatesWithoutLoader,
  getAllReplyTemplateCategories,
  updateQuickReplyTemplatePosition,
} from "@/store/actions";

// new code by Taha Tahir
import {
  TransferModelStyle,
  QuickTemplateStyled,
  PasswordModelStyle,
  Button,
  StyledInputWrapper,
  TemplateTop,
  TableRowStyled
} from "./styles";
import { FiSearch } from "react-icons/fi";
import styles from "./QuickReplies.module.css"
import PaginationDropDown from "../Pagination/PaginationDropDown";
import PaginationComp from "../Pagination/Pagination";
import Select, { components } from 'react-select';
import { FaSort } from "react-icons/fa6";


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

const QuickReplies = () => {
  const {
    quickReplyLoading,
    replyTemplateCategories,
    quickReplytemplatesData: templatesData,
  } = useSelector((s) => s.templateReducer);
  const { windowWidth } = useGlobalContext();
  const [selectedDeleteId, setSelectedDeleteId] = useState("");
  const [numberOfRowsShowing, setNumberOfRowsShowing] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();
  const [isCategoriesGot, setIsCategoriesGot] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [sortingInfo, setSortingInfo] = useState({
    direction: 0,
    sortedBy: "",
  });
  const dispatch = useDispatch();

  const [limit, setLimit] = useState(50);
  const handleSort = (sortedBy) => {
    setSortingInfo((p) => {
      if (p.sortedBy !== sortedBy) {
        return { direction: 1, sortedBy };
      } else {
        return { ...p, direction: p.direction === 1 ? -1 : 1 };
      }
    });
  };
  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );
  useLayoutEffect(() => {
    dispatch(getAllReplyTemplateCategories({}, () => setIsCategoriesGot(true)));
  }, [dispatch]);

  const queryParams = useMemo(
    () => ({
      limit: limit,
      page: currentPage,
      searchByCategory: selectedCategory,
      sortByTitle:
        sortingInfo?.sortedBy !== "title"
          ? undefined
          : sortingInfo?.direction === 1
            ? "asec"
            : "desc",
      sortByCategory:
        sortingInfo?.sortedBy !== "category"
          ? undefined
          : sortingInfo?.direction === 1
            ? "asec"
            : "desc",
      sortByReply:
        sortingInfo?.sortedBy !== "message"
          ? undefined
          : sortingInfo?.direction === 1
            ? "asec"
            : "desc",
    }),
    [
      limit,
      currentPage,
      selectedCategory,
      sortingInfo?.direction,
      sortingInfo?.sortedBy,
    ]
  );

 

  useEffect(() => {
    if (user?.subscriptionId === "6744617ea4d142ed16ea9c9e") {
      const cleanup = disableFeatures();
      return cleanup;
    }
  }, [user?.subscriptionId]);

  useEffect(() => {
  

    if (!isCategoriesGot) return;
    dispatch(getAllRepliesTemplates({ ...queryParams, search: searchText }));
   
      setIsLoading(true)
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isCategoriesGot, selectedCategory, searchText, queryParams]);

  useEffect(() => {
    if (replyTemplateCategories?.length > 0) {
      if (isCategoriesGot === false) {
        setIsCategoriesGot(true);
        setSelectedCategory(replyTemplateCategories[0]?._id);
      }
    }
  }, [replyTemplateCategories]);
  

  const [dataTable, setDataTable] = useState(templatesData?.results);

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
    setDataTable(updatedDataTable);
    dispatch(updateQuickReplyTemplatePosition(updatedDataTable));
  };

  useEffect(() => {
    setDataTable(templatesData?.results);
    setIsLoading(false)
  }, [templatesData?.results]);

  useEffect(() => {
    const handleUnload = (event) => {
      event.preventDefault();
      event.returnValue =
        "Hi, you have unsaved changes. Are you sure you want to leave?";
    };

    window.addEventListener("beforeunload", handleUnload, { capture: true });

    return () => {
      window.removeEventListener("beforeunload", handleUnload, {
        capture: true,
      });
    };
  }, []);


  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const handleLimitChange = (event) => {
    const newLimit = Number(event.target.value);
    setLimit(newLimit);
    setCurrentPage(1);
  };




  const Templateoptions =
    replyTemplateCategories?.map((data) => ({
      value: data?._id,
      label: data?.name,
    }))
    ;



  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <FaSort style={{ color: '#777777' }} />
      </components.DropdownIndicator>
    );
  };
  return (
    <>
      <QuickTemplateStyled
        tableWidth={windowWidth - remToPixels(7) - remToPixels(2.6)}
      >
        <TemplateTop>
          <div className="left">
     
            <div className="searchContainer">
              <input
                name="search"
                value={searchText}
                onChange={(e) => setSearchText(e?.target?.value)}
                placeholder="Search quick reply"
              />
              <FiSearch style={{ fontSize: "22px", color: "#012635" }} />
            </div>
          {/* )} */}
          </div>
          <div className="right" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="TemplateC body4Medium textSecondaryColor" style={{  cursor: "pointer", marginRight: '10px' }}>Template category</div>
            <Select
              components={{
                DropdownIndicator,
                IndicatorSeparator: () => null,
              }}
              onChange={(e) => setSelectedCategory(e.value)}
              options={Templateoptions}
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder={replyTemplateCategories[0]?.name || "No Category found"}
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
                  width: 300,
                  height: '40px',
                }),
              }}
              IndicatorsContainer={false}
            />
            {(user.role === 'admin' || user.permissions.includes('Create Quick Replies')) && (
            <LightTooltip
              placement="top"
              arrow
              title={
                <>
                  <p>Create New (Quick Reply Template)</p>
                </>
              }
            >
              <Link to="/templates/create-replies">
                <div className="primeryBackground textWhiteColor" style={{ width: "111px", height: "40px", borderRadius: "8px", display: "flex", justifyContent: "center", alignItems: "center",  cursor: "pointer" }}>
                  <span className="text">Create New</span>
                </div>
              </Link>

            </LightTooltip>
            )}
          </div>
        </TemplateTop>
        <div style={{ flexGrow: 1 }} className="bottom">
          <div style={{ height: "calc(100% - 56px)", overflowX: 'auto' }}>
            <div className="table">
              <DragDropContext onDragEnd={handleDragEnd}>
                <div className="row" style={{ position: "sticky", top: "0px", zIndex: 100, backgroundColor: "white", borderBottom: "1.5px solid #80808052" }}>
                  <h6
                    className={`col sort`}>
                    <span className="text body4Medium textPrimeryColor">No</span>
                  </h6>
                  <h6
                    className={`col sort body4Medium textPrimeryColor`}>
                    <span className="text">Title</span>
                  </h6>
                  <h6
                    className={`col sort body4Medium textPrimeryColor`}>
                    <span className="text">Category</span>
                  </h6>
                  <h6
                    className={`col sort body4Medium textPrimeryColor`}>
                    <span className="text">Message</span>
                  </h6>
                  {(user.role === 'admin' || user.permissions.includes('Edit Quick Replies') || user.permissions.includes('Delete Quick Replies')) && (
                  <h6
                    className={`col sort body4Medium textPrimeryColor`}>
                    <span className="text">Action</span>
                  </h6>
                  )}
                </div>
                <>
                  {isLoading ? (
                         <div className="row body">
                         <p className="error">Loading!</p>
                       </div>
                  ) : dataTable.length <= 0 ? (
                    <div className="row body">
                      <p className="error">No Record Found!</p>
                    </div>
                  ) : (
                    <Droppable droppableId="table">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {dataTable?.map((singleReply, i) => (
                            <Draggable
                              key={singleReply._id}
                              draggableId={singleReply._id}
                              index={i}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <TableRow
                                    key={i}
                                    index={i}
                                    currentPage={currentPage}
                                    numberOfRowsShowing={numberOfRowsShowing}
                                    loading={quickReplyLoading}
                                    onDelete={() =>
                                      setSelectedDeleteId(singleReply?._id)
                                    }
                                    singleReply={singleReply}
                                    user={user}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </div>
                      )}
                    </Droppable>
                  )}
                </>
              </DragDropContext>
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
            <div>
              Total:{" "}
              {templatesData?.totalResults ? templatesData.totalResults : 0}
            </div>

            <div>
              <PaginationComp
                totalPages={templatesData?.totalPages || 1}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>

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

              <div>
                <PaginationDropDown limit={limit} onLimitChange={handleLimitChange} />
              </div>
            </div>
          </div>
        </div>

        <Components.Common.DeleteModal
          onClose={() => setSelectedDeleteId("")}
          onOkay={() =>
            setSelectedDeleteId((p) => {
              dispatch(
                deleteReplyTemplate({
                  ...queryParams,
                  _id: p,
                  search: searchText,
                })
              );
              return "";
            })
          }
          open={Boolean(selectedDeleteId)}
          deleteItemName="Quick reply"
        />
      </QuickTemplateStyled>
    </>
  );
};

export default QuickReplies;


const TableRow = ({
  index,
  currentPage,
  numberOfRowsShowing,
  loading,
  onDelete,
  singleReply,
  user
}) => {
  let displayIndex;
  if (currentPage != 1 && !loading) {
    displayIndex = (currentPage - 1) * numberOfRowsShowing + index + 1;
  } else {
    displayIndex = index + 1;
  }
  return (
    <TableRowStyled className="row body">
      <div className="col data">
        <p  className="textSecondaryColor"> {displayIndex} </p>
      </div>
      <div
        className="col data"
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
        }}
      >
        <p  className="textSecondaryColor">
          {singleReply?.title
            ? singleReply?.title
            : singleReply?.name
              ? singleReply?.name
              : ""}
        </p>
      </div>
      <div className="col category">
        <span>{singleReply?.category?.name ?? ""}</span>
      </div>
      <div
        className="col data"
        style={{
          // marginLeft: window.innerWidth <= 1300 ? "4rem" : "0rem",
        }}
      >
        <p
          dangerouslySetInnerHTML={{
            __html: formatTemplateString(singleReply?.reply ?? ""),
          }}
        ></p>
      </div>
      {(user.role === 'admin' || user.permissions.includes('Edit Quick Replies') || user.permissions.includes('Delete Quick Replies')) && (
      <div className="col actions" onClick={(e) => e.stopPropagation()}>
        <MoreOptionMenu onDelete={onDelete} _id={singleReply?._id} user={user} />
      </div>)}
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
            className="menu"
            initial={{ x: "1rem", y: "-50%", opacity: 0 }}
            animate={{ x: "-1.5rem", y: "-50%", opacity: 1 }}
            exit={{ x: "1rem", y: "-50%", opacity: 0 }}
            ref={menuRef}
          >
            {(user.role === 'admin' || user.permissions.includes('Edit Quick Replies')) && (
            <button
              onClick={() => {
                setIsOpen(false);
                navigate(`/templates/create-replies/${_id}`);
              }}
            >
              <span className="icon">
                <FaEdit />
              </span>
              <span className="text">Edit</span>
            </button>
            )}
            {(user.role === 'admin' || user.permissions.includes('Delete Quick Replies')) && (
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
