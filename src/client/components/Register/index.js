import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
const axios = require('axios')

const Register = () => {
    const [userDetails, setUserDetails] = useState(new Map()) 

    const onChange = e => {
        const { name, value } = e.target
        //create a COPY of the existing map in state
        //react will compare the two maps in useState and setState with Object.is, and trigger re-render
        setUserDetails(new Map(userDetails.set(name, value)))
    }

    const submit = async e => {
        e.preventDefault()
        const userObject = Object.fromEntries(userDetails)
        console.log(`here is ur data: ${JSON.stringify(userObject)}`)
        //once auth ready:
        //
        // try {
        //     const response = await axios.post('/register ', {
        //         data: userObject
        //     })
        //     //if response truthy
        //     if(!!reponse && response !== '{}') {
        //         console.log(`all good, response: ${response}`)
        //     } else {
        //         throw Error('Attempt to login failed')
        // } 
        // } catch (e) {
        //     console.log(e)
        // }
    }

    return (
        <>
            <form className="Register" onSubmit={submit}>
                <label>First Name:
                    <input type="text" name="first_name" value={userDetails.first_name} onChange={onChange} />
                </label>
                <label>Last Name:
                    <input type="text" name="last_name" value={userDetails.last_name} onChange={onChange} />
                </label>
                <label>Email:
                    <input type="email" name="email" value={userDetails.email} onChange={onChange} />
                </label>
                <label>Password :
                    <input type="password" name="password" value={userDetails.password} onChange={onChange} />
                </label>
                <label>Bio :
                    <textarea name="bio" value={userDetails.bio} onChange={onChange} />
                </label>
                <input type="submit" name="submit" />
            </form>
            <Link to='/login' className="button">Login</Link>
        </>
    )
}

export default Register