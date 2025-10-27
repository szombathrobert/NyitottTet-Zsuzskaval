import React from 'react'
import Navbar from './components/navbar'
import Banner from './components/banner'
import About from './components/about'
import Contact from './components/contact'
import Footer from './components/footer'
import Treatments from './components/treatments'
import ReviewSection from './components/reviews'

const home = () => {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <About/>
      <Contact/>
      <Treatments/>
      <ReviewSection/>
      <Footer/>
    </div>
  )
}

export default home
