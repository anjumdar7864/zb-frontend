import theme from "@/theme";
import styled from "@emotion/styled";

export const TagsStyled = styled.div`
  padding: 24px 40px;
  display: grid;
  gap: 2.5rem;
  background-color: #f2f3f8;
  min-height: calc(100vh - 7rem);
  min-height: calc(100svh - 7rem);
  align-content: start;
  background:#F7F7F7;
      
  & > div {
    padding:0rem 2rem 2rem 2rem;
    border:1px solid #E0E0E0;
    border-radius:0.8rem;
    background:white;


    &::-webkit-scrollbar {
       height: 0px; 
        width: px;
      }

      &::-webkit-scrollbar-track {
        background: white;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #00BD82;
      }
    & > .top {
      display: grid;
      justify-content: space-between;
      grid-template-columns: auto auto;
      gap: 2rem;
      backgroud-color:white;
      & > .left {
        display: grid;
        gap: 0.3rem;
        align-content: start;
        padding-block:2rem;
        & > h1 {
          font-size: 2rem;
          font-weight: 500;
          color: #000000;
        }
        & > p {
          font-size: 1.2rem;
          font-weight: 500;
          color: #012635;
        }
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
    & > .table {
      display: grid;
      /* width: 60%; */
      max-width: 800px;
      overflow-x: auto;
      border:1px solid #E0E0E0;
      border-radius:0.6rem;
       ${theme.queryStatement(1000)} {
           width: 100%;

        }

        & > .row {
        display: flex;
        /* justify-content:space-between; */
        padding: 0.8rem 1.3rem;
        align-items: center;
        background-color:white;
        & > h6 {
          justify-self: center;
          width: 100% !important;
          &:first-of-type {
            justify-self: start;
          }
          &:nth-of-type(2) {
            justify-self: start;
            max-width: 112px;
            
           
          }
          &:nth-of-type(3) {
            justify-self: start;
            max-width: 112px;
           
          }
          &:last-of-type {
            justify-self: end;
            max-width: 112px;
          }

          &.sort {
            display: flex;
            align-items: center;
            grid-template-columns: auto auto;
            gap: 0.3rem;
            cursor: pointer;
            position: relative;
            user-select: none;
            
            & > .text {
              color: #012635;
              font-size: 1.2rem;
              font-weight: 500;
            }

            &.select {
              color: #6867dd;
            }
          }

          &.data {
           color: #012635;
              font-size: 1.2rem;
              font-weight: 500;
          }
        }

        & > .error {
          grid-column: 1/ -1;
          font-size: 1.3rem;
          color: #212529;
          text-align: center;
        }
      }
      & > div{
        & > div{
          & > .row {
        display: flex;
        /* justify-content:space-between; */
        padding: 0.8rem 1.3rem;
        align-items: center;
        background-color:white;
        & > h6 {
          justify-self: center;
          width: 100% !important;
          &:first-of-type {
            justify-self: start;
          }
          &:nth-of-type(2) {
            justify-self: start;
            max-width: 112px;
            
           
          }
          &:nth-of-type(3) {
            justify-self: start;
            max-width: 112px;
           
          }
          &:last-of-type {
            justify-self: end;
            max-width: 112px;
          }

          &.sort {
            display: flex;
            align-items: center;
            grid-template-columns: auto auto;
            gap: 0.3rem;
            cursor: pointer;
            position: relative;
            user-select: none;
            
            & > .text {
              color: #012635;
              font-size: 1.2rem;
              font-weight: 500;
            }

            &.select {
              color: #6867dd;
            }
          }

          &.data {
           color: #012635;
              font-size: 1.2rem;
              font-weight: 500;
          }
        }

        & > .error {
          grid-column: 1/ -1;
          font-size: 1.3rem;
          color: #212529;
          text-align: center;
        }
      }
        }
      }
     
    }

    & > .right{
      padding-top:2rem;
    & > .top{
      & > button{
        display:flex;
        align-items:center;
        justufy-content:center;
      }

      }
    }
  }
`;

export const TableRowStyled = styled.div`
  background-color: #fff !important;
  row-gap: 0 !important;
  border-top:1px solid #E0E0E0;
  & > .col {
    justify-self: center;
width: 100% !important;
    &:first-of-type {
      justify-self: start;
    }
    &:nth-of-type(2) {
      justify-self: stretch;
      max-width: 112px;
    }
    &:nth-of-type(3) {
      justify-self: stretch;
      max-width: 112px;
    }
    &:last-of-type {
      
      justify-self: center;
     
      max-width: 112px;
    }

    &.color {
      position: relative;

      & > .item {
        height: 3.45rem;
        padding: 0.65rem 0.975rem;
        border-radius: 100rem;
        border: 1px solid #d8d8d8;
        display: grid;
        align-items: center;
        justify-content: space-between;
        grid-template-columns: auto auto;
        gap: 2rem;
        cursor: pointer;
        position: relative;
        z-index: 2;
        transition: background-color 300ms ease-in-out;

        &:hover {
          background-color: #fff;
        }

        & .color {
          border-radius: 50%;
          display: inline-block;
          line-height: 0;
          background-color: var(--color);
          border: 0.1rem solid #fff;
          width: 20px;
          height: 20px;
          &.selected {
            outline: 0.1rem solid #0095ff;
          }
        }

        & > .left {
          display: grid;
          align-items: center;
        }

        & > .right {
          display: grid;
          align-items: center;
          grid-template-columns: auto;
          gap: 1rem;
          transform-origin: left center;

          &:has(.colors) {
            grid-template-columns: auto auto;
          }

          & > .colors {
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          & > .icon {
            color: #aaa;
            line-height: 0;
            display: inline-block;
            transform-origin: center center;
            transition: transform 300ms ease-in-out;
          }
        }

        &:hover > .right {
          & > .icon {
            transform: rotate(180deg);
          }
        }
      }
    }

    &.tag {
      width:8rem;
      padding-inline:1rem;
      padding-block:0.4rem;
      border-radius:3rem;
      & > p {
        display: grid;
        grid-template-columns: auto auto;
        gap: 0.65rem;
        align-items: center;
        justify-content: start;
        & > .text {
          color: white;
          font-size: 1.2rem;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    &.data {
      & > p {
        font-size: 1.3rem;
        color: #212529;
      }
    }

    &.actions {
      display: grid;
      gap: 0.65rem;
      grid-template-columns: auto auto;
      align-items: center;
      justify-content: end;
      position: relative;
      transition: all 300ms ease-in-out;

      & > button {
        display: inline-block;
        color: #777777;
        height: 2.6rem;
        width: 2rem;
        font-size: 1.2rem;
        text-align: center;
        background: #fff;
        line-height: 0;
        transition: all 300ms ease-in-out;
      }
    }
  }
`;

export const AddNewTagModalStyled = styled.form`
  width: 95vw;
  max-width: 42.6rem;
  background-color: #fff;
  border-radius:1.5rem;
  & > .top {
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    padding: 1rem 1.95rem;
    border-bottom:1px solid #F7F7F7;
    & > h2 {
      display: grid;
      align-items: center;
      justify-content: start;
      grid-template-columns: auto auto;
      gap: 0.65rem;
      & > .icon {
        font-size: 1.5rem;
        color: #aaa;
        line-height: 0;
      }
      & > .text {
        font-size: 1.8rem;
        color: #012635;
        font-weight: 600;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    & > .right > span {
      font-size: 1.3rem;
      color: #212529;
      opacity: 0.7;
    }
  }

  & > .bottom {
    padding: 2.5rem;
    display: flex;
    align-items:center;
    gap: 1rem;

    & > .row1 {
      align-items: center;
      /* width:75%; */
      flex-grow: 1;
      & > .left > span {
        color: #212529;
        font-weight: 300;
        font-size: 1.43rem;
      }

      & > .right {
        &.input {
          display: grid;
          gap: 0.3rem;

          & > input {
            padding: 0.8rem 1.5rem;
            border: 0.1rem solid #D3D7DD;
            color: #575962;
            background-color: transparent;
            outline: none;
            border-radius: 0.6rem;
            transition: background-color 300ms, color 300ms, border-color 300ms;
            font-size: 1.3rem;
            font-size: 1.3rem;
            width: 100%;
            height:4rem;
            &:focus {
              border-color: #00BD82;
              color: #575962;
              background-color: #fff;
            }
          }
          & > .info {
            justify-self: end;
            color: #212529;
            opacity: 0.7;
            font-weight: 300;
            font-style: italic;
            font-size: 1.1rem;
          }
        }

        &.colors {
          display: grid;
          grid-template-columns: repeat(8, auto);
          justify-content: start;
          gap: 1rem;
          align-items: center;

          & > button {
            width: 2.4rem;
            height: 2.4rem;
            border-radius: 50%;
            background-color: transparent;
            display: inline-block;
            border: 0.2rem solid var(--color);
            position: relative;

            &::after {
              content: "";
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              display: inline-block;
              width: 2.4rem;
              height: 2.4rem;
              background-color: var(--color);
              border-radius: 50%;
              transition: width 300ms ease-in-out, height 300ms ease-in-out;
            }

            &.selected::after {
              width: 1.2rem;
              height: 1.2rem;
            }
          }
        }

        &.buttons {
          display: grid;
          grid-template-columns: auto auto;
          align-items: center;
          justify-content: start;
          gap: 1rem;
          padding-top: 2rem;

          & > button:first-of-type {
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

            &:disabled {
              opacity: 0.65rem;
              cursor: not-allowed;
            }
          }
        }
      }
    }





    & > .row2 {
      align-items: center;
      width:78px;  
      & > .right{
        & > div{
          position:relative;
          & > .InputColor{
            border: 0.1rem solid #D3D7DD;
            color: #575962;
            background-color: transparent;
            outline: none;
            border-radius: 0.6rem;
            transition: background-color 300ms, color 300ms, border-color 300ms;
            font-size: 1.3rem;
            width: 100%;
            height:4rem;
            display:flex;
            align-items:center;
            justify-content:space-between;
            cursor:pointer;
            overflow:hidden;
            & > .SelectedColor{
              height:1.8rem;
              width:1.8rem;
              border-radius:2rem;
            }
            & > input{
              width:100%;
              height:150%;
              border:1px solid #D3D7DD;
            }
          }
          & > .AbsoluteColor{
            height:25rem;
            width:100%;
            background-color:white;
            position:absolute;
            border-radius: 0.6rem;
            border: 0.1rem solid #D3D7DD;
            padding:0.3rem;
            overflow-y:scroll;
            overflow-x:hidden;
              &::-webkit-scrollbar {
                height: 4px; 
                width: 4px;
              }

              &::-webkit-scrollbar-track {
                background: white;
                padding:5px;
              }

              &::-webkit-scrollbar-thumb {
                background-color: #00BD82;
                border-radius:1rem;
              }
            & > .AbsoluteColorinner{
              display:flex;
              align-items:center;
              padding: 0.8rem 1.2rem;
              justify-content:space-between;
              cursor:pointer;
              border-radius:1rem;
              &:hover {
                background-color: #F7F8FC;
              }
              & > .SelectedColor{
                height:1.8rem;
                width:1.8rem;
                border-radius:2rem;
              }
            }
          }
        }
      }
    }
  }

  & > .footer{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.95rem;
      border-top:1px solid #F7F7F7;
      & > .right{
        & > .closeBtn{
          padding-inline:2rem;
          padding-block:0.8rem;
          border-radius:0.8rem;
          color:#777777;
        }
        & > .SubmitBtn{
          background-color:#00BD82;
          padding-inline:2rem;
          padding-block:0.8rem;
          border-radius:0.8rem;
          color:white;
        }
      }
  }
`;
