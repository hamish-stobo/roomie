import { useState, FormEvent, ChangeEvent } from 'react'
import { Link, Redirect } from 'react-router-dom'
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
        <div className="w-11/12 max-w-xs">
            {redirect && <Redirect to="/listings" />}
            <form
                className="flex flex-col justify-start items-stretch gap-y-2 w-full"
                onSubmit={runSubmit}
            >
                <input
                    required
                    className="bg-white shadow "
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userInfo.email}
                    onChange={onChange}
                />
                <input
                    required
                    className={`text-input required ${
                        !userInfo.password ? '' : 'lowercase'
                    }`}
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={userInfo.password}
                    onChange={onChange}
                />
                <input
                    className="button"
                    type="submit"
                    name="submit"
                    value="Login"
                />
            </form>
            <Link className="small-caps-purple" to="/register">
                Sign Up for Roomie
            </Link>
        </div>
    )
}

export default Login
