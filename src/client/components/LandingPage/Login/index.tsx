import { useState, FormEvent, ChangeEvent } from 'react'
import { Redirect } from 'react-router-dom'
import '../../../styles/styles'
import { useAuth } from '../../App/Auth'
import axios from 'axios'

const Login = () => {
    const auth = useAuth()
    const [userInfo, setUserInfo] = useState<LoginDetails>({
        email: '',
        password: '',
    })
    const [redirect, setRedirect] = useState(false)
    const { setUser, setPopup } = auth
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserInfo({ ...userInfo, [name]: value })
    }

    const runSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            e.preventDefault()
            const loginResponse = await axios.post('/api/v1/login', userInfo)
            if (!loginResponse || !loginResponse?.data)
                throw 'Login was not successful'
            setUser(loginResponse.data)
            setRedirect(true)
        } catch (err: any) {
            console.error(err)
            setPopup({ type: 'error', message: 'Something went wrong' })
        }
    }
    return (
        <div>
            {redirect && <Redirect to="/listings" />}
            <form
                className="flex flex-col justify-between items-stretch gap-y-3 w-full"
                onSubmit={runSubmit}
            >
                <input
                    required
                    className="bg-white shadow p-3 rounded font-sans focus:ring-2 focus:ring-purpScurp"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userInfo.email}
                    onChange={onChange}
                />
                <input
                    required
                    className="bg-white shadow p-3 rounded font-sans focus:ring-2 focus:ring-purpScurp"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={userInfo.password}
                    onChange={onChange}
                />
                <input
                    className="bg-purpScurp text-veryLightGray shadow p-3 rounded cursor-pointer hover:bg-darkerPurpScurp"
                    type="submit"
                    name="submit"
                    value="Login"
                />
            </form>
        </div>
    )
}

export default Login
