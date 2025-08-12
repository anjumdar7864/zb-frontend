import { isEmpty } from "lodash-es";
import { When } from "react-if";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { toast } from "react-hot-toast";

import { removeVerifiedNumber, sendVerifiedNumber } from "@/store/actions";

import { SelectPhoneModalStyled } from "./styles";
import { RxCross2 } from "react-icons/rx";

const SelectVerifiedPhoneModal = ({ onClose, selectedUserInbox }) => {
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
        removeVerifiedNumber(_id, body, () => {
          toast.success(`Removed verified number mark for ${phone}`);
          onClose(e);
        })
      );
    } else {
      dispatch(
        sendVerifiedNumber(_id, body, () => {
          toast.success(`! ${phone} was marked as verified number.`);
          onClose(e);
        })
      );
    }
  };

  return (
    <SelectPhoneModalStyled>
      <div className="top">
        <div className="title">Select a Drip Automation</div>
        <div className="right" onClick={onClose} style={{ cursor: "pointer" }}>
          <RxCross2  />
        </div>
      </div>
      <div className="middle">
        <h4>Choose the number to verify:</h4>
        <div className="item">
          <When
            condition={
              !isEmpty(to) &&
              !isWrongNumber &&
              !isAddedToDNC &&
              !isEmpty(responsePhone?.phone1)
            }
          >
            <button
              className={classNames({
                verified: isVerifiedNumber,
                wrong: isWrongNumber,
              })}
              key="to"
              onClick={(e) => buttonClicked(e, 1)}
            >
              {to}
            </button>
          </When>
          <When
            condition={
              !isEmpty(phone2) &&
              !isWrongNumberPhone2 &&
              !isAddedToDNCPhone2 &&
              !isEmpty(responsePhone?.phone2)
            }
          >
            <button
              className={classNames({
                verified: isVerifiedNumberPhone2,
                wrong: isWrongNumberPhone2,
              })}
              key="phone2"
              onClick={(e) => buttonClicked(e, 2)}
            >
              {phone2}
            </button>
          </When>
          <When
            condition={
              !isEmpty(phone3) &&
              !isWrongNumberPhone3 &&
              !isAddedToDNCPhone3 &&
              !isEmpty(responsePhone?.phone3)
            }
          >
            <button
              className={classNames({
                verified: isVerifiedNumberPhone3,
                wrong: isWrongNumberPhone3,
              })}
              key="phone3"
              onClick={(e) => buttonClicked(e, 3)}
            >
              {phone3}
            </button>
          </When>
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

export default SelectVerifiedPhoneModal;
