import theme from "@/theme";
import styled from "@emotion/styled";

export const CampaignsStyled = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 100%;
    overflow: auto;
    input:-webkit-autofill {
      appearance: none;
      background-color: red !important; /* Sets autofilled background color to white */
      background-image: none !important;
      color: #000 !important; /* Ensures text color is dark */
      box-shadow: 0 0 0 30px white inset !important;
      -webkit-text-fill-color: #000 !important;
      ::-webkit-scrollbar {
        width: 2px;
        height:4px;
        border-radius: 2rem;
      }
      ::-webkit-scrollbar-thumb {
        background: #00BD82;
        border-radius: 2rem;
      }
      input:-webkit-autofill {
        appearance: none;
        background-color: white !important;
        color: #000 !important;
        box-shadow: 0 0 0 30px white inset !important;
        -webkit-text-fill-color: #000 !important;
      } 
    }
  & > . paginationrow {
    border-bottom-left-right:'14px'
  }
  & > .top {
    display: grid;
    & > .top {
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      overflow: hidden;
      padding:24px 40px;
      background-color:white;
      & > h1 {
        font-size: 32px;
        font-weight: 700;
        color: #000000;
        line-height: 40px;
      }
      & > .right {
        display: grid;
        align-items: center;
        gap: 0.8rem;
        grid-template-columns: auto auto;
        ${theme.queryStatement(1050)} {
          justify-items: start;
          justify-content: start;
        }
        ${theme.queryStatement(470)} {
          grid-template-columns: auto;
        }
        & > button {
          display: grid;
          align-items: center;
          justify-content: center;
          grid-template-columns: auto auto;
          background-color: #00bd82;
          transition: background-color 300ms;
          padding: 8px 10px;
          border-radius:8px;
          font-size: 14px;
          color: #FFFFFF;
          line-height:24px;
          width:257px;  
          & > .icon {
            font-size: 0.9rem;
            line-height: 0;
            color: #fff;
          }

          // &:hover {
          //   background-color: #384ad7;
          // }
        }
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
        border-radius: 0.3rem;

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






   & > .bottom {
      display:flex;
      grid-template-columns: auto auto;
      align-items: center;
      justify-content: space-between;
      ${theme.queryStatement(1050)} {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      & > .left {
        position: relative;
        width: fit-content;

        ${theme.queryStatement(1050)} {
          justify-items: start;
          justify-content: start;
        }

        ${theme.queryStatement(470)} {
          grid-template-columns: auto;
        }
        & > form {
            background-color:white;
            padding:10px;
            gap:7px;
            width: 250px;
            height: 48px;
            border: 1px solid #D3D7DD;
            border-radius: 8px;
            display: flex;
            align-items: center;
          & > .search-icon {
            left: 10px;
            font-size: 18px;
            color: #333;
          }
          & > input {
            padding-left;
            border:none;
            outline: none;
            font-size: 14px;
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
            border-radius: 0.3rem;

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

        & > .right {
          display: grid;
          align-items: center;
          gap: 1rem;
          grid-template-columns: auto auto;
          ${theme.queryStatement(1050)} {
            justify-items: end;
            justify-content: end;
          }

          ${theme.queryStatement(470)} {
            grid-template-columns: auto;
            justify-content: stretch;
          }


          & > button {
            display: grid;
            align-items: center;
            justify-content: center;
            grid-template-columns: auto auto;
            gap: 0.7rem;
            background-color: ${(p) =>
            p.isShowOnlyFollowUp ? "#C2FFEC" : "transparent"};
              transition: background-color 300ms, border 300ms;
            padding: 0.6rem 1.05rem;
            border-radius: 0.3rem;

            border: ${(p) =>
             p.isShowOnlyFollowUp ? "1px solid #00BD82" : "1px solid #d8d8d8"};

            ${theme.queryStatement(470)} {
              justify-self: start;
            }

            & > .icon {
              font-size: 0.9rem;
              line-height: 0;
              color: ${(p) => (p.isShowOnlyFollowUp ? "#fff" : "#212529")};
            }

            & > .text {
              font-size: 1.1375rem;
              color: ${(p) => (p.isShowOnlyFollowUp ? "#fff" : "#212529")};
            }

            &:hover {
              background-color: ${(p) =>
              p.isShowOnlyFollowUp ? "#1192f6" : "#fff"};
              border: ${(p) =>
              p.isShowOnlyFollowUp
            ? "1px solid #1192f6"
              : "1px solid #d8d8d8"};
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
      & > .right {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 175px;
        height: 48px;
        background-color: white;
        border: 1px solid #777777;
        border-radius: 8px;
        color:#777777;
      }
    }
  & > div {
    overflow:auto;
    & > .bottomTable {
      background-color: white;
      display: block;
      flex-grow: 1;
      width: 100%;
      height: 100%;
      // overflow: auto;
      // scrollbar-width: thin;
      // scrollbar-color: #00BD82 transparent;
      // position: relative;
      border-radius:8px;
      ${theme.queryStatement(theme.breakpoints.xxllg)} {
        width: 100%;
        overflow-x: auto;
      }

      & > .row {
        border-inline:1px solid var(--Extra-Grey, #e0e0e0);
        border-top:1px solid var(--Extra-Grey, #e0e0e0);
        width: fit-content;
        display: grid;
        grid-template-columns: 
        minmax(257px, 1.5fr)
        minmax(120px, 1fr)
        minmax(120px, 1fr)
        minmax(120px, 1fr)
        minmax(120px, 1fr)
        minmax(120px, 1fr)
        minmax(145px, 1fr)
        minmax(120px, 1fr)
        minmax(100px, 1fr)
        minmax(80px, 0.5fr);        


        // grid-template-columns: 
        //   257px
        //   96px
        //   120px
        //   120px
        //   120px  
        //   120px
        //   145px
        //   120px
        //   100px
        //   80px;
        align-items: center;
        @media (min-width: 1400px) {
          width: 100%;
        }
        & > h6 {
          display: flex;
          flex-grow:1;
          align-items: center;
          padding:13px 16px;
          & > .icon {
            line-height: 0;
            width:14px!important;
            margin-right:0.3rem;
            height:18px;
            & > img {
              width:14px!important;
              height:18px;
              color:black;
            }
        }
        & > .text {
            color:#012635;
            font-size: 1.2rem;
            font-weight: 500;
            display: inline-block;
            line-height:22px;
          }

          & > .info {
          margin-top:-5px;
          margin-inline:0.3rem;
          width:14px!important;
          display:flex , 
          align-item:center , 
          height:18px;
            color: #7c7c7c4b;
            font-size: 1.2rem;
            cursor: pointer;

          }

          &.sort {
            display: grid;
            align-items: center;
            grid-template-columns: auto auto;
            gap: 0.3rem;
            cursor: pointer;

            & > .text {
              color: #49515b;
              font-size: 1.3rem;
              font-weight: 400;
            }

            &.select {
              color: #5867dd;
            }
          }

          &.data {
            color: #49515b;
            font-size: 1.3rem;
            font-weight: 400;
          }
        }

        & > .error {
          /* grid-column: 6/ 11; */
          font-size: 1.3rem;
          color: #212529;
        }

        &.body {
          border-inline:1px solid var(--Extra-Grey, #e0e0e0);
          // border-bottom:1px solid var(--Extra-Grey, #e0e0e0);
          width: fit-content;
          display: grid;
          grid-template-columns: 
          minmax(257px, 1.5fr)
          minmax(120px, 1fr)
          minmax(120px, 1fr)
          minmax(120px, 1fr)
          minmax(120px, 1fr)
          minmax(120px, 1fr)
          minmax(145px, 1fr)
          minmax(120px, 1fr)
          minmax(100px, 1fr)
          minmax(80px, 0.5fr);  
          align-items: center;
          @media (min-width: 1400px) {
            width: 100%;
          }
          & > .col {
            flex-grow:1;
            justify-self:start;
            display: flex;
            align-items: center;
            padding:13px 16px;
            width:100%;
            overflow: hidden;
            & > p{
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              margin: 0;
              color:#777777;
              line-height:22px;
              font-size:14px;
              font-weight:500;
            }
            & > section {
              position: relative;
              margin-top: -0.5rem;
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
              border: 1px solid #E0E0E0;
              border-radius:12px;
              padding:5px 5px;
              width:139px;
              display:flex;
              flex-direction:column;
              // gap:8px;
              justify-content:space-evenly;
                position: absolute;
                top: 95px;
                right: 19%;
                transform: translate(-1.5rem, -50%);

                box-shadow: 4px 4px 18px #3232324d;
                background-color: #fff;
                // display: grid;
                // align-items: center;
                // padding: 0.5rem 1.3rem;
                border-radius: 0.5rem;
                // grid-template-columns: auto auto auto;
                // align-items: center;

                & > button {
                border: 3px;
                height:40px;
      
                  display:flex;
                  border-radius: 0.2rem;
                  // display: grid;
                  // gap: 1rem;
                  // grid-template-columns: auto auto;
                  transition: background-color 300ms;
                  // align-items: center;

                

                  & > .icon {
                    color: #88898d;
                    font-size: 1rem;
                    line-height: 0;
                  }
                  & > .text {
                    padding-top:10px;
                    padding-left:10px;
                    // padding-left:2px;
                    color: #333;
                    font-size: 1.3rem;
                    align-text:start
                  }

                  &:hover {
                  border-radius:8px;
                  border: 14px ;
                    background-color:  #F7F8FC;
                  }
                }
              }
            }

            &.data {
              & > p{
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              margin: 0;
              color:#777777;
              line-height:22px;
              font-size:14px;
              font-weight:500;
            }
            }

            &.dot {
              & > p {
                display: flex;
                align-items: center;
                gap: 0.8rem;
                & > .dot {
                  width: 0.65rem;
                  height: 0.65rem;
                  border-radius: 50%;
                  background-color: #34b4a3;
                }
                & > .text {
                   white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              margin: 0;
              color:#777777;
              line-height:22px;
              font-size:14px;
              font-weight:500;
                }
              }
            }
          }
        }
      }
   
      & > .table {
        &::-webkit-scrollbar {
          width: 2px;
          height:4px;
          border-radius: 2rem;
        }
        &::-webkit-scrollbar-thumb {
          background: #00BD82;
          border-radius: 2rem;
        }
      border-bottom:none;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;





      & > .row {
        // border-inline:1px solid var(--Extra-Grey, #e0e0e0);
        border-bottom:1px solid var(--Extra-Grey, #e0e0e0);
        width: fit-content;
        display: grid;
        grid-template-columns: 
        minmax(257px, 1.5fr)
        minmax(120px, 1fr)
        minmax(120px, 1fr)
        minmax(120px, 1fr)
        minmax(120px, 1fr)
        minmax(120px, 1fr)
        minmax(145px, 1fr)
        minmax(120px, 1fr)
        minmax(100px, 1fr)
        minmax(80px, 0.5fr);        


        // grid-template-columns: 
        //   257px
        //   96px
        //   120px
        //   120px
        //   120px  
        //   120px
        //   145px
        //   120px
        //   100px
        //   80px;
        align-items: center;
        @media (min-width: 1400px) {
          width: 100%;
        }
        & > h6 {
          display: flex;
          flex-grow:1;
          align-items: center;
          padding:13px 16px;
          & > .icon {
            line-height: 0;
            width:14px!important;
            margin-right:0.3rem;
            height:18px;
            & > img {
              width:14px!important;
              height:18px;
              color:black;
            }
        }
        & > .text {
            color:#012635;
            font-size: 1.2rem;
            font-weight: 500;
            display: inline-block;
            line-height:22px;
          }

          & > .info {
          margin-top:-5px;
          margin-inline:0.3rem;
          width:14px!important;
           display:flex , 
          align-item:center , 
          height:18px;
            color: #7c7c7c4b;
            font-size: 1.2rem;
            cursor: pointer;

          }

          &.sort {
            display: grid;
            align-items: center;
            grid-template-columns: auto auto;
            gap: 0.3rem;
            cursor: pointer;

            & > .text {
              color: #49515b;
              font-size: 1.3rem;
              font-weight: 400;
            }

            &.select {
              color: #5867dd;
            }
          }

          &.data {
            color: #49515b;
            font-size: 1.3rem;
            font-weight: 400;
          }
        }

        & > .error {
          /* grid-column: 6/ 11; */
          font-size: 1.3rem;
          color: #212529;
        }

        &.body {
          // border-inline:1px solid var(--Extra-Grey, #e0e0e0);
          // border-bottom:1px solid var(--Extra-Grey, #e0e0e0);
          width: fit-content;
          display: grid;
          grid-template-columns: 
          minmax(257px, 1.5fr)
          minmax(120px, 1fr)
          minmax(120px, 1fr)
          minmax(120px, 1fr)
          minmax(120px, 1fr)
          minmax(120px, 1fr)
          minmax(145px, 1fr)
          minmax(120px, 1fr)
          minmax(100px, 1fr)
          minmax(80px, 0.5fr);  
          align-items: center;
          @media (min-width: 1400px) {
            width: 100%;
          }
          & > .col {
            flex-grow:1;
            justify-self:start;
            display: flex;
            align-items: center;
            padding:13px 16px;
            width:100%;
            overflow: hidden;
            & > p{
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              margin: 0;
              color:#777777;
              line-height:22px;
              font-size:14px;
              font-weight:500;
            }
            & > section {
              position: relative;
              margin-top: -0.5rem;
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
              border: 1px solid #E0E0E0;
              border-radius:12px;
              padding:5px 5px;
              width:139px;
              display:flex;
              flex-direction:column;
              // gap:8px;
              justify-content:space-evenly;
                position: absolute;
                top: 95px;
                right: 19%;
                transform: translate(-1.5rem, -50%);

                box-shadow: 4px 4px 18px #3232324d;
                background-color: #fff;
                // display: grid;
                // align-items: center;
                // padding: 0.5rem 1.3rem;
                border-radius: 0.5rem;
                // grid-template-columns: auto auto auto;
                // align-items: center;

                & > button {
                border: 3px;
                height:40px;
      
                  display:flex;
                  border-radius: 0.2rem;
                  // display: grid;
                  // gap: 1rem;
                  // grid-template-columns: auto auto;
                  transition: background-color 300ms;
                  // align-items: center;

                

                  & > .icon {
                    color: #88898d;
                    font-size: 1rem;
                    line-height: 0;
                  }
                  & > .text {
                    padding-top:10px;
                    padding-left:10px;
                    // padding-left:2px;
                    color: #333;
                    font-size: 1.3rem;
                    align-text:start
                  }

                  &:hover {
                  border-radius:8px;
                  border: 14px ;
                    background-color:  #F7F8FC;
                  }
                }
              }
            }

            &.data {
              & > p{
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              margin: 0;
              color:#777777;
              line-height:22px;
              font-size:14px;
              font-weight:500;
            }
            }

            &.dot {
              & > p {
                display: flex;
                align-items: center;
                gap: 0.8rem;
                & > .dot {
                  width: 0.65rem;
                  height: 0.65rem;
                  border-radius: 50%;
                  background-color: #34b4a3;
                }
                & > .text {
                   white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              margin: 0;
              color:#777777;
              line-height:22px;
              font-size:14px;
              font-weight:500;
                }
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

export const NewCampaignModalStyled = styled.form`
  width: 95vw;
  max-width: 74.6rem;
  background-color: #fff;
  border-radius:1.2rem;
  overflow:hidden;                
  & > .top {
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    padding-inline: 1.95rem;
    padding-block: 1rem;
    border-bottom:1px solid #F0F0F0;
    & > h2 {
      font-size: 2rem;
      color: #012635;
      font-weight: 600;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    & > button {
      font-size: 2.6rem;
      color: #012635;
      transition: opacity 0.3s;
      display:flex;
      align-items: center;
      justify-content:center;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  & > .middle {
    padding: 1.95rem;
    display: grid;
    gap: 1rem;
    & > .middleCover{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.4rem;
      & > .item {
        align-items: center;
        ${theme.queryStatement(theme.breakpoints.sm)} {
          grid-template-columns: 15rem 1fr;
        }

          
        & > .right {
          display: grid;
          gap: 0.25rem;

          & > .text {
            color: #212529;
            font-size: 1.3rem;
            font-weight: 500;
            padding-bottom: 0.2rem;
          }

          & > .icon {
            color: #c1c4cc;
            cursor: pointer;
            line-height: 1.95;
            padding-left: 0.5rem;
            display: inline-block;
            font-size: 1.2rem;
          }

          & > p {
            font-size: 1.1rem;
            color: #f4516c;
          }

          & > input {
            padding: 1.5rem 1.5rem;
            border: 0.1rem solid #c1c4cc;
            color: #404042;
            background-color: transparent;
            outline: none;
            border-radius: 0.8rem;
            transition: background-color 300ms, color 300ms, border-color 300ms;
            width: 100%;
            font-size: 1.3rem;
            &:focus {
              border-color: #00BD82;
              color: #575962;
              background-color: #fff;
            }
            &:disabled {
              border-color: #00BD82;
              color: #6f727d;
              background-color: #00BD82;
            }
          }
          & > .SelectCover{
            position: relative;
          & > select {
            padding: 1.5rem 4rem 1.5rem 1.5rem;
            border: 0.1rem solid #c1c4cc;
            color: #575962;
            background-color: transparent;
            outline: none;
            border-radius: 0.8rem;
            transition: background-color 300ms, color 300ms, border-color 300ms;
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            background-repeat: no-repeat;
            background-position: calc(100% - 1.5rem) center;
            background-size: 1rem;
            width: 100%;
            font-size: 1.3rem;

            &:focus {
              border-color: #00BD82;
              color: #575962;
              background-color: #fff;
            }
          }
            }
        }
      }
    }
      & > .item {
        display: grid;
        align-items: center;
        gap: 1.5rem;
        ${theme.queryStatement(theme.breakpoints.sm)} {
          grid-template-columns: 15rem 1fr;
        }
        & > .right {
          display: grid;
          width:calc(50% - 0.7rem);
          & > .left {
             & > .text {
            color: #212529;
            font-size: 1.3rem;
            font-weight: 500;
            padding-bottom: 0.2rem;
          }

          & > .icon {
            color: #212529;
            cursor: pointer;
            line-height: 2.95;
            padding-left: 0.5rem;
            display: inline-block;
            font-size: 1.2rem;
          }    
          }
          & > p {
            font-size: 1.1rem;
            color: #f4516c;
          }

          & > input {
            padding: 1.5rem 1.5rem;
            border: 0.1rem solid #c1c4cc !important;
            color: #404042;
            background-color: transparent;
            outline: none;
            border-radius: 0.8rem;
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
        }
      }
  }
  & > .bottom {
    display: grid;
    grid-template-columns: auto auto;
    gap: 0.5rem;
    align-items: center;
    justify-content: end;
    padding-inline: 1.95rem;
    padding-block: 1rem;
    border-top:1px solid #F0F0F0;
    & > .buttonSave{
      padding: 0.85rem 2.3rem;
      font-size: 1.5rem;
      border: 0.1rem solid #c1c4cc;
      font-weight: 500;
      border-radius: 0.8rem;
      color:#FFFFFF;
      background-color:#00BD82;
      transition: background-color 0.3s ease-in-out;
      & > .text {
          font-size: 1.5rem;
      }

      &:not(:disabled):hover {
        opacity:0.6;
      }
    }

    & > button:first-of-type {
      padding: 0.85rem 1.5rem;
      font-size: 1.5rem;
      border: 0.1rem solid #c1c4cc;
      font-weight: 500;
      border-radius: 0.8rem;
      color:#777777;
      transition: background-color 0.3s ease-in-out;
      & > .text {
              font-size: 1.5rem;
      }

      &:not(:disabled):hover {
        background-color: #fff;
      }
    }
  }
`;

export const NewCampaignModalTooltipStyled = styled.div``;
