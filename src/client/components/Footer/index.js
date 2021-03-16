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
        resizeObserver.observe(document.body)
    })
    const resizeObserver = new ResizeObserver(entries => 
        // setDocHeight(entries[0].target.clientHeight)
        setFooterHeight()
    )
      
      // start observing a DOM node
    
    const topPos = {
        top: `calc(${docHeight > windowHeight ? docHeight : windowHeight}px - 20px)`
    }
    return ( 
        <div style={topPos} className="small-caps-purple copyright">
            <p>© 2021 All Rights Reserved</p>
        </div> 
    )
}


export default Footer