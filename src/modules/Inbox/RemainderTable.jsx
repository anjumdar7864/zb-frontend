import { useState, useEffect, useContext } from "react";
import {
  FaBell,
  FaUserAlt,
  FaCheck,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";
import { TbMailFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { If, Then, Else } from "react-if";
import { size, replace } from "lodash-es";
import { toast } from "react-hot-toast";
import moment from "moment-timezone";

import {
  ModalTop,
  DeleteModal,
  MyPagination,
  LightTooltip,
} from "@/components/common";
import {
  getAllRemainders,
  cancelUserReminder,
  sendInboxMessage,
  getUserInboxMessages,
} from "@/store/actions";

import { SelectedInboxItemContext } from "./SelectedInboxItemContext";
import SetRemainderModal from "./SetRemainderModal";
import { RemainderTableStyled } from "./styles";
import PaginationComp from "../DirectImport/Pagination";
import PaginationDropDown from "../DirectImport/PaginationDropDown";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const RemainderTable = ({ setIsRemainderTableOpen }) => {
  const { setSelectedUserInbox } = useContext(SelectedInboxItemContext);
  const [selectedDeleteId, setSelectedDeleteId] = useState("");
  const [sendMessageText, setSendMessageText] = useState("");
  const [selectedEdit, setSelectedEdit] = useState(null);
  const [refreshRemainderList, setRefreshRemainderList] = useState(true);
  const [currentReminder, setCurrentReminder] = useState(null);
  const { selectedUserInbox } = useContext(SelectedInboxItemContext);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {
    results: reminders,
    loading,
    totalResults,
    limit,
    totalPages,
  } = useSelector((s) => s.reminderReducer);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitCheck, setLimit] = useState(10);

  useEffect(() => {
    dispatch(
      getAllRemainders({
        limit: limitCheck,

        page: currentPage,
      })
    );
  }, [currentPage, refreshRemainderList]);
  const { loading: sendMessageLoading } = useSelector(
    (s) => s.sendInboxMessage
  );

  const markAsCompleteClick = (e, reminder) => {
    e.stopPropagation();
    dispatch(
      cancelUserReminder(reminder.inbox._id, () => {
        toast.success("Reminder mark as complete");
        setRefreshRemainderList(!refreshRemainderList);
      })
    );
  };

  const sendMessage = (e, reminder) => {
    e.stopPropagation();
    let phone = currentReminder.to || currentReminder?.inbox?.to;
    // let phone = currentReminder.inbox.to;
    let type = "";
    if (currentReminder?.inbox?.isVerifiedNumberPhone2 === true) {
      phone = currentReminder?.inbox?.phone2;
      type = "phone2";
    } else if (currentReminder?.inbox?.isVerifiedNumberPhone3 === true) {
      phone = currentReminder?.inbox?.phone3;
      type = "phone3";
    }
    dispatch(
      sendInboxMessage(
        type,
        {
          phone: phone,
          batchId: currentReminder?.inbox.batch,
          userName: currentReminder.prospect,
          message: sendMessageText,
          senderPhoneNumber: currentReminder.from,
          reminderId: reminder?._id,
        },
        () => {
          if (selectedUserInbox?.to) {
            dispatch(
              getUserInboxMessages({
                from: replace(selectedUserInbox.from, "+", ""),
                to: replace(selectedUserInbox.to, "+", ""),
                limit: 50,
              })
            );
          } else if (selectedUserInbox?.phone2) {
            dispatch(
              getUserInboxMessages({
                from: replace(selectedUserInbox.from, "+", ""),
                phone2: replace(selectedUserInbox.phone2, "+", ""),
                limit: 50,
              })
            );
          } else if (selectedUserInbox?.phone3) {
            dispatch(
              getUserInboxMessages({
                from: replace(selectedUserInbox.from, "+", ""),
                phone3: replace(selectedUserInbox.phone3, "+", ""),
                limit: 50,
              })
            );
          }
          setRefreshRemainderList(!refreshRemainderList);
          setSendMessageText("");
          setCurrentReminder(null);
        }
      )
    );
  };

  const sendMessageFromMarkAsCompleted = (e, reminder) => {
    e.stopPropagation();
    let phone = reminder.to;
    let type = "";
    if (reminder?.inbox?.isVerifiedNumberPhone2 === true) {
      phone = reminder?.inbox?.phone2;
      type = "phone2";
    } else if (reminder?.inbox?.isVerifiedNumberPhone3 === true) {
      phone = reminder?.inbox?.phone3;
      type = "phone3";
    }
    dispatch(
      sendInboxMessage(
        type,
        {
          phone: phone,
          batchId: reminder?.inbox.batch,
          userName: reminder.prospect,
          message: reminder?.message,
          senderPhoneNumber: reminder.from,
          reminderId: reminder?._id,
        },
        () => {
          if (selectedUserInbox?.to) {
            dispatch(
              getUserInboxMessages({
                from: replace(selectedUserInbox.from, "+", ""),
                to: replace(selectedUserInbox.to, "+", ""),
                limit: 50,
              })
            );
          } else if (selectedUserInbox?.phone2) {
            dispatch(
              getUserInboxMessages({
                from: replace(selectedUserInbox.from, "+", ""),
                phone2: replace(selectedUserInbox.phone2, "+", ""),
                limit: 50,
              })
            );
          } else if (selectedUserInbox?.phone3) {
            dispatch(
              getUserInboxMessages({
                from: replace(selectedUserInbox.from, "+", ""),
                phone3: replace(selectedUserInbox.phone3, "+", ""),
                limit: 50,
              })
            );
          }
          setRefreshRemainderList(!refreshRemainderList);
          setSendMessageText("");
          setCurrentReminder(null);
        }
      )
    );
  };

  let userInfo = localStorage.getItem("user") || localStorage.getItem("user");
  userInfo = JSON.parse(userInfo);
  const formatDate = (date) => {
    const validDate = date instanceof Date ? date : new Date(date);

    if (isNaN(validDate)) {
      console.error("Invalid date provided:", date);
      return "Invalid Date";
    }
    const formattedDate = new Intl.DateTimeFormat(undefined, {
      timeZone: userInfo?.timeZone || "UTC", // Default to UTC if timezone is undefined
      month: "numeric",
      day: "numeric",
      year: "2-digit",
    }).format(validDate);

    return formattedDate;
  };
  return (
    <>
      <RemainderTableStyled>
        <h2>
          <span className="icon">
            <FaBell />
          </span>
          <span className="text">Current Reminders</span>
          <div style={{ flexGrow: 1, display: "flex", justifyContent: "end" }}>
            <MdOutlineClose
              style={{ cursor: "pointer" }}
              size={24}
              onClick={() => {
                setIsRemainderTableOpen(false);
                navigate("/inbox");
              }}
            />
          </div>
        </h2>
        <div className="overflow">
          <table>
            <thead>
              <tr>
                <th>Prospect</th>
                <th>Set For</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <If condition={!size(reminders)}>
                <Then>
                  <tr>
                    <td className="error" colSpan={4}>
                      {loading ? "Loading" : "No Data"}
                    </td>
                  </tr>
                </Then>
                <Else>
                  {reminders?.map((reminder, i) => (
                    <tr key={i}>
                      <td>{reminder.prospect}</td>
                      <td>{reminder?.date && formatDate(reminder.date)}</td>
                      <td>{reminder.note}</td>
                      <td>
                        {/* <button onClick={() => setSelectedEdit(reminder)}>
                          <FaEdit />
                        </button> */}
                        <If condition={currentReminder?._id === reminder?._id}>
                          <Then>
                            <div>
                              <textarea
                                rows="1"
                                onChange={(e) =>
                                  setSendMessageText(e.target.value)
                                }
                                value={sendMessageText}
                              >
                                {sendMessageText}
                              </textarea>
                              <button
                                onClick={(e) => sendMessage(e, reminder)}
                                disabled={sendMessageLoading}
                              >
                                <span className="text">
                                  {sendMessageLoading ? "Sending" : "Send"}
                                </span>
                                <span className="icon">
                                  <FaArrowRight />
                                </span>
                              </button>
                              <div
                                className="crossButton"
                                onClick={() => setCurrentReminder(null)}
                              >
                                <span className="icon">
                                  <FaTimes />
                                </span>
                              </div>
                            </div>
                          </Then>
                          <Else>
                            {" "}
                            <LightTooltip
                              arrow
                              placement="left"
                              title="Send Message"
                            >
                              <button
                                onClick={() => {
                                  setCurrentReminder(reminder);
                                  setSendMessageText(reminder?.message);
                                }}
                              >
                                <TbMailFilled />
                              </button>
                            </LightTooltip>
                            <LightTooltip
                              arrow
                              placement="left"
                              title="View Prospect"
                            >
                              <button
                                onClick={() =>
                                  setSelectedUserInbox({
                                    ...reminder,
                                    _id: reminder.inbox,
                                  })
                                }
                              >
                                <FaUserAlt />
                              </button>
                            </LightTooltip>
                            <LightTooltip
                              arrow
                              placement="left"
                              title="Mark as complete"
                            >
                              <button
                                onClick={(e) =>
                                  sendMessageFromMarkAsCompleted(e, reminder)
                                }
                              >
                                <FaCheck />
                              </button>
                            </LightTooltip>
                          </Else>
                        </If>
                      </td>
                    </tr>
                  ))}
                </Else>
              </If>
            </tbody>
          </table>
        </div>
        {/* <div className="bottom">
          <div className="left">
            <span>Total: {totalResults}</span>
          </div>
          <div className="center">
            <MyPagination
              currentPage={currentPage}
              onChange={(p) => setCurrentPage(p)}
              availableNumberOfRows={[limit]}
              currentlySelectedNumberOfRows={limit}
              // onChangeNumberOfRows={(p) => setNumberOfRowsShowing(p)}
              totalItems={totalResults}
            />
          </div>
          <div className="right"></div>
        </div> */}
        <div className="paginationMobile">
          <div>Total: {totalResults}</div>

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
              <PaginationDropDown
                limit={limitCheck}
                onLimitChange={(event) => setLimit(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div
          className="paginationDesktop"
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "56px",
            backgroundColor: "white",
            border: "solid 1px #E0E0E0",
            borderEndEndRadius: "12px",
            borderBottomLeftRadius: "12px",
            padding: "0px 16px",
            alignItems: "center",
            paddingTop: "10px ",
            paddingBottom: "10px",
          }}
        >
          <div className="desktopView">Total: {totalResults}</div>

          <div>
            <PaginationComp
              totalPages={totalPages || 1}
              currentPage={currentPage}
              onPageChange={(e, value) => setCurrentPage(value)}
            />
          </div>

          <div
            className="desktopViewTwo"
            style={{ alignItems: "center", gap: "10px" }}
          >
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
              <PaginationDropDown
                limit={limitCheck}
                onLimitChange={(event) => setLimit(event.target.value)}
              />
            </div>
          </div>
        </div>
        <DeleteModal
          onClose={() => setSelectedDeleteId("")}
          onOkay={() => setSelectedDeleteId("")}
          open={Boolean(selectedDeleteId)}
          deleteItemName="Reminder"
        />
      </RemainderTableStyled>
      <ModalTop open={selectedEdit} onClose={() => {}}>
        <SetRemainderModal
          onClose={() => setSelectedEdit(null)}
          selectedUserInbox={{
            _id: selectedEdit?.inbox,
            userName: selectedEdit?.prospect,
            to: selectedEdit?.to,
            from: selectedEdit?.from,
          }}
        />
      </ModalTop>
    </>
  );
};

export default RemainderTable;
