import { ContainerFluid, Flex, H2, Paragraph } from '@/styles/CommonStyles'
import theme from '@/theme'
import React from 'react'

export default function PlatformCard() {
  return (
    <ContainerFluid>
        <Flex bgImage={`./images/signup/background.png`} mdDirection="row" direction='column' gap="3rem" padding={`3rem`}  radius={`2rem`} color={theme.colors.white}>
        <Flex width='300px' smWidth='400px' mdWidth='1800px' objectFit='cover'><img src='./images/about/card-image.png' width={'100%'} /></Flex>
        <Flex gap="1rem" direction="column" justify="center" >
          <H2 fontSize="3rem" weight="600" family={'Fellix'}>Your Go-To Lead Generation Platform</H2>
          <Paragraph family={'Fellix'} fontSize="1.3rem">
          Zeitblast is your ultimate text message lead generation platform, designed to boost productivity and effectiveness in lead generation. Our high deliverability and response rates ensure that your messages reach the right audience, every time. With our platform, you can generate quality leads quickly, efficiently, and reliably.
          </Paragraph>
        </Flex>
        </Flex>
    </ContainerFluid>
  )
}
