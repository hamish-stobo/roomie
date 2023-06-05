import Cookies from 'js-cookie'
import { ReactNode, createContext, useContext, useState } from 'react'
interface AuthContextData {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    isAuthed: boolean
    popup: Popup | null
    setPopup: React.Dispatch<React.SetStateAction<Popup | null>>
}

interface ProvideAuthProps {
    children: ReactNode
}

const authContext = createContext<AuthContextData | undefined>(undefined)

export const ProvideAuth = ({ children }: ProvideAuthProps): JSX.Element => {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = (): AuthContextData => {
    const context = useContext(authContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within a ProvideAuth')
    }
    return context
}

const useProvideAuth = (): AuthContextData => {
    const [user, setUser] = useState<User | null>(null)
    const [popup, setPopup] = useState<Popup | null>(null)
    const isAuthed = !!Cookies.get('accessToken')

    return { user, setUser, isAuthed, popup, setPopup }
}
