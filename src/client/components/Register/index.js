import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import '../../styles/_RootSettings'
const axios = require('axios')
import Footer from '../Footer'
import { useAuth } from '../App/Auth'

const Register = ({toggle}) => {
    const [userDetails, setUserDetails] = useState(new Map()) 
    const [profile_picture, setProfilePicture] = useState([])
    const [redirect, setRedirect] = useState(false)
    const { setUser } = useAuth()
    const onChange = e => {
        const { name, value } = e.target
        //create a COPY of the existing map in state
        //react will compare the two maps in useState and setState with Object.is, and trigger re-render
        setUserDetails(new Map(userDetails.set(name, value)))
    }
    const addImage = e => {
        // console.log(e.target.files[0])
        setProfilePicture([...profile_picture, e.target.files[0]])
    }

    const submit = async e => {
        try {
        e.preventDefault()
        const formData = new FormData();
        userDetails.forEach((val, key) => {
            formData.append(key, val)
        })
        formData.append('profile_picture', profile_picture[0])
        for(var pair of formData.entries()) {
            // console.log(pair[0]+ ', '+ pair[1]);
         }
        //once auth ready:
        //
        const response = await axios.post('/api/v1/users/', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if(!response.data || response.data === '{}') throw response.message
        setUser(response.data)
        setRedirect(true)
        } catch (err) {
            // console.log({err})
            alert(err)
        }
    }

    return (
        <div className="pageWrapper">
            {redirect && <Redirect to='/listings'/>}
            <div className="Register-container">
                <div className="registerTop">                
                    <Link className="exitBtn registerExitBtn" to="/">x</Link>
                    <p className="small-caps-purple">Sign Up to Find a Flat or<br/> List a Room</p>
                </div>
                <form className="Form Register" onSubmit={submit}>
                    <input required className={`text-input required ${!userDetails.get('first_name') ? '' : 'lowercase'}`} type="text" name="first_name" placeholder="First Name" value={userDetails.get('first_name')} onChange={onChange} />
                    <input required className={`text-input required ${!userDetails.get('last_name') ? '' : 'lowercase'}`} type="text" name="last_name" placeholder="Last Name" value={userDetails.get('last_name')} onChange={onChange} />
                    <input required className={`text-input required ${!userDetails.get('email') ? '' : 'lowercase'}`} type="email" name="email" placeholder="Email" value={userDetails.get('email')} onChange={onChange} />
                    <input required className={`text-input required ${!userDetails.get('password') ? '' : 'lowercase'}`} type="password" name="password" placeholder="Password (Min. 6 characters)" minLength="6" value={userDetails.get('password')} onChange={onChange} />
                    <input required className={`text-input required ${!userDetails.get('user_location') ? '' : 'lowercase'}`} type="text" name="user_location" placeholder="Where are you based?" value={userDetails.get('user_location')} onChange={onChange} />
                    <div className="text-input profileFileContainer">
                        <label htmlFor="profile-file-upload">Upload a profile image</label>
                        <input required id="profile-file-upload" className="profile-fileUpload" type="file" accept="image/png, image/jpeg" name="profile_picture" onChange={addImage}/>
                    </div>
                    <input className="button" value="Sign Up" type="submit" name="submit" />
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Register