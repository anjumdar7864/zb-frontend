import theme from "@/theme";
import styled from "@emotion/styled";

export const MyPaginationStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  ${theme.queryStatement(theme.breakpoints.xlg)} {
    flex-direction: column;
  }

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    & button {
      width: 32px;
      height: 32px;
      border-radius:8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      color: #68769f;
      font-size: 2rem;
      vertical-align: middle;
      line-height: 0;
      border: 1px solid #ececec;

      &:disabled {
        cursor: not-allowed;
      }
    }

    ${theme.queryStatement(theme.breakpoints.md)} {
      & > .none {
        display: none;
      }
    }

    & > .group {
      background-color: #fff;
      height: 32px;
      display: flex;
      border-radius: 8px;

      & > button {
        color: #68769f;
        background: #fff;
        outline: none;
        transition: background-color 0.3s ease-in-out;
        border: none;
        font-size: 1.3rem;
        vertical-align: baseline;

        &.active {
          background-color: #5a69da;
          color: #fff;
        }
          &.activeSecondry {
          background-color: #1e9b50;
          color: #fff;
        }
      }
    }
  }

  & > select {
    padding: 0.52rem 0.78rem;
    color: #485585;
    font-size: 1.3rem;
    outline: none;
    border: 1px solid #ececec;

    ${theme.queryStatement(theme.breakpoints.md)} {
      grid-column: 1/4;
    }
  }
`;
