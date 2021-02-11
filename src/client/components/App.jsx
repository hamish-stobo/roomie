import React from 'react'
import '../../../styles/styles'
import GetListings from './GetListings'
import ListersProfile from './ListersProfile'
import NavBar from './NavBar'
import UserProfile from './UserProfile'
import Header from './Header'
import Footer from './Footer'

const App = () => {
  return (
    <>
      <div class="grid-container">
        <Header />
        <NavBar />
        <GetListings />
        {/* <ListersProfile /> */}
        {/* <UserProfile /> */}
        <Footer />
      </div>
    </>
  )
}

export default App