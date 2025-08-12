import theme from "@/theme";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
// import { Progress } from 'react-sweet-progress';



export const MenuItemContainer = styled.div`
  position: relative;
  padding: 1rem 1rem;
  cursor: pointer;
  font-weight:300;
  font-size:14px;
  font-family: 'Fellix';
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
     font-family: Fellix, sans-serif !important;
 
`;

export const SubMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
   ${({ padding }) => padding ? `padding: ${padding};` : `padding:10px;`}
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10000;
  ${({ width }) => width && `width: ${width};`}

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;


  ${(props) =>
    props.item.title === "EN"
      ? `right:0`
      : `left:0`}
 
  
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