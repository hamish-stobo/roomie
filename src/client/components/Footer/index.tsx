import { useState, useEffect } from 'react'
import '../../styles/styles'

const Footer = () => {
    const [docHeight, setDocHeight] = useState(0)
    const [windowHeight, setWindowHeight] = useState(0)
    const setFooterHeight = () => {
        setWindowHeight(window.innerHeight)
        setDocHeight(document.documentElement.scrollHeight)
    }
    useEffect(() => {
        setFooterHeight();
        const resizeObserver = new ResizeObserver(() => {
            setFooterHeight()
        })
        resizeObserver.observe(document.body)
        return () => resizeObserver.disconnect()
    }, [])
      
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