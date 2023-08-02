import { FormEvent, ChangeEvent, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import '../../styles/_RootSettings'
import { useAuth } from '../App/Auth'
import axios from 'axios'

const Register = (): JSX.Element => {
    const [userDetails, setUserDetails] = useState<Map<string, any>>(
        new Map<string, any>()
    )
    const [profile_picture, setProfilePicture] = useState<File[]>([])
    const [redirect, setRedirect] = useState<boolean>(false)
    const { setUser } = useAuth()
    const onChange = (e: ChangeEvent): void => {
        const { name, value } = e.target as HTMLInputElement
        setUserDetails(new Map(userDetails.set(name, value)))
    }

    const addImage = (e: ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files as FileList
        const fileList = [...files]
        setProfilePicture([...profile_picture, fileList[0]])
    }

    const submit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            e.preventDefault()
            const formData = new FormData()
            userDetails.forEach((val, key) => {
                formData.append(key, val)
            })
            formData.append('profile_picture', profile_picture[0])
            //
            const response = await axios.post('/api/v1/users/', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            })
            if (!response?.data || response.data === '{}') throw response
            setUser(response.data)
            setRedirect(true)
        } catch (err) {
            alert(err)
        }
    }

    return (
        <div className="px-6 sm:px-12 py-20 rounded-lg sm:shadow-lg w-11/12 max-w-md bg-veryLightGray xl:m-0 xl:ml-16">
            {redirect && <Redirect to="/listings" />}
            <form
                className="flex flex-col justify-between items-stretch gap-y-3 w-full"
                onSubmit={submit}
            >
                <div className="flex flex-col gap-y-4 mb-8">
                    <h1 className="Logo text-purpScurp text-6xl">roomie</h1>
                    <h2 className="text-veryDarkGray text-lg">
                        Sign up to find a flat, or list a room
                    </h2>
                </div>
                <input
                    required
                    className="bg-white shadow p-3 rounded border border-veryLightGray focus:border-purpScurp"
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={userDetails.get('first_name')}
                    onChange={onChange}
                />
                <input
                    required
                    className="bg-white shadow p-3 rounded border border-veryLightGray focus:border-purpScurp"
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={userDetails.get('last_name')}
                    onChange={onChange}
                />
                <input
                    required
                    className="bg-white shadow p-3 rounded border border-veryLightGray focus:border-purpScurp"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userDetails.get('email')}
                    onChange={onChange}
                />
                <input
                    required
                    className="bg-white shadow p-3 rounded border border-veryLightGray focus:border-purpScurp"
                    type="password"
                    name="password"
                    placeholder="Password (Min. 6 characters)"
                    minLength={6}
                    value={userDetails.get('password')}
                    onChange={onChange}
                />
                <input
                    required
                    className="bg-white shadow p-3 rounded border border-veryLightGray focus:border-purpScurp"
                    type="text"
                    name="user_location"
                    placeholder="Where are you based?"
                    value={userDetails.get('user_location')}
                    onChange={onChange}
                />
                <div className="flex flex-col gap-y-2 my-2 w-full">
                    {/* <label
                        
                        className="inline-block w-full btn"
                    >
                        Upload a profile picture
                    </label> */}
                    <label
                        htmlFor="profile-file-upload"
                        className="inline-block text-veryDarkGrey"
                    >
                        Upload a profile picture
                    </label>
                    <input
                        required
                        id="profile-file-upload"
                        type="file"
                        accept="image/png, image/jpeg"
                        name="profile_picture"
                        onChange={addImage}
                        className="bg-white file:cursor-pointer shadow p-3 rounded border border-veryLightGray block w-full text-sm text-veryDarkGray
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm
                        file:bg-purpScurp file:text-white
                        hover:file:bg-darkerPurpScurp"
                    />
                </div>
                <input
                    className="focus:outline-none text-white bg-purpScurp hover:bg-darkerPurpScurp focus:ring-4 focus:ring-purple-300 font-medium rounded shadow p-3 cursor-pointer"
                    value="Sign Up"
                    type="submit"
                    name="submit"
                />
                <Link
                    className="inline-block border-2 border-purpScurp text-purpScurp shadow p-3 rounded cursor-pointer w-full mx-0 hover:bg-purpScurp hover:text-veryLightGray mt-6"
                    to="/"
                >
                    Login
                </Link>
            </form>
        </div>
    )
}

export default Register
