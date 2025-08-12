import theme from "@/theme";
import styled from "@emotion/styled";

export const ForgetPasswordStyled = styled.section`
  ${theme.queryStatement(theme.breakpoints.xlg)} {
    background-image: url("${(p) => p.bgImage2}");
    background-position: center center;
    background-size: cover;
    min-height: 100vh;
    min-height: 100svh;

    padding: 6rem 9rem;
  }

  ${theme.queryStatement(theme.breakpoints.md)} {
    padding: 6rem 2rem;
    display: grid;
    align-content: center;
  }

  & > .left {
    width: calc(100% - 36%);
    padding: 10rem 12rem 4rem 5rem;
    display: grid;
    gap: 9rem;
    width: calc(100% - 40%);
    ${theme.queryStatement(theme.breakpoints.xxlgg)} {
      width: calc(100% - 50%);
    }
    ${theme.queryStatement(theme.breakpoints.xxlg)} {
      width: calc(100% - 55%);
    }
    ${theme.queryStatement(theme.breakpoints.xxllggg)} {
      height: auto;
      width: 100%;
      padding: 6rem 1rem;
    }

    & > section {
      padding: 2rem 3rem;
      border-radius: 1rem;
      background-color: white;
      & > .top {
        ${theme.queryStatement(theme.breakpoints.xlg)} {
          max-width: 65rem;
          margin: 0 auto;
          width: 100%;
        }
      }
      & > .bottom {
        display: grid;
        gap: 1.95rem;
        max-width: 60rem;
        margin: 0 auto;

        & > .top {
          & > header {
            margin-bottom: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            & > h1 {
              color: #212529;
              font-size: 2rem;
              text-align: left;
              font-weight: 500;
              line-height: 1.2;
              margin-top: 1.4rem;
            }
            & > a > img {
              width: 17.25rem;
            }
          }

          & > p {
            font-size: 1.3rem;
            color: #212529;
            font-weight: 300;
          }
        }

        & > .bottom {
          & > form {
            display: grid;
            gap: 2rem;
            width: 100%;

            & > .top {
              display: grid;
              gap: 1.95rem;
            }

            & > .bottom {
              display: grid;
              gap: 1.7rem;

              & > .top {
                display: grid;
                gap: 1.3rem;
              }
              & > .bottom {
                display: grid;
                align-items: center;
                justify-content: end;
                grid-template-columns: auto auto;
                gap: 0.5rem;

                & > button {
                  width: 100%;
                  background-color: transparent;
                  padding: 1.1rem 1.5rem;
                  border-radius: 0.35rem;
                  transition: background-color 300ms;
                  border: 0.1rem solid #384ad7;

                  &:has(.icon) {
                    display: grid;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    grid-template-columns: auto auto;
                  }

                  & > .text {
                    font-size: 1.3rem;
                    color: #384ad7;
                    transition: color 300ms;
                  }

                  & > .icon {
                    color: #384ad7;
                    font-size: 1.2rem;
                    line-height: 0;
                    transition: color 300ms;
                  }

                  &:disabled {
                    opacity: 0.65;
                    cursor: not-allowed;
                  }

                  &:not(:disabled):hover {
                    background-color: #384ad7;

                    & > .text {
                      color: #fff;
                    }
                    & > .icon {
                      color: #fff;
                    }
                  }

                  &:nth-of-type(2) {
                    border: 0.1rem solid #5867dd;
                    background-color: #5867dd;
                    padding: 1.1rem 5rem;
                    & > .text {
                      color: #fff;
                    }

                    &:not(:disabled):hover {
                      border: 0.1rem solid #384ad7;
                      background-color: #384ad7;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  & > .right {
    position: fixed;
    height: 100vh;
    background-image: url("${(p) => p.bgImage}");
    background-position: center center;
    background-size: cover;
    overflow: hidden;
    top: 0;
    right: 0;
    padding: 7.5rem 2.6rem 2.6rem;
    width: 40%;
    ${theme.queryStatement(theme.breakpoints.xxlgg)} {
      width: 50%;
    }
    ${theme.queryStatement(theme.breakpoints.xxlg)} {
      width: 55%;
    }
    ${theme.queryStatement(theme.breakpoints.xxllggg)} {
      display: none;
    }

    & > section {
      ${theme.queryStatement(theme.breakpoints.xxllggg)} {
        display: none;
      }
      & > * {
        font-weight: 600;
        font-size: 2.4rem;
        font-family: "Mazzard Soft H Bold";
        color: white;
        text-align: center;
        max-width: 40rem;
        line-height: 3rem;
        text-shadow: 1px 3px black;
        margin: auto;
        &:first-child {
          margin-top: 2.3rem;
        }
        &:last-child {
          margin-top: 3.2rem;
        }
      }
    }

    /* & > .top {
      & > span {
        color: #f8f9fa;
        text-shadow: 1px 1px 1px #333;
        font-size: 2.2rem;
        text-align: center;
        display: block;
        font-weight: 500;
      }
    }
    & > .bottom {
      display: grid;
      gap: 12rem;

      & > img {
        width: 100%;
      }
    } */
  }
`;
