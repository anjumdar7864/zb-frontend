import {
  FaArrowRight,
  FaBullhorn,
  FaDownload,
  FaFileUpload,
  FaInfoCircle,
  FaPlus,
  FaSearch,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import {
  DirectImportStyled,
  FileReadingModalStyled,
  ImportModalStyled,
  MatchingModalStyled,
  SelectInitailCampaignModalStyled,
  TableRowStyled,
} from "./styles";
import Components from "@/components";
import { CircularProgress, styled } from "@mui/material";
import { useElementSize, useGlobalContext } from "@/hooks";
import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewDirectImports,
  deleteDirectImport,
  directImportAssignCampaign,
  directImportUnAssignCampaign,
  downloadFile,
  getAllCompaigns,
  getAllDirectImport,
  patchDirectImport,
  downloadFilterProspect,
} from "@/store/actions";
import { formatDateToShort, formatDate } from "@/utils";

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import { toast } from "react-hot-toast";
import Papa from "papaparse";
import Assets from "@/assets";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx/xlsx.mjs";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

const LightTooltip = styled(Components.Common.LightTooltip)`
  & > .MuiTooltip-tooltip {
    text-align: center;
    max-width: 20rem;
  }
`;

const DirectImport = () => {
  const { elementRef, size: rowSize } = useElementSize();
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfRowsShowing, setNumberOfRowsShowing] = useState(25);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState("");
  const { setIsLoaderShowing, setIsToastModalOpen } = useGlobalContext();
  const dispatch = useDispatch();
  const { directImportData, queueLoading, fileCompleted } = useSelector(
    (s) => s.directImportReducer
  );
  const [searchText, setSearchText] = useState("");
  const [fileData, setFileData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [isFileReadingModalOpen, setIsFileReadingModalOpen] = useState(false);
  const [isMatchingFieldModalOpen, setIsMatchingFieldModalOpen] =
    useState(false);
  const [isFileSendingModalOpen, setIsFileSendingModalOpen] = useState(false);
  const [mappedData, setMappedData] = useState({});
  const [originalFile, setOriginalFile] = useState("");
  // const [uploadFileName, setUploadingFileName] = useState(false);

  useLayoutEffect(() => {
    setIsLoaderShowing(directImportData.loading);
  }, [directImportData.loading, setIsLoaderShowing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = formData.get("search");
    setSearchText(search);
  };

  useLayoutEffect(() => {
    dispatch(
      getAllDirectImport({
        limit: numberOfRowsShowing,
        page: currentPage,
        search: searchText,
      })
    );
  }, [currentPage, dispatch, numberOfRowsShowing, searchText]);
  const [directImportLocalStorageData, setIsDirectImportLocalStorageData] =
    useState("");
  useEffect(() => {
    let directImportLocalStorage = localStorage.getItem("directImport");
    setIsDirectImportLocalStorageData(directImportLocalStorage);
    if (fileCompleted && directImportLocalStorageData) {
      setIsToastModalOpen(true);
      setIsDirectImportLocalStorageData("");
      dispatch(
        getAllDirectImport({
          limit: numberOfRowsShowing,
          page: currentPage,
          search: searchText,
        })
      );
      localStorage.removeItem("directImport");
    }
  }, [dispatch, fileCompleted, queueLoading]);

  const parseCSV = (content) => {
    setIsFileReadingModalOpen(true);
    Papa.parse(content, {
      header: true,
      complete: (result) => {
        setIsFileReadingModalOpen(false);
        // checking empty file
        if (result.data.length === 0) {
          toast.error("You can't upload an empty file!");
          return;
        }
        if (
          result.data.length === 1 &&
          result?.data[0][Object?.keys(result?.data[0])[0]] === ""
        ) {
          toast.error("You can't upload an empty file!");
          return;
        }
        if (result.data.length > 100001) {
          toast.error("Limit exceed!");
          return;
        }

        if (
          result.data.length === 100001 &&
          result?.data[100000][Object?.keys(result?.data[100000])[0]] !== ""
        ) {
          toast.error("Limit exceed!");
          return;
        }
        setFileData(result.data);
        setIsMatchingFieldModalOpen(true);
      },
      error: () => {
        toast.error("Something went wrong while parsing!");
      },
    });
  };

  const setXLSXandXLS = (content) => {
    if (content.length === 0) {
      toast.error("You can't upload an empty file!");
      return;
    }
    if (
      content.length === 1 &&
      content[0][Object?.keys(content[0])[0]] === ""
    ) {
      toast.error("You can't upload an empty file!");
      return;
    }
    if (content.length > 100001) {
      toast.error("Limit exceed!");
      return;
    }

    if (
      content.length === 100001 &&
      content[100000][Object?.keys(content[100000])[0]] !== ""
    ) {
      toast.error("Limit exceed!");
      return;
    }
    setFileData(content);
    setIsMatchingFieldModalOpen(true);
  };

  return (
    <DirectImportStyled rowWidth={rowSize.width}>
      <div className="top">
        <div className="left">
          <h1>Direct Import</h1>
        </div>
        <div className="right">
          <form className="bottom" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search"
              name="search"
              onChange={(e) => e.target.value === "" && setSearchText("")}
            />
            <button>
              {/* <FaSearch /> */}
              <IoIosArrowDown style={{ fontSize: "22px", color: "#012635" }} />
            </button>
          </form>
          <div className="top">
            <button
              onClick={() => setIsImportModalOpen(true)}
              disabled={queueLoading && directImportLocalStorageData}
            >
              {queueLoading && directImportLocalStorageData ? (
                <span className="icon">
                  <FiLoader />
                </span>
              ) : (
                <span className="icon">{/* <FaPlus /> */}</span>
              )}
              <span className="text">
                {queueLoading && directImportLocalStorageData
                  ? "Please Wait"
                  : "Import List"}
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="bottom">
        {queueLoading && directImportLocalStorageData && (
          <div className="top">
            <h2>Upload in progress</h2>
            <div className="bottom">
              <p>{fileName}</p>
              <span className="bar"></span>
            </div>
          </div>
        )}
        <div className="bottom">
          <div className="top">
            <table>
              <tr>
                <th></th>
                <th>
                  <div className="item">
                    <span className="text">List Nam</span>
                  </div>
                </th>
                <th>
                  <div className="item">
                    <span className="text">Total Rows</span>
                    <LightTooltip
                      title="Total number of rows in your list"
                      arrow
                      placement="top"
                    >
                      <sup className="icon">
                        <FaInfoCircle />
                      </sup>
                    </LightTooltip>
                  </div>
                </th>
                <th>
                  <div className="item">
                    <span className="text">Total Prospects</span>
                    <LightTooltip
                      title="Total number of Prospects with atleast one mobile phone number"
                      arrow
                      placement="top"
                    >
                      <sup className="icon">
                        <FaInfoCircle />
                      </sup>
                    </LightTooltip>
                  </div>
                </th>
                <th>
                  <div className="item">
                    <span className="text">Mobiles</span>
                    <LightTooltip
                      title="Total Mobile phone numbers that you Prospects have. Hint: ZeitBlast texts the first 3 mobiles"
                      arrow
                      placement="top"
                    >
                      <sup className="icon">
                        <FaInfoCircle />
                      </sup>
                    </LightTooltip>
                  </div>
                </th>
                <th>
                  <div className="item">
                    <span className="text">Landlines</span>
                    <LightTooltip
                      title="Total Landline numbers indentified. Hint: ZeitBlast texts mobiles only"
                      arrow
                      placement="top"
                    >
                      <sup className="icon">
                        <FaInfoCircle />
                      </sup>
                    </LightTooltip>
                  </div>
                </th>
                <th>
                  <div className="item">
                    <span className="text">VOIP</span>
                    <LightTooltip
                      title="VOIP identified and removed"
                      arrow
                      placement="top"
                    >
                      <sup className="icon">
                        <FaInfoCircle />
                      </sup>
                    </LightTooltip>
                  </div>
                </th>
                <th>
                  <div className="item">
                    <span className="text">DNC</span>
                    <LightTooltip
                      title="Prospects already on the internal. Do Not Call list"
                      arrow
                      placement="top"
                    >
                      <sup className="icon">
                        <FaInfoCircle />
                      </sup>
                    </LightTooltip>
                  </div>
                </th>
                <th>
                  <div className="item">
                    <span className="text">Existing Matches</span>
                    <LightTooltip
                      title="Prevously imported Prospects."
                      arrow
                      placement="top"
                    >
                      <sup className="icon">
                        <FaInfoCircle />
                      </sup>
                    </LightTooltip>
                  </div>
                </th>
                <th>
                  <div className="item">
                    <span className="text">Created</span>
                  </div>
                </th>
                <th>
                  <div className="item">
                    <span className="text">Actions</span>
                  </div>
                </th>
                <th></th>
              </tr>
              {directImportData.results.length === 0 && (
                <tr>
                  <td colSpan={11} className="error">
                    No Record Found
                  </td>
                </tr>
              )}
              {console.log(
                "directImportData?.results is",
                directImportData.results
              )}
              {directImportData.results.map((singleDirectImport, i) => (
                <TableRow
                  key={i}
                  ref={i === 0 ? elementRef : null}
                  onDelete={() => setSelectedDeleteId(singleDirectImport?._id)}
                  singleDirectImport={singleDirectImport}
                  limit={numberOfRowsShowing}
                  page={currentPage}
                  search={searchText}
                />
              ))}
            </table>
          </div>
          {directImportData.results.length !== 0 && (
            <div className="bottom" style={{ marginTop: "2rem" }}>
              <div className="left">
                <span>Total: {directImportData?.totalResults ?? 0}</span>
              </div>
              <div className="center">
                <Components.Common.MyPagination
                  currentPage={currentPage}
                  onChange={(p) => setCurrentPage(p)}
                  availableNumberOfRows={[10, 25, 50]}
                  currentlySelectedNumberOfRows={numberOfRowsShowing}
                  onChangeNumberOfRows={(p) => setNumberOfRowsShowing(p)}
                  totalItems={directImportData?.totalResults ?? 0}
                />
              </div>
              <div className="right"></div>
            </div>
          )}
        </div>
      </div>

      <Components.Common.ModalTop open={isImportModalOpen} onClose={() => {}}>
        <ImportModal
          onClose={(fileContent, type, fileName, originalFile) => {
            if (fileContent && type === "csv") {
              parseCSV(fileContent);
              setFileName(fileName);
            }
            if ((fileContent && type === "xlsx") || type === "xls") {
              setXLSXandXLS(fileContent);
              setFileName(fileName);
            }
            setOriginalFile(originalFile);
            setIsImportModalOpen(false);
          }}
        />
      </Components.Common.ModalTop>

      <Components.Common.ModalTop
        open={isFileReadingModalOpen}
        onClose={() => {}}
      >
        <FileReadingModal />
      </Components.Common.ModalTop>

      <Components.Common.ModalTop
        open={isMatchingFieldModalOpen}
        onClose={() => {}}
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
        open={isFileSendingModalOpen}
        onClose={() => {}}
      >
        <FileSendingModal
          mappedData={mappedData}
          fileData={fileData}
          fileName={fileName}
          onClose={(body) => {
            if (body) {
              body.append("originalFile", originalFile);
              dispatch(
                addNewDirectImports(
                  {
                    body,
                    limit: numberOfRowsShowing,
                    page: currentPage,
                    search: searchText,
                  },
                  (obj) => {
                    // dispatch(
                    //   // patchDirectImport({ _id: obj?.elastickSearchId }, () => {
                    //   patchDirectImport({ _id: obj?._id }, () => {
                    //     dispatch(
                    //       getAllDirectImport(
                    //         {
                    //           limit: numberOfRowsShowing,
                    //           page: currentPage,
                    //           search: searchText,
                    //         },
                    //         () => {
                    //           setIsToastModalOpen(true);
                    //         }
                    //       )
                    //     );
                    //   })
                    // );
                  }
                )
              );
            }
            setIsFileSendingModalOpen(false);
            setOriginalFile("");
          }}
        />
      </Components.Common.ModalTop>

      <Components.Common.DeleteModal
        onClose={() => setSelectedDeleteId("")}
        onOkay={() =>
          setSelectedDeleteId((p) => {
            dispatch(
              deleteDirectImport({
                _id: p,
                limit: numberOfRowsShowing,
                page: currentPage,
                search: searchText,
              })
            );
            return "";
          })
        }
        open={Boolean(selectedDeleteId)}
        deleteItemName="direct import"
      />
    </DirectImportStyled>
  );
};
export default DirectImport;

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
  //     reader.onload = (e) => {
  //       const content = e.target.result;
  //       if (file.name.endsWith(".csv")) {
  //         onClose(content, "csv", file.name);
  //       }else if (file.name.endsWith('.xlsx')){
  //         onClose(content, "xlsx", file.name);
  //       }else {
  //         toast.error("Unsupported file format. Please upload a CSV file.");
  //       }
  //     };

  //     reader.readAsText(file);
  //   }
  // };

  const handleFile = (file) => {
    if (file) {
      let originalFile = file;
      const reader = new FileReader();
      const fileName = file.name;
      reader.onload = (e) => {
        const content = e.target.result;

        if (fileName.endsWith(".csv")) {
          // Handle CSV file
          onClose(content, "csv", fileName, originalFile);
        } else if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
          const workbook = XLSX.read(content, { type: "binary" });

          // Assuming you want to access the first sheet in the Excel file
          // Assume 'workbook' is already defined as in your previous code
          const firstSheetName = workbook.SheetNames[0];
          const firstSheet = workbook.Sheets[firstSheetName];

          // Get headers from the first row
          const headers = XLSX.utils.sheet_to_json(firstSheet, {
            header: 1,
          })[0];

          // Create a template object with empty strings for each header
          const templateObject = headers.reduce((obj, header) => {
            obj[header] = "";
            return obj;
          }, {});

          // Convert all rows into objects, including the first row as the template
          const jsonDataIncludingTemplate = XLSX.utils
            .sheet_to_json(firstSheet, {
              header: headers,
              range: 1, // Start from the second row, since headers are used from the first
            })

            .map((row) => {
              // Merge the template object with the actual row data
              return { ...templateObject, ...row };
            });

          // Add the template object as the first item in the array
          jsonDataIncludingTemplate.unshift(templateObject);

          onClose(
            jsonDataIncludingTemplate,
            fileName.endsWith(".xlsx") ? "xlsx" : "xls",
            fileName,
            originalFile
          );
        } else {
          // Unsupported file format
          toast.error(
            "Unsupported file format. Please upload a CSV, XLSX, or XLS file."
          );
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
      <div className="top">
        <h2>Import</h2>
      </div>
      <div className="middle" ref={dropRef}>
        <label className="center">
          <input
            type="file"
            accept=".xls, .xlsx, .csv"
            // accept=".csv"
            onChange={handleFileChange}
          />
          <p>
            <span className="icon">
              <FaPlus />
            </span>
            <span className="text">Import (.xlsx/.xls/.csv)</span>
            <span></span>
          </p>
          <span>or drag & drop</span>
        </label>
      </div>
      <div className="bottom">
        <a target="_blank" href="/sample/list_import_template.csv">
          Click here to download sample import file
        </a>
        <button onClick={() => onClose(null)}>Close</button>
      </div>
    </ImportModalStyled>
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

const MatchingModal = ({ onClose, fileData }) => {
  const [isLandOwner, setIsLandOwner] = useState(false);
  const allHeaders = useMemo(() => {
    if (!fileData || fileData.length === 0) {
      return [];
    }

    return Array.from(new Set(Object.keys(fileData[0])));
  }, [fileData]);

  const [usedHeaders, setUsedHeaders] = useState([]);
  const [mappingData, setMappingData] = useState({
    firstName: "",
    lastName: "",
    mailingAddress: "",
    mailingCity: "",
    mailingState: "",
    mailingZip: "",
    propertyAddress: "",
    propertyCity: "",
    propertyState: "",
    propertyZip: "",
    phone1: "",
    phone2: "",
    phone3: "",
    apn: "",
    propertyCounty: "",
    acreage: "",
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
    if (!fileData || fileData.length === 0) {
      return [];
    }

    let size = fileData.length < 10 ? fileData.length : 10;

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

  const requiredFields = [
    "firstName",
    "lastName",
    "mailingAddress",
    "mailingCity",
    "mailingState",
    "mailingZip",
    "propertyAddress",
    "propertyCity",
    "propertyState",
    "propertyZip",
    "phone1",
  ];

  const areAllRequiredFieldsPresent = (mapping) => {
    return requiredFields.every(
      (field) => mapping[field] && mapping[field].trim() !== ""
    );
  };

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
                <th>ZeitBlast Field</th>
                <th>File Column Data</th>
                <th>File Column Names</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  First Name <span style={{ color: "red" }}>*</span>
                </td>
                <td>{getSomePreviewData("firstName")}</td>
                <td>
                  <select
                    value={mappingData.firstName}
                    onChange={(e) => handleChange(e, "firstName")}
                  >
                    <option value="">Open menu for select field</option>
                    {getRemainingHeaders(
                      allHeaders,
                      usedHeaders,
                      mappingData.firstName
                    ).map((value, index) => (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  Last Name <span style={{ color: "red" }}>*</span>
                </td>
                <td>{getSomePreviewData("lastName")}</td>
                <td>
                  <select
                    value={mappingData.lastName}
                    onChange={(e) => handleChange(e, "lastName")}
                  >
                    <option value="">Open menu for select field</option>
                    {getRemainingHeaders(
                      allHeaders,
                      usedHeaders,
                      mappingData.lastName
                    ).map((value, index) => (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  Mailing Address <span style={{ color: "red" }}>*</span>
                </td>
                <td>{getSomePreviewData("mailingAddress")}</td>
                <td>
                  <select
                    value={mappingData.mailingAddress}
                    onChange={(e) => handleChange(e, "mailingAddress")}
                  >
                    <option value="">Open menu for select field</option>
                    {getRemainingHeaders(
                      allHeaders,
                      usedHeaders,
                      mappingData.mailingAddress
                    ).map((value, index) => (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  Mailing City <span style={{ color: "red" }}>*</span>
                </td>
                <td>{getSomePreviewData("mailingCity")}</td>
                <td>
                  <select
                    value={mappingData.mailingCity}
                    onChange={(e) => handleChange(e, "mailingCity")}
                  >
                    <option value="">Open menu for select field</option>
                    {getRemainingHeaders(
                      allHeaders,
                      usedHeaders,
                      mappingData.mailingCity
                    ).map((value, index) => (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  Mailing State <span style={{ color: "red" }}>*</span>
                </td>
                <td>{getSomePreviewData("mailingState")}</td>
                <td>
                  <select
                    value={mappingData.mailingState}
                    onChange={(e) => handleChange(e, "mailingState")}
                  >
                    <option value="">Open menu for select field</option>
                    {getRemainingHeaders(
                      allHeaders,
                      usedHeaders,
                      mappingData.mailingState
                    ).map((value, index) => (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  Mailing Zip <span style={{ color: "red" }}>*</span>
                </td>
                <td>{getSomePreviewData("mailingZip")}</td>
                <td>
                  <select
                    value={mappingData.mailingZip}
                    onChange={(e) => handleChange(e, "mailingZip")}
                  >
                    <option value="">Open menu for select field</option>
                    {getRemainingHeaders(
                      allHeaders,
                      usedHeaders,
                      mappingData.mailingZip
                    ).map((value, index) => (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  Property Address <span style={{ color: "red" }}>*</span>
                </td>
                <td>{getSomePreviewData("propertyAddress")}</td>
                <td>
                  <select
                    value={mappingData.propertyAddress}
                    onChange={(e) => handleChange(e, "propertyAddress")}
                  >
                    <option value="">Open menu for select field</option>
                    {getRemainingHeaders(
                      allHeaders,
                      usedHeaders,
                      mappingData.propertyAddress
                    ).map((value, index) => (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  Property City <span style={{ color: "red" }}>*</span>
                </td>
                <td>{getSomePreviewData("propertyCity")}</td>
                <td>
                  <select
                    value={mappingData.propertyCity}
                    onChange={(e) => handleChange(e, "propertyCity")}
                  >
                    <option value="">Open menu for select field</option>
                    {getRemainingHeaders(
                      allHeaders,
                      usedHeaders,
                      mappingData.propertyCity
                    ).map((value, index) => (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  Property State <span style={{ color: "red" }}>*</span>
                </td>
                <td>{getSomePreviewData("propertyState")}</td>
                <td>
                  <select
                    value={mappingData.propertyState}
                    onChange={(e) => handleChange(e, "propertyState")}
                  >
                    <option value="">Open menu for select field</option>
                    {getRemainingHeaders(
                      allHeaders,
                      usedHeaders,
                      mappingData.propertyState
                    ).map((value, index) => (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  Property Zip <span style={{ color: "red" }}>*</span>
                </td>
                <td>{getSomePreviewData("propertyZip")}</td>
                <td>
                  <select
                    value={mappingData.propertyZip}
                    onChange={(e) => handleChange(e, "propertyZip")}
                  >
                    <option value="">Open menu for select field</option>
                    {getRemainingHeaders(
                      allHeaders,
                      usedHeaders,
                      mappingData.propertyZip
                    ).map((value, index) => (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  Phone1 <span style={{ color: "red" }}>*</span>
                </td>
                <td>{getSomePreviewData("phone1")}</td>
                <td>
                  <select
                    value={mappingData.phone1}
                    onChange={(e) => handleChange(e, "phone1")}
                  >
                    <option value="">Open menu for select field</option>
                    {getRemainingHeaders(
                      allHeaders,
                      usedHeaders,
                      mappingData.phone1
                    ).map((value, index) => (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>Phone2</td>
                <td>{getSomePreviewData("phone2")}</td>
                <td>
                  <select
                    value={mappingData.phone2}
                    onChange={(e) => handleChange(e, "phone2")}
                  >
                    <option value="">Open menu for select field</option>
                    {getRemainingHeaders(
                      allHeaders,
                      usedHeaders,
                      mappingData.phone2
                    ).map((value, index) => (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>Phone3</td>
                <td>{getSomePreviewData("phone3")}</td>
                <td>
                  <select
                    value={mappingData.phone3}
                    onChange={(e) => handleChange(e, "phone3")}
                  >
                    <option value="">Open menu for select field</option>
                    {getRemainingHeaders(
                      allHeaders,
                      usedHeaders,
                      mappingData.phone3
                    ).map((value, index) => (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>

              <tr style={{ borderBottom: "none" }}>
                <td
                  style={{
                    display: "flex",
                    alignItems: "right",
                    justifyContent: "flex-end",
                  }}
                >
                  <p
                    style={{
                      color: "#1146f6",
                      fontSize: "1.3rem",
                      padding: ".4rem .8rem",
                      backgroundColor: "#80808030",
                      borderRadius: "1.5rem",
                      display: "block",
                      width: "4.5rem",
                    }}
                  >
                    NEW
                  </p>
                </td>
                <td style={{ width: "30rem" }}>
                  <center>
                    <LightTooltip
                      placement="top"
                      arrow
                      title={
                        <>
                          <p>
                            Map these fields only if you are looking to buy land
                            and you have this information in your imported file.
                          </p>
                        </>
                      }
                    >
                      <button
                        onClick={() => setIsLandOwner(!isLandOwner)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: ".7rem",
                          justifyContent: "center",
                        }}
                      >
                        {isLandOwner ? "Hide " : "Show "}
                        Landowner Fields
                        {isLandOwner ? (
                          <MdKeyboardArrowUp style={{ fontSize: "2rem" }} />
                        ) : (
                          <MdKeyboardArrowDown style={{ fontSize: "2rem" }} />
                        )}
                      </button>
                    </LightTooltip>
                  </center>
                </td>
                <td></td>
              </tr>
              {/* <tr>
                <td></td>
              </tr> */}

              {isLandOwner && (
                <>
                  <tr>
                    <td>APN</td>
                    <td>{getSomePreviewData("apn")}</td>
                    <td>
                      <select
                        value={mappingData.apn}
                        onChange={(e) => handleChange(e, "apn")}
                      >
                        <option value="">Open menu for select field</option>
                        {getRemainingHeaders(
                          allHeaders,
                          usedHeaders,
                          mappingData.apn
                        ).map((value, index) => (
                          <option value={value} key={index}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Property County</td>
                    <td>{getSomePreviewData("propertyCounty")}</td>
                    <td>
                      <select
                        value={mappingData.propertyCounty}
                        onChange={(e) => handleChange(e, "propertyCounty")}
                      >
                        <option value="">Open menu for select field</option>
                        {getRemainingHeaders(
                          allHeaders,
                          usedHeaders,
                          mappingData.propertyCounty
                        ).map((value, index) => (
                          <option value={value} key={index}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Acreage</td>
                    <td>{getSomePreviewData("acreage")}</td>
                    <td>
                      <select
                        value={mappingData.acreage}
                        onChange={(e) => handleChange(e, "acreage")}
                      >
                        <option value="">Open menu for select field</option>
                        {getRemainingHeaders(
                          allHeaders,
                          usedHeaders,
                          mappingData.acreage
                        ).map((value, index) => (
                          <option value={value} key={index}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bottom">
        <button onClick={() => onClose(null)}>
          <span className="text">Close</span>
        </button>
        <button
          onClick={() => onClose(mappingData)}
          disabled={!areAllRequiredFieldsPresent(mappingData)}
        >
          <span className="icon">
            <FaFileUpload />
          </span>
          <span className="text">Import</span>
        </button>
      </div>
    </MatchingModalStyled>
  );
};

const FileSendingModal = ({ mappedData, fileData, onClose, fileName }) => {
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

    let body = new FormData();
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

// eslint-disable-next-line react/display-name
const TableRow = forwardRef(
  ({ onDelete, singleDirectImport, limit, page, search }, ref) => {
    const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
    const downloadMeuRef = useRef(null);
    const downloadButtonRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const { errorModalError, setErrorModalError, setIsLoaderShowing } =
      useGlobalContext();
    const [isSelectInitailCampaignModal, setIsSelectInitailCampaignModal] =
      useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { queueLoading } = useSelector((s) => s.directImportReducer);

    useLayoutEffect(() => {
      setIsLoaderShowing(isLoading && !isSelectInitailCampaignModal);
    }, [setIsLoaderShowing, isLoading, isSelectInitailCampaignModal]);

    const handleDownload = () => {
      const secureUrl = singleDirectImport?.orgFile;
      const url = secureUrl?.replace(/^http:\/\//i, "https://");
      if (url) {
        const link = document.createElement("a");
        link.href = url;
        link.download = url.split("/").pop(); // Extracts the file name from the URL
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("URL is not defined");
      }
    };

    useLayoutEffect(() => {
      const handleClickAway = (event) => {
        if (
          downloadMeuRef.current &&
          !downloadMeuRef.current.contains(event.target) &&
          downloadButtonRef.current &&
          !downloadButtonRef.current.contains(event.target)
        ) {
          setIsDownloadMenuOpen(false);
        }
      };
      document.addEventListener("click", handleClickAway);
      return () => {
        document.removeEventListener("click", handleClickAway);
      };
    }, []);

    useLayoutEffect(() => {
      if (!selectedCampaign) return;
      dispatch(
        directImportAssignCampaign({
          _id: singleDirectImport._id,
          body: { campaign: selectedCampaign._id },
          limit,
          page,
          search,
        })
      );
      setSelectedCampaign(null);
    }, [
      dispatch,
      limit,
      page,
      search,
      selectedCampaign,
      singleDirectImport._id,
    ]);

    return (
      <TableRowStyled ref={ref}>
        <td className="extra">
          {singleDirectImport.listName
            ? singleDirectImport.listName.endsWith(".csv")
              ? singleDirectImport.listName.slice(
                  0,
                  singleDirectImport.listName.length - 4
                )
              : singleDirectImport.listName
            : "--"}
        </td>
        <td>
          {singleDirectImport?.status === "pending" ? (
            <p className="info">In Queue</p>
          ) : singleDirectImport?.isCampaignAssigned ? (
            <div className="listName">
              <span className="icon">
                <FaBullhorn />
              </span>
              <span
                className="text"
                onClick={() =>
                  navigate(
                    `/campaigns/${singleDirectImport?.assignCampaign?._id}`
                  )
                }
              >
                {singleDirectImport?.assignCampaign?.name ?? "--"}
              </span>
              <LightTooltip
                title="Remove list from campaign"
                placement="top"
                arrow
              >
                <button
                  onClick={() => {
                    dispatch(
                      directImportUnAssignCampaign(
                        {
                          _id: singleDirectImport._id,
                          limit,
                          page,
                          search,
                        },
                        () => {},
                        (e) => {
                          if (e?.response?.status === 400) {
                            setErrorModalError({
                              title: `List ${
                                singleDirectImport.listName
                                  ? singleDirectImport.listName.endsWith(".csv")
                                    ? singleDirectImport.listName.slice(
                                        0,
                                        singleDirectImport.listName.length - 4
                                      )
                                    : singleDirectImport.listName
                                  : "--"
                              } contains prospects you have already texted and cannot be removed from the assigned Campaign`,
                              details: "",
                            });
                          }
                        }
                      )
                    );
                  }}
                >
                  <FaTimes />
                </button>
              </LightTooltip>
            </div>
          ) : (
            singleDirectImport?.totalPropspects !== 0 && (
              <button
                className="assign"
                onClick={() => setIsSelectInitailCampaignModal(true)}
              >
                <span className="text">Assign to Campaign</span>
                <span className="icon">
                  <FaArrowRight />
                </span>
              </button>
            )
          )}
        </td>
        <td>
          <div className="dotGroup">
            <span className="dot" style={{ backgroundColor: "#5D68DB" }}></span>
            <span className="text">
              {singleDirectImport?.totalRows
                ? singleDirectImport?.totalRows
                : 0}
            </span>
          </div>
        </td>
        <td>
          <div className="dotGroup">
            <span className="dot" style={{ backgroundColor: "#32A4FD" }}></span>
            <span className="text">
              {singleDirectImport?.totalPropspects &&
                singleDirectImport.totalPropspects}
            </span>
          </div>
        </td>
        <td>
          <div className="dotGroup">
            <span className="dot" style={{ backgroundColor: "#35BD95" }}></span>
            <span className="text">
              {singleDirectImport?.mobile && singleDirectImport.mobile}
            </span>
          </div>
        </td>
        <td>
          <div className="dotGroup">
            <span className="dot" style={{ backgroundColor: "#EDEEF0" }}></span>
            <span className="text">
              {singleDirectImport?.landlines && singleDirectImport.landlines}
            </span>
          </div>
        </td>
        <td>
          <div className="dotGroup">
            <span className="dot" style={{ backgroundColor: "#EA5978" }}></span>
            <span className="text">
              {singleDirectImport?.litigators && singleDirectImport.litigators}
            </span>
          </div>
        </td>
        <td>
          <div className="dotGroup">
            <span className="dot" style={{ backgroundColor: "#EA5978" }}></span>
            <span className="text">
              {singleDirectImport?.dnc && singleDirectImport.dnc}
            </span>
          </div>
        </td>
        <td>
          <div className="dotGroup">
            <span className="dot" style={{ backgroundColor: "#F1B932" }}></span>
            <span className="text">
              {singleDirectImport.excistingMatches ?? "0"}
            </span>
          </div>
        </td>
        <td>
          <span className="date">
            {formatDate(singleDirectImport?.createdAt ?? "-/-/----")}
          </span>
        </td>
        <td>
          <div className="actions">
            <LightTooltip title="Dowload" placement="top" arrow>
              <button
                onClick={() => setIsDownloadMenuOpen((p) => !p)}
                ref={downloadButtonRef}
              >
                <FaDownload />
              </button>
            </LightTooltip>
            <LightTooltip title="Delete" placement="top" arrow>
              <button onClick={onDelete}>
                <FaTrash />
              </button>
            </LightTooltip>
          </div>
        </td>
        <AnimatePresence>
          {isDownloadMenuOpen && (
            <motion.td
              className="download"
              ref={downloadMeuRef}
              initial={{ x: "5rem", opacity: 0, scaleX: 0.5 }}
              animate={{
                x: "0rem",
                opacity: 1,
                scaleX: 1,
                transition: { duration: 0.2, ease: "linear" },
              }}
              exit={{
                x: "5rem",
                opacity: 0,
                scaleX: 0.5,
                transition: { duration: 0.2, ease: "linear" },
              }}
            >
              <div className="group">
                <button
                  disabled={singleDirectImport.totalPropspects ? false : true}
                  onClick={() => {
                    setIsLoading(true);
                    downloadFile(
                      {
                        name: singleDirectImport?.listName ?? "data.csv",
                        _id: singleDirectImport?._id,
                      },
                      () => {
                        setIsLoading(false);
                      },
                      () => {
                        setIsLoading(false);
                      }
                    );
                    setIsDownloadMenuOpen(false);
                  }}
                >
                  <span className="icon">
                    <FaDownload />
                  </span>
                  <span className="text">
                    All (
                    {singleDirectImport.totalPropspects
                      ? singleDirectImport.totalPropspects
                      : 0}
                    )
                  </span>
                </button>

                <button
                  onClick={() => {
                    setIsLoading(true);
                    downloadFilterProspect(
                      {
                        name: singleDirectImport?.listName ?? "data.csv",
                        _id: singleDirectImport?._id,
                      },
                      () => {
                        setIsLoading(false);
                      },
                      () => {
                        setIsLoading(false);
                      }
                    );
                    setIsDownloadMenuOpen(false);
                  }}
                >
                  <span className="icon">
                    <FaDownload />
                  </span>
                  <span className="text">Rejected Prospect</span>
                </button>
                <button
                  onClick={() => window.open(`${singleDirectImport?.orgFile}`)}
                >
                  <span className="icon">
                    <FaDownload />
                  </span>
                  <span className="text">Original</span>
                </button>
              </div>
            </motion.td>
          )}
        </AnimatePresence>
        <Components.Common.ModalTop
          onClose={() => {}}
          open={isSelectInitailCampaignModal}
        >
          <SelectInitailCampaignModal
            onClose={(campaign) => {
              setIsSelectInitailCampaignModal(false);
              setSelectedCampaign(campaign);
            }}
          />
        </Components.Common.ModalTop>
      </TableRowStyled>
    );
  }
);

const SelectInitailCampaignModal = ({ onClose }) => {
  const { results: allCampaigns, loading } = useSelector(
    (s) => s.campaignReducer.campaignData
  );
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [filtered, setfiltered] = useState([]);

  useLayoutEffect(() => {
    dispatch(getAllCompaigns({ directImport: "directImport" }));
  }, [dispatch]);
  useEffect(() => {
    setfiltered(
      allCampaigns.filter((campaign) =>
        campaign?.name?.toLowerCase().includes(searchText?.toLowerCase())
      )
    );
  }, [allCampaigns, searchText]);

  return (
    <SelectInitailCampaignModalStyled>
      <div className="top">
        <h2>Select A Campaign</h2>
        <button onClick={() => onClose(null)}>Cancel</button>
      </div>
      <div className="bottom">
        <div className="top">
          <input
            type="text"
            placeholder="Search Campaigns"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
          <p>
            Filtering campaigns with prospects available from 01/29/23 -
            07/30/23
          </p>
        </div>
        <div className="bottom">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Prospects Available</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="loading" colSpan={3}>
                    <div>
                      <CircularProgress />
                    </div>
                    <div>LOADING</div>
                  </td>
                </tr>
              ) : (
                <>
                  {filtered.length === 0 ? (
                    <tr>
                      <td className="error" colSpan={3}>
                        No record found!
                      </td>
                    </tr>
                  ) : null}
                  {filtered.map((singleCampaign, i) => (
                    <tr key={i}>
                      <td>{singleCampaign?.name}</td>
                      <td>{singleCampaign?.totalProspects}</td>
                      <td>
                        <button onClick={() => onClose(singleCampaign)}>
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </SelectInitailCampaignModalStyled>
  );
};
