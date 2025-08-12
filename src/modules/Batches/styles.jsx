





import styled from "@emotion/styled";
import theme from "@/theme";
import { CircularProgressbar } from "react-circular-progressbar";

export const BatchesStyled = styled.div`
height:100% ;
  padding: 0;
  display: grid;
  gap: 24px;
   /* background-color: #1d3cd3; */
  align-content: start;
  overflow: auto;

  & > .top {
    background-color: #FFFFFF;
    padding: 24px 40px;
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    gap: 2rem;

    & > .left > h1 {
      font-size: 2rem;
      font-weight: 700;
      color: #012635;
      line-height: 40px;
    }

    & > .right {
      & > button {
        display: grid;
        align-items: center;
        justify-content: center;
        grid-template-columns: auto auto;
        background-color: #00BD82;
        transition: background-color 300ms;
        padding: 8px 12px;
        border-radius: 8px;

        & > .text {
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          color: #FFFFFF;
        }

        &:hover {
          background-color: #00AD77;
        }
      }
    }
  }

  & > .bottom {
    display: grid;
    align-content: start;
    gap: 1.5rem;
    overflow: auto;
    & > .top {
    padding: 24px 40px;
      & > button {
    font-family: 'Fellix';
    border: 1px solid #D3D7DD;
    padding: 15px 14px;
    background: #fff;
    border-radius: 8px;
    transition: border 0.3s ease-in-out;
    
    display: grid;
    grid-template-columns: auto auto;
    justify-content: start;
    align-items: center;
    gap: 8px;
    min-width: 170px;

        & > .icon {
          width: 16px;
          height: 16px;
          transition: color 0.3s ease-in-out;
          & > svg{
            width: 100%;
            height: 100%;
    }
        }
        // & > .text {
        //   font-size: 14px;
        //   color: #777777;
        //   font-weight: 300;
        //   line-height: 16px;
        //   transition: color 0.3s ease-in-out;
        // }

        &:hover {
          border: 0.1rem solid #aaa;
          & > .icon {
            color: #00BD82;
          }
          & > .text {
            color: #00BD82;
          }
        }
      }
    }
    & > button > .text {
    font-family: inherit; /* Inherit from the button */
    font-size: 16px; /* Optional, for better control */
    }
    & > .bottom-tables-wrapper{
    padding: 0 40px 40px;
      & > .bottom {
        display: grid;
        align-content: start;
        gap: 24px;
        padding: 24px;
        background-color: #FFFFFF;
        border: 1px solid #E0E0E0;
        border-radius: 8px;
      }
    }
  }
`;

export const TableStyledTop = styled.div`
  display: grid;
  align-content: start;
  gap: 18px;
  
  ${theme.queryStatement(theme.breakpoints.llg)} {
    width: 100%;
    overflow-x: auto;
  }

  & > .top {
    & > h2 {
      font-size: 20px;
      font-weight: 600;
      color: #012635;
      line-height: 28px
    }
  }
  & > .bottom {
    display: grid;

    & > .table {
      background-color: #FFF;
      border: 1px solid #E0E0E0;
      overflow: auto;
      border-radius: 8px;
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

      & > .row {
        /* display: grid;
        grid-template-columns:
        minmax(15rem, 1fr) minmax(20rem, 1.5fr) repeat(
          ${(p) => (p.extra ? 4 : 3)},
          minmax(15rem, 1fr)
        )
        minmax(20rem, 1.5fr) minmax(15rem, 1fr) 12rem;
        gap: 1rem; */

        border-bottom: 1px solid #E0E0E0;
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        padding: 13px 16px;
        align-items: center;
        ${theme.queryStatement(theme.breakpoints.xlg)} {
          padding: 0.8rem 0.5rem;
        }
        ${theme.queryStatement(theme.breakpoints.llg)} {
          padding: 0.8rem 1.3rem;
        }
          min-width:1232px;
        & > h6 {
          /* justify-self: start; */
          /* position: relative; */
          flex: 1 0 calc(11% - 1rem);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          white-space: nowrap;

          & > .text {
            color: #012635;
            font-size: 14px;
            font-weight: 400;
            line-height: 22px;
          }

          & > .info {
            width: 16px;
            height: 16px;
            & > svg {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
        }

        & > .error {
          grid-column: 1/ 11;
          font-size: 1.3rem;
          color: #212529;
          text-align: center;
        }
      }
    }

    & > .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px;
      ${theme.queryStatement(theme.breakpoints.md)} {
        flex-direction: column;
        gap: 1.3rem;
      }
      & > .left > span {
        font-size: 1.3rem;
        // color: #212529;
        color:#777777 ; 
        font-size:16px ; 
        font-weight:500 ; 
        line-height : 22px ; 
      }
    }
    & > .mobilePagination {
      border: solid 1px #E0E0E0;
      border-top: 0;
      border-bottom:0 ; 
      padding: 10px 16px;
      padding-bottom: 0px;
      display: none;
      ${theme.queryStatement(theme.breakpoints.sm)} {
 display: flex;
 justify-content: space-between;
 align-items: center;
  }

  }

  & > .desktopPagination{
    display: flex;
  justify-content: space-between;
  height: 56px;
  background-color: white;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border-top: 0;
  padding: 10px 16px;
  align-items: center;
  border: solid 1px #E0E0E0;

  ${theme.queryStatement(theme.breakpoints.sm)} {
    justify-content: center;
    border-top: 0;
  }
    & > .desktopView{
      
      ${theme.queryStatement(theme.breakpoints.sm)} {
 display: none;
 
  }
    }

    & > .desktopViewTwo{
      display: flex;
      align-items: center;
      gap: 10px;

      ${theme.queryStatement(theme.breakpoints.sm)} {
 display: none;

  }
    }
  }
  }

 
`;

export const TableStyled = styled.div`
  display: grid;
  align-content: start;
  gap: 1.5rem;
  ${theme.queryStatement(theme.breakpoints.llg)} {
    width: 100%;
    overflow-x: auto;
  }

  & > .top {
    & > h2 {
      // font-size: 2rem;
      font-size:20px ; 
      font-weight: 600;
      color: #012635;
    }
  }
  & > .bottom {
    display: grid;
    gap: 1.3rem;

    & > .table {
      // display: grid;
      /* width: ${(p) => p.tableWidth}px; */
      /* overflow-x: auto; */
      // ${theme.queryStatement(theme.breakpoints.llg)} {
      //   overflow-x: auto;
      //   width: 1300px;
      // }
          background-color: #FFF;
      border: 1px solid #E0E0E0;
      border-radius: 8px;
      border-end-end-radius:0px ; 
      border-bottom:0px ; 
      border-end-start-radius:0px;
      // ${theme.queryStatement(theme.breakpoints.llg)} {
      //   overflow-x: auto;
      //   width: 1300px;
      // }
  overflow:auto ; 
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
      & > .row {
      
  border-bottom: 1px solid #E0E0E0;
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        padding: 13px 16px;
        align-items: center;
        ${theme.queryStatement(theme.breakpoints.xlg)} {
          padding: 0.8rem 0.5rem;
        }
        ${theme.queryStatement(theme.breakpoints.llg)} {
          padding: 0.8rem 1.3rem;
        }
          min-width:1232px;

        
        & > h6 {
          /* justify-self: start; */
          /* position: relative; */

          // flex: 1 0 calc(9% - 1rem);
          // ${theme.queryStatement(theme.breakpoints.xlg)} {
          //   flex: 1 0 calc(9% - 0.5rem);
          // }
          // display: flex;
          // align-items: center;
          // gap: 0.5rem;
    flex: 1 0 calc(11% - 1rem);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          white-space: nowrap;


          & > .text {
            // color: #49515b;
            // font-size: 1.3rem;
            // font-weight: 400;
                  color: #012635;
            font-size: 14px;
            font-weight: 400;
            line-height: 22px;
          }

          & > .info {
            /* position: absolute;
            right: -1rem;
            top: 0;
            transform: translate(calc(50%), 0); */
      width: 16px;
            height: 16px;
             & > svg {
              display: block;
              width: 100%;
              height: 100%;
            }
            & span {
              display: flex;
              align-items: center;
              justify-content: center;
              & > * {
                color: #7c7c7c4b;
                font-size: 1.2rem;
                cursor: pointer;
              }
            }
          }
        }

        & > .error {
          grid-column: 1/ 11;
          font-size: 1.3rem;
          color: #212529;
          text-align: center;
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

    & > .mobilePagination {
      border: solid 1px #E0E0E0;
      border-top: 0;
      border-bottom:0 ; 
      padding: 10px 16px;
      padding-bottom: 0px;
      display: none;
      ${theme.queryStatement(theme.breakpoints.sm)} {
 display: flex;
 justify-content: space-between;
 align-items: center;
  }

  }

  & > .desktopPagination{
    display: flex;
  justify-content: space-between;
  height: 56px;
  background-color: white;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border-top: 0;
  padding: 10px 16px;
  align-items: center;
  border: solid 1px #E0E0E0;

  ${theme.queryStatement(theme.breakpoints.sm)} {
    justify-content: center;
    border-top: 0;
  }
    & > .desktopView{
      
      ${theme.queryStatement(theme.breakpoints.sm)} {
 display: none;
 
  }
    }

    & > .desktopViewTwo{
      display: flex;
      align-items: center;
      gap: 10px;

      ${theme.queryStatement(theme.breakpoints.sm)} {
 display: none;

  }
    }
  }
  }
`;

export const InProgressTableRowStyled = styled.div`
  background-color: #fff !important;
  /* row-gap: 0 !important; */

  // &:nth-of-type(2n + 1) {
  //   background-color: #f4f3fb !important;
  // }

  border-bottom: 1px solid #E0E0E0;

  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  & > .col {
    justify-self: start;
    flex: 1 0 calc(11% - 1rem);
    &.data {
      & > p {
        // font-size: 1.17rem;
        font-size:14px ; 
        line-height: 22px ; 
        // color: #212529;
        color:#777777 ; 
        font-weight: 500;
      }
    }

    &.data1 {
      & > div {
        display: flex;
        position: relative;

        & > p {
          // font-size: 1.17rem;
          font-size: 14px ; 
          
          // color: #212529;
          color:#777777 ;
          font-weight: 500;
        }
      }
    }

    &.actions {
      & > div {
        & > button {
          background-color: #06AB78;
          width:120px ; 
          hight:32px ;
          transition: background-color 300ms;
          padding: 0.6rem 1.05rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content:center ; 
          gap: 0.5rem;

          & > .icon {
            font-size: 1.5rem;
            line-height: 0;
            color: #fff;
          }

          & > .text {
            // font-size: 1.3rem;
            // color: #fff;
            font-size:14px ; 
            font-weight:500 ; 
            line-height: 22px ;
            color:white ;
          }

          &:not(:disabled):hover {
            background-color: #384ad7;
          }

          &:disabled {
            cursor: not-allowed;
            opacity: 0.65;
          }

          & > div {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            width: ${(props) =>
    props.percentage > 100 ? 100 : props.percentage}%;
            background-color: #abb3ee;
            opacity: 0.5;
            // border-radius: 0.5rem;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            transition: 0.3s ease-in-out;

            &:hover {
              box-shadow: 0 0 5px #00000080;
            }
          }
        }
      }
    }
  }
`;
export const Dropdown = styled.div`
  position: absolute;
  width: 150px;
  top: 100%;
  left: 0;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 99999;
`;
export const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 8px;
  cursor: pointer;
  font-size: 1.17rem;
  color: #575962;
  &:hover {
    background-color: #f4f3fb !important;
  }

  & > svg {
    margin-right: 8px;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 41px;
  padding: 0.95rem 1.15rem;
  font-size: 1rem;
  line-height: 1.25;
  background-clip: padding-box;
  border: 1px solid #ebedf2;
  border-radius: 0.25rem;
  color: #575962;
  margin-top: 0.5rem !important;
  margin-bottom: 0.5rem !important;
  &:focus {
    outline: 1px solid #716aca;
  }
  outline: none;

  /* Add any additional styling you need here */
`;

export const CompletedTableRowStyled = styled.div`
  background-color: #fff !important;
  row-gap: 0 !important;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  ${theme.queryStatement(theme.breakpoints.xlg)} {
    gap: 0.6rem;
  }
  &:nth-of-type(2n + 1) {
    // background-color: #f4f3fb !important;
  }
  & > .col {
    flex: 1 0 calc(9% - 1rem);
    ${theme.queryStatement(theme.breakpoints.xlg)} {
      flex: 1 0 calc(11% - 1rem);
    }
    &.data {
      & > p {
        // font-size: 1.17rem;
        font-size:14px ; 
        // color: #212529;
        color:#777777 ; 
        font-weight: 500;
        line-height:22px ; 
      }
    }

    &.actions {
      & > p {
        /* display: grid;
        align-items: center;
        justify-content: center;
        grid-template-columns: auto auto;
        gap: 0.7rem; */
        display: flex;
        align-items: center;
        justify-content: center;
        /* background-color: #C2FFEC;
        border: 1px solid #5BF1B2; */
        transition: background-color 300ms;
        // padding: 0.6rem 1rem;
        padding:0px 8px ;
        // border-radius: 0.5rem;
        border-radius:12px ; 
        height:24px ; 
        width: fit-content ; 

        ${theme.queryStatement(theme.breakpoints.xxlg)} {
          flex-direction: column;
        }
        ${theme.queryStatement(theme.breakpoints.xlg)} {
          padding: 0.6rem;
          width: 50%;
          margin: auto;
        }
        ${theme.queryStatement(theme.breakpoints.llg)} {
          width: 100%;
          flex-direction: row;
        }

        & > .icon {
          font-size: 1.5rem;
          line-height: 0;
          color: #34bfa3;
          margin-right: 0.5rem;
          ${theme.queryStatement(theme.breakpoints.xlg)} {
            padding-left: 0.3rem;
          }
        }

        & > .text {
          // font-size: 1.3rem;
          font-size: 12px ; 
          font-weight:500 ; 
          // color: #34bfa3;
          color:#00724E ; 
          ${theme.queryStatement(theme.breakpoints.xlg)} {
            display: none;
          }
          ${theme.queryStatement(theme.breakpoints.llg)} {
            display: block;
          }
        }
      }
    }
  }
`;

export const LightSidebarStyled = styled.div`
  position: fixed;
  top: 7rem;
  left: 75px;
  height: calc(100vh - 7rem);
  height: calc(100svh - 7rem);
  width: 410px;
  max-width: calc(100vw - 7rem - 2px);
  background-color: #fff;
  padding: 0;
  display: grid;
  // gap: 3rem;
  grid-template-rows: auto 1fr;
  ${theme.queryStatement(theme.breakpoints.tab)} {
    left: 0px;
  }
  & > .top {
    display: grid;
    gap: 2rem;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    padding: 35px 24px;

    & > h2 {
      font-size: 18px;
      color: #012635;
      font-weight: 500;
      line-height: 26px;
      & > svg{
        display: inline-block;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        margin-right: 10px;
      }
    }
    & > button {
      height: 14px;
      width: 14px;
      opacity: 0.6;
      transition: color 300ms, border 300ms;

      & > svg{
      display: block;
      width: 100%;
      height: 100%;
      }
      
      &:hover {
        opacity: 1;
      }
    }
  }
  & > .bottom {
    display: grid;
    gap: 8px;
    align-content: start;
    padding: 0 24px 40px;

    & > .top {
      display: grid;
      grid-template-columns: auto 82px;
      gap: 8px;

      & > .search{
        position: relative;
        & > input {
          padding: 1.1rem 1.5rem;
          padding-right: 42px;
          border: 0.1rem solid #D3D7DD;
          color: #575962;
          background-color: transparent;
          outline: none;
          border-radius: 0.35rem;
          transition: background-color 300ms, color 300ms, border-color 300ms;
          width: 100%;
  
          &:focus {
            border-color: #00BD82;
            color: #012635;
            background-color: #fff;
          }
  
          &:disabled {
            border-color: #f4f5f8;
            color: #6f727d;
            background-color: #f4f5f8;
          }
        }
          & > svg{
            position: absolute;
            top: 15px;
            right: 15px;
          }
      }
      & > button {
        padding: 0.65rem 1.1rem;
        border: 1px solid #06AB78;
        background-color: #fff;
        border-radius: 8px;
        transition: background-color 0.3s ease-in-out;
  
        & > .text {
          font-size: 16px;
          font-weight: 400;
          color: #00BD82;
          line-height: 24px;
        }
      }
    }

    & > .bottom {
      // display: grid;
      // align-content: start;
      // justify-content: end;
      border: 1px solid #E0E0E0;
      border-radius: 8px;
      background-color: #ffffff;

      & > .table {
        display: grid;
        /* overflow-x: auto; */
        overflow-y: auto;
        align-content: start;
        max-height: calc(100dvh - 275px);
    
        & > .row {
          display: grid;
          gap: 0;
          padding: 13px 16px;
          align-items: center;
          border-bottom: 1px solid #E0E0E0;
          align-content: start;
    
          & > h6 {
            font-size: 14px;
            font-weight: 400;
            color: #012635;
            line-height: 22px;
          }
        }

        & > .row.body {
          grid-template-columns: auto 34px;
          gap: 8px;
          padding: 11px 16px;

          &:last-child{
            border-bottom: none;
          }
          & > .col {
            justify-self: start;
  
            &.data {
              display: grid;
              overflow: hidden;
              & > p {
                color: #777777;
                font-size: 14px;
                font-weight: 400;
                line-height: 22px;
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
  
            &.icon {
              justify-self: end;
              & > button {
                display: block;
                width: 20px;
                height: 20px;
                & > svg {
                  display: block;
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
        }
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px; /* Width of the scrollbar */
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1; /* Background of the scrollbar track */
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb {
          background: #888; /* Color of the scrollbar thumb */
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #555; /* Color of the scrollbar thumb on hover */
        }

        /* For Firefox */
        scrollbar-width: thin;
        scrollbar-color: #888 #f1f1f1;
      }
    }
  }
  
`;

// export const TemplateTooltipStyled = styled.div`
//   padding: 0.5rem 0;
//   font-family: 'Fellix';          
//   & > p {

//     padding: 0.5rem;
//     text-align: left;
//     color: #212529;
//     font-size: 1rem;
//     font-weight: 300;

//     &:nth-of-type(2n - 1) {
//       background-color: #f1f1f5;
//     }

//     & > .placeholder {
//       color: #d35b03;
//     }
//     & > .text-spinner {
//       color: #5867dd;
//     }
//   }
// `;

export const TemplateTooltipStyled = styled.div`
  padding: 0.5rem 0;
  /* font-family: 'fellix';  */
  /* font-family: 'fellix', Arial, sans-serif; */
  p {
    font-family: inherit; 
    padding: 0.5rem;
    text-align: left;
    color: #212529;
    font-size: 1rem;
    font-weight: 400;

    &:nth-of-type(2n - 1) {
      background-color: #f1f1f5;
    }

    span.placeholder,
    span.text-spinner {
      font-family: inherit; /* Inherit font from parent */
      color: inherit; /* Inherit color from parent */
    }

    span.placeholder {
      color: #d35b03;
    }

    span.text-spinner {
      color: #5867dd;
    }
  }
`;



export const BatchBuilderModalStyled = styled.div`
  width: 95vw;
  max-width: 882px;
  background-color: #fff;
  border-radius: 16px;


  & > .top {
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    padding: 16px;
    border-bottom: 1px solid #F7F7F7;

    & > h2 {
      font-size: 18px;
      font-weight: 500;
      color: #012635;
      line-height: 26px;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    & > button {
      opacity: 0.6;
      -webkit-transition: opacity 0.3s;
      transition: opacity 0.3s;
      width: 24px;
      height: 24px;

      & > svg {
          width: 100%;
          height: 100%;
          display: block;
      }

      &:hover {
        opacity: 1;
      }
    }
  }

  & > .middle {
    display: grid;
    grid-template-columns: 36px 1fr;
    gap: 56px;
    padding: 16px;
    // background-color: red ; 
      max-height:90vh ; 
  overflow:auto ; 

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

    ${theme.queryStatement(theme.breakpoints.lg)} {
      padding: 2.5rem;
    }

    & > .top {
      display: grid;
      grid-template-row: repeat(3, 1fr);
      align-content: start;

      & > .item {
        display: grid;
        grid-template-rows: 36px auto;
        align-content: start;

        & > .circle {
          background-color: #F7F7F7;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: block;
          position: relative;
          z-index: 3;
          font-size: 18px;
          font-weight: 500;
          color: #777777;
          line-height: 26px;
          text-align: center;
          padding: 6px;

          // &::after {
          //   content: "";
          //   display: inline-block;
          //   width: 1rem;
          //   height: 1rem;
          //   border-radius: 50%;
          //   background-color: transparent;
          //   transform: translate(-50%, -50%);
          //   left: 50%;
          //   top: 50%;
          //   position: absolute;
          //   transition: background-color 300ms ease-in-out;
          // }
        }

        & > .line {
          width: 1px;
          height: 100%;
          border-right: 1px solid #E0E0E0;
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          display: inline-block;
          transform: translate(0, -50%);
        }
          
        // & > .top {
        //   height: 2rem;
        //   position: relative;
        //   display: grid;
        // }

        // & > .bottom {
        //   display: grid;
        //   gap: 0.5rem;
        //   align-content: start;
        //   overflow: hidden;

        //   & > p {
        //     font-size: 1.3rem;
        //     white-space: nowrap;
        //     overflow: hidden;
        //     text-overflow: ellipsis;
        //     display: block;
        //     color: #576962;
        //     font-weight: 300;
        //     max-width: 90%;
        //   }
        // }

        &.one {
        }
        &.two {
          & > .top > .circle {
            justify-self: center;
          }
          & > .bottom > p {
            justify-self: center;
          }
        }
        &.three {
          & > .top > .circle {
            justify-self: end;
          }
          & > .bottom > p {
            justify-self: end;
          }
        }
        &.done {
          & > .top {
            & > .circle::after,
            & > .line {
              background-color: #007bff;
            }
          }
          & > .bottom > p {
            color: #007bff;
            font-weight: 400;
          }
        }
        &.working {
          & > .top {
            & > .line {
              background-color: #007bff;
            }
          }
          & > .bottom > p {
            color: #007bff;
            font-weight: 400;
          }
        }
      }
    }
    & > .botttom {
    }
  }

  & > .bottom {
    display: grid;
    grid-template-columns: auto auto;
    gap: 0.5rem;
    align-items: center;
    justify-content: end;
    padding: 1.95rem;
    & > div {
      & > button {
        display: grid;
        align-items: center;
        justify-content: center;
        grid-template-columns: auto auto;
        gap: 0.7rem;
        background-color: #5867dd;
        transition: background-color 300ms;
        padding: 0.85rem 1.5rem;
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

// export const TemplateChangeModalStyled = styled.div`
//   width: 75vw;
//   max-width: 99rem;
//   background-color: #fff;

//   & > .top {
//     display: grid;
//     align-items: center;
//     justify-content: space-between;
//     grid-template-columns: auto auto;
//     padding: 1.95rem;
//     background-color: #f8f8f8;

//     & > h2 {
//       font-size: 2rem;
//       color: #212529;
//       font-weight: 500;
//       display: block;
//       overflow: hidden;
//       text-overflow: ellipsis;
//       white-space: nowrap;
//     }

//     & > button {
//       font-size: 1.6rem;
//       color: #212529;
//       opacity: 0.6;
//       transition: opacity 0.3s;

//       &:hover {
//         opacity: 0.8;
//       }
//     }
//   }

//   & > .middle {
//     padding: 2.5rem 10rem;
//     display: flex;
//     width: 100%;
//     overflow-y: scroll;
//     height: 75vh;
//     flex-direction: column;

//     ${theme.queryStatement(theme.breakpoints.lg)} {
//       padding: 2.5rem;
//     }
//     & > h2 {
//       font-size: 1rem;
//       font-weight: 500;
//       line-height: 1.2;
//       padding-top: 2.5rem;
//       padding-bottom: 1rem;
//     }

//     & > .message {
//       display: flex;
//       flex-direction: column;
//       width: 100%;
//       background: #f8f8f8;
//       padding: 1rem;
//       border-radius: 5px;

//       & > .item {
//         padding: 0.65rem 0rem;
//         align-items: start;

//         & > span {
//           display: inline-block;
//           color: #333;
//           font-size: 1.3rem;
//           font-weight: 300;
//         }

//         & > p {
//           font-size: 1.3rem;
//           color: #212529;
//           font-weight: 300;

//           & > .placeholder {
//             color: #d35b03;
//           }
//           & > .text-spinner {
//             color: #5867dd;
//           }
//         }
//       }
//       & > .btn {
//         width: 57px;
//         height: 30px;
//         background-color: #34bfa3;
//         border-color: #34bfa3;
//         border-radius: 0.25rem;
//         padding: 0.45rem 0.8rem;
//         font-size: 1rem;
//         line-height: 1.5;
//         color: white;
//       }
//     }
//   }

//   & > .bottom {
//     display: grid;
//     grid-template-columns: auto auto;
//     gap: 0.5rem;
//     align-items: center;
//     justify-content: end;
//     padding: 1.95rem;
//     background-color: #f8f8f8;
//     & > div {
//       & > button {
//         display: grid;
//         align-items: center;
//         justify-content: center;
//         grid-template-columns: auto auto;
//         gap: 0.7rem;
//         background-color: #5867dd;
//         transition: background-color 300ms;
//         padding: 0.85rem 1.5rem;
//         border-radius: 0.5rem;

//         & > .icon {
//           font-size: 0.9rem;
//           line-height: 0;
//           color: #fff;
//         }

//         & > .text {
//           font-size: 1.1375rem;
//           color: #fff;
//         }

//         &:hover {
//           background-color: #384ad7;
//         }
//       }
//     }

//     & > button {
//       padding: 0.85rem 1.5rem;
//       font-size: 1.1rem;
//       border: 0.1rem solid #c1c4cc;
//       font-weight: 500;
//       border-radius: 0.4rem;
//       transition: background-color 0.3s ease-in-out;
//       & > .text {
//         font-size: 1.3rem;
//       }

//       &:not(:disabled):hover {
//         background-color: #fff;
//       }
//     }
//   }
// `;




export const TemplateChangeModalStyled = styled.div`
  width: 764px;
  max-width: 99rem;
  background-color: #fff;
  border-radius: 12px;
  & > .top {
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    padding: 16px;
    background-color: #fff;
    height: 58px;
    & > h2 {
      font-size: 18px;
      color: #012635;
      line-height: 26px;
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

  & > .middle {
    padding: 16px;
    display: flex;
    width: 100%;
    // overflow-y: scroll;
    height: 510px;
    gap: 16px;
    flex-direction: column;

    ${theme.queryStatement(theme.breakpoints.lg)} {
      padding: 2.5rem;
    }
    & > h2 {
      font-size: 1rem;
      font-weight: 500;
      line-height: 1.2;
      padding-top: 2.5rem;
      padding-bottom: 1rem;
    }

    & > .message {
      display: flex;
      flex-direction: column;
      width: 100%;
      border: 1px solid #e0e0e0;
      padding: 1rem;
      border-radius: 5px;

      & > .item {
        padding: 0.65rem 0rem;
        align-items: start;

        & > span {
          display: inline-block;
          color: #333;
          font-size: 1.3rem;
          font-weight: 300;
        }

        & > p {
          font-size: 1.3rem;
          color: #212529;
          font-weight: 300;

          & > .placeholder {
            color: #d35b03;
          }
          & > .text-spinner {
            color: #5867dd;
          }
        }
      }
      & > .btn {
        width: 57px;
        height: 30px;
        background-color: #34bfa3;
        border-color: #34bfa3;
        border-radius: 0.25rem;
        padding: 0.45rem 0.8rem;
        font-size: 1rem;
        line-height: 1.5;
        color: white;
      }
    }
  }

  & > .bottom {
    display: grid;
    grid-template-columns: auto auto;
    gap: 16px;
    align-items: center;
    justify-content: end;
    padding: 16px;
    background-color: #fff;
    height: 72px;
    & > div {
      & > button {
        display: grid;
        align-items: center;
        justify-content: center;
        grid-template-columns: auto auto;
        gap: 0.7rem;
        background-color: #5867dd;
        transition: background-color 300ms;
        padding: 0.85rem 1.5rem;
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

    & > button {
      padding: 8px 12px;
      font-size: 16px;
      border: 0.1rem solid #777777;
      font-weight: 500;
      border-radius: 8px;
      line-height: 24px;
      height: 40px;
      width: 158px;
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



export const CampaignSelectPartStyled = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;

  & > button {
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: auto auto;
    gap: 0.7rem;
    background-color: #36a3f7;
    transition: background-color 300ms, border 300ms;
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

    &:not(:disabled):hover {
      background-color: #1192f6;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }
`;

export const SelectCampaignModalStyled = styled.div`
  display: grid;
  background-color: #fff;
  max-height: calc(100vh - 5rem);
  max-height: calc(100svh - 5rem);
  // width: 95vw;
  width:100% ; 
  min-width: 100% ; 
  max-width: 54.6rem;
  overflow-y: auto;
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

      & > div {
      & > input {
        padding: 1.1rem 1.5rem;
        // border: 1px solid #D3D7DD;
        border: 0px ; 
        color: #777777;
        background-color: transparent;
        outline: none;
        border-radius: 8px;
        transition: background-color 300ms, color 300ms, border-color 300ms;
        width: 100%;
        font-size: 1.3rem;

        &:focus {
          border-color: #06AB78;
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

      & > p {
        color: #212529;
        font-size: 1.04rem;
        opacity: 0.6;
      }
    }
    & > .bottom {
      display: grid;
      /* overflow-x: auto;
      
      */

      & > table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;

        & > thead > tr > th {
          font-size: 14px;
          // color: #212529;
          color: #012635 ; 
          font-weight: 500;
          padding: 13px 16px;
          text-align: center;
          border-top: 2px solid #f4f5f8;
          border-bottom: 2px solid #f4f5f8;

          &:first-of-type {
            text-align: left;
            width: 15rem;
            white-space: nowrap;
          }
          &:nth-of-type(2) {
            width: calc(100% - 25rem);
            min-width: 25rem;
            text-align: left;
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
            // font-size: 1.3rem;
            font-size:14px ;
            font-weight: 500 ;  
            // color: #212529;
            color:#777777 ; 
            padding: 0.975rem;
            text-align: center;

            &:first-of-type {
              text-align: left;
              width: 15rem;
              white-space: nowrap;
            }
            &:nth-of-type(2) {
              width: calc(100% - 25rem);
              min-width: 25rem;
              text-align: left;
              & > p {
                font-size: 1.1rem;
              }
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

export const TemplateSelectPartStyled = styled.div`
  display: grid;
  gap: 2rem;

  & > .top {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding:  16px ;
    ${theme.queryStatement(theme.breakpoints.sm)} {
   flex-direction: column;


    }

    & > div {
      width: 50%;
      ${theme.queryStatement(theme.breakpoints.sm)} {
        width: 100%;


    }
    }
    & > select {
      padding: 1.1rem 4rem 1.1rem 1.5rem;
      border: 0.1rem solid #c1c4cc;
      color: #575962;
      background-color: transparent;
      font-size: 1.3rem;
      outline: none;
      border-radius: 0.35rem;
      transition: background-color 300ms, color 300ms, border-color 300ms;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: url("${(p) => p.ChevronDown}");
      background-repeat: no-repeat;
      background-position: calc(100% - 1.5rem) center;
      background-size: 1rem;
      font-size: 1.3rem;
      width: 100%;
      min-width: 30rem;
      border-top: none;
      border-left: none;
      border-right: none;

      &:focus {
        border-color: #716aca;
        color: #575962;
        background-color: #fff;
      }
    }
  }

  & > .bottom {
    display: grid;
    gap: 1.5rem;

    & .top {
      // height: 15rem;
      height:356px ; 
      overflow-y: hidden;
      overflow-y: auto;
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
      & > .item {
        display: grid;
        grid-template-columns: 15rem 1fr;
        padding: 0.65rem 1.3rem;

        // &:nth-of-type(2n - 1) {
        //   background-color: #f1f1f5;
        // }

        & > h6 {
          // color: #212529;
          color:#012635 ; 
          font-weight: 500;
          // font-size: 1.3rem;
          font-size:14px ; 
        }
        & > p {
          font-size: 1.1rem;
          font-weight: 400;
          color:#777777 ; 
          & > .placeholder {
            color: #EA3815 ; 
          }
          & > .text-spinner {
            color:#3086EE ; 
          }
        }
      }
    }
    & .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px ; 
      padding-top:0px ; 

      & > button {
        display: grid;
        align-items: center;
        justify-content: center;
        grid-template-columns: auto auto;
        gap: 0.7rem;
        // background-color: #36a3f7;
        background-color: #06AB78;
        transition: background-color 300ms, border 300ms;
        padding: 0.6rem 1.05rem;
        border-radius: 0.5rem;
        height: 40px; 
        // width: 163px ; 
        & > .icon {
          font-size: 0.9rem;
          line-height: 0;
          color: #fff;
        }

        & > .text {
          // font-size: 1.1375rem;
          font-size: 16px ; 
          font-weight: 500 ; 
          color: #fff;
        }

        &:not(:disabled):hover {
          // background-color: #1192f6;
        }

        &:disabled {
          cursor: not-allowed;
          opacity: 0.65;
        }
      }
    }
  }
`;

export const BatchSelectPartStyled = styled.div`
  display: grid;
  gap: 1rem;
  align-content: start;

  & > .top {
    display: grid;
    align-content: center;
    justify-content: center;

    & > h2 {
      font-size: 1.6rem;
      color: #212529;
      font-weight: 500;
      opacity: 0.8;
    }
  }
  & > .bottom {
    display: grid;
    gap: 2rem;
    align-content: start;
    & > .top {
      // display: grid;
      display: flex ; 
      flex-direction:column ;
      // grid-template-columns: repeat(3, auto);
      gap: 1.5rem;
      justify-content: center;
      padding:16px ; 
      & > button {
        display: flex;
        align-items: center;
        justify-content: center;
        // width: 13rem;
        width:100% ; 
        height:100px ; 
        aspect-ratio: 16/10;
        display: inline-block;
        border: 0.1rem solid #d8d8d8;
        border-radius: 8px;
        font-size:38px;
        color: #012635;
        font-weight: 600;
        transition: border 300ms ease-in-out, background-color 300ms ease-in-out,
          color 300ms ease-in-out;

        ${theme.queryStatement(theme.breakpoints.md)} {
          /* width: 11rem; */
        }

        &:hover {
          border-color: #00BD82;
        }
        &.selected {
          border-color: #00BD82;
          background-color: #E1F3EE;
          // color: #fff;
        }
      }
    }
    & > .bottom {
      display: flex;
      align-content: center;
      justify-content: end;
      padding:16px ; 
      & > button {
        display: grid;
        align-items: center;
        justify-content: center;
        grid-template-columns: auto auto;
        gap: 0.7rem;
        background-color: #06AB78;
        transition: background-color 300ms;
        padding: 0.6rem 1.05rem;
        border-radius: 8px;

        & > .icon {
          font-size: 0.9rem;
          line-height: 0;
          color: #fff;
        }

        & > .text {
          font-size: 16px;
          font-weight: 500 ; 
          color: #fff;
        }

        &:not(:disabled):hover {
          // background-color: #384ad7;
        }

        &:disabled {
          cursor: not-allowed;
          opacity: 0.65;
        }
      }
    }
  }
`;


export const BatchProcesingModalStyled = styled.div`
  width: 1144px;
  max-width: 150rem;
  background-color: #fff;
  border-radius: 12px;
  ${theme.queryStatement(1230)} {
      width: 740px;
  }
  ${theme.queryStatement(760)} {
      width: 95vw;
  }
  overflow-y: auto;

  & > .top {
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    padding: 16px;
    background-color: #fff;
    position: relative;

    & > h2 {
      font-size: 18px;
      color: #012635;
      font-weight: 600;
      line-height: 26px;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    & > .right {
      display: grid;
      align-items: center;
      justify-content: end;
      grid-template-columns: auto auto;
      gap: 1rem;
      padding-right: 2rem;

      & > .chart {
        width: 3rem;
        height: 3rem;
      }

      & > .text {
        color: #212529;
        font-size: 1.3rem;
        font-weight: 500;
      }
    }

    & > button {
      font-size: 1.5rem;
      color: #012635;
      // opacity: 0.6;
      transition: opacity 0.3s, color 0.3s;
      position: absolute;
      // top: 1rem;
      right: 1rem;

      &:hover {
        opacity: 0.7;
        color: #012635;
      }
    }
  }

  & > .bottom {
    padding: 24px 20px;
    display: grid;
    gap: 16px;
    & > .top {
      display: grid;
      align-items: center;
      grid-template-columns: 0.35fr 1fr;
      ${theme.queryStatement(1230)} {
       gap: 1rem;
      }
      & > .left {
        display: grid;
        gap: 16px;

        // grid-template-columns: 1fr 1fr 1fr;
        // align-content: start;

        & > .item {
          display: grid;
          gap: 0.5rem;
          justify-items: center;
          align-content: start;
          overflow: hidden;

          & > .ResponsiveContainer {
            ${theme.queryStatement(1230)} {
              width:100% !important;
            }
              & > div{
            & > .icon {
              display: grid;
              align-items: center;
              justify-items: center;
              margin-bottom: 0.5rem;
              font-size: 4rem;
              color: #5867dd;

              &.circle {
                width: 5rem;
                height: 5rem;
              }
            }

            & > .text {
              font-size: 16px;
                white-space: nowrap;
              overflow: hidden;
              display: block;
              text-overflow: ellipsis;
                ${theme.queryStatement(1230)} {
                font-size: 12px !important;
                }
            }
          }
          }



          

          & > h6 {
            font-size: 1.625rem;
            color: #212529;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            display: block;
            text-overflow: ellipsis;
          }

          &.one > h6 {
            justify-self: stretch;
            text-align: center;
          }

          & > .subText {
            font-size: 1.17rem;
            color: #212529;
            opacity: 0.7;
            white-space: nowrap;
            overflow: hidden;
            display: block;
            text-overflow: ellipsis;
            justify-self: stretch;
            text-align: center;
          }
        }
      }
      & > .right {
        display: grid;
        gap: 1.5rem;
        align-content: start;

        & > .top1 {
          display: grid;
          gap: 0.8rem;
          justify-content: center;
          align-content: center;
          & > div {
            display: flex;
            align-items: center;
            gap: 5px;

            & > h2 {
              font-size: 18px;
              font-weight: 500;
            }
          }

          & > div {
            diplay: flex;
            justify-content: center;
            width: 100%;

            & > button {
              gap: 0.7rem;
              background-color: #5867dd;
              transition: background-color 300ms;
              padding: 0.9rem 0.7rem;
              border-radius: 0.5rem;
              font-size: 1.1375rem;
              color: #fff;
              width: 70%;

              &:hover {
                background-color: #384ad7;
              }
            }
          }
        }

        & > .top {
          display: grid;
          gap: 0.5rem;
          align-content: start;

          & > h2 {
            font-size: 1.95rem;
            font-weight: 500;
            color: #212529;
          }
          & > .textarea {
            position: relative;
            background: #fff;
            padding: 1.3rem;
            border: 0.1rem solid #d8d8d8;
            border-radius: 5px;
            min-height: 9rem;

            & > textarea {
              color: #6f727d;
              width: 100%;
              height: 100%;
              outline: none;
              border: none;
              font-size: 1.3rem;
              font-weight: 300;
              background: #fff;
              resize: none;
              ${theme.queryStatement(theme.breakpoints.xlg)} {
                font-size: 1.6rem;
              }
            }

            & > .info {
              position: absolute;
              bottom: 1.3rem;
              right: 1.3rem;
              font-style: italic;
              color: #6f727d;
            }
          }
        }
        & > .bottom {
          & > button {
            gap: 0.7rem;
            background-color: #5867dd;
            transition: background-color 300ms;
            padding: 0.9rem 1.5rem;
            border-radius: 0.5rem;
            font-size: 1.1375rem;
            color: #fff;
            width: 100%;

            &:hover {
              background-color: #384ad7;
            }
          }
        }
      }

      ${theme.queryStatement(760)} {
        grid-template-columns:  1fr;
  }
    }
    & > .bottom {
        overflow-x:auto;
      & > table {
        width: 100%;
        overflow-x:auto;
        border-spacing: 0;
        border-collapse: collapse;
        display: grid;
        border: 1px solid #e0e0e0;
        border-radius: 8px;

        & > thead {
          display: block;
          width: 100%;
          & > tr {
            // background-color: #fff;
            display: grid;
            grid-template-columns: 436px 566px auto;
            width: 100%;

            & > th {
              color: #212529;
              font-size: 1.3rem;
              font-weight: 500;
              padding: 8px 16px;
              height: 48px;
              display: flex;
              align-items: center;

              &:nth-of-type(1) {
                text-align: left;
              }
              &:nth-of-type(2) {
                text-align: left;
              }
              &:nth-of-type(3) {
                text-align: center;
              }
            }
          }
        }
        & > tbody {
          display: block;
          max-height: 24.6rem;
          overflow-y: auto;
          width: 100% !important;
          overflow-x: hidden;


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
          & > tr {
            background-color: #e6e6e6;
            display: grid;
            grid-template-columns: 436px 566px auto;
            background-color: transparent;

            &:nth-of-type(2n) {
              // background-color: #f2f3f7;
            }

            & > td {
              color: #777777;
              font-size: 14px;
              font-weight: 500;
              line-height: 22px;
              padding: 0.95rem 1.5rem;
              display: block;
              font-weight: 400;
              opacity: 0.9;

              &:nth-of-type(1) {
                text-align: left;
              }
              &:nth-of-type(2) {
                text-align: left;
              }
              &:nth-of-type(3) {
                text-align: center;
                font-size: 14px;
                color: #06ab78;
                transform: translate(calc(17px / 2), 0);
              }

              & > span.line {
                text-decoration: line-through;
              }

              &.loading {
                text-align: center;
                width: 100%;
                & > div {
                  font-size: 1.3rem;
                  color: #212529;
                  font-weight: 500;
                  width: 100%;
                  & > span {
                    & > svg > circle {
                      stroke-width: 0.1rem;
                      stroke: #007bff;
                    }
                  }
                }
              }
            }

            &.done {
              
              & > td {
                font-weight: 400;
                opacity: 1;
              }
              & > td:nth-of-type(3) {
                color: #43cd80;
              }
            }
            &.working {
              background-color: #f7f7f7;
              & > td {
                font-weight: 500;
                opacity: 1;
                color: #151a28;
                line-height: 22px;
                font-size: 14px;
              }
              & > td:nth-of-type(3) {
                color: #06ab78;
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
    // stroke-width: 0.6rem !important;
    stroke-width: 8px !important;
  }
  & > .CircularProgressbar-text {
    text-anchor: middle;
    alignment-baseline: middle;
    font-family: "Fellix";
    font-weight: 500;
    margin: 10px;
  }
`;

export const BatchesScroll = styled.div`
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
`