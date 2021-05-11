import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import '../../../styles/styles'
import { useAuth } from '../../App/Auth'
import axios from 'axios'

const Login = () => {
    const [userInfo, setUserInfo] = useState(new Map())
    const [redirect, setRedirect] = useState(false)
    const { setUser, setPopup } = useAuth()
    const onChange = e => {
        const { name, value } = e.target
        setUserInfo(new Map(userInfo.set(name, value)))
    }
    
    const runSubmit = async e => {
        try {
            e.preventDefault()
            const userDetails = Object.fromEntries(userInfo)
            const loginResponse = await axios.post('/api/v1/login', userDetails)
            if(!loginResponse || !loginResponse?.data) throw 'Login was not successful'
            setPopup({type: 'success', message: loginResponse.statusText})
            setUser(loginResponse.data)
            setRedirect(true)
        } catch (err) {
            alert(err.response.data)
        }
    }
    return (
        <div className="Login-Container" >
            {redirect && <Redirect to="/listings" />}
            <form className="Form Login" onSubmit={runSubmit}>
                <input required className={`text-input required ${!userInfo.get('email') ? '' : 'lowercase'}`} type="email" name="email" placeholder="Email" value={userInfo.email} onChange={onChange} />
                <input required className={`text-input required ${!userInfo.get('password') ? '' : 'lowercase'}`} type="password" placeholder="Password" name="password" value={userInfo.password} onChange={onChange} />
                <input className="button" type="submit" name="submit" value="Login"/>
            </form>
            <Link className="small-caps-purple" to='/register'>Sign Up for Roomie</Link>
        </div>
    )
}

export default Login