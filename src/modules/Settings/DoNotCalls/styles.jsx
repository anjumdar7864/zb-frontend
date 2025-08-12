import theme from "@/theme";
import styled from "@emotion/styled";

export const DoNotCallsStyled = styled.div`
  padding: 2rem 4rem 2rem;
  display: grid;
  gap: 2.5rem;
  background-color: #F7F7F7;
  min-height: calc(100vh - 7rem);
  min-height: calc(100svh - 7rem);
  align-content: start;

  & > .top {
    display: grid;
    justify-content: space-between;
    grid-template-columns: auto auto;
    gap: 2rem;

    & > .left {
        display:flex;
        align-items:center;
        flex-direction:row;
      & > .right{
        & > .bottom{
          position:relative;
          & > input {
            border-radius: 0.6rem;
            outline: none;
            padding: 1.2rem 1.3rem 1.2rem 3rem;
            background-color: white;
            font-size: 1rem;
            border: 0.1rem solid #d8d8d8;
            width: 23rem;
            transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;
          }

          & > button{
            top:1.1rem;
            left:0.9rem;
            position:absolute;
          }
        }
      }
    }

    & > .right {
      display: flex;
      gap: 1.3rem;
      justify-items: end;
      padding-top: 1.4rem;
      & > .top {
        & > button {
          display: grid;
          align-items: center;
          justify-content: center;
          grid-template-columns: auto auto;
          gap: 0.7rem;
          background-color:#00BD82;
          transition: background-color 300ms;
          padding: 1rem;
          border-radius: 0.6rem;
          border:1px solid #00BD82;



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
            background-color: white;
            border:1px solid #00BD82;
            & > .text {
              font-size: 1.1375rem;
              color: #00BD82;
            }
            & > .icon {
              font-size: 0.9rem;
              line-height: 0;
              color: #00BD82;
            }

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
        justify-content: end;
        & > input {
          border-radius: 0.6rem 0 0 0.6rem;
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
          border-radius: 0 0.6rem 0.6rem 0;
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
  & > .TableTop{
    padding:2rem;
    background:white;
    border:1px solid #E0E0E0;
    border-radius:0.6rem;
    & > .table {
      display: grid;
      width: ${(p) => p.tableWidth}px;
      overflow-x: auto;
      border:1px solid #E0E0E0;
      border-radius:0.6rem;
      & > .row {
        display: grid;
        grid-template-columns: repeat(5, minmax(15rem, 1fr));
        gap: 1rem;
        padding: 1.3rem;
        align-items: center;
        background-color: white;

        & > h6 {
          justify-self: center;
          &:first-of-type {
            justify-self: start;
          }
          &:nth-of-type(2) {
            justify-self: start;
          }
          &:last-of-type {
            justify-self: end;
          }

          &.sort {
            display: grid;
            align-items: center;
            grid-template-columns: auto auto;
            gap: 0.3rem;
            cursor: pointer;
            position: relative;
            user-select: none;

            & > .text {
              font-size: 1.2rem;
              font-weight: 500;
          color:#012635;
            }

            &.select {
              color: #6867dd;
            }
          }

          &.data {
            color: #49515b;
            font-size: 1.3rem;
            font-weight: 600;
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
`;

export const TableRowStyled = styled.div`
  background-color: #fff;
  row-gap: 0 !important;
  border-top:1px solid #E0E0E0;
  & > .col {
    justify-self: center;

    &:first-of-type {
      justify-self: start;
    }
    &:nth-of-type(2) {
      justify-self: stretch;
    }
    &:last-of-type {
      justify-self: end;
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
      & > p {
        display: grid;
        grid-template-columns: auto auto;
        gap: 0.65rem;
        align-items: center;
        justify-content: start;

        & > .icon {
          color: #7985e3;
          font-size: 1rem;
          line-height: 0;
        }
        & > .text {
          color: #7985e3;
          font-size: 1.3rem;
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

      & > button {
        display: inline-block;
        color: #a6a8b7;
        border-radius: 50%;
        height: 2.6rem;
        width: 2.6rem;
        font-size: 1.1rem;
        text-align: center;
        background: #fff;
        line-height: 0;
        transition: all 300ms ease-in-out;

        &:hover {
          background-color: #dedfe6;
        }
      }
    }
  }

  &:hover > .actions {
    left: 0rem;
    opacity: 1;
  }
`;

export const AddNewDncModalStyled = styled.form`
  width: 95vw;
  max-width: 40rem;
  background-color: #fff;
  border-radius:0.8rem;
  & > .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    padding: 0.8rem 1.95rem;
    border-bottom:1px solid #F0F0F0;
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
        font-size: 1.5rem;
        color: #012635;
        font-weight: 500;
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
    flex-direction:column;
      & > .left > span {
        color: #212529;
        font-weight: 500;
        font-size: 1.1rem;
      }

      & > .right {
        border:1px solid #D3D7DD;
        height:4rem;
        margin-top:0.8rem;
        border-radius:0.8rem;
        display:flex;
        align-items:center;
        &.input {
          display: grid;
          gap: 0.3rem;

          & > input {
            padding: 1.1rem 1.5rem;
            border: 0.1rem solid #c1c4cc;
            color: #575962;
            background-color: transparent;
            outline: none;
            border-radius: 0.35rem;
            transition: background-color 300ms, color 300ms, border-color 300ms;
            font-size: 1.3rem;
            font-size: 1.3rem;
            width: 100%;

            &:focus {
              border-color: #716aca;
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




  & > .bottom2 {
    border-top:1px solid #F0F0F0;
    padding: 1.2rem 1.95rem;
    display:flex;
    align-items:center;
    justify-content:end;
    & > .btn1{
      padding-inline:1.8rem;
      padding-block:0.8rem;
      background-color:transparent;
      border:1px solid #777777;
      border-radius:0.8rem;
      color:#777777;
    }
    & > .btn2{
      padding-inline:1.8rem;
      padding-block:0.8rem;
      background-color:#00BD82;
      margin-left:1rem;
      border:1px solid #00BD82;
      border-radius:0.8rem;
      color:white;
    }
  }
`;

export const ImportModalStyled = styled.div`
  width: 95vw;
  max-width: 54.6rem;
  background-color: #fff;
  padding-top:1.5rem;
  border-radius:1rem;
  box-shadow:0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12);
  & > .top {
    padding: 1.3rem;
    & > h2 {
      color: #212529;
      font-size: 1.625rem;
      font-weight: 500;
    }
  }
  & > .middle {
    padding: 1rem;

    & > .center {
      display: grid;
      justify-items: center;
      gap: 1rem;
      border: dashed 1px var(--shades-black-shade-black-20, rgba(0, 0, 0, 0.20));
      border-radius:1rem;
      padding:0.8rem;
      border-radius:0.8rem;
      & > input {
        display: none;
      }

      & > p {
        display: flex
        align-items: center;
        justify-content:start;
        cursor: pointer;
        gap: 16px;
        border-radius: 16px;
        padding: 20px;
        background-color: #D6E7FC;
        transition: background-color 0.3s ease;
        width:100%;
        & > .text {
          font-size: 16px;
          font-weight: 500;
          line-height: 24px;
          color: #012635;
        }
      }

      & > span {
        color: #212529;
        font-size: 1.2rem;
        height: 84px;
        padding: 24px;
        display: flex;
        align-items: center;
        justify-content:start;
        cursor: default;
        width:100%;
        color: #777777;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
      }
    }
  }

  & > .bottom {
    padding: 1.3rem;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    justify-content: space-between;
    padding-top:0rem;
    & > a {
      color: #5768dd;
      font-weight:500;
      outline:none;
      &:hover {
        text-decoration: none;
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

export const MatchingModalStyled = styled.div`
  width: 95vw;
  max-width: 68.6rem;
  background-color: #fff;
  border-radius:0.8rem;
  box-shadow:0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12);
  & > .top {
    padding: 1rem;
    & > h2 {
      color: #212529;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 600;
      font-size: 18px;
      line-height:30px
    }

    & > p {
      color: rgb(119, 119, 119);
      font-size: 14px;
      font-weight: 500;
    }
  }

  & > .middle {
    padding: 1rem 0rem;

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
          background-color: rgb(241, 243, 248);
          & > th {
            text-align: left;
            white-space: nowrap;
            padding: 0.3rem 1.6rem;
            color: rgb(1, 38, 53);
            font-size: 12px;
            line-height: 20px;
            font-weight: 500;

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
            padding:1rem 2rem;
            font-weight: 500;
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
              border: solid 1px #D3D7DD;
              border-radius: 8px;
              padding: 8px 12px;
              width: 260px;
              height: 48px;
              font-size: 1.1rem;
              color: #575962;
              background-color: transparent;
              outline: none;
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
                border:solid 1px #5BF1B2;
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
    padding: 1.3rem;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    justify-content: end;
    gap: 0.5rem;

    & > button {
      padding: 0.85rem 1.5rem;
      font-size: 1.1rem;
      border:0.1rem solid #c1c4cc;
      font-weight: 500;
      border-radius: 0.6rem;
      transition: background-color 0.3s ease-in-out;
      color:rgb(119, 119, 119);
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
        background-color: #00BD82;
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
          background-color:#00BD82;
        }
      }

      &:disabled {
        cursor: not-allowed;
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


export const InitialTemplateStyled = styled.div`
  // padding: 1.3rem 1.3rem 3rem;
  // display: grid;
  display: flex;
  flex-direction: column ; 
  gap: 2.5rem;
  // background-color: #f2f3f8;
  // background-color: red;
  height:100% ; 
  // min-height: calc(100vh - 7rem);
  // min-height: calc(100svh - 7rem);
  align-content: start;

  & > .top {
    display: grid;
    justify-content: space-between;
    grid-template-columns: auto auto;
    gap: 1.5rem;
    padding:2rem 40px 0px;
    & > .left {
        display:flex;
        align-items:center;
        flex-direction:row;
      & > .right{
        & > .bottom{
          position:relative;
          & > input {
            border-radius: 0.6rem;
            outline: none;
            padding: 1.2rem 1.3rem 1.2rem 3rem;
            background-color: white;
            font-size: 1rem;
            border: 0.1rem solid #d8d8d8;
            width: 23rem;
            transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;
          }

          & > button{
            top:1.1rem;
            left:0.9rem;
            position:absolute;
          }
        }
      }
    }

    & > .right {
      display: flex;
      gap: 1.3rem;
      justify-items: end;
      & > .top {
        & > button {
          display: grid;
          align-items: center;
          justify-content: center;
          grid-template-columns: auto auto;
          gap: 0.7rem;
          background-color:#00BD82;
          transition: background-color 300ms;
          padding: 1rem;
          border-radius: 0.6rem;
          border:1px solid #00BD82;



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
            background-color: white;
            border:1px solid #00BD82;
            & > .text {
              font-size: 1.1375rem;
              color: #00BD82;
            }
            & > .icon {
              font-size: 0.9rem;
              line-height: 0;
              color: #00BD82;
            }

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
        justify-content: end;
        & > input {
          border-radius: 0.6rem 0 0 0.6rem;
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
          border-radius: 0 0.6rem 0.6rem 0;
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
  & > .divOverlay {
    background-color:white ; 
    border-radius:8px ; 
    border: solid 1px #E0E0E0 ; 
        margin:0px 40px;
    & > .bottom {
        max-width:100%;
        overflow:auto;
        background-color:white ; 
        border-radius:8px ; 
        border: solid 1px #E0E0E0 ; 
          
        ${theme.queryStatement(theme.breakpoints.tab)} {
        /* margin:0px 20px; */
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
          minmax(310px, 1.3fr)
          minmax(310px, 1.5fr)
          minmax(310px, 1.5fr)
          minmax(188px, 1.5fr)
          minmax(122px, 0.5fr);
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
              font-size:14px ;
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
                justify-content: center;
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