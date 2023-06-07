// import { useState, useEffect } from 'react'
import { useEffect, useState } from 'react'
import '../../styles/styles'
import { useAuth } from '../App/Auth/index'

const Popup = (): JSX.Element => {
    const { popup, setPopup } = useAuth()
    const [localPopup, setLocalPopup] = useState<Popup | null>(null)

    useEffect(() => {
        setLocalPopup(popup)
    }, [popup])

    useEffect(() => {}, [localPopup])

    const closePopup = () => {
        setPopup(null)
        setLocalPopup(null)
    }

    let styling = ''
    if (!!popup) {
        const { type } = popup
        switch (type) {
            case 'success':
                styling = 'Success'
                break
            case 'info':
                styling = 'Info'
                break
            case 'error':
                styling = 'Error'
            default:
                styling = ''
        }
    }

    return (
        <>
            {localPopup && (
                <div className={`PopupWrapper ${styling}`}>
                    <p>{localPopup?.message}</p>
                    <button className="button" onClick={closePopup}>
                        OK
                    </button>
                </div>
            )}
        </>
    )
}

export default Popup
