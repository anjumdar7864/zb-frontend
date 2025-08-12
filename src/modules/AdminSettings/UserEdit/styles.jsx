import styled from "@emotion/styled";

export const UserEditStyled = styled.div`
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
    }
  }

  & > .bottom {
    display: grid;
    gap: 2rem;

    & > label,
    & > div.avatar {
      display: grid;
      gap: 0.65rem;

      & > .top {
        & > h6 {
          color: #212529;
          font-size: 1.3rem;
          font-weight: 400;

          & > .icon {
            margin-left: 5px;
          }

          & > span {
            color: #f4516c;
          }
        }
      }
      & > .bottom {
        display: grid;
        gap: 0.26rem;

        & > p {
          color: #f4516c;
          font-size: 1.1rem;
        }
      }

      &.avatar > .bottom {
        & > .top {
          width: 12.5rem;
          height: 12.5rem;
          border-radius: 0.5rem;
          padding: 0.5rem;
          position: relative;
          background-color: #fff;
          cursor: pointer;

          & > input {
            display: none;
          }

          & > .icon {
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(50%, -50%);
            width: 2.5rem;
            height: 2.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            border-radius: 50%;
            box-shadow: 0 0.5rem 1.5rem 0.5rem rgba(0, 0, 0, 0.075);
            font-size: 1.4rem;
            color: #9e9e9e;
          }

          & > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 0.5rem;
          }
        }
        & > p {
          color: #212529;
          opacity: 0.8;
        }
      }

      &.input > .bottom > input {
        padding: 1.1rem 1.5rem;
        border: 0.1rem solid #c1c4cc;
        color: #575962;
        background-color: transparent;
        outline: none;
        border-radius: 0.35rem;
        transition: background-color 300ms, color 300ms, border-color 300ms;
        font-size: 1.3rem;

        &:focus {
          border-color: #716aca;
          color: #575962;
          background-color: #fff;
        }

        &:disabled {
          color: #6f727d;
          background-color: #dcdbdb;
        }
      }

      &.select > .bottom > select {
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
        background-image: url("${(p) => p.ChevronDown}");
        background-repeat: no-repeat;
        background-position: calc(100% - 1.5rem) center;
        background-size: 1rem;
        font-size: 1.3rem;

        &:focus {
          border-color: #716aca;
          color: #575962;
          background-color: #fff;
        }
      }
    }

    & > .group {
      display: grid;
      grid-template-columns: auto auto;
      gap: 0.5rem;
      align-items: center;
      justify-content: end;

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
  }
`;
