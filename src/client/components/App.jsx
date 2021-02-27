import React from 'react'
import { hot } from 'react-hot-loader/root';
import '../styles/styles'
import GetListings from './GetListings'
import NavBar from './NavBar'
import Profile from './Profile'
import Header from './Header'
import Footer from './Footer'
import SignUpForm from './SignUpForm'
import Hero from './hero/Hero'

const App = () => {
  return (
    <>
      <div className="grid-container">
        <Hero />
        <Header />
        <NavBar />
        <GetListings />
        {/* <Profile /> */}
        <SignUpForm />
        <Footer />
      </div>
    </>
  )
}

export default hot(App)