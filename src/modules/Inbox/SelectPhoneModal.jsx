import { SelectPhoneModalStyled } from "./styles";

const SelectPhoneModal = ({ onClose, phoneList, setPhone }) => {
  return (
    <SelectPhoneModalStyled>
          <div className="top">
            <h2>Select A Phone</h2>
          </div>
          <div className="middle">
                <h4>Select the number to mark as Verified:</h4>
            <div className="item">
              {phoneList.map((item) => (
                <button
                  className="name"
                  key={item.field}
                  onClick={(e) => {e.stopPropagation(); setPhone(item)}}
                >
                  {item.phone}
                </button>
              ))}
            </div>
          </div>
          <div className="bottom">
            <div className="left">
              <button type="button" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
    </SelectPhoneModalStyled>
  );
};

export default SelectPhoneModal;