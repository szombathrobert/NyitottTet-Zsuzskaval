import React from 'react'
import Navbar from './components/navbar'
import Banner from './components/banner'
import About from './components/about'

const home = () => {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <About/>
    </div>
  )
}

export default home
