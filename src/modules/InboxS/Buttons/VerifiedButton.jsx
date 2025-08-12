import { useContext, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { toast } from "react-hot-toast";
import { replace, size, first } from "lodash-es";
import { ConfirmModal, LightTooltip } from "@/components/common";
import {
  sendVerifiedNumber,
  removeVerifiedNumber,
  getProspectDetails,
  getUserInboxMessages,
} from "@/store/actions";
import {
  SelectedInboxItemContext,
  SelectedTabContext,
} from "../SelectedInboxItemContext";
import { IoMdCheckmark } from "react-icons/io";
import styles from "./Button.module.css";

const VerifiedButton = () => {
  const { data: userInboxItem, selectedPhone } = useSelector(
    (s) => s.inboxUserMessageReducer
  );
  const { _id: id } = userInboxItem;
  const [openModal, setOpenModal] = useState(false);
  const { phone1, phone2, phone3 } = userInboxItem.responsePhone || {};
  const { selectedUserInbox } = useContext(SelectedInboxItemContext);
  const dispatch = useDispatch();

  const phoneInfo = {
    1: {
      title: userInboxItem.isVerifiedNumber
        ? "This number is marked as Verified"
        : "Marks the phone as Verified",
      isVerifiedNumber: userInboxItem.isVerifiedNumber,
      isWrongNumber: userInboxItem.isWrongNumber,
      isAddedToDNC: userInboxItem.isAddedToDNC,
      phone: userInboxItem.to,
      response: phone1 == userInboxItem.to,
    },
    2: {
      title: userInboxItem.isVerifiedNumberPhone2
        ? "This number is marked as Verified"
        : "Marks the phone as Verified",
      isVerifiedNumber: userInboxItem.isVerifiedNumberPhone2,
      isWrongNumber: userInboxItem.isWrongNumberPhone2,
      isAddedToDNC: userInboxItem.isAddedToDNCPhone2,
      phone: userInboxItem.phone2,
      response: phone2 == userInboxItem.phone2,
    },
    3: {
      title: userInboxItem.isVerifiedNumberPhone3
        ? "This number is marked as Verified"
        : "Marks the phone as Verified",
      isVerifiedNumber: userInboxItem.isVerifiedNumberPhone3,
      isWrongNumber: userInboxItem.isWrongNumberPhone3,
      isAddedToDNC: userInboxItem.isAddedToDNCPhone3,
      phone: userInboxItem.phone3,
      response: phone3 == userInboxItem.phone3,
    },
  };

  const buttonClicked = () => {
    const { phone, isVerifiedNumber } = phoneInfo[selectedPhone];
    let body = {
      phone,
    };
    if (selectedPhone == 2) {
      body = {
        phone2: phone,
      };
    } else if (selectedPhone == 3) {
      body = {
        phone3: phone,
      };
    }
    if (isVerifiedNumber) {
      dispatch(
        removeVerifiedNumber(id, body, () => {
          setOpenModal(false);
          // dispatch(getProspectDetails(selectedUserInbox?.to, selectedUserInbox._id))
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
          toast.success(`${phone} was remove as the Verified Number`);
        })
      );
    } else {
      dispatch(
        sendVerifiedNumber(id, body, () => {
          setOpenModal(false);
          toast.success(`${phone} was set as the Verified Number`);
        })
      );
    }
  };

  console.log("phoneInfo[selectedPhone]", phoneInfo[selectedPhone].response);
  

  return (
    <LightTooltip arrow placement="top" title={phoneInfo[selectedPhone].title}>
      <button
        // className={classNames({
        //   verified: phoneInfo[selectedPhone].isVerifiedNumber,
        // })}
        className={
          styles.actionButton +
          (phoneInfo[selectedPhone].isVerifiedNumber ? ` ${styles.verified}` : "")
        }
        disabled={
          phoneInfo[selectedPhone].isWrongNumber ||
          phoneInfo[selectedPhone].isAddedToDNC ||
          !phoneInfo[selectedPhone].response
        }
        onClick={buttonClicked}
        id="button-on-chat"
      >
        <span
          //  className="icon"
          className={styles.icon}
        >
          <IoMdCheckmark style={{ fontSize: "16px" }} />
        </span>
        <div
          //  style={{ fontSize: "16px", fontWeight: 500 }
          //  }
          //  className="text"
          className={`${styles.text} body5Medium`}
        >
          Verified
        </div>
      </button>
    </LightTooltip>
  );
};

export default VerifiedButton;
