import { isEmpty } from "lodash-es";
import { When } from "react-if";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { toast } from "react-hot-toast";

import { sendWrongNumber, removeWrongNumber, sendWrongNumberList } from "@/store/actions";

import { SelectPhoneModalStyled } from "./styles";
import { RxCross2 } from "react-icons/rx";

const SelectWrongPhoneModal = ({ onClose, selectedUserInbox }) => {
  const dispatch = useDispatch();
  const {
    _id,
    to,
    isVerifiedNumber,
    isWrongNumber,
    isAddedToDNC,
    phone2,
    isVerifiedNumberPhone2,
    isWrongNumberPhone2,
    isAddedToDNCPhone2,
    phone3,
    isVerifiedNumberPhone3,
    isWrongNumberPhone3,
    isAddedToDNCPhone3,
    responsePhone,
  } = selectedUserInbox;

  const phoneInfo = {
    1: {
      title: isWrongNumber
        ? "This number is marked as Wrong Number"
        : "Marks the phone as Wrong Number",
      message: isWrongNumber
        ? `Remove Wrong Number for ${to}?`
        : `Mark ${to} as Wrong Number?`,
      isVerifiedNumber: isVerifiedNumber,
      isWrongNumber: isWrongNumber,
      isAddedToDNC: isAddedToDNC,
      phone: to,
    },
    2: {
      title: isWrongNumberPhone2
        ? "This number is marked as Wrong Number"
        : "Marks the phone as Wrong Number",
      message: isWrongNumberPhone2
        ? `Remove Wrong Number for ${phone2}?`
        : `Mark ${phone2} as Wrong Number?`,
      isVerifiedNumber: isVerifiedNumberPhone2,
      isWrongNumber: isWrongNumberPhone2,
      isAddedToDNC: isAddedToDNCPhone2,
      phone: phone2,
    },
    3: {
      title: isWrongNumberPhone3
        ? "This number is marked as Wrong Number"
        : "Marks the phone as Wrong Number",
      message: isWrongNumberPhone3
        ? `Remove Wrong Number for ${phone3}?`
        : `Mark ${phone3} as Wrong Number?`,
      isVerifiedNumber: isVerifiedNumberPhone3,
      isWrongNumber: isWrongNumberPhone3,
      isAddedToDNC: isAddedToDNCPhone3,
      phone: phone3,
    },
  };

  const buttonClicked = (e, selectedPhone) => {
    e.stopPropagation();
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
        removeWrongNumber(_id, body, () => {
          toast.success(`Removed wrong number mark for ${phone}`);
          onClose(e);
        })
      );
    } else if (selectedId) {
      dispatch(
        sendWrongNumberList(_id, body, () => {
          toast.success(`! ${phone} was marked as wrong number.`);
          onClose(e);
        })
      );
    } else {
    
      dispatch(
        sendWrongNumber(_id, body, () => {
          toast.success(`! ${phone} was marked as wrong number.`);
          onClose(e);
        })
      );
    }
  };

  return (
    <SelectPhoneModalStyled>
      <div className="top">
        <div className="title">Select A Phone</div>
        <div className="right" onClick={onClose} style={{ cursor: "pointer" }}>
          <RxCross2 />
        </div>
      </div>
      <div className="middle">
        <h4>Select the number to mark (or unmark) as Wrong Number:</h4>
        <div className="item">
          {responsePhone?.phone1 && (
            <When condition={!isEmpty(to)}>
              <button
                disabled={isVerifiedNumber}
                className={classNames({
                  verified: isVerifiedNumber,
                  wrong: isWrongNumber,
                  // dnc: isAddedToDNC,
                })}
                key="to"
                onClick={(e) => buttonClicked(e, 1)}
              >
                {to}
              </button>
            </When>
          )}
          {responsePhone?.phone2 && (
            <When condition={!isEmpty(phone2)}>
              <button
                disabled={isVerifiedNumberPhone2}
                className={classNames({
                  verified: isVerifiedNumberPhone2,
                  wrong: isWrongNumberPhone2,
                  // dnc: isAddedToDNCPhone2,
                })}
                key="phone2"
                onClick={(e) => buttonClicked(e, 2)}
              >
                {phone2}
              </button>
            </When>
          )}
          {responsePhone?.phone3 && (
            <When condition={!isEmpty(phone3)}>
              <button
                disabled={isVerifiedNumberPhone3}
                className={classNames({
                  verified: isVerifiedNumberPhone3,
                  wrong: isWrongNumberPhone3,
                  // dnc: isAddedToDNCPhone3,
                })}
                key="phone3"
                onClick={(e) => buttonClicked(e, 3)}
              >
                {phone3}
              </button>
            </When>
          )}
        </div>
      </div>
      {/* <div className="bottom">
            <div className="left">
              <button type="button" onClick={onClose}>
                Close
              </button>
            </div>
          </div> */}
    </SelectPhoneModalStyled>
  );
};

export default SelectWrongPhoneModal;
