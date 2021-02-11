import React, { useState, useEffect } from 'react'
const axios = require('axios')
import '../../../styles/styles'
import DisplayListings from './DisplayListings'
import Loading from './Loading'


const GetListings = () => {
    const [users, setUsers] = useState([])
    // This will need to be changed to /getListings when it's ready
    const getUser = async () => {
        const { data } = await axios.get('/getUsers');
        setUsers(data)
    }
    // on load || change in users.length getUser will make the axios call and return the users
    useEffect(() => {
        getUser()
    }, [users.length])

 
    return (
        <>
            <div class="GetListings">
                <h3>GetListings Container</h3>
                {users.length > 0 ? users.map(listUsers => {
                    return <DisplayListings key={listUsers.id} users={listUsers} />
                }) : <Loading />}
            </div>
        </>
    )
}

export default GetListings