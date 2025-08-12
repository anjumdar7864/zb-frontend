import styled from "@emotion/styled";
import theme from "@/theme";
import { CircularProgressbar } from "react-circular-progressbar";

export const DashboardStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 2rem 0rem;

  & > h1 {
    margin-top: -2rem;
    font-size: 2rem;
    font-weight: 500;
    color: black;
    padding-left: 2.2rem;
    margin-bottom: 0.5rem;
  }

  & > .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 0rem 2rem;
    @media (max-width: 1600px) {
      gap: 1.4rem;
      padding: 0rem 1.5rem;
    }
    & > div {
      flex: 1 0 calc(33% - 2rem);
      @media (max-width: 1230px) {
        flex: 1 0 calc(47% - 10px);
      }
      @media (max-width: 800px) {
        flex: 1 0 calc(96% - 10px);
      }
    }

    & > .item1 {
      display: flex;
      flex-direction: column;
      background-color: white;
      border-radius: 1.3rem;
      padding: 1.2rem 1.4rem;
      @media (max-width: 1600px) {
        padding: 2.2rem;
      }
      ${theme.queryStatement(theme.breakpoints.xxlgg)} {
        padding: 1.5rem 1.8rem;
      }

      & > h1 {
        font-size: 1.2rem;
        font-weight: 400;
        display: flex;
        align-items: center;
        line-height: 1.6rem;
        color: black;
        margin-bottom: 2.7rem;
        & > .info {
          margin-left: 0.3rem;
          margin-top: -0.6rem;
          & span {
            color: #7c7c7c4b;
            font-size: 1.2rem;
            cursor: pointer;
          }
        }
      }
      & > div {
        cursor: pointer;
        display: flex;
        flex-wrap: wrap;
        gap: 1.4rem;

        @media (max-width: 1600px) {
          gap: 1.3rem;
        }
        @media (max-width: 1533px) {
          gap: 1.1rem;
        }
        @media (max-width: 1299px) {
          gap: 1.3rem;
        }
        ${theme.queryStatement(theme.breakpoints.xxlgg)} {
          gap: 0.6rem;
        }
        & > .item {
          flex: 1 0 calc(48% - 2rem);
          border: 1px solid #cecece37;
          border-radius: 1.2rem;
          padding: 1.5rem 1rem;
          display: flex;
          align-items: center;
          transition: 0.3s ease-in-out;
          gap: 1.4rem;
          & > header {
            & > img {
              height: 4rem;
              width: 4rem;
            }
          }
          @media (max-width: 1299px) {
            padding: 1.3rem 0.6rem;
          }
          &:hover {
            box-shadow: 2px 2px 4px #dcdcdc80;
          }
          & > * {
            &:last-child {
              & > h4 {
                font-size: 2.5rem;
                font-weight: 500;
                line-height: 1.9rem;
                @media (max-width: 1772px) {
                  font-size: 2rem;
                }
                @media (max-width: 1599px) {
                  font-size: 2.7rem;
                }
                @media (max-width: 1520px) {
                  font-size: 2.2rem;
                }
                @media (max-width: 1299px) {
                  font-size: 2.3rem;
                }
              }
              & > .subHeading {
                & > h5 {
                  font-size: 1.4rem;
                  font-weight: 500;
                  line-height: 1.2rem;
                  padding: 0.7rem 0rem;
                  @media (max-width: 1772px) {
                    font-size: 1.3rem;
                    line-height: 1.3rem;
                  }
                  @media (max-width: 1599px) {
                    font-size: 1.4rem;
                  }
                  @media (max-width: 1520px) {
                    font-size: 1.1rem;
                    line-height: 1rem;
                  }
                  @media (max-width: 1299px) {
                    line-height: 1rem;
                  }
                }
                & > div {
                  display: flex;
                  align-items: center;
                  & > span {
                    font-size: 1.2rem;
                    @media (max-width: 1772px) {
                      font-size: 1.1rem;
                    }
                    @media (max-width: 1605px) {
                      font-size: 1rem;
                    }
                  }
                  & > * {
                    &:last-child {
                      margin-top: 1px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    & > .item2 {
      display: flex;
      flex-direction: column;
      background-color: white;
      border-radius: 1.3rem;
      padding: 1.2rem 1.4rem;
      /* box-shadow: 0px 4px 4px 0px #00000040; */
      @media (max-width: 1600px) {
        padding: 2.2rem;
      }
      ${theme.queryStatement(theme.breakpoints.xxlgg)} {
        padding: 1.5rem 1.8rem;
      }

      & > .heading {
        display: flex;
        width: 100%;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2.7rem;
        & > h1 {
          font-size: 1.2rem;
          font-weight: 400;
          display: flex;
          align-items: center;
          line-height: 1.6rem;
          color: black;

          & > .info {
            margin-left: 0.3rem;
            margin-top: -0.6rem;
            & span {
              color: #7c7c7c4b;
              font-size: 1.2rem;
              cursor: pointer;
            }
          }
        }
        & > div {
          line-height: 1.5rem;
        }
      }

      & > div {
        display: flex;
        width: 100%;
        justify-content: center;
        flex-direction: column;
        gap: 10px;
        @media (max-width: 1100px) {
          margin-top: 5px;
          flex-direction: row;
        }
        & > .item {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 2rem;
          padding: 1rem 1.3rem;
          border-radius: 1rem;
          background-color: #eff2f6;
          &:nth-child(2) {
            background-color: #ecf4ec;
          }
          & > div {
            flex: 1 0 calc(44% - 2rem);
            @media (max-width: 1400px) {
              width: 100%;
            }
          }
          @media (max-width: 1100px) {
            flex-direction: column;
            padding: 13px 10px;
            &:nth-child(2) {
              display: none;
            }
          }

          & > .head {
            display: flex;
            align-items: center;
            gap: 1.4rem;
            & > section {
              /* width: 7rem;
              height: 7rem;
              display: flex;
              align-items: center;
              justify-content: center; */
              position: relative;
              & > #item {
                & > .react-sweet-progress-circle-outer {
                  & > .react-sweet-progress-symbol-absolute {
                    & > div {
                      font-weight: 500;
                      color: "#6d6f71";
                      font-size: 1.2rem;
                    }
                  }
                }
              }
              & > .info {
                top: -0.1rem;
                right: -0.5rem;
                position: absolute;
                margin-left: 0.3rem;
                margin-top: -0.6rem;
                & span {
                  color: #7c7c7c4b;
                  font-size: 1.2rem;
                  cursor: pointer;
                }
              }
            }

            & > blockquote {
              /* width: 7rem;
              height: 7rem;
              display: flex;
              align-items: center;
              justify-content: center; */
              position: relative;
              /* & > .item {
                padding-top: 0.5rem;
                padding-left: 0.5rem;
                padding-right: 0.5rem;
                padding-bottom: 0rem;
                border-radius: 50%;
                width: 7rem;
                height: 7rem;
              } */
              & > #item {
                & > .react-sweet-progress-circle-outer {
                  & > .react-sweet-progress-symbol-absolute {
                    & > div {
                      font-weight: 500;
                      color: "#6d6f71";
                      font-size: 1.2rem;
                    }
                  }
                }
              }
              & > .info {
                position: absolute;
                top: -0.1rem;
                right: -0.5rem;
                margin-left: 0.3rem;
                margin-top: -0.6rem;
                & span {
                  color: #7c7c7c4b;
                  font-size: 1.2rem;
                  cursor: pointer;
                }
              }
            }

            & > .text {
              display: flex;
              flex-direction: column;
              & > .count {
                font-size: 1.4rem;
                font-weight: 500;
                line-height: 1.2;
                color: black;
              }
              & > .heading {
                font-size: 1.1rem;
                font-weight: 400;
                margin-top: 0.3rem;
                color: black;
              }
            }
          }
          & > .body {
            @media (max-width: 1100px) {
              flex-direction: column;
            }
            & > * {
              &:not(:last-child) {
                margin-bottom: 0.4rem;
              }
            }
            & > .subitem {
              display: flex;
              justify-content: space-between;
              font-size: 1.1rem;
              color: #212529;
              opacity: 0.6;
            }
          }
        }
      }
      & > .pagination {
        display: none;
        width: 100%;
        gap: 5px;
        justify-content: center;
        @media (max-width: 1100px) {
          display: flex;
        }

        & > .button {
          padding: 5px;
          border-radius: 50%;
          background-color: #d2d4d9;
        }
      }
    }

    & > .item5 {
      display: flex;
      flex-direction: column;
      background-color: white;
      border-radius: 1.3rem;
      padding: 1.8rem 1.8rem;
      ${theme.queryStatement(theme.breakpoints.xxlgg)} {
        padding: 1.5rem 1.8rem;
      }

      & > .head {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 1rem;
        & > div {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;

          & > .left {
            display: flex;
            flex-direction: column;
            & > h1 {
              font-size: 1.2rem;
              font-weight: 400;
              display: flex;
              align-items: center;
              line-height: 1.6rem;
              color: black;

              & > .info {
                margin-left: 0.3rem;
                margin-top: -0.6rem;
                & span {
                  color: #7c7c7c4b;
                  font-size: 1.2rem;
                  cursor: pointer;
                }
              }
            }
            & > p {
              font-size: 1.2rem;
              opacity: 0.8;
              /* margin-top: 2rem; */
            }
          }
          & > .right {
            & > #item {
              & > .react-sweet-progress-circle-outer {
                & > .react-sweet-progress-symbol-absolute {
                  & > div {
                    font-weight: 500;
                    font-size: 1.2rem;
                    color: "#6d6f71";
                  }
                }
              }
            }
          }
        }
      }
      & > .body {
        display: flex;
        gap: 1.1rem;
        ${theme.queryStatement(theme.breakpoints.md)} {
          flex-direction: column;
        }

        /* & > * {
          &:last-child {
            margin-left: 2rem;

            ${theme.queryStatement(theme.breakpoints.md)} {
              margin-left: 0rem;
              margin-top: 3rem;
            }
          }
        } */
        & > .item {
          & > header {
            margin-bottom: 0.5rem;
            border-bottom: 1px solid #dee2e6;
            padding: 0.7rem 0.6rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            & > div {
              display: flex;
              align-items: center;
              & > * {
                font-size: 1.2rem;
              }
            }
            & > h1 {
              font-weight: 500;
              line-height: 1.6rem;
              font-size: 1.15rem;
              color: black;
              ${theme.queryStatement(theme.breakpoints.md)} {
                font-size: 1.2rem;
              }
            }
          }

          display: flex;
          width: 50%;
          flex-direction: column;
          justify-content: space-between;
          padding: 5px;
          border-radius: 0.8rem;
          background-color: #f8f8fd;
          ${theme.queryStatement(theme.breakpoints.xlgg)} {
            width: 100%;
          }

          & > section {
            padding: 0.7rem 0rem;
            & > * {
              padding: 0rem 1rem;
              &:not(:last-child) {
                margin-bottom: 0.8rem;
              }
            }

            & > .subitem {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              font-size: 1.1rem;
              opacity: 0.9;
              font-weight: 400;
              color: #212529;
              & > div {
                display: flex;
                align-items: center;
                gap: 10px;
              }
            }
          }
        }
      }
    }

    & > .item3 {
      display: flex;
      flex-direction: column;
      background-color: white;
      border-radius: 1.3rem;
      padding: 1.2rem 1.4rem;
      @media (max-width: 1600px) {
        padding: 2.2rem;
      }
      ${theme.queryStatement(theme.breakpoints.xxlgg)} {
        padding: 1.5rem 1.8rem;
      }
      & > .heading {
        display: flex;
        width: 100%;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2.7rem;
        & > h1 {
          font-size: 1.2rem;
          font-weight: 400;
          display: flex;
          align-items: center;
          line-height: 1.6rem;
          color: black;

          & > .info {
            margin-left: 0.3rem;
            margin-top: -0.6rem;
            & span {
              color: #7c7c7c4b;
              font-size: 1.2rem;
              cursor: pointer;
            }
          }
        }
        & > div {
          line-height: 1.5rem;
        }
      }
      & > div {
        display: flex;
        width: 100%;
        justify-content: center;

        @media (max-width: 1400px) {
          margin-top: 1px;
        }
        & > .item {
          display: flex;
          align-items: center;
          gap: 4rem;
          width: 100%;
          @media (max-width: 1600px) {
            gap: 2rem;
          }
          /* @media (max-width: 1400px) {
            flex-direction: column;
            padding: 13px 10px;
          } */
          @media (max-width: 1399px) {
            gap: 1.5rem;
          }

          & > section {
            display: flex;
            align-items: center;
            justify-content: center;
            & > img {
              width: 200px;
              height: 200px;
              @media (max-width: 1480px) {
                width: 170px;
                height: 170px;
              }
              @media (max-width: 1300px) {
                width: 150px;
                height: 150px;
              }
              @media (max-width: 1270px) {
                width: 130px;
                height: 130px;
              }
            }
          }
          & > .head {
            & > div {
              display: flex;
              position: relative;
              width: 200px;
              height: 200px;
              @media (max-width: 1480px) {
                width: 170px;
                height: 170px;
              }
              @media (max-width: 1300px) {
                width: 150px;
                height: 150px;
              }
              @media (max-width: 1270px) {
                width: 130px;
                height: 130px;
              }
              /* 
              @media (max-width: 1400px) {
                height: 180px;
                width: 180px;
              } */

              & > div {
                display: flex;
                position: absolute;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 80px;
                height: 80px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);

                .count {
                  font-size: 1.8rem;
                  font-weight: 500;
                }
                .total {
                  font-size: 1.3rem;
                  font-weight: 400;
                  opacity: 0.5;
                }
              }
            }
          }
          & > .body {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 2.5rem;

            padding: 0px 10px;
            /* & > * {
              &:not(:last-child) {
                margin-bottom: 2.1rem;
                @media (max-width: 1299px) {
                  margin-bottom: 1.6rem;
                }
              }
            } */
            & > .subitem {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              gap: 1rem;
              font-size: 1.3rem;
              opacity: 0.6;
              color: #212529;
              @media (max-width: 1400px) {
                padding: 0px 0px;
              }
              & > div {
                display: flex;
                align-items: center;
                gap: 10px;
              }
            }
          }
        }
      }
    }

    & > .item6 {
      display: flex;
      flex-direction: column;
      border-radius: 1.3rem;
      background-color: white;
      & > .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f4f5f8;
        padding: 1.6rem 2rem;
        & > h1 {
          font-size: 1.2rem;
          font-weight: 400;
          display: flex;
          align-items: center;
          line-height: 1.6rem;
          color: black;
          & > .info {
            margin-left: 0.3rem;
            margin-top: -0.6rem;
            & span {
              color: #7c7c7c4b;
              font-size: 1.2rem;
              cursor: pointer;
            }
          }
        }
        & > div {
          display: flex;
          justify-content: space-between;
          & > span {
            display: flex;
            justify-content: center;
            width: 50px;
            ${theme.queryStatement(theme.breakpoints.md)} {
              width: 30px;
            }
          }
        }
      }
      & > .body {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.6rem 1.6rem;
        & > .item {
          display: flex;
          width: 100%;
          align-items: center;
          cursor: pointer;
          justify-content: space-between;
          transition: 0.3s all ease-in-out;
          &:nth-of-type(2n) {
            background-color: #f4f3fb;
            border-radius: 0.3rem;
          }
          &:hover {
            transform: scale(1.02);
          }
          ${theme.queryStatement(theme.breakpoints.md)} {
            margin: 1rem 0rem;
          }
          & > h2 {
            font-size: 1.2rem;
            font-weight: 400;
            margin: 1.5rem 0rem;
            padding-left: 0.4rem;
            color: black;
            line-height: 2.2rem;
            ${theme.queryStatement(theme.breakpoints.md)} {
              font-size: 1.3rem;
            }
          }
          & > div {
            display: flex;
            font-size: 1.2rem;
            justify-content: space-between;
            ${theme.queryStatement(theme.breakpoints.md)} {
              font-size: 1.2rem;
            }

            & > span {
              display: flex;
              justify-content: center;

              width: 50px;
              ${theme.queryStatement(theme.breakpoints.md)} {
                width: 30px;
              }
            }
          }
        }
      }
    }

    & > .avgFlex {
      display: flex;
      ${theme.queryStatement(theme.breakpoints.lg)} {
        flex-direction: column;
      }
      gap: 2rem;
      @media (max-width: 1600px) {
        gap: 1.4rem;
      }
      & > .avgReply {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        ${theme.queryStatement(theme.breakpoints.lg)} {
          min-height: 200px;
          width: 100%;
        }
        position: relative;
        background-color: white;
        border-radius: 1.3rem;
        padding: 2rem 1.8rem;

        & > .heading {
          display: flex;
          width: 100%;
          flex-direction: row;
          /* align-items: center; */
          justify-content: space-between;
          margin-bottom: 2.7rem;
          & > h1 {
            font-size: 1.2rem;
            font-weight: 400;
            line-height: 1.6rem;
            color: black;
            gap: 0.3rem;

            & > .info {
              margin-left: 0.3rem;
              margin-top: -0.6rem;
              & span {
                color: #7c7c7c4b;
                font-size: 1.2rem;
                cursor: pointer;
              }
            }
          }
          & > div {
            line-height: 1.5rem;
          }
        }

        & > .body {
          & > h3 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            font-weight: 600;
          }
          & > section {
            display: flex;
            align-items: center;
            gap: 1rem;
            & > div {
              & > p {
                color: black;
                font-size: 1.1rem;
                margin: 0rem;
              }
            }
          }
        }
      }
    }
  }
  & > .graphContainer {
    display: flex;
    margin-top: 2rem;
    gap: 2rem;
    padding: 0rem 2rem;
    /* ${theme.queryStatement(theme.breakpoints.xlg)} {
      padding: 0rem 2rem;
    } */
    @media (max-width: 1600px) {
      gap: 1.4rem;
      padding: 0rem 1.5rem;
      margin-top: 1.4rem;
    }
    & > * {
      &:first-child {
        width: 60%;
        /* margin-right: 1rem; */
        ${theme.queryStatement(theme.breakpoints.xlg)} {
          width: 100%;
          margin-right: 0rem;
        }
      }
      &:last-child {
        width: 40%;
        ${theme.queryStatement(theme.breakpoints.xlg)} {
          width: 100%;
          margin-top: 1rem;
        }
      }
    }

    ${theme.queryStatement(theme.breakpoints.xlg)} {
      flex-direction: column;
    }
    & > .graphs {
      border-radius: 1.2rem;
      background-color: white;
      padding: 1.8rem 1.4rem;

      & > .graphbody {
        display: flex;
        flex-direction: column;

        & > .head {
          display: flex;
          align-items: center;
          gap: 1.4rem;
          justify-content: space-between;
          & > .heading {
            display: flex;
            width: 100%;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 2.7rem;
            & > h1 {
              font-size: 1.2rem;
              font-weight: 400;
              display: flex;
              align-items: center;
              line-height: 1.6rem;
              color: black;

              & > .info {
                margin-left: 0.3rem;
                margin-top: -0.6rem;
                & span {
                  color: #7c7c7c4b;
                  font-size: 1.2rem;
                  cursor: pointer;
                }
              }
            }
            & > div {
              line-height: 1.5rem;
            }
          }

          & > section {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            width: 160px;
            margin-top: -3rem;
          }

          & > .dropDown-with-heading {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 180px;
            padding-bottom: -1rem;
            margin-top: -2.5rem;

            & > * {
              &:last-child {
                margin-top: 1rem;
              }
            }
          }

          & > .item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 7rem;
            height: 7rem;
            overflow: visible;
          }
        }
        & > .body {
          width: 100% !important;
          & > * {
            height: 400px !important;
            width: 100% !important;
          }
        }
      }
    }
  }

  & > .flagContainer {
    padding: 1.8rem 2rem;
    margin-top: 1rem;
    @media (max-width: 1600px) {
      margin-top: 1%.6;
      padding: 0rem 1.5rem;
    }
    & > div {
      ${theme.queryStatement(theme.breakpoints.xxlg)} {
        overflow-x: hidden;
        overflow-x: scroll;
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          display: none;
        }
        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      }
      & > div {
        background-color: white;
        ${theme.queryStatement(theme.breakpoints.xxlg)} {
          width: 1200px;
        }
      }
      .flag-container-margins {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0rem 2rem;

        & > div {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          & > span {
            font-size: 1.1rem;
            font-weight: 500;
          }
          & > p {
            font-size: 1.1rem;
            font-weight: 500;
          }
        }

        ${theme.queryStatement(theme.breakpoints.md)} {
          flex-direction: column;
        }
      }
      & > .item4 {
        display: flex;
        flex-direction: column;
        padding: 1.8rem 1.4rem;
        border-radius: 1.1rem;
        & > .head {
          border-bottom: 1px solid #f4f5f8;
          display: flex;
          flex-wrap: wrap;
          padding: 1rem 2.5rem;
          & > * {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1 0 calc(16% - 10px);
          }
          & > h1 {
            font-size: 1.3rem;
            font-weight: 400;
            display: flex;
            align-items: center;
            line-height: 1.6rem;
            color: black;

            & > .info {
              margin-left: 0.3rem;
              margin-top: -0.6rem;
              & span {
                color: #7c7c7c4b;
                font-size: 1.2rem;
                cursor: pointer;
              }
            }
          }
          & > div {
            & > span {
              font-size: 1.3rem;
              font-weight: 400;
            }
          }
        }
        & > .body {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0rem 2rem;
          & > .item {
            width: 100%;
            cursor: pointer;
            border-radius: 0.5rem;
            display: flex;
            flex-wrap: wrap;
            padding: 0.3rem 2rem;
            gap: 0.5rem;
            & > * {
              display: flex;
              align-items: center;
              justify-content: center;
              flex: 1 0 calc(16% - 10px);
            }
            &:nth-of-type(2n) {
              background-color: #f4f3fb;
            }
            & > h2 {
              font-size: 1.1rem;
              font-weight: 500;
              padding-right: 3rem;
            }
            & > div {
              padding: 0rem 1rem;
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
              & > span {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.1rem;
                font-weight: 500;
              }
            }
          }
        }
      }
    }
  }
`;

export const CircularProgressbarStyled = styled(CircularProgressbar)`
  & path {
    overflow: visible;
    margin-top: 0.8rem;
  }
  & > .CircularProgressbar-text {
    text-anchor: middle;
    alignment-baseline: middle;
    font-family: "fellix"
    font-weight: 500;
    font-size: 1.4rem !important ;
  }
`;
