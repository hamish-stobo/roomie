import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/styles'
import House from '../../../../public/assets/House.svg'

const Hero = () => (
    <div className="Hero">
        <h1>r00mie</h1>
        <svg>{House}</svg>
        <div className="bottomHalf">
            <Link className="button" to='/register'>Login</Link>
            <Link className="button" to='/register'>Register</Link>
        </div>
    </div>
)

export default Hero
