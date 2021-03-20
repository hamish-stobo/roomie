import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../../styles/_RootSettings'
const axios = require('axios')

const EditProfile = () => {
    const { goBack } = useHistory()
    const [userDetails, setUserDetails] = useState(new Map()) 
    const [image, setImage] = useState([])
    const onChange = e => {
        const { name, value } = e.target
        //create a COPY of the existing map in state
        //react will compare the two maps in useState and setState with Object.is, and trigger re-render
        setUserDetails(new Map(userDetails.set(name, value)))
    }
    const addImage = e => {
        console.log(e.target.files[0])
        setImage([...image, e.target.files[0]])
    }

    const submit = async e => {
        e.preventDefault()
        const formData = new FormData();
        userDetails.forEach((val, key) => {
            formData.append(key, val)
        })
        formData.append('image', image);
        for(var pair of formData.entries()) {
            console.log(pair[0]+ ', '+ pair[1])
            if(pair[0] == 'images') {
                console.log(`IMAGES: images[1]}`)
            }
         }
        }
    return (
        <div className="Register-container edit-profile-container">
                <div className="registerTop">                
                    <p className="exitBtn registerExitBtn" onClick={() => goBack()}>x</p>
                    <p className="small-caps-purple editProfileTitle">Edit your Profile</p>
                </div>
                <form className="Form Register" onSubmit={submit}>
                    <input required className={`text-input required ${!userDetails.get('first_name') ? '' : 'lowercase'}`} type="text" name="first_name" placeholder="First Name" value={userDetails.get('first_name')} onChange={onChange} />
                    <input required className={`text-input required ${!userDetails.get('last_name') ? '' : 'lowercase'}`} type="text" name="last_name" placeholder="Last Name" value={userDetails.get('last_name')} onChange={onChange} />
                    <input required className={`text-input required ${!userDetails.get('email') ? '' : 'lowercase'}`} type="email" name="email" placeholder="Email" value={userDetails.get('email')} onChange={onChange} />
                    <input required className={`text-input required ${!userDetails.get('password') ? '' : 'lowercase'}`} type="password" name="password" placeholder="Password" minlength="8" value={userDetails.get('password')} onChange={onChange} />
                    <div className="text-input profileFileContainer">
                        <label htmlFor="profile-file-upload">Upload a new profile image</label>
                        <input required id="profile-file-upload" className="profile-fileUpload" type="file" accept="image/png, image/jpeg" name="image" onChange={addImage}/>
                    </div>
                    <input className="button" value="Sign Up" type="submit" name="submit" />
                </form>
            </div>
    )
}


export default EditProfile
