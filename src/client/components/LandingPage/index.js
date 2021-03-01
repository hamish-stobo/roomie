import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/styles'
import HouseSvg from '../HouseSvg'

const LandingPage = () => (
    <div className="LandingPage">
        <div className="pageHalf">
            <h1 className="header">r00mie</h1>
            <HouseSvg />
        </div>
        <div className="pageHalf">
            <Link className="button" to='/register'>Login</Link>
            <Link className="button" to='/register'>Register</Link>
        </div>
    </div>
)


export default LandingPage
