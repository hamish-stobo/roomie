import React, { useState, useRef, useEffect } from 'react'
const axios = require('axios')

const SignUpForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const submit = (e) => {
        e.preventDefault()

        // alert(`here is ur data: {
        //     firstname: ${firstName}
        //     lastname: ${lastName}
        //     email: ${email}
        // }`)

          axios.post('/register ', {
            data: {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
            },
        }).then(res => {
            console.log('res worked',res)
        })

    }

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const onChangeLastName = (e) => {
        setLastName(e.target.value)
    }


    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return (
        <>
            <form onSubmit={submit}>
                <label>First Name:
                    <input type="text" name="firstName" value={firstName} onChange={onChangeFirstName} />
                </label>
                <label>Last Name:
                    <input type="text" name="lastName" value={lastName} onChange={onChangeLastName} />
                </label>
                <label>Email:
                    <input type="email" name="email" value={email} onChange={onChangeEmail} />
                </label>
                <label>Password :
                    <input type="password" name="password" value={password} onChange={onPasswordChange} />
                </label>
                <input type="submit" name="submit" />
            </form>
        </>
    )
}

export default SignUpForm