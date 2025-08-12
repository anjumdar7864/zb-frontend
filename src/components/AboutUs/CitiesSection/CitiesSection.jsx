import React, { useState } from 'react'
import { CitySection, ImageBox, StyledCityImg } from './styles'
import { Flex, P } from '@/styles/CommonStyles'
import { berlin, Berlin, cairo, Cairo, cebu, Cebu, islamabad, Islamabad, lossAngles, lossimg, newDelhi, NewDelhi } from '@/assets/images'

export default function CitiesSection () {
  const [selected,setSelected] = useState(0)
  const citiesData = [
    {
      img:lossAngles,
      title:"Los Angeles"
    },
    {
      img:NewDelhi,
      title:"NewDelhi"
    },
    {
      img:Berlin,
      title:"Berlin"
    },
    {
      img:Cairo,
      title:"Cairo"
    },
    {
      img:Cebu,
      title:"Cebu"
    },
    {
      img:Islamabad,
      title:"Islamabad"
    },
  ]
  const imageData = [
    lossimg, newDelhi, berlin, cairo, cebu, islamabad

  ]
  return (
    <CitySection>
      <Flex align='center' justify='center' direction='column' >
       <P color='#012635' fontSize='34px' fontweight='700' textAlign='center'>We are diverse indeed</P>
       <Flex align='center' justify='center' gap='80px' paddingTop='5%' direction='column' mdDirection='row'>
         <Flex align='left' direction='column' gap='20px'>
          {
            citiesData.map((item,index)=>{
              return (
                <Flex key={index} align='center' gap='20px' style={{borderBottom:'1px solid #D5D7DC'}} cursor='pointer' paddingBottom='15px' onClick={()=>{setSelected(index)}}>
                  <StyledCityImg src={item.img} />
                  <P color={selected == index ? "#00BD82" : "#012635"} fontSize='25px' fontweight='500' textAlign='center'>{item.title}</P>

                </Flex>
              )
            })
          }
           
         </Flex>
         <Flex width='825px' objectFit='contain' lgDisplay='flex' display='none'>
          <ImageBox src={imageData[selected]} />   
         </Flex>
       </Flex>
      </Flex>
    </CitySection>
  )
}
