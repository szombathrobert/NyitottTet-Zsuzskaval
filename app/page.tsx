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
      <Banner/>
      <div
        className="h-[60vh] bg-fixed bg-center bg-cover relative"
        style={{ backgroundImage: "url('/bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <About/>
            <div
        className="h-[60vh] bg-fixed bg-center bg-cover relative"
        style={{ backgroundImage: "url('/bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <Contact/>
            <div
        className="h-[60vh] bg-fixed bg-center bg-cover relative"
        style={{ backgroundImage: "url('/bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <Treatments/>
            <div
        className="h-[60vh] bg-fixed bg-center bg-cover relative"
        style={{ backgroundImage: "url('/bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <ReviewSection/>
            <div
        className="h-[60vh] bg-fixed bg-center bg-cover relative"
        style={{ backgroundImage: "url('/bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <EventsSection/>
            <div
        className="h-[60vh] bg-fixed bg-center bg-cover relative"
        style={{ backgroundImage: "url('/bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <Footer/>
    </div>
  )
}

export default home
