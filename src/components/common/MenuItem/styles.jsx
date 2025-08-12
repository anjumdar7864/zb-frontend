import theme from "@/theme";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
// import { Progress } from 'react-sweet-progress';



export const MenuItemContainer = styled.div`
  position: relative;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:hover > div {
    display: block;    
  }
     &:hover {
    border-bottom: 2px solid #06AB78;
    padding-bottom:33px;
    padding-top:35px; 
    color: #00BD82; 
  }
   
`;

export const StyledLink = styled(Link)`
font-family: Fellix,sans-serif;
font-size: 16px;
  text-decoration: none;
 
`;

export const SubMenuCOntainer = styled.div`
  ${({ width }) => width && `width: ${width};`}
  display: none;
  position: absolute;
  top: 102%;
  left: 0;
  z-index: 1000;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
border-radius:0px 0px 24px 24px;
background-color: #082A3B;

// Media queries
@media (min-width: 1250px) {
${({moveLeft})=>moveLeft && `left:${moveLeft};`}
}

@media (min-width: 1440px) {
${({xlMoveLeft})=>xlMoveLeft && `left:${xlMoveLeft};`}
}


`

export const SubMenu = styled.div`
   width: 100%;
   padding:20px;
  background-color: white;
border-radius:0px 0px 24px 24px;
`;

export const AdditionalArea = styled.div`
  
  padding: 20px;
  color: white; 
  border-radius:0px 0px 24px 24px;
`;

export const SubMenuItem = styled.div`
  border-radius:10px;
  padding:15px;
  cursor: pointer;
  ${({ display }) => display && `display: ${display};`}
  ${({ align }) => align && `align-items: ${align};`}
  ${({ gap }) => gap && `gap: ${gap};`}

  &:hover {
  ${({ bg }) => bg ? `background-color: ${bg};` : `background-color:#f0f0f0;`}
  ${({ opacity }) => opacity && `opacity: ${opacity};`}


  }
`;

export const Arrow = styled.span`
  margin-left: 10px;
   display: flex;
  justify-content: center;
  align-items: center;
`;

export const HoverableFlex = styled.div`
  ${({ paddingTop }) => paddingTop && `padding-top: ${paddingTop};`}
  ${({ paddingLeft }) => paddingLeft && `padding-left: ${paddingLeft};`}
  ${({ paddingRight }) => paddingRight && `padding-right: ${paddingRight};`}
  ${({ color }) => color ? `color: ${color};` : `color:#012635;`}

  transition: color 0.4s ease, gap 0.4s ease;
  display:flex;
  align-items:center;
  cursor:pointer;
  gap:3px;



  &:hover {
    color: #00BD82; 
    gap: 7px;
  }
`;