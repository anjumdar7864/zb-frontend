import theme from "@/theme";
import styled from "@emotion/styled";
import { Badge, Fade, Tooltip, tooltipClasses } from "@mui/material";
import { styled as styledMUI } from "@mui/material/styles";
import { CircularProgressbar } from "react-circular-progressbar";
// import { Progress } from 'react-sweet-progress';

export const HeaderStyled = styled.header`

  display: flex;
  align-items: center;

  // padding: 1rem 1.1rem;
  // padding: 1px 1.1rem;
  // box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.1);
     ${theme.queryStatement(theme.breakpoints.tab)} {
       padding-left: 10px ;
       padding-right: 10px ;
      }
  & > .left {
    & > a {
   
      & > img {
        width: 40px;
        height: 40px;
        display:none ;
    //        ${theme.queryStatement(theme.breakpoints.mdd)} {
    //   display:block ;
    // }
    //          ${theme.queryStatement(theme.breakpoints.xxlgg)} {
    //   display:block ;
    // }

              ${theme.queryStatement(theme.breakpoints.tab)} {
      display:block ;
    }
      }
      margin-right: 2rem;
    }
  }

  & > .right {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // background-color: red ;
    ${theme.queryStatement(theme.breakpoints.md)} {
      justify-content: flex-end;
   
    }

    & > .dlcWarning {
display: flex;
margin-right: -12%;
 ${theme.queryStatement(theme.breakpoints.xllg)} {
     display: none;
     margin-right: 0%;
    }
}

    & > .left {
      display: flex;
      align-items: center;
         
      gap: 1.6rem;
      // ${theme.queryStatement(theme.breakpoints.md)} {
      //   display: none;
      // }

      & .item {
        // width: 3.25rem;
        // height: 3.25rem;
         width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        cursor: pointer;
        background-color:  #F0F0F0;
        border-radius: 9px;
        
;
 


        & > .img {
          position: relative;

          & > img {
            width: 1.5rem;
            height: 2rem;
            object-fit: contain;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            &:nth-child(2) {
              opacity: 0;
              transition: opacity 300ms;
            }
          }
        }

        &:hover > .img > img:nth-child(2) {
          opacity: 1;
        }
      }
    }
    & > .right {
      display: flex;
      align-items: center;
    justify-content: space-between;
      // background-color: red ; 
      // width: 50% ; 
      gap: 2.5rem;
  ${theme.queryStatement(theme.breakpoints.md)} {
        display: none;
      }

   & > .right{
    display: flex ;
      //      ${theme.queryStatement(theme.breakpoints.xllg)} {
      //   display: none;
      // } 
              ${theme.queryStatement(theme.breakpoints.xxlg)} {
         display: none;
       } 
          }

      & > .left {
        display: flex;
        align-items: center;
        // background-color: red ; 
        /* gap: 1.3rem; */
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
                  color: "#6d6f71";
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
            display: none;
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
    fontFamily: 'fellix',
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
    font-family: "fellix" ; 
    font-weight: 500;
  }
`;


export const Dropdown = styled.div`
  position: absolute;
    top: ${({ top }) => top};
  left: ${({ left }) => left};
  background-color: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: ${({ width }) => width};
  padding:7px;
  
` ;

export const DropdownItem = styled.div`
  padding: 10px;
  border-radius: 5px;
  color: ${({ color }) => color || "#666666"} ;
  cursor: pointer;
  &:hover {
    background-color:  #f0f0f0;
  }
` ;

export const QABox = styled.div`
  border: 2px solid #ede8e8;
  border-radius:9px;
  width:40px;
  height:40px;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#6B6B6B;
  font-size:14px ; 
  background-color:  #FFFFFF;
  overflow:hidden;

` ;

export const EffectStyle = styled.div`
//  background-color:  #EEF4F6;
height:48px ; 
 /* width:120px ;  */

cursor: pointer;
padding: 0px 8px ;
border-radius:8px;
display:flex ;
	align-items: center;
  

& > div {
& > div {
& > .name {
// display: flex;
align-item:center ; 
height:24px ; 
font-size:16px ; 
/* width:42px ; */

/* overflow: hidden;
text-overflow: ellipsis; */
white-space: nowrap;

}
}

}


  &:hover {
    background-color:  #EEF4F6;
  }

`







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
    background-color: #FFC000;
;
    border: .1rem solid #FFC000;
     font-family: "fellix";
    font-size: .95rem;
    color : #000000;
    padding: .5rem;
    
   }
`;
export const BadgeStyledUnAnswerd = styledMUI(Badge)`
   & >.MuiBadge-badge{
    background-color: #FF906A;
    border: .1rem solid #FF906A;
     font-family: "fellix";
    font-size: .95rem;
    color : #000000;
    padding: .5rem;
   }
`;
export const BadgeStyledReminder = styledMUI(Badge)`
   & >.MuiBadge-badge{
    background-color: #74B5FF;
    border: .1rem solid #74B5FF;
     font-family: "fellix";
    font-size: .95rem;
    color : #000000;
    padding: .5rem;
   }
`;
export const BadgeStyledStatus = styledMUI(Badge)`
   & >.MuiBadge-badge{
    background-color: #A69FEA;
    border: .1rem solid #A69FEA;
     font-family: "fellix";
    font-size: .95rem;
    color : #000000;
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



export const BottomLoader = styled.div`
  display: none;
  align-items: center;
  justify-content:center ; 
  padding-bottom:20px ; 
  // background-color: red ; 
  /* gap: 1.3rem; */

   ${theme.queryStatement(theme.breakpoints.md)} {
        display: flex;
      }
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
            color: "#6d6f71";
          }
        }
      }
    }
  }
`


export const LoginAttempsModalStyled = styled.div`
  width: 95vw;
  max-width: 80rem;
  background-color: #fff;
  border-radius:1rem;
  overflow:hidden;
  & > .top {
    padding-inline: 1.95rem;
    padding-block: 0.8rem;
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    border-bottom: 1px solid #F0F0F0;
    & > h2 {
      color: #012635;
      font-size: 1.56rem;
      font-weight: 600;
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
    padding: 1.5rem;
    display: grid;
    gap: 1.5rem;
    max-height: calc(100vh - 15rem);
    max-height: calc(100svh - 15rem);
    overflow-y: auto;
      &::-webkit-scrollbar {
        height: 4px; 
        width: 4px;
      }
      &::-webkit-scrollbar-track {
        background: white;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #00BD82;
      }
    & > p {
      font-size: 1.3rem;
      color: #212529;
      text-align: center;
    }
  }
`;

export const LoginAttempsModalItemStyled = styled.div`
  border: 1px solid #F0F0F0;
  display: grid;
  border-radius: 0.8rem;
  overflow: hidden;
  grid-template-columns: auto 1fr;

  ${theme.queryStatement(theme.breakpoints.md)} {
    gap: 0rem;
  }

  & > .left {
    display: grid;
    justify-content: center;
    padding: 2rem;
    position: relative;
    & > .IconCover{
      width: 5rem;
      height: 5rem;
      border-radius: 1.3rem;
      object-fit: cover;
      background-color: #E1F3EE;
      display:flex;
      align-items: center;
      justify-content: center;
    }

    
  }
  & > .right {
    padding: 2rem;
    display: grid;
    gap: 0.65rem;
    

    & > .item {
      display: grid;
      grid-template-columns: 10rem 1fr;
      ${theme.queryStatement(theme.breakpoints.md)} {
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }

      & > h6 {
        color: #012635;
        font-size: 1.3rem;
        font-weight: 500;
        text-align: left;

        ${theme.queryStatement(theme.breakpoints.md)} {
          text-align: left;
        }
      }
      & > p {
        color: #777777;
        font-size: 1.3rem;
        font-weight: 400;
      }
    }
  }
`;
