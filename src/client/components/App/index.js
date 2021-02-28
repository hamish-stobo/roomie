import React from 'react'
import { hot } from 'react-hot-loader/root';
import '../../styles/styles'
import Listings from '../Listings'
import NavBar from '../NavBar'
import Profile from '../Profile'
import Footer from '../Footer'
import SignUpForm from '../Register'
import Hero from '../hero'

const App = () => {
  return (
    <>
      <div className="grid-container">
        <Hero />
        <NavBar />
        <Listings />
        {/* <Profile /> */}
        <SignUpForm />
        <Footer />
      </div>
    </>
  )
}

export default hot(App)