import theme from "@/theme";
import styled from "@emotion/styled";

export const DirectImportStyled = styled.div`
  padding: 2rem 2rem;
  background-color: #f2f3f8;
  
  & > .top {
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    gap: 2rem;
    margin-bottom: 1.6rem;

    & > .left > h1 {
      font-size: 32px;
      font-weight: 700;
      color: #012635;
      line-height: 40px;
      // font-family:none ; 
    }

    & > .right {
      // display: grid;
      display:flex ; 
      padding-right:40px ; 
      gap: 2rem;
      justify-items: end;

      & > .top {
        & > button {
          display: grid;
          align-items: center;
          justify-content: center;
          grid-template-columns: auto auto;
          gap: 0.7rem;
          // background-color: #5867dd;
          height:48px;
          width:143px;
          background-color:#00BD82;
          transition: background-color 300ms;
          padding: 0.6rem 1.05rem;
          border-radius: 8px;

          & > .icon {
            font-size: 0.9rem;
            line-height: 0;
            color: #fff;

            &.loader {
              display: inline-block;
              font-size: 1.5rem;
              animation: spin 2s linear infinite;
              transform-origin: center center;
              width: 1.5rem;
              height: 1.5rem;
            }
          }

          & > .text {
            font-size: 16px;
            font-weight:500 ; 
            color: #fff;
          }

          &:not(:disabled):hover {
            background-color: #384ad7;
          }

          &:disabled {
            cursor: not-allowed;
            opacity: 0.65;
          }
        }
      }
      & > .bottom {
        // display: grid;
        // grid-template-columns: auto auto;
        background-color:white ;
        display:flex ;
        width:234px ; 
        & > input {
          border-radius: 8px 0 0 8px;
          outline: none;
          padding: 0.9rem 1.3rem;
          background-color: transparent;
          font-size: 1.3rem;
          border: 0.1rem solid #D3D7DD;
          border-right: none ;
          // width: 30rem;
          transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;

          &:focus {
            border-color: #384ad7;
            background-color: #fff;
          }

          ${theme.queryStatement(theme.breakpoints.md)} {
            width: 100%;
          }
        }
        & > button {
          border-radius: 0 8px 8px 0;
          display: grid;
          width: 3.6rem;
          align-items: center;
          justify-content: center;
          color: #fff;
          // background-color: #36a3f7;
          border: 0.1rem solid #D3D7DD;
          border-left:none ; 
          background-color: white ;
          padding-right:10px ; 
          font-size: 1.5rem;
          transition: background-color 300ms;

          &:hover {
            background-color: #1192f6;
          }
        }
      }
    }
  }
  & > .bottom {
    display: grid;
    gap: 1.6rem;
    & > .top {
      display: grid;
      gap: 0.65rem;
      /* background-color: green; */
      & > h2 {
        font-size: 1.656rem;
        color: #212529;
        font-weight: 500;
        opacity: 0.7;
      }

      & > .bottom {
        /* background-color: yellow; */
        padding: 0.975rem 1.3rem;
        border: 1px solid #d8d8d8;
        border-radius: 0.4rem;
        display: grid;
        overflow: hidden;
        gap: 0.65rem;

        & > p {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 1.3rem;
          color: #333;
        }

        & > .bar {
          display: block;
          width: 25%;
          background-color: #1192f6;
          height: 1.3rem;
          border-radius: 0.4rem;
        }
      }
    }
    & > .bottom {
      /* display: grid;
      gap: 1.3rem; */

      ${theme.queryStatement(theme.breakpoints.xxllg)} {
        width: 100%;
        padding-bottom: 2rem;
        overflow-x: auto;
      }
      & > .top {
        & > table {
          width: 100%;
          border-spacing: 0 0.5rem;
          ${theme.queryStatement(theme.breakpoints.xxllg)} {
            overflow-x: auto;
            width: 1300px;
          }

          & > * {
            &:first-child {
              background-color: #f1f1f1;
              padding: 1rem 0rem;
            }
          }

          & > tr > th {
            text-align: center;
            overflow: hidden;
            padding: 1.3rem 1.3rem;

            &:first-of-type,
            &:last-of-type {
              width: 0 !important;
              padding: 0.65rem 0;
            }

            &:nth-of-type(2) {
              text-align: left;
            }

            &:nth-last-of-type(2) {
              text-align: right;
            }
            > .item {
              & > .text {
                text-overflow: ellipsis;
                color: #000000;
                font-size: 1.2rem;
                font-weight: 500;
                padding-right: 0.3rem;
              }

              & > .icon {
                color: #7c7c7c4b;
                font-size: 1.2rem;
                cursor: pointer;
                margin-top: 0.9rem;
              }
            }
          }

          & > tr {
            & > td.error {
              font-size: 1.3rem;
              color: #211529;
              opacity: 0.8;
              text-align: center;
            }
          }
        }
      }

      & > .bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        ${theme.queryStatement(theme.breakpoints.md)} {
          flex-direction: column;
          gap: 1.3rem;
        }
        & > .left > span {
          font-size: 1.3rem;
          color: #212529;
        }
      }
    }
  }
`;

export const TableRowStyled = styled.tr`
  position: relative;
  border-bottom: 1rem solid #f2f3f8;
  background-color: white;

  & > td {
    text-align: left;
    overflow: hidden;
    text-align: center;
    padding-top: 3.6rem;
    padding-bottom: 0.8rem;
    padding-left: 1.2rem;
    padding-right: 1.4rem;
    &:last-of-type {
      text-align: right;
    }
    &:nth-of-type(2) {
      text-align: left;
    }

    &.extra {
      position: absolute !important;
      color: #000000;
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 2.2rem;
      white-space: nowrap;
      top: 0.8rem;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 1.3rem;
      width: ${(p) => p.rowWidth}px;
      text-align: left;
    }

    & > .info {
      color: #ffc12b;
      font-size: 1.3rem;
    }

    & > .listName {
      background-color: #f8f8f8;
      padding: 0.585rem 0.65rem;
      width: fit-content;
      max-width: 20rem;
      display: grid;
      align-items: center;
      grid-template-columns: auto auto auto;
      border: 0.1rem solid #c1c1c1;
      border-radius: 0.3rem;
      gap: 0.9rem;

      & > .icon {
        line-height: 0;
        color: #c1c1c1;
        font-size: 1.17rem;
      }

      & > .text {
        color: #c1c1c1;
        font-size: 1.2rem;
        font-weight: 300;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
      }

      & > button {
        line-height: 0;
        font-size: 1rem;
        color: #6464644d;
        transform: translateY(-0.7rem);
        opacity: 0;
        transition: opacity 300ms, transform 300ms;
      }

      &:hover > button {
        transform: translateY(0);
        opacity: 1;
      }
    }

    & > button.assign {
      display: grid;
      align-items: center;
      justify-content: center;
      grid-template-columns: auto auto;
      gap: 0.9rem;
      background-color: transparent;
      transition: background-color 300ms, border 300ms;
      padding: 0.6rem 1.4rem;
      border-radius: 0.3rem;
      border: 1.4px solid #208a99;
      white-space: nowrap;

      & > .text {
        font-size: 1.2rem;
        color: #36a3f7;
        transition: color 300ms;
      }

      & > .icon {
        font-size: 1.3rem;
        line-height: 0;
        color: #36a3f7;
        display: inline-block;
        transition: color 300ms, transform 300ms;
      }

      &:hover {
        background-color: #1192f6;
        border: 1px solid #1192f6;

        & > .icon,
        & > .text {
          color: #fff;
        }

        & > .icon {
          transform: translate(0.5rem, 0);
        }
      }
    }

    & > .dotGroup {
      display: grid;
      align-items: center;
      gap: 0.7rem;
      grid-template-columns: auto auto;
      justify-content: center;

      & > .dot {
        width: 0.65rem;
        height: 0.65rem;
        border-radius: 50%;
        background-color: orange;
      }
      & > .text {
        font-size: 1.3rem;
        color: #00000090;
      }
    }

    & > .date {
      font-size: 1.3rem;
      color: #00000090;
    }

    & > .actions {
      display: grid;
      align-items: center;
      justify-content: end;
      gap: 1.5rem;
      position: relative;

      grid-template-columns: auto auto;

      & button {
        color: #9e9e9e;
        font-size: 1.5rem;
      }
    }

    &.download {
      position: absolute;
      /* height: ${(p) => p.rowHeight}px; */
      background-color: #fff;
      box-shadow: -12px 0 10px 1px #0003;
      top: 0;
      bottom: 0;
      right: 7rem;
      transform-origin: right center;
      padding: 0;

      & > .group {
        padding: 0 1.6rem;
        display: grid;
        align-items: center;
        height: 100%;
        gap: 2rem;
        grid-template-columns: repeat(3, auto);

        & > button {
          display: flex;
          align-items: center;
          padding: 0.65rem;

          gap: 0.5rem;
          grid-template-columns: auto auto;
          vertical-align: middle;
          transition: background-color 300ms;

          &:hover {
            background: #dedfe7;
            text-decoration: underline;
            text-decoration-color: #333;
          }

          & > .icon {
            color: #9e9e9e;
            font-size: 1.5rem;
            vertical-align: middle;

            display: flex;
            align-items: center;
            justify-content: center;
          }
          & > .text {
            color: #333;
            font-size: 1.3rem;
            vertical-align: middle;
          }
        }
      }
    }
  }
`;

export const ImportModalStyled = styled.div`
  width: 95vw;
  max-width: 54.6rem;
  background-color: #fff;

  & > .top {
    padding: 1.3rem;
    background-color: #f2f2f2;
    & > h2 {
      color: #212529;
      font-size: 1.625rem;
      font-weight: 500;
    }
  }
  & > .middle {
    padding: 1.3rem;

    & > .center {
      display: grid;
      justify-items: center;
      gap: 1rem;
      border: 0.2rem dashed #e9e9e9;
      padding: 2rem 3rem 1rem;

      & > input {
        display: none;
      }

      & > p {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 0.65rem;
        width: 100%;
        padding: 0.65rem;
        background-color: #007ad9;
        transition: background-color 300ms;
        align-items: center;

        &:not(:disabled):hover {
          background-color: #116fbf;
        }

        & > .icon {
          font-size: 1.3rem;
          line-height: 0;
          color: #fff;
        }
        & > .text {
          color: #fff;
          font-size: 1.3rem;
          text-align: center;
        }
      }

      & > span {
        color: #212529;
        opacity: 0.6;
        font-size: 1.2rem;
      }
    }
  }

  & > .bottom {
    background-color: #f2f2f2;
    padding: 1.3rem;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    justify-content: space-between;

    & > a {
      color: #5768dd;
      &:hover {
        text-decoration: underline;
      }
    }

    & > button {
      padding: 0.85rem 1.5rem;
      font-size: 1.1rem;
      border: 0.1rem solid #c1c4cc;
      font-weight: 500;
      border-radius: 0.4rem;
      transition: background-color 0.3s ease-in-out;
      & > .text {
        font-size: 1.3rem;
      }

      &:not(:disabled):hover {
        background-color: #fff;
      }
    }
  }
`;

export const SelectInitailCampaignModalStyled = styled.div`
  display: grid;
  background-color: #fff;
  max-height: calc(100vh - 5rem);
  max-height: calc(100svh - 5rem);
  width: 95vw;
  max-width: 54.6rem;
  overflow-y: auto;

  & > .top {
    padding: 1.3rem;
    background-color: #f8f8f8;
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    & > h2 {
      font-size: 1.95rem;
      font-weight: 500;
      color: #212529;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    & > button {
      background-color: transparent;
      transition: background-color 300ms, border 300ms;
      padding: 0.6rem 1.05rem;
      border-radius: 0.5rem;
      border: 1px solid #d8d8d8;

      font-size: 1.1375rem;
      color: #212529;

      &:hover {
        background-color: #fff;
        border: 1px solid #d8d8d8;
      }
    }
  }
  & > .bottom {
    padding: 1.3rem;
    display: grid;
    gap: 1.5rem;

    & > .top {
      display: grid;
      gap: 0.5rem;
      & > input {
        padding: 1.1rem 1.5rem;
        border: 0.1rem solid #c1c4cc;
        color: #575962;
        background-color: transparent;
        outline: none;
        border-radius: 0.35rem;
        transition: background-color 300ms, color 300ms, border-color 300ms;
        width: 100%;
        font-size: 1.3rem;

        &:focus {
          border-color: #716aca;
          color: #575962;
          background-color: #fff;
        }

        &:disabled {
          border-color: #f4f5f8;
          color: #6f727d;
          background-color: #f4f5f8;
        }
      }

      & > p {
        color: #212529;
        font-size: 1.04rem;
        opacity: 0.6;
      }
    }
    & > .bottom {
      display: grid;
      overflow-x: auto;

      & > table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;

        & > thead > tr > th {
          font-size: 1.3rem;
          color: #212529;
          font-weight: 500;
          padding: 0.975rem;
          text-align: center;
          border-top: 2px solid #f4f5f8;
          border-bottom: 2px solid #f4f5f8;

          &:first-of-type {
            text-align: left;
            width: calc(100%-25rem);
            min-width: 25rem;
          }
          &:nth-of-type(2) {
            width: 15rem;
            white-space: nowrap;
          }
          &:last-of-type {
            text-align: right;
            width: 10rem;
          }
        }
        & > tbody > tr {
          &:nth-of-type(2n) {
            background-color: #f8f8f8;
          }
          & > td {
            font-size: 1.3rem;
            color: #212529;
            padding: 0.975rem;
            text-align: center;

            &:first-of-type {
              text-align: left;
              width: calc(100%-25rem);
              min-width: 25rem;
            }
            &:nth-of-type(2) {
              width: 15rem;
            }
            &:last-of-type {
              text-align: right;
              width: 10rem;
            }

            &.loading {
              text-align: center;
              & > div {
                font-size: 1.3rem;
                color: #212529;
                font-weight: 500;

                & > span {
                  & > svg > circle {
                    stroke-width: 0.1rem;
                    stroke: #007bff;
                  }
                }
              }
            }

            &.error {
              font-size: 1.3rem;
              color: #212529;
              text-align: center;
            }

            & > button {
              gap: 0.7rem;
              background-color: #34bfa3;
              transition: background-color 300ms, border 300ms;
              padding: 0.585rem 1.05rem;
              border-radius: 0.5rem;
              color: #fff;
              font-size: 1.1375rem;

              &:hover {
                background-color: #2ca189;
              }
            }
          }
        }
      }
    }
  }
`;

export const FileReadingModalStyled = styled.div`
  width: 95vw;
  max-width: 54.6rem;
  background-color: #fff;

  & > .top {
    padding: 1.3rem;
    background-color: #f2f2f2;
    & > h2 {
      color: #212529;
      font-size: 1.625rem;
      font-weight: 500;
    }
  }

  .bottom {
    padding: 5rem;
    display: grid;
    gap: 0.5rem;
    align-items: center;
    justify-items: center;

    & > div {
      font-size: 1.3rem;
      color: #212529;
      font-weight: 500;

      & > span {
        & > svg > circle {
          stroke-width: 0.1rem;
          stroke: #007bff;
        }
      }
    }
  }
`;

export const MatchingModalStyled = styled.div`
  width: 95vw;
  max-width: 68.6rem;
  background-color: #fff;

  & > .top {
    padding: 1.3rem;
    background-color: #f2f2f2;
    & > h2 {
      color: #212529;
      font-size: 1.625rem;
      font-weight: 500;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    & > p {
      color: #212529;
      font-size: 1.3rem;
      opacity: 0.8;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  & > .middle {
    padding: 2.5rem;

    & > .wrapper {
      max-height: calc(100vh - 22.5rem);
      max-height: calc(100sh - 22.5rem);
      overflow-y: auto;
      overflow-x: auto;

      & > table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        border: 1px solid #e6eef7;

        & > thead > tr {
          background-color: #f9fbfd;
          & > th {
            text-align: left;
            white-space: nowrap;
            color: #49515b;
            font-size: 1.3rem;
            padding: 0.3rem 0.8rem;
            font-weight: 400;

            &:first-of-type {
              width: 16rem;
            }

            &:nth-of-type(2) {
              width: calc(100% - 32rem);
              min-width: 20rem;
            }

            &:last-of-type {
              width: 16rem;
            }
          }
        }

        & > tbody > tr {
          & > td {
            text-align: left;
            white-space: nowrap;
            color: #333;
            font-size: 1.3rem;
            padding: 1rem 0.8rem;
            font-weight: 400;
            border-top: 1px solid #e6eef7;
            border-bottom: 1px solid #e6eef7;

            &:first-of-type {
              width: 16rem;
            }

            &:nth-of-type(2) {
              width: calc(100% - 32rem);
              min-width: 20rem;
              max-width: 20rem;
              overflow-x: hidden;
              text-overflow: ellipsis;
            }

            &:last-of-type {
              width: 16rem;
            }

            & > select {
              padding: 1.1rem 4rem 1.1rem 1.5rem;
              border: 0.1rem solid #c1c4cc;
              font-size: 1.3rem;
              color: #575962;
              background-color: transparent;
              outline: none;
              border-radius: 0.35rem;
              transition: background-color 300ms, color 300ms,
                border-color 300ms;
              appearance: none;
              -webkit-appearance: none;
              -moz-appearance: none;
              background-image: url("${(p) => p.ChevronDown}");
              background-repeat: no-repeat;
              background-position: calc(100% - 1.5rem) center;
              background-size: 1rem;

              &:focus {
                border-color: #716aca;
                color: #575962;
                background-color: #fff;
              }
            }
          }
        }
      }
    }
  }

  & > .bottom {
    background-color: #f2f2f2;
    padding: 1.3rem;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    justify-content: end;
    gap: 0.5rem;

    & > button {
      padding: 0.85rem 1.5rem;
      font-size: 1.1rem;
      border: 0.1rem solid #c1c4cc;
      font-weight: 500;
      border-radius: 0.4rem;
      transition: background-color 0.3s ease-in-out;

      & > .text {
        font-size: 1.1rem;
      }

      &:not(:disabled):hover {
        background-color: #fff;
      }

      &:has(.icon) {
        display: grid;
        align-items: center;
        justify-content: center;
        gap: 0.3rem;
        grid-template-columns: auto auto;
        background-color: #36a3f7;
        transition: background-color 300ms;

        & > .icon {
          font-size: 1.4rem;
          color: #fff;
          line-height: 0;
        }

        & > .text {
          font-size: 1.1rem;
          color: #fff;
        }

        &:not(:disabled):hover {
          background-color: #1192f6;
        }
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.65;
      }
    }
  }
`;
