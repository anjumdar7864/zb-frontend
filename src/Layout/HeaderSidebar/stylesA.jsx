import styled from "@emotion/styled";
import theme from "@/theme";


export const HeaderSidebarStyled = styled.div`
 height: 100svh;
 display: flex;
 position: relative ;
 overflow-y: auto;
  & > .left {
    position: sticky;
    top: 0px ;
    z-index: 991;
    width:80px;
    ${theme.queryStatement(theme.breakpoints.xxlgg)} {
     width:80px;
     min-width:80px ;
    }
    
    
    ${theme.queryStatement(theme.breakpoints.tab)} {
      display:none ;
      width:0px;
      min-width:0px ;
    }
    ${theme.queryStatement(theme.breakpoints.mdd)} {
      display:none ;
      width:0px;
      min-width:0px ;
    }
  }



   & > .right {
  //  background-color:green;
  //  padding:0px 20px  ;
   flex-grow: 1;
   overflow: auto ;

        & > .top {
   background-color:white;
   position: sticky ;

   top: 0px ; 
   z-index: 980;
   
   }

   & > .bottom {
    background-color:#F7F7F7 ; 
    height:calc(100svh - 66px) ;
    overflow: auto; 
      ${theme.queryStatement(theme.breakpoints.md)} {
       height:calc(100svh - 128px) ;
    }
    }
   
   }
  

 
`;