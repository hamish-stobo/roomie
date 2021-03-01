import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/styles'
// import House from '../../../../public/assets/House.svg'

const Hero = () => (
    <div className="Hero">
        <h1>r00mie</h1>
        <svg width="205" height="138" viewBox="0 0 205 138" fill="none" xmlns="http://www.w3.org/2000/svg">
        {House}
        </svg>
        <div className="bottomHalf">
            <Link className="button" to='/register'>Login</Link>
            <Link className="button" to='/register'>Register</Link>
        </div>
    </div>
)

const House = `
<path d="M53 51H155V137H53V51Z" stroke="black" stroke-width="2"/>
<path d="M103.392 8.56215L179.417 46.4601C181.307 47.4022 180.637 50.25 178.525 50.25H26.475C24.3632 50.25 23.6928 47.4022 25.5827 46.4601L101.608 8.56215C102.17 8.28206 102.83 8.28206 103.392 8.56215Z" stroke="black" stroke-width="2"/>
<path d="M125 19.5V2.5C125 1.94772 125.448 1.5 126 1.5H137.5C138.052 1.5 138.5 1.94772 138.5 2.5V25.5" stroke="black" stroke-width="2"/>
<path d="M92 94H117C118.657 94 120 95.3431 120 97V137H89V97C89 95.3431 90.3431 94 92 94Z" stroke="black" stroke-width="2"/>
<circle cx="96.5" cy="114.5" r="2.5" fill="black"/>
<rect x="62" y="64" width="25" height="24" rx="1" stroke="black" stroke-width="2"/>
<line x1="74.5" y1="89" x2="74.5" y2="63" stroke="black" stroke-width="2"/>
<line x1="62" y1="76" x2="87" y2="76" stroke="black" stroke-width="2"/>
<rect x="120" y="64" width="25" height="24" rx="1" stroke="black" stroke-width="2"/>
<line x1="132.5" y1="89" x2="132.5" y2="63" stroke="black" stroke-width="2"/>
<line x1="120" y1="76" x2="145" y2="76" stroke="black" stroke-width="2"/>
`

export default Hero
