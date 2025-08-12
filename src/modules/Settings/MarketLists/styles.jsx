
import theme from "@/theme";
import styled from "@emotion/styled";
import { styled as styledMUI } from "@mui/material/styles";
import { CircularProgressbar } from "react-circular-progressbar";
import { Fade, Tooltip, tooltipClasses } from "@mui/material";

export const MarketListsStyled = styled.div`
  padding: 1.5rem 40px;
  display: grid;
  gap: 2rem;
  // background-color: #f2f3f8;
  // min-height: calc(100vh - 7rem);
  // min-height: calc(100svh - 7rem);
  align-content: start;
  // background-color: red ; 
  height:100% ; 
  display:flex ; 
  flex-direction: column ; 

  & > .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0rem 1rem;
    align-items: center;

    ${theme.queryStatement(theme.breakpoints.md)} {
      flex-direction: column;
    }

    & > .left {
      /* padding: 1.5rem 1.5rem; */
      & > h1 {
        font-size: 2rem;
        font-weight: 500;
        color: #000000;
      }
      & > p {
        color: #21252973;
        font-size: 1.2rem;
        font-weight: 500;
      }
    }

    & > .right {
      ${theme.queryStatement(theme.breakpoints.md)} {
        display: flex;
        align-items: flex-end;
        justify-content: end;
        margin-top: 2rem;
      }
      & > button {
        display: grid;
        align-items: center;
        justify-content: center;
        grid-template-columns: auto auto;
        // gap: 0.7rem;
        background-color: #00bd82;
        transition: background-color 300ms;
        padding: 8px 12px;
        border-radius: 8px;
        border: 1px solid #00bd82;
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
          background-color: #00bd82;
        }
      }
    }
  }

  & > .bottom {
    background-color: #fff;
    border-radius: 0.8rem;
    border: 1px solid #e0e0e0;
    // padding: 1.5rem;
    display: grid;
    /* gap: 2rem; */

    & > .top {
      display: grid;
      align-items: center;
      justify-content: space-between;
      grid-template-columns: auto auto;
      gap: 1rem;
      ${theme.queryStatement(1330)} {
        grid-template-columns: 1fr;
      }
      & > .left {
        padding: 1rem 2rem;
        background: #eaf6ff;
        border-radius: 0.4rem;
        display: grid;
        grid-template-columns: auto auto;
        gap: 1rem;
        align-items: center;
        justify-content: start;
        overflow: hidden;

        & > .icon {
          color: #0095ff;
          font-size: 1.5rem;
          line-height: 0;
        }
        & > .text {
          color: #212529;
          font-size: 1.1rem;
          font-weight: 400;
          opacity: 0.8;
          overflow: hidden;

          & > a {
            font-size: 1.3rem;
            color: #5867dd;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
      & > .right {
        display: grid;
        grid-template-columns: auto auto;

        ${theme.queryStatement(1330)} {
          justify-content: end;
        }
        & > input {
          border-radius: 0.8rem 0 0 0.8rem;
          outline: none;
          padding: 0.9rem 1.3rem;
          background-color: transparent;
          font-size: 1.3rem;
          border: 0.1rem solid #d8d8d8;
          width: 30rem;
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
          border-radius: 0 0.8rem 0.8rem 0;
          display: grid;
          width: 3.6rem;
          align-items: center;
          justify-content: center;
          color: #fff;
          background-color: #36a3f7;
          font-size: 1.5rem;
          transition: background-color 300ms;

          &:hover {
            background-color: #1192f6;
          }
        }
      }
    }
  }
`;

export const MarketListTableStyled = styled.div`
  margin-top: 2.5rem;
  overflow: hidden;
  & > .bottom {
    display: grid;
    width: 100%;
    overflow: hidden;
    // overflow-x: scroll;

    /* Target the scrollbar */
    ::-webkit-scrollbar {
      width: 6px; /* Width of the scrollbar */
    }

    /* Track (background of the scrollbar) */
    ::-webkit-scrollbar-track {
      background: #f1f1f1; /* Color of the track */
    }

    /* Handle (thumb) */
    ::-webkit-scrollbar-thumb {
      background: #888; /* Color of the thumb */
      border-radius: 5px; /* Rounded corners */
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555; /* Color of the thumb on hover */
    }
    & > .table {
      display: grid;
      width: ${(p) => p.tableWidth}px;

      ${theme.queryStatement(theme.breakpoints.xxlgg)} {
        // width: 1300px;
      }
      & > .row {
        /* display: grid; */
        /* grid-template-columns: repeat(6, minmax(1rem, 1fr)) 7rem; */
        /* gap: 2rem; */

        display: grid;
        align-items: center;
        flex-wrap: wrap;
        padding: 14px 20px;
        background-color: #fff;
        gap: 2rem;
        /* ${theme.queryStatement(theme.breakpoints.md)} {
          gap: 6rem;
          grid-template-columns: repeat(6, minmax(26rem, 1fr)) 7rem;
        } */

        & > * {
          flex: 1 0 calc(13% - 10px);
        }

        & > h6 {
          justify-self: start;
          display: grid;
          align-items: center;
          grid-template-columns: auto auto;
          gap: 0.3rem;
          cursor: pointer;
          // justify-content: "space-between";

          & > #item {
            & > .react-sweet-progress-circle-outer {
              & > .react-sweet-progress-symbol-absolute {
                & > div {
                  font-weight: 500;
                  color: "#6d6f71";
                }
              }
            }
          }

          & > .text {
            color: #131414;
            font-size: 1.14px;
            font-weight: 500;

            &.select {
              color: #5867dd;
            }
          }
        }

        &.error {
          background-color: #fff;

          & > p {
            color: #212529;
            opacity: 0.8;
            text-align: center;
            grid-column: 1/-1;
            font-size: 1.3rem;
          }
        }

        &.body {
          background-color: #fff;

          &:nth-of-type(2n + 1) {
            background-color: #f9f9f9;
          }
        }
      }
    }

    & > .bottom {
      padding: 2rem 1rem;
      display: grid;
      align-items: center;
      grid-template-columns: auto auto auto;

      & > * {
        &:first-child {
          > span {
            font-size: 1.3rem;
            color: #212529;
          }
        }
      }
    }
  }
`;

// Style for user

export const MarketListTableUserStyled = styled.div`
  // margin-top: 2.5rem;
  overflow: hidden;
  & > .bottom {
    display: grid;
    width: 100%;
    overflow: hidden;
    // overflow-x: scroll;

    /* Target the scrollbar */
    &::-webkit-scrollbar {
      width: 6px; /* Width of the scrollbar */
    }

    /* Track (background of the scrollbar) */
    &::-webkit-scrollbar-track {
      background: #f1f1f1; /* Color of the track */
    }

    /* Handle (thumb) */
    &::-webkit-scrollbar-thumb {
      background: #888; /* Color of the thumb */
      border-radius: 5px; /* Rounded corners */
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #555; /* Color of the thumb on hover */
    }

          scrollbarWidth: thin;
          scrollbarColor: #00BD82 transparent;
          
          
      & > div {

  &::-webkit-scrollbar {
    width: 2px;
  }
  
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #F7F7F7;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: #F7F7F7;
  }
  
  &::-webkit-scrollbar-button {
    display: none;
  }
  
  scrollbar-width: thin;
  scrollbar-color: #00BD82 transparent;
  
 

      
    & > .table {
      display: grid;
      // width: ${(p) => p.tableWidth}px;
      width:100% ; 

      ${theme.queryStatement(theme.breakpoints.xxlgg)} {
        // width: 1300px;
        width: 100%;
      }
      & > .row {
        /* display: grid; */
        /* grid-template-columns: repeat(6, minmax(1rem, 1fr)) 7rem; */
        /* gap: 2rem; */

        display: flex;
        align-items: center;
        // flex-wrap: wrap;
        padding: 14px 20px;
        // background-color: #fff;
        // gap: 2rem;
        /* ${theme.queryStatement(theme.breakpoints.md)} {
          gap: 6rem;
          grid-template-columns: repeat(6, minmax(26rem, 1fr)) 7rem;
        } */

        & > * {
          padding: 0rem 0.5rem;
          flex: 1 0 calc(16% - 10px);
        }

        & > h6 {
          justify-self: start;
          display: grid;
          align-items: center;
          grid-template-columns: auto auto;
          gap: 0.3rem;
          cursor: pointer;
          justify-content: space-between;
          & > .text {
            color: #012635;
            font-size: 14px;
            line-height: "22px";
            font-weight: 500;

            &.select {
              color: #5867dd;
            }
          }
        }

        &.error {
          background-color: #fff;

          & > p {
            color: #212529;
            opacity: 0.8;
            text-align: center;
            grid-column: 1/-1;
            font-size: 1.3rem;
          }
        }

        &.body {
          background-color: #fff;

          &:nth-of-type(2n + 1) {
            background-color: #f9f9f9;
          }
        }
      }
    }

    & > .bottom {
      padding: 2rem 1rem;
      display: grid;
      align-items: center;
      grid-template-columns: auto auto auto;

      & > * {
        &:first-child {
          > span {
            font-size: 1.3rem;
            color: #212529;
          }
        }
      }
    }

}


  }
`;

export const TableRowStyled = styled.div`
 
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
 
  & > * {
    flex: 1 0 calc(13% - 10px);
  }

  & > .icons-for-total-active {
    & > p {
      & > div {
        display: flex;
        align-items: center;
      }
    }
  }
  & > .col {
    &.icon {
      & > p {
        /* display: grid;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        grid-template-columns: auto auto; */

        display: flex;
        align-items: center;

        & > .icon {
          font-size: 1.2rem;
          color: #2f2532;
          display: inline-block;
          line-height: 0;
          transition: transform 300ms;
          transform-origin: center center;
          transform: rotate(${(p) => (p.open ? 180 : 0)}deg);
          margin-right: 0.5rem;
        }
        & > span {
          font-size: 1.1rem;
          color: #2f2532;
          font-weight: 500;
        }
      }
    }

    &.data {
    display:flex ; 
    // justify-content:center ;
      // background-color:red;
padding-left:5px !important ;
      & > span {
        font-size: 1.1rem;
        color: #2f2532;
        font-weight: 500;
      }
    }

    &.percentage {
    // background-color:red ; 

      // display: grid;
      display:flex;
      // justify-content:center ; 
      padding-left:5px !important ;
      grid-template-columns: auto 1fr;
      gap: 1rem;
      align-items: center;
      justify-self: stretch;

      & > .text {
        font-size: 1.1rem;
        color: #2f2532;
        font-weight: 500;
      }
      & > .bar {
        display: inline-block;
        width: calc(100% - 1rem);
        height: 0.8rem;
        background-color: #c3c3c3;
        position: relative;
        border-radius: 100rem;

        &::after {
          position: absolute;
          content: "";
          top: 0;
          left: 0;
          bottom: 0;

          width: calc(var(--value) * 1%);
          background-color: #f4516c;
          border-radius: 100rem;
        }
      }
    }

    &.status {
      & > p {
        padding: 0.52rem 1.04rem;
        border-radius: 100rem;
        width: fit-content;
        display: grid;
        grid-template-columns: auto auto;
        gap: 1rem;
        align-items: center;
        background-color: rgba(95, 157, 235, 0.12);

        & > .icon {
          font-size: 1.5rem;
          color: #36a3f7;
          line-height: 0;
        }
        & > .text {
          font-size: 1.3rem;
          color: #36a3f7;
        }
      }
    }

    &.actions {
      /* display: grid;
      grid-template-columns: auto auto;
      gap: 1rem;
      align-items: center; */

      display: flex;
      align-items: center;
      gap: 1.5rem;

      & > button {
        line-height: 0;
        color: #d8d8d8;
        font-size: 1.5rem;
        transition: transform 300ms, color 300ms;
        transform-origin: center center;

        &:hover {
          transform: scale(1.2);
          color: #5867dd;
        }
      }
    }

    &.extraRows {
      grid-column: 1/-1;
      justify-self: stretch;
      cursor: default;
    }
  }
`;

export const TableExtraRowStyled = styled.div`
  /* display: grid;
  grid-template-columns: repeat(6, minmax(1rem, 1fr)) 6rem;
  gap: 1rem;
  padding: 1rem 0;
  align-items: center;
  border-top: 1px solid #f4f3fb;
  width: 100%; */

  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 1px 1px 1px;
  // gap: 2rem;
  & > * {
    flex: 1 0 calc(13% - 10px);
  }

  & > .action-icons-display {
    display: flex;
    align-items: center;
    & > .col {
      &.actions {
        display: flex;
        align-items: center;
        gap: 1.5rem;

        & > button {
          line-height: 0;
          color: #d8d8d8;
          font-size: 1.5rem;
          transition: transform 300ms, color 300ms;
          transform-origin: center;
          display: flex;
          align-items: center;

          &:hover {
            transform: scale(1.2);
            color: #5867dd;
          }
        }
      }
    }
  }

  & > .col {
    /* justify-self: start; */
    &.icon {
      & > p {
        display: flex;
        align-items: center;

        & > .icon {
          font-size: 1.5rem;
          color: #d8d8d8;
          display: inline-block;
          line-height: 0;
          transition: transform 300ms;
          transform-origin: center center;
          margin-right: 0.5rem;
          transform: rotate(${(p) => (p.open ? 180 : 0)}deg);
          // margin-left: 2rem;
        }
        & > span {
          font-size: 1.1rem;
          color: #777777;
          font-weight: 500;
        }
      }
    }

    &.data {
      display:flex ; 
    // justify-content:center ;
padding-left:5px !important ;

      & > span {
        font-size: 1.1rem;
        color: #777777;
        font-weight: 500;
      }
    }

    &.percentage {
      // display: grid;
      display:flex ; 
      // justify-content:center;
       padding-left:5px !important ;
      grid-template-columns: auto 1fr;
      gap: 1rem;
      align-items: center;
      justify-self: stretch;

      & > .text {
        font-size: 1.1rem;
        color: #777777;
        font-weight: 500;
      }
      & > .bar {
        display: inline-block;
        width: calc(100% - 1rem);
        height: 0.8rem;
        background-color: #c3c3c3;
        position: relative;
        border-radius: 100rem;

        &::after {
          position: absolute;
          content: "";
          top: 0;
          left: 0;
          bottom: 0;

          width: calc(var(--value) * 1%);
          background-color: #f4516c;
          border-radius: 100rem;
        }
      }
    }

    &.status {
      & > p {
        padding: 0.52rem 1.04rem;
        border-radius: 100rem;
        width: fit-content;
        /* display: grid;
        grid-template-columns: auto auto;
        gap: 1rem;
        align-items: center; */
        background-color: rgba(95, 157, 235, 0.12);
        display: flex;
        align-items: center;
        & > .icon {
          font-size: 1.5rem;
          color: #36a3f7;
        }
        & > .text {
          font-size: 1.1rem;
          color: #36a3f7;
        }
      }
    }

    &.actions {
      /* display: grid;
      grid-template-columns: auto auto;
      gap: 1rem;
      align-items: center; */
      display: flex;
      align-items: center;
      gap: 1.5rem;

      & > button {
        line-height: 0;
        color: #d8d8d8;
        font-size: 1.5rem;
        transition: transform 300ms, color 300ms;
        transform-origin: center;
        display: flex;
        align-items: center;

        &:hover {
          transform: scale(1.2);
          color: #5867dd;
        }
      }
    }
  }
`;
export const CustomScroll = styled.div`
 

   &::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar */
}
     &::-webkit-scrollbar-track {
    background: #f1f1f1; 
    border-radius: 10px;
}

    &::-webkit-scrollbar-thumb {
    background: #00bd82; 
    border-radius: 10px;
}

  &::-webkit-scrollbar-thumb:hover {
    background: #00bd82; 
}
`;
export const FormInputStyle = styled.div`
height:80px ; 
  & > label {
    // margin-top: 1rem;
    margin-bottom: 0.3rem;
    display: block;
    font-size: 14px;
    line-height: 24px;
    color: #012635;
    font-weight: 500;
  }

  & > input {
    width: 100%;
    height: 48px;
    border: none;
    background-color: transparent;
    padding: 0px 12px;
    border: 0.1rem solid #d3d7dd;
    font-size: 1.3rem;
    color: #575962;
    border-radius: 10px;
    font-weight: 500;
    &:focus {
      outline: none;
    }
       &:disabled {
      background-color: #f4f5f8;
    }
      
  }
  & > div {
    color: #ff0000b2;
  }
`;
// export const StyledSelect = styled.select`
//   width: 100%;
//   padding: 1.1rem 4rem 1.1rem 1.5rem;
//   border: 0.1rem solid #c1c4cc;
//   color: #575962;
//   background-color: transparent;
//   font-size: 1.3rem;
//   font-family: "Inter", sans-serif;
//   outline: none;
//   border-radius: 10px;

//   transition: background-color 300ms, color 300ms, border-color 300ms;
//   appearance: none;
//   -webkit-appearance: none;
//   -moz-appearance: none;
//   background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 13.1l-8-8 2.1-2.2 5.9 5.9 5.9-5.9 2.1 2.2z'/%3E%3C/svg%3E");
//   background-repeat: no-repeat;
//   background-position: calc(100% - 1.5rem) center;
//   background-size: 1rem;

//   &:focus {
//     border-color: #716aca;
//     color: #575962;
//     background-color: #fff;
//   }
//   &:disabled {
//     background-color: #d3d7dd;
//     color: #777777;
//     cursor: not-allowed;
//   }
// `;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 12px 12px;
  border: 0.1rem solid #d3d7dd;
  color: #575962;
  background-color: transparent;
  font-size: 1.3rem;
  font-family: "Inter", sans-serif;
  outline: none;
  border-radius: 10px;
  height:48px ;
  transition: background-color 300ms, color 300ms, border-color 300ms;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 13.1l-8-8 2.1-2.2 5.9 5.9 5.9-5.9 2.1 2.2z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: calc(100% - 1.5rem) center;
  background-size: 1rem;

  &:focus {
    border-color: #00bd82;
   
    color: #575962;
    background-color: #fff;
  }
  &:disabled {
    background-color: #f4f5f8;
    color: #777777;
    cursor: not-allowed;
  }
`;
export const StyledInput = styled.input`
  // font-family: 'Inter', sans-serif;
  // padding: 1.1rem 4rem 1.1rem 1.5rem;
  padding: 0px 12px;
  height: 48px;
  border: 0.1rem solid #d3d7dd;
  color: #575962;
  background-color: transparent;
  // font-size: 1.3rem;
  outline: none;
  border-radius: 10px;
  transition: background-color 300ms, color 300ms, border-color 300ms;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url(${(p) => p.ChevronDown});
  background-repeat: no-repeat;
  background-position: calc(100% - 1.5rem) center;
  background-size: 1rem;

  &:focus {
    // border-color: #00BD82;
    border: solid 1px #00BD82;
    color: #575962;
    background-color: #fff;
  }
`;
export const CreateNewModalStyled = styled.div`
  // width: 75vw;
  width:680px ; 
  // max-width: 54.6rem;
  max-width:680px ; 
  background-color: #fff;
  border-radius: 12px 12px;
  & > .top {
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    padding: 8px 16px 8px 16px;
    background-color: #fff;
    border-radius: "12px 12px 0 0";

    & > h2 {
      font-size: 18px;
      line-height: "600";
      color: #012635;
      font-weight: 600;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    & > button {
      font-size: 1.6rem;
      color: #212529;
      opacity: 0.6;
      transition: opacity 0.3s;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  & > .bottom {
    & > .top {
      padding: 16px 24px;
      display: grid;
      gap: 2rem;

      & > .row-flex {
        & > #paddingLess {
          & > input {
            padding: 0.5rem 1rem;
            ${theme.queryStatement(theme.breakpoints.xxxlgg)} {
              padding: 0.65rem 1rem;
            }
            ${theme.queryStatement(theme.breakpoints.xxlg)} {
              padding: 0.7rem 1rem;
            }
            ${theme.queryStatement(theme.breakpoints.xxlg)} {
              padding: 0.85rem 1rem;
            }
            ${theme.queryStatement(theme.breakpoints.lg)} {
              padding: 0.98rem 1rem;
            }
            ${theme.queryStatement(theme.breakpoints.sm)} {
              padding: 1.1rem 1rem;
            }
          }
        }
      }

      & > .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-content: start;
        gap: 1.5rem;

        .dropdown-search {
          & > div {
            position: relative;

            & > div {
              position: absolute;
              width: 100%;
              margin-top: 0rem;
              border: 0.1rem solid #c1c4cc;
              border-radius: 0.35rem;
              padding: 0.6rem 0.4rem;
              height: 150px;
              overflow-y: hidden;
              overflow-y: scroll;
              background-color: white;
              &::-webkit-scrollbar {
                width: 5px;
                border-radius: 2rem;
              }

              /* Track */
              &::-webkit-scrollbar-track {
                background: #f1f1f1;
                display: none;
              }

              /* Handle */
              &::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 2rem;
              }

              /* Handle on hover */
              &::-webkit-scrollbar-thumb:hover {
                background: #555;
              }
              & > p {
                font-size: 1.3rem;
                padding: 1rem 1.4rem;
                border-radius: 0.35rem;
                margin: 1px 0rem;
                cursor: pointer;
                &:hover {
                  background-color: #80808045;
                }
              }
            }

            /* & > label {
              display: grid;
              gap: 0.3rem;
              align-content: start;
              &.col2 {
                grid-column: 1/-1;
              }

              & > .text {
                font-size: 1.3rem;
                color: #212529;
              }
               
              & > input {
                padding: 1.1rem 1.5rem;
                border: 0.1rem solid #c1c4cc;
                color: #575962;
                background-color: green;
                background-color: transparent;
                outline: none;
                border-radius: 10px;
                transition: background-color 300ms, color 300ms,
                  border-color 300ms;
                width: 100%;
                font-size: 1.3rem;
         
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
              & > p {
                font-size: 1.1rem;
                color: #f4516c;
              }
            } */
          }
        }

        & > label {
          display: grid;
          gap: 0.3rem;
          align-content: start;

          &.col2 {
            grid-column: 1/-1;
          }

          & > .text {
            font-size: 14px;
            color: #012635;
            line-height: 22px;
            font-weight: 500;
          }
          & > input {
            padding: 0px 1.5rem;
            height:48px ; 
            border: 0.1rem solid #d3d7dd;
            color: #575962;
            background-color: transparent;
            outline: none;
            border-radius: 8px;
            transition: background-color 300ms, color 300ms, border-color 300ms;
            width: 100%;
            font-size: 1.3rem;
            
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
          & > p {
            font-size: 1.1rem;
            color: #f4516c;
          }
        }
      }
    }
    & > .bottom {
      display: grid;
      grid-template-columns: auto auto;
      gap: 0.5rem;
      align-items: center;
      justify-content: end;
      padding: 16px;
      background-color: #fff;

      & > button:first-of-type {
        padding: 0.85rem 1.5rem;
        font-size: 1.1rem;
        border: 0.1rem solid #c1c4cc;
        font-weight: 500;
        border-radius: 8px;
        transition: background-color 0.3s ease-in-out;
        & > .text {
          font-size: 1.3rem;
        }

        &:not(:disabled):hover {
          background-color: #fff;
        }
      }
    }
  }
`;
export const DlcModelStyle = styled.div`
  width: 700px;
  background-color: white;
  // border-radius: 1rem;
  border-radius: 16px 16px;

  & > header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px 8px 16px;
    background-color: #fff;


    

    & > h2 {
      font-size: 18px;
      line-height: "600";
      color: #012635;
      font-weight: 600;
    }
    & > button {
      & > * {
        font-size: 1.6rem;
        color: #212529;
        opacity: 0.6;
        transition: opacity 0.3s;
      }
    }
  }

  & > section {
    padding: 0px 24px 16px 24px;
    & > form {
      & > header {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;

  &::-webkit-scrollbar {
    width: 2px;
  }
  
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #F7F7F7;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: #F7F7F7;
  }
  
  &::-webkit-scrollbar-button {
    display: none;
  }
  
  scrollbar-width: thin;
  scrollbar-color: #00BD82 transparent;
 



        & > div {
          flex: 1 0 calc(48% - 10px);
        }
      }

      & > blockquote {
        display: flex;
        gap: 1rem;
        & > * {
          &:first-child {
            width: 50%;
          }
          &:nth-child(2) {
            width: 25%;
            & > label {
              margin-top: 1rem;
              margin-bottom: 0.3rem;
              display: block;
              font-size: 1.4rem;
              font-weight: 500;
            }
            & > select {
              width: 100%;
              height: 48px;
              border: none;
              background-color: transparent;
              padding: 0px 12px;
              border: 0.1rem solid #d3d7dd;
              font-size: 1.3rem;
              color: #575962;
              border-radius: 10px;
              font-weight: 500;
              &:focus {
                outline: none;
              }
            }
            & > div {
              color: #ff0000b2;
            }
          }
          &:last-child {
            width: 25%;
          }
        }
      }

      & > div {
        margin-top: 2rem;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        gap: 10px;

        & > button {
          padding: 8px 12px 8px 12px;
          border-radius: 8px;
          color: white;
          font-size: 16px;
          line-height: 24px
          font-weight: 500;
          background-color: #00BD82;
        }
      }
    }
  }
`;
export const LightTooltip = styledMUI(({ className, ...props }) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    TransitionComponent={Fade}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "#212529cc",
    boxShadow: `0px 0px 5px rgba(0, 0, 0, .2)`,
    fontSize: "1.2rem",
    borderRadius: ".6rem",
    fontFamily: "fellix",
    textAlign: "center",
  },

  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
    [`&::before`]: {
      boxShadow: `0px 0px 5px rgba(0, 0, 0, .2)`,
    },
  },
}));

export const CircularProgressbarStyled = styled(CircularProgressbar)`
  & > .CircularProgressbar-text {
    text-anchor: middle;
    alignment-baseline: middle;
    font-family: "fellix"
    font-weight: 500;
  }
`;
export const UserTop = styled.div`
  display: flex;
  padding: 24px 40px;
  padding-bottom: 0px;
  justify-content: space-between;
  align-items: center;

  ${theme.queryStatement(theme.breakpoints.tab)} {
    padding: 24px 20px;
    padding-bottom: 0px;
  }

  & > .left {
    display: flex;
    gap: 10px;
    align-items: center;

    & > .dropDown {
      width: 150px;

      ${theme.queryStatement(theme.breakpoints.tab)} {
        width: 130px;
      }
    }

    & > .searchContainer {
      width: 256px;
      height: 48px;
      border: solid 1px #d3d7dd;
      background-color: white;
      border-radius: 8px;
      display: flex;
      align-items: center;
      padding: 0px 12px;
      gap: 10px;
      & > input {
        width: 100%;
        outline: none;
        border: 0px;
      }
    }
  }
`;
