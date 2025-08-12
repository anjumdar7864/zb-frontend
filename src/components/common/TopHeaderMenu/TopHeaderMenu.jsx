import { Flex, P } from "@/styles/CommonStyles";
import { MenuItemContainer,SubMenuItem,Arrow,SubMenu, StyledLink } from "./styles";
import React,{useState} from 'react'
import { FiChevronDown } from "react-icons/fi";
import { Link } from 'react-router-dom'; 

const TopHeaderMenu = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <MenuItemContainer
     
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <StyledLink  style={{textDecoration:'none',color:"inherit"}} target={item.title == "Login" && "_blank"} to={item.url}>{item.title}</StyledLink>
        {item.subMenuItems.length > 0 && <Arrow><FiChevronDown size={15} /></Arrow>}
        {item.subMenuItems.length > 0 && isOpen && item.title==="Become a partner" && (
          <SubMenu  item={item} width='270px'>
              <Flex direction='column' padding='10px' gap='15px' color="#00BD82">
              <P fontSize='14px' fontweight='700' lineHeight='20px' color='#151A28' paddingLeft='15px'>{item.subMenuItems[0].title}</P>
              {item.subMenuItems[0].items.map((item, index) => (
              <SubMenuItem key={index} padding='15px' display='flex' align='top' gap='8px'>
                {item.logo}
                <StyledLink style={{textDecoration:'none',color:"initial"}} to={item.url}>{item.title}</StyledLink>
              </SubMenuItem>
            ))}
              </Flex>
          </SubMenu>
        )}

       {item.subMenuItems.length > 0 && isOpen && item.title==="Company" && (
              <SubMenu  item={item} width='450px'>
                <Flex padding='10px' justify='space-between' >
                  <Flex direction='column' padding='10px' gap='15px' color="#00BD82">
                  <P fontSize='14px' fontweight='700' lineHeight='20px' color='#151A28' paddingLeft='15px'>{item.subMenuItems[0].title}</P>
                  {item.subMenuItems[0].items.map((item, index) => (
                  <SubMenuItem key={index} padding='15px' display='flex' align='top' gap='8px'>
                    {item.logo}
                    <StyledLink style={{textDecoration:'none',color:"initial"}} to={item.url}>{item.title}</StyledLink>
                  </SubMenuItem>
                ))}
                  </Flex>

                  <Flex direction='column' padding='10px' gap='15px' color="#00BD82">
                  <P fontSize='14px' fontweight='700' lineHeight='20px' color='#151A28' paddingLeft='15px'>{item.subMenuItems[1].title}</P>
                  {item.subMenuItems[1].items.map((item, index) => (
                  <SubMenuItem key={index} padding='15px' display='flex' align='top' gap='8px'>
                    {item.logo}
                    <StyledLink style={{textDecoration:'none',color:"initial"}} to={item.url}>{item.title}</StyledLink>
                  </SubMenuItem>
                ))}
                  </Flex>
                  </Flex>
              </SubMenu>
            )}

       {item.subMenuItems.length > 0 && isOpen && item.title==="EN" && (
          <SubMenu  item={item} width='170px' padding='3px'>
              <Flex direction='column' padding='10px' gap='10px' color="#00BD82">
              {item.subMenuItems.map((item, index) => (
              <SubMenuItem key={index} padding='15px'>
                <StyledLink style={{textDecoration:'none',color:"initial"}} to={item.url}>{item.title}</StyledLink>
              </SubMenuItem>
            ))}
              </Flex>
          </SubMenu>
        )}

      </MenuItemContainer>
    );
  };
  
  export default TopHeaderMenu;