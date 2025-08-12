import theme from "@/theme";
import styled from "@emotion/styled";
import { Badge, Fade, Tooltip, tooltipClasses } from "@mui/material";
import { styled as styledMUI } from "@mui/material/styles";
import { CircularProgressbar } from "react-circular-progressbar";
// import { Progress } from 'react-sweet-progress';

export const HeaderWrapper = styled.section`
  font-family: "Fellix";
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.1);

  position: sticky; /* Makes the header sticky */
  top: 0; /* Aligns it to the top */
  z-index: 1000; /* Ensures it stays above other elements */
  background-color: white; /* Sets a background color to cover other elements as you scroll */
  @media (min-width: 768px) {
    border-bottom: 1px solid #eaebf0;
  }
`;

export const TopHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.primary};
  overflow: hidden;
  @media (min-width: 1536px) {
    padding-left: 112px;
    padding-right: 112px;
  }
  @media (min-width: 1280px) {
    padding-left: 0;
    padding-right: 0;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
    padding-left: 0;
    padding-right: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding-left: 0;
    padding-right: 0;
  }
`;

export const ScrollingContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 46px;
  // overflow-x:hidden;
  // white-space: nowrap;
  // position: relative;
  height: ${({ height }) => (height ? "40px" : "48px !important")};
  @media (max-width: 768px) {
    padding: 10px;
    font-size: 16px;
  }

  // Apply scrolling animation only on screens smaller than 1024px
  @media (max-width: 1024px) {
    animation: scroll 20s linear infinite;

    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-100%);
      }
    }
  }
`;

export const ScrollingContent = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  flex-shrink: 0;
  @media (min-width: 1025px) {
    &:not(:first-child) {
      display: none;
    }
  }
`;

export const ReferLink = styled.div`
  border-right: 0.5px solid #6ce1bd;
  border-radius: 0px 25px 25px 0px;
  padding-left: 10px;
  color: white;
  font-weight: 400;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: left;
  gap: 10px;

  /* For small screens */
  @media (max-width: 480px) {
    font-size: 5px;
    padding: 2px;
    gap: 3px;
    font-weight: 100;
  }

  /* For tablets and small laptops */
  @media (max-width: 768px) {
    font-size: 8px;
    padding: 3px;
    gap: 4px;
    font-weight: 200;
  }

  /* For medium-sized laptops */
  @media (max-width: 1024px) {
    font-size: 300px;
    padding: 5px;
    gap: 6px;
    font-weight: 300;
    border-right: none;
  }

  /* For large laptops */
  @media (max-width: 1250px) {
    font-size: 11px;
    padding: 4px;
    gap: 7px;
    font-weight: 300;
  }

  /* For desktops */
  @media (min-width: 1251px) {
    font-size: 13px;
    padding: 5px;
    gap: 10px;
    font-weight: 400;
    border-radius: 0px 20px 20px 0px;
  }
`;

export const HeaderMenu = styled.div`
  display: flex;
  height: ${({ height }) =>
    height ? "40px" : "48px"}; /* Avoid using !important */

  transition: height 0.3s ease-in-out; /* Smooth transition for height */

  @media (max-width: 1280px) {
    & > div {
      display: none;
    }

    & > div:nth-last-of-type(-n + 3) {
      display: flex;
      justify-content: flex-end;
      align-items: center; /* Corrected alignment */
    }
  }
`;

export const HeaderStyled = styled.header`
  width: 100%;
  display: flex;
  max-width: 1440px;
  gap: 64px;
  align-items: center;
  height: ${({ height }) => (height ? "94px" : "100px")};
  transition: height 0.3s ease-in-out; /* Smooth height transition */
  @media (max-width: 768px) {
    gap: 0;
  }
  & > .left {
    & > a {
      & > img {
        width: 150px;
        height: 40px;
      }
      margin-right: 2rem;
    }
  }

  & > .right {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${theme.queryStatement(theme.breakpoints.md)} {
      justify-content: flex-end;
    }

    & > .left {
      display: flex;
      align-items: center;
      gap: 1.6rem;

      & > .nav {
        display: flex;
        flex-direction: row;
        gap: 24px;

        ${theme.queryStatement(theme.breakpoints.xxlg)} {
          display: none;
        }

        & .item {
          width: 3.25rem;
          height: 3.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: pointer;

          & > .img {
            position: relative;

            & > img {
              width: 4rem;
              height: 4rem;
              object-fit: cover;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);

              &:nth-child(2) {
                opacity: 0;
                transition: opacity 300ms ease-in-out; /* Smooth opacity transition */
              }
            }
          }

          &:hover > .img > img:nth-child(2) {
            opacity: 1;
          }
        }
      }
    }

    & > .right {
      display: flex;
      align-items: center;
      gap: 2.5rem;

      & > .left {
        display: flex;
        align-items: center;
        gap: 1.3rem;

        & > * {
          &:not(:first-child) {
            margin-left: 1.3rem;
          }
        }

        & > section {
          & > #item {
            & > .react-sweet-progress-circle-outer {
              & > .react-sweet-progress-symbol-absolute {
                & > div {
                  font-weight: 500;
                  color: #6d6f71;
                }
              }
            }
          }
        }
      }

      & > .right .group {
        display: flex;
        align-items: center;
        gap: 1.6rem;

        ${theme.queryStatement(theme.breakpoints.lg)} {
          grid-template-columns: auto;
        }

        & > .text {
          color: #5867dd;
          font-size: 1.2rem;
          text-transform: uppercase;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;

          & svg {
            margin-right: 0.3rem;
            cursor: pointer;
          }

          ${theme.queryStatement(theme.breakpoints.lg)} {
            display: none; /* Hide this section on smaller screens */
          }
        }

        & > .icon {
          font-size: 3.1rem;
          color: #5867dd;
          line-height: 0;

          & > img {
            width: 4.5rem;
            height: 4.5rem;
            object-fit: cover;
            border-radius: 50%;
          }
        }
      }
    }
  }
`;
export const LightTooltip = styledMUI(({ className, ...props }) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    TransitionComponent={Fade}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "#212529cc",
    boxShadow: `0px 0px 5px rgba(0, 0, 0, .2)`,
    fontSize: "1.2rem",
    borderRadius: ".6rem",
    fontFamily: "fellix",
    textAlign: "center",
    zIndex: "9999999999999999999999999",
  },

  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
    [`&::before`]: {
      boxShadow: `0px 0px 5px rgba(0, 0, 0, .2)`,
    },
  },
}));

export const CircularProgressbarStyled = styled(CircularProgressbar)`
  & > .CircularProgressbar-text {
    text-anchor: middle;
    alignment-baseline: middle;
    font-family: "fellix"
    font-weight: 500;
  }
`;

// export const ProgressStyled = styled(Progress)`
//   & .progress-text {
//     text-anchor: middle;
//     alignment-baseline: middle;
//     font-family: "fellix"
//     font-weight: 500;
//     font-size: 2rem;
//     color: #6d6f71;
//   }

//   & .progress-percentage {
//     font-size: 2rem;
//   }

//   & .progress {
//     stroke-linecap: butt;
//     transition: stroke-dashoffset 0.5s ease 0s;
//   }
// `;

export const ProfileTooltipStyled = styledMUI(({ className, ...props }) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    TransitionComponent={Fade}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "#212529",
    boxShadow: `0px 0px 5px rgba(0, 0, 0, .2)`,
    fontSize: "1.2rem",
    borderRadius: ".6rem",
    padding: "0",
    maxWidth: "32.5rem",
    marginRight: "1rem",
  },

  [`& .${tooltipClasses.arrow}`]: {
    color: "#7682E3",
    width: "3rem",
    height: "3rem",
    zIndex: "-1",

    [`&::before`]: {
      boxShadow: `0px 0px 5px rgba(0, 0, 0, .2)`,
      transform: "translateY(.5rem) rotate(45deg)",
      transformOrigin: "center center !important",
      borderRadius: ".5rem",
    },
  },
}));

export const BadgeStyledUnRead = styledMUI(Badge)`
   & >.MuiBadge-badge{
    background-color: #004828;
    border: .1rem solid #004828;
     font-family: "fellix";
    font-size: .95rem;
    color : #fff;
    padding: .5rem;
    
   }
`;
export const BadgeStyledUnAnswerd = styledMUI(Badge)`
   & >.MuiBadge-badge{
    background-color: #2D7CD9;
    border: .1rem solid #2D7CD9;
     font-family: "fellix";
    font-size: .95rem;
    color : #fff;
    padding: .5rem;
   }
`;
export const BadgeStyledReminder = styledMUI(Badge)`
   & >.MuiBadge-badge{
    background-color: #162E4B;
    border: .1rem solid #162E4B;
     font-family: "fellix";
    font-size: .95rem;
    color : #fff;
    padding: .5rem;
   }
`;
export const BadgeStyledStatus = styledMUI(Badge)`
   & >.MuiBadge-badge{
    background-color: #00BD6B;
    border: .1rem solid #00BD6B;
     font-family: "fellix";
    font-size: .95rem;
    color : #fff;
    padding: .5rem;
   }
`;

export const LimitDropdownStyled = styled.div`
  max-width: 28.6rem;
  padding: 0.8rem 1.2rem;
  display: grid;
  gap: 0.5rem;
  justify-items: center;
  & > h3 {
    font-size: 1.3rem;
    color: #000;
    font-weight: 500;
    text-align: center;
  }
  & > .group {
    display: grid;
    gap: 1rem;
    justify-items: center;
    & > p {
      color: #666666;
      font-size: 1.04rem;
      text-align: center;

      & > a {
        color: #5867dd;

        &:hover {
          text-decoration: underline;
        }
      }
    }
    & > a {
      background-color: #5867dd;
      padding: 0.587rem 1rem;
      border-radius: 0.5rem;
      color: #fff;
      transition: background-color 300ms;

      &:hover {
        background-color: #384ad7;
      }
    }
  }
`;

export const ProfileDropDownStyled = styled.div`
  width: 32.5rem;
  display: grid;
  border-radius: 0.5rem;
  overflow: hidden;

  & > .top {
    padding: 2rem 2rem 2rem 3.5rem;
    background: linear-gradient(to right, #5867dd, #8a94e7);
    overflow: hidden;
    & > span {
      font-size: 1.45rem;
      color: #fff;
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  & > .bottom {
    padding: 2rem;
    display: grid;
    gap: 2.5rem;

    & > .top {
      display: grid;
      gap: 1.8rem;
      & > button {
        display: grid;
        width: 100%;
        grid-template-columns: 3.5rem 1fr;
        text-align: left;
        align-items: center;

        & > .icon {
          line-height: 0;
          color: #c1bfd0;
          font-size: 1.8rem;
          transition: color 300ms;
        }

        & .text {
          color: #6f722d;
          font-size: 1.3rem;
          transition: color 300ms;
        }

        &:hover {
          & > .icon {
            color: #716aca;
          }

          & .text {
            color: #716aca;
          }
        }
      }
    }
    & > .bottom {
      & > button {
        background: white;
        border-color: #ebedf2;
        font-weight: 500;
        padding: 0.975rem 2.6rem;
        font-size: 1.3rem;
        color: #716aca;
        display: block;
        width: 100%;
        border: 1px solid #ebedf2;
        border-radius: 100rem;
        transition: background-color 300ms, border-color 300ms;

        &:not(:disabled):hover {
          border-color: #ebedf2;
          background-color: #f4f5f8;
        }
      }
    }
  }
`;

export const MyProfileModalStyled = styled.div`
  width: 95vw;
  max-width: 80rem;
  background-color: #fff;
  max-height: calc(100vh - 5rem);
  max-height: calc(100svh - 5rem);
  overflow-y: auto;
  & > .top {
    padding: 1.95rem;
    background-color: #f8f8f8;
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;

    & > h2 {
      color: #3f4047;
      font-size: 1.56rem;
      font-weight: 500;
    }
    & > button {
      font-size: 1.5rem;
      line-height: 0;
      color: #21252999;
      transition: color 300ms;

      &:not(:disabled):hover {
        color: #212529cc;
      }

      &:disabled {
        cursor: not-allowed;
      }
    }
  }

  & > .bottom {
    & > .top {
      padding: 2.5rem;
      display: grid;
      gap: 1rem;

      & > label {
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

              &.info {
                color: #aaa;
                font-size: 1rem;
                cursor: pointer;
                position: relative;
                top: -0.5rem;
              }
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
          font-size: 1.3rem;

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

          &:focus {
            border-color: #716aca;
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

        &:disabled {
          cursor: not-allowed;
        }
      }
    }
  }
`;
export const ChangePasswordModalStyled = styled.div`
  width: 95vw;
  max-width: 80rem;
  background-color: #fff;
  max-height: calc(100vh - 5rem);
  max-height: calc(100svh - 5rem);
  overflow-y: auto;
  & > .top {
    padding: 1.95rem;
    background-color: #f8f8f8;
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;

    & > h2 {
      color: #3f4047;
      font-size: 1.56rem;
      font-weight: 500;
    }
    & > button {
      font-size: 1.5rem;
      line-height: 0;
      color: #21252999;
      transition: color 300ms;

      &:hover {
        color: #212529cc;
      }
    }
  }

  & > .bottom {
    & > .top {
      padding: 2.5rem;
      display: grid;
      gap: 1.5rem;
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
  }
`;
export const LoginAttempsModalStyled = styled.div`
  width: 95vw;
  max-width: 80rem;
  background-color: #fff;
  max-height: calc(100vh - 5rem);
  max-height: calc(100svh - 5rem);
  overflow-y: auto;
  & > .top {
    padding: 1.95rem;
    background-color: #f8f8f8;
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;

    & > h2 {
      color: #3f4047;
      font-size: 1.56rem;
      font-weight: 500;
    }
    & > button {
      font-size: 1.5rem;
      line-height: 0;
      color: #21252999;
      transition: color 300ms;

      &:hover {
        color: #212529cc;
      }
    }
  }

  & > .bottom.loading {
    padding: 5rem;
    display: grid;
    gap: 0.5rem;
    align-items: center;
    justify-items: center;

    & > div {
      font-size: 1.3rem;
      color: #212529;
      font-weight: 500;

      & > span {
        & > svg > circle {
          stroke-width: 0.1rem;
          stroke: #007bff;
        }
      }
    }
  }

  & > .bottom.data {
    padding: 2.5rem;
    display: grid;
    gap: 1.5rem;

    & > p {
      font-size: 1.3rem;
      color: #212529;
      text-align: center;
    }
  }
`;

export const LoginAttempsModalItemStyled = styled.div`
  border: 0.2rem solid #34bfa3;

  display: grid;
  gap: 4rem;
  border-radius: 0.4rem;
  overflow: hidden;

  grid-template-columns: auto 1fr;

  ${theme.queryStatement(theme.breakpoints.md)} {
    gap: 0rem;
  }

  & > .left {
    display: grid;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background-color: #34bfa3;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      display: inline-block;
      width: 1rem;
      height: 1rem;
      background-color: #34bfa3;
      top: 50%;
      right: -0.5rem;
      transform: translate(0, -50%) rotate(45deg);
      transform-origin: center center;
    }

    & > img {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  & > .right {
    padding: 2rem;
    display: grid;
    gap: 0.65rem;

    & > .item {
      display: grid;
      grid-template-columns: 10rem 1fr;
      gap: 2rem;

      ${theme.queryStatement(theme.breakpoints.md)} {
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }

      & > h6 {
        color: #34bfa3;
        font-size: 1.3rem;
        font-weight: 600;
        text-align: right;

        ${theme.queryStatement(theme.breakpoints.md)} {
          text-align: left;
        }
      }
      & > p {
        color: #34bfa3;
        font-size: 1.3rem;
      }
    }
  }
`;