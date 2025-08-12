import React from 'react'

import { Flex, P } from '@/styles/CommonStyles'
import { StyledLink, SubMenu, SubMenuItem } from './topStyles'

const Partner = ({item}) => {
   
  return (
    <SubMenu  item={item} width='100%'>
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
  )
}

export default Partner
