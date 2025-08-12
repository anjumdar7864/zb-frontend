import { ContainerFluid, Flex, H1, P, Paragraph } from '@/styles/CommonStyles'
import theme from '@/theme'
import React from 'react'

export default function HeroSection() {
   
  return (
   <ContainerFluid>
    <Flex direction="column" gap='1rem' align="center" justify="center" paddingY={`5rem`} >
    <img src="./images/about/hero-icon.svg" width={120} />
    <P color={theme.colors.black} textAlign="center" fontSize="4rem" lineHeight='60px' fontweight="600" family={'Fellix'}>Creating Opportunities for Real Estate Professionals and Beyond</P>
    <Paragraph align="center" fontSize={`1.3rem`} family={'Fellix'} paddingX="7rem">At Zeitblast, we believe in the power of meaningful connections. Our mission is to create opportunities for real estate professionals and any industry aiming to generate leads through SMS text messaging. We empower sales and support teams to truly connect with customers, bring depth to conversations, and drive long-lasting business impact.</Paragraph>
    </Flex>
   </ContainerFluid>
  )
}
