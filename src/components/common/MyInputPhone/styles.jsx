import styled from "@emotion/styled";

const MyInputStyled = styled.label`
  display: grid;
  gap: 0.2rem;
  width: 100%;
  & > .top {
    display: grid;
    gap: 0.65rem;

    & > .top {
      & > span {
        font-size: 1.2rem;
        color: #5e5873;
        font-weight: 500;
      }
    }
    & > .bottom {
      & > input {
        padding: 1.1rem 1.5rem;
        border-radius: 0.4rem;
        outline: none;
        color: #575962;
        display: block;
        width: 100%;
        font-size: 1.3rem;
        line-height: 1.25;
        background-clip: padding-box;
        border: 1px solid #ebedf2;
        font-family: "Inter", sans-serif;

        &:focus {
          border-color: #716aca;
          color: #575962;
        }
      }
    }
  }
  & > .bottom {
    & > p {
      font-size: 1.04rem;
      color: #f4516c;
    }
  }
`;

export default MyInputStyled;
