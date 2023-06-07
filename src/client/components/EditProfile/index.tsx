import { ChangeEvent, FormEvent, useEffect, useState, useRef } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import '../../styles/_RootSettings'
import { useAuth } from '../App/Auth'
// import ToastMessage from '../ToastMessage'
const axios = require('axios')

const useWatch = (value: any, callback: any): void => {
    const prevValueRef = useRef()

    useEffect(() => {
        if (value !== prevValueRef.current) {
            callback(value, prevValueRef.current)
            prevValueRef.current = value
        }
    }, [value, callback])
}

const EditProfile = (): JSX.Element => {
    const { goBack } = useHistory()
    const { user, setUser, popup, setPopup } = useAuth()

    const [userDetails, setUserDetails] = useState<User>({
        created_at: '',
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
        setUserDetails({ ...userDetails, [name]: value })
    }
    const addImage = (e: ChangeEvent<HTMLInputElement>): void => {
        const target = e.currentTarget as HTMLInputElement
        const files = target.files as FileList
        const fileList = Array.from(files) as File[]
        setProfilePicture([...profile_picture, fileList[0]])
    }

    useWatch(popup, (newValue: Popup | null, oldValue: Popup | null): void => {
        // 'myProp' has changed from 'oldValue' to 'newValue', do something
        if (oldValue?.type === 'success' && newValue === null) {
            setRedirect(true)
        }
    })

    const submit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
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
            setPopup({
                type: 'success',
                message: 'Profile updated successfully',
            })

            // setToast({
            //     ...toast,
            //     message: 'Profile updated successfully',
            //     type: 'success',
            //     onClose: () => {
            //         setToast({ ...toast, message: '' })
            //         setRedirect(true)
            //     },
            // })
        } catch (err: any) {
            console.error(err)
            // setToast({
            //     ...toast,
            //     message: 'Error updating profile',
            //     type: 'error',
            //     onClose: () => {
            //         setToast({ ...toast, message: '' })
            //         setRedirect(true)
            //     },
            // })
            setPopup({
                type: 'error',
                message: 'Error updating profile',
            })
        }
    }

    useEffect(() => {
        setUserDetails({ ...userDetails, ...user })
    }, [user])

    return (
        <>
            {/* {toast.message && <ToastMessage {...toast} />} */}
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
                    <p
                        className="exitBtn registerExitBtn"
                        onClick={() => goBack()}
                    >
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
        </>
    )
}

export default EditProfile
