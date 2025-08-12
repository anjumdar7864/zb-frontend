import styled from "@emotion/styled";

export const ButtonCheckStyled = styled.button`
  padding: 1.1rem 1.5rem;
  border-radius: 0.4rem;
  transition: background-color 0.3s ease-in-out;
  background-color: #5867dd;
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  color: #fff;

  & > .icon {
    font-size: 1.45rem;
    line-height: 0;
  }
  & > .text {
    font-size: 1.3rem;
  }

  &:not(:disabled):hover {
    background-color: #384ad7;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
