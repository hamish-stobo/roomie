import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import '../../styles/_RootSettings'
import { useAuth } from '../App/Auth'
const axios = require('axios')

const EditProfile = (): JSX.Element => {
    const { goBack } = useHistory()
    const { user, setUser } = useAuth()
    // const { user_id, first_name, last_name, email, password, user_location } = user
    const [userDetails, setUserDetails] = useState<User>({
        user_id: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        profile_picture: '',
        user_location: '',
    })
    const [profile_picture, setProfilePicture] = useState<File[]>([])
    const [redirect, setRedirect] = useState<Boolean>(false)
    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.currentTarget as HTMLInputElement
        //create a COPY of the existing map in state
        //react will compare the two maps in useState and setState with Object.is, and trigger re-render
        setUserDetails({ ...userDetails, [name]: value })
    }
    const addImage = (e: ChangeEvent<HTMLInputElement>): void => {
        const target = e.currentTarget as HTMLInputElement
        const files = target.files as FileList
        const fileList = Array.from(files) as File[]
        setProfilePicture([...profile_picture, fileList[0]])
    }

    const submit = async (e: FormEvent<HTMLInputElement>): Promise<void> => {
        try {
            e.preventDefault()
            const formData = new FormData() as any
            for (const prop in userDetails) {
                formData.append(
                    prop,
                    userDetails[prop as keyof typeof userDetails]
                )
            }
            formData.append('profile_picture', profile_picture[0])
            const user_id = userDetails.user_id
            const response = await axios.put(
                `/api/v1/users/${user_id}`,
                formData,
                {
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                }
            )
            if (!response.data || response.data === '{}') throw response.message
            setUser({
                ...response.data,
                created_at: response.data.created_at.split('T')[0],
            })
            setRedirect(true)
        } catch (err: any) {
            alert(err.response.data)
        }
    }

    useEffect(() => {
        setUserDetails({ ...userDetails, ...user })
        // console.log(JSON.stringify(userDetails))
    }, [user])

    return (
        <div className="Register-container edit-profile-container">
            {redirect && (
                <Redirect
                    to={`/profile/${
                        userDetails.user_id !== ''
                            ? userDetails.user_id
                            : user?.user_id
                    }`}
                />
            )}
            <div className="registerTop">
                <p className="exitBtn registerExitBtn" onClick={() => goBack()}>
                    x
                </p>
                <p className="small-caps-purple editProfileTitle">
                    Edit your Profile
                </p>
            </div>
            <form className="Form Register" onSubmit={(e) => submit(e)}>
                <input
                    required
                    className={`text-input required ${
                        !userDetails?.first_name ? '' : 'lowercase'
                    }`}
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={userDetails.first_name}
                    onChange={onChange}
                />
                <input
                    required
                    className={`text-input required ${
                        !userDetails?.last_name ? '' : 'lowercase'
                    }`}
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={userDetails.last_name}
                    onChange={onChange}
                />
                <input
                    required
                    className={`text-input required ${
                        !userDetails?.email ? '' : 'lowercase'
                    }`}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userDetails.email}
                    onChange={onChange}
                />
                <input
                    required
                    className={`text-input required ${
                        !userDetails?.user_location ? '' : 'lowercase'
                    }`}
                    type="text"
                    name="user_location"
                    placeholder="Location"
                    value={userDetails.user_location}
                    onChange={onChange}
                />
                <div className="text-input profileFileContainer">
                    <label htmlFor="profile-file-upload">
                        Upload a new profile image
                    </label>
                    <input
                        required
                        id="profile-file-upload"
                        className="profile-fileUpload"
                        type="file"
                        accept="image/png, image/jpeg"
                        name="profile_picture"
                        onChange={addImage}
                    />
                </div>
                <input
                    className="button"
                    value="Update"
                    type="submit"
                    name="submit"
                />
            </form>
        </div>
    )
}

export default EditProfile
