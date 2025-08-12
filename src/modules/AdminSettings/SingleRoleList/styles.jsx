import theme from "@/theme";
import styled from "@emotion/styled";

export const SingleRoleListStyled = styled.div`
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

    & > .left {
      display: grid;
      & > h1 {
        font-size: 2rem;
        font-weight: 500;
        color: #000000;
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
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
        grid-template-columns:
          10rem repeat(3, minmax(20rem, 1fr))
          5rem;
        gap: 1rem;
        padding: 0.8rem 1.3rem;
        align-items: center;

        & > h6 {
          color: #49515b;
          font-size: 1.3rem;
          font-weight: 400;
          justify-self: center;

          &:first-of-type,
          :nth-of-type(2) {
            justify-self: start;
          }
          &:last-of-type {
            justify-self: end;
          }
        }

        &.body {
          background-color: #fff;
          & > .col {
            justify-self: center;

            &:first-of-type,
            &:nth-of-type(2) {
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
              display: grid;
              & > p {
                font-size: 1.3rem;
                color: #212529;
                display: block;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
            }

            &.actions {
              display: grid;
              align-items: center;
              justify-content: end;
              gap: 1.5rem;
              grid-template-columns: auto auto;

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
