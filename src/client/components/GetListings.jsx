import React, { useState, useEffect } from 'react'
const axios = require('axios')
import '../../../styles/styles'
import DisplayListings from './DisplayListings'
import Loading from './Loading'


const GetListings = () => {
    const [users, setUsers] = useState([])

    const getUser = async () => {
        const { data } = await axios.get('/getUsers');
        setUsers(data)
    }

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