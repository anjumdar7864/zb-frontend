import theme from "@/theme";
import styled from "@emotion/styled";

export const AdminSettingsStyled = styled.div`
  padding: 1.3rem;
  display: grid;
  gap: 2rem;
  background-color: #f2f3f8;
  min-height: calc(100vh - 7rem);
  align-content: start;

  & > .top {
    & > h1 {
      font-size: 2rem;
      font-weight: 500;
      color: #000000;
    }
  }
  & > .bottom {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;

    ${theme.queryStatement(1270)} {
      grid-template-columns: 1fr 1fr;
    }
    ${theme.queryStatement(theme.breakpoints.xlg)} {
      grid-template-columns: 1fr;
    }

    & > .item {
      display: grid;
      gap: 1.95rem;
      background-color: #fff;
      border-radius: 1rem;
      padding: 2.3rem;
      align-content: start;

      & > .top {
        & > h2 {
          & > .text {
            font-size: 1.65rem;
            font-weight: 400;
            color: #212529;
            padding-right: 0.2rem;
          }

          & > .icon {
            color: #d8d8d8;
            font-size: 1.2rem;
          }
        }
      }
      & > .bottom {
        display: grid;
        gap: 1.5rem;
        grid-template-columns: 1fr;
        align-content: start;
        & > a {
          box-shadow: 2px 2px 4px #dcdcdc80, -2px -2px 4px #dcdcdc33;
          display: grid;
          gap: 1rem;
          grid-template-columns: auto 1fr;
          align-items: center;
          padding: 2rem;
          border-radius: 0.5rem;
          transition: background-color 300ms;

          &:hover {
            background: #f5f5f5;
          }

          & > .icon {
            width: 3.5rem;
            height: 3.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.1rem;
            border: 0.4rem solid #5a69d6;
            border-radius: 50%;
            color: #5a69d6;

            transition: background-color 300ms, color 300ms;
          }

          &:nth-of-type(2) > .icon {
            border: 0.4rem solid #e25d6f;
            color: #e25d6f;
          }

          &:hover {
            & > .icon {
              background-color: #5a69d6;
              color: #fff;
            }
            &:nth-of-type(2) > .icon {
              background-color: #e25d6f;
              color: #fff;
            }
          }

          & > .text {
            color: #212529;
            opacity: 0.8;
            font-size: 1.6rem;
            font-weight: 400;
          }
        }
      }
    }

    & > .item:nth-of-type(2) {
      & > .bottom {
        & > a {
          & > .icon {
            border: 0.4rem solid #5f9deb;
            color: #5f9deb;
          }

          &:nth-of-type(2) > .icon {
            border: 0.4rem solid #f6c34f;
            color: #f6c34f;
          }

          &:hover {
            & > .icon {
              background-color: #5f9deb;
              color: #fff;
            }
            &:nth-of-type(2) > .icon {
              background-color: #f6c34f;
              color: #fff;
            }
          }
        }
      }
    }

    & > .item:nth-of-type(3) {
      & > .bottom {
        & > a {
          &:nth-of-type(1) > .icon {
            border: 0.4rem solid #f6c34f;
            color: #f6c34f;
          }

          &:hover {
            &:nth-of-type(1) > .icon {
              background-color: #f6c34f;
              color: #fff;
            }
          }
        }
      }
    }
  }
`;
