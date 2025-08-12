import React from 'react'
import { AdditionalArea, HoverableFlex, StyledLink, SubMenu, SubMenuCOntainer, SubMenuItem } from './styles'
import { Flex, Grid, P } from '@/styles/CommonStyles'
import { IoIosArrowForward } from 'react-icons/io'

const Resources = ({item}) => {
    console.log("res",item)
  return (
    <SubMenuCOntainer width='100%'>
    <SubMenu>
      {
        item.title==="Resources" && (
          <Grid 
          columns="repeat(1, 1fr)"
          lgColumns="repeat(3, 1fr)" 
        
          gap={`0rem`}
    margin="0 auto" 
    justify="center"
    justifyItems={`left`}
          >
            <Flex direction='column' gap='15px' padding='20px' justify='left' width='100%'>        
              <P fontSize='16px' fontweight='700' lineHeight='20px' color='#151A28'>{item.subMenuItems[0].title}</P>
              <Flex direction='column' gap='5px'>
              {
                item.subMenuItems[0].items.map((item,idx)=>{
                  return (
                    <SubMenuItem key={idx} display='flex' align='top' gap='8px'>
                     {item.logo}
                    <StyledLink style={{textDecoration:'none',color:"initial"}} to={item.url}>{item.title}</StyledLink>
                  </SubMenuItem>
                  )
                })
              }
              </Flex>
              
            </Flex>
            <Flex direction='column' gap='15px' padding='20px' width='100%'>
              <P fontSize='16px' fontweight='700' color='#151A28' lineHeight='20px'>{item.subMenuItems[1].title}</P>
              <Flex direction='column'>
              {
                item.subMenuItems[1].items.map((item,idx)=>{
                  return (
                        <SubMenuItem key={idx} display='flex' align='top' gap='8px'>
                          {item.logo}
                          <StyledLink style={{textDecoration:'none',color:"initial"}} to={item.url}>{item.title}</StyledLink>
                        </SubMenuItem>
                    
                  )
                })

              }
              </Flex>
            </Flex>
            <Flex direction='column' gap='15px' padding='20px' bg='#012635' radius='24px' width='100%'>
              <P fontSize='16px' fontweight='700' color='white' lineHeight='20px'>{item.subMenuItems[2].title}</P>
              <Flex direction='column'>
              {
                item.subMenuItems[2].items.map((item,idx)=>{
                  return (
                        <SubMenuItem key={idx} display='flex' align='top' gap='8px' bg='rgba(255,255,255, 0.1)'>
                          {item.logo}
                          <StyledLink style={{textDecoration:'none',color:"white"}} to={item.url}>{item.title}</StyledLink>
                        </SubMenuItem>
                    
                  )
                })

              }
               <HoverableFlex paddingTop='20px' paddingLeft='15px' color='white'>
               <P fontSize='12px' fontweight='600' lineHeight='26px'>Discover our Blog</P>
              <IoIosArrowForward size={15}/>
              </HoverableFlex>
              </Flex>
            </Flex>
          </Grid>
        )
      }
    </SubMenu>
    {
      item.title==="Resources" && (
        <AdditionalArea>
            <Flex justify='space-between' >
                <P fontSize='14px' fontweight='700' lineHeight='26px' color='#F7F8FC' >Hub of Content and Resources</P>
                <HoverableFlex color='white' paddingRight='20px'>
               <P fontSize='12px' fontweight='600' lineHeight='26px'>Sales Content Hub and Resources</P>
              <IoIosArrowForward size={15}/>
              </HoverableFlex>
            </Flex>
      </AdditionalArea>
      )
    }
    </SubMenuCOntainer>
  )
}

export default Resources
