import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../../styles/styles'
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
        //when auth/login functionality is ready:
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
    //if the email input is empty, remove the email clas
    return (
        <div className="Login-Container" >
            <form className="Login" onSubmit={submit}>
                <input className={`text-input ${!userInfo.get('email') ? '' : 'lowercase'}`} type="email" name="email" placeholder="Email" value={userInfo.email} onChange={onChange} />
                <input className={`text-input ${!userInfo.get('password') ? '' : 'lowercase'}`} type="password" placeholder="Password" name="password" value={userInfo.password} onChange={onChange} />
                <input className="button" type="submit" name="submit" value="Login"/>
            </form>
            <Link className="small-caps-purple" to='/register'>Sign Up for Roomie</Link>
        </div>
    )
}

export default Login