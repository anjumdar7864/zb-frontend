import { Modal } from "@mui/material";
import styled from "@emotion/styled";

export const ToastModalStyled = styled.div`
  z-index: 9997;
  position: fixed;
  min-height: 100vh;
  min-height: 100svh;
  display: grid;
  align-items: center;
  width: 100%;

  & > .overlay {
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 9998;
    position: fixed;
    z-index: 0;
    inset: 0;
  }

  & > .box {
    z-index: 9999;
    position: relative;
    margin: 0 auto;
    max-width: 41.6rem;
    width: 100%;
    background-color: #fff;
    border-radius: 0.6rem;
    padding: 3.9rem;

    display: grid;
    justify-items: center;
    gap: 2.8rem;

    & > .top {
      & > .icon {
        display: grid;
        line-height: 0;
        align-items: center;
        justify-content: center;
        font-size: 7.1rem;
      }
    }
    & > .textWrapper {
      text-align: center;
      font-size: 1.3rem;
      font-weight: 500;
    }

    & > .bottom {
      display: grid;
      justify-items: center;
      gap: 4rem;

      & > .group {
        display: grid;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        grid-template-columns: auto auto;
        & > button {
          padding: 0.85rem 1.5rem;
          font-size: 1.1rem;
          border: 0.1rem solid #c1c4cc;
          font-weight: 500;
          border-radius: 0.4rem;
          background-color: #3085d6;
          color: white;
          transition: background-color 0.3s ease-in-out;

          & > .text {
            font-size: 1.1rem;
          }

          &:not(:disabled):hover {
            background-color: #fff;
            color: black;
          }

          &:disabled {
            cursor: not-allowed;
            opacity: 0.65;
          }
        }
      }
    }
  }
`;

export const MUIModalStyled = styled(Modal)`
  & > .MuiModal-backdrop {
    opacity: 0 !important;
    transition: none;
  }
`;
