
import styled from "@emotion/styled";
import { Modal } from "@mui/material";

export const DeleteModalStyled = styled.div`
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
    max-width: 700px;
    width: 100%;
    background-color: #fff;
    border-radius: 24px;
    padding: 40px 32px;

    display: grid;
    justify-items: center;
    gap: 24px;

    & > .top {
      & > .icon {
        display: grid;
        line-height: 26px;
        align-items: center;
        justify-content: center;
        font-size: 18px;
      }
    }
    & > .bottom {
      display: grid;
      justify-items: center;
      gap: 1rem;

      & > h2 {
        color: #012635;
        font-size: 18px;
        font-weight: 600;
        line-height: 26px;
      }
      & > .bottom {
        display: grid;
        justify-items: center;
        gap: 4rem;

        & > p {
          color: #073f56;
          font-size: 16px;
          font-weight: 400;
          line-height: 26px;
          text-align: center;
        }

        & > .group {
          display: grid;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          grid-template-columns: auto auto;
          & > button {
            display: block;
            padding: 8px 12px;
            background-color: #00bd82;
            border-radius: 0.4rem;
            font-size: 16px;
            line-height: 24px;
            font-weight: 500;
            color: #fff;

            &:hover {
              background-image: linear-gradient(
                rgba(0, 0, 0, 0.1),
                rgba(0, 0, 0, 0.1)
              );
            }

            &:nth-of-type(1) {
              background-color: #fff;
              border: 1px solid #ff5d3e;
              color: #ff5d3e;
            }
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