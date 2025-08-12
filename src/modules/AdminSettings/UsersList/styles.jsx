import theme from "@/theme";
import styled from "@emotion/styled";

export const UsersListStyled = styled.div`
  padding: 1.3rem 1.3rem 3rem;
  display: grid;
  gap: 2.5rem;
  background-color: #f2f3f8;
  min-height: calc(100vh - 7rem);
  min-height: calc(100svh - 7rem);
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
    & > .table {
      display: grid;
      gap: 0.5rem;
      width: ${(p) => p.tableWidth}px;
      overflow-x: auto;

      & > .row {
        display: grid;
        grid-template-columns: repeat(3, minmax(20rem, 1fr)) 8rem;
        gap: 1rem;
        padding: 0.8rem 1.3rem;
        align-items: center;

        & > h6 {
          color: #49515b;
          font-size: 1.3rem;
          font-weight: 400;
          justify-self: center;

          &:first-of-type {
            justify-self: start;
          }
          &:last-of-type {
            justify-self: end;
          }
        }

        &.body {
          background-color: #fff;

          & > .error {
            text-align: center;
            font-size: 1.3rem;
            color: #212529;
            grid-column: 1/-1;
          }

          & > .col {
            justify-self: center;

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
                font-size: 1.3rem;
                color: #212529;
              }
            }

            &.actions {
              display: grid;
              align-items: center;
              justify-content: end;
              gap: 1.5rem;
              grid-template-columns: auto auto auto auto;

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

// export const TransferModelStyle = styled.div`
//   width: 50.6rem;
//   background-color: #fff;
//   margin-top: 10rem;
//   & > .top {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 1.4rem;
//     background-color: #f8f8f8;
//     & > h2 {
//       font-size: 2rem;
//     }
//     & > button {
//       & > * {
//         font-size: 2rem;
//       }
//     }
//   }

//   & > form {
//     padding: 5rem 2rem;
//     & > label {
//       & > span {
//         padding-bottom: 2rem;
//         font-size: 1.4rem;
//         font-weight: 500;
//       }
//       & > * {
//         &:last-child {
//           margin-top: 1.2rem;
//         }
//       }
//     }

//     & > div {
//       display: flex;
//       align-items: center;
//       justify-content: flex-end;
//       gap: 1rem;
//       margin-top: 5rem;
//     }
//   }
// `;



export const TransferModelStyle = styled.div`
  // width: 50.6rem;
  height: 58px;
  width: 680px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  background-color: #fff;
  margin-top: 10rem;
  & > .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    padding: 16px;
    background-color: #fff;
    border-bottom: solid 1px #f0f0f0;

    & > h2 {
      font-size: 18px;
      line-height: 26px;
      font-weight: 600;
      color: #012635;
    }
    & > button {
      & > * {
        font-size: 22px;
        color: #012635;
      }
    }
  }

  & > form {
    // padding: 0px 24px;

    & > label {
      & > span {
        // padding-bottom: 2rem;
        font-size: 14px;
        line-height: 22px;
        font-weight: 500;
        // margin-bottom: 4px;
      }
      & > * {
        &:last-child {
          margin-top: 1.2rem;
        }
      }
    }

    & > div {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 5rem;
    }
      & > .bottom {
    display: grid;
    gap: 2rem;

    & > label,
    & > div.avatar {
      display: grid;
      gap: 0.65rem;
        font-family: 'Inter', sans-serif;


      & > .top {
        & > h6 {
          color: #000000e5;
          font-size: 1.3rem;
          font-weight: 400;
        font-family: 'Inter', sans-serif;


          & > span {
            color: #f4516c;
          }
        }
      }
  }
`;




export const PasswordModelStyle = styled.div`
  width: 40.6rem;
  background-color: #fff;
  margin-top: 10rem;
  & > header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.4rem;
    background-color: #f8f8f8;
    & > h2 {
      font-size: 1.6rem;
      font-weight: 500;
    }
    & > button {
      & > * {
        font-size: 2rem;
      }
    }
  }

  & > section {
    padding: 0rem 2rem;
    & > form {
      & > blockquote {
        display: flex;
        flex-direction: column;
        margin: 5rem 0rem;
        & > label {
          font-size: 1.1rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
        & > input {
          border: 1px solid #3a393963;
          border-radius: 0.4rem;
          padding: 0.7rem 1rem;
          &:focus {
            outline: none;
          }
        }
      }
      & > div {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-bottom: 2rem;
        gap: 2rem;
      }
    }
  }
`;
