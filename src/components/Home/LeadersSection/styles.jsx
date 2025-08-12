import styled from "@emotion/styled";
import theme from "@/theme";




    export const MainWrapper = styled.div`
    width:100%;
    background-color:${theme.colors.tertiary};
     border-top-left-radius: 64px; 
    border-top-right-radius: 64px;

    @media (max-width: 768px) {
    border-top-left-radius: 30px;  
    border-top-right-radius: 30px;
  }
`;

export const InnerWrapper = styled.div`
width:100%;
display:flex;
flex-direction:column;
flex:1;
  gap:56px;
background-color:${theme.colors.white};
padding: 96px 112px;
 border-top-left-radius: 64px; 
border-top-right-radius: 64px;
 @media (max-width: 768px) {
    border-top-left-radius: 30px;  
    border-top-right-radius: 30px;
    padding: 48px 16px;
    gap:32px !important;
    align-items:center;
    justify-content:center;
    display:flex;
  }
`;