import theme from "@/theme";
import styled from "@emotion/styled";
import { LightTooltip } from "@/components/common";
import color from "@/styles/color";

export const InboxMainStyled = styled.div`
  //   padding: 12px;
  // background-color:blue ;
  height: 100%;
  overflow: auto;
  & > div {
    display: grid;
    position: relative;
    overflow: auto;
    height: 100%;
    /* overflow-x: hidden; */
    /* ${theme.queryStatement(theme.breakpoints.xxllgg)} {
      display: flex;
    } */
    ${theme.queryStatement(theme.breakpoints.xxllg)} {
      display: flex;
    }
    & > * {
      &:nth-child(2) {
        
        /* ${theme.queryStatement(theme.breakpoints.xxllgg)} {
          position: absolute;
          width: 100%;
        } */
          ${theme.queryStatement(theme.breakpoints.xxllg)} {
   min-width: 510px;
   width: 100%;
        }
        ${theme.queryStatement(theme.breakpoints.tab)} {
          position: absolute;
          width: 100%;
        }
      }
    }
  }
`;

export const InboxStyled = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  // background-color:red;
  // padding:12px;
  flex-direction: column;
  & > .top {
    /* display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    padding: 24px 40px;
    & > .left > h1 {
      /* font-size: 2.1rem;
      font-weight: 400;
      color: black; */
      line-height: 1.6em;
      font-size: 32px;
      font-weight: 700;
      color: #012635;
    }
    & > div {
 

        & > .rightFilter{
        }
       
      & > .right {
        display: flex;
        // grid-template-columns: auto auto;
        border: 1px solid #d3d7dd;
        border-radius: 8px;
        height: 48px;
        width: 250px;
        ${theme.queryStatement(theme.breakpoints.xxllg)} {
          width: 46px;
overflow: hidden;
transition: width 0.3s ease;
           :hover{
            width: 250px;
          

}
        }

        ${theme.queryStatement(theme.breakpoints.tab)} {
          width: 250px;


        }

        & > input {
         
          border-radius: 8px;
          outline: none;
          // padding: 0.9rem 1.3rem;
  
          
          font-size: 14px;
          font-weight: 400;
          border: 0;
          outline: none;
          color: #858585;
          // width: 30rem;
          transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;

          /* ${theme.queryStatement(theme.breakpoints.xxllg)} {
          display: none;
          & :hover{
          display: block;
}
        } */
          &::placeholder {
            color: #858585;
            font-size: 1.1rem;
            font-weight: 400;
          }
          &:focus {
            border-color: #384ad7;
            background-color: #fff;
          }

          ${theme.queryStatement(theme.breakpoints.md)} {
            width: 100%;
          }
        }

        & > button {
          border-radius: 0 1.2rem 1.2rem 0;
          display: grid;
          width: 3.6rem;
          align-items: center;
          justify-content: center;
          color: #012635;
          // background-color: #36a3f7;
          font-size: 22px;
          transition: background-color 300ms;
          min-width: 46px;
          &:hover {
            /* background-color: #1192f6; */
          }
        }
      }

    
    }

    ${theme.queryStatement(theme.breakpoints.sm)} {
      flex-direction: column;
      align-items: start;
      justify-content: start;
      gap: 16px;
      padding: 16px;
    }
  }
  & > .bottom {
    display: flex;
    flex-direction: column;
    align-content: start;
    flex-grow: 1;
    overflow: auto;
    gap: 1.5rem;
    padding: 24px 40px;
    ${theme.queryStatement(theme.breakpoints.sm)} {
      padding: 0px 16px;
      gap: 0;
      padding-bottom: 10px;
    }

    & > .top {
      padding: 24px 0px;
      & > .top {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 0.5rem;

        & > * {
          ${theme.queryStatement(theme.breakpoints.sm)} {
            flex: 0 0 calc(30% - 20px);
          }
        }
        & > * {
          color: #858585;
          font-weight: 500;
          &:first-child {
            padding: 0rem;
            padding: 0.45rem 0rem;
          }
        }

        & > div,
        button {
          cursor: pointer;
          gap: 0.4rem;
          padding: 0.4rem 0.6rem;
          border-radius: 0.4rem;
          grid-template-columns: auto auto;
          transition: background-color 300ms ease-in-out;
          display: flex;
          align-items: center;

          & > .icon {
            font-size: 1.1rem;
            color: #858585;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          & > .text {
            color: #858585;
            font-size: 1.2rem;
            font-weight: 400;
          }

          &:hover {
            background-color: #dedfe7;
          }

          &.selected {
            & > .icon {
              color: #36a3f7;
            }
            & > .text {
              color: #36a3f7;
            }
          }

          &.remainder {
            background-color: #fff;
            padding-right: 0.7rem;
            & > .icon {
              font-size: 1.3rem;
              color: #858585;
            }

            &:hover {
              background-color: transparent;
            }

            &.open {
              background-color: #5867dd;
              & > .icon {
                color: #fff;
                transform: rotate(180deg);
              }
              & > .text {
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
        display: flex;
        align-items: center;
        ${theme.queryStatement(theme.breakpoints.xxllg)} {
          flex-direction: column;
          align-items: start;
        }

        & > h6 {
          font-weight: 400;
          color: #858585;
          font-size: 1.2rem;
          margin-right: 0.8rem;
          ${theme.queryStatement(theme.breakpoints.xxllg)} {
            margin-bottom: 0.6rem;
            margin-right: 0rem;
          }
        }
        & > .right {
          /* display: flex;
          align-items: center;
          justify-content: start;
          gap: 0.8rem;
          flex-wrap: wrap;
          ${theme.queryStatement(theme.breakpoints.xlgg)} {
            justify-content: center;
            & > * {
              flex: 0 0 calc(32% - 20px);
            }
          }
          ${theme.queryStatement(theme.breakpoints.md)} {
            & > * {
              flex: 0 0 calc(35% - 10px);
            }
          }
          ${theme.queryStatement(theme.breakpoints.sm)} {
            justify-content: center;
            & > * {
              flex: 0 0 calc(35% - 20px);
            }
          } */

          & > section {
            display: inline-block;
            margin: 0.4rem;
            & > .item {
              padding: 0.3rem 12px;
              border-radius: 8px;
              display: flex;
              align-items: center;
              gap: 0.6rem;
              height: 32px;
              background-color: #f0f0f0;
              align-items: center;

              & > .icon {
                color: #9ba3ae;
                font-size: 1.3rem;
                line-height: 0;
              }
              & > .text {
                font-size: 14px;
                color: #012635;
                font-weight: 500;
                text-transform: capitalize;
                ${theme.queryStatement(theme.breakpoints.md)} {
                  font-size: 1.1rem;
                }
              }
              &:hover > div > button {
                display: block; /* Show the button on hover */
              }
              & > div {
                width: 20px;
                & > button {
                  color: #9ba3ae;
                  font-size: 1rem;
                  line-height: 0;
                  display: none;
                  cursor: pointer;
                }
              }
            }
          }

          & > button {
            margin: 0.3rem;
            line-height: 0;
            color: #939bd3;
            font-size: 1.5rem;
          }
        }
      }
    }
    & > .bottom {
      & > .paginationMobile {
        display: none;
        ${theme.queryStatement(theme.breakpoints.sm)} {
          display: flex;
          justify-content: space-between;
          background-color: white;
          align-items: center;
          padding: 0px 16px;
          padding-top: 10px;
          border-left: solid 1px #e0e0e0;
          border-right: solid 1px #e0e0e0;
        }
      }
      & > .paginationDesktop {
        display: flex;

        justify-content: space-between;
        border: solid 1px #e0e0e0;
        ${theme.queryStatement(theme.breakpoints.sm)} {
          justify-content: center;
          border-top: 0;
        }
        & > .desktopView {
          ${theme.queryStatement(theme.breakpoints.sm)} {
            display: none;
          }
        }
        & > .desktopViewTwo {
          display: flex;
          ${theme.queryStatement(theme.breakpoints.sm)} {
            display: none;
          }
        }
      }
      display: grid;
      align-content: start;
      // gap: 1.1rem;
      /* height: calc(100vh - 22rem); */
      overflow-y: auto;
      /* ${theme.queryStatement(theme.breakpoints.xxllg)} {
        height: calc(100vh - 25rem);
      }
      ${theme.queryStatement(theme.breakpoints.xlgg)} {
        height: calc(100vh - 31rem);
      }
      ${theme.queryStatement(theme.breakpoints.xlg)} {
        height: calc(100vh - 35rem);
      }
      ${theme.queryStatement(theme.breakpoints.sm)} {
        height: calc(100vh - 40rem);
      }
      ${theme.queryStatement(theme.breakpoints.sm)} {
        height: calc(100vh - 42rem);
      } */
      &::-webkit-scrollbar {
        width: 0.4rem;
      }

      &::-webkit-scrollbar-track {
        background-color: #fff;
      }

      &::-webkit-scrollbar-thumb {
        background: #dedfe7;
      }

      & > .top {
        transform-origin: center top;
      }
      & > .bottom {
        background-color: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        overflow: auto;

        &::-webkit-scrollbar {
          width: 0.6rem;
        }

        &::-webkit-scrollbar-track {
          background-color: #f1f1f1;
        }

        &::-webkit-scrollbar-thumb {
          background: #00bd82;
          border-radius: 5px;
        }

        &::-webkit-scrollbar-thumb:hover {
          background: #00bd82;
        }
        display: grid;
        align-content: start;
        gap: 2.1rem;
        & > .top {
          > .no-prospects {
            display: block;
            height: 15vh;
            text-align: center;
            position: relative;
          }
        }
        & > .bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          ${theme.queryStatement(theme.breakpoints.xlg)} {
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
  }
`;

export const StatusButtonDropdownStyled = styled.div`
  width: 20rem;
  max-height: 27rem;
  overflow-y: auto;
  display: grid;
  gap: 0.3rem;
  padding-top: 1.2rem !important;
  padding: 0.85rem;
  z-index: 1000;
  margin-top: -0.7rem;

  & > .one {
    display: grid;
    grid-template-columns: auto;
    gap: 0.65rem;
    align-items: center;
    padding: 0.4rem 0.9rem;
    border-radius: 0.4rem;
    grid-template-columns: auto 1fr;
    transition: background-color 300ms ease-in-out;
    background-color: #36a3f7;
    border: 0.1rem solid #36a3f7;
    text-align: left;

    & > .icon {
      font-size: 1rem;
      color: #fff;
      line-height: 0;
    }
    & > .text {
      color: #fff;
      font-size: 1.3rem;
      font-weight: 300;
    }

    &:hover {
      background-color: #2296d5;
    }
  }

  & > .two {
    display: grid;
    grid-template-columns: auto;
    gap: 0.65rem;
    align-items: center;
    padding: 0.4rem 0.9rem;
    border-radius: 0.4rem;
    grid-template-columns: auto 1fr;
    transition: background-color 300ms ease-in-out;
    background-color: transparent;
    text-align: left;
    border: 0.1rem solid #2296d5;

    & > .icon {
      font-size: 1rem;
      color: #2296d5;
      line-height: 0;
    }
    & > .text {
      color: #2296d5;
      font-size: 1.3rem;
      font-weight: 300;
    }

    &:hover {
      background-color: #f6f6f6;
    }
  }
`;

export const CampaignsButtonDropdownStyled = styled.div`
  width: 20rem;
  max-height: 27rem;
  overflow-y: auto;
  display: grid;
  position: absolute;
  gap: 0.3rem;
  padding-top: 1.2rem !important;
  padding: 0.85rem;
  z-index: 1000;
  margin-top: -0.7rem;
  left: -2rem;
  background-color: white;
  border-radius: 0.5rem;
  & > .top > input {
    padding: 0.65rem 1.1rem;
    border: 0.1rem solid #c1c4cc;
    color: #575962;
    background-color: transparent;
    outline: none;
    border-radius: 0.35rem;
    transition: background-color 300ms, color 300ms, border-color 300ms;
    font-size: 1.1rem;
    width: 100%;

    &:focus {
      border-color: #716aca;
      color: #575962;
      background-color: #fff;
    }
  }

  & > .bottom {
    display: grid;
    & > button {
      padding: 0.4rem 0.9rem;
      border-radius: 0.4rem;
      text-align: left;
      transition: background-color 300ms ease-in-out;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: grid;
      align-items: center;
      grid-template-columns: 1fr;
      gap: 0.65rem;

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
  }
`;

export const UsersButtonDropdownStyled = styled.div`
  width: 20rem;
  max-height: 27rem;
  overflow-y: auto;
  display: grid;
  position: absolute;
  gap: 0.3rem;
  padding-top: 1.2rem !important;
  padding: 0.85rem;
  z-index: 1000;
  margin-top: -0.7rem;
  /* left: -2.5rem; */
  background-color: white;
  border-radius: 0.5rem;
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

  & > .top > input {
    padding: 0.65rem 1.1rem;
    border: 0.1rem solid #c1c4cc;
    color: #575962;
    background-color: transparent;
    outline: none;
    border-radius: 0.35rem;
    transition: background-color 300ms, color 300ms, border-color 300ms;
    font-size: 1.1rem;
    width: 100%;

    &:focus {
      border-color: #716aca;
      color: #575962;
      background-color: #fff;
    }
  }

  & > .bottom {
    display: grid;
    & > button {
      padding: 0.4rem 0.9rem;
      border-radius: 0.4rem;
      text-align: left;
      transition: background-color 300ms ease-in-out;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: grid;
      align-items: center;
      grid-template-columns: 1fr;
      gap: 0.65rem;

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
  }
`;

export const TagsButtonDropdownStyled = styled.div`
  width: 20rem;
  max-height: 27rem;
  overflow-y: auto;
  display: grid;
  position: absolute;
  gap: 0.3rem;
  padding-top: 1.2rem !important;
  padding: 0.85rem;
  z-index: 1000;
  margin-top: -0.7rem;
  left: 0.5rem;
  background-color: white;
  border-radius: 0.5rem;

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

  & > button {
    padding: 0.4rem 0.9rem;
    border-radius: 0.4rem;
    text-align: left;
    transition: background-color 300ms ease-in-out;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr;
    gap: 0.65rem;

    & > .icon {
      display: block;
      background-color: var(--color);
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }

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
      grid-template-columns: auto 1fr auto;
      background-color: #36a3f7;
      & > .text {
        color: #fff;
      }

      & > .dash {
        display: grid;
      }
    }
  }
`;

export const MessageItemStyled = styled.div`
  border-top: 0.1rem solid #dbdada;
  background-color: white;
  padding: 16px;
  display: grid;
  align-content: start;
 

  &:last-of-type {
    border-bottom: 0.1rem solid #dbdada;
  }

  // border-left: 0.25rem solid #36a3f7;
  // margin-left: 0.3rem;
  /* transform: scale(1.01,1.04); */

  ${(p) =>
    p.selected
      ? `
    background: #F7F7F7 !important;
    transition: .3s ease-in-out;
    border-left: 0.25rem solid #00BD82;
    // box-shadow: 0 0 12px #32323266;
  
  `
      : ""}

  & > .top {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;

    & > div {
      & > .left {
        /* padding-bottom: 1rem; */

        & > .items {
          display: grid;
          grid-template-columns: auto auto auto auto auto auto;
          gap: 8px;
          justify-content: start;
          align-items: center;

          & > button {
            display: grid;
            align-items: center;
            justify-items: center;
            color: #fff;
            width: 30px;
            height: 30px;
            border-radius: 8px;
            background-color: var(--color);
            font-size: 1.3rem;
          }
          & > h6 {
            color: #393939;
            font-size: 1.3rem;
            font-weight: 500;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          & > .tag {
            padding: 2px 8px;
            /* border: 0.5px solid #efefef; */
            background-color: var(--color);
            font-size: 12px;
            /* letter-spacing: 0.5px; */
            color: #393939;
            font-weight: 500;
            /* border-left: 0.2rem solid var(--color); */
            border-radius: 12px;
          }
        }
        & > .hoverItems {
          display: grid;
          grid-template-columns: repeat(8, auto);
          gap: 0.65rem;
          justify-content: start;
          align-items: center;

          & > .tag {
            padding: 0.13rem 8px;
            /* border: 0.5px solid #efefef; */
            background-color: var(--color);
            /* border-left: 0.2rem solid var(--color); */
            color: "white";
            border-radius: 12px;
          }

          & > button {
            display: grid;
            align-items: center;
            justify-items: center;
            color: #ccc;
            width: 30px;
            height: 30px;
            border-radius: 8px;
            background-color: var(--background);
            font-size: 1.3rem;
            // border: 0.1rem solid #ccc;
            transition: background-color 300ms ease-in-out;

            &:hover {
              /* background-color: #cccccc74; */
            }

            &.selected {
              background-color: var(--color);
              color: #fff;
              border-color: var(--color);
              transition: opacity 300ms ease-in-out;

              &:hover {
                opacity: 0.8;
              }
            }

            &.noStatus {
              background-color: var(--color);
              color: #fff;
              border-color: var(--color);
              transition: opacity 300ms ease-in-out;
            }
          }
        }
      }
    }

    & > .right {
      /* display: grid;
      grid-template-columns: auto auto auto auto auto;
      gap: 0.65rem; */
      /* background-color: green; */
      display: flex;
      align-items: center;
      gap: 12px;
      justify-content: flex-end;
  
      & > span {
        font-size: 1.2rem;
        color: #858585;
        font-weight: 400;
        & > button {
          font-size: 1.5rem;
          color: #aaa;
          line-height: 0;
          transition: color 300ms ease-in-out;

          &:hover {
            color: #878686;
          }

          &.added {
            color: #5867dd;

            &:hover {
              color: #384ad7;
            }
          }
        }
      }
    }
  }
  & > .bottom {
    display: grid;
    grid-template-columns: 1fr auto;
    column-gap: 1rem;
    align-items: center;
    & > * {
      &:first-child {
        display: flex;
        align-items: start;
        justify-content: flex-start;
        flex-direction: column;
        gap: 0.2rem;
      }
      &:last-child {
        display: flex;
        align-items: end;
        justify-content: flex-end;
        flex-direction: column;
        /* gap: 0.2rem; */
        & > * {
          &:last-child {
            & > * {
              &:last-child {
                margin-right: -0.7rem;
              }
            }
          }
        }
      }
    }

    > div {
      & > .message {
        display: grid;
        gap: 0.65rem;
        grid-template-columns: auto 1fr;
        align-items: center;
        border-radius: 5px;
        transition: background-color 300ms ease-in-out;
        cursor: pointer;
        padding: 0.13rem;
        width: 100%;

        &:hover {
          background-color: #f1f2fb;
        }
        /* ${theme.queryStatement(theme.breakpoints.xlg)} {
          display: none;
        } */
        & > .dot {
          display: block;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background-color: #eeeffb;
          transition: background-color 300ms ease-in-out;
        }

        &:hover > .dot {
          background-color: ${color.CornflowerBlue};
        }

        & > .dot.unread-yellow {
          background-color: ${color.UnreadColorYellow};
          box-shadow: 0 0 ${color.UnreadColorYellow};
          animation: pulse-red 2s infinite;
        }
        & > .dot.unread-blue {
          background-color: ${color.UnreadColorBlue};
          box-shadow: 0 0 ${color.UnreadColorBlue};
          animation: pulse-red 2s infinite;
        }
        & > .dot.unread-red {
          background-color: ${color.UnreadColorRed};
          box-shadow: 0 0 ${color.UnreadColorRed};
          animation: pulse-red 2s infinite;
        }

        @keyframes pulse-red {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 #ff5252b3;
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 6px #ff525200;
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 #ff525200;
          }
        }

        & > p {
          font-size: 16px;
          font-weight: 500;
          color: #777777;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &.unread {
            font-weight: 400;
            color: #777777;
          }
        }
      }

      & > a {
        /* display: none;
        ${theme.queryStatement(theme.breakpoints.xlgg)} {
          display: block;
        } */
        & > .message {
          display: grid;
          gap: 0.65rem;
          grid-template-columns: auto 1fr;
          align-items: center;
          border-radius: 5px;
          transition: background-color 300ms ease-in-out;
          cursor: pointer;
          padding: 0.13rem;

          &:hover {
            background-color: #f1f2fb;
          }

          & > .dot {
            display: block;
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            background-color: #eeeffb;
            transition: background-color 300ms ease-in-out;
          }

          &:hover > .dot {
            background-color: ${color.CornflowerBlue};
          }

          & > .dot.unread-yellow {
            background-color: ${color.UnreadColorYellow};
            box-shadow: 0 0 ${color.UnreadColorYellow};
            animation: pulse-red 2s infinite;
          }
          & > .dot.unread-blue {
            background-color: ${color.UnreadColorBlue};
            box-shadow: 0 0 ${color.UnreadColorBlue};
            animation: pulse-red 2s infinite;
          }
          & > .dot.unread-red {
            background-color: ${color.UnreadColorRed};
            box-shadow: 0 0 ${color.UnreadColorRed};
            animation: pulse-red 2s infinite;
          }

          @keyframes pulse-red {
            0% {
              transform: scale(0.95);
              box-shadow: 0 0 #ff5252b3;
            }
            70% {
              transform: scale(1);
              box-shadow: 0 0 0 6px #ff525200;
            }
            100% {
              transform: scale(0.95);
              box-shadow: 0 0 #ff525200;
            }
          }

          & > p {
            font-size: 1.2rem;
            color: #333;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &.unread {
              font-weight: 600;
            }
          }
        }
      }

      & > .moreOptions {
        justify-self: end;
        display: grid;
        & > button {
          color: #212529;
          opacity: 0.5;
          transition: opacity 300ms ease-in-out;

          &:hover {
            opacity: 0.7;
          }
        }
      }
      & > .phone {
        padding-right: 1rem;
        display: flex;
        align-items: center;
        justify-content: end;
        gap: 0.3rem;

        & > span {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: #212529;
          opacity: 0.5;
          width: fit-content;
          width: 15px;
          height: 20px;
          border-radius: 0.2rem;
          cursor: pointer;

          &:hover {
            background-color: #d8d8d8;
            opacity: 0.8;
          }

          &.verified {
            background-color: #43cd80;
          }

          &.dnc {
            background-color: #f4516c;
          }

          &.wrong {
            position: relative;
            &::after {
              font-family: "Font Awesome 5 Free";
              content: "!";
              position: absolute;
              margin-right: 0rem;
              margin-top: -0.2rem;
              z-index: 1001;
              font-size: 1.3rem;
              color: #e52935;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
`;

export const MoreOptionsStyled = styled.div`
  width: 13rem;
  display: grid;
  align-content: start;

  & > button {
    padding: 0.78rem 0.65rem;
    font-size: 14px;
    color: #012635;
    font-weight: 300;
    transition: background-color 300ms ease-in-out, opacity 300ms ease-in-out;
    text-align: left;
    font-family: "Inter";

    &:not(:disabled):hover {
      background: rgba(88, 103, 221, 0.1);
    }

    &:disabled {
      opacity: 0.65;
      cursor: not-allowed;
    }
  }
`;

export const RemainderTableStyled = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 2.8rem;
  display: grid;
  /* gap: 0.65rem; */
  border: 1px solid #e0e0e0;
  & > .paginationMobile {
    display: none;
    ${theme.queryStatement(theme.breakpoints.sm)} {
      display: flex;
      justify-content: space-between;
      background-color: white;
      align-items: center;
      padding: 0px 16px;
      padding-top: 10px;
      border-left: solid 1px #e0e0e0;
      border-right: solid 1px #e0e0e0;
    }
  }

  & > .paginationDesktop {
    display: flex;

    justify-content: space-between;
    border: solid 1px #e0e0e0;
    ${theme.queryStatement(theme.breakpoints.sm)} {
      justify-content: center;
      border-top: 0;
    }
    & > .desktopView {
      ${theme.queryStatement(theme.breakpoints.sm)} {
        display: none;
      }
    }
    & > .desktopViewTwo {
      display: flex;
      ${theme.queryStatement(theme.breakpoints.sm)} {
        display: none;
      }
    }
  }

  & > h2 {
    display: flex;
    align-items: center;
    justify-content: start;
    grid-template-columns: auto auto;
    gap: 8px;
    margin-bottom: 8px;
    & > .icon {
      font-size: 1.5rem;
      color: white;
      line-height: 0;
      background-color: #74b5ff;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
    }
    & > .text {
      font-size: 20px;
      color: #012635;
      font-weight: 600;
      opacity: 0.8;
    }
  }

  & > .overflow {
    overflow-x: auto;
    display: grid;

    border: 1px solid #e0e0e0;
    border-bottom: 0px;
    border-radius: 8px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
    & > table {
      border-spacing: 0;
      border-collapse: collapse;
      width: 100%;

      & > thead > tr {
        /* background-color: #f4f5f8; */
        border-bottom: solid 1px #e0e0e0;
        & > th {
          padding: 0.975rem;
          color: #012635;
          font-size: 14px;
          text-align: left;
          font-weight: 500;
          white-space: nowrap;

          &:first-of-type {
            text-align: left;
          }
          &:last-of-type {
            text-align: left;
            width: 10%;
          }

          width: 20%;

          &:nth-of-type(3) {
            width: 20%;
          }
        }
      }

      & > tbody > tr {
        &:nth-of-type(2n) {
          background-color: #f4f5f899;
        }

        & > td {
          padding: 0.975rem;
          color: #575962;
          font-size: 1.107rem;
          text-align: left;
          font-weight: 400;
          white-space: nowrap;
          // max-width: 20rem;
          overflow: hidden;
          text-overflow: ellipsis;

          &:first-of-type {
            text-align: left;
          }
          &:last-of-type {
            text-align: right;
          }

          & > div {
            width: 40rem;
            display: flex;
            padding-right: 0.5rem;
            background-color: #d6d6d6;
            border-bottom-left-radius: 5px;
            border-top-left-radius: 5px;
            justify-content: center;
            align-items: center;

            & > textarea {
              border-color: #ebedf2;
              color: #575962;
              width: 28rem;
              height: auto;
              font-size: 1.2rem;
              padding: 0.3rem;
              margin: 1px 0;
            }

            & > button {
              align-items: center;
              justify-content: center;
              gap: 0.7rem;
              background-color: #36a3f7;
              transition: background-color 300ms;
              padding: 0.65rem 1rem;
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
                // background-color: #384ad7;
              }
            }

            & > .crossButton {
              align-items: center;
              justify-content: center;
              margin-left: 5px;
              transition: background-color 300ms;
              padding: 0.65rem 1rem;
              border-radius: 0.5rem;
              background-color: white;

              & > .icon {
                font-size: 1.3rem;
                line-height: 0;
                color: #575962;
              }
            }
          }

          & > button {
            font-size: 1.1rem;
            color: #666;
            border-radius: 2rem;
            border: 2px solid #666;
            padding: 0.3rem 0.5rem 0.2rem 0.5rem;
            &:hover {
              background: #ccc;
            }

            &:not(:last-of-type) {
              margin-right: 0.65rem;
            }
          }

          &.error {
            font-size: 1.3rem;
            color: #211529;
            opacity: 0.8;
            text-align: center;
          }
        }
      }
    }
  }
`;

export const RightSideStyled = styled.div`
  height: 100%;
  & > .desktop-rightSide {
    position: relative;
    display: grid;
    // grid-template-columns: 1fr 1fr;
    /* ${theme.queryStatement(theme.breakpoints.xxllgg)} {
      display: none;
    } */
    ${theme.queryStatement(theme.breakpoints.tab)} {
      display: none;
    }
  }

  & > .mobile-chatBox-show {
    display: flex;
    position: relative;
    & > * {
      &:first-child {
        width: 100%;
        display: none;
        z-index: 10;
        position: absolute;
        /* ${theme.queryStatement(theme.breakpoints.xxllgg)} {
          display: block;
        } */
        ${theme.queryStatement(theme.breakpoints.tab)} {
          display: block;
        }
      }
    }

    & > .mobile-prospect-show {
      display: none;
      width: 65%;
      position: absolute;
      z-index: 10000;
      /* ${theme.queryStatement(theme.breakpoints.xxllgg)} {
        display: block;
      } */
      ${theme.queryStatement(theme.breakpoints.xxllg)} {
        display: block;
      }
    }
  }
`;

// export const ChatBoxStyled = styled.div`
//   display: grid;
//   grid-template-rows: auto 1fr auto;
//   grid-template-columns: 1f;
//   height: calc(100vh - 7.4rem);
//   height: calc(100svh - 7.4rem);
//   border: 1px solid #d8d8d8;
//   background-color: white;
//   ${theme.queryStatement(theme.breakpoints.xxllgg)} {
//     height: calc(100vh - 12.8rem);
//     height: calc(100svh - 12.8rem);
//   }
//   ${theme.queryStatement(theme.breakpoints.md)} {
//     height: calc(100vh - 7rem);
//     height: calc(100svh - 7rem);
//   }

//   & > .top {
//     padding: 0.65rem 1rem;
//     border-bottom: 1px solid #dedfe7;
//     z-index: 3;
//     box-shadow: 0 0 6px #32323233;

//     & > .top {
//       display: grid;
//       grid-template-columns: auto auto;
//       align-items: center;
//       justify-content: space-between;
//       gap: 1.1rem;
//       padding-bottom: 0.7rem;

//       & > .left {
//         & > .items {
//           /* display: grid;
//           grid-template-columns: auto auto auto;
//           gap: 0.65rem;
//           justify-content: start;
//           align-items: center; */
//           display: flex;
//           align-items: center;
//           gap: 1rem;

//           & > button {
//             display: grid;
//             align-items: center;
//             justify-items: center;
//             color: #fff;
//             width: 2.2rem;
//             height: 2.2rem;
//             border-radius: 50%;
//             background-color: var(--color);
//             font-size: 1.3rem;
//           }
//           & > h6 {
//             color: #393939;
//             font-size: 1.3rem;
//             font-weight: 500;
//             display: block;
//             overflow: hidden;
//             text-overflow: ellipsis;
//             white-space: nowrap;
//           }
//         }
//         & > .hoverItems {
//           display: grid;
//           grid-template-columns: repeat(7, auto);
//           gap: 0.65rem;
//           justify-content: start;
//           align-items: center;

//           & > button {
//             display: grid;
//             align-items: center;
//             justify-items: center;
//             color: #ccc;
//             width: 2.2rem;
//             height: 2.2rem;
//             border-radius: 50%;
//             font-size: 1.3rem;
//             border: 0.1rem solid #ccc;
//             transition: background-color 300ms ease-in-out;

//             &:hover {
//               background-color: #cccccc74;
//             }

//             &.selected {
//               background-color: var(--color);
//               color: #fff;
//               border-color: var(--color);
//               transition: opacity 300ms ease-in-out;

//               &:hover {
//                 opacity: 0.8;
//               }
//             }

//             &.noStatus {
//               background-color: var(--color);
//               color: #fff;
//               border-color: var(--color);
//               transition: opacity 300ms ease-in-out;
//             }
//           }
//         }
//       }
//       & > .right {
//         display: flex;
//         align-items: center;
//         gap: 1rem;

//         & > button {
//           color: #aaa;
//           line-height: 0;
//           transition: color 300ms ease-in-out;
//           & > * {
//             font-size: 1.4rem;
//           }
//           &:hover {
//             color: #878686;
//           }
//           &.added {
//             color: #5867dd;

//             &:hover {
//               color: #384ad7;
//             }
//           }
//         }

//         & > .btnIcon-for-mobile {
//           display: none;
//           ${theme.queryStatement(theme.breakpoints.xxllgg)} {
//             display: block;
//           }
//         }
//       }
//     }

//     & > .bottom {
//       display: grid;
//       grid-template-columns: 1fr 1fr 1fr;

//       & > button {
//         /* display: grid;
//         grid-template-columns: auto;
//         gap: 0.65rem;
//         align-items: center;
//         justify-content: center;
//         text-align: center; */
//         display: flex;
//         align-items: center;
//         gap: 0.6rem;
//         padding: 0.325rem 0.975rem;
//         border-radius: 100rem;
//         border: 0.1rem solid transparent;
//         transition: border-color 300ms ease-in-out,
//           background-color 300ms ease-in-out;
//         width: fit-content;
//         justify-self: center;

//         &:has(.icon) {
//           grid-template-columns: auto auto;
//         }

//         &:hover {
//           background-color: #f5f5f5;
//         }

//         & > .icon {
//           line-height: 0;
//           font-size: 1.5rem;
//           color: #aaa;
//           transition: color 300ms ease-in-out;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         & > .text {
//           color: #393939;
//           font-weight: 500;
//           font-size: 1.2rem;
//           transition: color 300ms ease-in-out;
//         }

//         &.block {
//           & > .icon {
//             color: #f4516c;
//           }
//         }
//         &.verified {
//           & > .icon {
//             color: #43cd80;
//             & > .red {
//               color: #f4516c;
//             }
//           }
//         }
//         &.cut {
//           & > .text {
//             text-decoration-line: line-through;
//           }
//         }
//         &.selected {
//           background: rgba(54, 163, 247, 0.1);
//           border: 1px solid #36a3f7;

//           &:hover {
//             background: rgba(54, 163, 247, 0.2);
//           }

//           & > .text {
//             color: #36a3f7;
//           }
//         }
//       }
//     }
//   }
//   & > .middle {
//     /* padding: 1.3rem; */
//     display: grid;
//     gap: 0.65rem;
//     align-content: start;
//     padding: 1rem;
//     overflow-y: auto;

//     &::-webkit-scrollbar {
//       width: 0.4rem;
//     }

//     &::-webkit-scrollbar-track {
//       background-color: #fff;
//     }

//     &::-webkit-scrollbar-thumb {
//       background: #dedfe7;
//     }

//     & > .item {
//       max-width: 100%;
//       display: grid;
//       gap: 0.2rem;
//       &.me {
//         justify-self: end;
//         & > p {
//           /* padding: 0.65rem 0.995rem; */
//           border-radius: 1rem;
//           padding: 1rem 1.3rem;
//           border-top-right-radius: 0;
//           background-color: #2f91e4;
//           color: #fff;
//           font-size: 1.2rem;
//           font-weight: 500;
//           justify-self: end;
//         }
//         & > span {
//           color: #393939cf;
//           font-size: 1.1rem;
//           font-weight: 500;
//           justify-self: end;
//         }
//       }
//       &.other {
//         justify-content: start;
//         & > p {
//           border-radius: 1rem;
//           padding: 1rem 1.3rem;
//           border-top-left-radius: 0;
//           background-color: #e1e3ee;
//           color: #393939;
//           font-size: 1.2rem;
//           font-weight: 500;
//           justify-self: start;
//         }
//         & > span {
//           color: #393939cf;
//           font-size: 1.1rem;
//           font-weight: 500;
//           justify-self: end;
//         }
//       }
//     }
//   }
//   & > .bottom {
//     & > * {
//       border-top: 0.1rem solid #d8d8d8;
//       padding: 0.8rem 0.5rem;
//     }
//     > .new-message {
//       display: grid;
//       background-color: #60aaf3;
//       opacity: 0.5;
//       margin: 0 14rem;
//       > button {
//         color: #fff;
//         line-height: 0;
//         display: grid;
//         grid-template-columns: auto auto;
//         align-items: center;
//         justify-content: center;
//       }
//     }
//     & > .top {
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       ${theme.queryStatement(theme.breakpoints.xxxlg)} {
//         flex-direction: column;
//       }
//       & > .left {
//         & > button {
//           padding: 0.585rem 1.04rem;
//           border-radius: 0.2rem;
//           transition: background 300ms ease-in-out;
//           display: flex;
//           align-items: center;
//           & > * {
//             &:first-child {
//               margin-right: 0.5rem;
//             }
//           }
//           cursor: default;
//           ${theme.queryStatement(theme.breakpoints.lg)} {
//             justify-content: center;
//             align-items: center;
//             width: 100%;
//           }
//           &:disabled {
//             opacity: 0.65;
//             cursor: not-allowed;
//           }

//           & > .icon {
//             font-size: 1.3rem;
//             line-height: 0;
//             color: #8d8d8d;
//           }

//           & > .text {
//             color: #000;
//             font-size: 1.13rem;
//             font-weight: 400;
//           }
//         }
//       }
//       & > .right {
//         display: grid;
//         align-items: center;
//         align-content: end;
//         justify-content: end;
//         gap: 0.65rem;
//         grid-template-columns: auto auto auto;

//         & > button {
//           padding: 0.4rem 0.6rem;
//           border-radius: 0.2rem;
//           background-color: #f0f0f0;
//           transition: background 300ms ease-in-out;
//           display: grid;
//           grid-template-columns: auto auto;
//           gap: 0.4rem;
//           align-items: center;
//           justify-content: center;

//           &:disabled {
//             opacity: 0.65;
//             cursor: not-allowed;
//           }

//           &:hover {
//             background-color: #d5d3d3;
//           }
//           & > .icon {
//             font-size: 1.1rem;
//             line-height: 0;
//             color: #8d8d8d;
//           }

//           & > .text {
//             color: #000;
//             font-size: 1.1rem;
//             font-weight: 500;
//             letter-spacing: 0.4px;
//           }

//           &.disabled {
//             opacity: 0.65;
//           }
//           &.verified {
//             background: linear-gradient(to right, #43cd80, #7bdca6);

//             &:hover {
//               background: linear-gradient(to right, #3fbe78, #74d19e);
//             }
//             & > .icon,
//             & > .text {
//               color: #fff;
//             }
//           }

//           &.wrong {
//             background: #f4516c;

//             &:hover {
//               background: #dc4861;
//             }
//             & > .icon,
//             & > .text {
//               color: #fff;
//             }
//           }

//           &.dnc {
//             background: #f4516c;

//             &:hover {
//               background: #dc4861;
//             }
//             & > .icon,
//             & > .text {
//               color: #fff;
//             }
//           }
//         }
//       }
//     }
//     & > .middle {
//       display: grid;
//       align-content: end;
//       gap: 0.2rem;

//       & > textarea {
//         width: 100%;
//         border-radius: none;
//         border: none;
//         background-color: transparent;
//         outline: none;
//         resize: none;
//         color: #363636;
//         font-weight: 500;
//         height: 5rem;
//         overflow-y: auto;
//         font-size: 1.15rem;

//         &::-webkit-scrollbar {
//           width: 0.4rem;
//         }

//         &::-webkit-scrollbar-track {
//           background-color: #fff;
//         }

//         &::-webkit-scrollbar-thumb {
//           background: #dedfe7;
//         }

//         &:disabled {
//           opacity: 0.65;
//           cursor: not-allowed;
//         }
//       }

//       & > .info {
//         justify-self: end;
//         font-style: italic;
//         font-size: 1.16rem;
//         color: #212529;
//       }
//     }
//     & > .bottom {
//       display: grid;
//       grid-template-columns: auto auto;
//       gap: 1rem;
//       align-items: center;
//       justify-content: space-between;

//       & > .left > button {
//         padding: 0.585rem 1.04rem;
//         border-radius: 0.2rem;
//         background-color: #f0f0f0;
//         transition: background 300ms ease-in-out;
//         &:hover {
//           background-color: #d5d3d3;
//         }
//         &:disabled {
//           opacity: 0.65;
//           cursor: not-allowed;
//         }
//       }

//       & > .right {
//         display: grid;
//         grid-template-columns: auto auto;
//         gap: 0.65rem;
//         align-items: center;
//         justify-content: end;

//         & > button {
//           padding: 0.585rem 1.04rem;
//           border-radius: 0.2rem;
//           background-color: #f0f0f0;
//           transition: background 300ms ease-in-out;
//           &:hover {
//             background-color: #d5d3d3;
//           }
//           &:disabled {
//             opacity: 0.65;
//             cursor: not-allowed;
//           }

//           & > .text {
//             color: #393939;
//             font-size: 1.2rem;
//             font-weight: 500;
//           }

//           &:has(.icon) {
//             display: grid;
//             grid-template-columns: auto auto;
//             gap: 0.65rem;
//             align-items: center;
//             justify-content: center;
//             background-color: #60aaf3;
//             &:hover {
//               background-color: #5096dd;
//             }

//             & > .icon {
//               font-size: 1.3rem;
//               line-height: 0;
//               color: #fff;
//             }

//             & > .text {
//               color: #fff;
//             }
//           }
//         }
//       }
//     }
//   }
// `;

export const ChatBoxStyled = styled.div`
  // padding:12px ;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1f;
  height: calc(100vh - 85px);
  /* height: calc(100svh - 7.4rem); */
  border-left: 1px solid #3086ee;
  background-color: white;
  /* ${theme.queryStatement(theme.breakpoints.xxllgg)} {
    height: calc(100vh - 85px);
    height: calc(100svh - 85px);
  } */
  ${theme.queryStatement(theme.breakpoints.xxllg)} {
    height: calc(100vh - 85px);
    height: calc(100svh - 85px);
  }
  ${theme.queryStatement(theme.breakpoints.md)} {
    height: calc(100vh - 7rem);
    height: calc(100svh - 7rem);
  }

  & > .top {
    padding: 16px 20px;
    padding-bottom: 0;
    border-bottom: 1px solid #dedfe7;
    z-index: 3;
    // box-shadow: 0 0 6px #32323233;

    & > .top {
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      justify-content: space-between;
      gap: 1.1rem;
      padding-bottom: 4px;

      /* ${theme.queryStatement(theme.breakpoints.xxllgg)} {
  display: block;

  } */
      ${theme.queryStatement(theme.breakpoints.xxllg)} {
        display: block;
      }

      & > div {
        & > .optionLayout {
        
          padding-top: 12px;
          ${theme.queryStatement(theme.breakpoints.xxllg)} {
            padding-top: 0px;
          }
          & > .detail {
            display: flex;
          }
          & > .close {
            display: none;
            /* ${theme.queryStatement(theme.breakpoints.xxllgg)} {
  display: flex;

  } */
            ${theme.queryStatement(theme.breakpoints.tab)} {
              display: flex;
            }
          }
        }
        /* ${theme.queryStatement(theme.breakpoints.xxllgg)} {
  display: flex;
  justify-content: space-between;
  padding: 8px 0px;
  padding-top: "0px";
  } */
        ${theme.queryStatement(theme.breakpoints.xxllg)} {
          display: flex;
          justify-content: space-between;
          padding: 8px 0px;
          padding-top: 0px;
        }

        ${theme.queryStatement(theme.breakpoints.sm)} {
          flex-direction: column;
          gap: 16px;
        }
        & > div{
          & > div {
          & > div {
     
     & > .left {
       & > .items {

         display: flex;
         align-items: center;
         gap: 1rem;

         & > button {
           display: grid;
           align-items: center;
           justify-items: center;
           color: #fff;
           width: 32px;
           height: 32px;
           border-radius: 6px;
           background-color: var(--color);

           font-size: 1.3rem;
         }
         & > h6 {
           color: #012635;
           font-size: 18px;
           font-weight: 600;
           display: block;
           overflow: hidden;
           text-overflow: ellipsis;
           white-space: nowrap;
         }
       }
       & > .hoverItems {
         display: grid;
         grid-template-columns: repeat(7, auto);
         gap: 0.65rem;
         justify-content: start;
         align-items: center;

         & > button {
           display: grid;
           align-items: center;
           justify-items: center;
           color: #ccc;
           width: 32px;
           height: 32px;
           border-radius: 8px;
           font-size: 18px;
           /* border: 0.1rem solid #ccc; */
           transition: background-color 300ms ease-in-out;
           background-color: var(--background);
           &:hover {
             /* background-color: #cccccc74; */
           }

           &.selected {
             background-color: var(--color);
             color: #fff;
             border-color: var(--color);
             transition: opacity 300ms ease-in-out;

             &:hover {
               opacity: 0.8;
             }
           }

           &.noStatus {
             background-color: var(--color);
             color: #fff;
             border-color: var(--color);
             transition: opacity 300ms ease-in-out;
           }
         }
       }
     }
   }
        }
        }
      
        
      }
      & > .right {
        display: flex;
        align-items: center;
        gap: 12px;
        & > .detailBox {
          width: 206px;
          /* ${theme.queryStatement(theme.breakpoints.xxllgg)} {
 flex-grow: 1;
  
  } */
          ${theme.queryStatement(theme.breakpoints.xxllg)} {
            flex-grow: 1;
          }
          ${theme.queryStatement(theme.breakpoints.sm)} {
            width: 100%;
          }
        }
        & > button {
          color: #aaa;
          line-height: 0;
          transition: color 300ms ease-in-out;
          & > * {
            font-size: 1.4rem;
          }
          &:hover {
            color: #878686;
          }
          &.added {
            color: #5867dd;

            &:hover {
              color: #384ad7;
            }
          }
        }

        & > .btnIcon-for-mobile {
          display: none;
          /* ${theme.queryStatement(theme.breakpoints.xxllgg)} {
            display: block;
          } */
          ${theme.queryStatement(theme.breakpoints.xxllg)} {
            display: block;
          }
        }
      }
    }
    & > .pushToCrm {
      display: none;
      ${theme.queryStatement(theme.breakpoints.sm)} {
        display: block;
      }
    }
    & > .bottom {
      // background-color:red ;
      // display: grid;
      & > div {
        ${theme.queryStatement(theme.breakpoints.sm)} {
          height: 50px;
          width: 1px;
        }
        & > .pushToCrmDesktop {
          ${theme.queryStatement(theme.breakpoints.sm)} {
            display: none;
          }
        }
      }
      & > div {
      }
      display: flex;
      // grid-template-columns: 1fr 1fr 1fr;

      & > button {
        /* display: grid;
        grid-template-columns: auto;
        gap: 0.65rem;
        align-items: center;
        justify-content: center;
        text-align: center; */
        display: flex;
        align-items: center;
        gap: 0.6rem;
        padding: 0.325rem 0.975rem;
        // border-radius: 100rem;
        border: 0.1rem solid transparent;
        transition: border-color 300ms ease-in-out,
          background-color 300ms ease-in-out;
        width: fit-content;
        justify-self: center;

        ${theme.queryStatement(theme.breakpoints.sm)} {
          flex-grow: 1;
          justify-content: center;
        }

        &:has(.icon) {
          grid-template-columns: auto auto;
        }

        &:hover {
          background-color: #f5f5f5;
        }

        & > .icon {
          line-height: 0;
          font-size: 1.5rem;
          color: #aaa;
          transition: color 300ms ease-in-out;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        & > .text {
          color: #393939;
          font-weight: 500;
          font-size: 16px;
          transition: color 300ms ease-in-out;
        }

        &.block {
          & > .icon {
            color: #f4516c;
          }
        }
        &.verified {
          & > .icon {
            color: #43cd80;
            & > .red {
              color: #f4516c;
            }
          }
        }
        &.cut {
          & > .text {
            text-decoration-line: line-through;
          }
        }
        &.selected {
          // background: rgba(54, 163, 247, 0.1);
          border-bottom: 1px solid #00bd82;

          &:hover {
            background: rgba(54, 163, 247, 0.2);
          }

          & > .text {
            color: #012635;
          }
        }
      }
    }
  }
  & > .middle {
    /* padding: 1.3rem; */
    display: grid;
    gap: 16px;
    align-content: start;
    padding: 16px 20px;
    padding-bottom: 0;
    overflow-y: auto;
    // background-color: blue;
    &::-webkit-scrollbar {
      width: 0.4rem;
    }

    &::-webkit-scrollbar-track {
      background-color: #fff;
    }

    &::-webkit-scrollbar-thumb {
      background: #00bd82;
    }

    & > .item {
      max-width: 100%;
      display: grid;
      gap: 0.2rem;
      &.me {
        justify-self: end;
        & > p {
          /* padding: 0.65rem 0.995rem; */
          border-radius: 8px;
          padding: 1rem 1.3rem;
          // border-top-right-radius: 0;
          background-color: #3086ee;
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          justify-self: end;
        }
        & > span {
          color: #777777;
          font-size: 10px;
          font-weight: 500;
          justify-self: end;
        }
      }
      &.other {
        justify-content: start;
        & > p {
          border-radius: 8px;
          padding: 1rem 1.3rem;
          // border-top-left-radius: 0;
          background-color: #f0f0f0;
          color: #012635;
          font-size: 14px;
          font-weight: 500;
          justify-self: start;
        }
        & > span {
          color: #777777;
          font-size: 10px;
          font-weight: 500;
          justify-self: end;
        }
      }
    }
  }
  & > .bottom {
    margin: 16px 20px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
    & > * {
      // border-top: 0.1rem solid #d8d8d8;
      padding: 0.8rem 0.5rem;
    }
    > .new-message {
      display: grid;
      background-color: #60aaf3;
      opacity: 0.5;
      margin: 0 14rem;
      > button {
        color: #fff;
        line-height: 0;
        display: grid;
        grid-template-columns: auto auto;
        align-items: center;
        justify-content: center;
      }
    }
    & > .top {
      padding: 0px 16px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #f7f7f7;
      ${theme.queryStatement(theme.breakpoints.sm)} {
        flex-direction: column;
        height: fit-content;
        align-items: start;
        gap: 10px;
        padding-top: 10px;
      }
      & > .left {
        & > button {
          /* padding: 0.585rem 1.04rem; */
          height: 32px;
          width: 104px;
          border-radius: 8px;
          transition: background 300ms ease-in-out;
          display: flex;
          align-items: center;
          gap: 8px;

          & > * {
            &:first-child {
              /* margin-right: 0.5rem; */
            }
          }
          cursor: default;
          ${theme.queryStatement(theme.breakpoints.lg)} {
            justify-content: center;
            align-items: center;
            width: 100%;
          }
          &:disabled {
            opacity: 0.65;
            cursor: not-allowed;
          }

          & > .icon {
            font-size: 20px;
            line-height: 0;
            color: #8d8d8d;
          }

          & > .text {
            color: #012635;
            font-size: 16px;
            font-weight: 500;
          }
        }
      }
      & > .right {
        display: grid;
        align-items: center;
        align-content: end;
        justify-content: end;
        gap: 8px;
        grid-template-columns: auto auto auto;
        ${theme.queryStatement(theme.breakpoints.sm)} {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        & > button {
          padding: 0px 12px;
          border-radius: 8px;
          background-color: #e8eaed;
          transition: background 300ms ease-in-out;
          display: grid;
          grid-template-columns: auto auto;
          gap: 8px;
          align-items: center;
          justify-content: center;
          height: 32px;
          ${theme.queryStatement(theme.breakpoints.sm)} {
            flex-grow: 1;
            min-width: 48%;
          }
          ${theme.queryStatement(theme.breakpoints.xxllg)} {
            padding: 0px;
            height: 32px;
            width: 44px;
            gap: 0px;
          }
          ${theme.queryStatement(theme.breakpoints.xxllg)} {
            padding: 0px 12px;
          
            width: fit-content;
            gap: 8px;
          }
          &:disabled {
            opacity: 0.65;
            cursor: not-allowed;
          }

          &:hover {
            background-color: #d5d3d3;
          }
          & > .icon {
            font-size: 20px;
            line-height: 0;
            color: #0a3501;
          }

          & > .text {
            color: #000;
            font-size: 16px;
            font-weight: 500;
            letter-spacing: 0.4px;

            ${theme.queryStatement(theme.breakpoints.xxllg)} {
       display: none;
          }
          ${theme.queryStatement(theme.breakpoints.tab)} {
       display: block;
          }
          }

          &.disabled {
            opacity: 0.65;
          }
          &.verified {
            /* background: linear-gradient(to right, #43cd80, #7bdca6); */
            background-color: #00bd82;

            &:hover {
              background: linear-gradient(to right, #3fbe78, #74d19e);
            }
            & > .icon,
            & > .text {
              color: #fff;
            }
          }

          &.wrong {
            background: #bb2100;

            &:hover {
              background: #dc4861;
            }
            & > .icon,
            & > .text {
              color: #fff;
            }
          }

          &.dnc {
            background: #ffc000;

            &:hover {
              background: #ffc000;
            }
            & > .icon,
            & > .text {
              /* color: #fff; */
              color: #000;
            }
          }
        }
      }
    }
    & > .middle {
      display: grid;
      align-content: end;
      gap: 0.2rem;

      & > textarea {
        width: 100%;
        border-radius: none;
        border: none;
        background-color: transparent;
        outline: none;
        resize: none;
        color: #363636;
        font-weight: 500;
        height: 5rem;
        overflow-y: auto;
        font-size: 1.15rem;

        &::-webkit-scrollbar {
          width: 0.4rem;
        }

        &::-webkit-scrollbar-track {
          background-color: #fff;
        }

        &::-webkit-scrollbar-thumb {
          background: #dedfe7;
        }

        &:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }
      }

      & > .info {
        justify-self: end;
        font-style: italic;
        font-size: 1.16rem;
        color: #212529;
      }
    }
    & > .bottom {
      height: 56px;
      // display: grid;
      display: flex;
      // grid-template-columns: auto auto;
      gap: 8px;
      align-items: center;
      justify-content: space-between;
      padding: 0px 16px;
      

      ${theme.queryStatement(theme.breakpoints.sm)} {
        height: fit-content;
      }
      & > .left > button {
        // padding: 0.585rem 1.04rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        width: 32px;
        height: 32px;
        background-color: #f0f0f0;
        transition: background 300ms ease-in-out;
        &:hover {
          background-color: #d5d3d3;
        }
        &:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }
      }

      & > .right {
        display: grid;
        grid-template-columns: auto auto;
        gap: 16px;
        align-items: center;
        justify-content: end;
        ${theme.queryStatement(theme.breakpoints.sm)} {
          display: flex;
          flex-direction: column-reverse;
          padding-top: 10px;
        }
        & > button {
          padding: 0.585rem 1.04rem;
          border-radius: 0.2rem;
          // background-color: #f0f0f0;
          transition: background 300ms ease-in-out;
          &:hover {
            background-color: #d5d3d3;
          }
          &:disabled {
            opacity: 0.65;
            cursor: not-allowed;
          }

          & > .text {
            color: #777777;
            font-size: 16px;
            font-weight: 500;
          }

          &:has(.icon) {
            display: grid;
            grid-template-columns: auto auto;
            /* gap: 0.65rem; */
            align-items: center;
            justify-content: center;
            background-color: #00bd82;
            border-radius: 8px;
            width: 86px;
            height: 40px;
            ${theme.queryStatement(theme.breakpoints.sm)} {
              width: 100%;
            }
            &:hover {
              background-color: #00bd82;
            }

            & > .icon {
              font-size: 1.3rem;
              line-height: 0;
              color: #fff;
            }

            & > .text {
              color: #fff;
            }
          }
        }
      }
    }
  }
`;
export const TagMenuStyled = styled.div`
  width: 183px;
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  & > h6 {
    font-weight: 500;
    color: #012635;
    font-size: 14px;
    padding-bottom: 4px;
  }

  & > .item {
    width: 100%;
    /* display: grid; */
    display: flex;
    grid-template-columns: auto 1fr;
    text-align: start;
    align-items: center;
    align-content: start;
    gap: 0.65rem;
    overflow: hidden;
    transition: background-color 0.3s ease-in-out;
    height: 40px;
    padding: 0px 8px;
    border-radius: 8px;
    &:hover {
      background: #f7f8fc;
    }

    & > .dot {
      display: block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--color);
      line-height: 0;
    }
    & > .text {
      display: block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 16px;
      color: #777777;
      font-weight: 400;
    }
    & > .tag-dot {
      width: 10px !important;
      height: 10px !important;
    }
  }
`;

export const ProspectDetailsStyled = styled.div`
  background-color: #f2f3f8;
  height: calc(100vh - 85px);
  /* height: calc(100svh - 7.4rem); */
  // position: absolute;
  /* ${theme.queryStatement(theme.breakpoints.xxllgg)} {
    height: calc(100vh - 13.8rem);
    height: calc(100svh - 13.8rem);
  } */
  ${theme.queryStatement(theme.breakpoints.xxllg)} {
    height: calc(100vh - 13.8rem);
    height: calc(100svh - 13.8rem);
  }
  ${theme.queryStatement(theme.breakpoints.md)} {
    height: calc(100vh - 7rem);
    height: calc(100svh - 7rem);
  }

  overflow-y: hidden;
  overflow-y: scroll;
  width: 100%;

  &::-webkit-scrollbar {
    width: 0.4rem;
  }

  &::-webkit-scrollbar-track {
    background-color: #fff;
  }

  &::-webkit-scrollbar-thumb {
    background: #dedfe7;
  }

  & > .top {
    padding: 1.5rem;
    background: #f1f3f5;
    ${theme.queryStatement(theme.breakpoints.xxllg)} {
      padding: 1.5rem 0.2rem;
    }
    & > .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.7rem;
      border-bottom: 1px solid #00000026;
      padding-bottom: 0.6rem;
      gap: 0.3rem;
      /* justify-content: space-between; */
      /* display: grid;
      align-content: start;
      align-items: center;
      grid-template-columns: auto auto; */
      /* justify-content: space-between; */

      & > .left {
        /* display: grid;
        align-items: center;
        gap: 1rem;
        grid-template-columns: auto auto;
        justify-content: space-between; */

        display: flex;
        align-items: center;
        padding-top: 3px;

        & > .icon {
          font-size: 1.2rem;
          color: #5867dd;
          margin-top: 0.7rem;
          /* line-height: 0; */
        }
        & > input {
          color: #393939;
          font-size: 1.4rem;
          border: none;
          outline: none;
          width: 100%;
          font-weight: 400;
          background-color: transparent;
          border-bottom: 0.1rem solid transparent;
          margin-right: 1rem;
          ${theme.queryStatement(theme.breakpoints.xxllg)} {
            width: 90%;
          }
          &:focus {
            border-bottom: 0.1rem solid #ccc;
          }
        }
      }
      & > .right {
        /* display: grid;
        align-items: center;
        gap: 0.65rem;
        grid-template-columns: auto auto auto;
        justify-content: end; */

        display: flex;
        align-items: center;

        & > * {
          &:not(:last-child) {
            margin-right: 1rem;
          }
        }

        & > a > img {
          width: 2.275rem;
          height: 2.275rem;
          object-fit: cover;
        }
      }
    }

    & > .bottom {
      & > .top {
        display: grid;
        grid-template-columns: auto auto;
        ${theme.queryStatement(theme.breakpoints.lg)} {
          grid-template-columns: auto;
          gap: 1.3rem;
        }
        & div {
          & > p {
            color: #212529;
            font-size: 1.2rem;
            font-weight: 300;
          }
          & > .heading {
            font-weight: 500;
          }
        }
      }
      & > .bottom {
        display: grid;
        align-content: start;
        gap: 0.65rem;

        & > .top {
          & > button {
            display: grid;
            align-items: center;
            gap: 0.65rem;
            grid-template-columns: auto auto;
            justify-content: start;

            & > .icon {
              color: #36a3f7;
              line-height: 0;
              font-size: 1.3rem;
            }
            & > .text {
              color: #36a3f7;
              font-size: 1.157rem;
              font-weight: 300;
            }
          }
        }
      }
    }
  }
  & > .bottom {
    height: 100%;
    display: flex;
    flex-direction: column;
    & > .top {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 0.2fr;
      align-items: center;
      background-color: white;
      & > button {
        display: grid;
        align-items: center;
        gap: 0.5rem;
        grid-template-columns: auto;
        justify-content: center;
        border-bottom: 1px solid #f0f0f0;
        padding: 0.975rem;
        transition: border-bottom 300ms ease-in-out;

        &:has(span) {
          grid-template-columns: auto auto;
        }

        & > span {
          color: #21252990;
          font-size: 1.2rem;
          font-weight: 500;
          transition: color 300ms ease-in-out;
        }
        & > h6 {
          color: #012635;
          font-size: 14px;
          font-weight: 500;
          transition: color 300ms ease-in-out;
        }

        &:hover {
          border-bottom-color: #00bd82;
        }

        &.selected {
          border-bottom-color: #00bd82;
          & > span,
          & > h6 {
            color: #012635;
          }
        }
      }
    }
    & > .bottom {
      padding: 1.3rem 1.6rem;
      background-color: white;
      flex-grow: 1;
      .top {
        display: grid;
        grid-template-columns: auto auto;
        gap: 2rem;
      }
    }
  }
`;

export const DetailsTabStyled = styled.div`
  padding: 1rem 0rem;
  & > .top {
    & > button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.7rem;
      background-color: #a2abe8;
      transition: background-color 600ms;
      padding: 1.2rem 1.3rem;
      border-radius: 0.5rem;

      & > .icon {
        font-size: 1.3rem;
        line-height: 0;
        color: #fff;
      }

      & > .text {
        font-size: 1.3rem;
        color: #fff;
        font-weight: 500;
        line-height: 1.3rem;
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
    align-content: start;
    gap: 2rem;
    border-bottom: 1px dotted rgba(200, 200, 200, 0.4);
    & > section {
      padding: 16px 20px;
      border-bottom: 1px solid #e0e0e0;
      border-top: 1px solid #e0e0e0;
      // margin-top: 2rem;

      & > h2 {
        line-height: 1.4rem;
        // margin-bottom: 0.5rem;
        & > * {
          &:first-child {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f0f0f0;
            width: 28px;
            height: 28px;
            border-radius: 8px;
            & > * {
              font-size: 18px;
            }
          }
          &:last-child {
            font-size: 14px;
            font-weight: 500;
            color: #012635;
          }
        }
      }

      & > div {
        text-align: right;
        & > p {
          // margin-top: -2rem;
        }
        & > section {
          margin: 0.3rem;

          & > .item {
            padding: 0.2rem 8px;
            border-radius: 4rem;
            // background: #f5f5f5;
            background-color: var(--color);
            position: relative;
            overflow: hidden;
            display: grid;
            gap: 0.65rem;
            grid-template-columns: auto auto;
            justify-content: start;
            align-items: center;
            width: fit-content;
            & > .dot {
              background-color: var(--color);
              width: 1rem;
              height: 1rem;
              border-radius: 50%;
              display: block;
              line-height: 1.95rem;
            }
            & > .text {
              color: #ffffff;
              font-size: 12px;
              font-weight: 500;
            }
            & > .overlay {
              // position: absolute;
              // top: 0;
              // bottom: 0;
              // right: 0;
              color: white;
              display: grid;
              align-items: center;
              justify-items: center;
              // transition: color 300ms ease-in-out, opacity 300ms ease-in-out,
              //   transform 300ms ease-in-out;
              // opacity: 0;
              // transform: translate(3.3rem);

              // background: #dedfe7;
              // box-shadow: 0 0 8px #32323280;
              // padding: 0 1rem 0 0.65rem;

              // &:hover {
              //   color: rgba(33, 37, 41, 0.9);
              // }
            }
            &:hover > .overlay {
              opacity: 1;
              transform: translate(0);
            }
          }
        }
      }
    }

    & > * > h2 {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 0.65rem;
      align-items: center;
      line-height: 1.4rem;
      color: #012635;
      border-bottom: 1px solid #e0e0e0;
      padding: 16px 20px;
      & > .icon {
        color: #012635;
        height: 28px;
        width: 28px;
        border-radius: 8px;
        background-color: #f0f0f0;
      }
      & > .text {
        font-size: 14px;
        font-weight: 500;
      }
    }

    & > .top {
      display: grid;
      align-content: start;
      gap: 0.365rem;

      & > p {
        color: #333;
        font-size: 1.3rem;
      }

      /* & > .item {
        padding: 0.65rem 3rem 0.65rem 0.975rem;
        border-radius: 1000rem;
        background: #f5f5f5;
        position: relative;
        overflow: hidden;
        display: grid;
        gap: 0.65rem;
        grid-template-columns: auto auto;
        justify-content: start;
        width: fit-content;
        align-items: center;

        & > .dot {
          background-color: var(--color);
          width: 1.8rem;
          height: 1.8rem;
          border-radius: 50%;
          display: block;
          line-height: 1.95rem;
        }
        & > .text {
          color: #333;
          font-size: 1.3rem;
          font-weight: 300;
        }
        & > .overlay {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          color: rgba(33, 37, 41, 0.7);
          display: grid;
          align-items: center;
          justify-items: center;
          transition: color 300ms ease-in-out, opacity 300ms ease-in-out,
            transform 300ms ease-in-out;
          opacity: 0;
          transform: translate(3.3rem);

          background: #dedfe7;
          box-shadow: 0 0 8px #32323280;
          padding: 0 1rem 0 0.65rem;

          &:hover {
            color: rgba(33, 37, 41, 0.9);
          }
        }
        &:hover > .overlay {
          opacity: 1;
          transform: translate(0);
        }
      } */
    }

    & > .bottom {
      & > .bottom {
        & > .row {
          display: grid;
          align-content: start;
          gap: 1rem;
          margin-top: 1.4rem;
          & > .col {
            display: grid;
            align-content: start;
            & > * {
              &:not(:last-child) {
                margin-bottom: 0.3rem;
              }
            }
            & > input {
              color: #212529;
              font-size: 1.4rem;
              border: none;
              outline: none;
              width: 100%;
              background-color: transparent;
              border-bottom: 0.1rem solid transparent;
            }
            & > h6 {
              font-weight: 600;
              color: #012635;
              font-size: 16px;
            }
            & > span {
              font-weight: 400;
              color: #777777;
              font-size: 12px;
            }
            & > div {
              font-weight: 500;
              font-size: 12px;
              color: #012635;
              > a {
                border: 1px solid #d3d7dd;
                border-radius: 12px;
                height: 24px;
                padding: 0 8px;
                color: #012635;
                transition: color 300ms ease-in-out;
                &:hover {
                  color: #384ad7;
                  text-decoration-line: underline;
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const ActivityTabStyled = styled.div`
  // background-color: red;
  padding: 16px 20px;
  & > .error {
    text-align: center;
    color: #333;
    font-size: 1.3rem;
  }
  & > table {
    border-collapse: collapse;
    border-spacing: 0;
    border-width: 0;
    width: 100%;
    & > tbody > tr {
      background-color: #f7f7f7;
      margin-bottom: 0.5rem;
      border-radius: 16px;
      display: flex;

      &:nth-of-type(2n + 1) {
        background-color: #f7f8fc;
      }
      & > td {
        padding: 0.975rem;
        font-size: 12px;
        color: #012635;
        font-weight: 400;
        font-size: 12px;
        & > .icon {
          padding-right: 0.35rem;
          transform: translate(0.1rem);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          line-height: 0;

          &.green {
            color: #34bfa3;
          }
          &.red {
            color: #e52935;
          }
          &.blue {
            color: #36a3f7;
          }
          &.gray {
            color: #c0c0c0;
          }
        }
      }
    }
  }
`;

export const NotesTabStyled = styled.div`
  display: grid;
  // gap: 3rem;
  // background-color: red ;
  height: 100%;
  align-content: start;
  display: flex;
  flex-direction: column;
  & > .top {
    padding: 16px 20px !important;
    display: grid;
    gap: 0.65rem;
    flex-grow: 1;
    // background-color: red;

    & > .error {
      text-align: center;
      color: #333;
      font-size: 1.3rem;
    }

    & > .item {
      padding: 8px 16px;
      background-color: #f7f8fc;
      border-radius: 16px;
      // &:nth-of-type(2n + 1) {
      //   background-color: #f8f8f8;
      // }

      & > .top {
        display: grid;
        gap: 1rem;
        align-items: center;
        grid-template-columns: auto auto;
        justify-content: space-between;
        border-top: 1px solid #e0e0e0;
        padding: 8px 0px;
        & > span {
          font-size: 1.04rem;
          color: #212529;
          /* font-style: italic; */
          opacity: 0.7;
        }

        & > button {
          font-size: 1.3rem;
          color: #212529;
          font-style: italic;
          opacity: 0.6;
          transition: opacity 300ms ease-in-out;
          line-height: 0;

          &:hover {
            opacity: 0.7;
          }
        }
      }
      & > p {
        font-size: 14px;
        color: #012635;
        font-weight: 400;
        padding-bottom: 8px;
      }
    }
  }
  & > .bottom {
    padding: 16px;
    background-color: #e0e0e0;

    display: grid;
    align-content: start;
    border-top: 0.1rem solid #ccc;
    gap: 1rem;

    & > textarea {
      padding: 1.1rem 1.5rem;
      border: 0.1rem solid #c1c4cc;
      background-color: white;
      color: #575962;
      // background-color: transparent;
      outline: none;
      border-radius: 8px;
      transition: background-color 300ms, color 300ms, border-color 300ms;
      font-size: 1.3rem;
      font-size: 1.3rem;
      width: 100%;
      resize: none;
      height: 8rem;

      &:focus {
        border-color: #716aca;
        color: #575962;
        background-color: #fff;
      }
    }

    & > button {
      display: grid;
      align-items: center;
      justify-content: center;
      grid-template-columns: auto auto;
      gap: 0.35rem;
      background-color: #00bd82;
      height: 32px;
      transition: background-color 300ms;
      padding: 0.6rem 1.05rem;
      border-radius: 8px;

      & > .icon {
        font-size: 1.3rem;
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
        opacity: 0.65;
        cursor: not-allowed;
      }
    }
  }
`;

export const SetRemainderModalStyled = styled.div`
  width: 700px;
  /* min-width: 700px; */
  max-width: 95vw;

  background-color: #fff;
  border-radius: 16px;
  & > .top {
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    padding: 16px;
    /* background-color: #f8f8f8; */
    height: 58px;
    border-bottom: solid 1px #f7f7f7;
    & > h2 {
      font-size: 18px;
      color: #012635;
      font-weight: 500;
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
    padding: 16px 24px;
    /* display: grid; */
    display: flex;
    flex-direction: column;
    gap: 16px;
    gap: 2rem;

    & > .item {
      /* display: grid; */
      align-items: start;
      gap: 1.5rem;
      /* grid-template-columns: 17rem 1fr; */
      &:nth-child(1) {
        display: flex;
        align-items: end !important;
        ${theme.queryStatement(theme.breakpoints.sm)} {
          /* background-color: red; */
          /* flex-direction: column; */
          flex-wrap: wrap;
          /* align-items: start !important; */
        }
      }
      &:has(.right .name),
      &:has(.right input) {
        align-items: center;
      }

      ${theme.queryStatement(theme.breakpoints.sm)} {
        grid-template-columns: 15rem 1fr;
      }

      & > .left {
        padding-bottom: 4px;
        & > .text {
          color: #012635;
          font-size: 14px;
          font-weight: 500;
        }
      }
      & > .right {
        display: grid;
        gap: 0.25rem;

        & > p {
          font-size: 1.1rem;
          color: #f4516c;
        }
        & > span {
          font-size: 0.8rem;
        }

        & > .name {
          font-size: 1.3rem;
          color: #212529;
        }

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

        & > textarea {
          padding: 1.1rem 1.5rem;
          border: 0.1rem solid #c1c4cc;
          color: #575962;
          background-color: transparent;
          outline: none;
          border-radius: 0.35rem;
          transition: background-color 300ms, color 300ms, border-color 300ms;
          width: 100%;
          font-size: 1.3rem;
          min-height: 7rem;
          resize: none;

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
      }
    }
  }
  & > .bottom {
    display: grid;
    grid-template-columns: auto auto;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    height: 72px;
    border-top: solid 1px #f7f7f7;

    /* background-color: #f8f8f8; */
    & > .left {
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
      }
    }

    & > .right {
      display: grid;
      grid-template-columns: auto auto;
      gap: 0.5rem;
      align-items: center;
      justify-content: end;

      & > button:first-of-type {
        background-color: #f4516c;
      }
    }
  }
`;
export const SelectPhoneModalStyled = styled.div`
  width: 95vw;
  max-width: fit-content;
  background-color: #fff;
  border-radius: 16px;
  & > .top {
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    padding: 0px 16px;
    height: 58px;
    border-bottom: 0.1rem solid #f7f7f7;

    & > .title {
      font-size: 18px;
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
  & > .middle {
    padding: 1.95rem;
    display: grid;
    gap: 2rem;

    & > h4 {
      font-size: 20px;
      font-weight: 500;
    }

    & > .item {
      display: grid;
      align-items: start;
      gap: 1.5rem;
      grid-template-columns: auto auto auto;

      &:has(.right .name),
      &:has(.right input) {
        align-items: center;
      }

      ${theme.queryStatement(theme.breakpoints.sm)} {
        grid-template-columns: 15rem 1fr;
      }

      & > button {
        padding: 0.585rem 1.04rem;
        border-radius: 8px;
        background-color: #f0f0f0;
        transition: background 300ms ease-in-out;
        display: grid;
        gap: 0.65rem;
        align-items: center;
        justify-content: center;
        height: 48px;
        width: 206px;
        font-size: 16px;
        color: #012635;
        font-weight: 500;

        ${theme.queryStatement(theme.breakpoints.sm)} {
          width: 100%;
        }
        &:hover {
          background-color: #d5d3d3;
        }

        & > .text {
          color: #000;
          font-size: 1.13rem;
          font-weight: 400;
        }

        &.verified {
          background-color: #43cd80;
          color: #fff;
        }
        &.dnc {
          background-color: #ffc000;
          color: #000000;
        }
        &.wrong {
          background-color: #bb2100;
          color: #fff;
        }
      }
    }
  }
  & > .bottom {
    display: grid;
    grid-template-columns: auto auto;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    padding: 1.95rem;
    background-color: #f8f8f8;
    & > .left {
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
      }
    }

    & > .right {
      display: grid;
      grid-template-columns: auto auto;
      gap: 0.5rem;
      align-items: center;
      justify-content: end;

      & > button:first-of-type {
        background-color: #f4516c;
      }
    }
  }
`;

export const FilterContainer = styled.div`

  & > .top {
      padding: 24px 0px;
      & > .top {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 0.5rem;

        & > * {
          ${theme.queryStatement(theme.breakpoints.sm)} {
            flex: 0 0 calc(30% - 20px);
          }
        }
        & > * {
          color: #858585;
          font-weight: 500;
          &:first-child {
            padding: 0rem;
            padding: 0.45rem 0rem;
          }
        }

        & > div,
        button {
          cursor: pointer;
          gap: 0.4rem;
          padding: 0.4rem 0.6rem;
          border-radius: 0.4rem;
          grid-template-columns: auto auto;
          transition: background-color 300ms ease-in-out;
          display: flex;
          align-items: center;

          & > .icon {
            font-size: 1.1rem;
            color: #858585;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          & > .text {
            color: #858585;
            font-size: 1.2rem;
            font-weight: 400;
          }

          &:hover {
            background-color: #dedfe7;
          }

          &.selected {
            & > .icon {
              color: #36a3f7;
            }
            & > .text {
              color: #36a3f7;
            }
          }

          &.remainder {
            background-color: #fff;
            padding-right: 0.7rem;
            & > .icon {
              font-size: 1.3rem;
              color: #858585;
            }

            &:hover {
              background-color: transparent;
            }

            &.open {
              background-color: #5867dd;
              & > .icon {
                color: #fff;
                transform: rotate(180deg);
              }
              & > .text {
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
        display: flex;
        align-items: center;
        ${theme.queryStatement(theme.breakpoints.xxllg)} {
          flex-direction: column;
          align-items: start;
        }

        & > h6 {
          font-weight: 400;
          color: #858585;
          font-size: 1.2rem;
          margin-right: 0.8rem;
          ${theme.queryStatement(theme.breakpoints.xxllg)} {
            margin-bottom: 0.6rem;
            margin-right: 0rem;
          }
        }
        & > .right {
          /* display: flex;
          align-items: center;
          justify-content: start;
          gap: 0.8rem;
          flex-wrap: wrap;
          ${theme.queryStatement(theme.breakpoints.xlgg)} {
            justify-content: center;
            & > * {
              flex: 0 0 calc(32% - 20px);
            }
          }
          ${theme.queryStatement(theme.breakpoints.md)} {
            & > * {
              flex: 0 0 calc(35% - 10px);
            }
          }
          ${theme.queryStatement(theme.breakpoints.sm)} {
            justify-content: center;
            & > * {
              flex: 0 0 calc(35% - 20px);
            }
          } */

          & > section {
            display: inline-block;
            margin: 0.4rem;
            & > .item {
              padding: 0.3rem 12px;
              border-radius: 8px;
              display: flex;
              align-items: center;
              gap: 0.6rem;
              height: 32px;
              background-color: #f0f0f0;
              align-items: center;

              & > .icon {
                color: #9ba3ae;
                font-size: 1.3rem;
                line-height: 0;
              }
              & > .text {
                font-size: 14px;
                color: #012635;
                font-weight: 500;
                text-transform: capitalize;
                ${theme.queryStatement(theme.breakpoints.md)} {
                  font-size: 1.1rem;
                }
              }
              &:hover > div > button {
                display: block; /* Show the button on hover */
              }
              & > div {
                width: 20px;
                & > button {
                  color: #9ba3ae;
                  font-size: 1rem;
                  line-height: 0;
                  display: none;
                  cursor: pointer;
                }
              }
            }
          }

          & > button {
            margin: 0.3rem;
            line-height: 0;
            color: #939bd3;
            font-size: 1.5rem;
          }
        }
      }
    }
` ;

export const QuickRepliesModalStyled = styled.div`
  width: 730px;
  min-width: 700px;
  max-width: 730px;
  background-color: #fff;
  border-radius: 16px;
  z-index: 1000;
  & > .top {
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    padding: 0px 16px;
    height: 56px;

    /* background-color: #f8f8f8; */

    & > h2 {
      font-size: 18px;
      color: #012635;
      font-weight: 600;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    & > .right {
      display: grid;
      grid-template-columns: auto auto;
      gap: 0.5rem;
      align-items: center;
      justify-content: end;

      & > button {
        /* padding: 0.85rem 1.5rem; */
        height: 40px;
        width: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        border: 0.1rem solid #c1c4cc;
        font-weight: 500;
        border-radius: 8px;
        transition: background-color 0.3s ease-in-out;
        & > .text {
          font-size: 1.3rem;
          color: #212529;
        }

        &:not(:disabled):hover {
          background-color: #fff;
        }

        &:first-of-type {
          border: 0.1rem solid #00bd82;
          background-color: #00bd82;
          color: #fff;

          &:not(:disabled):hover {
            border: 0.1rem solid #0e8ae9;
            background-color: #0e8ae9;
          }
        }
      }
    }
  }
  & > .bottom {
    padding: 2.5rem 0;
    padding-top: 0px;
    display: grid;
    align-content: start;
    gap: 2rem;
    overflow: auto;

    & > .top {
      padding: 16px;
      height: 80px;
      border-bottom: solid 1px #f0f0f0;
      & > select {
        padding: 1.1rem 4rem 1.1rem 1.5rem;
        border: 1px solid #d3d7dd;
        color: #777777;
        background-color: transparent;
        font-size: 14px;
        outline: none;
        border-radius: 8px;
        transition: background-color 300ms, color 300ms, border-color 300ms;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background-image: url("${(p) => p.ChevronDown}");
        background-repeat: no-repeat;
        background-position: calc(100% - 1.5rem) center;
        background-size: 1rem;
        font-size: 14px;
        width: 100%;

        &:focus {
          border-color: #716aca;
          color: #575962;
          background-color: #fff;
        }
      }
    }

    & > .bottom {
      padding: 0 16px;
      /* display: grid; */
      align-content: center;
      gap: 0.65rem;
      /* max-height: calc(100vh - 23.8rem); */
      max-height: calc(100svh - 23.8rem);
      width: 730px;
    justify-content: center;
      &::-webkit-scrollbar {
          width: 0.6rem;
        }

        &::-webkit-scrollbar-track {
          background-color: #f1f1f1;
        }

        &::-webkit-scrollbar-thumb {
          background: #00bd82;
          border-radius: 5px;
        }

        &::-webkit-scrollbar-thumb:hover {
          background: #00bd82;
        }
    overflow-y: auto;

      & > .item {
        background: #fff;
        border-radius: 5px;
        padding: 0.65rem;
        border: 1px solid #dee2e6;
        display: grid;
        align-content: start;
        margin-bottom: 5px;
        gap: 0.65rem;
        cursor: pointer;
        transition: background 300ms ease-in-out;
        width: 668px;

        &:hover {
          background: #f8f8f8;
        }

        & > h6 {
          font-size: 18px;
          color: #012635;
          font-weight: 500;
        }
        & > p {
          font-size: 14px;
          font-weight: 500;
          color: #777777;
          opacity: 0.7;
          width: 636px;
          word-wrap: break-word; /* Ensures long words break to the next line */
          overflow-wrap: break-word; /* Handles wrapping for long words consistently */
          white-space: normal; /* Ensures text wraps as needed */
        }
      }
    }
  }
`;

export const DripAutomationModalStyled = styled.div`
  width: 95vw;
  max-width: 54.6rem;
  background-color: #fff;
  border-radius: 16px;

  & > .top {
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    padding: 0px 16px;
    height: 58px;
    border-bottom: 0.1rem solid #f7f7f7;
    // background-color: #f8f8f8;

    & > .title {
      font-size: 18px;
      color: #012635;
      font-weight: 600;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    & > .right {
      display: grid;
      grid-template-columns: auto auto;
      gap: 0.5rem;
      align-items: center;
      justify-content: end;

      & > button {
        padding: 0.85rem 1.5rem;
        font-size: 1.1rem;
        border: 0.1rem solid #c1c4cc;
        font-weight: 500;
        border-radius: 0.4rem;
        transition: background-color 0.3s ease-in-out;
        & > .text {
          font-size: 1.3rem;
          color: #212529;
        }

        &:not(:disabled):hover {
          background-color: #fff;
        }

        &:first-of-type {
          border: 0.1rem solid #1195f6;
          background-color: #1195f6;
          color: #fff;

          &:not(:disabled):hover {
            border: 0.1rem solid #0e8ae9;
            background-color: #0e8ae9;
          }
        }
      }
    }
  }
  & > .bottom {
    padding: 2.5rem 0;
    display: grid;
    align-content: start;
    // gap: 2rem;

    & > .top {
      & > .heading {
        font-weight: 500;
        font-size: 14px;
        color: #012635;
        padding-bottom: 8px;
        border-bottom: 1px solid #f0f0f0;
      }
      padding: 0 16px;
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

        &:focus {
          border-color: #716aca;
          color: #575962;
          background-color: #fff;
        }
      }
    }

    & > .bottom {
      & .viewMessage:hover {
        background-color: #28a745;
      }
      padding: 0 16px;
      display: grid;
      align-content: start;
      // gap: 0.65rem;
      max-height: calc(100vh - 23.8rem);
      max-height: calc(100svh - 23.8rem);
      overflow-y: auto;

      & > .item {
        background: #fff;
        // border-radius: 5px;
        padding: 0.65rem;
        // border-top: 1px solid #F0F0F0;
        border-bottom: 1px solid #f0f0f0;
        display: grid;
        align-content: start;
        gap: 0.65rem;
        cursor: pointer;
        transition: background 300ms ease-in-out;
        height: 56px;
        &:hover {
          background: #f8f8f8;
        }

        & > h6 {
          font-size: 1.3rem;
          color: #212529;
          font-weight: 500;
        }
        & > p {
          font-size: 14px;
          font-weight: 500;
          color: #777777;
          opacity: 0.7;
        }
      }
    }
  }
`;

export const MyLightTooltip = styled(LightTooltip)`
  & > .MuiTooltip-tooltip {
    margin-top: 0.2rem !important;
    padding: 0 !important;
    /* margin-left: 8rem !important; */
    position: absolute;
    left: -38px !important;
    top: 5px !important;
  }
`;

export const ProspectLayout = styled.div`
  position: relative;
  & > * {
    &:first-child {
      // border-left: 1px solid black;
    }
    &:last-child {
      display: none;
      position: absolute;
      top: 35px;
      & > .btn_inbox-show {
        margin-right: 0.6rem;
        border-radius: 2rem;
        padding: 0.5rem 1.5rem;
        background-color: #972929;
        font-size: 1.6rem;
        color: white;
        font-weight: 500;
        margin-left: -18.5rem;
      }
      & > .btn_prospect-show {
        background-color: #716aca;
        padding: 1.5rem;
        border-radius: 5rem;
        cursor: pointer;

        margin-left: -5.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        & > * {
          color: white;
          font-size: 1.6rem;
        }
      }

      /* ${theme.queryStatement(theme.breakpoints.xxllgg)} {
        display: block;
      } */
      ${theme.queryStatement(theme.breakpoints.xxllg)} {
        display: block;
      }
    }
  }
`;
