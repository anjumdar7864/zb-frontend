import theme from "@/theme";
import styled from "@emotion/styled";

export const CreateFollowUpStyled = styled.div`
  padding: 16px;
  display: grid;
  background-color: #f7f7f7;
  min-height: calc(100vh - 7rem);
  min-height: calc(100svh - 7rem);
  align-content: start;

  & >.Last {
      padding: 1.3rem 0rem;
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 80rem;
      border-radius: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: end;
      & >.back {
        border:1px solid #777777;
        width:100px ; 
        padding-inline: 12px;
        padding-block: 8px;
        border-radius: 0.8rem;
        // color: #777777;
        // font-weight: 500;
      margin-right: 1rem;

      }
      
& >.Send {
      padding: 8px 12px;
      height:40px ;
      // font-size: 14px;
      border: 0.1rem solid #c1c4cc;
      // font-weight: 500;
      border-radius: 0.8rem;
      // color:#FFFFFF;
      // background-color:#00BD82;
      transition: background-color 0.3s ease-in-out;
      & > .text {
          // font-size: 14px;
      }

      &:not(:disabled):hover {
        opacity:0.6;
      }
      }

  }

  & > .top {
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    overflow: hidden;
    padding-bottom: 8px ;

    & > h1 {
      // font-size: 1.95rem;
      // font-weight: 700;
      // color: #012635;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    // & > button {
    //   display: grid;
    //   align-items: center;
    //   justify-content: center;
    //   grid-template-columns: auto auto;
    //   gap: 0.7rem;
    //   background-color: #5867dd;
    //   transition: background-color 300ms;
    //   padding: 0.6rem 1.05rem;
    //   border-radius: 0.5rem;

    //   & > .icon {
    //     font-size: 0.9rem;
    //     line-height: 0;
    //     color: #fff;
    //   }

    //   & > .text {
    //     font-size: 1.1375rem;
    //     color: #fff;
    //   }

    //   &:hover {
    //     background-color: #384ad7;
    //   }
    // }
  }

  & > .bottom {
    max-width: 80rem;
    background-color: #fff;
    border:1px solid #E0E0E0;
    padding: 16px;
    border-radius: 0.8rem;
    display: grid;
    gap: 3rem;

    & > .top {
      display: grid;
      align-items: center;
      grid-template-columns: 1fr;
      gap: 12px;

      & > label {
        display: grid;
        align-items: center;
        grid-template-columns: 1fr;
        gap: 0.8rem;

        ${theme.queryStatement(theme.breakpoints.md)} {
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        & > .left {
          display: grid;
          align-items: center;
          grid-template-columns: auto auto;
          gap: 0.5rem;
          justify-content: start;
          justify-items: start;

          & > .text {
            // color: #012635;
            // font-size: 1.3rem;
            // font-weight: 500;
            opacity: 0.8;
          }
          & > .icon {
            color:#012635;
            font-size: 1.2rem;
            line-height: 0;
            cursor: pointer;
          }
        }

        & > .right {
          display: grid;
          gap: 0.25rem;
          & > * {
            ${theme.queryStatement(theme.breakpoints.md)} {
              max-width: unset;
            }
          }
          
          & > button {
            width: 100%;
            padding: 1.5rem 1.5rem;
            border-radius: 0.3rem;
            border: 2px dashed #D3D7DD;
            display: grid;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
            grid-template-columns: auto auto;
            transition: 300ms;

            & > .text {
              color: #012635;
              font-size: 1.3rem;
              transition: color 300ms;
              display: block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            & > .icon {
              line-height: 0;
              font-size: 1.5rem;
              color: #5867dd;
              transition: color 300ms;
            }

            &:hover {
              border: 2px dashed #00BD82;
            }
          }
          & > select {
            padding: 1.1rem 4rem 1.1rem 1.5rem;
            border: 0.1rem solid #c1c4cc;
            color: #575962;
            background-color: transparent;
            outline: none;
            border-radius: 0.35rem;
            transition: background-color 300ms, color 300ms, border-color 300ms;
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            background-image: url("${(p) => p.icon}");
            background-repeat: no-repeat;
            background-position: calc(100% - 1.5rem) center;
            background-size: 1rem;
            width: 100%;
            font-size: 1.3rem;

            &:focus {
              border-color: #716aca;
              color: #575962;
              background-color: #fff;
            }
          }
          & > div{
            display: flex;  
            width:100%;
            flex-wrap: wrap;
            & > span {
            color: #212529;
            font-size: 1.3rem;
            font-weight: 300;
            opacity: 0.8;
            font-style: italic;

            &.selected2 {
              display: inline-block;
              padding: 0.9rem 1.3rem;
              border-radius: 0.4rem;
              margin:2px;
              background-color: #c8c8c8;
              cursor: pointer;
              color: #000;
              width: fit-content;
              font-style: normal;
              font-weight: 400;
              -webkit-user-select: none; 
              -ms-user-select: none;
              user-select: none;
            }

            &.selected3 {
              display: inline-block;
              padding: 0.9rem 1.3rem;
              border-radius: 0.4rem;
              margin:2px;
              background-color: #c8c8c8;
              cursor: pointer;
              opacity:0.3;
              color: #000;
              width: fit-content;
              font-style: normal;
              font-weight: 400;
              -webkit-user-select: none; 
              -ms-user-select: none;
              user-select: none;
            }

            &.selected {
              display: inline-block;
              padding: 0.9rem 1.3rem;
              border-radius: 0.4rem;
              margin:2px;
              background-color: #00bd82;
              cursor: pointer;
              color: #fff;
              width: fit-content;
              font-style: normal;
              font-weight: 400;
              -webkit-user-select: none; 
              -ms-user-select: none;
              user-select: none;
            }
          }
          }
          

          & > input {
            padding: 1.1rem 1.5rem;
            border: 0.1rem solid #D3D7DD;
            color: #575962;
            background-color: transparent;
            outline: none;
            border-radius: 0.8rem;
            transition: background-color 300ms, color 300ms, border-color 300ms;
            font-size: 1.3rem;
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

          & > p {
            color: #f4516c;
            font-size: 1.1rem;
          }
        }
      }
    }
    & > .bottom {
      display: grid;
      align-items: center;
      justify-content: center;
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
  border-radius:0.8rem;
  overflow: hidden;
  padding-bottom: 2rem;
  & > .top {
    padding-inline: 1.3rem;
    padding-block: 1rem;
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
   
    & > h2 {
      font-size: 1.6rem;
      font-weight: 600;
      color: #012635;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  & > .bottom {
    padding-inline: 1.3rem;
    display: grid;
    gap: 1.5rem;

    & > .top {
      display: grid;
      gap: 0.5rem;
      & > input {
        padding: 1.1rem 1.5rem;
        border: 0.1rem solid #D3D7DD;
        color: #575962;
        background-color: transparent;
        outline: none;
        border-radius: 0.8rem;
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
      padding-bottom:1rem;
      border: 2px solid #f4f5f8;
        border-radius:0.8rem;
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

          &:first-of-type {
            text-align: left;
            width: calc(100%-15rem);
            min-width: 15rem;
          }
          &:nth-of-type(2) {
            width: 15rem;
            white-space: nowrap;
          }
          &:last-of-type {
            text-align: right;
            width: 14rem;
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
            width: calc(100%-15rem);
            min-width: 15rem;
          }
          &:nth-of-type(2) {
            width: 15rem;
            white-space: nowrap;
          }
          &:last-of-type {
            text-align: right;
            width: 14rem;
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
