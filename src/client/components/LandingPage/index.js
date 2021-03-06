import React from 'react'
import '../../styles/styles'
import Login from './Login'

const LandingPage = () => (
    <div className="LandingPage">
        <div className="pageHalf">
            <h1 className="header">rOOmie</h1>
        </div>
        <div className="pageHalf">
            <Login />
        </div>
        <div className="small-caps-purple"><p>© 2021 All Rights Reserved</p></div>
    </div>
)


export default LandingPage
