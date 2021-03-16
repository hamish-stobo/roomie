import React, { useState, useEffect } from 'react'
import '../../styles/styles'

const Footer = () => {
    const [docHeight, setDocHeight] = useState(0)
    const [windowHeight, setWindowHeight] = useState(0)
    const setFooterHeight = () => {
        setWindowHeight(window.innerHeight)
        setDocHeight((document.height !== undefined) ? document.height : document.body.offsetHeight)
    }
    useEffect(() => {
        setFooterHeight()
    })
    const topPos = {
        top: `calc(${windowHeight > docHeight ? windowHeight : docHeight}px - 20px)`
    }
    return ( 
        <div style={topPos} className="small-caps-purple copyright">
            <p>© 2021 All Rights Reserved</p>
        </div> 
    )
}


export default Footer