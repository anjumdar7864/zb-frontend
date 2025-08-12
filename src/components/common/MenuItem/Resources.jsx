import React from 'react'
import { AdditionalArea, HoverableFlex, StyledLink, SubMenu, SubMenuCOntainer, SubMenuItem } from './styles'
import { Flex, Grid, P } from '@/styles/CommonStyles'
import { IoIosArrowForward } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const Resources = ({ item }) => {
  
  const navigate = useNavigate()
  return (
    <SubMenuCOntainer style={{ marginLeft: "-600px" }} moveLeft={`-430px`} xlMoveLeft={`-50px`} width='1240px'>
      <SubMenu>
        {
          item.title === "Resources" && (
            <Grid
              columns="repeat(1, 1fr)"
              lgColumns="532px 1fr 1fr"

              gap={`0rem`}
              margin="0 auto"
              justify="center"
              justifyItems={`center`}
            >
              <Flex  direction='column' gap='15px' padding='20px' justify='left'>
                <P fontSize='16px' fontweight='700' lineHeight='20px' color='#151A28'>{item.subMenuItems[0].title}</P>
                <P fontSize='14px' fontweight='400' lineHeight='20px' color='#151A28'>Powerful tools to drive lead generation success.</P>

                {/* <Flex direction='column' gap='5px'>
                  {
                    item.subMenuItems[0].items.map((item, idx) => {
                      return (
                        <SubMenuItem key={idx} display='flex' align='top' gap='8px'>
                          {item.logo}
                          <StyledLink style={{ textDecoration: 'none', color: "initial" }} to={item.url}>{item.title}</StyledLink>
                        </SubMenuItem>
                      )
                    })
                  }
                </Flex> */}
                <Grid
                  columns="repeat(1, 1fr)"
                  lgColumns="repeat(2, 1fr)"
                  padding="10px"
                  gap={`0rem`}

                  margin="0 auto"
                  justify="center"
                  justifyItems={`left`}>
                  {
                    item.subMenuItems[0].items.map((item, idx) => {
                      return (
                        <SubMenuItem key={idx} display='flex' align='center' gap='5px'>
                          {/* <img src={item.logo} alt="" /> */}
                          <div style={{ width: '24px', height: '24px', minWidth: "24px", backgroundColor: "#00BD82", borderRadius: "8px" }}></div>

                          <StyledLink style={{ textDecoration: 'none', color: "initial" }} to={item.url}>{item.title}</StyledLink>
                        </SubMenuItem>

                      )
                    })

                  }
                </Grid>
                <div style={{ flex:1 , display:"flex" , alignItems:"end"}}>
                <HoverableFlex>
                  <P fontSize='14px' fontweight='600' lineHeight='26px'>Explore All Features</P>
                  <IoIosArrowForward size={15} />
                </HoverableFlex>
                </div>
               
              </Flex>
              <Flex direction='column' gap='15px' padding='20px' bg='#F7F8FC' radius='24px'  >
                <P fontSize='16px' fontweight='700' color='#151A28' lineHeight='20px'>{item.subMenuItems[1].title}</P>
                <P fontSize='14px' fontweight='400' lineHeight='20px' color='#151A28'>Resources to help you master Zeitblast.</P>

                <Flex direction='column'>
                  {
                    item.subMenuItems[1].items.map((item, idx) => {
                      return (
                        <SubMenuItem key={idx} display='flex' align='top' gap='8px'>
                          {/* {item.logo} */}
                          <div style={{ width: '24px', height: '24px', minWidth: "24px", backgroundColor: "#00BD82", borderRadius: "8px" }}></div>

                          <StyledLink style={{ textDecoration: 'none', color: "initial" }} to={item.url}>{item.title}</StyledLink>
                        </SubMenuItem>

                      )
                    })

                  }
                </Flex>
                <div onClick={() => navigate("/resourse-center")} style={{ flex:1 , display:"flex" , alignItems:"end"}}>
                <HoverableFlex>
                  <P fontSize='14px' fontweight='600' lineHeight='26px'>Access Learning Hub</P>
                  <IoIosArrowForward size={15} />
                </HoverableFlex>
                </div>
              </Flex>
              <Flex direction='column' gap='15px' padding='20px' radius='24px'>
                <P fontSize='16px' fontweight='700' color='#073F56' lineHeight='20px'>{item.subMenuItems[2].title}</P>
                <P fontSize='14px' fontweight='400' lineHeight='20px' color='#151A28'>Insights, strategies, and updates.</P>

                <Flex direction='column'>
                  {
                    item.subMenuItems[2].items.map((item, idx) => {
                      return (
                        <SubMenuItem key={idx} display='flex' align='top' gap='8px' bg='rgba(255,255,255, 0.1)'>
                          {/* {item.logo} */}
                          <div style={{ width: '24px', height: '24px', minWidth: "24px", backgroundColor: "#00BD82", borderRadius: "8px" }}></div>

                          <StyledLink style={{ textDecoration: 'none', color: "#073F56" }} to={item.url}>{item.title}</StyledLink>
                        </SubMenuItem>

                      )
                    })

                  }
                  <HoverableFlex paddingTop='20px' paddingLeft='15px' color='white'>
                    <P fontSize='12px' fontweight='600' lineHeight='26px'>Discover our Blog</P>
                    <IoIosArrowForward size={15} />
                  </HoverableFlex>
                </Flex>
                <div style={{ flex:1 , display:"flex" , alignItems:"end"}}>
                <HoverableFlex>
                  <P fontSize='14px' fontweight='600' lineHeight='26px'>Discover Our Blog</P>
                  <IoIosArrowForward size={15} />
                </HoverableFlex>
                </div>
              </Flex>
            </Grid>
          )
        }
      </SubMenu>
      {
        item.title === "Resources" && (
          <AdditionalArea>
            <Flex justify='space-between' >
              <div>
                <P fontSize='14px' fontweight='700' lineHeight='26px' color='#F7F8FC' >Unlock the Power of Zeitblast Today!</P>
                <P fontSize='14px' fontweight='400' lineHeight='20px' color='#D3D7DD'> Generate more leads, close more deals, and grow your business with Zeitblast’s suite of powerful features.</P>

              </div>

              <HoverableFlex color='white' paddingRight='20px'>
                <P onClick={() => navigate("/pricing")} fontSize='12px' fontweight='600' lineHeight='26px'>Get Started Now </P>
                <IoIosArrowForward size={15} />
              </HoverableFlex>
            </Flex>
          </AdditionalArea>
        )
      }
    </SubMenuCOntainer>
  )
}

export default Resources
