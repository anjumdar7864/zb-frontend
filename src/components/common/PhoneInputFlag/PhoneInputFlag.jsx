import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styled from "@emotion/styled";
// import MyInputStyled from "./styles";

// Wrapper label to hold input and title, now using flexbox
export const MyInputStyled = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
`;

// Title span
export const Title = styled.span`
  font-size: 14px;
  color: #012635;
  line-height: 22px;
  font-weight: 500;
`;

// Input wrapper to position input and error icon, now using flexbox
export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  ${({ error }) =>
    error &&
    `
        border-color: #f49c17;
        color: #f4516c;
    `}

  &:hover {
    border-color: ${({ error }) => (error ? "#f4516c" : "#716aca")};
  }

  &:focus {
    border-color: ${({ error }) => (error ? "#f4516c" : "#716aca")};
    color: ${({ error }) => (error ? "#f4516c" : "#575962")};
  }
`;

// Styled input element
export const StyledInput = styled.input`
  flex: 1;
  padding: 1.1rem 1.5rem;
  border-radius: 0.4rem;
  outline: none;
  color: #575962;
  width: 100%;
  font-size: 1.3rem;
  line-height: 1.25;
  background-clip: padding-box;
  border: 1px solid #ebedf2;
  font-family: "Inter", sans-serif;
  transition: border-color 0.3s ease-in-out;

  ${({ error }) =>
    error &&
    `
        border-color: #f49c17;
        color: #f4516c;
    `}

  &:hover {
    border-color: ${({ error }) => (error ? "#f4516c" : "#716aca")};
  }

  &:focus {
    border-color: ${({ error }) => (error ? "#f4516c" : "#716aca")};
    color: ${({ error }) => (error ? "#f4516c" : "#575962")};
  }
`;

// Error icon wrapper
export const ErrorIconWrapper = styled.div`
  position: absolute;
  right: 10px;
  z-index: 50;
  display: ${({ error }) => (error ? "block" : "none")};
`;

// Error message
export const ErrorMessage = styled.p`
  font-size: 1.04rem;
  color: #f4516c;
  margin-top: 0.5rem;
  display: ${({ error }) => (error ? "block" : "none")};
`;

const PhoneInputFlag = ({
  error = "",
  title = "",
  value = "",
  onChange = () => {},
  onBlur = () => {},
  ...rest
}) => {
  const warning = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width="25px"
      height="25px"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#f50000"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M12 8V12"
          stroke="#df0c0c"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M12 16.0195V16"
          stroke="#df0c0c"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="#df0c0c"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></circle>
      </g>
    </svg>
  );

  return (
    <MyInputStyled style={{color:"#777777"}}>
      <Title>{title}</Title>
      <InputWrapper error={error}>
        <PhoneInput
          placeholder="Enter Number"
          inputClass="phoneInputFields"
          
          country={"us"}
          disableDropdown={true}
          regions={[
            "north-america",
            "south-america",
            "central-america",
            "asia",
            "europe",
          ]}
          inputProps={{
            name: "phone",
            required: true,
            autoFocus: true,
          }}
          flagDropdownStyle={{
            backgroundColor: "blue",
          }}
          inputStyle={{
            height: "100%",
            fontSize: "18px",
            border: "0.1rem solid #c1c4cc",
            padding: "1.1rem 1.5rem",
            borderRadius: "10px",
          }}
          containerStyle={{ flex: 1 }}
          buttonStyle={{
            borderRadius: "10px",
            border: "none",
            backgroundColor: "transparent",
          }}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...rest}
        />
        {error && <ErrorIconWrapper error={error}>{warning}</ErrorIconWrapper>}
      </InputWrapper>
      <ErrorMessage error={error}>{error}</ErrorMessage>
    </MyInputStyled>
  );
};

export default PhoneInputFlag;
