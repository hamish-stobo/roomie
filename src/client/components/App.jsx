import React from 'react'
import '../../../styles/styles'
import GetListings from './GetListings'
import ListersProfile from './ListersProfile'
import NavBar from './NavBar'
import UserProfile from './UserProfile'
import Header from './Header'
import Footer from './Footer'
import SignUpForm from './SignUpForm'

const App = () => {
  return (
    <>
      <div className="grid-container">
        <Header />
        <NavBar />
        <GetListings />
        {/* <ListersProfile /> */}
        {/* <UserProfile /> */}
        <SignUpForm />
        <Footer />
      </div>
    </>
  )
}

export default App