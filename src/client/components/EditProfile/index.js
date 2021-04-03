import React, { useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import '../../styles/_RootSettings'
import { useAuth } from '../App/Auth'
const axios = require('axios')

const EditProfile = () => {
    const { goBack } = useHistory()
    const { user, setUser } = useAuth()
    const { user_id, first_name, last_name, email, password, user_location } = user
    const [userDetails, setUserDetails] = useState({
        user_id, first_name, last_name, email, password, user_location
    }) 
    const [profile_picture, setImage] = useState([])
    const [redirect, setRedirect] = useState(false)
    const onChange = e => {
        const { name, value } = e.target
        //create a COPY of the existing map in state
        //react will compare the two maps in useState and setState with Object.is, and trigger re-render
        setUserDetails({...userDetails, [name]: value})
    }
    const addImage = e => {
        setImage([...profile_picture, e.target.files[0]])
    }

    const submit = async e => {
        try {
            e.preventDefault()
            const formData = new FormData();
            for(const prop in userDetails) {
                formData.append(prop, userDetails[prop])
            }
            formData.append('profile_picture', profile_picture[0])
            for(var pair of formData.entries()) {
                console.log(pair[0]+ ', '+ pair[1]);
             }
            const response = await axios.put(`/api/v1/users/${userDetails?.user_id}`, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            if(!response.data || response.data === '{}') throw response.message
            setUser(response.data)
            setRedirect(true)
            } catch (err) {
                alert(err)
            }
    }
    return (
        <div className="Register-container edit-profile-container">
            {redirect && <Redirect to={`/profile/${userDetails?.user_id}`}/>}
                <div className="registerTop">                
                    <p className="exitBtn registerExitBtn" onClick={() => goBack()}>x</p>
                    <p className="small-caps-purple editProfileTitle">Edit your Profile</p>
                </div>
                <form className="Form Register" onSubmit={submit}>
                    <input required className={`text-input required ${!userDetails?.first_name ? '' : 'lowercase'}`} type="text" name="first_name" placeholder="First Name" value={userDetails?.first_name} onChange={onChange} />
                    <input required className={`text-input required ${!userDetails?.last_name ? '' : 'lowercase'}`} type="text" name="last_name" placeholder="Last Name" value={userDetails?.last_name} onChange={onChange} />
                    <input required className={`text-input required ${!userDetails?.email ? '' : 'lowercase'}`} type="email" name="email" placeholder="Email" value={userDetails?.email} onChange={onChange} />
                    {/* <input required className={`text-input required ${!userDetails?.password ? '' : 'lowercase'}`} type="password" name="password" placeholder="Password" minLength="6" value={userDetails?.password} onChange={onChange} /> */}
                    <input required className={`text-input required ${!userDetails?.user_location ? '' : 'lowercase'}`} type="text" name="user_location" placeholder="Location" value={userDetails?.user_location} onChange={onChange} />
                    <div className="text-input profileFileContainer">
                        <label htmlFor="profile-file-upload">Upload a new profile image</label>
                        <input required id="profile-file-upload" className="profile-fileUpload" type="file" accept="image/png, image/jpeg" name="profile_picture" onChange={addImage}/>
                    </div>
                    <input className="button" value="Sign Up" type="submit" name="submit" />
                </form>
            </div>
    )
}


export default EditProfile
