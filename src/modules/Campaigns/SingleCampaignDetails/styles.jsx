import theme from "@/theme";
import styled from "@emotion/styled";
import { CircularProgressbar } from "react-circular-progressbar";

export const SingleCampaignDetailsStyled = styled.div`
  padding: 20px 40px;
  ${theme.queryStatement(theme.breakpoints.tab)} {
    padding: 1.5rem 1rem;
  }
  display: grid;
  gap: 20px;
  background-color: #f7f7f7;
  min-height: calc(100vh - 7rem);
  min-height: calc(100svh - 7rem);
  align-content: start;

  & > .top {
    display: grid;
    gap: 0.5rem;
    & > .top {
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      justify-content: space-between;
      // gap: 2rem;
      overflow: hidden;

      & > h1 {
        font-size: 1.95rem;
        font-weight: 500;
        color: #212529;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
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
    }

    & > .bottom {
      display: grid;
      grid-template-columns: 1;
      gap: 0.5rem;
      align-items: center;
      justify-content: start;
      max-width: 80%;

      & > button {
        display: grid;
        grid-template-columns: auto auto;
        align-items: center;
        justify-content: start;
        transition: background-color 300ms;
        & > .icon {
          color: #012635;
          font-size: 1.5rem;
          line-height: 0;
          margin-left: 1.5rem;
        }
        & > .text {
          color: #012635;
          font-size: 2.3rem;
          font-weight:700;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height:32px;
        }
      }
      & > p {
        white-space: nowrap;
        font-size: 1.2rem;
        & > span {
          white-space: nowrap;
          font-weight: 500;
          color: #777777;
          font-size: 1.2rem;
        }
      }
    }
  }

  & > .charts {
    display: grid;
    gap: 1.5rem;
    align-items: stretch;
    grid-template-columns: 3fr 1fr;
    ${theme.queryStatement(1500)} {
      grid-template-columns: 2.7fr 1.3fr;
    }
    ${theme.queryStatement(1200)} {
      display: block;
    }



    & > .left {
      border: 1px solid #E0E0E0;
      border-radius:0.8rem;
      overflow: hidden;
      & > .Header {
        background-color: white;
        padding: 0.8rem 1.2rem;
        & > h2{
          color: #012635;
          font-weight: 600;
          font-size: 1.8rem;
        }
      }
      & > .bottom {
        display: grid;
        background-color: white;
        grid-template-columns: 1fr 2fr;
        ${theme.queryStatement(620)} {
          grid-template-columns: 1fr;
        }
        & > .left {
          background-color: white;
          display: flex;
          flex-direction: column;
          border: 1px solid #f7f7f7;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 0;
          // box-shadow: 0 1px 15px 1px #45414e14;
          padding: 1rem 1.5rem;
          height: 100%;
          & > .item {
            position: relative;
            max-width: 100%;

            & > .center {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -70%);
              display: grid;
              align-items: center;
              justify-items: center;
              gap: 0.3rem;

              & > h6 {
                color: #212529;
                font-size: 1.675rem;
                font-weight: 500;
              }

              & > p {
                white-space: nowrap;
                color: #212529;
                opacity: 0.8;
                font-size: 1.3rem;
              }
            }
          }
        }
        & > .center {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;

          ${theme.queryStatement(1490)} {
            grid-template-columns: 1fr 1fr 1fr;
          }

          ${theme.queryStatement(1120)} {
            grid-template-columns: 1fr 1fr 1fr;
          }

          ${theme.queryStatement(850)} {
            grid-column: 2/3;
            grid-template-columns: 1fr 1fr 1fr;
            grid-row: 1/3;
          }

          ${theme.queryStatement(725)} {
            grid-column: auto;
            grid-template-columns: 1fr 1fr;
            grid-row: auto;
          }
          ${theme.queryStatement(620)} {
            grid-template-columns: 1fr 1fr;
          }

          & > .item {
            min-height: 110px;
            min-width: 90px;
            border: 1px solid #f7f7f7;
            background: rgba(255, 255, 255, 0.6);
            // box-shadow: 0 1px 15px 1px #45414e14;

            display: grid;
            grid-template-columns: 1fr;
            padding: 1.3rem;
            align-items: center;
            justify-items: center;
            align-content: center;
            & > .top {
              display: grid;
              gap: 0.5rem;
              align-items: center;
              padding-top:1.5rem;
              justify-content: center;
              &:has(.dot) {
                grid-template-columns: auto auto;
              }
              & > .dot {
                background-color: #34bfa3;
                width: 0.65rem;
                height: 0.65rem;
                border-radius: 50%;
                line-height: 0;
              }
              & > .text {
                font-size: 1.8rem;
                font-weight: 500;
                color: #212529;
              }
            }
            & > h6 {
              color: #212529;
              opacity: 0.7;
              font-size: 1.3rem;
              font-weight: 400;
              text-align: center;
            }
          }
        }
      }
    }

    & > .right {
      border-radius:0.8rem;
      border: 1px solid #E0E0E0;
      overflow: hidden;
      ${theme.queryStatement(1200)} {
        margin-top:2rem;
      }
      & > .Header {
        background-color: white;
        padding: 0.8rem 1.2rem;
        border-bottom:1px solid #f7f7f7;
        & > h2{
          color: #012635;
          font-weight: 600;
          font-size: 1.8rem;
        }
      }
      ${theme.queryStatement(1490)} {
        grid-row: 1/2;
        grid-column: 2/3;
      }

      ${theme.queryStatement(850)} {
        grid-row: auto;
        grid-column: auto;
      }

      & > h2 {
        font-weight: 1.625rem;
        font-weight: 500;
        color: #212529;
      }
      & > .chart {
        display: flex;
        justify-content: center;
       flex: 1;
        ${theme.queryStatement(768)} {
          justify-content: start;
        }

        ${theme.queryStatement(1200)} {
          justify-content: start;
        }

        & > div {
          & > .canvas_container {
            & > .canvas_chart {
              margin-block: 0;
              width: 20.8rem;
              height: 20.8rem;
            }
            & > .canvas_tooltip {
              margin-block: 0;
              width: 16.8rem;
              height: 16.8rem;
            }
          }
          & > .chart_keys {
            z-index: -1000;
            opacity: 0;
            visibility: hidden;
            position: absolute;
            pointer-events: none;
            user-select: none;
          }
        }
      }
      & > .indicators {
        display: grid;
        grid-template-columns: repeat(5, auto);
        gap: 4rem;
        justify-content: start;
        align-items: center;
        ${theme.queryStatement(theme.breakpoints.sm)} {
          grid-template-columns: repeat(3, auto);
          column-gap: 6rem;
          row-gap: 1rem;
        }

        & > .item {
          display: grid;
          gap: 0.5rem;
          align-items: center;
          justify-content: center;
          grid-template-columns: auto auto;

          & > .color {
            background-color: #34bfa3;
            width: 1.2rem;
            height: 1.2rem;
            line-height: 0;
          }
          & > .text {
            font-size: 1.3rem;
            font-weight: 400;
            color: #212529;
          }
        }

        & > .item:nth-of-type(1) > .color {
          background-color: rgb(229, 41, 53);
        }
        & > .item:nth-of-type(2) > .color {
          background-color: rgb(255, 193, 43);
        }
        & > .item:nth-of-type(3) > .color {
          background-color: rgb(160, 200, 161);
        }
        & > .item:nth-of-type(4) > .color {
          background-color: rgb(54, 163, 247);
        }
        & > .item:nth-of-type(5) > .color {
          background-color: rgb(222, 223, 231);
        }
      }
    }
  }
`;

export const CircularProgressbarStyled = styled(CircularProgressbar)`
  & path {
    stroke-width: 1rem !important;
  }
  & > .CircularProgressbar-text {
    text-anchor: middle;
    alignment-baseline: middle;
    font-family: "fellix"
    font-weight: 500;
  }
`;

export const BatchReportsStyled = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  display: grid;
  border-radius: 0.8rem;
  border: 1px solid #E0E0E0;
  overflow: hidden;
  & > .Header {
        background-color: white;
        padding: 0.8rem 1.2rem;
        & > h2{
          color: #012635;
          font-weight: 600;
          font-size: 1.8rem;
        }
    }
  & > .overflow {
    overflow-x: auto;
    display: grid;
    &::-webkit-scrollbar {
       height: 4px; 
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        background: white;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #00BD82;
      }
    & > .table {
      display: grid;
      background-color:white ; 
      width: ${(p) => p.tableWidth}px;
      & > .row {
        display: grid;
        grid-template-columns: 
         minmax(200px, 1.3fr)
        minmax(400px, 2.5fr)
        minmax(150px, 1.2fr)
        minmax(150px, 0.8fr)
        minmax(150px, 0.8fr)
        minmax(150px, 0.8fr)
        minmax(150px, 0.8fr);
        gap: 0.8rem;
        align-items: center;
        background-color:white

        .col.actions {
          display: grid !important; /* Show actions on hover */
        }
        & > td{
          color: #777777;
          font-weight: 500 ;
        }
        & > h6 {
            padding:1.3rem;
            justify-self: flex-start;
            font-weight: 500 ;
            color:#012635 ;
            font-size:1.2rem;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start; 
            &:first-of-type {
              justify-self: start;
            }
            &:last-of-type {
              justify-self: end;
            }

            & > .info{
              margin-top:0.5rem;
              margin-left:1rem;
            }
        }
      }


      & > .row2 {
        display: grid;
        grid-template-columns: 
         minmax(200px, 1.3fr)
        minmax(400px, 2.5fr)
        minmax(150px, 1.2fr)
        minmax(150px, 0.8fr)
        minmax(150px, 0.8fr)
        minmax(150px, 0.8fr)
        minmax(150px, 0.8fr);
        gap: 0.8rem;
        align-items: center;
        background-color:white;
        border-bottom: 1px solid #80808052;
        .col.actions {
          display: grid !important; /* Show actions on hover */
        }
        & > td{
          color: #777777;
          font-weight: 500 ;
          padding-inline:1.3rem;
          padding-block:0.7rem;
        }
        & > h6 {
            justify-self: flex-start;
            font-weight: 500 ;
            color:#012635 ;
            font-size:14px ;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between; 
            &:first-of-type {
              justify-self: start;
            }
            &:last-of-type {
              justify-self: end;
            }
        }
      }


    }
  }
`;


export const ImportReportsStyled = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  display: grid;
  border-radius: 0.8rem;
  border: 1px solid #E0E0E0;
  overflow: hidden;
  & > .Header {
        background-color: white;
        padding: 0.8rem 1.2rem;
        & > h2{
          color: #012635;
          font-weight: 600;
          font-size: 1.8rem;
        }
    }
  & > .overflow {
    overflow-x: auto;
    display: grid;
    &::-webkit-scrollbar {
       height: 4px; 
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        background: white;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #00BD82;
      }
    & > .table {
      display: grid;
      background-color:white ; 
      width: ${(p) => p.tableWidth}px;
      & > .row {
        display: grid;
        grid-template-columns: 
         minmax(150px, 0.8fr)
        minmax(150px, 0.8fr)
        minmax(150px, 0.8fr)
        minmax(150px, 0.8fr)
        minmax(150px, 0.8fr)
        minmax(150px, 0.8fr)
        minmax(150px, 0.8fr)
        minmax(150px, 0.8fr)
        minmax(150px, 0.8fr);
        gap: 0.8rem;
        align-items: center;
        background-color:white

        .col.actions {
          display: grid !important; /* Show actions on hover */
        }
        & > td{
          color: #777777;
          font-weight: 500 ;
        }
        & > h6 {
            padding:1.3rem;
            justify-self: flex-start;
            font-weight: 500 ;
            color:#012635 ;
            font-size:1.2rem;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start; 
            &:first-of-type {
              justify-self: start;
            }
            &:last-of-type {
              justify-self: end;
            }

            & > .info{
              margin-top:0.5rem;
              margin-left:1rem;
            }
        }
      }


      & > tbody {
        
        .col.actions {
          display: grid !important; /* Show actions on hover */
        }
        & > tr{
          display: grid;
          grid-template-columns: 
            minmax(150px, 0.8fr)
          minmax(150px, 0.8fr)
          minmax(150px, 0.8fr)
          minmax(150px, 0.8fr)
          minmax(150px, 0.8fr)
          minmax(150px, 0.8fr)
          minmax(150px, 0.8fr)
          minmax(150px, 0.8fr)
          minmax(150px, 0.8fr);
          gap: 0.8rem;
          align-items: center;
          background-color:white;
          border-bottom: 1px solid #80808052;
          color: #777777;
          font-weight: 500 ;
          padding-block:1rem;
          & > td {
            padding:1.3rem;
            padding-block:0.7rem;
            justify-self: flex-start;
            color:#777777 ;
            font-size:1.2rem ;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between; 
            &:first-of-type {
              justify-self: start;
            }
            &:last-of-type {
              justify-self: end;
            }
        }
        }
        
      }


    }
  }
`;

export const AllProspectsStyled = styled.div`
  display: grid;
  gap: 0.5rem;

  & > h2 {
    font-size: 1.625rem;
    color: #211529;
    font-weight: 500;
    opacity: 0.8;
  }

  & > .bottom {
    display: grid;
    gap: 1.3rem;

    & > .table {
      display: grid;
      width: ${(p) => p.tableWidth}px;
      overflow-x: auto;

      & > .row {
        display: grid;
        grid-template-columns: repeat(3, minmax(20rem, 1fr)) minmax(30rem, 2fr);
        gap: 1rem;
        padding: 1rem 1rem;
        align-items: center;
        background-color: #e6e6e6;

        & > h6 {
          justify-self: start;
          display: grid;
          align-items: center;
          grid-template-columns: auto auto;
          gap: 0.3rem;
          cursor: pointer;

          & > .text {
            color: #49515b;
            font-size: 1.3rem;
            font-weight: 700;

            &.select {
              color: #5867dd;
            }
          }
        }

        &.body {
          background-color: #f2f3f8;
          padding: 0.8rem 0 0.8rem;
          border-bottom: 0.1rem solid #c8c8c8;

          & > .col {
            justify-self: start;

            &.data {
              & > p {
                font-size: 1.3rem;
                color: #333;
              }
            }

            &.icon {
              & > p {
                display: grid;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                grid-template-columns: auto auto;

                & > .icon {
                  font-size: 1.5rem;
                  color: #e52935;
                }
                & > p {
                  font-size: 1.3rem;
                  color: #333;
                }
              }
            }
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
`;

export const LightSidebarStyled = styled.div`
  position: absolute;
  top: 10.3rem;
  left: 5.9rem;
  height: calc(100svh - 10.3rem);
  width: 41.6rem;
  max-width: calc(100vw - 7rem - 2px);
  background-color: #fff;
  padding-inline: 2rem;
  display: grid;
  grid-template-rows: auto 1fr;
  border:1px solid #E0E0E0;
  z-index:500;
     ${theme.queryStatement(theme.breakpoints.tab)} {
      transform: translate(-7rem, -20px);

      }
  .top {
    display: grid;

    & > .top {
      display: grid;
      gap: 2rem;
      padding-block:2rem;
      align-items: center;
      justify-content: space-between;
      grid-template-columns: auto auto;

      & > h2 {
        font-size: 1.95rem;
        color: #012635;
        font-weight: 500;
      }
      & > button {
        font-size: 2rem;
        color: #012635;
        line-height: 0;
        width: 2.9rem;
        height: 2.9rem;
        border-radius: 50%;
        transition: color 300ms, border 300ms;
      }
    }
    & > .bottom {
      position: relative;
      & > span {
        position: absolute;
        top: 0.8rem;
        right: 1.1rem;
        font-size: 2rem;
        color: #012635;
        cursor: pointer;
        transition: color 300ms;
      }
      & > input {
        padding: 1.1rem 1.5rem;
        border: 1px solid #E0E0E0;
        color: #575962;
        background-color: transparent;
        outline: none;
        border-radius: 0.8rem;
        transition: background-color 300ms, color 300ms, border-color 300ms;
        width: 100%;

        &:focus {
          border-color: #00BD82;
          color: #575962;
          background-color: #fff;
        }

        &:disabled {
          border-color: #f4f5f8;
          color: #6f727d;
          background-color: #f4f5f8;
        }
      }
    }
  }
  & > .table {
    display: grid;
    overflow-x: auto;
    overflow-y: auto;
    align-content: start;
    margin-top:1rem;
    border: 1px solid #E0E0E0;
    border-radius:0.8rem;
     &::-webkit-scrollbar {
       height: 4px; 
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        background: white;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #00BD82;
      }
    & > .row {
      display: grid;
      grid-template-columns: 9rem 1fr auto;
      gap: 0.975rem;
      padding: 0.975rem;
      align-items: center;
      border-bottom: 2px solid #f4f5f8;
      align-content: start;

      & > h6 {
        justify-self: start;
        color: #212529;
        font-size: 1.3rem;
        font-weight: 500;
      }

      &.body {
        border-top: none;
        border-bottom: 2px solid #f4f5f8cc;

        & > p {
          grid-column: 1/-1;
          font-size: 1.3rem;
          color: #212529;
        }

        & > .col {
          justify-self: end;
          &:nth-of-type(1) {
          justify-self: start;
          
          }
          &.data {
            display: grid;
            overflow: hidden;
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

          &.icon {
            & > button {
              line-height: 0;
              color: #00BD82;
              font-size: 1.5rem;
              display: inline-block;
              transform: translate(0, 0.2rem);
            }
          }
        }
      }
    }
  }
`;
