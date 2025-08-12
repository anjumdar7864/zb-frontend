import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PhoneInput from "react-phone-input-2";
import SwitchButton from "@/components/common/Switch/Switch";
import MorePopover from "./MorePopover";
import { MdMoreVert } from "react-icons/md";
import { BsPlusLg } from "react-icons/bs";
import DeleteModal from "./DeleteModal";
import ReplaceModal from "./ReplaceModal";
import { commonAPICall } from "@/services/api/common";
import { ENDPOINTS, REQUEST_TYPES } from "@/utils/constant/url";
import { useDispatch } from "react-redux";
import { increaseMarketLimitAction } from "@/store/actions/market.action";
import { set } from "date-fns";
import styles from "./Flags.module.css";
import { CircularLoader } from "@/components/common";
import { logOut } from "@/store/actions";
import { useNavigate } from "react-router-dom";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(" 414 378 7255", true, "Original", "4/11/2024 • 09:15:56", 4.0),
  createData(" 414 378 7255", false, "Delete", "4/11/2024 • 09:15:56", 4.3),
  createData(" 414 378 7255", true, "Replaced", "4/11/2024 • 09:15:56", 6.0),
  createData(" 414 378 7255", false, "Original", "4/11/2024 • 09:15:56", 4.3),
  createData(" 414 378 7255", true, "Replaced", "4/11/2024 • 09:15:56", 3.9),
];

const OutBoundNumberTable = ({
  arr,
  tenantId,
  selectedNumber,
  refreshDetails,
  marketId,
  noMessageSent
}) => {
  const [addNumber, setAddNumber] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openReplace, setOpenReplace] = React.useState(false);
  const [out_bondNumber, setOut_bondNumber] = React.useState("");
  const [curruntNumber, setCurrentNumber] = React.useState("");
  const [originalNumber, setOriginalNumber] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);

    // Get date components
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();

    // Get time components
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Format date and time
    return `${day}/${month}/${year} • ${hours}:${minutes}:${seconds}`;
  };
  const handleActive = async (row, value) => {

    try {
      const { data, isError, message, sessionExpired } = await commonAPICall(
        REQUEST_TYPES.PATCH,
        `${ENDPOINTS.ACTIVE_STATUS}${
          row?.originalNumber
            ? `?phone=${row?.originalNumber}`
            : row?.number
            ? `?phone=${row?.number}`
            : `?phone=${row?.replacedTo?.number}`
        }`,
        {
          active: value,
          tenantId: tenantId,
          mode: "flag",
        }
      );
      if (sessionExpired) {
        // sessionStorage.clear()
        dispatch(logOut());

        navigate("/Login");
      }
      if (isError) {
        return toast.error(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddOutbondNumber = () => {
    setLoading(true);

    const out_bondNumberUpdate = out_bondNumber.toString().replace("1", "");

    dispatch(
      increaseMarketLimitAction(
        {
          body: {
            phone: [out_bondNumberUpdate.replace(/\D/g, "")],
            phoneNumber: [
              {
                number: out_bondNumberUpdate.replace(/\D/g, ""),
                date: new Date(),
              },
            ],
            tenantId,
          },
          _id: marketId,
        },
        () => {
          refreshDetails();
          setAddNumber(false);
          setLoading(false);
        }
      )
    );
  };

  return (
    <div>
      <TableContainer
        style={{
          boxShadow: 0,
          border: "solid 1px #E0E0E0",
          borderRadius: "8px",
        }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  color: "#012635",
                  fontWeight: 500,
                  fontSize: "14px",
                  padding: "0px 16px",
                  height: "48px",
                }}
              >
                Outbound Number
              </TableCell>
              <TableCell
                style={{
                  color: "#012635",
                  fontWeight: 500,
                  fontSize: "14px",
                  padding: "0px 16px",
                  height: "48px",
                }}
              >
                Active
              </TableCell>
              <TableCell
                style={{
                  color: "#012635",
                  fontWeight: 500,
                  fontSize: "14px",
                  padding: "0px 16px",
                  height: "48px",
                }}
              >
                Status
              </TableCell>
              <TableCell
                style={{
                  color: "#012635",
                  fontWeight: 500,
                  fontSize: "14px",
                  padding: "0px 16px",
                  height: "48px",
                }}
              >
                Time Stamp
              </TableCell>
              <TableCell
                style={{
                  color: "#012635",
                  fontWeight: 500,
                  fontSize: "14px",
                  padding: "0px 16px",
                  height: "48px",
                }}
                align="center"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                style={{ padding: "0px 16px", height: "48px" }}
                component="th"
                scope="row"
              >
                <PhoneInput
                  searchPlaceholder="Search here"
                  enableSearch={true}
                  value={`1 ${
                    arr?.replaceHistory ? arr?.originalNumber : arr?.number
                  }`}
                  inputStyle={{ fontFamily: "fellix", color: "#777777" }}
                  maxLength={14}
                  disabled={true}
                  disableDropdown={true}
                  inputClass={arr?.status == "Delete" && styles.strikethrough}
                />
              </TableCell>
              <TableCell style={{ padding: "0px 16px" }}>
                <SwitchButton
                  disabled={arr?.replaceHistory ? true : false}
                  active={arr?.active}
                  row={arr}
                  handleActive={handleActive}
                />
              </TableCell>
              <TableCell style={{ padding: "0px 16px" }}>
                <div
                  style={{
                    border: `solid 1px ${
                      arr?.status == "Delete"
                        ? "#EA3815"
                        : arr?.status == "Replace"
                        ? "#FFE185"
                        : "#5BF1B2"
                    } `,
                    backgroundColor:
                      arr?.status == "Delete"
                        ? "#FFEEEE"
                        : arr?.status == "Replace"
                        ? "#FFF2CC"
                        : "#C2FFEC",
                    color:
                      arr?.status == "Delete"
                        ? "#EA3815"
                        : arr?.status == "Replace"
                        ? "#FFE185"
                        : "#00724E",
                    borderRadius: "12px",
                    padding: "2px 8px",
                    maxWidth: "fit-content",
                  }}
                >
                  {arr?.status ? arr?.status : "Original"}
                </div>
              </TableCell>
              <TableCell
                style={{
                  color: "#777777",
                  fontSize: "14px",
                  fontWeight: 500,
                  padding: "0px 16px",
                }}
              >
                {formatDate(arr?.date)}
              </TableCell>
              <TableCell style={{ padding: "0px 16px" }} align="center">
                <MorePopover
                  number={arr?.number}
                  isReplaceAble={noMessageSent ? false :arr?.replaceHistory ? false : true}
                  isDeleteAble={
                    noMessageSent ? true :
                    arr?.replaceHistory
                      ? arr?.replaceHistory[0]?.replacedFrom?.isDeleteAble
                      : false
                  }
                  orignalNumber={arr?.number}
                  setOriginalNumber={setOriginalNumber}
                  setCurrentNumber={setCurrentNumber}
                  setOpenDelete={setOpenDelete}
                  setOpenReplace={setOpenReplace}
                >
                  <MdMoreVert
                    style={{
                      cursor: "pointer",
                      fontSize: "20px",
                      color: "#777777",
                      textAlign: "right",
                    }}
                  />
                </MorePopover>
              </TableCell>
            </TableRow>

            {arr?.replaceHistory?.map((row, i) => (
              <TableRow
                key={row.number}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  style={{ padding: "0px 16px", height: "48px" }}
                  component="th"
                  scope="row"
                >
                  <PhoneInput
                    searchPlaceholder="Search here"
                    enableSearch={true}
                    value={`1 ${row?.replacedTo?.number}`}
                    inputStyle={{ fontFamily: "fellix", color: "#777777" }}
                    maxLength={14}
                    disabled={true}
                    disableDropdown={true}
                    inputClass={row?.status == "Delete" && styles.strikethrough}
                  />
                </TableCell>
                <TableCell style={{ padding: "0px 16px" }}>
                  <SwitchButton
                    disabled={
                      arr?.replaceHistory?.length == i + 1 ? false : true
                    }
                    active={
                      row?.replacedTo?.active &&
                      arr?.replaceHistory?.length == i + 1
                    }
                    row={row}
                    handleActive={handleActive}
                  />
                </TableCell>
                <TableCell style={{ padding: "0px 16px" }}>
                  <div
                    style={{
                      border: `solid 1px ${
                        row?.replacedTo?.status == "Delete"
                          ? "#EA3815"
                          : row?.replacedTo?.status == "Replace"
                          ? "#FFE185"
                          : "#5BF1B2"
                      } `,
                      backgroundColor:
                        row?.replacedTo?.status == "Delete"
                          ? "#FFEEEE"
                          : row?.replacedTo?.status == "Replace"
                          ? "#FFF2CC"
                          : "#C2FFEC",
                      color:
                        row?.replacedTo?.status == "Delete"
                          ? "#EA3815"
                          : row?.replacedTo?.status == "Replace"
                          ? "#FFE185"
                          : "#00724E",
                      borderRadius: "12px",
                      padding: "2px 8px",
                      maxWidth: "fit-content",
                    }}
                  >
                    {row.replacedTo?.status ? row.replacedTo?.status : "N/A"}
                  </div>
                </TableCell>
                <TableCell
                  style={{
                    color: "#777777",
                    fontSize: "14px",
                    fontWeight: 500,
                    padding: "0px 16px",
                  }}
                >
                  {formatDate(row?.replacedTo?.date)}
                </TableCell>
                <TableCell style={{ padding: "0px 16px" }} align="center">
                  <MorePopover
                    number={row?.replacedTo?.number}
                    isReplaceAble={arr?.replaceHistory.length == i + 1}
                    // isDeleteAble={row?.replacedFrom?.isDeleteAble || false}
                    isDeleteAble={
                      arr?.replaceHistory[i + 1]?.replacedFrom?.isDeleteAble ||
                      false
                    }
                    orignalNumber={
                      arr?.replaceHistory ? arr?.originalNumber : arr?.number
                    }
                    setOriginalNumber={setOriginalNumber}
                    setCurrentNumber={setCurrentNumber}
                    setOpenDelete={setOpenDelete}
                    setOpenReplace={setOpenReplace}
                  >
                    <MdMoreVert
                      style={{
                        cursor: "pointer",
                        fontSize: "20px",
                        color: "#777777",
                        textAlign: "right",
                      }}
                    />
                  </MorePopover>
                </TableCell>
              </TableRow>
            ))}
            {arr?.deleteHistory?.map((row) => (
              <TableRow
                key={row.number}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  style={{ padding: "0px 16px", height: "48px" }}
                  component="th"
                  scope="row"
                >
                  <PhoneInput
                    searchPlaceholder="Search here"
                    enableSearch={true}
                    value={`1 ${row?.number}`}
                    inputStyle={{ fontFamily: "fellix", color: "#777777" }}
                    maxLength={14}
                    disabled={true}
                    disableDropdown={true}
                    inputClass={styles.strikethrough}
                  />
                </TableCell>
                <TableCell style={{ padding: "0px 16px" }}>
                  <SwitchButton active={false} disabled={true} />
                </TableCell>
                <TableCell style={{ padding: "0px 16px" }}>
                  <div
                    style={{
                      border: `solid 1px #EA3815 `,
                      backgroundColor: "#FFEEEE",
                      color: "#EA3815",
                      borderRadius: "12px",
                      padding: "2px 8px",
                      maxWidth: "fit-content",
                    }}
                  >
                    Deleted
                  </div>
                </TableCell>
                <TableCell
                  style={{
                    color: "#777777",
                    fontSize: "14px",
                    fontWeight: 500,
                    padding: "0px 16px",
                  }}
                >
                  {formatDate(row?.date)}
                </TableCell>
                <TableCell style={{ padding: "0px 16px" }} align="center">
                  {/* <MorePopover number={row?.replacedTo?.number} orignalNumber={row?.number} setOriginalNumber={setOriginalNumber} setCurrentNumber={setCurrentNumber} setOpenDelete={setOpenDelete} setOpenReplace={setOpenReplace} > */}
                  <MdMoreVert
                    style={{
                      cursor: "pointer",
                      fontSize: "20px",
                      color: "#777777",
                      textAlign: "right",
                    }}
                  />
                  {/* </MorePopover> */}
                </TableCell>
              </TableRow>
            ))}
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                display: !addNumber && "none",
              }}
            >
              <TableCell
                style={{ padding: "0px 16px", height: "48px" }}
                component="th"
                scope="row"
              >
                <PhoneInput
                  country={"us"}
                  placeholder="Enter Mobile Number"
                  enableSearch={true}
                  onChange={(phone, data) => setOut_bondNumber(phone)}
                  onBlur={handleAddOutbondNumber}
                  inputStyle={{ fontFamily: "fellix", color: "#777777" }}
                  maxLength={14}
                  // disabled={true}
                  disableDropdown={true}
                />
              </TableCell>
              <TableCell style={{ padding: "0px 16px" }}></TableCell>
              <TableCell style={{ padding: "0px 16px" }}></TableCell>
              <TableCell
                style={{
                  color: "#777777",
                  fontSize: "14px",
                  fontWeight: 500,
                  padding: "0px 16px",
                }}
              ></TableCell>
              <TableCell
                style={{ padding: "0px 16px" }}
                align="center"
              ></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          padding: "16px 0px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* <div onClick={() => setAddNumber(true)} style={{ display: "flex", alignItems: "center", color: "#012635", fontWeight: 500, fontSize: "16px", cursor: "pointer" }}><BsPlusLg size={24} style={{ paddingRight: "8px" }} />Add Outbound Number</div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <div onClick={() => setAddNumber(false)} style={{ cursor: "pointer", border: "solid 1px #777777 ", width: "100px", height: "40px", borderRadius: "8px", fontSize: "16px", fontWeight: 500, display: !addNumber ? "none" : "flex", alignItems: "center", justifyContent: "center", color: "#777777" }}>Cancel</div>
                    <button
                        disabled={out_bondNumber.length < 11 ? true : false}
                        style={{ cursor: out_bondNumber.length < 11 ? "" : "pointer", backgroundColor: "#00BD82", width: "100px", height: "40px", borderRadius: "8px", fontSize: "16px", fontWeight: 500, display: !addNumber ? "none" : "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                        {
                            loading ?
                                <CircularLoader color="white" />
                                :
                                "Save"
                        }

                    </button>
                </div> */}
      </div>
      <DeleteModal
        refreshDetails={refreshDetails}
        curruntNumber={curruntNumber}
        originalNumber={originalNumber}
        open={openDelete}
        setOpen={setOpenDelete}
        noMessageSent={noMessageSent}
      />
      <ReplaceModal
        refreshDetails={refreshDetails}
        curruntNumber={curruntNumber}
        originalNumber={originalNumber}
        open={openReplace}
        setOpen={setOpenReplace}
        selectedNumber={selectedNumber}
        tenantId={tenantId}
      />
    </div>
  );
};

export default OutBoundNumberTable;
