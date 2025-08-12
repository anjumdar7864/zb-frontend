import Components from '@/components'
import React from 'react'

export default function About() {
  return (
    <>
    <Components.Common.HeaderSite />
    <Components.AboutUs.HeroSection />
    <Components.AboutUs.PlatformCard />
    <Components.AboutUs.WhyUs />
    <Components.AboutUs.Journey />
    <Components.AboutUs.TeamSection />
    <Components.AboutUs.CitiesSection />
    <Components.AboutUs.ApplySection />
    <Components.Common.Footer />
    </>
  )
}
