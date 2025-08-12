import { useState } from "react";
import { FaPhoneSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { toast } from "react-hot-toast";

import { ConfirmModal, LightTooltip } from "@/components/common";
import { sendAddToDNCNumber, removeAddToDNCNumber } from "@/store/actions";
import { FiPhoneOff } from "react-icons/fi";
import styles from "./Button.module.css";
const AddToDNCButton = () => {
  const dispatch = useDispatch();
  const { data: userInboxItem, selectedPhone } = useSelector(
    (s) => s.inboxUserMessageReducer
  );
  const [openModal, setOpenModal] = useState(false);
  const { phone1, phone2, phone3 } = userInboxItem.responsePhone || {};
  const phoneInfo = {
    1: {
      title: userInboxItem.isAddedToDNC
        ? "This number is in your Do Not Call list"
        : "Adds the phone to your Do Not Call list",
      message: userInboxItem.isAddedToDNC
        ? `Remove ${userInboxItem.to} from DNC?`
        : `Mark ${userInboxItem.to} as DNC?`,
      isVerifiedNumber: userInboxItem.isVerifiedNumber,
      isWrongNumber: userInboxItem.isWrongNumber,
      isAddedToDNC: userInboxItem.isAddedToDNC,
      isAddedToDNCPermanent: userInboxItem.isAddedToDNCPermanent,
      phone: userInboxItem.to,
      response: phone1 == userInboxItem.to,
    },
    2: {
      title: userInboxItem.isAddedToDNCPhone2
        ? "This number is in your Do Not Call list"
        : "Adds the phone to your Do Not Call list",
      message: userInboxItem.isAddedToDNCPhone2
        ? `Remove ${userInboxItem.phone2} from DNC?`
        : `Mark ${userInboxItem.phone2} as DNC?`,
      isVerifiedNumber: userInboxItem.isVerifiedNumberPhone2,
      isWrongNumber: userInboxItem.isWrongNumberPhone2,
      isAddedToDNC: userInboxItem.isAddedToDNCPhone2,
      isAddedToDNCPermanent: userInboxItem.isAddedToDNCPhone2Permanent,
      phone: userInboxItem.phone2,
      response: phone2 == userInboxItem.phone2,
    },
    3: {
      title: userInboxItem.isAddedToDNCPhone3
        ? "This number is in your Do Not Call list"
        : "Adds the phone to your Do Not Call list",
      message: userInboxItem.isAddedToDNCPhone3
        ? `Remove ${userInboxItem.phone3} from DNC?`
        : `Mark ${userInboxItem.phone3} as DNC?`,
      isVerifiedNumber: userInboxItem.isVerifiedNumberPhone3,
      isWrongNumber: userInboxItem.isWrongNumberPhone3,
      isAddedToDNC: userInboxItem.isAddedToDNCPhone3,
      isAddedToDNCPermanent: userInboxItem.isAddedToDNCPhone3Permanent,
      phone: userInboxItem.phone3,
      response: phone3 == userInboxItem.phone3,
    },
  };

  const buttonClicked = () => {
    const { phone, isAddedToDNC, isAddedToDNCPermanent } =
      phoneInfo[selectedPhone];
    let body;
    switch (selectedPhone) {
      case 1:
        body = {
          phone,
        };
        break;
      case 2:
        body = {
          phone2: phone,
        };
        break;
      case 3:
        body = {
          phone3: phone,
        };
        break;
    }

    if (isAddedToDNC) {
      dispatch(
        removeAddToDNCNumber(userInboxItem._id, body, () => {
          setOpenModal(false);
          toast.error(`${phone} was removed from DNC`);
        })
      );
    } else {
      dispatch(
        sendAddToDNCNumber(userInboxItem._id, body, () => {
          setOpenModal(false);
          toast.error(`${phone} was added to DNC`);
        })
      );
    }
  };
  return (
    <>
      <LightTooltip
        arrow
        placement="top"
        title={
          phoneInfo[selectedPhone].isAddedToDNCPermanent
            ? "This Phone has opted out and cannot be removed"
            : phoneInfo[selectedPhone].title
        }
      >
        <button
          disabled={
            phoneInfo[selectedPhone].isAddedToDNCPermanent ||
            !phoneInfo[selectedPhone].response
          }
          // className={classNames({
          //   dnc: phoneInfo[selectedPhone].isAddedToDNC,
          // })}
          className={styles.actionButton + (phoneInfo[selectedPhone].isAddedToDNC ? ` ${styles.dnc}` : "")}
          onClick={() => setOpenModal(true)}
          id="button-on-chat"
        >
          <span 
          //  className="icon"
           className={styles.icon}
           >
            <FiPhoneOff style={{fontSize:"14px"}} />
          </span>
          <div 
          //  style={{ fontSize: "16px" }} 
          // className="text"
          className={`${styles.text} body5Medium `}
          >
            {phoneInfo[selectedPhone].isAddedToDNC ? "" : "Add to "}DNC
          </div>
        </button>
      </LightTooltip>
      <ConfirmModal
        content={{
          message: phoneInfo[selectedPhone].message,
        }}
        open={openModal}
        onOkay={buttonClicked}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
};

export default AddToDNCButton;
