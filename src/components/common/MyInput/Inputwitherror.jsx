import React from "react";
import styled from "@emotion/styled";

// Wrapper label to hold input and title, now using flexbox
export const MyInputStyled = styled.label`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    width: 100%;
`;

// Title span
export const Title = styled.span`
    font-size: 1.2rem;
    color: #5e5873;
    font-weight: 500;
`;

// Input wrapper to position input and error icon, now using flexbox
export const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
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

const MyInput = ({
    error = "",
    title = "",
    placeholder = "",
    type = "text", // Default to 'text'
    value = "",
    maxLength , 
    onChange = () => {},
    onBlur = () => {},
    ...rest
}) => {
    const warning = (
        <svg viewBox="0 0 24 24" fill="none" width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" stroke="#f50000">
            <path d="M12 8V12" stroke="#f49c17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M12 16.0195V16" stroke="#f49c17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <circle cx="12" cy="12" r="10" stroke="#f49c17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle>
        </svg>
    );

    return (
        <MyInputStyled>
            {title && <Title>{title}</Title>}
            <InputWrapper>
                <StyledInput
                    type={type}
                    placeholder={placeholder}
                    min="0"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={error}
                    {...rest}
                    maxLength={maxLength}
                />
                <ErrorIconWrapper error={error}>
                    {warning}
                </ErrorIconWrapper>
            </InputWrapper>
            <ErrorMessage error={error}>{error}</ErrorMessage>
        </MyInputStyled>
    );
};

export default MyInput;
