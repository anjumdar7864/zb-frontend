import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Assets from "@/assets";
import { GoDotFill } from "react-icons/go";
import { useTheme } from "@mui/material/styles";
import styles from "./DirectImport.module.css";
import { IoIosArrowDown, IoIosInformationCircleOutline, IoMdClose } from "react-icons/io";
import CompaignModal from "./CompaignModal";
import DownloadPopover from "./DownloadPopover";
import { formatDateToShort } from "@/utils";
import { FaBullhorn, FaInfoCircle, FaTimes } from "react-icons/fa";
import Components from "@/components";
import { styled } from "@mui/material";
import { useDispatch } from "react-redux";
import { directImportUnAssignCampaign, deleteDirectImport } from "@/store/actions";
import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useElementSize, useGlobalContext } from "@/hooks";
import { useSelector } from "react-redux";
import PaginationComp from "./Pagination";
import PaginationDropDown from "./PaginationDropDown";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];
function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const LightTooltip = styled(Components.Common.LightTooltip)`
  & > .MuiTooltip-tooltip {
    text-align: center;
    max-width: 20rem;
  }
`;

export default function DirectImportTable({ directImportData, numberOfRowsShowing, searchText, loadingDelete, handlePageChange, handleLimitChange, currentPage, user }) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [campaignSelected, setCampaignSelected] = React.useState(2);
  const [isModelOpen, setIsModelOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { setErrorModalError } = useGlobalContext();
  const [selectedDeleteId, setSelectedDeleteId] = useState("");
  const { elementRef, size: rowSize } = useElementSize();
  const [isLoading, setIsLoading] = useState(false)
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleDeleteClick = (id) => {
    setSelectedDeleteId(id);
    setIsModelOpen(true); // Open the modal
  };


  useEffect(() => {
    if (loadingDelete == "completed") {
      setIsModelOpen(false);
      setIsLoading(false)
    }
  }, [loadingDelete])

  const handleDeleteConfirm = () => {
    console.log('"asdasdasdd')
    if (selectedDeleteId) {
      dispatch(
        deleteDirectImport({
          _id: selectedDeleteId,
          limit: numberOfRowsShowing,
          page: currentPage,
          search: searchText,
        })
      );
    }
    setSelectedDeleteId("");
  };



  return (
    <div style={{ height: "100%" }}>
      <TableContainer
        style={{ border: '1px solid #E0E0E0', borderRadius: '8px', borderEndEndRadius: 0, borderEndStartRadius: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'none' }}
        component={Paper}
        sx={{
          height: "100%",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "2px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#F7F7F7",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#F7F7F7",
          },
          "&::-webkit-scrollbar-button": {
            display: "none",
          },
          scrollbarWidth: "thin",
          scrollbarColor: "#00BD82 transparent",
          position: "relative"

        }}
      >

        <Table sx={{ minWidth: 1200, overflowX: 'auto' }} aria-label="simple table" >
          <TableHead sx={{ position: "sticky", top: "0px", zIndex: 100, backgroundColor: "white" }}>
            <TableRow >
              <TableCell
                sx={{ width: "288px", minWidth: "288px" }}
                style={{

                  paddingBlock: '13px'
                }}
              >
                <p style={{
                  color: "#012635",
                  fontSize: "13px",
                  fontWeight: 500,
                  fontFamily: 'fellix', lineHeight: "21.5px"
                }}>
                  List Name
                </p>
              </TableCell>
              <TableCell
                sx={{ width: "100px", minWidth: "100px" }}
                style={{

                  paddingBlock: '13px'
                }}
              >
                <div style={{
                  color: "#012635",
                  fontSize: "13px",
                  fontWeight: 500,
                  fontFamily: 'fellix', lineHeight: "21.5px",
                  display: "flex",
                  alignItems: "center"
                }}>
                  Total Rows

                  <LightTooltip
                    title="Total number of rows in your list"
                    arrow
                    placement="top"
                  >
                    <div style={{ maxHeight: "20px", display: "flex", paddingLeft: "10px" }}>
                      <IoIosInformationCircleOutline size={18} />

                    </div>

                  </LightTooltip>


                </div>
              </TableCell>
              <TableCell
                sx={{ width: "129px", minWidth: "129px" }}
                style={{

                  paddingBlock: '13px'
                }}
              >
                <div style={{
                  color: "#012635",
                  fontSize: "13px",
                  fontWeight: 500,
                  fontFamily: 'fellix', lineHeight: "21.5px",
                  display: "flex",
                  alignItems: "center"
                }}>
                  Total Prospects
                  <LightTooltip
                    title="Total number of Prospects with atleast one mobile phone number"
                    arrow
                    placement="top"
                  >
                    <div style={{ maxHeight: "20px", display: "flex", paddingLeft: "10px" }}>
                      <IoIosInformationCircleOutline size={18} />

                    </div>

                  </LightTooltip>
                </div>
              </TableCell>
              <TableCell
                sx={{ width: "90px", minWidth: "90px" }}
                style={{

                  paddingBlock: '13px'
                }}
              >
                <div style={{
                  color: "#012635",
                  fontSize: "13px",
                  fontWeight: 500,
                  fontFamily: 'fellix', lineHeight: "21.5px",
                  display: "flex",
                  alignItems: "center"
                }}>
                  Mobiles
                  <LightTooltip
                    title={<>Total Mobile phone numbers that you Prospects have.<br /><i>Hint: ZeitBlast texts the first 3 mobiles</i> </>}
                    arrow
                    placement="top"
                  >
                    <div style={{ maxHeight: "20px", display: "flex", paddingLeft: "10px" }}>
                      <IoIosInformationCircleOutline size={18} />

                    </div>

                  </LightTooltip>
                </div>
              </TableCell>
              <TableCell
                sx={{ width: "94px", minWidth: "94px" }}
                style={{

                  paddingBlock: '13px'
                }}
              >
                <p style={{
                  color: "#012635",
                  fontSize: "13px",
                  fontWeight: 500,
                  fontFamily: 'fellix', lineHeight: "21.5px",
                  display: "flex",
                  alignItems: "center"
                }}>
                  Landlines
                  <LightTooltip
                    title={
                      <>
                        Total Landline numbers identified. <br />
                        <i>Hint: ZeitBlast texts mobiles only.</i>
                      </>
                    }
                    arrow
                    placement="top"
                  >
                    <div style={{ maxHeight: "20px", display: "flex", paddingLeft: "10px" }}>
                      <IoIosInformationCircleOutline size={18} />

                    </div>

                  </LightTooltip>
                </p>
              </TableCell>
              <TableCell
                sx={{ width: "64px", minWidth: "64px" }}
                style={{

                  paddingBlock: '13px'
                }}
              >
                <div style={{
                  color: "#012635",
                  fontSize: "13px",
                  fontWeight: 500,
                  fontFamily: 'fellix', lineHeight: "21.5px",
                  display: "flex",
                  alignItems: "center"
                }}>
                  VOIP
                  <LightTooltip
                    title="VOIP identified and removed"
                    arrow
                    placement="top"
                  >
                    <div style={{ maxHeight: "20px", display: "flex", paddingLeft: "10px" }}>
                      <IoIosInformationCircleOutline size={18} />

                    </div>

                  </LightTooltip>
                </div>
              </TableCell>
              <TableCell
                sx={{ width: "64px", minWidth: "64px" }}
                style={{

                  paddingBlock: '13px'
                }}
              >
                <div style={{
                  color: "#012635",
                  fontSize: "13px",
                  fontWeight: 500,
                  fontFamily: 'fellix', lineHeight: "21.5px",
                  display: "flex",
                  alignItems: "center"
                }}>
                  DNC
                  <LightTooltip
                    title="Prospects already on the internal. Do Not Call list"
                    arrow
                    placement="top"
                  >
                    <div style={{ maxHeight: "20px", display: "flex", paddingLeft: "10px" }}>
                      <IoIosInformationCircleOutline size={18} />

                    </div>

                  </LightTooltip>
                </div>
              </TableCell>
              <TableCell
                sx={{ width: "100px", minWidth: "100px" }}
                style={{

                  paddingBlock: '13px'
                }}
              >
                <p style={{
                  color: "#012635",
                  fontSize: "13px",
                  fontWeight: 500,
                  fontFamily: 'fellix', lineHeight: "21.5px" , 
                      display: "flex",
                  alignItems: "center" , 
                }}>
                  Duplicates
                  <LightTooltip
                    title="This indicates that there are duplicate entries within the file."
                    arrow
                    placement="top"
                  >
                    <div style={{ maxHeight: "20px", display: "flex", paddingLeft: "10px" }}>
                      <IoIosInformationCircleOutline size={18} />

                    </div>

                  </LightTooltip>
                </p>
              </TableCell>
              <TableCell
                sx={{ width: "140px", minWidth: "140px" }}
                style={{

                  paddingBlock: '13px'
                }}
              >
                <div style={{
                  color: "#012635",
                  fontSize: "13px",
                  fontWeight: 500,
                  fontFamily: 'fellix', lineHeight: "21.5px",
                  display: "flex",
                  alignItems: "center"
                }}>
                  Existing Matches
                  <LightTooltip
                    title="Prevously imported Prospects."
                    arrow
                    placement="top"
                  >
                    <div style={{ maxHeight: "20px", display: "flex", paddingLeft: "10px" }}>
                      <IoIosInformationCircleOutline size={18} />

                    </div>

                  </LightTooltip>
                </div>
              </TableCell>
              <TableCell
                sx={{ width: "94px", minWidth: "94px" }}
                style={{

                  paddingBlock: '13px'
                }}
              >
                <p style={{
                  color: "#012635",
                  fontSize: "13px",
                  fontWeight: 500,
                  fontFamily: 'fellix', lineHeight: "21.5px"
                }}>
                  Created
                </p>
              </TableCell>
              {(user.role === 'admin' || user.permissions.includes('Delete') || user.permissions.includes('Download File')) && (
                <TableCell
                  sx={{ width: "117px", minWidth: "115px" }}
                  style={{

                    paddingBlock: '13px',
                  }}
                >
                  <p style={{
                    color: "#012635",
                    fontSize: "13px",
                    fontWeight: 500,
                    fontFamily: 'fellix', lineHeight: "21.5px"
                  }}>
                    Action
                  </p>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody >
            {directImportData?.results?.length === 0 && (
              <tr>
                <td colSpan={11} className="error">
                  <center>No Record Found</center>
                </td>
              </tr>
            )}
            {directImportData?.results?.map((singleDirectImport, index) => (

              <TableRow
                key={index}
                ref={index === 0 ? elementRef : null}
                onDelete={() => setSelectedDeleteId(singleDirectImport?._id)}
                singleDirectImport={singleDirectImport}
                limit={numberOfRowsShowing}
                page={numberOfRowsShowing}
                search={searchText}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": {
                    backgroundColor: "#F7F7F7", // Change this to the desired hover color
                  },
                  borderBottom: "solid 1px #E0E0E0"
                }}
              >
                <TableCell
                  style={{
                    paddingInline: "16px",
                    paddingBlock: "8px",
                  }}
                  // sx={{ border: 0, paddingBottom: "5px" }}
                  sx={{ minWidth: "288px", minWidth: "288px" }}
                  component="th"
                  scope="row"
                >
                  <div>
                    <div
                      style={{
                        color: "#777777",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "22px",

                      }}
                    >
                      {singleDirectImport.listName
                        ? singleDirectImport.listName.endsWith(".csv")
                          ? singleDirectImport.listName.slice(
                            0,
                            singleDirectImport.listName.length - 4
                          )
                          : singleDirectImport.listName
                        : "--"}
                    </div>
                    {(user.role === 'admin' || user.permissions.includes('Assign to Campaign')) && (
                      <div>
                        {singleDirectImport?.status === "pending" ? (
                          <p className="info">In Queue</p>
                        ) : singleDirectImport?.isCampaignAssigned ? (
                          <div  style={{ backgroundColor:"#C2FFEC" ,  border: "solid 1px #5BF1B2 ", borderRadius: "12px", width: "fit-content", fontSize: "12px", fontWeight: 500, lineHeight: "20px", height: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0px 8px", minWidth: "80px", marginTop: "5px" }} className={styles.tableButton}>
                            {/* <span className="icon">
                            <FaBullhorn />
                          </span> */}
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
                              title={singleDirectImport?.sentCount == 0 ? "Remove list from campaign" : <span style={{ color: "red" }}>This list cannot be removed as messages have already been sent.</span>}
                              placement="top"
                              arrow
                            >
                              <button
                                style={{ height: "15px" }}
                                className={styles.TableIconClose}
                                onClick={() => {
                                  if (singleDirectImport?.sentCount == 0) {
                                    dispatch(
                                      directImportUnAssignCampaign(
                                        {
                                          _id: singleDirectImport._id,

                                          limit: 10,
                                          page: 1,
                                          search: searchText || "",
                                        },
                                        () => { },
                                        (e) => {
                                          if (e?.response?.status === 400) {
                                            setErrorModalError({
                                              title: `List ${singleDirectImport.listName
                                                ? singleDirectImport.listName.endsWith(
                                                  ".csv"
                                                )
                                                  ? singleDirectImport.listName.slice(
                                                    0,
                                                    singleDirectImport.listName
                                                      .length - 4
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
                                  }

                                }}
                              >
                                <FaTimes />
                              </button>
                            </LightTooltip>
                          </div>
                        ) : (
                          singleDirectImport?.totalPropspects !== 0 && (
                            <CompaignModal
                              singleDirectImport={singleDirectImport}
                              currentPage={currentPage}
                              numberOfRowsShowing={numberOfRowsShowing}
                            >
                              <div  className={styles.tableButton}>
                                <span
                                  style={{
                                    display:
                                      campaignSelected == index ? "" : "none",
                                  }}
                                  className={styles.firstText}
                                >

                                </span>{" "}
                                <span>

                                </span>{" "}
                                <span
                                  style={{
                                    display: "block"

                                  }}
                                  className={styles.secText}
                                >
                                  Assign to Campaign
                                </span>{" "}
                                <IoIosArrowDown

                                  className={styles.TableIcon}
                                />
                              </div>
                            </CompaignModal>

                          )
                        )}
                      </div>)}
                  </div>
                </TableCell>
                <TableCell
                  style={{
                    color: "#777777",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "22px",
                    border: 0,
                    paddingInline: "16px",
                    paddingBlock: "8px",
                  }}
                >
                  <div style={{ display: "flex", gap: "5px" }}>
                    {" "}
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <GoDotFill style={{ color: "#6955DA" }} />
                    </span>{" "}
                    <div>
                      {singleDirectImport?.totalRows
                        ? singleDirectImport?.totalRows
                        : 0}
                    </div>{" "}
                  </div>
                </TableCell>
                <TableCell
                  style={{
                    color: "#777777",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "22px",
                    border: 0,
                    paddingInline: "16px",
                    paddingBlock: "8px",
                  }}
                >
                  <div style={{ display: "flex", gap: "5px" }}>
                    {" "}
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <GoDotFill style={{ color: "#3086EE" }} />
                    </span>{" "}
                    <div>
                      {" "}
                      {singleDirectImport?.totalPropspects &&
                        singleDirectImport.totalPropspects}
                    </div>{" "}
                  </div>
                </TableCell>
                <TableCell
                  style={{
                    color: "#777777",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "22px",
                    border: 0,
                    paddingInline: "16px",
                    paddingBlock: "8px",
                  }}
                >
                  <div style={{ display: "flex", gap: "5px" }}>
                    {" "}
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <GoDotFill style={{ color: "#06AB78" }} />
                    </span>{" "}
                    <div>
                      {singleDirectImport?.mobile && singleDirectImport.mobile}
                    </div>{" "}
                  </div>
                </TableCell>
                <TableCell
                  style={{
                    color: "#777777",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "22px",
                    border: 0,
                    paddingInline: "16px",
                    paddingBlock: "8px",
                  }}
                >
                  <div style={{ display: "flex", gap: "5px" }}>
                    {" "}
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <GoDotFill style={{ color: "#E0E0E0" }} />
                    </span>{" "}
                    <div>
                      {singleDirectImport?.landlines &&
                        singleDirectImport.landlines}
                    </div>{" "}
                  </div>
                </TableCell>
                <TableCell
                  style={{
                    color: "#777777",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "22px",
                    border: 0,
                    paddingInline: "16px",
                    paddingBlock: "8px",
                  }}
                >
                  <div style={{ display: "flex", gap: "5px" }}>
                    {" "}
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <GoDotFill style={{ color: "#FF5D3E" }} />
                    </span>{" "}
                    <div>
                      {" "}
                      {singleDirectImport?.litigators &&
                        singleDirectImport.litigators}
                    </div>{" "}
                  </div>
                </TableCell>
                <TableCell
                  style={{
                    color: "#777777",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "22px",
                    border: 0,
                    paddingInline: "16px",
                    paddingBlock: "8px",
                  }}
                >
                  <div style={{ display: "flex", gap: "5px" }}>
                    {" "}
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <GoDotFill style={{ color: "#FF5D3E" }} />
                    </span>{" "}
                    <div>
                      {singleDirectImport?.dnc && singleDirectImport.dnc}
                    </div>{" "}
                  </div>
                </TableCell>

                <TableCell
                  style={{
                    color: "#777777",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "22px",
                    border: 0,
                    paddingInline: "16px",
                    paddingBlock: "8px",
                  }}
                >
                  <div style={{ display: "flex", gap: "5px" }}>
                    {" "}
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <GoDotFill style={{ color: "#3086EE" }} />
                    </span>{" "}
                    <div>
                      {singleDirectImport.duplicates ?? "0"}
                    </div>{" "}
                  </div>
                </TableCell>
                <TableCell
                  style={{
                    color: "#777777",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "22px",
                    border: 0,
                    paddingInline: "16px",
                    paddingBlock: "8px",
                  }}
                >
                  <div style={{ display: "flex", gap: "5px" }}>
                    {" "}
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <GoDotFill style={{ color: "#FFC000" }} />
                    </span>{" "}
                    <div>{singleDirectImport.excistingMatches ?? "0"}</div>{" "}
                  </div>
                </TableCell>
                <TableCell
                  style={{
                    color: "#777777",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "22px",
                    border: 0,
                    paddingInline: "16px",
                    paddingBlock: "8px",
                  }}
                >
                  {formatDateToShort(
                    singleDirectImport?.createdAt ?? "-/-/----"
                  )}
                </TableCell>
                {(user.role === 'admin' || user.permissions.includes('Delete') || user.permissions.includes('Download File')) && !singleDirectImport.preDefined && (
                  <TableCell
                    style={{
                      color: "#777777",
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: "22px",
                      border: 0,
                      paddingInline: "16px",
                      paddingBlock: "8px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      {(user.role === 'admin' || user.permissions.includes('Download File')) && (
                        <DownloadPopover singleDirectImport={singleDirectImport}>
                          <img
                            style={{ cursor: "pointer" }}
                            src={Assets.Images.download}
                          />
                        </DownloadPopover>
                      )}
                      {(user.role === 'admin' || user.permissions.includes('Delete')) && (
                        singleDirectImport?.status != "pending" && (
                          singleDirectImport.sentCount == 0 ? (
                            <img
                              onClick={() => handleDeleteClick(singleDirectImport._id)}
                              style={{ cursor: "pointer" }}
                              src={Assets.Images.dellTable}
                              alt="Delete"
                            />
                          ) : (
                            <LightTooltip
                              placement="top"
                              title={<span style={{ color: "red" }}>
                                Text messages have been sent out on this file, you can't delete it
                              </span>}
                            >
                              <img
                                onClick={() => {
                                  if (singleDirectImport?.assignCampaign?.sentALL === 0) {
                                    handleDeleteClick(singleDirectImport._id);
                                  }
                                }}
                                style={{ cursor: "pointer" }}
                                src={Assets.Images.dellTable}
                                alt="Delete"
                              />
                            </LightTooltip>
                          )
                        )
                      )}


                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "56px",
            backgroundColor: "white",
            borderTop: "1px solid var(--Extra-Grey, #e0e0e0)",
            minWidth: '1278px',
            padding: "0px 16px",
            alignItems: "center",
            paddingTop: "10px ",
            paddingBottom: "10px",
            position: "sticky",
            bottom: "0px",
            zIndex: 100,
            backgroundColor: "white"
          }}
        >
          <p style={{ color: '#012635', lineHeight: '22px', fontSize: '14px', fontWeight: 500 }}>
            Total:{" "}
            {directImportData?.totalResults ? directImportData.totalResults : 0}
          </p>

          <div>
            <PaginationComp
              totalPages={directImportData?.totalPages || 1}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "22px",
                fontWeight: 500,
                color: "#333333",
              }}
            >
              Entries
            </p>

            <div>
              <PaginationDropDown limit={numberOfRowsShowing} onLimitChange={handleLimitChange} />
            </div>
          </div>
        </div> */}
      </TableContainer>
      <Components.Common.DeleteModal
        onClose={() => {
          setIsModelOpen(false);
          setSelectedDeleteId("");
        }}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onOkay={handleDeleteConfirm}
        open={isModelOpen}
        deleteItemName="Direct Import"
        deleteItemText="Are you sure you want to delete this direct import? This action cannot be undone."
      />
    </div>
  );
}
