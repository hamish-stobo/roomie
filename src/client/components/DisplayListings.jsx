import React from 'react'
import '../../../styles/styles'

const DisplayListings = (props) => {
  console.log('props', props)
  let user = props.users

  return (
    <>
      <div class="display-listings">
        <ul>
          <li>{user.first_name}</li>
          <li>{user.last_name}</li>
          <li>{user.email}</li>
        </ul>
      </div>
    </>
  )
}

export default DisplayListings