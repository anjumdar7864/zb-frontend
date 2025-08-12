import { useState } from "react";
import { FaExclamation } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { toast } from "react-hot-toast";

import { ConfirmModal, LightTooltip } from "@/components/common";
import { sendWrongNumber, removeWrongNumber } from "@/store/actions";
import { IoMdCloseCircleOutline } from "react-icons/io";

const WrongNumberButton = () => {
  const { data: userInboxItem, selectedPhone } = useSelector(
    (s) => s.inboxUserMessageReducer
  );
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const { _id: id } = userInboxItem;
  const { phone1, phone2, phone3 } = userInboxItem.responsePhone || {};

  const phoneInfo = {
    1: {
      title: userInboxItem.isWrongNumber
        ? "This number is marked as Wrong Number"
        : "Marks the phone as Wrong Number",
      message: userInboxItem.isWrongNumber
        ? `Remove Wrong Number for ${userInboxItem.to}?`
        : `Mark ${userInboxItem.to} as Wrong Number?`,
      isVerifiedNumber: userInboxItem.isVerifiedNumber,
      isWrongNumber: userInboxItem.isWrongNumber,
      isAddedToDNC: userInboxItem.isAddedToDNC,
      phone: userInboxItem.to,
      response: phone1 == userInboxItem.to,
    },
    2: {
      title: userInboxItem.isWrongNumberPhone2
        ? "This number is marked as Wrong Number"
        : "Marks the phone as Wrong Number",
      message: userInboxItem.isWrongNumberPhone2
        ? `Remove Wrong Number for ${userInboxItem.phone2}?`
        : `Mark ${userInboxItem.phone2} as Wrong Number?`,
      isVerifiedNumber: userInboxItem.isVerifiedNumberPhone2,
      isWrongNumber: userInboxItem.isWrongNumberPhone2,
      isAddedToDNC: userInboxItem.isAddedToDNCPhone2,
      phone: userInboxItem.phone2,
      response: phone2 == userInboxItem.phone2,
    },
    3: {
      title: userInboxItem.isWrongNumberPhone3
        ? "This number is marked as Wrong Number"
        : "Marks the phone as Wrong Number",
      message: userInboxItem.isWrongNumberPhone3
        ? `Remove Wrong Number for ${userInboxItem.phone3}?`
        : `Mark ${userInboxItem.phone3} as Wrong Number?`,
      isVerifiedNumber: userInboxItem.isVerifiedNumberPhone3,
      isWrongNumber: userInboxItem.isWrongNumberPhone3,
      isAddedToDNC: userInboxItem.isAddedToDNCPhone3,
      phone: userInboxItem.phone3,
      response: phone3 == userInboxItem.phone3,
    },
  };

  const buttonClicked = () => {
    const { phone, isWrongNumber } = phoneInfo[selectedPhone];
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
    if (isWrongNumber) {
      dispatch(
        removeWrongNumber(userInboxItem._id, body, () => {
          setOpenModal(false);
          toast.success(`Removed wrong number mark for ${phone}`);
        })
      );
    } else {
      dispatch(
        sendWrongNumber(userInboxItem._id, body, () => {
          setOpenModal(false);
          toast.success(`! ${phone} was marked as wrong number.`);
        })
      );
    }
  };

  return (
    <>
      <LightTooltip
        arrow
        placement="top"
        title={phoneInfo[selectedPhone].title}
      >
        <button
          className={classNames({
            wrong: phoneInfo[selectedPhone].isWrongNumber,
          })}
          disabled={
            phoneInfo[selectedPhone].isVerifiedNumber ||
            phoneInfo[selectedPhone].isAddedToDNC ||
            !phoneInfo[selectedPhone].response
          }
          onClick={() => setOpenModal(true)}
          id="button-on-chat"
        >
          <span className="icon">
            <IoMdCloseCircleOutline style={{fontSize:"20px"}} />
          </span>
          <span style={{ fontSize: "16px", fontWeight: 500 }} className="text">
            Wrong Number
          </span>
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

export default WrongNumberButton;
