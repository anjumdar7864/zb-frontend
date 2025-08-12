import React from 'react'
import { AdditionalArea, HoverableFlex, StyledLink, SubMenu, SubMenuCOntainer, SubMenuItem } from './styles'
import { Flex, Grid, P } from '@/styles/CommonStyles'
import { IoIosArrowForward } from 'react-icons/io'
import { imageWhy } from '@/assets/images'

export const WhyZietblast = ({item}) => {
  console.log("why",item)
  return (
    <SubMenuCOntainer width='100%'>
    <SubMenu>
    
        <Grid
           columns="repeat(1, 1fr)"
           lgColumns="repeat(2, 1fr) 1.3fr" 
           
           gap={`0rem`}
     margin="0 auto" 
     justify="center"
     justifyItems={`left`}
        >
          <Flex direction='column' gap='15px' padding='20px' bg='#F7F8FC' radius='24px' width='100%'>
            <P fontSize='16px' fontweight='700' color='#151A28' lineHeight='20px'>WHAT IS ZEITBLAST</P>
            <P fontSize='12px' fontweight='300' color='#738790' lineHeight='23px'>Business phone features built for a better kind of conversation</P>
            <img src={imageWhy} width={'225px'} height={'128px'} alt="" />
            <HoverableFlex>
              <P fontSize='14px' fontweight='600' lineHeight='26px'>Discover more</P>
            <IoIosArrowForward size={15}/>
            </HoverableFlex>
          </Flex>
          <Flex direction='column' gap='15px' padding='20px' justify='left' width='100%'>        
            <P fontSize='16px' fontweight='700' lineHeight='20px' color='#151A28'>{item.subMenuItems[0].title}</P>
            <Flex direction='column' gap='5px'>
            {
              item.subMenuItems[0].items.map((item,idx)=>{
                return (
                  <SubMenuItem key={idx}>
                  <StyledLink style={{textDecoration:'none',color:"initial"}} to={item.url}>{item}</StyledLink>
                </SubMenuItem>
                )
              })
            }
            </Flex>
            <HoverableFlex paddingTop='30px'>
              <P fontSize='14px' fontweight='600' lineHeight='26px'>Get free access</P>
            <IoIosArrowForward size={15}/>
            </HoverableFlex>
            
          </Flex>
          <Flex direction='column' gap='15px' padding='20px' bg='#F7F8FC' radius='24px' width='100%'>
            <P fontSize='16px' fontweight='700' color='#151A28' lineHeight='20px'>{item.subMenuItems[1].title}</P>
            <Grid
              columns="repeat(2, 1fr)"
              lgColumns="repeat(2, 1fr)" 
              padding="10px"
              gap={`0rem`}
            
        
        justify="space-between"
        justifyItems={`spcae-between`}
        align='center'>
            {
              item.subMenuItems[1].items.map((item,idx)=>{
                return (
                      <SubMenuItem key={idx} display='flex' align='center' gap='5px'>
                        <img src={item.logo} alt="" />
                        <StyledLink style={{textDecoration:'none',color:"initial"}} to={item.url}>{item.title}</StyledLink>
                      </SubMenuItem>
                  
                )
              })

            }
            </Grid>
            <HoverableFlex paddingTop='5px'>
              <P fontSize='14px' fontweight='600' lineHeight='26px'>Discover our 100+ integrations</P>
            <IoIosArrowForward size={15}/>
            </HoverableFlex>



          </Flex>
        </Grid>
        
    
    </SubMenu>
    {/* {
        <AdditionalArea>
        <Flex align='center' gap='20%'>
          <Flex direction='column' gap='3px'>
            <P fontSize='14px' fontweight='700'  color='#F7F8FC'>Simplifying AI For Customer-Facing Teams</P>
            <P fontSize='12px' fontweight='400' color='#B2BDC2'>Explore how AI can boost productivity and deliver world-class customer experience.</P>
          </Flex>
            <HoverableFlex color="#F7F8FC">
                <P fontSize='14px' fontweight='600' lineHeight='26px'>Explore more</P>
              <IoIosArrowForward size={15}/>
            </HoverableFlex>
        </Flex>
      </AdditionalArea>
    } */}
    </SubMenuCOntainer>
  )
}
