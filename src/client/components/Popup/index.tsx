import { useState } from 'react'
import '../../styles/styles'
import { useAuth } from '../App/Auth/index'

const Popup = (): JSX.Element => {
    const { popup, setPopup } = useAuth()
    const [showPopup] = useState<Popup | null>(popup)

    const closePopup = () => {
        setPopup(null)
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
            {showPopup && (
                <div className={`PopupWrapper ${styling}`}>
                    {/* {console.log(`popup: ${popup?.message}; showPopup: ${showPopup?.message}`)} */}
                    <p>popup?.message</p>
                    <button className="button" onClick={closePopup}>
                        OK
                    </button>
                </div>
            )}
        </>
    )
}

export default Popup
