import Components from '@/components'
import { Questionsection } from '@/components/Home/QuestionsSection/PlanSectionPricing'
import React from 'react'

export default function PricingPlans() {
  return (
    <>
   
    <Components.Common.HeaderSite />
    {/* <Components.Home.PricingSection /> */}
    
    <Components.Pricing.HeroSection />
    <Components.Pricing.ReviewFeatures />
    <Components.Pricing.Quotation />
    <Questionsection  />

    <Components.Common.Footer />
    </>
  )
}
