import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../App/Auth'

const Logout = (): JSX.Element => {
    const { setUser } = useAuth()
    Cookies.remove('accessToken')
    setUser(null)
    return (
        <>
            <Redirect to="/" />
        </>
    )
}

export default Logout
