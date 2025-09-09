import theme from "@/theme";
import styled from "@emotion/styled";
import { styled as MUIStyled } from "@mui/material/styles";
import { Menu } from "@mui/material";



export const StyledMenu = MUIStyled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    {...props}
  />
))(() => ({
  "& .MuiPaper-root": {
    padding: 0,
    borderRadius: 10,
    minWidth: 180,
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    backgroundColor: "transparent",
  },

  "& .MuiList-root": {
    padding: 0,
    backgroundColor: "transparent",
  },
}));

export const CreateTemplateStyled = styled.div`
  padding-inline: 16px;
  ${theme.queryStatement(900)} {
    padding: 1.3rem 1.3rem;
  }
  & > .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    padding: 16px 0px;
    
    & > h1 {
      // font-size: 2rem;
      // font-weight: 700;
      // color: #012635;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      // line-height: 2.2rem;
    }
    & > button {
      background-color: white;
      transition: background-color 300ms;
      padding: 1.3rem 2.8rem;
      border-radius: 0.5rem;
      color: #7c7c7c;
      border-radius: 1rem;
      transition: 0.3s ease-in-out;
      &:hover {
        background-color: #384ad7;
        color: white;
      }
    }
  }

  & > .bottom {
    display: grid;
    gap: 2.5rem;
    grid-template-columns: 3fr 2fr;
    align-content: start;
    ${theme.queryStatement(900)} {
      grid-template-columns: 1fr;
    }
    /* display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    background-color: red;

    & > * {
      flex: 1 0 calc(47% - 2rem);
    }
 */

    & > .left {
      padding-top: 1rem;
      padding-bottom: 1rem;

      display: grid;
      gap: 16px;
      align-content: start;

      & > .top {
        display: grid;
        gap: 3rem;
        grid-template-columns: 1fr 1fr;

        ${theme.queryStatement(theme.breakpoints.md)} {
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        & > .item {
          display: grid;
          gap: 0.2rem;
          align-content: start;

          & > .title {
            padding-bottom: 0.5rem;
            & > .wrapper {
              display: flex;
              align-items: center;

              & > .text {
                // font-size: 1.2rem;
                // font-weight: 500;
                // color:#012635;
              }
              & > .icon {
                display: flex;
                align-items: center;
                justify-content: center;
                & > .info {
                display:flex ; 
                  & > * {
                    margin-left: 0.5rem;
                    font-size: 1.1rem;
                    color: #7c7c7c;
                  }
                }
              }
            }
          }

          & > input {
            padding-inline:1.4rem;
            height:40px;
            border: 1px solid #D3D7DD;
            border-radius: 0.8rem;
            font-size: 1.2rem;
            font-weight: 500;
            color: #7c7c7c;
            transition: background-color 300ms, color 300ms, border-color 300ms;
            &::placeholder {
              font-weight: 400;
              color: #7c7c7c;
              font-size: 1.2rem;
            }
            &:focus {
              outline: none;
            }

            &:hover {
             border-color: #00BD82;
            }
          }

          & > select {
            padding: 1.3rem 1.4rem;
           border: 1px solid #D3D7DD;
            border-radius: 0.5rem;
            font-size: 1.2rem;
            font-weight: 500;
            color: #7c7c7c;
            background-color: hsla(0, 0%, 100%, 0.7);
            outline: none;
            transition: background-color 300ms, color 300ms, border-color 300ms;
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            background-image: url("${(p) => p.ChevronDown}");
            background-repeat: no-repeat;
            background-position: calc(100% - 1.5rem) center;
            background-size: 1rem;

            &:focus {
              border-color: #D3D7DD;
            //   border: 1px solid #D3D7DD;
            // border-radius: 0.8rem;
              color: #575962;
              background-color: #fff;
            }
          }
          & > .error {
            color: #f4516c;
            font-size: 1rem;
            padding-left: 1rem;
            padding-top: 0.4rem;
          }
          & > .info {
            color:#012635;
            font-size: 1rem;
            padding-top: 0.4rem;
            letter-spacing: 0.5px;
          }
        }
      }
      & > .bottom {
        /* display: grid;
        gap: 1rem;
        align-content: start; */

        & > .top {
          /* display: grid;
          gap: 1rem;
          align-content: start; */

          & > .top {
            /* display: grid;
            gap: 2rem;
            align-items: center;
            grid-template-columns: auto auto;
            justify-content: space-between; */

            & > header {
              & > h2 {
                font-size: 1.6rem;
                color: #012635;
                font-weight: 600;
                line-height: 2.8rem;
              }
            }

            & > .right {
              padding: 0rem 0rem 1.8rem 0rem;
              display: flex;
              align-items: flex-end;
              justify-content: space-between;
              & > .inner{
              & > h2 {
                // font-size: 1.6rem;
                // color: #012635;
                // font-weight: 600;
                // line-height: 2.8rem;
              }
              & > p {
                // font-size: 1.2rem;
                // color:#777777;
                & > span {
                  color: #3086EE;
                }
              }
                }
              & > button {
                border-radius:0.5rem;
                padding:1rem 1.5rem;
                display: flex;
                align-items: center;
                gap: 0.7rem;
                background-color: #F0F0F0;
                transition: 0.3s ease-in-out;
                color:#012635;
                font-weight:500;
                & > * {
                  &:first-child {
                    font-size: 1.1rem;
                  }
                }
                &:hover {
                  background-color: #92929290;
                }

                /* &:last-of-type {
                  background-color: #ebebeb;
                  & > .icon {
                    color: #000;
                    display: inline-block;
                    transition: transform 300ms;
                    transform-origin: center center;
                    transform: rotate(
                      ${(p) => (p.isNegativeWordsShowing ? `180` : `0`)}deg
                    );
                  }
                  & > .text {
                    color: #000;
                  }
                  &:hover {
                    background-color: #dadada;
                  }
                } */
              }
            }
          }
          & > .bottom {
            background-color: #FFFFFF;
            border:1px solid #E0E0E0;
            border-radius: 0.5rem;
            display: flex;
            flex-wrap: wrap;

            & > li {
              display: inline-block;
              font-size: 1.2rem;
              color: #7c7c7c;
              padding-inline: 1.2rem;
              padding-block: 0.5rem;
              border-radius: 0.5rem;
              position: relative;
              line-height: 2.1rem;
              background-color: #F7F8FC;
              margin:0.2rem;
              display: flex;
              align-items: center;
              justify-content: center;
              &::marker {
                color: #7c7c7c;
              }
            }
          }
        }
        & > .bottom {
          display: grid;
          gap: 1.5rem;
          align-content: start;

          & > .top {
            background: #fff;
            border: 1px solid #E0E0E0;
            border-radius: 0.8rem;
            ${theme.queryStatement(900)} {
              box-shadow: 0 0 2px #3232321a;
            }
            & > *:not(:last-child) {
              border-bottom: 1px solid #d8d8d8;
            }



          & > .topHeader {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding-inline:16px;
            & > .messageUnderHeader {
              & > h5 {
                // font-size: 1.6rem;
                // color: #012635;
                // font-weight: 600;
              }
            }
            & > .track {
                padding: 8px 0rem 8px 16px ;
              & > .trackChild{
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #F7F7F7;
                border: 1px solid #E0E0E0;
                border-radius: 1rem;
                // ${theme.queryStatement(1120)} {
                //   grid-template-columns: repeat(4, 8rem) 10rem;
                // }
                // ${theme.queryStatement(525)} {
                //   padding: 1.3rem 0.25rem;
                //   grid-template-columns: repeat(4, 6rem) 8rem;
                // }
                // grid-template-columns: repeat(5, 12rem);
                // ${theme.queryStatement(460)} {
                //   align-content: start;
                // }
                & > .itemHr{
                  height:2rem;
                  width:1px;
                  background:#00000033;
                }
                & > .item {
                  display: flex;
                  gap: 0.65rem;
                  justify-items: center;
                  user-select: none;
                  cursor: pointer;
                  padding: 0.5rem;
                  ${theme.queryStatement(460)} {
                    align-content: start;
                    position: relative;
                    margin-top: 2rem;
                    &:nth-of-type(2n) {
                      margin-top: 5.56rem;
                    }
                  }

                  & > h6 {
                    display: grid;
                    gap: 0.65rem;
                    align-items: center;
                    justify-content: center;
                    grid-template-columns: auto;
                    ${theme.queryStatement(460)} {
                      position: absolute;
                      top: -2.65rem;
                      left: 50%;
                      transform: translate(-50%, 0);
                      white-space: nowrap;
                      z-index: 3;
                    }

                    &:has(.icon) {
                      grid-template-columns: auto auto;
                    }

                    & > .text {
                      color: #212121;
                      font-size: 1rem;
                      font-weight: 600;
                    }
                    & > .icon {
                      font-size: 1.1rem;
                      color: #23b777;
                      line-height: 0;

                      &.error {
                        font-size: 1.1rem;
                        color: #f4516c;
                      }
                    }
                  }

                  & > .bottom {
                    display: grid;
                    position: relative;
                    justify-content: center;
                    justify-items: center;
                    align-items: center;
                    align-content: center;
                    justify-self: stretch;

                    & > .text {
                      width: 32px;
                      height: 32px;
                      display: flex;
                      border-radius: 0.8rem;
                      justify-content: center;
                      align-items: center;
                      position: relative;
                      z-index: 2;
                      font-size: 1.3rem;
                      color: #777777;
                      font-weight: 600;
                      border: 0.2rem solid #dedfe7;
                      background: #E0E0E0;
                      transition: background-color 300ms, color 300ms,
                        box-shadow 300ms;
                    }

                    & > .left {
                      display: block;
                      background-color: #dedfe7;
                      height: 0.2rem;
                      position: absolute;
                      z-index: 1;
                      right: 50%;
                      left: 0;
                      top: 50%;
                      transform: translate(-50, 0);
                      transition: background-color 300ms;
                    }
                    & > .right {
                      display: block;
                      background-color: #dedfe7;
                      height: 0.2rem;
                      position: absolute;
                      z-index: 1;
                      right: 0;
                      left: 50%;
                      top: 50%;
                      transform: translate(-50, 0);
                      transition: background-color 300ms;
                      
                    }
                  }

                  ${theme.queryStatement(460)} {
                    & > .bottom {
                      & > .left,
                      & > .right {
                        height: 0.1rem;
                      }
                    }
                    &:nth-of-type(2n) {
                      & > .bottom {
                        & > .left {
                          &::after {
                            content: "";
                            display: block;
                            background-color: #dedfe7;
                            height: 2.8rem;
                            width: 0.1rem;
                            position: absolute;
                            z-index: 1;
                            left: 0;
                            bottom: 0.1rem;
                            transform: translate(-75%, 0);
                            transition: background-color 300ms;
                          }
                        }
                        & > .right {
                          &::after {
                            content: "";
                            display: block;
                            background-color: #dedfe7;
                            height: 2.8rem;
                            width: 0.1rem;
                            position: absolute;
                            z-index: 1;
                            right: 0;
                            bottom: 0.1rem;
                            transform: translate(65%, 0);
                            transition: background-color 300ms;
                          }
                        }
                      }
                    }

                    &:not(:nth-of-type(2n)) {
                      & > .bottom {
                        & > .left::after {
                          content: "";
                          display: block;
                          background-color: #dedfe7;
                          height: 2.8rem;
                          width: 0.1rem;
                          position: absolute;
                          z-index: 1;
                          left: 0;
                          top: 0;
                          transform: translate(-75%, 0);
                          transition: background-color 300ms;
                        }
                        & > .right::after {
                          content: "";
                          display: block;
                          background-color: #dedfe7;
                          height: 2.8rem;
                          width: 0.1rem;
                          position: absolute;
                          z-index: 1;
                          right: 0;
                          top: 0;
                          transform: translate(65%, 0);
                          transition: background-color 300ms;
                        }
                      }
                    }
                  }

                  // &:hover {
                  //   & > .bottom > .text {
                  //     box-shadow: 0 0 8px #0000004d;
                  //   }
                  // }

                  &.done {
                    & > .bottom {
                      & > .text {
                        border: 1.5px solid #00BD82;
                        color: white;
                        background-color: #00BD82;
                      }

                      & > .left,
                      & > .right {
                        background-color: #15a0ea;
                      }
                    }
                  }

                  &.active {
                    & > .bottom {
                      & > .text {
                        border: 1.5px solid #00724E;
                        color:#00724E;
                        background-color: #C2FFEC;
                      }
                      & > .left,
                      & > .right {
                        background-color: #36a3f7;
                      }
                    }
                  }

                  ${theme.queryStatement(460)} {
                    &.done,
                    &.active {
                      & > .bottom {
                        & > .left::after,
                        & > .right::after {
                          background-color: #36a3f7;
                        }
                      }
                    }
                  }

                  &.error {
                    & > .bottom {
                      & > .text {
                        border-color: #f4516c;
                        color: #fff;
                        background-color: #f4516c;
                      }
                      & > .left,
                      & > .right,
                      & > .left::after,
                      .right::after {
                        background-color: #f4516c;
                      }
                    }
                  }
                }
              }
            }
          }




            & > .message {
              padding: 1.95rem 1.5rem 3.65rem 1.5rem;
              position: relative;

              & > textarea {
                color: transparent;
                caret-color: #777777;
                width: 100%;
                height: 10.2rem;
                outline: none;
                border: none;
                resize: none;
                position: relative;
                z-index: 2;
                background-color: transparent;
                word-break: break-word;
                font-size: 14px;
                font-weight: 500;
                line-height: 2rem;
                letter-spacing: 0.5px;
                ${(p) => p.isTextSpinnerShowing ? ` visibility: hidden;` : ""}
              }

              & > .container {
                position: absolute;
                top: 1.95rem;
                left: 1.5rem;
                right: 1.5rem;
                bottom: 3.65rem;
                & * {
                  display: inline;
                  word-break: break-word;
                  color: #777777;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 2rem;
                  letter-spacing: 0.5px;
                }

                & > p > .placeholder {
                  color: #3086EE;
                  padding-block:0.3rem;
                  line-height: 2rem;
                }

                & > p > .text-spinner {
                  color: #EA3815;
                  padding-block:0.3rem;
                  line-height: 2rem;
                }
              }

              & > .info {
                position: absolute;
                bottom: 1.95rem;
                right: 1.8rem;
                color: #a8a8a8;
                opacity: 0.7;
                font-size: 1.2rem;
                font-weight: 500;
                font-style: italic;
              }

              & > .error {
                bottom: 1.75rem;
                left: 6.6rem;
                right: 6.6rem;
                position: absolute;
                text-align: center;
                color: #ff0000;
                font-size: 1.1rem;
                font-weight: 500;

                & > strong {
                  color: #ff0000;
                  font-size: 1.1rem;
                  font-weight: 500;
                }
              }
            }
            & > .menuSection {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding:16px;

              & > section {
                display: flex;
                align-items: center;
                gap: 3rem;

                & > p {
                  font-size: 1.1rem;
                  font-weight: 500;
                  color: #5b53c0;
                  cursor: pointer;
                  background-color: #e2e0fd;
                  padding: 0.5rem 1rem;
                  border-radius: 3rem;
                }
                & > button {
                  display: flex;
                  align-items: center;
                  gap: 1rem;
                  color: #00BD82;
                  padding: 0.8rem 1.3rem;
                  border-radius: 0.8rem;
                  border: 1.5px solid #00BD82;
                  font-size: 1.1rem;
                  font-weight: 500;

                  & > * {
                    &:first-child {
                      font-size: 1.2rem;
                    }
                  }
                }
              }
              & > div {
                display: flex;
                align-items: center;
                gap: 1rem;
                & > * {
                  &:nth-child(2) {
                    background-color: #F0F0F0;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    // font-size: 1.1rem;
                    // font-weight: 500;
                    // padding: 0.8rem 1.3rem;
                      height:32px;
                      padding: 0px 12px;
                    border-radius: 0.8rem;
                    & > * {
                      &:first-child {
                        // font-size: 1.2rem;
                        color: #8582af;
                      }
                    }
                  }

                  &:last-child {
                    position: relative;
                    & > button {
                      background-color: #F0F0F0;
                      display: flex;
                      align-items: center;
                      gap: 0.5rem;
                      // font-size: 1.1rem;
                      // font-weight: 500;
                      height:32px;
                      padding: 0px 12px;
                      border-radius: 0.8rem;
                      & > * {
                        &:first-child {
                          font-size: 1.2rem;
                          color: #8582af;
                        }
                      }
                    }

                    & > div {
                      position: absolute;
                      background-color: white;
                      padding: 0.7rem 0rem;
                      border: 1px solid #00000021;
                      box-shadow: 2px 2px 2px #3232321a;
                      width: 100%;
                      top: 2.5rem;
                      display: flex;
                      gap: 0.5rem;
                      align-items: start;
                      justify-content: flex-start;
                      flex-direction: column;
                      z-index: 1000000;
                      & > button {
                        font-size: 1.1rem;
                        font-weight: 500;
                        padding: 0.3rem 0.5rem;
                        width: 100%;
                        border-radius: 2px;
                        display: flex;
                        align-items: start;
                        transition: 0.3s ease-in-out;
                        justify-content: flex-start;
                        &:hover {
                          background-color: #eeeeee;
                        }
                      }
                    }
                  }
                }
              }
            }

            /* & > .shortcuts {
              padding: 0.65rem 2.6rem;
              display: grid;
              gap: 0.65rem;

              & > .top {
                &:has(button) {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-wrap: wrap;
                  gap: 0.5rem;
                }
                &:has(p) {
                }

                & > button {
                  display: grid;
                  align-items: center;
                  justify-content: center;
                  gap: 0.7rem;
                  background-color: #ececec;
                  transition: background-color 300ms;
                  padding: 0.6rem 1.05rem;
                  border-radius: 0.5rem;
                  font-size: 1.1375rem;
                  color: #282a3c;

                  &:not(:disabled):hover {
                    background-color: #dedfe7;
                  }

                  &:disabled {
                    cursor: not-allowed;
                  }
                }

                & > p {
                  color: #212529;
                  opacity: 0.9;
                  font-size: 1.17rem;
                  width: 90%;
                  margin: 0 auto;

                  ${theme.queryStatement(theme.breakpoints.lg)} {
                    width: 100%;
                  }
                }
              }

              & > .bottom {
                display: grid;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                grid-template-columns: auto auto;
                & > button {
                  display: grid;
                  align-items: center;
                  justify-content: center;
                  gap: 0.7rem;
                  background-color: #ececec;
                  transition: background-color 300ms;
                  padding: 0.6rem 1.05rem;
                  border-radius: 0.5rem;

                  &:has(.icon) {
                    grid-template-columns: auto auto;
                  }

                  &.emoji {
                    line-height: 1.7rem;
                  }

                  & > .icon {
                    font-size: 1.4rem;
                    line-height: 0;
                    color: #5867dd;
                  }

                  & > .text {
                    font-size: 1.1375rem;
                    color: #282a3c;
                  }

                  &:not(:disabled):hover {
                    background-color: #dedfe7;
                  }

                  &:disabled {
                    cursor: not-allowed;
                  }
                }
              }
            } */
            & > .buttons {
              display: grid;
              grid-template-columns: auto auto auto;
              justify-content: space-between;
              align-items: center;
              padding: 16px;
      
              & > button {
                display: grid;
                align-items: center;
                justify-content: center;
                grid-template-columns: auto auto;
                background-color: white;
                transition: background-color 300ms;
                border-radius: 0.8rem;
                border: 1px solid #012635;
                padding: 0 12px;
                height:32px ; 
                & > .icon {
                  font-size: 1.4rem;
                  line-height: 0;
                  color: #282a3c;
                }

                & > .text {
                  // font-size: 1.1375rem;
                  // color: #282a3c;
                }

                &:not(:disabled):hover {
                  background-color: #dedfe7;
                }

                &:disabled {
                  cursor: not-allowed;
                }

                &.next {
                  background-color: #36a3f7;
                  & > .icon {
                    color: #fff;
                  }
                  & > .text {
                    color: #fff;
                    // font-size: 1.4rem;
                    // font-weight: 400;
                  }

                  &:not(:disabled):hover {
                    background-color: #1192f6;
                  }
                }
              }
              & > .info {
                position: relative;
                & > .text {
                  // color: #777777;
                  // font-size: 1.3rem;
                  
                }
                & > .icon {
                  position: absolute;
                  right: -1rem;
                  top: 0rem;
                  transform: translate(0, -25%);

                  & > .info {
                    font-size: 1rem;
                    color: #aaa;
                    cursor: pointer;
                  }
                }
              }
            }
          }
          & > .bottom {
            display: grid;
            justify-content: end;
            & > .cancelBtn{
              display: grid;
              align-items: center;
              justify-content: center;
              grid-template-columns: auto auto;
              transition: background-color 300ms;
              padding: 0px 12px;
              border-radius: 0.8rem;
              margin-right: 1rem;
              border:1px solid #777777;
              background-color: transparent;
              height:40px ; 
              width:100px ; 
              & > .icon {
                font-size: 1.5rem;
                line-height: 0;
                color: #fff;
              }

              & > .text {
                // font-size: 1.3rem;
                color: #777777;
              }

              &:not(:disabled):hover {
                // background-color: red;
              }

              &:disabled {
                cursor: not-allowed;
              }
            }
            & > button {
              display: grid;
              align-items: center;
              justify-content: center;
              grid-template-columns: auto auto;
              background-color: #00BD82;
              transition: background-color 300ms;
              padding: 0px 12px;
              height:40px ; 
              width:196px ; 
              border-radius: 0.8rem;

              & > .icon {
                font-size: 1.5rem;
                line-height: 0;
                color: #fff;
              }

              & > .text {
                font-size: 1.3rem;
                color: #fff;
              }

              &:not(:disabled):hover {
                // background-color: #384ad7;
              }

              &:disabled {
                cursor: not-allowed;
              }
            }
          }
        }
      }
    }



























































    
    & > .right {
      // background: #fff;
      // padding: 3rem 2rem 1rem;
      /* 
      min-height: calc(100vh - 12.3rem);
      min-height: calc(100svh - 12.3rem);
      overflow-y: auto;
      // border-left: 1px solid #d8d8d8;
      display: grid;
      gap: 1.3rem;
      align-content: start;
      background-color: red; */

      ${theme.queryStatement(900)} {
        min-height: auto;
      }

      & > .top {
        & > * {
          &:not(:last-child) {
            margin-bottom: 0.8rem;
          }
        }

        & > .empty {
          // min-height: 4.8rem;
          padding: 16px;
          border: 1px solid #E0E0E0;
          border-radius: 0.8rem;
          display: grid;
          align-items: center;
          cursor: pointer;
          justify-content: start;
          background-color: white;
          & > p {
            font-size: 1.3rem;
            color: #012635;
            opacity: 0.8;
            font-weight: 600;
          }
        }
        & > .success {
          min-height: 7.8rem;
          border: 1px solid #E0E0E0;
          border-radius: 0.8rem;
          cursor: pointer;
          padding:2rem 1.6rem 2rem 1.6rem;
          position: relative;
          background-color:white;
          & > .successHeaderInner{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 1.5rem;
            & > .top {
              padding-right: 0.8rem;
              display: flex;
              align-items: center;
              gap: 0.6rem;
              & > .icon {
                font-size: 1.5rem;
                color: #23b777;
                display: flex;
                align-items: center;
                justify-content: center;
              }

              & > .text {
                font-size: 1.3rem;
                color: #012635;
                font-weight: 600;
              }
            }

            & > .bottom {
              background-color: #fff;
              & > button {
                font-size: 1.1rem;
                color: #7c7c7c;
                font-weight: 400;
              }
            }
          }
          & > p {
            color: #777777;
            font-size: 1.2rem;
            font-weight: 400;
            line-height: 2rem;
            & > .placeholder {
              color: #3086EE;
            }
            & > .text-spinner {
              color: #EA3815;
            }
          }
        }
        & > .error {
         min-height: 7.8rem;
          border: 1px solid #E0E0E0;
          border-radius: 0.8rem;
          cursor: pointer;
          padding:2rem 1.6rem 2rem 1.6rem;
          position: relative;
          background-color:white;
          & > p {
            color: #777777;
            font-size: 1.2rem;
            font-weight: 400;
            line-height: 2rem;
            & > .placeholder {
              color: #3086EE;
            }
            & > .text-spinner {
              color: #EA3815;
            }
          }
          & > .errorHeaderInner{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 1.5rem;
          & > .top {
            padding-right: 0.8rem;
              display: flex;
              align-items: center;
              gap: 0.6rem;
            & > .icon {
              font-size: 1.5rem;
              color: #f4516c;
              line-height: 0;
            }

            & > .text {
              font-size: 1.3rem;
                color: #012635;
                font-weight: 600;
            }
          }

          & > .bottom {
            background-color: #fff;
            & > button {
              font-size: 1.1rem;
              color: #212529;
              font-weight: 300;
            }
          }
          }
        }
        & > .working {
          min-height: 7.8rem;
          padding: 2rem 1.6rem 2rem 1.6rem;
          border: 1px solid #E0E0E0;
          // border-left: 0.8rem solid #45a0e7;
          border-radius: 1rem;
          position: relative;
          background-color: white;
          & > .successHeaderInner{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 1.5rem;
            & > .top {
              padding-right: 0.8rem;
              display: flex;
              align-items: center;
              gap: 0.6rem;
              & > .icon {
                font-size: 1.5rem;
                color: #23b777;
                display: flex;
                align-items: center;
                justify-content: center;
              }

              & > .text {
                // font-size: 1.3rem;
                // color: #012635;
                // font-weight: 600;
              }
            }

            & > .bottom {
              background-color: #fff;
              & > button {
                font-size: 1.1rem;
                color: #7c7c7c;
                font-weight: 400;
              }
            }
          }
          & > .group {
            & > * {
              &:not(:last-child) {
                margin-bottom: 1.3rem;
              }
            }

            & > .item {
              display: grid;
              gap: 1rem;
              align-items: center;
              grid-template-columns: auto 1fr;

              & > .icon {
                font-size: 1.8rem;
                color: #E0E0E0;
                line-height: 0;
              }
              & > .text {
                font-size:16px;
                color:#777777;
                font-weight: 400;
              }

              &.done {
                & > .icon {
                  font-size: 1.5rem;
                  color: #23b777;
                }
                & > .text {
                  font-size:16px;
                  color: #23b777;
                  font-weight: 400;
                }
              }
            }
          }

          & > .top {
            position: relative;
            top: 0;
            background-color: #fff;
            transform: translate(0, -50%);
            padding-right: 0.8rem;
            display: flex;
            align-items: center;
            gap: 0.6rem;
            & > .text {
              font-size: 1.3rem;
              color: #012635;
              font-weight: 600;
              margin-bottom:0.7rem
            }
          }
        }
      }
      & > .bottom {
        display: grid;
        align-content: start;
        justify-content: end;
        margin-top: 2rem;
        margin-right: 3rem;
        margin-bottom: 3rem;
        & > button {
          position: relative;
          border-bottom: 0.1rem solid #4084af;
          & > .text {
            color: #7c7c7c;
            font-size: 1.2rem;
            font-weight: 500;
            margin-right: 0.6rem;
          }
          & > .icon {
            position: absolute;
            right: -1rem;
            top: 0rem;
            transform: translate(0, -25%);

            & > .info {
              font-size: 0.8rem;
              color: #7c7c7c;
              cursor: pointer;
              & > * {
                margin-left: 1rem;
              }
            }
          }
        }
      }
    }
  }
`;

export const AddTextSpinnerModalStyled = styled.form`
  width: 95vw;
  max-width: 54.6rem;
  background-color: #fff;

  & > .top {
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    padding: 1.95rem;
    background-color: #f8f8f8;

    & > h2 {
      font-size: 2rem;
      color: #212529;
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
    padding: 1.95rem;
    display: grid;
    gap: 2rem;

    & > .item {
      display: grid;
      align-items: center;
      gap: 1.5rem;

      grid-template-columns: 17rem 1fr;

      ${theme.queryStatement(theme.breakpoints.sm)} {
        grid-template-columns: 15rem 1fr;
      }

      & > .left {
        & > .text {
          color: #212529;
          font-size: 1.6rem;
          font-weight: 300;

          & > span {
            color: #f4516c;
            font-weight: 500;
          }
        }
      }
      & > .right {
        display: grid;
        gap: 0.25rem;

        & > p {
          font-size: 1.1rem;
          color: #f4516c;
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
      }
    }
  }

  & > .bottom {
    display: grid;
    grid-template-columns: auto auto;
    gap: 0.5rem;
    align-items: center;
    justify-content: end;
    padding: 1.95rem;
    background-color: #f8f8f8;

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
`;

export const VariationsModalStyled = styled.div`
  width: 95vw;
  max-width: 80rem;
  background-color:#FFFFFF;
  border-radius:1.5rem;
  border-radius:1.5rem;
  overflow: hidden;
  & > .top {
    padding: 1.8rem;
    background-color: #FFFFFF;
    border-bottom: 1px solid #F7F7F7;
    & > h2 {
      color: #212529;
      font-size: 1.625rem;
      font-weight: 500;
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  & > .middle {
    padding-top: 0.6rem;
    padding-bottom: 2.5rem;
    padding-inline:1.8rem;
    display: grid;
    gap: 1.5rem;
    align-content: start;
    & > .top {
      display: grid;
      align-content: start;
      height: 35rem;
      overflow-y: hidden;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-track {
        background: white;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #00BD82;
        border-radius:10px;
      }
      & > .item {
        padding: 0.65rem 0 1.5rem 0.65rem;
        display: grid;
        align-items: flex-start;
        justify-content: center;
        grid-template-columns: 3.1rem 1fr;
        gap: 1.5rem;

        & > span {
          display: flex;
          width: 3.1rem;
          height: 3.1rem;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          color: #333;
          background-color: #E8EAED;
          border-radius: 0.8rem;
        }

        & > p {
          font-size: 1.3rem;
          color: #777777;
          & > strong {
            font-weight: 500;
            color:#012635;
          }
        }
      }
    }
    & > .bottom {
      background: #FFFFFF;
      color: #333;
      border: solid #c8c8c8;
      border-width: 1px;
      padding: 0;
      border-radius: 3px;
      display: grid;
      align-items: center;
      justify-content: center;
    }
  }

  & > .bottom {
    background-color:#FFFFFF;
    padding: 1.3rem;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    justify-content: space-between;
border-top: 1px solid #F7F7F7;
    & > a {
      color: #5768dd;
      &:hover {
        text-decoration: underline;
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

export const PaginationStyled = styled.div`
  display: grid;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(5, auto);

  & > button {
    width: 3.1rem;
    height: 3.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #fff;
    background-color: #007ad9;

    &:not(:disabled):hover {
      background-color: #0286ea;
    }

    &:disabled {
      opacity: 0.65;
      cursor: not-allowed;
    }
  }

  & > span {
    color: #333;
    font-size: 1.3rem;
  }
`;

export const AddTextSpinnerStyled = styled.div`
  display: inline-block;
  position: relative;
  & > .item {
    display: inline-block;
    position: relative;
    & > input {
      width: 9.1rem;
      background: #fff;
      border: none;
      border-bottom: 1px solid #d8d8d8;
      padding: 0 0.5rem;
      width: 4rem;
      margin: 0 0.2rem;
      transition: 0.3s ease-in-out;
      outline: none;
      font-size: 1.3rem;
      text-align: center;
      &::placeholder {
        opacity: 0;
      }
    }

    &:focus-within {
      & > input {
        width: 15rem;
        border-color: #00BD82;

        &::placeholder {
          opacity: 1;
        }
      }
    }

    & > span {
      color: #212529;
      opacity: 0.7;
      font-size: 1.3rem;
      font-style: italic;
    }

    & > button {
      color: #e52935 !important;
      position: absolute;
      top: 50%;
      right: calc(var(--extra, 0) * 1rem);
      transform: translate(0.5rem, -50%);
      transition: all 300ms ease-in-out;
      opacity: 0;

      & * {
        color: #e52935 !important;
      }
    }

    &:hover > button {
      transform: translate(0rem, -50%);
      opacity: 1;
    }
  }

  & > button {
    border: 1px solid #777777;
    height: 2.99rem;
    width: 2.99rem;
    line-height: 0rem;
    font-size: 1.3rem;
    /* text-align: center; */
    border-radius: 0.8rem;
    display: flex;
    padding-top: 0.3rem;
    align-items: center;
    justify-content: center;
    transition: background-color 300ms ease-in-out;
    margin-inline:0.3rem;
    &:first-of-type,
    &:first-of-type * {
      color: #666 !important;
    }

    &:nth-of-type(2),
    &:nth-of-type(2) * {
      color: #43cd80 !important;
    }
    &:last-of-type,
    &:last-of-type * {
      color: #e52935 !important;
    }

    &:hover {
      background-color: #f2f3f8;
    }
  }

  & > p {
    position: absolute;
    bottom: -2.5rem;
    white-space: nowrap;
    left: 0;
    font-size: 1.1rem !important;
    color: red !important;
  }
`;
