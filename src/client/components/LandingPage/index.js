import React from 'react'
import '../../styles/styles'
import Login from './Login'
import Footer from '../Footer'

const LandingPage = () => (
    <div className="pageWrapper">
        <h1 className="Logo Header lowercase">rOOmie</h1>
        <Login />
        <Footer />
    </div>
)


export default LandingPage
