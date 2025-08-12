import theme from "@/theme";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

export const SidebarStyled = styled.div`
  padding: 2rem 0rem;
  padding-top:0rem ; 
  padding-bottom: 0px ;
  width: ${({ width }) => width};
  // box-shadow: 3px 3px 6px -3px #0000001a;
  border-right:1px solid #E0E0E0;
  background-color: #fff;
  transition: width 300ms;
  z-index: 990;
  // height: calc(100svh - 7.4rem);
  height: calc(100svh );
  overflow-y: hidden;
  // overflow-y: scroll;
  display: flex ; 
  flex-direction: column;

  ${theme.queryStatement(theme.breakpoints.xxlgg)} {
   width:80px;
  }

 
  ${theme.queryStatement(theme.breakpoints.tab)} {
    width: 260px ; 
  }

  & > .sidebarTop::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar */
  }
  & > .sidebarTop::-webkit-scrollbar-track {
    background: #f1f1f1; 
    border-radius: 10px;
  }

  & > .sidebarTop::-webkit-scrollbar-thumb {
    background: #c1c1c1; 
    border-radius: 10px;
  }

  & > .sidebarTop::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8; 
  }

  & > .logo {
    height:55px ;
    min-height: 80px;
    display: flex ; 
    align-items:center ;
    margin-bottom:1px ;
    margin-left:20px ;
    overflow: hidden;
    ${theme.queryStatement(theme.breakpoints.xxlgg)} {
      margin-left:20px ;
    }
    ${theme.queryStatement(theme.breakpoints.tab)} {
      margin-left:20px;
    }

& > .cross {
display:none ; 
  ${theme.queryStatement(theme.breakpoints.mdd)} {
    display: block ;
     }
   ${theme.queryStatement(theme.breakpoints.tab)} {
   display: block ;
    }
}
  & > .logoLink {
  width:196px ;
  & > .imageOneDesktop {
    display:none ;
    ${theme.queryStatement(theme.breakpoints.tab)} {
   display: block ;
    }
  }
  & > .imageOne {
// width : 150px ; 
// background-color: red ;
display:none ;

// display:block ;
 ${theme.queryStatement(theme.breakpoints.xxlgg)} {
   display: none ;
    }
    ${theme.queryStatement(theme.breakpoints.tab)} {
   /* display: block ; */
    }

    //   ${theme.queryStatement(theme.breakpoints.mdd)} {
    // display: block ;
    //  }
 


}

& > .imageTwo {
display: block ;
// display:none ;
${theme.queryStatement(theme.breakpoints.xxlgg)} {
  display: block ;
   }
   ${theme.queryStatement(theme.breakpoints.tab)} {
   display: none ;
    }
  //  ${theme.queryStatement(theme.breakpoints.mdd)} {
  //   display: none ;
  //    }
}
  }





// @media (min-width: 1280px) { /* Small screens and up */
    
//     .imageOne {
//     display: block;
//     margin-left: 3rem ;

//     }

//     .imageTwo {
//    display: none;

//     }
//   }


@media (max-width: 1280px) { /* Small screens and up */
    
    .imageOne {
    // display: none;
    /* display: block; */
    }

    .imageTwo {
   display: block;
  // margin-left:${({ marginLeft }) => marginLeft} ;

    }
  }





  }
 
  &::-webkit-scrollbar {
    width: 0.4rem;
  }

  &::-webkit-scrollbar-track {
    background-color: #fff;
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    background: #dedfe7;
  }
  &:hover {
    // width: 25rem;
    width: 260px ; 
    .logo{
      & > .logoLink{
        & > .imageOneDesktop {
          display:block ;
        }
        & > .imageTwo {
          display:none ;
        }
      }
    }
  }



& > .sidebar_bottom{
// background-color: red ;
flex-grow: 1 ; 
display: flex ;

flex-direction: column ;
// align-items: end ;
justify-content: end ;
& > div {
// box-shadow: 0px 1px 12px -1px rgba(153,153,153,0.75);
// -webkit-box-shadow: 0px 1px 12px -1px rgba(153,153,153,0.75);
// -moz-box-shadow: 0px 1px 12px -1px rgba(153,153,153,0.75);

border-top: solid 1px #E0E0E0 ;

// ${theme.queryStatement(theme.breakpoints.mdd)} {
//  padding-bottom:35px;
//    }


& > .userDropdown{
display:none ;
${theme.queryStatement(theme.breakpoints.xxlg)} {
  display: block ;
   }
}

}
}

`;

export const SidebarItemStyled = styled(NavLink)`
  // padding: 1.2rem 20px;
  padding: 12px 28px;
  /* grid-template-columns: 3.5rem 1fr;
  align-items: center;
  display: grid; */
  display: flex;
  align-items: center;
  
  gap: 1rem;
  overflow: hidden;
  transition: background-color 300ms;
  // width:259px ;
  

  & > .icon {
    line-height: 0;
    // color: #2E2E2E;
    color:#012635 ;
    font-size: 2.048rem;
    transition: color 300ms;
    // background:red ; 
    // width: 25px ;
    // display: flex;
    // justify-content:center ;
    
  }
  & > .text {
    // color: #2E2E2E;
    /* color:#012635 ;  */
    // font-size: 1.3rem;
    /* font-size:16px ; */
    /* line-height: 21px; */
    white-space: nowrap;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 300ms;
    //  font-family: 'Fellix', Arial, Helvetica, sans-serif;
        // font-family: 'Fellix', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
     /* font-weight:500; */

  
  }

  &.active {
    background-color:  #E0E0E0;
;
    & > .icon,
    & > .text {
      // color:  #2E2E2E;
      color:#012635 ; 
;
    }
  }

  &:not(.active):hover {
    background-color: #E0E0E0 ; 

    // background-color: #f8f8fb;

    & > .icon {
      // color: #2E2E2E;
      color:#012635 ; 
    }
    & > .text {
      // color: #2E2E2E;
      color:#012635 ; 
    }
  }
`;
export const EffectStyle = styled.div`
cursor: pointer;
// padding: 0px 8px ;
padding: 15px 30px 15px 30px ;
// border-radius:8px;
// width:"259px"

overflow: hidden;
display:flex ;
// gap: 2rem;
	align-items: center;
  &:hover {
    background-color:  #E0E0E0;
  }

`
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

export const SidebarDropdown = styled.div`
  padding: 16px 20px;
  /* grid-template-columns: 3.5rem 1fr;
  align-items: center;
  display: grid; */
  display: flex;
  align-items: center;
  
  gap: 1rem;
  overflow: hidden;
  transition: background-color 300ms;
  cursor:pointer ;

 &:hover {
    background-color:  #EEF4F6;
  }
  & > .icon {
    line-height: 0;
    // color: #2E2E2E;
    color:#012635 ; 
    font-size: 2.048rem;
    transition: color 300ms;
    // background:red ; 
    // width: 25px ;
    // display: flex;
    // justify-content:center ;
    
  }
    // & > span{

    // display:flex ;

  & > .text {
    // color: #2E2E2E;
    color:#012635 ; 
    // font-size: 1.3rem;
    width:152px ;
    font-size:16px ;
    line-height: 21px;
    white-space: nowrap;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 300ms;
    //  font-family: 'Fellix', Arial, Helvetica, sans-serif;
        // font-family: 'Fellix', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
     font-weight:500;

  
  // }
}
`

export const QABox = styled.div`
  border: 2px solid #ede8e8;
  border-radius:9px;
  width:26px;
  height:26px;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#6B6B6B;
  font-size:10px ; 
  background-color:  #FFFFFF;


` ;