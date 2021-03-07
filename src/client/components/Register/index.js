import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/_RootSettings'
const axios = require('axios')
import Footer from '../Footer'

const Register = ({toggle}) => {
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
        <div className="pageWrapper">
            <div className="Register-container">
                <div className="registerTop">                
                    <Link className="exitBtn" to="/">x</Link>
                    <p className="small-caps-purple">Sign Up to Find a Flat or List a Room</p>
                </div>
                <form className="Form Register" onSubmit={submit}>
                    <input className={`text-input ${!userDetails.get('first_name') ? '' : 'lowercase'}`} type="text" name="first_name" placeholder="First Name" value={userDetails.get('first_name')} onChange={onChange} />
                    <input className={`text-input ${!userDetails.get('last_name') ? '' : 'lowercase'}`} type="text" name="last_name" placeholder="Last Name" value={userDetails.get('last_name')} onChange={onChange} />
                    <input className={`text-input ${!userDetails.get('email') ? '' : 'lowercase'}`} type="email" name="email" placeholder="Email" value={userDetails.get('email')} onChange={onChange} />
                    <input className={`text-input ${!userDetails.get('password') ? '' : 'lowercase'}`} type="password" name="password" placeholder="Password" value={userDetails.get('password')} onChange={onChange} />
                    <input className="button" value="Sign Up" type="submit" name="submit" />
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Register