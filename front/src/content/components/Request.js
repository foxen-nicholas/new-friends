import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import FriendCard from './FriendCard';

const Request = (props) => {

    let [friendRequests, setFriendRequests] = useState([])

    useEffect( () => {
        let token = localStorage.getItem("jwtToken")
        Axios.get(`${process.env.REACT_APP_API}/api/users/friendRequests`, {headers: {Authorization: `Bearer ${token}`}})
        .then(allRequests => {
            console.log('these are all the requests', allRequests.data)
            setFriendRequests(allRequests.data)
        })
        .catch(err => console.log(err))
    }
    , [])
    
    const mappedFriendRequests = friendRequests.map( (friend) => {
        return(
            <div key={friend.friend._id}>
                <FriendCard friend={friend} user={props.user} />
            </div>
        )
    })

    // const [faves, setFaves]  = useState([]);
    // const [filter, setFilter] = useState('all');
    // const handleFilterClick = filter => {
    //   setFilter(filter)

    // }

    // const onFaveToggle = () => {
    //   let newFaves = [...faves];
    //   let faveIndex = faves.indexOf(film);
    //   //check is a film is i the faves
    //   if (faveIndex >= 0) {
    //     newFaves.splice(faveIndex, 1);
    //   } else {
    //     //else put in array
    //     newFaves =  [...newFaves, film];
    //   }
    //    set faves (newFaves)

    // }

    return (
        <div>
            <h2>Friend Requests</h2>
            {mappedFriendRequests}

        </div>
    )
} 

export default Request;