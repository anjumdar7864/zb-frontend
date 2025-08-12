import { Flex, Grid, P } from "@/styles/CommonStyles";
import { MenuItemContainer,SubMenuItem,Arrow,SubMenu, StyledLink, AdditionalArea, SubMenuCOntainer, HoverableFlex } from "./styles";
import React,{useState} from 'react'
import { FiChevronDown } from "react-icons/fi";
import { Link } from 'react-router-dom'; 
import { imageWhy } from "@/assets/images";
import { IoIosArrowForward } from "react-icons/io";
import { WhyZietblast } from "./WhyZietblast";
import { Solutions } from "./Solutions";
import Resources from "./Resources";

const MenuItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
  console.log("i",item)
    return (
      <MenuItemContainer
        // onMouseEnter={() => setIsOpen(true)}
        // onMouseLeave={() => setIsOpen(false)}
      >
        <StyledLink style={{textDecoration:'none',color:"inherit"}}  >{item.title}</StyledLink>
        {item.subMenuItems.length > 0 && <Arrow><FiChevronDown size={15} /></Arrow>}
        {item.subMenuItems.length > 0 && isOpen && item.title==="Why ZeitBlast" && (

          <WhyZietblast item={item}/>
          
        )}
        {item.subMenuItems.length > 0 && isOpen && item.title==="Solutions" && (

            <Solutions item={item}/>

          )}
        {item.subMenuItems.length > 0 && isOpen && item.title==="Resources" && (

            <Resources item={item}/>

          )}
      </MenuItemContainer>
    );
  };
  
  export default MenuItem;