import styled from "@emotion/styled";
import theme from "@/theme";
import { LightTooltip } from "@/components/common";
import { Modal } from "@mui/material";

export const CreateDripAutomationsStyled = styled.div`
  & > .top {
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    gap: 2rem;
      
    & > .left {
      & > h1 {
        font-size: 1.95rem;
        font-weight: 500;
        color: red;
      }
    }

    & > .right {
      display: flex;
      justify-content: space-between;
      & > button {
        display: grid;
        align-items: center;
        justify-content: center;
        grid-template-columns: auto auto;
        gap: 0.7rem;
        background-color: #5867dd;
        transition: background-color 300ms;
        padding: 0.6rem 1.05rem;
        border-radius: 0.5rem;

        & > .icon {
          font-size: 0.9rem;
          line-height: 0;
          color: #fff;
        }

        & > .text {
          font-size: 1.1375rem;
          color: #fff;
        }

        &:hover {
          background-color: #384ad7;
        }
      }

      & > .button2 {
        display: grid;
        align-items: center;
        justify-content: center;
        grid-template-columns: auto auto;
        gap: 0.7rem;
        background-color: green;
        transition: background-color 300ms;
        padding: 0.6rem 1.05rem;
        border-radius: 0.5rem;

        & > .icon {
          font-size: 0.9rem;
          line-height: 0;
          color: #fff;
        }

        & > .text {
          font-size: 1.1375rem;
          color: #fff;
        }

        &:hover {
          background-color: #384ad7;
        }
      }
    }
  }

  & > .bottom {
    padding:2rem 4rem 2rem 4rem;
    display: grid;
    justify-content: space-between;
    grid-template-columns: 6fr 3fr;
    ${theme.queryStatement(theme.breakpoints.xxllggg)} {
          display: flex;
      flex-direction:column;
    }
    ${theme.queryStatement(theme.breakpoints.xllg)} {
      padding:1rem 1rem 2rem 1rem;
    }
    & > .left {
      width: 100%;
      padding: 10px;
      justify-content: center;

      
      & > h6 {
        font-size: 2.2rem;
        font-weight: 700;
        color: #012635;
      }
      & > p {
        font-size: 1rem;
        font-weight: 500;
        color: #777777;
        padding-top:1.3rem;
      }
      & > div {
        display: flex;
        width: 100%;
        justify-content: center;
        & > .wrapper{
          display:flex;
          align-items:center;
          justify-content:center;
          width:fit-content;
          padding-bottom:0.2rem;
          & > .text{
            color:#012635;
            font-size:1.2rem;
            font-weight:500;
            margin-right:0.5rem
          }
          
        }
        & > input {
          width: 100%;
          align-self: center;
          padding: 1.2rem;
          margin-top: 4px;
          border: 1px solid #D3D7DD;
          border-radius: 0.6rem;
          font-size: 1.1rem;
          outline: none;

          &::placeholder {
            color: #777777;
          }
        }

        & > .textRequired{
          color:red;
          font-size:1.2rem;
          font-weight:500;
          margin-right:0.5rem;
          position:absolute;
          left:0;
          bottom:-25px;
          ${theme.queryStatement(400)} {
            bottom:-20px;
          }
        }
          
      }
      & > .vline2 {
        display: flex;
        width: 0.1rem;
        height: 2.5rem;
        align-self: center;
        background-color: gray;
      }
      & > div {
        padding-top:0;
        & > .vline {
          display: flex;
          width: 0.1rem;
          height: 2.5rem;
          align-self: center;
          background-color: gray;
        }
      }
      & > .addButton {
      cursor:pointer ; 
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction:row;
        width: 100%;
        border:2px dashed #777777;
        padding-block:1.2rem;
        border-radius:0.5rem;
        & > div {
          display: flex;
          border: 1px solid gray;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          align-self: center;
          cursor: pointer;
          justify-content: center;
          align-items: center;
          background-color: white;

          &:hover {
            border: 2px solid #36a3f7;
            color: #36a3f7;
          }
        }
      }
      & > .vline2 {
        display: flex;
        width: 0.1rem;
        height: 2rem;
        align-self: center;
        background-color: gray;
      }
      & > .saveButtonWrap {
        width: 100%;
        flex-direction: row;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        & > .saveButton-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        & > * {
          flex: 1;
          & > .saveButton {
            display: flex;
            align-items: center;
            text-align: center;
            justify-content: center;
            background-color:#00BD82;
            width: 200px;
            align-self: center;
            transition: background-color 300ms;
            padding: 0.8rem 0.5rem;
            border-radius: 0.8rem;

            & > .icon {
              font-size: 0.9rem;
              line-height: 0;
              color: #fff;
            }

            & > .text {
              font-size: 1.1375rem;
              color: #fff;
            }

            &:hover {
              background-color: #00BD82;
            }
          }
        }
      }

      & > div {
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: center;

        & > h3 {
          align-self: center;
          font-size: 16px;
        }
        & > .vline2 {
          display: flex;
          width: 0.1rem;
          height: 2rem;
          align-self: center;
          background-color: gray;
        }
        & > {
        }
      }
    }

    & > .right {
      display: flex;
      padding: 10px;
      align-items: center;
    }
  }
`;
export const DayCountStyled = styled.div`
  & > div {
    display: flex;
    height: 5rem;
    border-top-left-radius: 0.8rem;
    border-top-right-radius: 0.8rem;
    width: 100%;
    gap: 10px;
    padding: 5px;
    background-color: white;
    align-items: center;
    justify-content: space-between;
    & > .issue-of-space {
      margin-left: -1.5rem;

      & > .increase{
        background:#F0F0F0;
        border-radius:0.9rem;
        display:flex;
        align-items: center;
        justify-content: center;
        height:35px;
        width:35px;
      }
      & > input{
        height:35px;
        width:35px;
        border:1px solid #D3D7DD;
        border-radius:0.9rem;
        margin-inline:0.3rem;
      }
      & > .decrease{
        background:#F0F0F0;
        border-radius:0.9rem;
        display:flex;
        align-items: center;
        justify-content: center;
        height:35px;
        width:35px;
      }
      & > p {
        color:#777777;
        opacity:1;
        font-size: 1.2rem;
        font-weight: 500;
        padding: 0rem 1rem;
        -webkit-user-select: none;
          -ms-user-select: none; 
          user-select: none;
        @media (max-width: 768px) {
          font-size: 1.3rem;
        }

        @media (max-width: 480px) {
          font-size: 1.1rem;
        }
      }
      & > .MainHeading{
        color:#012635;
        opacity:1;
        font-weight:600;
        font-size:1.7rem;
      }
    }

    & > div {
      display: flex;
      align-items: center;
      gap: 5px;
      & > input {
        width: 75px;
        border: none;
        border-bottom: 1px solid #d8d8d8;
        outline: none;
        text-align: center;
      }
      & > .icon {
        border: 1px solid #d8d8d8;
        border-radius: 50%;
        padding: 3px;
        cursor: pointer;
      }
    }

    & > div {
      display: flex;
      justify-content: space-between;
      gap: 2px;
      justify-content: end;
      padding-left: 20px;
      & > .icon2 {
        color: #6c757d;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
`;

export const ValidationStyled = styled.div`
  width:100%;
  & > .working {
    min-height: 7.8rem;
    padding: 1.3rem;
    border: 1px solid #E0E0E0;
    border-radius:0.8rem;
    background: #FFFFFF;

    align-self: center;
    & > p{
      font-size:1.3rem;
      color:#012635;
      font-weight:500;
    }
    & > .group {
      display: flex;
      gap: 0.2rem;
      align-content: start;
      flex-direction: column;
      margin-top:1.3rem;
      & > .item {
        display: flex;
        gap: 1rem;
        align-items: center;
        padding-block:0.25rem;
        & > .icon {
          font-size: 1.7rem;
          color: #E0E0E0;
          line-height: 0;
        }
        & > .text {
          font-size: 1.3rem;
          color: #a0a0a0cc;
          font-weight: 400;
        }

        &.done {
          & > .icon {
            font-size: 1.5rem;
            color: #43cd80;
          }
          & > .text {
            color: #43cd80;
          }
        }
      }
    }
  }
`;
export const DripMessageArea = styled.div`
    width:100%;
      border: 1px solid #d8d8d8;
      border-radius:0.8rem;
      // overflow:hidden;
  & > .bottom {
    display: grid;
    gap: 1.5rem;
    align-content: start;
    & > .top {
      background: #fff;
      border-bottom-left-radius:0.8rem;
      border-bottom-right-radius:0.8rem;
      ${theme.queryStatement(900)} {
        box-shadow: 0 0 2px #3232321a;
      }

      & > *:not(:last-child) {
        border-bottom: 1px solid #d8d8d8;
      }
      & > .track {
        padding: 1.3rem 2.6rem;
        display: grid;
        grid-template-columns: repeat(5, 12rem);
        justify-content: center;

        ${theme.queryStatement(1120)} {
          grid-template-columns: repeat(4, 8rem) 10rem;
        }

        ${theme.queryStatement(525)} {
          padding: 1.3rem 0.25rem;
          grid-template-columns: repeat(4, 6rem) 8rem;
        }

        ${theme.queryStatement(460)} {
          align-content: start;
        }

        & > .item {
          display: grid;
          gap: 0.65rem;
          justify-items: center;
          user-select: none;
          cursor: pointer;

          ${theme.queryStatement(460)} {
            align-content: start;
            position: relative;
            margin-top: 2rem;

            &:nth-of-type(2n) {
              margin-top: 5.56rem;
            }
          }

          & > h6 {
            display: grid;
            gap: 0.65rem;
            align-items: center;
            justify-content: center;
            grid-template-columns: auto;

            ${theme.queryStatement(460)} {
              position: absolute;
              top: -2.65rem;
              left: 50%;
              transform: translate(-50%, 0);
              white-space: nowrap;
              z-index: 3;
            }

            &:has(.icon) {
              grid-template-columns: auto auto;
            }

            & > .text {
              color: #212529;
              font-size: 1.3rem;
              font-weight: 400;
            }
            & > .icon {
              font-size: 1.1rem;
              color: #34bfa3;
              line-height: 0;

              &.error {
                color: #f4516c;
              }
            }
          }

          & > .bottom {
            display: grid;
            position: relative;
            justify-content: center;
            justify-items: center;
            align-items: center;
            align-content: center;
            justify-self: stretch;

            & > .text {
              width: 2.6rem;
              height: 2.6rem;
              display: flex;
              border-radius: 50%;
              justify-content: center;
              align-items: center;
              position: relative;
              z-index: 2;
              font-size: 1.3rem;
              color: #aaa;
              border: 0.2rem solid #dedfe7;
              background: #fff;
              transition: background-color 300ms, color 300ms, box-shadow 300ms;
            }

            & > .left {
              display: block;
              background-color: #dedfe7;
              height: 0.2rem;
              position: absolute;
              z-index: 1;
              right: 50%;
              left: 0;
              top: 50%;
              transform: translate(-50, 0);
              transition: background-color 300ms;
            }
            & > .right {
              display: block;
              background-color: #dedfe7;
              height: 0.2rem;
              position: absolute;
              z-index: 1;
              right: 0;
              left: 50%;
              top: 50%;
              transform: translate(-50, 0);
              transition: background-color 300ms;
            }
          }

          ${theme.queryStatement(460)} {
            & > .bottom {
              & > .left,
              & > .right {
                height: 0.1rem;
              }
            }
            &:nth-of-type(2n) {
              & > .bottom {
                & > .left {
                  &::after {
                    content: "";
                    display: block;
                    background-color: #dedfe7;
                    height: 2.8rem;
                    width: 0.1rem;
                    position: absolute;
                    z-index: 1;
                    left: 0;
                    bottom: 0.1rem;
                    transform: translate(-75%, 0);
                    transition: background-color 300ms;
                  }
                }
                & > .right {
                  &::after {
                    content: "";
                    display: block;
                    background-color: #dedfe7;
                    height: 2.8rem;
                    width: 0.1rem;
                    position: absolute;
                    z-index: 1;
                    right: 0;
                    bottom: 0.1rem;
                    transform: translate(65%, 0);
                    transition: background-color 300ms;
                  }
                }
              }
            }

            &:not(:nth-of-type(2n)) {
              & > .bottom {
                & > .left::after {
                  content: "";
                  display: block;
                  background-color: #dedfe7;
                  height: 2.8rem;
                  width: 0.1rem;
                  position: absolute;
                  z-index: 1;
                  left: 0;
                  top: 0;
                  transform: translate(-75%, 0);
                  transition: background-color 300ms;
                }
                & > .right::after {
                  content: "";
                  display: block;
                  background-color: #dedfe7;
                  height: 2.8rem;
                  width: 0.1rem;
                  position: absolute;
                  z-index: 1;
                  right: 0;
                  top: 0;
                  transform: translate(65%, 0);
                  transition: background-color 300ms;
                }
              }
            }
          }

          &:hover {
            & > .bottom > .text {
              box-shadow: 0 0 8px #0000004d;
            }
          }

          &.done {
            & > .bottom {
              & > .text {
                border-color: #36a3f7;
                color: #36a3f7;
              }

              & > .left,
              & > .right {
                background-color: #36a3f7;
              }
            }
          }

          &.active {
            & > .bottom {
              & > .text {
                border-color: #36a3f7;
                color: #fff;
                background-color: #36a3f7;
              }
              & > .left,
              & > .right {
                background-color: #36a3f7;
              }
            }
          }

          ${theme.queryStatement(460)} {
            &.done,
            &.active {
              & > .bottom {
                & > .left::after,
                & > .right::after {
                  background-color: #36a3f7;
                }
              }
            }
          }

          &.error {
            & > .bottom {
              & > .text {
                border-color: #f4516c;
                color: #fff;
                background-color: #f4516c;
              }
              & > .left,
              & > .right,
              & > .left::after,
              .right::after {
                background-color: #f4516c;
              }
            }
          }
        }
      }
      & > .message {
        padding: 1.95rem 1.6rem 3.65rem;
        position: relative;

        & > textarea {
          font-size: 1.2rem;
          color: transparent;
          caret-color: #36a3f7;
          width: 100%;
          height: 15rem;
          outline: none;
          border: none;
          resize: none;
          position: relative;
          z-index: 2;
          background-color: transparent;
          ${(p) =>
            p.isTextSpinnerShowing
              ? `
        visibility: hidden;
        `
              : ""}
        }

        & > .container {
          position: absolute;
          top: 1.95rem;
          left: 1.6rem;
          right: 1.6rem;
          bottom: 3.65rem;
          & > * {
            font-size: 1.2rem;
            display: inline-block;
            word-break: break-word;
          }
          & > p {
          color: #777777;
          font-weight:400;
            font-size: 1.2rem;
          & > .placeholder {
            color: #EA3815;
            font-weight:400;
          }
          & > .text-spinner {
            color: #3086EE;
            font-weight:400;
          }
        }
        }

        & > .info {
          position: absolute;
          bottom: 1.95rem;
          right: 2.6rem;

          color: #212529;
          opacity: 0.7;
          font-size: 1.17rem;
          font-style: italic;
        }

        & > .error {
          bottom: 1.75rem;
          left: 6.6rem;
          right: 6.6rem;
          position: absolute;
          text-align: center;
          color: #f4516c;
          font-size: 1.3rem;
          font-weight: 300;

          & > strong {
            color: #f4516c;
            font-size: 1.3rem;
            font-weight: 500;
          }
        }
      }
      & > .shortcuts {
        padding: 1rem 1.6rem;
        display: flex;
        align-items:center;
        justify-content:space-between;
        gap: 0.65rem;

        & > .top {
          &:has(button) {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          &:has(p) {
          }

          & > button {
            display: grid;
            align-items: center;
            justify-content: center;
            gap: 0.7rem;
            background-color: #ececec;
            transition: background-color 300ms;
            padding: 0.6rem 1.05rem;
            border-radius: 0.5rem;
            font-size: 1.1375rem;
            color: #282a3c;

            &:not(:disabled):hover {
              background-color: #dedfe7;
            }

            &:disabled {
              cursor: not-allowed;
            }
          }

          & > p {
            color: #212529;
            opacity: 0.9;
            font-size: 1.17rem;
            width: 90%;
            margin: 0 auto;

            ${theme.queryStatement(theme.breakpoints.lg)} {
              width: 100%;
            }
          }
        }

        & > .bottom {
          display: flex;
          align-items: center;
          justify-content: start;
          gap:1rem;
          & > section {
            position: relative;
            & > section {
              & > header {
                display: flex;
                align-items: center;
                gap: 0.7rem;
                background-color: #ececec;
                padding: 0.6rem 1.05rem;
                border-radius: 0.5rem;
                cursor: pointer;
                font-size: 1.1375rem;
                color: #282a3c;
                & > * {
                  &:first-child {
                    font-size: 1.4rem;
                  }
                }
              }
              & > div {
                margin-top: 0.7rem;
                width: 100%;
                position: absolute;
                background-color: white;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                box-shadow: 0px 4px 4px 0px #00000040;
                z-index: 100000000;
                & > button {
                  display: flex;
                  align-items: start;
                  justify-content: start;
                  padding: 0.5rem 1rem;
                  font-size: 1.1rem;
                  color: black;
                  transition: 0.3 ease-in-out;
                  opacity: 0.8;
                  transition: 0.3 ease-in-out;
                  &:hover {
                    background-color: #ececec;
                  }
                }
              }
            }
          }

          & > button {
            display: grid;
            align-items: center;
            justify-content: center;
            gap: 0.7rem;
            background-color: #ececec;
            transition: background-color 300ms;
            padding: 0.6rem 1.05rem;
            border-radius: 0.5rem;

            &:has(.icon) {
              grid-template-columns: auto auto;
            }

            &.emoji {
              line-height: 1.7rem;
            }

            & > .icon {
              font-size: 1.4rem;
              line-height: 0;
            }

            & > .text {
              font-size: 1.1375rem;
              color: #282a3c;
            }

            &:not(:disabled):hover {
              background-color: #dedfe7;
            }

            &:disabled {
              cursor: not-allowed;
            }
          }
        }
      }
      & > .buttons {
        display: grid;
        grid-template-columns: auto auto auto;
        justify-content: space-between;
        align-items: center;
        padding: 0.65rem 2.6rem;

        & > button {
          display: grid;
          align-items: center;
          justify-content: center;
          grid-template-columns: auto auto;
          gap: 0.7rem;
          background-color: #ececec;
          transition: background-color 300ms;
          padding: 0.6rem 1.05rem;
          border-radius: 0.5rem;

          & > .icon {
            font-size: 0.9rem;
            line-height: 0;
            color: #282a3c;
          }

          & > .text {
            font-size: 1.1375rem;
            color: #282a3c;
          }

          &:not(:disabled):hover {
            background-color: #dedfe7;
          }

          &:disabled {
            cursor: not-allowed;
          }

          &.next {
            background-color: #36a3f7;
            & > .icon {
              color: #fff;
            }

            & > .text {
              color: #fff;
            }

            &:not(:disabled):hover {
              background-color: #1192f6;
            }
          }
        }
        & > .info {
          position: relative;
          & > .text {
            color: #212529;
            opacity: 0.5;
            font-size: 1.3rem;
          }
          & > .icon {
            position: absolute;
            right: -1rem;
            top: 0rem;
            transform: translate(0, -25%);

            & > .info {
              font-size: 1rem;
              color: #aaa;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
`;

export const AddTextSpinnerStyled = styled.div`
  display: inline-block;
  position: relative;
  z-index: 9999;

  & > .item {
    display: inline-block;
    position: relative;

    & > input {
      width: 9.1rem;
      background: #fff;
      border: none;
      border-bottom: 1px solid #d8d8d8;
      padding: 0 0.5rem;
      width: 4rem;
      margin: 0 0.2rem;
      transition: 0.3s ease-in-out;
      outline: none;
      font-size: 1.3rem;

      &::placeholder {
        opacity: 0;
      }
    }

    &:focus-within {
      & > input {
        width: 15rem;
        border-color: #36a3f7;

        &::placeholder {
          opacity: 1;
        }
      }
    }

    & > span {
      color: #212529;
      opacity: 0.7;
      font-size: 1.3rem;
      font-style: italic;
    }

    & > button {
      color: #e52935 !important;
      position: absolute;
      top: 50%;
      right: calc(var(--extra, 0) * 1rem);
      transform: translate(0.5rem, -50%);
      transition: all 300ms ease-in-out;
      opacity: 0;

      & * {
        color: #e52935 !important;
      }
    }

    &:hover > button {
      transform: translate(0rem, -50%);
      opacity: 1;
    }
  }

  & > button {
    border: 0.2rem solid #f2f3f8;
    height: 2.99rem;
    width: 2.99rem;
    line-height: 0rem;
    font-size: 1.3rem;
    /* text-align: center; */
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.65rem;
    transition: background-color 300ms ease-in-out;

    &:first-of-type,
    &:first-of-type * {
      color: #666 !important;
    }

    &:nth-of-type(2),
    &:nth-of-type(2) * {
      color: #43cd80 !important;
    }
    &:last-of-type,
    &:last-of-type * {
      color: #e52935 !important;
    }

    &:hover {
      background-color: #f2f3f8;
    }
  }

  & > p {
    position: absolute;
    bottom: -1.7rem;
    white-space: nowrap;
    left: 0;
    font-size: 1.1rem !important;
    color: #e52935 !important;
  }
`;

export const MergeFieldButtonDropdownStyled = styled.div`
  /* width: 15rem;
  padding: 0.65rem;
  display: grid;
  align-content: start;
  gap: 0.65rem;
  z-index: 100000000000;
  position: absolute;
  border-radius: 0.5rem;
  left: -7rem;
  & > .bottom {
    background-color: white;
    & > button {
      padding: 0.4rem 0.9rem;
      border-radius: 0.4rem;
      transition: background-color 300ms ease-in-out; */
  /* text-align: left; */
  /* display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: grid;
      align-items: center;
      grid-template-columns: 1fr; */
  /* gap: 0.65rem;

      & > .text {
        font-size: 1.3rem;
        font-weight: 300;
        color: #212529;
        transition: color 300ms ease-in-out;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      & > .dash {
        width: 1.6rem;
        height: 1.6rem;
        font-size: 1.2rem;
        color: #fff;
        background: #ffffff3d;
        display: grid;
        align-items: center;
        justify-items: center;
        border-radius: 50%;
        display: none;
      }

      &:hover {
        background-color: #36a3f7;

        & > .text {
          color: #fff;
        }
      }

      &.selected {
        grid-template-columns: 1fr auto;
        background-color: #36a3f7;
        & > .text {
          color: #fff;
        }

        & > .dash {
          display: grid;
        }
      }
    }
  } */
`;
export const MyLightTooltip = styled(LightTooltip)`
  & > .MuiTooltip-tooltip {
    margin-top: 0.2rem !important;
    padding: 0 !important;
  }
`;

export const ErrorMessageStyled = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
  border-radius: 0.6rem;
  cursor: pointer;
  border:1px solid #E0E0E0;          
  & > div {
    display: flex;
    width: 100%;
    flex-direction: column;

    & > span {
      color: ${(p) => (p.isDone ? "black" : "#e52935")};
      font-size: 1.5rem;
    }
    & > div {
      display: flex;
      flex-direction: column;
      font-weight: 700;
      color: ${(p) => (p.isDone ? "" : "#f4516c")};

      // & > span{
      // color:#e52935;
      // font-size:1.5rem;
      // }
    }
    & > div{
      padding-inline:1rem;
      padding-block:1.5rem;
      & > p {
          color: #777777;
          font-weight:400;
        & > .placeholder {
          color: #EA3815;
          font-weight:400;
        }
        & > .text-spinner {
          color: #3086EE;
          font-weight:400;
        }
      }
    }

    & > .span2 {
      color: ${(p) => (p.isDone ? "#36a3f7" : "#e52935")};
      font-size: 1.5rem;
    }
  }
`;




export const ConfirmModalStyled = styled.div`
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

        display: grid;
        justify-items: center;
        gap: 1rem;



        & > .group {
            display: flex;
            flex-direction:row;
            align-items: center;
            justify-content:end;
            gap: 0.5rem;
            width:100%;
            padding-top:1rem;
            padding-bottom:1rem;
            padding-inline:1rem;
            border-top:1px solid #F0F0F0;
            & > button {
                display: block;
                padding: 0.5rem 2rem;
                background-color: #00BD82;
                border-radius: 0.4rem;
                font-size: 1.3rem;
                color: #fff;
                border:1px solid #00BD82;
                &:nth-of-type(1) {
                    background-color: transparent;
                    border:1px solid #FF5D3E;
                    color: #FF5D3E;
                }
            }
          }
        & > div{
          display:flex;
          align-items:center;
          justify-content:center;
          flex-direction:column;
          padding:3rem;
          & > .top {
              background:#FFEEEE;
              width:7rem;
              height:7rem;
              display:flex;
              align-items:center;
              justify-content:center;
              border-radius:10rem;
              & > .icon {
                  display: grid;
                  line-height: 0;
                  align-items: center;
                  justify-content: center;
                  font-size: 7.1rem;
              }
          }
          & > .bottom {
              display: grid;
              justify-items: center;

              & > h2 {
                  color: #012635;
                  font-size: 1.2rem;
                  font-weight: 600;
                  
              }
              & > .bottom {
                  display: grid;
                  justify-items: center;
                  gap: 1rem;
                  & > p {
                      color: #073F56;
                      font-size: 0.9rem;
                      font-weight: 400;
                      text-align:center;
                  }

                  
              }
        }
      }
    }
`;

export const MUIModalStyled = styled(Modal)`
    & > .MuiModal-backdrop {
        opacity: 0 !important;
        transition: import { ConfirmModalStyled } from './styles';
none;
    }
`;
