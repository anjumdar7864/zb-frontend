import styled from "@emotion/styled";
import theme from "@/theme";
import { Modal } from "@mui/material";


export const TemplateTop = styled.div`
  display: flex;
  padding: 2rem 40px 0rem 40px;
  justify-content:space-between ; 
  align-items: center ; 

  ${theme.queryStatement(1024)} {
    flex-direction: column;
    align-items: flex-start ; 
    padding: 2rem 4rem;
  }
     ${theme.queryStatement(900)} {
    flex-direction: column;
    align-items: flex-start ; 
    padding: 2rem 2rem;
  }
  & > .right {
    display: flex;
    align-items: center;
    gap:1rem;
    ${theme.queryStatement(theme.breakpoints.sm)} {
      padding-top:15px;
      display:grid;
      grid-template-columns: 1fr 1fr;
    } 
    ${theme.queryStatement(900)} {
      padding-top:15px;
    } 
    & > .TemplateC {
     ${theme.queryStatement(900)} {
          display:none;
      } 
    }
  }
  & > .left {
    display: flex ; 
    gap:10px ; 
    align-items:center ; 
  & > .dropDown {
    width: 150px ; 
     ${theme.queryStatement(theme.breakpoints.tab)} {
    width: 130px ;
  }
}
  & > .searchContainer {
    width: 256px ; 
    height:4rem ; 
    border: solid 1px #D3D7DD ; 
    background-color: white ; 
    border-radius: 8px ; 
    display:flex ; 
    align-items:center ; 
    padding: 0px 12px ; 
    gap: 10px ;
    &:hover {
        border: solid 1px #00BD82 ; 
      }
    & > input {
    width:100% ; 
    outline: none ; 
    border: 0px ; 
      
    }
  }
}

`


export const DripAutomationsStyled = styled.div`
  & > .ContainerTable {
    ${theme.queryStatement(900)} {
      padding: 2rem 2rem;
    }
    padding-inline:4rem;
    & > .ContainerSearch {
      padding-block:2.4rem;
    }
  }

  & > .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${theme.queryStatement(theme.breakpoints.md)} {
      flex-direction: column;
    }
    margin-bottom: 0.4rem;
    gap: 2rem;

    & > .left > h1 {
      font-size: 2rem;
      font-weight: 500;
      color: #000000;

      ${theme.queryStatement(theme.breakpoints.md)} {
        margin-bottom: -3rem;
      }
    }

    & > .right {
      display: flex;
      align-items: center;
      ${theme.queryStatement(theme.breakpoints.md)} {
        flex-direction: column;
      }
      & > form {
        display: grid;
        grid-template-columns: auto auto;
        margin-right: 0.9rem;
        ${theme.queryStatement(theme.breakpoints.md)} {
          margin-right: 0rem;
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
      & > div {
        ${theme.queryStatement(theme.breakpoints.md)} {
          margin-top: 1.2rem;
        }
        & > button {
          display: grid;
          align-items: center;
          justify-content: center;
          grid-template-columns: auto auto;
          gap: 0.7rem;
          background-color: #5868ddc1;
          transition: background-color 300ms;
          padding: 0.9rem 1.5rem;
          height: auto;
          border-radius: 0.5rem;
          border: 1px solid #5867dd;
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
  }

  & > .bottom {
    width: 100%;
    margin:0px 4rem;
    ${theme.queryStatement(theme.breakpoints.lg)} {
      overflow: hidden;
      overflow-x: scroll;
    }
    & > div {
      ${theme.queryStatement(theme.breakpoints.lg)} {
        width: 1100px;
      }
    }
  }
`;

export const TableStyled = styled.div`
  & > .top {
    & > h2 {
      font-size: 1.95rem;
      color: #212529;
      font-weight: 500;
    }
  }
  & > .bottom {
    display: grid;
    gap: 1.3rem;
    & > .table {
      & > .row {
        border:1px solid #E0E0E0;
        border-top-left-radius:0.5rem;
        border-top-right-radius:0.5rem;
        background-color:white;
        padding: 1rem 1.3rem;
        display: flex;
        align-items: center;
        & > * {
            &:nth-child(1) {
              width: 21%;
            }
            &:nth-child(2) {
              width: 100%;
            }
            &:nth-child(3) {
              width: 15%;
            }
          }
        & > h6 {
          position: relative;

          & > .text {
            color: black;
            font-size: 1.1rem;
            font-weight: 500;
          }

          & > .info {
            position: absolute;
            top: 0;
            transform: translate(calc(50%), 0);
            margin-left: 7rem;
            & span {
              color: #7c7c7c4b;
              font-size: 1.2rem;
              cursor: pointer;
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
      ${theme.queryStatement(theme.breakpoints.md)} {
        flex-direction: column;
        gap: 1.3rem;
      }
      * & > .left > span {
        font-size: 1.3rem;
        color: #212529;
      }
    }
  }
`;

export const DripAutomationTableRowStyled = styled.div`
      border-top:0px;
      display: grid;
      grid-template-columns: 
      minmax(100px, 1.3fr)
      minmax(500px, 6fr)
      minmax(200px, 1fr)
      minmax(30px, 0.2fr);
      gap: 0rem;
      padding: 1rem 1.3rem;
      align-items: center;
      background-color:white
  & > * {
    &:nth-child(1) {
      width: 21%;
    }
    &:nth-child(2) {
      width: 100%;
    }
    &:nth-child(3) {
      width: 15%;
      margin-left: 2rem;
    }
  }
  & > .col {
      
    &.data {
      & > p {
        font-size: 1.13rem;
        font-weight: 500;
        color: #212529;
        padding: 5px;
      }
    }

    &.message {
      & > .item {
        & > span {
          font-size: 1rem;
          color: #33303090;
          cursor: pointer;
          margin-left: 155px;
        }
        & > div {
          display: flex;
          align-items: center;
          & > * {
            &:first-child {
              width: 12rem;
            }
            &:nth-child(2) {
              width: 20px;
              min-width: 10px;
              background: #777777;
              height: 0.1rem;
            }
            &:last-child {
              width: 100%;
            }
          }
          & > div {
            padding: 0.8rem;
            font-weight: 400;
            color: black;
            min-width: 10%;
            font-size: 1.2rem;
            background-color:#F0F0F0;
            display:flex;
            align-items:center;
            justify-content:center;
            border-radius:0.4rem;
           
          }

          & > .messageText {
            display: flex;
            flex-direction: column;
            border: 1px solid #d8d8d8;
            padding: 0.8rem 0.7rem;
            background-color:white;
            & > p {
              font-size: 1rem;
              color: #777777;
              font-weight: 400;
              line-height: 1.6rem;
              width: 100%;
              & > .placeholder {
                color: #EA3815;
              }
              & > span {
                width: 20px;
                min-width: 10px;
                height: 0.1rem;
              }
              & > .text-spinner {
                color: #3086EE;
              }
            }
            & > span {
              padding-top: 5px;
              font-weight: 500;
              cursor: pointer;
              font-size: 14px;
            }
          }
        }
      }
      & > div {
        & > button {
          color: #999999;
          transition: color 300ms;
          font-size: 1.5rem;
          line-height: 0;
          display: flex;
          align-items: center;
          gap: 10px;
          transform-origin: center center;
          transform: rotate(${(p) => (p.isOpen ? "180" : "0")}deg);
          transition: transform 300ms;

          &:hover {
            color: #333;
          }
        }
      }

      & > .extraRows {
        & > .item {
          & > span {
            display: inline-block;
            color: #333;
            font-size: 1.3rem;
            font-weight: 300;
          }

          & > div {
            display: flex;
            // justify-content:center;
            align-items: center;
            margin: 0.6rem 0rem;
            & > * {
              &:first-child {
                width: 18rem;
              }
            }

            & > div {
              padding: 0.8rem;
              font-weight: 400;
              color: black;
              min-width: 10%;
              font-size: 1.2rem;
              background-color:#F0F0F0;
              display:flex;
              align-items:center;
              justify-content:center;
              border-radius:0.4rem;
              @media (max-width: 768px) {
                font-size: 1.3rem;
              }
              @media (max-width: 480px) {
                font-size: 1.1rem;
              }
            }
            & > span {
              width: 20px;
              min-width: 10px;
              background: #777777;
              height: 0.1rem;
            }
            & > p {
              color: #777777;
              padding: 0.8rem 0.7rem;
              border: 1px solid #D3D7DD;
              width: 100%;
              background-color: white;
              line-height: 1.6rem;
              font-size: 1rem;
              font-weight: 400;
              line-height: 1.6rem;
              border-radius:0.4rem;
              & > .placeholder {
                color: #EA3815;
              }
              & > .text-spinner {
                color: #3086EE;
              }
            }
          }
        }
      }
    }

    &.actions {
      position: relative;
      & > button {
        font-size: 1.3rem;
        color: #9f9f9f;
        line-height: 0;
        width: 2.6rem;
        height: 2.6rem;
        border-radius: 1.3rem;
        transition: background-color 300ms;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          background-color: #dedfe7;
        }
      }

      & > .menu {
        position: absolute;
        top: 50%;
        right: 100%;
        transform: translate(-1.5rem, -50%);

        box-shadow: 4px 4px 18px #3232324d;
        background-color: #fff;
        display: grid;
        align-items: center;
        padding: 0.5rem 1.3rem;
        border-radius: 0.5rem;
        grid-template-columns: auto auto auto;
        align-items: center;

        & > button {
          padding: 0.4rem 0.7rem;
          border-radius: 0.2rem;
          display: grid;
          gap: 1rem;
          grid-template-columns: auto auto;
          transition: background-color 300ms;
          align-items: center;

          & > .icon {
            color: #88898d;
            font-size: 1rem;
            line-height: 0;
          }
          & > .text {
            color: #333;
            font-size: 1.3rem;
          }

          &:hover {
            background-color: #dedfe7;
          }

          & > a {
            padding: 0.2rem 0.7rem;
            border-radius: 0.2rem;
            display: grid;
            gap: 1rem;
            grid-template-columns: auto auto;
            transition: background-color 300ms;
            align-items: center;
            text-decoration: none;

            & > .icon {
              color: #88898d;
              font-size: 1rem;
              line-height: 0;
            }
            & > .text {
              color: #333;
              font-size: 1.3rem;
            }

            &:hover {
              background-color: #dedfe7;
            }
          }
        }
      }
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


export const InitialTemplateStyled = styled.div`
  // padding: 1.3rem 1.3rem 3rem;
  // display: grid;
  display: flex;
  flex-direction: column ; 
  gap: 2rem;
  // background-color: #f2f3f8;
  // background-color: red;
  height:100% ; 
  // min-height: calc(100vh - 7rem);
  // min-height: calc(100svh - 7rem);
  align-content: start;

  & > .top {
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    gap: 2rem;

    & > .left > h1 {
      font-size: 2rem;
      font-weight: 500;
      color: #000000;
    }

    & > .right {
      display: grid;
      gap: 1.3rem;
      justify-items: end;

      & > .top {
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
        grid-template-columns: auto auto;
        
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

  & > .bottom {
      max-width:100%;
      overflow:auto;
      margin:0px 40px;
      margin-bottom: 40px ; 
      background-color:white ; 
       border-radius:8px ; 
      border: solid 1px #E0E0E0 ; 
        
       ${theme.queryStatement(theme.breakpoints.tab)} {
      margin:0px 20px;
        }

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
      // overflow-x: auto;



      & > .row {
        display: grid;
        grid-template-columns: 
        minmax(100px, 1fr)
        minmax(200px, 6fr);
        gap: 0rem;
        padding: 1rem 1.3rem;
        align-items: center;

                

          background-color:white

                  &:nth-of-type(odd) {
            // background-color: #f9f9f9 !important;
          }

          &:nth-of-type(even) {
            // background-color: #e9e9e9 !important;
          }

          .col.actions {
            display: grid !important; /* Show actions on hover */
          }

 

        & > h6 {
           justify-self: flex-start;
           font-weight: 500 ;
            color:#012635 ;
            font-size:1.2rem ;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between; 
            padding-inline: 10px;
          &:first-of-type {
            justify-self: start;
          }
          &:last-of-type {
            justify-self: end;
          }
        }

        &.body {
          // background-color: #fff;
           background-color: white;
                overflow-wrap: anywhere;
          & > .error {
            text-align: center;
            font-size: 1.3rem;
            color: #212529;
            grid-column: 1/-1;
          }
            & > .bold
            {
            // font-weight: bold;
          
            }

          & > .col {
             justify-self: flex-start;
             align-self: flex-start;
             padding-inline: 10px;
              width:100%;
            &:first-of-type {
              justify-self: start;
            }
            &:last-of-type {
              justify-self: end;
            }

            &.user {
              display: grid;
              align-items: center;
              grid-template-columns: auto 1fr;
              gap: 0.5rem;

              & > .left {
                display: grid;
                align-items: center;
                justify-content: center;

                & > img {
                  width: 4rem;
                  height: 4rem;
                  border-radius: 50%;
                  object-fit: cover;
                }
              }

              & > .right {
                display: grid;
                & > p {
                  font-size: 1.3rem;
                  color: #212529;
                  display: block;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }

                & > span {
                  font-size: 1.2rem;
                  color: #212529;
                  opacity: 0.7;
                  display: block;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }
              }
            }

            &.data {
              & > p {
                font-size:1.1rem ; 
                font-wight: 500 ; 
                line-height:22px ; 
                color:#777777 ; 
                text-wrap:wrap !important;
              }
            }

            &.actions {
              display: none;
              align-items: center;
              justify-content: end;
              // grid-template-columns: auto auto auto auto;
              & > .icon {
                font-size: 1.5rem;
                color: #9f9f9f;
                line-height: 0;
              }
            }
          }











        & > .col2 {
             justify-self: flex-start;
             padding-inline: 10px;
             
            &:first-of-type {
              justify-self: start;
            }
            &:last-of-type {
              justify-self: end;
            }

            &.user {
              display: grid;
              align-items: center;
              grid-template-columns: auto 1fr;
              gap: 0.5rem;

              & > .left {
                display: grid;
                align-items: center;
                justify-content: center;

                & > img {
                  width: 4rem;
                  height: 4rem;
                  border-radius: 50%;
                  object-fit: cover;
                }
              }

              & > .right {
                display: grid;
                & > p {
                  font-size: 1.3rem;
                  color: #212529;
                  display: block;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }

                & > span {
                  font-size: 1.2rem;
                  color: #212529;
                  opacity: 0.7;
                  display: block;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }
              }
            }

            &.data {
              & > p {
                font-size:1.1rem ; 
                font-wight: 500 ; 
                line-height:22px ; 
                color:#777777 ; 
                text-wrap:wrap !important;
              }
            }

            &.actions {
              display: none;
              align-items: center;
              justify-content: end;
              // grid-template-columns: auto auto auto auto;
              & > .icon {
                font-size: 1.5rem;
                color: #9f9f9f;
                line-height: 0;
              }
            }
          }
        }
      }
    }
  }
`;
