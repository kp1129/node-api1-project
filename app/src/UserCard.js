import React from 'react';

const UserCard = ({user}) => {
    return(
        <div className="usercard">
            <p>Name: {user.name} </p>
            <p>Bio: {user.bio} </p>
        </div>
    )
}

export default UserCard;