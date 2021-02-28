import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/styles'

const Hero = () => (
    <div className="Hero">
        <h1>WELCOME TO ROOMIE!!!!</h1>
        <Link to='/listings'>***HIDE THIS IN PROD*** Link to listings page, test</Link>
    </div>
)

export default Hero
