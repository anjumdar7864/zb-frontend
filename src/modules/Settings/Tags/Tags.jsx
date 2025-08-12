import {
  FaChevronRight,
  FaPen,
  FaPlus,
  FaSearch,
  FaTag,
  FaTrash,
} from "react-icons/fa";
import { AddNewTagModalStyled, TableRowStyled, TagsStyled } from "./styles";
import React, { useState, useEffect } from "react";
import { SortIcon } from "@/components/common";
import { AnimatePresence, motion } from "framer-motion";
import Components from "@/components";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTagsList,
  addTag,
  deleteTag,
  updateTag,
  updateTagPosition,
} from "../../../store/actions/tag.action";
import { styled } from "@mui/material";
import { GoDotFill, GoPlus } from "react-icons/go";
import { AiOutlinePlus } from "react-icons/ai";
import Select, { components } from "react-select";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { FaAngleDown, FaSort } from "react-icons/fa6";
import {
  IoCheckmark,
  IoCheckmarkOutline,
  IoChevronDown,
} from "react-icons/io5";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import formatDate from "../../../utils/formatDate";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const LightTooltip = styled(Components.Common.LightTooltip)`
  & > .MuiTooltip-tooltip {
    text-align: center;
    max-width: 20rem;
  }
`;

// const ColorsArray = [
//   "#1f77b4",
//   "#ff7f0e",
//   "#2ca02c",
//   "#d62728",
//   "#9467bd",
//   "#8c564b",
//   "#e377c2",
//   "#7f7f7f",
//   "#bcbd22",
//   "#17becf",
//   "#f0f8ff",
//   "#faebd7",
//   "#00ffff",
//   "#7fffd4",
//   "#f0ffff",
//   "#f5f5dc",
//   "#ffe4c4",
//   "#000000",
//   "#ffebcd",
//   "#8a2be2",
//   "#0000ff",
// ];

const ColorsArray = [
  "#003d4c",
  // "#bb2100",
  // "#f92c00",
  "#0662b5",
  "#008f6c",
  "#fcbb26",
  "#29c8ff",
  "#b285d1",
  "#ff9d88",
  "#ff854c",
  "#acccf3",
  "#48a0ff",
  "#65d289",
  "#7f7f7f",
  "#8c564b",
  " #30106d"
];
const Tags = () => {
  const [searchText, setSearchText] = useState("");
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState("");
  const [selectedEditId, setSelectedEditId] = useState("");
  const [selectedEditName, setSelectedEditName] = useState("");
  const [selectedEditColor, setSelectedEditColor] = useState("");
  const [sorting, setSorting] = useState("");
  // const [sorting , setSorting] = useState({
  //   name : "default" , 
  //   sortByProspect : "default" ,
  //   sortByCreatedAt : "default" , 
  // })

  const [sortingInfo, setSortingInfo] = useState({
    direction: 0,
    sortedBy: "",
  });
  const dispatch = useDispatch();
  const allTagsData = useSelector((state) => state.tagReducer);
  const [filteredData, setFilteredData] = useState([]);
  const [availableTagsCount, setAvailableTagsCount] = useState(0);
  useEffect(() => {
    setAvailableTagsCount(allTagsData["results"].length);
    setFilteredData(
      allTagsData["results"]?.filter((obj) =>
        obj?.name?.toLowerCase()?.startsWith(searchText?.toLowerCase())
      )
    );
    
    
  }, [allTagsData, searchText]);



  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );

  const handleSort = (sortedBy) => {
    if (sortedBy == "createdAt") {
      setFilteredData(
        filteredData.sort((a, b) => {
          if (sortingInfo.direction === 1) {
            return new Date(a.createdAt) - new Date(b.createdAt);
          }
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
      );
    } else if (sortedBy == "name") {
      setFilteredData(
        filteredData.sort((a, b) => {
          // Separate numeric and non-numeric values
          const getNumber = (str) => {
            const match = str?.match(/\d+/);
            return match ? parseInt(match[0]) : NaN;
          };
          const prefixA = (a.name?.toLowerCase()?.match(/\D+/) || [])[0];
          const prefixB = (b.name?.toLowerCase()?.match(/\D+/) || [])[0];

          if (sortingInfo.direction === 1) {
            if (prefixA !== prefixB) {
              return prefixA.localeCompare(prefixB?.toLowerCase());
            }
            return (
              getNumber(a.name?.toLowerCase()) -
              getNumber(b.name?.toLowerCase())
            );
          } else {
            if (prefixA !== prefixB) {
              return prefixB.localeCompare(prefixA?.toLowerCase());
            }
            return (
              getNumber(b.name?.toLowerCase()) -
              getNumber(a.name?.toLowerCase())
            );
          }
        })
      );
    } else if (sortedBy !== "prospect") {
      setFilteredData(
        filteredData.sort((a, b) => {
          if (sortingInfo.direction === 1) {
            return a.color.localeCompare(b.color);
          }
          return b.color.localeCompare(a.color);
        })
      );
    } else if (sortedBy === "prospect") {
      setFilteredData(
        filteredData.sort((a, b) => {
          if (sortingInfo.direction === 1) {
            return a.prospect - b.prospect;
          }
          return b.prospect - a.prospect;
        })
      );
    }

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
 

    const draggedItem = filteredData[source.index];
    const updatedDataTable = Array.from(filteredData);
    updatedDataTable.splice(source.index, 1);
    updatedDataTable.splice(destination.index, 0, draggedItem);

    updatedDataTable.forEach((item, index) => {
      item.position = index;
    });
    setFilteredData(updatedDataTable);
    dispatch(updateTagPosition(updatedDataTable , sorting));
  };
  const handleSubmit = (e) => e.preventDefault();
  useEffect(() => {
    dispatch(getAllTagsList("", "", "", sorting));
  }, [sorting]);

  
  

  return (
    <TagsStyled>
      <div>
        <div className="top">
          <div className="left">
            <p>
              The tags can be created only by Tenants and Admins. Agents can
              assign them to the chats.
            </p>
          </div>
          {/* <div className="right">
            <div className="top">
              <button onClick={() => setIsAddNewModalOpen(true)}>
                <span className="icon">
                  <FaPlus />
                </span>
                <span className="text">Add New Tag</span>
              </button>
            </div>
            <form className="bottom" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search"
                name="search"
                value={searchText}
                autoComplete="off"
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button>
                <FaSearch />
              </button>
            </form>
          </div> */}
        </div>
        <div className="table">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="row">
              {/* <h6
              className={`col sort ${sortingInfo.sortedBy === "color" ? "select" : ""
                }`}
              onClick={() => handleSort("color")}
            >
              <span className="text">Color</span>
              <SortIcon
                direction={sortingInfo.direction}
                isSorted={sortingInfo.sortedBy === "color"}
              />
            </h6> */}
              <h6
                className={`col sort ${sortingInfo.sortedBy === "name" ? "select" : ""
                  }`}
              // onClick={() => handleSort("name")}
              >
                <span className="text">Tag</span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "0.8rem",
                    width: "fit-content",
                  }}
                >
                  <BiSolidUpArrow
                    onClick={() => {
                      if (sorting?.sort === "sortByName=asec") {
                        setSorting("")
                      } else {
                        setSorting({ sort: "sortByName=asec" })

                      }
                    }}
                    style={{ color: sorting?.sort === "sortByName=asec" ? "#00BD82" : "#777777", fontSize: "10px" }}
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
                    style={{ color: sorting?.sort === "sortByName=desc" ? "#00BD82" : "#777777", fontSize: "10px" }}
                  />
                </div>
              </h6>
              <h6
                className={`col sort ${sortingInfo.sortedBy === "name" ? "select" : ""
                  }`}
              // onClick={() => handleSort("name")}
              >
                <span className="text">Prospects</span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "0.8rem",
                    width: "fit-content",
                  }}
                >
                  <BiSolidUpArrow
                    onClick={() => {
                      if (sorting?.sort === "sortByProspect=asec") {
                        setSorting("")
                      } else {
                        setSorting({ sort: "sortByProspect=asec" })

                      }
                    }}
                    style={{ color: sorting?.sort === "sortByProspect=asec" ? "#00BD82" : "#777777", fontSize: "10px" }}
                  />
                  <BiSolidDownArrow
                    onClick={() => {
                      if (sorting?.sort === "sortByProspect=desc") {
                        setSorting("")
                      } else {
                        setSorting({ sort: "sortByProspect=desc" })

                      }
                      // setSorting({ sort:"sortByName=desc"})
                    }
                    }
                    style={{ color: sorting?.sort === "sortByProspect=desc" ? "#00BD82" : "#777777", fontSize: "10px" }}
                  />
                </div>
              </h6>
              <h6
                className={`col sort ${sortingInfo.sortedBy === "name" ? "select" : ""
                  }`}
                onClick={() => handleSort("name")}
              >
                <span className="text">Created</span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "0.8rem",
                    width: "fit-content",
                  }}
                >
                  <BiSolidUpArrow
                    onClick={() => {
                      if (sorting?.sort === "sortByCreatedAt=asec") {
                        setSorting("")
                      } else {
                        setSorting({ sort: "sortByCreatedAt=asec" })

                      }
                    }}
                    style={{ color: sorting?.sort === "sortByCreatedAt=asec" ? "#00BD82" : "#777777", fontSize: "10px" }}
                  />
                  <BiSolidDownArrow
                    onClick={() => {
                      if (sorting?.sort === "sortByCreatedAt=desc") {
                        setSorting("")
                      } else {
                        setSorting({ sort: "sortByCreatedAt=desc" })

                      }
                      // setSorting({ sort:"sortByName=desc"})
                    }
                    }
                    style={{ color: sorting?.sort === "sortByCreatedAt=desc" ? "#00BD82" : "#777777", fontSize: "10px" }}
                  />
                </div>
              </h6>
              {(user.role === "admin" ||
                user.permissions.includes("Edit Tag") ||
                user.permissions.includes("Delete Tag")) && (
                  <h6
                    className={`col sort ${sortingInfo.sortedBy === "name" ? "select" : ""
                      }`}
                    onClick={() => handleSort("name")}
                  >
                    <span className="text">Actions</span>
                    {/* <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "0.8rem",
                    width: "fit-content",
                  }}
                >
                  <BiSolidUpArrow
                    style={{ color: "#777777", fontSize: "10px" }}
                  />
                  <BiSolidDownArrow
                    style={{ color: "#777777", fontSize: "10px" }}
                  />
                </div> */}
                  </h6>
                )}
            </div>
            {["templatesData"]?.length === 0 && (
              <div className="row">
                <p className="error">No Record Found!</p>
              </div>
            )}
            <Droppable droppableId="table">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {filteredData.map((data, i) => (
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
                          <TableRow
                            data={data}
                            key={i}
                            onDelete={() => setSelectedDeleteId(data._id)}
                            onEdit={() => {
                              setSelectedEditId(data._id);
                              setIsEditModalOpen(true);
                              setSelectedEditName(data.name);
                              setSelectedEditColor(data.color);
                            }}
                            filteredData={filteredData}
                            user={user}
                          />
                          </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div className="right">
          <div className="top">
            {(user.role === "admin" ||
              user.permissions.includes("Create New Tag")) && (
                <button onClick={() => setIsAddNewModalOpen(true)}>
                  <AiOutlinePlus color="#012635" size={22} />
                  <span
                    className="text"
                    style={{
                      color: "#00BD82",
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      marginLeft: "0.5rem",
                      marginTop: "0.3rem",
                    }}
                  >
                    Add New Tag
                  </span>
                </button>
              )}
          </div>
        </div>
      </div>
      <Components.Common.DeleteModal
        onClose={() => setSelectedDeleteId("")}
        onOkay={() => {
          dispatch(deleteTag(selectedDeleteId));
          setSelectedDeleteId(null);
        }}
        open={Boolean(selectedDeleteId)}
        deleteItemName="tag"
      />

      <Components.Common.ModalTop open={isAddNewModalOpen} onClose={() => { }}>
        <AddNewTagModal
          onClose={() => setIsAddNewModalOpen(false)}
          setIsAddNewModalOpen={setIsAddNewModalOpen}
          availableTagsCount={availableTagsCount}
          filteredData={filteredData}
        />
      </Components.Common.ModalTop>
      <Components.Common.ModalTop open={isEditModalOpen} onClose={() => { }}>
        <EditTagModal
          onClose={() => setIsEditModalOpen(false)}
          setIsEditModalOpen={setIsEditModalOpen}
          selectedEditId={selectedEditId}
          selectedEditName={selectedEditName}
          selectedEditColor={selectedEditColor}
          filteredData={filteredData}
          sorting={sorting}
        />
      </Components.Common.ModalTop>
    </TagsStyled>
  );
};

export default Tags;

const TableRow = ({ data, onDelete, onEdit, filteredData, user }) => {
  const [isMouseHouseOnColors, setIsMouseHouseOnColors] = useState(false);
  const dispatch = useDispatch();
  const updateTagById = (color) => {
    let updatedData = { name: data.name, color: color };
    dispatch(updateTag(data._id, updatedData));
  };
  const usedColors = filteredData.map((obj) => obj.color);
  let remainingColors = ColorsArray.filter(
    (color) => !usedColors.includes(color)
  );

  return (
    <TableRowStyled className="row body">
      <div className="col tag">
        <div
          style={{
            background: data?.color,
            width: "fit-content",
            padding: "0px 8px",
            borderRadius: "12px",
            color: "white",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>
            <span style={{ fontSize: "12px", fontWeight: 500 }}>
              {data.name}
            </span>
          </p>
        </div>
      </div>

      <div className="col data">
        <p>
          <span className="text">{data?.prospect ? data.prospect : 0}</span>
        </p>
      </div>
      <div className="col data">
        <p>
          <span className="text">
            {/* {new Date(data.createdAt).toLocaleDateString()} */}
            {formatDate(data.createdAt)}
          </span>
        </p>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="col actions"
        onClick={(e) => e.stopPropagation()}
      >
        {(user.role === "admin" ||
          user.permissions.includes("Edit Tag") ||
          user.permissions.includes("Delete Tag")) &&
          data?._id?.toString() !==
          import.meta.env.VITE_APP_FRONTEND_EXPIRED_DRIP_TAG_ID && (
            <>
              {" "}
              {(user.role === "admin" ||
                user.permissions.includes("Edit Tag")) && (
                  <LightTooltip arrow title="Edit">
                    <button
                      style={{ display: data.name == "Expired" ? "none" : "" }}
                      onClick={() => {
                        onEdit(data._id);
                      }}
                    >
                      <FaPen />
                    </button>
                  </LightTooltip>
                )}
              {(user.role === "admin" ||
                user.permissions.includes("Delete Tag")) && (
                  <LightTooltip arrow title="Delete">
                    <button
                      style={{ display: data.name == "Expired" ? "none" : "" }}
                      onClick={() => {
                        onDelete(data._id);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </LightTooltip>
                )}
            </>
          )}
      </div>
    </TableRowStyled>
  );
};

const AddNewTagModal = ({
  onClose,
  setIsAddNewModalOpen,
  availableTagsCount,
  filteredData,
}) => {
  const usedColors = filteredData.map((obj) => obj.color);
  let remainingColors = ColorsArray.filter(
    (color) => !usedColors.includes(color)
  );
  const [selectedColor, setSelectedColor] = useState("#003d4c");
  const [selectedColorOpen, setSelectedColorOpen] = useState(false);
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const addNewTag = () => {
    let data = { name: name, color: selectedColor };
    dispatch(addTag(data));
    setIsAddNewModalOpen(false);
  };
  // console.log("used color" , usedColors , "other check" ,remainingColors);
  useEffect(() => {
    setSelectedColor(remainingColors[0]);
  }, []);
  const colorOptions = [
    { value: "#003d4c", label: "Red" },
    { value: "#bb2100", label: "Green" },
    { value: "#f92c00", label: "Blue" },
    { value: "#0662b5", label: "Yellow" },

    { value: "#008f6c", label: "Red" },
    { value: "#29c8ff", label: "Green" },
    { value: "#b285d1", label: "Blue" },
    { value: "#ff9d88", label: "Yellow" },

    { value: "#ff854c", label: "Red" },
    { value: "#acccf3", label: "Green" },
    { value: "#48a0ff", label: "Blue" },
    { value: "#65d289", label: "Yellow" },
  ];

  return (
    <AddNewTagModalStyled>
      <div className="top">
        <h2 className="left">
          <span className="text">Create new tag</span>
        </h2>
        <div className="right" onClick={onClose} style={{ cursor: "pointer" }}>
          <IoMdClose size={33} />
        </div>
      </div>
      <div className="bottom">
        <label className="row1">
          <div className="right input">
            <span className="text">
              Label <span style={{ color: "red" }}>*</span>{" "}
            </span>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              maxLength={20}
            />
          </div>
        </label>
        <label className="row2">
          <div className="right input">
            <span className="text">Color</span>
            <div>
              {/* <div className="InputColor"> */}
              {/* <div style={{ background: selectedColor }} className="SelectedColor"></div>
                <IoChevronDown size={22} color="#012635" /> */}
              {/* <input
                  onChange={(e) => setSelectedColor(e.target.value)}
                  type="color"
                /> */}

              <div style={{ position: "relative", width: "100%" }}>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  style={{
                    padding: "10px 12px",
                    border: "1px solid #D3D7DD",
                    borderRadius: "8px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    height: "43px",
                    marginTop: "3px",
                  }}
                >
                  {/* <GoDotFill
                      style={{
                        color: selectedColor,
                        marginRight: "8px",
                        fontSize: "24px",
                      }}
                    /> */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: `solid 4px ${selectedColor} `,
                      backgroundColor: selectedColor,
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      justifyContent: "center",
                    }}
                  ></div>
                  <IoIosArrowDown />
                </div>

                {isOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      backgroundColor: "white",
                      border: "1px solid #D3D7DD",
                      borderRadius: "8px",
                      marginTop: "4px",
                      zIndex: "1000",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      maxHeight: "42vh",
                      overflow: "auto",
                    }}
                  >
                    {remainingColors.map((option) => (
                      <div
                        key={option}
                        onClick={() => {
                          setSelectedColor(option);
                          setIsOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "8px 12px",
                          cursor: "pointer",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            border: `solid 4px ${option} `,
                            backgroundColor:
                              option == selectedColor ? "white" : option,
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            justifyContent: "center",
                          }}
                        >
                          {/* <GoDotFill
                            style={{
                              color:option.value == selectedColor ? "white" : option.value,
                              
                              width:"12px",
                              height:"12px"
                            }}
                          /> */}
                        </div>
                        <IoCheckmarkOutline
                          size={24}
                          style={{
                            position: "absolute",
                            right: 15,
                            color: "#00bd82",
                            display: option == selectedColor ? "block" : "none",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* </div> */}
            </div>
          </div>
        </label>
      </div>

      <label className="footer">
        <div style={{ color: "#777777" }} className="left">
          Available {remainingColors.length}
        </div>
        <div className="right buttons">
          <button type="button" className="closeBtn" onClick={onClose}>
            Cancel
          </button>

          <button
            disabled={name == "" ? true : false}
            type="submit"
            className="SubmitBtn"
            onClick={addNewTag}
          >
            Submit
          </button>
        </div>
      </label>
    </AddNewTagModalStyled>
  );
};

const EditTagModal = ({
  onClose,
  setIsEditModalOpen,
  selectedEditId,
  selectedEditName,
  selectedEditColor,
  filteredData,
  sorting
}) => {
  const [selectedColorOpen, setSelectedColorOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(selectedEditColor);
  const [name, setName] = useState(selectedEditName);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const usedColors = filteredData.map((obj) => obj.color);
  let remainingColors = ColorsArray.filter(
    (color) => !usedColors.includes(color)
  );
  const updateTagById = () => {
    let data = { name: name, color: selectedColor };
    dispatch(updateTag(selectedEditId, data , ()=> dispatch(getAllTagsList("", "", "", sorting))));
    setIsEditModalOpen(false);
  };
    

  useEffect(() => {
    if(selectedEditColor){
      setSelectedColor(selectedEditColor);
    }else{
      setSelectedColor(remainingColors[0]);

    }

  }, []);

 
  
  return (
    <AddNewTagModalStyled>
      <div className="top">
        <h2 className="left">
          <span className="text">{name ? "Edit tag" : "Create new tag"}</span>
        </h2>
        <div className="right" onClick={onClose} style={{ cursor: "pointer" }}>
          <IoMdClose size={33} />
        </div>
      </div>
      <div className="bottom">
        <label className="row1">
          <div className="right input">
            <span className="text">Label</span>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              maxLength={20}
            />
          </div>
        </label>
        <label className="row2">
          <div className="right input">
            <span className="text">Color</span>
            <div>
            
              <div>
               

                <div style={{ position: "relative", width: "100%" }}>
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                      padding: "10px 12px",
                      border: "1px solid #D3D7DD",
                      borderRadius: "8px",
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      height: "43px",
                      marginTop: "3px",
                    }}
                  >
                    {/* <GoDotFill
                      style={{
                        color: selectedColor,
                        marginRight: "8px",
                        fontSize: "24px",
                      }}
                    /> */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: `solid 4px ${selectedColor} `,
                        backgroundColor: selectedColor,
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        justifyContent: "center",
                      }}
                    ></div>
                    <IoIosArrowDown />
                  </div>

                  {isOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        backgroundColor: "white",
                        border: "1px solid #D3D7DD",
                        borderRadius: "8px",
                        marginTop: "4px",
                        zIndex: "1000",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        maxHeight: "42vh",
                        overflow: "auto",
                      }}
                    >
                      {!name ? remainingColors.map((option) => (
                        <div
                          key={option}
                          onClick={() => {
                            setSelectedColor(option);
                            setIsOpen(false);
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "8px 12px",
                            cursor: "pointer",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              border: `solid 4px ${option} `,
                              backgroundColor:
                                option == selectedColor ? "white" : option,
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              justifyContent: "center",
                            }}
                          >
                            {/* <GoDotFill
                            style={{
                              color:option.value == selectedColor ? "white" : option.value,
                              
                              width:"12px",
                              height:"12px"
                            }}
                          /> */}
                          </div>
                          <IoCheckmarkOutline
                            size={24}
                            style={{
                              position: "absolute",
                              right: 15,
                              color: "#00bd82",
                              display:
                                option == selectedColor ? "block" : "none",
                            }}
                          />
                        </div>
                      )) : ColorsArray.map((option) => (
                        <div
                          key={option}
                          onClick={() => {
                            setSelectedColor(option);
                            setIsOpen(false);
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "8px 12px",
                            cursor: "pointer",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              border: `solid 4px ${option} `,
                              backgroundColor:
                                option == selectedColor ? "white" : option,
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              justifyContent: "center",
                            }}
                          >
                            {/* <GoDotFill
                            style={{
                              color:option.value == selectedColor ? "white" : option.value,
                              
                              width:"12px",
                              height:"12px"
                            }}
                          /> */}
                          </div>
                          <IoCheckmarkOutline
                            size={24}
                            style={{
                              position: "absolute",
                              right: 15,
                              color: "#00bd82",
                              display:
                                option == selectedColor ? "block" : "none",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* </div> */}
              </div>
              {selectedColorOpen && (
                <div className="AbsoluteColor">
                  {remainingColors.map((color, index) => (
                    <div
                      onClick={() => {
                        setSelectedColor(color);
                        setSelectedColorOpen(false);
                      }}
                      className="AbsoluteColorinner"
                    >
                      <div
                        key={index}
                        style={{ background: color }}
                        className="SelectedColor"
                      ></div>

                      {selectedColor == color && (
                        <IoCheckmark color="#00BD82" size={22} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </label>
      </div>

      <label className="footer">
        <div style={{ color: "#777777" }} className="left">
          Available {remainingColors.length}
        </div>
        <div className="right buttons">
          <button type="button" className="closeBtn" onClick={onClose}>
            Cancel
          </button>
          {/* <Components.Common.ButtonRightIcon
          disabled={!name}
          text={"Add Tag"}
          icon={<FaTag />}
          type="submit"
          onClick={addNewTag}
        /> */}
          <button type="submit" className="SubmitBtn" onClick={updateTagById}>
            Submit
          </button>
        </div>
      </label>
    </AddNewTagModalStyled>
  );
};
