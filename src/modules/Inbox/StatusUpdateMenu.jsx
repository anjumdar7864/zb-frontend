import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { When } from "react-if";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";
import { find, size, isEmpty, first } from "lodash-es";
import toast from "react-hot-toast";
import color from "@/styles/color";
import { LightTooltip, ModalTop } from "@/components/common";
import {
  addStatusToInbox,
  changeLeadName,
  removeStatusToInbox,
  UnAssignDripToInbox,
} from "@/store/actions";
import { statusIcons } from "./Filters/StatusFilter";
import LeadTags from "./LeadTags";
import SelectPhoneModal from "./SelectPhoneModal";
import SelectWrongPhoneModal from "./SelectWrongPhoneModal";
import SelectVerifiedPhoneModal from "./SelectVerifiedPhoneModal";
import { DripAutomationModal, DripWarningModal } from "./Modals";
import Assets from "@/assets";

const StatusUpdateMenu = ({
  selectedUserInbox,
  showLeadTags,
  chatboxProps = false,
  chatbox = false,
}) => {
  const dispatch = useDispatch();
  const { results: statuses } = useSelector((s) => s.statusReducer);
  const [isMouseHover, setIsMouseHover] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openWrongPhoneModal, setOpenWrongPhoneModal] = useState(false);
  const [openVerifiedPhoneModal, setOpenVerifiedPhoneModal] = useState(false);
  const [openDripAutomationModal, setOpenDripAutomationModal] = useState(false);
  const [openDripWarningModal, setOpenDripWarningModal] = useState(false);
  const [wrongNumberHeading, setWrongNumberHeading] = useState("");
  const [dncNumberHeading, setDncNumberHeading] = useState("");
  const [phoneList, setPhoneList] = useState([]);
  const [phone, setPhone] = useState(null);
  const [clickedStatus, setClickedStatus] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");

  const {
    _id: id,
    userName,
    status: currentStatus,
    tags,
    responsePhone,
    isVerifiedNumber,
    isWrongNumber,
    isAddedToDNC,
    isVerifiedNumberPhone2,
    isWrongNumberPhone2,
    isAddedToDNCPhone2,
    isVerifiedNumberPhone3,
    isWrongNumberPhone3,
    isAddedToDNCPhone3,
  } = selectedUserInbox;
  const ref = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const targetElement = ref.current;
      if (targetElement && targetElement.contains(e.target)) {
        setIsMouseHover(true);
      } else {
        setIsMouseHover(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    setName(userName);
  }, [userName]);

  useEffect(() => {
    const statusFind = find(statuses, { _id: currentStatus });
    let statusTemp = null;
    if (currentStatus && statusFind) {
      statusTemp = statusIcons[statusFind.name];
    }
    setSelectedStatus(statusTemp);
  }, [currentStatus]);

  const selectStatus = (e, status) => {
    e.stopPropagation();
    setClickedStatus(status);
    const { phone1, phone2, phone3 } = responsePhone;
    let repliesPhone = [];
    setPhoneList([]);
    if (
      !isEmpty(phone1) &&
      !isVerifiedNumber &&
      !isWrongNumber &&
      !isAddedToDNC
    ) {
      repliesPhone.push({
        phone: phone1,
        field: "phone",
      });
    }
    if (
      !isEmpty(phone2) &&
      !isVerifiedNumberPhone2 &&
      !isWrongNumberPhone2 &&
      !isAddedToDNCPhone2
    ) {
      repliesPhone.push({
        phone: phone2,
        field: "phone2",
      });
    }
    if (
      !isEmpty(phone3) &&
      !isVerifiedNumberPhone3 &&
      !isWrongNumberPhone3 &&
      !isAddedToDNCPhone3
    ) {
      repliesPhone.push({
        phone: phone3,
        field: "phone3",
      });
    }

    if (isVerifiedNumber) {
      repliesPhone = [
        {
          phone: phone1,
          field: "phone",
        },
      ];
    }
    if (isVerifiedNumberPhone2) {
      repliesPhone = [
        {
          phone: phone2,
          field: "phone2",
        },
      ];
    }
    if (isVerifiedNumberPhone3) {
      repliesPhone = [
        {
          phone: phone3,
          field: "phone3",
        },
      ];
    }
    if (size(repliesPhone) > 1) {
      setOpenModal(true);
      setPhoneList(repliesPhone);
    } else {
      let replyPhone = first(repliesPhone);
      if (!replyPhone) {
        replyPhone = {
          phone: phone1,
          field: "phone",
        };
      }
      if (currentStatus === "651ebe798042b1b3f4674ea6") {
      } else if (currentStatus == status._id) {
        removeStatus(
          { userName, id },
          {
            [replyPhone.field]: replyPhone.phone,
          }
        );
      } else {
        addStatus(status, {
          status: status._id,
          [replyPhone.field]: replyPhone.phone,
        });
      }
    }
  };

  useEffect(() => {
    if (!isEmpty(phone)) {
      if (currentStatus == clickedStatus._id) {
        removeStatus(
          { userName, id },
          {
            [phone.field]: phone.phone,
          }
        );
      } else {
        addStatus(clickedStatus, {
          status: clickedStatus._id,
          [phone.field]: phone.phone,
        });
      }
    }
  }, [phone]);

  const selectWrongStatus = (e, status) => {
    e.stopPropagation();
    const { to, phone2, phone3 } = selectedUserInbox;
    const phoneList = [];
    if (!isEmpty(to)) {
      phoneList.push({
        phone: to,
        field: "phone",
      });
    }
    if (!isEmpty(phone2)) {
      phoneList.push({
        phone: phone2,
        field: "phone2",
      });
    }
    if (!isEmpty(phone3)) {
      phoneList.push({
        phone: phone3,
        field: "phone3",
      });
    }

    if (size(phoneList) == 1) {
      const phoneItem = first(phoneList);
      if (currentStatus == status._id) {
        removeStatus(
          { userName, id },
          {
            [phoneItem.field]: phoneItem.phone,
          }
        );
      } else {
        addStatus(status, {
          status: status._id,
          [phoneItem.field]: phoneItem.phone,
        });
      }
    } else {
      // setOpenModal(true);
      setOpenWrongPhoneModal(true);
    }
  };

  const addStatus = (status, body) => {
    dispatch(
      addStatusToInbox(id, body, () => {
        const { message } = statusIcons[status.name];
        if (message) {
          toast(message?.content, {
            style: {
              backgroundColor: message.color,
              color: color.White,
            },
          });
        }
        setPhone(null);
        setOpenModal(false);
      })
    );
  };

  const removeStatus = ({ userName, id }, body) => {
    dispatch(
      removeStatusToInbox(id, body, () => {
        toast(`${userName}'s status was removed`, {
          style: {
            backgroundColor: color.Info,
            color: color.White,
          },
        });
        setPhone(null);
        setOpenModal(false);
      })
    );
  };

  const handleDripAutomation = (e, status) => {
    e.stopPropagation();
    const { phone1, phone2, phone3 } = responsePhone;
    if (
      (phone1 &&
        phone2 &&
        phone3 &&
        isVerifiedNumber &&
        (isWrongNumber || isAddedToDNC)) ||
      (isVerifiedNumberPhone2 && (isWrongNumberPhone2 || isAddedToDNCPhone2)) ||
      (isVerifiedNumberPhone3 && (isWrongNumberPhone3 || isAddedToDNCPhone3))
    ) {
      // setOpenDripWarningModal(true);
      setOpenVerifiedPhoneModal(true);
    } else if (
      (phone1 &&
        phone2 &&
        !phone3 &&
        isVerifiedNumber &&
        (isWrongNumber || isAddedToDNC)) ||
      (isVerifiedNumberPhone2 && (isWrongNumberPhone2 || isAddedToDNCPhone2))
    ) {
      // setOpenDripWarningModal(true);
      setOpenVerifiedPhoneModal(true);
    } else if (
      (phone1 &&
        !phone2 &&
        phone3 &&
        isVerifiedNumber &&
        (isWrongNumber || isAddedToDNC)) ||
      (isVerifiedNumberPhone3 && (isWrongNumberPhone3 || isAddedToDNCPhone3))
    ) {
      // setOpenDripWarningModal(true);
      setOpenVerifiedPhoneModal(true);
    } else if (
      (!phone1 &&
        phone2 &&
        phone3 &&
        isVerifiedNumberPhone2 &&
        (isWrongNumberPhone2 || isAddedToDNCPhone2)) ||
      (isVerifiedNumberPhone3 && (isWrongNumberPhone3 || isAddedToDNCPhone3))
    ) {
      // setOpenDripWarningModal(true);
      setOpenVerifiedPhoneModal(true);
    } else if (
      phone1 &&
      !phone2 &&
      !phone3 &&
      isVerifiedNumber &&
      (isWrongNumber || isAddedToDNC)
    ) {
      // setOpenDripWarningModal(true);
      setOpenVerifiedPhoneModal(true);
    } else if (
      !phone1 &&
      phone2 &&
      !phone3 &&
      isVerifiedNumberPhone2 &&
      (isWrongNumberPhone2 || isAddedToDNCPhone2)
    ) {
      // setOpenDripWarningModal(true);
      setOpenVerifiedPhoneModal(true);
    } else if (
      !phone1 &&
      !phone2 &&
      phone3 &&
      isVerifiedNumberPhone3 &&
      (isWrongNumberPhone3 || isAddedToDNCPhone3)
    ) {
      // setOpenDripWarningModal(true);
      setOpenVerifiedPhoneModal(true);
    } else if (
      phone1 &&
      !phone2 &&
      !phone3 &&
      !isVerifiedNumber &&
      (isWrongNumber || isAddedToDNC)
    ) {
      if (isWrongNumber) {
        setWrongNumberHeading("Wrong Number");
      }
      if (isAddedToDNC) {
        setDncNumberHeading("DNC");
      }
      // setOpenDripWarningModal(true);
      setOpenVerifiedPhoneModal(true);
    } else {
      if (currentStatus == status._id) {
        dispatch(
          UnAssignDripToInbox(id, () => {
            toast(`The status has been updated to "No Status".`, {
              style: {
                backgroundColor: color.Info,
                color: color.White,
              },
            });
          })
        );
      } else {
        if (
          !isVerifiedNumber &&
          !isVerifiedNumberPhone2 &&
          !isVerifiedNumberPhone3
        ) {
          setOpenVerifiedPhoneModal(true);
        } else {
          setOpenDripAutomationModal(true);
        }
      }
    }
  };

  const onNameSubmit = () => {
    if (name == "") {
      toast.error("The name field cannot be left empty.");
      setName(userName);
    } else {
      dispatch(changeLeadName(id, { name }));
      setIsEdit(false);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div className="left" ref={ref}>
        <AnimatePresence mode="wait">
          {isMouseHover && !isEdit ? (
            <motion.div
              style={{
                border: "solid 1px #D3D7DD",
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "4px",
                paddingRight: "0px",
                boxShadow: "2px 2px 0px 1px rgba(21, 26, 40, 0.03)",
              }}
              className="hoverItems"
              initial={{ opacity: 0, x: -100 }}
              animate={{
                opacity: 1,
                x: 0,
              }}
            >
              {statuses
                ?.filter((obj) => obj.name != "DNC")
                ?.map((status) => (
                  <LightTooltip
                    key={status._id}
                    arrow
                    placement="top"
                    title={
                      status.name === "Drip" &&
                      selectedUserInbox?.dripAutomation
                        ? selectedUserInbox?.dripAutomation?.name
                          ? selectedUserInbox?.dripAutomation?.name
                          : "drip"
                        : status.name
                    }
                  >
                    <button
                      className={classNames({
                        selected: currentStatus == status._id,
                      })}
                      style={{
                        "--color": statusIcons[status.name].color,
                        "--background":
                          statusIcons[status.name].BackgroundColor,
                      }}
                      onClick={(e) => {
                        status.name === "Wrong Number"
                          ? selectWrongStatus(e, status)
                          : status.name === "Drip"
                          ? handleDripAutomation(e, status)
                          : selectStatus(e, status);
                      }}
                    >
                      {/* {statusIcons[status.name].icon} */}
                      {currentStatus == status._id
                        ? statusIcons[status.name].selectedIcon
                        : statusIcons[status.name].unselectedIcon}
                    </button>
                  </LightTooltip>
                ))}

              {/* <When condition={showLeadTags && size(selectedUserInbox.tags)}>
              <div className="tag" style={{ "--color": "#efefef" }}>
                <span>+{size(selectedUserInbox.tags)} </span>
              </div>
            </When> */}
            </motion.div>
          ) : (
            ""
          )}
          {!isMouseHover || (isMouseHover && isEdit) ? (
            <motion.div
              className="items"
              style={{ padding: "5px 0px" }}
              initial={{ opacity: 0 }}
              key={"two"}
              animate={{
                opacity: 1,
              }}
            >
              <When condition={!!selectedStatus}>
                <button style={{ "--color": selectedStatus?.color }}>
                  {selectedStatus?.selectedIcon}
                </button>
              </When>
              {isEdit ? (
                <input
                  type="text"
                  style={{
                    color: "#012635",
                    fontWeight: 600,
                    fontSize: "18px",
                    border: 0,
                    outline: 0,
                  }}
                  autoFocus={true}
                  value={name}
                  onBlur={onNameSubmit}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <h6
                  style={{
                    fontSize:chatbox ? "18px" : "16px",
                    fontWeight: 600,
                    color: "#012635",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth:"170px"
                  }}
                >
                  {userName}
                </h6>
              )}
              <When condition={showLeadTags}>
                <LeadTags tags={tags} />
              </When>
            </motion.div>
          ) : (
            ""
          )}
        </AnimatePresence>
        <ModalTop open={openModal} onClose={() => {}}>
          <SelectPhoneModal
            onClose={(e) => {
              e.stopPropagation();
              setOpenModal(false);
            }}
            setPhone={setPhone}
            phoneList={phoneList}
          />
        </ModalTop>
        <ModalTop open={openWrongPhoneModal} onClose={() => {}}>
          <SelectWrongPhoneModal
            onClose={(e) => {
              e.stopPropagation();
              setOpenWrongPhoneModal(false);
            }}
            setPhone={setPhone}
            selectedUserInbox={selectedUserInbox}
          />
        </ModalTop>
        <ModalTop open={openDripAutomationModal} onClose={() => {}}>
          <DripAutomationModal
            inboxId={id}
            onClose={(e) => {
              e.stopPropagation();
              setOpenDripAutomationModal(false);
            }}
          />
        </ModalTop>
        <ModalTop open={openVerifiedPhoneModal} onClose={() => {}}>
          <SelectVerifiedPhoneModal
            onClose={(e) => {
              e.stopPropagation();
              setOpenVerifiedPhoneModal(false);
            }}
            setPhone={setPhone}
            selectedUserInbox={selectedUserInbox}
          />
        </ModalTop>
        <ModalTop open={openDripWarningModal} onClose={() => {}}>
          <DripWarningModal
            onClose={() => setOpenDripWarningModal(false)}
            onOkay={() => {
              setOpenDripWarningModal(false);
            }}
            open={openDripWarningModal}
            deleteItemText={`${
              wrongNumberHeading
                ? wrongNumberHeading
                : dncNumberHeading
                ? dncNumberHeading
                : "DNC"
            } can’t be added to the drip`}
          />
        </ModalTop>
      </div>
      {chatboxProps && !isMouseHover ? (
        <div>
          <img
            onClick={() => setIsEdit(true)}
            style={{
              width: "24px",
              height: "24px",
              cursor: "pointer",
              display: isEdit && "none",
            }}
            src={Assets.Icons.pencilIcon}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default StatusUpdateMenu;
