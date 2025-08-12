import theme from "@/theme";
import styled from "@emotion/styled";

export const LoginStyled = styled.section`
  ${theme.queryStatement(theme.breakpoints.xxllggg)} {
    background-image: url("${(p) => p.bgImage2}");
    background-position: center center;
    background-size: cover;
    min-height: 100vh;
    min-height: 100svh;
  }

  ${theme.queryStatement(theme.breakpoints.md)} {
    padding: 6rem 1rem;
    display: grid;
    align-content: center;
  }
  /* display: flex; */
  /* align-items: center; */

  & > .left {
    width: calc(100% - 40%);
    // background-color: red ;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    /* 
    ${theme.queryStatement(theme.breakpoints.xxllg)} {
      width: calc(100% - 55%);
    } */

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

    /* padding: 10rem 12rem 4rem 5rem;
    display: grid;
    gap: 9rem; */
    /* height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    ${theme.queryStatement(theme.breakpoints.xxllggg)} {
      width: 100%;
      background-color: #fff;
      padding: 6rem 4rem;
      border-radius: 1rem;
      gap: 6rem;
      margin: auto;
    }

    ${theme.queryStatement(theme.breakpoints.sm)} {
      padding: 4rem 3rem;
    }
   */
    /* @media (min-height: 2000px) {
      width: calc(100% - 55%);
    } */

    & > section {
      padding: 2rem 3rem;
      border-radius: 1rem;
      background-color: red;

      ${theme.queryStatement(theme.breakpoints.xxllggg)} {
        width: 100%;
        padding: 4rem 3rem;
      }

      /* width: 50%; */

      /* & > .top {
        background-color: white;
        ${theme.queryStatement(theme.breakpoints.xlg)} {
          max-width: 65rem;
          margin: 0 auto;
          width: 100%;
        }
        & > a > img {
          width: 17.25rem;
        }
      } */
      & > .bottom {
        /* background-color: white;
        display: grid;
        gap: 1.95rem; */

        & > .top {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          & > a > img {
            width: 17.25rem;
            /* margin-bottom: rem; */
          }
          & > h1 {
            color: #212529;
            font-size: 2rem;
            text-align: center;
            font-weight: 500;
            line-height: 1.2;
            padding-bottom: 2rem;
          }
        }

        & > .bottom {
          & > form {
            /* max-width: 39rem; */
            display: grid;
            gap: 4.2rem;
            width: 100%;
            margin: 0 auto;

            /* ${theme.queryStatement(theme.breakpoints.xxlg)} {
              max-width: 30rem;
            }

            ${theme.queryStatement(theme.breakpoints.xlg)} {
              max-width: 60rem;
            }
            ${theme.queryStatement(theme.breakpoints.xxllggg)} {
              max-width: 55rem;
            } */

            & > .top {
              display: grid;
              gap: 1.95rem;

              & > .item {
                display: grid;
                align-content: start;
             
                & > a {
                  justify-self: end;
                  font-size: 1.3rem;
                  color: #5867dd;

                  &:hover {
                    text-decoration: underline;
                  }
                }
              }
            }

            & > .bottom {
              display: grid;
              gap: 1.7rem;

              & > .top {
                display: grid;
                gap: 1.3rem;
              }
              & > .bottom {
                & > button {
                  position: relative;
                  width: 100%;
                  background-color: #5867dd;
                  padding: 1.1rem 1.5rem;
                  font-size: 1.3rem;
                  color: #fff;
                  border-radius: 0.35rem;
                  transition: background-color 300ms;
                  &:disabled {
                    opacity: 0.65;
                    cursor: not-allowed;
                  }

                  &:not(:disabled):hover {
                    background-color: #384ad7;
                  }

                  & > .extra {
                    visibility: hidden;
                  }

                  & > .text {
                    display: block;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    transition: left 300ms;
                  }

                  & > .icon {
                    color: #fff;
                    font-size: 1.2rem;
                    display: block;
                    position: absolute;
                    top: 50%;
                    left: calc(50% + 1.5rem);
                    transform: translate(-50%, calc(-50% + 0.25rem));
                    opacity: 0;
                    transition: left 300ms, opacity 300ms;
                  }

                  &:not(:disabled):hover {
                    & > .text {
                      left: calc(50% - 1rem);
                    }
                    & > .icon {
                      left: calc(50% + 3rem);
                      opacity: 1;
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

    /* centerlize the image and the login form in center of the screen  */

    /* 
      width: 60%;
    & > img {
      width: 100%;
      height: 100vh;
      object-fit: contain;
    } */

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

export const LoginModalStyled = styled.div`
  width: 50rem;
  background-color: #fff;

  & > .top {
    border-bottom: 1px solid #e9ecef;
    background: #f8f8f8;
    padding: 2rem;
    & > h2 {
      color: #3f4047;
      font-weight: 400;
      font-size: 1.56rem;
    }
  }
  & > .middle {
    padding: 2.5rem 2.5rem 3.8rem;
    display: grid;
    gap: 1.3rem;
  }
  & > .bottom {
    border-top: 1px solid #e9ecef;
    background: #f8f8f8;
    padding: 2rem;
    display: grid;
    justify-items: end;
  }
`;
