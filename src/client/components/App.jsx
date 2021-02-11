import React from 'react'
import '../../../styles/styles'
import GetListings from './GetListings'
import ListersProfile from './ListersProfile'
import NavBar from './NavBar'
import UserProfile from './UserProfile'

const App = () => {
  return (
    <>
    <NavBar />
    <GetListings />
    <ListersProfile />
    <UserProfile />
    </>
  )
}

export default App