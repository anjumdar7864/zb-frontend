import styled from "@emotion/styled";
import theme from "@/theme";
import { CircularProgressbar } from "react-circular-progressbar";

export const DashboardStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  // padding: 2rem 0rem;
  & > .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    width: 100%;
    height: 94px;
    border-radius: 8px;
    padding: 0 36px 0 36px;
    flex-wrap: wrap;
    h1 {
      font-family: "Fellix", sans-serif;
      font-weight: 700;
      font-size: 32px;
      line-height: 40px;
      color: #000000;
      width: 196px;
      text-align: center;
    }
    .heading-text {
      height: 40px;
      border-radius: 8px;
      
    }

    .searchField {
      display: flex;
      align-items: center;
      position: relative;

      input {
        width: 250px;
        height: 46px;
        border: 1px solid #ccc;
        border-radius: 6px;
        padding: 0 2.5rem;
        font-family: "Fellix", sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        color: #7c7c7c;
        outline: none;
        &:focus {
          border-color: #86b7fe;
        }
      }
      &::before {
        content: "";
        position: absolute;
        left: 0.4rem;
        top: 50%;
        transform: translateY(-50%);
        background: url("/src/assets/icons/search.png") no-repeat center
          center;
        background-size: contain;
        width: 22px;
        height: 22px;
      }
    }
  }

  @media (max-width: 768px) {
    .header {
      padding: 12px;
      height: auto;
      max-width: 100%;
      h1 {
        text-align: left;
      }
    }
  }
  & > .cards {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-top: 2rem;
    gap: 16px;
    padding: 0rem 2rem;

    & .section1 {
      display: grid;
      grid-template-columns: 387px 1fr 351px;
      gap: 16px;
      width: 100%;
      max-width: 100%;
    }
    & .section2 {
      display: grid;
      grid-template-columns: 1fr 315px 351px;
      gap: 16px;
      width: 100%;
      max-width: 100%;
    }
    & .section3 {
      display: grid;
      grid-template-columns: 760px 1fr;
      gap: 16px;
      width: 100%;
      max-width: 100%;
    }
    & .item1 {
      display: flex;
      flex-direction: column;
      background-color: #ffffff;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      .horizantalLine {
        height: 1px;
        width: 100%;
        max-width: 100%;
        background-color: #e0e0e0;
      }
      .itemsWrapper {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
        border-top: 1px solid #f4f5f8;
      }

      .updatedItem {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        padding: 12px;
        border-radius: 0.8rem;
        background-color: #f4f5f6;
        gap: 1.4rem;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        cursor: pointer;

        &:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .iconWrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3.6rem;
          height: 3.6rem;
          border-radius: 0.8rem;
          font-size: 1.5rem;
          color: white;
        }

        h4 {
          font-size: 1.8rem;
          font-weight: 700;
          color: black;
        }

        .subHeading {
          display: flex;
          flex-direction: column;

          h5 {
            font-size: 1.1rem;
            font-weight: 500;
            margin-bottom: 0.3rem;
          }

          div {
            display: flex;
            align-items: center;

            span {
              font-size: 0.9rem;
              margin-right: 0.4rem;
              color: #6d6d6d;
            }
          }
        }
      }

      // ${theme.queryStatement(theme.breakpoints.xxlgg)} {
      //   padding: 1.5rem 1.8rem;
      // }

      & > h1 {
        font-size: 18px;
        font-weight: 500;
        display: flex;
        align-items: center;
        line-height: 1.6rem;
        color: #012635;
        height: 64px;
        /* margin-bottom: 18px; */
        & > .info {
          margin-left: 0.3rem;
          // margin-top: 0.4rem;
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

    & .item2 {
      display: flex;
      flex-direction: column;
      background-color: #ffffff;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      .horizantalLine {
        height: 1px;
        width: 100%;
        max-width: 100%;
        background-color: #e0e0e0;
      }
      .dropdown-selector {
        border-radius: 8px;
        border: 1px solid lightgray;
        padding: 5px 12px 5px 12px;
      }
      & > .heading {
        display: flex;
        width: 100%;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;

        & > h1 {
          font-size: 18px;
          font-weight: 500;
          display: flex;
          align-items: center;
          line-height: 1.6rem;
          color: #012635;

          & > .info {
            margin-left: 0.3rem;
            // margin-top: 0.4rem;
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
        }
        @media (max-width: 600px) {
          margin-top: 5px;
        }
        @media (max-width: 480px) {
          margin-top: 5px;
        }
        & > .item {
          display: flex;
          align-items: center;
          width: 100%;
          max-width: 100%;
          gap: 2rem;
          padding: 16px;
          border-radius: 16px;
          background-color: #F7F8FC;
          &:nth-child(2) {
            background-color: #F7F8FC;
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
              // display: none;
            }
          }

          & > .head {
            display: flex;
            align-items: center;
            gap: 1.4rem;
            // width: 478px;
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
                      font-weight: 600;
                      color: "#000000";
                      font-size: 18px;
                    }
                  }
                }
              }
              & > .info {
                top: -0.1rem;
                right: -0.5rem;
                position: absolute;
                margin-left: 0.3rem;
                // margin-top: 0.4rem;
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
                      font-weight: 600;
                      color: "#000000";
                      font-size: 18px;
                    }
                  }
                }
              }
              & > .info {
                position: absolute;
                top: -0.1rem;
                right: -0.5rem;
                margin-left: 0.3rem;
                // margin-top: 0.4rem;
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
              width: 100%;
              max-width: 200px;
              & > .count {
                font-size: 16px;
                font-weight: 600;
                line-height: 24px;
                color: #000000;
              }
              & > .heading {
                font-size: 12px;
                font-weight: 400;
                margin-top: 0.3rem;
                color: #777777;
              }
            }
          }
          .verticalLine {
            height: 122px;
            width: 1px;
            background-color: #e0e0e0;
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
              font-size: 14px;
              font-weight: 400;
              color: #000000;
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
          display: none;
        }

        & > .button {
          padding: 5px;
          border-radius: 50%;
          background-color: #d2d4d9;
        }
      }
    }
    & .item4 {
      display: flex;
      flex-direction: column;
      background-color: #ffffff;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      .horizantalLine {
        height: 1px;
        width: 100%;
        max-width: 100%;
        background-color: #e0e0e0;
      }

      & > .head {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 5px;
        & > div {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;

          & > .left {
            display: flex;
            flex-direction: column;
            & > h1 {
              font-size: 18px;
              font-weight: 500;
              display: flex;
              align-items: center;
              line-height: 1.6rem;
              color: #012635;

              & > .info {
                margin-left: 0.3rem;
                // margin-top: 0.4rem;
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
              & > .barSize {
                display: flex;
                gap: 5px;
                font-weight: 700;
                font-size: 16px;
                height: 24px;
              }
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
        padding: 16px;
        height: 100%;
        ${theme.queryStatement(theme.breakpoints.md)} {
          flex-direction: column;
        }

        /* & > * {
          &:last-child {
            margin-left: 2rem;

            ${theme.queryStatement(theme.breakpoints.md)} {
              margin-left: 0rem;
              // margin-top: 3rem;
            }
          }
        } */
        & > .item {
          & > header {
            margin-bottom: 0.5rem;
            padding: 12px 1px 0 4px;
            display: flex;
            align-items: center;
            gap: 8px;
            & > div {
              display: flex;
              align-items: center;
              & > * {
                font-size: 1.2rem;
              }
            }
            & > h1 {
              font-weight: 600;
              line-height: 22px;
              font-size: 14px;
              color: #012635;
              ${theme.queryStatement(theme.breakpoints.md)} {
                font-size: 1.2rem;
              }
            }
          }

          display: flex;
          width: 50%;
          flex-direction: column;
          justify-content: space-between;
       
          border-radius: 16px;
          background-color: #f8f8fd;
          padding: 16px;
          ${theme.queryStatement(theme.breakpoints.xlgg)} {
            width: 100%;
          }

          & > section {
            padding: 8px 1px 8px 4px;
            & > * {
              &:not(:last-child) {
                margin-bottom: 0.8rem;
              }
            }

            & > .subitem {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              font-size: 14px;
              /* opacity: 0.9; */
              font-weight: 400;
              color: #000000;
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

    & .item3 {
      display: flex;
      flex-direction: column;
      background-color: #ffffff;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      .horizantalLine {
        height: 1px;
        width: 100%;
        max-width: 100%;
        background-color: #e0e0e0;
      }
      .dropdown-selector {
        border-radius: 8px;
        border: 1px solid lightgray;
        padding: 5px 12px 5px 12px;
      }
      .lead-breakdown-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        border-radius: 8px;
        font-family: Arial, sans-serif;
        gap: 8px;
      }

      .chart-container {
        position: relative;
        width: 209px;
        height: 209px;
      }

      .chart-center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
      }

      .total-text {
        font-size: 16px;
        color: #777777;
        margin: 0;
      }

      .total-count {
        font-size: 24px;
        font-weight: 600;
        margin: 0;
        color: #012635;
      }

      .legend-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.5rem 2rem;
        padding: 2px;
      }

      .legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: #2c3e50;
      }

      .legend-color {
        width: 20px;
        height: 20px;
        border-radius: 4px;
      }

      .legend-label {
        margin-right: auto;
        font-size: 14px;
      }

      .legend-count {
        font-size: 14px;
        font-weight: 600;
      }

      // ${theme.queryStatement(theme.breakpoints.xxlgg)} {
      //   padding: 1.5rem 1.8rem;
      // }
      & > .heading {
        display: flex;
        width: 100%;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        /* margin-bottom: 10px; */
        & > h1 {
          font-size: 18px;
          font-weight: 500;
          display: flex;
          align-items: center;
          line-height: 1.6rem;
          color: #012635;

          & > .info {
            margin-left: 0.3rem;
            // margin-top: 0.4rem;
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

    .item6 {
      display: flex;
      flex-direction: column;
      background-color: #ffffff;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }
    .item6 .head {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #E0E0E0;
      padding: 16px;
      height: 64px;
    }

    .item6 .head h1 {
      font-size: 18px;
      font-weight: 500;
      display: flex;
      align-items: center;
      line-height: 1.6rem;
      color: #012635;
    }

    .item6 .head .info {
      margin-left: 0.3rem;
      // margin-top: 0.4rem;
    }

    .item6 .head .info span {
      color: #7c7c7c4b;
      font-size: 1.2rem;
      cursor: pointer;
    }

    .campaign-table-container {
      flex: 1;
      // overflow-y: auto; /* Allows scrolling if content exceeds height */
    }

    .campaign-table {
      width: 100%;
      border-collapse: collapse;
    }

    .campaign-table th,
    .campaign-table td {
      text-align: left;
      padding: 8px 16px;
      border-bottom: 1px solid #E0E0E0;
      font-size: 14px;
      height: 70px;
    }

    .campaign-table th {
      white-space: nowrap;
      height: 48px;
    }

    .campaign-table tbody tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    .campaign-table tbody tr:hover,
    .campaign-table tbody tr:focus {
      background-color: #eaeaea;
      cursor: pointer; /* Indicates that the row is clickable */
      transform: scale(1.02);
      outline: none; /* Remove default focus outline */
      box-shadow: 0 0 0 2px #36a3f7; /* Custom focus outline */
    }

    .campaign-table .campaign-name {
      font-weight: 500;
      color: #777777;
      line-height: 22px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-wrap:auto ; 
    }

    @media (max-width: 768px) {
      .item6 .head {
        padding: 1rem;
      }

      .campaign-table th,
      .campaign-table td {
        padding: 0.5rem 0.75rem;
        font-size: 0.9rem;
      }

      .campaign-table .campaign-name {
        font-size: 0.9rem;
        line-height: 1.4rem;
      }

      .campaign-table tbody tr:hover,
      .campaign-table tbody tr:focus {
        transform: scale(1.01);
      }
    }

    & .item5 {
      display: flex;
      flex-direction: column;
      ${theme.queryStatement(theme.breakpoints.lg)} {
        flex-direction: column;
      }
      gap: 16px;
      & > .avgReply {
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: #ffffff;
        border-radius: 8px;
        border: 1px solid #e0e0e0;
        justify-content: space-between;
        position: relative;
        .horizantalLine {
          height: 1px;
          width: 100%;
          max-width: 100%;
          background-color: #e0e0e0;
        }

        & > .heading {
          display: flex;
          width: 100%;
          flex-direction: row;
          justify-content: space-between;
          height: 64px;
          & > h1 {
            font-size: 18px;
            font-weight: 500;
            line-height: 26px;
            color: #012635;
            gap: 0.3rem;

            & > .info {
              margin-left: 0.3rem;
              & span {
                color: #7c7c7c4b;
                font-size: 12px;
                cursor: pointer;
              }
            }
          }
          & > div {
            line-height: 1.5rem;
          }
        }
        .right-selector {
          display: flex;
          gap: 5px;
       
        .day-selector {
          border-radius: 8px;
          border: 1px solid lightgray;
          padding: 5px 12px 5px 12px;
          height: 32px;
          width: 95px;
        }
      }
        & > .body {
          display: flex;
          justify-content: space-between;
          & > h3 {
            font-size: 20px;
            font-weight: 600;
            color: #012635;
            line-height: 28px;
          }
          & > section {
            display: flex;
            align-items: center;
            gap: 1rem;
            & > div {
              & > p {
                font-size: 12px;
                font-weight: 400;
                color: #777777;
                line-height: 20px;
              }
            }
          }
        }
      }
    }
  }
  .item7 {
    display: flex;
    flex-direction: column;
    background-color: #ffffff !important;
    border-radius: 8px !important;
    border: 1px solid #e0e0e0 !important;
  }
  .horizantalLine {
    height: 1px;
    width: 100%;
    max-width: 100%;
    background-color: #e0e0e0;
  }
  .dropdown-selector {
    border-radius: 8px;
    border: 1px solid lightgray;
    padding: 5px 12px 5px 12px;
  }
  .graphbody {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .graphbody .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
height: 64px;
padding: 16px;
  }

  .graphbody .head .heading {
    display: flex;
    align-items: center;
  }

  .graphbody .head h1 {
    font-size: 18px;
    font-weight: 500;
    color: #012635;
  }

  .graphbody .head h1 .info {
    margin-left: 0.5rem;
    font-size: 1rem;
    color: #7c7c7c;
    cursor: pointer;
  }

  .graphbody .dropDown-with-heading {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .graphbody .dropDown-with-heading .datePickerContainer {
    display: flex;
    align-items: center;
    position: relative;
  }

  .graphbody .dropDown-with-heading .calendarIcon {
    margin-left: 0.5rem;
    cursor: pointer;
  }

  .graphbody .body {
    height: 342px;
    width:100%;
  }

  .graphbody .summary {
    display: flex;
    justify-content: center;
    gap: 10px;
    font-size: 14px;
    font-weight: 400;
    color: #8a96a6;
  }

  .graphbody .summary .summary-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 16px 16px 16px 16px;
  }

  .graphbody .summary .summary-item .colorBox {
    width: 20px;
    height: 20px;
    border-radius: 4px;
  }
  .item8 {
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
  }
  .horizantalLine {
    height: 1px;
    width: 100%;
    max-width: 100%;
    background-color: #e0e0e0;
  }
  .dropdown-selector {
    border-radius: 8px;
    border: 1px solid lightgray;
    padding: 5px 12px 5px 12px;
  }
  .tagsHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
  }

  .tagsHeader h1 {
    font-size: 18px;
    font-weight: 500;
    color: #012635;
    display: flex;
    align-items: center;
  }

  .tagsHeader .info {
    margin-left: 0.5rem;
    font-size: 1rem;
    color: #7c7c7c;
    cursor: pointer;
  }

  .dropdowns {
    display: flex;
    gap: 1rem;
    align-items: center;
    
  }

  .tagsBody {
    position: relative;
    height: 364px;
  }

  .tagsBody canvas {
    height: 100% !important;
    width: 100% !important;
  }

  & .flagContainer {
    padding: 1.8rem 2rem;
    margin: 10px;
    background-color: white;
    border-radius: 1.3rem;
    padding: 1.2rem 1.4rem;
    @media (max-width: 1600px) {
      margin-top: 1.6%;
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
        }
        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      }
    }
  }
  /* Base Styles - Default layout (Desktop and Large Screens) */
  .cards {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-top: 2rem;
    gap: 16px;
    padding: 0rem 2rem;
  }

  .cards .section1{
    grid-template-columns: 387px 1fr 351px;
  }
  .cards .section2 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
    width: 100%;
    max-width: 100%;
  }

  .cards .section3 {
    display: grid;
    grid-template-columns: 760px 1fr;
    gap: 16px;
    width: 100%;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    .cards {
      padding: 0 1rem;
    }

    .cards .section1,
    .cards .section2,
    .cards .section3 {
      max-width: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .section2 .item6 {
      height: 330px;
    }
    .cards .section1 .item2 > div > .item {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .item2 > div > .item .verticalLine {
      display: none;
    }
    .cards .section1 .item1 .itemsWrapper {
      grid-template-columns: 1fr;
    }
    .cards .section1 .item3 .lead-breakdown-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .cards .section1 .item3 .legend-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
      padding: 2px 60px 2px 60px;
    }
  }

  @media (min-width: 481px) and (max-width: 660px) {
    .cards {
      padding: 0 1.5rem;
    }
    .cards .section1,
    .cards .section2,
    .cards .section3 {
      width: 100%;
      max-width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .section2 .item6 {
      height: 330px;
    }
    .cards .section1 .item2 > div > .item {
      display: flex;
      flex-direction: row;
    }
    .item2 > div > .item .horizantalLine {
      display: none;
    }
    .cards .section1 .item1 .itemsWrapper {
      grid-template-columns: repeat(2, 1fr);
    }
    .cards .section1 .item3 .lead-breakdown-container {
      display: flex;
      flex-direction: row;
      gap: 24px;
    }
    .cards .section1 .item3 .legend-container {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .cards .section2 .item5 > .avgReply .day-selector {
      border: none;
    }
    .cards .section2 .item5 {
      display: flex;
      flex-direction: row;
      height: 100%;
    }
    .item5 .avgReply {
      width: 100%;
      height: 160px !important;
    }
  }
  @media (min-width: 481px) and (max-width: 555px) {
    .avgReply .day-selector {
      border: none;
    }
  }

  @media (min-width: 661px) and (max-width: 768px) {
    .cards {
      padding: 0 1.5rem;
    }
    .cards .section1,
    .cards .section2,
    .cards .section3 {
      width: 100%;
      max-width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .section2 .item6 {
      height: 330px;
    }
    .cards .section1 .item2 > div > .item {
      display: flex;
      flex-direction: row;
    }
    .item2 > div > .item .horizantalLine {
      display: none;
    }
    .cards .section1 .item1 .itemsWrapper {
      grid-template-columns: repeat(2, 1fr);
    }
    .cards .section1 .item3 .lead-breakdown-container {
      display: flex;
      flex-direction: row;
      gap: 24px;
    }
    .cards .section1 .item3 .legend-container {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .cards .section2 .item5 {
      display: flex;
      flex-direction: row;
      height: 100%;
    }
    .item5 .avgReply {
      width: 100%;
      height: 160px !important;
    }
  }
  @media (min-width: 769px) and (max-width: 1279px) {
    & > .cards {
      padding: 0rem 1.5rem;

      & .section1 {
        grid-template-columns: 1fr 1fr;
      }

      & .section1 .item1 {
        grid-column: span 2;
      }

      & .section1 .item2,
      & .section1 .item3 {
        grid-column: span 1;
      }

      & .section2 {
        grid-template-columns: 1fr 1fr;
      }

      & .section2 .item4 {
        grid-column: span 2;
      }

      & .section2 .item5,
      & .section2 .item6 {
        grid-column: span 1;
      }

      & .section3 {
        grid-template-columns: 1fr 1fr;
      }

      & .section3 .item7,
      & .section3 .item8 {
        grid-column: span 1;
      }
      .item5 .avgReply {
        height: 160px !important;
      }
      .section1 .item2 > div > .item {
        display: flex;
        flex-direction: row;
      }
      .section1 .item1 .itemsWrapper {
        grid-template-columns: repeat(2, 1fr);
      }

      .item2 > div > .item .horizantalLine {
        display: none;
      }
    }
  }


  @media (min-width: 1281px) and (max-width: 1440px) {
    .cards {
      padding: 0 2rem;
    }

    .cards .section1{
      grid-template-columns: 387px 1fr 351px;
    }
    .cards .section2 {
      grid-template-columns: 1fr 315px 351px;
    }

    .cards .section3 {
      grid-template-columns: 760px 1fr;
    }
    .section1 .item2 > div > .item .horizantalLine {
      display: none;
    }
  }
  @media (min-width: 1441px) {
    .cards {
      // padding: 0 2rem;
    }

    .cards .section1{
      grid-template-columns: 387px 1fr 351px;
    }
    .cards .section2 {
      grid-template-columns: 1fr 315px 351px;
    }

    .cards .section3 {
      grid-template-columns: 760px 1fr; 
    }
  }
`;
export const Item9Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  width: 100%;
  max-width: 1280px;
  margin: auto;
`;

// Header section containing title and dropdowns
export const TagsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

// Title within the header
export const HeaderTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: #012635;
  display: flex;
  align-items: center;
  line-height: 28px;
`;

// Info section within the title (if needed)
export const HeaderInfo = styled.span`
  margin-left: 0.5rem;
  font-size: 1rem;
  color: #7c7c7c;
  cursor: pointer;
`;

// Container for the dropdowns
export const DropdownsContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

// Individual dropdown selector
export const DropdownSelector = styled.div`
  border-radius: 8px;
  border: 1px solid lightgray;
  padding: 5px 8px;
`;

// Styled component for dropdowns within the footer
export const FooterDropdown = styled.div`
  border-radius: 8px;
  border: 1px solid lightgray;
  padding: 5px 8px;
`;

// Container for the entire table with rounded corners and horizontal scroll
export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
`;

// Styled table with only horizontal lines
export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 12px 16px;
    width: 127px;
    text-align: left;
    font-size: 14px;
    font-weight: 500;
    color: #012635;
  }

  th {
    background-color: #ffffff;
    border-bottom: 2px solid #e0e0e0;
  }

  tr {
    border-bottom: 1px solid #e0e0e0;
  }

  tr:last-child {
    border-bottom: none;
  }

  /* Remove vertical lines */
  th,
  td {
    border-left: none;
    border-right: none;
  }

  /* Rounded corners for the table */
  thead tr:first-child th:first-child {
    border-top-left-radius: 8px;
  }

  thead tr:first-child th:last-child {
    border-top-right-radius: 8px;
  }

  tbody tr:last-child td:first-child {
    border-bottom-left-radius: 8px;
  }

  tbody tr:last-child td:last-child {
    border-bottom-right-radius: 8px;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    th,
    td {
      padding: 8px 12px;
      font-size: 12px;
      width: 127px;
    }
  }
`;

// Footer containing total, pagination, and entries dropdown
export const Footer = styled.div`
  padding: 16px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
`;
export const WrapperEntries = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 768px) {
    display: none;
  }
`;
export const WrapperEntries2 = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
  }
`;
export const Total = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 500;
  color: #012635;
`;
export const Entries = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: #012635;
  gap: 8px;
`;

export const CircularProgressbarStyled = styled(CircularProgressbar)`
  & path {
    overflow: visible;
    margin-top: 0.8rem;
  }
  & > .CircularProgressbar-text {
    text-anchor: middle;
    alignment-baseline: middle;
    font-family: "fellix" ; 
    font-weight: 500;
    font-size: 1.4rem !important ;
  }
`;
