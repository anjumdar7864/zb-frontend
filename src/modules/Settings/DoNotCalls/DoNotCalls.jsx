import React, { useState, useEffect, useMemo, useLayoutEffect, useRef } from "react";
import {
  FaPen,
  FaFileUpload,
  FaPlus,
  FaSearch,
  FaTag,
  FaTrash,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, styled } from "@mui/material";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import Papa from "papaparse";
import { toast } from "react-hot-toast";
import { SortIcon } from "@/components/common";
import Assets from "@/assets";
import Components from "@/components";
import {
  DoNotCallsStyled,
  TableRowStyled,
  AddNewDncModalStyled,
  ImportModalStyled,
  FileReadingModalStyled,
  MatchingModalStyled,
  InitialTemplateStyled,
} from "./styles";
import {
  addNewDnc,
  deleteDNC,
  GetAllDNC,
  updateDnc,
  clearErrors,
  clearMessages,
  getSingleDnc,
  exportDnc,
  importDnc,
} from "@/store/actions";
import { dncSchema } from "@/schema";
import { useFormik } from "formik";
import { BsFiletypeXls, BsFillPlusCircleFill } from "react-icons/bs";
import * as XLSX from "xlsx/xlsx.mjs";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import PaginationDropDown from "../Pagination/PaginationDropDown";
import PaginationComp from "../Pagination/Pagination";
import PhoneInput from "react-phone-input-2";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

const LightTooltip = styled(Components.Common.LightTooltip)`
  & > .MuiTooltip-tooltip {
    text-align: center;
    max-width: 20rem;
  }
`;

const DoNotCalls = () => {
  const [searchText, setSearchText] = useState("");
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState("");
  const [selectedEditId, setSelectedEditId] = useState("");
  const [selectedEditDnc, setSelectedEditDnc] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [fileData, setFileData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [isHovered, setHovered] = useState(false);
  const [isHovered2, setHovered2] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfRowsShowing, setNumberOfRowsShowing] = useState(10);
  const [isFileReadingModalOpen, setIsFileReadingModalOpen] = useState(false);
  const [sorting , setSorting] = useState("")
  const [isMatchingFieldModalOpen, setIsMatchingFieldModalOpen] =
    useState(false);
  const [isFileSendingModalOpen, setIsFileSendingModalOpen] = useState(false);
  const [mappedData, setMappedData] = useState({});
  const [sortingInfo, setSortingInfo] = useState({
    direction: 0,
    sortedBy: "",
  });
  const dispatch = useDispatch();
  const doNotCalls = useSelector((state) => state.dncReducer);
  useEffect(() => {
    if (searchText) {
      dispatch(GetAllDNC(searchText, currentPage, numberOfRowsShowing , sorting));
    } else {
      dispatch(GetAllDNC("", currentPage, numberOfRowsShowing , sorting));
    }
  }, [currentPage, numberOfRowsShowing, searchText , sorting]);

  const user = JSON.parse(
    localStorage.getItem("user") ?? localStorage.getItem("user") ?? "{}"
  );

  useEffect(() => {
    if (doNotCalls.errors?.length > 0) {
      toast.error(doNotCalls.errors);
      dispatch(clearErrors());
    }
    if (doNotCalls.message !== "") {
      toast.success(doNotCalls.message);
      dispatch(clearMessages());
    }
  }, [doNotCalls.errors, doNotCalls.message]);

  useEffect(() => {
    setFilteredData(doNotCalls?.["results"]);
  }, [doNotCalls, searchText]);

  const handleSort = (sortedBy) => {
    if (sortedBy == "firstName" || sortedBy == "flastName") {
      setFilteredData(
        filteredData.sort((a, b) => {
          // Separate numeric and non-numeric values
          const getNumber = (str) => {
            const match = str?.match(/\d+/);
            return match ? parseInt(match[0]) : NaN;
          };
          const prefixA = (a?.[sortedBy]?.toLowerCase()?.match(/\D+/) || [])[0];
          const prefixB = (b?.[sortedBy]?.toLowerCase()?.match(/\D+/) || [])[0];

          if (sortingInfo.direction === 1) {
            if (prefixA !== prefixB) {
              return prefixA?.localeCompare?.(prefixB?.toLowerCase());
            }
            return (
              getNumber(a?.[sortedBy]?.toLowerCase()) -
              getNumber(b?.[sortedBy]?.toLowerCase())
            );
          } else {
            if (prefixA !== prefixB) {
              return prefixB?.localeCompare?.(prefixA?.toLowerCase());
            }
            return (
              getNumber(b?.[sortedBy]?.toLowerCase()) -
              getNumber(a?.[sortedBy]?.toLowerCase())
            );
          }
        })
      );
    } else if (sortedBy === "number" || sortedBy == "permanent") {
      setFilteredData(
        filteredData.sort((a, b) => {
          if (sortingInfo.direction === 1) {
            return a[sortedBy] - b[sortedBy];
          }
          return b[sortedBy] - a[sortedBy];
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

  const parseCSV = (content) => {
    setIsFileReadingModalOpen(true);
    Papa.parse(content, {
      header: true,
      complete: (result) => {
        setIsFileReadingModalOpen(false);
        // checking empty file
        if (result.data?.length === 0) {
          toast.error("You can't upload an empty file!");
          return;
        }
        if (
          result.data?.length === 1 &&
          result?.data[0][Object?.keys(result?.data[0])[0]] === ""
        ) {
          toast.error("You can't upload an empty file!");
          return;
        }
        // checking empty file
        // checking exceeding file size
        if (result.data?.length > 100001) {
          toast.error("Limit exceed!");
          return;
        }

        if (
          result.data?.length === 100001 &&
          result?.data[100000][Object?.keys(result?.data[100000])[0]] !== ""
        ) {
          toast.error("Limit exceed!");
          return;
        }
        // checking exceeding file size
        setFileData(result.data);
        setIsMatchingFieldModalOpen(true);
      },
      error: () => toast.error("Something went wrong while parsing!"),
    });
  };

  const setXLSXandXLS = (content) => {
    // checking empty file
    if (content?.length === 0) {
      toast.error("You can't upload an empty file!");
      return;
    }
    if (
      content?.length === 1 &&
      content[0][Object?.keys(content[0])[0]] === ""
    ) {
      toast.error("You can't upload an empty file!");
      return;
    }
    // checking empty file
    // checking exceeding file size
    if (content?.length > 100001) {
      toast.error("Limit exceed!");
      return;
    }

    if (
      content?.length === 100001 &&
      content[100000][Object?.keys(content[100000])[0]] !== ""
    ) {
      toast.error("Limit exceed!");
      return;
    }
    // checking exceeding file size
    setFileData(content);
    setIsMatchingFieldModalOpen(true);
  };

  const handleSubmit = (e) => e.preventDefault();

  const handleMouseOver = () => {
    setHovered(true);
  };

  const handleMouseOut = () => {
    setHovered(false);
  };



  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleLimitChange = (event) => {
    const newLimit = Number(event.target.value);
    setNumberOfRowsShowing(newLimit);
    setCurrentPage(1);
  };
  const { singleDnc } = useSelector((state) => state.dncReducer);

  useEffect(() => {
    if (selectedEditId) {
      dispatch(getSingleDnc(selectedEditId));
    }
  }, [selectedEditId]);


  const formik = useFormik({
    initialValues: { number: "" },
    validationSchema: dncSchema,
    onSubmit: (values) => {
      let { number } = values;
      number = number.replace(/\D/g, "");
      let finalResult = { number: number };
      dispatch(addNewDnc(finalResult));
      setIsAddNewModalOpen(false);
      setAddNew(false)
    },
  });

  const handlePhoneChange = (e) => {
    const inputValue = e;
    const formattedValue = inputValue.replace(/\D/g, "").slice(0, 11);
    const countryCode = formattedValue[0];
    const phoneNumber = formattedValue.slice(1);
    let formattedNumber = `${countryCode} `;

    for (let i = 0; i < phoneNumber?.length; i++) {
      if (i === 0) formattedNumber += "(";
      else if (i === 3) formattedNumber += ") ";
      else if (i === 6) formattedNumber += "-";
      formattedNumber += phoneNumber[i];
    }

    formik.setFieldValue("number", formattedNumber);
  };
  const [addNew, setAddNew] = useState(false)


  return (
    <InitialTemplateStyled style={{ paddingBottom: "40px" }}>
      <div className="top">
        <div className="left">
          <div className="right">
            <form className="bottom" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search for a user"
                name="search"
                value={searchText}
                autoComplete="off"
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button>
                <IoSearchOutline size={22} color="#012635" />
              </button>
            </form>
          </div>
          <div className="left">
            {(user.role === 'admin' || user.permissions.includes('Export New DNC List')) && user?.subscriptionId !== "6744617ea4d142ed16ea9c9e" && (
              <button
                onClick={() => dispatch(exportDnc())}
                onMouseOver={() => handleMouseOver()}
                onMouseOut={() => handleMouseOut()}
                disabled={doNotCalls?.exportLoading}
                style={{
                  padding: "1rem",
                  border: "1px solid #34bfa3",
                  color: isHovered ? "white" : "#34bfa3",
                  borderRadius: "0.8rem",
                  backgroundColor: isHovered ? "#34bfa3" : "",
                  marginLeft: "0.8rem"
                }}
              >
                <span className="text" >
                  Export To Excel
                </span>
              </button>
            )}
          </div>
        </div>
        <div className="right">
          <div className="top">
            {(user.role === 'admin' || user.permissions.includes('Create New DNC')) && (
              <button
                onClick={() => setIsAddNewModalOpen(true)}
                onMouseOver={() => setHovered2(true)}
                onMouseOut={() => setHovered2(false)}
                style={{
                  backgroundColor: isHovered2 ? "#00bd82" : "transparent",
                  border: isHovered2 ? "" : "1px solid #00bd82",
                }}
              >
                <span
                  className="icon"
                  style={{ color: isHovered2 ? "white" : "#00bd82" }}
                >
                  <FaPlus />
                </span>

                <span
                  className="text"
                  style={{ color: isHovered2 ? "white" : "#00bd82" }}
                >
                  Create New DNC
                </span>

              </button>)}
          </div>
          <div className="top">
            {(user.role === 'admin' || user.permissions.includes('Import or Drag & Drop DNC List')) && (
              <button onClick={() => setIsImportModalOpen(true)}>
                <span className="icon">
                  <FaPlus />
                </span>
                <span className="text">Import New DNC</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={{ padding: 30, flexGrow: 1, display: "flex", flexDirection: "column" }} className="divOverlay">
        <div style={{ flexGrow: 1, overflow: addNew ? "unset" : 'auto', borderBottomRightRadius: "0px", borderBottomLeftRadius: "0px" }} className="bottom">
          <div className="table">
            <div className="row" style={{ position: "sticky", top: "0px", zIndex: 100, backgroundColor: "white", borderBottom: "1.5px solid #80808052" }}>
              <h6 className="col sort" onClick={() => handleSort("number")}>
                <span className="text">Mobile number</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <BiSolidUpArrow
                   onClick={() =>{
                    if(sorting?.sort === "sortByNumber=asec"){
                      setSorting("")
                    }else{
                      setSorting({sort:"sortByNumber=asec"})
  
                    }
                    }}
                    style={{ color:sorting?.sort === "sortByNumber=asec" ? "#00BD82" : "#777777", fontSize: "10px" , cursor:"pointer" }}
                  />
                  <BiSolidDownArrow
                   onClick={() =>{
                    if(sorting?.sort === "sortByNumber=desc"){
                      setSorting("")
                    }else{
                      setSorting({sort:"sortByNumber=desc"})
  
                    }
                    // setSorting({ sort:"sortByNumber=desc"})
                  }
                  }
                    style={{ color:sorting?.sort === "sortByNumber=desc" ? "#00BD82" : "#777777", fontSize: "10px" ,  cursor:"pointer" }}
                  />
                </div>
              </h6>
              <h6 className="col sort" onClick={() => handleSort("firstName")}>
                <span className="text">First Name</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <BiSolidUpArrow
                   onClick={() =>{
                    if(sorting?.sort === "sortByFirstName=asec"){
                      setSorting("")
                    }else{
                      setSorting({sort:"sortByFirstName=asec"})
  
                    }
                    }}
                    style={{ color:sorting?.sort === "sortByFirstName=asec" ? "#00BD82" : "#777777", fontSize: "10px" , cursor:"pointer" }}
                  />
                  <BiSolidDownArrow
                   onClick={() =>{
                    if(sorting?.sort === "sortByFirstName=desc"){
                      setSorting("")
                    }else{
                      setSorting({sort:"sortByFirstName=desc"})
  
                    }
                    // setSorting({ sort:"sortByFirstName=desc"})
                  }
                  }
                    style={{ color:sorting?.sort === "sortByFirstName=desc" ? "#00BD82" : "#777777", fontSize: "10px" , cursor:"pointer" }}
                  />
                </div>
              </h6>
              <h6 className="col sort" onClick={() => handleSort("flastName")}>
                <span className="text">Last Name</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <BiSolidUpArrow
                   onClick={() =>{
                    if(sorting?.sort === "sortByLastName=asec"){
                      setSorting("")
                    }else{
                      setSorting({sort:"sortByLastName=asec"})
  
                    }
                    }}
                    style={{ color:sorting?.sort === "sortByLastName=asec" ? "#00BD82" : "#777777", fontSize: "10px",cursor:"pointer" }}
                  />
                  <BiSolidDownArrow
                   onClick={() =>{
                    if(sorting?.sort === "sortByLastName=desc"){
                      setSorting("")
                    }else{
                      setSorting({sort:"sortByLastName=desc"})
  
                    }
                    // setSorting({ sort:"sortByLastName=desc"})
                  }
                  }
                    style={{ color:sorting?.sort === "sortByLastName=desc" ? "#00BD82" : "#777777", fontSize: "10px" , cursor:"pointer" }}
                  />
                </div>
              </h6>
              <h6 className="col sort" onClick={() => handleSort("permanent")}>
                <span className="text">Permanent</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <BiSolidUpArrow
                   onClick={() =>{
                    if(sorting?.sort === "sortByPermanent=asec"){
                      setSorting("")
                    }else{
                      setSorting({sort:"sortByPermanent=asec"})
  
                    }
                    }}
                    style={{ color:sorting?.sort === "sortByPermanent=asec" ? "#00BD82" : "#777777", fontSize: "10px" , cursor:"pointer" }}
                  />
                  <BiSolidDownArrow
                   onClick={() =>{
                    if(sorting?.sort === "sortByPermanent=desc"){
                      setSorting("")
                    }else{
                      setSorting({sort:"sortByPermanent=desc"})
  
                    }
                    // setSorting({ sort:"sortByPermanent=desc"})
                  }
                  }
                    style={{ color:sorting?.sort === "sortByPermanent=desc" ? "#00BD82" : "#777777", fontSize: "10px" , cursor:"pointer" }}
                  />
                </div>
              </h6>
              {(user.role === 'admin' || user.permissions.includes('DNC Number Edit/Delete option')) && (
                <h6  className="col sort" onClick={() => handleSort("number")}>
                  <span className="text">Actions</span>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <BiSolidUpArrow
                      style={{ color: "#777777", fontSize: "10px" }}
                    />
                    <BiSolidDownArrow
                      style={{ color: "#777777", fontSize: "10px" }}
                    />
                  </div>
                </h6>)}
            </div>
            {filteredData.length === 0 && (
              <div className="row body">
                <p className="error">No Record Found!</p>
              </div>
            )}
            {addNew &&
              <TableRowCreate handlePhoneChange={handlePhoneChange} />
            }
            {filteredData?.map((data, i) => (
              <TableRow
                handlePhoneChange={handlePhoneChange}
                formik={formik}
                data={data}
                key={i}
                onDelete={() => setSelectedDeleteId(data?._id)}
                selectedEditId={selectedEditId}
                onEdit={() => {
                  setSelectedEditId(data?._id);
                  setIsEditModalOpen(true);
                  setSelectedEditDnc(data?.number);
                }}
                // onEditClose={() => {
                //   setSelectedEditId();
                //   setSelectedEditDnc();
                // }}
                filteredData={filteredData}
                user={user}
              />
            ))}


          </div>

        </div>

        <div
          style={{
            position: "sticky",
            bottom: "0px",
            display: "flex",
            justifyContent: "space-between",
            height: "56px",
            backgroundColor: "white",
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px",
            borderTop: "0px",
            padding: "0px 16px",
            alignItems: "center",
            paddingTop: "10px ",
            paddingBottom: "10px",
            border: "1.5px solid #80808052",
          }}
        >
          <div>Total: {doNotCalls?.totalResults ?? 0}</div>

          <PaginationComp
            totalPages={doNotCalls?.totalPages || 1}
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
            <PaginationDropDown limit={numberOfRowsShowing} onLimitChange={handleLimitChange} />
          </div>
        </div>
        {(user.role === 'admin' || user.permissions.includes('Create New DNC')) && (
          !addNew ?
            <div className="right">
              <div className="top">
                <button onClick={() => setAddNew(true)}>
                  <AiOutlinePlus color="#012635" size={22} />
                  <span className="text" style={{ color: "#00BD82", fontSize: "1.3rem", fontWeight: 500, marginLeft: "0.5rem", marginTop: "0.3rem" }}>Create New DNC</span>
                </button>
              </div>
            </div>
            :
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', paddingTop: 30 }}>
              <button onClick={() => setAddNew(false)} style={{
                background: 'transparent',
                border: '1px solid #00BD82',
                paddingInline: 50,
                paddingBlock: 10,
                borderRadius: 8,
                color: "#00BD82"
              }}>Cancel</button>
              <button
                disabled={!formik.isValid || !formik.dirty} type="submit" onClick={formik.handleSubmit}
                style={{
                  background: '#00BD82',
                  border: '1px solid #00BD82',
                  paddingInline: 50,
                  paddingBlock: 10,
                  borderRadius: 8,
                  color: "white",
                  marginLeft: 10
                }}>Add</button>
            </div>

        )}
      </div>

      <Components.Common.DeleteModal
        onClose={() => setSelectedDeleteId("")}
        onOkay={() => {
          dispatch(deleteDNC(selectedDeleteId));
          setSelectedDeleteId(null);
        }}
        open={Boolean(selectedDeleteId)}
        deleteItemText="This phone number will be removed from your DNC List. Continue?"
      />

      <Components.Common.ModalTop open={isAddNewModalOpen} onClose={() => { }}>
        <AddNewDncModal
          onClose={() => setIsAddNewModalOpen(false)}
          setIsAddNewModalOpen={setIsAddNewModalOpen}
          filteredData={filteredData}
        />
      </Components.Common.ModalTop>

      <Components.Common.ModalTop open={isEditModalOpen} onClose={() => { }}>
        <EditDncModal
          onClose={() => setIsEditModalOpen(false)}
          setIsEditModalOpen={setIsEditModalOpen}
          selectedEditId={selectedEditId}
          selectedEditDnc={selectedEditDnc}
        />
      </Components.Common.ModalTop>

      <Components.Common.ModalTop open={isImportModalOpen} onClose={() => { }}>
        <ImportModal
          onClose={(fileContent, type, fileName) => {
            if (fileContent && type === "csv") {
              parseCSV(fileContent);
              setFileName(fileName);
            }
            if ((fileContent && type === "xlsx") || type === "xls") {
              setXLSXandXLS(fileContent);
              setFileName(fileName);
            }
            setIsImportModalOpen(false);
          }}
        />
      </Components.Common.ModalTop>

      <Components.Common.ModalTop
        open={isMatchingFieldModalOpen}
        onClose={() => { }}
      >
        <MatchingModal
          fileData={fileData}
          onClose={(mappedData) => {
            if (mappedData) {
              setMappedData(mappedData);
              setIsFileSendingModalOpen(true);
            }
            setIsMatchingFieldModalOpen(false);
          }}
        />
      </Components.Common.ModalTop>

      <Components.Common.ModalTop
        open={isFileReadingModalOpen}
        onClose={() => { }}
      >
        <FileReadingModal />
      </Components.Common.ModalTop>

      <Components.Common.ModalTop
        open={isFileSendingModalOpen}
        onClose={() => { }}
      >
        <FileSendingModal
          mappedData={mappedData}
          fileData={fileData}
          fileName={fileName}
          onClose={(body) => {
            if (body) {
              dispatch(importDnc(body));
            }
            setIsFileSendingModalOpen(false);
          }}
        />
      </Components.Common.ModalTop>
    </InitialTemplateStyled>
  );
};

export default DoNotCalls;

const TableRow = ({ data, onDelete, onEdit, selectedEditId, onEditClose, formik, user }) => {
  return (
    <TableRowStyled className="row body" style={{ backgroundColor: selectedEditId == data._id ? '#F7F7F7' : '#fff' }}>
      <div className="col data" style={{ paddingLeft: 0 }}>
        <span className="text">
          {/* {data?.number &&
            data.number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")} */}
          {/* {data?.number && data.number} */}
          <PhoneInput
            searchPlaceholder="Search here"
            enableSearch={true}
            
            value={`1 ${data?.number}`}
            inputStyle={{ fontFamily: 'fellix', color: '#777777' }}
            maxLength={14}
            disabled={true}
            disableDropdown={true}
          />
        </span>
      </div>
      <div className="col data">
        <p>{data?.firstName && data.firstName}</p>
      </div>
      <div className="col data">
        <p>{data?.lastName && data.lastName}</p>
      </div>
      {data?.permanent ? (
        <div className="col data">
          <p
            style={{
              backgroundColor: "#f9dfe2",
              padding: "0.5rem 2.3rem",
              borderRadius: "2rem",
              color: "#e25d6f",
              width: 'fit-content',
              border: "1px solid #e25d6f"
            }}
          >
            Yes
          </p>
        </div>
      ) : (
        <div className="col data">
          <p
            style={{
              backgroundColor: "#dff2ed",
              padding: "0.5rem 2.3rem",
              borderRadius: "2rem",
              color: "#60bca5",
              width: 'fit-content',
              border: "1px solid #60bca5"
            }}
          >
            No
          </p>
        </div>
      )}
      <div className="col actions" onClick={(e) => e.stopPropagation()}>
        {(user.role === 'admin' || user.permissions.includes('DNC Number Edit/Delete option')) && !data.permanent && (
          <>
            <LightTooltip arrow title="Edit">
              <button onClick={() => onEdit()}>
                <FaPen color="#777777" />
              </button>
            </LightTooltip>
            <LightTooltip arrow title="Delete">
              <button onClick={() => onDelete(data._id)}>
                <FaTrash color="#777777" />
              </button>
            </LightTooltip>
          </>
        )}
      </div>
    </TableRowStyled>
  );
};

const TableRowCreate = ({ handlePhoneChange }) => {
  const phoneInputRef = useRef(null);

  useEffect(() => {
    if (phoneInputRef.current) {
      // Find the input element within the PhoneInput component
      const inputElement = phoneInputRef.current.querySelector('input');
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, []);
  return (
    <TableRowStyled className="row body" style={{ backgroundColor: '#fff' }}>
      <div className="col data" style={{ paddingLeft: 0 }}>
        <span ref={phoneInputRef} className="text">
          <PhoneInput
         
            country={'us'}
            placeholder="Enter Mobile Number"
            searchPlaceholder="Search here"
            enableSearch={true}
            inputStyle={{ fontFamily: 'fellix', color: '#777777' , border: "1px solid #777777" }}
            onChange={(e) => handlePhoneChange(e)}
            maxLength={14}
            disableDropdown={true}

          />
        </span>
      </div>
      <div className="col data">
        <p></p>
      </div>
      <div className="col data">
        <p></p>
      </div>
      <div className="col data">
        <p></p>
      </div>
      <div className="col actions" onClick={(e) => e.stopPropagation()}>
        <p></p>
      </div>
    </TableRowStyled>
  );
};

const AddNewDncModal = ({ onClose, setIsAddNewModalOpen }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { number: "" },
    validationSchema: dncSchema,
    onSubmit: (values) => {
      let { number } = values;
      number = number.replace(/\D/g, "");
      let finalResult = { number: number };
      dispatch(addNewDnc(finalResult));
      setIsAddNewModalOpen(false);
    },
  });

  const handlePhoneChange = (e) => {
    const inputValue = e;
    const formattedValue = inputValue.replace(/\D/g, "").slice(0, 11);
    const countryCode = formattedValue[0];
    const phoneNumber = formattedValue.slice(1);
    let formattedNumber = `${countryCode} `;

    for (let i = 0; i < phoneNumber?.length; i++) {
      if (i === 0) formattedNumber += "(";
      else if (i === 3) formattedNumber += ") ";
      else if (i === 6) formattedNumber += "-";
      formattedNumber += phoneNumber[i];
    }

    formik.setFieldValue("number", formattedNumber);


    // const formattedValue = inputValue.replace(/\D/g, "").slice(0, 10);

    // let formattedNumber = "";
    // for (let i = 0; i < formattedValue?.length; i++) {
    //   if (i === 0) formattedNumber += "(";
    //   else if (i === 3) formattedNumber += ") ";
    //   else if (i === 6) formattedNumber += "-";
    //   formattedNumber += formattedValue[i];
    // }

    // formik.setFieldValue("number", formattedNumber);
  };

  return (
    <AddNewDncModalStyled>
      <div className="top">
        <h2 className="left">
          <span className="text">Add DNC Number</span>
        </h2>
        <div onClick={onClose} style={{ cursor: 'pointer' }}>
          <IoCloseOutline size={32} />
        </div>
      </div>
      <form className="bottom">
        <div className="left">
          <span className="text">Enter Mobile Number</span>
        </div>
        <div className="right input">
          <PhoneInput
            country={'us'}
            placeholder="Enter Mobile Number"
            inputStyle={{ fontFamily: 'fellix', color: '#777777' }}
            onChange={(e) => handlePhoneChange(e)}
            maxLength={14}
            disableDropdown={true}
          />
          {formik.touched.number && formik.errors.number && (
            <p style={{ color: "red" }}>{formik.errors.number}</p>
          )}
        </div>
      </form>

      <div className="bottom2">
        <button className="btn1" type="button" onClick={onClose}>
          Cancel
        </button>

        <button className="btn2" disabled={!formik.isValid || !formik.dirty} type="submit" onClick={formik.handleSubmit}>
          Save
        </button>
      </div>
    </AddNewDncModalStyled>
  );
};

const EditDncModal = ({
  onClose,
  setIsEditModalOpen,
  selectedEditId,
  selectedEditDnc,
}) => {
  const dispatch = useDispatch();
  const { singleDnc } = useSelector((state) => state.dncReducer);

  useEffect(() => {
    if (selectedEditId) {
      dispatch(getSingleDnc(selectedEditId));
    }
  }, [selectedEditId]);

  const formik = useFormik({
    initialValues: {
      number: singleDnc?.number
        ? `1 ${singleDnc.number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}`
        : "",
    },
    enableReinitialize: true,
    validationSchema: dncSchema,
    onSubmit: (values) => {
      let { number } = values;
      number = number.replace(/\D/g, "");
      let finalResult = { number: number };
      dispatch(updateDnc(selectedEditId, finalResult));
      setIsEditModalOpen(false);
    },
  });

  const handlePhoneChange = (e) => {
    const inputValue = e;
    const formattedValue = inputValue.replace(/\D/g, "").slice(0, 11);
    const countryCode = formattedValue[0];
    const phoneNumber = formattedValue.slice(1);
    let formattedNumber = `${countryCode} `;

    for (let i = 0; i < phoneNumber?.length; i++) {
      if (i === 0) formattedNumber += "(";
      else if (i === 3) formattedNumber += ") ";
      else if (i === 6) formattedNumber += "-";
      formattedNumber += phoneNumber[i];
    }
    formik.setFieldValue("number", formattedNumber);
  };
  return (
    <AddNewDncModalStyled>
      <div className="top">
        <h2 className="left">
          <span className="text">Edit DNC Number</span>
        </h2>
        <div onClick={onClose} style={{ cursor: 'pointer' }}>
          <IoCloseOutline size={32} />
        </div>
      </div>
      <form className="bottom">
        <div className="left">
          <span className="text">Enter Mobile Number</span>
        </div>
        <div className="right input">
          <PhoneInput
            value={formik.values.number}
            country={'us'}
            placeholder="Enter Mobile Number"
            inputStyle={{ fontFamily: 'fellix', color: '#777777' }}
            onChange={(e) => handlePhoneChange(e)}
            maxLength={14}
            disableDropdown={true}
          />
          {formik.touched.number && formik.errors.number && (
            <p style={{ color: "red" }}>{formik.errors.number}</p>
          )}
        </div>
      </form>

      <div className="bottom2">
        <button className="btn1" type="button" onClick={onClose}>
          Cancel
        </button>

        <button className="btn2" disabled={!formik.isValid || !formik.dirty} type="submit" onClick={formik.handleSubmit}>
          Save
        </button>
      </div>
    </AddNewDncModalStyled>
  );
};

const ImportModal = ({ onClose }) => {
  const [, dropRef] = useDrop({
    accept: [NativeTypes.FILE],
    drop: (item) => {
      if (item.files) {
        const file = item.files[0];
        handleFile(file);
      }
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  // const handleFile = (file) => {
  //   if (file) {
  //     const reader = new FileReader();
  //     const fileName = file.name;
  //     reader.onload = (e) => {
  //       const content = e.target.result;

  //       if (fileName.endsWith(".csv")) {
  //         // Handle CSV file
  //         onClose(content, "csv", fileName);
  //       } else if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
  //         // Handle XLSX or XLS file
  //         const workbook = XLSX.read(content, { type: "binary" });

  //         // Assuming you want to access the first sheet in the Excel file
  //         // Assume 'workbook' is already defined as in your previous code
  //         const firstSheetName = workbook.SheetNames[0];
  //         const firstSheet = workbook.Sheets[firstSheetName];

  //         // Get headers from the first row
  //         const headers = XLSX.utils.sheet_to_json(firstSheet, {
  //           header: 1,
  //         })[0];

  //         // Create a template object with empty strings for each header
  //         const templateObject = headers.reduce((obj, header) => {
  //           obj[header] = "";
  //           return obj;
  //         }, {});

  //         // Convert all rows into objects, including the first row as the template
  //         const jsonDataIncludingTemplate = XLSX.utils
  //           .sheet_to_json(firstSheet, {
  //             header: headers,
  //             range: 1, // Start from the second row, since headers are used from the first
  //           })
  //           .map((row) => {
  //             // Merge the template object with the actual row data
  //             return { ...templateObject, ...row };
  //           });

  //         // Add the template object as the first item in the array
  //         jsonDataIncludingTemplate.unshift(templateObject);
  //         onClose(
  //           jsonDataIncludingTemplate,
  //           fileName.endsWith(".xlsx") ? "xlsx" : "xls",
  //           fileName
  //         );
  //       } else {
  //         // Unsupported file format
  //         toast.error(
  //           "Unsupported file format. Please upload a CSV, XLSX, or XLS file."
  //         );
  //       }
  //     };

  //     if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
  //       reader.readAsBinaryString(file);
  //     } else {
  //       reader.readAsText(file);
  //     }
  //   }
  // };


  const handleFile = (file) => {
    if (file) {
      const reader = new FileReader();
      const fileName = file.name;
  
      reader.onload = (e) => {
        const content = e.target.result;
  
        if (fileName.endsWith(".csv")) {
          // Parse CSV file
          const rows = content.split("\n");
          if (rows.length > 1000) {
            toast.error("File contains more than 1000 records. Please upload a smaller file.");
            return;
          }
          onClose(content, "csv", fileName);
        } else if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
          // Handle XLSX or XLS file
          const workbook = XLSX.read(content, { type: "binary" });
          const firstSheetName = workbook.SheetNames[0];
          const firstSheet = workbook.Sheets[firstSheetName];
  
          // Convert sheet to JSON data
          const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
  
          if (jsonData.length > 1000) {
            toast.error("File contains more than 1000 records. Please upload a smaller file.");
            return;
          }
  
          // Get headers and create a template
          const headers = jsonData[0];
          const templateObject = headers.reduce((obj, header) => {
            obj[header] = "";
            return obj;
          }, {});
  
          // Convert rows to objects and include the template
          const jsonDataIncludingTemplate = jsonData
            .slice(1) // Exclude the header row
            .map((row) => {
              const rowData = {};
              headers.forEach((header, index) => {
                rowData[header] = row[index] || "";
              });
              return { ...templateObject, ...rowData };
            });
  
          // Add template as the first item
          jsonDataIncludingTemplate.unshift(templateObject);
          onClose(
            jsonDataIncludingTemplate,
            fileName.endsWith(".xlsx") ? "xlsx" : "xls",
            fileName
          );
        } else {
          toast.error("Unsupported file format. Please upload a CSV, XLSX, or XLS file.");
        }
      };
  
      if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
        reader.readAsBinaryString(file);
      } else {
        reader.readAsText(file);
      }
    }
  };
  
  return (
    <ImportModalStyled>
      <div className="middle" ref={dropRef}>
        <label className="center">
          <input
            type="file"
            accept=".xls, .xlsx, .csv"
            onChange={handleFileChange}
          />
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <BsFillPlusCircleFill
              style={{ fontSize: "24px", color: "#005ABB" }}
            />
            <span className="text">Import (.xlsx/.xls/.csv)</span>
            <span></span>
          </p>
          <span>Or drag & drop</span>
        </label>
      </div>
      <div className="bottom">
        <a target="_blank" href="/sample/list_import_doNotCall.csv">
          Click here to download sample import file
        </a>
        <button onClick={() => onClose(null)}>Close</button>
      </div>
    </ImportModalStyled>
  );
};

const MatchingModal = ({ onClose, fileData }) => {
  const allHeaders = useMemo(() => {
    if (!fileData || fileData?.length === 0) {
      return [];
    }
    return Array.from(new Set(Object.keys(fileData[0])));
  }, [fileData]);

  const [usedHeaders, setUsedHeaders] = useState([]);
  const [mappingData, setMappingData] = useState({
    number: "",
  });

  const getRemainingHeaders = (allHeaders, usedHeaders, name) => {
    const allHeadersSet = new Set(allHeaders);
    const usedHeadersSet = new Set(usedHeaders);
    const remainingHeaders = [...allHeadersSet].filter(
      (header) => !usedHeadersSet.has(header) || header === name
    );
    return [...remainingHeaders];
  };

  const getSomePreviewData = (name) => {
    if (!fileData || fileData?.length === 0) {
      return [];
    }

    let size = fileData?.length < 10 ? fileData?.length : 10;

    return fileData
      .slice(0, size)
      .map((obj) => obj[mappingData[name]])
      .filter((v) => v)
      .join(", ");
  };

  const handleChange = (e, name) => {
    setMappingData((p) => ({
      ...p,
      [name]: e.target.value,
    }));
  };

  useLayoutEffect(() => {
    const usedHeades = [];
    for (const key in mappingData) {
      if (mappingData[key]) usedHeades.push(mappingData[key]);
    }
    setUsedHeaders(usedHeades);
  }, [mappingData]);

  return (
    <MatchingModalStyled ChevronDown={Assets.Images.ChevronDown}>
      <div className="top">
        <h2>Match Fields from file</h2>
        <p>Please make sure that all fields are filled and matched correctly</p>
      </div>
      <div className="middle">
        <div className="wrapper">
          <table>
            <thead>
              <tr>
                <th>Zeit Blast Field</th>
                <th>File Column Data</th>
                <th>File Column Names</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Phone Number <span style={{ color: 'red' }}>*</span></td>
                <td>{getSomePreviewData("number")}</td>
                <td>
                  <select
                    value={mappingData.number}
                    onChange={(e) => handleChange(e, "number")}
                  >
                    <option disabled value="">
                      Open menu for select field
                    </option>
                    {getRemainingHeaders(
                      allHeaders,
                      usedHeaders,
                      mappingData.number
                    ).map((value, index) => (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="bottom">
        <button onClick={() => onClose(null)}>
          <span className="text">Cancel</span>
        </button>
        <button
          onClick={() => onClose(mappingData)}
          disabled={usedHeaders?.length < 1}
        >
          <span className="icon">
          </span>
          <span className="text">Import</span>
        </button>
      </div>
    </MatchingModalStyled>
  );
};

const FileReadingModal = () => {
  return (
    <FileReadingModalStyled>
      <div className="top">
        <h2>Reading File</h2>
      </div>
      <div className="bottom">
        <div>
          <CircularProgress />
        </div>
        <div>READING...</div>
      </div>
    </FileReadingModalStyled>
  );
};

const FileSendingModal = ({ mappedData, fileData, onClose, fileName }) => {
  if (fileData && fileData.length && fileData.length > 1000) {
    onClose();
    return toast.error("Please upload a file with no more than 1,000 records.");
  }
  useEffect(() => {
    const newFileData = fileData.map((obj) => {
      const newObj = {};
      for (const key in mappedData) {
        if (mappedData[key]) {
          if (obj[mappedData[key]]) newObj[key] = obj[mappedData[key]];
          else newObj[key] = "";
        }
      }
      return newObj;
    });

    const csv = Papa.unparse(newFileData, {
      error: () => {
        toast.error("Something went wrong. Please try again!");
        onClose(null);
      },
    });

    const body = new FormData();
    fileName = fileName.replace("xlsx", () => {
      return "csv";
    });
    fileName = fileName.replace("xls", () => {
      return "csv";
    });
    body.append(
      "file",
      new Blob([csv], { type: "text/csv" }),
      fileName ?? "data.csv"
    );
    onClose(body);
  }, [mappedData, fileData, fileName]);
  return (
    <FileReadingModalStyled>
      <div className="top">
        <h2>Sending File</h2>
      </div>
      <div className="bottom">
        <div>
          <CircularProgress />
        </div>
        <div>Sending...</div>
      </div>
    </FileReadingModalStyled>
  );
};
