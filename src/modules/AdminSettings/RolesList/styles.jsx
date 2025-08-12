import theme from "@/theme";
import styled from "@emotion/styled";

export const RolesListStyled = styled.div`
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
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;

    ${theme.queryStatement(1100)} {
      grid-template-columns: 1fr 1fr;
    }
    ${theme.queryStatement(theme.breakpoints.md)} {
      grid-template-columns: 1fr;
    }

    & > .error {
      grid-column: 1/-1;
      padding: 0.65rem 1.1rem;
      color: #212529;
      text-align: center;
      font-size: 1.3rem;
    }

    & > .item {
      padding: 2rem;
      background-color: #fff;
      border-radius: 1rem;
      display: grid;
      gap: 2rem;
      grid-template-rows: auto 1fr;

      & > .top {
        display: grid;
        overflow: hidden;
        & > h2 {
          font-size: 1.95rem;
          font-weight: 500;
          color: #212529;
          overflow: hidden;
          display: block;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      /* & > .bottom {
                display: grid;
                grid-template-rows: auto 1fr;
                gap: 1rem;

                & > .top {
                    overflow: hidden;
                    display: grid;
                    & > h6 {
                        font-size: 1.3rem;
                        font-weight: 500;
                        color: #212529;
                        opacity: 0.8;
                        overflow: hidden;
                        display: block;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                } */
      & > .bottom {
        display: grid;
        gap: 1.5rem;
        grid-template-rows: 1fr auto;

        & > .top {
          display: grid;
          gap: 0.2rem;
          align-content: start;

          & > p {
            display: grid;
            grid-template-columns: auto 1fr;
            align-items: center;
            gap: 0.5rem;
            overflow: hidden;

            & > .icon {
              display: block;
              width: 0.7rem;
              height: 0.3rem;
              background-color: #384ad7;
              line-height: 0;
              transform: translate(0, -0.1rem);
            }

            & > .text {
              font-size: 1.3rem;
              color: #333;
              overflow: hidden;
              display: block;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        & > .bottom {
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
            transition: background-color 0.3s ease-in-out,
              border-color 300ms ease-in-out;
            & > .text {
              font-size: 1.3rem;
            }

            &:not(:disabled):hover {
              border-color: #ebedf2;
              background-color: #f4f5f8;
            }
          }
        }
      }
      /* } */
    }
  }
`;
