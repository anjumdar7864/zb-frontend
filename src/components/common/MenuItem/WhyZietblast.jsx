import React from 'react'
import { AdditionalArea, HoverableFlex, StyledLink, SubMenu, SubMenuCOntainer, SubMenuItem } from './styles'
import { Flex, Grid, P } from '@/styles/CommonStyles'
import { IoIosArrowForward } from 'react-icons/io'
import { imageWhy } from '@/assets/images'

export const WhyZietblast = ({ item }) => {
  return (
    <SubMenuCOntainer moveLeft={`-150px`} width='1240px'>
      <SubMenu>
        {
          item.title === "Why ZeitBlast" && (
            <Grid
              columns="repeat(1, 1fr)"
              lgColumns="repeat(2, 1fr) 1.3fr"
              padding="10px"
              gap={`0rem`}

              margin="0 auto"
              justify="center"
              justifyItems={`center`}
            >
              <Flex direction='column' gap='15px' padding='20px' bg='#F7F8FC' radius='24px'>
                <P fontSize='16px' fontweight='700' color='#151A28' lineHeight='20px'>WHAT IS ZEITBLAST</P>
                <P fontSize='12px' fontweight='300' color='#738790' lineHeight='23px'>Powerful SMS lead generation for real estate and beyond
                </P>
                <ul style={{ paddingLeft: "20px", color: "#073F56", fontWeight: 400, fontSize: "16px", lineHeight: "24px", display: "flex", flexDirection: "column", gap: "5px" }}>
                  {
                    item?.subMenuItems[0]?.items?.map((item, idx) => {
                      return (

                        <li>
                          {item?.title}
                        </li>
                      )
                    })
                  }
                </ul>
                <div style={{ flex: 1, display: "flex", alignItems: "end" }}>
                  <HoverableFlex>
                    <P fontSize='14px' fontweight='600' lineHeight='26px'>Discover more</P>
                    <IoIosArrowForward size={15} />
                  </HoverableFlex>
                </div>
              </Flex>
              <Flex direction='column' gap='15px' padding='20px' justify='left'>
                <P fontSize='16px' fontweight='700' lineHeight='20px' color='#151A28'>{item.subMenuItems[1].title}</P>
                <P fontSize='12px' fontweight='300' color='#738790' lineHeight='23px'>Why top professionals trust our platform
                </P>
                <Flex direction='column' gap='5px'>
                  <ul style={{ paddingLeft: "20px", color: "#073F56", fontWeight: 400, fontSize: "16px", lineHeight: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>

                    {
                      item.subMenuItems[1].items.map((item, idx) => {
                        return (
                          // <SubMenuItem key={idx}>
                          //   <StyledLink style={{ textDecoration: 'none', color: "initial" }} to={item.url}>{item}</StyledLink>
                          // </SubMenuItem>
                          <li key={idx}>
                            {item}
                          </li>
                        )
                      })
                    }
                  </ul>
                </Flex>
                <div style={{ flex: 1, display: "flex", alignItems: "end" }}>
                  <HoverableFlex paddingTop='30px'>
                    <P fontSize='14px' fontweight='600' lineHeight='26px'>Get started</P>
                    <IoIosArrowForward size={15} />
                  </HoverableFlex>
                </div>
              </Flex>
              <Flex direction='column' gap='15px' padding='20px' bg='#F7F8FC' radius='24px'>
                <P fontSize='16px' fontweight='700' color='#151A28' lineHeight='20px'>{item.subMenuItems[2].title}</P>
                <Grid
                  columns="repeat(1, 1fr)"
                  lgColumns="repeat(2, 1fr)"
                  padding="10px"
                  gap={`0rem`}

                  margin="0 auto"
                  justify="center"
                  justifyItems={`left`}>
                  {
                    item.subMenuItems[2].items.map((item, idx) => {
                      return (
                        <SubMenuItem key={idx} display='flex' align='center' gap='5px'>
                          <img src={item.logo} alt="" />
                          <StyledLink style={{ textDecoration: 'none', color: "initial" }} to={item.url}>{item.title}</StyledLink>
                        </SubMenuItem>

                      )
                    })

                  }
                </Grid>
                <HoverableFlex paddingTop='5px'>
                  <P fontSize='14px' fontweight='600' lineHeight='26px'>Explore All Features</P>
                  <IoIosArrowForward size={15} />
                </HoverableFlex>



              </Flex>
            </Grid>
          )
        }
      </SubMenu>
      {
        item.title === "Why ZeitBlast" && (
          <AdditionalArea>
            <Flex align='center' style={{ justifyContent: "space-between" }} >
              <Flex direction='column' gap='3px' >
                <P fontSize='14px' fontweight='700' color='#F7F8FC'>Simplifying AI For Customer-Facing Teams</P>
                <P fontSize='12px' fontweight='400' color='#B2BDC2'>Explore how AI can boost productivity and deliver world-class customer experience.</P>
              </Flex>
              <div >
                <HoverableFlex color="#F7F8FC">
                  <P fontSize='14px' fontweight='600' lineHeight='26px'>Explore more</P>
                  <IoIosArrowForward size={15} />
                </HoverableFlex>
              </div>

            </Flex>
          </AdditionalArea>
        )
      }
    </SubMenuCOntainer>
  )
}
