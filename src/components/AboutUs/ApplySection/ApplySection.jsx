import Assets from '@/assets'
import { LogoWrapper } from '@/components/Home/QuestionsSection/styles'
import { Flex, P } from '@/styles/CommonStyles'
import React from 'react'
import { Button, ContainerApply, TopSection } from './styles'

export default function ApplySection () {
  return (
    <ContainerApply>
    <TopSection>
      <LogoWrapper>
        <img src={Assets.Images.top} alt="ZeitBlast" />
      </LogoWrapper>
      <P fontweight={"700"} fontSize={"38px"} color='white'>Our team is growing</P>
      <P fontweight={"300"} fontSize={"16px"} color='white'>When you work on something you care about, with people you enjoy spending time with, it’s an amazing feeling. Current open positions are: acquisition managers:</P>
      <Flex align='center' justify='center' gap='5px'>
        <P color='white' fontSize='16px' fontweight='300'>Apply :</P>
       <Button>apply@zeitblast.com</Button>
      </Flex>
    </TopSection>
</ContainerApply>
  )
}
