import theme from "@/theme";
import styled from "@emotion/styled";

export const SettingsStyled = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  align-items: start;
  /* background-color: orange; */
  background-color: #f2f3f8;

  ${theme.queryStatement(theme.breakpoints.lg)} {
    grid-template-columns: 0rem 1fr;
  }

  & > .left {
    & > * {
      &:first-child {
        position: fixed;

        ${theme.queryStatement(theme.breakpoints.lg)} {
          display: none;
        }
      }
    }
    & > .mobileMenu {
      display: flex;
      position: relative;
      display: none;
      ${theme.queryStatement(theme.breakpoints.lg)} {
        display: block;
      }
      & > div {
        position: fixed;
        background-color: #f2f3f8;
        height: calc(100vh - 4.5em);
        z-index: 1002;
        box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.1),
          5px 5px 10px rgba(0, 0, 0, 0.1), 0px 5px 10px rgba(0, 0, 0, 0.1);
        /* z-index: 1000; */
      }
      & > button {
        /* z-index: 100000; */
        position: fixed;
        /* position: absolute; */
        /* right: 19px; */
        /* float: right; */
        z-index: 100;
        /* top: 7rem; */
        margin-top: 7rem;
        margin-right: 4rem;
        cursor: pointer;
        background-color: #5867dd;
        border-top-right-radius: 1.5rem;
        border-bottom-right-radius: 1.5rem;
        color: white;
        padding: 0.4rem 2.2rem;
        font-size: 1.5rem;
        font-weight: 500;
      }
    }
  }

  & > .right {
    /* min-height: calc(100svh - 7rem); */
  }
`;

export const MenuBarStyle = styled.div`
  /* position: fixed; */
  /* top: 7rem; */
  /* bottom: 0; */
  /* left: 7rem; */
  width: 26rem;
  padding: 1.6rem 2.3rem;
  /* display: grid;
  gap: 2.6rem; */
  /* background-color: #f2f3f8; */
  border-right: 1px solid #d8d8d8;
  align-content: start;
  & > .top > h1 {
    font-size: 2.08rem;
    color: #212529;
    opacity: 0.6;
  }

  & > .bottom {
    display: grid;
    align-content: start;

    & > a {
      padding: 0.8rem 1rem;
      color: #212529;
      font-size: 1.3rem;
      font-weight: 600;
      opacity: 0.9;
      transition: background-color 300ms, color 300ms, border 300ms;

      &:hover {
        color: #5867dd;
        background: #e8e8e8;
      }

      &.active {
        background: #5867dd10;
        color: #5867dd;
        border-left: 2px solid #5867dd;
      }
    }
  }
`;
