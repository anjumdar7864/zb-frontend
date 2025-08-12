import React from 'react'
import { AdditionalArea, HoverableFlex, StyledLink, SubMenu, SubMenuCOntainer, SubMenuItem } from './styles'
import { Flex, Grid, P } from '@/styles/CommonStyles'
import { IoIosArrowForward } from 'react-icons/io'

export const Solutions = ({ item }) => {
  return (
    <SubMenuCOntainer moveLeft={`-350px`} width='1200px'>
      <SubMenu>
        {
          item.title === "Solutions" && (
            <Grid
              columns="repeat(1, 1fr)"
              lgColumns="repeat(3, 1fr) 1.1fr"
              padding="10px"
              gap={`0rem`}

              margin="0 auto"
              justify="center"
              justifyItems={`center`}
            >
              <Flex direction='column' gap='15px' padding='20px' justify='left'>
                <P fontSize='16px' fontweight='700' lineHeight='20px' color='#151A28'>{item.subMenuItems[0].title}</P>
                <P fontSize='14px' fontweight='400' lineHeight='20px' color='#151A28'>{item.subMenuItems[0].dis}</P>
                <Flex direction='column' style={{ flex:1}} gap='5px'>
                  {
                    item.subMenuItems[0].items.map((item, idx) => {
                      return (
                        <SubMenuItem key={idx} display='flex' align='top' gap='8px'>
                          {/* {item.logo} */}
                          <div style={{ width: '24px', height: '24px' , minWidth:"24px" ,  backgroundColor:"#00BD82" , borderRadius:"8px"}}></div>
                          <StyledLink style={{ textDecoration: 'none', color: "initial" }} to={item.url}>{item.title}</StyledLink>
                        </SubMenuItem>
                      )
                    })
                  }
                  <div style={{ flex:1 , display:"flex" , alignItems:"end"}}>
                  <HoverableFlex paddingTop='20px' paddingLeft='15px'>
                    <P fontSize='16px' fontweight='600' lineHeight='24px'>Discover more</P>
                    <IoIosArrowForward size={15} />
                  </HoverableFlex>
                  </div>
                   
                </Flex>

              </Flex>
              <Flex direction='column' gap='15px' padding='20px' bg='#F7F8FC' radius='24px'>
                <P fontSize='16px' fontweight='700' color='#151A28' lineHeight='20px'>{item.subMenuItems[1].title}</P>
                <P fontSize='14px' fontweight='400' lineHeight='20px' color='#151A28'>{item.subMenuItems[1].dis}</P>
                <Flex direction='column' style={{ flex:1}}>
                  {
                    item.subMenuItems[1].items.map((item, idx) => {
                      return (
                        <SubMenuItem key={idx} display='flex' align='top' gap='8px'>
                          {/* {item.logo} */}
                          <div style={{ width: '24px', height: '24px' , minWidth:"24px" ,  backgroundColor:"#00BD82" , borderRadius:"8px"}}></div>

                          <StyledLink style={{ textDecoration: 'none', color: "initial" }} to={item.url}>{item.title}</StyledLink>
                        </SubMenuItem>

                      )
                    })

                  }
                  <div style={{ flex:1 , display:"flex" , alignItems:"end"}}>
                  <HoverableFlex paddingTop='20px' paddingLeft='15px'>
                  <P fontSize='16px' fontweight='600' lineHeight='24px'>Get free access</P>
                    <IoIosArrowForward size={15} />
                  </HoverableFlex>
                  </div>
                </Flex>
                {/* <P fontSize='16px' fontweight='700' color='#151A28' lineHeight='20px'>{item.subMenuItems[2].title}</P>
                <Flex direction='column'>
                  {
                    item.subMenuItems[2].items.map((item, idx) => {
                      return (
                        <SubMenuItem key={idx} display='flex' align='center' gap='8px'>
                          {item.logo}
                          <StyledLink style={{ textDecoration: 'none', color: "initial" }} to={item.url}>{item.title}</StyledLink>
                        </SubMenuItem>

                      )
                    })

                  }
                </Flex> */}
              </Flex>
              <Flex direction='column' gap='15px' padding='20px'>
                <P fontSize='16px' fontweight='700' color='#151A28' lineHeight='20px'>{item.subMenuItems[2].title}</P>
                <P fontSize='14px' fontweight='400' lineHeight='20px' color='#151A28'>{item.subMenuItems[2].dis}</P>
                <Flex direction='column' style={{ flex:1}} >
                  {
                    item.subMenuItems[2].items.map((item, idx) => {
                      return (
                        <SubMenuItem key={idx} display='flex' align='top' gap='8px'>
                          {/* {item.logo} */}
                          <div style={{ width: '24px', height: '24px' , minWidth:"24px" ,  backgroundColor:"#00BD82" , borderRadius:"8px"}}></div>

                          <StyledLink style={{ textDecoration: 'none', color: "initial" }} to={item.url}>{item.title}</StyledLink>
                        </SubMenuItem>

                      )
                    })

                  }
                    <div style={{ flex:1 , display:"flex" , alignItems:"end"}}>
                  <HoverableFlex paddingTop='20px' paddingLeft='15px'>
                  <P fontSize='16px' fontweight='600' lineHeight='24px'>Learn More</P>

                    <IoIosArrowForward size={15} />
                  </HoverableFlex>
                  </div>
                </Flex>
              </Flex>
              <Flex direction='column' gap='15px' padding='20px' bg='#F7F8FC' radius='24px'>
                <P fontSize='16px' fontweight='700' color='#151A28' lineHeight='20px'>{item.subMenuItems[3].title}</P>
                <P fontSize='14px' fontweight='400' lineHeight='20px' color='#151A28'>{item.subMenuItems[3].dis}</P>
                <Flex direction='column' style={{ flex:1}}>
                  {
                    item.subMenuItems[3].items.map((item, idx) => {
                      return (
                        <SubMenuItem key={idx} display='flex' align='top' gap='8px'>
                          {/* {item.logo} */}
                          <div style={{ width: '24px', height: '24px' , minWidth:"24px" ,  backgroundColor:"#00BD82" , borderRadius:"8px"}}></div>

                          <StyledLink style={{ textDecoration: 'none', color: "initial" }} to={item.url}>{item.title}</StyledLink>
                        </SubMenuItem>

                      )
                    })

                  }
                <div style={{ flex:1 , display:"flex" , alignItems:"end"}}>
                  <HoverableFlex paddingTop='20px' paddingLeft='15px'>
                  <P fontSize='16px' fontweight='600' lineHeight='24px'>Discover more industries</P>

                    <IoIosArrowForward size={15} />
                  </HoverableFlex>
                  </div>
                </Flex>
             
              </Flex>
            </Grid>
          )
        }
      </SubMenu>
      {
        item.title === "Solutions" && (
          <AdditionalArea>
            <div style={{ display: "flex", justifyContent: "space-between"}}>
              <div>
                <div style={{color:"white" , fontWeight:700 , fontSize:"14px" , lineHeight:"22px"}}>Book a Zeitblast Demo Today!</div>
                <div style={{color:"#D3D7DD" , fontWeight:400 , fontSize:"14px" , lineHeight:"22px"}}> Discover how our solutions can transform your business.</div>
              </div>
              <div style={{  display:"flex" , alignItems:"center"}}>
                <div >
                <HoverableFlex paddingTop='0px' >
                    <P fontSize='16px' fontweight='600' lineHeight='24px' color='white'>Get free access</P>
                    <IoIosArrowForward size={15} />
                  </HoverableFlex>
                </div>
              </div>
            </div>
          </AdditionalArea>
        )
      }
    </SubMenuCOntainer>
  )
}
