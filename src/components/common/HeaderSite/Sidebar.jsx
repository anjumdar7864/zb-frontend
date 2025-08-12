/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useState } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { WhyZietblast } from './SideBarItems/WhyZietblast';
import Resources from './SideBarItems/Resources';
import { Solutions } from './SideBarItems/Solutions';
import { Flex, P } from '@/styles/CommonStyles';
import Partner from './SideBarItems/Partner';
import { StyledLink, SubMenu, SubMenuItem } from './SideBarItems/topStyles';
import Components from '@/components';

// Define keyframes for slide-in and slide-out animations
const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

// Styled Sidebar component with dynamic animation based on props
const Sidebar = styled.div`
  width: 100%;
  height: calc(100vh - 100%);
  background-color: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 50;
  overflow: auto;
  transform: translateX(-100%);
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.5s forwards;

 
`;
// const Sidebar = styled.div`
//   width: 100%;
//   height: calc(100vh - 17.5%);
//   background-color: white;
//   box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
//   position: fixed;
//   top: 17.5%;
//   left: 0;
//   z-index: 50;
//   overflow: auto;
//   transform: translateX(-100%);
//   animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.5s forwards;

//   /* Mobile Devices */
//   @media (min-width: 481px) and (max-width: 767px) {
//     top: 20%;
//     height: calc(100vh - 20%);
//   }

//   /* Tablet Devices */
//   @media (min-width: 768px) and (max-width: 1023px) {
//     top: 20%;
//     height: calc(100vh - 20%);
//   }

//   /* Desktop Devices */
//   @media (min-width: 1024px) and (max-width: 1440px) {
//     top: 20%;
//     height: calc(100vh - 20%);
//   }

//   /* Larger Desktop Devices */
//   @media (min-width: 1441px) {
//     top: 20%;
//     height: calc(100vh - 20%);
//   }
// `;

const SidebarItem = styled.div`
  margin: 0;
  padding: 20px;
  height: 100%;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 1px solid #eaebf0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: ${({ opened }) => (opened ? "#06AB78" : "#151a28")};
`;

const SubMenuItems = styled.div`
  padding-left: 20px;
  font-size: 14px;
  color: #151a28;
  max-height: ${({ opened }) => (opened ? '100%' : '0')}; 
  overflow: auto;
  transition: max-height 0.3s ease-out; 
`;

const SidebarComponent = ({ isOpen, items, topItems }) => {
  const [openedItemIndex, setOpenedItemIndex] = useState(null);
  const [openedTopItemIndex, setOpenedTopItemIndex] = useState(null);

  const toggleSubMenu = (index) => {
    setOpenedItemIndex(openedItemIndex === index ? null : index);
  };

  const toggleTopSubMenu = (index) => {
    setOpenedTopItemIndex(openedTopItemIndex === index ? null : index);
  };

  return (
    <Sidebar isOpen={isOpen}>
      {items.map((item, index) => (
        <div key={index}>
          <SidebarItem
            opened={openedItemIndex === index}
            onClick={() => toggleSubMenu(index)}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              {item.title}
              {item.subMenuItems.length > 0 &&
                (openedItemIndex === index ? (
                  <FiChevronDown size={15} />
                ) : (
                  <FiChevronRight size={15} />
                ))}
            </div>

            <div style={{ width: '100%', marginTop: '20px' }}>
              {openedItemIndex === index && (
                <>
                  {item.title === "Why ZeitBlast" && <WhyZietblast item={item} />}
                  {item.title === "Solutions" && <Solutions item={item} />}
                  {item.title === "Resources" && <Resources item={item} />}
                </>
              )}
            </div>
          </SidebarItem>
        </div>
      ))}

      {topItems.map((item, index) => (
        <div key={index}>
          <SidebarItem
            opened={openedTopItemIndex === index}
            onClick={() => toggleTopSubMenu(index)}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              {item.title}
              {item.subMenuItems.length > 0 &&
                (openedTopItemIndex === index ? (
                  <FiChevronDown size={15} />
                ) : (
                  <FiChevronRight size={15} />
                ))}
            </div>

            <div style={{ width: '100%', marginTop: '20px' }}>
              {openedTopItemIndex === index && (
                <>
                  {item.title==="Become a partner" && <Partner item={item}/>}
                  {item.title === "Company" && (
                    <SubMenu item={item} width='100%'>
                      <Flex padding='10px' justify='space-between' direction='column'>
                        <Flex direction='column' padding='10px' gap='15px' color="#00BD82">
                          <P fontSize='14px' fontWeight='700' lineHeight='20px' color='#151A28' paddingLeft='15px'>{item.subMenuItems[0].title}</P>
                          {item.subMenuItems[0].items.map((subItem, subIndex) => (
                            <SubMenuItem key={subIndex} padding='15px' display='flex' align='top' gap='8px'>
                              {subItem.logo}
                              <StyledLink style={{ textDecoration: 'none', color: 'initial' }} to={subItem.url}>{subItem.title}</StyledLink>
                            </SubMenuItem>
                          ))}
                        </Flex>

                        <Flex direction='column' padding='10px' gap='15px' color="#00BD82">
                          <P fontSize='14px' fontWeight='700' lineHeight='20px' color='#151A28' paddingLeft='15px'>{item.subMenuItems[1].title}</P>
                          {item.subMenuItems[1].items.map((subItem, subIndex) => (
                            <SubMenuItem key={subIndex} padding='15px' display='flex' align='top' gap='8px'>
                              {subItem.logo}
                              <StyledLink style={{ textDecoration: 'none', color: 'initial' }} to={subItem.url}>{subItem.title}</StyledLink>
                            </SubMenuItem>
                          ))}
                        </Flex>
                      </Flex>
                    </SubMenu>
                  )}
                </>
              )}
            </div>
          </SidebarItem>
        </div>
      ))}
          <div className="" style={{width:'100%', display:'flex',alignItems:'center',justifyContent:'center', padding:"20px",paddingBottom:'25%'}}>
                <Components.Common.Button
                  text="Get Started"
                />{" "}
              </div>
    </Sidebar>
  );
};

export default SidebarComponent;
