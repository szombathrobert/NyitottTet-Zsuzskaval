import React from 'react'
import Navbar from './components/navbar'
import Banner from './components/banner'
import About from './components/about'
import Contact from './components/contact'
import Footer from './components/footer'

const home = () => {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <About/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default home
