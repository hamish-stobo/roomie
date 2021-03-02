import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const axios = require('axios')

const Login = () => {
    const [userInfo, setUserInfo] = useState(new Map())

    const onChange = e => {
        const { name, value } = e.target
        setUserInfo(new Map(userInfo.set(name, value)))
    }

    const submit = e => {
        e.preventDefault()
        const userDetails = Object.fromEntries(userInfo)
        console.log(userDetails)
        //when auth is ready:
        // try {
        //     const response = await axios.post('/api/v1/login', {
        //     data: {...userDetails})
        //     //if response is truthy
        //     if(!!reponse && response !== '{}') {
        //         console.log(`all good, response: ${response}`)
        //     } else {
        //         throw Error('Attempt to login failed')
        //     }
        // } catch (e) {
        //     console.log(e)
        // }
        //
    }
    return (
        <>
            <form className="Login" onSubmit={submit}>
                <label>Email:
                    <input type="email" name="email" value={userInfo.email} onChange={onChange} />
                </label>
                <label>Password :
                    <input type="password" name="password" value={userInfo.password} onChange={onChange} />
                </label>
                <input type="submit" name="submit" />
            </form>
            <Link className="button" to='/register'>Register</Link>
        </>
    )
}

export default Login