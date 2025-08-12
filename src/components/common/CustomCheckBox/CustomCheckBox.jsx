import { FaCheck } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";

const CustomCheckbox = ({ isChecked, onClick }) => (
    <label
      style={{
        display: 'inline-block',
        width: '20px',
        height: '20px',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onClick}
        style={{
          opacity: 0,
          width: 0,
          height: 0,
        }}
      />
      <span
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: isChecked ? 'white' : 'transparent',
          border: '1px solid #ccc',
          borderRadius: '4px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          transition: 'background-color 0.2s',
        }}
      >
        {isChecked && (
        <FaCheck />
        )}
      </span>
    </label>
  );
  
  export default CustomCheckbox;
  