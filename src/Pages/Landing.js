import React from 'react'
import ContactSection from '../Components/ContactSection'
import DemoSection from '../Components/DemoSection'
import FeaturesSection from '../Components/FeaturesSection'
import Footer from '../Components/Footer'
import LandingSection from '../Components/LandingSection'
import Navbar from '../Components/Navbar'
import ReviewsSection from '../Components/ReviewsSection'

export default function Landing() {
  return (
    <>
      <Navbar/>
      <LandingSection/>
      <FeaturesSection/>
      <DemoSection/>
      <ReviewsSection/>
      <ContactSection/>
      <Footer/>
    </>
  )
}
