import React from 'react'
import Navbar from './components/navbar'
import Banner from './components/banner'
import About from './components/about'
import Contact from './components/contact'
import Footer from './components/footer'
import Treatments from './components/treatments'
import ReviewSection from './components/reviews'
import EventsSection from './components/EventsSection'

const home = () => {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <About/>
      <Contact/>
      <Treatments/>
      <ReviewSection/>
      <EventsSection/>
      <Footer/>
    </div>
  )
}

export default home
