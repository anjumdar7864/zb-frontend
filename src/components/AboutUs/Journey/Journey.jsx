import React from 'react'
import { ContainerFluid, Flex, P } from '@/styles/CommonStyles'
import { Box, CareBox, ItemBg } from './styles'
import { care, connect, journey, topimg1, topimg2, topimg3, topimg4 } from '@/assets/images'

export default function Journey () {
  return (
    <ContainerFluid paddingTop='5%'>
        <CareBox>
            <Flex align='center' gap='20px' direction='column' mdDirection='row'>
                <Flex direction='column' gap='5px' padding='20px'>
                    <P color='#012635' fontSize='24px' fontweight='600' mdTextAlign='center' textAlign='left'>A Team That Cares</P>
                    <P color='#012635' fontSize='14px' fontweight='300' lineHeight='26px'>At Zeitblast, we pride ourselves on being a small team that truly cares about your success. Our goal is to scale and become one of the most powerful marketing lead generation platforms in the nation. We are committed to providing top-notch service and continuously improving our platform to meet your needs.</P>
                </Flex>
                <Flex position='relative' mdWidth='1838px' width='300px'>
                    <img src={care} alt="" width={'100%'}/>
                    <ItemBg>
                        <img src={topimg1} alt="" />
                        <img src={topimg2} alt="" />
                        <img src={topimg3} alt="" />
                        <img src={topimg4} alt="" />
                    </ItemBg>
                </Flex>
            </Flex>
        </CareBox>
        <Flex width='100%' gap='40px' paddingTop='5%' direction='column'  align='center' mdDirection='row'>
            <Box bg='linear-gradient(0deg, #073F56, #073F56),
                linear-gradient(162.49deg, rgba(91, 241, 178, 0) 53.96%, rgba(91, 241, 178, 0.6) 100%),
                radial-gradient(55.25% 73.73% at -4950% 37.6%, rgba(48, 134, 238, 0.2) 0%, rgba(48, 134, 238, 0) 100%)
                ' border='1.12px solid #5BF1B2' color='white'>
                <img src={journey} alt="" />
                <P color='white' fontSize='32px' fontweight='700'>Join Us on Our Journey</P>
                <P color='white' fontSize='18px' fontweight='300' lineHeight='26px'>We are excited about the future and invite you to join us on our journey. As we continue to grow and expand, we are dedicated to helping you achieve your business goals through innovative SMS text messaging solutions.</P>
            </Box>
            <Box bg='linear-gradient(0deg, #D6E7FC, #D6E7FC),linear-gradient(162.49deg, rgba(255, 255, 255, 0) 53.96%, rgba(255, 255, 255, 0.6) 100%),radial-gradient(55.25% 73.73% at -4950% 37.6%, rgba(48, 134, 238, 0.2) 0%, rgba(48, 134, 238, 0) 100%)' border='1.12px solid #74B5FF' color='white'>
                <img src={connect} alt="" />
                <P color='#005ABB' fontSize='32px' fontweight='700'>Connect with Us</P>
                <P color='#4F6C7D' fontSize='18px' fontweight='300' lineHeight='26px'>Ready to revolutionize your lead generation strategy? Discover the power of Zeitblast and take your business to new heights.</P>
            </Box>

        </Flex>
        
    </ContainerFluid>
  )
}
