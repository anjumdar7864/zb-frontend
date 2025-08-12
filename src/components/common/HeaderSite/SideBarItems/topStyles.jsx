import theme from "@/theme";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
// import { Progress } from 'react-sweet-progress';



export const MenuItemContainer = styled.div`
  position: relative;
  padding: 10px 20px;
  cursor: pointer;
  font-weight:300;
  font-size:14px;
  display: flex;
  justify-content: center;
  align-items: center;
  color:white;
  &:hover > div {
    display: block;    
  }
     &:hover {
      color: rgba(255, 255, 255, 0.7); 
  }
      
   
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
 
 
`;

export const SubMenu = styled.div`
   ${({ padding }) => padding ? `padding: ${padding};` : `padding:10px;`}
  background-color: white;
  z-index: 10000;
  ${({ width }) => width && `width: ${width};`}
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;

  
`;

export const SubMenuItem = styled.div`
  ${({ padding }) => padding ? `padding: ${padding};` : `padding:15px;`}
  border-radius:10px;
  cursor: pointer;

   ${({ display }) => display && `display: ${display};`}
  ${({ align }) => align && `align-items: ${align};`}
  ${({ gap }) => gap && `gap: ${gap};`}


  &:hover {
    background-color: #f0f0f0;
  }
`;

export const Arrow = styled.span`
  margin-left: 10px;
   display: flex;
  justify-content: center;
  align-items: center;
`;