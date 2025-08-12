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

  text-decoration: none;
 
`;

export const SubMenuCOntainer = styled.div`
  ${({ width }) => width && `width: ${width};`}
  background-color: white;
  border-radius:0px 0px 24px 24px;
  z-index:5;
 
`

export const SubMenu = styled.div`
   width: 100%;
   
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