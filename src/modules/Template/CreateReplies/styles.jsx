import theme from "@/theme";
import styled from "@emotion/styled";

export const CreateRepliesStyled = styled.div`
  padding: 0rem 4rem 3rem 4rem;
  display: grid;
  gap:2rem;
  grid-template-columns: 3fr 2fr;
  ${theme.queryStatement(900)} {
    grid-template-columns: 1fr;
    padding:1rem;
  }
  min-height: calc(100vh - 7rem);
  min-height: calc(100svh - 7rem);
  align-content: start;
  
  & > .wrapper {
    & > .bottomComplete{
            display: grid;
            justify-content: end;
            padding-top:2rem;
            & > .cancelBtn{
              display: grid;
              align-items: center;
              justify-content: center;
              grid-template-columns: auto auto;
              transition: background-color 300ms;
              padding: 1.1rem 2rem;
              border-radius: 0.8rem;
              margin-right: 1rem;
              border:1px solid #777777;
              background-color: transparent;
              & > .icon {
                font-size: 1.5rem;
                line-height: 0;
                color: #fff;
              }

              & > .text {
                font-size: 1.3rem;
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
              padding: 1.1rem 5rem;
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
    

   & > .iconsFilter{
    background-color: white;
    padding-top:1.5rem;
    border-top: 1px solid #E0E0E0;

    border-bottom:1px solid #E0E0E0;
    border-inline:1px solid #E0E0E0;
    padding: 1.5rem;
    background-color: #FFFFFF;
    border-bottom-left-radius:0.8rem;
    border-bottom-right-radius:0.8rem;
    & > .bottom {
                display: grid;
                gap: 1rem;
                & > .buttons {
                  display: flex;
                  gap: 0.5rem;
                  justify-content: start;
                  align-items: center;
                  flex-wrap: wrap;

                  & > button {
                    display: grid;
                    align-items: center;
                    justify-content: center;
                    gap: 0.7rem;
                    background-color: #F0F0F0;
                    transition: background-color 300ms;
                    padding: 0.6rem 1.05rem;
                    border-radius: 0.5rem;
                    font-size: 1.1375rem;
                    font-weight: 500;
                    color: #012635;

                    &:not(:disabled):hover {
                      background-color: #dedfe7;
                    }

                    &:disabled {
                      cursor: not-allowed;
                      opacity: 0.65;
                    }
                  }
                }
              }
  }

  & > .top {
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    gap: 2rem;

    & > .left > h1 {
      font-size: 1.95rem;
      font-weight: 700;
      color: #012635;
    }

    & > .right {
      display: grid;
      gap: 1rem;
      justify-items: end;
      grid-template-columns: auto auto;

      & > button {
        display: grid;
        align-items: center;
        justify-content: center;
        gap: 0.7rem;
        background-color: #5867dd;
        transition: background-color 300ms;
        padding: 0.6rem 1.05rem;
        border-radius: 0.5rem;

        &:has(.icon) {
          grid-template-columns: auto auto;
        }

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

        &:nth-of-type(2) {
          background-color: #fff;

          & > .text {
            color: #212529;
          }
          &:hover {
            background-color: transparent;
          }
        }
      }
    }
  }

  & > .bottom {
    border-top:1px solid #E0E0E0;
    border-inline:1px solid #E0E0E0;
    padding: 1.5rem;
    background-color: #FFFFFF;
    border-top-left-radius:0.8rem;
    border-top-right-radius:0.8rem;
    & > .top {
      & > h2 {
        font-size: 1.625rem;
        color: #212529;
        font-weight: 500;
      }
      & > .top {
        display: grid;
        gap: 3rem;
        align-content: start;

        & > .top {
          display: grid;
          gap: 2rem;
          align-items: center;
          grid-template-columns: auto auto;
          justify-content: space-between;

          & > h2 {
            font-size: 2rem;
            color: #012635;
            font-weight: 700;
          }
          & > .right {
            display: grid;
            align-items: center;
            grid-template-columns: auto auto;
            justify-content: end;

            & > button {
              display: grid;
              align-items: center;
              justify-content: center;
              grid-template-columns: auto auto;
              gap: 0.7rem;
              background-color:red;
              transition: background-color 300ms;
              padding: 1rem 3rem;
              border-radius: 0.5rem;

              & > .icon {
                font-size: 1rem;
                line-height: 0;
                color: #012635;
              }

              & > .text {
                font-size: 1.3rem;
                color: #012635;
              }

              &:hover {
                background-color: #ebebeb;
              }

              &:last-of-type {
                background-color: #F0F0F0;
                padding-inline:1.5rem;
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
              }
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
    }
    & > .bottom {
      max-width: 87.5rem;
      display: grid;
      gap: 2.5rem;
      align-content: start;

      & > .top {
        display: grid;
        gap: 1rem;

        & > .item {
          display: grid;
          align-items: start;
          // grid-template-columns: 20rem 1fr;

          // ${theme.queryStatement(theme.breakpoints.lg)} {
          //   grid-template-columns: 12rem 1fr;
          // }

          // ${theme.queryStatement(theme.breakpoints.md)} {
          //   grid-template-columns: 1fr;
          //   gap: 0.5rem;
          // }

          & > .left {
            color: #012635;
            font-size: 1.3rem;
            font-weight: 500;
            margin-bottom: 0.3rem;
          }
          & > .right {
            & > .bottom {
              & > p {
                font-size: 1.3rem;
                color: #f4516c;
              }
            }

            &.select > .top {
              display: grid;
              grid-template-columns: 1fr auto;
              gap: 1rem;
              ${theme.queryStatement(500)} {
               grid-template-columns: 1fr 1fr;
              }
              & > select {
                padding: 1.1rem 4rem 1.1rem 1.5rem;
                border: 1px solid #D3D7DD;
                color: #575962;
                background-color: transparent;
                font-size: 1.3rem;
                outline: none;
                border-radius: 0.7rem;
                transition: background-color 300ms, color 300ms,
                  border-color 300ms;
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
                  border-color: #00BD82;
                  color: #575962;
                  background-color: #fff;
                }
              }

              & > button {
                display: grid;
                align-items: center;
                justify-content: center;
                padding: 1.105rem 1.495rem;
                grid-template-columns: auto auto;
                border-radius: 0.7rem;
                border: 0.1rem solid #00BD82;
                transition: background-color 300ms;
                height:4rem;
                ${theme.queryStatement(theme.breakpoints.sm)} {
                  grid-template-columns: auto;
                }

                & > .icon {
                  color: #00BD82;
                  line-height: 0;
                  font-size: 1.5rem;
                  transition: color 300ms;
                }

                & > .text {
                  color: #00BD82;
                  font-size: 1.3rem;
                  transition: color 300ms;
                }

                &:not(:disabled):hover {
                  background-color: #C2FFEC;

                  & > .icon,
                  & > .text {
                    color: #00BD82;
                  }

                  &:disabled {
                    opacity: 0.65;
                    cursor: not-allowed;
                  }
                }
              }
            }

            &.input > .top {
              & > input {
                padding: 1.1rem 1.5rem;
                border: 1px solid #D3D7DD;
                color: #575962;
                background-color: transparent;
                outline: none;
                border-radius:0.7rem;
                transition: background-color 300ms, color 300ms,
                  border-color 300ms;
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
            }

            &.textarea {
              display: grid;
              align-content: start;
              gap: 1rem;

              &:has(.bottom > p) {
                gap: 0;
              }

              & > .top {
                position: relative;
                padding-bottom: 2.8rem;
                transition: background-color 300ms, color 300ms,
                  border-color 300ms;
                border-radius: 0.7rem;
                border: 1px solid #D3D7DD;

                &:focus-within {
                  border-color: #00BD82;
                }

                & > textarea {
                  padding: 1.1rem 1.5rem;
                  border: none;
                  color: #575962;
                  background-color: transparent;
                  outline: none;
                  border-radius: 0.7rem;
                  transition: background-color 300ms, color 300ms;
                  font-size: 1.3rem;
                  font-size: 1.3rem;
                  width: 100%;
                  resize: none;
                  min-height: 12rem;

                  &:focus {
                    color: #575962;
                    background-color: #fff;
                  }
                }

                & > .info {
                  position: absolute;
                  font-size: 1.137rem;
                  right: 1.5rem;
                  bottom: 1.1rem;
                  font-style: italic;
                  color: #212529;
                  opacity: 0.6;
                }

                & > .error {
                  bottom: 1.75rem;
                  left: 6.6rem;
                  right: 6.6rem;
                  position: absolute;
                  text-align: center;
                  color: #f4516c;
                  font-size: 1.3rem;
                  font-weight: 300;
  
                  & > strong {
                    color: #f4516c;
                    font-size: 1.3rem;
                    font-weight: 500;
                  }
                }
              }
            }
          }
        }
      }
      & > .bottom {
        display: grid;
        align-items: start;
        grid-template-columns: 20rem 1fr;

        ${theme.queryStatement(theme.breakpoints.lg)} {
          grid-template-columns: 12rem 1fr;
        }

        ${theme.queryStatement(theme.breakpoints.md)} {
          grid-template-columns: 1fr;
        }

        & > button {
          display: grid;
          align-items: center;
          justify-content: center;
          gap: 0.7rem;
          background-color: #5867dd;
          transition: background-color 300ms;
          padding: 1.105rem 1.595rem;
          border-radius: 0.5rem;
          width: fit-content;

          &:has(.icon) {
            grid-template-columns: auto auto;
          }

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
            background-color: #384ad7;
          }

          &:disabled {
            opacity: 0.65;
            cursor: not-allowed;
          }
        }
      }
    }
  }
  }
`;

export const CreateNewCategoryModalStyled = styled.form`
  width: 30vw;
  ${theme.queryStatement(theme.breakpoints.lg)} {
     width: 60vw;
  }
  max-width: 54.6rem;
  background-color: white;
  border-radius:0.8rem;
  & > .top {
    border-top-left-radius:0.8rem;
    border-top-right-radius:0.8rem;
    border-collapse: separate; 
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    padding-inline: 1.95rem;
    padding-block: 1rem;
    background-color: #fff;
    border-bottom: 1px solid #F0F0F0;
    
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
    gap: 0.5rem;
    & > p {
      color: #012635;
      font-size: 1.3rem;
      font-weight: 500;
    }
    & > .item {
      display: grid;
      gap: 0.25rem;

      & > p {
        font-size: 1.1rem;
        color: #f4516c;
      }

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
          border-color: #00BD82;
          color: #575962;
          background-color: #fff;
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
    background-color: white;
    border-top: 1px solid #F0F0F0;
    padding-inline: 1.95rem;
    padding-block: 1rem;
    border-bottom-left-radius:0.8rem;
    border-bottom-right-radius:0.8rem;

    & > .button{
      padding: 0.85rem 2.5rem;
      font-size: 1.2rem;
      border: 0.1rem solid #777777;
      font-weight: 500;
      border-radius: 0.8rem;
      transition: background-color 0.3s ease-in-out;
      color: #777777;
      background-color:#fff;
      height:45px;
      & > .text {
        font-size: 1.3rem;
      }

      &:not(:disabled):hover {
        background-color:#00BD82;
        color: white;
        border: 0.1rem solid white;
      }
    }


    & > .buttonSave{
      padding: 0.85rem 2.5rem;
      font-size: 1.2rem;
      border: 0.1rem solid white;
      font-weight: 500;
      border-radius: 0.8rem;
      transition: background-color 0.3s ease-in-out;
      color: white;
      background-color:#00BD82;
      height:45px;
      & > .text {
        font-size: 1.3rem;
      }

      &:not(:disabled):hover {
        background-color:#00BD82;
        color: white;
        border: 0.1rem solid white;
      }
    }
  }
`;
export const ValidationStyled = styled.div`
  padding-top:90px;
  ${theme.queryStatement(900)} {
    padding-top: 0px;
  }
  & > .working {
    min-height: 7.8rem;
    width:100%;
    padding: 1.3rem;
    border: 1px solid #dedfe7;
    border-radius: 0.8rem;
    background: white;

    & > .group {
      display: flex;
      flex-direction:column;
      gap: 0.2rem;
      align-content: start;

      & > .item {
        display: flex;
        gap: 1rem;
        align-items: center;
        padding: 0.5rem;
        & > .icon {
          font-size: 1.7rem;
          color: #E0E0E0;
          line-height: 0;
        }
        & > .text {
          font-size: 1.3rem;
          color: #777777;
          font-weight: 400;
        }

        &.done {
          & > .icon {
            font-size: 1.7rem;
            color: #43cd80;
          }
          & > .text {
            color: #43cd80;
          }
        }
      }
    }
  }
`;