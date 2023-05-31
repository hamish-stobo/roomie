import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faCamera, faCog, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../App/Auth'
import ProfileMenu from './ProfileMenu'

import '../../styles/styles'
import LikedListings from '../LikedListings'
import Listings from '../Listings'

const Profile = () => {
    const [profile, setProfile] = useState<User>({})
    const [left, setLeft] = useState(true)
    const [displayMenu, setDisplayMenu] = useState(false)
    const { user_id } = useParams() as User
    const { user } = useAuth()

    const toggleProfileMenu = (input) => {
        setDisplayMenu(input)
    }

    const getProfile = async (userID) => {
        try {
            const profileRes = await axios.get(`/api/v1/users/${userID}`)
            const { data } = profileRes
            if (!data || data == '{}') throw 'No profile found'
            data.created_at = data.created_at.split('T')[0]
            setProfile(data)
        } catch (e) {
            alert(e)
        }
    }

    const populateProfilePage = () => {
        getProfile(user_id)
    }

    useEffect(() => {
        //if user is viewing own profile, load profile from context, else get profile from server
        populateProfilePage()
    }, [user_id])
    return (
        <>
            <div className="profileWrapper">
                <div className="profileContainer">
                    {user_id === profile?.user_id && (
                        <FontAwesomeIcon
                            onClick={() => toggleProfileMenu(!displayMenu)}
                            className="faCog sm-element"
                            icon={faCog}
                        />
                    )}
                    {!!profile.profile_picture ? (
                        <img
                            className="profileImg"
                            src={profile.profile_picture}
                        />
                    ) : (
                        <FontAwesomeIcon
                            className="profileImg iconImg"
                            icon={faCamera}
                        />
                    )}
                    <div className="profileDetailsColumn">
                        <span className="username">
                            {profile.first_name} {profile.last_name}
                        </span>
                        <span>
                            <strong>Email:</strong>{' '}
                            <a
                                style={{ textDecoration: 'none' }}
                                href={`mailto:${profile.email}`}
                            >
                                {profile.email}
                            </a>
                        </span>
                        <span>
                            <strong>Location:</strong> {profile.user_location}
                        </span>
                        <span>
                            <strong>Member since:</strong> {profile.created_at}
                        </span>
                    </div>
                    {user_id === profile?.user_id && (
                        <div className="lg-element profileButtonsContainer">
                            <Link
                                to="/editprofile"
                                className="button editButton"
                            >
                                <FontAwesomeIcon icon={faEdit} />
                                <span> Update</span>
                            </Link>
                            <Link
                                to="/deleteprofile"
                                className="button deleteButton"
                            >
                                <FontAwesomeIcon icon={faTrashAlt} />
                                <span> Delete</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            {displayMenu && user_id === user?.user_id && (
                <ProfileMenu toggleProfileMenu={toggleProfileMenu} />
            )}
            <div className="LikesListingsButtons">
                <div
                    onClick={() => setLeft(true)}
                    className={left ? 'selected' : ''}
                >
                    {user_id === user?.user_id
                        ? 'Your'
                        : `${profile.first_name}'s`}{' '}
                    Listings
                </div>
                <div
                    onClick={() => setLeft(false)}
                    className={!left ? 'selected' : ''}
                >
                    Likes
                </div>
            </div>
            {left ? (
                <Listings user_id={user_id} />
            ) : (
                <LikedListings user_id={user_id} />
            )}
        </>
    )
}

export default Profile
